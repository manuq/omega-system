define(function () {
    icons = {}

    icons.loadWithName = function(name, callback) {
        var source = "lib/xi-artwork/icons/" + name + ".svg";
        load(source, {}, callback);
    }

    icons.loadWithURI = function(uri, callback) {
        load(uri, {mozSystem: true}, callback);
    }

    function load(source, parameters, callback) {
        client = new XMLHttpRequest(parameters)

        client.onload = function() {
            callback("url('data:image/svg+xml," +
                     escape(this.responseText) +
                     "')");
        };

        client.open("GET", source);
        client.send()
    }

    return icons
});
