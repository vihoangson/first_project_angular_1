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

})();