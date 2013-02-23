// Generated by CoffeeScript 1.4.0
(function() {

  define(['systems/loggerHelper'], function(LoggerHelper) {
    var Logger;
    Logger = (function() {

      function Logger(entities) {
        this.entities = entities;
        return this;
      }

      Logger.prototype.tick = function(delta) {
        var entity, entityCounts, id, performance, _ref;
        performance = window.performance || {};
        entityCounts = {
          all: 0,
          human: 0,
          zombie: 0
        };
        _ref = this.entities.entities;
        for (id in _ref) {
          entity = _ref[id];
          entityCounts.all += 1;
          if (entity.hasComponent('human')) {
            entityCounts.human += 1;
          }
          if (entity.hasComponent('zombie')) {
            entityCounts.zombie += 1;
          }
        }
        LoggerHelper.log({
          entityCounts: entityCounts,
          tickNum: delta
        });
        return this;
      };

      return Logger;

    })();
    return Logger;
  });

}).call(this);
