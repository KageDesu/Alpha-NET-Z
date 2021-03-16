#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    # * Обработка комманд из комментариев (алтернатива командам плагинов)

    #@[DEFINES]
    _ = Game_Interpreter::

    #input: "N localActor" | "N localActor end"
    _._nOnNetCommand_LocalActor = (commentLine) ->
        if commentLine.contains("end")
            $gameTemp._nLocalActorMode = false
        else
            $gameTemp._nLocalActorMode = true
        return
    
    #input: "N all" | "N all [scope]" | "N all [scope] [mode]"
    #scope: world, mode: virtual
    _._nOnNetCommand_AllEventCommand = (commentLine) ->
        { scope, mode } = @_nConvertEventCommandArgs(commentLine)
        @_nSetAnyEventCommandOptions("All", "[]", scope, mode)
        return

    #TODO: ТУТ ОСТАНОВИЛСЯ, СОВМЕСТИТЬ КОМАНДЫ СЛЕКТОРЫ (без списка) В МЕТОД ОДИН
    #(или можен не надо)

    #input: "N (selector)" | "N (selector) [scope]" | "N (selector) [scope] [mode]"
    #scope: world, mode: virtual
    _._nOnNetCommand_SingleSelectorEventCommand = (commentLine) ->
        { scope, mode } = @_nConvertEventCommandArgs(commentLine)
        @_nSetAnyEventCommandOptions("All", "[]", scope, mode)
        return

    _._nConvertEventCommandArgs = (commentLine) ->
        # * SCOPE
        if commentLine.contains "world"
            scope = "All world"
        else
            scope = "Same map"
        # * MODE
        if commentLine.contains "virtual"
            mode = "Virtual"
        else if commentLine.contains "common"
            mode = "Common Event"
        else
            mode = "Auto"
        return { scope, mode }

    # * Установить опции команды события для следующей комманды
    _._nSetAnyEventCommandOptions = (selector, list, scope, mode) ->
        # * Стандартные значения из команды плагина
        scope = "Same map" unless String.any(scope)
        mode = "Auto" unless String.any(mode)
        options = @_nBuildEventCommandOptions(selector, list, scope, mode)
        console.info options
        @nSetCommandOptions(options)
        return

    # * Собрать опции для команды события по параметрам из комменатрия (аналог опций из команды плагина)
    # * Список должен быть строкой! [1, 2, 3]
    _._nBuildEventCommandOptions = (selector, list, scope, mode) -> {
            "actorList": list,
            "executeMode": mode,
            "scope": scope,
            "whoSelector": selector
        }

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------