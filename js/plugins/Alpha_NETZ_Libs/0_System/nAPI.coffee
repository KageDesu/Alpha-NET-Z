# * Глабольный набор вспомогательных функций для пользователя

nAPI = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    #@[DEFINES]
    _ = nAPI

    # * NETWORK STATE
    # -----------------------------------------------------------------------
    do ->

        _.isNetworkGame = ->
            try
                return ANNetwork.isConnected()
            catch e
                KDCore.warning e
            return false

        _.myPlayerIndex = ->
            try
                return ANGameManager.myIndex()
            catch e
                KDCore.warning e
            return 0

        _.myActorId = ->
            try
                return ANGameManager.myActorId()
            catch e
                KDCore.warning e
            return 0

        _.playersCount = ->
            try
                return ANGameManager.playersData.length
            catch e
                KDCore.warning e
            return 0

        _.isMasterClient = ->
            try
                return _.isNetworkGame() && ANNetwork.isMasterClient()
            catch e
                KDCore.warning e
            return false

    # -----------------------------------------------------------------------

    # * HUI
    # -----------------------------------------------------------------------
    do ->

        _.showGreenAlert = (text) ->
            try
                HUIManager?.notifySucess(text)
            catch e
                KDCore.warning e

        _.showRedAlert = (text) ->
            try
                HUIManager?.notifyError(text)
            catch e
                KDCore.warning e

        _.showInfoMessage = (text1, text2 = "") ->
            try
                HUIManager?.showWaitingInfo(text1, text2, 1)
            catch e
                KDCore.warning e

        _.hideInfoMessage = () ->
            try
                HUIManager?.hideWaitingInfo()
            catch e
                KDCore.warning e

    # -----------------------------------------------------------------------

    # * USER SERVER COMMANDS
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS SUPPORT]
        # * FOR ALIASING (for plugin developers and custom commands implementation)
        _.onCustomCommand = (name, data) ->
            try
                $gameSystem?.nCheckCustomCommandForCEStart(name)
            catch e
                ANET.w e
            console.log("Custom network command received: " + name)
            # * USER CUSTOM CODE HERE
            return

        _.sendCustomCommand = (name, data) ->
            try
                return unless _.isNetworkGame()
                ANNetwork.callback(NMS.Game("userCommand", { name, data }),
                    () ->
                        #TODO: Может не надо выполнять и на данном клиенте?
                        # * Сразу выполняем и на данном клиенте
                        # * Так как сервер эту команду выполнит в режиме ретрансляции
                        nAPI.onCustomCommand(name, data)
                    )
            catch e
                KDCore.warning e

        # * Подписать на определённую (кастомную) команду выполенине общего события
        _.registerCommonEventForCommand = (name, commonEventId) ->
            try
                ANNetwork.callback(NMS.Game("customCommandLink", { name, commonEventId }),
                    () ->
                        $gameSystem?.nRegisterCustomCommandCE(name, commonEventId)
                        console.log("Custom network command register to Common Event is done")
                    )
            catch e
                KDCore.warning e

    # -----------------------------------------------------------------------


    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------