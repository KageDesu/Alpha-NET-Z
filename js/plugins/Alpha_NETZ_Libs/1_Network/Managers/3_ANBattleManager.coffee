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

    
    #TODO: Если в бою только один, то ничего передавать на сервер не надо!

    _.onBattleStarted = ->
        @sendBattleStarted()
        #TODO: отправить статус в битве
        #TODO: получить флаг мастер боя - просто первый в группе?
        #TODO: это наверное через get?
        
    #TODO: Так же переделать и Battle observer в SyncData
    _.callBattleMethod = (battler, method, args) ->
        # * Если в бою только один игрок, то ничего не отправляем (чтобы не грузить сеть)
        return if $gameParty.isOneBattler()
        @sendBattleMethod(
            method,
            battler.packForNetwork(),
            args
        )
        return

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendBattleStarted = ->
        ANNetwork.send(NMS.Battle("started"))

    _.sendBattleMethod = (methodName, id, args) ->
        data = {
            method: methodName,
            id: id,
            data: args
        }
        ANNetwork.send(NMS.Battle("battleMethod", data), true)
        return

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    # * С сервера пришла команда (метод) боя
    _.onBattleMethod = (battlerNetData, method, args) ->
        try
            battler = ANET.Utils.unpackBattlerFromNetwork(battlerNetData)
            if battler[method]?
                #TODO: convert arguments
                battler[method](args)
            #switch method
            #    when 'startDamagePopup'
            #        @_onStartDamagePopup(id)
            #    else
            #        LOG.p("From server: unknown battle method: " + method)
        catch e
            ANET.w e
        return

    return