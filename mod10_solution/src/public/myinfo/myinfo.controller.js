(function () {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserInfoStorageService', 'MenuService'];
function MyInfoController(UserInfoStorageService, MenuService) {
  var myin = this;
  myin.userInfo = UserInfoStorageService.getUserInfo();
  myin.hasData = myin.userInfo ? true : false ;
  if (myin.userInfo) {
    MenuService.getOneMenuItem(myin.userInfo.dish)
    .then(function (menuItemInfo) {
        myin.menuItemInfo = menuItemInfo;
    });
  };
}

})();