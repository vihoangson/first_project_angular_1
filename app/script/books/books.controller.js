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

    BooksController.prototype = {
        change_db : function(model){
            this.repository.index().then(function(){
                console.log(map.data);
            });
            $scope.namebook = model.name;
            console.log(model.name);
        },
        bootstrap2: function (){
            $scope.test123 = "Nội dung cần test";
        }
    }


    return new BooksController();
}

})();