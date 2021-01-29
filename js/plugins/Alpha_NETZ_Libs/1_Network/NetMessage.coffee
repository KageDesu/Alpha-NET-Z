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
        #@myMapId = 0
        #@myPlayerIndex = -1 # * -1 = server
        @waited = false

    # * Сокет текущего клиента (по умолчанию)
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

    #setWait: (symbol) ->
    #    @waited = true
    #    Network.waitServerResponse @, symbol
    #    @

    #setRepeat: (symbol) ->
    #    @waited = true
    #    Network.waitServerResponseRepeated @, symbol
    #    @


    #TODO: @socket.to.emit? комната?

    send: (data) ->
        @socket.emit @name, @_makeData(data)
        @

    callback: (method, data) ->
        @socket.emit @name, @_makeData(data), method
        @

    get: (methodA, methodB, timeout, data) ->
        timeoutFunc = NetMessage.WithTimeout
        @socket.emit @name, @_makeData(data), timeoutFunc(methodA, methodB, timeout)
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
    
    @SetOwnSocket: (socket) -> NetMessage.Socket = socket

    @Trace: (text, socket) -> @EmptyMessage(socket).setName("trace").setData(text)

    @EmptyMessage: (socket = null) ->
        targetSocket = socket
        targetSocket = @Socket unless socket?
        msg = new NetMessage(targetSocket)
        msg.setFrom(targetSocket.id) if targetSocket?
        return msg

    @EmptyMessageWithFlag: (flagName, data, socket = null) ->
        msg = @EmptyMessage(socket)
        msg.setData({
            id: flagName
            data: data
        })
        return msg

    @WithTimeout: (onSuccess, onTimeout, timeout) ->
        called = false
        timer = setTimeout(() ->
            return if called
            called = true
            onTimeout()
        , timeout)
        return (...args) ->
            return if called
            called = true
            clearTimeout(timer)
            onSuccess.apply(@, args)

#@[EXTENDD]
NMS = NetMessage
# ■ END NetMessage.coffee
#---------------------------------------------------------------------------