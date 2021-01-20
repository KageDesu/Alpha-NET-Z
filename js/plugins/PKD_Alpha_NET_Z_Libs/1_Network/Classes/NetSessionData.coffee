# * Хранит данные о текущей игровой сессии (данные каждого игрока)
# * Также хранит отдельно глобальные данные
# * Глобальные данные - это 121 (свичи), 122 (переменные), 123 (self swithes), они
# * сохраняются в глобальные данные (для мира (всех игроков)) - когда она синхронизирована (комментарием)
# * см. NetWorldManager (см. ServerManager.OnSyncEvent)
class NetSessionData
    constructor: () ->
        @_actorsData = {}
        @_globalData = new NetPlayerWorldData()

    setPlayerActorData: (actorId, data) ->
        @_checkActorWorldData actorId
        #"PLAYER DATA SAVED TO SESSION".p(actorId)
        @getAllData(actorId).setActorData data
        return

    getPlayerActorData: (actorId) ->
        @_checkActorWorldData actorId
        @getAllData(actorId).getActorData()

    setPlayerItemsData: (actorId, data) ->
        @_checkActorWorldData actorId
        @getAllData(actorId).setActorItems data
        return

    getPlayerItemsrData: (actorId) ->
        @_checkActorWorldData actorId
        @getAllData(actorId).getActorItems()

    hasInfoAbout: (actorId) -> @_actorsData[actorId]?

    getAllData: (actorId) -> @_actorsData[actorId]

    getGlobalData: -> @_globalData

    setPlayerWorldData: (actorId, data) ->
        @_checkActorWorldData actorId
        @getAllData(actorId).setWorldData(data)
    
    getPlayerWorldData: (actorId) ->
        @_checkActorWorldData actorId
        @getAllData(actorId).getWorldData()

    makeSaveContents: ->
        _actorsData = {}
        for item of @_actorsData
            if @_actorsData.hasOwnProperty(item)
                if @_actorsData[item].actorData?
                    _actorsData[item] = @_actorsData[item].makeSaveContents(item)
        
        g = @_globalData.makeSaveContents()
        saveData = {
            global: g
            actorsData: _actorsData
        }

    extractSaveContents: (content) ->
        try
            @_loadDataToWorldObject @_globalData, content.global
            for item of content.actorsData
                if content.actorsData.hasOwnProperty(item)
                    @_actorsData[item] = new NetPlayerWorldData()
                    @_loadDataToWorldObject(@_actorsData[item], content.actorsData[item])
        catch e
            AlphaNET.error e, ' while load network world save data'

    _loadDataToWorldObject: (obj, data) ->
        try
            obj.actorItems = data.actorItems
            obj.actorData = JsonEx.stringify(data.actorData) if data.actorData?
            obj.setWorldData data.world
        catch e
            AlphaNET.error e, ' while extract network world save data'

    _checkActorWorldData: (actorId) ->
        unless @hasInfoAbout(actorId)
            @_actorsData[actorId] = new NetPlayerWorldData()
        return

ANET.register NetSessionData