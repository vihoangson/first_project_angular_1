(function() {
/**
 * @author ntd1712
 */
app.controller("BooksController", Anonymous);

function Anonymous($scope, BooksRepository, AbstractController) {
    function BooksController() {
        AbstractController.apply(this, arguments.callee.caller.arguments);
    }
    BooksController.prototype = Object.create(AbstractController.prototype);
    BooksController.prototype.constructor = BooksController;

    BooksController.prototype.change_db = function(model){
            this.repository.index().then(function(){
                // TODO: debug
                //console.log(map.data);
            });
            $scope.namebook = model.name;
            // TODO: debug
            //console.log(model.name);
    };
   
    BooksController.prototype.show = function(model){
        this.repository.show_book().then(
            function(response){
                $scope.collection = Object(response)["data"];
            }
        );
        return this;
    };

    return new BooksController();
}

})();