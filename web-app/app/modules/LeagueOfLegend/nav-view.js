'use strict';

angular.module('webApp')
  .directive('navView', function () {
    return {
      templateUrl: 'modules/LeagueOfLegend/main.html',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
        element.text('this is the navView directive');
      }
    };
  });
