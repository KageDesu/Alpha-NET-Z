# * Данный класс отвечает за синхронизацию и обработку интерпретера и команд события

#@[GLOBAL]
ANInterpreterManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetIntr")
    LOG.setColors(KDCore.Color.YELLOW, KDCore.Color.BLACK.getLightestColor(15))
    LOG.on()

    #@[DEFINES]
    _ = ANInterpreterManager

    # * Когда закончелось событие
    _.eventProcessExit = ->
        if $gameMessage.isBusy()
            $gameMessage.nSetEndCallback(_.eventProcessExit)
        else
            unless $gameMap.isEventRunning()
                _.sendEventEnded()
        return

    # * Дополнительная проверка что статус игрока соответсвует событию (запущено или нет)
    _.checkEventRunning = ->
        if NetPlayerDataWrapper.isOnAnyEvent(ANGameManager.myPlayerData())
            unless $gameMap.isEventRunning()
                @sendEventEnded() unless $gameMessage.isBusy()
        else
            if $gameMap.isEventRunning()
                evId = $gameMap._interpreter.eventId()
                @sendEventStarted(evId)
        return

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    # * Когда игрок запускает какое-либо событие
    _.sendEventStarted = (eventId) ->
        ANNetwork.send(NMS.Event("eventStarted", eventId))
    
    # * Когда игрок "выходит" из запущенного события
    _.sendEventEnded = ->
        ANNetwork.send(NMS.Event("eventEnded"))
    

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    

    return
