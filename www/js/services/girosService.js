app.service('GirosService',function($http,$window){
    
    var uri = $window.localStorage['uri'];
    
    this.getAll = function (conductorId){
        var pet = {
            method: 'GET',
            url: uri+'/api/centrales/'+conductorId+'/giros',
            headers: {
                'Authorization': 'Bearer '+$window.localStorage['token']
            }
        };
        return $http(pet);
    }
});