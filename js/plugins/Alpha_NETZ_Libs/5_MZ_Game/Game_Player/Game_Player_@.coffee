#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    #@[ALIAS]
    ALIAS__moveStraight = _.moveStraight
    _.moveStraight = (d) ->
        if ANNetwork.isConnected()
            #TODO: три варианта попробовать,  прямой (NET), через Callback и через Response
            #TODO: может не отправлять если не может пройти?
            # VARIANT 1
            ALIAS__moveStraight.call(@, d)
            ANGameManager.sendPlayerMove()
        else
            ALIAS__moveStraight.call(@, d)

    #@[ALIAS]
    ALIAS__setupForNewGame = _.setupForNewGame
    _.setupForNewGame = ->
        if ANGameManager.networkGameStarted is true
            #@_createNetworkObserver()
            # * Телепортируемся на начальную карту мультиплеера
            #mapId, x, y, dir, fadeType
            @reserveTransfer(1, 6, 5, 2, 0)
        else
            ALIAS__setupForNewGame.call(@)
    
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = (sceneActive) ->
        ALIAS__update.call(@, sceneActive)
        if ANNetwork.isConnected()
            @updateNetwork()

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------