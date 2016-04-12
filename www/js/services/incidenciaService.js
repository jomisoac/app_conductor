app.service("IncidenciaService", function($http,$window){
    var uri = $window.localStorage['uri'];
    
    this.registrarAusencia = function(id,incidencia)
    {
        var pet = {
            method: 'POST',
            url: uri+'/api/conductores/'+id+'/incidencias',
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            },
            data: incidencia
        };
        return $http(pet);
    }
});