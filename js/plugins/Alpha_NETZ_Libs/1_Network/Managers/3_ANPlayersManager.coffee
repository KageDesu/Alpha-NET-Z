# * Данный класс отвечает за синхронизацию и обработку данных игроков и их персонажей

#@[GLOBAL]
ANPlayersManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetPlayer")
    LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35))
    LOG.on()

    #@[DEFINES]
    _ = ANPlayersManager

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendBindActorFromGame = (actorId) ->
        ANNetwork.callback(NMS.Game("bindActor", actorId), @bindActorResult.bind(@))

    _.sendBindActorFromLobby = (actorId, callback) ->
        ANNetwork.callback(NMS.Game("bindActor", actorId), callback)

    _.sendPlayerName = ->
        ANNetwork.send(NMS.Lobby("setPlayerName", ANGameManager.myPlayerData().name))

    _.sendActorReady = ->
        actorData = $gameActors.actor(ANGameManager.myPlayerData().actorId)
        ANNetwork.send(NMS.Game("actorReady", actorData))
        ANGameManager.setWait('playersActors')

    _.sendPlayerMove = () ->
        data = {
            id: ANNetwork.myId(),
            data: $gamePlayer.getMoveDataForNetwork()
        }
        ANNetwork.send(NMS.Map("playerMove", data))

    _.sendPlayerLocation = () ->
        data = {
            id: ANNetwork.myId(),
            data: [$gamePlayer.x, $gamePlayer.y]
        }
        ANNetwork.send(NMS.Map("playerLocation", data))

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

    _.onPlayerMove = (id, moveData) ->
        try
            return if SceneManager.isSceneChanging()
            char = $gameMap.networkCharacterById(id)
            char?.moveStraightFromServer(moveData)
        catch e
            ANET.w e
        return

    _.onPlayerLocation = (id, positionData) ->
        try
            char = $gameMap.networkCharacterById(id)
            char?.setPosition(positionData[0], positionData[1])
        catch e
            ANET.w e
        return

    return