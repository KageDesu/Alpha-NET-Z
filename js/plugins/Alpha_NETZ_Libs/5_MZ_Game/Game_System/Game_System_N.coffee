#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_System.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_System::

    # * Инициализация набора общих событий для команд пользователя
    _.nInitCustomCommandsCE = ->
        @nCustomCommandsCE = {} unless @nCustomCommandsCE?

    # * Проверка, есть ли для кастомной команды общее событие (и запуск если есть)
    _.nCheckCustomCommandForCEStart = (name) ->
        try
            @nInitCustomCommandsCE()
            ceId = @nCustomCommandsCE[name]
            if ceId? and ceId > 0
                $gameTemp.reserveCommonEvent(ceId)
        catch e
            ANET.w e
        return

    # * Зарегестрировать вызов общего события для кастомной команды
    _.nRegisterCustomCommandCE = (name, ceId) ->
        try
            @nInitCustomCommandsCE()
            @nCustomCommandsCE[name] = ceId
        catch e
            ANET.w e
        return
    
    return
# ■ END Game_System.coffee
#---------------------------------------------------------------------------