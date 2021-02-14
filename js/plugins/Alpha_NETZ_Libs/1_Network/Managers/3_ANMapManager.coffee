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
        #TODO: callback and get events and characters positions
        ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()))

    _.sendInitialMapData = ->
        # * Отправляем принудительно свои данные всем игрокам на карте
        ANSyncDataManager.sendPlayerObserver()
        ANPlayersManager.sendPlayerMove()
        #TODO: Надо это или нет? (пока не реализовано)
        #if ANNetwork.isMasterClient()
        #    ANSyncDataManager.sendSyncGlobalVariables()
        return

    _.sendMapSceneChanging = () ->
        sceneType = "unknown"
        # * Тут не учитывается наследовательность, определяется точный класс через ===
        if SceneManager.isNextScene(Scene_Menu)
            sceneType = "menu"
        ANNetwork.send(NMS.Game("sceneChange", sceneType))
        return

    _.sendEventMove = (eventId) ->
        data = {
            id: eventId,
            mapId: $gameMap.mapId(),
            data: $gameMap.event(eventId).getMoveDataForNetwork()
        }
        ANNetwork.send(NMS.Map("eventMove", data))
        return

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    _.onEventMove = (mapId, eventId, moveData) ->
        try
            return if $gameMap.mapId() != mapId
            event = $gameMap.event(eventId)
            event?.moveStraightFromServer(moveData)
        catch e
            ANET.w e
        return

    return