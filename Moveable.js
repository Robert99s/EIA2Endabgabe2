"use strict";
var RocketSimulation;
(function (RocketSimulation) {
    class Moveable {
        position;
        velocity;
        lifetime;
        constructor(_position, _velocity, _lifetime) {
            this.position = _position;
            this.velocity = _velocity;
            this.lifetime = _lifetime;
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            this.lifetime -= _timeslice;
        }
    }
    RocketSimulation.Moveable = Moveable;
})(RocketSimulation || (RocketSimulation = {}));
//# sourceMappingURL=Moveable.js.map