'use strict';
app.controller('calculatorController', ['$scope', '$timeout', '$interval', "$http", function ($scope, $timeout, $interval, $http) {
    $scope.one = 0;
    $scope.segund = 0;
    $scope.prevention = 0;
    $scope.isActive = false;
    $scope.shot = 0;
    $scope.year = 0;
    $scope.month = 0;
    $scope.message = "";
    $scope.isPrev = false;
    $scope.isOneShot = false;
    $scope.isYear = false;

    $scope.calculate = function (e, value) {
        if (value < 20) {
            value = 20
        }
        var tsm = 0
        if (e === 1) {
            $scope.isOneShot = true
            $scope.isPrev = false
            $scope.isYear = false
            tsm = (parseInt(value) * 2.56)
            if (tsm >= 50 && tsm <= 120) {
                $scope.shot = 50
            } else {
                $scope.shot = tsm * 0.50
            }

            $scope.isActive = true
            $scope.message = "El servicio One Shot, es una única erogación y es utilizada mas para un área en especifica (una habitación,una bodega o una oficina)"
        }
        if (e === 2) {
            $scope.isPrev = true
            $scope.isOneShot = false
            $scope.isYear = false
            $scope.isActive = true
            $scope.message = "El servicio Preventico consta de 3 servicios programadas x "
            tsm = parseInt(value) * 2.56
            // PRECIO 1
            if (tsm >= 50 && tsm <= 120) {
                $scope.one = 50
                $scope.segund = 50
                $scope.prevention = 35
                return false
            }
            // PRECIO 2
            if (tsm >= 121 && tsm <= 200) {
                $scope.one = tsm * 0.4
                $scope.segund = tsm * 0.4
                $scope.prevention = tsm * 0.35
                return false
            }

            // PRECIO 3
            if (tsm >= 201) {
                $scope.one = tsm * 0.4
                $scope.segund = tsm * 0.4
                $scope.prevention = tsm * 0.35
                return false
            }
        }

        if (e === 3) {
            $scope.isYear = true
            $scope.isPrev = false
            $scope.isOneShot = false
            $scope.isActive = true
            $scope.message = "El servicio Year, es una erogacion todos los meses (12 erogaciones)"
            tsm = (parseInt(value) * 2.5)

            $scope.month = tsm * 0.35
            $scope.year = $scope.month * 12
        }
    }

    $scope.recalculate = function (e) {
        var v = 0
        if ($scope.isPrev === true) {
            v = 2
        }
        if ($scope.isOneShot === true) {
            v = 1
        }
        if ($scope.isYear === true) {
            v = 3
        }

        $scope.calculate(v,e) 
    }

    $scope.reset = function(){
        window.location.reload();
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
