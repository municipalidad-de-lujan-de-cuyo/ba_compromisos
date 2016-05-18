'use strict';

/**
 * @ngdoc overview
 * @name compromisosSiteApp
 * @description
 * # compromisosSiteApp
 *
 * Main module of the application.
 */
angular
  .module('compromisosSiteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'gridshore.c3js.chart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/c01', {
        templateUrl: 'views/c01.html',
        controller: 'Compromiso01Ctrl',
        controllerAs: 'c01'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('UrlService', function () {
      this.urls = {
        //Datos Prod CSV
        //'home': 'http://palamago.com.ar/api/?source_format=csv&source=https://goo.gl/NZ8vyv'
        // Datos Ejemplo CSV
        'home': 'http://palamago.com.ar/api/?source_format=csv&source=https://goo.gl/2Mgc1v'
      };
      this.getUrl = function(page) {
          return this.urls[page];
      };
  });

