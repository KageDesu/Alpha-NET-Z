#@[GLOBAL]
NetClientMethodsManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetClientMethodsManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NET Client")
    LOG.setColors(KDCore.Color.MAGENTA.reAlpha(200), KDCore.Color.BLACK.getLightestColor(200))
    LOG.on()

    #@[DEFINES]
    _ = NetClientMethodsManager

    _.setConnectionToMasterCallback = (@onConnectCallback) ->

    _.onConnect = ->
        LOG.p("Connected")
        @onConnectCallback(1) if @onConnectCallback?

    _.onDisconnect = ->
        LOG.p("Disconnected")
        # * Общее событие на все сцены
        SceneManager._scene?.onLostConnection()
        ANNetwork.stop()

    _.onConnectionError = ->
        LOG.p("Can't connect to server!")
        @onConnectCallback(0) if @onConnectCallback?
        ANNetwork.stop()

    # * Существует ли метод для обработки команды от сервера?
    _.isExistPrcEvent = (eventHandlerMethodName) ->
        return NetClientMethodsManager["event_" + eventHandlerMethodName]?

    # * Выполнить команду от сервера
    _.handlePrcEvent = (eventHandlerMethodName, content) ->
        LOG.p("Handle Event: " + eventHandlerMethodName)
        NetClientMethodsManager["event_" + eventHandlerMethodName](content)
        # * Вызвать метод на сцене, если он существует
        # * Сцена уже сама знает, надо ей обновить (перерисовать) что-то или нет,
        # * определяет по имени метода
        @callSceneCallback(eventHandlerMethodName)
        LOG.p("Event End: " + eventHandlerMethodName)
        return

    _.callSceneCallback = (eventName) ->
        SceneManager._scene?.onServerEvent(eventName)

    #? ОБРАБОТКА КОМАНД ОТ СЕРВЕРА
    # * =========================================================================

    _.event_lobby_changePlayerName = (content) ->
        ANGameManager.onPlayerName(content.who, content.name)

    _.event_lobby_refreshRoomData = (content) ->
        ANGameManager.onRoomPlayers(content.playersData)
        ANNetwork.onRoomDataFromServer(content.room)

    _.event_lobby_roomClosed = (content) ->
        ANNetwork.onRoomClosed()

    _.event_lobby_startGame = () ->
        ANGameManager.setupNewNetworkGame()
        "STARTING GAME".p()

    _.event_game_playersData = (content) ->
        ANGameManager.onGamePlayers(content)
        "GAME PLAYERS DATA REFRESHED".p()

    _.event_game_refreshParty = () ->
        ANGameManager.onRefreshGameParty()
        "REFRESH PARTY".p()
        #TODO:
        #1) Создание своего персонажа
        #2) Создание фантомов (для новых)

    _.event_game_observerData = (content) ->
        try
            ANGameManager.onObserverData(content.id, content.type, content.data)
        catch e
            console.warn("event_game_observerData", e)

    _.event_game_variable = (content) ->
        try
            ANGameManager.onVariableValue(content.id, content.data)
        catch e
            console.warn("event_game_variable", e)

    _.event_map_playerMove = (content) ->
        try
            ANGameManager.onPlayerMove(content.id, content.data)
        catch e
            console.warn("event_map_playerMove", e)

    _.event_map_eventMove = (content) ->
        try
            ANGameManager.onEventMove(content.mapId, content.id, content.data)
        catch e
            console.warn("event_map_eventMove", e)

    return
# ■ END NetClientMethodsManager.coffee
#---------------------------------------------------------------------------