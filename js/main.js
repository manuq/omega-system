define(function(require) {
    var home = require("activity/home");

    var runningActivities = {};
    var visibleActivity = null;

    function addActivity(url, manifestURL) {
        var div = document.createElement("div");
        div.className = "appWindow";

        var iframe = document.createElement("iframe");

        iframe.setAttribute("remote", "true");
        iframe.setAttribute("mozbrowser", "true");
        iframe.setAttribute("mozapp", manifestURL);
        iframe.src = url;

        div.appendChild(iframe);

        var activitiesDiv = document.getElementById("activities-div");
        activitiesDiv.appendChild(div);

        runningActivities[manifestURL] = div;
    }

    function launchActivity(url, manifestURL) {
        if (visibleActivity && visibleActivity == manifestURL) {
            return;
        }

        if (visibleActivity) {
            runningActivities[visibleActivity].style.display = "none"
        }

        if (manifestURL in runningActivities) {
            runningActivities[manifestURL].style.display = "block"
        } else {
            addActivity(url, manifestURL);
        }

        visibleActivity = manifestURL;
    }

    function toggleActivities() {
        var activitiesDiv = document.getElementById("activities-div");
        if (activitiesDiv.style.display == "block") {
            activitiesDiv.style.display = "none";
        } else {
            activitiesDiv.style.display = "block";
        }
    }

    function isSystemApp(manifestURL) {
        var systemManifestURL = "app://system.agora.org/manifest.webapp";
        return manifestURL == systemManifestURL;
    }

    function getAllApps() {
        allApps = navigator.mozApps.mgmt.getAll();

        allApps.onsuccess = function(event) {
            var apps = event.target.result;
            apps.forEach(function(app) {
                if (!isSystemApp(app.manifestURL)) {
                    home.addLauncher(app);
                }
            });
        }
    }

    getAllApps();

    window.addEventListener("mozChromeEvent", function(event) {
        switch (event.detail.type) {
            case "webapps-registry-ready":
                getAllApps();
                break;

            case "webapps-launch":
                var manifestURL = event.detail.manifestURL;

                launchActivity(event.detail.url, manifestURL);

                if (!isSystemApp(manifestURL)) {
                    toggleActivities();
                }
                break;

            case "home-button-release":
                toggleActivities();
                break;
        }
    });

    navigator.mozApps.mgmt.oninstall = function(event) {
        home.addLauncher(event.application); 
    };
});
