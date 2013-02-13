// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector'], function(Vector) {
    var Physics;
    Physics = (function() {

      function Physics(entity, params) {
        params = params || {};
        this.entity = entity;
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.maxSpeed = params.maxSpeed || 8;
        this.maxForce = params.maxForce || 5;
        this.maxSeekForceDistance = params.maxSeekForceDistance || 100;
        this.mass = params.mass || 10;
        return this;
      }

      Physics.prototype.tick = function(delta) {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        if (this.entity) {
          this.entity.components.position.add(this.velocity);
        }
        return this.acceleration.multiply(0);
      };

      return Physics;

    })();
    return Physics;
  });

}).call(this);