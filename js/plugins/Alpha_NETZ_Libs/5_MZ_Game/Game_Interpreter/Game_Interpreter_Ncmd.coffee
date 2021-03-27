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
    
    #input: "N (selector)" | "N (selector) [scope]" | "N (selector) [scope] [mode]"
    #selcetor: all, !me, master, !master
    #scope: world, mode: virtual
    _._nOnNetCommand_SingleSelectorEventCommand = (selector, commentLine) ->
        { scope, mode } = @_nConvertEventCommandArgs(commentLine)
        @_nSetAnyEventCommandOptions(selector, "[]", scope, mode)
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

    _._nOnNetCommand_ActorListSelectorEventCommand = (commentLine, isInclude) ->
        { scope, mode } = @_nConvertEventCommandArgs(commentLine)
        list = @_nExtractActorsListFromComment(commentLine)
        selector = "Actor List"
        selector += " Except" unless isInclude
        @_nSetAnyEventCommandOptions(selector, list, scope, mode)
        return

    _._nExtractActorsListFromComment = (commentLine) ->
        regex = /forActors\s+([\d,\s*]*)/gm
        resultList = regex.exec(commentLine)
        return "[]" unless resultList?
        return "[]" unless resultList[1]?
        list = "[" + resultList[1] + "]"
        return list

    # * Есть ли опции (условия) запуска события для сети (проверка команды - комментария)
    _.nCheckEventStartOptionsFromCommentCommand = ->
        return unless @_list?
        comment = KDCore.Utils.getEventCommentValue("N start", @_list)
        return unless comment?
        console.info(comment)
        @nStartOptions = @nParseEStartOptionsFromCommentLine(comment)
        console.info @nStartOptions
        return

    # * Формирование опций из комментария
    _.nParseEStartOptionsFromCommentLine = (commentLine) ->
        try
            # * Стандартный набор
            nStartOptions = {
                lockMode: "false"
                sharedMode: "No"
                whoSelector: "All"
                actorList: "[]"
            }
            if commentLine.contains("lock")
                nStartOptions.lockMode = "true"
            if commentLine.contains("shared")
                nStartOptions.sharedMode = "Strict"
                # * Только если есть флаг sharedMode
                if commentLine.contains("optional")
                    nStartOptions.sharedMode = "Optional"
            if commentLine.contains("master")
                if commentLine.contains("!")
                    nStartOptions.whoSelector = "Master Except"
                else
                    nStartOptions.whoSelector = "Master"
            else if commentLine.contains("forActors")
                    if commentLine.contains("!")
                        nStartOptions.whoSelector = "Actor List Except"
                    else
                        nStartOptions.whoSelector = "Actor List"
                    nStartOptions.actorList = @_nExtractActorsListFromComment(commentLine)
            return nStartOptions
        catch e
            ANET.w e
            return null

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------