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
        "REFRESH".p()
        @refreshNetwork()

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