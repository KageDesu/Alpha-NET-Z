#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Load.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Load::

    # * В MV версии нету проверки на Enabled, так что доп. проверка
    #@[ALIAS]
    ALIAS__onSavefileOk = _.onSavefileOk
    _.onSavefileOk = ->
        # * Если сетевое сохранение, то НЕЛЬЗЯ загружать в обычной сцене загрузки
        if DataManager.nIsNetworkSaveFile(@savefileId())
            @onLoadFailure()
        else
            ALIAS__onSavefileOk.call(@)
        return
    
    # * В MV нету этого метода, добавим и будем использовать для загрузки сетевых сохранений
    #?[NEW]
    _.executeLoad = (savefileId) ->
        if DataManager.loadGame(savefileId)
            @onLoadSuccess()
        else
            @onLoadFailure()
        return

    return
# ■ END Scene_Load.coffee
#---------------------------------------------------------------------------