class NetworkClientHandler
    constructor: (@socket) ->
        @_init()

    disconnect: -> @socket?.disconnect()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetworkClientHandler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _C = null #? ClientManager
    _ = NetworkClientHandler::

    _._init = ->
        _C = NetClientMethodsManager
        # * Задаём ссылку на собственный сокет в класс сообщений
        # Чтобы можно было отправлять сообщения каждый раз не передавая сокет
        NetMessage.SetOwnSocket @socket
        @_handleCommands()
    
    _._handleCommands = ->
        @_handleBaseSocketEvents()
        @_handleDebugEvents()
        @_handleANETServerEvents()

    _._handleBaseSocketEvents = ->
        @socket.on 'disconnect', () -> _C.onDisconnect()
        @socket.on 'connect', () -> _C.onConnect()
        @socket.on 'connect_error', () -> _C.onConnectionError()

    _._handleDebugEvents = ->
        @socket.on 'trace', (n) -> console.log("Trace: " + n)

    _._handleANETServerEvents = ->
        @socket.on 'serverPrc', (n) =>
            @_handleServerPrcEvent(n)

    _._handleServerPrcEvent = (n) ->
        { id, flag, content } = n
        eventHandlerMethodName = id + "_" + flag
        if _C.isExistPrcEvent(eventHandlerMethodName)
            _C.handlePrcEvent(eventHandlerMethodName, content)
        else
            console.log("Unknown Event from server " + eventHandlerMethodName)

    return
# ■ END NetworkClientHandler.coffee
#---------------------------------------------------------------------------