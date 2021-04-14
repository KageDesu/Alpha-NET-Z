#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Interpreter::

    _.nIsEventIsShared = ->
        try
            return @nStartOptions?.sharedMode != "No"
        catch e
            ANET.w e
            return false

    _.nPrepareSharedEvent = ->
        # * Сбрасываем на всякий случай
        @nPlayerPool = null
        ANInterpreterManager.resetSharedEvent()
        "PREPARE SHARED MOD".p(@_eventId)
        unless $gameTemp._nSharedEventOuterStartFlag?
            # * START POOL (event master)
            # * Запускаем пул игроков (на карте)
            "START POOL".p()
            @nSetWaitPlayerPool()
            #TODO: Надо визуально ожидание рисовать, как было в Alpha NET
            #TODO: Событие отправить? Или напрямую или сцена сама проверяем?
            # * Регестрируем общее событие (второй аргумент флаг - мастер этот клиент?)
            ANInterpreterManager.setupSharedInterpreter(@, true)
        else
            # * START EVENT (send pool ready)
            "OUUTER START".p()
            #TODO: ТОЖЕ НАДО ВИЗУАЛ, только не сразу, а через время
            # * Ждём разрешение на старт следующей команды (от сервера, мастера общего события)
            @nSetWaitStartNextCommandFromServer()
            # * Отправим, что мы зарегестрировались на этом событии
            ANInterpreterManager.setupSharedInterpreter(@, false)
        return
    
    # * Игрок отменил ожидания других игроков (события должно закрыться сразу)
    _.nIsSharedEventWaitPoolCancelled = ->
        try
            #TODO: Кнопку в параметры? (Потом)
            #TODO: if option is not strict
            if Input.isTriggered('cancel')
                # * Прерываем событие сразу (не запускаем)
                # * Очищаем ввод, чтобы меню сразу не выскочело после нажатия Esc
                Input.clear()
                @terminate()
                ANInterpreterManager.forceCancelSharedEvent()
                return true
        catch e
            ANET.w e
        return false

    # * Запуск общего события для всех (когда уже все игроки готовы, отправляем разрешение на запуск 1 команды)
    _.nStartSharedEventForAll = ->

    _.nRequestWaitNextEventCommand = ->
        @_nWaitCommandId = {
            index: @_index
            indent: @_indent
        }
        if ANInterpreterManager.isSharedEventMaster()
            @nSetWaitPlayerPool()
        else
            @nSetWaitStartNextCommandFromServer()
        #TODO: НАДО СИСТЕМАТИЗИРОВАТЬ ТАК, ЧТО ЗАПУСК СОБЫТИЯ, ЭТО ПО СУТИ И ОЖИДАНИЯ КОМАНДЫ 1

    # * Ожидания пула игроков
    _.nSetWaitPlayerPool = ->
        @nPlayerPool = new PlayersWaitPool()
        @_waitMode = "netPlayersPool"
        return

    # * Ожидание готовности пула игроков
    _.nUpdateWaitPlayersPool = ->
        # * Пул надо обновлять (таймер внутри на повторную отправку)
        @nPlayerPool.update()
        if @nIsSharedEventWaitPoolCancelled()
            "STOP WAITING PLAYERS : IS CANCELED!".p()
            return true # * Сразу выход из ожидания, если ожидание было преврано
        waiting = !@nPlayerPool.isReady()
        unless waiting
            "STOP WAITING PLAYERS : IS READY".p()
            #@nStartSharedEventForAll()
            @_waitMode = ''
        return waiting

    # * Ждать разрешение от сервера (мастера общего события) на запуск следующей команды события
    _.nSetWaitStartNextCommandFromServer = ->
        "WAIT SERVER FOR NEXT COMMAND".p()
        @_waitMode = "netNextCommand"
        return

    # * Ожидание разрешения от сервера на запуск следующей команды
    _.nUpdateWaitServerNextCommandPermission = ->
        waiting = true
        unless waiting
            "CAN PROCESS TO NEXT COMMAND".p()
            @_waitMode = ''
        return waiting

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------