#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetMessages.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _M = NetMessage
    _CM = (name, flag, data, socket) ->
        _M.EmptyMessageWithFlag(flag, data, socket).setName(name)

    # * Обозначения
    # f - имя комманды (флага)
    # d - данные
    # s - сокет (либо ничего)

    #?LOBBY COMMANDS
    _M.Lobby = (f, d, s) -> _CM 'lobby', f, d, s

    #?MAP COMMANDS
    _M.Map = (f, d, s) -> _CM 'map', f, d, s

    #?GAME COMMANDS
    _M.Game = (f, d, s) -> _CM 'game', f, d, s

    #?INTERPRETER COMMANDS
    _M.Event = (f, d, s) -> _CM 'event', f, d, s

    #?BATTLE COMMANDS
    _M.Battle = (f, d, s) -> _CM 'battle', f, d, s

    return
# ■ END NetMessages.coffee
#---------------------------------------------------------------------------