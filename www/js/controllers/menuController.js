app.controller('MenuCtrl',function($scope,$ionicPopup,$rootScope,$window,ConductorService,$location,$timeout,$ionicLoading,$ionicHistory,$ionicPlatform,$cordovaGeolocation,GeolocalizacionService){
    /*
    $ionicPlatform.ready(function() {
        cordova.plugins.backgroundMode.setDefaults({ 
            title:  'Viaja Seguro',
            text:   'Enviando ubicación.'
        });
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
        
        if(!cordova.plugins.backgroundMode.isActive()){
            setInterval(function () {
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                            .then(function (position) {
                                var lat  = position.coords.latitude
                                var long = position.coords.longitude
                                
                                var posicion = {
                                    conductor_id: $window.localStorage['idConductor'],
                                    latitud: lat,
                                    longitud: long
                                };
                                if(posicion.conductor_id){
                                    GeolocalizacionService.guardar(posicion).then(
                                        function(respuesta){
                                        },function(error){
                                        }
                                    );
                                }
                                
                            }, function(err) {
                                console.log(err);
                        });
                }, 3000);
        }
        // Called when background mode has been activated
        cordova.plugins.backgroundMode.onactivate = function () {
            // Set an interval of 3 seconds (3000 milliseconds)
            setInterval(function () {
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                            .then(function (position) {
                                var lat  = position.coords.latitude
                                var long = position.coords.longitude
                                
                                var posicion = {
                                    conductor_id: $window.localStorage['idConductor'],
                                    latitud: lat,
                                    longitud: long
                                };
                                if(posicion.conductor_id){
                                    GeolocalizacionService.guardar(posicion).then(
                                        function(respuesta){
                                        },function(error){
                                        }
                                    );
                                }
                                
                            }, function(err) {
                                console.log(err);
                        });
                }, 3000);
            }
    });
    */

    $scope.$on('$ionicView.enter',function(){
        
        $ionicLoading.show();
        $rootScope.placa;
        $rootScope.gremio;
        $scope.conductor;
        var conductorId = JSON.parse($window.localStorage['conductor']);
        ConductorService.getById(conductorId.usuario.nombre).then(
            function(respuesta){
                //console.log(respuesta.data);
                $scope.conductor = respuesta.data;
                $window.localStorage['idGremio'] = $scope.conductor.empresa_id;
                $rootScope.placa = $scope.conductor.id;
                $window.localStorage['idConductor'] = $scope.conductor.id;
                $ionicLoading.hide();
                ConductorService.updateRegId($scope.conductor.id, $window.localStorage['regid']);
            }
            ,function(error){
                $ionicLoading.hide();
            }
        );
    });
        
    $scope.logout = function(){
        GeolocalizacionService.dele
            conductor_id: $window.localStorage['idConductor'],
        GeolocalizacionService.guardar(posicion).then(
            function(respuesta){
                $window.localStorage.clear();
                $location.path("/login");
            },function(error){
            }
        );
    }
    
    function mostarAlert(titulo,contenido){
        var alertPopup = $ionicPopup.alert({
            title: titulo,
            template: contenido
        });
        alertPopup.then(function (res) {
            $scope.conductor = {};
        });
    }
});
