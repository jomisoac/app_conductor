app.controller('PasajerosCtrl',function($scope,$location,PasajerosService,$rootScope,$ionicLoading,$rootScope){
    
    $scope.$on('$ionicView.enter',function(){
        $scope.mostrarAdvertencia = true;
        $ionicLoading.show();
        $scope.listaPasajeros = [];
        
        PasajerosService.getAll($rootScope.placa).then(
            function(respuesta){
                $scope.listaPasajeros = respuesta.data;
                $rootScope.listaPasajeros = $scope.listaPasajeros;
                console.log($scope.listaPasajeros);
                if($scope.listaPasajeros.length == 0)
                    $scope.mostrarAdvertencia = false;
                else
                    $scope.mostrarAdvertencia = true;
                $ionicLoading.hide();
            },function(error){
                console.log(error);
                $ionicLoading.hide();
            }
        );
    });
    
    $scope.volver = function(){
        $location.path("app/home");
    }
    
    $scope.recogerPasajeros = function(){
        $location.path("ubicacion-pasajeros");
    }

})
