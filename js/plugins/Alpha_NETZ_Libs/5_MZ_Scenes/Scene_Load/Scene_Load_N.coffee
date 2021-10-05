#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Load.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Load::

    _.nLoadNetworkGameFromSavefile = ->
        savefileId = DataManager.nGetNetworkSaveFileIdByUniqueId(ANNetwork.room.uniqueSaveID)
        if savefileId < 0
            @nOnLoadFailure()
        else
            @executeLoad(savefileId)
        return

    _.nOnLoadFailure = ->
        HUIManager.notifyError("Can't load Save file!")
        # * Через timeout а то не успевает, если сразу ошибка
        setTimeout (->
                SceneManager.goto(Scene_Title)
            ), 1
        return
    
    return
# ■ END Scene_Load.coffee
#---------------------------------------------------------------------------