(function () {
    'use strict';

    angular
        .module('perfil')
        .controller('PerfilCtrl', PerfilCtrl);

    function PerfilCtrl($scope, $location, $ionicLoading, ConductorService, $ionicPopup ) {
        var vm = this;
        vm.volver = volver;
        vm.RegistrarActualizar = RegistrarActualizar;
        vm.conductor = {};
        var informacionConductor;

        $scope.$on('$ionicView.enter', function () {
            $ionicLoading.show();
            ConductorService.getById(sessionStorage.getItem('idConductor')).then(success, error);
            function success(response) {
                if(response.data.data){
                    vm.conductor = response.data.data;
                    informacionConductor = true;
                }else{
                    informacionConductor = false;
                }
                $ionicLoading.hide();
            }
            function error(response) {
                console.log(response)
            }
        });

        function RegistrarActualizar() {
            $ionicLoading.show();
            if (informacionConductor) {
                ConductorService.actualizar(vm.conductor).then(
                    function (respuesta) {
                        if (respuesta.statusText == "OK") {
                            $ionicLoading.hide();
                            mostarAlert("Actualización datos", "Datos actualizados correctamente.");
                        }
                    }, function (error) {
                        $ionicLoading.hide();
                        mostarAlert("Actualización de datos", "Error al actualizar los datos, intentalo mas tarde");
                    }
                );
            } else {
                ConductorService.registrar(vm.conductor).then(
                    function (respuesta) {
                        if (respuesta.statusText == "OK") {
                            $ionicLoading.hide();
                            mostarAlert("Registro de datos", "Datos registrados correctamente.");
                        }
                    }, function (error) {
                        $ionicLoading.hide();
                        mostarAlert("Registro de datos", "Error al registrar los datos, intentalo más tarde");
                    }
                );
            }
        }

        function mostarAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
            alertPopup.then(function (res) {
            });
        }

        function volver() {
            $location.path("app/configuracion");
        }
    }
})();