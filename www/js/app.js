// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.navBar.alignTitle("center");

  $stateProvider
    .state('tab',{
      url: '/tab',
      abstract: true, //Con esto le decimos que no es una pagina, servira para hacer anidaciones de plantilla
      templateUrl: 'templates/tab.html'
    })
    .state('tab.home', { //La plantilla que se hereda y la plantilla en concreta
      url: '/home', // la ruta en concreta es /tab/home, esto lo hace autom el state
      views: {
        'tab-home' : {
          templateUrl : 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.coche', {
      url: '/coche',
      views: {
        'tab-coche' : {
          templateUrl : 'templates/coche.html',
          controller: 'CocheCtrl'
        }
      }
    })
    .state('tab.comunidad', {
      url: '/comunidad',
      views: {
        'tab-comunidad' : {
          templateUrl : 'templates/comunidad.html',
          controller: 'ComunidadCtrl'
        }
      }
    })
    .state('tab.user', {
      url: '/user/:id',
      views: {
        'tab-user' : {
          templateUrl : 'templates/user.html',
          controller: 'UserCtrl'
        }
      }
    })
    .state('tab.datos', {
      url: '/datos',
      views: {
        'tab-datos' : {
          templateUrl : 'templates/datos.html',
          controller: 'DatosCtrl'
        }
      }
    })
    .state('tab.info', {
      url: '/info',
      views: {
        'info' : {
          templateUrl : 'templates/info.html'
        }
      }
    })

    $urlRouterProvider.otherwise('/tab/home');
})

.controller('HomeCtrl', function($scope) {
  console.log("Home Ctrl");
})
.controller('CocheCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  
  $http.get('js/data.json').success(function(data) {
    //console.debug(data.detalles);
    $scope.detalles = data.detalles;
    $scope.data = {showReorder : false};
  });

  $scope.toggleDescription = function(item) {
    item.resumido = !item.resumido;
  }

  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.detalles.splice(fromIndex, 1); //Con 1 se borra un elemento del indice del objeto
    $scope.detalles.splice(toIndex, 0, item); //Con 0 no se borra ningun elemento, el tercer parametro lo agrega a dicha posición
  }

}])

.controller('ComunidadCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json').success(function(data) {
    $scope.usuarios = data.usuarios;
  });
}])

.controller('UserCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json').success(function(data) {
    $scope.data = data.usuarios[$state.params.id];
  });
}])

.controller('DatosCtrl', function($scope) {

  $scope.getPosicion = function(argument) {
    var form = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      form.posicion = position.coords.latitude + " -- " + position.coords.longitude;
    });
  }

  $scope.sendForm = function() {
    alert(this.nombre + " - " + this.apellidos);
  }

})