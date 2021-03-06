//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.07] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
 * 
 * ---
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x11c1=['ARRAYEVAL','createGoldWindow','ConvertParams','opacity','maxVisibleItems','loadOtherActorImages','addChild','AutoGoldHeight','_menuImage','changeTextColor','variableWindowRect','currentSymbol','commandStyleCheck','push','_goldWindow','_scene','getMenuImageOffsetX','addOptionsCommand','faceHeight','_duration','EVAL','commandWindowRectThinTopStyle','playtimeText','format','open','Scene_Menu_createStatusWindow','center','initMenuImage','parse','PersonalHandlerJS','makeMainMenuCoreCommandList','StatusSelectLast','updateTimer','replace','systemColor','CustomCmdWin','createDummyWindow','value','CommandWindowStyle','thin','prototype','thinGoldWindow','ThinStyle','setHandler','addLoadListener','_targetY','itemHeight','Window_MenuStatus_drawItemImage','boxWidth','iconWidth','BgType','save','length','Cols','isExpGaugeDrawn','Style','formation','212190bPVYzO','floor','onBitmapLoad','adjustDefaultCommandWindowRect','setActor','Scene_Menu_goldWindowRect','NUM','lineHeight','item','JSON','description','FontSize','filter','drawTimeLabel','svActorHorzCells','_bitmapReady','makeCommandList','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','StatusGraphic','return\x200','drawItemStatusThickerStyle','_timer','setup','max','commandStyle','match','Window_MenuCommand_initialize','update','ARRAYJSON','createPlaytimeWindow','PortraitStyle','icon','toUpperCase','registerCommand','height','Step1','popScene','drawTimeIcon','createBackground','gameEnd','drawItemStatus','canCreateVariableWindow','Settings','drawPlaytime','commandName','adjustStatusWindowMobile','itemTextAlign','drawItemStatusDefaultStyle','drawItemActorSprite','commandFormation','drawPendingItemBackground','ARRAYFUNC','WindowRect','trim','maxBattleMembers','contents','map','bottom','textSizeEx','commandWindowRectTopStyle','exit','Scene_Menu_create','call','_targetX','commandWindowRectThinBottomStyle','ShowReserve','mainAreaTop','iconText','includes','isDisplayActorMenuBackgroundImage','ActorBgMenus','vertical','mainAreaBottom','Step1End','drawItemStatusSoloStyleOnLoad','statusWindowRectTopStyle','mobile','22349LnfFwW','thicker','openness','HideMainMenuOnly','Window_MenuStatus_maxItems','66AiabTb','drawItem','none','thinTop','ARRAYNUM','mainAreaHeight','colSpacing','calcWindowHeight','goldWindowRectBottomStyle','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','clear','Scene_MenuBase_createBackground','ChangeActorMenuImageGroup','needsDummyWindow','_commandList','createActorMenuBackgroundImageSprite','status','isSoloQuickMode','cancel','drawIcon','addMainCommands','Enable','ARRAYSTR','resetTextColor','CallHandlerJS','_statusWindow','svbattler','loadFaceImages','drawItemImage','fontSize','getMenuImageOffsetY','portrait','Game_Actor_setup','showOnlyBattleMembers','create','ThickerStyle','Step2','ARRAYSTRUCT','drawActorFace','statusWindowRectBottomStyle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','commandNameWindowDrawBackground','variableWindowRectBottomStyle','TextJS','drawTextEx','drawItemActorSvBattler','right','commandWindowStyle','_playtimeText','ListStyles','min','Rows','AdjustCommandHeight','_variableWindow','drawItemStatusPortraitStyleOnLoad','ceil','updateCommandNameWindow','actor','maxCols','blt','index','solo','width','createCommandWindow','Scene_Menu_onPersonalCancel','round','MainMenuCore','text','ChangeActorMenuImageJS','note','Scene_Menu_statusWindowRect','2OiFPwX','updateActor','11455yqexOh','Scene_MenuBase_updateActor','10syDOxD','Scene_Menu_commandPersonal','listStyle','MobileThickness','svActorVertCells','784594dGHfes','EnableJS','addSaveCommand','commandNameWindowDrawText','callUpdateHelp','Playtime','336204dCqaTW','CommandList','itemLineRect','thinBottom','185048LxyRTz','_actor','General','InnerMenuListStyle','drawText','bind','commandPersonal','getMenuImage','initialize','Window_StatusBase_loadFaceImages','updateDuration','drawItemStatusVerticalStyle','canCreatePlaytimeWindow','graphicType','statusWindowRect','FUNC','Window_MenuStatus_selectLast','loadSvActor','_playtimeWindow','_data','bitmap','applyThinnerGoldWindowRect','adjustCommandHeightByVariable','drawItemStyleIconText','refresh','innerWidth','_commandWindow','loadBitmap','drawItemStatusPortraitStyle','addFormationCommand','parameters','Scene_Menu_commandFormation','shift','addOriginalCommands','Step1Start','goldWindowRectTopStyle','setMenuImage','addSymbolBridge','iconHeight','sprite','isBattleMember','TextAlign','reserveCommonEvent','battlerName','VarList','drawItemStatusThinStyle','createCommandNameWindow','drawItemActorFace','Untitled','close','onFormationCancel','Variable','commandWindowRectBottomStyle','resetFontSettings','Window_MenuStatus_itemHeight','innerHeight','SoloQuick','drawItemStyleIcon','concat','adjustCommandHeightByPlaytime','Scene_Menu_onFormationCancel','mainCommandWidth','createStatusWindow','constructor','selectLast','commandWindowRectMobileStyle','Icon','Scene_Menu_commandWindowRect','itemRect','ActorBgMenuJS','SoloStyle','addWindow','characterIndex','createVariableWindow','addGameEndCommand','members','_dummyWindow','goldWindowRect','drawItemBackground','name','left','drawItemActorMenuImage','TextStr','_commandNameWindow','VerticalStyle','isCommandEnabled','playtimeWindowRect','variableWindowRectTopStyle','6841wSiqfC','updatePosition','drawAllItems','currentExt','_actorMenuBgSprite','maxItems','playtimeWindowRectBottomStyle','statusWindowRectMobileStyle','commandWindowRect','ChangeActorMenuImageRange','changePaintOpacity','setTargetActor','loadPicture','loadCharacter','playtimeWindowRectTopStyle','faceWidth','default','top'];const _0x4ff4=function(_0x409570,_0x554808){_0x409570=_0x409570-0x1e6;let _0x11c1be=_0x11c1[_0x409570];return _0x11c1be;};const _0x1d5557=_0x4ff4;(function(_0x5638cb,_0x87ba6e){const _0x5eb7dd=_0x4ff4;while(!![]){try{const _0x4267c9=parseInt(_0x5eb7dd(0x280))+parseInt(_0x5eb7dd(0x225))*-parseInt(_0x5eb7dd(0x275))+-parseInt(_0x5eb7dd(0x284))*parseInt(_0x5eb7dd(0x271))+parseInt(_0x5eb7dd(0x273))+parseInt(_0x5eb7dd(0x327))+-parseInt(_0x5eb7dd(0x2dc))*parseInt(_0x5eb7dd(0x22a))+parseInt(_0x5eb7dd(0x27a));if(_0x4267c9===_0x87ba6e)break;else _0x5638cb['push'](_0x5638cb['shift']());}catch(_0x2aa5e8){_0x5638cb['push'](_0x5638cb['shift']());}}}(_0x11c1,0x49157));var label=_0x1d5557(0x26c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1d5557(0x333)](function(_0xc5fd02){const _0x238a14=_0x1d5557;return _0xc5fd02[_0x238a14(0x23a)]&&_0xc5fd02['description'][_0x238a14(0x21c)]('['+label+']');})[0x0];VisuMZ[label][_0x1d5557(0x202)]=VisuMZ[label][_0x1d5557(0x202)]||{},VisuMZ['ConvertParams']=function(_0x3091a4,_0x7855e7){const _0x158e6c=_0x1d5557;for(const _0x24eb81 in _0x7855e7){if(_0x24eb81[_0x158e6c(0x1f1)](/(.*):(.*)/i)){const _0x2b2151=String(RegExp['$1']),_0x320eaf=String(RegExp['$2'])[_0x158e6c(0x1f8)]()['trim']();let _0x4748b0,_0x13d2ba,_0x23161f;switch(_0x320eaf){case _0x158e6c(0x32d):_0x4748b0=_0x7855e7[_0x24eb81]!==''?Number(_0x7855e7[_0x24eb81]):0x0;break;case _0x158e6c(0x22e):_0x13d2ba=_0x7855e7[_0x24eb81]!==''?JSON['parse'](_0x7855e7[_0x24eb81]):[],_0x4748b0=_0x13d2ba[_0x158e6c(0x210)](_0x2cfad6=>Number(_0x2cfad6));break;case _0x158e6c(0x302):_0x4748b0=_0x7855e7[_0x24eb81]!==''?eval(_0x7855e7[_0x24eb81]):null;break;case _0x158e6c(0x2ee):_0x13d2ba=_0x7855e7[_0x24eb81]!==''?JSON['parse'](_0x7855e7[_0x24eb81]):[],_0x4748b0=_0x13d2ba[_0x158e6c(0x210)](_0x93a71f=>eval(_0x93a71f));break;case _0x158e6c(0x330):_0x4748b0=_0x7855e7[_0x24eb81]!==''?JSON[_0x158e6c(0x30a)](_0x7855e7[_0x24eb81]):'';break;case _0x158e6c(0x1f4):_0x13d2ba=_0x7855e7[_0x24eb81]!==''?JSON[_0x158e6c(0x30a)](_0x7855e7[_0x24eb81]):[],_0x4748b0=_0x13d2ba['map'](_0x1c5a94=>JSON[_0x158e6c(0x30a)](_0x1c5a94));break;case _0x158e6c(0x293):_0x4748b0=_0x7855e7[_0x24eb81]!==''?new Function(JSON['parse'](_0x7855e7[_0x24eb81])):new Function(_0x158e6c(0x1eb));break;case _0x158e6c(0x20b):_0x13d2ba=_0x7855e7[_0x24eb81]!==''?JSON['parse'](_0x7855e7[_0x24eb81]):[],_0x4748b0=_0x13d2ba[_0x158e6c(0x210)](_0x1f1b9b=>new Function(JSON[_0x158e6c(0x30a)](_0x1f1b9b)));break;case'STR':_0x4748b0=_0x7855e7[_0x24eb81]!==''?String(_0x7855e7[_0x24eb81]):'';break;case _0x158e6c(0x240):_0x13d2ba=_0x7855e7[_0x24eb81]!==''?JSON[_0x158e6c(0x30a)](_0x7855e7[_0x24eb81]):[],_0x4748b0=_0x13d2ba[_0x158e6c(0x210)](_0x38d136=>String(_0x38d136));break;case'STRUCT':_0x23161f=_0x7855e7[_0x24eb81]!==''?JSON[_0x158e6c(0x30a)](_0x7855e7[_0x24eb81]):{},_0x3091a4[_0x2b2151]={},VisuMZ[_0x158e6c(0x2f0)](_0x3091a4[_0x2b2151],_0x23161f);continue;case _0x158e6c(0x24f):_0x13d2ba=_0x7855e7[_0x24eb81]!==''?JSON[_0x158e6c(0x30a)](_0x7855e7[_0x24eb81]):[],_0x4748b0=_0x13d2ba[_0x158e6c(0x210)](_0x521e0f=>VisuMZ[_0x158e6c(0x2f0)]({},JSON['parse'](_0x521e0f)));break;default:continue;}_0x3091a4[_0x2b2151]=_0x4748b0;}}return _0x3091a4;},(_0x3952d4=>{const _0x46ac62=_0x1d5557,_0x549768=_0x3952d4[_0x46ac62(0x2d3)];for(const _0x1953d8 of dependencies){if(!Imported[_0x1953d8]){alert(_0x46ac62(0x1e9)['format'](_0x549768,_0x1953d8)),SceneManager[_0x46ac62(0x214)]();break;}}const _0x49ff1f=_0x3952d4[_0x46ac62(0x331)];if(_0x49ff1f[_0x46ac62(0x1f1)](/\[Version[ ](.*?)\]/i)){const _0x2ff532=Number(RegExp['$1']);_0x2ff532!==VisuMZ[label]['version']&&(alert(_0x46ac62(0x252)['format'](_0x549768,_0x2ff532)),SceneManager['exit']());}if(_0x49ff1f[_0x46ac62(0x1f1)](/\[Tier[ ](\d+)\]/i)){const _0x3702b1=Number(RegExp['$1']);_0x3702b1<tier?(alert(_0x46ac62(0x233)[_0x46ac62(0x305)](_0x549768,_0x3702b1,tier)),SceneManager[_0x46ac62(0x214)]()):tier=Math[_0x46ac62(0x1ef)](_0x3702b1,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x46ac62(0x202)],_0x3952d4[_0x46ac62(0x2a2)]);})(pluginData),PluginManager[_0x1d5557(0x1f9)](pluginData[_0x1d5557(0x2d3)],_0x1d5557(0x236),_0x3f1569=>{const _0x130dfd=_0x1d5557;VisuMZ[_0x130dfd(0x2f0)](_0x3f1569,_0x3f1569);const _0x14c31c=_0x3f1569[_0x130dfd(0x1fb)],_0x26a5e7=_0x3f1569[_0x130dfd(0x24e)];for(let _0x609a8a of _0x14c31c){_0x609a8a=parseInt(_0x609a8a)||0x0;if(_0x609a8a<=0x0)continue;const _0x3faf9c=$gameActors['actor'](_0x609a8a);if(!_0x3faf9c)continue;_0x3faf9c[_0x130dfd(0x2a8)](_0x26a5e7);}}),PluginManager[_0x1d5557(0x1f9)](pluginData['name'],_0x1d5557(0x2e5),_0x2f1a2b=>{const _0x1ab22f=_0x1d5557;VisuMZ['ConvertParams'](_0x2f1a2b,_0x2f1a2b);const _0x5e945e=_0x2f1a2b[_0x1ab22f(0x221)]>=_0x2f1a2b[_0x1ab22f(0x2a6)]?_0x2f1a2b[_0x1ab22f(0x2a6)]:_0x2f1a2b[_0x1ab22f(0x221)],_0x61928=_0x2f1a2b[_0x1ab22f(0x221)]>=_0x2f1a2b[_0x1ab22f(0x2a6)]?_0x2f1a2b[_0x1ab22f(0x221)]:_0x2f1a2b[_0x1ab22f(0x2a6)],_0x3d72ee=Array(_0x61928-_0x5e945e+0x1)['fill']()[_0x1ab22f(0x210)]((_0x5d3f88,_0x514b93)=>_0x5e945e+_0x514b93),_0x5efc12=_0x2f1a2b[_0x1ab22f(0x24e)];for(let _0x5b57ec of _0x3d72ee){_0x5b57ec=parseInt(_0x5b57ec)||0x0;if(_0x5b57ec<=0x0)continue;const _0x1f358a=$gameActors[_0x1ab22f(0x263)](_0x5b57ec);if(!_0x1f358a)continue;_0x1f358a[_0x1ab22f(0x2a8)](_0x5efc12);}}),PluginManager['registerCommand'](pluginData['name'],_0x1d5557(0x26e),_0x3468c1=>{const _0x3c59d4=_0x1d5557;VisuMZ[_0x3c59d4(0x2f0)](_0x3468c1,_0x3468c1);const _0x21f9c1=_0x3468c1['Step1'];let _0x2c6776=[];while(_0x21f9c1[_0x3c59d4(0x322)]>0x0){const _0x50205c=_0x21f9c1[_0x3c59d4(0x2a4)]();Array['isArray'](_0x50205c)?_0x2c6776=_0x2c6776[_0x3c59d4(0x2be)](_0x50205c):_0x2c6776[_0x3c59d4(0x2fb)](_0x50205c);}const _0x1d5ae1=_0x3468c1[_0x3c59d4(0x24e)];for(let _0x59c7ac of _0x2c6776){_0x59c7ac=parseInt(_0x59c7ac)||0x0;if(_0x59c7ac<=0x0)continue;const _0x14121f=$gameActors[_0x3c59d4(0x263)](_0x59c7ac);if(!_0x14121f)continue;_0x14121f[_0x3c59d4(0x2a8)](_0x1d5ae1);}}),VisuMZ[_0x1d5557(0x26c)]['Game_Actor_setup']=Game_Actor[_0x1d5557(0x316)][_0x1d5557(0x1ee)],Game_Actor['prototype'][_0x1d5557(0x1ee)]=function(_0x266e90){const _0x99b432=_0x1d5557;VisuMZ[_0x99b432(0x26c)][_0x99b432(0x24a)]['call'](this,_0x266e90),this['initMenuImage']();},Game_Actor[_0x1d5557(0x316)][_0x1d5557(0x309)]=function(){const _0x1444a2=_0x1d5557;this[_0x1444a2(0x2f6)]='',this[_0x1444a2(0x263)]()&&this[_0x1444a2(0x263)]()[_0x1444a2(0x26f)][_0x1444a2(0x1f1)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this['_menuImage']=String(RegExp['$1']));},Game_Actor['prototype']['getMenuImage']=function(){const _0x59dffe=_0x1d5557;if(this[_0x59dffe(0x2f6)]===undefined)this[_0x59dffe(0x309)]();return this[_0x59dffe(0x2f6)];},Game_Actor['prototype'][_0x1d5557(0x2a8)]=function(_0x318e0d){const _0x527b4=_0x1d5557;if(this[_0x527b4(0x2f6)]===undefined)this[_0x527b4(0x309)]();this['_menuImage']=_0x318e0d;},Game_Actor[_0x1d5557(0x316)][_0x1d5557(0x2fe)]=function(){const _0x1958c5=_0x1d5557;if(this[_0x1958c5(0x263)]()[_0x1958c5(0x26f)][_0x1958c5(0x1f1)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()[_0x1958c5(0x26f)][_0x1958c5(0x1f1)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x1d5557(0x316)]['getMenuImageOffsetY']=function(){const _0x311cf7=_0x1d5557;if(this[_0x311cf7(0x263)]()[_0x311cf7(0x26f)][_0x311cf7(0x1f1)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x311cf7(0x263)]()[_0x311cf7(0x26f)][_0x311cf7(0x1f1)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x1d5557(0x316)][_0x1d5557(0x21d)]=function(){const _0x3c4377=_0x1d5557;return VisuMZ[_0x3c4377(0x26c)][_0x3c4377(0x202)]['General'][_0x3c4377(0x21e)][_0x3c4377(0x21c)](this[_0x3c4377(0x2c3)]['name']);},VisuMZ[_0x1d5557(0x26c)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x1d5557(0x316)]['createBackground'],Scene_MenuBase[_0x1d5557(0x316)][_0x1d5557(0x1fe)]=function(){const _0x138972=_0x1d5557;VisuMZ['MainMenuCore'][_0x138972(0x235)][_0x138972(0x216)](this),this[_0x138972(0x239)]();},Scene_MenuBase['prototype'][_0x1d5557(0x239)]=function(){const _0x3496d6=_0x1d5557;this['_actorMenuBgSprite']=new Sprite_MenuBackgroundActor(),this[_0x3496d6(0x2f4)](this[_0x3496d6(0x2e0)]);},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x274)]=Scene_MenuBase['prototype'][_0x1d5557(0x272)],Scene_MenuBase[_0x1d5557(0x316)][_0x1d5557(0x272)]=function(){const _0x53e48d=_0x1d5557;VisuMZ[_0x53e48d(0x26c)][_0x53e48d(0x274)][_0x53e48d(0x216)](this),this[_0x53e48d(0x21d)]()&&this[_0x53e48d(0x2e0)]&&this[_0x53e48d(0x2e0)][_0x53e48d(0x32b)](this[_0x53e48d(0x285)]);},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x215)]=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x24c)],Scene_Menu['prototype'][_0x1d5557(0x24c)]=function(){const _0x5992c6=_0x1d5557;VisuMZ[_0x5992c6(0x26c)][_0x5992c6(0x215)][_0x5992c6(0x216)](this),this['createPlaytimeWindow'](),this[_0x5992c6(0x2cd)](),this[_0x5992c6(0x312)]();},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x269)]=function(){const _0x4583df=_0x1d5557,_0x214ab0=this[_0x4583df(0x2e4)](),_0xb21c2=new Window_MenuCommand(_0x214ab0);_0xb21c2['setHandler'](_0x4583df(0x23c),this[_0x4583df(0x1fc)][_0x4583df(0x289)](this)),this[_0x4583df(0x2cb)](_0xb21c2),this[_0x4583df(0x29e)]=_0xb21c2;},VisuMZ['MainMenuCore'][_0x1d5557(0x2c7)]=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2e4)],Scene_Menu['prototype'][_0x1d5557(0x2e4)]=function(){const _0x2f882c=_0x1d5557,_0x390298=this['commandWindowStyle']();if(_0x390298===_0x2f882c(0x2ed))return this[_0x2f882c(0x213)]();else{if(_0x390298===_0x2f882c(0x22d))return this['commandWindowRectThinTopStyle']();else{if(_0x390298===_0x2f882c(0x211))return this[_0x2f882c(0x2b8)]();else{if(_0x390298===_0x2f882c(0x283))return this[_0x2f882c(0x218)]();else{if(_0x390298===_0x2f882c(0x224))return this['commandWindowRectMobileStyle']();else{const _0x27404a=VisuMZ['MainMenuCore'][_0x2f882c(0x2c7)][_0x2f882c(0x216)](this);return this[_0x2f882c(0x32a)](_0x27404a),_0x27404a;}}}}}},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x32a)]=function(_0x2d6ab4){const _0x929164=_0x1d5557;this[_0x929164(0x2bf)]()&&(_0x2d6ab4[_0x929164(0x1fa)]-=this[_0x929164(0x2da)]()['height']),this[_0x929164(0x29a)]()&&(_0x2d6ab4[_0x929164(0x1fa)]-=this[_0x929164(0x2f8)]()[_0x929164(0x1fa)]);},Scene_Menu[_0x1d5557(0x316)]['commandWindowRectTopStyle']=function(){const _0x52a3e2=_0x1d5557,_0x4b55e2=VisuMZ[_0x52a3e2(0x26c)][_0x52a3e2(0x202)][_0x52a3e2(0x311)][_0x52a3e2(0x25d)],_0x1f6c21=Graphics[_0x52a3e2(0x31e)],_0x56fb7=this[_0x52a3e2(0x231)](_0x4b55e2,!![]),_0x21c529=0x0,_0x1c568b=this[_0x52a3e2(0x21a)]();return new Rectangle(_0x21c529,_0x1c568b,_0x1f6c21,_0x56fb7);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x303)]=function(){const _0x51912f=_0x1d5557,_0xbb8376=VisuMZ[_0x51912f(0x26c)][_0x51912f(0x202)]['CustomCmdWin'][_0x51912f(0x25d)],_0x25eab8=Graphics[_0x51912f(0x31e)],_0xa87dad=this['calcWindowHeight'](0x1,!![]),_0x5dfce6=0x0,_0x259af5=this[_0x51912f(0x21a)]();return new Rectangle(_0x5dfce6,_0x259af5,_0x25eab8,_0xa87dad);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2b8)]=function(){const _0x3649ef=_0x1d5557,_0x5f1ac9=VisuMZ[_0x3649ef(0x26c)][_0x3649ef(0x202)][_0x3649ef(0x311)][_0x3649ef(0x25d)],_0x1abc53=Graphics['boxWidth'],_0x1d990d=this[_0x3649ef(0x231)](_0x5f1ac9,!![]),_0x194637=0x0,_0x3552e5=this['mainAreaBottom']()-_0x1d990d;return new Rectangle(_0x194637,_0x3552e5,_0x1abc53,_0x1d990d);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x218)]=function(){const _0x354c23=_0x1d5557,_0x20cc09=VisuMZ[_0x354c23(0x26c)][_0x354c23(0x202)][_0x354c23(0x311)]['Rows'],_0x2eb213=Graphics[_0x354c23(0x31e)],_0x3e547a=this[_0x354c23(0x231)](0x1,!![]),_0x4a39b7=0x0,_0x41bedd=this['mainAreaBottom']()-_0x3e547a;return new Rectangle(_0x4a39b7,_0x41bedd,_0x2eb213,_0x3e547a);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2c5)]=function(){const _0xb4f625=_0x1d5557,_0x450d63=VisuMZ[_0xb4f625(0x26c)]['Settings'][_0xb4f625(0x311)]['Rows'],_0x4134f2=Graphics['boxWidth'],_0x33a8e2=Window_MenuCommand[_0xb4f625(0x316)]['fittingHeight'](_0x450d63),_0x3c69a7=0x0,_0x1db79b=Math[_0xb4f625(0x26b)]((Graphics['boxHeight']-_0x33a8e2)/0x2);return new Rectangle(_0x3c69a7,_0x1db79b,_0x4134f2,_0x33a8e2);},Scene_Menu[_0x1d5557(0x316)]['commandWindowStyle']=function(){const _0x381d19=_0x1d5557;return VisuMZ[_0x381d19(0x26c)][_0x381d19(0x202)][_0x381d19(0x314)];},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x317)]=function(){const _0x322b3a=_0x1d5557;if(this[_0x322b3a(0x259)]()!==_0x322b3a(0x2ec))return!![];return VisuMZ[_0x322b3a(0x26c)]['Settings']['General']['ThinGoldWindow'];},Scene_Menu['prototype'][_0x1d5557(0x2ef)]=function(){const _0x562e45=_0x1d5557,_0x3f1ed4=this[_0x562e45(0x2d1)]();this[_0x562e45(0x2fc)]=this[_0x562e45(0x317)]()?new Window_ThinGold(_0x3f1ed4):new Window_Gold(_0x3f1ed4),this[_0x562e45(0x2cb)](this[_0x562e45(0x2fc)]);},VisuMZ[_0x1d5557(0x26c)]['Scene_Menu_goldWindowRect']=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2d1)],Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2d1)]=function(){const _0x582b88=_0x1d5557,_0x3f1d7b=this['commandWindowStyle']();if([_0x582b88(0x2ed),_0x582b88(0x22d),_0x582b88(0x224)]['includes'](_0x3f1d7b))return this[_0x582b88(0x2a7)]();else{if([_0x582b88(0x211),_0x582b88(0x283)]['includes'](_0x3f1d7b))return this['goldWindowRectBottomStyle']();else{const _0x95ec0d=VisuMZ[_0x582b88(0x26c)][_0x582b88(0x32c)]['call'](this);return this[_0x582b88(0x299)](_0x95ec0d),_0x95ec0d;}}},Scene_Menu['prototype']['applyThinnerGoldWindowRect']=function(_0x30155a){const _0x636a6c=_0x1d5557;if(this[_0x636a6c(0x317)]()){if(VisuMZ[_0x636a6c(0x26c)]['Settings'][_0x636a6c(0x286)]['AutoGoldY']){const _0x30e98e=_0x30155a[_0x636a6c(0x1fa)]-this['calcWindowHeight'](0x1,![]);_0x30155a['y']+=_0x30e98e;}VisuMZ[_0x636a6c(0x26c)][_0x636a6c(0x202)][_0x636a6c(0x286)][_0x636a6c(0x2f5)]&&(_0x30155a[_0x636a6c(0x1fa)]=this['calcWindowHeight'](0x1,![]));}},Scene_Menu['prototype'][_0x1d5557(0x2a7)]=function(){const _0x203834=_0x1d5557,_0x4bc45c=this[_0x203834(0x2c1)](),_0x1ef78d=this[_0x203834(0x231)](0x1,![]),_0x23bd68=Graphics[_0x203834(0x31e)]-_0x4bc45c,_0x4f88d6=this[_0x203834(0x220)]()-_0x1ef78d;return new Rectangle(_0x23bd68,_0x4f88d6,_0x4bc45c,_0x1ef78d);},Scene_Menu['prototype'][_0x1d5557(0x232)]=function(){const _0x1d0737=_0x1d5557,_0x238e8d=this['mainCommandWidth'](),_0x1ec894=this[_0x1d0737(0x231)](0x1,![]),_0x159292=Graphics[_0x1d0737(0x31e)]-_0x238e8d,_0x2e7ef8=this[_0x1d0737(0x21a)]();return new Rectangle(_0x159292,_0x2e7ef8,_0x238e8d,_0x1ec894);},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x307)]=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2c2)],Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2c2)]=function(){const _0x69ed76=_0x1d5557;VisuMZ['MainMenuCore'][_0x69ed76(0x307)][_0x69ed76(0x216)](this),this[_0x69ed76(0x205)]();},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x205)]=function(){const _0xfc5824=_0x1d5557;this[_0xfc5824(0x259)]()===_0xfc5824(0x224)&&(this[_0xfc5824(0x243)][_0xfc5824(0x227)]=0x0);},VisuMZ['MainMenuCore']['Scene_Menu_statusWindowRect']=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x292)],Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x292)]=function(){const _0x119714=_0x1d5557,_0x14a425=this[_0x119714(0x259)]();if([_0x119714(0x2ed),_0x119714(0x22d)][_0x119714(0x21c)](_0x14a425))return this[_0x119714(0x223)]();else{if([_0x119714(0x211),'thinBottom'][_0x119714(0x21c)](_0x14a425))return this[_0x119714(0x251)]();else return _0x14a425==='mobile'?this['statusWindowRectMobileStyle']():VisuMZ[_0x119714(0x26c)][_0x119714(0x270)][_0x119714(0x216)](this);}},Scene_Menu['prototype']['statusWindowRectTopStyle']=function(){const _0xfecb09=_0x1d5557,_0x281a2c=Graphics[_0xfecb09(0x31e)],_0x4ef691=this[_0xfecb09(0x22f)]()-this[_0xfecb09(0x29e)]['height']-this[_0xfecb09(0x2fc)][_0xfecb09(0x1fa)],_0x2ac5a0=0x0,_0x56652b=this[_0xfecb09(0x29e)]['y']+this[_0xfecb09(0x29e)][_0xfecb09(0x1fa)];return new Rectangle(_0x2ac5a0,_0x56652b,_0x281a2c,_0x4ef691);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x251)]=function(){const _0x5bd6ba=_0x1d5557,_0x50e86b=Graphics[_0x5bd6ba(0x31e)],_0x3b7224=this['mainAreaHeight']()-this[_0x5bd6ba(0x29e)][_0x5bd6ba(0x1fa)]-this[_0x5bd6ba(0x2fc)]['height'],_0x321627=0x0,_0x324864=this['_goldWindow']['y']+this[_0x5bd6ba(0x2fc)]['height'];return new Rectangle(_0x321627,_0x324864,_0x50e86b,_0x3b7224);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2e3)]=function(){const _0x26c038=_0x1d5557,_0x5b84bb=Graphics['boxWidth'],_0x3b59b8=this[_0x26c038(0x22f)]()-this[_0x26c038(0x2fc)]['height'],_0x3daa89=0x0,_0x127a8d=this['mainAreaBottom']()-this[_0x26c038(0x2fc)][_0x26c038(0x1fa)]-_0x3b59b8;return new Rectangle(_0x3daa89,_0x127a8d,_0x5b84bb,_0x3b59b8);},Scene_Menu['prototype'][_0x1d5557(0x1f5)]=function(){const _0x24e57b=_0x1d5557;if(!this[_0x24e57b(0x290)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x4e3e36=this[_0x24e57b(0x2da)]();this[_0x24e57b(0x296)]=new Window_Playtime(_0x4e3e36),this[_0x24e57b(0x296)]['setBackgroundType'](VisuMZ['MainMenuCore']['Settings'][_0x24e57b(0x27f)][_0x24e57b(0x320)]),this[_0x24e57b(0x2cb)](this[_0x24e57b(0x296)]);},Scene_Menu['prototype'][_0x1d5557(0x290)]=function(){const _0x15b95b=_0x1d5557;return VisuMZ[_0x15b95b(0x26c)][_0x15b95b(0x202)][_0x15b95b(0x27f)][_0x15b95b(0x23f)];},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2bf)]=function(){const _0x1af4cd=_0x1d5557;return this[_0x1af4cd(0x290)]()&&VisuMZ['MainMenuCore'][_0x1af4cd(0x202)][_0x1af4cd(0x27f)][_0x1af4cd(0x25e)];},Scene_Menu['prototype'][_0x1d5557(0x2da)]=function(){const _0x5135ac=_0x1d5557,_0xc25e78=this[_0x5135ac(0x259)]();if(['top','thinTop',_0x5135ac(0x224)][_0x5135ac(0x21c)](_0xc25e78))return this[_0x5135ac(0x2ea)]();else return[_0x5135ac(0x211),_0x5135ac(0x283)][_0x5135ac(0x21c)](_0xc25e78)?this[_0x5135ac(0x2e2)]():VisuMZ[_0x5135ac(0x26c)][_0x5135ac(0x202)][_0x5135ac(0x27f)][_0x5135ac(0x20c)][_0x5135ac(0x216)](this);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2ea)]=function(){const _0x15000b=_0x1d5557,_0x33c832=this[_0x15000b(0x2c1)](),_0x216fa2=this[_0x15000b(0x231)](0x1,![]),_0x35fa2b=0x0,_0x595e34=this['mainAreaBottom']()-_0x216fa2;return new Rectangle(_0x35fa2b,_0x595e34,_0x33c832,_0x216fa2);},Scene_Menu['prototype']['playtimeWindowRectBottomStyle']=function(){const _0x41a7f9=_0x1d5557,_0x41a81b=this[_0x41a7f9(0x2c1)](),_0x14713d=this[_0x41a7f9(0x231)](0x1,![]),_0xfa94fd=0x0,_0x9d2535=this[_0x41a7f9(0x21a)]();return new Rectangle(_0xfa94fd,_0x9d2535,_0x41a81b,_0x14713d);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2cd)]=function(){const _0xd45400=_0x1d5557;if(!this[_0xd45400(0x201)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x5da567=this['variableWindowRect']();this['_variableWindow']=new Window_MenuVariables(_0x5da567),this['_variableWindow']['setBackgroundType'](VisuMZ[_0xd45400(0x26c)][_0xd45400(0x202)][_0xd45400(0x2b7)][_0xd45400(0x320)]),this[_0xd45400(0x2cb)](this['_variableWindow']);},Scene_Menu['prototype'][_0x1d5557(0x201)]=function(){const _0x3eed53=_0x1d5557;return VisuMZ[_0x3eed53(0x26c)][_0x3eed53(0x202)]['Variable'][_0x3eed53(0x23f)];},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x29a)]=function(){const _0x154ec5=_0x1d5557;return this[_0x154ec5(0x201)]()&&VisuMZ[_0x154ec5(0x26c)]['Settings'][_0x154ec5(0x2b7)][_0x154ec5(0x25e)];},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2f8)]=function(){const _0x59dd89=_0x1d5557,_0x2d8204=this['commandWindowStyle']();if([_0x59dd89(0x2ed),_0x59dd89(0x22d),_0x59dd89(0x224)]['includes'](_0x2d8204))return this['variableWindowRectTopStyle']();else return[_0x59dd89(0x211),'thinBottom'][_0x59dd89(0x21c)](_0x2d8204)?this[_0x59dd89(0x254)]():VisuMZ['MainMenuCore'][_0x59dd89(0x202)]['Variable'][_0x59dd89(0x20c)][_0x59dd89(0x216)](this);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2db)]=function(){const _0x3bbea2=_0x1d5557,_0x54418e=Graphics[_0x3bbea2(0x31e)]-this[_0x3bbea2(0x2fc)][_0x3bbea2(0x268)]-(this[_0x3bbea2(0x296)]?this[_0x3bbea2(0x296)][_0x3bbea2(0x268)]:0x0),_0x7b79ad=this[_0x3bbea2(0x231)](0x1,![]),_0x4d1a05=this[_0x3bbea2(0x2fc)]['x']-_0x54418e,_0x2c2167=this[_0x3bbea2(0x220)]()-_0x7b79ad;return new Rectangle(_0x4d1a05,_0x2c2167,_0x54418e,_0x7b79ad);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x254)]=function(){const _0x19d00f=_0x1d5557,_0x16548f=Graphics[_0x19d00f(0x31e)]-this[_0x19d00f(0x2fc)][_0x19d00f(0x268)]-(this[_0x19d00f(0x296)]?this[_0x19d00f(0x296)]['width']:0x0),_0x379a1e=this[_0x19d00f(0x231)](0x1,![]),_0x324e49=this[_0x19d00f(0x2fc)]['x']-_0x16548f,_0x110778=this[_0x19d00f(0x21a)]();return new Rectangle(_0x324e49,_0x110778,_0x16548f,_0x379a1e);},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x312)]=function(){const _0xd6ad5f=_0x1d5557;if(!this[_0xd6ad5f(0x237)]())return;const _0x41b44b=this[_0xd6ad5f(0x2f8)]();this[_0xd6ad5f(0x2d0)]=new Window_Base(_0x41b44b),this['_dummyWindow']['setBackgroundType'](VisuMZ['MainMenuCore'][_0xd6ad5f(0x202)][_0xd6ad5f(0x2b7)][_0xd6ad5f(0x320)]),this[_0xd6ad5f(0x2cb)](this[_0xd6ad5f(0x2d0)]);},Scene_Menu['prototype']['needsDummyWindow']=function(){const _0x5bf6fb=_0x1d5557;if(['default','mobile'][_0x5bf6fb(0x21c)](this[_0x5bf6fb(0x259)]()))return![];if(this[_0x5bf6fb(0x25f)])return![];return!![];},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x276)]=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x28a)],Scene_Menu['prototype'][_0x1d5557(0x28a)]=function(){const _0x1fd1d2=_0x1d5557;if(this[_0x1fd1d2(0x23b)]()&&this[_0x1fd1d2(0x243)])$gameParty[_0x1fd1d2(0x2e7)]($gameParty['members']()[0x0]),this['onPersonalOk']();else{if(this['commandWindowStyle']()==='mobile')this[_0x1fd1d2(0x243)][_0x1fd1d2(0x306)]();VisuMZ[_0x1fd1d2(0x26c)][_0x1fd1d2(0x276)]['call'](this);}},Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x23b)]=function(){const _0x2091b0=_0x1d5557;return VisuMZ['MainMenuCore']['Settings']['General'][_0x2091b0(0x2bc)]&&$gameParty[_0x2091b0(0x2cf)]()[_0x2091b0(0x322)]<=0x1;},Scene_Menu[_0x1d5557(0x316)]['onPersonalOk']=function(){const _0x1b12c1=_0x1d5557,_0x2138cc=this[_0x1b12c1(0x29e)][_0x1b12c1(0x2f9)](),_0x3e2f3f=this['_commandWindow'][_0x1b12c1(0x2df)]();for(const _0x210e96 of Window_MenuCommand['_commandList']){if(_0x210e96['Symbol']===_0x2138cc){_0x210e96[_0x1b12c1(0x30b)]['call'](this,_0x3e2f3f);return;}}},VisuMZ[_0x1d5557(0x26c)]['Scene_Menu_onPersonalCancel']=Scene_Menu[_0x1d5557(0x316)]['onPersonalCancel'],Scene_Menu['prototype']['onPersonalCancel']=function(){const _0x2941a0=_0x1d5557;VisuMZ['MainMenuCore'][_0x2941a0(0x26a)][_0x2941a0(0x216)](this);if(this[_0x2941a0(0x259)]()===_0x2941a0(0x224))this[_0x2941a0(0x243)][_0x2941a0(0x2b5)]();},Scene_Menu[_0x1d5557(0x316)]['commandCommonEvent']=function(){const _0x2fde3f=_0x1d5557,_0x433839=parseInt(this[_0x2fde3f(0x29e)][_0x2fde3f(0x2df)]());_0x433839?($gameTemp[_0x2fde3f(0x2ae)](_0x433839),this[_0x2fde3f(0x1fc)]()):this['_commandWindow']['activate']();},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x2a3)]=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x209)],Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x209)]=function(){const _0x28d3f7=_0x1d5557;VisuMZ[_0x28d3f7(0x26c)]['Scene_Menu_commandFormation'][_0x28d3f7(0x216)](this);if(this[_0x28d3f7(0x259)]()===_0x28d3f7(0x224))this[_0x28d3f7(0x243)][_0x28d3f7(0x306)]();},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x2c0)]=Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2b6)],Scene_Menu[_0x1d5557(0x316)][_0x1d5557(0x2b6)]=function(){const _0x1ffe96=_0x1d5557;VisuMZ['MainMenuCore']['Scene_Menu_onFormationCancel']['call'](this);if(this[_0x1ffe96(0x259)]()===_0x1ffe96(0x224))this[_0x1ffe96(0x243)][_0x1ffe96(0x2b5)]();};function Sprite_MenuBackgroundActor(){this['initialize'](...arguments);}Sprite_MenuBackgroundActor[_0x1d5557(0x316)]=Object['create'](Sprite[_0x1d5557(0x316)]),Sprite_MenuBackgroundActor[_0x1d5557(0x316)][_0x1d5557(0x2c3)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x1d5557(0x316)][_0x1d5557(0x28c)]=function(){const _0x60aa85=_0x1d5557;this[_0x60aa85(0x285)]=null,this[_0x60aa85(0x1e7)]=![],Sprite['prototype']['initialize'][_0x60aa85(0x216)](this),this['x']=Graphics[_0x60aa85(0x268)];},Sprite_MenuBackgroundActor[_0x1d5557(0x316)]['setActor']=function(_0x5f2808){const _0x2fa5d4=_0x1d5557;this[_0x2fa5d4(0x285)]!==_0x5f2808&&(this[_0x2fa5d4(0x285)]=_0x5f2808,this['loadBitmap']());},Sprite_MenuBackgroundActor[_0x1d5557(0x316)][_0x1d5557(0x29f)]=function(){const _0xf709f2=_0x1d5557;this[_0xf709f2(0x1e7)]=![],this['_actor']?(this[_0xf709f2(0x298)]=ImageManager[_0xf709f2(0x2e8)](this[_0xf709f2(0x285)][_0xf709f2(0x28b)]()),this[_0xf709f2(0x298)]['addLoadListener'](this[_0xf709f2(0x329)][_0xf709f2(0x289)](this))):this['bitmap']=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x1d5557(0x316)]['onBitmapLoad']=function(){const _0x418b91=_0x1d5557;this[_0x418b91(0x1e7)]=!![],VisuMZ[_0x418b91(0x26c)]['Settings']['General'][_0x418b91(0x2c9)][_0x418b91(0x216)](this);},Sprite_MenuBackgroundActor['prototype'][_0x1d5557(0x1f3)]=function(){const _0x53a1d2=_0x1d5557;Sprite['prototype'][_0x53a1d2(0x1f3)]['call'](this),this[_0x53a1d2(0x1e7)]&&(this['updateOpacity'](),this[_0x53a1d2(0x2dd)](),this[_0x53a1d2(0x28e)]());},Sprite_MenuBackgroundActor[_0x1d5557(0x316)]['updateOpacity']=function(){const _0x54bf4f=_0x1d5557;if(this[_0x54bf4f(0x301)]>0x0){const _0x40b5fb=this[_0x54bf4f(0x301)];this[_0x54bf4f(0x2f1)]=(this[_0x54bf4f(0x2f1)]*(_0x40b5fb-0x1)+0xff)/_0x40b5fb;}},Sprite_MenuBackgroundActor[_0x1d5557(0x316)][_0x1d5557(0x2dd)]=function(){const _0x36002a=_0x1d5557;if(this[_0x36002a(0x301)]>0x0){const _0x410e00=this[_0x36002a(0x301)];this['x']=(this['x']*(_0x410e00-0x1)+this[_0x36002a(0x217)])/_0x410e00,this['y']=(this['y']*(_0x410e00-0x1)+this[_0x36002a(0x31b)])/_0x410e00;}},Sprite_MenuBackgroundActor['prototype']['updateDuration']=function(){const _0x16d8f2=_0x1d5557;if(this[_0x16d8f2(0x301)]>0x0)this[_0x16d8f2(0x301)]--;},ImageManager[_0x1d5557(0x1e6)]=ImageManager[_0x1d5557(0x1e6)]||0x9,ImageManager[_0x1d5557(0x279)]=ImageManager[_0x1d5557(0x279)]||0x6,Window_Base[_0x1d5557(0x316)]['drawSvActor']=function(_0x401536,_0x57cebf,_0x2c7215){const _0x290e45=_0x1d5557,_0x277d46=ImageManager['loadSvActor'](_0x401536),_0x3dcd99=_0x277d46[_0x290e45(0x268)]/ImageManager[_0x290e45(0x1e6)],_0x58c533=_0x277d46['height']/ImageManager[_0x290e45(0x279)],_0x7fd223=0x0,_0x289f9e=0x0;this[_0x290e45(0x20f)][_0x290e45(0x265)](_0x277d46,_0x7fd223,_0x289f9e,_0x3dcd99,_0x58c533,_0x57cebf-_0x3dcd99/0x2,_0x2c7215-_0x58c533);},Window_MenuCommand['_commandList']=VisuMZ[_0x1d5557(0x26c)]['Settings'][_0x1d5557(0x281)],VisuMZ['MainMenuCore'][_0x1d5557(0x1f2)]=Window_MenuCommand['prototype'][_0x1d5557(0x28c)],Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x28c)]=function(_0x175d6f){const _0x149185=_0x1d5557;VisuMZ[_0x149185(0x26c)][_0x149185(0x1f2)][_0x149185(0x216)](this,_0x175d6f),this[_0x149185(0x2b2)](_0x175d6f);},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x2b2)]=function(_0x1aafdc){const _0x243602=_0x1d5557,_0x529463=new Rectangle(0x0,0x0,_0x1aafdc['width'],_0x1aafdc[_0x243602(0x1fa)]);this[_0x243602(0x2d7)]=new Window_Base(_0x529463),this[_0x243602(0x2d7)]['opacity']=0x0,this[_0x243602(0x2f4)](this[_0x243602(0x2d7)]),this['updateCommandNameWindow']();},Window_MenuCommand[_0x1d5557(0x316)]['callUpdateHelp']=function(){const _0x473d2b=_0x1d5557;Window_HorzCommand[_0x473d2b(0x316)][_0x473d2b(0x27e)][_0x473d2b(0x216)](this);if(this[_0x473d2b(0x2d7)])this[_0x473d2b(0x262)]();},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x262)]=function(){const _0xad989f=_0x1d5557,_0x2ee06a=this[_0xad989f(0x2d7)];_0x2ee06a[_0xad989f(0x20f)][_0xad989f(0x234)]();const _0x4d81ec=this[_0xad989f(0x2fa)](this[_0xad989f(0x266)]());if(_0x4d81ec===_0xad989f(0x1f7)){const _0x5f1eb3=this['itemLineRect'](this[_0xad989f(0x266)]());let _0x5f35cd=this[_0xad989f(0x204)](this['index']());_0x5f35cd=_0x5f35cd[_0xad989f(0x30f)](/\\I\[(\d+)\]/gi,''),_0x2ee06a['resetFontSettings'](),this[_0xad989f(0x253)](_0x5f35cd,_0x5f1eb3),this[_0xad989f(0x27d)](_0x5f35cd,_0x5f1eb3),this['commandNameWindowCenter'](_0x5f35cd,_0x5f1eb3);}},Window_MenuCommand['prototype']['commandNameWindowDrawBackground']=function(_0x4a8a1c,_0xfcd5a3){},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x27d)]=function(_0x58d60a,_0x56406a){const _0x416f13=_0x1d5557,_0x37543a=this[_0x416f13(0x2d7)];_0x37543a[_0x416f13(0x288)](_0x58d60a,0x0,_0x56406a['y'],_0x37543a[_0x416f13(0x29d)],'center');},Window_MenuCommand[_0x1d5557(0x316)]['commandNameWindowCenter']=function(_0x1c39bf,_0x468469){const _0x3f7de9=_0x1d5557,_0x575ac1=this[_0x3f7de9(0x2d7)],_0x4135a5=$gameSystem['windowPadding'](),_0x75501f=_0x468469['x']+Math['floor'](_0x468469[_0x3f7de9(0x268)]/0x2)+_0x4135a5;_0x575ac1['x']=_0x575ac1[_0x3f7de9(0x268)]/-0x2+_0x75501f,_0x575ac1['y']=Math['floor'](_0x468469['height']/0x4);},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x31c)]=function(){const _0xc1a2=_0x1d5557,_0x43fe76=SceneManager[_0xc1a2(0x2fd)][_0xc1a2(0x259)]();if(_0x43fe76===_0xc1a2(0x224)){const _0x594c26=VisuMZ['MainMenuCore'][_0xc1a2(0x202)]['CustomCmdWin'][_0xc1a2(0x278)];return this[_0xc1a2(0x32e)]()*_0x594c26+0x8;}else return Window_Command['prototype']['itemHeight'][_0xc1a2(0x216)](this);},Window_MenuCommand['prototype'][_0x1d5557(0x1e8)]=function(){const _0x385e10=_0x1d5557;this[_0x385e10(0x30c)]();},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x30c)]=function(){const _0x31c7ff=_0x1d5557;for(const _0x3330b3 of Window_MenuCommand[_0x31c7ff(0x238)]){const _0x100758=_0x3330b3['Symbol'];if(_0x3330b3['ShowJS'][_0x31c7ff(0x216)](this)){let _0xad57f9=_0x3330b3[_0x31c7ff(0x2d6)];if(['',_0x31c7ff(0x2b4)]['includes'](_0xad57f9))_0xad57f9=_0x3330b3[_0x31c7ff(0x255)][_0x31c7ff(0x216)](this);const _0x5ef190=_0x3330b3[_0x31c7ff(0x2c6)];_0x5ef190>0x0&&this[_0x31c7ff(0x1f0)]()!=='text'&&(_0xad57f9='\x5cI[%1]%2'['format'](_0x5ef190,_0xad57f9));const _0x107efe=_0x3330b3[_0x31c7ff(0x27b)]['call'](this),_0xe4c05b=_0x3330b3['ExtJS'][_0x31c7ff(0x216)](this);this['addCommand'](_0xad57f9,_0x100758,_0x107efe,_0xe4c05b),this[_0x31c7ff(0x319)](_0x100758,_0x3330b3[_0x31c7ff(0x242)]['bind'](this,_0xe4c05b));}this[_0x31c7ff(0x2a9)](_0x100758);}},Window_MenuCommand['prototype'][_0x1d5557(0x2a9)]=function(_0x4209fe){const _0x3c7a38=_0x1d5557;switch(_0x4209fe){case _0x3c7a38(0x32f):this[_0x3c7a38(0x23e)]();break;case _0x3c7a38(0x326):this[_0x3c7a38(0x2a1)](),this[_0x3c7a38(0x2a5)]();break;case'options':this[_0x3c7a38(0x2ff)]();break;case _0x3c7a38(0x321):this['addSaveCommand']();break;case _0x3c7a38(0x1ff):this[_0x3c7a38(0x2ce)]();break;}},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x23e)]=function(){},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x2a1)]=function(){},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x2a5)]=function(){},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x2ff)]=function(){},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x27c)]=function(){},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x2ce)]=function(){},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x264)]=function(){const _0xcd227f=_0x1d5557,_0x3e920e=SceneManager[_0xcd227f(0x2fd)][_0xcd227f(0x259)]();if(['thinTop','thinBottom'][_0xcd227f(0x21c)](_0x3e920e))return this['_list']?this[_0xcd227f(0x2e1)]():0x4;else return _0x3e920e!==_0xcd227f(0x2ec)?VisuMZ[_0xcd227f(0x26c)][_0xcd227f(0x202)][_0xcd227f(0x311)][_0xcd227f(0x323)]:Window_Command['prototype'][_0xcd227f(0x264)][_0xcd227f(0x216)](this);},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x206)]=function(){const _0x3dfc2b=_0x1d5557;return VisuMZ['MainMenuCore']['Settings']['CustomCmdWin'][_0x3dfc2b(0x2ad)];},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x22b)]=function(_0x4183a8){const _0xd17f0f=_0x1d5557,_0x46443c=this['commandStyleCheck'](_0x4183a8);if(_0x46443c===_0xd17f0f(0x21b))this[_0xd17f0f(0x29b)](_0x4183a8);else _0x46443c===_0xd17f0f(0x1f7)?this[_0xd17f0f(0x2bd)](_0x4183a8):Window_Command['prototype'][_0xd17f0f(0x22b)]['call'](this,_0x4183a8);},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x1f0)]=function(){const _0x3cd782=_0x1d5557;return VisuMZ['MainMenuCore'][_0x3cd782(0x202)]['CustomCmdWin'][_0x3cd782(0x325)];},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x2fa)]=function(_0x4e0727){const _0x32579f=_0x1d5557,_0x418d75=this[_0x32579f(0x1f0)]();if(_0x418d75!=='auto')return _0x418d75;else{const _0x22699b=this[_0x32579f(0x204)](_0x4e0727);if(_0x22699b[_0x32579f(0x1f1)](/\\I\[(\d+)\]/i)){const _0x5da783=this[_0x32579f(0x282)](_0x4e0727),_0x4541c7=this[_0x32579f(0x212)](_0x22699b)[_0x32579f(0x268)];return _0x4541c7<=_0x5da783[_0x32579f(0x268)]?_0x32579f(0x21b):'icon';}else return _0x32579f(0x26d);}},Window_MenuCommand['prototype'][_0x1d5557(0x29b)]=function(_0x32ab72){const _0x3b7dc3=_0x1d5557,_0x40afc1=this['itemLineRect'](_0x32ab72),_0x35f08b=this['commandName'](_0x32ab72),_0x183644=this[_0x3b7dc3(0x212)](_0x35f08b)[_0x3b7dc3(0x268)];this[_0x3b7dc3(0x2e6)](this[_0x3b7dc3(0x2d9)](_0x32ab72));let _0x5139d1=this[_0x3b7dc3(0x206)]();if(_0x5139d1===_0x3b7dc3(0x258))this[_0x3b7dc3(0x256)](_0x35f08b,_0x40afc1['x']+_0x40afc1[_0x3b7dc3(0x268)]-_0x183644,_0x40afc1['y'],_0x183644);else{if(_0x5139d1===_0x3b7dc3(0x308)){const _0x300319=_0x40afc1['x']+Math['floor']((_0x40afc1[_0x3b7dc3(0x268)]-_0x183644)/0x2);this['drawTextEx'](_0x35f08b,_0x300319,_0x40afc1['y'],_0x183644);}else this[_0x3b7dc3(0x256)](_0x35f08b,_0x40afc1['x'],_0x40afc1['y'],_0x183644);}},Window_MenuCommand[_0x1d5557(0x316)][_0x1d5557(0x2bd)]=function(_0x3730be){const _0x491304=_0x1d5557;this['commandName'](_0x3730be)[_0x491304(0x1f1)](/\\I\[(\d+)\]/i);const _0x316e52=Number(RegExp['$1']),_0x3e79d0=this[_0x491304(0x282)](_0x3730be),_0x160f5d=_0x3e79d0['x']+Math[_0x491304(0x328)]((_0x3e79d0[_0x491304(0x268)]-ImageManager[_0x491304(0x31f)])/0x2),_0x55c208=_0x3e79d0['y']+(_0x3e79d0[_0x491304(0x1fa)]-ImageManager['iconHeight'])/0x2;this[_0x491304(0x23d)](_0x316e52,_0x160f5d,_0x55c208);},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x28d)]=Window_StatusBase['prototype'][_0x1d5557(0x245)],Window_StatusBase[_0x1d5557(0x316)][_0x1d5557(0x245)]=function(){const _0x3e5727=_0x1d5557;VisuMZ[_0x3e5727(0x26c)][_0x3e5727(0x28d)][_0x3e5727(0x216)](this),this[_0x3e5727(0x2f3)]();},Window_StatusBase[_0x1d5557(0x316)][_0x1d5557(0x2f3)]=function(){const _0x4d82b2=_0x1d5557;for(const _0x454aec of $gameParty[_0x4d82b2(0x2cf)]()){if(!_0x454aec)continue;_0x454aec['characterName']()&&ImageManager[_0x4d82b2(0x2e9)](_0x454aec['characterName']()),_0x454aec[_0x4d82b2(0x2af)]()&&ImageManager[_0x4d82b2(0x295)](_0x454aec[_0x4d82b2(0x2af)]()),_0x454aec[_0x4d82b2(0x28b)]()&&ImageManager[_0x4d82b2(0x2e8)](_0x454aec[_0x4d82b2(0x28b)]());}},Window_StatusBase['prototype'][_0x1d5557(0x291)]=function(){const _0x476d73=_0x1d5557;return VisuMZ[_0x476d73(0x26c)][_0x476d73(0x202)][_0x476d73(0x1ea)];},Window_StatusBase['prototype'][_0x1d5557(0x2b3)]=function(_0x59dd70,_0xb81166,_0x5517d4,_0x41df1d,_0x2e8efe){const _0x5cc8b3=_0x1d5557;_0x41df1d=_0x41df1d||ImageManager[_0x5cc8b3(0x2eb)],_0x2e8efe=_0x2e8efe||ImageManager[_0x5cc8b3(0x300)];const _0x2fe97d=ImageManager[_0x5cc8b3(0x2eb)],_0x3da87c=_0x2e8efe-0x2,_0x17ccc1=_0xb81166+Math[_0x5cc8b3(0x328)]((_0x41df1d-_0x2fe97d)/0x2);this[_0x5cc8b3(0x2c3)]===Window_MenuStatus&&this['changePaintOpacity'](_0x59dd70[_0x5cc8b3(0x2ac)]()),this[_0x5cc8b3(0x250)](_0x59dd70,_0x17ccc1,_0x5517d4,_0x2fe97d,_0x3da87c),this['changePaintOpacity'](!![]);},Window_StatusBase['prototype'][_0x1d5557(0x208)]=function(_0x4b944c,_0x3667b8,_0x40b4fb,_0x47d3c5,_0x2ca079){const _0x23b97c=_0x1d5557;_0x47d3c5=_0x47d3c5||ImageManager[_0x23b97c(0x2eb)],_0x2ca079=_0x2ca079||ImageManager[_0x23b97c(0x300)];const _0x4022fd=_0x4b944c['characterName'](),_0x355d94=_0x4b944c[_0x23b97c(0x2cc)](),_0x21fcdd=ImageManager[_0x23b97c(0x2e9)](_0x4022fd),_0x3b3964=ImageManager['isBigCharacter'](_0x4022fd),_0x5db7fc=_0x21fcdd[_0x23b97c(0x268)]/(_0x3b3964?0x3:0xc),_0x1209d5=_0x21fcdd[_0x23b97c(0x1fa)]/(_0x3b3964?0x4:0x8),_0x2982b1=_0x47d3c5,_0x317092=_0x2ca079-0x2,_0x47a796=_0x3667b8+Math[_0x23b97c(0x328)](_0x2982b1/0x2),_0x2c0ded=_0x40b4fb+Math['ceil']((_0x2ca079+_0x1209d5)/0x2);this[_0x23b97c(0x2c3)]===Window_MenuStatus&&this[_0x23b97c(0x2e6)](_0x4b944c['isBattleMember']());const _0x3b3214=Math[_0x23b97c(0x25c)](_0x47d3c5,_0x5db7fc),_0x592ee7=Math[_0x23b97c(0x25c)](_0x2ca079,_0x1209d5),_0x1b5584=Math['floor'](_0x3667b8+Math['max'](_0x47d3c5-_0x5db7fc,0x0)/0x2),_0x5d9c8c=Math[_0x23b97c(0x328)](_0x40b4fb+Math[_0x23b97c(0x1ef)](_0x2ca079-_0x1209d5,0x0)/0x2),_0x1d40eb=_0x3b3964?0x0:_0x355d94,_0x22e52c=(_0x1d40eb%0x4*0x3+0x1)*_0x5db7fc,_0x517bf5=Math['floor'](_0x1d40eb/0x4)*0x4*_0x1209d5;this[_0x23b97c(0x20f)]['blt'](_0x21fcdd,_0x22e52c,_0x517bf5,_0x3b3214,_0x592ee7,_0x1b5584,_0x5d9c8c),this[_0x23b97c(0x2e6)](!![]);},Window_StatusBase[_0x1d5557(0x316)][_0x1d5557(0x257)]=function(_0x4e25cf,_0x5e4a4e,_0xdaecde,_0x1d3b39,_0x3eb95c){const _0xb552b8=_0x1d5557;_0x1d3b39=_0x1d3b39||ImageManager[_0xb552b8(0x2eb)],_0x3eb95c=_0x3eb95c||ImageManager[_0xb552b8(0x300)];const _0x3e41e1=ImageManager[_0xb552b8(0x295)](_0x4e25cf['battlerName']()),_0x561107=_0x3e41e1[_0xb552b8(0x268)]/ImageManager[_0xb552b8(0x1e6)],_0x54e9df=_0x3e41e1[_0xb552b8(0x1fa)]/ImageManager[_0xb552b8(0x279)],_0x4fbb3b=_0x1d3b39,_0xa3f062=_0x3eb95c-0x2,_0x42943c=_0x5e4a4e+Math[_0xb552b8(0x328)](_0x4fbb3b/0x2),_0x169091=_0xdaecde+Math[_0xb552b8(0x261)]((_0x3eb95c+_0x54e9df)/0x2);this['constructor']===Window_MenuStatus&&this['changePaintOpacity'](_0x4e25cf['isBattleMember']());const _0x47f4e8=Math[_0xb552b8(0x25c)](_0x1d3b39,_0x561107),_0x584fd4=Math['min'](_0x3eb95c,_0x54e9df),_0x100073=Math['floor'](_0x5e4a4e+Math[_0xb552b8(0x1ef)](_0x1d3b39-_0x561107,0x0)/0x2),_0x48e7b0=Math[_0xb552b8(0x328)](_0xdaecde+Math[_0xb552b8(0x1ef)](_0x3eb95c-_0x54e9df,0x0)/0x2),_0x41c661=0x0,_0x2c3a41=0x0;this[_0xb552b8(0x20f)]['blt'](_0x3e41e1,_0x41c661,_0x2c3a41,_0x47f4e8,_0x584fd4,_0x100073,_0x48e7b0),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x1d5557(0x316)][_0x1d5557(0x2d5)]=function(_0x187545,_0x1c0b5f,_0x94a4e2,_0x3ec5bc,_0x2227a6){const _0xc6edfa=_0x1d5557,_0x1d851d=ImageManager['loadPicture'](_0x187545['getMenuImage']());_0x3ec5bc=(_0x3ec5bc||ImageManager[_0xc6edfa(0x2eb)])-0x2,_0x2227a6=(_0x2227a6||ImageManager[_0xc6edfa(0x300)])-0x2;const _0x16ee6e=_0x1d851d['width'],_0x573e27=_0x1d851d['height'],_0x557a12=_0x3ec5bc,_0x4beddf=_0x2227a6-0x2,_0x53a995=_0x1c0b5f+Math[_0xc6edfa(0x328)](_0x557a12/0x2),_0x1955fd=_0x94a4e2+Math[_0xc6edfa(0x261)]((_0x2227a6+_0x573e27)/0x2);this[_0xc6edfa(0x2c3)]===Window_MenuStatus&&this[_0xc6edfa(0x2e6)](_0x187545[_0xc6edfa(0x2ac)]());const _0x34ce6b=Math[_0xc6edfa(0x25c)](_0x3ec5bc,_0x16ee6e),_0x595262=Math[_0xc6edfa(0x25c)](_0x2227a6,_0x573e27),_0x18ad87=_0x1c0b5f+0x1,_0x2246f9=Math[_0xc6edfa(0x1ef)](_0x94a4e2+0x1,_0x94a4e2+_0x4beddf-_0x573e27+0x3);let _0x4b2ad5=(_0x16ee6e-_0x34ce6b)/0x2,_0x33c40e=(_0x573e27-_0x595262)/0x2;_0x4b2ad5-=_0x187545[_0xc6edfa(0x2fe)](),_0x33c40e-=_0x187545[_0xc6edfa(0x248)](),this[_0xc6edfa(0x20f)][_0xc6edfa(0x265)](_0x1d851d,_0x4b2ad5,_0x33c40e,_0x34ce6b,_0x595262,_0x18ad87,_0x2246f9),this[_0xc6edfa(0x2e6)](!![]);},VisuMZ[_0x1d5557(0x26c)]['Window_MenuStatus_selectLast']=Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x2c4)],Window_MenuStatus['prototype'][_0x1d5557(0x2c4)]=function(){const _0x15ab47=_0x1d5557;VisuMZ[_0x15ab47(0x26c)]['Settings']['General'][_0x15ab47(0x30d)]?VisuMZ[_0x15ab47(0x26c)][_0x15ab47(0x294)][_0x15ab47(0x216)](this):this['smoothSelect'](0x0);},VisuMZ[_0x1d5557(0x26c)]['Window_MenuStatus_maxItems']=Window_MenuStatus[_0x1d5557(0x316)]['maxItems'],Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x2e1)]=function(){const _0x3cc6c6=_0x1d5557;return this[_0x3cc6c6(0x24b)]()?$gameParty['battleMembers']()[_0x3cc6c6(0x322)]:VisuMZ[_0x3cc6c6(0x26c)][_0x3cc6c6(0x229)][_0x3cc6c6(0x216)](this);},Window_MenuStatus[_0x1d5557(0x316)]['showOnlyBattleMembers']=function(){const _0x38d6fb=_0x1d5557,_0x1b908a=VisuMZ[_0x38d6fb(0x26c)][_0x38d6fb(0x202)][_0x38d6fb(0x286)];if(_0x1b908a[_0x38d6fb(0x219)]===undefined)_0x1b908a[_0x38d6fb(0x219)]=!![];const _0x24a2d4=SceneManager['_scene'];if(!_0x1b908a[_0x38d6fb(0x219)]){if(_0x1b908a[_0x38d6fb(0x228)])return _0x24a2d4[_0x38d6fb(0x2c3)]===Scene_Menu;return!![];}return![];},Window_MenuStatus['prototype']['listStyle']=function(){const _0x7e30d0=_0x1d5557,_0x3427a7=SceneManager[_0x7e30d0(0x2fd)][_0x7e30d0(0x2c3)];return _0x3427a7===Scene_Menu?VisuMZ['MainMenuCore'][_0x7e30d0(0x202)]['StatusListStyle']:VisuMZ[_0x7e30d0(0x26c)][_0x7e30d0(0x202)][_0x7e30d0(0x287)];},Window_MenuStatus[_0x1d5557(0x316)]['numVisibleRows']=function(){const _0x5b6c70=_0x1d5557,_0x2621bb=this['listStyle']();switch(_0x2621bb){case _0x5b6c70(0x21f):case _0x5b6c70(0x249):return 0x1;case'solo':return 0x1;default:return $gameParty['maxBattleMembers']();}},Window_MenuStatus[_0x1d5557(0x316)]['maxCols']=function(){const _0xd02bba=_0x1d5557,_0x1f1b3a=this[_0xd02bba(0x277)]();switch(_0x1f1b3a){case _0xd02bba(0x21f):case _0xd02bba(0x249):return $gameParty[_0xd02bba(0x20e)]();default:return 0x1;}},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x2ba)]=Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x31c)],Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x31c)]=function(){const _0x9b21a2=_0x1d5557,_0x459d3f=this[_0x9b21a2(0x277)]();switch(_0x459d3f){case _0x9b21a2(0x21f):case _0x9b21a2(0x249):case _0x9b21a2(0x267):return this[_0x9b21a2(0x2bb)];case _0x9b21a2(0x315):return Window_Selectable[_0x9b21a2(0x316)][_0x9b21a2(0x31c)][_0x9b21a2(0x216)](this);case'thicker':return this[_0x9b21a2(0x32e)]()*0x2+0x8;default:return VisuMZ[_0x9b21a2(0x26c)][_0x9b21a2(0x2ba)][_0x9b21a2(0x216)](this);}},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x22b)]=function(_0x16a087){const _0x468676=_0x1d5557;this[_0x468676(0x20a)](_0x16a087),this[_0x468676(0x200)](_0x16a087);},VisuMZ[_0x1d5557(0x26c)][_0x1d5557(0x31d)]=Window_MenuStatus['prototype'][_0x1d5557(0x246)],Window_MenuStatus[_0x1d5557(0x316)]['drawActorGraphic']=function(_0x456847,_0x5b28cc,_0x124ffe,_0xd0274a,_0x4b0330){const _0xacf61e=_0x1d5557;switch(this[_0xacf61e(0x291)]()){case _0xacf61e(0x22c):break;case'sprite':this[_0xacf61e(0x208)](_0x456847,_0x5b28cc,_0x124ffe+0x1,_0xd0274a,_0x4b0330-0x2);break;case _0xacf61e(0x244):this[_0xacf61e(0x257)](_0x456847,_0x5b28cc,_0x124ffe+0x1,_0xd0274a,_0x4b0330-0x2);break;default:this['drawItemActorFace'](_0x456847,_0x5b28cc,_0x124ffe,_0xd0274a,_0x4b0330);break;}},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x200)]=function(_0x15b91c){const _0x2bde63=_0x1d5557;this[_0x2bde63(0x2b9)]();const _0x5aa470=this['actor'](_0x15b91c),_0x4aade4=this[_0x2bde63(0x2c8)](_0x15b91c),_0x2a51b8=this[_0x2bde63(0x277)]();switch(_0x2a51b8){case'vertical':this[_0x2bde63(0x28f)](_0x5aa470,_0x4aade4);break;case _0x2bde63(0x249):this[_0x2bde63(0x2a0)](_0x5aa470,_0x4aade4);break;case _0x2bde63(0x267):this['drawItemStatusSoloStyle'](_0x5aa470,_0x4aade4);break;case _0x2bde63(0x315):this['drawItemStatusThinStyle'](_0x5aa470,_0x4aade4);break;case _0x2bde63(0x226):this[_0x2bde63(0x1ec)](_0x5aa470,_0x4aade4);break;default:this[_0x2bde63(0x207)](_0x5aa470,_0x4aade4);break;}},Window_MenuStatus[_0x1d5557(0x316)]['drawItemStatusVerticalStyle']=function(_0x453365,_0x38bd4c){const _0x571a10=_0x1d5557;VisuMZ[_0x571a10(0x26c)][_0x571a10(0x202)][_0x571a10(0x25b)][_0x571a10(0x2d8)]['call'](this,_0x453365,_0x38bd4c);},Window_MenuStatus[_0x1d5557(0x316)]['drawItemStatusPortraitStyle']=function(_0x29f1e2,_0x1ee76b){const _0xc92468=_0x1d5557;if(_0x29f1e2[_0xc92468(0x28b)]()!==''){const _0x50eee1=ImageManager[_0xc92468(0x2e8)](_0x29f1e2[_0xc92468(0x28b)]());_0x50eee1[_0xc92468(0x31a)](this[_0xc92468(0x260)][_0xc92468(0x289)](this,_0x29f1e2,_0x1ee76b));}else this[_0xc92468(0x28f)](_0x29f1e2,_0x1ee76b);},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x260)]=function(_0x418432,_0x190146){const _0x4f62fb=_0x1d5557;VisuMZ[_0x4f62fb(0x26c)][_0x4f62fb(0x202)][_0x4f62fb(0x25b)][_0x4f62fb(0x1f6)][_0x4f62fb(0x216)](this,_0x418432,_0x190146);},Window_MenuStatus[_0x1d5557(0x316)]['drawItemStatusSoloStyle']=function(_0x2f5db1,_0x327154){const _0x37e8c0=_0x1d5557,_0x427463=ImageManager[_0x37e8c0(0x2e8)](_0x2f5db1[_0x37e8c0(0x28b)]());_0x427463[_0x37e8c0(0x31a)](this[_0x37e8c0(0x222)][_0x37e8c0(0x289)](this,_0x2f5db1,_0x327154));},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x222)]=function(_0x4d1d18,_0x1be622){const _0x5a5850=_0x1d5557;VisuMZ[_0x5a5850(0x26c)]['Settings'][_0x5a5850(0x25b)][_0x5a5850(0x2ca)][_0x5a5850(0x216)](this,_0x4d1d18,_0x1be622);},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x2b1)]=function(_0x34eeb2,_0x70afaa){const _0x35a077=_0x1d5557;VisuMZ[_0x35a077(0x26c)][_0x35a077(0x202)][_0x35a077(0x25b)][_0x35a077(0x318)][_0x35a077(0x216)](this,_0x34eeb2,_0x70afaa);},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x1ec)]=function(_0x39d7e9,_0x57bf5b){const _0x442cd8=_0x1d5557;VisuMZ['MainMenuCore'][_0x442cd8(0x202)]['ListStyles'][_0x442cd8(0x24d)]['call'](this,_0x39d7e9,_0x57bf5b);},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x324)]=function(){const _0x39fbd4=_0x1d5557,_0x535bba=this[_0x39fbd4(0x277)]();if([_0x39fbd4(0x315),_0x39fbd4(0x226)][_0x39fbd4(0x21c)](_0x535bba))return![];return Window_StatusBase[_0x39fbd4(0x316)][_0x39fbd4(0x324)][_0x39fbd4(0x216)](this);},Window_MenuStatus[_0x1d5557(0x316)][_0x1d5557(0x207)]=function(_0x420891,_0x3ac55a){const _0x154b5b=_0x1d5557;VisuMZ[_0x154b5b(0x26c)][_0x154b5b(0x202)][_0x154b5b(0x25b)]['DefaultStyle'][_0x154b5b(0x216)](this,_0x420891,_0x3ac55a);},Window_SkillStatus['prototype'][_0x1d5557(0x250)]=function(_0x2ec3a7,_0x49e9b4,_0x3b2f8b,_0x59ba51,_0x63b5c7){const _0x721bdc=_0x1d5557;switch(this[_0x721bdc(0x291)]()){case'none':break;case _0x721bdc(0x2ab):this[_0x721bdc(0x208)](_0x2ec3a7,_0x49e9b4,_0x3b2f8b,_0x59ba51,_0x63b5c7);break;case _0x721bdc(0x244):this[_0x721bdc(0x257)](_0x2ec3a7,_0x49e9b4,_0x3b2f8b,_0x59ba51,_0x63b5c7);break;default:Window_StatusBase[_0x721bdc(0x316)][_0x721bdc(0x250)][_0x721bdc(0x216)](this,_0x2ec3a7,_0x49e9b4,_0x3b2f8b,_0x59ba51,_0x63b5c7);break;}},Window_EquipStatus[_0x1d5557(0x316)][_0x1d5557(0x250)]=function(_0x216a7e,_0x2faa17,_0x5395a9,_0x4fb211,_0x451875){const _0x17e135=_0x1d5557;switch(this[_0x17e135(0x291)]()){case _0x17e135(0x22c):break;case _0x17e135(0x2ab):this[_0x17e135(0x208)](_0x216a7e,_0x2faa17,_0x5395a9,_0x4fb211,_0x451875);break;case _0x17e135(0x244):this[_0x17e135(0x257)](_0x216a7e,_0x2faa17,_0x5395a9,_0x4fb211,_0x451875);break;default:Window_StatusBase[_0x17e135(0x316)][_0x17e135(0x250)][_0x17e135(0x216)](this,_0x216a7e,_0x2faa17,_0x5395a9,_0x4fb211,_0x451875);break;}};function Window_ThinGold(){const _0x2208ad=_0x1d5557;this[_0x2208ad(0x28c)](...arguments);}Window_ThinGold[_0x1d5557(0x316)]=Object['create'](Window_Gold[_0x1d5557(0x316)]),Window_ThinGold[_0x1d5557(0x316)][_0x1d5557(0x2c3)]=Window_ThinGold,Window_ThinGold[_0x1d5557(0x316)][_0x1d5557(0x31c)]=function(){const _0x2ba2b6=_0x1d5557;return this[_0x2ba2b6(0x32e)]();},Window_ThinGold[_0x1d5557(0x316)]['colSpacing']=function(){const _0x2d6e25=_0x1d5557;return Window_Selectable['prototype'][_0x2d6e25(0x230)][_0x2d6e25(0x216)](this);};function Window_Playtime(){const _0x76e2cb=_0x1d5557;this[_0x76e2cb(0x28c)](...arguments);}Window_Playtime[_0x1d5557(0x316)]=Object[_0x1d5557(0x24c)](Window_Selectable[_0x1d5557(0x316)]),Window_Playtime[_0x1d5557(0x316)]['constructor']=Window_Playtime,Window_Playtime['prototype'][_0x1d5557(0x28c)]=function(_0x55b7af){const _0x469534=_0x1d5557;this[_0x469534(0x25a)]=$gameSystem[_0x469534(0x304)](),this[_0x469534(0x1ed)]=0x3c,Window_Selectable[_0x469534(0x316)][_0x469534(0x28c)]['call'](this,_0x55b7af),this[_0x469534(0x29c)]();},Window_Playtime[_0x1d5557(0x316)][_0x1d5557(0x31c)]=function(){const _0x571b88=_0x1d5557;return this[_0x571b88(0x32e)]();},Window_Playtime['prototype'][_0x1d5557(0x1f3)]=function(){const _0x43e8fa=_0x1d5557;Window_Selectable[_0x43e8fa(0x316)]['update']['call'](this),this[_0x43e8fa(0x30e)]();},Window_Playtime[_0x1d5557(0x316)][_0x1d5557(0x30e)]=function(){const _0x1e8220=_0x1d5557;if(this[_0x1e8220(0x1ed)]-->0x0){if(this[_0x1e8220(0x1ed)]<=0x0)this[_0x1e8220(0x29c)]();}},Window_Playtime[_0x1d5557(0x316)][_0x1d5557(0x29c)]=function(){const _0x5ea25e=_0x1d5557;this[_0x5ea25e(0x1ed)]=0x3c;const _0x319683=this[_0x5ea25e(0x282)](0x0),_0x403d2c=_0x319683['x'],_0x3e3fc2=_0x319683['y'],_0x3cf94d=_0x319683[_0x5ea25e(0x268)];this[_0x5ea25e(0x20f)]['clear'](),this['drawTimeIcon'](_0x319683),this['drawTimeLabel'](_0x319683),this['drawPlaytime'](_0x319683);},Window_Playtime[_0x1d5557(0x316)][_0x1d5557(0x2b9)]=function(){const _0xde9d19=_0x1d5557;Window_Selectable[_0xde9d19(0x316)]['resetFontSettings'][_0xde9d19(0x216)](this),this[_0xde9d19(0x20f)][_0xde9d19(0x247)]=VisuMZ[_0xde9d19(0x26c)][_0xde9d19(0x202)]['Playtime'][_0xde9d19(0x332)];},Window_Playtime['prototype'][_0x1d5557(0x1fd)]=function(_0x337107){const _0x670f4b=_0x1d5557;if(VisuMZ[_0x670f4b(0x26c)]['Settings'][_0x670f4b(0x27f)][_0x670f4b(0x2c6)]>0x0){const _0x2f26b3=VisuMZ[_0x670f4b(0x26c)]['Settings'][_0x670f4b(0x27f)]['Icon'],_0x4bdedc=_0x337107['y']+(this[_0x670f4b(0x32e)]()-ImageManager[_0x670f4b(0x2aa)])/0x2;this[_0x670f4b(0x23d)](_0x2f26b3,_0x337107['x'],_0x4bdedc);const _0x1c4503=ImageManager['iconWidth']+0x4;_0x337107['x']+=_0x1c4503,_0x337107['width']-=_0x1c4503;}},Window_Playtime[_0x1d5557(0x316)][_0x1d5557(0x334)]=function(_0x3c7b60){const _0x2edb86=_0x1d5557;this[_0x2edb86(0x2b9)](),this[_0x2edb86(0x2f7)](ColorManager['systemColor']());const _0x586525=VisuMZ[_0x2edb86(0x26c)][_0x2edb86(0x202)][_0x2edb86(0x27f)]['Time'];this['drawText'](_0x586525,_0x3c7b60['x'],_0x3c7b60['y'],_0x3c7b60[_0x2edb86(0x268)],_0x2edb86(0x2d4)),this[_0x2edb86(0x241)]();},Window_Playtime[_0x1d5557(0x316)][_0x1d5557(0x203)]=function(_0x24d28e){const _0x5376c8=_0x1d5557,_0x22cdf9=$gameSystem[_0x5376c8(0x304)]();this[_0x5376c8(0x288)](_0x22cdf9,_0x24d28e['x'],_0x24d28e['y'],_0x24d28e[_0x5376c8(0x268)],_0x5376c8(0x258));};function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables['prototype']=Object['create'](Window_Selectable['prototype']),Window_MenuVariables['prototype'][_0x1d5557(0x2c3)]=Window_MenuVariables,Window_MenuVariables[_0x1d5557(0x316)]['initialize']=function(_0x1d080e){const _0x605213=_0x1d5557;Window_Selectable[_0x605213(0x316)]['initialize'][_0x605213(0x216)](this,_0x1d080e),this[_0x605213(0x297)]=VisuMZ[_0x605213(0x26c)]['Settings'][_0x605213(0x2b7)]['VarList'],this['refresh']();},Window_MenuVariables[_0x1d5557(0x316)][_0x1d5557(0x31c)]=function(){const _0x35afcd=_0x1d5557;return this[_0x35afcd(0x32e)]();},Window_MenuVariables[_0x1d5557(0x316)][_0x1d5557(0x264)]=function(){const _0x57a922=_0x1d5557,_0x2d8b65=SceneManager[_0x57a922(0x2fd)][_0x57a922(0x259)]();return _0x2d8b65===_0x57a922(0x2ec)?0x1:VisuMZ[_0x57a922(0x26c)][_0x57a922(0x202)][_0x57a922(0x2b7)][_0x57a922(0x2b0)][_0x57a922(0x322)];},Window_MenuVariables[_0x1d5557(0x316)]['resetFontSettings']=function(){const _0x38bf0f=_0x1d5557;Window_Selectable[_0x38bf0f(0x316)][_0x38bf0f(0x2b9)]['call'](this),this[_0x38bf0f(0x20f)][_0x38bf0f(0x247)]=VisuMZ['MainMenuCore'][_0x38bf0f(0x202)][_0x38bf0f(0x2b7)][_0x38bf0f(0x332)],this['changeTextColor'](ColorManager[_0x38bf0f(0x310)]());},Window_MenuVariables['prototype'][_0x1d5557(0x2e1)]=function(){const _0x33aaed=_0x1d5557;return this[_0x33aaed(0x297)][_0x33aaed(0x322)];},Window_MenuVariables[_0x1d5557(0x316)][_0x1d5557(0x2de)]=function(){const _0x4399db=_0x1d5557,_0x12ddf7=this['topIndex']();for(let _0x38f2d0=0x0;_0x38f2d0<this[_0x4399db(0x2f2)]();_0x38f2d0++){const _0x2a3462=_0x12ddf7+_0x38f2d0;_0x2a3462<this[_0x4399db(0x2e1)]()&&(this[_0x4399db(0x2d2)](_0x2a3462),this[_0x4399db(0x22b)](_0x2a3462));}},Window_MenuVariables[_0x1d5557(0x316)][_0x1d5557(0x2d2)]=function(_0x38a60e){},Window_MenuVariables[_0x1d5557(0x316)][_0x1d5557(0x22b)]=function(_0x216fd6){const _0xefdcd3=_0x1d5557,_0x14e54b=this[_0xefdcd3(0x297)][_0x216fd6];if(_0x14e54b<=0x0)return;if(!$dataSystem['variables'][_0x14e54b])return;const _0x11a755=this[_0xefdcd3(0x282)](_0x216fd6);this[_0xefdcd3(0x2b9)]();let _0x4e431d=0x0,_0xb9eed4=$dataSystem['variables'][_0x14e54b][_0xefdcd3(0x20d)]();_0xb9eed4[_0xefdcd3(0x1f1)](/\\I\[(\d+)\]/i)&&(_0x4e431d=Number(RegExp['$1']),_0xb9eed4=_0xb9eed4[_0xefdcd3(0x30f)](/\\I\[(\d+)\]/i,'')[_0xefdcd3(0x20d)]());if(_0x4e431d>0x0){const _0x3fd02a=_0x11a755['y']+(this[_0xefdcd3(0x32e)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x4e431d,_0x11a755['x'],_0x3fd02a);const _0x209e10=ImageManager[_0xefdcd3(0x31f)]+0x4;_0x11a755['x']+=_0x209e10,_0x11a755[_0xefdcd3(0x268)]-=_0x209e10;}this['drawText'](_0xb9eed4,_0x11a755['x'],_0x11a755['y'],_0x11a755[_0xefdcd3(0x268)],'left'),this['changeTextColor'](ColorManager['normalColor']()),this['drawText']($gameVariables[_0xefdcd3(0x313)](_0x14e54b),_0x11a755['x'],_0x11a755['y'],_0x11a755['width'],_0xefdcd3(0x258));};