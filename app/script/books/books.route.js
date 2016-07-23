(function() {
/**
 * @author ntd1712
 */
app.config(configBlocks);

function configBlocks($stateProvider) {
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
                    templateUrl: "views/books/form.html"
                },
                "@book.create": {
                    templateUrl: "views/books/form.html"
                }
            },
            data: {
                pageTitle: "New book",
                pageDesc: "From here you can create a new book",
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