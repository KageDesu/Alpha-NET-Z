#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    _.setupNetworkGame = ->

    # * В бою участвует только один персонаж?
    _.isOneBattler = -> @battleMembers().length <= 1

    #TODO: как задать после выбора персонажа, чтобы каждый раз не вычислять
    _.networkLeader = ->
        actorId = ANGameManager.myPlayerData().actorId
        return $gameActors.actor(actorId)

    #TODO: Есть метод onRefreshGameParty (в ANGameManager) -> путаница может быть
    # * Этот метод вызывается когда группа была изменена (кто-то отключился)
    _.nRefreshNetworkActors = ->
        try
            for actor in @members()
                id = actor.actorId()
                # * Ищем игрока для каждого Actor
                playerForActor = ANGameManager.playersData.find (pl) -> pl.actorId == id
                # * Если нету больше игрока с таким Actor, удаляем из партии
                unless playerForActor?
                    @removeActor(id)
                    ANGameManager.anotherPlayerLeaveGame(id)
            return
        catch e
            ANET.w e
    #TODO: Возможно это и на сцену битвы надо? (или там по другому работает)

    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------