#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        if ANNetwork.isConnected()
            @nInitializeNetwork()

    #@[ALIAS]
    ALIAS__onBattleStart = _.onBattleStart
    _.onBattleStart = () ->
        if ANNetwork.isConnected()
            @_nStartBattleObserver()
        ALIAS__onBattleStart.call(@, ...arguments)
    
    #@[ALIAS]
    ALIAS__onBattleEnd = _.onBattleEnd
    _.onBattleEnd = ->
        ALIAS__onBattleEnd.call(@)
        if ANNetwork.isConnected()
            @_nEndBattleObserver()
        return

    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------