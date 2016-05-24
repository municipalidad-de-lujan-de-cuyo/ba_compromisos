"use strict";angular.module("compromisosSiteApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","gridshore.c3js.chart"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/c01",{templateUrl:"views/c01.html",controller:"Compromiso01Ctrl",controllerAs:"c01"}).otherwise({redirectTo:"/"})}]).service("UrlService",function(){this.urls={home:"http://palamago.com.ar/api/?source_format=csv&source=https://goo.gl/Cid4QS"},this.getUrl=function(a){return this.urls[a]}}),angular.module("compromisosSiteApp").controller("MainCtrl",function(){}),angular.module("compromisosSiteApp").controller("HomeCtrl",["$scope","$timeout","$http","UrlService",function(a,b,c,d){function e(a){for(var b=0,c=0;c<t.length;c++){var d=t[c],e=parseInt(a.porcentaje_completado);if(e>=d.from&&e<d.to){b=c;break}}return a.percentageGroup=b,b}function f(a){var b={"Protección e integración social":"social",Convivencia:"convivencia","Hábitat y movilidad":"movilidad","Ciudad inteligente y sustentable":"smart"};return b[a]}function g(){a.charts.date_chart=c3.generate({bindto:"#date_chart",data:{x:"x",columns:[["x","2016","2017","2018","2019"],["c1",90,0,140,200],["c2",1,22,33,44,55],["c3",1,22,33,44,55],["c4",1,22,33,44,55]],type:"bar",groups:[["c1","c2","c3","c4"]]},axis:{x:{type:"category"},y:{show:!1}},grid:{y:{lines:[{value:0}]}}})}function h(){a.charts.state_chart=c3.generate({bindto:"#state_chart",data:{x:"x",columns:[["x","0%","30%","50%","75%","100%"],["c1",1,1,2,4,2],["c2",1,1,2,5,3],["c3",1,1,0,2,2],["c4",1,1,3,2,1]],type:"bar",groups:[["c1","c2","c3","c4"]]},axis:{x:{type:"category"},y:{max:10,show:!1,padding:{top:0,bottom:0}}},grid:{y:{lines:[{value:0}]}}})}function i(){var b=$("#category_chart").parent().width(),c=d3.scale.category20b(),d=(d3.format(",d"),d3.layout.pack().sort(null).padding(1.5).size([b/1.25,b]).value(function(a){return parseInt(a.porcentaje_completado)}));a.charts.category_chart||(a.charts.category_chart={},a.charts.category_chart.svg=d3.select("#category_chart").append("svg").attr("class","bubble-container"));for(var e=a.charts.category_chart.svg,f={name:"categories",children:[]},g=0;g<a.categoriesGroup.length;g++){var h=a.categoriesGroup[g];f.children.push({name:h.key,children:h.values})}var i=e.datum(f).selectAll(".node").data(d.nodes).enter().append("g").attr("class",function(a){return a.children?"node":"leaf node"}).attr("transform",function(a){return"translate("+a.x+","+a.y+")"});i.append("title").text(function(a){return a.name+(a.children?"":": "+parseInt(a.porcentaje_completado))}),i.append("circle").style("fill",function(a){return c(a.value)}).attr("r",function(a){return a.r}),i.filter(function(a){return!a.children}).append("text").attr("dy",".3em").style({"text-anchor":"middle",fill:"white","font-family":"Helvetica Neue, Helvetica, Arial, san-serif","font-size":"12px"}).text(function(a){return a.titulo.substring(0,a.r/3)}),d3.select(self.frameElement).style("height",b+"px")}function j(){function b(){a.charts.menu_chart.svg.transition().duration(x).attr("width",v).attr("height",w),r.sendHeight()}function c(){v=$(window).width();Math.floor(v/q);y=0;var c=d(a.charts.menu_chart.items_group.selectAll("g.compromiso-item"),0);w=c*q,b(),j([])}function d(a,b){var c=Math.floor((v-y)/q),d=0,e=0,f=(v-y-c*q)/2;return a.transition().duration(x).attr("transform",function(g,h){var i=d*q+f+y,j=e*q+b;return c-1>d?d++:a[0].length!=h+1&&(d=0,e++),"translate("+i+","+j+")"}),e+1}function g(){v=$(window).width();var c=0;y=v/3;var e=[];angular.forEach(a.finishedPercentageGroup,function(b){e.push({title:t[b.key].from+"% - "+t[b.key].to+"%",rows:c}),c+=d(a.charts.menu_chart.items_group.selectAll("g.avance-"+b.key),c*q)}),w=c*q,b(),j(e)}function h(){v=$(window).width();var c=0;y=v/3;var e=[];angular.forEach(a.categoriesGroup,function(b){e.push({title:b.key,rows:c}),c+=d(a.charts.menu_chart.items_group.selectAll("g.categoria-"+f(b.key)),c*q)}),w=c*q,b(),j(e)}function i(){v=$(window).width();var c=0;y=v/3;var e=[];angular.forEach(a.finishedYearsGroup,function(b){e.push({title:b.key,rows:c}),c+=d(a.charts.menu_chart.items_group.selectAll("g.cumplimiento-"+b.key),c*q)}),w=c*q,b(),j(e)}function j(b){var c=a.charts.menu_chart.labels_group.selectAll(".label-group").data(b);c.enter().append("text").classed("label-group",!0).attr("text-anchor","end").attr("opacity",0),c.classed("label-group",!0).text(function(a){return a.title}).transition().delay(x).attr("opacity",1).attr("x",y).attr("y",function(a){return a.rows*q+q/2}),c.exit().attr("opacity",0).remove()}function m(){var b={width:q,height:q/3};d3plus.textwrap().config(b),a.charts.menu_chart.items_group.selectAll("g.compromiso-item").data(z).enter().append("g").attr("class",function(a){var b=[];return b.push("cumplimiento-"+a.cumplimiento1),b.push("categoria-"+a.slug),b.push("categoria-unselected"),b.push("avance-"+e(a)),b.join(" ")}).classed("compromiso-item",!0).attr("id",function(a){return"c"+a.numero}).each(function(b){var c=d3.select(this);c.append("rect").classed("compromiso-frame",!0).attr("x",0).attr("y",0).attr("height",q).attr("width",q).attr("fill","white"),c.append("rect").classed("compromiso-label-shape",!0).classed("shape",!0).attr("x",s).attr("y",q/2).attr("height",q/2-s).attr("width",q-2*s).attr("fill","none"),c.append("text").classed("compromiso-label",!0).classed("wrap",!0).attr("id","c"+b.numero+"-text").attr("opacity",0).text(function(){return b.titulo}),c.append("g").classed("compromiso-icon",!0).attr("id",function(a){return"c"+a.numero+"-icon"}).attr("transform",function(a,b){var c=q/2-25,d=q/3-25;return"translate("+c+","+d+")"}).each(function(b){var c="images/building.813f237f.svg",d=this;d3.xml(c,"image/svg+xml",function(b,e){var f=document.importNode(e.documentElement,!0);f=$(f).attr("width",50).attr("height",50).get(0),a.iconsSvg[c]=f,d.appendChild(a.iconsSvg[c].cloneNode(!0))})}),c.append("rect").classed("compromiso-action",!0).attr("x",s).attr("y",s).attr("height",q-2*s).attr("width",q-2*s).attr("fill","transparent").on("mouseover",function(a){n(a.slug),k(a.numero)}).on("mouseout",function(a){o(),l()}).on("click",function(a){u(b)})}).transition().duration(0).attr("transform",function(a,b){var c=v/2-q/2,d=w/2-q/2;return"translate("+c+","+d+")"}).each("end",function(a){var b=d3.select("text#c"+a.numero+"-text");d3plus.textwrap().container(b).shape("square").align("center").valign("top").padding(3).draw(),b.transition().attr("opacity",1)})}function p(){m(),a.charts.menu_chart.api={group:function(a){switch(a){case"home":c();break;case"date":i();break;case"category":h();break;case"state":g()}}},setTimeout(function(){a.charts.menu_chart.api.group(a.selectedGroup)},1e3)}var q=150,s=5,v=$(window).width(),w=500,x=500,y=v/3,z=angular.copy(a.data);a.charts.menu_chart||(a.charts.menu_chart={},a.charts.menu_chart.svg=d3.select("#menu_chart").append("svg").attr("width",v).attr("height",w).attr("class","menu_chart"),a.charts.menu_chart.items_group=a.charts.menu_chart.svg.append("g").classed("items-container",!0),a.charts.menu_chart.labels_group=a.charts.menu_chart.svg.append("g").classed("labels-container",!0)),p()}function k(a){$(".compromiso-item").addClass("categoria-unselected"),$(".compromiso-item#c"+a).removeClass("categoria-unselected")}function l(){$(".compromiso-item").addClass("categoria-unselected")}function m(a){$(".compromiso-item").addClass("categoria-unselected"),$(".compromiso-item.categoria-"+a).removeClass("categoria-unselected")}function n(a){$(".c-option").removeClass("c-option-hover"),$('.c-option[data-slug="'+a+'"]').addClass("c-option-hover")}function o(){$(".c-option").removeClass("c-option-hover")}function p(a){$(".c-option").removeClass("c-option-selected"),$('.c-option[data-slug="'+a+'"]').addClass("c-option-selected")}function q(){$(".c-option").mouseover(function(){var a=$(this).data("slug");n(a),m(a)}).mouseout(function(){o()}).click(function(){p($(this).data("slug"))})}var r=new pym.Child;a.data=[],a.loading=!0,a.charts={},a.iconsSvg={},a.selectedGroup="home";var s=d.getUrl("home")+"&callback=JSON_CALLBACK";c.jsonp(s).success(function(b){a.data=b.map(function(a){return a.slug=f(a.categoria),a}),a.loading=!1,a.groupData(),a.renderCharts()}),a.groupData=function(){a.categoriesGroup=d3.nest().key(function(a){return a.categoria}).entries(a.data),a.availableCategories=[],angular.forEach(a.categoriesGroup,function(b){a.availableCategories.push(b.key)}),angular.forEach(a.categoriesGroup,function(a){a.finishedYearsGroup=d3.nest().key(function(a){return a.cumplimiento1}).rollup(function(a){return a.length}).entries(a.values)}),a.finishedYearsGroup=d3.nest().key(function(a){return a.cumplimiento1}).entries(a.data),angular.forEach(a.finishedYearsGroup,function(a){a.categoryGroup=d3.nest().key(function(a){return a.categoria}).rollup(function(a){return a.length}).entries(a.values)}),a.availableYears=[],angular.forEach(a.finishedYearsGroup,function(b){a.availableYears.push(b.key)}),a.finishedPercentageGroup=d3.nest().key(function(a){return e(a)}).entries(a.data),console.log(a.categoriesGroup),console.log(a.finishedYearsGroup),console.log(a.finishedPercentageGroup)};var t=[];t.push({from:0,to:25}),t.push({from:25,to:50}),t.push({from:50,to:75}),t.push({from:75,to:100}),a.renderCharts=function(){q(),g(),h(),i(),j(),r.sendHeight()};var u=function(b){b.porcentaje=Math.round(Math.floor(99*Math.random())+2),a.$apply(function(){a.currentCompromise=b})};a.groupMenu=function(b){a.selectedGroup=b,a.charts.menu_chart.api.group(a.selectedGroup)};var v;$(window).resize(function(){clearTimeout(v),v=setTimeout(function(){a.charts.menu_chart&&a.charts.menu_chart.api.group(a.selectedGroup),i()},500)})}]),angular.module("compromisosSiteApp").controller("Compromiso01Ctrl",function(){}),angular.module("compromisosSiteApp").run(["$templateCache",function(a){a.put("views/c01.html",'<div class="row"> <div class="col-md-12"> <h1>Compromiso 01</h1> </div> </div> <div class="row"> <div class="col-md-6"> <p> <c3chart bindto-id="gauge-plot1-chart"> <chart-column column-id="Data 1" column-values="70" column-type="gauge"> <chart-gauge min="50" max="75" units=" hours" width="39"> </c3chart> </p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> <div class="col-md-6"> <c3chart bindto-id="chart6"> <chart-legend show-legend="true" legend-position="right"> <chart-colors color-pattern="#1f77b4,#ffbb78,#2ca02c,#ff7f0e"> <chart-tooltip show-tooltip="true" group-tooltip="false"> <chart-column column-id="data 1" column-name="Data 1" column-color="red" column-values="30,200,100,400,150,250" column-type="spline"> <chart-column column-id="data 2" column-name="Data 2" column-color="green" column-values="50,20,10,40,15,25" column-type="line"> </c3chart> </div> </div>'),a.put("views/home.html",'<div class="row"> <div class="col-sm-3 c-option c-color-smart" data-slug="smart"> <h3 class="text-center">Ciudad inteligente y sustentable</h3> </div> <div class="col-sm-3 c-option c-option-short c-color-convivencia" data-slug="convivencia"> <h3 class="text-center">Convivencia</h3> </div> <div class="col-sm-3 c-option c-option-short c-color-movilidad" data-slug="movilidad"> <h3 class="text-center">Hábitat y movilidad</h3> </div> <div class="col-sm-3 c-option c-color-social" data-slug="social"> <h3 class="text-center">Protección e integración social</h3> </div> </div> <hr> <div class="row"> <div class="col-sm-4"> <div id="date_chart" ng-click="groupMenu(\'date\')"> <p class="text-center" ng-cloak ng-show="loading">Cargando...</p> </div> <p class="text-center">Ordenar por fecha de finalización</p> </div> <div class="col-sm-4"> <div id="state_chart" ng-click="groupMenu(\'state\')"> <p class="text-center" ng-cloak ng-show="loading">Cargando...</p> </div> <p class="text-center">Ordenar por estado del compromiso</p> </div> <div class="col-sm-4"> <div id="category_chart" ng-click="groupMenu(\'category\')"> <p class="text-center" ng-cloak ng-show="loading">Cargando...</p> </div> <p class="text-center">Ordenar por estado del compromiso</p> </div> </div> <hr> <p class="text-center" ng-show="loading">Cargando...</p> <div ng-cloak ng-hide="loading"> <div class="row"> <div id="menu_chart"></div> </div> <hr> <div class="row compromiso-detail" ng-cloak ng-show="currentCompromise"> <div class="col-sm-3"> <img src="http://wizardofodds.com/blog/images/buenos-aires/IMG_0471-med.jpg"> </div> <div class="col-sm-6"> <h2><small>{{currentCompromise.categoria}}</small></h2> <h2>{{currentCompromise.numero}}.{{currentCompromise.titulo}}</h2> <h5>{{currentCompromise.cumplimiento}}</h5> <p> {{currentCompromise.desc}}</p> <button type="button" class="btn btn-xs btn-violet upper">Ver mas sobre el compromiso </button> </div> <div class="col-sm-3"> <p class="upper"><strong> Estado del Compromiso</strong></p> <p> Como lo medimos:<strong>Cantidad de plazas</strong> </p> <p> Tiempo Faltante:<strong>18 meses y 12 dias </strong> </p> <div class=""> <div class="progress"> <div class="progress-bar progress-bar-violet" role="progressbar" ng-style="{ \'width\': currentCompromise.porcentaje + \'%\' }"> <span>{{currentCompromise.porcentaje}}% </span> </div> </div> </div> <p>Finalizacion:<strong> {{currentCompromise.FechaFinalizacion}} </strong> </p> </div> </div> </div>  <hr>'),a.put("views/main.html",'<div class="row"> <div class="col-md-4"> <h1>¡Hola, Buenos Aires!</h1> <p>Esta es la página de prueba para visualizar los compromisos de GCBA</p> <ul> <li><a class="btn btn-primary" href="#home">Home</a></li> <li><a class="btn btn-primary" href="#c01">Compromiso 01</a></li> <li>...</li> </ul> <p></p> </div> </div>')}]);