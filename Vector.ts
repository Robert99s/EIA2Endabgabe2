namespace FireworkSimulation {

    export class Vector {
        public x: number;
        public y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        // setzt neue Werte für den Vektor
        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        // skaliert die position (kamera bewegt sich auf einen zu oder von einem weg)
        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        // addiert einen Vektor auf den bestehenden Vektor
        add(_add: Vector): void {
            this.x += _add.x;
            this.y += _add.y;
        }

        // kopiert den Vektor und gibt den neuen zurück
        copy(): Vector {
            return new Vector(this.x, this.y);
        }
    }
}