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

    _.isValid = -> @uiSet? and ANNetwork.isConnected()

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

    # * Показать сцену ввода сообщения в чат
    _.showChatInput = ->
        return unless @isValid()
        return unless ANET.isPro()
        SceneManager.push(Scene_NetChatInput)
        return

    return
# ■ END ANET.UI.coffee
#---------------------------------------------------------------------------