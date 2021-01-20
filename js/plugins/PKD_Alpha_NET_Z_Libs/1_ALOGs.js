// * Вывод текста
ANET.print = function (message) {
    if (ANET._warningLog == undefined) {
        ANET._warningLog = new KDCore.DevLog('Alpha NET Z');
        ANET._warningLog.setColors(KDCore.Color.ORANGE, KDCore.Color.BLACK.getLightestColor(60));
        ANET._warningLog.on();
    }
    if (message) {
        ANET._warningLog.p(message);
    }
};

// * Просто предупреждение в консоль
ANET.warning = function (message, error = null) {
    console.warn("Alpha NET Z warning!");
    KDCore.warning(message, error);
};

// * Критическая ошибка -> завершение приложения
ANET.criticalError = function (error, message) {
    ANET.error(null, message);
    SceneManager.catchException(error);
};

ANET._printPluginInfo = function () {
    console.error("Using Alpha NET Z [Version: " + ANET.Version + " ; on MZ  " + Utils.RPGMAKER_VERSION + "]");
};

// * Ошибка с предупреждением пользователя
ANET.error = function (error, message) {
    if (ANET._errorLog == undefined) {
        ANET._errorLog = new KDCore.DevLog('Alpha NET Z Error');
        ANET._errorLog.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(225));
        ANET._errorLog.on();
    }
    console.error(error);
    if (message) {
        ANET._errorLog.p(message);
        ANET.alert(message);
    }
};

// * Показать окошко Alert с сообщением
ANET.alert = function (message) {
    if (message) {
        alert(message);
    }
};

// * Лог для разработки
ANET.log = function (message, obj) {
    if (!ANET.isDEV()) {
        return;
    }
    if (ANET._devLog == undefined) {
        ANET._devLog = new KDCore.DevLog('ANET');
        ANET._devLog.setColors(KDCore.Color.FromHex("#04BED9"), KDCore.Color.BLACK.getLightestColor(30));
        ANET._devLog.on();
    }
    if (message) {
        if (!obj)
            ANET._devLog.p(message);
        else
            ANET._devLog.p(obj.constructor.name + " : " + message);
    }
};