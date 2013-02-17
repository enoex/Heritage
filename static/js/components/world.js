// Generated by CoffeeScript 1.4.0
(function() {

  define([], function() {
    var World, canvas, canvasHeight, canvasWidth, context;
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    World = (function() {

      World.width = canvasWidth;

      World.height = canvasHeight;

      World.canvas = canvas;

      World.context = context;

      World.grid = {};

      World.cellSize = 10;

      World.rows = canvasHeight / World.cellSize;

      World.columns = canvasWidth / World.cellSize;

      function World(entity, params) {
        params = params || {};
        this.entity = entity;
        this.width = params.width || World.width;
        this.height = params.height || World.width;
        this.canvas = params.canvas || World.canvas;
        this.context = params.context || World.context;
        this.neighbors = [];
        return this;
      }

      World.prototype.getNeighbors = function(radius) {
        var entity, i, j, neighbors, targetEntities, targetI, targetJ, _i, _j, _k, _len;
        radius = radius || 1;
        neighbors = [];
        for (i = _i = -radius; _i <= radius; i = _i += 1) {
          for (j = _j = -radius; _j <= radius; j = _j += 1) {
            targetI = this.i + i;
            targetJ = this.j + j;
            if (targetI > World.rows) {
              targetI = targetI % World.rows;
            }
            if (targetI < 0) {
              targetI = World.rows + targetI;
            }
            if (targetJ > World.columns) {
              targetJ = targetJ % World.columns;
            }
            if (targetJ < 0) {
              targetJ = World.columns + targetJ;
            }
            if (World.grid[targetI] && World.grid[targetI][targetJ]) {
              targetEntities = World.grid[targetI][targetJ];
              for (_k = 0, _len = targetEntities.length; _k < _len; _k++) {
                entity = targetEntities[_k];
                if (entity.id !== this.entity.id) {
                  neighbors.push(entity);
                }
              }
            }
          }
        }
        this.neighbors = neighbors;
        return neighbors;
      };

      World.prototype.getCellFromPosition = function(position) {
        var i, j;
        i = Math.floor(position.y / World.cellSize);
        j = Math.floor(position.x / World.cellSize);
        return {
          i: i,
          j: j
        };
      };

      World.prototype.tick = function(delta) {
        var cell, position;
        position = this.entity.components.position;
        cell = this.getCellFromPosition(position);
        this.i = cell.i;
        this.j = cell.j;
        if (World.grid[this.i] === void 0) {
          World.grid[this.i] = {};
        }
        if (World.grid[this.i][this.j] === void 0) {
          World.grid[this.i][this.j] = [];
        }
        return World.grid[this.i][this.j].push(this.entity);
      };

      return World;

    })();
    return World;
  });

}).call(this);
