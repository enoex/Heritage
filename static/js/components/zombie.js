// Generated by CoffeeScript 1.4.0
(function() {

  define(['lib/d3'], function(d3) {
    var Zombie;
    Zombie = (function() {

      function Zombie(entity, params) {
        params = params || {};
        this.entity = entity;
        this.age = params.age || 0.1;
        this.maxSpeed = 4;
        this.seekRange = 1 + (Math.random() * 17 | 0);
        this.resources = params.resources || 100;
        this.isDead = false;
        this.decayRate = params.decayRate || Math.abs(d3.random.normal(1, 0.4)());
        this.strength = Math.random() * 20 | 0;
        this.agility = Math.random() * 20 | 0;
      }

      Zombie.prototype.getIsDead = function(health) {
        if (health <= 0) {
          this.isDead = true;
        }
        return this.isDead;
      };

      Zombie.prototype.getMaxSpeed = function() {
        var maxSpeed;
        maxSpeed = this.maxSpeed;
        if (this.resources < 20) {
          maxSpeed = 2;
        }
        this.maxSpeed = maxSpeed;
        return maxSpeed;
      };

      return Zombie;

    })();
    return Zombie;
  });

}).call(this);
