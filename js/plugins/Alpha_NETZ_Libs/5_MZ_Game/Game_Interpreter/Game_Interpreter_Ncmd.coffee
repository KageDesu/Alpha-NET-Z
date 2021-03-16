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
    
    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------