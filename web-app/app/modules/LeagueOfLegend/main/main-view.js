'use strict';

angular.module('webApp')
  .directive('mainView', function () {
    return {
      restrict: 'AE',
      templateUrl: 'modules/LeagueOfLegend/main/main-view.html',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
