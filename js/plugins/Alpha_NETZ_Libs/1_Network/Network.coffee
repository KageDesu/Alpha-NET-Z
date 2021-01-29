#@[GLOBAL]
ANNetwork = ->

#@[EXTEND]
window.NET = ANNetwork

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("Network")
    LOG.setColors(KDCore.Color.GREEN, KDCore.Color.BLACK.getLightestColor(35))
    LOG.on()

    #@[DEFINES]
    _ = ANNetwork

    _.isConnected = -> @socket?

    # * Ждёт ответ от сервера
    _.isWaitServer = -> @isConnected() && @_isWaitServer is true

    _.initSystem = ->
        @socket = null
        @client = null
        @_isWaitServer = false
        "Network inited".p()
    
    _.stop = ->
        NetClientMethodsManager.setConnectionToMasterCallback null
        @client?.disconnect()
        @_isWaitServer = false
        @socket = null

    _.testConnection = ->
        ip = 'localhost'
        port = '3034'
        adr = 'http://' + ip + ":" + port
        console.log "Connect to " + adr
        @socket = io adr
        @client = new NetworkClient(@socket)
        return

    _.setConnection = (callback) ->
        NetClientMethodsManager.setConnectionToMasterCallback callback
        @testConnection()
        return

    # * Просто отправить данные на сервер
    _.send = (msg) ->
        unless @isConnected()
            LOG.p("You try send message, but NOT connection!")
        else
            msg.setFrom(@socket.id).send()
        return


    # * Отправить сообщение и ждать! результат (есть Timeout)
    _.get = (msg, onData, onTimeout) ->
        unless @isConnected()
            LOG.p("You try get data from Server, but NOT connection!")
        else
            # * Ставим игру на паузу
            @_isWaitServer = true
            # * Дополняем callbacks, чтобы снять игру автоматически с паузы
            _onTimeout = (...args) ->
                onTimeout.apply(@, args) if onTimeout?
                ANNetwork._isWaitServer = false
            _onData = (...args) ->
                onData.apply(@, args) if onData?
                ANNetwork._isWaitServer = false
            msg.setFrom(@socket.id).get(_onData, _onTimeout, 1000)
        return

    # * Отправить сообщение и вызвать callback, когда прийдёт ответ
    _.callback = (msg, method) ->
        unless @isConnected()
            LOG.p("You try send callback message, but NOT connection!")
        else
            msg.setFrom(@socket.id).callback(method)
        return

    _.trace = (text) -> @send(NMS.Trace(text))

    _.test = () -> @get(
        NMS.Lobby("createRoom"),
        (answer) -> console.log(answer),
        () -> console.log('fail')
    )

    return
