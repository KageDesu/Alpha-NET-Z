# * Основной класс менеджер интерфейса (API)
# * Аналогичен классу AA.UI из ABSZ

ANET.UI = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ANET.UI.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ANET.UI

    _.setUI = (@uiSet) ->

        #TODO: temp
    _.isValid = -> @uiSet? #and ANNetwork.isConnected()

    # * Когда появляется окно с сообщением
    _.onGameMessageStart = ->
        return unless @isValid()
        @uiSet.onGameMessageStart()

    # * Когда заканчивается окно с сообщением
    _.onGameMessageEnd = ->
        return unless @isValid()
        @uiSet.onGameMessageEnd()

    # * Когда было нажатие мышки на какой-либо UI элемент
    _.isUITouched = -> false

    # * Вызывается когда сцена карты заканчивается
    _.terminate = ->
        @uiSet?.terminate()
    
    # * Основной интерфейс Spriteset_UI
    # -----------------------------------------------------------------------
    do ->
        _.refresh = -> @uiSet?.refresh()

        _.hide = -> @uiSet?.hide()

        _.show = -> @uiSet?.show()

        # * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
        _.isAnyUIElementTouchProcess = -> false

    # -----------------------------------------------------------------------

    # * Чат
    # -----------------------------------------------------------------------
    do ->

        _.chat = -> @uiSet.chatWindow

        # * Есть ли чат (создан ли), так как опциональный и нету в Basic
        _.isChatValid = -> @isValid() and @chat()?

        # * Открыто ли окно чата
        _.isChatOpen = -> @isChatValid() and @chat().isActive()

        # * Показать сцену ввода сообщения в чат
        _.showChatInput = ->
            return unless @isValid()
            SceneManager.push(Scene_NetChatInput)
            return

        # * Показать сцену ввода сообщения в чат (с учётом событий и сообщений)
        _.showChatInputSafe = ->
            return unless @isChatValid()
            @showChatInput() if @isCanChatInput()

        _.showChat = ->
            return unless @isChatValid()
            @chat().open() unless @isChatOpen()
            return

        _.closeChat = ->
            return unless @isChatValid()
            @chat().close() if @isChatOpen()
            return
        
        #TODO: implement uAPI methods for system messages
        #? message: {
        #   channelId
        #   actorId
        #   text
        #}
        # * Добавить сообщение в чат (можно вызывать на любой сцене)
        _.addMessageToChat = (message) ->
            return unless @isChatValid()
            @chat().addMessageToChat(message) if message?
            return


        # * Может ли игрок начать вводить текст в чат (другая сцена будет открыта)
        _.isCanChatInput = -> !($gameMessage.isBusy() || $gameMap.isEventRunning())
        

    # -----------------------------------------------------------------------


    return
# ■ END ANET.UI.coffee
#---------------------------------------------------------------------------