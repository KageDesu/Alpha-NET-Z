# * Данный класс хранит сетевые методы игры

#@[GLOBAL]
ANGameManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetGame")
    LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35))
    LOG.on()

    #@[DEFINES]
    _ = ANGameManager

    #TODO: TEMP COOP STATIC ACTORS
    _.startingActorsIds = [null, 1, 2, 3, 4]

    _.isShouldWaitServer = -> @_waitMode?

    # * Инициализация начальных данных (при подключении надо вызывать)
    _.init = ->
        @reset()
        @createMyPlayerData()
        @sendPlayerName()

    # * Когда происходит отключение от сервера
    _.reset  = ->
        # * Флаг что игра только началась и надо установить персонажа когда карта загрузится
        @networkGameStarted = false
        @_waitMode = null
        @playersData = null

    _.createMyPlayerData = ->
        # * Данные всех игроков в игре
        @playersData = []
        # * Сразу добавляем себя
        @playersData.push(NetPlayerDataWrapper.createLocal())
        return

    _.isInited = -> @playersData?

    _.myPlayerData = -> @getPlayerDataById(ANNetwork.myId())

    _.myIndex = -> @myPlayerData().index

    _.isMapMaster = -> @myPlayerData().isMapMaster is true

    _.isPlayerDataExists = (id) ->
        data = @playersData.find (p) -> p.id == id
        return data?

    _.getPlayerDataById = (id) ->
        data = @playersData.find (p) -> p.id == id
        if data?
            return data
        else
            #TODO: ANET.w
            console.warn("Player data for " + id + " not finded!")
        return null

    _.setupNewNetworkGame = ->
        @networkGameStarted = true
        $gameParty.setupNetworkGame()

    # * Когда на клиенте загрузилась карта
    _.onMapLoaded = ->
        # * Отправляем что мы на карте (загрузились)
        @sendMapLoaded()
        # * Отправляем начальные данные (позиция игрока)
        @sendInitialMapData()
        if ANNetwork.isCoopMode() || @networkGameStarted is true
            @setWait('playersOnMap') # * Ждём игроков
        return

    _.setWait = (@_waitMode) ->

    _.resetWait = -> @setWait(null)

    #  * Все ли игроки на данной карте (и сцене)
    _.isAllPlayerOnSameMap = ->
        #TODO: проверка что на сцене отдельно
        return @playersData.every (p) -> p.mapId == $gameMap.mapId()

    # * Другие игроки (кроме этого клиента)
    _.anotherPlayers = ->
        myIndex = @myIndex()
        return @playersData.filter (p) -> p.index isnt myIndex

    # * Все игроки (кроме клиента) на текущей карте
    _.anotherPlayersOnMap = ->
        return @anotherPlayers().filter (p) -> NetPlayerDataWrapper.isCharOnMap(p)

    # * Все ли игроки настроили персонажей
    _.isAllPlayersActorsReady = ->
        return @playersData.every (p) -> p.characterReady == true

    # * Обновить иконку состояния игроков
    _.refreshNetworkStates = ->
        players = @anotherPlayersOnMap()
        for p in players
            stateId = NetPlayerDataWrapper.getRequestedNetworkState(p)
            char = NetPlayerDataWrapper.getNetCharacterForPlayer(p)
            char?.requestNetworkStateIcon(stateId) if stateId?
        return

    # * Задаём игрового персонажа
    _.bindingActors = ->
        "START BINDING ACTORS".p()
        #TODO: проверка, что actorId уже есть, тогда команда не нужна на сервер
        # Например если можно будет в лобби выбирать персонажа
        @networkGameStarted = false
        #TODO: ТУТ РЕЖИМ ВЫБОРА ПЕРСОНАЖА (если actorId нету)
        #TODO: Пока только кооператив - static binding
        actorId = @startingActorsIds[@myIndex()]
        #  * Пытаемся зарезервировать персонажа
        @sendBindActor(actorId)
        return

    # * Ожидание данных (игроков) от сервера
    _.updateWaiting = ->
        return unless @isShouldWaitServer()
        switch @_waitMode
            when 'playersOnMap'
                if @isAllPlayerOnSameMap()
                    @resetWait()
                    if @networkGameStarted == true
                        @bindingActors()
            when 'playersActors'
                if @isAllPlayersActorsReady()
                    @resetWait()
                    "READY TO GO TO THE GAME MAP".p()
                    # * Отправляем на начальную карту игры
                    $gamePlayer.setupForNewGame()
            else
                # * just wait manul reset
                # * Ждёт когда ожидание будет сброшено вручную
        return

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendMapLoaded = ->
        #TODO: callback and get events and characters positions
        ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()))

    _.sendInitialMapData = ->
        # * Отправляем принудительно свои данные всем игрокам на карте
        @sendPlayerObserver()
        @sendPlayerMove()
        #TODO: Надо это или нет? (пока не реализовано)
        #if ANNetwork.isMasterClient()
        #    @sendSyncGlobalVariables()
        return

    _.sendBindActor = (actorId) ->
        ANNetwork.callback(NMS.Game("bindActor", actorId), @bindActorResult.bind(@))

    _.sendPlayerName = ->
        ANNetwork.send(NMS.Lobby("setPlayerName", @myPlayerData().name))

    _.sendActorReady = ->
        actorData = $gameActors.actor(@myPlayerData().actorId)
        ANNetwork.send(NMS.Game("actorReady", actorData))
        @setWait('playersActors')

    _.sendPlayerMove = () ->
        data = {
            id: ANNetwork.myId(),
            data: $gamePlayer.getMoveDataForNetwork()
        }
        ANNetwork.send(NMS.Map("playerMove", data))

    _.sendEventMove = (eventId) ->
        data = {
            id: eventId,
            mapId: $gameMap.mapId(),
            data: $gameMap.event(eventId).getMoveDataForNetwork()
        }
        ANNetwork.send(NMS.Map("eventMove", data))
        return

    _.sendPlayerObserver = () ->
        @_sendObserverData(
            'playerChar',
            ANNetwork.myId(),
            $gamePlayer.getObserverDataForNetwork()
        )

    _.sendEventObserver = (eventId) ->
        @_sendObserverData(
            'eventChar',
            {
                mapId: $gameMap.mapId()
                eventId: eventId
            },
            $gameMap.event(eventId).getObserverDataForNetwork()
        )
        return

    _._sendObserverData = (type, id, observerData) ->
        data = {
            type: type,
            id: id,
            data: observerData
        }
        ANNetwork.send(NMS.Game("observer", data))
        return

    #TODO: Может отправлять изменение на мастера, он уже все глобальные переменные всем отправляет
    _.sendGlobalVariableChange = (varId, newValue) ->
        data = {
            id: varId,
            data: newValue
        }
        ANNetwork.send(NMS.Game("variable", data))
        return

    _.sendSyncGlobalVariables = () ->
        #TODO: Синхронизация всех глобальных переменных
        #см. $gameVariables.getAllGlobalVariablesData()

    _.sendMapSceneChanging = () ->
        sceneType = "unknown"
        # * Тут не учитывается наследовательность, определяется точный класс через ===
        if SceneManager.isNextScene(Scene_Menu)
            sceneType = "menu"
        ANNetwork.send(NMS.Game("sceneChange", sceneType))
        return

    #TODO: Разделить этот класс, добавить ANSyncDataManager, ANMapManager, ANPlayersManager

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    _.bindActorResult = (result) ->
        #TODO: Если true - зарезервировали,  дальше либо кастомизация, либо отправка
        # клиент готов начинать игру (и ожидание игроков включается)
        # false - значит данный персонаж занят, надо обрабатыватЬ!
        if result is true
            "BINDING GOOD, send ActorReady".p()
            #TODO: Сейчас без кастомизации
            @sendActorReady()
        return

    #? СОБЫТИЯ (обработка событий от сервера, вызываются из NETClientMethodsManager)
    # * ===============================================================
    
    _.onPlayerName = (playerId, name) ->
        if @isPlayerDataExists()
            playerData = @getPlayerDataById(playerId)
            playerData?.name = name
        else
            #  * Значит смена имени игрока, с которым мы не в комнате
            # Пока ничего не делаем, так как не видим всех игроков на сервере
        return

    _.onRoomPlayers = (data) ->
        @playersData = data

    _.onGamePlayers = (data) ->
        @onRoomPlayers(data)
        # * Проверить состояние для всех игроков
        @refreshNetworkStates()

    _.onRefreshGameParty = () ->
        $gameParty._actors = []
        for plData in @playersData
            if plData.actorId > 0 && plData.characterReady is true
                $gameParty._actors.push(plData.actorId)
        $gamePlayer.refresh()
        $gameMap.refresh()
        return

    _.onLeaveRoom = ->
        # * Удаляем остальных игроков, оставляем себя
        @createMyPlayerData()

    _.onObserverData = (id, type, content) ->
        switch type
            when 'playerChar'
                @_onPlayerCharObserverData(id, content)
            when 'eventChar'
                @_onEventCharObserverData(id, content)
            else
                LOG.p("From server: unknown observer data type: " + type)
                return

    _._onPlayerCharObserverData = (id, content) ->
        try
            char = $gameMap.networkCharacterById(id)
            char?.applyObserverData(content)
        catch e
            ANET.w e
        return

    _._onEventCharObserverData = (id, content) ->
        try
            { mapId, eventId } = id
            return if $gameMap.mapId() != mapId
            event = $gameMap.event(eventId)
            event?.applyObserverData(content)
        catch e
            ANET.w e
        return

    _.onPlayerMove = (id, moveData) ->
        try
            char = $gameMap.networkCharacterById(id)
            char?.moveStraightFromServer(moveData)
        catch e
            ANET.w e
        return

    _.onEventMove = (mapId, eventId, moveData) ->
        try
            return if $gameMap.mapId() != mapId
            event = $gameMap.event(eventId)
            event?.moveStraightFromServer(moveData)
        catch e
            ANET.w e
        return

    _.onVariableValue = (varId, value) ->
        try
            $gameVariables.onVariableFromServer(varId, value)
        catch e
            ANET.w e
        return

    return

#@[EXTEND]
window.NGAME = ANGameManager