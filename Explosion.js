"use strict";
var FireworkSimulation;
(function (FireworkSimulation) {
    class Explosion extends FireworkSimulation.Moveable {
        particles;
        // Erstellen von particle
        constructor(_mousePosition, _particleAmount, _color, _size, _lifetime) {
            super(_mousePosition, new FireworkSimulation.Vector(0, 0), _lifetime);
            this.particles = [];
            for (let i = 0; i < _particleAmount; i++) {
                // kreieren eine zufällige velocity für jeden Partikel
                let particleVelocity = new FireworkSimulation.Vector((Math.random()) * 10, (Math.random()) * 10);
                // Hier werden alle Partikel dieser Explosion erstellt und die Lebenszeit zufällig kleiner als die der Rakete gehalten
                this.particles.push(new FireworkSimulation.Particle(_mousePosition, particleVelocity, _color, _size, _lifetime - Math.random() * this.lifetime));
            }
        }
        draw() {
            // Hier wird die Rakete noch visuell dargestellt
        }
    }
    FireworkSimulation.Explosion = Explosion;
})(FireworkSimulation || (FireworkSimulation = {}));
//# sourceMappingURL=Explosion.js.map