#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Load.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Load::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        if ANNetwork.isConnected() and $gameTemp._nRequestLoadNetworkGame is true
            @nLoadNetworkGameFromSavefile()
        return

    #@[ALIAS]
    ALIAS__onLoadFailure = _.onLoadFailure
    _.onLoadFailure = ->
        # * Своя обработка ошибки загрузки в сетевом режиме
        if ANNetwork.isConnected() and $gameTemp._nRequestLoadNetworkGame is true
            @nOnLoadFailure()
        else
            ALIAS__onLoadFailure.call(@)
        return

    #@[ALIAS]
    ALIAS__terminate = _.terminate
    _.terminate = ->
        ALIAS__terminate.call(@)
        # * Сбросим флаг
        $gameTemp._nRequestLoadNetworkGame = false
        return

    return
# ■ END Scene_Load.coffee
#---------------------------------------------------------------------------