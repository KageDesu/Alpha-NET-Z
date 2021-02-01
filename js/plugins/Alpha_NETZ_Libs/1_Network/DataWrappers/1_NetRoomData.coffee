# * Класс содержит данные о текущей комнате (игроки, кто мастер, название)
class NetRoomData
    constructor: () ->
        @name = ""
        @masterId = ""
        @playersIds = []

#TODO: Не испльзуется!