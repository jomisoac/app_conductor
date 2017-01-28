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
        var title = '';
        var body = '';
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
                    data: {conductor_id : sessionStorage.getItem('idConductor')},
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
                title = 'Estas listo!';
                body = 'Tu cupo esta completo y has sido despachado, acercate a la oficina por tu planilla.';
                localNotificaciton.showNotificationLocal(title, body);
                console.log('echo el despacho' ,response)
            });

            $sails.on('turnoUpdate', function(response){
                title = 'Actualización de turno';
                body = 'Tu turno ha sido cambiado al ' + response.pos + ', hacia '+ response.ruta;
                localNotificaciton.showNotificationLocal(title, body);
                sessionStorage.setItem("ruta", response.ruta)
                console.log('Cambiado el turno' ,response)
            });

            $sails.on('newPasajero', function(response){
                var pasajeros = JSON.parse(sessionStorage.getItem('pasajeros')) || [];
                pasajeros.push(response)
                sessionStorage.setItem("pasajeros", JSON.stringify(pasajeros));
                $rootScope.listaPasajeros = pasajeros;
                $rootScope.mostrarAdvertencia = false;
                // localNotificaciton.showNotificationLocal(title, body);
                console.log('Nuevo pasajero' ,response)
            });

            $sails.on('updateEstado', function(response){
                console.log(response)
                $rootScope.estado = response
            });
            
            $sails.on('removeTurno', function(response){
                title = 'Algo paso!';
                body = 'Has sido removido de los turnos, acercate a la oficina y verifica lo sucedido.';
                localNotificaciton.showNotificationLocal(title, body);
                console.log('Quitado del turno' ,response)
            });
        }

    }
})();
