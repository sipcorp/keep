'use strict';
app.controller('homeController', ['$scope', '$timeout', "$http", function ($scope, $timeout, $http) {

$scope.prospectMoney = 0
  // LOAD DATA 
  $.ajax({
    url: getTask,
    headers: headerAjax,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        var info = data.task
        $.each(info,function(d,v){
            if(v.position == 1){
                var $div = $("<div>", { "class": "draggable alwaysTop","data-draggable":"true"}).append('<div class="row mb-2 maxtop">'+
                '<div class="col-md-12">'+
                    '<a href="#" class="text-dark">'+
                        '<div class="card shadow card-stats mb-4 mb-xl-0">'+
                            '<div class="card-body">'+
                                '<div class="row">'+
                                    '<div class="col-md-10">'+
                                        '<span class="entity">'+v.name+'</span><br />'+
                                        '<span class="contact">'+v.contact+'</span><br />'+
                                        '<span class="text-success">$'+formatNumber(v.saleEstimate)+'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-2 mr-justify">'+
                                        '<i class="far fa-newspaper"></i>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                '</a>'+
                '</div>'+
            '</div>')
            $($div).draggable();
            var id = v._id
            $div.attr("id",id)
            $("#dropbox").prepend($div);   
        }
            
        })
        
    
  
    },
    error: function (textStatus, err) {
    alert("text status " + textStatus + ", err " + err);
    }
});

  // ADD TASK
  $scope.addTask = function(name,contact,sale,date,email,phone,movile,address){
    var id = 1235      
    var obj = {
        name:name,
        contact:contact,
        sale:sale,
        date:date,
        email:email,
        movile:movile,
        phone:phone,
        address:address 
    }
    obj = JSON.stringify(obj);
    console.log(obj)
    $.ajax({
        url: addTask,
        headers: headerAjax,
        method: 'POST',
        dataType: 'json',
        data: obj,
        success: function (data) {
            var task = data.save

            $('#myModal').modal('hide');
            var $div = $("<div>", { "class": "draggable alwaysTop","data-draggable":"true"}).append('<div class="row mb-2 maxtop">'+
            '<div class="col-md-12">'+
                '<a href="#" class="text-dark">'+
                    '<div class="card shadow card-stats mb-4 mb-xl-0">'+
                        '<div class="card-body">'+
                            '<div class="row">'+
                                '<div class="col-md-10">'+
                                    '<span class="entity">'+name+'</span><br />'+
                                    '<span class="contact">'+contact+'</span><br />'+
                                    '<span class="text-success">$'+sale+'</span>'+
                                '</div>'+
                                '<div class="col-xs-2 mr-justify">'+
                                    '<i class="far fa-newspaper"></i>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
            '</a>'+
            '</div>'+
        '</div>')
        $($div).draggable();
        var id = task._id
        $div.attr("id",id)
            
        $("#dropbox").prepend($div);
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Prospecto creado correctamente');
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
// .directive('taskItems', [function() {
//     var $div = $("<div>", { "class": "draggable alwaysTop","data-draggable":"true"}).append('<div class="row mb-2 maxtop">'+
//     '<div class="col-md-12">'+
//         '<a href="#" class="text-dark">'+
//             '<div class="card shadow card-stats mb-4 mb-xl-0">'+
//                 '<div class="card-body">'+
//                     '<div class="row">'+
//                         '<div class="col-md-10">'+
//                             '<span class="entity">{{name}}</span><br />'+
//                             '<span class="contact">{{contact}}</span><br />'+
//                             '<span class="text-success">${{sale}}</span>'+
//                         '</div>'+
//                         '<div class="col-xs-2 mr-justify">'+
//                             '<i class="far fa-newspaper"></i>'+
//                         '</div>'+
//                     '</div>'+
//                 '</div>'+
//             '</div>'+
//     '</a>'+
//     '</div>'+
// '</div>')
//  $($div).draggable();
//     return {
//       restrict: 'E',
//       template:$div
//     };
//   }]);