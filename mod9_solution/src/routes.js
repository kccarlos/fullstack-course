(function() {
  'use strict';

  angular.module('MenuApp')
      .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');

      // *** Set up UI states ***
      $stateProvider

          // Home Page
          .state('home', {
              url: '/',
              templateUrl: 'templates/home.html'
          })

          // Category Page
          .state('categories', {
              url: '/categories',
              templateUrl: 'templates/categories.html',
              controller: 'CategoriesController as cCtrl',
              resolve: {
                  categories: ['MenuDataService', function(MenuDataService) {
                      return MenuDataService.getAllCategories();
                  }]
              }
          })

          // Item Page
          .state('categories.items', {
              url: '/{itemShortName}',
              templateUrl: 'templates/items.html',
              controller: 'ItemController as iCtrl',
              resolve: {
                  items: ['$stateParams', 'MenuDataService',
                      function($stateParams, MenuDataService) {
                          return MenuDataService.getItemsForCategory($stateParams.itemShortName)
                              .then(function(itemsInCategories) {
                                  return itemsInCategories.data;
                              });
                      }
                  ]
              }
          });
  }

})();