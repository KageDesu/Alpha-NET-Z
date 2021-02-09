#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

class Scene_NetworkGameMenu extends Scene_MenuBase
    constructor: () ->
        super()

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

    stop: ->
        HUIManager.removeInput()
        HUIManager.hideLoader()
        super()

    refreshWelcomeText: ->
        @_welcomeLine?.drawTextFull("Welcome, " + ANGameManager.myPlayerData().name)

    #?EVENT
    netOn_lobby_changePlayerName: ->
        @refreshWelcomeText()

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
        HUIManager.hideLoader()
        switch statusCode
            when 0
                @_onConnectionRefused()
            when 1
                @_onConnectionGood()
        return
    
    _._onConnectionRefused = ->
        HUIManager.notifyError("Server not response in time")
        @popScene()

    _._onConnectionGood = ->
        unless ANGameManager.isInited()
            ANGameManager.init()
        HUIManager.notifySucess("Connected to server")
        @_initSceneComponents()

    # * Отрисовка меню, если соединение  было установлено
    _._initSceneComponents =  ->
        @_createNetworkMenu() #1
        @_createWelcomeText() #1
        HUIManager.showInput("Room Name...")
        return

    _._updateBackButton = ->
        @_cancelButton.visible = !HUIManager.isLoaderActive()

    
    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------