#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    _.dataOserverHaveChanges = ->
        ANGameManager.sendPlayerObserver()

    #_.updateNetwork = ->

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------