
var app  = angular.module('starter', ['ionic','ngCordova','starter.controllers','angular-jwt','ion-floating-menu'])
    .run(
        function($ionicPlatform,$window, $cordovaPush, $cordovaDevice,$timeout,$rootScope,
                  $location,jwtHelper,$http)     {
        $window.localStorage['usuario'] = null;
        $window.localStorage['uri'] = 'http://dev.viajaseguro.co/public';
        //$window.localStorage['uri'] = 'http://localhost/viaja_seguro/public'
        $ionicPlatform.ready(function() {
        
            window.addEventListener("orientationchange", function() {
                if(window.orientation == 0){
                    $rootScope.orientacionVertical = true;
                    $rootScope.orientacionHorizontal = false;
                }
                else if(window.orientation == 90 || window.orientation == -90){
                    $rootScope.orientacionHorizontal = true;
                    $rootScope.orientacionVertical = false;
                }else{
                    $rootScope.orientacionVertical = true;
                    $rootScope.orientacionHorizontal = false;
                }
            }, false);
            
            
            var posOptions = {timeout: 2000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(
                    function (position) {
                        var lat  = position.coords.latitude
                        var long = position.coords.longitude
                    }, function(err) {
                        alert("Por favor encender GPS del equipo");
                    }
            );
            
            setInterval(function(){
                var jwt = $window.localStorage['token'];
                if(jwt){
                    if(jwtHelper.isTokenExpired(jwt)){
                        console.log("Expiro");
                        $http({
                            url : $window.localStorage['uri']+'/api/new_token',
                            skipAuthorization : true,
                            method: 'GET',
                            headers : { Authorization : 'Bearer '+ jwt}
                        }).then(
                            function(response){
                                $window.localStorage['token'] = response.data.token;
                            },
                            function(response){
                            }
                        );
                    }else{
                        console.log("No ha expirado");
                    }
                }
            },10000);
            
            var config = null;
            
            if (ionic.Platform.isAndroid()) {
                config = {
                    "senderID": "984044898845"
                };
            }else if (ionic.Platform.isIOS()) {
                config = {
                    "badge": "true",
                    "sound": "true",
                    "alert": "true"
                };
            }
            
            $cordovaPush.register(config).then(function (result) { 
                if (ionic.Platform.isIOS()) {}
                
                }, function (err) {
                    //alert("Register error " + err)
            });
            
            $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                switch(notification.event) {
                    case 'registered':
                      if (notification.regid.length > 0 ) {
                        //alert('registration ID = ' + notification.regid);
                        $window.localStorage['regid'] = notification.regid;
                      }
                      break;

                    case 'message':
                      if(notification.payload.tipo == "Pasajeros"){
                          //alert(notification.payload.message);
                         $location.path("/pasajeros");  
                       }else if(notification.payload.tipo == "Paquetes"){
                           //alert(notification.payload.message);
                         $location.path("/encomienda");  
                       }else if(notification.payload.tipo == "Giros"){
                           //alert(notification.payload.message);
                         $location.path("/giro");  
                       }else if(notification.payload.tipo == "Desepacho"){
                           //alert(notification.payload.message);
                       }else if(notification.payload.tipo == "Actualizacion turno"){
                           //alert(notification.payload.message);
                           $window.localStorage['idRuta'] = notification.payload.datos;
                       }
                       
                      break;

                    case 'error':
                      alert('GCM error = ' + notification.msg);
                      break;

                    default:
                      alert('An unknown GCM event has occurred');
                      break;
                }  
            });    
            
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
        // Enable cross domain calls
        //$httpProvider.defaults.useXDomain = true;
        
        // Remove the header used to identify ajax call  that would prevent CORS from working
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
        $ionicConfigProvider.navBar.alignTitle('center')
        $stateProvider

        .state('login',{
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .state('registrar', {
            url: '/registrar',
            templateUrl: 'templates/registrar-conductor.html',
            controller: 'ConductorCtrl'
        })
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
        })
        .state('pasajeros', {
            url: '/pasajeros',
            templateUrl: 'templates/pasajeros.html',
            controller: 'PasajerosCtrl'
        })
        .state('ubicacion-pasajeros', {
            url: '/ubicacion-pasajeros',
            templateUrl: 'templates/ubicacion-pasajeros.html',
            controller: 'UbicacionPasajeroCtrl'
        })
        .state('encomienda', {
            url: '/encomienda',
            templateUrl: 'templates/paquetes.html',
            controller: 'EncomiendaCtrl'
        })
         .state('giro', {
            url: '/giro',
            templateUrl: 'templates/giros.html',
            controller: 'GiroCtrl'
        })
        .state('app.registrarVehiculo', {
            url: '/registrar-vehiculo',
            views: {
                'menuContent': {
                    controller: 'VehiculoCtrl',
                    templateUrl: 'templates/registrar-vehiculo.html'
                }
            }
        })
        .state('app.documentosVehiculo', {
            url: '/documentos-vehiculo',
            views: {
                'menuContent': {
                    controller: 'VehiculoCtrl',
                    templateUrl: 'templates/documentacion-vehiculo.html'
                }
            }
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/principal.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.gremioConductores', {
            url: '/gremio-conductores',
            views: {
                'menuContent': {
                    controller: 'GremioCtrl',
                    templateUrl: 'templates/gremio-conductores.html',
                }
            }
          })
        .state('app.reportarAusencia', {
            url: '/reportar-ausencia',
            views: {
                'menuContent': {
                    controller: 'IncidenciaCtrl',
                    templateUrl: 'templates/reportar-ausencia.html',
                }
            }
          })
        .state('app.configuracion', {
            url: '/configuracion',
            views: {
                'menuContent': {
                    //controller: 'HomeCtrl',
                    templateUrl: 'templates/configuracion.html',
                }
            }
          })
        
        .state('cambiar-contrasena', {
            url: '/cambiar-contrasena',
            templateUrl: 'templates/cambiar-contrasena.html',
            controller: 'ContrasenaCtrl'
        })
        
        .state('imagen-conductor', {
            url: '/imagen-conductor',
            templateUrl: 'templates/imagen-conductor.html',
            controller: 'ImagenCtrl'
        })
        
        .state('imagen-vehiculo', {
            url: '/imagen-vehiculo',
            templateUrl: 'templates/imagen-vehiculo.html',
            controller: 'ImagenCtrl'
        })
        
        .state('pagos-realizados', {
            url: '/pagos-realizados',
            templateUrl: 'templates/pagos-realizados.html',
            controller: 'PagosCtrl'
        })
        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
        
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });