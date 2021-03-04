#╒═════════════════════════════════════════════════════════════════════════╛
# ■ BattleManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = BattleManager

    # * На данный момент в сетевом режиме всегда Time Progress Battle
    #@[ALIAS]
    ALIAS__isTpb = _.isTpb
    _.isTpb = ->
        if ANNetwork.isConnected()
            return true
        else
            return ALIAS__isTpb.call(@)
        

    # * На данный момент в сетевом режиме всегда Active Time Battle
    # * (Эти два метода связаны)
    #@[ALIAS]
    ALIAS__isActiveTpb = _.isActiveTpb
    _.isActiveTpb = ->
        if ANNetwork.isConnected()
            return true
        else
            return ALIAS__isActiveTpb.call(@)
        
    
    return
# ■ END BattleManager.coffee
#---------------------------------------------------------------------------