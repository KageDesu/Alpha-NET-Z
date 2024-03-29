# * Данный класс хранит сетевые методы игры

#$[ENCODE]

#@[GLOBAL]
window.ANGameManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetGame")
    LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35))
    LOG.on()

    #@[DEFINES]
    _ = window.ANGameManager

    _.isShouldWaitServer = -> @_waitMode?

    # * Инициализация начальных данных (при подключении надо вызывать)
    _.init = ->
        @reset()
        @createMyPlayerData()
        ANPlayersManager.sendPlayerName()

    # * Когда происходит отключение от сервера
    _.reset  = ->
        # * Флаг что игра только началась и надо установить персонажа когда карта загрузится
        @networkGameStarted = false
        @_waitMode = null
        @playersData = null
        ANBattleManager.battleData = null
        return

    _.createMyPlayerData = ->
        # * Данные всех игроков в игре
        @playersData = []
        # * Сразу добавляем себя
        @playersData.push(NetPlayerDataWrapper.createLocal())
        return

    _.isInited = -> @playersData?

    _.myPlayerData = -> @getPlayerDataById(ANNetwork.myId())

    _.myActorId = -> @myPlayerData().actorId

    _.myIndex = -> @myPlayerData().index

    _.isMapMaster = -> @myPlayerData().isMapMaster is true

    # * Дублируется для удобства
    _.isBattleMaster = -> ANBattleManager.isBattleMaster()

    _.isPlayerDataExists = (id) ->
        data = @playersData.find (p) -> p.id == id
        return data?

    _.getPlayerDataById = (id) ->
        data = @playersData.find (p) -> p.id == id
        if data?
            return data
        else
            ANET.w("Player data for " + id + " not found!")
        return null

    _.getPlayerDataByActorId = (actorId) ->
        data = @playersData.find (p) -> p.actorId == actorId
        if data?
            return data
        else
            ANET.w("Player data for Actor with ID " + actorId + " not found!")
        return null

    _.setupNewNetworkGame = ->
        @networkGameStarted = true
        $gameParty.setupNetworkGame()

    # * Когда клиент переходит на новую (другую) карту (а не на туже самую)
    _.onNewGameMapSetup = ->
        # * На всякий случай и тут отключу
        $gameTemp._nLocalActorMode = false
        @_shouldWaitPlayerOnSameMap = ANNetwork.isSameMapMode()
        return

    # * Когда на клиенте загрузилась карта
    _.onMapLoaded = ->
        # * Отправляем что мы на карте (загрузились)
        ANMapManager.sendMapLoaded()
        # * Отправляем начальные данные (позиция игрока)
        ANMapManager.sendInitialMapData()
        # * Если загрузка
        if ANET.Utils.isLoadGameRoom()
            # * Ждём игроков (Только при параметре)
            if @_shouldWaitPlayerOnSameMap is true
                @setWait('playersOnMap')
            else
                @bindingActors() # * Присвоение персонажей
        else
            # * Ждём игроков (при параметре и если новая игра (чтобы начать события например))
            if @_shouldWaitPlayerOnSameMap is true || @networkGameStarted is true
                @setWait('playersOnMap')
        return

    _.setWait = (@_waitMode) ->
        HUIManager.showLoader(500)

    _.resetWait = ->
        @setWait(null)
        HUIManager.hideLoader()

    #  * Все ли игроки на данной карте (и сцене)
    _.isAllPlayerOnSameMap = ->
        #TODO: проверка что на сцене отдельно
        return @playersData.every (p) -> p.mapId == $gameMap.mapId()

    # * Другие игроки (кроме этого клиента)
    _.anotherPlayers = ->
        myIndex = @myIndex()
        return @playersData.filter (p) -> p.index isnt myIndex

    # * Все игроки (кроме клиента) на текущей карте (именно на карте, не обязательно на Сцене карты)
    _.anotherPlayersOnMap = ->
        return @anotherPlayers().filter (p) -> NetPlayerDataWrapper.isCharOnMap(p)

    # * Все ли игроки настроили персонажей
    _.isAllPlayersActorsReady = ->
        return @playersData.every (p) -> p.characterReady == true

    # * Обновить иконку состояния игроков
    _.refreshNetworkStates = ->
        # * Используется _, так как метод вызывается в отдельном потоке тоже
        players = @anotherPlayersOnMap()
        for p in players
            stateId = NetPlayerDataWrapper.getRequestedNetworkState(p)
            char = NetPlayerDataWrapper.getNetCharacterForPlayer(p)
            char?.requestNetworkStateIcon(stateId)
        return

    # * Задаём игрового персонажа
    _.bindingActors = ->
        "START BINDING ACTORS".p()
        @networkGameStarted = false
        if ANET.PP.isActorSelectionAllowed() || ANET.Utils.isLoadGameRoom()
            @actorBingingFromSelection()
        else
            @staticActorBinging()
        return

    # * Персонаж, выбранный из списка
    _.actorBingingFromSelection = ->
        # * Так как персонаж уже был выбран в лобби, то сразу отправляем готовнотсть
        ANPlayersManager.sendActorReady()
        return

    # * Статический режимм присвоения персонажа
    _.staticActorBinging = ->
        # * -1, так как myIndex начинается с 1, а массив с 0
        actorId = ANET.PP.actorsForNetwork()[@myIndex() - 1]
        #  * Пытаемся зарезервировать персонажа
        ANPlayersManager.sendBindActorFromGame(actorId)
        return

    # * Ожидание данных (игроков) от сервера
    _.updateWaiting = ->
        return unless @isShouldWaitServer()
        switch @_waitMode
            when 'playersOnMap'
                if @isAllPlayerOnSameMap()
                    @resetWait()
                    @_shouldWaitPlayerOnSameMap = false
                    if @networkGameStarted == true
                        @bindingActors()
            when 'playersActors'
                if @isAllPlayersActorsReady()
                    @resetWait()
                    @startGame()
            else
                # * just wait manul reset
                # * Ждёт когда ожидание будет сброшено вручную
        return

    # * Начать игру (когда все уже определились с персонажами)
    _.startGame = ->
        "READY TO START GAME".p()
        ANMapManager.sendInitialMapData()
        unless ANET.Utils.isLoadGameRoom()
            @showStartGameChatMessage()
        return

    # * Приветственное сообщение (системное) в чат
    _.showStartGameChatMessage = ->
        return unless ANET.PP.isGameChatAllowed()
        message = ANET.PP.getChatStartMessage()
        return unless String.any(message)
        ANET.UI.addMessageToChat(ANET.Utils.buildChatMessage(0, 0, message))
        return

    # * Когда игрок покидает игру (disconnect)
    _.anotherPlayerLeaveGame = (actorId) ->
        LOG.p("Player leave game")
        ceId = ANET.PP.getPlayerLeaveGameCommonEventId()
        $gameTemp.reserveCommonEvent(ceId) if ceId > 0
        return

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendSceneChanging = () ->
        sceneType = "unknown"
        # * Тут не учитывается наследовательность, определяется точный класс через ===
        # * Чтобы на всех сценах, кроме карты была иконка, сделал через unless
        # * Это лучше, чем проверять все все сцены
        unless SceneManager.isNextScene(Scene_Map)
            sceneType = "menu"
        if SceneManager.isNextScene(Scene_Battle)
            sceneType = "battle"
        if SceneManager.isNextScene(Scene_NetChatInput)
            sceneType = "chat"
        ANNetwork.send(NMS.Game("sceneChange", sceneType))
        return

    # * Это запрос от мастер клиента на другие клиенты, что надо выполнить сохранение
    _.sendSaveDataRequest = (savefileId) ->
        data = {
            uniqueSaveID: $gameTemp.nUniqueSaveID,
            savefileId: savefileId
        }
        ANNetwork.send(NMS.Game("saveDataRequest", data))
        return

    # * Это ответ от клиента, что он выполнил сохранение
    _.sendSaveDataCompleteFlag = () ->
        ANNetwork.send(NMS.Game("saveDataComplete", @myActorId()))
        return

    # * Отправить сообщение в чат от текущего клиента
    _.sendMyChatMessage = (channelId, message) ->
        @sendRawChatMessage(channelId, @myActorId(), message)
        return

    _.sendRawChatMessage = (channelId, actorId, message) ->
        data = ANET.Utils.buildChatMessage(channelId, actorId, message)
        ANNetwork.callback(NMS.Game("chatMessage", data), () ->
            ANET.UI.addMessageToChat(data)
        )
        return

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    

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

    # * Данные об игроках в комнате (подключился, ушёл и т.д.)
    # * Тут архитектурная ошибка или просчёт, суть в том, что когда покидаешь комнату,
    # * приходят данные о игроках команты, а текущего клиента нету, а так как идёт
    # * замена полностью (присваивание), теряются данные текущего игрока
    # * Поэтому проверяется, если данных текущего клиента нету (а это невозможно)
    # * то мы их снова добавляем
    _.onRoomPlayers = (data) ->
        # * Копия наших данных
        myPlayerData = @myPlayerData()
        @playersData = data
        # * Если наших данных нету (когда покинули комнату бывает такое)
        # * добавляем копию своих данных
        unless @getPlayerDataById(ANNetwork.myId())
            @playersData.push myPlayerData
        return

    # * Данные (состояния) об игроках (NetPlayer Data новые)
    _.onGamePlayers = (data) ->
        @onRoomPlayers(data)
        # * Проверить состояние для всех игроков (иконки)
        @refreshNetworkStates()
        $gameMap.nSafeRefresh()
        return

    # * Когда кто-то из игроков выбрал своего персонажа (готов к игре)
    _.onRefreshGameParty = () ->
        $gameParty._actors = []
        for plData in @playersData
            if plData.actorId > 0 && plData.characterReady is true
                $gameParty._actors.push(plData.actorId)
        $gamePlayer.refresh()
        $gameMap.nSafeRefresh()
        return

    _.onLeaveRoom = ->
        # * Удаляем остальных игроков, оставляем себя
        @createMyPlayerData()


    return

#@[EXTEND]
window.NGAME = ANGameManager