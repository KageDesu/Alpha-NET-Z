#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    # * Используется Virtual Interpreter. Команда от сервера запускается в отдельном Interpreter, а не
    # * в аналогичном событии (как это было в Alpha NET).
    # * Некоторы команды выполняются напрямую, а некоторые через общие события только с одной командой

    #@[DEFINES]
    _ = Game_Interpreter::

    # * Отключение не подходящих для сети комманд
    _.nDisableNotNetCommands = ->
        disableCommand = () -> _["command" + code] = () -> true
        # * Change Party Member
        # * Set Vehicle Location
        # * Get on/off Vehicle
        # * Change Player Followers
        # * Gather Followers
        # * Change Formation Access
        for code in [129, 202, 206, 216, 217, 137]
            disableCommand(code)
        return

    _.nIsHaveCommandOptions = -> @_nCommandOptionsRequested is true && @nCommandStartOptions?

    _.nClearCommandOptions = ->
        @_nCommandOptionsRequested = false
        @nCommandStartOptions = null

    # * Устанавливаем опции (набор данных) и флаг что надо использовать на следующей команде
    _.nSetCommandOptions = (@nCommandStartOptions) ->
        @_nCommandOptionsRequested = true

    # * Опции подходят для "текущей" (следующей на выполнение) команды
    _.nIsOptionsForCurrentCommand = ->
        return false unless @nIsHaveCommandOptions()
        return false if ANET.System.ForbiddenVirtualCommandsList.contains(@currentCommand().code)
        return true

    # * Проверка опций и выполнение команды в соответсвии с ними
    _.nProcessCommandWithOptions = ->
        try
            # * Снимаем флаг, что надо использовать опции
            @_nCommandOptionsRequested = false
            switch @nCommandStartOptions.whoSelector
                when "All"
                    return @_nProcessCommandForAll()
                when "Master"
                    return @_nProcessCommandForMaster(true)
                when "Master Except"
                    return @_nProcessCommandForMaster(false)
                when "Actor List"
                    return @_nProcessCommandForActorsList(true)
                when "Actor List Except"
                    return @_nProcessCommandForActorsList(false)
                when "Me Except"
                    return @_nProcessCommandNotMe()
        catch e
            ANET.w e
        return _.ALIAS__executeCommand.call(@)
    
    _._nProcessCommandForAll = ->
        @_nSendCommandToServer()
        # * Выполнение команды как обычно у себя (так как там broadcast)
        return _.ALIAS__executeCommand.call(@)

    _._nProcessCommandForMaster = (isInclude) ->
        if ANNetwork.isMasterClient() == isInclude
            return _.ALIAS__executeCommand.call(@)
        else
            @_nSendCommandToServer()
            return @_nSkipCommand()

    _._nProcessCommandForActorsList = (isInclude) ->
        @_nSendCommandToServer()
        if ANET.Utils.isMyActorInValidListToStart(@nCommandStartOptions.actorList, isInclude)
            return _.ALIAS__executeCommand.call(@)
        else
            return @_nSkipCommand()
        
    _._nProcessCommandNotMe = () ->
        @_nSendCommandToServer()
        return @_nSkipCommand()

    _._nSkipCommand = () ->
        @_index++
        @nClearCommandOptions()
        return true

    _._nSendCommandToServer = () ->
        ANInterpreterManager.sendEventVirtualCommand(
                @currentCommand(), @nCommandStartOptions, @eventId()
            )
        return

    # * Проверить комментарий на наличие NET команд
    _._nCheckNetComment = (commentLine) ->
        command = ANET.Utils.getNetCommentCommand(commentLine)
        return unless String.any(command)
        switch command
            when "localActor"
                @_nOnNetCommand_LocalActor(commentLine)
            when "all"
                @_nOnNetCommand_SingleSelectorEventCommand("All", commentLine)
            when "!me"
                @_nOnNetCommand_SingleSelectorEventCommand("Me Except", commentLine)
            when "master"
                @_nOnNetCommand_SingleSelectorEventCommand("Master", commentLine)
            when "!master"
                @_nOnNetCommand_SingleSelectorEventCommand("Master Except", commentLine)
            when "forActors"
                @_nOnNetCommand_ActorListSelectorEventCommand(commentLine, true)
            when "!forActors"
                @_nOnNetCommand_ActorListSelectorEventCommand(commentLine, false)
            when "start"
                # * Это коммент опций запуска, просто пропускаем, чтобы ошибку не писать в консоль
                # * Обрабатывается он отдельно, так как если условие ложно, событие не должно
                # * Вообще запускаться, а эти команды обрабатываеются уже в запущенном событии
            else
                console.warn("Unknown NET Comment command " + command)
        return

    # * Установить флаг ожидания сервера
    ##_.nSetWaitServer = -> @_waitMode = "netServer"

    # * Ожидание ответа от сервера
    ###_.nUpdateWaitServerResponse = ->
        waiting = ANNetwork.isBusy()
        unless waiting
            @_waitMode = ''
        return waiting###

    # * Сделать следующую битву сетевой битвой (общей, расшаринной)
    _.nSetSharedBattle = (battleId) ->
        # * Если пустая строка, то Null
        battleId = null unless String.any(battleId)
        BattleManager.nSetNetworkBattle(battleId)
        return


    # * Сбросить все сетевые флаги \ настройки перед запуском очередного события
    _.nClearFlags = () ->
        $gameTemp._nLocalActorMode = false
        @_nRunningCheckTimer = 0
        @nClearCommandOptions()
        return

    # * Опции запуска события
    # -----------------------------------------------------------------------
    do ->
        _.isHaveNetworkStartOptions = -> @nStartOptions?

         # * Может ли данный игрок запустить это событие
        _.isPassStartOptions = () ->
            return true unless @isHaveNetworkStartOptions()
            if @nIsLockedEvent()
                return false if ANET.Utils.isEventStartedByAny(@eventId())
            return ANET.Utils.isPassEventFilterOptions(@nStartOptions)

        # * Закрытыми могут быть только события с собственным ID (т.е. события карты)
        # TODO: Общие события не могут быть закрытыми??? МОГУТ! но запускать по другому без проверки на Lock
        _.nIsLockedEvent = () -> @eventId() > 0 && @nStartOptions?.lockMode is "true"

        _.nIsSharedEvent = () -> @nStartOptions?.sharedMode isnt "NO"

        # * Есть ли опции (условия) запуска события для сети
        _.nCheckEventStartOptions = ->
            @nStartOptions = null # * сбрасываем
            try
                options = @_list?.find (line) ->
                    line.code == 357 && line.parameters?[1] == "EventStartOptions"
                if options?
                    @nStartOptions = options.parameters[3]
                else
                    # * Меньший приоритет, т.е. параметр плагина главнее
                    @nCheckEventStartOptionsFromCommentCommand()
            catch e
                ANET.w e
                @nStartOptions = null
            return

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------