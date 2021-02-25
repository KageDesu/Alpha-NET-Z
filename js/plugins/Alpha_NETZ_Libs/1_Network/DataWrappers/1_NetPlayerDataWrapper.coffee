#@[GLOBAL]

# * Статический класс для работы со структурой сетевых данных игрока
NetPlayerDataWrapper = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetPlayerDataWrapper.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = NetPlayerDataWrapper

    # * Все поля структуры
    _.createLocal = ->
        # * Загружаем с настроек, если нету, то случайное
        if String.any(ConfigManager.netPlayerName)
            plName = ConfigManager.netPlayerName
        else
            plName =  "Player " + Math.randomInt(1000)
        return {
            id: ANNetwork.myId()
            name: plName
            mapId: 0
            actorId: 0
            index: 0
            scene: ""
            characterReady: false
            isMapMaster: false
            onEvent: 0
        }

    _.isCharOnMap = (p) -> p.mapId == $gameMap.mapId() && p.characterReady is true

    _.isCurrentPlayerActor = (actor, p) -> actor.actorId() == p.actorId

    _.getRequestedNetworkState = (p) ->
        if p.scene == "menu"
            return 2
        return -1

    _.getNetCharacterForPlayer = (p) ->
        return $gameMap.networkCharacterById(p.id)

    
    return
# ■ END NetPlayerDataWrapper.coffee
#---------------------------------------------------------------------------