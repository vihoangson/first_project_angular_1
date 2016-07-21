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

    return new BooksRepository();
}

})();