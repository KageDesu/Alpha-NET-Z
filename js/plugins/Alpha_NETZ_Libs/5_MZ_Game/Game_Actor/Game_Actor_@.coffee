#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    #@[ALIAS]
    ALIAS__setup = _.setup
    _.setup = (actorId) ->
        ALIAS__setup.call(@, actorId)
        # * Чтобы refreshNetwork не вызывался когда ещё Actor не создан
        if ANNetwork.isConnected()
            @refreshNetworkDummy = @refreshNetwork
        return

    #@[ALIAS]
    ALIAS__refresh = _.refresh
    _.refresh = ->
        ALIAS__refresh.call(@)
        @refreshNetworkDummy()
    
    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------