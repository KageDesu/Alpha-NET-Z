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
            unless $gameTemp._tempPlayerNetworkName?
                $gameTemp._tempPlayerNetworkName = "Player " + Math.randomInt(1000)
            plName = $gameTemp._tempPlayerNetworkName
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
            onCommonEvent: 0
        }

    _.isCharOnMap = (p) -> p.mapId == $gameMap.mapId() && p.characterReady is true

    _.isCurrentPlayerActor = (actor, p) -> actor.actorId() == p.actorId

    _.isOnEvent = (p, eventId) -> p.onEvent == eventId

    _.getRequestedNetworkState = (p) ->
        if p.scene == "menu"
            return 2
        if p.scene == "battle"
            return 5
        if _.isOnAnyEvent(p)
            return 1
        return -1

    _.getNetCharacterForPlayer = (p) ->
        return null unless p?
        return $gameMap.networkCharacterById(p.id)

    _.getActorForPlayer = (p) ->
        return null unless p?
        return $gameActors.actor(p.actorId)
    
    _.isOnAnyEvent = (p) ->
        return false unless p?
        return (p.onEvent > 0 || p.onCommonEvent > 0) and _.isCharOnMap(p)

    return
# ■ END NetPlayerDataWrapper.coffee
#---------------------------------------------------------------------------