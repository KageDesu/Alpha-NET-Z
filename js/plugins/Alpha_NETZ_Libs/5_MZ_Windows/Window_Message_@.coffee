#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_Message.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_Message::

    #@[ALIAS]
    ALIAS__startMessage = _.startMessage
    _.startMessage = ->
        ALIAS__startMessage.call(@)
        ANET.UI.onGameMessageStart()
        
    #TODO: Тут мерцание происходит. Как быть? Timeout?
    #@[ALIAS]
    ALIAS__terminateMessage = _.terminateMessage
    _.terminateMessage = ->
        ALIAS__terminateMessage.call(@)
        ANET.UI.onGameMessageEnd()
    
    return
# ■ END Window_Message.coffee
#---------------------------------------------------------------------------