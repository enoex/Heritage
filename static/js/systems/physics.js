// Generated by CoffeeScript 1.4.0
(function() {

  define([], function() {
    var Physics, canvas, context;
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    Physics = (function() {

      function Physics(entities) {
        this.entities = entities;
        return this;
      }

      Physics.prototype.updatePhysics = function(entity) {
        var physics;
        physics = entity.components.physics;
        physics.velocity.add(physics.acceleration);
        physics.velocity.limit(physics.maxSpeed);
        if (entity) {
          entity.components.position.add(physics.velocity);
        }
        physics.acceleration.multiply(0);
        this.checkEdges(entity);
        return this;
      };

      Physics.prototype.checkEdges = function(entity) {
        var physics, position;
        physics = entity.components.physics;
        position = entity.components.position;
        if (position.x >= physics.maxX) {
          position.x = position.x % physics.maxX;
        } else if (position.x < 0) {
          position.x = physics.maxX - 1;
        }
        if (position.y >= physics.maxY) {
          position.y = position.y % physics.maxY;
        } else if (position.y < 0) {
          position.y = physics.maxY - 1;
        }
        return entity;
      };

      Physics.prototype.tick = function(delta) {
        var entity, id, mateId, neighbor, physics, zombie, _i, _len, _ref, _ref1, _results;
        _ref = this.entities.entitiesIndex['physics'];
        _results = [];
        for (id in _ref) {
          entity = _ref[id];
          physics = entity.components.physics;
          if (entity.hasComponent('randomWalker')) {
            physics.applyForce(entity.components.randomWalker.walkForce());
          }
          if (entity.hasComponent('flocking')) {
            if (entity.hasComponent('human')) {
              entity.components.flocking.flock(this.entities.entitiesIndex.human);
            }
            if (entity.hasComponent('zombie')) {
              entity.components.flocking.flock(this.entities.entitiesIndex.zombie);
            }
          }
          if (entity.hasComponent('human') && this.entities.entitiesIndex.zombie) {
            _ref1 = entity.components.world.getNeighbors(4);
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              neighbor = _ref1[_i];
              if (neighbor.hasComponent('zombie')) {
                zombie = neighbor;
                physics.applyForce(physics.seekForce(zombie, 20).multiply(-8));
              }
            }
          }
          if (entity.hasComponent('human')) {
            mateId = entity.components.human.mateId;
            if (mateId !== null) {
              if (this.entities.entities[mateId]) {
                physics.applyForce(physics.seekForce(this.entities.entities[mateId]).multiply(2));
              }
            }
          }
          _results.push(this.updatePhysics(entity));
        }
        return _results;
      };

      return Physics;

    })();
    return Physics;
  });

}).call(this);
