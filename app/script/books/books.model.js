(function() {
/**
 * @author ntd1712
 */
app.service("BooksModel", Anonymous);

function Anonymous(AbstractModel) {
    function BooksModel(data) {
        BooksModel.parent.constructor.apply(this, [data, BooksModel.getFields()]);
    }
    extend(BooksModel, AbstractModel);

    /**
     * @returns {String}
     */
    BooksModel.getRoute = function() {
        return "Books.json";
    };

    /**
     * @return {Object[]}
     */
    BooksModel.getFields = function() {
        /*return [{
            data: "Id",
            value: 0,
            visible: false
        },{
            data: "Name",
            title: "Name",
            value: "",
            sortable: false
        }];*/
    };

    return BooksModel;
}

})();