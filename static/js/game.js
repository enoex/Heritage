// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['entity', 'entities', 'components/all', 'systems/all'], function(Entity, Entities, Components, Systems) {
    var Game;
    Game = (function() {

      function Game() {
        this.loop = __bind(this.loop, this);
        this.entities = new Entities();
        this.systems = new Systems(this.entities).systems;
        this.numTicks = 0;
      }

      Game.prototype.start = function() {
        var _this = this;
        this.entities.add(new Entity()).addComponent('vector').addComponent('renderer');
        this.loop();
        return setInterval(function() {
          return console.log('Ticks after 1 sec: ' + _this.numTicks);
        }, 1000);
      };

      Game.prototype.loop = function() {
        var system, systemName, _ref;
        requestAnimFrame(this.loop);
        _ref = this.systems;
        for (systemName in _ref) {
          system = _ref[systemName];
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
