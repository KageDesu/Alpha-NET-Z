#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Action.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Action::

    # * Задать действие из сети (т.е. из действия другого игрока)
    _.setFromNetwork = (action) ->
        @clear()
        @_nParseActionItem(action._item)
        for f of action
            # * пропускаем Game_Item, он уже сконвертирован
            continue if f is "_item"
            @[f] = action[f]
        return


    # * Класс Game_Item отдельно
    _._nParseActionItem = (item) ->
        return unless item?
        for f of item
            @_item[f] = item[f]
        return
    
    return
# ■ END Game_Action.coffee
#---------------------------------------------------------------------------