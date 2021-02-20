#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Map::

    # * Когда игрок покидает сцену карты, сбрасываем начальные положения других игроков
    _.resetInitialLocationsOfNetCharacters = ->
        for char in @netChars()
            char.nIsGetInitialLocation = false
        @refreshNetworkCharacters()

    _.netChars = -> @_networkCharacters.characters()

    _.networkCharacterById = (id) -> @_networkCharacters.characterById(id)

    # * Инициализация персонажей отображаемых на карте
    _.setupNetworkCharacters = ->
        @_networkCharacters.setup()
    
    _.updateNetwork = ->
        @_networkCharacters.update()

    _.refreshNetworkCharacters = ->
        @_networkCharacters.refresh()

    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------