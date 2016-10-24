(function () {
    'use strict';

    angular
        .module('pagos')
        .controller('PagosCtrl', PagosCtrl);

    function PagosCtrl($scope, $location, $ionicPopup, $window, $ionicLoading, ConductorService) {

        $scope.$on('$ionicView.enter', function () {
            $ionicLoading.show();
            $scope.contrasena = {};
            $scope.mostrarAdvertencia = false;

            $scope.pagoAhorro = [];
            $scope.pagoSeguridadSocial = [];
            $scope.pension = [];
            $scope.totalPagos = 0;

            ConductorService.getPrestaciones(sessionStorage.getItem('idConductor')).then(
                function (respuesta) {
                    $ionicLoading.hide();

                    if (respuesta.data.data.length != 0) {
                        $scope.mostrarAdvertencia = true;
                        angular.forEach(respuesta.data.data, function (value, key) {
                            if (value.prestacion_id == 1) {
                                $scope.pagoAhorro.push(value);
                            } else if (value.prestacion_id == 2) {
                                $scope.pagoSeguridadSocial.push(value);
                            } else if (value.prestacion_id == 3) {
                                $scope.pension.push(value);
                            }
                            $scope.totalPagos += parseInt(value.valor);
                        });
                    } else {
                        $scope.mostrarAdvertencia = false;
                    }

                },
                function (error) {
                    $ionicLoading.hide();
                    console.log(error);
                }
            );

        });

        $scope.volver = function () {
            $location.path("app/configuracion");
        }

        function mostarAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
            alertPopup.then(function (res) {

            });
        }
    }
})();