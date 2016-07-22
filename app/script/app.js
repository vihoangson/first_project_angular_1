var app = angular.module("booker",["ui.router","datatables"]);


if ("function" !== typeof inherit) {
    /**
     * @param {Object} [proto]
     * @returns {Object}
     */
    function inherit(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    }
}

if ("function" !== typeof extend) {
    /**
     * @param {Object} [Child]
     * @param {Object} [Parent]
     */
    function extend(Child, Parent) {
        Parent.prototype.constructor = Parent; // @link http://goo.gl/PxO37U
        Child.prototype = inherit(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.parent = Parent.prototype;
    }
}