/*:
 * @target MZ
 * @plugindesc Developer Tools
 * @author Pheonix KageDesu
 *
 * @help
 *
*/

"use strict";

(function(){

//?DEFINE FOR DEV LOG
// * Если этого символа нет, то KDCore.DevLog будет скрытым (по умолчанию)
window.DEV = {};



//*SKIP TITLE

(function () {

    //$[OVER]
    /*Scene_Boot.prototype.startNormalGame = function () {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
        "PROJECT USE XDEV".p();
    };*/

})();


//*UPDATE IN BROWSER ALWAYS

(function(){
    
    //$[OVER]
    SceneManager.isGameActive = function () {
        return true;
    };

})();


//*SHOW CONSOLE ON GAME START

(function(){
    
    //@[ALIAS]
    const _SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        _SceneManager_run.call(this, sceneClass);
        this.showConsole();
    };

    //?NEW
    SceneManager.showConsole = function() {
        if (Utils.isNwjs()) {
            nw.Window.get().showDevTools();
            window.focus();
        }
    };

})();


(function(){
    /////////////////////////////////////////////////////////////////////////////
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ EvMsg.js
    //╒═════════════════════════════════════════════════════════════════════════╛
    /////////////////////////////////////////////////////////////////////////////
    //=============================================================================
    //EVENT MESSAGES
    //=============================================================================
    (function () {

        var FONT_NAME = 'Arial';
        var FONT_SIZE = 16;

        var EventMessages = {
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
            if(name[0] == 'E' && name[1] == 'V') {
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
        //END Sprite_Character_Text
        //------------------------------------------------------------------------------
    })();
})();
// Generated by CoffeeScript 2.5.1
// * DevLog
//------------------------------------------------------------------------------
var PHDevLog;

PHDevLog = class PHDevLog {
  constructor(prefix = "") {
    this.prefix = prefix;
    this._isShow = typeof DEV !== 'undefined';
    this._color = "#FFFFFF";
    this._backColor = "#000000";
  }

  on() {
    this._isShow = true;
    return this;
  }

  off() {
    this._isShow = false;
    return this;
  }

  setColor(color) {
    this._color = color;
    return this;
  }

  setBackColor(backColor) {
    this._backColor = backColor;
    return this;
  }

  setColors(color, backColor) {
    this.setColor(color);
    this.setBackColor(backColor);
    return this;
  }

  p(text) {
    if (!this._isShow) {
      return;
    }
    if (text == null) {
      console.log("");
    }
    this._printText(text);
  }

  _printText(text) {
    text = this.prefix + " : " + text;
    return this._printTextWithColors(text);
  }

  _printTextWithColors(text) {
    var args;
    args = ['%c' + text, `color: ${this._color} ; background: ${this._backColor};`];
    return window.console.log.apply(console, args);
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ DevExt.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var __TMP_LOG__;
  __TMP_LOG__ = null;
  String.prototype.LOG = function() {
    if (__TMP_LOG__ === null) {
      __TMP_LOG__ = new PHDevLog("XDEV");
      __TMP_LOG__.setColors('#F9F9F9', '#1A1A1A');
    }
    __TMP_LOG__.p(this);
  };
  Number.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Array.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Boolean.prototype.LOG = function() {
    return this.toString().LOG();
  };
  String.prototype.P = function() {
    return this.LOG();
  };
  String.prototype.p = function(additionText) {
    var str;
    if (additionText != null) {
      str = this + " : " + additionText;
      return str.LOG();
    } else {
      return this.LOG();
    }
  };
})();

// ■ END DevExt.coffee
//---------------------------------------------------------------------------

})();
