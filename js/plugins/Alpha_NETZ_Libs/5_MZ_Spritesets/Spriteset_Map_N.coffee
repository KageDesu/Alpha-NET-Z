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
        @refreshNetworkCharacters()
        return

    _.refreshNetworkCharacters = ->
        return unless @_networkCharactersLayer?
        for char in @_networkCharacterSprites
            @_networkCharactersLayer.removeChild char
            @_characterSprites.delete char
        @_networkCharacterSprites = []
        for char in $gameMap.netChars()
            spr = new Sprite_Character(char)
            @_characterSprites.push(spr)
            @_networkCharacterSprites.push(spr)
            @_networkCharactersLayer.addChild spr
        return
    
    # * Специальный слой для иконок статусов и имён сетевых персонажей
    _._createNetworkCharactersInfo = ->
        @_networkCharactersInfoSprites = []
        @_networkCharactersInfoLayer = new Sprite()
        @_networkCharactersInfoLayer.z = 9
        @_tilemap.addChild @_networkCharactersInfoLayer
        return

    # * Добавить иконку статуса для персонажа
    _.addNetworkStatusIconForCharacter = (iconSpr) ->
        @_destroyNetStatusIconDuplicate(iconSpr)
        @_networkCharactersInfoSprites.push(iconSpr)
        @_networkCharactersInfoLayer.addChild iconSpr
        return
        
    # * Надо найти и удалить, если икона уже существует для персонажа
    # * при refreshNetworkCharacters, их иконки не удаляются с ними
    # * так как находятся на другом слое
    _._destroyNetStatusIconDuplicate = (iconSpr) ->
        #TODO: Возможно после создания таблиц имён надо разлелить метод
        # так как сейчас удаляется любой спрайт из массива с соответсвием персонажа
        for spr in @_networkCharactersInfoSprites
            if spr._character == iconSpr._character
                @_networkCharactersInfoLayer.removeChild spr
                @_networkCharactersInfoSprites.delete(spr)
        return

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------