#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    #@[ALIAS]
    ALIAS__onMapLoaded = _.onMapLoaded
    _.onMapLoaded = ->
        ALIAS__onMapLoaded.call(@)
        if ANNetwork.isConnected()
            ANGameManager.onMapLoaded()
            $gameParty.nRefreshNetworkActors()
        return
        
    # * В сетевом режиме автосхранения отключены
    #@[ALIAS]
    ALIAS__shouldAutosave = _.shouldAutosave
    _.shouldAutosave = ->
        if ANNetwork.isConnected()
            return false
        else
            return ALIAS__shouldAutosave.call(@)

    #@[ALIAS]
    # * Создаём интерфейс
    ALIAS__createSpriteset = _.createSpriteset
    _.createSpriteset = ->
        ALIAS__createSpriteset.call(@)
        return unless ANNetwork.isConnected()
        @_netUI = new ANET.Spriteset_UI()
        @addChild @_netUI
        return

    # * Запрет движения при нажатии на UI элементы
    #@[ALIAS]
    ALIAS__onMapTouch = _.onMapTouch
    _.onMapTouch = ->
        if ANNetwork.isConnected()
            return if ANET.UI.isUITouched()
        ALIAS__onMapTouch.call(@)
        return

    # * Закрываем интерфейс
    #@[ALIAS]
    ALIAS__stop = _.stop
    _.stop = ->
        ALIAS__stop.call(@)
        ANET.UI.terminate()
        return

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------