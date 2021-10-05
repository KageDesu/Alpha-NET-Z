#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    #@[ALIAS]
    ALIAS__battleMembers = _.battleMembers
    _.battleMembers = ->
        if ANNetwork.isConnected()
            return ANBattleManager.battleMembers()
        else
            return ALIAS__battleMembers.call(@)
        

    #@[ALIAS]
    ALIAS__setupStartingMembers = _.setupStartingMembers
    _.setupStartingMembers = ->
        if ANNetwork.isConnected()
            # * Нет начальной группы
            @_actors = []
        else
            ALIAS__setupStartingMembers.call(@)
        return
    
    #@[ALIAS]
    ALIAS__leader = _.leader
    _.leader = ->
        if ANNetwork.isConnected()
            return @networkLeader()
        else
            return ALIAS__leader.call(@)
    
    #@[ALIAS]
    ALIAS__charactersForSavefile = _.charactersForSavefile
    _.charactersForSavefile = ->
        if ANNetwork.isConnected()
            return @members().map (actor) -> [
                actor.characterName(),
                actor.characterIndex()
            ]
        else
            return ALIAS__charactersForSavefile.call(@)
        
    #@[ALIAS]
    ALIAS__facesForSavefile = _.facesForSavefile
    _.facesForSavefile = ->
        if ANNetwork.isConnected()
            return @members().map (actor) -> [
                actor.faceName(),
                actor.faceIndex()
            ]
        else
            return ALIAS__facesForSavefile.call(@)
        

    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------