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
        #_R = @_registerNetMessage.bind @
        #_M = NetMessage
        _C = NETClientManager
        @_handleCommands()
    
    _._handleCommands = ->
        @_handleBaseSocketEvents()

    _._handleBaseSocketEvents = ->
        @socket.on 'disconnect', () -> _C.onDisconnect()
        @socket.on 'connect', () -> _C.onConnect()
        @socket.on 'connect_error', () -> _C.onConnectionError()

    return
# ■ END NetworkClient.coffee
#---------------------------------------------------------------------------