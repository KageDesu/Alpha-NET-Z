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
        return
        
    #@[ALIAS]
    ALIAS__updateScene = _.updateScene
    _.updateScene = ->
        ALIAS__updateScene.call(@)
        if ANNetwork.isConnected()
            if SceneManager.isSceneChanging()
                ANGameManager.sendMapSceneChanging()

    #@[ALIAS]
    #ALIAS__update = _.update
    #_.update = ->
    #    ALIAS__update.call(@)

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------