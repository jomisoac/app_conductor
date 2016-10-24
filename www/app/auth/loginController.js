(function () {
    'use strict';

    angular
        .module('auth')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, $ionicPopup, $location, LoginService, $window, jwtHelper, $ionicLoading) {
        $scope.$on('$ionicView.enter', function () {
            $scope.usuario = {};
            $scope.matenerSesion = false
        });

        $scope.iniciarSesion = function () {
            $ionicLoading.show();
            LoginService.login($scope.usuario).then(success, error);
            function success(p) {
                var conductor = p.data.data;
                if (conductor.user.rol === "CONDUCTOR") {
                    $window.localStorage['conductor'] = JSON.stringify(conductor);
                    if ($scope.matenerSesion) {
                        $window.localStorage['usuario'] = $scope.usuario
                    } else {
                        $window.localStorage['token'] = p.data.data.token;
                    }
                    $location.path("app/home");
                }
                $ionicLoading.hide();
            }

            function error(error) {
                $ionicLoading.hide();
                mostarAlert("Error", "Error al loguearse intente mas tarde");
                //$scope.mensajeError = error.status == 401 ? error.data.mensajeError : 'A ocurrido un erro inesperado';
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