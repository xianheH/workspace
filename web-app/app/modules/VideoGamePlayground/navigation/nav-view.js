'use strict';

angular.module('webApp')
  .directive('navView', function () {
    return {
      restrict: 'AE',
      templateUrl: 'modules/VideoGamePlayground/navigation/nav-view.html',
      controller: 'NavCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
