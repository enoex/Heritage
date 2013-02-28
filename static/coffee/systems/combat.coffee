#============================================================================
#
#Systems - Combat
#   Simulates fighting between entities
#
#============================================================================
define(['components/world', 'systems/world'], (World, WorldSystem)->
    class Combat
        constructor: (entities)->
            @entities = entities
            return @
        
        #--------------------------------
        #
        #Combat helper functions
        #
        #--------------------------------
        updateAttackCounter: (combat)->
            #Updates attack delay for passed in combat component
            
            #update counter
            if combat.attackCounter > 0
                combat.attackCounter -= 1

            if combat.attackCounter <= 0
                combat.canAttack = true

            return combat.canAttack

        calculateDamage: (combat, enemyCombat)->
            #Calculate damage the passd in entity combat component
            # will do the passed in enemy
            # PARAMETERS: Expects two COMBAT components to be passed in
            damage = 0
            
            #get the attack value for the enemy entity
            damage = combat.attack

            #Subtract the enemy attack damage with the entity's defense
            damage -= (enemyCombat.defense / 2)
            #If damage is mitigated because of enemy defense, do SOME damage
            if damage < 0
                damage = combat.attack * 0.02
            
            #Never return a negative number
            if damage < 0
                damage = 0
                
            return damage
            
        fight: (entity, enemyEntity)->
            #Fights an entity with a passed in enemeny. Deals damage to
            #  enemy entity if it can
            #PARAMETERS: Expects two ENTITY components to be passed in

            #Get references
            entityCombat = entity.components.combat
            enemyCombat = enemyEntity.components.combat

            #If entity can't attack, return false
            if not entityCombat.canAttack
                return false
            
            if not entityCombat or not enemyCombat
                #entities do not have combat components
                return false

            #Calculate damage to deal
            damage = @calculateDamage(entityCombat, enemyCombat)
            
            #Subtract damage from enemy
            health = enemyEntity.components.health
            if health
                health.health -= damage

            #Keep track of damage taken
            enemyCombat.damageTaken.push([entity.id, damage])
            entityCombat.damageDealt.push([enemyEntity.id, damage])
            
            #Update the attack counter
            entityCombat.canAttack = false
            #we just attacked, so set the attack counter to the combat delay
            #  NOTE: set it to the delay + 1 because the tick() function calls
            #  updateAttackCounter() BEFORE checking to see if we can attack,
            #  and if we don't add 1 the attackCounter will effectively be one
            #  LESS than the attack delay
            entityCombat.attackCounter = entityCombat.attackDelay + 1

            return true

        #--------------------------------
        #
        #Tick
        #
        #--------------------------------
        tick: (delta)->
            #Look at each entity, then get its neighbors, then fight
            #  (for now, only humans vs. zombies fight. Later, we can do
            #  human v human but keep it simple now)
            #
            #The fight() function is called with two entities and
            #  damage is put onto the stack as {entityId: damage}
            #
            #After the inital look through is complete, look at each
            #  item in the stack and resolve the damage.
            #
            #NOTES: An entity can only fight one other entity at a time
            
            for id, entity of @entities.entitiesIndex['combat']
                isHuman = entity.hasComponent('human')
                isZombie = entity.hasComponent('zombie')
                #store ref to combat component
                combat = entity.components.combat
                combatTarget = entity.components.combat.target
                #only set to true when it gets hit
                combat.wasHit = false
                combat.damageTaken.length = 0
                combat.damageDealt.length = 0

                #If the entity can attack, do it
                if combat.canAttack
                    #store refs
                    health = entity.components.health
                    neighbors = WorldSystem.prototype.getNeighborsByCreatureType(
                        entity, @entities, combat.range, ['combat'])

                    if isHuman
                        targetGroup = 'zombie'
                    if isZombie
                        targetGroup = 'human'

                    #Store reference to neighbors, used in components
                    combat.neighbors.length = 0
                    combat.neighbors = neighbors
                    
                    #Reset target if there are no neighbors
                    if neighbors[targetGroup].length < 1
                        combat.target = null
                    else
                        #There's at least one neighbor, so use it as the new 
                        #target
                        targetEntityId = neighbors[targetGroup][0]
                        
                        #Try to fight the same target
                        if combatTarget? and @entities.entities[combatTarget]
                            targetEntity = @entities.entities[combatTarget]
                        else
                            targetEntity = @entities.entities[targetEntityId]

                        #Set the target to the first entity found
                        combat.target = targetEntity.id

                        @fight(entity, targetEntity)
                    
                #Update attack counter
                @updateAttackCounter(combat)

            return @
            
    return Combat
)
