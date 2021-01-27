#@[GLOBAL]
ANNetwork = ->

do ->

    #@[DEFINES]
    _ = ANNetwork



    _.initSystem = ->
        @socket = null
        @client = null
        "Network inited".p()
    
    _.stop = ->
        @client?.disconnect()
        @socket = null

    _.testConnection = ->
        ip = 'localhost'
        port = '3034'
        adr = 'http://' + ip + ":" + port
        console.log "Connect to " + adr
        @socket = io adr
        @client = new NetworkClient(@socket)
        return

    return
