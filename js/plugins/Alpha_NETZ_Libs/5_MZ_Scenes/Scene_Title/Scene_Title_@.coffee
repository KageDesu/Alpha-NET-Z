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
        "Precc C for fast connect".p() if ANET.isDEV()

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
            @___isOneMoreCommand = !Imported.VisuMZ_0_CoreEngine
            ALIAS__commandWindowRect.call(@)

        #@[ALIAS]
        ALIAS__calcWindowHeight = _.calcWindowHeight
        _.calcWindowHeight = (numLines, selectable) ->
            if @___isOneMoreCommand is true
                numLines += 1
                # * Если одиночная игра не доступна, то нет одной позиции в меню (Новая ира)
                numLines -= 1 unless ANET.PP.isSinglePlayerAllowed()
            ALIAS__calcWindowHeight.call(@, numLines, selectable)

        return
    
    return
# ■ END Scene_Title.coffee
#---------------------------------------------------------------------------