/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';
    angular
        .module('app', [
            'ionic',
            'angular-jwt',
            'ion-floating-menu',
            'ngSails',
            // 'uiGmapgoogle-maps',
            'ngCordova',

            'auth',
            'conductor',
            'configuracion',
            'giros',
            'paquetes',
            'gremio',
            'pagos',
            'pasajeros',
            'empresas',
            'geolocalizacion',
            'notificaciones',
            'ubicaciones',
            'localNotificaciton',
            'vehiculo',
            'sails'
        ])
})();