#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    #@[ALIAS]
    ALIAS__createCharacters = _.createCharacters
    _.createCharacters = ->
        ALIAS__createCharacters.call(@)
        if ANNetwork.isConnected()
            @_createNetworkCharacters()
            @_createNetworkCharactersInfo()
        return

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------