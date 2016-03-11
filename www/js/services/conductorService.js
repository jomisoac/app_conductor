app.service("ConductorService", function($http,$window){
    var uri = $window.localStorage['uri'];
    
    this.getAll = function(id)
    {
        var pet = {
            method: 'GET',
            url: uri+'/api/empresas/'+id+'/conductores',
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            }
        };
        return $http(pet);
    }
    
    this.getById = function(id){
        var pet = {
            method: 'GET',
            url: uri+'/api/conductores/'+id,
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            }
        };
        return $http(pet);
    }
    
    this.registrar = function(conductor){
        var url = uri+'/api/usuarios/conductores';
        return $http.post(url,conductor);
    }
    
    this.update = function(conductor){
        var pet = {
            method: 'PUT',
            url: uri+'/api/conductor/'+conductor.id,
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            },
            data : conductor
        };
        return $http(pet);
    }
    
    this.updateRegId = function(conductor_id, reg_id){
        var pet = {
            method: 'PUT',
            url:  uri + '/api/conductores/'+conductor_id+'/reg_id/'+reg_id,
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            }
        };
        return $http(pet);
    }
});
