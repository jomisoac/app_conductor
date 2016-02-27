app.controller('MenuCtrl',function($scope,$ionicPopup,$rootScope,$window,ConductorService,$location,$timeout,$ionicLoading,$ionicUser, $ionicPush,$ionicHistory){
    
    $scope.$on('$ionicView.enter',function(){
        $ionicLoading.show();
        $rootScope.placa;
        $rootScope.gremio;
        $scope.conductor;
        var conductorId = JSON.parse($window.localStorage['conductor']);
        ConductorService.getById(conductorId.usuario.nombre).then(
            function(respuesta){
                $scope.conductor = respuesta.data;
                $rootScope.gremio = $scope.conductor.empresa_id;
                $rootScope.placa = $scope.conductor.id;
                $ionicLoading.hide($scope.conductor.id);
                registrarUsuario($scope.conductor);
                resgistrarToken();
            }
            ,function(error){
                $ionicLoading.hide();
            }
        );
    });
    

    $scope.logout = function(){
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $location.path("/login");
    }

    function registrarUsuario(usuario){
        var user = $ionicUser.get();
        if(!user.user_id) {
          user.user_id = $ionicUser.generateGUID();
        };

        // Establecemos alguna información para nuestro usuario
        angular.extend(user, {
          name: usuario.nombres+" "+usuario.apellidos,
          id: usuario.id
        });

        $ionicUser.identify(user).then(function(){
          $scope.identified = true;
        });

    }

    function resgistrarToken(){
        $ionicPush.register({
          canShowAlert: true, //Se pueden mostrar alertas en pantalla
          canSetBadge: true, //Puede actualizar badgeds en la app
          canPlaySound: true, //Puede reproducir un sonido
          canRunActionsOnWake: true, //Puede ejecutar acciones fuera de la app
          onNotification: function(notification) {
            if(notification.android.tipo == "Pasajeros")
                $location.path("/pasajeros");
            else if (notification.android.tipo == "Paquetes")
                $location.path("/encomienda");
            else if (notification.android.tipo == "Giros")
                $location.path("/giro");
            return true;
          }
        });
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

    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
        $scope.token = data.token;
        ConductorService.updateRegId($scope.conductor.id, data.token).then(succes, error);
        function succes(p){
            console.log("Dispositivo Registrado Correctamente");
        }
        function error(e){
            console.log('algun error', e)
        }
    });
});
