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
            'recivePosPasajeros': recivePosPasajeros,
            'testUbicion': testUbicion
        };

        function connect() {
            if(!subscribed_enviar_ubicacion){
                console.log('Suscrito a envio de ubicacion');
                $sails.request({
                    method: 'GET',
                    url: '/join_ws_conductor',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    }
                });
                subscribed_enviar_ubicacion   = true;
            }
        }

        function emit(data) {
            $sails.request({
                method: 'POST',
                url: 'post_ubicacion_conductor',
                data: data,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            });
        }

        function testUbicion() {
            $sails.on('posConductor', function (response) {
                console.log(response);
            })
        }

        function recivePosPasajeros() {
            $sails.on('posPasajeros', function (response) {
                console.log(response)
                console.log('Recibiendo posicion pasajeros')
            });
        }
    }
})();
