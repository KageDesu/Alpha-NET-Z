// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

if(!Imported.Alpha_Core) {
    alert("Alpha NETZ require Alpha_@Core plugin!");
}

var ANET = {};
ANET.Version = 0.1;

// * Данный символ переопределяется в Z_TestScripts_TEST как dev
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