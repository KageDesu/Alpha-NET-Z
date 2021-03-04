# * Данный класс отвечает за синхронизацию и обработку игровых карт

#@[GLOBAL]
ANMapManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetMap")
    LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35))
    LOG.on()

    #@[DEFINES]
    _ = ANMapManager

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendMapLoaded = ->
        ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()))

    _.sendInitialMapData = ->
        # * Отправляем принудительно свои данные всем игрокам на карте
        ANSyncDataManager.sendPlayerObserver()
        ANPlayersManager.sendPlayerLocation()
        return

    _.sendEventMove = (eventId) ->
        data = {
            id: eventId,
            mapId: $gameMap.mapId(),
            data: $gameMap.event(eventId).getMoveDataForNetwork()
        }
        ANNetwork.send(NMS.Map("eventMove", data), true)
        return

    # * Данную команду выполняет только мастер карты, когда кто-то подключается к карте
    _.sendMapEventsInitialPositions = () ->
        #TODO: events for each sendEventMove(ID)

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    _.onEventMove = (mapId, eventId, moveData) ->
        try
            return if $gameMap.mapId() != mapId
            return if SceneManager.isSceneChanging()
            event = $gameMap.event(eventId)
            event?.moveStraightFromServer(moveData)
        catch e
            ANET.w e
        return

    _.onInitialMapSync = ->
        try
            @sendInitialMapData()
            if ANNetwork.isMasterClient()
                @sendMapEventsInitialPositions()
        catch e
            ANET.w e
        return


    return