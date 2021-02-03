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
        @playersData.push(NetPlayerData.CreateLocal())
        return

    _.isInited = -> @playersData?

    _.myPlayerData = -> @getPlayerDataById(ANNetwork.myId())

    _.myIndex = -> @myPlayerData().index

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
        if ANNetwork.isCoopMode() || @networkGameStarted is true
            @setWait('playersOnMap') # * Ждём игроков
        return

    _.setWait = (@_waitMode) ->

    _.resetWait = -> @setWait(null)

    #  * Все ли игроки на данной карте (и сцене)
    _.isAllPlayerOnSameMap = ->
        #TODO: проверка что на сцене отдельно
        return @playersData.every (p) -> p.mapId == $gameMap.mapId()

    # * Все ли игроки настроили персонажей
    _.isAllPlayersActorsReady = ->
        return @playersData.every (p) -> p.characterReady == true

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
        ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()))

    _.sendBindActor = (actorId) ->
        ANNetwork.callback(NMS.Game("bindActor", actorId), @bindActorResult.bind(@))

    _.sendPlayerName = ->
        ANNetwork.send(NMS.Lobby("setPlayerName", @myPlayerData().name))

    _.sendActorReady = ->
        actorData = $gameActors.actor(@myPlayerData().actorId)
        ANNetwork.send(NMS.Game("actorReady", actorData))
        @setWait('playersActors')

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

    return

#@[EXTEND]
window.NGAME = ANGameManager