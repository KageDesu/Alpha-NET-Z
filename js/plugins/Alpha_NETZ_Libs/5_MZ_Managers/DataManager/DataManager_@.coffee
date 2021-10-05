#╒═════════════════════════════════════════════════════════════════════════╛
# ■ DataManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = DataManager

    #@[ALIAS]
    ALIAS__makeSavefileInfo = _.makeSavefileInfo
    _.makeSavefileInfo = ->
        info = ALIAS__makeSavefileInfo.call(@)
        if ANNetwork.isConnected() and $gameTemp.nUniqueSaveID?
            @nWriteNetworkSaveFileInfo(info)
            # * Сбросим флаг
            $gameTemp.nUniqueSaveID = null
        return info

    return
# ■ END DataManager.coffee
#---------------------------------------------------------------------------