(function() {
/**
 * @author ntd1712
 */
app.value("BooksModel", BooksModel);

function BooksModel(data) {
    data = data || {};
    var fields = arguments.callee.getFields(),
        length = fields.length, key;
    for (key = 0; key < length; key++) {
        this[fields[key].data] = data[fields[key].data] || fields[key].value;
    }
}

BooksModel.getRoute = function() {
    return "Books.php";
};

BooksModel.getFields = function() {
    return [{
        data: "Id",
        value: 0,
        visible: false
    },{
        data: "Name",
        value: "",
        title: "Name",
        class: "col-xs-4"
    }
    ];
};

})();