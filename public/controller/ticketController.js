'use strict';
app.controller('ticketController', ['$scope', '$timeout', '$interval', "$http", function ($scope, $timeout, $interval, $http) {
    $scope.ticketInfo = [];
    $scope.ticketOwner = [];
    $scope.totalComents = 0;
    $scope.ticketNum;
    $scope.status;
    var owner = $("#user").val()
    //***********************************//
    //*********** LOAD DATA ************//
    //*********************************//
    //Initiate the Timer object.
    $scope.Timer = null;
    //Timer start function.
    $scope.StartTimer = function () {

        //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        $scope.Timer = $interval(function () {
            //LOAD DATA ALL TICKET
            $.ajax({
                url: getTicket,
                headers: headerAjax,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var info = data.task

                    $.each(info, function (d, v) {
                        if (v.status == "NA") {
                            if ($scope.ticketInfo.length <= 0) {
                                $scope.showInfo = true
                                $scope.ticketInfo.push(v)
                                $scope.$apply()
                            } else {
                                var insert = false
                                $.each($scope.ticketInfo, function (s, l) {
                                    if (v.ticketNum == l.ticketNum) {
                                        insert = true
                                    }
                                })
                                if (insert == false) {
                                    $scope.ticketInfo.push(v)
                                    $scope.$apply()
                                }
                            }

                        }

                    })
                },
                error: function (textStatus, err) {
                    //alert("text status " + textStatus + ", err " + err);
                }

            });
            // LOAD DATA YOUR TICKETS
            var obj = {
                owner: owner
            }
            obj = JSON.stringify(obj);
            $.ajax({
                url: getTicketOwner,
                headers: headerAjax,
                method: 'POST',
                dataType: 'json',
                data: obj,
                success: function (data) {
                    var info = data.task
                    $.each(info, function (d, v) {
                        if ($scope.ticketOwner.length <= 0) {
                            $scope.showInfo = true
                            $scope.ticketOwner.push(v)
                            $scope.$digest()
                        } else {
                            var insert = false
                            $.each($scope.ticketOwner, function (s, l) {
                                if (v.ticketNum == l.ticketNum) {
                                    insert = true
                                }
                            })
                            if (insert == false) {
                                $scope.ticketOwner.push(v)
                                $scope.$apply()
                            }
                        }
                    })
                },
                error: function (textStatus, err) {
                    //alert("text status " + textStatus + ", err " + err);
                }

            });
        }, 200);
    };
    $scope.StartTimer();

    //***********************************//
    //****** ADD VAR TICKETNUM *********//
    //*********************************//
    $scope.addTicketNum = function(e){
        $scope.ticketNum = e
    }

    //***********************************//
    //*********** ADD TASK ************//
    //*********************************//
    $scope.addTicket = function (E, H, name, email, phone, subject, message) {
        var date = currentDate(2, 1)
        var type = ""
        if (E === "huey") {
            type = "E"
        }
        if (H === "louie") {
            type = "H"
        }
        var obj = {
            ticketNum: Math.random().toString(36).substr(2, 8),
            type: type,
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            lastUpdate: date
        }

        obj = JSON.stringify(obj);
        console.log(date)
        $.ajax({
            url: addTicket,
            headers: headerAjax,
            method: 'POST',
            dataType: 'json',
            data: obj,
            success: function (data) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Prospecto creado correctamente');
                window.location.reload();
            },
            error: function (textStatus, err) {
                alert("text status " + textStatus + ", err " + err);
            }
        });

    }

    //***********************************//
    //*********** ASIGN OWNER **********//
    //*********************************//
    $scope.addOwner = function (ticketNum) {
        var user = $('#user').val()
        var obj = {
            ticketNum: ticketNum,
            owner: user
        }
        obj = JSON.stringify(obj);
        $.ajax({
            url: addOwner,
            headers: headerAjax,
            method: 'POST',
            dataType: 'json',
            data: obj,
            success: function (data) {
                // alertify.set('notifier', 'position', 'top-right');
                // alertify.success('Prospecto creado correctamente');
                window.location.reload();
            },
            error: function (textStatus, err) {
                alert("text status " + textStatus + ", err " + err);
            }
        });
    }

    //***********************************//
    //*********** ADD COMMENT **********//
    //*********************************//
    $scope.addComment = function (e) {
        console.log(e)
        $('#exampleModal').modal('toggle');
        $('#form10').val("")
    }

    //***********************************//
    //*********** ADD STATUS ***********//
    //*********************************//
    $scope.addStatus = function (e,ticketNum) {
        var obj = {
            status: e,
            ticketNum:ticketNum
        }
        obj = JSON.stringify(obj);
        $.ajax({
            url: updateStatus,
            headers: headerAjax,
            method: 'POST',
            dataType: 'json',
            data: obj,
            success: function (data) {
                // alertify.set('notifier', 'position', 'top-right');
                // alertify.success('Prospecto creado correctamente');
                $('#resolve').modal('toggle');
                window.location.reload();
            },
            error: function (textStatus, err) {
                alert("text status " + textStatus + ", err " + err);
            }
        });
    }

}]).directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            elem.bind('blur', function (event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
            });
        }
    };
}]);
