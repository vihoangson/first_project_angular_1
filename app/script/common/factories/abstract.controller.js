(function() { "use strict";
/**
 * @author ntd1712
 */
app.factory("AbstractController", Anonymous);

function Anonymous($compile) {
    // Private static attributes
    var map = {
        id: "Id",
        data: "data",
        success: "success",
        total: "total",
        start: "start",
        length: "length"
    };
    var $scope;

    /**
     * @constructor
     * @param {Object} $rootScopeProvider
     * @param {AbstractRepository} repository
     */
    function AbstractController($rootScopeProvider, repository) {
        $scope = $rootScopeProvider;
        this.repository = repository;
        this.route = $scope.$state.get("^.index") ? "^.index" : "^";
    }

    // Public, non-privileged methods
    AbstractController.prototype = {
        /**
         * @param {Object.<String|Object>} [params=undefined]
         * @returns {Object} AbstractController
         */
        index: function(params) {
            console.log("alskdjf");
            this.repository.index(params).then(
                function(response) {
                    $scope.collection = Object(response)[map.data];
                });

            return this;
        },
        /**
         * @returns {Object} AbstractController
         */
        create: function() {
            if ("function" === typeof this.beforeForm) {
                this.beforeForm.call(this, undefined, true);
            }

            $scope.model = this.repository.exchangeObject({}, this.repository.model);
            $scope.mistr = angular.copy($scope.model);

            if ("function" === typeof this.afterForm) {
                this.afterForm.call(this, undefined, undefined, true);
            }

            return this;
        },
        /**
         * @param {Object} model
         * @returns {Object} AbstractController
         */
        store: function(model) {
            return this.save(model, undefined, true);
        },
        /**
         * @param {Number|*} id
         * @returns {Object} AbstractController
         */
        show: function(id) {
            return this.edit(id);
        },
        /**
         * @param {Number|*} id
         * @returns {Object} AbstractController
         * @throws {Error} If ID is invalid
         */
        edit: function(id) {
            if (!id) {
                throw new Error("Your request is invalid");
            }

            if ("function" === typeof this.beforeForm) {
                this.beforeForm.call(this, id, false);
            }

            var me = this;
            var handler = function(response) {
                if (!response[map.success]) {
                    throw new Error(response[map.data] || "Your request is invalid");
                }

                $scope.model = response[map.data];
                $scope.mistr = angular.copy($scope.model);

                if ("function" === typeof me.afterForm) {
                    me.afterForm.call(me, id, response, false);
                }
            };

            if (undefined !== $scope.collection) {
                var model = _.findWhere($scope.collection,
                    eval("({" + map.id + ":" + ("number" === typeof id ? id : '"' + String(id).replace(/"/g, "&quot;") + '"') + "})"));
                handler({ data: model, success: undefined !== model });
            }
            else {
                this.repository.show(id).then(
                    function(response) {
                        handler(Object(response));
                    },
                    function(response) {
                        handler({ data: response.data.error || response.statusText, success: false });
                    });
            }

            return this;
        },
        /**
         * @param {Object} model
         * @param {Number|*} id
         * @returns {Object} AbstractController
         */
        update: function(model, id) {
            return this.save(model, id, false);
        },
        /**
         * @param {Number|*} id
         * @returns {Object} AbstractController
         * @throws {Error} If ID is invalid
         */
        destroy: function(id) {
            if (!id) {
                throw new Error("Your request is invalid");
            }

            if ("function" === typeof this.beforeDestroy) {
                this.beforeDestroy.call(this, id);
            }

            var me = this;
            console.log(id);
            confirm("Are you sure?", undefined, function() {
                me.repository.destroy(id).then(
                    function(response) {
                        if ("function" === typeof me.afterDestroy) {
                            me.afterDestroy.call(me, id, response);
                        }

                        $scope.$parent.toast = "Deleted successfully";
                        $scope.$state.reload();
                    },
                    function() {
                        $scope.$parent.toast = "Deleted unsuccessfully, maybe it is in use";
                    });
            });

            return this;
        },
        /**
         * @param {String} mode
         * @returns {Object} AbstractController
         */
        bootstrap: function(mode) {
            if (!mode) {
                mode = undefined !== $scope.$state.current.data.isNew ? "form" : "grid";
            }

            switch (mode) {
                case "form":
                    false === $scope.$state.current.data.isNew ? this.edit($scope.$state.params.id) : this.create();
                    break;
                default:
                    $scope.dtColumns = this.getDTColumns($scope.dtColumns);
                    $scope.dtOptions = this.getDTOptions($scope.dtOptions);
            }
        },
        /**
         * @param {Object} model
         * @returns {Object} AbstractController
         */
        cancel: function(model) {
            if (!model) {
                model = Object($scope.model);
            }

            if (angular.equals(model, Object($scope.mistr))) {
                return $scope.$state.go(this.route);
            }

            confirm("Are you sure?", undefined, function() {
                $scope.$state.go(this.route);
            }, this);

            return this;
        },
        /**
         * @returns {Object} AbstractController
         */
        reset: function() {
            $scope.model = angular.copy($scope.mistr);
            return this;
        },
        /**
         * @param {Object} model
         * @param {Number|*} [id=undefined]
         * @param {Boolean} [isNew=false]
         * @returns {Object} AbstractController
         * @throws {Error} If ID is invalid and isNew is FALSE
         */
        save: function(model, id, isNew) {
            if ("boolean" !== typeof isNew) {
                isNew = Boolean($scope.$state.current.data.isNew);
            }

            if (!model) {
                model = Object($scope.model);
            }

            if (!isNew) {
                if (!id) {
                    id = $scope.$state.params.id || model.Id || false;
                }

                if (!id) {
                    throw new Error("Your request is invalid");
                }
            }

            if ("function" === typeof this.beforeSave) {
                this.beforeSave.call(this, model, id, isNew);
            }

            if (angular.equals(model, Object($scope.mistr))) {
                $scope.$parent.toast = "There are no changes";
                return $scope.$state.reload();
            }

            var me = this;
            var handler = function(model, id, isNew) {
                if ("function" === typeof me.afterSave) {
                    me.afterSave.call(me, model, id, isNew);
                }

                delete $scope.$parent.error;
                $scope.$parent.toast = "Data saved successfully";
                $scope.$state.go(me.route);
            };

            if (isNew) {
                this.repository.store(model).then(
                    function() {
                        handler(model, undefined, true);
                    },
                    function(response) {
                        $scope.$parent.error = response.data.error || response.statusText;
                    });
            }
            else {
                this.repository.update(model, id).then(
                    function() {
                        handler(model, id, false);
                    },
                    function(response) {
                        $scope.$parent.error = response.data.error || response.statusText;
                    });
            }

            return this;
        },
        /**
         * @param {Object} [options=undefined]
         * @returns {Object[]}
         */
        getDTColumns: function(options) {
            var columns = this.repository.model.getFields();

            if (false !== options) {
                var state = $scope.$state.$current.parent.name || $scope.$state.current.name,
                    actions = Object(options).ops || ["edit", "destroy"];

                columns.push({
                    data: null,
                    class: "col-sm-1 text-center",
                    sortable: false,
                    render: function(model) {
                        return '<a class="btn btn-success btn-xs" title="View Details" ng-if="' + (-1 !== actions.indexOf("show")) + '"' +
                            ' ui-sref="' + state + '.show({ id: ' + model.Id + ' })"><i class="fa fa-file-text-o"></i></a> ' +
                            '<a class="btn btn-info btn-xs" title="Edit" ng-if="' + (-1 !== actions.indexOf("edit")) + '"' +
                            ' ui-sref="' + state + '.edit({ id: ' + model.Id + ' })"><i class="fa fa-edit"></i></a> ' +
                            '<a class="btn btn-danger btn-xs" title="Delete" ng-if="' + (-1 !== actions.indexOf("destroy")) + '"' +
                            ' ng-click="ctrl.destroy(' + model.Id + ')"><i class="fa fa-trash-o"></i></a>';
                    }
                });
            }

            return columns;
        },
        /**
         * @param {Object} [options=undefined]
         * @returns {Object}
         */
        getDTOptions: function(options) {
            var me = this;
            return angular.extend({
                aaSorting: [],
                // bStateSave: true,
                oLanguage: { sUrl: "l10n/datatables/en.json" },
                processing: true,
                serverSide: true,
                sAjaxDataProp: map.data,
                ajax: function(data, callback) {
                    // prepare query variables
                    var params = eval("({" + map.start + ":" + data.start + "," + map.length + ":" + data.length + "})"),
                        sort = [], i;

                    if (0 !== data.order.length) {
                        for (i in data.order) {
                            if (data.order.hasOwnProperty(i)) {
                                sort.push({
                                    property: data.columns[data.order[i].column].data,
                                    direction: data.order[i].dir.toUpperCase()
                                });
                            }
                        }

                        if (0 !== sort.length) {
                            params.sort = angular.toJson(sort);
                        }
                    }

                    if (3 <= data.search.value.length) {
                        params.filter = data.search.value;
                    }

                    // transmit to server
                    me.repository.index(params).then(
                        function(response) {
                            $scope.$parent.collection = (response = Object(response))[map.data];
                            callback(angular.extend(response, {
                                draw: data.draw,
                                recordsTotal: response[map.total],
                                recordsFiltered: response[map.total]
                            }));
                        });
                },
                fnCreatedRow: function(row) {
                    $compile(row)($scope);
                },
                fnInitComplete: function() {
                    $scope.$parent.dtInstance = this.fnSetFilteringDelay();
                }
            }, options);
        },
        /**
         * @param {Number|*} [id=undefined]
         * @param {Object} [response=undefined] - For afterForm only
         * @param {Boolean} [isNew=false]
         * @returns {Object} AbstractController
         */
        beforeForm: undefined,
        afterForm: undefined,
        /**
         * @param {Object} model
         * @param {Number|*} [id=undefined]
         * @param {Boolean} [isNew=false]
         * @returns {Object} AbstractController
         */
        beforeSave: undefined,
        afterSave: undefined,
        /**
         * @param {Number|*} id
         * @param {Object} [response=undefined] - For afterDestroy only
         * @returns {Object} AbstractController
         */
        beforeDestroy: undefined,
        afterDestroy: undefined
    };

    return AbstractController;
}

})();