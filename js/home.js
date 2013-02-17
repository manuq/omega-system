define(function(require) {
    var icons = require("xi-artwork/icons");

    var home = {};

    home.addLauncher = function(app) {
        var button = document.createElement("button");

        var iconURI = app.origin + app.manifest.icons["55"];
        icons.loadWithURI(iconURI, function(data) {
            button.style.backgroundImage = data;
        });

        button.addEventListener("click", function() {
            app.launch();
        });

        var launchersDiv = document.getElementById("launchers-div");
        launchersDiv.appendChild(button);
    }

    return home;
});
