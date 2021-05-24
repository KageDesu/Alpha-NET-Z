#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#$[ENCODE]
do ->

    #@[DEFINES]
    _ = Game_Interpreter::

    _.nIsEventIsShared = ->
        try
            return @isHaveNetworkStartOptions() && @nStartOptions.sharedMode != "No"
        catch e
            ANET.w e
            return false

    _.nIsEventIsSharedAndStrict = ->
        try
            return @nIsEventIsShared() && @nStartOptions.sharedMode?.contains("Strict")
        catch e
            ANET.w e
            return false

    _.nIsSharedEventCanBeForceCancelled = ->
        # * Нельзя отменить "Strict" общее событие
        # * Только в самом начале можно отменить, когда событие ещё не стартовало
        return !@nIsEventIsSharedAndStrict() && @nSyncWaitCommandData.index == 0

    _.nPrepareSharedEvent = ->
        ANInterpreterManager.resetSharedEvent()
        "PREPARE SHARED MOD".p(@_eventId)
        unless $gameTemp._nSharedEventOuterStartFlag?
            # * Сброс пула игроков
            @nPlayerPool = null
            # * Регестрируем общее событие (второй аргумент флаг - мастер этот клиент?)
            ANInterpreterManager.setupSharedInterpreter(@, true)
            # * Запускаем пул игроков (на карте)
            @nRequestSyncedNextEventCommand()
        else
            "OUUTER START".p()
            # * Сброс флага
            $gameTemp._nSharedEventOuterStartFlag = null
            # * Отправим, что мы зарегестрировались на этом событии
            ANInterpreterManager.setupSharedInterpreter(@, false)
            # * Ждём разрешение на старт следующей команды (от сервера, мастера общего события)
            @nRequestSyncedNextEventCommand()
        return
    
    # * Игрок отменил ожидания других игроков (события должно закрыться сразу)
    _.nIsSharedEventWaitPoolCancelled = ->
        try
            return unless @nIsSharedEventCanBeForceCancelled()
            if Input.isCancel()
                # * Прерываем событие сразу (не запускаем)
                # * Очищаем ввод, чтобы меню сразу не выскочело после нажатия Esc
                Input.clear()
                ANInterpreterManager.forceCancelSharedEvent()
                @terminate()
                return true
        catch e
            ANET.w e
        return false

    # * Следующая команда события должна быть синхронизированна
    _.nRequestSyncedNextEventCommand = ->
        @nSyncWaitCommandData = {
            index: @_index
            indent: @_indent
        }
        if ANInterpreterManager.isSharedEventMaster()
            @nSetWaitPlayerPool()
        else
            @nSetWaitStartNextCommandFromServer()
        ANInterpreterManager.showWaitPlayersOnSharedEvent()
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
        unless @nPlayerPool?
            @nPlayerPool = new PlayersWaitPool()
        else
            # * Не пересоздаём, так как нам важно учитывать только тех игроков на карте
            # * которые были во время запуска события, а не подключились позже
            @nPlayerPool.reset()
        # * Отправляем на сервер запрос
        @nPlayerPool.register()
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
            # * Теперь событие продолжается (мастер)
            "STOP WAITING PLAYERS : IS READY".p()
            ANInterpreterManager.sendSharedEventReadyToContinue()
            ANInterpreterManager.hideWaitPlayersOnSharedEvent()
            @nClearSharedSyncEventCommandWait()
            @_waitMode = ''
        return waiting

    # * Очистить пул и данные команды на синхронизацию
    _.nClearSharedSyncEventCommandWait = ->
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
            # * Событие продолжается (клиент)
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
        ANInterpreterManager.hideWaitPlayersOnSharedEvent()
        return

    # * Следующий выбор (команда 102) будет в режиме "только мастер события"
    _.nRequestMasterOnlyChoicesModeForNextChoice = ->
        # * Если Пул игроков пустой, то не задаём флаг, чтобы сервер лишний раз не грузить
        return if @nPlayerPool? and @nPlayerPool.isSinglePool()
        "Shared Event Choices in Master only mode".p()
        $gameTemp.nRequireChoiceOnlyForMaster = true
        return

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------