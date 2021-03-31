#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Followers.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Followers::

    #@[ALIAS]
    ALIAS__setup = _.setup
    _.setup = ->
        if ANNetwork.isConnected()
            @_data = []
            # * Нет последователей! Используется другой класс
        else
            ALIAS__setup.call(@)
    
    # * Учёт коллизий с сетевыми игроками при движении событий
    # * В этом методе, а не в NETCharactersGroup, чтобы было больше совместимости
    #@[ALIAS]
    ALIAS__isSomeoneCollided = _.isSomeoneCollided
    _.isSomeoneCollided = (x, y) ->
        if ANNetwork.isConnected()
            $gameMap.netCharsIsSomeoneCollided(x, y)
        else
            return ALIAS__isSomeoneCollided.call(@, x, y)
        

    return
# ■ END Game_Followers.coffee
#---------------------------------------------------------------------------