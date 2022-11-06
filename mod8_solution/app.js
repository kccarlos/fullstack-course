(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
        .constant("ApiBaseUrl", "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
    function NarrowItDownController(MenuSearchService, $scope) {
        var narrowDown = this;
        narrowDown.searchTerm = '';
        narrowDown.narrow = function () {
            var promise = MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm);
            promise.then(function (result) {
                    narrowDown.found = result;
                });
        };
        narrowDown.onRemove = function(index) {
            narrowDown.found.splice(index, 1);
        };
    };

    MenuSearchService.$inject = ['$http', "ApiBaseUrl"]
    function MenuSearchService($http, ApiBaseUrl) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                        method: "Get",
                        url: (ApiBaseUrl + "/menu_items.json")
            }
            ).then(function (result) {
                var foundItems = [];
                result.data['menu_items'].forEach((x, i) => {
                    if (x['description'].toLowerCase().includes(searchTerm.trim().toLowerCase())) {
                        foundItems.push(x)
                    };
                });
                return (searchTerm == '') ? -1 : foundItems;
            });
        };
    }

    function FoundItems(){
        var ddo = {
            restrict: 'E',
            templateUrl: "itemList.html",
            scope: {
                found: '<',
                removeItem: '&onRemove',
            },
            controller: 'FoundItemsDirectiveController as itemsFound',
            bindToController: true
        }
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var foundItems = this;
        foundItems.isEmpty = function() {
            return (foundItems.found && foundItems.found.length == 0)
        };
        foundItems.searchTermIsEmpty = function() {
            return (foundItems.found == -1)
        }
    }
})();
