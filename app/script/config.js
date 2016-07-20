app.config(configBlocks);

function configBlocks($stateProvider) {
    $stateProvider
        .state("index", {
            url: "/",
            templateUrl: "view/index.html",
            data: {
                pageTitle: "User"
            }
        });
}
