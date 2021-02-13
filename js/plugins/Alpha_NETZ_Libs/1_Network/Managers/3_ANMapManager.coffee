# * Данный класс отвечает за синхронизацию и обработку игровых карт

#@[GLOBAL]
ANMapManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetMap")
    LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35))
    LOG.on()

    #@[DEFINES]
    _ = ANMapManager

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================



    return