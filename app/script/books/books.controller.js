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
        console.log(this.repository.show_book());
        this.repository.show_book().then(
            function(response){
                console.log(response.data);
            }
        );
        $scope.test123 = "test123";
    };

    return new BooksController();
}

})();