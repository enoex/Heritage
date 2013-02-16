#============================================================================
#
#Systems - World 
#   Handles logic for updating game grid
#   TODO: Change the way this works, it's sort of acting like
#   a singleton in a sense
#
#============================================================================
define(['components/world'], (WorldComponent)->
    class World
        constructor: (entities)->
            @entities = entities
            return @
        
        tick: (delta)->
            #Reset the world grid
            #TODO: This way restricts us to only one world object
            WorldComponent.grid = {}
        
            for id, entity of @entities.entitiesIndex['world']
                #Update the grid with this entity's position
                entity.components.world.tick()
                
                #If the entity is dead, remove it
                if entity.components.human.isDead
                    @entities.remove(entity)
    
            for id, entity of @entities.entitiesIndex['world']
                entity.components.world.getNeighbors()
            
    return World
)
