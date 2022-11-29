(function() {
  'use strict';

  angular.module('data')
      .service('MenuDataService', MenuDataService)
      .constant("ApiBaseUrl", "https://coursera-jhu-default-rtdb.firebaseio.com/");

  MenuDataService.$inject = ['$http', "ApiBaseUrl"]

  function MenuDataService($http, ApiBaseUrl) {
      var service = this;

      service.getAllCategories = function() {
          return $http({
              method: "Get",
              url: (ApiBaseUrl + "categories.json")
          });
      };
      service.getItemsForCategory = function(categoryShortName) {
          return $http({
              method: "Get",
              url: (ApiBaseUrl + "menu_items/" + categoryShortName + ".json")
          });
      };
  }

})();