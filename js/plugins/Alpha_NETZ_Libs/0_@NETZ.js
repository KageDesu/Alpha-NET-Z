// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

var ANET = {};
ANET.Version = 10; // 0.1.0
ANET.ServerRev = 100; // * Необходимая ревизия сервера

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
ANET._define = 'build'; // * По умолчанию -> сборка

ANET.link = function (library) {
    this[library.name] = library;
};

ANET.isDEV = function () {
    return ANET._define == 'dev';
};

ANET.isPro = function() {
    return true;
};

ANET.w = (e) => AA.w(e);

if(!Imported.Alpha_Core) {

    if(ANET.isDEV()) {
        console.warn("Alpha NETZ require Alpha_@Core plugin!");
    } else
        alert("Alpha NETZ require Alpha_@Core plugin!");
}



BattleManager.processEscape = function() {
    //$gameParty.performEscape();
    SoundManager.playEscape();
    const success = true;//this._preemptive || Math.random() < this._escapeRatio;
    if (success) {
        this.onEscapeSuccess();
    } else {
        this.onEscapeFailure();
    }
    return success;
};

//@[ALIAS]
var _alias_Game_Actor_performEscape = Game_Actor.prototype.performEscape;
Game_Actor.prototype.performEscape = function () {
    if($gameParty.leader() == this)
        _alias_Game_Actor_performEscape.call(this);
};

//@[ALIAS]
var _alias_Game_Actor_requestMotion = Game_Actor.prototype.requestMotion;
Game_Actor.prototype.requestMotion = function (motionName) {
    if(motionName == "escape") {
        if($gameParty.leader() == this)
            _alias_Game_Actor_requestMotion.call(this, motionName);
    } else
        _alias_Game_Actor_requestMotion.call(this, motionName);
    
};

Sprite_Actor.prototype.retreat = function() {
    if($gameParty.leader() == this._battler)
        this.startMove(300, 0, 30);
};

// * Инвентари разные, проверяется есть ли предмет в инвентаре
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    return this.meetsUsableItemConditions(item); //&& $gameParty.hasItem(item);
};


// * Если игрок в бою, то его координаты не видно (когда другой игрок переходит на карту)
// * Self.switch - all world virtual не работает!
