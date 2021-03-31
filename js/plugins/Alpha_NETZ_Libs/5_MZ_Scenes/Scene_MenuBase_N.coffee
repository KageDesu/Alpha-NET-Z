#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_MenuBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_MenuBase::

    #?EVENT
    # * Когда пришли какие-либо данные DataObserver
    _.netOn_game_observerData = ->
        @refreshNetwork()

    #?EVENT
    # * Когда игрок выходит или входит в комнату (покидает игру)
    _.netOn_lobby_refreshRoomData = ->
        try
            $gameParty.nRefreshNetworkActors()
            # * Если есть окно с персонажами, обновить его
            # * Можно было вынести в класс Scene_Menu, но не хочу плодить одинаковые методы
            # * Так как тут в Scene_MenuBase тоже нужен метод
            @_statusWindow?.refresh()
            #TODO: Сделать как и в ALphaNET общий Refresh всех окон сцены
        catch e
            ANET.w e
        return

    # * Обновить все окна при изменениях данных из сети
    _.refreshNetwork = ->
        return unless ANNetwork.isConnected()
        try
            @updateActor()
            return unless @_windowLayer?
            for child in @_windowLayer.children
                if child? and child.refresh?
                    child.refresh()
            return
        catch e
            ANET.w e
        return

    return
# ■ END Scene_MenuBase.coffee
#---------------------------------------------------------------------------