namespace FireworkSimulation {

    window.addEventListener("load", async () => {
        let serverRockets: Rocket[] = await handleLoad();
        serverRockets.forEach(rocket => {
           // Funktion addRockets erstellen und hier einfügen
        });
    });

    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    export let refreshRate: number = 10;
    setInterval(update, refreshRate);


    // Globale Variablen für HTML Elemente
    let savedRocketsSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("saved-rockets-select");
    let nameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("rocket-name");
    let numCirclesInput: HTMLInputElement = <HTMLInputElement>document.getElementById("num-circles");
    let colorInput: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion-color");
    let sizeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion-size");
    let lifetimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion-lifetime");

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

    //Nächster Schritt
    /*
    Funktion Rakete initialisieren
    Click Event Rakete speichern

    */
}
