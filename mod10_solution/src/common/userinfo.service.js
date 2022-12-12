(function () {
'use strict';

angular.module('common')
.service('UserInfoStorageService', UserInfoStorageService);

function UserInfoStorageService() {
    var service = this;
    service.userInfoStorage = NaN;

    service.getUserInfo = function () {
        return service.userInfoStorage;
    };

    service.saveUserInfo = function(userInfo) {
        service.userInfoStorage = userInfo;
    };
}
})();