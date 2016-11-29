/**
 * Created by tav0 on 15/10/16.
 */

(function() {
    'use strict';

    angular
        .module('sails', [])
        .factory('SailsRequest', factory);

    /** @ngInject **/
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
