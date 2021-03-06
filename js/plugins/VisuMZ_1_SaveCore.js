//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.03] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * * Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * * Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * * Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * * Global Switches and Variables that span across all saves and new games.
 * * Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * * Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * * Change up how the Save Menu appears with various save styles.
 * * Add descriptions and pictures to the save files.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Autosave Plugin Commands ===
 * 
 * ---
 *
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *   - \V[x], \N[x], \P[x] are save local.
 *   - Other text codes will draw data from the currently active game.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 * 
 *   Start Enabled?:
 *   - Start with autosave enabled?
 *   - Requires Database => System 1 => [x] Enable Autosave
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   * Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: November 29, 2020
 * * Bug Fixes!
 * ** Displayed month should now show the correct numeric value.
 *    Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * * Documentation Update!
 * ** The Plugin Command 'Save: Set Description' now has updated documentation
 *    for the text codes that are parsed on the local level.
 * * Feature Update!
 * ** The Plugin Command 'Save: Set Description' will now parse text code
 *    data for \V[x], \N[x], \P[x] on a local save file level. Feature updated
 *    by Yanfly.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixes!
 * ** Disabling confirmation windows no longer cause crashes.
 *    Fix made by Yanfly.
 * ** Plugin Commands for for setting descriptions and save images work despite
 *    save settings found in the database. Fix made by Yanfly.
 * ** Save Core no longer crashes when going to the Save/Load scenes without
 *    the Core Engine enabled.
 * ** Single and Locked save styles no longer crash the game when loading.
 *    Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here. 
 * Text codes supported. \V[x], \N[x], \P[x] are save local.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:num":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param StartEnabled:eval
 * @text Start Enabled?
 * @parent General
 * @type boolean
 * @on Start Enabled
 * @off Start Disabled
 * @desc Start with autosave enabled?
 * Requires Database => System 1 => [x] Enable Autosave
 * @default true
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x1dfe=['onLoadFailure','Default','drawLargeStyleFileData','create','inBattle','isAutosaveConfirmWindowEnabled','partyMemberName','vertical','executeAutosave','Scene_Load_onLoadSuccess','MakeSavefileInfoJS','Scene_Save_executeSave','getScreenPosition','isEventTest','AddOption','SvBattlerWidth','mainCommandWidth','_pickLockedSaveSlot','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','yfCuR','ListFileDataJS','MaxSaveFiles','SavePicture','GlobalSwitches','value','drawSvBattlerSprites','fileDirectoryPath','height','locked','large','tYSbi','ZXBBU','svbattlers','switches','terminate','LargeRows','resetFontSettings','isLocalMode','makeSavefileInfo','goto','NwRnT','actorName','ConfigManager_makeData','createSaveConfirmationWindow','playBuzzer','drawVerticalStyleFileData','EVAL','svbattlersForSaveFile','BoxFileDataJS','VocabLockedSaveSlot','addChild','parameters','AdjustRect','Scene_Map_onTransferEnd','setWordWrap','FUNC','setSetSuccess','Autosave','latestSave','SaveCore','forceAutosave','forageTestKey','SaveConfirm','mNZqn','return\x200','Scene_Boot_onDatabaseLoaded','Game_System_initialize','STRUCT','min','_loadSuccess','file','fmLci','characters','ceil','number','_bypassAutosave','itemPadding','box','STR','numVisibleRows','AutosaveOption','openness','CLarZ','Scene_Menu_commandSave','playtime','isPreviousScene','clear','AjfDJ','createContents','battle','map','pickLockedSaveSlot','faceWidth','AutosaveType','isSaveEnabled','center','setValue','floor','drawBoxStyleContents','lyuVW','exit','getHours','Game_System_savefileId','onDatabaseLoaded','menuStyle','drawContentsLoaded','AutosaveMaxCount','fadeIn','faces','process_VisuMZ_SaveCore_Switches_Variables','AutosaveForce','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','fadeOut','drawPlaytime','autosaveFailure','Filename','laqMJ','_listWindow','openSaveConfirmationWindow','gradientFillRect','pUDnr','saveMenuSvBattlerWidth','Scene_Base_onAutosaveSuccess','drawSvActor','setGlobalValue','Scene_Title_initialize','autosaveType','popScene','left','drawBoxStyleFileData','drawTitle','Settings','timestamp','file0','sRkwx','prototype','Scene_Save_onSaveFailure','process_VisuMZ_SaveCore_Settings','setFadeSpeed','SimsV','_scene','applyData','right','SaveMenu','isAutosaveCompatible','calcWindowHeight','isNwjs','currencyUnit','getMonth','description','initialize','OnAutosaveSuccessJS','call','drawFace','setMode','startNewGameLockedSave','VFQBT','drawLatestMarker','playLoad','latestSavefile','svActorHorzCells','Scene_Title_commandContinue','isAutosaveEnabled','then','globalSwitches','maxCommands','drawActorFaces','commandNewGameSaveCoreLocked','VocabAutosaveFailure','ARRAYSTR','globalVariables','max','close','battlerName','dimColor1','drawCharacter','nFwpm','windowPadding','gGPWh','Game_Switches_value','catch','executeSave','getTimestamp','getMinutes','log','Scene_Menu_create','qiudz','LargeContentsJS','both','AutosaveRequest','autosaveEnabled','updatePosition','saveCurrentSlot','autosaveSuccess','drawItem','picture','blt','TestKey','addGeneralOptions','version','savePicture','AutosaveEnable','getFullYear','_colorCache','advanced','ConfigManager_applyData','LatestText','KeyFmt','JaRWp','addLoadListener','determineAutosaveBypass','savefileIdToIndex','Scene_Title_terminate','drawCenteredPicture','_SaveCoreSettings','commandContinueSaveCoreSingle','innerHeight','ZpKcG','itemRect','update','EgwnP','includes','Scene_Options_maxCommands','bind','drawTextEx','OnSaveFailureJS','setSavePicture','AfterBattle','BoxContentsJS','svActorVertCells','onMapLoaded','variables','onTransferEnd','current','contents','vbyJT','Scene_Save_helpWindowText','refresh','actorStyle','round','idtBx','push','NUM','contentsBack','open','single','_stored_latestSavefile','contentsOpacity','gold','#%1','face','VertContentsJS','addSaveCoreAutosaveCommand','parse','GlobalVariables','AutosaveConfirm','textSizeEx','LatestColor','AfterMenuCall','replace','saveGame','playSave','_autosaveConfirmWindow','isSaveConfirmWindowEnabled','exitMenu','shouldAutosave','makeData','autosave','ParseTextCodes','Game_Variables_setValue','Enable','saveConfirmationWindowRect','BoxRows','drawTimestamp','ARRAYSTRUCT','drawListStyleFileData','name','_fadeSpeed','DataManager_makeSavefileInfo','StartEnabled','_active','length','drawPicture','onSaveCoreSaveFailure','evAVm','helpWindowText','ListCols','Duration','BoxCols','VocabLoadFailure','changePaintOpacity','VocabSaveFailure','Scene_Base_requestAutosave','LocalMode','setupNewGame','loadFailureConfirmationWindow','VertFileDataJS','autosaveOption','drawBackground','_processingAutosave','innerWidth','OnAutosaveFailureJS','drawFileData','_success','autosaveConfirmationWindowRect','loadGame','Window_Options_addGeneralOptions','drawCurrency','SaveMenuStyle','dFLGU','drawContents','createAutosaveConfirmationWindow','split','transfer','smoothSelect','saveDescription','onLoadSuccess','updateFade','QRUSN','CDFJY','SaveCurrentSlot','onSaveSuccess','sprite','commandSave','_savefileId','Scene_Title_commandNewGame','XIuIw','onAutosaveSuccess','openAutosaveConfirmationWindow','drawCurrencyValue','onAutosaveFailure','maxCols','onSaveFailure','drawVerticalStyleContents','loadPicture','ExtensionFmt','saveStyle','closeSaveConfirmationWindow','svbattler','isBattleTest','latestSavefileId','ConvertParams','join','match','setSaveDescription','Game_Variables_value','makeSavename','textColor','savefileInfo','OnLoadFailureJS','Text','activate','ListContentsJS','drawText','Window_SavefileList_setMode','saveFailure','indexToSavefileId','width','Scene_Base_onAutosaveFailure','fadeOutAll','VertCols','Save','gameId','onSaveCoreSaveSuccess','HNACZ','addSaveCoreCommands','VragF','requestAutosave','resetWordWrap','format','LargeCols','ScreenPosition','PCnaY','battleMembers','padStart','enableAutosave','onSaveCoreLoadFailure','OnSaveSuccessJS','forageKey','registerCommand','drawActorSprites','onBeforeSave','ListRows','RequestsRequireSaveEnable','drawLargeStyleContents','drawListStyleContents','_commandWindow','VertRows','savefileId','saveSuccess','VisuMZ_1_MessageCore','removeChild','globalValue','closeAutosaveConfirmationWindow','initSaveCore','setSavefileId','JSON','optAutosave','maxBattleMembers','dimColor2','commandContinue','_saveConfirmWindow','OnLoadSuccessJS','saveMenuSpriteWidth','commandSaveLocked','activateListWindow','callMenu','isGlobal'];(function(_0x815a5c,_0xa2922d){const _0x1dfe98=function(_0xe4f0bc){while(--_0xe4f0bc){_0x815a5c['push'](_0x815a5c['shift']());}};_0x1dfe98(++_0xa2922d);}(_0x1dfe,0x166));const _0xe4f0=function(_0x815a5c,_0xa2922d){_0x815a5c=_0x815a5c-0x10b;let _0x1dfe98=_0x1dfe[_0x815a5c];return _0x1dfe98;};const _0x148973=_0xe4f0;var label='SaveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1c7bc6){const _0x3101c5=_0xe4f0;return _0x1c7bc6['status']&&_0x1c7bc6[_0x3101c5(0x1d2)][_0x3101c5(0x21a)]('['+label+']');})[0x0];VisuMZ[label][_0x148973(0x1c0)]=VisuMZ[label][_0x148973(0x1c0)]||{},VisuMZ['ConvertParams']=function(_0x42be85,_0x1cea21){const _0x191e35=_0x148973;for(const _0x40fecf in _0x1cea21){if(_0x40fecf['match'](/(.*):(.*)/i)){if(_0x191e35(0x27b)===_0x191e35(0x27b)){const _0x18b635=String(RegExp['$1']),_0x456298=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x1ef2a1,_0x2df2a2,_0xb23ed3;switch(_0x456298){case _0x191e35(0x22f):_0x1ef2a1=_0x1cea21[_0x40fecf]!==''?Number(_0x1cea21[_0x40fecf]):0x0;break;case'ARRAYNUM':_0x2df2a2=_0x1cea21[_0x40fecf]!==''?JSON['parse'](_0x1cea21[_0x40fecf]):[],_0x1ef2a1=_0x2df2a2[_0x191e35(0x197)](_0x23bb37=>Number(_0x23bb37));break;case _0x191e35(0x16b):_0x1ef2a1=_0x1cea21[_0x40fecf]!==''?eval(_0x1cea21[_0x40fecf]):null;break;case'ARRAYEVAL':_0x2df2a2=_0x1cea21[_0x40fecf]!==''?JSON[_0x191e35(0x23a)](_0x1cea21[_0x40fecf]):[],_0x1ef2a1=_0x2df2a2[_0x191e35(0x197)](_0x47cec4=>eval(_0x47cec4));break;case _0x191e35(0x131):_0x1ef2a1=_0x1cea21[_0x40fecf]!==''?JSON['parse'](_0x1cea21[_0x40fecf]):'';break;case'ARRAYJSON':_0x2df2a2=_0x1cea21[_0x40fecf]!==''?JSON['parse'](_0x1cea21[_0x40fecf]):[],_0x1ef2a1=_0x2df2a2['map'](_0x6cbe2d=>JSON['parse'](_0x6cbe2d));break;case _0x191e35(0x174):_0x1ef2a1=_0x1cea21[_0x40fecf]!==''?new Function(JSON[_0x191e35(0x23a)](_0x1cea21[_0x40fecf])):new Function(_0x191e35(0x17d));break;case'ARRAYFUNC':_0x2df2a2=_0x1cea21[_0x40fecf]!==''?JSON['parse'](_0x1cea21[_0x40fecf]):[],_0x1ef2a1=_0x2df2a2['map'](_0x4970e7=>new Function(JSON['parse'](_0x4970e7)));break;case _0x191e35(0x18b):_0x1ef2a1=_0x1cea21[_0x40fecf]!==''?String(_0x1cea21[_0x40fecf]):'';break;case _0x191e35(0x1e6):_0x2df2a2=_0x1cea21[_0x40fecf]!==''?JSON[_0x191e35(0x23a)](_0x1cea21[_0x40fecf]):[],_0x1ef2a1=_0x2df2a2[_0x191e35(0x197)](_0x91c1b3=>String(_0x91c1b3));break;case _0x191e35(0x180):_0xb23ed3=_0x1cea21[_0x40fecf]!==''?JSON[_0x191e35(0x23a)](_0x1cea21[_0x40fecf]):{},_0x42be85[_0x18b635]={},VisuMZ['ConvertParams'](_0x42be85[_0x18b635],_0xb23ed3);continue;case _0x191e35(0x24f):_0x2df2a2=_0x1cea21[_0x40fecf]!==''?JSON[_0x191e35(0x23a)](_0x1cea21[_0x40fecf]):[],_0x1ef2a1=_0x2df2a2[_0x191e35(0x197)](_0x5bca21=>VisuMZ[_0x191e35(0x292)]({},JSON[_0x191e35(0x23a)](_0x5bca21)));break;default:continue;}_0x42be85[_0x18b635]=_0x1ef2a1;}else{function _0x1b2bae(){const _0x2be13f=_0x191e35;return this[_0x2be13f(0x11a)]()[_0x2be13f(0x197)](_0x33f413=>_0x33f413['battlerName']());}}}}return _0x42be85;},(_0x55f4d=>{const _0x3f4014=_0x148973,_0x325d2d=_0x55f4d['name'];for(const _0x120177 of dependencies){if(!Imported[_0x120177]){if(_0x3f4014(0x22d)!=='idtBx'){function _0x1f947e(){const _0xf3bd1c=_0x3f4014;_0x3f7b82[_0xf3bd1c(0x1c4)][_0xf3bd1c(0x115)]['call'](this);}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3f4014(0x116)](_0x325d2d,_0x120177)),SceneManager[_0x3f4014(0x1a1)]();break;}}}const _0x1c7664=_0x55f4d['description'];if(_0x1c7664['match'](/\[Version[ ](.*?)\]/i)){const _0x27fb1b=Number(RegExp['$1']);if(_0x27fb1b!==VisuMZ[label][_0x3f4014(0x204)]){if('ZXBBU'===_0x3f4014(0x15c))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x325d2d,_0x27fb1b)),SceneManager['exit']();else{function _0x16a0a(){const _0x2adc5a=_0x3f4014,_0x18b1b3=_0xe097ed[_0x2adc5a(0x28b)](_0x53479f[_0x2adc5a(0x200)]||'');_0x18b1b3[_0x2adc5a(0x20e)](this['drawContentsLoaded'][_0x2adc5a(0x21c)](this,_0x31143e,_0xabe7f2));}}}}if(_0x1c7664[_0x3f4014(0x294)](/\[Tier[ ](\d+)\]/i)){const _0x114739=Number(RegExp['$1']);if(_0x114739<tier)alert(_0x3f4014(0x1ac)[_0x3f4014(0x116)](_0x325d2d,_0x114739,tier)),SceneManager['exit']();else{if(_0x3f4014(0x1c3)===_0x3f4014(0x228)){function _0x20effc(){const _0xb1739d=_0x3f4014;return _0x411ccd[_0xb1739d(0x178)][_0xb1739d(0x1c0)][_0xb1739d(0x23c)][_0xb1739d(0x118)];}}else tier=Math[_0x3f4014(0x1e8)](_0x114739,tier);}}VisuMZ[_0x3f4014(0x292)](VisuMZ[label]['Settings'],_0x55f4d[_0x3f4014(0x170)]);})(pluginData),PluginManager[_0x148973(0x120)](pluginData[_0x148973(0x251)],_0x148973(0x206),_0x2eebdd=>{const _0x1abb83=_0x148973;if(!DataManager[_0x1abb83(0x1cd)]())return;VisuMZ[_0x1abb83(0x292)](_0x2eebdd,_0x2eebdd);if($gameSystem)$gameSystem[_0x1abb83(0x11c)](_0x2eebdd['Enable']);}),PluginManager[_0x148973(0x120)](pluginData[_0x148973(0x251)],_0x148973(0x1fa),_0x58e2c6=>{const _0x620d1a=_0x148973;if(!DataManager[_0x620d1a(0x1cd)]()||$gameParty[_0x620d1a(0x141)]())return;SceneManager[_0x620d1a(0x1c9)][_0x620d1a(0x114)]();}),PluginManager[_0x148973(0x120)](pluginData[_0x148973(0x251)],'AutosaveExecute',_0x2c2ab0=>{const _0x516427=_0x148973;if(!DataManager[_0x516427(0x1cd)]()||$gameParty[_0x516427(0x141)]())return;SceneManager['_scene']['executeAutosave']();}),PluginManager[_0x148973(0x120)](pluginData[_0x148973(0x251)],_0x148973(0x1ab),_0x197c8b=>{const _0x78150b=_0x148973;if(!DataManager[_0x78150b(0x1cd)]()||$gameParty[_0x78150b(0x141)]())return;SceneManager[_0x78150b(0x1c9)][_0x78150b(0x179)]();}),PluginManager[_0x148973(0x120)](pluginData['name'],_0x148973(0x27d),_0x2792dd=>{const _0x496fa2=_0x148973;SceneManager[_0x496fa2(0x1c9)][_0x496fa2(0x1fd)]();}),PluginManager['registerCommand'](pluginData[_0x148973(0x251)],'SaveDescription',_0x116121=>{const _0x17b671=_0x148973;VisuMZ[_0x17b671(0x292)](_0x116121,_0x116121);if($gameSystem)$gameSystem['setSaveDescription'](_0x116121[_0x17b671(0x29b)]);}),PluginManager[_0x148973(0x120)](pluginData['name'],_0x148973(0x153),_0x59bce9=>{const _0x3e8875=_0x148973;VisuMZ['ConvertParams'](_0x59bce9,_0x59bce9);if($gameSystem)$gameSystem[_0x3e8875(0x21f)](_0x59bce9['Filename']);}),VisuMZ[_0x148973(0x178)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x148973(0x1c4)][_0x148973(0x1a4)],Scene_Boot[_0x148973(0x1c4)][_0x148973(0x1a4)]=function(){const _0x626712=_0x148973;VisuMZ['SaveCore'][_0x626712(0x17e)]['call'](this),this['process_VisuMZ_SaveCore_Settings'](),this[_0x626712(0x1aa)]();},Scene_Boot['prototype'][_0x148973(0x1c6)]=function(){const _0x202331=_0x148973;if(StorageManager[_0x202331(0x28d)]()===_0x202331(0x232))$dataSystem[_0x202331(0x132)]=!![];},VisuMZ[_0x148973(0x154)]=[],VisuMZ['GlobalVariables']=[],Scene_Boot['prototype'][_0x148973(0x1aa)]=function(){const _0xdb197a=_0x148973;for(let _0x437313=0x1;_0x437313<$dataSystem[_0xdb197a(0x15e)][_0xdb197a(0x256)];_0x437313++){if(_0xdb197a(0x165)!==_0xdb197a(0x165)){function _0x2177fc(){const _0x2ad03c=_0xdb197a;while(_0x1eec7a[_0x2ad03c(0x294)](/\\V\[(\d+)\]/gi)){_0xc48937=_0x49c5cc[_0x2ad03c(0x240)](/\\V\[(\d+)\]/gi,(_0x49330f,_0x35d5de)=>_0x3ae554['value'](_0x1c36af(_0x35d5de)));}while(_0x448327['match'](/\\N\[(\d+)\]/gi)){_0xd984ca=_0x3665d6['replace'](/\\N\[(\d+)\]/gi,(_0x2c95a0,_0x5ec8f6)=>_0x32abc6['prototype'][_0x2ad03c(0x166)](_0x2ae059(_0x5ec8f6)));}while(_0x20de1e[_0x2ad03c(0x294)](/\\P\[(\d+)\]/gi)){_0x2736ed=_0x1913e2[_0x2ad03c(0x240)](/\\P\[(\d+)\]/gi,(_0x232a95,_0x436c5f)=>_0x1f56cd[_0x2ad03c(0x1c4)][_0x2ad03c(0x143)](_0x49622c(_0x436c5f)));}return _0xc4018;}}else{if($dataSystem['switches'][_0x437313][_0xdb197a(0x294)](/<GLOBAL>/i))VisuMZ['GlobalSwitches'][_0xdb197a(0x22e)](_0x437313);}}for(let _0x3b23b1=0x1;_0x3b23b1<$dataSystem[_0xdb197a(0x224)][_0xdb197a(0x256)];_0x3b23b1++){if(_0xdb197a(0x111)!==_0xdb197a(0x17c)){if($dataSystem[_0xdb197a(0x224)][_0x3b23b1][_0xdb197a(0x294)](/<GLOBAL>/i))VisuMZ[_0xdb197a(0x23b)][_0xdb197a(0x22e)](_0x3b23b1);}else{function _0x115647(){const _0x2c3587=_0xdb197a;if(_0x216cbc['timestamp']){_0x31e785=_0x494981||_0x2c3587(0x1bd);const _0x3f998f=this['getTimestamp'](_0x55ef17);this['drawText'](_0x3f998f,_0x411911,_0x5cef98,_0x3c62f5,_0x5bcac9);}}}}},DataManager[_0x148973(0x1cd)]=function(){const _0x408158=_0x148973;return!DataManager['isBattleTest']()&&!DataManager['isEventTest']()&&$dataSystem[_0x408158(0x132)];},DataManager['maxSavefiles']=function(){const _0x50a274=_0x148973;if(StorageManager['saveStyle']()==='single')return 0x1;let _0x53cdd1=VisuMZ[_0x50a274(0x178)][_0x50a274(0x1c0)][_0x50a274(0x10e)][_0x50a274(0x1a7)]?0x0:0x1;return VisuMZ['SaveCore']['Settings']['Save'][_0x50a274(0x152)]+_0x53cdd1;},DataManager[_0x148973(0x297)]=function(_0x2db7c0){const _0x3f8198=_0x148973,_0x33a4f4=VisuMZ['SaveCore'][_0x3f8198(0x1c0)][_0x3f8198(0x10e)]['FilenameFmt'];return _0x33a4f4[_0x3f8198(0x116)](_0x2db7c0);},VisuMZ[_0x148973(0x178)][_0x148973(0x253)]=DataManager[_0x148973(0x163)],DataManager[_0x148973(0x163)]=function(){const _0x4089b6=_0x148973,_0x5b3fd5=VisuMZ['SaveCore']['DataManager_makeSavefileInfo'][_0x4089b6(0x1d5)](this);return VisuMZ[_0x4089b6(0x178)][_0x4089b6(0x1c0)]['SaveMenu'][_0x4089b6(0x147)]['call'](this,_0x5b3fd5);},ConfigManager[_0x148973(0x248)]=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)][_0x148973(0x18d)][_0x148973(0x13e)],ConfigManager[_0x148973(0x1e1)]=[],ConfigManager[_0x148973(0x1e7)]=[],VisuMZ[_0x148973(0x178)]['ConfigManager_makeData']=ConfigManager[_0x148973(0x247)],ConfigManager[_0x148973(0x247)]=function(){const _0x480a49=_0x148973,_0x19971c=VisuMZ['SaveCore'][_0x480a49(0x167)][_0x480a49(0x1d5)](this);return _0x19971c['autosave']=this[_0x480a49(0x248)]||VisuMZ['SaveCore'][_0x480a49(0x1c0)][_0x480a49(0x18d)][_0x480a49(0x13e)],_0x19971c[_0x480a49(0x1e1)]=this[_0x480a49(0x1e1)]||[],_0x19971c[_0x480a49(0x1e7)]=this[_0x480a49(0x1e7)]||[],_0x19971c;},VisuMZ[_0x148973(0x178)]['ConfigManager_applyData']=ConfigManager[_0x148973(0x1ca)],ConfigManager[_0x148973(0x1ca)]=function(_0x32eebe){const _0x38bdac=_0x148973;VisuMZ[_0x38bdac(0x178)][_0x38bdac(0x20a)][_0x38bdac(0x1d5)](this,_0x32eebe),this['autosave']=_0x32eebe[_0x38bdac(0x248)]!==undefined?_0x32eebe[_0x38bdac(0x248)]:VisuMZ['SaveCore']['Settings'][_0x38bdac(0x18d)][_0x38bdac(0x13e)],this[_0x38bdac(0x1e1)]=_0x32eebe[_0x38bdac(0x1e1)]||[],this[_0x38bdac(0x1e7)]=_0x32eebe['globalVariables']||[];},StorageManager[_0x148973(0x162)]=function(){const _0x266ba9=_0x148973;if(Utils[_0x266ba9(0x1cf)]()){if(_0x266ba9(0x20d)!==_0x266ba9(0x20d)){function _0x4defc5(){const _0xcbfe5c=_0x266ba9;this[_0xcbfe5c(0x20f)](_0xcbfe5c(0x276));}}else return VisuMZ[_0x266ba9(0x178)]['Settings'][_0x266ba9(0x10e)][_0x266ba9(0x262)];}else{if(_0x266ba9(0x1b5)===_0x266ba9(0x150)){function _0x3c9f33(){const _0x1f8dd3=_0x266ba9;this[_0x1f8dd3(0x246)]()&&this[_0x1f8dd3(0x20f)](_0x1f8dd3(0x276)),_0x4396d1['SaveCore'][_0x1f8dd3(0x172)]['call'](this);}}else return![];}},StorageManager['filePath']=function(_0x3474bb){const _0x4b3812=_0x148973,_0x34c1e1=this[_0x4b3812(0x157)](),_0x446123=VisuMZ[_0x4b3812(0x178)][_0x4b3812(0x1c0)][_0x4b3812(0x10e)][_0x4b3812(0x28c)];return _0x34c1e1+_0x446123[_0x4b3812(0x116)](_0x3474bb);},StorageManager[_0x148973(0x11f)]=function(_0x5d01a4){const _0x14bd47=_0x148973,_0x2c28d8=$dataSystem[_0x14bd47(0x209)][_0x14bd47(0x10f)],_0x357983=VisuMZ[_0x14bd47(0x178)][_0x14bd47(0x1c0)][_0x14bd47(0x10e)][_0x14bd47(0x20c)];return _0x357983[_0x14bd47(0x116)](_0x2c28d8,_0x5d01a4);},StorageManager[_0x148973(0x17a)]=function(){const _0x58c859=_0x148973;return VisuMZ[_0x58c859(0x178)][_0x58c859(0x1c0)][_0x58c859(0x10e)][_0x58c859(0x202)];},StorageManager[_0x148973(0x28d)]=function(){const _0x34797d=_0x148973;return VisuMZ[_0x34797d(0x178)][_0x34797d(0x1c0)][_0x34797d(0x10e)]['SaveStyle'];},StorageManager[_0x148973(0x1bb)]=function(){const _0x545e5b=_0x148973;return this[_0x545e5b(0x28d)]()===_0x545e5b(0x232)?_0x545e5b(0x1c2):VisuMZ[_0x545e5b(0x178)]['Settings'][_0x545e5b(0x176)][_0x545e5b(0x19a)];},TextManager[_0x148973(0x198)]=VisuMZ['SaveCore'][_0x148973(0x1c0)]['Save'][_0x148973(0x16e)],TextManager['saveSuccess']=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)][_0x148973(0x17b)]['VocabSaveSuccess'],TextManager[_0x148973(0x2a0)]=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)]['SaveConfirm'][_0x148973(0x260)],TextManager['loadFailure']=VisuMZ['SaveCore'][_0x148973(0x1c0)]['SaveConfirm'][_0x148973(0x25e)],TextManager[_0x148973(0x266)]=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)][_0x148973(0x18d)]['Name'],TextManager[_0x148973(0x1fe)]=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)][_0x148973(0x23c)]['VocabAutosaveSuccess'],TextManager['autosaveFailure']=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)][_0x148973(0x23c)][_0x148973(0x1e5)],TextManager[_0x148973(0x177)]=VisuMZ['SaveCore']['Settings']['SaveMenu'][_0x148973(0x20b)],ColorManager[_0x148973(0x1dc)]=function(){const _0x3f8a71=_0x148973,_0x131ab8=_0x3f8a71(0x233);this[_0x3f8a71(0x208)]=this[_0x3f8a71(0x208)]||{};if(this['_colorCache'][_0x131ab8])return this['_colorCache'][_0x131ab8];const _0x56e5b6=VisuMZ[_0x3f8a71(0x178)][_0x3f8a71(0x1c0)]['SaveMenu'][_0x3f8a71(0x23e)];return this['getColorDataFromPluginParameters'](_0x131ab8,_0x56e5b6);},ColorManager['getColorDataFromPluginParameters']=function(_0x2ee04e,_0x385585){const _0x70087c=_0x148973;return _0x385585=String(_0x385585),this[_0x70087c(0x208)]=this[_0x70087c(0x208)]||{},_0x385585[_0x70087c(0x294)](/#(.*)/i)?this[_0x70087c(0x208)][_0x2ee04e]=_0x70087c(0x236)[_0x70087c(0x116)](String(RegExp['$1'])):this[_0x70087c(0x208)][_0x2ee04e]=this[_0x70087c(0x298)](Number(_0x385585)),this['_colorCache'][_0x2ee04e];},VisuMZ[_0x148973(0x178)][_0x148973(0x17f)]=Game_System[_0x148973(0x1c4)][_0x148973(0x1d3)],Game_System[_0x148973(0x1c4)][_0x148973(0x1d3)]=function(){const _0x31652b=_0x148973;VisuMZ[_0x31652b(0x178)][_0x31652b(0x17f)][_0x31652b(0x1d5)](this),this[_0x31652b(0x12f)]();},Game_System['prototype'][_0x148973(0x12f)]=function(){const _0x4d83b1=_0x148973;this['_SaveCoreSettings']={'autosaveEnabled':VisuMZ[_0x4d83b1(0x178)][_0x4d83b1(0x1c0)][_0x4d83b1(0x176)][_0x4d83b1(0x254)],'saveDescription':'','savePicture':''};},Game_System[_0x148973(0x1c4)][_0x148973(0x1df)]=function(){const _0x12b181=_0x148973;if(!$dataSystem[_0x12b181(0x132)])return![];if(this[_0x12b181(0x213)]===undefined)this[_0x12b181(0x12f)]();if(this[_0x12b181(0x213)][_0x12b181(0x1fb)]===undefined)this['initSaveCore']();return this[_0x12b181(0x213)][_0x12b181(0x1fb)];},Game_System[_0x148973(0x1c4)][_0x148973(0x11c)]=function(_0x1ea36b){const _0x23891d=_0x148973;if(!$dataSystem['optAutosave'])return;if(this['_SaveCoreSettings']===undefined)this[_0x23891d(0x12f)]();if(this[_0x23891d(0x213)][_0x23891d(0x1fb)]===undefined)this['initSaveCore']();this[_0x23891d(0x213)][_0x23891d(0x1fb)]=_0x1ea36b;},Game_System[_0x148973(0x1c4)]['getSaveDescription']=function(){const _0x1cee04=_0x148973;if(this[_0x1cee04(0x213)]===undefined)this[_0x1cee04(0x12f)]();if(this[_0x1cee04(0x213)]['saveDescription']===undefined)this[_0x1cee04(0x12f)]();return this[_0x1cee04(0x213)][_0x1cee04(0x278)];},Game_System[_0x148973(0x1c4)][_0x148973(0x295)]=function(_0x46bcaf){const _0x5b0942=_0x148973;if(this[_0x5b0942(0x213)]===undefined)this['initSaveCore']();if(this['_SaveCoreSettings'][_0x5b0942(0x278)]===undefined)this[_0x5b0942(0x12f)]();this['_SaveCoreSettings']['saveDescription']=VisuMZ[_0x5b0942(0x178)][_0x5b0942(0x249)](_0x46bcaf);},VisuMZ['SaveCore']['ParseTextCodes']=function(_0x3162dd){const _0x20a52a=_0x148973;while(_0x3162dd[_0x20a52a(0x294)](/\\V\[(\d+)\]/gi)){if(_0x20a52a(0x184)!==_0x20a52a(0x216))_0x3162dd=_0x3162dd[_0x20a52a(0x240)](/\\V\[(\d+)\]/gi,(_0x37724a,_0x2031e4)=>$gameVariables[_0x20a52a(0x155)](parseInt(_0x2031e4)));else{function _0x2bf279(){const _0x507c47=_0x20a52a;_0x1358c1=_0x25fd83?_0x1687dd['saveSuccess']:_0x277d92[_0x507c47(0x2a0)];}}}while(_0x3162dd[_0x20a52a(0x294)](/\\N\[(\d+)\]/gi)){_0x3162dd=_0x3162dd[_0x20a52a(0x240)](/\\N\[(\d+)\]/gi,(_0x3cc284,_0x412bb7)=>Window_Base[_0x20a52a(0x1c4)]['actorName'](parseInt(_0x412bb7)));}while(_0x3162dd['match'](/\\P\[(\d+)\]/gi)){_0x3162dd=_0x3162dd[_0x20a52a(0x240)](/\\P\[(\d+)\]/gi,(_0x23e5fa,_0x5ad8ba)=>Window_Base[_0x20a52a(0x1c4)][_0x20a52a(0x143)](parseInt(_0x5ad8ba)));}return _0x3162dd;},Game_System[_0x148973(0x1c4)]['getSavePicture']=function(){const _0xcf4f8=_0x148973;if(this[_0xcf4f8(0x213)]===undefined)this['initSaveCore']();if(this['_SaveCoreSettings'][_0xcf4f8(0x205)]===undefined)this[_0xcf4f8(0x12f)]();return this['_SaveCoreSettings']['savePicture'];},Game_System[_0x148973(0x1c4)][_0x148973(0x21f)]=function(_0x3c6307){const _0x2bf5a1=_0x148973;if(this['_SaveCoreSettings']===undefined)this[_0x2bf5a1(0x12f)]();if(this[_0x2bf5a1(0x213)]['savePicture']===undefined)this[_0x2bf5a1(0x12f)]();this[_0x2bf5a1(0x213)][_0x2bf5a1(0x205)]=_0x3c6307;},VisuMZ[_0x148973(0x178)][_0x148973(0x1a3)]=Game_System[_0x148973(0x1c4)][_0x148973(0x129)],Game_System[_0x148973(0x1c4)][_0x148973(0x129)]=function(){const _0x45ce5d=_0x148973,_0x572276=StorageManager[_0x45ce5d(0x28d)]();switch(_0x572276){case _0x45ce5d(0x159):return VisuMZ['SaveCore'][_0x45ce5d(0x1a3)][_0x45ce5d(0x1d5)](this)||0x1;break;case _0x45ce5d(0x232):return 0x0;break;default:return VisuMZ[_0x45ce5d(0x178)][_0x45ce5d(0x1a3)][_0x45ce5d(0x1d5)](this);break;}},Game_Switches[_0x148973(0x1c4)][_0x148973(0x13c)]=function(_0xaf7b81){const _0x47945b=_0x148973;return $dataSystem[_0x47945b(0x15e)][_0xaf7b81]&&VisuMZ[_0x47945b(0x154)][_0x47945b(0x21a)](_0xaf7b81);},VisuMZ[_0x148973(0x178)][_0x148973(0x1f0)]=Game_Switches['prototype'][_0x148973(0x155)],Game_Switches[_0x148973(0x1c4)][_0x148973(0x155)]=function(_0x1d1648){const _0x199175=_0x148973;return this[_0x199175(0x13c)](_0x1d1648)?this['globalValue'](_0x1d1648):VisuMZ[_0x199175(0x178)]['Game_Switches_value'][_0x199175(0x1d5)](this,_0x1d1648);},Game_Switches['prototype']['globalValue']=function(_0x5a0361){const _0x373115=_0x148973;return ConfigManager[_0x373115(0x1e1)]=ConfigManager[_0x373115(0x1e1)]||[],!!ConfigManager['globalSwitches'][_0x5a0361];},VisuMZ[_0x148973(0x178)]['Game_Switches_setValue']=Game_Switches[_0x148973(0x1c4)]['setValue'],Game_Switches[_0x148973(0x1c4)][_0x148973(0x19d)]=function(_0x31760e,_0x2d94b7){const _0x24520d=_0x148973;if(this[_0x24520d(0x13c)](_0x31760e))this['setGlobalValue'](_0x31760e,_0x2d94b7);VisuMZ[_0x24520d(0x178)]['Game_Switches_setValue'][_0x24520d(0x1d5)](this,_0x31760e,_0x2d94b7);},Game_Switches[_0x148973(0x1c4)][_0x148973(0x1b9)]=function(_0x25e19b,_0x1cca96){const _0x4703cd=_0x148973;if(_0x25e19b>0x0&&_0x25e19b<$dataSystem['switches']['length']){if(_0x4703cd(0x259)===_0x4703cd(0x259))ConfigManager[_0x4703cd(0x1e1)]=ConfigManager[_0x4703cd(0x1e1)]||[],ConfigManager[_0x4703cd(0x1e1)][_0x25e19b]=_0x1cca96,ConfigManager['save']();else{function _0x44c291(){const _0x32c775=_0x4703cd;return!_0x1f76d8[_0x32c775(0x290)]()&&!_0x310b5d[_0x32c775(0x14a)]()&&_0x569e55[_0x32c775(0x132)];}}}},Game_Variables[_0x148973(0x1c4)]['isGlobal']=function(_0x4d9f78){const _0x185204=_0x148973;return $dataSystem['variables'][_0x4d9f78]&&VisuMZ[_0x185204(0x23b)][_0x185204(0x21a)](_0x4d9f78);},VisuMZ[_0x148973(0x178)][_0x148973(0x296)]=Game_Variables['prototype'][_0x148973(0x155)],Game_Variables[_0x148973(0x1c4)][_0x148973(0x155)]=function(_0x3eeac6){const _0x6b500c=_0x148973;if(this[_0x6b500c(0x13c)](_0x3eeac6)){if(_0x6b500c(0x1ed)!==_0x6b500c(0x1ed)){function _0x578b55(){const _0x14b6ec=_0x6b500c;_0x2d2fb9['SaveCore']['Scene_Map_onMapLoaded'][_0x14b6ec(0x1d5)](this);if(_0x273baf[_0x14b6ec(0x192)](_0x1dd6f7))this['determineAutosaveBypass']('exitMenu'),this[_0x14b6ec(0x114)]();else _0x12f1a6[_0x14b6ec(0x192)](_0x30079e)&&(this[_0x14b6ec(0x20f)](_0x14b6ec(0x196)),this[_0x14b6ec(0x114)]());}}else return this[_0x6b500c(0x12d)](_0x3eeac6);}else return VisuMZ['SaveCore'][_0x6b500c(0x296)][_0x6b500c(0x1d5)](this,_0x3eeac6);},Game_Variables['prototype']['globalValue']=function(_0xbd050c){const _0x3c3c0e=_0x148973;ConfigManager[_0x3c3c0e(0x1e7)]=ConfigManager[_0x3c3c0e(0x1e7)]||[];if(ConfigManager['globalVariables'][_0xbd050c]===undefined){if(_0x3c3c0e(0x1b1)===_0x3c3c0e(0x1b1))ConfigManager[_0x3c3c0e(0x1e7)][_0xbd050c]=0x0;else{function _0x38db1c(){const _0x20b5bf=_0x3c3c0e;_0x20d109[_0x20b5bf(0x178)][_0x20b5bf(0x1f6)][_0x20b5bf(0x1d5)](this),_0x353472[_0x20b5bf(0x192)](_0x3e9455)&&(this['determineAutosaveBypass'](_0x20b5bf(0x13b)),this[_0x20b5bf(0x114)]());}}}return ConfigManager[_0x3c3c0e(0x1e7)][_0xbd050c];},VisuMZ[_0x148973(0x178)][_0x148973(0x24a)]=Game_Variables['prototype']['setValue'],Game_Variables[_0x148973(0x1c4)][_0x148973(0x19d)]=function(_0x4d98c1,_0x147529){const _0x18aee8=_0x148973;if(this[_0x18aee8(0x13c)](_0x4d98c1))this[_0x18aee8(0x1b9)](_0x4d98c1,_0x147529);VisuMZ[_0x18aee8(0x178)][_0x18aee8(0x24a)][_0x18aee8(0x1d5)](this,_0x4d98c1,_0x147529);},Game_Variables[_0x148973(0x1c4)][_0x148973(0x1b9)]=function(_0x74c80b,_0x1adc87){const _0x161318=_0x148973;if(_0x74c80b>0x0&&_0x74c80b<$dataSystem[_0x161318(0x224)][_0x161318(0x256)]){if('VragF'!==_0x161318(0x113)){function _0xd73be9(){const _0x2ecfc5=_0x161318;if(!_0x2e6f94[_0x2ecfc5(0x248)])return;this[_0x2ecfc5(0x179)]();}}else{ConfigManager[_0x161318(0x1e7)]=ConfigManager[_0x161318(0x1e7)]||[];if(typeof _0x1adc87===_0x161318(0x187))_0x1adc87=Math[_0x161318(0x19e)](_0x1adc87);ConfigManager['globalVariables'][_0x74c80b]=_0x1adc87,ConfigManager['save']();}}},Game_Party[_0x148973(0x1c4)][_0x148973(0x16c)]=function(){const _0x4306ac=_0x148973;return this[_0x4306ac(0x11a)]()[_0x4306ac(0x197)](_0x45413d=>_0x45413d[_0x4306ac(0x1ea)]());},Scene_Base[_0x148973(0x1c4)][_0x148973(0x20f)]=function(_0x58a24b){const _0x182766=_0x148973,_0x196d7a=VisuMZ['SaveCore']['Settings'][_0x182766(0x176)];switch(_0x58a24b){case _0x182766(0x196):this[_0x182766(0x188)]=!_0x196d7a[_0x182766(0x220)];break;case'transfer':if(!this['shouldAutosave']())return;this[_0x182766(0x188)]=!_0x196d7a['AfterTransfer'];break;case'callMenu':this['_bypassAutosave']=!_0x196d7a[_0x182766(0x23f)];break;case'exitMenu':this[_0x182766(0x188)]=!_0x196d7a['AfterExitMenu'];break;}},VisuMZ[_0x148973(0x178)][_0x148973(0x261)]=Scene_Base[_0x148973(0x1c4)]['requestAutosave'],Scene_Base[_0x148973(0x1c4)][_0x148973(0x114)]=function(){const _0x56ac19=_0x148973;!this['_bypassAutosave']&&VisuMZ[_0x56ac19(0x178)][_0x56ac19(0x261)][_0x56ac19(0x1d5)](this),this['_bypassAutosave']=![];},Scene_Base[_0x148973(0x1c4)][_0x148973(0x1df)]=function(){const _0x1ca85d=_0x148973;return!DataManager['isBattleTest']()&&!DataManager[_0x1ca85d(0x14a)]()&&$gameSystem[_0x1ca85d(0x1df)]()&&(VisuMZ[_0x1ca85d(0x178)][_0x1ca85d(0x1c0)][_0x1ca85d(0x176)][_0x1ca85d(0x124)]?$gameSystem[_0x1ca85d(0x19b)]():!![]);},Scene_Base[_0x148973(0x1c4)][_0x148973(0x145)]=function(){const _0x965dca=_0x148973;if(!ConfigManager[_0x965dca(0x248)])return;this[_0x965dca(0x179)]();},Scene_Base[_0x148973(0x1c4)]['forceAutosave']=function(){const _0x49bf56=_0x148973;$gameSystem[_0x49bf56(0x122)](),this[_0x49bf56(0x268)]=![];const _0x3ef8bb=StorageManager[_0x49bf56(0x1bb)]();if([_0x49bf56(0x1c2),_0x49bf56(0x1f9)][_0x49bf56(0x21a)](_0x3ef8bb)){if('tvijK'==='BGAQj'){function _0x32741e(){const _0x44364e=_0x49bf56;this[_0x44364e(0x20f)](_0x44364e(0x245)),this[_0x44364e(0x114)]();}}else DataManager[_0x49bf56(0x241)](0x0)[_0x49bf56(0x1e0)](()=>this['onAutosaveSuccess']())['catch'](()=>this[_0x49bf56(0x287)]());}if([_0x49bf56(0x226),_0x49bf56(0x1f9)][_0x49bf56(0x21a)](_0x3ef8bb)){if(_0x49bf56(0x1a0)!=='lyuVW'){function _0x5a9a56(){const _0x16cfbe=_0x49bf56;_0x2e5b52=_0x4f0b35[_0x16cfbe(0x1e8)](_0x546f9b,_0x1cf011);}}else{const _0x5b1f91=$gameSystem[_0x49bf56(0x129)]();_0x5b1f91>0x0&&DataManager['saveGame'](_0x5b1f91)[_0x49bf56(0x1e0)](()=>this[_0x49bf56(0x284)]())[_0x49bf56(0x1f1)](()=>this[_0x49bf56(0x287)]());}}this[_0x49bf56(0x268)]=![];},VisuMZ[_0x148973(0x178)]['Scene_Base_onAutosaveSuccess']=Scene_Base[_0x148973(0x1c4)][_0x148973(0x284)],Scene_Base[_0x148973(0x1c4)][_0x148973(0x284)]=function(){const _0x20e5e5=_0x148973;if(this[_0x20e5e5(0x268)])return;VisuMZ[_0x20e5e5(0x178)][_0x20e5e5(0x1b7)]['call'](this),VisuMZ[_0x20e5e5(0x178)]['Settings'][_0x20e5e5(0x176)][_0x20e5e5(0x1d4)][_0x20e5e5(0x1d5)](this),this['openAutosaveConfirmationWindow'](!![]),this['_processingAutosave']=!![];},VisuMZ[_0x148973(0x178)][_0x148973(0x10b)]=Scene_Base[_0x148973(0x1c4)][_0x148973(0x287)],Scene_Base[_0x148973(0x1c4)][_0x148973(0x287)]=function(){const _0x2b7c0b=_0x148973;if(this[_0x2b7c0b(0x268)])return;VisuMZ[_0x2b7c0b(0x178)]['Scene_Base_onAutosaveFailure'][_0x2b7c0b(0x1d5)](this),VisuMZ[_0x2b7c0b(0x178)][_0x2b7c0b(0x1c0)][_0x2b7c0b(0x176)][_0x2b7c0b(0x26a)][_0x2b7c0b(0x1d5)](this),this['openAutosaveConfirmationWindow'](![]);},Scene_Base[_0x148973(0x1c4)][_0x148973(0x168)]=function(){const _0x18ea82=_0x148973;if(this['_saveConfirmWindow'])return;const _0x3190e4=this[_0x18ea82(0x24c)]();this[_0x18ea82(0x136)]=new Window_Base(_0x3190e4),this[_0x18ea82(0x136)][_0x18ea82(0x18e)]=0x0;},Scene_Base[_0x148973(0x1c4)][_0x148973(0x24c)]=function(){const _0x279e42=_0x148973;return VisuMZ[_0x279e42(0x178)][_0x279e42(0x1c0)]['SaveConfirm']['ConfirmRect']['call'](this);},Scene_Base['prototype']['isSaveConfirmWindowEnabled']=function(){const _0x44b378=_0x148973;return VisuMZ[_0x44b378(0x178)]['Settings'][_0x44b378(0x17b)][_0x44b378(0x24b)];},Scene_Base['prototype'][_0x148973(0x1b3)]=function(_0x4c5935,_0x4b1057){const _0x371bea=_0x148973;if(!this[_0x371bea(0x244)]())return this['closeSaveConfirmationWindow'](_0x4c5935);if(!this[_0x371bea(0x136)])this['createSaveConfirmationWindow']();const _0x12cbfd=this['_saveConfirmWindow'];this[_0x371bea(0x12c)](_0x12cbfd),this[_0x371bea(0x16f)](_0x12cbfd),_0x12cbfd['open'](),_0x12cbfd[_0x371bea(0x161)](),_0x12cbfd['contents'][_0x371bea(0x193)]();let _0x18ac2a='';_0x4b1057?_0x18ac2a=TextManager['loadFailure']:_0x18ac2a=_0x4c5935?TextManager[_0x371bea(0x12a)]:TextManager[_0x371bea(0x2a0)];const _0x52f93b=_0x12cbfd[_0x371bea(0x23d)](_0x18ac2a)[_0x371bea(0x2a2)],_0x3d5819=(_0x12cbfd[_0x371bea(0x269)]-_0x52f93b)/0x2;_0x12cbfd[_0x371bea(0x21d)](_0x18ac2a,_0x3d5819,0x0,_0x52f93b);const _0x25b127=VisuMZ[_0x371bea(0x178)]['Settings'][_0x371bea(0x17b)][_0x371bea(0x25c)];setTimeout(this[_0x371bea(0x28e)][_0x371bea(0x21c)](this,_0x4c5935),_0x25b127);},Scene_Base[_0x148973(0x1c4)][_0x148973(0x264)]=function(){const _0x1370f0=_0x148973;this[_0x1370f0(0x1b3)](![],!![]);},Scene_Base['prototype']['closeSaveConfirmationWindow']=function(_0x49368f){const _0x79eee0=_0x148973;if(this['_saveConfirmWindow'])this[_0x79eee0(0x136)][_0x79eee0(0x1e9)]();},Scene_Base[_0x148973(0x1c4)][_0x148973(0x274)]=function(){const _0x521b3d=_0x148973;if(this[_0x521b3d(0x243)])return;const _0x4521c8=this[_0x521b3d(0x26d)]();this[_0x521b3d(0x243)]=new Window_AutosaveConfirm(_0x4521c8);},Scene_Base[_0x148973(0x1c4)][_0x148973(0x26d)]=function(){const _0x5220f7=_0x148973,_0x5c349c=this[_0x5220f7(0x14d)](),_0x5a8469=this[_0x5220f7(0x1ce)](0x1,![]),_0x3ed8b9=Graphics[_0x5220f7(0x2a2)]-_0x5c349c,_0x14c3f1=Graphics[_0x5220f7(0x158)]-_0x5a8469;return new Rectangle(_0x3ed8b9,_0x14c3f1,_0x5c349c,_0x5a8469);},Scene_Base[_0x148973(0x1c4)][_0x148973(0x142)]=function(){const _0x37a9c6=_0x148973;return VisuMZ[_0x37a9c6(0x178)]['Settings'][_0x37a9c6(0x23c)][_0x37a9c6(0x24b)];},Scene_Base[_0x148973(0x1c4)][_0x148973(0x285)]=function(_0xe42b03){const _0x129324=_0x148973;if(!this['isAutosaveConfirmWindowEnabled']())return this['closeAutosaveConfirmationWindow'](_0xe42b03);if(!this[_0x129324(0x243)])this[_0x129324(0x274)]();const _0x6c299d=this['_autosaveConfirmWindow'];this[_0x129324(0x12c)](_0x6c299d),this[_0x129324(0x16f)](_0x6c299d),_0x6c299d[_0x129324(0x175)](_0xe42b03),_0x6c299d[_0x129324(0x1a8)]();const _0x146f80=VisuMZ['SaveCore'][_0x129324(0x1c0)][_0x129324(0x17b)][_0x129324(0x25c)];setTimeout(this[_0x129324(0x12e)][_0x129324(0x21c)](this,_0xe42b03),_0x146f80);},Scene_Base[_0x148973(0x1c4)][_0x148973(0x12e)]=function(_0x27b54d){const _0x2a2b9d=_0x148973;if(this[_0x2a2b9d(0x243)])this[_0x2a2b9d(0x243)][_0x2a2b9d(0x1ad)]();},Scene_Base[_0x148973(0x1c4)]['saveCurrentSlot']=function(){},VisuMZ[_0x148973(0x178)]['Scene_Title_initialize']=Scene_Title[_0x148973(0x1c4)][_0x148973(0x1d3)],Scene_Title['prototype'][_0x148973(0x1d3)]=function(){const _0x3efdec=_0x148973;VisuMZ['SaveCore'][_0x3efdec(0x1ba)]['call'](this),this[_0x3efdec(0x182)]=![];},VisuMZ[_0x148973(0x178)][_0x148973(0x211)]=Scene_Title[_0x148973(0x1c4)][_0x148973(0x15f)],Scene_Title[_0x148973(0x1c4)][_0x148973(0x15f)]=function(){const _0x273874=_0x148973;VisuMZ['SaveCore'][_0x273874(0x211)]['call'](this);if(this[_0x273874(0x182)])$gameSystem['onAfterLoad']();},VisuMZ[_0x148973(0x178)][_0x148973(0x282)]=Scene_Title[_0x148973(0x1c4)]['commandNewGame'],Scene_Title['prototype']['commandNewGame']=function(){const _0x5de17a=_0x148973;if(StorageManager[_0x5de17a(0x28d)]()==='locked')this[_0x5de17a(0x1e4)]();else{if(_0x5de17a(0x283)===_0x5de17a(0x283))VisuMZ[_0x5de17a(0x178)][_0x5de17a(0x282)]['call'](this);else{function _0x4c1a0c(){const _0xdef897=_0x5de17a;_0x50e7e5[_0xdef897(0x1c4)][_0xdef897(0x218)]['call'](this);if(this['_fadeSpeed']!==0x0)this[_0xdef897(0x27a)]();}}}},Scene_Title['prototype'][_0x148973(0x1e4)]=function(){const _0x2597a1=_0x148973;DataManager[_0x2597a1(0x263)](),$gameTemp[_0x2597a1(0x14e)]=!![],this[_0x2597a1(0x127)][_0x2597a1(0x1e9)](),SceneManager[_0x2597a1(0x22e)](Scene_Save);},VisuMZ[_0x148973(0x178)][_0x148973(0x1de)]=Scene_Title[_0x148973(0x1c4)][_0x148973(0x135)],Scene_Title[_0x148973(0x1c4)][_0x148973(0x135)]=function(){const _0x1adcfd=_0x148973;StorageManager[_0x1adcfd(0x28d)]()===_0x1adcfd(0x232)?this[_0x1adcfd(0x214)]():VisuMZ[_0x1adcfd(0x178)][_0x1adcfd(0x1de)]['call'](this);},Scene_Title['prototype'][_0x148973(0x214)]=function(){const _0x5dfcc7=_0x148973;DataManager[_0x5dfcc7(0x26e)](0x0)[_0x5dfcc7(0x1e0)](()=>this['onSaveCoreLoadSuccess']())['catch'](()=>this[_0x5dfcc7(0x11d)]());},Scene_Title['prototype']['onSaveCoreLoadSuccess']=function(){const _0x2e76ca=_0x148973;this['_commandWindow'][_0x2e76ca(0x1e9)](),SoundManager[_0x2e76ca(0x1db)](),this[_0x2e76ca(0x10c)](),Scene_Load[_0x2e76ca(0x1c4)]['reloadMapIfUpdated'](),SceneManager[_0x2e76ca(0x164)](Scene_Map),this[_0x2e76ca(0x182)]=!![],VisuMZ[_0x2e76ca(0x178)][_0x2e76ca(0x1c0)][_0x2e76ca(0x10e)]['OnLoadSuccessJS'][_0x2e76ca(0x1d5)](this);},Scene_Title[_0x148973(0x1c4)]['onSaveCoreLoadFailure']=function(){const _0x2aa463=_0x148973;SoundManager['playBuzzer'](),VisuMZ[_0x2aa463(0x178)][_0x2aa463(0x1c0)][_0x2aa463(0x10e)][_0x2aa463(0x29a)][_0x2aa463(0x1d5)](this),this['loadFailureConfirmationWindow']();},Scene_Title[_0x148973(0x1c4)][_0x148973(0x28e)]=function(_0x14708b){const _0x22bc35=_0x148973;Scene_Base[_0x22bc35(0x1c4)][_0x22bc35(0x28e)][_0x22bc35(0x1d5)](this,_0x14708b),this[_0x22bc35(0x127)][_0x22bc35(0x231)](),this[_0x22bc35(0x127)][_0x22bc35(0x29c)]();},VisuMZ[_0x148973(0x178)]['Scene_Map_onMapLoaded']=Scene_Map['prototype']['onMapLoaded'],Scene_Map[_0x148973(0x1c4)][_0x148973(0x223)]=function(){const _0x26a6a8=_0x148973;VisuMZ['SaveCore']['Scene_Map_onMapLoaded'][_0x26a6a8(0x1d5)](this);if(SceneManager[_0x26a6a8(0x192)](Scene_Menu))this['determineAutosaveBypass'](_0x26a6a8(0x245)),this[_0x26a6a8(0x114)]();else SceneManager[_0x26a6a8(0x192)](Scene_Battle)&&(this['determineAutosaveBypass']('battle'),this[_0x26a6a8(0x114)]());},VisuMZ[_0x148973(0x178)][_0x148973(0x172)]=Scene_Map[_0x148973(0x1c4)][_0x148973(0x225)],Scene_Map[_0x148973(0x1c4)][_0x148973(0x225)]=function(){const _0x2a27f9=_0x148973;if(this[_0x2a27f9(0x246)]()){if(_0x2a27f9(0x194)===_0x2a27f9(0x194))this[_0x2a27f9(0x20f)](_0x2a27f9(0x276));else{function _0x5721b9(){const _0x147294=_0x2a27f9;if(_0x3b5725==='')return;_0x403dc8+=0x2,_0xed620c+=0x2,_0x14965a-=0x4,_0x2ff2a6-=0x4;const _0x44f000=_0x609c3e[_0x147294(0x28b)](_0x33d476),_0x2ca706=_0x44f000['width'],_0x20e6cc=_0x44f000['height'],_0x126987=_0x4fe90d[_0x147294(0x181)](_0x16a427/_0x2ca706,_0x469324/_0x20e6cc,_0x1adb15?0x1:0x3e8),_0x209fb7=_0x92f575[_0x147294(0x186)](_0x44f000[_0x147294(0x2a2)]*_0x126987),_0x520d33=_0x46bb68[_0x147294(0x186)](_0x44f000[_0x147294(0x158)]*_0x126987);_0x7a1282+=(_0x433754-_0x209fb7)/0x2,_0x22a8a9+=(_0x253b16-_0x520d33)/0x2,this['contentsBack'][_0x147294(0x201)](_0x44f000,0x0,0x0,_0x2ca706,_0x20e6cc,_0x221b24,_0x59f4dd,_0x209fb7,_0x520d33);}}}VisuMZ[_0x2a27f9(0x178)][_0x2a27f9(0x172)][_0x2a27f9(0x1d5)](this);},Scene_Map[_0x148973(0x1c4)][_0x148973(0x1fd)]=function(){const _0x3569c9=_0x148973,_0xc1753e=$gameSystem[_0x3569c9(0x129)]();console[_0x3569c9(0x1f5)](_0xc1753e);if(StorageManager[_0x3569c9(0x28d)]()!==_0x3569c9(0x232)&&_0xc1753e<=0x0)return;this[_0x3569c9(0x255)]=![],DataManager[_0x3569c9(0x241)](_0xc1753e)[_0x3569c9(0x1e0)](()=>this[_0x3569c9(0x27e)]())[_0x3569c9(0x1f1)](()=>this[_0x3569c9(0x289)]());},Scene_Map[_0x148973(0x1c4)][_0x148973(0x27e)]=function(){const _0x229276=_0x148973;SoundManager['playSave'](),VisuMZ[_0x229276(0x178)][_0x229276(0x1c0)][_0x229276(0x10e)]['OnSaveSuccessJS'][_0x229276(0x1d5)](this),this['openSaveConfirmationWindow'](!![]);},Scene_Map[_0x148973(0x1c4)]['onSaveFailure']=function(){const _0x89d708=_0x148973;SoundManager[_0x89d708(0x169)](),VisuMZ[_0x89d708(0x178)][_0x89d708(0x1c0)][_0x89d708(0x10e)][_0x89d708(0x21e)][_0x89d708(0x1d5)](this),this[_0x89d708(0x1b3)](![]);},Scene_Map[_0x148973(0x1c4)][_0x148973(0x28e)]=function(_0x46a66f){const _0x22f8df=_0x148973;Scene_Message['prototype'][_0x22f8df(0x28e)][_0x22f8df(0x1d5)](this,_0x46a66f),this[_0x22f8df(0x255)]=!![];},VisuMZ['SaveCore'][_0x148973(0x1f6)]=Scene_Menu['prototype'][_0x148973(0x140)],Scene_Menu['prototype'][_0x148973(0x140)]=function(){const _0x1ead05=_0x148973;VisuMZ[_0x1ead05(0x178)][_0x1ead05(0x1f6)][_0x1ead05(0x1d5)](this),SceneManager[_0x1ead05(0x192)](Scene_Map)&&(this[_0x1ead05(0x20f)](_0x1ead05(0x13b)),this[_0x1ead05(0x114)]());},VisuMZ[_0x148973(0x178)][_0x148973(0x190)]=Scene_Menu[_0x148973(0x1c4)][_0x148973(0x280)],Scene_Menu[_0x148973(0x1c4)]['commandSave']=function(){const _0x284cb5=_0x148973,_0x4f4dae=StorageManager[_0x284cb5(0x28d)]();switch(_0x4f4dae){case _0x284cb5(0x159):case'single':this[_0x284cb5(0x139)]();break;default:VisuMZ[_0x284cb5(0x178)]['Scene_Menu_commandSave'][_0x284cb5(0x1d5)](this);break;}},Scene_Menu['prototype'][_0x148973(0x139)]=function(){const _0x5e9248=_0x148973,_0xc93c13=$gameSystem[_0x5e9248(0x129)]();$gameSystem[_0x5e9248(0x130)](_0xc93c13),$gameSystem['onBeforeSave'](),DataManager[_0x5e9248(0x241)](_0xc93c13)['then'](()=>this['onSaveCoreSaveSuccess']())[_0x5e9248(0x1f1)](()=>this[_0x5e9248(0x258)]());},Scene_Menu['prototype'][_0x148973(0x110)]=function(){const _0x2850b2=_0x148973;SoundManager[_0x2850b2(0x242)](),VisuMZ[_0x2850b2(0x178)][_0x2850b2(0x1c0)]['Save'][_0x2850b2(0x11e)]['call'](this),this[_0x2850b2(0x1b3)](!![]);},Scene_Menu[_0x148973(0x1c4)]['onSaveCoreSaveFailure']=function(){const _0x25d9c5=_0x148973;SoundManager[_0x25d9c5(0x169)](),VisuMZ['SaveCore'][_0x25d9c5(0x1c0)][_0x25d9c5(0x10e)][_0x25d9c5(0x21e)][_0x25d9c5(0x1d5)](this),this[_0x25d9c5(0x1b3)](![]);},Scene_Menu[_0x148973(0x1c4)]['closeSaveConfirmationWindow']=function(_0x1947ab){const _0x58f845=_0x148973;Scene_MenuBase[_0x58f845(0x1c4)][_0x58f845(0x28e)][_0x58f845(0x1d5)](this,_0x1947ab),this['_commandWindow']['activate']();},Scene_Battle['prototype'][_0x148973(0x114)]=function(){},VisuMZ[_0x148973(0x178)]['Scene_Options_maxCommands']=Scene_Options[_0x148973(0x1c4)][_0x148973(0x1e2)],Scene_Options[_0x148973(0x1c4)][_0x148973(0x1e2)]=function(){const _0x433957=_0x148973;let _0xc05fb5=VisuMZ['SaveCore'][_0x433957(0x21b)][_0x433957(0x1d5)](this);const _0x1130c7=VisuMZ[_0x433957(0x178)]['Settings'];if(_0x1130c7[_0x433957(0x18d)][_0x433957(0x14b)]&&_0x1130c7[_0x433957(0x18d)][_0x433957(0x171)])_0xc05fb5++;return _0xc05fb5;},Scene_Save[_0x148973(0x1c4)][_0x148973(0x27e)]=function(){const _0x1684de=_0x148973;SoundManager[_0x1684de(0x242)](),VisuMZ[_0x1684de(0x178)][_0x1684de(0x1c0)][_0x1684de(0x10e)][_0x1684de(0x11e)][_0x1684de(0x1d5)](this),this[_0x1684de(0x1b2)]['refresh'](),this[_0x1684de(0x1b3)](!![]);},VisuMZ[_0x148973(0x178)][_0x148973(0x1c5)]=Scene_Save[_0x148973(0x1c4)][_0x148973(0x289)],Scene_Save[_0x148973(0x1c4)][_0x148973(0x289)]=function(){const _0x370b0f=_0x148973;SoundManager[_0x370b0f(0x169)](),VisuMZ[_0x370b0f(0x178)]['Settings'][_0x370b0f(0x10e)][_0x370b0f(0x21e)][_0x370b0f(0x1d5)](this),this[_0x370b0f(0x1b3)](![]);},Scene_Save['prototype'][_0x148973(0x28e)]=function(_0x3cbeda){const _0x63c787=_0x148973;Scene_File[_0x63c787(0x1c4)]['closeSaveConfirmationWindow'][_0x63c787(0x1d5)](this,_0x3cbeda),_0x3cbeda?this[_0x63c787(0x13a)]():this['activateListWindow']();},Scene_Save['prototype'][_0x148973(0x1bc)]=function(){const _0x3759f8=_0x148973;$gameTemp[_0x3759f8(0x14e)]=![],Scene_File[_0x3759f8(0x1c4)][_0x3759f8(0x1bc)][_0x3759f8(0x1d5)](this);},VisuMZ[_0x148973(0x178)][_0x148973(0x229)]=Scene_Save['prototype']['helpWindowText'],Scene_Save[_0x148973(0x1c4)][_0x148973(0x25a)]=function(){const _0x4dfbd3=_0x148973;return $gameTemp[_0x4dfbd3(0x14e)]?TextManager[_0x4dfbd3(0x198)]:VisuMZ['SaveCore']['Scene_Save_helpWindowText'][_0x4dfbd3(0x1d5)](this);},VisuMZ[_0x148973(0x178)][_0x148973(0x148)]=Scene_Save[_0x148973(0x1c4)][_0x148973(0x1f2)],Scene_Save[_0x148973(0x1c4)]['executeSave']=function(_0x452bf3){const _0x249510=_0x148973;$gameTemp['_pickLockedSaveSlot']?this[_0x249510(0x1d8)](_0x452bf3):VisuMZ[_0x249510(0x178)][_0x249510(0x148)][_0x249510(0x1d5)](this,_0x452bf3);},Scene_Save[_0x148973(0x1c4)][_0x148973(0x1d8)]=function(_0x3daa59){const _0x15641d=_0x148973;$gameTemp[_0x15641d(0x14e)]=![],SoundManager[_0x15641d(0x1db)](),$gameSystem[_0x15641d(0x130)](_0x3daa59),this[_0x15641d(0x10c)](),SceneManager[_0x15641d(0x164)](Scene_Map);},VisuMZ[_0x148973(0x178)][_0x148973(0x146)]=Scene_Load[_0x148973(0x1c4)][_0x148973(0x279)],Scene_Load['prototype'][_0x148973(0x279)]=function(){const _0x1f9ee3=_0x148973;VisuMZ[_0x1f9ee3(0x178)]['Scene_Load_onLoadSuccess'][_0x1f9ee3(0x1d5)](this),VisuMZ[_0x1f9ee3(0x178)][_0x1f9ee3(0x1c0)][_0x1f9ee3(0x10e)][_0x1f9ee3(0x137)][_0x1f9ee3(0x1d5)](this);},Scene_Load[_0x148973(0x1c4)][_0x148973(0x13d)]=function(){const _0x5cd36c=_0x148973;SoundManager[_0x5cd36c(0x169)](),VisuMZ[_0x5cd36c(0x178)][_0x5cd36c(0x1c0)]['Save'][_0x5cd36c(0x29a)][_0x5cd36c(0x1d5)](this),this[_0x5cd36c(0x264)]();},Scene_Load[_0x148973(0x1c4)][_0x148973(0x28e)]=function(_0x4ba20f){const _0x12ae18=_0x148973;Scene_File[_0x12ae18(0x1c4)][_0x12ae18(0x28e)][_0x12ae18(0x1d5)](this,_0x4ba20f),this[_0x12ae18(0x13a)]();},ImageManager[_0x148973(0x1dd)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x148973(0x222)]=ImageManager['svActorVertCells']||0x6,Window_Base['prototype'][_0x148973(0x1b8)]=function(_0xfd6aa7,_0x1f329f,_0x216a0c){const _0x42ba6b=_0x148973,_0x2bc282=ImageManager['loadSvActor'](_0xfd6aa7),_0x2b060d=_0x2bc282[_0x42ba6b(0x2a2)]/ImageManager['svActorHorzCells'],_0x1b5483=_0x2bc282['height']/ImageManager[_0x42ba6b(0x222)],_0x46b62e=0x0,_0x5a3f6b=0x0;this[_0x42ba6b(0x227)][_0x42ba6b(0x201)](_0x2bc282,_0x46b62e,_0x5a3f6b,_0x2b060d,_0x1b5483,_0x1f329f-_0x2b060d/0x2,_0x216a0c-_0x1b5483);},VisuMZ['SaveCore'][_0x148973(0x26f)]=Window_Options['prototype'][_0x148973(0x203)],Window_Options[_0x148973(0x1c4)][_0x148973(0x203)]=function(){const _0x5434fd=_0x148973;VisuMZ['SaveCore']['Window_Options_addGeneralOptions']['call'](this),this[_0x5434fd(0x112)]();},Window_Options[_0x148973(0x1c4)][_0x148973(0x112)]=function(){const _0x661cb8=_0x148973;if(VisuMZ[_0x661cb8(0x178)][_0x661cb8(0x1c0)]['AutosaveOption']['AddOption']){if(_0x661cb8(0x15b)!==_0x661cb8(0x15b)){function _0x273de3(){const _0x77c31c=_0x661cb8;return _0x11c765[_0x77c31c(0x12b)]?_0x2d73a4[_0x77c31c(0x1c4)][_0x77c31c(0x173)][_0x77c31c(0x1d5)](this,_0x2b7e93):'';}}else this[_0x661cb8(0x239)]();}},Window_Options[_0x148973(0x1c4)][_0x148973(0x239)]=function(){const _0xaef900=_0x148973,_0x124c9b=TextManager['autosaveOption'],_0x4201a8=_0xaef900(0x248);this['addCommand'](_0x124c9b,_0x4201a8);};function Window_AutosaveConfirm(){const _0x2a46c0=_0x148973;this[_0x2a46c0(0x1d3)](...arguments);}Window_AutosaveConfirm['prototype']=Object['create'](Window_Base[_0x148973(0x1c4)]),Window_AutosaveConfirm[_0x148973(0x1c4)]['constructor']=Window_AutosaveConfirm,Window_AutosaveConfirm['prototype'][_0x148973(0x1d3)]=function(_0x20b2cc){const _0x5a85fd=_0x148973;this[_0x5a85fd(0x252)]=0x0,Window_Base[_0x5a85fd(0x1c4)][_0x5a85fd(0x1d3)]['call'](this,_0x20b2cc),this['opacity']=0x0,this['contentsOpacity']=0x0;},Window_AutosaveConfirm[_0x148973(0x1c4)][_0x148973(0x267)]=function(){const _0x4e7ace=_0x148973,_0x2710ec=0x0,_0x25991e=0x0,_0x2a74e0=this['innerWidth'],_0x5a7a8b=this[_0x4e7ace(0x215)],_0x14d908=ColorManager[_0x4e7ace(0x1eb)](),_0x582af0=ColorManager[_0x4e7ace(0x134)](),_0x339dd1=_0x2a74e0/0x2;this['contents'][_0x4e7ace(0x1b4)](_0x2710ec,_0x25991e,_0x339dd1,_0x5a7a8b,_0x582af0,_0x14d908),this[_0x4e7ace(0x227)][_0x4e7ace(0x1b4)](_0x2710ec+_0x339dd1,_0x25991e,_0x339dd1,_0x5a7a8b,_0x14d908,_0x582af0);},Window_AutosaveConfirm[_0x148973(0x1c4)][_0x148973(0x175)]=function(_0x503b0c){const _0x59bc6=_0x148973;this[_0x59bc6(0x26c)]=_0x503b0c,this[_0x59bc6(0x22a)]();},Window_AutosaveConfirm[_0x148973(0x1c4)][_0x148973(0x22a)]=function(){const _0x29a339=_0x148973;this[_0x29a339(0x227)][_0x29a339(0x193)]();const _0x54744a=this[_0x29a339(0x26c)]?TextManager[_0x29a339(0x1fe)]:TextManager[_0x29a339(0x1af)],_0x2d8267=this[_0x29a339(0x23d)](_0x54744a)[_0x29a339(0x2a2)];this[_0x29a339(0x2a2)]=_0x2d8267+($gameSystem[_0x29a339(0x1ee)]()+this[_0x29a339(0x189)]())*0x2,this['updatePosition'](),this[_0x29a339(0x195)]();const _0x312ce0=(this[_0x29a339(0x269)]-_0x2d8267)/0x2;this[_0x29a339(0x267)](),this[_0x29a339(0x21d)](_0x54744a,_0x312ce0,0x0,_0x2d8267);},Window_AutosaveConfirm[_0x148973(0x1c4)][_0x148973(0x149)]=function(){const _0x25d89b=_0x148973;return VisuMZ['SaveCore'][_0x25d89b(0x1c0)][_0x25d89b(0x23c)][_0x25d89b(0x118)];},Window_AutosaveConfirm['prototype'][_0x148973(0x1fc)]=function(){const _0x4f4e85=_0x148973,_0xa1cc65=this[_0x4f4e85(0x149)]();if(_0xa1cc65[_0x4f4e85(0x294)](/upper/i)){if(_0x4f4e85(0x272)==='CQfEK'){function _0x4c3c2a(){const _0x5eb430=_0x4f4e85;return _0x502ac4[_0x5eb430(0x1e7)]=_0x24ec6c[_0x5eb430(0x1e7)]||[],_0x45d7e3[_0x5eb430(0x1e7)][_0x5202d7]===_0x10de05&&(_0x52b4b1[_0x5eb430(0x1e7)][_0x2da238]=0x0),_0x1f3f88[_0x5eb430(0x1e7)][_0xa2497];}}else this['y']=-0x1*$gameSystem['windowPadding']();}else{if(_0xa1cc65[_0x4f4e85(0x294)](/lower/i)){if(_0x4f4e85(0x119)!==_0x4f4e85(0x219))this['y']=Graphics[_0x4f4e85(0x158)]-this[_0x4f4e85(0x158)]+$gameSystem[_0x4f4e85(0x1ee)]();else{function _0x59c04b(){const _0x4c6b4b=_0x4f4e85;_0x4aeaa0=_0x448ea3[_0x4c6b4b(0x240)](/\\N\[(\d+)\]/gi,(_0x8e3707,_0x545501)=>_0x2b4c7d[_0x4c6b4b(0x1c4)][_0x4c6b4b(0x166)](_0x277266(_0x545501)));}}}else this['y']=(Graphics[_0x4f4e85(0x158)]-this[_0x4f4e85(0x158)])/0x2;}if(_0xa1cc65['match'](/left/i))this['x']=-0x1*$gameSystem[_0x4f4e85(0x1ee)]();else _0xa1cc65['match'](/right/i)?this['x']=Graphics[_0x4f4e85(0x2a2)]-this[_0x4f4e85(0x2a2)]+$gameSystem[_0x4f4e85(0x1ee)]():this['x']=(Graphics['width']-this[_0x4f4e85(0x2a2)])/0x2;},Window_AutosaveConfirm[_0x148973(0x1c4)][_0x148973(0x218)]=function(){const _0x296289=_0x148973;Window_Base[_0x296289(0x1c4)][_0x296289(0x218)]['call'](this);if(this[_0x296289(0x252)]!==0x0)this[_0x296289(0x27a)]();},Window_AutosaveConfirm[_0x148973(0x1c4)][_0x148973(0x27a)]=function(){const _0x46a1ac=_0x148973;this[_0x46a1ac(0x234)]+=this[_0x46a1ac(0x252)];if(this['contentsOpacity']>=0xff||this['contentsOpacity']<=0x0)this['setFadeSpeed'](0x0);},Window_AutosaveConfirm[_0x148973(0x1c4)][_0x148973(0x1c7)]=function(_0x559e66){this['_fadeSpeed']=_0x559e66;},Window_AutosaveConfirm['prototype'][_0x148973(0x1a8)]=function(){const _0x2ffee4=_0x148973;this[_0x2ffee4(0x1c7)](0x10);},Window_AutosaveConfirm['prototype'][_0x148973(0x1ad)]=function(){const _0x34f760=_0x148973;this[_0x34f760(0x1c7)](-0x10);},VisuMZ[_0x148973(0x178)][_0x148973(0x29f)]=Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1d7)],Window_SavefileList['prototype'][_0x148973(0x1d7)]=function(_0x24ea74,_0x2c0c2e){const _0x1052bd=_0x148973;if(StorageManager[_0x1052bd(0x1bb)]()===_0x1052bd(0x226))_0x2c0c2e=![];if($gameTemp['_pickLockedSaveSlot'])_0x2c0c2e=![];VisuMZ[_0x1052bd(0x178)][_0x1052bd(0x29f)][_0x1052bd(0x1d5)](this,_0x24ea74,_0x2c0c2e);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x18c)]=function(){const _0x5345c2=_0x148973,_0x580522=VisuMZ[_0x5345c2(0x178)][_0x5345c2(0x1c0)][_0x5345c2(0x1cc)],_0xf1a3f4=this[_0x5345c2(0x1a5)]();switch(_0xf1a3f4){case _0x5345c2(0x144):return _0x580522[_0x5345c2(0x128)];break;case _0x5345c2(0x18a):return _0x580522[_0x5345c2(0x24d)];break;case'large':return _0x580522[_0x5345c2(0x160)];break;default:return _0x580522[_0x5345c2(0x123)];break;}},Window_SavefileList['prototype'][_0x148973(0x288)]=function(){const _0x18c834=_0x148973,_0x2b5803=VisuMZ[_0x18c834(0x178)][_0x18c834(0x1c0)]['SaveMenu'],_0x115664=this['menuStyle']();switch(_0x115664){case _0x18c834(0x144):return _0x2b5803[_0x18c834(0x10d)];break;case _0x18c834(0x18a):return _0x2b5803[_0x18c834(0x25d)];break;case _0x18c834(0x15a):return _0x2b5803[_0x18c834(0x117)];break;default:return _0x2b5803[_0x18c834(0x25b)];break;}},Window_SavefileList[_0x148973(0x1c4)]['resetWordWrap']=function(){const _0x19946a=_0x148973;if(Imported[_0x19946a(0x12b)]){if('SLuWd'!==_0x19946a(0x1c8))Window_Selectable[_0x19946a(0x1c4)][_0x19946a(0x115)][_0x19946a(0x1d5)](this);else{function _0x25395f(){const _0x3dc865=_0x19946a;_0x261e4a['ConvertParams'](_0x1382c5,_0x339ea2);if(_0x53b3bd)_0x39b652[_0x3dc865(0x21f)](_0x31ffae[_0x3dc865(0x1b0)]);}}}},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x173)]=function(_0xd5ff89){const _0x4862e3=_0x148973;return Imported['VisuMZ_1_MessageCore']?Window_Selectable[_0x4862e3(0x1c4)]['setWordWrap'][_0x4862e3(0x1d5)](this,_0xd5ff89):'';},Window_SavefileList['prototype'][_0x148973(0x22b)]=function(){const _0x85f430=_0x148973;return VisuMZ[_0x85f430(0x178)][_0x85f430(0x1c0)]['ActorGraphic'];},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1a5)]=function(){const _0xc9dcb9=_0x148973;return VisuMZ[_0xc9dcb9(0x178)][_0xc9dcb9(0x1c0)][_0xc9dcb9(0x271)];},Window_SavefileList[_0x148973(0x1c4)]['selectSavefile']=function(_0x5c0eee){const _0x5aee66=_0x148973,_0x4364da=Math['max'](0x0,this[_0x5aee66(0x210)](_0x5c0eee));this[_0x5aee66(0x277)](_0x4364da);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1ff)]=function(_0x588721){const _0x23207b=_0x148973,_0x5cc007=this[_0x23207b(0x2a1)](_0x588721),_0x3de1cd=DataManager[_0x23207b(0x299)](_0x5cc007);if(_0x3de1cd)_0x3de1cd[_0x23207b(0x129)]=_0x5cc007;this[_0x23207b(0x281)]=_0x5cc007;const _0x45156b=this[_0x23207b(0x217)](_0x588721);this[_0x23207b(0x161)](),this[_0x23207b(0x25f)](this['isEnabled'](_0x5cc007)),this[_0x23207b(0x273)](_0x3de1cd,_0x45156b);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1bf)]=function(_0x1b46a4,_0x575fc0,_0x2f18e4){const _0x1522ae=_0x148973;if(_0x1b46a4===0x0){if('zZkyh'==='zZkyh')this[_0x1522ae(0x29e)](TextManager[_0x1522ae(0x248)],_0x575fc0,_0x2f18e4,0xb4);else{function _0x2f0179(){const _0x31f9ca=_0x1522ae;_0x234f56[_0x31f9ca(0x178)][_0x31f9ca(0x20a)][_0x31f9ca(0x1d5)](this,_0x17736d),this['autosave']=_0x5a2049[_0x31f9ca(0x248)]!==_0xc93a5b?_0x24d5bc['autosave']:_0x380e13[_0x31f9ca(0x178)]['Settings'][_0x31f9ca(0x18d)][_0x31f9ca(0x13e)],this[_0x31f9ca(0x1e1)]=_0x57574d[_0x31f9ca(0x1e1)]||[],this['globalVariables']=_0x4afd3d['globalVariables']||[];}}}else this['drawText'](TextManager[_0x1522ae(0x183)]+'\x20'+_0x1b46a4,_0x575fc0,_0x2f18e4,0xb4);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1da)]=function(_0x3ded6c,_0xbecd51,_0x50e4d5){const _0x23c2d4=_0x148973;if(_0x3ded6c===0x0||DataManager[_0x23c2d4(0x291)]()!==_0x3ded6c)return;const _0x3c03a5=TextManager['latestSave'];this['changeTextColor'](ColorManager['latestSavefile']()),this[_0x23c2d4(0x29e)](_0x3c03a5,_0xbecd51,_0x50e4d5,0xb4);},Window_SavefileList[_0x148973(0x1c4)]['drawActors']=function(_0xa626f7,_0x40e237,_0x38a047,_0x49467c,_0x5c375f){const _0x2460d=_0x148973;if(!_0xa626f7['characters'])return;const _0x4b8549=this['actorStyle']();switch(_0x4b8549){case _0x2460d(0x237):this['drawActorFaces'](_0xa626f7,_0x40e237,_0x38a047,_0x49467c,_0x5c375f);break;case _0x2460d(0x27f):this[_0x2460d(0x121)](_0xa626f7,_0x40e237,_0x38a047,_0x49467c,_0x5c375f);break;case _0x2460d(0x28f):this[_0x2460d(0x156)](_0xa626f7,_0x40e237,_0x38a047,_0x49467c,_0x5c375f);break;default:break;}},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1e3)]=function(_0x4a40a4,_0x57489b,_0xe9b3fe,_0x2f5994,_0xe785d1){const _0x45fffc=_0x148973,_0x2c9de4=Math[_0x45fffc(0x181)](_0x4a40a4[_0x45fffc(0x1a9)]['length'],$gameParty[_0x45fffc(0x133)]()),_0xec3107=Math[_0x45fffc(0x181)](ImageManager[_0x45fffc(0x199)],Math[_0x45fffc(0x19e)](_0x2f5994/_0x2c9de4));_0x57489b=_0x57489b+Math[_0x45fffc(0x22c)]((_0x2f5994-_0x2c9de4*_0xec3107)/0x2);for(const _0x1fd3a4 of _0x4a40a4['faces']){this[_0x45fffc(0x1d6)](_0x1fd3a4[0x0],_0x1fd3a4[0x1],_0x57489b,_0xe9b3fe+0x1,_0xec3107,_0xe785d1-0x2),_0x57489b+=_0xec3107;}},ImageManager[_0x148973(0x138)]=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)][_0x148973(0x1cc)]['SpriteWidth'],ImageManager[_0x148973(0x1b6)]=VisuMZ[_0x148973(0x178)][_0x148973(0x1c0)]['SaveMenu'][_0x148973(0x14c)],Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x121)]=function(_0x12fd48,_0x1f7e9c,_0x21b8fe,_0x587849,_0x517cfd){const _0x18aa17=_0x148973,_0xc2331f=Math[_0x18aa17(0x181)](_0x12fd48[_0x18aa17(0x185)][_0x18aa17(0x256)],$gameParty[_0x18aa17(0x133)]()),_0x211355=ImageManager[_0x18aa17(0x138)];_0x1f7e9c=_0x1f7e9c+Math[_0x18aa17(0x22c)]((_0x587849-_0xc2331f*_0x211355)/0x2)+_0x211355/0x2,_0x21b8fe=_0x21b8fe+_0x517cfd-0x8;for(const _0x5117a9 of _0x12fd48[_0x18aa17(0x185)]){this[_0x18aa17(0x1ec)](_0x5117a9[0x0],_0x5117a9[0x1],_0x1f7e9c,_0x21b8fe),_0x1f7e9c+=_0x211355;}},Window_SavefileList['prototype'][_0x148973(0x156)]=function(_0x47c857,_0xb42d4a,_0x44c79e,_0x6a7246,_0x2d02b2){const _0x494ac9=_0x148973;if(!_0x47c857[_0x494ac9(0x15d)])return this['drawActorSprites'](_0x47c857,_0xb42d4a,_0x44c79e,_0x6a7246,_0x2d02b2);const _0x3544ae=Math['min'](_0x47c857[_0x494ac9(0x15d)][_0x494ac9(0x256)],$gameParty['maxBattleMembers']()),_0x448fd3=ImageManager[_0x494ac9(0x1b6)];_0xb42d4a=_0xb42d4a+Math[_0x494ac9(0x22c)]((_0x6a7246-_0x3544ae*_0x448fd3)/0x2)+_0x448fd3/0x2,_0x44c79e=_0x44c79e+_0x2d02b2-0x8;for(const _0x1727cc of _0x47c857[_0x494ac9(0x15d)]){this['drawSvActor'](_0x1727cc,_0xb42d4a,_0x44c79e),_0xb42d4a+=_0x448fd3;}},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x257)]=function(_0xbb50bd,_0x5e18b2,_0x47c21d,_0x127ddd,_0x34ae76,_0xec4df1){const _0x1997ac=_0x148973;if(_0xbb50bd==='')return;_0x5e18b2+=0x2,_0x47c21d+=0x2,_0x127ddd-=0x4,_0x34ae76-=0x4;const _0x3de7d6=ImageManager['loadPicture'](_0xbb50bd),_0x220636=_0x3de7d6['width'],_0x101bbe=_0x3de7d6[_0x1997ac(0x158)],_0x28a378=Math[_0x1997ac(0x181)](_0x127ddd/_0x220636,_0x34ae76/_0x101bbe,_0xec4df1?0x1:0x3e8),_0x32873f=Math[_0x1997ac(0x186)](_0x3de7d6[_0x1997ac(0x2a2)]*_0x28a378),_0x4ffca1=Math['ceil'](_0x3de7d6['height']*_0x28a378);this[_0x1997ac(0x230)][_0x1997ac(0x201)](_0x3de7d6,0x0,0x0,_0x220636,_0x101bbe,_0x5e18b2,_0x47c21d,_0x32873f,_0x4ffca1);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x212)]=function(_0x19817e,_0x2b43d1,_0x58f26e,_0x2e94f2,_0x19db07,_0x5a524c){const _0x171fd5=_0x148973;if(_0x19817e==='')return;_0x2b43d1+=0x2,_0x58f26e+=0x2,_0x2e94f2-=0x4,_0x19db07-=0x4;const _0x33bec0=ImageManager[_0x171fd5(0x28b)](_0x19817e),_0xb8d8b9=_0x33bec0[_0x171fd5(0x2a2)],_0x50abe1=_0x33bec0[_0x171fd5(0x158)],_0x3db711=Math[_0x171fd5(0x181)](_0x2e94f2/_0xb8d8b9,_0x19db07/_0x50abe1,_0x5a524c?0x1:0x3e8),_0xc299db=Math[_0x171fd5(0x186)](_0x33bec0['width']*_0x3db711),_0x980db9=Math[_0x171fd5(0x186)](_0x33bec0['height']*_0x3db711);_0x2b43d1+=(_0x2e94f2-_0xc299db)/0x2,_0x58f26e+=(_0x19db07-_0x980db9)/0x2,this[_0x171fd5(0x230)]['blt'](_0x33bec0,0x0,0x0,_0xb8d8b9,_0x50abe1,_0x2b43d1,_0x58f26e,_0xc299db,_0x980db9);},Window_SavefileList['prototype'][_0x148973(0x1ae)]=function(_0x29b638,_0x2c5aa8,_0x28026e,_0x2db8bc,_0x4c97ef){const _0x2741ba=_0x148973;_0x29b638[_0x2741ba(0x191)]&&(_0x4c97ef=_0x4c97ef||_0x2741ba(0x1bd),this[_0x2741ba(0x29e)](_0x29b638[_0x2741ba(0x191)],_0x2c5aa8,_0x28026e,_0x2db8bc,_0x4c97ef));},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x24e)]=function(_0x1b4246,_0x49e200,_0x118d87,_0x1a82b7,_0x543fb3){const _0x4f0bff=_0x148973;if(_0x1b4246['timestamp']){if(_0x4f0bff(0x1d9)!=='VFQBT'){function _0x327078(){const _0x9e8123=_0x4f0bff;if(this[_0x9e8123(0x213)]===_0x1315b2)this['initSaveCore']();if(this['_SaveCoreSettings']['savePicture']===_0x5e40b8)this[_0x9e8123(0x12f)]();this[_0x9e8123(0x213)][_0x9e8123(0x205)]=_0x248ff6;}}else{_0x543fb3=_0x543fb3||'left';const _0x44f15a=this[_0x4f0bff(0x1f3)](_0x1b4246);this[_0x4f0bff(0x29e)](_0x44f15a,_0x49e200,_0x118d87,_0x1a82b7,_0x543fb3);}}},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1f3)]=function(_0x3b128d){const _0x59f78a=_0x148973,_0x3faff3=_0x3b128d[_0x59f78a(0x1c1)],_0x3fe1a4=new Date(_0x3faff3);let _0x4c6850=_0x59f78a(0x14f);_0x4c6850=_0x4c6850[_0x59f78a(0x240)](/\[YEAR\]/gi,'%1'),_0x4c6850=_0x4c6850[_0x59f78a(0x240)](/\[MONTH\]/gi,'%2'),_0x4c6850=_0x4c6850['replace'](/\[DATE\]/gi,'%3'),_0x4c6850=_0x4c6850['replace'](/\[HOUR\]/gi,'%4'),_0x4c6850=_0x4c6850[_0x59f78a(0x240)](/\[MINUTE\]/gi,'%5'),_0x4c6850=_0x4c6850[_0x59f78a(0x240)](/\[SECOND\]/gi,'%6');let _0x2a1d47=String(_0x3fe1a4[_0x59f78a(0x207)]())[_0x59f78a(0x275)]('')[_0x59f78a(0x293)]('​');return _0x4c6850[_0x59f78a(0x116)](_0x2a1d47[_0x59f78a(0x11b)](0x4,'0'),String(_0x3fe1a4[_0x59f78a(0x1d1)]()+0x1)['padStart'](0x2,'0'),String(_0x3fe1a4['getDate']())[_0x59f78a(0x11b)](0x2,'0'),String(_0x3fe1a4[_0x59f78a(0x1a2)]())[_0x59f78a(0x11b)](0x2,'0'),String(_0x3fe1a4[_0x59f78a(0x1f4)]())[_0x59f78a(0x11b)](0x2,'0'),String(_0x3fe1a4['getSeconds']())[_0x59f78a(0x11b)](0x2,'0'));},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x270)]=function(_0x17093d,_0x4f782f,_0x4bfa69,_0xf259c6){const _0x3b503b=_0x148973;if(_0x17093d[_0x3b503b(0x235)]===undefined)return;const _0x313cf9=_0x17093d['gold'],_0x2982be=TextManager[_0x3b503b(0x1d0)];Window_SavefileList[_0x3b503b(0x1c4)][_0x3b503b(0x286)]['call'](this,_0x313cf9,_0x2982be,_0x4f782f,_0x4bfa69,_0xf259c6);},Window_SavefileList['prototype']['drawDescription']=function(_0x477411,_0x6c7a54,_0x3048d7,_0x22241c,_0x2b5c51){const _0x426e17=_0x148973;if(_0x477411[_0x426e17(0x1d2)]){if(_0x426e17(0x18f)!=='NqsOY'){const _0x4b6a15=this['textSizeEx'](_0x477411['description'])[_0x426e17(0x2a2)];_0x2b5c51=_0x2b5c51||_0x426e17(0x1bd);if(_0x2b5c51===_0x426e17(0x1cb))_0x6c7a54=_0x6c7a54+_0x22241c-_0x4b6a15;else _0x2b5c51===_0x426e17(0x19c)&&(_0x6c7a54=_0x6c7a54+(_0x22241c-_0x4b6a15)/0x2);this[_0x426e17(0x21d)](_0x477411[_0x426e17(0x1d2)],_0x6c7a54,_0x3048d7,_0x22241c);}else{function _0x134162(){const _0x56edce=_0x426e17;this[_0x56edce(0x29e)](_0x5f48c5[_0x56edce(0x248)],_0x5e68b9,_0x4638e0,0xb4);}}}},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x273)]=function(_0x1f2e41,_0x5bfdef){const _0x354971=_0x148973;if(_0x1f2e41){if(_0x354971(0x1f7)!==_0x354971(0x1ef)){const _0x954c6f=ImageManager['loadPicture'](_0x1f2e41[_0x354971(0x200)]||'');_0x954c6f[_0x354971(0x20e)](this[_0x354971(0x1a6)]['bind'](this,_0x1f2e41,_0x5bfdef));}else{function _0x40602b(){const _0x5b8e24=_0x354971;if(this[_0x5b8e24(0x243)])this[_0x5b8e24(0x243)][_0x5b8e24(0x1ad)]();}}}else{if(_0x354971(0x27c)==='CDFJY')this['drawFileData'](this[_0x354971(0x281)],_0x5bfdef);else{function _0x20e3a0(){const _0x889227=_0x354971;_0x32f115[_0x889227(0x14e)]?this[_0x889227(0x1d8)](_0x39ed66):_0x8d173b['SaveCore']['Scene_Save_executeSave'][_0x889227(0x1d5)](this,_0x1f815b);}}}},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x1a6)]=function(_0x511c65,_0x5b1f55){const _0x100d28=_0x148973,_0x32b3c1=this[_0x100d28(0x1a5)]();switch(_0x32b3c1){case'vertical':this[_0x100d28(0x28a)](_0x511c65,_0x5b1f55);break;case _0x100d28(0x18a):this[_0x100d28(0x19f)](_0x511c65,_0x5b1f55);break;case _0x100d28(0x15a):this[_0x100d28(0x125)](_0x511c65,_0x5b1f55);break;default:this[_0x100d28(0x126)](_0x511c65,_0x5b1f55);break;}this[_0x100d28(0x161)]();const _0x5cb4d2=_0x511c65[_0x100d28(0x129)];this[_0x100d28(0x26b)](_0x5cb4d2,_0x5b1f55);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x26b)]=function(_0x32d23b,_0x2d45f5){const _0x383625=_0x148973,_0x33328f=this[_0x383625(0x1a5)]();switch(_0x33328f){case'vertical':this['drawVerticalStyleFileData'](_0x32d23b,_0x2d45f5);break;case _0x383625(0x18a):this[_0x383625(0x1be)](_0x32d23b,_0x2d45f5);break;case _0x383625(0x15a):this[_0x383625(0x13f)](_0x32d23b,_0x2d45f5);break;default:this['drawListStyleFileData'](_0x32d23b,_0x2d45f5);break;}},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x126)]=function(_0x19a407,_0xcff0dd){const _0x4ee309=_0x148973;VisuMZ[_0x4ee309(0x178)]['Settings'][_0x4ee309(0x1cc)][_0x4ee309(0x29d)][_0x4ee309(0x1d5)](this,_0x19a407,_0xcff0dd);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x28a)]=function(_0x34851b,_0x4f8f60){const _0x3b8dd2=_0x148973;VisuMZ[_0x3b8dd2(0x178)]['Settings']['SaveMenu'][_0x3b8dd2(0x238)][_0x3b8dd2(0x1d5)](this,_0x34851b,_0x4f8f60);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x19f)]=function(_0xe087dd,_0x295068){const _0x4063d5=_0x148973;VisuMZ[_0x4063d5(0x178)][_0x4063d5(0x1c0)][_0x4063d5(0x1cc)][_0x4063d5(0x221)]['call'](this,_0xe087dd,_0x295068);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x125)]=function(_0x119dfd,_0x358709){const _0x293d64=_0x148973;VisuMZ[_0x293d64(0x178)][_0x293d64(0x1c0)][_0x293d64(0x1cc)][_0x293d64(0x1f8)][_0x293d64(0x1d5)](this,_0x119dfd,_0x358709);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x250)]=function(_0x53393f,_0x550172){const _0x14ce10=_0x148973;VisuMZ[_0x14ce10(0x178)][_0x14ce10(0x1c0)][_0x14ce10(0x1cc)][_0x14ce10(0x151)][_0x14ce10(0x1d5)](this,_0x53393f,_0x550172);},Window_SavefileList['prototype'][_0x148973(0x16a)]=function(_0x31ac0a,_0x2aac23){const _0x182bfe=_0x148973;VisuMZ[_0x182bfe(0x178)][_0x182bfe(0x1c0)][_0x182bfe(0x1cc)][_0x182bfe(0x265)][_0x182bfe(0x1d5)](this,_0x31ac0a,_0x2aac23);},Window_SavefileList['prototype']['drawBoxStyleFileData']=function(_0x2e8402,_0x5b5dde){const _0x486385=_0x148973;VisuMZ[_0x486385(0x178)][_0x486385(0x1c0)]['SaveMenu'][_0x486385(0x16d)]['call'](this,_0x2e8402,_0x5b5dde);},Window_SavefileList[_0x148973(0x1c4)][_0x148973(0x13f)]=function(_0x574efa,_0x2a2dd8){const _0x236ef6=_0x148973;VisuMZ[_0x236ef6(0x178)][_0x236ef6(0x1c0)][_0x236ef6(0x1cc)]['LargeFileDataJS'][_0x236ef6(0x1d5)](this,_0x574efa,_0x2a2dd8);};