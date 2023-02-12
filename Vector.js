"use strict";
var FireworkSimulation;
(function (FireworkSimulation) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        // setzt neue Werte für den Vektor
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        // skaliert die position (kamera bewegt sich auf einen zu oder von einem weg)
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        // addiert einen Vektor auf den bestehenden Vektor
        add(_add) {
            this.x += _add.x;
            this.y += _add.y;
        }
        // kopiert den Vektor und gibt den neuen zurück
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    FireworkSimulation.Vector = Vector;
})(FireworkSimulation || (FireworkSimulation = {}));
//# sourceMappingURL=Vector.js.map