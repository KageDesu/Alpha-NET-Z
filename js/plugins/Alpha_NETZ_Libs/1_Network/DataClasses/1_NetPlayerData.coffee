# * Класс содержит сетевые данные об этом игроке
class NetPlayerData
    constructor: (@myId) ->
        # * Присваеваем случайное имя
        @name = "Player " + Math.randomInt(1000)
        
    @CreateLocal: () ->
        return new NetPlayerData(ANNetwork.myId())