#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_SavefileList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_SavefileList::

    #@[ALIAS]
    ALIAS__isEnabled = _.isEnabled
    _.isEnabled = (savefileId) ->
        # * Нельзя загружать сетевые сохранения из обычного меню загрузки
        if @_mode == 'load' && DataManager.nIsNetworkSaveFile(savefileId)
            return false
        else if @_mode == 'loadNet'
            return DataManager.nIsNetworkSaveFile(savefileId)
        else
            return ALIAS__isEnabled.call(@, savefileId)
    
    #TODO: Добавить кастомизацию или опцию на отключение
    #@[ALIAS]
    ALIAS__drawTitle = _.drawTitle
    _.drawTitle = (savefileId, x, y) ->
        if DataManager.nIsNetworkSaveFile(savefileId)
            @drawText(TextManager.file + " " + savefileId + " [Network game]", x, y, 240)
        else
            ALIAS__drawTitle.call(@, savefileId, x, y)
        

    return
# ■ END Window_SavefileList.coffee
#---------------------------------------------------------------------------