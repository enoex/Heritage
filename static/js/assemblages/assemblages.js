// Generated by CoffeeScript 1.4.0
(function() {

  define(['entity'], function(Entity) {
    var Assemblages;
    Assemblages = {
      human: function() {
        var entity;
        entity = new Entity().addComponent('world').addComponent('position').addComponent('physics').addComponent('flocking').addComponent('randomWalker').addComponent('health').addComponent('combat').addComponent('renderer').addComponent('human');
        return entity;
      },
      zombie: function() {
        var entity;
        entity = new Entity().addComponent('world').addComponent('position').addComponent('physics').addComponent('flocking').addComponent('randomWalker').addComponent('health').addComponent('combat').addComponent('renderer').addComponent('zombie');
        return entity;
      }
    };
    return Assemblages;
  });

}).call(this);
