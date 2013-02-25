// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector', 'components/world'], function(Vector, World) {
    var UserInterface, canvas;
    canvas = document.getElementById('canvas');
    UserInterface = (function() {

      function UserInterface(entities) {
        var _this = this;
        this.entities = entities;
        this.mouse = new Vector(0, 0);
        this.$debug = document.getElementById('debug');
        canvas.addEventListener('mousemove', function(e) {
          _this.mouse.x = e.clientX;
          return _this.mouse.y = e.clientY;
        });
        return this;
      }

      UserInterface.prototype.getEntitiesUnderMouse = function(e) {
        return entities;
      };

      UserInterface.prototype.showUserMovableInfo = function() {
        var entities, entity, html, key;
        html = '';
        entities = this.entities.entitiesIndex.userMovable;
        for (key in entities) {
          entity = entities[key];
          html = 'ID: ' + entity.id;
          html += '<br />Health: ' + entity.components.health.health;
          html += '<br />Resources: ' + entity.components.resources.resources;
          if (entity.hasComponent('human')) {
            html += '<br />Age: ' + entity.components.human.age;
            html += '<br />Mate: ' + entity.components.human.mateId;
            html += '<br />Infected:' + entity.components.human.hasZombieInfection;
          }
          if (entity.hasComponent('combat')) {
            html += '<br />Attack: ' + entity.components.combat.attack;
            html += '<br />Defense: ' + entity.components.combat.defense;
            html += '<br />AttackCounter: ' + entity.components.combat.attackCounter;
            html += '<br />Delay: ' + entity.components.combat.attackDelay;
            html += '<br />Target: ' + entity.components.combat.target;
            html += '<br />Range: ' + entity.components.combat.range;
          }
          if (entity.hasComponent('world')) {
            html += '<hr />';
            html += '<br />Position';
            html += '<br />X: ' + entity.components.position.x;
            html += '<br />Y: ' + entity.components.position.y;
            html += '<br /><br />World';
            html += '<br />I: ' + entity.components.world.i;
            html += '<br />J: ' + entity.components.world.j;
          }
          if (entity.components.combat.damageTaken.length > 0) {
            console.log('HIT!');
            console.log(entity.components.combat.damageTaken);
          }
        }
        this.$debug.innerHTML += html;
        return entities;
      };

      UserInterface.prototype.showEntityInfo = function() {
        this.$debug.innerHTMl += '<br /><br />Entity Info';
        this.$debug.innerHTML += '<br />Humans: ' + Object.keys(this.entities.entitiesIndex.human).length;
        this.$debug.innerHTML += '<br />Zombies: ' + Object.keys(this.entities.entitiesIndex.zombie).length + '<br />';
        return true;
      };

      UserInterface.prototype.tick = function(delta) {
        this.$debug.innerHTML = '';
        this.showEntityInfo();
        this.showUserMovableInfo();
        return this;
      };

      return UserInterface;

    })();
    return UserInterface;
  });

}).call(this);
