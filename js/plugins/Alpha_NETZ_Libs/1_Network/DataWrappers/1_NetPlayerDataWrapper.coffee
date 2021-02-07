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
        {
            id: ANNetwork.myId()
            name: "Player " + Math.randomInt(1000)
            mapId: 0
            actorId: 0
            index: 0
            scene: ""
            characterReady: false
            isMapMaster: false
        }

    _.isCharOnMap = (p) -> p.mapId == $gameMap.mapId() && p.characterReady is true

    _.getRequestedNetworkState = (p) ->
        if p.scene == "menu"
            return 2
        return -1

    _.getNetCharacterForPlayer = (p) ->
        return $gameMap.networkCharacterById(p.id)

    
    return
# ■ END NetPlayerDataWrapper.coffee
#---------------------------------------------------------------------------