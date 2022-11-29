(function() {
  'use strict';

  angular.module('MenuApp')
      .controller('ItemController', ItemController);

  // 'item' is injected through state's resolve
  ItemController.$inject = ['items']

  function ItemController(items) {
      var iCtrl = this;
      iCtrl.category = items.category;
      iCtrl.menu_items = items.menu_items;
  }

})();