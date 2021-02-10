# * Данный класс отвечает за подключение и хранит общие методы отправки и обработки команд

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

    _.myId = -> @socket?.id

    _.isMasterClient = -> @_isHost is true

    #TODO: Пока симулируем режим кооператива
    _.isCoopMode = -> true

    _.isMultiMode = -> !@isCoopMode()

    # * Этот метод вызывается когда создаём комнату
    _.setRoomMaster = (@room) ->
        @_isHost = true
        LOG.p("You are Master (host) of room: " + @room.name)
        #TODO: установить флаг в NetMessage? что типо теперь send.to

    # * Когда подключаемся к комнате
    _.setRoomJoin = (@room) ->
        @_isHost = false
        LOG.p("You are joined to room: " + @room.name)
        #TODO: установить флаг в NetMessage? что типо теперь send.to

    # * Обновить данные команты
    _.onRoomDataFromServer = (@room) ->
        # * Проблема в том что приходит структура, а надо бы хранить класс?

    # * Комната была закрыта
    _.onRoomClosed = ->
        return unless @isConnected()
        return unless @room?
        @leaveRoom()
        @_isHost = false
        @room = null
        return

    # * Закрыть комнату (созданную этим клиентом)
    _.closeRoom = ->
        return unless @isMasterClient()
        return unless @room?
        @send(NMS.Lobby("closeRoom"))
        return

    # * Покинуть комнату (к которой этот клиент подключился)
    _.leaveRoom = ->
        return unless @room?
        ANGameManager.onLeaveRoom()
        @send(NMS.Lobby("leaveRoom", @room.name))
        return


    # * Надо ждать сеть
    _.isBusy = -> @isConnected() && (@isWaitServer() || ANGameManager.isShouldWaitServer())

    # * Ждёт ответ от сервера
    _.isWaitServer = -> @isConnected() && @_isWaitServer is true


    _.initSystem = ->
        @socket = null
        @client = null
        @_isWaitServer = false
        @_isHost = false # * Мастер клиент?
        "Network inited".p()
    
    _.stop = ->
        NetClientMethodsManager.setConnectionToMasterCallback null
        @client?.disconnect()
        @_isWaitServer = false
        @socket = null
        ANGameManager.reset()
        return

    _.testConnection = ->
        ip = 'localhost'
        port = '3034'
        adr = 'http://' + ip + ":" + port
        console.log "Connect to " + adr
        @socket = io adr
        @client = new NetworkClientHandler(@socket)
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
            LOG.p("Send: " + msg.fullName())
            msg.setFrom(@socket.id).send()
        return

    # * Отправить сообщение и ждать! результат (есть Timeout)
    _.get = (msg, onData, onTimeout) ->
        unless @isConnected()
            LOG.p("You try get data from Server, but NOT connection!")
        else
            msgName = msg.fullName()
            # * Ставим игру на паузу
            @_isWaitServer = true
            HUIManager.showLoader()
            # * Дополняем callbacks, чтобы снять игру автоматически с паузы
            _onTimeout = (...args) ->
                LOG.p("Timeout for: " + msgName)
                onTimeout.apply(@, args) if onTimeout?
                ANNetwork._isWaitServer = false
                HUIManager.hideLoader()
            _onData = (...args) ->
                LOG.p("Response (get) for: " + msgName)
                onData.apply(@, args) if onData?
                ANNetwork._isWaitServer = false
                HUIManager.hideLoader()
            LOG.p("Send, get!: " + msgName)
            msg.setFrom(@socket.id).get(_onData, _onTimeout, 1000)
        return

    # * Отправить сообщение и вызвать callback, когда прийдёт ответ
    _.callback = (msg, method) ->
        unless @isConnected()
            LOG.p("You try send callback message, but NOT connection!")
        else
            msgName = msg.fullName()
            _method = (...args) ->
                LOG.p("Callback for: " + msgName)
                method.apply(@, args)
            LOG.p("Send, callback: " + msgName)
            msg.setFrom(@socket.id).callback(_method)
        return

    _.trace = (text) -> @send(NMS.Trace(text))

    _.test = () -> @callback(
        NMS.Lobby("createRoom"),
        (answer) -> console.log(answer),
        () -> console.log('fail')
    )

    return
