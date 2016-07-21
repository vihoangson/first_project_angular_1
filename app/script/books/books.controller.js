(function() {
/**
 * @author ntd1712
 */
app.controller("BooksController", Anonymous);
function Anonymous($scope, BooksRepository, AbstractController) {
    function BooksController() {
     //   BooksController.parent.constructor.apply(this, arguments.callee.caller.arguments);
    }
    //extend(BooksController, AbstractController);
    BooksController.prototype = {
    	change_db : function(model){
    		$scope.namebook = model.name;
    		console.log(model.name);
    	}
    }
    return new BooksController();
}

})();