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
        @_createNetworkCharacters() if ANNetwork.isConnected()


    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------