class NetworkClient
    constructor: (@socket) ->
        @_init()

    disconnect: -> @socket?.disconnect()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetworkClient.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _C = null #? ClientManager
    _M = null #? NetMessage
    _R = null #? _registerNetMessage
    _ = NetworkClient::

    _._init = ->
        _R = @_registerHandlerForCommand.bind @
        _M = NetMessage
        _C = NetClientMethodsManager
        # * Задаём ссылку на собственный сокет в класс сообщений
        # Чтобы можно было отправлять сообщения каждый раз не передавая сокет
        _M.SetOwnSocket @socket
        @_handleCommands()
    
    _._handleCommands = ->
        @_handleBaseSocketEvents()
        @_handleDebugEvents()
        @_handleANETEvents()

    _._handleBaseSocketEvents = ->
        @socket.on 'disconnect', () -> _C.onDisconnect()
        @socket.on 'connect', () -> _C.onConnect()
        @socket.on 'connect_error', () -> _C.onConnectionError()

    _._handleDebugEvents = ->
        @socket.on 'trace', (n) -> console.log("Trace: " + n)

    _._handleANETEvents = ->
        

    _._registerHandlerForCommand = (netMessage, handler) ->
        @socket.on netMessage.name, handler

    return
# ■ END NetworkClient.coffee
#---------------------------------------------------------------------------