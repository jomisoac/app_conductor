(function () {
    'use strict';

    angular
        .module('pasajeros')
        .controller('PasajerosCtrl', PasajerosCtrl);

    function PasajerosCtrl($sails, api, $scope, $location, $ionicLoading, $rootScope, $window, PasajerosService, NotificacionService, SailsRequest) {

        $rootScope.listaPasajeros = JSON.parse(sessionStorage.getItem('pasajeros')) || [];


        $scope.$on('$ionicView.enter', function () {
            $ionicLoading.show();
            if ($rootScope.listaPasajeros.length == 0)
                $rootScope.mostrarAdvertencia = true;
            else
                $rootScope.mostrarAdvertencia = false;
            $ionicLoading.hide();
        });


        $sails.on('newPasajero', function(response){
            if(!$scope.$$phase) {
                $scope.$apply(function () {
                    $rootScope.listaPasajeros = JSON.parse(sessionStorage.getItem('pasajeros'))
                    $rootScope.mostrarAdvertencia = false;
                });
            }
        });

//&where={estado:a,coductor:'+sessionStorage.getItem('idConductor')+'}
        function getPasajeros(){
            /*SailsRequest({
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
            });*/
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