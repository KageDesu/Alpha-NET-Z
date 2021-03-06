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
        @refreshNetworkCharacters()
        return

    _.refreshNetworkCharacters = ->
        for char in @_networkCharacterSprites
            @_removeNetCharInfo(char)
            @_characterSprites.delete char
            @_tilemap.removeChild char
        @_networkCharacterSprites = []
        for char in $gameMap.netChars()
            spr = new Sprite_Character(char)
            @_characterSprites.push(spr)
            @_networkCharacterSprites.push(spr)
            @_tilemap.addChild spr
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
        return unless iconSpr?
        #TODO: Возможно после создания таблиц имён надо разлелить метод
        # так как сейчас удаляется любой спрайт из массива с соответсвием персонажа
        for spr in @_networkCharactersInfoSprites
            continue unless spr?
            if spr._character == iconSpr._character
                @_networkCharactersInfoLayer.removeChild spr
                @_networkCharactersInfoSprites.delete(spr)
        return

    # * Удаляет все связанные с персонажем спрайты информации (статус, имя)
    _._removeNetCharInfo = (char) ->
        return unless char?
        @_destroyNetStatusIconDuplicate(char.netStateIcon)

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------