(function () {
    'use strict';

    angular
        .module('conductor')
        .service("ImagenService", ImagenService);

    function ImagenService($http, api) {

        this.postImageConductor = function (id, imagen) {
            var fd = new FormData();
            fd.append('imagen', imagen);
            return $http.post(
                api + '/conductores/' + id + '/imagen', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
            );
        }

        this.postImageVehiculo = function (id, imagen) {
            return $http.post(
                api + '/vehiculos/' + id + '/imagen', imagen,
                {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    }
                }
            );
            return $http(pet);
        }
    }
})();