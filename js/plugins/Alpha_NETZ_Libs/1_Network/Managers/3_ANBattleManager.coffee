# * Данный класс отвечает за синхронизацию и обработку данных в бою

#@[GLOBAL]
ANBattleManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetBattle")
    LOG.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(135))
    LOG.on()

    #@[DEFINES]
    _ = ANBattleManager


    _.onBattleStarted = ->
        @sendBattleStarted()
        #TODO: отправить статус в битве
        #TODO: получить флаг мастер боя - просто первый в группе?
        #TODO: это наверное через get?
        

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendBattleStarted = ->
        ANNetwork.send(NMS.Battle("started"))

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================




    return