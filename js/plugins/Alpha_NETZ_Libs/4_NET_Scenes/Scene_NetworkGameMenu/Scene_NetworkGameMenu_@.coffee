#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

class Scene_NetworkGameMenu extends Scene_MenuBase
    constructor: () ->
        super()

    create: ->
        super()
        @_initNetwork()

    #?EVENT
    onLostConnection: ->
        "LOST CONNECTION".p()
        @popScene()

do ->

    #@[DEFINES]
    _ = Scene_NetworkGameMenu::


    _._initNetwork = ->
        unless ANNetwork.isConnected()
            #TODO: connection spinner
            ANNetwork.initSystem()
            ANNetwork.setConnection(@_onConnectionStatus.bind(@))
        else
            @_onConnectionStatus(1)

    # * 0 - error, 1 - connect
    _._onConnectionStatus = (statusCode) ->
        switch statusCode
            when 0
                @_onConnectionRefused()
            when 1
                @_onConnectionGood()
        return
    
    _._onConnectionRefused = -> @popScene()

    _._onConnectionGood = -> @_createNetworkMenu() #1


    
    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------