namespace FireworkSimulation {

    export class Explosion extends Moveable {
        particles: Particle[];

        // Erstellen von particle
        constructor(_mousePosition: Vector, _particleAmount: number, _color: string, _size: number, _lifetime: number) {
            super(_mousePosition, new Vector(0, 0), _lifetime);

            this.particles = [];
            for (let i: number = 0; i < _particleAmount; i++) {
                // kreieren eine zufällige velocity für jeden Partikel
                let particleVelocity: Vector = new Vector((Math.random()) * 100, (Math.random()) * 100);
                // kopiere die Partikel-Position, damit jeder partikel eine eigene Position hat.
                let particlePosition: Vector = _mousePosition.copy();
                // Hier werden alle Partikel dieser Explosion erstellt und die Lebenszeit zufällig kleiner als die der Rakete gehalten
                this.particles.push(new Particle(particlePosition, particleVelocity, _color, _size, _lifetime - Math.random() * this.lifetime));
            }
        }

        draw(): void {
            // Hier wird die Rakete noch visuell dargestellt
            this.drawParticles();
        }

        drawParticles(): void {
            this.particles.forEach((particle, index) => {
                // Male die Partikel nur, wenn sie auch noch leben sollen
                if (particle.lifetime > 0) {
                    particle.move();
                } else {
                    // entferne den Partikel, wenn er keine Lebenszeit mehr hat
                    this.particles.splice(index, 1);
                }
            });

            if (this.particles.length == 0) {
                this.lifetime = 0;
            }
        }
    }
}