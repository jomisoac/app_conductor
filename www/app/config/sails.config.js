/**
 * Created by jose on 9/11/16.
 */
(function ()
{
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($sailsProvider, api)
    {
        $sailsProvider.url = api;
    }
})();
