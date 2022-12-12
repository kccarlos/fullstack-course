(function () {
'use strict';

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserInfoStorageService'];
function SignUpController(MenuService, UserInfoStorageService) {
    var reg = this;
    reg.user = {};
    reg.dishNotExists = false;
    reg.completed = false;

    reg.checkDish = function (menuNumber) {
        return MenuService.getOneMenuItem(menuNumber)
        .then(function (data) {
            if (data){ 
                reg.dishNotExists = false;
            } else {
                reg.dishNotExists = true;
            };
            console.log(data)
            return data;
        });
    };

    reg.submit = function () {
        reg.checkDish(reg.user.dish).then( function(data){
            if (data) {
                UserInfoStorageService.saveUserInfo(reg.user);
                reg.completed = true;
            };
        });
    };
};

})();
