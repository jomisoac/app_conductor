app.service('EmpresaService',function($http,$window){
    var uri = $window.localStorage['uri'];
    
  this.getAll = function (){
    return $http.get(uri+'/api/empresas');
  }
});
