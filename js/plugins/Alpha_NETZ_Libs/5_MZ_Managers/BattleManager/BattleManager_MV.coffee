#╒═════════════════════════════════════════════════════════════════════════╛
# ■ BattleManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = BattleManager

    # * Заместо selectNextActor (нету в MV такой команды)
    #@[ALIAS]
    ALIAS__changeActor = _.changeActor
    _.changeActor = () ->
        if ANNetwork.isConnected() && !ANGameManager.isBattleMaster()
            @nSelectNextActorOnClient()
            $gameTemp._isBattleSceneShouldBeRefreshed = true
        else
            ALIAS__changeActor.call(@, ...arguments)
        return

    _.myNetworkActorIndex = -> $gameParty.members().indexOf($gameParty.leader())
    
    # * В MV логика боя отличается от MZ, не происходит многих автоматических обновлений
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        if @__oldPhase != @_phase
            @__oldPhase = @_phase
            $gameTemp._isBattleSceneShouldBeRefreshed = true
            $gameTemp.requestBattleRefresh()
        ALIAS__update.call(@)
        return

    return
# ■ END BattleManager.coffee
#---------------------------------------------------------------------------