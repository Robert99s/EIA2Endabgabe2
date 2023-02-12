"use strict";
var FireworkSimulation;
(function (FireworkSimulation) {
    let url = "https://webuser.hs-furtwangen.de/~schindlr/Database/index.php/";
    //Funktion um die Daten aus dem Server auszulesen -> gibt Raketen zurück
    async function handleLoad() {
        let response = await fetch(url + "?command=find&collection=dataList");
        let item = await response.text();
        // any, da der Server mehr als nur unsere gespeicherten Daten zurückgeben wird
        let serverData = JSON.parse(item);
        let serverRockets = [];
        for (let key in serverData["data"]) {
            console.log(key);
            serverRockets.push(serverData["data"][key]);
        }
        return serverRockets;
    }
    FireworkSimulation.handleLoad = handleLoad;
    //Rakete speichern
    async function saveRocket(_rocket) {
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "dataList");
        query.set("data", JSON.stringify(_rocket));
        //Javascript Objekt zu einem JSON String umwandeln
        let response = await fetch(url + "?" + query.toString());
        //URL nehmen und Daten anhängen und abschicken
        let responseText = await response.text();
        //Fängt den response ab und macht ein text daraus
        if (responseText.includes("success")) {
            alert("Item hinzugefügt!");
        }
        else {
            alert("Daten konnten nicht gespeichert werden!");
        }
    }
    FireworkSimulation.saveRocket = saveRocket;
})(FireworkSimulation || (FireworkSimulation = {}));
//# sourceMappingURL=Database.js.map