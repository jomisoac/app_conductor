app.controller('IncidenciaCtrl', function($scope,$location,$ionicPopup,$window,$filter,IncidenciaService) {
    
    $scope.incidencia = {};
  
    $scope.registarIncidencia = function(){
        $scope.incidencia.fechaIncidencia = $filter('date')(new Date(), 'yyyy-MM-dd');
    }
})