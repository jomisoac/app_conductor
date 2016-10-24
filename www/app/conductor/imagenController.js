(function () {
    'use strict';

    angular
        .module('conductor')
        .controller('ImagenCtrl', ImagenCtrl);

    function ImagenCtrl($scope, $location, $ionicPopup, $ionicLoading, ImagenService, VehiculoService,
                        $cordovaCamera, $cordovaFileTransfer, api) {

        var idConductor;
        var idVehiculo;
        var data;

        $scope.selectedImage = {};
        $scope.imageModel = {};

        $scope.$on('$ionicView.enter', function () {

            $scope.selectedImage = "img/cliente.png";

            idConductor = sessionStorage.getItem('idConductor');

            VehiculoService.getById(idConductor).then(
                function (respuesta) {
                    idVehiculo = respuesta.data.data[0].vehiculo.id;
                }, function (error) {
                    $ionicLoading.hide();
                    mostarAlert("Error", "Error al consultar la información, intente más tarde");
                }
            );
        });

        $scope.volver = function () {
            $location.path("app/configuracion");
        }

        $scope.getFoto = function (source) { // CAMERA-PHOTOLIBRARY
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URL,
                sourceType: Camera.PictureSourceType[source]
            };
            $cordovaCamera.getPicture(options).then(
                function (imageData) {
                    $scope.selectedImage = imageData;
                    $ionicLoading.show({template: '...', duration: 500});
                },
                function (err) {
                    $ionicLoading.show({template: 'Error ...', duration: 500});
                })
        }

        $scope.enviarImagen = function (resource) {

            if (resource == 'conductor') {
                var urlServidor = api + '/conductores/' + idConductor + '/imagen';
            } else {
                var urlServidor = api + '/vehiculos/' + idVehiculo + '/imagen';
            }
            var options = {
                fileKey: "imagen",
                fileName: "conductor" + idConductor,
                chunkedMode: false,
                mimeType: "image/jpg",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            $cordovaFileTransfer.upload(urlServidor, $scope.selectedImage, options).then(function (result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                $ionicLoading.hide();
                alert("Foto Actualizada");
            }, function (err) {
                console.log("ERROR: " + JSON.stringify(err));
                $ionicLoading.hide();
                alert("Ha ocurrido un error");
            }, function (progress) {
                $ionicLoading.show({
                    template: Math.floor((progress.loaded / progress.total) * 100) + '%'
                });
            });

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