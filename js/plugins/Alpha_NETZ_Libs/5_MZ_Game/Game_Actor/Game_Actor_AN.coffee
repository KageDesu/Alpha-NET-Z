#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    # * Данный персонаж - мой сетевой персонаж (текущего игрока)
    _.isMyNetworkActor = ->
        if ANNetwork.isConnected()
            return @ == $gameParty.leader()
        else
            return true
    
    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------