#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actors.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actors::

    #TODO: Есть проблемы у этого способа! Надо больше тестов
    #TODO: Добавить дополнительные проверки, так как слишком опасно
    #@[ALIAS]
    ALIAS__actor = _.actor
    _.actor = (actorId) ->
        # * Возвращять текущего персонажа для выборки в событии
        # * Выборка LOCAL ACTOR работает только если указан Actor с ID = 1 (ОТМЕНА!)
        #TODO: Может это и не надо, но сделал для меньших проблем, так как метод опасно переопределять
        #TODO: Временно убрал выборку только 1 актора
        if ANNetwork.isConnected() && $gameTemp._nLocalActorMode is true #&& actorId == 1
            if $gameTemp._nNetworkActorPickRequest is true
                $gameTemp._nNetworkActorPickRequest = false
                return ALIAS__actor.call(@, actorId)
            else
                return @_data[ANGameManager.myActorId()]
        else
            return ALIAS__actor.call(@, actorId)
    
    return
# ■ END Game_Actors.coffee
#---------------------------------------------------------------------------