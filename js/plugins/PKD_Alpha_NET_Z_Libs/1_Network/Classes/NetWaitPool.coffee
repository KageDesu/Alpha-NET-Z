# * Класс для создания пула клиентов, для ожидания чего-либо
# * Используется в методе RegisterOnSharedEventSync (ожидание общего события)
class NetWaitPool
    constructor: (@waitId) ->
        @_clients = []
        @resetPool()

    addClient: (clientId, isReady = false) ->
        @_clients.push(clientId) if @_getClientIndex(clientId) < 0
        @setClientReady clientId if isReady is true

    _getClientIndex: (clientId) -> @_clients.indexOf clientId

    setClientReady: (clientId) ->
        @_statuses[@_getClientIndex(clientId)] = true

    isPoolReady: -> @_statuses.every (status) -> status is true

    resetPool: -> @_statuses = [] # * Массив готовности
        
    getPoolSize: -> @_clients.length
    
ANET.register NetWaitPool