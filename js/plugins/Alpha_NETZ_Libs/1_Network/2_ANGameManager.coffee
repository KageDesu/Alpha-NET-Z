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

    # * Инициализация начальных данных (при подключении надо вызывать)
    _.init = ->
        @createMyPlayerData()
        @sendPlayerName()

    _.createMyPlayerData = ->
        # * Данные всех игроков в игре
        @playersData = []
        # * Сразу добавляем себя
        @playersData.push(NetPlayerData.CreateLocal())
        return

    # * Когда происходит отключение от сервера
    _.reset  = ->
        @playersData = null

    _.isInited = -> @playersData?

    _.myPlayerData = -> @getPlayerDataById(ANNetwork.myId())

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

    # * Когда присоединился к комнате, надо заполнить список игроков комнаты
    #_.createPlayersFromRoomOnJoin = (room) ->
    #    for playerId in room.playersIds
    #        @playersData.push(new NetPlayerData())

    #? СОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendPlayerName = ->
        ANNetwork.send(NMS.Lobby("setPlayerName", @myPlayerData().name))

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

    _.onLeaveRoom = ->
        # * Удаляем остальных игроков, оставляем себя
        @createMyPlayerData()

    return

#@[EXTEND]
window.NGAME = ANGameManager