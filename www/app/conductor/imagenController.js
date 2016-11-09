(function () {
    'use strict';

    angular
        .module('conductor')
        .controller('ImagenCtrl', ImagenCtrl);

    function ImagenCtrl($scope, $location, $ionicPopup, $ionicLoading, ImagenService, VehiculoService,
                        $cordovaCamera, $cordovaFileTransfer, api) {

        var idConductor;
        var idVehiculo;

        $scope.picturePath = '';
        $scope.imageModel = {};
        $scope.data = {"ImageURI": "Select Image"};

        $scope.$on('$ionicView.enter', function () {

            $scope.picData = "img/cliente.png";

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

        $scope.tomarFoto = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                pictureSource: navigator.camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                allowEdit: true
            };
            navigator.camera.getPicture(onSuccess,onFail,options);
            // $cordovaCamera.getPicture(options).then(
            //     function (imageData) {
            //         $scope.picData = imageData;
            //         $scope.picturePath = imageData;
            //         window.resolveLocalFileSystemURL(imageData, copyFile, fail);
            //         $ionicLoading.show({template: '...', duration: 500});
            //     },
            //     function (err) {
            //         $ionicLoading.show({template: 'Error ...', duration: 500});
            //     })
        }
        var onSuccess = function(FILE_URI) {
            console.log(FILE_URI);
            $scope.picData = FILE_URI;
            $scope.$apply();
        };
        var onFail = function(e) {
            console.log("On fail " + e);
        }

        $scope.selectedFoto = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };
            $cordovaCamera.getPicture(options).then(
                function (imageData) {
                    $scope.picData = imageData;
                    $scope.picturePath = imageData;
                    $ionicLoading.show({template: '...', duration: 500});
                },
                function (err) {
                    $ionicLoading.show({template: 'Error ...', duration: 500});
                })
        };

        var onUploadSuccess = function () {
            mostarAlert('Exito', 'Imagen subida con exito')
        }

        var onUploadFail = function () {
            console.log('fallo subir la imagen')
        }

        $scope.enviarImagen = function (resource) {
            if (resource == 'conductor') {
                var urlServidor = api + '/conductores/' + idConductor + '/imagen';
            } else {
                var urlServidor = api + '/vehiculos/' + idVehiculo + '/imagen';
            }

            var myImg = $scope.picData;
            var options = new FileUploadOptions();
            options.fileKey="post";
            options.chunkedMode = false;
            var params = {};
            params.headers = {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
            options.params = params;
            var ft = new FileTransfer();
            ft.upload(myImg, encodeURI(urlServidor), onUploadSuccess, onUploadFail, options);

            //if the user took a photo
            // if ($scope.picturePath != '') {
            //
            //     //gets the image filename
            //     var fileName = $scope.picturePath.substr($scope.picturePath.lastIndexOf('/') + 1);
            //
            //     //debug
            //     console.log('filename: ' + fileName);
            //     console.log('cordova file:' + cordova.file.dataDirectory);
            //     console.log('picturePath: ' + $scope.picturePath);
            //     $scope.liveConsole = "preparando para enviar a foto";
            //
            //     //set the filepath
            //     var filePath = $scope.picturePath;
            //
            //     //additional parameters if need, just saving the code for later use
            //     var params = new Object();
            //     // params.headers = {
            //     //     'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            //     // }
            //
            //     //options
            //     var options = new FileUploadOptions();
            //     options.fileKey = "imagen";
            //     options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
            //     options.mimeType = "image/jpeg";
            //     params.headers = {
            //         'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            //     }
            //     options.params = params;
            //     options.chunkedMode = false;
            //
            //     //try uploading
            //     //debug
            //     console.log('enviando para: ' + encodeURI(urlServidor));
            //     $scope.liveConsole = "enviando";
            //
            //     //the action / the magic
            //     $cordovaFileTransfer.upload(encodeURI(urlServidor), filePath, options)
            //         .then(function (result) {
            //             uploadSucces(result);
            //         }, function (err) {
            //             uploadError(err);
            //         }, function (progress) {
            //             //updates the progressbar
            //             $scope.progressBar = (progress.loaded / progress.total) * 100;
            //         });
            //
            //     //if success
            //     var uploadSucces = function (result) {
            //         //will study this clearcache later
            //         //clearCache();
            //
            //         //reset retries
            //         $scope.retries = 0;
            //
            //         //debug
            //         console.log("Imagem enviada, retorno do server:" + JSON.stringify(result));
            //         console.log(result.response);
            //
            //         //return server message on console
            //         $scope.liveConsole = result.response.msg;
            //
            //         //put the image on the img tag to preview sent image
            //         $scope.lastImage = result.response.img_thumb;
            //     }
            //
            //     //if fail, try one more time
            //     var uploadError = function (error) {
            //
            //         //debug
            //         console.log('Erro:' + error);
            //
            //         if ($scope.retries == 0) {
            //             //debug
            //             $scope.liveConsole += "vou tentar mais uma vez";
            //
            //             //try one more time
            //             $scope.retries++;
            //             setTimeout(function () {
            //                 //debug
            //                 console.log('enviando para: ' + encodeURI(urlServidor));
            //                 $scope.liveConsole = "enviando";
            //
            //                 //the action / the magic
            //                 $cordovaFileTransfer.upload(encodeURI(urlServidor), filePath, options)
            //                     .then(function (result) {
            //                         uploadSucces(result);
            //                     }, function (err) {
            //                         uploadError(err);
            //                     }, function (progress) {
            //                         //updates the progressbar
            //                         $scope.progressBar = (progress.loaded / progress.total) * 100;
            //                     });
            //             }, 1000)
            //         } else {
            //
            //             //reset retries
            //             $scope.retries = 0;
            //
            //             //clearCache();
            //
            //             //debug
            //             $scope.liveConsole += "não deu certo mesmo";
            //         }
            //     }
            //
            // } else {
            //     //debug and show error message if no photo was taken
            //     $scope.liveConsole = "tire uma foto primeiro";
            //     console.log(JSON.stringify("tire uma foto primeiro"));
            // }


            // var options = {
            //     fileKey: "imagen",
            //     fileName: "conductor"+idConductor,
            //     chunkedMode: false,
            //     mimeType: "image/png",
            //     headers: {
            //         'Content-Type': undefined,
            //         'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            //     }
            // };
            // $cordovaFileTransfer.upload(urlServidor, $scope.picData, options).then(function(result) {
            //     console.log("SUCCESS: " + JSON.stringify(result.response));
            //     $ionicLoading.hide();
            //     alert("Foto Actualizada");
            // }, function(err) {
            //     console.log("ERROR: " + JSON.stringify(err));
            //     $ionicLoading.hide();
            //     alert("Ha ocurrido un error");
            // }, function (progress) {
            //     $ionicLoading.show({
            //         template: Math.floor((progress.loaded / progress.total) * 100)+'%'
            //     });
            // });
        };

        //copy the file to the location
        function copyFile(fileEntry) {
            //debug
            $scope.liveConsole = "Preparando para copiar para local seguro";
            console.log('resolvido, resultado: ' + fileEntry.fullPath);

            //make new file name
            var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
            var newName = makeid() + name;

            //resolve fileentry after copy the imagem to cordova.file.directory
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileSystem2) {
                fileEntry.copyTo(
                    fileSystem2,
                    newName,
                    onCopySuccess,
                    fail
                );
            }, fail);
        }

        //after copy success
        function onCopySuccess(entry) {

            //debug
            $scope.liveConsole = "Copiado para local seguro";
            console.log(" -- arquivo movido: " + entry.nativeURL + " -- ");

            //apply changes to #scope
            $scope.$apply(function () {

                //add the photo to images array
                // $scope.images.push(entry.nativeURL);

                //define last taken image as the one to send
                /*
                 TO DO: Use the array to send multiple files, or at least one at time
                 */
                $scope.picturePath = entry.nativeURL;
            });
        }

        //if fails, debug
        function fail(error) {
            $scope.liveConsole = "Erro ao copiar:" + error.code;
            console.log("fail: " + error.code);
        }

        //just make an id for the image to prevent duplicates overwrite
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
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
})
();