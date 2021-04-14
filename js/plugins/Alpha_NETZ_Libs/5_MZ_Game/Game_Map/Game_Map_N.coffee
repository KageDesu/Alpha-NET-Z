#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Map::

    # * Безопасное обновление карты, так как может вызываться когда пришли данные игроков (на любой сцене в любой момент)
    _.nSafeRefresh = ->
        try
            return if SceneManager.isSceneChanging()
            return unless KDCore.Utils.isSceneMap()
            return unless $dataMap?
            @refresh()
        catch e
            ANET.w e
        return

    _.netCharsIsSomeoneCollided = (x, y) -> @_networkCharacters.isSomeoneCollided(x, y)

    _.netChars = -> @_networkCharacters.characters()

    _.networkCharacterById = (id) -> @_networkCharacters.characterById(id)

    # * Инициализация персонажей отображаемых на карте
    _.setupNetworkCharacters = ->
        @_networkCharacters.setup()
    
    _.updateNetwork = ->
        @_networkCharacters.update()

    _.refreshNetworkCharacters = ->
        @_networkCharacters.refresh()

    # * Запуск общего события (которое пришло от сервера)
    _.nSetupNetworkSharedEvent = ->
        try
            event = @event($gameTemp.retrieveNetworkSharedEvent())
            return false unless event?
            $gameTemp._nSharedEventOuterStartFlag = true
            event.start()
            return true
        catch e
            ANET.w e
        return false

    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------