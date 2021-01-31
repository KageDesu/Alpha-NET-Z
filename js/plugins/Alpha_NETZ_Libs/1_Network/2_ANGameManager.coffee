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

    # * Инициализация начальнх данных (при подключении надо вызывать)
    _.init = ->
        # * Данные всех игроков в игре
        @playersData = []
        # * Сразу добавляем себя
        @playersData.push(NetPlayerData.CreateLocal())
        @sendPlayerName()

    _.myPlayerData = -> @getPlayerDataById(ANNetwork.myId())

    _.getPlayerDataById = (id) ->
        data = @playersData.find (p) -> p.myId == id
        if data?
            return data
        else
            #TODO: ANET.w
            console.warn("Player data for " + id + " not finded!")
        return null

    #? СОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendPlayerName = ->
        ANNetwork.send(NMS.Lobby("setPlayerName", @myPlayerData().name))

    #? СОБЫТИЯ (приходят от сервера)
    # * ===============================================================
    
    _.onPlayerName = (playerId, name) ->
        playerData = @getPlayerDataById(playerId)
        playerData?.name = name
        return

    return

#@[EXTEND]
window.NGAME = ANGameManager