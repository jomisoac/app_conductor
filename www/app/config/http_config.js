/**
 * Created by jose on 24/10/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .constant('api', 'http://192.168.100.5:1337');


    /* @ngInject */
    function config(api, jwtInterceptorProvider, $httpProvider  ) {
        jwtInterceptorProvider.tokenGetter = tokenGetter;

        $httpProvider.interceptors.push('jwtInterceptor');

        function tokenGetter(config, jwtHelper, $http) {
            var jwt = sessionStorage.getItem('jwt');
            if(jwt && config.url.indexOf(api) === 0){
                if(jwtHelper.isTokenExpired(jwt)){
                    return $http({
                        url : api+'/refresh_token',
                        skipAuthorization : true,
                        method: 'GET',
                        headers : {Authorization : 'Bearer '+ jwt}
                    }).then(
                        function(response){
                            sessionStorage.setItem('jwt',response.data.data.token);
                            return response.data.data.token;
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
