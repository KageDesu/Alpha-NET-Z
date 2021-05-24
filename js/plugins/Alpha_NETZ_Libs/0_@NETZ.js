// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

var ANET = {};
ANET.Version = 50; // 0.5.0
ANET.ServerRev = 111; // * Необходимая ревизия сервера

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
