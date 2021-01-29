do ->

    #@[DEFINES]
    _M = require('./NetMessage').NetMessage
    _R = null
    _CM = (socket, name) -> _M.EmptyMessage(socket).setName(name)

    #@[NET MESSAGES]
    _M.RequestMapData = (_) -> _CM _, 'requestMapData'
    _M.MapDataResponse = (_) -> _CM _, 'responseMapData'

    class ServerMain
        constructor: (@data) ->
            #_R = @_registerNetMessage.bind @
            console.log 'Server Main created'

        start: ->
            @server = require('./Server')(@data.settings.port)
            @_handleCommands()

        _handleCommands: ->
            @_handleBaseSocketEvents()
            # @_handleDebugEvents()
            # @_handleANETEvents()

        _handleBaseSocketEvents: ->
            @server.on 'connection', (client) =>
                console.log "Client connected " + client.id
                # * Подписываемся чтобы читать комманды от этого клиента
                @_handleDisconnectForClient(client)
                @_handleDebugEventsForClient(client)
                @_handleANETEventsForClient(client)

        _handleDisconnectForClient: (client) ->
            client.on 'disconnect', () ->
                console.log "Client disconnected " + client.id

        _handleDebugEventsForClient: (client)  ->
            client.on 'trace', (n) ->
                str = "Client %1 trace: %2".format(client.id, n.data)
                console.log str

        _handleANETEventsForClient: (client) ->

        #_setupServerCommands: (client) ->
        #    # * Эти команды выполняются только на сервере
        #    _R client, do _M.RequestMapData, @OnRequestMapData.bind(@)
        #    return

        #_registerNetMessage: (client, netMessage, func) -> client.on netMessage.name, func

        #_getClientById: (clientId) -> @clients()[clientId]

        #clients: -> return @_server.clients().sockets

        #@[COMMANDS] ========================================================================
        ###OnRequestMapData: (networkData) ->
            try
                console.log("OnRequestMapData")
                client = @_getClientById networkData.from
                #console.log client.id
                if client?
                    _M.MapDataResponse(client).send(@data.mapData)
            catch e
                console.log(e)
            return###
            

    module.exports.ServerMain = ServerMain
    return