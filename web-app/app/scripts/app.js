'use strict';

angular.module('webApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/LeagueOfLegend/main.html',
        controller: 'MainCtrl'
      })
      .when('/champion', {
        templateUrl: 'modules/LeagueOfLegend/champion.html',
        controller: 'ChampionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
