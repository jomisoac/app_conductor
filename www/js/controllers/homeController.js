app.controller('HomeCtrl', function($scope,$ionicPopup,$location,$ionicHistory,$window,ConductorService,$rootScope,$ionicPlatform,$window) {
    
    $scope.estado;
    $scope.classButton;
    $scope.conductor = {};
    
    $scope.$on('$ionicView.enter',function(){
        
        //$ionicLoading.show();
        var conductorId = JSON.parse($window.localStorage['conductor']);
        ConductorService.getById(conductorId.usuario.nombre).then(
            function(respuesta){
                $scope.conductor = respuesta.data;
                console.log($scope.conductor);
                if(respuesta.data.estado === "En ruta"){
                    $scope.estado = "No disponible";
                    $scope.classButton = "button-assertive";  
                    //button-balanced
                }
                //$ionicLoading.hide();
            }
            ,function(error){
                //$ionicLoading.hide();
            }
        );
    });
    
    $scope.opcionMenu = function(opcion){
        if(opcion == "Pasajeros"){
            $location.path("/pasajeros");
        }
        if(opcion == "Encomiendas"){
            $location.path("/encomienda");
        }
        if(opcion == "Giros"){
            $location.path("/giro");
        }
    }
    
    $scope.cambiarEstado = function(){
        if($scope.estado === "No disponible" || $scope.estado === "En ruta"){
            $scope.estado = "Disponible";
            $scope.classButton = "button-balanced";  
        }else if($scope.estado === "Disponible"){
            $scope.estado = "No disponible";
            $scope.classButton = "button-assertive";  
        }
        $scope.conductor.estado = $scope.estado;
        console.log($scope.conductor);
        ConductorService.update($scope.conductor).then(
            function(respuesta){
                console.log("actualizó");
                console.log(respuesta.data);
            },function(error){
                console.log("no actualizó");
            }
        );
    }
    
    
    function mostarAlert(titulo,contenido){
        var alertPopup = $ionicPopup.alert({
            title: titulo,
            template: contenido
        });
        alertPopup.then(function (res) {
            $scope.conductor = {};
        });
    }
 });
