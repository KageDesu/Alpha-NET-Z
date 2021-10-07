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
    ALIAS__moveDiagonally = _.moveDiagonally
    _.moveDiagonally = (horz, vert) ->
        if ANNetwork.isConnected()
            # * Запоминаем предыдующие координаты (перед движением)
            @___x = @x
            @___y = @y
            # * Движение
            ALIAS__moveDiagonally.call(@, horz, vert)
            # * Если координаты сменились, значит персонаж
            # совершил движение, можно отправить на сервер
            if @___x isnt @x || @___y isnt @y
                ANPlayersManager.sendPlayerMove()
        else
            ALIAS__moveDiagonally.call(@, horz, vert)
        return

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = (sceneActive) ->
        ALIAS__update.call(@, sceneActive)
        @updateNetwork() if ANNetwork.isConnected()
        #TODO: for test (потом засунуть в isConnected)
        @nUpdatePlayerInputForNetwork() if sceneActive is true

    #TODO: temp in this file, should be in _N
    _.nUpdatePlayerInputForNetwork = ->
        @nUpdateChatInput() if ANET.PP.isGameChatAllowed() #TODO: DYNAMIC?

    _.nUpdateChatInput = ->
        #TODO: from parameters
        openChatButton = 't'
        sayInChatButton = 't'
        if Input.isTriggered(openChatButton)
            if ANET.UI.isChatOpen()
                # * Если кнопка открыть чат и кнопка сказать в чат одинаковые
                if openChatButton == sayInChatButton
                    ANET.UI.showChatInputSafe() # * то не закрываем, а сцена ввода текста
                    Input.clear()
                else # * иначе закрываем
                    ANET.UI.closeChat()
            else
                ANET.UI.showChat()
        else if Input.isTriggered(sayInChatButton)
            ANET.UI.showChatInputSafe() if ANET.UI.isChatOpen()
        return

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------