(function() {
/**
 * @author ntd1712
 */
app.config(configBlocks);

function configBlocks($stateProvider) {
    var route = "views/books/";
    $stateProvider
        .state("book", {
            url: "/book",
            templateUrl: "views/common/content-small.html",
            data: {
                pageTitle: "book"
            },
            controller: "BooksController as ctrl",
            abstract: true
        })
        .state("book.index", {
            url: "",
            templateUrl: "views/books/index.html"
        })
        .state("book.create", {
            url: "/create",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@book.create": {
                    templateUrl: route + "form.html"
                }
            },
            data: {
                pageTitle: "New Permission",
                pageDesc: "From here you can create a new permission",
                isNew: true
            }
        })
        .state("book.edit", {
            url: "/edit/{id:int}",
            views: {
                "": {
                    templateUrl: "views/common/simple-form.html"
                },
                "@book.edit": {
                    templateUrl: "views/common/simple-form.html"
                }
            },
            data: {
                pageTitle: "Edit book",
                pageDesc: "From here you can edit an existing book",
                isNew: false
            }
        });
}

})();