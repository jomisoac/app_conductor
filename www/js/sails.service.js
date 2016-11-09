/**
 * Created by jose on 9/11/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('SailsRequest', factory);

    function factory($sails) {
        return function (request, cb) {
            $sails.request({
                method: request.method,
                url: request.url,
                data: request.data,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            }, cb);
        }
    }
})();
