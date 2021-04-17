#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Base.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Base::

    #?EVENT
    # * Когда соединение прервано, вызывается это событие
    _.onLostConnection = ->
        HUIManager.hideLoader()
        SceneManager.goto(Scene_Title)
    
    #?EVENT
    # * Когда закрывается комната, вызывается это событие
    _.netOn_lobby_roomClosed = ->
        # * По умолчанию из любой сцены выходит в главное меню
        SceneManager.goto(Scene_Title)

    # * Когда пришло какое-либо сообщение от сервера
    #?EVENT
    _.onServerEvent = (name) ->
        return if SceneManager.isBusyForNetworkData()
        eventMethod = "netOn_" + name
        if @[eventMethod]?
            console.log("Call scene callback for event " + name)
            @[eventMethod]()
        return

    return
# ■ END Scene_Base.coffee
#---------------------------------------------------------------------------