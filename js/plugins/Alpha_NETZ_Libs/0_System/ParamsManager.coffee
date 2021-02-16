# * Класс которые работает с параметрами плагина

do ->
    class ParamsManager extends KDCore.ParamLoader
        constructor: () ->
            super("ANETZ")
    
        #TODO: Чтение параметров из H

        actorsForNetwork: -> [1, 2, 3, 4]

        # * Можно ли выбирать персонажа себе
        isActorSelectionAllowed: -> true

        networkGameStartMap: -> 1
        #TODO: Также нужны параметры X,Y,Direction

        

    ANET.link ParamsManager
    return