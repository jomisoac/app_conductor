app.service("IncidenciaService", function($http,$window){
    var uri = $window.localStorage['uri'];
    
    this.registrarAusencia = function(id)
    {
        var pet = {
            method: 'POST',
            url: uri+'/api/incidencia/',
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            }
        };
        return $http(pet);
    }
});