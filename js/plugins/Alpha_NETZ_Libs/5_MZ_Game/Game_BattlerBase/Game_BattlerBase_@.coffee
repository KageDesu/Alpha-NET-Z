#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_BattlerBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_BattlerBase::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        @_createNetworkObserver()
    
    #@[ALIAS]
    ALIAS__onBattleStart = _.onBattleStart
    _.onBattleStart = ->
        ALIAS__onBattleStart.call(@)
        if ANNetwork.isConnected()
            @netDataObserver.setCheckMode()
        return

    #@[ALIAS]
    ALIAS__onBattleEnd = _.onBattleEnd
    _.onBattleEnd = ->
        ALIAS__onBattleEnd.call(@)
        if ANNetwork.isConnected()
            @netDataObserver.setInstanteMode()
        return

    return
# ■ END Game_BattlerBase.coffee
#---------------------------------------------------------------------------