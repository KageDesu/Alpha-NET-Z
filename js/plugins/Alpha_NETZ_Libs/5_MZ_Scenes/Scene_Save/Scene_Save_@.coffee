#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Save.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Save::

    #TODO: В MV по другому скорее всего, не помню этот метод

    #@[ALIAS, STORED]
    _.nALIAS__executeSave_43243 = _.executeSave
    _.executeSave = (savefileId) ->
        if ANNetwork.isConnected()
            if ANET.PP.isSaveOnlyInMenu()
                #TODO:
                #@nRequestClientsStatesForSave(savefileId)
                @nExecuteNetworkSave(savefileId)
            else
                @nExecuteNetworkSave(savefileId)
        else
            _.nALIAS__executeSave_43243.call(@, savefileId)
        return
    
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        return unless ANNetwork.isConnected()
        return unless @nSaveDataPool?
        @nUpdateSavePool()
        return

    #@[ALIAS]
    ALIAS__stop = _.stop
    _.stop = ->
        ALIAS__stop.call(@)
        @nClearTempSaveData()
        return

    return
# ■ END Scene_Save.coffee
#---------------------------------------------------------------------------