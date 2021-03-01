#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_MenuStatus.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_MenuStatus::

    # * Команды Skill, Statis, Equip
    # -----------------------------------------------------------------------
    do ->
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
                if ANET.PP.isOtherPlayersMenuStatusAllowed() == false
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

    # * Cписок игроков
    # -----------------------------------------------------------------------
    do ->
        
        # * Будет видно только моего персонажа
        _.setOnlyMyPlayerInMenuMode = ->
            @maxItems = -> 1
            @actor = (index) -> $gameParty.leader()
            @selectLast = -> @smoothSelect(0)

        
    # -----------------------------------------------------------------------
    

    return
# ■ END Window_MenuStatus.coffee
#---------------------------------------------------------------------------