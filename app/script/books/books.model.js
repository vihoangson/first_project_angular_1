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
    return "index.php/book";
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
    },{
        data: "Description",
        value: "",
        title: "Description", 
        class: "col-xs-4"
    }
    ];
};

})();