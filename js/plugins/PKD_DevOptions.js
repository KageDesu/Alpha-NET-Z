//=============================================================================
// PKD_DevOptions.js
//=============================================================================
// [Update History]
// v1.0.1 (17.03.2021) - fix show console option
// v1.0 (15.03.2021) - release

/*:
 * @plugindesc v1.0.1 - Helpful options for developing and testing game
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/dev-options/
 *
 * @help
 * [Description]
 * Plugin have some helpful options for developing and testing game
 * and allows you see Events names in game
 *
 * -------------------------
 * [Usage]
 * Plugin not have script calls or commands.
 * All available dev. options you can find in plugin paramters
 * (Better turn OFF this plugin before release and deploy game)
 * 
 * ------------------------
 * [Terms of Use]
 * See at plugin web page
 *
 * [Help]
 * https://kdworkshop.net/discord-server/
 *
 * [Support Author]
 * https://www.patreon.com/KageDesu
 *
 * 
 * @param skipTitle
 * @text Skip Title?
 * @type boolean
 * @on Skip
 * @off No
 * @desc Skip title screen and starts new game?
 * @default true
 * 
 * @param noPlayTest
 * @text No PlayTest mode?
 * @type boolean
 * @on Cancel PlayTest
 * @off Keep PlayTest
 * @desc Force the game to be out of PlayTest mode when play testing
 * @default false
 * 
 * @param console
 * @text Show Console?
 * @type boolean
 * @on Show
 * @off No
 * @desc Open development console with game?
 * @default false
 * 
 * @param focusGame
 * @text Require Foces?
 * @type boolean
 * @on Require
 * @off No
 * @desc Require the game to be always focused? If the game isn't focused (in active window), it will pause
 * @default true
 * 
 * @param drawEventsNames
 * @text Draw Events Names?
 * @type boolean
 * @on Yes, draw
 * @off No
 * @desc If true - if Event have own name (different that EV...) you will see name above event in game
 * @default true
 */

(function () {

    // * Load parameters
    let parameters = PluginManager.parameters('PKD_DevOptions');
    let PIsSkipTitle = eval(parameters.skipTitle || 'true');
    let PIsNoPlayTest = eval(parameters.noPlayTest || 'false');
    let PIsShowConsole = eval(parameters.console || 'false');
    let PIsFocusGame = eval(parameters.focusGame || 'true');
    let PIsDrawEvNames = eval(parameters.drawEventsNames || 'true');

    // * SKIP TITLE
    (function () {
        if (!PIsSkipTitle) return;

        //$[OVER]
        Scene_Boot.prototype.startNormalGame = function () {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
        };
    })();

    // * NO PLAY TEST
    (function () {
        if (!PIsNoPlayTest) return;

        //$[OVER]
        Game_Temp.prototype.isPlaytest = function () {
            return false;
        };
    })();

    // * FORCE FOCUS
    (function () {
        if (!PIsFocusGame) return;

        //$[OVER]
        SceneManager.isGameActive = function () {
            return true;
        };
    })();

    // * SHOW CONSOLE ON GAME START
    (function () {
        if (!PIsShowConsole) return;

        //@[ALIAS]
        const _SceneManager_run = SceneManager.run;
        SceneManager.run = function (sceneClass) {
            _SceneManager_run.call(this, sceneClass);
            this.showConsole();
        };
        //?NEW
        SceneManager.showConsole = function () {
            if (Utils.isNwjs()) {
                nw.Window.get().showDevTools();
                window.focus();
            }
        };
    })();

    // * DRAW EVENTS NAMES
    (function () {

        let FONT_NAME = 'Arial';
        let FONT_SIZE = 15;

        let EventMessages = {
            structAlias: {
                Game_CharacterBase: {
                    initialize: Game_CharacterBase.prototype.initialize
                },
                Game_Event: {
                    setupPageSettings: Game_Event.prototype.setupPageSettings,
                    initialize: Game_Event.prototype.initialize
                },
                Sprite_Character: {
                    initialize: Sprite_Character.prototype.initialize,
                    update: Sprite_Character.prototype.update
                }
            }
        };

        Game_CharacterBase.prototype.initialize = function () {
            EventMessages.structAlias.Game_CharacterBase.initialize.apply(this);
            this.eText = null;
        };

        Game_Event.prototype.initialize = function (a, b) {
            EventMessages.structAlias.Game_Event.initialize.call(this, a, b);
            let name = this.event().name;
            if (name[0] == 'E' && name[1] == 'V') {
                // * Default Name, nothing
            } else {
                this.eText = name;
            }
        };

        Game_Event.prototype.setupPageSettings = function () {
            EventMessages.structAlias.Game_Event.setupPageSettings.apply(this);
            if (this.list != null) {
                var lst = this.page().list;
                for (var i = 0; i < lst.length; i++) {
                    var element = lst[i];
                    if (element.code == 108) {
                        var comment = element.parameters[0];
                        if (comment.indexOf("[@") >= 0) {
                            var regular = /\[@([^>]*)\]/;
                            var match = regular.exec(comment);
                            if (match) {
                                this.eText = match[1];
                            }
                            break;
                        }
                    }
                }
            }
        };

        Sprite_Character.prototype.initialize = function (character) {
            EventMessages.structAlias.Sprite_Character.initialize.apply(this, arguments);
            this._charText = "";
            this._eventText = null; //Sprite
            this.createEventText();
        };

        Sprite_Character.prototype.update = function () {
            EventMessages.structAlias.Sprite_Character.update.apply(this);
            this.createEventText();
            this.updateEventText();
        };

        //NEW
        Sprite_Character.prototype.createEventText = function () {
            if (!this._character) return;
            if (!this._character.eText) return;
            if (this._character.eText == this._charText) return;

            if (this._eventText != null) {
                this.removeChild(this._eventText);
            }

            this._eventText = new Sprite_Character_Text(this._character, this);
            this._charText = this._character.eText;
            this.addChild(this._eventText);
        };

        //NEW
        Sprite_Character.prototype.updateEventText = function () {
            if (this._eventText == null) return;
            this._eventText.updatePosition(this._character, this);
        };

        //------------------------------------------------------------------------------
        //Sprite_Character_Text
        class Sprite_Character_Text extends Sprite {
            constructor(character, sprite) {
                super();
                var textSize = character.eText || "";
                var w = 48 + ((FONT_SIZE / 2) * textSize.length);
                if (w < 48) w = 48;
                this.bitmap = new Bitmap(w, 48);
                this.bitmap.addLoadListener(function () {
                    this.bitmap.fontFace = FONT_NAME;
                    this.bitmap.fontSize = FONT_SIZE;
                    this.bitmap.drawText(textSize, 0, 0, this.width, this.height, 'center');
                }.bind(this));
                this.updatePosition(character, sprite);
            }

            updatePosition(character, sprite) {
                if (character._erased) {
                    this.visible = false;
                    return;
                }
                this.x = 0 - this.width / 2;
                this.y = 0 - (sprite.height + this.height);
                this.z = character.screenZ();
                this.visible = character.isTransparent() ? false : true;
                this.opacity = character._opacity;
            }
        }

    })();

})();