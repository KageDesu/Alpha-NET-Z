
# * Список игроков в комнате
#TODO: Пока нельзя выделять игрока и что-то с ним делать
#TODO: Возможно добавить возможность кикнуть игрока

class Window_NetworkRoomPlayersList extends Window_Selectable
    constructor: (rect) ->
        super(rect)
        #@setBackgroundType 2

    maxItems: -> ANGameManager.playersData.length

    drawItem: (index) ->
        playerData = @playerData(index)
        return unless playerData?
        rect = @itemLineRect(index)
        @changePaintOpacity(@isEnabled(index))
        @_drawPlayerInfo(rect, playerData)
        @changePaintOpacity(1)
        return

    isEnabled: (index) -> true

    playerData: (index) -> ANGameManager.playersData[index]

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_NetworkRoomPlayersList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_NetworkRoomPlayersList::

    _._drawPlayerInfo = (rect, playerData) ->
        text = playerData.name
        #TODO: Другое форматирование?
        if playerData.id == ANNetwork.room.masterId
            text = "\\C[1]" + text
        else if playerData.id == ANNetwork.myId()
            text = "\\C[3]" + text
        @drawTextEx(text, rect.x, rect.y, rect.width, 'left')
        return
    
    return
# ■ END Window_NetworkRoomPlayersList.coffee
#---------------------------------------------------------------------------