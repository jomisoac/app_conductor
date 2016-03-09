app.controller('ConductorCtrl', function($scope,$location,$ionicPopup,ConductorService,EmpresaService,$ionicLoading, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform) {
  $scope.notifications = [];
  
  $scope.$on('$ionicView.enter',function(){
    $scope.mostrarAdvertencia = false;
    $ionicLoading.show();
    $scope.conductor = {};
    $scope.listaEmpesas = [];
      
    EmpresaService.getAll().then(
        function(respuesta){
            $ionicLoading.hide();
            $scope.listaEmpesas = respuesta.data;
        },function(error){
            $ionicLoading.hide()
            console.log(error);
        });
  });
    
  $scope.volver = function(){
    $location.path("/login");
  }

  $scope.registarConductor = function(){
        
    $scope.conductor.rol = "CONDUCTOR";
    if($scope.conductor.contrasena == $scope.conductor.confirmarContrasena ){
      ConductorService.registrar($scope.conductor).then(
        function(respuesta){
          if(respuesta.statusText == "OK"){
            mostarAlert("Registro Exitoso", "El conductor se ha registrado satisfatoriamente");
            $location.path("/login");
          }
        }, function(error){
          mostarAlert("Fallo en el Registro",error.data);
        });
    }else{
      $scope.mostrarAdvertencia = true;
    }
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
