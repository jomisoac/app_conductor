(function () {
    'use strict';

    angular
        .module('configuracion')
        .controller('ContrasenaCtrl', ContrasenaCtrl);

    function ContrasenaCtrl($scope, $location, $ionicPopup, $window, $ionicLoading, ConductorService, GeolocalizacionService) {

        $scope.$on('$ionicView.enter', function () {
            $scope.contrasena = {};
            $scope.mostrarAdvertencia = false;
        });

        $scope.volver = function () {
            $location.path("app/configuracion");
        }

        $scope.cambiarContrasena = function () {
            if ($scope.contrasena.confirmarContrasena === $scope.contrasena.nueva) {
                $ionicLoading.show();
                $scope.contrasena.password = $scope.contrasena.nueva;
                ConductorService.updateContrasena(sessionStorage.getItem('idUsuario'), $scope.contrasena).then(
                    function (respuesta) {
                        $ionicLoading.hide();
                        mostarAlert("Cambio de Contraseña", "La contraseña fue cambiada exitosamente, por favor inicie sesión nuevamente");
                        cerrarSesion();
                    },
                    function (error) {
                        $ionicLoading.hide();
                        mostarAlert("Cambio de Contraseña", "Error al cambiar la contraseña, por favor intente nuevamente");
                    }
                );
            } else {
                $ionicLoading.hide();
                mostarAlert('Error!', 'Las contrase&ntilde;as no coinciden.')
            }
        }

        function cerrarSesion() {
            GeolocalizacionService.deletePosicion(sessionStorage.getItem('idConductor')).then(
                function (respuesta) {
                    $location.path("/login");
                }, function (error) {
                    mostarAlert("Cerrar Sesión", "Error al intentar cerrar sesión intente nuevamente");
                }
            );
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