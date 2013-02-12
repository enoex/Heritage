#============================================================================
#
#Systems - Renderer
#   Controls the renderer
#
#============================================================================
define([], ()->
    #Nasty, hardcoded canvas for now    
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d')
    
    class Renderer
        constructor: (entities)->
            @entities = entities
            return @
            
        tick: (delta)=>
            #Redraw the canvas
            canvas.width = canvas.width
            
            #Renders to the canvas. Ideally, we'd use events here
            for id, entity of @entities.entitiesIndex['renderer']
            #for id, entity of @entities.getEntities('renderer')
                entity.components.vector.set(
                    Math.random() * 200, Math.random() * 200
                )
                context.save()
                context.fillStyle = entity.components.renderer.color
                context.fillRect(
                    entity.components.vector.x,
                    entity.components.vector.y,
                    entity.components.renderer.size,
                    entity.components.renderer.size
                )
                
                #if there is an image, draw the image
                context.restore()
            
            return @
    
    return Renderer
)
