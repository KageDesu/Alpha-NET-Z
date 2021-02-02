#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    #@[ALIAS]
    ALIAS__setupStartingMembers = _.setupStartingMembers
    _.setupStartingMembers = ->
        if ANNetwork.isConnected()
            # * Нет начальной группы
            @_actors = []
        else
            ALIAS__setupStartingMembers.call(@)
        return
    
    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------