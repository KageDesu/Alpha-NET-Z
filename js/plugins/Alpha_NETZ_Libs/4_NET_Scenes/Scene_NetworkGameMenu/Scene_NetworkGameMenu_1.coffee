#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

do ->

    #@[DEFINES]
    _ = Scene_NetworkGameMenu::

    _._createWelcomeText = ->
        #TODO: From UI Text Component with user settings
        @_welcomeLine = KDCore.Sprite.FromBitmap(400, 60)
        @_welcomeLine.bitmap.fontSize = 38
        @_welcomeLine.x = Graphics.width / 2 - @_welcomeLine.bitmap.width / 2
        @_welcomeLine.y = 80
        @addChild @_welcomeLine

    _._createNetworkMenu = ->
        ww = 400
        wh = @calcWindowHeight(4, true)
        wx = (Graphics.boxWidth - ww) / 2
        wy = (Graphics.boxHeight - wh) / 2
        rect = new Rectangle(wx, wy, ww, wh)
        @_commandsWindow = new Window_NetworkGameMenu(rect)
        @_commandsWindow.setHandler 'cancel', @popScene.bind(@)
        @_commandsWindow.setHandler 'createRoom', @commandCreateRoomMenu.bind(@)
        @_commandsWindow.setHandler 'joinRoom', @commandJoinRoomMenu.bind(@)
        @_commandsWindow.setHandler 'joinRandRoom', @commandJoinRandRoomMenu.bind(@) #2
        @_commandsWindow.setHandler 'settings', @commandSettings.bind(@)
        @addWindow @_commandsWindow

    _._createServerPlayerCountText = ->
        @_playerCountText = KDCore.Sprite.FromBitmap(280, 40)
        @_playerCountText.bitmap.fontSize = 18
        @_playerCountText.x = Graphics.width / 2 - @_playerCountText.bitmap.width / 2
        @_playerCountText.y = @_commandsWindow.y + @_commandsWindow.height + 20
        @addChild @_playerCountText

    _._createPlayerCountRefreshThread = ->
        refreshMethod = ->
            #return if SceneManager.isSceneChanging()
            ANNetwork.callback(NMS.Lobby("playersCountOnServ"),
                    (count) =>
                        try
                            return if SceneManager.isSceneChanging()
                            @refreshPlayersCountText(count)
                        catch e
                            ANET.w(e)
                    )
        @_playerCountRefreshThread = new KDCore.TimedUpdate(300, refreshMethod.bind(@))
        @_playerCountRefreshThread.call()
        return

    _.commandCreateRoomMenu = ->
        # * Сохраняем название команты
        $gameTemp._nLastRoomName = HUIManager.getInputValue()
        $gameTemp._nIsForwardTransitionToRoomTypeMenu = true
        SceneManager.push(Scene_NetworkRoomTypeSelect)
        return

    _.commandJoinRoomMenu = () ->
        SceneManager.push(Scene_NetworkRoomsList)

    _.commandSettings = ->
        SceneManager.push(Scene_NetworkSettings)

    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------