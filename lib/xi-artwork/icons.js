define(function () {
    icons = {}

    icons.load = function(iconInfo, callback) {
        if ("uri" in iconInfo) {
            source = iconInfo["uri"];
            parameters = {mozSystem: true};
        } else if ("name" in iconInfo) {
            source = "lib/xi-artwork/icons/" + iconInfo["name"] + ".svg";
            parameters = {}
        }

        fillColor = iconInfo["fillColor"]
        strokeColor = iconInfo["strokeColor"]

        client = new XMLHttpRequest(parameters)

        client.onload = function() {
            var iconData = this.responseText;

            if (fillColor) {
                var re = /(<!ENTITY fill_color ")(.*)(">)/
                iconData = iconData.replace(re, "$1" + fillColor + "$3")
            }

            if (strokeColor) {
                var re = /(<!ENTITY stroke_color ")(.*)(">)/
                iconData = iconData.replace(re, "$1" + strokeColor + "$3")
            }

            callback("data:image/svg+xml," + escape(iconData));
        };

        client.open("GET", source);
        client.send()
    }

    return icons
});
