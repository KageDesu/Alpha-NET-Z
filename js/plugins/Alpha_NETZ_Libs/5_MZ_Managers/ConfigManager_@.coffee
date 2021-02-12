#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ConfigManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ConfigManager

    # * Сохранение и загрузка сетевого имени игрока

    #@[ALIAS]
    ALIAS__makeData = _.makeData
    _.makeData = ->
        config = ALIAS__makeData.call(@)
        config.netPlayerName = @netPlayerName
        return config
    
    #@[ALIAS]
    ALIAS__applyData = _.applyData
    _.applyData = (config) ->
        ALIAS__applyData.call(@, config)
        @netPlayerName = config.netPlayerName
        return

    return
# ■ END ConfigManager.coffee
#---------------------------------------------------------------------------