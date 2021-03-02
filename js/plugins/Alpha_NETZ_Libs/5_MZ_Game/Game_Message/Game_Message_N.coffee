#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Message.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Message::

    _.nSetEndCallback = (@_nEndCallbackMethod) ->
    
    _.nEndCallback = ->
        if @_nEndCallbackMethod?
            do @_nEndCallbackMethod
            @_nEndCallbackMethod = null
        return

    return
# ■ END Game_Message.coffee
#---------------------------------------------------------------------------