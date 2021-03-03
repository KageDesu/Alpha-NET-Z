#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ANET Common Utils Methods.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

# * Набор вспомогательных функций для ANET

AA.Utils.ANET = {}

#?shortcut
ANET.Utils = AA.Utils.ANET

do ->

    #@[DEFINES]
    _ = AA.Utils.ANET

    _.isMyActorInValidListToStart = (list, isInclude) ->
        try
            list = JsonEx.parse(list).map (i) -> parseInt(i)
            return list.contains(ANGameManager.myActorId()) == isInclude
        catch e
            ANET.w e
            return false
    
    _.isPassEventFilterOptions = (options) ->
        try
            switch options.whoSelector
                when "All"
                    return true
                when "Master"
                    return ANNetwork.isMasterClient()
                when "Master Except"
                    return !ANNetwork.isMasterClient()
                when "Actor List"
                    return ANET.Utils.isMyActorInValidListToStart(options.actorList, true)
                when "Actor List Except"
                    return ANET.Utils.isMyActorInValidListToStart(options.actorList, false)
                when "Me Except"
                    # * Если команда пришла с сервера, то явно эта проверка не касается этого клиента
                    # * В опциях запуска события - не используется
                    return true
                else
                    return false
        catch e
            ANET.w e
            return false

    return
# ■ END ANET Common Utils Methods.coffee
#---------------------------------------------------------------------------