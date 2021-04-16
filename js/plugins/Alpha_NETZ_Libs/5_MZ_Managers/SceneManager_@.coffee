#╒═════════════════════════════════════════════════════════════════════════╛
# ■ SceneManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = SceneManager

    #@[ALIAS]
    ALIAS__changeScene = _.changeScene
    _.changeScene = ->
        if ANNetwork.isConnected() && @isSceneChanging()
            HUIManager?.onGameSceneChanged()
        ALIAS__changeScene.call(@)
        return

    return
# ■ END SceneManager.coffee
#---------------------------------------------------------------------------