#$[ENCODE]

#@[GLOBAL]
window.NetClientMethodsManager = ->

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
    _ = window.NetClientMethodsManager

    _.setConnectionToMasterCallback = (@onConnectCallback) ->

    _.onConnect = ->
        LOG.p("Connected")
        # * Проверка версии сервера и клиента на соответствие
        ANNetwork.callback(NMS.Lobby("serverVerCheck", ANET.ServerRev),
            (result) ->
                unless result
                    LOG.p("Client not match server version")
                    window.alert("Please update Alpha NET Z plugin")
                    ANNetwork.stop()
        )
        @onConnectCallback(1) if @onConnectCallback?

    _.onDisconnect = ->
        LOG.p("Disconnected")
        # * Общее событие на все сцены
        SceneManager._scene?.onLostConnection()
        HUIManager.notifyError("Disconnected from server")
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
        noLog =
            [
                "game_observerData",
                "map_eventMove",
                "map_playerMove",
                "battle_battleMethod",
                "battle_battleMethodReceived"
            ].contains(eventHandlerMethodName)
        LOG.p("Handle Event: " + eventHandlerMethodName) unless noLog
        NetClientMethodsManager["event_" + eventHandlerMethodName](content)
        # * Вызвать метод на сцене, если он существует
        # * Сцена уже сама знает, надо ей обновить (перерисовать) что-то или нет,
        # * определяет по имени метода
        @callSceneCallback(eventHandlerMethodName)
        LOG.p("Event End: " + eventHandlerMethodName) unless noLog
        return

    _.callSceneCallback = (eventName) ->
        SceneManager._scene?.onServerEvent(eventName)

    #? ОБРАБОТКА КОМАНД ОТ СЕРВЕРА
    # * =========================================================================

    #TODO: Это возможно и не нужно, так как игрок имя может поменять только перед входом в комнату( созданием)
    _.event_lobby_changePlayerName = (content) ->
        ANGameManager.onPlayerName(content.who, content.name)

    _.event_lobby_refreshRoomData = (content) ->
        return if SceneManager.isBusyForNetworkData()
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

    _.event_game_observerData = (content) ->
        try
            ANSyncDataManager.onObserverData(content.id, content.type, content.data)
        catch e
            console.warn("event_game_observerData", e)

    _.event_game_variable = (content) ->
        try
            ANSyncDataManager.onVariableValue(content.id, content.data)
        catch e
            console.warn("event_game_variable", e)

    _.event_game_switch = (content) ->
        try
            ANSyncDataManager.onSwitchValue(content.id, content.data)
        catch e
            console.warn("event_game_switch", e)

    _.event_game_saveDataRequest = (content) ->
        try
            $gameTemp.nUniqueSaveID = content.uniqueSaveID
            # * Сохранение выполненно
            $gameSystem.onBeforeSave()
            DataManager.saveGame(content.savefileId)
            #TODO: Тут желательно ждать положительный результат, но пока сразу отправим флаг
            ANGameManager.sendSaveDataCompleteFlag()
        catch e
            console.warn("event_game_saveDataRequest", e)

    _.event_game_saveDataComplete = (content) ->
        try
            # * Если данный клиент не запускал сохранение, то игнор
            return unless $gameTemp.nSaveData?
            savedActorId = content
            #console.log(savedActorId)
            $gameTemp.nSaveData.onAnswer(savedActorId, true)
        catch e
            console.warn("event_game_saveDataComplete", e)

    _.event_game_chatMessage = (content) ->
        try
            mapId = content.mapId
            channelId = content.channelId
            if channelId > 0 # * MAP
                if mapId? and mapId == $gameMap.mapId()
                    ANET.UI.addMessageToChat(content)
            else
                ANET.UI.addMessageToChat(content)
        catch e
            console.warn("event_game_chatMessage", e)

    _.event_map_playerMove = (content) ->
        try
            ANPlayersManager.onPlayerMove(content.id, content.data)
        catch e
            console.warn("event_map_playerMove", e)

    _.event_map_playerLocation = (content) ->
        try
            ANPlayersManager.onPlayerLocation(content.id, content.data)
        catch e
            console.warn("event_map_playerLocation", e)

    _.event_map_eventMove = (content) ->
        try
            ANMapManager.onEventMove(content.mapId, content.id, content.data)
        catch e
            console.warn("event_map_eventMove", e)

    # * Если пришёл этот метод, то надо отправить данные свои на карте, для синхронизации
    _.event_map_initialMapSynchronization = (content) ->
        try
            if $gameMap.mapId() == content
                ANMapManager.onInitialMapSync()
        catch e
            console.warn("event_map_eventMove", e)

    _.event_event_virtualEventCommand = (content) ->
        try
            ANInterpreterManager.onVirtualCommand(content)
        catch e
            console.warn("event_event_virtualEventCommand", e)

    _.event_battle_battleMethod = (content) ->
        try
            ANBattleManager.onBattleMethod(content.id, content.method, content.data)
        catch e
            console.warn("event_battle_battleMethod", e)

    _.event_battle_animation = (content) ->
        try
            ANBattleManager.onBattleAnimation(content)
        catch e
            console.warn("event_battle_animation", e)

    _.event_battle_battleMethodReceived = (content) ->
        try
            ANBattleManager.onBattleMethodReceived()
        catch e
            console.warn("event_battleMethodReceived", e)

    _.event_battle_logMessage = (content) ->
        try
            ANBattleManager.onLogWindowMessage(content.cmd, content.text)
        catch e
            console.warn("event_battle_logMessage", e)

    _.event_battle_input = (content) ->
        try
            ANBattleManager.onBattleInputState(content.inputState, content.inputActorId)
        catch e
            console.warn("event_battle_input", e)

    _.event_battle_inputAction = (content) ->
        try
            ANBattleManager.onBattleInputAction(content.inputActorId, content.action)
        catch e
            console.warn("event_battle_inputAction", e)

    _.event_battle_serverBattleData = (content) ->
        try
            # * Обновляем данные, затем вызывается уже event сцены битвы
            ANBattleManager.onBattleDataFromServer(content)
        catch e
            console.warn("event_battle_serverBattleData", e)

    _.event_event_registerOnShared = (content) ->
        try
            "SHARED EVENT IN".p()
            ANInterpreterManager.onRegisterOnSharedEventRequest(content)
        catch e
            console.warn("event_event_registerOnShared", e)

    _.event_event_registerDone = (content) ->
        try
            "SHARED EVENT ANSWER".p()
            ANInterpreterManager.onRegisterOnSharedEventResponse(content)
        catch e
            console.warn("event_event_registerDone", e)

    _.event_event_sharedCanContinue = (content) ->
        try
            "SHARED EVENT CAN CONTINUE".p()
            ANInterpreterManager.onContinueSharedEvent(content)
        catch e
            console.warn("event_event_sharedCanContinue", e)

    _.event_event_sharedForceCancel = (content) ->
        try
            "SHARED EVENT FORCE CANCELLED".p()
            ANInterpreterManager.onSharedEventForceCancelFromServer(content)
        catch e
            console.warn("event_event_sharedForceCancel", e)

    _.event_event_sharedChoice = (content) ->
        try
            "SHARED EVENT CHOICE ACTION".p()
            ANInterpreterManager.onSharedEventChoiceActionFromServer(content)
        catch e
            console.warn("event_event_sharedForceCancel", e)

    _.event_game_userCommand = (content) ->
        try
            "CUSTOM COMMAND IN".p()
            { name, data } = content
            nAPI.onCustomCommand(name, data)
        catch e
            console.warn("event_game_userCommand", e)

    _.event_game_customCommandLink = (content) ->
        try
            "CUSTOM LINK IN".p()
            { name, commonEventId } = content
            $gameSystem?.nRegisterCustomCommandCE(name, commonEventId)
        catch e
            console.warn("event_game_userCommand", e)

    return
# ■ END NetClientMethodsManager.coffee
#---------------------------------------------------------------------------