'use strict';

angular.module('webApp')
  .controller('MainCtrl', function ($scope) {
    $scope.selectMode = function() {
    	console.log('select');
    }
  });
