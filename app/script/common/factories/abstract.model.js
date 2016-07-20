(function() {
/**
 * @author ntd1712
 */
app.factory("AbstractModel", Anonymous);

function Anonymous() {
    // Private static attributes
    var map = {
        data: "data",
        value: "value"
    };
    var $data;

    /**
     * @constructor
     * @param {Object} data
     * @param {Object[]} [fields=undefined]
     */
    function AbstractModel(data, fields) {
        $data = data || {};

        if (undefined !== fields) {
            for (var i = 0, len = fields.length; i < len; i++) {
                this[fields[i][map.data]] = $data[fields[i][map.data]] || fields[i][map.value];
            }
        }
    }

    // Public, non-privileged methods
    AbstractModel.prototype = {
        /**
         * @returns {Object}
         */
        getData: function() {
            return $data;
        }
    };

    return AbstractModel;
}

})();