#╒═════════════════════════════════════════════════════════════════════════╛
# ■ BattleManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = BattleManager

    #@[ALIAS]
    ALIAS__setup = _.setup
    _.setup = () ->
        ALIAS__setup.call(@, ...arguments)
        if ANNetwork.isConnected()
            # * Только если данные боя не установлены, но проверка сетевой битвы
            @nSetupNetworkBattle() unless ANBattleManager.isBattleRegistred()
        return

    #@[ALIAS]
    ALIAS__endBattle = _.endBattle
    _.endBattle = (result) ->
        ALIAS__endBattle.call(@, result)
        # * Убрать флаг сетевой битвы
        @nSetNetworkBattle(null) if ANNetwork.isConnected()
        return

    #@[ALIAS]
    ALIAS__selectNextActor = _.selectNextActor
    _.selectNextActor = ->
        if ANNetwork.isConnected() && !ANGameManager.isBattleMaster()
            @nSelectNextActorOnClient()
        else
            ALIAS__selectNextActor.call(@)
        return

    #@[ALIAS]
    ALIAS__selectPreviousActor = _.selectPreviousActor
    _.selectPreviousActor = ->
        if ANNetwork.isConnected() && !ANGameManager.isBattleMaster()
            @nSelectPreviousActorOnClient()
        else
            ALIAS__selectPreviousActor.call(@)
        return

    #@[ALIAS]
    # * В сетевом режиме Update вызывается только на мастере боя!
    ALIAS__update = _.update
    _.update = (activeTime) ->
        ALIAS__update.call(@, activeTime)
        return unless ANNetwork.isConnected()
        @nUpdateNetwork()
        return


    #TEMP
    #TODO: Временно отключено начальное сообщение в бою
    #@[ALIAS]
    ALIAS__displayStartMessages = _.displayStartMessages
    _.displayStartMessages = ->
        if ANNetwork.isConnected()
            # * EMPTY
        else
            ALIAS__displayStartMessages.call(@)
        
    #TEMP
    #TODO: Если шанс побега не сработал, будет баг
    # * Временно шанс побега 100%
    #@[ALIAS]
    ALIAS__processEscape = _.processEscape
    _.processEscape = ->
        if ANNetwork.isConnected()
            @_escapeRatio = 101
        return ALIAS__processEscape.call(@)

    return
# ■ END BattleManager.coffee
#---------------------------------------------------------------------------