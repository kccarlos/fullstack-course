(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      console.log(response.data)
      return response.data;
    });
  };

  service.getOneMenuItem = function (menuNumber) {
    if (!menuNumber) {
      return Promise.resolve(null);
    };
    let letters = menuNumber.match(/^[A-Z]{1,2}/);
    let numbers = str.split(letters)[1];
    console.log('Letters', letters);
    console.log('Digits', numbers);
    let url = ApiPath + '/menu_items/' + letters + '/menu_items/' + numbers + '.json';
    console.log(url)
    return $http.get(url).then(function (response) {
      let menuItemInfo = response.data;
      if (menuItemInfo) {
        menuItemInfo.menuLetters = letters[0];
        menuItemInfo.menuNumbers = numbers;
      };
      return menuItemInfo;
    });
  };
}



})();
