#╒═════════════════════════════════════════════════════════════════════════╛
# ■ SceneManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = SceneManager

    #@[ALIAS]
    ALIAS__goto = _.goto
    _.goto = (sceneClass) ->
        if $gameTemp? && sceneClass?
            $gameTemp.__sceneChanging = true
            setTimeout (->
                $gameTemp?.__sceneChanging = false
                ), 100
        ALIAS__goto.call(@, sceneClass)
        
    # * В MV плохо работает проверка isSceneChanging, поэтому сделал дополнительную проверку
    _.isSceneReadyForNetwork = ->
        return true unless ANNetwork.isConnected()
        return true unless $gameTemp.__sceneChanging?
        return !$gameTemp.__sceneChanging
    
    return
# ■ END SceneManager.coffee
#---------------------------------------------------------------------------