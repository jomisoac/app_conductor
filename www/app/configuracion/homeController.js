(function () {
    'use strict';

    angular
        .module('configuracion')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, $ionicPopup, $location, $ionicHistory, ConductorService, $rootScope, $ionicPlatform, $window) {

        $scope.estado;
        $scope.classButton;
        $scope.conductor = {};

        $scope.$on('$ionicView.enter', function () {

            //$ionicLoading.show();
            var user = JSON.parse(sessionStorage.getItem('usuario'));
            ConductorService.getById(user.conductor.id).then(
                function (respuesta) {
                    $scope.conductor = respuesta.data.data;
                    //console.log(respuesta.data);
                    if (respuesta.data.data.estado === "no_disponible" || respuesta.data.estado === "en_ruta" || respuesta.data.data.estado == null) {
                        $scope.estado = "no_disponible";
                        $scope.classButton = "button-assertive";
                    } else if (respuesta.data.data.estado === "disponible") {
                        $scope.estado = "disponible";
                        $scope.classButton = "button-balanced";
                    }
                    //$ionicLoading.hide();
                }
                , function (error) {
                    //$ionicLoading.hide();
                }
            );
        });

        $scope.opcionMenu = function (opcion) {
            if (opcion == "Pasajeros") {
                $location.path("/pasajeros");
            }
        }

        $scope.cambiarEstado = function () {
            if ($scope.estado === "no_disponible" || $scope.estado === "en_ruta") {
                $scope.estado = "disponible";
                $scope.classButton = "button-balanced";
            } else if ($scope.estado === "disponible") {
                $scope.estado = "no_disponible";
                $scope.classButton = "button-assertive";
            }
            $scope.conductor.estado = $scope.estado;
            ConductorService.updateEstado($scope.conductor).then(
                function (respuesta) {
                }, function (error) {
                    mostarAlert("Estado", "Error al actualizar el estado");
                }
            );
        }


        function mostarAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
            alertPopup.then(function (res) {
                $scope.conductor = {};
            });
        }
    }

})();