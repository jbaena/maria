(function() {

    var F = function() {};

    maria.subclass = function(namespace, name, options) {
        options = options || {};
        var members = options.members;
        var methods = options.methods || {};
        var SuperConstructor = options.SuperConstructor || F;
        var Constructor = namespace[name] = function() {
            SuperConstructor.apply(this, arguments);
        };
        var prototype = Constructor.prototype = new SuperConstructor();
        prototype.constructor = Constructor;
        if (members && !methods.initialize) {
            Constructor.prototype.initialize = function() {
                SuperConstructor.prototype.initialize.apply(this, arguments);
                for (var p in members) {
                    if (Object.prototype.hasOwnProperty.call(members, p)) {
                        this[p] = members[p];
                    }
                }
            };
        }
        if (methods) {
            maria.borrow(prototype, methods);
        }
        Constructor.subclass = function(namespace, name, options) {
            options = options || {};
            options.SuperConstructor = options.SuperConstructor || Constructor;
            SuperConstructor.subclass(namespace, name, options);
        };
    };

}());