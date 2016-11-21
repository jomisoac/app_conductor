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
            'emit': emit
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
                escuchar();
                subscribed_enviar_ubicacion   = true;
            }
        }

        function emit(data) {
            $sails.request({
                method: 'POST',
                url: '/ubicacion_conductor',
                data: data,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            });
        }

        function escuchar(){
            $sails.on('madeDespacho', function(response){
                console.log('echo el despacho' ,response)
            });

            $sails.on('turnoUpdate', function(response){
                console.log('Cambiado el turno' ,response)
            });

            
            $sails.on('removeTurno', function(response){
                console.log('Quitado del turno' ,response)
            });
        }

    }
})();
