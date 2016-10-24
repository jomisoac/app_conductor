(function () {
    'use strict';

    angular
        .module('conductor')
        .service("ImagenService", ImagenService);

    function ImagenService($http, $window) {
        var uri = $window.localStorage['uri'];

        this.postImageConductor = function (id, imagen) {
            var fd = new FormData();
            fd.append('imagen', imagen);
            return $http.post(
                uri + '/conductores/' + id + '/imagen', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
            );
        }

        this.postImageVehiculo = function (id, imagen) {
            return $http.post(
                uri + '/vehiculos/' + id + '/imagen', imagen,
                {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Bearer ' + $window.localStorage['token']
                    }
                }
            );
            return $http(pet);
        }
    }
})();