/**
 * Created by jose on 9/11/16.
 */
(function () {
    'use strict';

    angular
        .module('ubicaciones', [])
        .factory('UbicacionesRepository', SocketcSailsService);

    /* @ngInject */
    function SocketcSailsService($sails, localNotificaciton, $rootScope) {
        var subscribed_enviar_ubicacion = false;

        return {
            'connect': connect,
            'emit': emit
        };

        function connect() {
            var conductor_id = sessionStorage.getItem('idConductor');
            if(!subscribed_enviar_ubicacion){
                console.log('Suscrito a envio de ubicacion');
                $sails.request({
                    method: 'GET',
                    url: '/join_ws_conductor',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    },
                    data: {
                        conductor_id: conductor_id
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
            var title = '';
            var message = '';
            $sails.on('madeDespacho', function(response){
                title = 'Estas listo!';
                message = 'Ya estas listo para viajar';
                $rootScope.estado = 'en_ruta';
                sessionStorage.setItem('estado', 'en_ruta')
                localNotificaciton.showNotificationLocal(title, message);
            });

            $sails.on('turnoUpdate', function(response){
                title = 'Cambio de turno!';
                message = 'Has sido agregado al turno ' + response.pos+ ' hacia ' + response.ruta;
                $rootScope.estado = 'en_turno';
                sessionStorage.setItem('estado', 'en_turno')
                localNotificaciton.showNotificationLocal(title, message);
            });

            
            $sails.on('removedTurno', function(response){
                title = 'Que pena!';
                message = 'Has sido removido de los turnos.'
                $rootScope.estado = 'disponible';
                sessionStorage.setItem('estado', 'disponible')
                localNotificaciton.showNotificationLocal(title, message);
            });
        }

    }
})();
