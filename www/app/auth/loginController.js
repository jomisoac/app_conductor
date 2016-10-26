(function () {
    'use strict';

    angular
        .module('auth')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl(LoginService, $ionicLoading, $location, $state, $ionicPopup) {
        var vm = this;
        vm.usuario = {};
        vm.matenerSesion = true;

        vm.iniciarSesion = iniciarSesion;

        function iniciarSesion(){
            $ionicLoading.show();
            LoginService.login(vm.usuario, vm.matenerSesion).then(success, error);
            function success(user) {
                console.log(user)
                if(user.rol == "CONDUCTOR"){
                    $ionicLoading.hide();
                    $state.go('app.home')
                }
            }
            function error(error) {
                $ionicLoading.hide();
                mostarAlert("Error login "+error.status,"Error al logear verifique que los datos ingresados sean correctos");
            }
        }

        function autologin(){
            vm.usuario = LoginService.local.getCredenciales();
            if(vm.usuario){
                iniciarSesion();
            }else{
                $ionicLoading.hide();
            }
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

})();