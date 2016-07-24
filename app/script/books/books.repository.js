(function() {
/**
 * @author ntd1712
 */
app.service("BooksRepository", Anonymous);

function Anonymous($http, BooksModel, AbstractRepository) {
    function BooksRepository() {
        BooksRepository.parent.constructor.apply(this, arguments.callee.caller.arguments);
    }
    extend(BooksRepository, AbstractRepository);

	BooksRepository.prototype.show_book = function(){
		var me = this;
		return $http
		.get(this.route, {  cache: true })
		.then(function(response) {
			if (response.data.success) {
				response.data.data = me.exchangeArray(response.data.data, me.model);
			}
			return response.data;
		});
	}


    return new BooksRepository();
}

})();