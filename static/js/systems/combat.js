// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/world', 'systems/world'], function(World, WorldSystem) {
    var Combat;
    Combat = (function() {

      function Combat(entities) {
        this.entities = entities;
        return this;
      }

      Combat.prototype.updateAttackCounter = function(combat) {
        if (combat.attackCounter > 0) {
          combat.attackCounter -= 1;
        }
        if (combat.attackCounter <= 0) {
          combat.canAttack = true;
        }
        return combat.canAttack;
      };

      Combat.prototype.calculateDamage = function(combat, enemyCombat) {
        var damage;
        damage = 0;
        damage = combat.attack;
        damage -= enemyCombat.defense;
        if (damage < 0) {
          damage = 0;
        }
        return damage;
      };

      Combat.prototype.fight = function(entity, enemyEntity) {
        var damage, enemyCombat, entityCombat, health;
        entityCombat = entity.components.combat;
        enemyCombat = enemyEntity.components.combat;
        if (!entityCombat.canAttack) {
          return false;
        }
        if (!entityCombat || !enemyCombat) {
          return false;
        }
        damage = this.calculateDamage(entityCombat, enemyCombat);
        health = enemyEntity.components.health;
        if (health) {
          health.health -= damage;
        }
        enemyCombat.damageTaken.push(damage);
        entityCombat.canAttack = false;
        entityCombat.attackCounter = entityCombat.attackDelay + 1;
        return true;
      };

      Combat.prototype.tick = function(delta) {
        var combat, combatTarget, entity, health, id, isHuman, isZombie, neighbors, targetEntity, targetEntityId, targetGroup, _ref;
        _ref = this.entities.entitiesIndex['combat'];
        for (id in _ref) {
          entity = _ref[id];
          isHuman = entity.hasComponent('human');
          isZombie = entity.hasComponent('zombie');
          combat = entity.components.combat;
          combatTarget = entity.components.combat.target;
          combat.wasHit = false;
          combat.damageTaken.length = 0;
          if (combat.canAttack) {
            health = entity.components.health;
            neighbors = WorldSystem.prototype.getNeighborsByCreatureType(entity, this.entities, combat.range, ['combat']);
            if (isHuman) {
              targetGroup = 'zombie';
            }
            if (isZombie) {
              targetGroup = 'human';
            }
            if (neighbors[targetGroup].length < 1) {
              entity.components.combat.target = null;
            } else {
              targetEntityId = neighbors[targetGroup][0];
              if ((combatTarget != null) && this.entities.entities[combatTarget]) {
                targetEntity = this.entities.entities[combatTarget];
              } else {
                targetEntity = this.entities.entities[targetEntityId];
              }
              entity.components.combat.target = targetEntity.id;
              this.fight(entity, targetEntity);
            }
          }
          this.updateAttackCounter(combat);
        }
        return this;
      };

      return Combat;

    })();
    return Combat;
  });

}).call(this);
