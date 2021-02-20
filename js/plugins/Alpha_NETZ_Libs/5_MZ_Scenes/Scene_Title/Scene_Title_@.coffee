#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Title.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Title::

    #@[ALIAS]
    ALIAS__start = _.start
    _.start = ->
        ALIAS__start.call(@)
        ANNetwork.stop() if ANNetwork.isConnected()

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        #TODO: Добавить потом параметр плагина, чтобы люди могли тестить быстро
        @nUpdateDebugStart() if ANET.isDEV()

    # * Добавляем команду сетевой игры в главное меню
    do ->
        
        #@[ALIAS]
        ALIAS__createCommandWindow = _.createCommandWindow
        _.createCommandWindow = ->
            ALIAS__createCommandWindow.call(@)
            @_commandWindow.setHandler("network", @commandNetwork.bind(@))

        #@[ALIAS]
        ALIAS__commandWindowRect = _.commandWindowRect
        _.commandWindowRect = ->
            # * little trick to not overwrite method
            @___isOneMoreCommand = true
            ALIAS__commandWindowRect.call(@)

        #@[ALIAS]
        ALIAS__calcWindowHeight = _.calcWindowHeight
        _.calcWindowHeight = (numLines, selectable) ->
            numLines += 1 if @___isOneMoreCommand is true
            ALIAS__calcWindowHeight.call(@, numLines, selectable)

        return
    
    return
# ■ END Scene_Title.coffee
#---------------------------------------------------------------------------