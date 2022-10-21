(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .filter('money', moneyFilterFactory);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var tobuy = this;
        tobuy.items = ShoppingListCheckOffService.getToBuyItems();
        tobuy.buyItem = function (itemIndex){
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'moneyFilter'];
    function AlreadyBoughtController(ShoppingListCheckOffService, moneyFilter) {
        var bought = this;
        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // Initialize two arrays for storing tobuy / bought items
        var toBuyItems = [
            { name: "cookie A", quantity: 10, pricePerItem: 1 },
            { name: "cookie B", quantity: 20, pricePerItem: 2 },
            { name: "cookie C", quantity: 30, pricePerItem: 3 },
            { name: "cookie D", quantity: 40, pricePerItem: 4 },
            { name: "cookie E", quantity: 50, pricePerItem: 5 }
        ];
        var boughtItems = [];

        // Buy Item: remove a item from toBoughtItems and add it to boughtItems
        service.buyItem = function (itemIndex) {
            var item = toBuyItems[itemIndex];
            boughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };

        // Getter functions for two arrays
        service.getToBuyItems = function () {
            return toBuyItems;
        };
        service.getBoughtItems = function () {
            return boughtItems;
        };

    }

    // filter to add $$$ before the price
    function moneyFilterFactory() {
        return function (input) {
            input = input || "0"
            input = '$$$' + input.toString();
            return input;
        }
    }

})();