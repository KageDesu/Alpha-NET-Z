#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::


    #TODO: battleMembers надо переделать, чтобы только тех, кто в бою возвращал

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
        

    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------