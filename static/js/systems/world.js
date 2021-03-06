// Generated by CoffeeScript 1.4.0
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['components/world'], function(WorldComponent) {
    var World;
    World = (function() {

      function World(entities) {
        this.entities = entities;
        WorldComponent.grid = {};
        return this;
      }

      World.prototype.getGrid = function() {
        return WorldComponent.grid;
      };

      World.prototype.getCellFromPosition = function(position) {
        var i, j;
        i = Math.floor(position.y / WorldComponent.cellSize);
        j = Math.floor(position.x / WorldComponent.cellSize);
        return [i, j];
      };

      World.prototype.getNeighborsByCreatureType = function(entity, entities, radius, requiredComponents) {
        var component, continueNeighborLoop, creatureType, neighbor, neighborId, neighbors, world, _i, _j, _len, _len1, _ref;
        neighbors = {
          zombie: [],
          human: []
        };
        requiredComponents = requiredComponents || false;
        world = entity.components.world;
        if (!world) {
          return neighbors;
        }
        _ref = world.getNeighbors(radius);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          neighborId = _ref[_i];
          neighbor = entities.entities[neighborId];
          if (!(neighbor != null)) {
            continue;
          }
          continueNeighborLoop = false;
          if (requiredComponents) {
            for (_j = 0, _len1 = requiredComponents.length; _j < _len1; _j++) {
              component = requiredComponents[_j];
              if (!(neighbor.components[component] != null)) {
                continueNeighborLoop = true;
              }
            }
          }
          if (continueNeighborLoop) {
            continue;
          }
          if (neighbor.hasComponent('zombie')) {
            creatureType = 'zombie';
          } else if (neighbor.hasComponent('human')) {
            creatureType = 'human';
          }
          if (neighborId !== entity.id && creatureType) {
            neighbors[creatureType].push(neighborId);
          }
        }
        return neighbors;
      };

      World.prototype.tick = function(delta) {
        var cell, entity, i, id, j, position, world, _ref, _ref1;
        WorldComponent.grid = {};
        _ref = this.entities.entitiesIndex['world'];
        for (id in _ref) {
          entity = _ref[id];
          world = entity.components.world;
          world.neighborsByRadius.length = 0;
          position = entity.components.position;
          cell = this.getCellFromPosition(position);
          i = cell[0];
          j = cell[1];
          world.i = i;
          world.j = j;
          if (WorldComponent.grid[i] === void 0) {
            WorldComponent.grid[i] = {};
          }
          if (WorldComponent.grid[i][j] === void 0) {
            WorldComponent.grid[i][j] = [];
          }
          if (_ref1 = entity.id, __indexOf.call(WorldComponent.grid[i][j], _ref1) < 0) {
            WorldComponent.grid[i][j].push(entity.id);
          }
        }
        return this;
      };

      return World;

    })();
    return World;
  });

}).call(this);
