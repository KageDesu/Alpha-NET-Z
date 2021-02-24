# * Данный менедреж отвечает за различие в версиях плагина для MZ и MV

ANET.VD = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ANET.VD

    _.getGameVersion = ->
        if KDCore.isMZ()
            return $dataSystem.advanced.gameId
        else
            return $dataSystem.versionId

    _.getWindowBackgroundType = ->
        if KDCore.isMZ()
            return 2
        else
            return 0

# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------