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
        { scope, mode } = ANET.Utils.convertEventCommandScopeAndMode(commentLine)
        @_nSetAnyEventCommandOptions(selector, "[]", scope, mode)
        return

    # * Установить опции команды события для следующей комманды
    _._nSetAnyEventCommandOptions = (selector, list, scope, mode) ->
        # * Стандартные значения из команды плагина
        scope = "Same map" unless String.any(scope)
        mode = "Auto" unless String.any(mode)
        options = ANET.Utils.buildEventCommandOptions(selector, list, scope, mode)
        @nSetCommandOptions(options)
        return

    _._nOnNetCommand_ActorListSelectorEventCommand = (commentLine, isInclude) ->
        { scope, mode } = ANET.Utils.convertEventCommandScopeAndMode(commentLine)
        list = ANET.Utils.extractActorsListFromComment(commentLine)
        selector = "Actor List"
        selector += " Except" unless isInclude
        @_nSetAnyEventCommandOptions(selector, list, scope, mode)
        return

    # * Есть ли опции (условия) запуска события для сети (проверка команды - комментария)
    _.nCheckEventStartOptionsFromCommentCommand = ->
        return unless @_list?
        commentLine = KDCore.Utils.getEventCommentValue("N start", @_list)
        return unless commentLine?
        @nStartOptions = ANET.Utils.parseEventStartOptionsFromCommentLine(commentLine)
        return

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------