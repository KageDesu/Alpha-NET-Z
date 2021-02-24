#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_Base.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    # * Совместимость с MZ

    #@[DEFINES]
    _ = Window_Base::

    return unless KDCore.isMV()

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = (x, y, width, height) ->
        if x instanceof Rectangle
            ALIAS__initialize.call(@, x.x, x.y, x.width, x.height)
        else
            ALIAS__initialize.call(@, x, y, width, height)
        return
    
    return
# ■ END Window_Base.coffee
#---------------------------------------------------------------------------