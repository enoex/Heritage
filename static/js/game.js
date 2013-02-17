// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['entity', 'entities', 'components/all', 'systems/all'], function(Entity, Entities, Components, Systems) {
    var Game;
    Game = (function() {

      function Game() {
        this.gameLoop = __bind(this.gameLoop, this);

        var _this = this;
        this.entities = new Entities();
        this.systems = new Systems(this.entities).systems;
        this.numTicks = 0;
        this.paused = false;
        document.addEventListener('keydown', function(e) {
          if (e.keyCode === 32) {
            _this.paused = !_this.paused;
            if (!_this.paused) {
              return _this.gameLoop();
            }
          } else {
            return _this.paused = false;
          }
        });
      }

      Game.prototype.start = function() {
        var entity, i;
        i = 0;
        while (i < 35) {
          entity = new Entity();
          entity.addComponent('world').addComponent('position').addComponent('physics').addComponent('randomWalker').addComponent('renderer').addComponent('flocking');
          if (Math.random() < 0.5) {
            entity.addComponent('zombie');
          } else {
            entity.addComponent('spawner');
            entity.addComponent('human');
            entity.components.human.age = Math.random() * 100 | 0;
          }
          entity.components.position.x = Math.random() * 500 | 0;
          entity.components.position.y = Math.random() * 500 | 0;
          this.entities.add(entity);
          i++;
        }
        return this.gameLoop();
      };

      Game.prototype.gameLoop = function() {
        var system, _i, _len, _ref;
        if (this.paused) {
          return true;
        }
        requestAnimFrame(this.gameLoop);
        _ref = this.systems;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          system = _ref[_i];
          if (system.tick) {
            system.tick(this.numTicks);
          }
        }
        return this.numTicks += 1;
      };

      return Game;

    })();
    return Game;
  });

}).call(this);
