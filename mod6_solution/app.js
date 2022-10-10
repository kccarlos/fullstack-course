(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.checker = function () {
            // initial color for input box border and message text
            $scope.bordercolor = "black";
            $scope.msgcolor = "black";

            // process user input, find and discard black spaces
            var quantity = $scope.items.split(",").map(item => item.trim()).filter(item => item);

            // display messages
            if (quantity.length == 0) {
                $scope.msg = "Please enter data first";
                $scope.msgcolor = "red";
                $scope.bordercolor = "red";
            } else if (quantity.length <= 3) {
                $scope.msg = "Enjoy!";
                $scope.msgcolor = "green";
                $scope.bordercolor = "green";
            } else {
                $scope.msg = "Too much!";
                $scope.msgcolor = "green";
                $scope.bordercolor = "green";
            }
        };
    }

})();