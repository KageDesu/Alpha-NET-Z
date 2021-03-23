# * Глабольный набор вспомогательных функций для пользователя

nAPI = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #@[DEFINES]
    _ = nAPI

    _.isNetworkGame = ->
        try
            return ANNetwork.isConnected()
        catch e
            KDCore.warning e
        return false

    _.myPlayerIndex = ->
        try
            return ANGameManager.myIndex()
        catch e
            KDCore.warning e
        return 0

    _.myActorId = ->
        try
            return ANGameManager.myActorId()
        catch e
            KDCore.warning e
        return 0

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------