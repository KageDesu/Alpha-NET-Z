class Window_NetworkActorsList extends Window_Selectable
    constructor: (rect) ->
        super(rect)
        @setBackgroundType ANET.VD.getWindowBackgroundType()
        @select(0)

    maxItems: -> @actorsForNetwork().length

    maxCols: -> 2

    actorsForNetwork: -> ANET.PP.actorsForNetwork()

    isCurrentItemEnabled: ->
        try
            return @isEnable(@index())
        catch e
            ANET.w e
            return false

    selectedActorId: ->
        return 0 unless @isCurrentItemEnabled()
        return @getActorData(@index()).id

    isEnable: (index) ->
        actorId = @getActorData(index).id
        ###return ANGameManager.playersData.some (pl) 
        for pl in ANGameManager.playersData
            if pl.actorId == actorId
                return false
        return true###
        return !ANGameManager.playersData.some (pl) -> pl.actorId == actorId

    drawItem: (index) ->
        actorData = @getActorData(index)
        return unless actorData?
        rect = @itemRect(index)
        faceBitmap = ImageManager.loadFace(actorData.faceName)
        faceBitmap.addLoadListener () =>
            @_drawActor(rect, actorData, index)
        return

    itemHeight: -> 110
    
    getActorData: (index) ->
        $dataActors[@actorsForNetwork()[index]]

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_NetworkActorsList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_NetworkActorsList::

    _._drawActor = (rect, a, index) ->
        @changePaintOpacity(@isEnable(index))
        @_drawActorInfo(rect, a)
        @_drawActorClass(rect, a)
        @_drawNetworkStatus(rect) unless @isEnable(index)
        @changePaintOpacity(1)
        return

    _._drawActorInfo = (rect, a) ->
        @drawFaceWithCustomSize(a.faceName, a.faceIndex, rect.x + 4, rect.y + 2, @itemHeight() - 8)
        @drawText(a.name, rect.x + 120, rect.y + 4, 168)
    
    _._drawActorClass = (rect, a) ->
        className = $dataClasses[a.classId].name
        if KDCore.isMV()
            @changeTextColor(@crisisColor())
        else
            @changeTextColor(ColorManager.crisisColor())
        @contents.fontSize -= 8
        @drawText(className, rect.x + 132, rect.y + 44, 168)
        @contents.fontSize += 8
        @resetTextColor()

    _._drawNetworkStatus = (rect) ->
        if KDCore.isMV()
            @changeTextColor(@deathColor())
        else
            @changeTextColor(ColorManager.deathColor())
        @contents.fontSize -= 8
        @drawText('Picked', rect.x + 270, rect.y + 4)
        @contents.fontSize += 8
        @resetTextColor()
        return

    return
# ■ END Window_NetworkActorsList.coffee
#---------------------------------------------------------------------------