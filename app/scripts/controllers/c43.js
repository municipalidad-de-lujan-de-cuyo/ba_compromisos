'use strict';

/**
 * @ngdoc function
 * @name compromisosSiteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the compromisosSiteApp
 */
angular.module('compromisosSiteApp')
  .controller('Compromiso43Ctrl', function (UrlService,$rootScope, $scope, $http,SlugColorService,LoadSVGService) {

  	var url = UrlService.getUrlByPage('home');
    var pymChild = new pym.Child({ polling: 1000 });
    pymChild.sendHeight();
    var _ = window._;

    //para ir a otra url en el padre
    //pymChild.navigateParentTo('https://github.com/nprapps/pym.js');

    $scope.loading = true;

    $http.jsonp(url)
    .success(function(data){
      $scope.currentCompromise = $scope.data = _.find(data, function(d){ return parseInt(d.numero) === 43; });
      $scope.currentCompromise.porcentaje_completado = parseInt($scope.currentCompromise.porcentaje_completado);
      $scope.currentCompromise.color = SlugColorService.getColorBySlug($scope.currentCompromise.slug);
      $scope.currentCompromise.secondColor = '#bdbec2';
      $scope.loading = false;
      LoadSVGService.loadIcon($scope.currentCompromise.numero,function(iconLoaded){
        /*$(iconLoaded)
            .attr('width', 50)
            .attr('height', 50)
            .get(0);*/
        $('.icon-svg-container').html(iconLoaded.cloneNode(true));
      });
      //console.log($scope.currentCompromise);;
    });

    $scope.prepareData = function(data){
      _.each(data,function(d){
        d.mes_date = d.mes+'-01';
      });
      return data;
    };

    $scope.completeConfig = function(config){

      return angular.merge(config,{
        data:{
          types: {
            meta: 'area',
            avance : 'line'
          },
          keys: {
              value: ['meta', 'avance'],
              x: 'mes_date'
          },
          names: {
            avance: 'Estaciones de Ecobici',
            meta: 'Meta'
          },
          colors: {
                //'meta':$scope.currentCompromise.secondColor,
                'meta':'#ccc',
                'avance': $scope.currentCompromise.color
          }
        },
        size: {
            height: 300,
        },
        padding: {
            top: 0,
            right: 20,
            bottom: 10,
            left: 40,
        },
        axis: {
          x: {
              type: 'timeseries',
              show:true,
              tick: {
                  fit: true,
                  format: $rootScope.d3Locale_ES.timeFormat("%b-%y"),
                  count:6
              }
          },
          y: {
            show:true,
            min: -1,
          }
        },
        legend: {
            show: true
        }
      });
    };

    $scope.chartReady = function(chart){

    };


    //detalle 2
    var data2 = {};
    $scope.prepareData2 = function(data){
      _.each(data,function(d){
        d.mes_date = d.mes+'-01';
      });
      return data;
    };

    $scope.completeConfig2 = function(config){

      return angular.merge(config,{
        data:{
          types: {
            meta: 'area',
            avance : 'line'
          },
          keys: {
              value: ['meta', 'avance'],
              x: 'mes_date'
          },
          names: {
            avance: 'Ciclovías',
            meta: 'Meta'
          },
          colors: {
                //'meta':$scope.currentCompromise.secondColor,
                'meta':'#ccc',
                'avance': $scope.currentCompromise.color
          }
        },
        size: {
            height: 300,
        },
        padding: {
            top: 0,
            right: 20,
            bottom: 10,
            left: 40,
        },
        axis: {
          x: {
              type: 'timeseries',
              show:true,
              tick: {
                  fit: true,
                  format: $rootScope.d3Locale_ES.timeFormat("%b-%y"),
                  count:6
              }
          },
          y: {
            show:true,
            min: -1,
          }
        },
        legend: {
            show: true
        }
      });
    };

    $scope.chartReady2 = function(chart,id){

    };

    var id;
    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(function(){
          // if(chart1){
          //   createCustomChart1();
          // }
        }, 500);
    });


  });