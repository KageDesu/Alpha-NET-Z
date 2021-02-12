# * Данный класс содержит NETCharacter всех игроков на карте (аналог Game_Followers)
#?[STORABLE]
#@[GLOBAL]
class NETCharactersGroup
    constructor: () ->
        @_data = []

    setup: () ->
        #TODO: Тут баг и краш игры! (actorId = 0)
        "SETUP NETWORK CHARS".p()
        @_data = []
        x = ANGameManager.anotherPlayers()
        console.info ANGameManager.playersData
        for pl in x
            @_data.push(new NETCharacter(pl.id))
        return

    #TODO: Не обновляется ни от куда, (можно из Game_Player.refresh)
    refresh: ->
        char.refresh() for char in @_data

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
    

    
    return
# ■ END NETCharactersGroup.coffee
#---------------------------------------------------------------------------