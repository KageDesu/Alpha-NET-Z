#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    #@[ALIAS]
    ALIAS__setupForNewGame = _.setupForNewGame
    _.setupForNewGame = ->
        if ANGameManager.networkGameStarted is true
            # * Телепортируемся на начальную карту мультиплеера
            @reserveTransfer(1, 6, 5, 2, 0)
        else
            ALIAS__setupForNewGame.call(@)
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------