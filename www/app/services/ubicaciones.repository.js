/**
 * Created by jose on 9/11/16.
 */
(function () {
    'use strict';

    angular
        .module('ubicaciones', [])
        .factory('UbicacionesRepository', SocketcSailsService);

    /* @ngInject */
    function SocketcSailsService($sails) {
        var subscribed_enviar_ubicacion = false;

        return {
            'connect': connect,
            'emit': emit,
            'recivePosPasajeros': recivePosPasajeros
        };

        function connect() {
            if(!subscribed_enviar_ubicacion){
                console.log('Suscrito a envio de ubicacion');
                $sails.on('connect', function (response) {
                    console.log('Conectado al socket')
                });
                subscribed_enviar_ubicacion   = true;
            }
        }

        function emit(tarea, data) {
            $sails.emit(tarea, data);
        }

        function recivePosPasajeros() {
            $sails.on('posPasajeros', function (response) {
                console.log(response)
                console.log('Recibiendo posicion pasajeros')
            });
        }
    }
})();
