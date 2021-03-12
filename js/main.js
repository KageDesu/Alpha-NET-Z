//=============================================================================
// main.js v1.2.0
//=============================================================================

const scriptUrls = [
     "js/libs/pixi.js",
     "js/libs/pako.min.js",
     "js/libs/localforage.min.js",
     "js/libs/effekseer.min.js",
     "js/libs/vorbisdecoder.js",
     "js/rmmz_core.js",
     "js/rmmz_managers.js",
     "js/rmmz_objects.js",
     "js/rmmz_scenes.js",
     "js/rmmz_sprites.js",
     "js/rmmz_windows.js",
     "js/plugins.js"
,"js/plugins/Alpha_NETZ_Libs/@@_Alpha_@Core_TEST.js"
,"js/plugins/Alpha_NETZ_Libs/0_@NETZ.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_ANNetwork.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_ANSystem.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_ANVersionDiff.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_DevSymbol_TEST.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_HUIManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_KCoreExt.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_NetMessage.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_NetPlayerDataWrapper.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_NetRoomDataWrapper.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_NetworkClientHandler.js"
,"js/plugins/Alpha_NETZ_Libs/2_HUIEngine/1_Notyf.min.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/1_Tests_TEST.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/2_ANGameManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/2_DataObserver.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/2_NetClientMethodsManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/3_ANBattleManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/3_ANInterpreterManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/3_ANMapManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/3_ANPlayersManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/3_ANSyncDataManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/ANETCommon.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/BattleManager_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/BattleManager_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/ConfigManager_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Action_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_ActionResult_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_ActionResult_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Actor_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Actor_AN.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Actor_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Actors_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Battler_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Battler_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_BattlerBase_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_BattlerBase_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_CharacterBase_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_CharacterBase_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Enemy_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Enemy_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Event_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Event_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Followers_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Interpreter_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Interpreter_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Map_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Map_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Message_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Message_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Party_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Party_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Player_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Player_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Switches_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Switches_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Temp_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Temp_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Troop_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Unit_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Variables_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Game_Variables_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/NETCharacter.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/NETCharactersGroup.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/NetMessages.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/ParamsManager.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/PluginCommands.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Base_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Base_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Battle_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Battle_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Boot_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Equip_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Map_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Map_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_MenuBase_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_NetworkGameMenu_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_NetworkGameMenu_1.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_NetworkGameMenu_2.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_NetworkRoom.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_NetworkRoomsList.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_NetworkSettings.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Skill_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Status_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Title_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Scene_Title_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/SceneManager_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Sprite_Character_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Sprite_Character_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Sprite_Gauge_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Sprite_PlayerNetworkStatus.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Spriteset_Map_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Spriteset_Map_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_BattleLog_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_BattleLog_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_MenuCommand_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_MenuStatus_@.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_MenuStatus_N.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_NetworkActorsList.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_NetworkGameMenu.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_NetworkRoomCommands.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_NetworkRoomPlayersList.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_NetworkRoomsList.js"
,"js/plugins/Alpha_NETZ_Libs/_CFCompiled/Window_TitleCommand_@.js"
];
const effekseerWasmUrl = "js/libs/effekseer.wasm";

class Main {
    constructor() {
        this.xhrSucceeded = false;
        this.loadCount = 0;
        this.error = null;
    }

    run() {
        this.showLoadingSpinner();
        this.testXhr();
        this.loadMainScripts();
    }

    showLoadingSpinner() {
        const loadingSpinner = document.createElement("div");
        const loadingSpinnerImage = document.createElement("div");
        loadingSpinner.id = "loadingSpinner";
        loadingSpinnerImage.id = "loadingSpinnerImage";
        loadingSpinner.appendChild(loadingSpinnerImage);
        document.body.appendChild(loadingSpinner);
    }

    eraseLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
            document.body.removeChild(loadingSpinner);
        }
    }

    testXhr() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", document.currentScript.src);
        xhr.onload = () => (this.xhrSucceeded = true);
        xhr.send();
    }

    loadMainScripts() {
        for (const url of scriptUrls) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.async = false;
            script.defer = true;
            script.onload = this.onScriptLoad.bind(this);
            script.onerror = this.onScriptError.bind(this);
            script._url = url;
            document.body.appendChild(script);
        }
        this.numScripts = scriptUrls.length;
        window.addEventListener("load", this.onWindowLoad.bind(this));
        window.addEventListener("error", this.onWindowError.bind(this));
    }

    onScriptLoad() {
        if (++this.loadCount === this.numScripts) {
            PluginManager.setup($plugins);
        }
    }

    onScriptError(e) {
        this.printError("Failed to load", e.target._url);
    }

    printError(name, message) {
        this.eraseLoadingSpinner();
        if (!document.getElementById("errorPrinter")) {
            const errorPrinter = document.createElement("div");
            errorPrinter.id = "errorPrinter";
            errorPrinter.innerHTML = this.makeErrorHtml(name, message);
            document.body.appendChild(errorPrinter);
        }
    }

    makeErrorHtml(name, message) {
        const nameDiv = document.createElement("div");
        const messageDiv = document.createElement("div");
        nameDiv.id = "errorName";
        messageDiv.id = "errorMessage";
        nameDiv.innerHTML = name;
        messageDiv.innerHTML = message;
        return nameDiv.outerHTML + messageDiv.outerHTML;
    }

    onWindowLoad() {
        if (!this.xhrSucceeded) {
            const message = "Your browser does not allow to read local files.";
            this.printError("Error", message);
        } else if (this.isPathRandomized()) {
            const message = "Please move the Game.app to a different folder.";
            this.printError("Error", message);
        } else if (this.error) {
            this.printError(this.error.name, this.error.message);
        } else {
            this.initEffekseerRuntime();
        }
    }

    onWindowError(event) {
        if (!this.error) {
            this.error = event.error;
        }
    }

    isPathRandomized() {
        // [Note] We cannot save the game properly when Gatekeeper Path
        //   Randomization is in effect.
        return (
            Utils.isNwjs() &&
            process.mainModule.filename.startsWith("/private/var")
        );
    }

    initEffekseerRuntime() {
        const onLoad = this.onEffekseerLoad.bind(this);
        const onError = this.onEffekseerError.bind(this);
        effekseer.initRuntime(effekseerWasmUrl, onLoad, onError);
    }

    onEffekseerLoad() {
        this.eraseLoadingSpinner();
        SceneManager.run(Scene_Boot);
    }

    onEffekseerError() {
        this.printError("Failed to load", effekseerWasmUrl);
    }
}

const main = new Main();
main.run();

//-----------------------------------------------------------------------------




































