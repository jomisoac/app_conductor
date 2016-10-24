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
                    $scope.conductor = respuesta.data;
                    //console.log(respuesta.data);
                    if (respuesta.data.estado === "No disponible" || respuesta.data.estado === "En ruta" || respuesta.data.estado == null) {
                        $scope.estado = "No disponible";
                        $scope.classButton = "button-assertive";
                    } else if (respuesta.data.estado === "Disponible") {
                        $scope.estado = "Disponible";
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
            if (opcion == "Encomiendas") {
                $location.path("/encomienda");
            }
            if (opcion == "Giros") {
                $location.path("/giro");
            }
        }

        $scope.cambiarEstado = function () {
            if ($scope.estado === "No disponible" || $scope.estado === "En ruta") {
                $scope.estado = "Disponible";
                $scope.classButton = "button-balanced";
            } else if ($scope.estado === "Disponible") {
                $scope.estado = "No disponible";
                $scope.classButton = "button-assertive";
            }
            $scope.conductor.estado = $scope.estado;
            ConductorService.update($scope.conductor).then(
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