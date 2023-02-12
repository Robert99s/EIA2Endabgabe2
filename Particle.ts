namespace FireworkSimulation {
    export class Particle extends Moveable {
        color: string;
        size: number;

        constructor(_position: Vector, _veloctiy: Vector, _color: string, _size: number, _lifetime: number) {
            super(_position, _veloctiy, _lifetime);
            this.color = _color;
            this.size = _size;
        }

        move(): void {
            super.move(refreshRate / 1000);
            this.draw();
        }

        draw(): void {
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            crc2.strokeStyle = this.color;
            crc2.stroke();
        }
    }
}