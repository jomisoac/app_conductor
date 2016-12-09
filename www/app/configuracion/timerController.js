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
                        id: sessionStorage.getItem('idConductor'),
                        lat: lat,
                        lng: long,
                        empresa: sessionStorage.getItem('idGremio'),
                        estado: $rootScope.estado,
                        estacion: sessionStorage.getItem('estacion'),
                        codigo_vial: sessionStorage.getItem('codigo_vial')
                    };
                    $rootScope.MiGeolocation = {
                        lat : lat,
                        long : lng
                    }
                    console.log($rootScope.MiGeolocation)
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