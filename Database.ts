namespace FireworkSimulation {

    export interface Rocket {
        [name: string]: {
            particleAmount: number;
            color: string;
            size: number;
            lifetime: number;
        };
    }

    let url: string = "https://webuser.hs-furtwangen.de/~schindlr/Database/index.php/";

    //Funktion um die Daten aus dem Server auszulesen -> gibt Raketen zurück
    export async function handleLoad(): Promise<Rocket[]> {
        let response: Response = await fetch("?command=find&collection=dataList");
        let item: string = await response.text();
        // any, da der Server mehr als nur unsere gespeicherten Daten zurückgeben wird
        let serverData: any = JSON.parse(item);
        let serverRockets: Rocket[] = [];
        for (let key in serverData["data"]) {
            console.log(key);
            serverRockets.push(serverData["data"][key]);
        }
        return serverRockets;
    }

    //Rakete speichern
    export async function saveRocket(_rocket: Rocket): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "dataList");
        query.set("data", JSON.stringify(_rocket));
        //Javascript Objekt zu einem JSON String umwandeln
        let response: Response = await fetch("?" + query.toString());
        //URL nehmen und Daten anhängen und abschicken
        let responseText: string = await response.text();
        //Fängt den response ab und macht ein text daraus
        if (responseText.includes("success")) {
            alert("Item hinzugefügt!");
        }
        else {
            alert("Daten konnten nicht gespeichert werden!");
        }
    }
}