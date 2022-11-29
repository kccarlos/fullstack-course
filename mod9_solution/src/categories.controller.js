(function() {
  'use strict';

  angular.module('MenuApp')
      .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories'];

  function CategoriesController(categories) {
      var cCtrl = this;
      cCtrl.categories = categories.data;
  }

})();