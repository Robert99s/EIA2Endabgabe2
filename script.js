"use strict";
var FireworkSimulation;
(function (FireworkSimulation) {
    window.addEventListener("load", async () => {
        let serverRockets = await FireworkSimulation.handleLoad();
        serverRockets.forEach(rocket => {
            // Funktion addRockets erstellen und hier einfügen
        });
    });
    FireworkSimulation.canvas = document.getElementById("canvas");
    FireworkSimulation.crc2 = FireworkSimulation.canvas.getContext("2d");
    FireworkSimulation.refreshRate = 10;
    setInterval(update, FireworkSimulation.refreshRate);
    // Globale Variablen für HTML Elemente
    let savedRocketsSelect = document.getElementById("saved-rockets-select");
    let nameInput = document.getElementById("rocket-name");
    let numCirclesInput = document.getElementById("num-circles");
    let colorInput = document.getElementById("explosion-color");
    let sizeInput = document.getElementById("explosion-size");
    let lifetimeInput = document.getElementById("explosion-lifetime");
    // Hier sollen die einzelnen abgeschossenen Raketen während ihrer Lebenszeit gespeichert.
    let explosions = [];
    FireworkSimulation.canvas.addEventListener("click", createExplosion);
    function createExplosion(_event) {
        // x und y position der maus auf dem canvas werden ausgelesen. Es wird der Offset vom Canvas zum Seitenrand abgezogen
        let x = _event.clientX - FireworkSimulation.crc2.canvas.offsetLeft;
        let y = _event.clientY - FireworkSimulation.crc2.canvas.offsetTop;
        let explosionPosition = new FireworkSimulation.Vector(x, y);
        let explosion = new FireworkSimulation.Explosion(explosionPosition, Number(numCirclesInput.value), colorInput.value, Number(sizeInput.value), Number(lifetimeInput.value));
        explosions.push(explosion);
    }
    // Hier werden alle explosions und ihre partikel neu gemalt
    function update() {
        FireworkSimulation.crc2.fillStyle = "rgba(50, 50, 50, 0.05)";
        FireworkSimulation.crc2.fillRect(0, 0, FireworkSimulation.canvas.width, FireworkSimulation.canvas.height);
        explosions.forEach((explosion, index) => {
            // Entferne die Rakete, wenn die Lebenszeit vorbei ist
            if (explosion.lifetime == 0) {
                explosions.splice(index, 1);
                index--;
            }
            else {
                explosion.draw();
            }
        });
    }
    //Nächster Schritt
    /*
    Funktion Rakete initialisieren
    Click Event Rakete speichern

    */
})(FireworkSimulation || (FireworkSimulation = {}));
//# sourceMappingURL=script.js.map