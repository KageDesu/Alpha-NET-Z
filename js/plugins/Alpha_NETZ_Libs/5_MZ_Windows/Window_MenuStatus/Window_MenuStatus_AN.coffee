#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_MenuStatus.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_MenuStatus::

    #TODO: Тут остановился - стрелочки туда - сюда ещё надо отключить

    _.isCurrentItemEnabledInNetworkGame = ->
        if @isSymbolOnlyForMyNetActor()
            return @isCurrentActorIsMyNetActor()
        else
            return true

    # * Набор команд, которые доступны только для текущего игрока (персонажа)
    _.isSymbolOnlyForMyNetActor = ->
        try
            # * Плохой вариант получения команды, но работает
            symbol = SceneManager._scene._commandWindow.currentSymbol()
            # * Навыки и экипировка - только для моего персонажа
            isOnlyForMyActor = (symbol == 'skill' || symbol == 'equip')
            if ANNetwork.isMultiMode()
                #TODO: Возможность просматривать статус и в мультиплеере
                # * В режиме мультиплеера, также нельзя статус смотреть других игроков
                isOnlyForMyActor = isOnlyForMyActor || (symbol == 'status')
            return isOnlyForMyActor
        catch e
            AA.w e
            return false
    
    # * Выбранный (Index) персонаж принадлежит мне? (мой персонаж)
    _.isCurrentActorIsMyNetActor = ->
        try
            actor = $gameParty.members()[@index()]
            return actor.isMyNetworkActor()
        catch e
            AA.w e
            return false

    return
# ■ END Window_MenuStatus.coffee
#---------------------------------------------------------------------------