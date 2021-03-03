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

    # * Выполнить виртуальную команду (list) вне очереди (не ожидая сцены или другого события)
    _.startVirtualCommand = (list, eventId) ->
        try
            virtualInter = new Game_Interpreter()
            virtualInter.setup(list, eventId)
            virtualInter.executeCommand() # * force execute
        catch e
            ANET.w e
        return

    # * Выполнить комадну виртуально?
    _.isVirtualCommand = (commandCode) -> !ANET.System.NonVirtualCommandsList.contains(commandCode)

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    # * Когда игрок запускает какое-либо событие
    _.sendEventStarted = (eventId) ->
        ANNetwork.send(NMS.Event("eventStarted", eventId))
    
    # * Когда игрок "выходит" из запущенного события
    _.sendEventEnded = ->
        ANNetwork.send(NMS.Event("eventEnded"))
    
    # * Отправка виртуальной команды на сервер
    _.sendEventVirtualCommand = (command, options, eventId) ->
        # * Эта команда всегда в конце
        endCommand = {
            code: 0,
            indent: 0,
            parameters: []
        }
        # * Модель общего события
        vEvent = {
            list: [command, endCommand]
        }
        data = {
            mapId: $gameMap.mapId(),
            eventId: eventId,
            event: vEvent,
            options: options
        }
        ANNetwork.send(NMS.Event("virtualEventCommand", data))
        return

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    # * Просто общее событие ждёт, а некоторые вещи можно сразу выполнять, не зависимо от того игрок находится в событии или нет
    _.onVirtualCommand = (data) ->
        try
            # * Если только на одой карте, то проверяем номер карты
            #TODO: Требуется проверка (не тестировалось)
            if data.options.scope == "Same map"
                return if $gameMap.mapId() != data.mapId
            # * Затем проверяем фильтр (для нас ли эта команда?)
            return unless ANET.Utils.isPassEventFilterOptions(data.options)
            event = data.event
            list = event.list
            # * В зависимости от опции, запускаем в разных режимах
            switch data.options.executeMode
                when "Virtual"
                    _.startVirtualCommand(list, data.eventId)
                when "Common Event"
                    $gameTemp.reverseVirtualCommonEvent(event)
                else #? AUTO
                    # * Некоторые команды можно выполнять сразу, не ожидая сцены (или другого события)
                    if _.isVirtualCommand(list[0].code)
                        _.startVirtualCommand(list, data.eventId)
                    else
                        # * Остальные идут как общее событие (приоритетное)
                        $gameTemp.reverseVirtualCommonEvent(event)
        catch e
            ANET.w e
        return

    return
