#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_SavefileList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_SavefileList::

    #@[ALIAS]
    ALIAS__drawGameTitle = _.drawGameTitle
    _.drawGameTitle = (info, x, y, width) ->
        if info.nUniqueSaveID? and info.nMyActorId?
            text = ""
            text = info.title if info.title?
            text += " [Network game]"
            @drawText(text, x, y, width + 100)
        else
            ALIAS__drawGameTitle.call(@, info, x, y, width)
        
    
    return
# ■ END Window_SavefileList.coffee
#---------------------------------------------------------------------------