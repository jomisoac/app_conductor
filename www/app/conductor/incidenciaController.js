(function () {
    'use strict';

    angular
        .module('conductor')
        .controller('IncidenciaCtrl', IncidenciaCtrl);

    function IncidenciaCtrl($scope, $location, $ionicPopup, $ionicLoading, $window, $filter, IncidenciaService) {

        var idConductor;

        $scope.$on('$ionicView.enter', function () {
            $scope.incidencia = {};
            idConductor = $window.localStorage['idConductor'];
        });

        $scope.registarIncidencia = function () {
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