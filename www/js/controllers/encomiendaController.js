app.controller('EncomiendaCtrl',function($scope,$location,EncomiendaService,$rootScope,$ionicLoading){
    
    
    $scope.$on('$ionicView.enter',function(){
        $scope.mostrarAdvertencia = true;
        $ionicLoading.show();
        $scope.listaEncomiendas = [];
        $scope.encomienda = {};
        
        EncomiendaService.getAll($rootScope.placa).then(
            function(respuesta){
                $scope.listaEncomiendas = respuesta.data;
                if($scope.listaEncomiendas.length == 0)
                    $scope.mostrarAdvertencia = false;
                else
                    $scope.mostrarAdvertencia = true;
                    $ionicLoading.hide();
                },function(error){
                    $ionicLoading.hide();
                    console.log(error);
                }
        );
    });
    
    
    $scope.volver = function(){
        $location.path("app/home");
    }
})
