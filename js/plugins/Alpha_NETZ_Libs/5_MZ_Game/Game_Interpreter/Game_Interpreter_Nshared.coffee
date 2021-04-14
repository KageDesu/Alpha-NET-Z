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
            # * Регестрируем общее событие (второй аргумент флаг - мастер этот клиент?)
            ANInterpreterManager.setupSharedInterpreter(@, true)
            # * Запускаем пул игроков (на карте)
            @nRequestSyncedNextEventCommand()
        else
            "OUUTER START".p()
            # * Отправим, что мы зарегестрировались на этом событии
            ANInterpreterManager.setupSharedInterpreter(@, false)
            # * Ждём разрешение на старт следующей команды (от сервера, мастера общего события)
            @nRequestSyncedNextEventCommand()
        return
    
    # * Игрок отменил ожидания других игроков (события должно закрыться сразу)
    _.nIsSharedEventWaitPoolCancelled = ->
        try
            #TODO: Кнопку в параметры? (Потом)
            #TODO: if option is not strict
            #TODO: ТОЛЬКО В САМОМ НАЧАЛЕ!
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

    # * Следующая команда события должна быть синхронизированна
    _.nRequestSyncedNextEventCommand = ->
        #TODO: Надо визуально ожидание рисовать, как было в Alpha NET
        #TODO: Game Событие отправить? Или напрямую или сцена сама проверяем?
        @nSyncWaitCommandData = {
            index: @_index
            indent: @_indent
        }
        if ANInterpreterManager.isSharedEventMaster()
            @nSetWaitPlayerPool()
        else
            @nSetWaitStartNextCommandFromServer()
        return

    # * Когда пришли данные от клиента
    _.nOnSyncedEventCommandResponse = (index, indent, actorId) ->
        try
            return unless @nSyncWaitCommandData?
            return unless @nPlayerPool?
            if @nSyncWaitCommandData.index == index &&
                @nSyncWaitCommandData.indent == indent
                    "PLAYER ANSWER ".p(actorId)
                    @nPlayerPool.onAnswer(actorId)
        catch e
            ANET.w e
            return

    # * Ожидания пула игроков
    _.nSetWaitPlayerPool = ->
        "START POOL".p()
        @nPlayerPool = new PlayersWaitPool()
        @_waitMode = "netPlayersPool"
        return

    # * Ожидание готовности пула игроков (этот метод работает только на мастере общего события)
    _.nUpdateWaitPlayersPool = ->
        # * Пул надо обновлять (таймер внутри на повторную отправку запроса о готовности клиентов)
        @nPlayerPool.update()
        if @nIsSharedEventWaitPoolCancelled()
            "STOP WAITING PLAYERS : IS CANCELED!".p()
            return true # * Сразу выход из ожидания, если ожидание было преврано
        waiting = !@nPlayerPool.isReady()
        unless waiting
            "STOP WAITING PLAYERS : IS READY".p()
            ANInterpreterManager.sendSharedEventReadyToContinue()
            @nClearSharedSyncEventCommandWait()
            @_waitMode = ''
        return waiting

    # * Очистить пул и данные команды на синхронизацию
    _.nClearSharedSyncEventCommandWait = ->
        @nPlayerPool = null
        @nSyncWaitCommandData = null
        return

    # * Ждать разрешение от сервера (мастера общего события) на запуск следующей команды события
    # * Этот метод работает только на клиентах (не мастере общего события)
    _.nSetWaitStartNextCommandFromServer = ->
        @_canContinueSharedEvent = false
        ANInterpreterManager.sendSharedEventRegisteredDone()
        "WAIT SERVER FOR NEXT COMMAND".p()
        # * Когда клиент уже на команде, которую надо синхронизировать, он будет
        # * каждую секунду "напоминать" о себе (снова отправлять что он готов продолжать)
        @_nRepeatAnswerToServerTimer = 60
        @_waitMode = "netNextCommand"
        return

    # * Ожидание разрешения от сервера на запуск следующей команды
    _.nUpdateWaitServerNextCommandPermission = ->
        # * Сервер закрыл общее событие (отменил ожидание старта)
        # * В GameTemp, потому что может отменить, как тут ещё и не стартует это событие
        if $gameTemp._shouldForceExitSharedEvent == true
            @terminate()
            return true
        waiting = !@_canContinueSharedEvent
        unless waiting
            "CAN PROCESS TO NEXT COMMAND".p()
            @_waitMode = ''
        else
            if @_nRepeatAnswerToServerTimer >= 0
                @_nRepeatAnswerToServerTimer--
                if @_nRepeatAnswerToServerTimer == 0
                    @nSetWaitStartNextCommandFromServer()
        return true

    # * Получен ответ от сервера, что можно продолжать выполнение общего события
    _.nAllowContinueSharedEvent = ->
        return if @_waitMode != "netNextCommand"
        @_canContinueSharedEvent = true
        # * Чтобы сброс переменной не произошёл снова
        @_nRepeatAnswerToServerTimer = -1
        return

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------