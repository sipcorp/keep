'use strict';
app.controller('userController', ['$scope', 'Dataservice', function ($scope, Dataservice) {
  /*################################################### */
  //                GLOBAL VAR ANGULAR JS 
  /*################################################### */
  $scope.newUser = false;
  $scope.listUser = true;
  $scope.seeNewUser = function () {
    $scope.newUser = true;
    $scope.listUser = false;
  }
  $scope.hideNewUser = function () {
    $scope.newUser = false;
    $scope.listUser = true;
  }
  /*######################################################## */
  //                   SET DATA OF FORM 
  /*######################################################## */
  $scope.setRole = function (role) {
    document.getElementById('roleSelected').value = role.change;
  }

  $scope.setGender = function (op) {
    switch (op) {
      case '1':
        document.getElementById("accountGender").value = "male";
        break;
      case '2':
        document.getElementById("accountGender").value = "female";
        break;
      default:
        break;
    }
  }

  $scope.getDataUser = function () {
    var dataUsers = $("#createUsers").serializeArray();
    var obj = new Object();
    for (const i in dataUsers) {
      obj[dataUsers[i].name] = dataUsers[i].value;
    }
    console.log(obj)
    $("#createUsers")[0].reset();
    $("#accountPrefix").val(rand_code(2, 5, ""))
    $scope.addNewUsers(obj)
  }

  /*######################################################## */
  //             API  ADD NEW USERS
  /*######################################################## */
  $scope.addNewUsers = function (obj) {
    $.ajax({
      type: "POST",
      url: UrlAddUsers,
      timeout: 2000,
      data: obj,
      success: function (data) {
        console.log(data);
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Guardo correctamente el Ususario');
      },
      error: function (textStatus, err) {
        alert("text status " + textStatus + ", err " + err);
      }
    });
  }


  /*######################################################## */
  //         SERVICE LOAD MODULES AND ROLES OF USERS 
  /*######################################################## */
  function getRole() {
    Dataservice.GetRoles().then(function (response) {
      $scope.roles = response.data.role;
    }, function myError(response) {
      $scope.modules = [];
    });
  }

  $scope.modalGetInfo = function (fullName,userCode,email,role,direction,tel,gender,cargo){
    $("#responsive").modal("show");
    $scope.fullName = fullName;
    $scope.userCode = userCode;
    $scope.email = email;
    $scope.role = role;
    $scope.direction = direction;
    $scope.tel = tel;
    $scope.gender = gender;
    $scope.cargo = cargo;
  }
function getUsersService (){
   Dataservice.getUsers().then(function (response) {
      $scope.users = response.data.user;
      console.log($scope.users);
    }, function myError(response) {
      $scope.modules = [];
    });
}
   
  
  getRole()
  getUsersService ()
  

}]);