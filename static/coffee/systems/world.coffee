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
            WorldComponent.grid = {}
            return @

        #--------------------------------
        #
        #Helpers
        #
        #--------------------------------
        getCellFromPosition: (position)->
            #Gets cell i / j from position
            i = Math.floor(position.y / WorldComponent.cellSize)
            j = Math.floor(position.x / WorldComponent.cellSize)
            return [i,j]
        
        #--------------------------------
        #
        #Tick
        #
        #-------------------------------- 
        tick: (delta)->
            #Reset the world grid
            #TODO: This way restricts us to only one world object 
            for id, entity of @entities.entitiesIndex['world']
                #Update the grid with this entity's position
                world = entity.components.world
                
                #On each game tick, update the game world
                position = entity.components.position
                cell = @getCellFromPosition(position)
                
                #Update this cell's position
                i = cell[0]
                j = cell[1]
                world.i = i
                world.j = j
                
                #Add entity to the corresponding cell. NOTE: The grid is cleared 
                #  tick in the system.  TODO: Should this live in the system too?
                if WorldComponent.grid[i] == undefined
                    WorldComponent.grid[i] = {}
                if WorldComponent.grid[i][j] == undefined
                    WorldComponent.grid[i][j] = []
                
                WorldComponent.grid[i][j].push(entity)

            #Get each entity's neighbors
            for id, entity of @entities.entitiesIndex['world']
                entity.components.world.getNeighbors()
                
            return @
            
    return World
)
