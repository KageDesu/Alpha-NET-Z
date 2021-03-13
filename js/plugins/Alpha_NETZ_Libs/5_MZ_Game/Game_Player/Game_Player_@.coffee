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
            # * Запоминаем предыдующие координаты (перед движением)
            @___x = @x
            @___y = @y
            # * Движение
            ALIAS__moveStraight.call(@, d)
            # * Если координаты сменились, значит персонаж
            # совершил движение, можно отправить на сервер
            if @___x isnt @x || @___y isnt @y
                ANPlayersManager.sendPlayerMove()
        else
            ALIAS__moveStraight.call(@, d)
    
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = (sceneActive) ->
        ALIAS__update.call(@, sceneActive)
        @updateNetwork() if ANNetwork.isConnected()

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------