#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Interpreter::

    # * Статус запуска события
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS]
        ALIAS__initialize = _.initialize
        _.initialize = (depth) ->
            ALIAS__initialize.call(@, depth)
            @_nRunningCheckTimer = 0
            # * Отключаем некоторые команды
            if ANNetwork.isConnected()
                @nDisableNotNetCommands()
            return

        #@[ALIAS]
        ALIAS__setup = _.setup
        _.setup = (list, eventId) ->
            ALIAS__setup.call(@, list, eventId)
            if ANNetwork.isConnected()
                # * Сброс сетевой битвы, если началось другое событие
                BattleManager.nSetNetworkBattle(null)
                $gameTemp._nLocalActorMode = false
                ANInterpreterManager.sendEventStarted(eventId)
                @_nRunningCheckTimer = 0
                @nClearCommandOptions()
            return
        
        #@[ALIAS]
        ALIAS__clear = _.clear
        _.clear = ->
            ALIAS__clear.call(@)
            if ANNetwork.isConnected()
                $gameTemp._nLocalActorMode = false
                ANInterpreterManager.eventProcessExit()
                @_nRunningCheckTimer = 0
                @nClearCommandOptions()
            return

        #@[ALIAS]
        ALIAS__update = _.update
        _.update = ->
            ALIAS__update.call(@)
            if ANNetwork.isConnected()
                @_nRunningCheckTimer++
                if @_nRunningCheckTimer >= 60
                    ANInterpreterManager.checkEventRunning()
                    @_nRunningCheckTimer = 0
            return

        #@[ALIAS]
        ###ALIAS__updateWaitMode = _.updateWaitMode
        _.updateWaitMode = ->
            if @_waitMode == 'netServer'
                return @nUpdateWaitServerResponse()
            else
                return ALIAS__updateWaitMode.call(@)###

    # * Выполнение команд в сети
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS, STORED]
        _.ALIAS__executeCommand = _.executeCommand
        _.executeCommand = ->
            if ANNetwork.isConnected()
                if @nIsOptionsForCurrentCommand()
                    return @nProcessCommandWithOptions()
            return _.ALIAS__executeCommand.call(@)

        #TODO: MV
        #@[ALIAS]
        ALIAS__command108 = _.command108
        _.command108 = (params) ->
            if ANNetwork.isConnected()
                # * Проверить комментарий на наличие NET команд
                @_nCheckNetComment(params[0])
            return ALIAS__command108.call(@, params)

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------