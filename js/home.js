define(function(require) {
    var icons = require("xi-artwork/icons");

    var launchers = [];

    var home = {};

    home.addLauncher = function(app) {
        var button = document.createElement("button");

        var iconInfo = {"uri": app.origin + app.manifest.icons["55"]};
        icons.load(iconInfo, function(data) {
            button.style.backgroundImage = "url('" + data + "')";
        });

        button.addEventListener("click", function() {
            app.launch();
        });

        var launchersDiv = document.getElementById("launchers-div");
        launchersDiv.appendChild(button);

        launchers.push(button);

        layoutLaunchers();
    }

    home.addXO = function() {
        var image = document.createElement("img");
        image.setAttribute("id", "xo-img")

        var homeDiv = document.getElementById("home-div");
        homeDiv.appendChild(image);

        iconInfo = {"name": "device/computer-xo",
                    "fillColor": "#F8E800",
                    "strokeColor": "#B20008"} 

        icons.load(iconInfo, function(data) {
            image.src = data;
        });
    }

    function layoutLaunchers() {
        var angle = Math.PI * 2 / launchers.length;
        var radius = 200;
        var iconSize = 55;

        for (var i = 0; i < launchers.length; i++) {
            var launcher = launchers[i];

            x = Math.floor(Math.cos(angle * i) * radius - iconSize / 2);
            y = Math.floor(Math.sin(angle * i) * radius - iconSize / 2);

            launcher.style.position = "absolute";
            launcher.style.width = iconSize + "px";
            launcher.style.height = iconSize + "px";

            if (x > 0) {
                launcher.style.left = "calc(50% + " + x + "px)";
            } else {
                launcher.style.left = "calc(50% - " + (-x) + "px)";
            }

            if (y > 0) {
                launcher.style.top = "calc(50% + " + y + "px)";
            } else {
                launcher.style.top = "calc(50% - " + (-y) + "px)";
            }
        }
    }

    return home;
});
