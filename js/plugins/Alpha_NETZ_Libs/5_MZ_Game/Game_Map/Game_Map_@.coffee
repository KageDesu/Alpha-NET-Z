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
    _.update = ->
        ALIAS__update.call(@)
        if ANNetwork.isConnected()
            @updateNetwork()
    
    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------