app.controller('ContrasenaCtrl', function($scope,$location,$ionicPopup,$window,$ionicLoading,ConductorService,GeolocalizacionService) {
    
    $scope.$on('$ionicView.enter',function(){
        $scope.contrasena = {};
        $scope.mostrarAdvertencia = false;
    });
    
    $scope.volver = function(){
        $location.path("app/configuracion");
    }
    
    $scope.cambiarContrasena = function(){
        $ionicLoading.show();
        if($scope.contrasena.confirmarContrasena === $scope.contrasena.nueva){
            ConductorService.updateContrasena($window.localStorage['idUsuario'],$scope.contrasena).then(
                function(respuesta){
                    $ionicLoading.hide();
                    $scope.mostrarAdvertencia = false;
                    mostarAlert("Cambio de Contraseña","La contraseña fue cambiada exitosamente, por favor inicie sesión nuevamente");
                    cerrarSesion();
                    
                },
                function(error){
                    $ionicLoading.hide();
                    mostarAlert("Cambio de Contraseña","Error al cambiar la contraseña, por favor intente nuevamente");
                }
            );
        }else{
            $scope.mostrarAdvertencia = true;
        }
    }
    
    function cerrarSesion(){
        GeolocalizacionService.deletePosicion($window.localStorage['idConductor']).then(
            function(respuesta){
                $location.path("/login");
            },function(error){
                mostarAlert("Cerrar Sesión", "Error al intentar cerrar sesión intente nuevamente");
            }
        );
    }
    
    function mostarAlert(titulo,contenido){
        var alertPopup = $ionicPopup.alert({
            title: titulo,
            template: contenido
        });
        alertPopup.then(function (res) {
            
        });
    }
})
