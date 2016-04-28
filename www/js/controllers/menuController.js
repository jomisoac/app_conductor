app.controller('MenuCtrl',function($scope,$ionicPopup,$rootScope,$window,ConductorService,$location,$timeout,$ionicLoading,$ionicHistory,$ionicPlatform,$cordovaGeolocation,GeolocalizacionService, socketCh){
    
    $scope.orientacionVertical = true;
    $scope.orientacionHorizontal;
        
     
    $ionicPlatform.ready(function() {
        cordova.plugins.backgroundMode.setDefaults({
            title:  'Viaja Seguro',
            text:   'Enviando su ubicación.'
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
                                    lat: lat,
                                    lng: long,
                                    ruta_id: $window.localStorage['idRuta']
                                };
                                if(posicion.conductor_id){
                                    socketCh.emit("posConductor", posicion);
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
                                    lat: lat,
                                    lng: long,
                                    ruta_id: $window.localStorage['idRuta']
                                };
                                if(posicion.conductor_id){
                                    socketCh.emit("posConductor", posicion);
                                }

                            }, function(err) {
                                console.log(err);
                        });
                }, 3000);
            }


        window.addEventListener("orientationchange", function() {
            if(window.orientation == 0){
                $scope.orientacionVertical = true;
                $scope.orientacionHorizontal = false;
            }
            else if(window.orientation == 90 || window.orientation == -90){
                $scope.orientacionHorizontal = true;
                $scope.orientacionVertical = false;
            }
        }, false);
    });
    
    
    $scope.$on('$ionicView.enter',function(){
        
        if(window.orientation == 0){
            $scope.orientacionVertical = true;
            $scope.orientacionHorizontal = false;
        }
        else if(window.orientation == 90 || window.orientation == -90){
            $scope.orientacionHorizontal = true;
            $scope.orientacionVertical = false;
        }
        
        $ionicLoading.show();
        $rootScope.placa;
        $rootScope.gremio;
        $scope.conductor;
        var conductorId = JSON.parse($window.localStorage['conductor']);
        ConductorService.getById(conductorId.usuario.nombre).then(
            function(respuesta){
                $scope.conductor = respuesta.data;
                $window.localStorage['idUsuario'] = $scope.conductor.usuario_id;
                $window.localStorage['idGremio'] = $scope.conductor.empresa_id;
                $rootScope.placa = $scope.conductor.id;
                $window.localStorage['idConductor'] = $scope.conductor.id;
                $ionicLoading.hide();
                ConductorService.updateRegId($scope.conductor.id, $window.localStorage['regid']);
                socketCh.connect();
            }
            ,function(error){
                $ionicLoading.hide();
            }
        );
    });

    socketCh.on('connect', function () {
        alert('conectado a websocket')
    })
        
    $scope.logout = function(){
        $location.path("/login");
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
