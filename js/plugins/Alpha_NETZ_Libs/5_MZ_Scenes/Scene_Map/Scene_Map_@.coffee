#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#TODO: Может просто не подключать эти методы? Если не сетевой режим
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
    #ALIAS__update = _.update
    #_.update = ->
    #    ALIAS__update.call(@)

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------