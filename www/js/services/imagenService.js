app.service("ImagenService", function($http,$window){
    var uri = $window.localStorage['uri'];
    
    this.postImageConductor = function(id,imagen)
    {
        return $http.post(
                uri+'api/conductores/'+id+'/imagen' , imagen,
                {
                    transformRequest: angular.identity, 
                    headers: 
                    {'Content-Type': undefined,
                     'Authorization': 'Bearer '+$window.localStorage['token']  
                    }
                }
            );
    }
    
    this.postImageVehiculo = function(id,imagen)
    {
        return $http.post(
                uri+'api/vehiculos/'+id+'/imagen' , imagen,
                {
                    transformRequest: angular.identity, 
                    headers: 
                    {'Content-Type': undefined,
                     'Authorization': 'Bearer '+$window.localStorage['token']  
                    }
                }
            );
        return $http(pet);
    }
});