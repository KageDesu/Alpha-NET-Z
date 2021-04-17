#╒═════════════════════════════════════════════════════════════════════════╛
# ■ SceneManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = SceneManager

    #? ONLY FOR MV
    _.isSceneReadyForNetwork = -> true

    # * Сцена занята для событий из сети (scene events) (общий метод для MV и MZ)
    _.isBusyForNetworkData = ->
        SceneManager.isSceneChanging() || !SceneManager.isSceneReadyForNetwork()

    return
# ■ END SceneManager.coffee
#---------------------------------------------------------------------------