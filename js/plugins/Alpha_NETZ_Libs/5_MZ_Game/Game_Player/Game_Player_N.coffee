#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    _.dataObserverHaveChanges = ->
        ANSyncDataManager.sendPlayerObserver()

    _.updateNetwork = ->
        return if $gameParty.isEmpty()
        # * Проверяем и обновляем DataObserver своего персонажа
        # * Тут этот ? (првоерка Null) нужна!
        $gameParty.leader()?.updateDataObserver()

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------