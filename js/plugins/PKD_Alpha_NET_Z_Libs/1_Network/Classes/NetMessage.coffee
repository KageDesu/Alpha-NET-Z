#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetMessage.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#@[GLOBAL]
class NetMessage
    constructor: (@socket) ->
        @name = "trace"
        @from = ""
        @to = ""
        @data = ""
        @waited = false

    @Socket = null

    setName: (name) ->
        @name = name
        @

    setTo: (socketId) ->
        @to = socketId
        @

    setFrom: (socketId) ->
        @from = socketId
        @

    setData: (data) ->
        @data = data
        @

    setWait: (symbol) ->
        @waited = true
        Network.waitServerResponse @, symbol
        @

    setRepeat: (symbol) ->
        @waited = true
        Network.waitServerResponseRepeated @, symbol
        @

    send: (data) ->
        @socket.emit @name, @_makeData(data)
        @

    broadcast: (data) -> @socket.broadcast.emit @name, @_makeData(data)

    _makeData: (data = null) ->
        netData = {}
        unless data?
            data = @data
        else
            @data = data
        netData.data = data
        netData.from = @from
        netData.to = @to
        netData.waited = @waited
        netData
    
    @Setup: (socket) -> NetMessage.Socket = socket

    @PlayerDisconnect: (socket) -> @EmptyMessage(socket).setName('playerDisconnect')

    @PlayerConnect: (socket) -> @EmptyMessage(socket).setName('playerConnect')

    @HostResponse: (socket) -> @EmptyMessage(socket).setName('host').setFrom('server')

    @AlertMessage: (socket) -> @EmptyMessage(socket).setFrom('server').setName('alertMessage')

    @EmptyMessage: (socket = null) ->
        targetSocket = socket
        targetSocket = @Socket unless socket?
        msg = new NetMessage(targetSocket)
        msg.setFrom(targetSocket.id) if targetSocket?
        return msg

    @CreateSubMessageData: (id) ->
        data = {
            id: id
        }

ANET.register NetMessage
# ■ END NetMessage.coffee
#---------------------------------------------------------------------------