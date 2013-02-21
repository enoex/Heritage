#============================================================================
#
#Systems - Living (Think of better name?)
#   Handles logic to keep an entity 'alive'
#
#   components used:
#       human
#       physics
#============================================================================
define(['entity', 'assemblages/assemblages'], (Entity, Assemblages)->
    class Living
        @ageSpeed = 0.05

        constructor: (entities)->
            @entities = entities
            return @

        #--------------------------------
        #Update helpers
        #--------------------------------
        updateHuman: (entity)->
            #During each tick, update properties based on current properties
            human = entity.components.human
            physics = entity.components.physics
            health = entity.components.health
            
            #Update age
            human.age += Living.ageSpeed
            
            physics.maxSpeed = human.getMaxSpeed()
            
            #update resources
            human.resources = human.calculateResources()
            
            #Update health
            health.health = human.calculateHealth(health.health)
            human.isDead = human.getIsDead(health.health)
            
            #If human is dead and infected it should create a zombie
            #------------------------
            if human.isDead and human.hasZombieInfection
                #TODO: Use some sort of factory to create this
                newZombie = Assemblages.zombie()
                    
                #Turn entity to a zombie
                if entity.hasComponent('userMovable')
                    newZombie.addComponent('userMovable')
                    
                newZombie.components.position = entity.components.position.copy()
                @entities.add(newZombie)
                
            #If the entity is dead, remove it
            #------------------------
            if human.isDead
                @entities.remove(entity)
                
            return true
        
        #ZOMBIE 
        #--------------------------------
        updateZombie: (entity)->
            zombie = entity.components.zombie
            physics = entity.components.physics
            health = entity.components.health
            
            #Update age
            zombie.age += Living.ageSpeed
            
            physics.maxSpeed = zombie.getMaxSpeed()
            
            #update resources
            zombie.resources = zombie.calculateResources()
            
            #Update health
            health.health = zombie.calculateHealth(health.health)
            zombie.isDead = zombie.getIsDead(health.health)
            
            #If the entity is dead, remove it
            #------------------------
            if zombie.isDead
                @entities.remove(entity)
            
            return true
        
        #--------------------------------
        #
        #tick
        #
        #--------------------------------
        tick: (delta)->
            #Go through all creatures (note: humans, zombies, etc. all have
            #  a creature component)
            for id, entity of @entities.entitiesIndex['human']
                @updateHuman(entity)
                
            for id, entity of @entities.entitiesIndex['zombie']
                @updateZombie(entity)
    
            return @
        
    return Living
)
