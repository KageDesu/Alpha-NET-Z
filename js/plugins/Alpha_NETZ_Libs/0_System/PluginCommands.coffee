# * Команды плагина
# * Нет класса или менеджера, так как только методы регистрации команд

do ->

    # * Основной метод загрузки (регистрации команд плагина)
    ANET.loadPluginCommands = ->
        if KDCore.isMZ()
            registerPluginCommandsMZ('Alpha_NETZ')
            registerPluginCommandsMZ('Alpha_NETZ_MZ')
        else
            registerPluginCommandsMV()

    

    registerPluginCommandsMZ = (pluginName) ->
        PluginManager.registerCommand(pluginName, 'EventCommandSelector', (args) ->
            try
                @nSetCommandOptions(args)
            catch e
                ANET.w e
        )

        PluginManager.registerCommand(pluginName, 'SharedBattle', (args) ->
            try
                @nSetSharedBattle(args.battleId)
            catch e
                ANET.w e
        )

        return
        
    registerPluginCommandsMV = ->
        try
            # * Этот метод только для MV существует
            ANET.registerMVPluginCommands()
        catch e
            ANET.w e

    return