#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Parameters Manager Extension.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

#$[ENCODE]

do ->

    #@[DEFINES]
    _ = ANET.ParamsManager::

    # * Базовая версия имеет ограничение на 2 игрока
    _.actorsForNetwork = ->
        actors = @getParam("actorsForNetwork", [1, 2])
        if actors.length > 2
            return actors.slice(0, 2)
        else
            return actors

    _._prepareConnectionSettings = ->
        # * Базовая версия может подключаться только к глобальному серверу
        @_ip = "195.161.41.20"
        @_port = "3034"
        return
    
    return
# ■ END Parameters Manager Extension.coffee
#---------------------------------------------------------------------------