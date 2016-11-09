(function () {
    'use strict';

    angular
        .module('configuracion')
        .controller('TimerCtrl', TimerCtrl);

    function TimerCtrl($timeout, $rootScope, GeolocalizacionService, UbicacionesRepository) {

        $timeout(ActualzarPosicion, 30000);

        function ActualzarPosicion() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var posicion = {
                        conductor_id: $rootScope.idConductor,
                        latitud: lat,
                        longitud: lng
                    };

                    UbicacionesRepository.emit('posConductor', posicion);                    // GeolocalizacionService.guardar(posicion).then(
                    //     function (respuesta) {
                    //         $timeout(ActualzarPosicion, 300000);
                    //     }, function (error) {
                    //         console.log(error);
                    //         $timeout(ActualzarPosicion, 3000);
                    //     }
                    // );
                });
            }
        }
    }

})();