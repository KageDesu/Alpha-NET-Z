var Imported = Imported || {};
Imported.AlphaNETZ = true;

var ANET = {};
ANET.Version = 0.1;

// * Данный символ переопределяется в Z_TestScripts_TEST как dev
ANET._define = 'build'; // * По умолчанию -> сборка

ANET.LIBS = {};

ANET.register = function (library) {
    this.LIBS[library.name] = library;
};

ANET.isDEV = function () {
    return ANET._define == 'dev';
};

// ------------------------- MAIN MODULES ---------------------------------
function Network() {
    throw new Error('This is a static class');
}

function NetPartyManager() {
    throw new Error('This is a static class');
}

function NetWorldManager() {
    throw new Error('This is a static class');
}

// -------------------------------------------------------------------------
