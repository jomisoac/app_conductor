(function () {
    'use strict';

    angular
        .module('conductor')
        .controller('IncidenciaCtrl', IncidenciaCtrl);

    function IncidenciaCtrl($scope, $ionicPopup, $ionicLoading, IncidenciaService) {
        var vm = this;
        var idConductor;

        $scope.$on('$ionicView.enter', function () {
            vm.incidencia = {};
            idConductor = sessionStorage.getItem('idConductor')
        });

        vm.registarIncidencia = function () {
            $ionicLoading.show();

            IncidenciaService.registrarIncidencia(idConductor, vm.incidencia).then(
                function (respuesta) {
                    vm.incidencia = {};
                    $ionicLoading.hide();
                    mostarAlert("Registro de incidencias", "Incidencia registrada con exito");
                }, function (error) {
                    console.log("Error");
                    $ionicLoading.hide();
                    mostarAlert('Error!', 'Algo fallo al intentar hacer el reporte.');
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