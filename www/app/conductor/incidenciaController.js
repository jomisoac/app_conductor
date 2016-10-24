(function () {
    'use strict';

    angular
        .module('conductor')
        .controller('IncidenciaCtrl', IncidenciaCtrl);

    function IncidenciaCtrl($scope, $ionicPopup, $ionicLoading, $filter, IncidenciaService) {
        var vm = this;
        var idConductor;

        $scope.$on('$ionicView.enter', function () {
            vm.incidencia = {};
            idConductor = sessionStorage.getItem('idConductor')
        });

        vm.registarIncidencia = function () {
            $ionicLoading.show();

            IncidenciaService.registrarAusencia(idConductor).then(
                function (respuesta) {
                    $ionicLoading.hide();
                    mostarAlert("Registro de incidencias", "Incidencia registrada con exito");
                }, function (error) {
                    console.log("Error");
                    $ionicLoading.hide();
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