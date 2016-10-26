/**
 * Created by jose on 24/10/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .constant('api', 'http://api.viajaseguro.co');


    /* @ngInject */
    function config(api, jwtInterceptorProvider, $httpProvider  ) {
        jwtInterceptorProvider.tokenGetter = tokenGetter;

        $httpProvider.interceptors.push('jwtInterceptor');

        function tokenGetter(config, jwtHelper, $http) {
            var jwt = sessionStorage.getItem('jwt');
            if(jwt && config.url.indexOf(api) === 0){
                if(jwtHelper.isTokenExpired(jwt)){
                    return $http({
                        url : api+'/refresh',
                        skipAuthorization : true,
                        method: 'GET',
                        headers : {Authorization : 'Bearer '+ jwt}
                    }).then(
                        function(response){
                            sessionStorage.setItem('jwt',response.data.token);
                            return response.data.token;
                        },
                        function(response){
                            //sessionStorage.removeItem('jwt');
                        }
                    );
                }else{
                    return jwt;
                }
            }
        }
    }
})();
