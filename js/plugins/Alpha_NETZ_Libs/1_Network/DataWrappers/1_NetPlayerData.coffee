# * Класс содержит сетевые данные об этом игроке
class NetPlayerData
    constructor: (@id) ->
        # * Присваеваем случайное имя
        @name = "Player " + Math.randomInt(1000)
        
    @CreateLocal: () ->
        #return new NetPlayerData(ANNetwork.myId())
        {
            @id = ANNetwork.myId()
            @name = "Player " + Math.randomInt(1000)
        }

#TODO: Не испльзуется, переделать в Wrapper и описание структуры
