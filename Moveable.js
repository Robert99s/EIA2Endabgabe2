"use strict";
var FireworkSimulation;
(function (FireworkSimulation) {
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
    FireworkSimulation.Moveable = Moveable;
})(FireworkSimulation || (FireworkSimulation = {}));
//# sourceMappingURL=Moveable.js.map