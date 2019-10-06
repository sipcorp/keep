'use strict'
app.factory("Dataservice", function ($http) {
  const getRole = "/get-role";
  const getUser= "/get-user";
  var Dataservice = {
    GetRoles: function () {
      return $http.get(getRole).then(function (data) {
        return data;
      });
    },
    getUsers: function () {
      return $http.get(getUser).then(function (data) {
        return data;
      });
    }
  }
  return Dataservice;
})