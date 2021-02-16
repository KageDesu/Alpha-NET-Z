#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Map::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        @_networkCharacters = new NETCharactersGroup()
        return

    #@[ALIAS]
    ALIAS__setup = _.setup
    _.setup = (mapId) ->
        ALIAS__setup.call(@, mapId)
        if ANNetwork.isConnected()
            @setupNetworkCharacters()
        return

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = (sceneActive) ->
        ALIAS__update.call(@, sceneActive)
        if ANNetwork.isConnected()
            @updateNetwork()
    
    #@[ALIAS]
    ALIAS__refresh = _.refresh
    _.refresh = ->
        ALIAS__refresh.call(@)
        if ANNetwork.isConnected()
            @refreshNetworkCharacters()

    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------