'use strict';

angular.module('webApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/LeagueOfLegend/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/champion', {
        templateUrl: 'modules/LeagueOfLegend/champion/champion.html',
        controller: 'ChampionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
