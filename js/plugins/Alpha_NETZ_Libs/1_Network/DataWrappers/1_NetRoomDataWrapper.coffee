#@[GLOBAL]

# * Статический класс для работы со структурой сетевых данных комнаты
NetRoomDataWrapper = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetRoomDataWrapper.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = NetRoomDataWrapper

    # * Все поля структуры
    _.createLocal = ->
        {
            name: "Room " + Math.randomInt(100)
            masterId: ""
            masterName: ""
            inGame: false
            playersIds: []
            readyPlayersIds: []
            gameId: 0
            gameTitle: ""
            rpgVersion: 0
            maxPlayers: 0
            gameMode: 0
            canConnect: true
        }

    _.isRoomFull = (r) ->
        return true unless r?
        return r.playersIds.length >= r.maxPlayers

    _.isRoomProperToJoin = (r) ->
        return false unless r?
        try
            # * Нельзя подключиться если разные игры
            myGameId = $dataSystem.advanced.gameId
            if r.gameId != myGameId
                return false
            # * Пока нельзя подключаться к уже запущенной игре
            if r.inGame is true
                return false
            # * Нельзя подключаться, если комната полная
            if _.isRoomFull(r)
                return false
            # * Если разные движки
            unless _.isMyRPGVersion(r)
                return false
            # * Если специальный флаг
            #TODO: Пока не обрабатывается
            #if r.canConnect is false
            #    return false
        catch e
            ANET.w e
        return true
    
    _.isMyRPGVersion = (r) ->
        return false unless r?
        if r.rpgVersion == 0
            return KDCore.isMZ()
        else
            return KDCore.isMV()

    return
# ■ END NetRoomDataWrapper.coffee
#---------------------------------------------------------------------------
