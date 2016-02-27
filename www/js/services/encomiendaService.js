app.service('EncomiendaService',function($http,$window){
    var uri = $window.localStorage['uri'];
    
    this.getAll = function (conductorId){
        var pet = {
            method: 'GET',
            url: uri+'/api/centrales/'+conductorId+'/paquetes',
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            }
        };
        return $http(pet);
    }
});