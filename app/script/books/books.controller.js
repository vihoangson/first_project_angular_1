(function() {
/**
 * @author ntd1712
 */
app.controller("BooksController", Anonymous);

function Anonymous($scope, BooksRepository, AbstractController,Upload) {

    function BooksController() {
        AbstractController.apply(this, arguments.callee.caller.arguments);
    }
    BooksController.prototype = Object.create(AbstractController.prototype);
    BooksController.prototype.constructor = BooksController;
    var data_images = [];

      $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
          var $file = $files[i];
          Upload.upload({
            url: 'api/index.php/book/upload',
            file: $file,
            progress: function(e){}
          }).then(function(data, status, headers, config) {
            // file is uploaded successfully
            if(data.data.status=="success"){
                alert("Thank you: "+data.data.info_file.file_name);
                data_images.push(data.data.info_file.file_name);
                $scope.model.Images = JSON.stringify(data_images);
                render_img(data_images);
            }else{
                alert("Error");
            }
          }); 
        }
      }
        var render_img = function(data_images){            
            $.each(data_images, function(index, val) {
                $scope.images = ($scope.images||"") + "<img src='images/"+val+"'>";
            });
        }

    BooksController.prototype.show = function(model){
        this.repository.show_book().then(
            function(response){
                $scope.collection = Object(response)["data"];
            }
        );
        return this;
    };

    // TODO: upload file

    BooksController.prototype.detail = function(id){
        this.repository.index({id:id}).then(
            function(response){
                $scope.collection = Object(response)["data"];
                console.log($scope.collection);
            }
        );
        return this;
    };

    return new BooksController();
}

app.directive("msButton", msButton);

function msButton(){
    return {
        restrict: "A",
        controller: function ($scope,$element){
            $element.bind("click",function(){
                $http.get("/api/index.php").then(function(response) {console.log(response);});
            })
        }
    }
}

})();