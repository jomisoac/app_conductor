app.controller('LoginCtrl',function($scope,$ionicPopup,$location,LoginService,$window,jwtHelper,$ionicLoading){
    $scope.$on('$ionicView.enter',function(){
        $scope.usuario = {};
        $scope.matenerSesion = false
    });
    
    $scope.iniciarSesion = function(){
        $ionicLoading.show();
        LoginService.login($scope.usuario).then(success, error);
        function success(p) {
            var conductor = jwtHelper.decodeToken(p.data.token);
            if(conductor.usuario.rol == "CONDUCTOR"){
                $window.localStorage['conductor'] = JSON.stringify(conductor);
                    if($scope.matenerSesion){
                        $window.localStorage['usuario'] = $scope.usuario
                    }else{
                        $window.localStorage['token'] = p.data.token;
                    }
                $location.path("app/home");
            }
            $ionicLoading.hide();
        }
        function error(error) {
            $ionicLoading.hide();
            console.log(error);
            //$scope.mensajeError = error.status == 401 ? error.data.mensajeError : 'A ocurrido un erro inesperado';
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
