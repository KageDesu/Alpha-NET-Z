#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    _._createNetworkCharacters = ->
        # * Отдельный массив для удобства
        @_networkCharacterSprites = []
        # * Чтобы можно было удалять и добавлять, не меняя высоты слоя
        # так как на tilemap есть спрайты которые должны быть выше персонажей
        @_networkCharactersLayer = new Sprite()
        @_networkCharactersLayer.z = 3
        @_tilemap.addChild @_networkCharactersLayer
        @_refreshNetworkCharacters()
        return

    _._refreshNetworkCharacters = ->
        for char in @_networkCharacterSprites
            @_networkCharactersLayer.removeChild char
            @_characterSprites.delete char
        @_networkCharacterSprites = []
        for char in $gameMap.netChars()
            spr = new Sprite_Character(char)
            @_characterSprites.push(spr)
            @_networkCharacterSprites.push(spr)
            @_networkCharactersLayer.addChild spr
            #@_tilemap.addChild spr
        return
    
    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------