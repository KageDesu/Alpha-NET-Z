# * Дополнительные расширения для KDCore

# * Расширение, чтобы без XDev работал плагин
do ->

    __STR_P = String::p
    String::p = (anotherText) ->
        if ANET.isDEV()
            __STR_P.call(@, anotherText)
        else
            # * NOTHING
        return

    return


