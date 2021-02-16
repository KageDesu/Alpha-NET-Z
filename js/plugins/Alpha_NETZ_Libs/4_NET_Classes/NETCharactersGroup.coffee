# * Данный класс содержит NETCharacter всех игроков на карте (аналог Game_Followers)
#?[STORABLE]
#@[GLOBAL]
class NETCharactersGroup
    constructor: () ->
        @_data = []

    setup: () ->
        "SETUP NETWORK CHARS".p()
        @_data = []
        @_refreshCharacters()
        return

    # * Вызывается из Game_Map.refresh
    refresh: ->
        @_refreshCharacters()
        char.refresh() for char in @_data
        return

    characters: -> @_data

    characterById: (id) -> @characters().find (c) -> c.id == id

    update: -> c.update() for c in @characters()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NETCharactersGroup.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = NETCharactersGroup::
    
    # * Данный метод удаляет (отключённых) и создаёт (подклюённых) персонажей
    _._refreshCharacters = ->
        @_removeNotExistsCharacters()
        @_addNewCharacters()
        @_refreshNetworkCharactersSprites()
        x = ANGameManager.anotherPlayers()
        for pl in x
            char = @characterById(pl.id)
            @_data.push(new NETCharacter(pl.id)) unless char?
        return

    # * Удаляем (отключился или ушёл на другую карту)
    #TODO: Надо проверять!
    _._removeNotExistsCharacters = ->
        x = ANGameManager.anotherPlayersOnMap()
        for char in @characters()
            unless x.find (c) -> c.id == char.id
                @_data.delete(char)
        return

    # * Добавляем новых персонажей
    #TODO: Надо проверять!
    _._addNewCharacters = ->
        x = ANGameManager.anotherPlayersOnMap()
        for pl in x
            char = @characterById(pl.id)
            @_data.push(new NETCharacter(pl.id)) unless char?
        return

    # * Пересоздать спрайты персонажей
    _._refreshNetworkCharactersSprites = ->
        return unless KDCore.Utils.isSceneMap()
        SceneManager._scene._spriteset?.refreshNetworkCharacters()
        return
    
    return
# ■ END NETCharactersGroup.coffee
#---------------------------------------------------------------------------