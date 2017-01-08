(function () {
    'use strict';

    angular
        .module('conductor')
        .controller('ImagenCtrl', ImagenCtrl);

    function ImagenCtrl($scope, $location, $ionicPopup, $ionicLoading, VehiculoService,
                        $cordovaCamera, $cordovaFileTransfer, api) {

        var idConductor;
        var idVehiculo;

        $scope.picturePath = '';
        $scope.imageModel = {};
        $scope.data = {"ImageURI": "Select Image"};

        $scope.$on('$ionicView.enter', function () {

            $scope.picData = "img/cliente.png";

            idConductor = sessionStorage.getItem('idConductor');
            idVehiculo = sessionStorage.getItem('idVehiculo');

            // VehiculoService.getById(idConductor).then(
            //     function (respuesta) {
            //         console.log(respuesta);
            //         idVehiculo = respuesta.data.data[0].vehiculo.id;
            //     }, function (error) {
            //         $ionicLoading.hide();
            //         mostarAlert("Error", "Error al consultar la información, intente más tarde");
            //     }
            // );
        });

        $scope.volver = function () {
            $location.path("app/configuracion");
        }

        $scope.tomarFoto = function () {
            $scope.picData = null;
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: false,
                allowEdit: true,
                correctOrientation: true
            });

            function onSuccess(imageURI) {
                $scope.picData = imageURI;
            }

            function onFail(message) {
                console.log(message);
                mostarAlert('Error!', 'No se pudo cargar la foto tomada, intentelo nuevamente.')
            }
        }

        $scope.selectedFoto = function () {
            $scope.picData = null;
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(
                function (imageData) {
                    $scope.picData = imageData;
                    $ionicLoading.show({template: '...', duration: 500});
                },
                function (err) {
                    $ionicLoading.show({template: 'Error ...', duration: 500});
                })
        };

        $scope.enviarImagen = function (resource) {
            $ionicLoading.show();
            var urlServidor = null;
            if (resource == 'conductor') {
                urlServidor = api + '/conductores/' + idConductor + '/imagen';
            } else {
                urlServidor = api + '/vehiculos/' + idVehiculo + '/imagen';
            }

            var options = {
                fileKey: "imagen",
                fileName: idConductor + Number(new Date()) + ".jpg",
                chunkedMode: false,
                mimeType: "image/png",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };

            $cordovaFileTransfer.upload(urlServidor, $scope.picData, options).then(function(result) {
                $ionicLoading.hide();
                mostarAlert('Exito', 'Se ha actualizado la imagen corecctamente.');
                console.log("SUCCESS: " + JSON.stringify(result));
            }, function(err) {
                $ionicLoading.hide();
                mostarAlert('Perdon', 'Ha ocurrido algun problema al almacenar la imagen, intentelo nuevamente.');
                console.log("ERROR: " + err);
            }, function (progress) {
                $ionicLoading.hide();
                // constant progress updates
            });
        };

        function mostarAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
            alertPopup.then(function (res) {

            });
        }
    }
})
();