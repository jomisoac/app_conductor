app.service('GeolocalizacionService',function($http,$window){
    
    var uri = $window.localStorage['uri'];
  
  this.guardar = function(posicion){
    var pet = {
      method: 'POST',
      url: uri+'/api/conductores/'+posicion.conductor_id+'/ubicacion',
      headers: {
        'Authorization': 'Bearer '+$window.localStorage['token']
      },
      data : posicion
    };
    return $http(pet);
  }
});