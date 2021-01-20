# * Данный класс хранит информацию о мире, определённого игрока
# * Хранятся данные его Actor, вещи, переменные и переключатели
class NetPlayerWorldData
    constructor: () ->
        @actorData = null
        @actorItems = null
        @variablesData = []
        @selfSwitchData = []
        @switchData = []

    setActorData: (data) -> @actorData = data

    getActorData: -> @actorData

    setActorItems: (data) -> @actorItems = data

    getActorItems: -> @actorItems

    setWorldData: (data) ->
        try
            @variablesData = data.variablesData
            @switchData = data.switchData
            @selfSwitchData = data.selfSwitchData
        catch e
            Network.error e, 'while try save World Data for player'

    getWorldDataNetwork: () ->
        data = {
            variablesData: JSON.stringify(@variablesData),
            switchData: JSON.stringify(@switchData),
            selfSwitchData: JSON.stringify(@selfSwitchData)
        }

    makeSaveContents: (actorId) ->
        world = {
            variablesData: @variablesData
            switchData: @switchData
            selfSwitchData: @selfSwitchData
        }
        saveData = {
            world: world
            actorItems: @actorItems
            actorData: $gameActors._data[actorId]
        }
        return saveData

ANET.register NetPlayerWorldData