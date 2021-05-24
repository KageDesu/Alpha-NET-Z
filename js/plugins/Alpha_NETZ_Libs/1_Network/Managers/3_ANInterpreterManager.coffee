# * Данный класс отвечает за синхронизацию и обработку интерпретера и команд события

#$[ENCODE]

#@[GLOBAL]
window.ANInterpreterManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetIntr")
    LOG.setColors(KDCore.Color.YELLOW, KDCore.Color.BLACK.getLightestColor(15))
    LOG.on()

    #@[DEFINES]
    _ = window.ANInterpreterManager

    # * Когда закончелось событие
    _.eventProcessExit = ->
        if $gameMessage.isBusy()
            $gameMessage.nSetEndCallback(_.eventProcessExit)
        else
            unless $gameMap.isEventRunning()
                _.sendEventEnded()
                _.resetSharedEvent()
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
    # * mapId - ID карты не текущей, а того, от кого пришла команда (нужно для Self.Switch)
    _.startVirtualCommand = (list, eventId, mapId) ->
        try
            # * Self.Switch имеет отдельную обработку (так как mapId отличается)
            if list[0].code == 123 && eventId > 0
                key = [mapId, eventId, list[0].parameters[0]]
                $gameSelfSwitches.setValue(key, list[0].parameters[1] == 0)
            else # * Команда может быть только одна (всегда), поэтому else (больше команд нету)
                virtualInter = new Game_Interpreter()
                virtualInter.setup(list, eventId)
                virtualInter.executeCommand() # * force execute
        catch e
            ANET.w e
        return

    # * Выполнить комадну виртуально?
    _.isVirtualCommand = (commandCode) -> !ANET.System.NonVirtualCommandsList.contains(commandCode)


    # * Сброс общего события
    _.resetSharedEvent = ->
        @_sharedInterpreter = null
        @_sharedEventMaster = false
        # * На всякий случай
        @hideWaitPlayersOnSharedEvent()
        return

    # * Когда игрок запускает общее событие, оно регестрируется этим методом
    # * ссылка на сам interpreter и флаг - является ли игрок мастером - кто первый запустил
    _.setupSharedInterpreter = (@_sharedInterpreter, @_sharedEventMaster) ->
        # * Сброс флага необходимости закрытия (для клиентов)
        $gameTemp._shouldForceExitSharedEvent = false
        # * Нельзя, если уже зарезервированно общее событие от сервера
        return if $gameTemp.isNetworkSharedEventReserved()
        return unless @_sharedInterpreter?
        LOG.p("Shared event registred " + @_sharedInterpreter.eventId())
        return

    # * Является ли данный клиент мастером общего события
    _.isSharedEventMaster = -> @isSharedEventIsRunning() and @_sharedEventMaster is true

    _.isSharedEventIsRunning = -> @_sharedInterpreter? && $gameMap.isEventRunning()

    # * Отмена ожидания игроков (когда Shared mode == optional)
    _.forceCancelSharedEvent = ->
        return unless @isSharedEventMaster()
        LOG.p("Shared event force cancelled")
        "SEND ALL CANCEL EVENT".p()
        @sendForceCancelSharedEvent()
        @hideWaitPlayersOnSharedEvent()
        return

    _.showWaitPlayersOnSharedEvent = ->
        @hideWaitPlayersOnSharedEvent()
        #TODO: Вынести все строки в параметры
        text = "Waiting players"
        text2 = ""
        if @isSharedEventMaster() && @_sharedInterpreter.nIsSharedEventCanBeForceCancelled()
            text2 = "Press ESC to cancel"
        HUIManager?.showWaitingInfo(text, text2, 1000)
        return

    _.hideWaitPlayersOnSharedEvent = ->
        HUIManager?.hideWaitingInfo()

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

    # * Отправка запроса чтобы все начали общее событие
    # * Игрок запустил общее событие и будет теперь ждать всех игроков (на карте)
    _.sendSharedEventRequireRegister = ->
        # * Только мастер может это отправить
        # * Плюс эта проверка гарантирует, что мы запустили событие
        return unless @isSharedEventMaster()
        data = {
            mapId: $gameMap.mapId(),
            eventId: @_sharedInterpreter.eventId()
            index: @_sharedInterpreter.nSyncWaitCommandData.index
            indent: @_sharedInterpreter.nSyncWaitCommandData.indent
        }
        ANNetwork.send(NMS.Event("registerOnShared", data))
        return

    # * Отправка ответа, что клиент зарегестрировался на общем событии
    _.sendSharedEventRegisteredDone = ->
        return if @isSharedEventMaster()
        data = {
            mapId: $gameMap.mapId(),
            eventId: @_sharedInterpreter.eventId()
            actorId: ANGameManager.myActorId()
            index: @_sharedInterpreter.nSyncWaitCommandData.index
            indent: @_sharedInterpreter.nSyncWaitCommandData.indent
        }
        ANNetwork.send(NMS.Event("registerDone", data))
        return

    # * Мастер отправляет клиентам, что можно продолжать выполнение
    _.sendSharedEventReadyToContinue = ->
        return unless @isSharedEventMaster()
        data = {
            mapId: $gameMap.mapId(),
            eventId: @_sharedInterpreter.eventId()
        }
        ANNetwork.send(NMS.Event("sharedCanContinue", data))
        return

    # * Когда мастер общего события отменяет общее событие (на стадии ожидания игроков)
    _.sendForceCancelSharedEvent = ->
        return unless @isSharedEventMaster()
        data = {
            mapId: $gameMap.mapId(),
            eventId: @_sharedInterpreter.eventId()
        }
        ANNetwork.send(NMS.Event("sharedForceCancel", data))
        return

    _.sendChoiceSelection = (index, action) ->
        return unless @isSharedEventMaster()
        data = {
            mapId: $gameMap.mapId(),
            eventId: @_sharedInterpreter.eventId()
            index: index,
            action: action
        }
        ANNetwork.send(NMS.Event("sharedChoice", data))
        return

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    # * Просто общее событие ждёт, а некоторые вещи можно сразу выполнять, не зависимо от того игрок находится в событии или нет
    _.onVirtualCommand = (data) ->
        try
            # * Если только на одой карте, то проверяем номер карты
            if data.options.scope == "Same map"
                return if $gameMap.mapId() != data.mapId
            # * Затем проверяем фильтр (для нас ли эта команда?)
            return unless ANET.Utils.isPassEventFilterOptions(data.options)
            event = data.event
            list = event.list
            # * В зависимости от опции, запускаем в разных режимах
            switch data.options.executeMode
                when "Virtual"
                    _.startVirtualCommand(list, data.eventId, data.mapId)
                when "Common Event"
                    $gameTemp.reserveVirtualCommonEvent(event)
                else #? AUTO
                    # * Некоторые команды можно выполнять сразу, не ожидая сцены (или другого события)
                    if _.isVirtualCommand(list[0].code)
                        _.startVirtualCommand(list, data.eventId, data.mapId)
                    else
                        # * Остальные идут как общее событие (приоритетное)
                        $gameTemp.reserveVirtualCommonEvent(event)
        catch e
            ANET.w e
        return

    # * Когда пришёл запрос с сервера, что надо начать общее событие
    _.onRegisterOnSharedEventRequest = (data) ->
        try
            {
                mapId,
                eventId,
                index,
                indent
            } = data
            # * Если карта другая, то пропускаем это сообщение
            return if $gameMap.mapId() != mapId
            # * Если общее событие уже запущено (не важно какое), игнорируем
            return if _.isSharedEventIsRunning()
            # * Это событие уже начато, т.е. этот клиент опоздал (пришёл с другой карты)
            return if index != 0
            $gameTemp.reserveNetworkSharedEvent(eventId)
            return
        catch e
            ANET.w e
        return

    # * Когда клиент на необходимой команде общего события
    _.onRegisterOnSharedEventResponse = (data) ->
        try
            {
                mapId,
                eventId,
                actorId,
                index,
                indent
            } = data
            # * Если карта другая, то пропускаем это сообщение
            return if $gameMap.mapId() != mapId
            # * Мы не мастер, игнорируем
            return unless _.isSharedEventMaster()
            # * ID событий не совпадают, игнорируем
            return if _._sharedInterpreter.eventId() != eventId
            # * Регестрируем ответ
            _._sharedInterpreter.nOnSyncedEventCommandResponse(index, indent, actorId)
        catch e
            ANET.w e
        return

    # * Когда все игроки "готовы" и можно продолжать выполнение общего события
    _.onContinueSharedEvent = (data) ->
        try
            {
                mapId,
                eventId
            } = data
            # * Если карта другая, то пропускаем это сообщение
            return if $gameMap.mapId() != mapId
            # * Если общее событие не запущено, игнорируем
            return unless _.isSharedEventIsRunning()
             # * Мы мастер, игнорируем (выполнение у мастера от пула внутри события)
            return if _.isSharedEventMaster()
            # * ID событий не совпадают, игнорируем
            return if _._sharedInterpreter.eventId() != eventId
            _._sharedInterpreter.nAllowContinueSharedEvent()
        catch e
            ANET.w e

    # * Когда мастер общего события отменил его
    _.onSharedEventForceCancelFromServer = (data) ->
        try
            {
                mapId,
                eventId
            } = data
            # * Если карта другая, то пропускаем это сообщение
            return if $gameMap.mapId() != mapId
            # * Мы мастер, игнорируем
            return if _.isSharedEventMaster()
            if _.isSharedEventIsRunning()
                # * ID событий не совпадают, игнорируем
                return if _._sharedInterpreter.eventId() != eventId
                # * Ставим глобальны флаг (обаботка идёт внутри Game_Event)
                $gameTemp._shouldForceExitSharedEvent = true
            else
                # * Если событие ещё не было запущено (например этот клиент был в меню)
                # * Надо проверить не стоит ли событие в очереди на запуск
                if $gameTemp.isNetworkSharedEventReserved()
                    # * Если ID событий совпадает
                    if eventId == $gameTemp._reservedNetworkSharedEvent
                        $gameTemp.retrieveNetworkSharedEvent() # * Забираем без выполнения
                return
        catch e
            ANET.w e

    # * Когда мастер общего события сменил выбор (или действие выбора) в окне выбора вариантов в сообщении
    _.onSharedEventChoiceActionFromServer = (data) ->
        try
            {
                mapId,
                eventId,
                action,
                index
            } = data
            # * Если карта другая, то пропускаем это сообщение
            return if $gameMap.mapId() != mapId
            # * Если клиент не в общем событии, пропускаем
            return unless _.isSharedEventIsRunning()
            # * ID событий не совпадают, игнорируем
            return if _._sharedInterpreter.eventId() != eventId
            # * Задаём глобальные данные
            $gameTemp.nSelectionActionFromNetwork = {
                action, index
            }
            LOG.p("Shared Choice accepted from server")
        catch e
            ANET.w e


    return
