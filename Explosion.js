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
                // kopiere die Partikel-Position, damit jeder partikel eine eigene Position hat.
                let particlePosition = _mousePosition.copy();
                // Hier werden alle Partikel dieser Explosion erstellt und die Lebenszeit zufällig kleiner als die der Rakete gehalten
                this.particles.push(new FireworkSimulation.Particle(particlePosition, particleVelocity, _color, _size, _lifetime - Math.random() * this.lifetime));
            }
        }
        draw() {
            // Hier wird die Rakete noch visuell dargestellt
            this.drawParticles();
        }
        drawParticles() {
            this.particles.forEach((particle, index) => {
                // Male die Partikel nur, wenn sie auch noch leben sollen
                if (particle.lifetime > 0) {
                    particle.move();
                }
                else {
                    // entferne den Partikel, wenn er keine Lebenszeit mehr hat
                    this.particles.splice(index, 1);
                }
            });
            if (this.particles.length == 0) {
                this.lifetime = 0;
            }
        }
    }
    FireworkSimulation.Explosion = Explosion;
})(FireworkSimulation || (FireworkSimulation = {}));
//# sourceMappingURL=Explosion.js.map