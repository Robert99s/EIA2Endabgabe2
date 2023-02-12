//Endabgabe EIA2 Feuerwerk
//Name: Robert Schindler
//Matrikel: 271342
//Datum: 12.02.2023
//Quellen: Henning Pils 269355
namespace FireworkSimulation {

    window.addEventListener("load", async () => {
        let serverRockets: Rocket[] = await handleLoad();
        serverRockets.forEach(rocket => {
            addRocket(rocket);
        });
    });

    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    export let refreshRate: number = 10;


    // Globale Variablen für HTML Elemente
    let savedRocketsSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("saved-rockets-select");
    let nameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("rocket-name");
    let numCirclesInput: HTMLInputElement = <HTMLInputElement>document.getElementById("num-circles");
    let colorInput: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion-color");
    let sizeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion-size");
    let lifetimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion-lifetime");
    let buildRocketButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("build-rocket-button");
    // Hier sollen die einzelnen abgeschossenen Raketen während ihrer Lebenszeit gespeichert.
    let explosions: Explosion[] = [];

    canvas.addEventListener("click", createExplosion);

    function createExplosion(_event: MouseEvent): void {
        // x und y position der maus auf dem canvas werden ausgelesen. Es wird der Offset vom Canvas zum Seitenrand abgezogen
        let x: number = _event.clientX - crc2.canvas.offsetLeft;
        let y: number = _event.clientY - crc2.canvas.offsetTop;

        let explosionPosition: Vector = new Vector(x, y);
        let explosion: Explosion = new Explosion(explosionPosition, Number(numCirclesInput.value), colorInput.value, Number(sizeInput.value), Number(lifetimeInput.value));
        explosions.push(explosion);
    }

    // Eine Standard Rakete wird initialisiert
    let rockets: Rocket[] = [];
    addRocket({ "Standard": { particleAmount: 100, color: "#a34da3", size: 5, lifetime: 5 } });
    // Hier wird die Standardrakete als anfangs gewählte Rakete ausgewählt
    let selectedRocket: Rocket = rockets[0];
    setInputValuesToSelectedRocket(selectedRocket);

    // füge die Rakete zu dem Raketearray hinzu und zeige die Option an
    function addRocket(_rocket: Rocket): void {
        // Name ist in [], damit auch der string und nicht "_name" als name verwendet wird
        rockets.push(_rocket);
        showRocketsToSelect();
    }

    // speichere die Rakete, wenn auf speichern geklickt wird
    buildRocketButton.addEventListener("click", () => {
        let name: string = nameInput.value;
        let numCircles: number = Number(numCirclesInput.value);
        let color: string = colorInput.value;
        let size: number = Number(sizeInput.value);
        let lifetime: number = Number(lifetimeInput.value);
        if (size > 5 || lifetime > 5 || numCircles > 1000) {
            alert("maximal Wert überschritten");
            return;
        }
        if (name) {
            let newRocket: Rocket = { [name]: { particleAmount: numCircles, color: color, size: size, lifetime: lifetime } };
            addRocket(newRocket);
            // Hier wird die Rakete eventuell direkt an den Server gesendet
            saveRocket(newRocket);
        } else {
            alert("Gib einen Name ein!");
        }
    });

    // Füge die gespeicherten Raketen dem Auswahlmenü hinzu
    function showRocketsToSelect(): void {

        savedRocketsSelect.innerHTML = "";

        for (let rocket of rockets) {
            let option: HTMLOptionElement = document.createElement("option");
            // Object.keys(rocket)[0] stellt hier den Name der Rakete dar
            option.value = Object.keys(rocket)[0];
            option.text = Object.keys(rocket)[0];
            savedRocketsSelect.add(option);
        }

        // setze die Anzeige auf die letzte Rakete (diese ist auch die am neusten hinzugefügte)
        savedRocketsSelect.value = Object.keys(rockets[rockets.length - 1])[0];
        setInputValuesToSelectedRocket(rockets[rockets.length - 1]);
    }

    // Reagiere auf Änderungen des ausgewählten Elements
    savedRocketsSelect.addEventListener("change", () => {
        let selectedRocket: Rocket | undefined = rockets.find(rocket => Object.keys(rocket)[0] === savedRocketsSelect.value);
        if (selectedRocket) {
            // setze die 
            setInputValuesToSelectedRocket(selectedRocket);
            // Hier könnte man die Eingabefelder mit den Werten der ausgewählten Rakete füllen
            // ...
        } else {
            throw new Error("Diese Auswahl existiert nicht.");
        }
    });

    function setInputValuesToSelectedRocket(_rocket: Rocket): void {
        let rocketName: string = Object.keys(_rocket)[0];
        nameInput.value = rocketName;
        numCirclesInput.value = _rocket[rocketName].particleAmount.toString();
        colorInput.value = _rocket[rocketName].color;
        sizeInput.value = _rocket[rocketName].size.toString();
        lifetimeInput.value = _rocket[rocketName].lifetime.toString();
    }

    setInterval(update, refreshRate);

    // Hier werden alle explosions und ihre partikel neu gemalt
    function update(): void {
        crc2.fillStyle = "rgba(50, 50, 50, 0.05)";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        explosions.forEach((explosion, index) => {
            // Entferne die Rakete, wenn die Lebenszeit vorbei ist
            if (explosion.lifetime == 0) {
                explosions.splice(index, 1);
                index--;
            } else {
                explosion.draw();
            }
        });
    }
}
