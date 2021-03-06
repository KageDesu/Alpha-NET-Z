#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

class Scene_NetworkGameMenu extends Scene_MenuBase
    constructor: () ->
        super()
        return

    create: ->
        super()
        # * Например если вернулись "назад" на эту сцену, то не надо снова соединяться
        unless ANNetwork.isConnected()
            @_initNetwork()
        else
            @_initSceneComponents()
            @refreshWelcomeText()
        return

    update: ->
        super()
        @_updateBackButton()
        @_updateRandomJoin() #2
        @_playerCountRefreshThread?.update()
        return

    stop: ->
        HUIManager.removeInput()
        HUIManager.hideLoader()
        super()

    refreshWelcomeText: ->
        try
            @_welcomeLine?.drawTextFull("Welcome, " + ANGameManager.myPlayerData().name)
        catch e
            ANET.w e

    refreshPlayersCountText: (count = 0) ->
        try
            return unless @_playerCountText?
            @_playerCountText.clear()
            @_playerCountText.drawTextFull("Players on server: " + count)
        catch e
            ANET.w e

    #?EVENT
    netOn_lobby_changePlayerName: ->
        @refreshWelcomeText()
        @_playerCountRefreshThread?.call()
        return

    #?EVENT
    # * Когда игрок выходит или входит в комнату
    # * Этот метод тут, чтобы перекрыть Scene_MenuBase реализацию
    # * Так как пока нет необходимости $gameParty менять
    netOn_lobby_refreshRoomData: -> # * NOTHING

do ->

    #@[DEFINES]
    _ = Scene_NetworkGameMenu::

    _._initNetwork = ->
        HUIManager.showLoader()
        ANNetwork.initSystem()
        ANNetwork.setConnection(@_onConnectionStatus.bind(@))
        return

    #?EVENT
    # * 0 - error, 1 - connect
    _._onConnectionStatus = (statusCode) ->
        switch statusCode
            when 0
                @_onConnectionRefused()
            when 1
                @_onConnectionGood()
        return
    
    _._onConnectionRefused = ->
        HUIManager.hideLoader()
        HUIManager.notifyError("Server not response in time")
        @popScene()

    _._onConnectionGood = ->
        #TODO: Server version check
        HUIManager.hideLoader()
        unless ANGameManager.isInited()
            ANGameManager.init()
        HUIManager.notifySucess("Connected to server")
        @_initSceneComponents()

    # * Отрисовка меню, если соединение  было установлено
    _._initSceneComponents =  ->
        @_createNetworkMenu() #1
        @_createWelcomeText() #1
        HUIManager.showInput("Room Name...")
        @_createServerPlayerCountText()
        @_createPlayerCountRefreshThread()
        return

    _._updateBackButton = ->
        return if KDCore.isMV()
        # * Тут может быть вылет, если нет проверки null (?)
        @_cancelButton?.visible = !HUIManager.isLoaderActive()

    
    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------