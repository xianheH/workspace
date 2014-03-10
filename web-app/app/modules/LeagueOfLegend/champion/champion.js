'use strict';

angular.module('webApp')
  .controller('ChampionCtrl', function ($scope, $http) {

  	$scope.championPhoto = ['Aatrox',
  		'Ahri',
  		'Akali',
  		'Alistar',
  		'Amumu',
  		'Anivia',
  		'Annie',
  		'Ashe',
  		'Blitzcrank',
  		'Brand',
  		'Caitlyn',
  		'Cassiopeia',
  		'Chogath',
  		'Corki',
  		'Darius',
  		'Diana',
  		'Draven',
  		'DrMundo',
  		'Elise',
  		'Evelynn',
  		'Ezreal',
  		'Fiddlesticks',
  		'Fiora',
  		'Fizz',
  		'Galio',
  		'Gangplank',
  		'Garen',
  		'Gragas',
  		'Graves',
  		'Hecarim',
  		'Heimerdinger',
  		'Irelia',
  		'Janna',
  		'JarvanIV',
  		'Jax',
  		'Jayce',
  		'Jinx',
  		'Karma',
  		'Karthus',
  		'Kassadin',
  		'Katarina',
  		'Kayle',
  		'Kennen',
  		'Khazix',
  		'KogMaw',
  		'Leblanc',
  		'LeeSin',
  		'Leona',
  		'Lucian',
  		'Lulu',
  		'Lux',
  		'Malphite',
  		'Malzahar',
  		'Maokai',
  		'MasterYi'
  		];

  	$scope.championInfo = function(champion) {
    	console.log(champion);
    }

  	var apiKey = '6495f7f9-6099-4f9c-b586-d31242c8ef5c';
  	$http({method: 'GET', url: 'https://prod.api.pvp.net/api/lol/na/v1.1/champion?api_key=' + apiKey}).
    success(function(data, status, headers, config) {
    	$scope.stats = data;
    }).
    error(function(data, status, headers, config) {
    })
  });

