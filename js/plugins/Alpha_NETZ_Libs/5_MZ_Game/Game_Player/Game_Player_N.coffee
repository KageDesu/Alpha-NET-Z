#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    _._fillNetworkObserver = ->
        super()
        #TODO: check Dashing
        @netDataObserver.addFields(@, [
            "_dashing"
        ])
        return

    _.dataOserverHaveChanges = ->
        "SEND OBSERVER TO NETWORK".p()
        ANGameManager.sendPlayerObserver()

    _.updateNetwork = ->

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------