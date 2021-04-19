#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    # * В MZ этот метод разделён на setup
    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        if ANNetwork.isConnected()
            @_data = [] # * Нет follower'ов

    #@[ALIAS]
    ALIAS__addActor = _.addActor
    _.addActor = (actorId) ->
        ALIAS__addActor.call(@, actorId)
        # * Обновить окно статуса битвы
        $gameTemp.requestBattleRefresh()
        # * Код из MZ, инициализация битвы для новенького
        if @inBattle()
            actor = $gameActors.actor(actorId)
            if @battleMembers().includes(actor)
                actor.onBattleStart()
        return

    # * Если игрок выйдет, чтобы обновился экран битвы тоже
    #@[ALIAS]
    ALIAS__removeActor = _.removeActor
    _.removeActor = ->
        ALIAS__removeActor.call(@, ...arguments)
        $gameTemp.requestBattleRefresh()
        return

    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------