app.service('LoginService',function($http, $location, jwtHelper,$window){

    var uri = $window.localStorage['uri'];
    
  this.login = function (usuario){
    return $http.post(uri+'/api/login', usuario);
  };

  this.storeUser = function (jwt) {
    sessionStorage.setItem('jwt', jwt);
    var usuario = jwtHelper.decodeToken(jwt).usuario;
    sessionStorage.setItem('usuario',JSON.stringify(usuario));
    return usuario;
  }

  this.checkAuthentication = function (owner){
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));
    var jwt = sessionStorage.getItem('jwt');
    if(!jwt || jwtHelper.isTokenExpired(jwt) || !usuario || usuario.rol != owner){
      $location.path("/login");
    }
    if(($location.path() === '/login') && usuario.rol == owner){
      $location.path('/home');
    }
  }

  this.currentUser = function(){
    return JSON.parse(sessionStorage.getItem('usuario'));
  }
});
