# * Класс содержит сетевые данные об этом игроке
class NetPlayerData
    constructor: (@id) ->
        # * Присваеваем случайное имя
        @name = "NoName"
        @mapId = 0
        @actorId = 0
        @index = 0
        @scene = ""
        @characterReady = false
        
    @CreateLocal: () ->
        #return new NetPlayerData(ANNetwork.myId())
        {
            @id = ANNetwork.myId()
            @name = "Player " + Math.randomInt(1000)
        }

#TODO: Не испльзуется, переделать в Wrapper и описание структуры
