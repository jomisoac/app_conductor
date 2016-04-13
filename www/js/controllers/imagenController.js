app.controller('ImagenCtrl',function($scope,$location,$ionicPopup,$window,$ionicLoading,ImagenService,VehiculoService,$cordovaImagePicker,$ionicPlatform,$cordovaFile) {
    
    var idConductor;
    var idVehiculo;
    var data;
    
    $scope.collection = {};
    $scope.imageModel = {};
        
    $scope.$on('$ionicView.enter',function(){
        
        $scope.collection.selectedImage = "img/cliente.png";
        
        idConductor = $window.localStorage['idConductor'];
      
        VehiculoService.getById(idConductor).then(
            function(respuesta){
                idVehiculo = respuesta.data.id;
        } ,function(error){
            $ionicLoading.hide();
            mostarAlert("Error", "Error al consultar la información, intente más tarde");
        }
    );
  });
    
    $scope.volver = function(){
        $location.path("app/configuracion");
    }
    
    $scope.getImageConductor = function() {       
        // Image picker will load images according to these settings
        var options = {
          maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
          width: 800,
          height: 800,
          quality: 80            // Higher is better
        };

      $cordovaImagePicker.getPictures(options).then(function (results) {
          // Loop through acquired images
          for (var i = 0; i < results.length; i++) {
              $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
              window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  
                  // Encode URI to Base64 needed for contacts plugin
                  $scope.collection.selectedImage = base64;
              });
          }
      }, function(error) {
          console.log('Error: ' + JSON.stringify(error));    // In case of error
      });
    }
    
    $scope.getImageVehiculo = function() {       
        // Image picker will load images according to these settings
        var options = {
          maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
          width: 800,
          height: 800,
          quality: 80            // Higher is better
        };

      $cordovaImagePicker.getPictures(options).then(function (results) {
          // Loop through acquired images
          for (var i = 0; i < results.length; i++) {
              $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
              window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  
                  // Encode URI to Base64 needed for contacts plugin
                  $scope.collection.selectedImage = base64;
              });
          }
      }, function(error) {
          console.log('Error: ' + JSON.stringify(error));    // In case of error
      });
    }
    
    $scope.enviarImagenConductor = function(){
        console.log($scope.imageModel);
        
        /*$ionicLoading.show();
        ImagenService.postImageConductor(idConductor,$scope.imageModel).then(
            function(respuesta){
                $ionicLoading.hide();
                mostarAlert("Imagen conductor", "Imagen cargada satisfatoriamente");
            },function(error){
                $ionicLoading.hide();
                mostarAlert("Imagen conductor", "Error al cargar la imagen, intente más tarde");
            }
        );
        */
        
        var urlServidor = "http://dev.viajaseguro.co/public/images/conductores";
        var urlImage = $scope.collection.selectedImage;
        var filename = "conductor-"+idConductor;

        
        alert(urlServidor+"   "+urlImage+"    "+filename);
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg"
        };
        $cordovaFileTransfer.upload(urlServidor, urlImage, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("success");
            alert(JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
            $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          })
        });
        
    }
    
    $scope.enviarImagenVehiculo = function(){
        $ionicLoading.show();
        ImagenService.postImageVehiculo(idVehiculo,data).then(
            function(respuesta){
                $ionicLoading.hide();
                mostarAlert("Imagen conductor", "Imagen cargada satisfatoriamente");
            },function(error){
                $ionicLoading.hide();
                mostarAlert("Imagen conductor", "Error al cargar la imagen, intente más tarde");
            }
        );
    }
    
    function mostarAlert(titulo,contenido){
        var alertPopup = $ionicPopup.alert({
            title: titulo,
            template: contenido
        });
        alertPopup.then(function (res) {
            
        });
    }
})