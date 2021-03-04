#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    #@[ALIAS]
    ALIAS__onBattleStart = _.onBattleStart
    _.onBattleStart = () ->
        if ANNetwork.isConnected()
            @_nCreateBattleObserver()
        ALIAS__onBattleStart.call(@, ...arguments)
    
    #@[ALIAS]
    ALIAS__onBattleEnd = _.onBattleEnd
    _.onBattleEnd = ->
        ALIAS__onBattleEnd.call(@)
        if ANNetwork.isConnected()
            @_nDestroyBattleObserver()
        return


    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------