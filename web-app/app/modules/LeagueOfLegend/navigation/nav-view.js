'use strict';

angular.module('webApp')
  .directive('navView', function () {
    return {
      restrict: 'AE',
      templateUrl: 'modules/LeagueOfLegend/navigation/nav-view.html',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
