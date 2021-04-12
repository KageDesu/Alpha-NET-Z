#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Battle::

    # * Началась битва
    # * Проверим и спрячем "dead" врагов (если мы присоединились)
    _.nRefreshNetBattle = ->
        try
            # * Если мы мастер, то не надо, значит мы НЕ присоединились
            return if ANBattleManager.isBattleMaster()
            for s in @_enemySprites
                continue unless s?
                s.hide() unless s._enemy?.isAlive()
        catch e
            ANET.w e
        return

    return
# ■ END Spriteset_Battle.coffee
#---------------------------------------------------------------------------