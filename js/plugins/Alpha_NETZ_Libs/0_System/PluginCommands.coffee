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
        PluginManager.registerCommand(pluginName, 'EventStartOptions', (args) ->
            try
                
            catch e
                ANET.w e
        )
        return
        
    registerPluginCommandsMV = ->
        #TODO: Game_Interpreter.prototype.pluginCommand



    return