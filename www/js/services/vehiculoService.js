app.service('VehiculoService',function($http,$window){
  var uri = $window.localStorage['uri'];
  this.getById = function (id){
    var pet = {
      method: 'GET',
      url: uri+'/api/conductores/'+id+'/vehiculo',
      headers: {
        'Authorization': 'Bearer '+$window.localStorage['token']
      }
    };
    return $http(pet);
  }

  this.actualizar = function(vehiculo){
    var pet = {
      method: 'PUT',
      url: uri+'/api/vehiculos/'+vehiculo.id,
      headers: {
        'Authorization': 'Bearer '+$window.localStorage['token']
      },
      data : vehiculo
    };
    return $http(pet);
  }
});
