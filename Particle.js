"use strict";
var FireworkSimulation;
(function (FireworkSimulation) {
    class Particle extends FireworkSimulation.Moveable {
        color;
        size;
        constructor(_position, _veloctiy, _color, _size, _lifetime) {
            super(_position, _veloctiy, _lifetime);
            this.color = _color;
            this.size = _size;
        }
        move() {
            super.move(FireworkSimulation.refreshRate / 1000);
            this.draw();
        }
        draw() {
            FireworkSimulation.crc2.beginPath();
            FireworkSimulation.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            FireworkSimulation.crc2.strokeStyle = this.color;
            FireworkSimulation.crc2.stroke();
        }
    }
    FireworkSimulation.Particle = Particle;
})(FireworkSimulation || (FireworkSimulation = {}));
//# sourceMappingURL=Particle.js.map