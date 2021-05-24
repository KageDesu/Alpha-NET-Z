#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkRoomsList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_NetworkRoomsList::

    _.applyFilterToRooms = ->
        return unless @roomsList?
        # * Применяем фильтр по gameId
        @roomsList = @roomsList.filter (room) -> room.gameId == ANET.VD.getGameVersion()
        return
    
    return
# ■ END Scene_NetworkRoomsList.coffee
#---------------------------------------------------------------------------