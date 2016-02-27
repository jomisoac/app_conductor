app.controller('GiroCtrl',function($scope,$location,GirosService,$rootScope,$ionicLoading){
    
    $scope.$on('$ionicView.enter',function(){
        $scope.mostrarAdvertencia = true;
        $ionicLoading.show();
        $scope.listaGiros = [];
        $scope.giro = {};
        
        GirosService.getAll($rootScope.placa).then(
            function(respuesta){
                $scope.listaGiros = respuesta.data;
                if($scope.listaGiros.length == 0)
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
})
