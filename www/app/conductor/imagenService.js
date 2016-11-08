(function () {
    'use strict';

    angular
        .module('conductor')
        .service("ImagenService", ImagenService);

    function ImagenService($http, api) {

        this.postImageConductor = function (id, imagen, urlservidor) {
            var data = new FormData();
            data.append('imagen', imagen);
            return $http.post(
                urlservidor, data,
                {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    }
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