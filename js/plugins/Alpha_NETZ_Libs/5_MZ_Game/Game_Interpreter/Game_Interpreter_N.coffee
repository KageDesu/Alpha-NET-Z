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
        return unless ANET.Utils.isNetCommentCommand(commentLine)
        if commentLine.contains("LOCAL_ACTOR")
            "LOCAL ACTOR".p()
            if commentLine.contains("END")
                "END".p()
                $gameTemp._nLocalActorMode = false
            else
                $gameTemp._nLocalActorMode = true
        return

    # * Ждём ответ от сервера о начале битвы
    _.nSetWaitBattleDataResponse = ->
        @nSetWaitServer()
        @_netWaitFlag = "battle"
        return

    # * Установить флаг ожидания сервера
    _.nSetWaitServer = -> @_waitMode = "netServer"

    # * Ожидание ответа от сервера
    _.nUpdateWaitServerResponse = ->
        waiting = ANNetwork.isBusy()
        unless waiting
            @_waitMode = ''
            # * Если ждали битву, то вернутся на одну команду назад
            if @_netWaitFlag == "battle"
                if ANBattleManager.isBattleRegistred()
                    @_index--
                    @_netWaitFlag = ""
        return waiting

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------