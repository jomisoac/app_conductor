(function () {
    'use strict';

    angular
        .module('pasajeros')
        .controller('PasajerosCtrl', PasajerosCtrl);

    function PasajerosCtrl(api, $scope, $location, $ionicLoading, $rootScope, $window, PasajerosService, NotificacionService, SailsRequest) {

        $scope.$on('$ionicView.enter', function () {
            $scope.mostrarAdvertencia = false;
            $ionicLoading.show();
            $scope.listaPasajeros = [];
            getPasajeros();
        });
//&where={estado:a,coductor:'+sessionStorage.getItem('idConductor')+'}
        function getPasajeros(){
            SailsRequest({ 
                method: 'get', 
                url: api + "/solicitudes",
                
            },
             function (response) {
                 angular.forEach(response.data, function(solicitud){
                    if(solicitud.conductor == sessionStorage.getItem('idConductor') && solicitud.estado == 'a'){
                        solicitud.recogido = false;
                        $scope.listaPasajeros.push(solicitud);
                        $rootScope.listaPasajeros = $scope.listaPasajeros;
                    }
                 })
                 if ($scope.listaPasajeros.length == 0)
                    $scope.mostrarAdvertencia = true;
                else
                    $scope.mostrarAdvertencia = false;
                    $ionicLoading.hide();
            }, function(response){
                $ionicLoading.hide();
            });
        }

        $scope.volver = function () {
            $location.path("app/home");
        }

        $scope.recogerPasajeros = function (pasajero, $index) {
            console.log(pasajero)
            pasajero.indice = $index
            $rootScope.infoPasajeroEncomienda = pasajero;
            $rootScope.bandera = "pasajero";
            $location.path("ubicacion-pasajeros");
        }

    }

})();