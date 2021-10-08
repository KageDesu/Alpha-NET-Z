#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    _.dataObserverHaveChanges = ->
        ANSyncDataManager.sendPlayerObserver()

    _.updateNetwork = ->
        return if $gameParty.isEmpty()
        # * Проверяем и обновляем DataObserver своего персонажа
        # * Тут этот ? (првоерка Null) нужна!
        $gameParty.leader()?.updateDataObserver()

    _.nUpdatePlayerInputForNetwork = ->
        @nUpdateChatInput() if ANET.PP.isGameChatAllowed() #TODO: DYNAMIC?

    _.nUpdateChatInput = ->
        #TODO: Можно оптимизировать, в initMembers
        openChatButton = ANET.PP.getChatOpenCloseKey()
        sayInChatButton = ANET.PP.getChatSayKey()
        if Input.isTriggered(openChatButton)
            if ANET.UI.isChatOpen()
                # * Если кнопка открыть чат и кнопка сказать в чат одинаковые
                if openChatButton == sayInChatButton
                    ANET.UI.showChatInputSafe() # * то не закрываем, а сцена ввода текста
                    Input.clear()
                else # * иначе закрываем
                    ANET.UI.closeChat()
            else
                ANET.UI.showChat()
        else if Input.isTriggered(sayInChatButton)
            ANET.UI.showChatInputSafe() if ANET.UI.isChatOpen()
        return

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------