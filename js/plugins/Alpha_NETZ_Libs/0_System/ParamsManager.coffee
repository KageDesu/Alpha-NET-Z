# * Класс которые работает с параметрами плагина

do ->
    class ParamsManager extends KDCore.ParamLoader
        constructor: () ->
            super("ANETZ")
    
        #TODO: Чтение параметров из H

        actorsForNetwork: -> [1, 2, 3, 4]

        # * Можно ли выбирать персонажа себе
        isActorSelectionAllowed: -> true

        # * Начальная карта для сетевого режима
        networkGameStartMap: -> 1

        # * Автоматически перемещает с начальной сетевой карты на игровую
        isNetworkGameAutoStart: -> true

        #TODO: Нужна комманда плагина, которая работает только на начальной карте
        # и перемещает на начальную игровую карту (не Transfer, а on game start)

    ANET.link ParamsManager
    return