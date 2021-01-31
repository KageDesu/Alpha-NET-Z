//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.12] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
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
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x1678=['AutoColorRegExp','ENABLE','NameBoxWindowOffsetY','defeat','FontBiggerCap','133uCUKOx','text','_messageWindow','flushTextState','registerCommand','drawBackPicture','version','</B>','event','ANY','TextManager_message','getLastGainedItemData','adjustShowChoiceDefault','_nameBoxWindow','setChoiceListMaxRows','floor','updateAutoPosition','changeValue','WRAPBREAK','ParseItemNotetags','height','_moveTargetHeight','textCodeCheck','Armors','\x1bITALIC[1]','</RIGHT>','updateMove','\x1bBOLD[1]','toUpperCase','MessageRows','ParseClassNotetags','textSizeExTextAlignment','isRTL','Window_Options_addGeneralOptions','maxCommands','changeVolume','ChoiceWindowProperties','setSpeakerName','updateNameBoxMove','ConfigManager_applyData','convertBackslashCharacters','shift','ActionJS','processPreviousColor','WAIT','messageRows','CreateAutoColorRegExpLists','Window_Message_terminateMessage','width','NameBoxWindowOffsetX','addContinuousShowChoices','unshift','Game_System_initialize','setLastGainedItemData','prepareWordWrapEscapeCharacters','toLowerCase','TextStr','preFlushTextState','fontBold','getChoiceListLineHeight','makeDeepCopy','isVolumeSymbol','TightWrap','processMessageCoreEscapeActions','loadPicture','Scene_Options_maxCommands','update','[0]','NameBoxWindowDefaultColor','outputWidth','trim','helpWordWrap','prepareAutoSizeEscapeCharacters','isChoiceVisible','onProcessCharacter','round','parse','substring','maxCols','status','_resetRect','contentsBack','MessageWindow','Game_Party_initialize','startY','messageWordWrap','clamp','setupNumInput','isBusy','processTextAlignmentChange','addExtraShowChoices','Items','updateRelativePosition','normalColor','WordWrap','itemHeight','Window_Options_isVolumeSymbol','RelativePXPY','Type','windowPadding','_MessageCoreSettings','Window_Base_processNewLine','iconIndex','isWordWrapEnabled','setMessageWindowRows','maxFontSizeInLine','processEscapeCharacter','5otbJAy','stretchDimmerSprite','Window_ChoiceList_updatePlacement','registerActorNameAutoColorChanges','map\x20actor','_textDelayCount','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','test','call','TextColor%1','</I>','map','Name','isRunning','lastGainedObjectName','command101','addLoadListener','Undefined','processFsTextCode','Width','_wholeMoveDuration','open','choiceRows','defaultColor','slice','center','applyMoveEasing','\x1bITALIC[0]','postFlushTextState','processControlCharacter','clampPlacementPosition','format','partyMemberName','processActorNameAutoColorChanges','setFaceImage','map\x20player','clear','ARRAYNUM','ARRAYEVAL','textSpeedStatusText','contents','refresh','processFontChangeItalic','fontSize','isAutoColorAffected','Game_Map_updateEvents','Settings','TextCodeReplace','addMessageCoreTextSpeedCommand','SWITCH','changeTextColor','Window_Base_processControlCharacter','clearActorNameAutoColor','processAllText','drawBackCenteredPicture','_indent','MessageWindowProperties','selectDefault','isHelpWindowWordWrap','ChoiceWindowTextAlign','setupEvents','_moveEasingType','resetPositionX','mainFontFace','EVAL','TextAlign','innerWidth','processAutoPosition','Window_Options_statusText','easeIn','processColorLock','getChoiceListMaxColumns','Window_Options_changeVolume','\x1bCOLORLOCK[0]','moveTo','value','faceWidth','3gwjCjq','max','CommonEvent','CreateAutoColorRegExpListEntries','\x1bWrapBreak[0]','Skills','isTriggered','updateOffsetPosition','_autoPosRegExp','518095hfEqZx','remove','isContinuePrepareShowTextCommands','initTextAlignement','itemRectWithPadding','newPage','Default','choiceCols','_messagePositionReset','135290DsrIPF','</CENTER>','Window_Base_changeTextColor','MaxRows','AutoColor','Game_Map_initialize','ARRAYJSON','_relativePosition','convertEscapeCharacters','Rows','setTextAlignment','_eventId','_scene','Window_Message_newPage','splice','updateDimensions','\x1bC[%1]%2\x1bPREVCOLOR[0]','processWrapBreak','_messageCommonEvents','TextCodeActions','Window_NameBox_updatePlacement','code','choiceTextAlign','process_VisuMZ_MessageCore_TextCodes_Action','_textColorStack','anchor','convertMessageCoreEscapeActions','TextMacros','findTargetSprite','messageWidth','length','HIDE','States','Window_Message_synchronizeNameBox','resetRect','fontFace','_dimmerSprite','\x1bTEXTALIGNMENT[0]','updatePlacement','processAutoColorWords','processDrawCenteredPicture','moveBy','convertBaseEscapeCharacters','Actors','isSceneMap','ceil','changeOutlineColor','blt','_moveTargetWidth','ParseStateNotetags','FastForwardKey','setWordWrap','Enemies','_autoSizeRegexp','updateAutoSizePosition','statusText','startX','Window_NameBox_refresh','push','clearCommandList','Window_Base_initialize','adjustShowChoiceExtension','initialize','_autoPositionTarget','setupChoices','startWait','processCharacter','false','Window_Base_processAllText','setHelpWindowWordWrap','name','ChoiceWindowLineHeight','isColorLocked','synchronizeNameBox','Window_Base_update','_moveTargetY','_cancelButton','COMMONEVENT','_autoColorActorNames','resetWordWrap','boxHeight','messagePositionReset','split','lineHeight','FontChangeValue','processNewLine','getTextAlignment','_spriteset','replace','textSizeEx','instantTextSpeed','Window_Message_processEscapeCharacter','ConvertTextAutoColorRegExpFriendly','changePaintOpacity','_data','rtl','497paVzJR','description','_moveDuration','preConvertEscapeCharacters','setChoiceListLineHeight','applyDatabaseAutoColor','list','createContents','parameters','setBackground','makeFontSmaller','maxChoiceWidth','return\x20\x27','sort','isBreakShowTextCommands','messageCoreWindowX','_index','min','1nOuMrr','_positionType','process_VisuMZ_MessageCore_TextMacros','FUNC','TextSpeed','ParseSkillNotetags','makeFontBigger','VisuMZ_0_CoreEngine','CENTERPICTURE','Weapons','setChoiceListMaxColumns','</WORDWRAP>','Match','includes','99439xGHgpv','MaxCols','_textDelay','none','follower','ParseEnemyNotetags','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','COLORLOCK','ParseAllNotetags','FontSmallerCap','processCustomWait','_colorLock','SortObjectByKeyLength','type','getMessageWindowWidth','choiceLineHeight','convertTextAlignmentEscapeCharacters','nextEventCode','ARRAYSTR','windowWidth','2AWOFXN','NUM','StretchDimmedBg','MessageCore','AddOption','battle\x20actor','_texts','Game_Interpreter_setupChoices','numVisibleRows','updateOverlappingY','Window_Message_clearFlags','2742cTIUeC','<COLORLOCK>','Game_Map_setupEvents','obtainEscapeString','victory','_autoSizeCheck','ConvertParams','choice','actorName','fontItalic','gainItem','addContinuousShowTextCommands','74310FxVTTT','right','\x5c%1','emerge','setColorLock','Window_Base_textSizeEx','\x1bi[%1]%2','TextJS','constructor','SWITCHES','setMessageWindowWidth','CreateAutoColorFor','textSizeExWordWrap','calcMoveEasing','members','postConvertEscapeCharacters','setWaitMode','Window_Message_updatePlacement','Window_Message_isTriggered','\x1bTEXTALIGNMENT[1]','_commonEventId','quantity','boxWidth','processCommonEvent','innerHeight','battle\x20party','onDatabaseLoaded','prepareShowTextFollowups','processTextAlignmentX','_list','convertTextMacros','inBattle','faceName','STRUCT','onNewPageMessageCore','setRelativePosition','maxLines','Game_Party_gainItem','close','isCommandEnabled','_lastGainedItemData','battle\x20enemy','isSceneBattle','textWidth','processAutoSize','updateMessageCommonEvents','TextColor','openness','AdjustRect','getMessageWindowRows','callOkHandler','ParseWeaponNotetags','escapeStart','easeInOut','updateEvents','convertFontSettingsEscapeCharacters','addCommand','ALL','placeCancelButton','surprise','isChoiceEnabled','clearFlags','return\x200','process_VisuMZ_MessageCore_AutoColor','makeCommandList','General','processDrawPicture','_moveTargetX','Classes','index','getChoiceListMaxRows','addMessageCommonEvent','convertVariableEscapeCharacters','padding','<LINE\x20BREAK>','Instant','DefaultOutlineWidth','addGeneralOptions','obtainEscapeParam','getConfigValue','\x1bTEXTALIGNMENT[2]','outLineColor','setChoiceListTextAlign','textSpeed','canMove','getChoiceListTextAlign','currentCommand','exit','AutoColorBypassList','messageCoreTextSpeed','createTextState','getPreservedFontSettings','resetTextColor','_centerMessageWindow','Center','message','returnPreservedFontSettings','PICTURE','databaseObjectName','<I>','registerResetRect','Scene_Boot_onDatabaseLoaded','</LEFT>','exec','actor','process_VisuMZ_MessageCore_TextCodes_Replace','_interpreter','left','71wOPaHl','updateBackground','_wordWrap','prepareShowTextCommand','textCodeResult','choicePositionType','<WORDWRAP>','preemptive','default','processFontChangeBold','terminateMessage','applyData','processPyTextCode','match','setTextDelay','outlineColor','Window_Base_processEscapeCharacter','prototype','350731xJtuJA','convertLockColorsEscapeCharacters','bind','paintOpacity','commandName','ChoiceWindowMaxRows','calcWindowHeight','mainSprite','isItem','drawing','Window_Help_refresh','convertShowChoiceEscapeCodes','followers','processStoredAutoColorChanges','adjustShowChoiceCancel','setup','indexOf','obtainItem','outputHeight','join','refreshDimmerBitmap','textColor','choices','addWrapBreakAfterPunctuation','initMessageCore','setPositionType','setMessageWindowWordWrap','AddAutoColor','obtainExp','LineBreakSpace','<B>','ParseArmorNotetags','changeTextSpeed','map\x20event'];const _0x3c06=function(_0x6df37b,_0x2ab258){_0x6df37b=_0x6df37b-0xc1;let _0x1678fb=_0x1678[_0x6df37b];return _0x1678fb;};const _0x45c442=_0x3c06;(function(_0x1f5560,_0x215146){const _0x3dd085=_0x3c06;while(!![]){try{const _0x3fab48=-parseInt(_0x3dd085(0x19e))*-parseInt(_0x3dd085(0x2c8))+-parseInt(_0x3dd085(0x209))*parseInt(_0x3dd085(0xce))+-parseInt(_0x3dd085(0xe2))*-parseInt(_0x3dd085(0xf9))+-parseInt(_0x3dd085(0x268))+parseInt(_0x3dd085(0xed))*parseInt(_0x3dd085(0x165))+parseInt(_0x3dd085(0x2da))*-parseInt(_0x3dd085(0x25f))+parseInt(_0x3dd085(0x256))*parseInt(_0x3dd085(0x177));if(_0x3fab48===_0x215146)break;else _0x1f5560['push'](_0x1f5560['shift']());}catch(_0x48b22b){_0x1f5560['push'](_0x1f5560['shift']());}}}(_0x1678,0x4bee8));var label=_0x45c442(0xe5),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3c430a){const _0x467bec=_0x45c442;return _0x3c430a[_0x467bec(0x1ed)]&&_0x3c430a[_0x467bec(0x2c9)][_0x467bec(0xcd)]('['+label+']');})[0x0];VisuMZ[label][_0x45c442(0x237)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x35bc1e,_0x18faff){const _0x21b4d2=_0x45c442;for(const _0x576b0c in _0x18faff){if(_0x576b0c[_0x21b4d2(0x172)](/(.*):(.*)/i)){const _0x3cc7f7=String(RegExp['$1']),_0x2382bd=String(RegExp['$2'])['toUpperCase']()[_0x21b4d2(0x1e4)]();let _0x5e6ffa,_0x9c1caf,_0x1ac485;switch(_0x2382bd){case _0x21b4d2(0xe3):_0x5e6ffa=_0x18faff[_0x576b0c]!==''?Number(_0x18faff[_0x576b0c]):0x0;break;case _0x21b4d2(0x22e):_0x9c1caf=_0x18faff[_0x576b0c]!==''?JSON['parse'](_0x18faff[_0x576b0c]):[],_0x5e6ffa=_0x9c1caf['map'](_0x2bf247=>Number(_0x2bf247));break;case _0x21b4d2(0x249):_0x5e6ffa=_0x18faff[_0x576b0c]!==''?eval(_0x18faff[_0x576b0c]):null;break;case _0x21b4d2(0x22f):_0x9c1caf=_0x18faff[_0x576b0c]!==''?JSON[_0x21b4d2(0x1ea)](_0x18faff[_0x576b0c]):[],_0x5e6ffa=_0x9c1caf[_0x21b4d2(0x214)](_0x461cd0=>eval(_0x461cd0));break;case'JSON':_0x5e6ffa=_0x18faff[_0x576b0c]!==''?JSON['parse'](_0x18faff[_0x576b0c]):'';break;case _0x21b4d2(0x26e):_0x9c1caf=_0x18faff[_0x576b0c]!==''?JSON['parse'](_0x18faff[_0x576b0c]):[],_0x5e6ffa=_0x9c1caf[_0x21b4d2(0x214)](_0x32305a=>JSON[_0x21b4d2(0x1ea)](_0x32305a));break;case _0x21b4d2(0xc3):_0x5e6ffa=_0x18faff[_0x576b0c]!==''?new Function(JSON[_0x21b4d2(0x1ea)](_0x18faff[_0x576b0c])):new Function(_0x21b4d2(0x137));break;case'ARRAYFUNC':_0x9c1caf=_0x18faff[_0x576b0c]!==''?JSON[_0x21b4d2(0x1ea)](_0x18faff[_0x576b0c]):[],_0x5e6ffa=_0x9c1caf[_0x21b4d2(0x214)](_0x27790b=>new Function(JSON[_0x21b4d2(0x1ea)](_0x27790b)));break;case'STR':_0x5e6ffa=_0x18faff[_0x576b0c]!==''?String(_0x18faff[_0x576b0c]):'';break;case _0x21b4d2(0xe0):_0x9c1caf=_0x18faff[_0x576b0c]!==''?JSON[_0x21b4d2(0x1ea)](_0x18faff[_0x576b0c]):[],_0x5e6ffa=_0x9c1caf[_0x21b4d2(0x214)](_0x105b7f=>String(_0x105b7f));break;case _0x21b4d2(0x11a):_0x1ac485=_0x18faff[_0x576b0c]!==''?JSON['parse'](_0x18faff[_0x576b0c]):{},_0x35bc1e[_0x3cc7f7]={},VisuMZ[_0x21b4d2(0xf3)](_0x35bc1e[_0x3cc7f7],_0x1ac485);continue;case'ARRAYSTRUCT':_0x9c1caf=_0x18faff[_0x576b0c]!==''?JSON[_0x21b4d2(0x1ea)](_0x18faff[_0x576b0c]):[],_0x5e6ffa=_0x9c1caf[_0x21b4d2(0x214)](_0x156a8a=>VisuMZ['ConvertParams']({},JSON[_0x21b4d2(0x1ea)](_0x156a8a)));break;default:continue;}_0x35bc1e[_0x3cc7f7]=_0x5e6ffa;}}return _0x35bc1e;},(_0x48b0ea=>{const _0x545fed=_0x45c442,_0x69baf7=_0x48b0ea['name'];for(const _0x3e8e73 of dependencies){if(!Imported[_0x3e8e73]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x545fed(0x228)](_0x69baf7,_0x3e8e73)),SceneManager[_0x545fed(0x150)]();break;}}const _0x3d7882=_0x48b0ea['description'];if(_0x3d7882[_0x545fed(0x172)](/\[Version[ ](.*?)\]/i)){const _0x2c09f1=Number(RegExp['$1']);_0x2c09f1!==VisuMZ[label][_0x545fed(0x1a4)]&&(alert(_0x545fed(0x20f)[_0x545fed(0x228)](_0x69baf7,_0x2c09f1)),SceneManager['exit']());}if(_0x3d7882['match'](/\[Tier[ ](\d+)\]/i)){const _0x44d5b7=Number(RegExp['$1']);_0x44d5b7<tier?(alert(_0x545fed(0xd4)['format'](_0x69baf7,_0x44d5b7,tier)),SceneManager[_0x545fed(0x150)]()):tier=Math[_0x545fed(0x257)](_0x44d5b7,tier);}VisuMZ[_0x545fed(0xf3)](VisuMZ[label]['Settings'],_0x48b0ea['parameters']);})(pluginData),PluginManager[_0x45c442(0x1a2)](pluginData[_0x45c442(0x2ae)],_0x45c442(0x1c2),_0x426c52=>{const _0x1bfcde=_0x45c442;VisuMZ[_0x1bfcde(0xf3)](_0x426c52,_0x426c52);const _0x2df230=_0x426c52['LineHeight']||$gameSystem[_0x1bfcde(0x1d9)]()||0x1,_0x14a5f2=_0x426c52[_0x1bfcde(0x26b)]||$gameSystem[_0x1bfcde(0x13f)]()||0x1,_0x31fd8d=_0x426c52[_0x1bfcde(0xcf)]||$gameSystem[_0x1bfcde(0x250)]()||0x1,_0x32b6f6=_0x426c52[_0x1bfcde(0x24a)][_0x1bfcde(0x1d5)]()||'default';$gameSystem[_0x1bfcde(0x2cc)](_0x2df230),$gameSystem['setChoiceListMaxRows'](_0x14a5f2),$gameSystem[_0x1bfcde(0xca)](_0x31fd8d),$gameSystem[_0x1bfcde(0x14b)](_0x32b6f6);}),PluginManager[_0x45c442(0x1a2)](pluginData[_0x45c442(0x2ae)],_0x45c442(0x241),_0x1ef85e=>{const _0x2b294e=_0x45c442;VisuMZ['ConvertParams'](_0x1ef85e,_0x1ef85e);const _0x26e27c=_0x1ef85e[_0x2b294e(0x271)]||$gameSystem[_0x2b294e(0x12a)]()||0x1,_0x234d55=_0x1ef85e[_0x2b294e(0x21c)]||$gameSystem[_0x2b294e(0xdc)]()||0x1;$gameTemp[_0x2b294e(0x156)]=_0x1ef85e[_0x2b294e(0x157)]||![];const _0x3ce2e2=_0x1ef85e[_0x2b294e(0x1fc)]['toLowerCase']();$gameSystem[_0x2b294e(0x206)](_0x26e27c),$gameSystem['setMessageWindowWidth'](_0x234d55);['true',_0x2b294e(0x2ab)][_0x2b294e(0xcd)](_0x3ce2e2)&&$gameSystem[_0x2b294e(0x191)](eval(_0x3ce2e2));const _0x4f7b0e=SceneManager[_0x2b294e(0x274)][_0x2b294e(0x1a0)];_0x4f7b0e&&(_0x4f7b0e[_0x2b294e(0x2b7)](),_0x4f7b0e['updateDimensions'](),_0x4f7b0e[_0x2b294e(0x2cf)]());}),VisuMZ['MessageCore'][_0x45c442(0x15e)]=Scene_Boot['prototype'][_0x45c442(0x113)],Scene_Boot[_0x45c442(0x176)][_0x45c442(0x113)]=function(){const _0x40783c=_0x45c442;VisuMZ[_0x40783c(0xe5)][_0x40783c(0x15e)][_0x40783c(0x211)](this),this[_0x40783c(0x27f)](),this[_0x40783c(0x162)](),this[_0x40783c(0xc2)](),this[_0x40783c(0x138)]();},VisuMZ['MessageCore'][_0x45c442(0xda)]=function(_0x4bbeee){const _0x473249=_0x45c442,_0x2de90f=VisuMZ[_0x473249(0xe5)][_0x473249(0x237)][_0x4bbeee];_0x2de90f[_0x473249(0x2d5)]((_0x153d7e,_0xd02aeb)=>{const _0x3e6637=_0x473249;if(!_0x153d7e||!_0xd02aeb)return-0x1;return _0xd02aeb['Match'][_0x3e6637(0x286)]-_0x153d7e[_0x3e6637(0xcc)][_0x3e6637(0x286)];});},Scene_Boot['prototype'][_0x45c442(0x27f)]=function(){const _0x2e5f7f=_0x45c442;VisuMZ[_0x2e5f7f(0xe5)][_0x2e5f7f(0xda)]('TextCodeActions');for(const _0x152367 of VisuMZ[_0x2e5f7f(0xe5)][_0x2e5f7f(0x237)][_0x2e5f7f(0x27b)]){_0x152367[_0x2e5f7f(0xcc)]=_0x152367[_0x2e5f7f(0xcc)]['toUpperCase'](),_0x152367[_0x2e5f7f(0x1b4)]=new RegExp('\x1b'+_0x152367['Match'],'gi'),_0x152367[_0x2e5f7f(0x169)]='\x1b'+_0x152367[_0x2e5f7f(0xcc)];if(_0x152367[_0x2e5f7f(0x200)]==='')_0x152367[_0x2e5f7f(0x169)]+=_0x2e5f7f(0x1e1);}},Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x328104=_0x45c442;VisuMZ[_0x328104(0xe5)][_0x328104(0xda)](_0x328104(0x238));for(const _0x2cb9c6 of VisuMZ['MessageCore']['Settings'][_0x328104(0x238)]){_0x2cb9c6[_0x328104(0x1b4)]=new RegExp('\x1b'+_0x2cb9c6[_0x328104(0xcc)]+_0x2cb9c6[_0x328104(0x200)],'gi'),_0x2cb9c6['TextStr']!==''&&_0x2cb9c6[_0x328104(0x1d6)]!==_0x328104(0x21a)?_0x2cb9c6[_0x328104(0x169)]=new Function(_0x328104(0x2d4)+_0x2cb9c6[_0x328104(0x1d6)][_0x328104(0x2c0)](/\\/g,'\x1b')+'\x27'):_0x2cb9c6[_0x328104(0x169)]=_0x2cb9c6[_0x328104(0x100)];}},Scene_Boot[_0x45c442(0x176)]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x325e33=_0x45c442;for(const _0x113cd9 of VisuMZ[_0x325e33(0xe5)][_0x325e33(0x237)][_0x325e33(0x283)]){_0x113cd9[_0x325e33(0x1b4)]=new RegExp('\x5c['+_0x113cd9[_0x325e33(0xcc)]+'\x5c]','gi'),_0x113cd9[_0x325e33(0x1d6)]!==''&&_0x113cd9[_0x325e33(0x1d6)]!==_0x325e33(0x21a)?_0x113cd9[_0x325e33(0x169)]=new Function(_0x325e33(0x2d4)+_0x113cd9['TextStr'][_0x325e33(0x2c0)](/\\/g,'\x1b')+'\x27'):_0x113cd9[_0x325e33(0x169)]=_0x113cd9[_0x325e33(0x100)];}},Scene_Boot['prototype'][_0x45c442(0x138)]=function(){const _0x2d342e=_0x45c442,_0x22ac47=VisuMZ[_0x2d342e(0xe5)][_0x2d342e(0x237)][_0x2d342e(0x26c)];!VisuMZ[_0x2d342e(0xd6)]&&(VisuMZ[_0x2d342e(0xe5)][_0x2d342e(0x192)]($dataClasses,_0x22ac47[_0x2d342e(0x13d)]),VisuMZ[_0x2d342e(0xe5)]['AddAutoColor']($dataSkills,_0x22ac47[_0x2d342e(0x25b)]),VisuMZ['MessageCore'][_0x2d342e(0x192)]($dataItems,_0x22ac47[_0x2d342e(0x1f9)]),VisuMZ['MessageCore'][_0x2d342e(0x192)]($dataWeapons,_0x22ac47['Weapons']),VisuMZ[_0x2d342e(0xe5)][_0x2d342e(0x192)]($dataArmors,_0x22ac47[_0x2d342e(0x1b5)]),VisuMZ[_0x2d342e(0xe5)][_0x2d342e(0x192)]($dataEnemies,_0x22ac47[_0x2d342e(0x29c)]),VisuMZ[_0x2d342e(0xe5)][_0x2d342e(0x192)]($dataStates,_0x22ac47[_0x2d342e(0x288)])),VisuMZ['MessageCore'][_0x2d342e(0x1cc)]();},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x151)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x45c442(0x195),_0x45c442(0x1a5),_0x45c442(0x15c),_0x45c442(0x213),'<LEFT>',_0x45c442(0x15f),'<CENTER>',_0x45c442(0x269),'<RIGHT>',_0x45c442(0x1b7),_0x45c442(0xee),'</COLORLOCK>','(((',')))',_0x45c442(0x16b),_0x45c442(0xcb),'<BR>',_0x45c442(0x143),'PICTURE',_0x45c442(0xc8),'COMMONEVENT',_0x45c442(0x1ca),'SHOW',_0x45c442(0x287),_0x45c442(0x19a),'DISABLE',_0x45c442(0x23a),_0x45c442(0x102),_0x45c442(0x132),_0x45c442(0x1a7)],VisuMZ['MessageCore'][_0x45c442(0x192)]=function(_0x3d52bc,_0x3f723f){const _0x21baa0=_0x45c442;if(_0x3f723f<=0x0)return;const _0x389406=_0x3d52bc;for(const _0x3a2852 of _0x389406){if(!_0x3a2852)continue;VisuMZ['MessageCore'][_0x21baa0(0x104)](_0x3a2852,_0x3f723f);}},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x1cc)]=function(){const _0x4deaa4=_0x45c442;VisuMZ[_0x4deaa4(0xe5)][_0x4deaa4(0x199)]=[];for(let _0x27afd6=0x1;_0x27afd6<=0x1f;_0x27afd6++){const _0x1898e9=_0x4deaa4(0x212)['format'](_0x27afd6),_0x2e2202=VisuMZ[_0x4deaa4(0xe5)]['Settings'][_0x4deaa4(0x26c)][_0x1898e9];_0x2e2202[_0x4deaa4(0x2d5)]((_0x4657cc,_0x539f59)=>{const _0x3c1bb3=_0x4deaa4;if(!_0x4657cc||!_0x539f59)return-0x1;return _0x539f59[_0x3c1bb3(0x286)]-_0x4657cc[_0x3c1bb3(0x286)];}),this[_0x4deaa4(0x259)](_0x2e2202,_0x27afd6);}},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x259)]=function(_0x4aaff8,_0x5c4230){const _0x5d4914=_0x45c442;for(const _0x5c3e52 of _0x4aaff8){if(_0x5c3e52[_0x5d4914(0x286)]<=0x0)continue;if(/^\d+$/[_0x5d4914(0x210)](_0x5c3e52))continue;let _0xe64448=VisuMZ[_0x5d4914(0xe5)]['ConvertTextAutoColorRegExpFriendly'](_0x5c3e52);if(_0x5c3e52[_0x5d4914(0x172)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x268c31=new RegExp(_0xe64448,'i');else var _0x268c31=new RegExp('\x5cb'+_0xe64448+'\x5cb','g');VisuMZ['MessageCore'][_0x5d4914(0x199)]['push']([_0x268c31,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5d4914(0x228)](_0x5c4230,_0x5c3e52)]);}},VisuMZ['MessageCore'][_0x45c442(0x2c4)]=function(_0x161ed7){const _0x3c076c=_0x45c442;return _0x161ed7=_0x161ed7[_0x3c076c(0x2c0)](/(\W)/gi,(_0x42ebaf,_0x4d3398)=>_0x3c076c(0xfb)[_0x3c076c(0x228)](_0x4d3398)),_0x161ed7;},VisuMZ[_0x45c442(0xe5)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0x5c02b1){const _0x250f38=_0x45c442;VisuMZ[_0x250f38(0xe5)][_0x250f38(0x1bc)][_0x250f38(0x211)](this,_0x5c02b1);const _0x4d0eab=VisuMZ[_0x250f38(0xe5)]['Settings'][_0x250f38(0x26c)];VisuMZ['MessageCore'][_0x250f38(0x104)](_0x5c02b1,_0x4d0eab[_0x250f38(0x13d)]);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0xc5)]=VisuMZ[_0x45c442(0xc5)],VisuMZ['ParseSkillNotetags']=function(_0x115c65){const _0xc3c493=_0x45c442;VisuMZ['MessageCore'][_0xc3c493(0xc5)][_0xc3c493(0x211)](this,_0x115c65);const _0x246f19=VisuMZ[_0xc3c493(0xe5)][_0xc3c493(0x237)]['AutoColor'];VisuMZ[_0xc3c493(0xe5)][_0xc3c493(0x104)](_0x115c65,_0x246f19[_0xc3c493(0x25b)]);},VisuMZ['MessageCore'][_0x45c442(0x1b1)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x45c442(0x1b1)]=function(_0x3b2a90){const _0x4d8af4=_0x45c442;VisuMZ[_0x4d8af4(0xe5)][_0x4d8af4(0x1b1)][_0x4d8af4(0x211)](this,_0x3b2a90);const _0x2b8399=VisuMZ[_0x4d8af4(0xe5)][_0x4d8af4(0x237)]['AutoColor'];VisuMZ['MessageCore'][_0x4d8af4(0x104)](_0x3b2a90,_0x2b8399[_0x4d8af4(0x1f9)]);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x12c)]=VisuMZ[_0x45c442(0x12c)],VisuMZ['ParseWeaponNotetags']=function(_0x1df53e){const _0x402cf1=_0x45c442;VisuMZ[_0x402cf1(0xe5)][_0x402cf1(0x12c)][_0x402cf1(0x211)](this,_0x1df53e);const _0x434d76=VisuMZ['MessageCore'][_0x402cf1(0x237)]['AutoColor'];VisuMZ[_0x402cf1(0xe5)][_0x402cf1(0x104)](_0x1df53e,_0x434d76['Weapons']);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x196)]=VisuMZ[_0x45c442(0x196)],VisuMZ['ParseArmorNotetags']=function(_0x5e1121){const _0x5bb5d7=_0x45c442;VisuMZ[_0x5bb5d7(0xe5)]['ParseArmorNotetags'][_0x5bb5d7(0x211)](this,_0x5e1121);const _0x2965d7=VisuMZ[_0x5bb5d7(0xe5)][_0x5bb5d7(0x237)]['AutoColor'];VisuMZ['MessageCore'][_0x5bb5d7(0x104)](_0x5e1121,_0x2965d7[_0x5bb5d7(0x1b5)]);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0xd3)]=VisuMZ[_0x45c442(0xd3)],VisuMZ[_0x45c442(0xd3)]=function(_0x5a0701){const _0x3356df=_0x45c442;VisuMZ[_0x3356df(0xe5)]['ParseEnemyNotetags']['call'](this,_0x5a0701);const _0x4c16f6=VisuMZ['MessageCore'][_0x3356df(0x237)][_0x3356df(0x26c)];VisuMZ[_0x3356df(0xe5)][_0x3356df(0x104)](_0x5a0701,_0x4c16f6[_0x3356df(0x29c)]);},VisuMZ['MessageCore'][_0x45c442(0x299)]=VisuMZ[_0x45c442(0x299)],VisuMZ[_0x45c442(0x299)]=function(_0x592dfd){const _0x7d1e59=_0x45c442;VisuMZ[_0x7d1e59(0xe5)]['ParseStateNotetags'][_0x7d1e59(0x211)](this,_0x592dfd);const _0x2a0596=VisuMZ[_0x7d1e59(0xe5)][_0x7d1e59(0x237)][_0x7d1e59(0x26c)];VisuMZ[_0x7d1e59(0xe5)][_0x7d1e59(0x104)](_0x592dfd,_0x2a0596['States']);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x104)]=function(_0xf30b35,_0x34f14d){const _0x1ec0d3=_0x45c442;if(_0x34f14d<=0x0)return;const _0x5d5dbd=VisuMZ[_0x1ec0d3(0xe5)][_0x1ec0d3(0x237)][_0x1ec0d3(0x26c)][_0x1ec0d3(0x127)+_0x34f14d];let _0x133081=_0xf30b35[_0x1ec0d3(0x2ae)]['trim']();if(/^\d+$/[_0x1ec0d3(0x210)](_0x133081))return;if(VisuMZ[_0x1ec0d3(0xe5)][_0x1ec0d3(0x151)][_0x1ec0d3(0xcd)](_0x133081[_0x1ec0d3(0x1ba)]()))return;_0x133081=_0x133081['replace'](/\\I\[(\d+)\]/gi,''),_0x133081=_0x133081[_0x1ec0d3(0x2c0)](/\x1bI\[(\d+)\]/gi,'');if(_0x133081[_0x1ec0d3(0x286)]<=0x0)return;if(_0x133081[_0x1ec0d3(0x172)](/-----/i))return;_0x5d5dbd[_0x1ec0d3(0x2a2)](_0x133081);},SceneManager[_0x45c442(0x123)]=function(){const _0x593929=_0x45c442;return this[_0x593929(0x274)]&&this[_0x593929(0x274)]['constructor']===Scene_Battle;},SceneManager[_0x45c442(0x294)]=function(){const _0x1b0a10=_0x45c442;return this[_0x1b0a10(0x274)]&&this[_0x1b0a10(0x274)]['constructor']===Scene_Map;},VisuMZ['MessageCore']['TextManager_message']=TextManager[_0x45c442(0x158)],TextManager[_0x45c442(0x158)]=function(_0x387f43){const _0x1e023b=_0x45c442,_0x5d20cb=['levelUp',_0x1e023b(0xfc),_0x1e023b(0x16c),_0x1e023b(0x134),_0x1e023b(0xf1),_0x1e023b(0x19c),_0x1e023b(0x12d),_0x1e023b(0x193),'obtainGold',_0x1e023b(0x188)];let _0x3d9856=VisuMZ['MessageCore'][_0x1e023b(0x1a8)][_0x1e023b(0x211)](this,_0x387f43);return _0x5d20cb[_0x1e023b(0xcd)](_0x387f43)&&(_0x3d9856=_0x1e023b(0xcb)+_0x3d9856),_0x3d9856;},ConfigManager[_0x45c442(0x14c)]=VisuMZ['MessageCore']['Settings'][_0x45c442(0xc4)][_0x45c442(0x265)],VisuMZ[_0x45c442(0xe5)]['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager['makeData']=function(){const _0xa1172d=_0x45c442,_0x5b6012=VisuMZ[_0xa1172d(0xe5)]['ConfigManager_makeData'][_0xa1172d(0x211)](this);return _0x5b6012['textSpeed']=this[_0xa1172d(0x14c)],_0x5b6012;},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x1c5)]=ConfigManager[_0x45c442(0x170)],ConfigManager[_0x45c442(0x170)]=function(_0x491805){const _0x56af38=_0x45c442;VisuMZ[_0x56af38(0xe5)]['ConfigManager_applyData']['call'](this,_0x491805),'textSpeed'in _0x491805?this[_0x56af38(0x14c)]=Number(_0x491805[_0x56af38(0x14c)])[_0x56af38(0x1f4)](0x1,0xb):this['textSpeed']=VisuMZ[_0x56af38(0xe5)]['Settings'][_0x56af38(0xc4)]['Default'];},TextManager['messageCoreTextSpeed']=VisuMZ[_0x45c442(0xe5)][_0x45c442(0x237)][_0x45c442(0xc4)][_0x45c442(0x215)],TextManager[_0x45c442(0x2c2)]=VisuMZ[_0x45c442(0xe5)][_0x45c442(0x237)][_0x45c442(0xc4)][_0x45c442(0x144)],VisuMZ[_0x45c442(0xe5)][_0x45c442(0x1d2)]=Game_System[_0x45c442(0x176)]['initialize'],Game_System[_0x45c442(0x176)]['initialize']=function(){const _0x2be663=_0x45c442;VisuMZ[_0x2be663(0xe5)][_0x2be663(0x1d2)][_0x2be663(0x211)](this),this[_0x2be663(0x18f)]();},Game_System[_0x45c442(0x176)][_0x45c442(0x18f)]=function(){const _0x197c4e=_0x45c442,_0x40f98b=VisuMZ['MessageCore']['Settings']['General'],_0x910d18=VisuMZ[_0x197c4e(0xe5)]['Settings'][_0x197c4e(0x1fc)];this[_0x197c4e(0x202)]={'messageRows':_0x40f98b[_0x197c4e(0x1bb)],'messageWidth':_0x40f98b['MessageWidth'],'messageWordWrap':_0x910d18[_0x197c4e(0x1f0)],'helpWordWrap':_0x910d18['HelpWindow'],'choiceLineHeight':_0x40f98b[_0x197c4e(0x2af)],'choiceRows':_0x40f98b[_0x197c4e(0x17c)],'choiceCols':_0x40f98b['ChoiceWindowMaxCols'],'choiceTextAlign':_0x40f98b[_0x197c4e(0x244)]};},Game_System[_0x45c442(0x176)]['getMessageWindowRows']=function(){const _0xb28caf=_0x45c442;if(this[_0xb28caf(0x202)]===undefined)this[_0xb28caf(0x18f)]();if(this['_MessageCoreSettings'][_0xb28caf(0x1cb)]===undefined)this[_0xb28caf(0x18f)]();return this[_0xb28caf(0x202)][_0xb28caf(0x1cb)];},Game_System[_0x45c442(0x176)][_0x45c442(0x206)]=function(_0x1abead){const _0x3a21a8=_0x45c442;if(this[_0x3a21a8(0x202)]===undefined)this['initMessageCore']();if(this[_0x3a21a8(0x202)][_0x3a21a8(0x1cb)]===undefined)this[_0x3a21a8(0x18f)]();this[_0x3a21a8(0x202)][_0x3a21a8(0x1cb)]=_0x1abead||0x1;},Game_System['prototype'][_0x45c442(0xdc)]=function(){const _0x89e07a=_0x45c442;if(this[_0x89e07a(0x202)]===undefined)this[_0x89e07a(0x18f)]();if(this[_0x89e07a(0x202)][_0x89e07a(0x285)]===undefined)this[_0x89e07a(0x18f)]();return this['_MessageCoreSettings'][_0x89e07a(0x285)];},Game_System[_0x45c442(0x176)][_0x45c442(0x103)]=function(_0x40972a){const _0x4a2e3d=_0x45c442;if(this[_0x4a2e3d(0x202)]===undefined)this[_0x4a2e3d(0x18f)]();if(this[_0x4a2e3d(0x202)][_0x4a2e3d(0x285)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x4a2e3d(0x285)]=_0x40972a||0x1;},Game_System['prototype']['isMessageWindowWordWrap']=function(){const _0x2ae341=_0x45c442;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x2ae341(0x202)][_0x2ae341(0x1f3)]===undefined)this['initMessageCore']();return this[_0x2ae341(0x202)][_0x2ae341(0x1f3)];},Game_System[_0x45c442(0x176)][_0x45c442(0x191)]=function(_0x2f228d){const _0x5e91f1=_0x45c442;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x5e91f1(0x202)]['messageWordWrap']===undefined)this[_0x5e91f1(0x18f)]();this['_MessageCoreSettings'][_0x5e91f1(0x1f3)]=_0x2f228d;},Game_System['prototype']['isHelpWindowWordWrap']=function(){const _0x34d29a=_0x45c442;if(this['_MessageCoreSettings']===undefined)this[_0x34d29a(0x18f)]();if(this[_0x34d29a(0x202)][_0x34d29a(0x1e5)]===undefined)this[_0x34d29a(0x18f)]();return this['_MessageCoreSettings']['helpWordWrap'];},Game_System[_0x45c442(0x176)][_0x45c442(0x2ad)]=function(_0xd8da3c){const _0x110868=_0x45c442;if(this[_0x110868(0x202)]===undefined)this['initMessageCore']();if(this[_0x110868(0x202)][_0x110868(0x1e5)]===undefined)this[_0x110868(0x18f)]();this['_MessageCoreSettings'][_0x110868(0x1e5)]=_0xd8da3c;},Game_System[_0x45c442(0x176)][_0x45c442(0x1d9)]=function(){const _0x3e5595=_0x45c442;if(this[_0x3e5595(0x202)]===undefined)this['initMessageCore']();if(this[_0x3e5595(0x202)]['choiceLineHeight']===undefined)this['initMessageCore']();return this[_0x3e5595(0x202)][_0x3e5595(0xdd)];},Game_System[_0x45c442(0x176)]['setChoiceListLineHeight']=function(_0x43d555){const _0xe334d3=_0x45c442;if(this[_0xe334d3(0x202)]===undefined)this[_0xe334d3(0x18f)]();if(this[_0xe334d3(0x202)][_0xe334d3(0xdd)]===undefined)this[_0xe334d3(0x18f)]();this[_0xe334d3(0x202)][_0xe334d3(0xdd)]=_0x43d555||0x1;},Game_System[_0x45c442(0x176)][_0x45c442(0x13f)]=function(){const _0x4b7a04=_0x45c442;if(this[_0x4b7a04(0x202)]===undefined)this[_0x4b7a04(0x18f)]();if(this['_MessageCoreSettings']['choiceRows']===undefined)this['initMessageCore']();return this[_0x4b7a04(0x202)]['choiceRows'];},Game_System[_0x45c442(0x176)][_0x45c442(0x1ac)]=function(_0x21b3d7){const _0x27dcc3=_0x45c442;if(this[_0x27dcc3(0x202)]===undefined)this[_0x27dcc3(0x18f)]();if(this[_0x27dcc3(0x202)][_0x27dcc3(0x21f)]===undefined)this[_0x27dcc3(0x18f)]();this[_0x27dcc3(0x202)][_0x27dcc3(0x21f)]=_0x21b3d7||0x1;},Game_System[_0x45c442(0x176)]['getChoiceListMaxColumns']=function(){const _0x5edd39=_0x45c442;if(this[_0x5edd39(0x202)]===undefined)this['initMessageCore']();if(this[_0x5edd39(0x202)][_0x5edd39(0x266)]===undefined)this[_0x5edd39(0x18f)]();return this[_0x5edd39(0x202)][_0x5edd39(0x266)];},Game_System['prototype'][_0x45c442(0xca)]=function(_0x30143a){const _0x37a235=_0x45c442;if(this[_0x37a235(0x202)]===undefined)this[_0x37a235(0x18f)]();if(this[_0x37a235(0x202)][_0x37a235(0x266)]===undefined)this[_0x37a235(0x18f)]();this[_0x37a235(0x202)][_0x37a235(0x266)]=_0x30143a||0x1;},Game_System[_0x45c442(0x176)][_0x45c442(0x14e)]=function(){const _0x401d74=_0x45c442;if(this[_0x401d74(0x202)]===undefined)this[_0x401d74(0x18f)]();if(this[_0x401d74(0x202)][_0x401d74(0x27e)]===undefined)this['initMessageCore']();return this[_0x401d74(0x202)]['choiceTextAlign'];},Game_System[_0x45c442(0x176)]['setChoiceListTextAlign']=function(_0x325caf){const _0x108d39=_0x45c442;if(this[_0x108d39(0x202)]===undefined)this[_0x108d39(0x18f)]();if(this[_0x108d39(0x202)][_0x108d39(0x27e)]===undefined)this[_0x108d39(0x18f)]();this[_0x108d39(0x202)][_0x108d39(0x27e)]=_0x325caf[_0x108d39(0x1d5)]();},VisuMZ[_0x45c442(0xe5)]['Game_Party_initialize']=Game_Party[_0x45c442(0x176)]['initialize'],Game_Party[_0x45c442(0x176)][_0x45c442(0x2a6)]=function(){const _0x31d0a7=_0x45c442;VisuMZ[_0x31d0a7(0xe5)][_0x31d0a7(0x1f1)][_0x31d0a7(0x211)](this),this['initMessageCore']();},Game_Party[_0x45c442(0x176)][_0x45c442(0x18f)]=function(){const _0x43a0f8=_0x45c442;this[_0x43a0f8(0x121)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x45c442(0x176)][_0x45c442(0x1a9)]=function(){const _0x3fac80=_0x45c442;if(this[_0x3fac80(0x121)]===undefined)this[_0x3fac80(0x18f)]();return this[_0x3fac80(0x121)];},Game_Party[_0x45c442(0x176)][_0x45c442(0x1d3)]=function(_0x4b8d82,_0x2d5c1c){const _0x505e3b=_0x45c442;if(this[_0x505e3b(0x121)]===undefined)this[_0x505e3b(0x18f)]();if(!_0x4b8d82)return;if(DataManager[_0x505e3b(0x17f)](_0x4b8d82))this['_lastGainedItemData'][_0x505e3b(0xdb)]=0x0;else{if(DataManager['isWeapon'](_0x4b8d82))this[_0x505e3b(0x121)][_0x505e3b(0xdb)]=0x1;else DataManager['isArmor'](_0x4b8d82)&&(this[_0x505e3b(0x121)][_0x505e3b(0xdb)]=0x2);}this[_0x505e3b(0x121)]['id']=_0x4b8d82['id'],this[_0x505e3b(0x121)][_0x505e3b(0x10e)]=_0x2d5c1c;},VisuMZ[_0x45c442(0xe5)]['Game_Party_gainItem']=Game_Party['prototype'][_0x45c442(0xf7)],Game_Party[_0x45c442(0x176)][_0x45c442(0xf7)]=function(_0x21a8b8,_0x180e2c,_0x3b3f67){const _0x2dd836=_0x45c442;VisuMZ[_0x2dd836(0xe5)][_0x2dd836(0x11e)][_0x2dd836(0x211)](this,_0x21a8b8,_0x180e2c,_0x3b3f67),_0x180e2c>0x0&&this['setLastGainedItemData'](_0x21a8b8,_0x180e2c);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x26d)]=Game_Map[_0x45c442(0x176)][_0x45c442(0x2a6)],Game_Map['prototype'][_0x45c442(0x2a6)]=function(){const _0x1d464f=_0x45c442;VisuMZ['MessageCore'][_0x1d464f(0x26d)][_0x1d464f(0x211)](this),this[_0x1d464f(0x27a)]=[];},VisuMZ['MessageCore']['Game_Map_setupEvents']=Game_Map[_0x45c442(0x176)][_0x45c442(0x245)],Game_Map[_0x45c442(0x176)][_0x45c442(0x245)]=function(){const _0x258deb=_0x45c442;VisuMZ[_0x258deb(0xe5)][_0x258deb(0xef)]['call'](this),this[_0x258deb(0x27a)]=[];},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x236)]=Game_Map['prototype'][_0x45c442(0x12f)],Game_Map[_0x45c442(0x176)][_0x45c442(0x12f)]=function(){const _0x39397f=_0x45c442;VisuMZ['MessageCore'][_0x39397f(0x236)][_0x39397f(0x211)](this),this[_0x39397f(0x126)]();},Game_Map[_0x45c442(0x176)][_0x45c442(0x140)]=function(_0x351499){const _0x20b6f6=_0x45c442;this[_0x20b6f6(0x27a)]=this[_0x20b6f6(0x27a)]||[];const _0x2056b1=this['_interpreter'][_0x20b6f6(0x273)],_0x56d0ed=new Game_MessageCommonEvent(_0x351499,_0x2056b1);this[_0x20b6f6(0x27a)][_0x20b6f6(0x2a2)](_0x56d0ed);},Game_Map[_0x45c442(0x176)][_0x45c442(0x126)]=function(){const _0x3597a4=_0x45c442;this[_0x3597a4(0x27a)]=this[_0x3597a4(0x27a)]||[];for(const _0x1b714d of this['_messageCommonEvents']){!_0x1b714d[_0x3597a4(0x163)]?this[_0x3597a4(0x27a)][_0x3597a4(0x260)](_0x1b714d):_0x1b714d[_0x3597a4(0x1e0)]();}},Game_Interpreter['prototype'][_0x45c442(0x218)]=function(_0x1bc7cd){const _0x184147=_0x45c442;if($gameMessage[_0x184147(0x1f6)]())return![];return this[_0x184147(0x168)](_0x1bc7cd),this[_0x184147(0xf8)](_0x1bc7cd),this[_0x184147(0x114)](_0x1bc7cd),this[_0x184147(0x109)]('message'),!![];},Game_Interpreter[_0x45c442(0x176)][_0x45c442(0x168)]=function(_0x3a5025){const _0x47581b=_0x45c442;$gameMessage[_0x47581b(0x22b)](_0x3a5025[0x0],_0x3a5025[0x1]),$gameMessage[_0x47581b(0x2d1)](_0x3a5025[0x2]),$gameMessage[_0x47581b(0x190)](_0x3a5025[0x3]),$gameMessage[_0x47581b(0x1c3)](_0x3a5025[0x4]);},Game_Interpreter[_0x45c442(0x176)]['addContinuousShowTextCommands']=function(_0x582abc){const _0x5209d1=_0x45c442;while(this[_0x5209d1(0x261)]()){this['_index']++;this[_0x5209d1(0x14f)]()[_0x5209d1(0x27d)]===0x191&&$gameMessage['add'](this[_0x5209d1(0x14f)]()[_0x5209d1(0x2d0)][0x0]);if(this[_0x5209d1(0x2d6)]())break;}},Game_Interpreter[_0x45c442(0x176)]['isContinuePrepareShowTextCommands']=function(){const _0x2ec882=_0x45c442;return this[_0x2ec882(0xdf)]()===0x65&&$gameSystem[_0x2ec882(0x12a)]()>0x4?!![]:this['nextEventCode']()===0x191;},Game_Interpreter['prototype'][_0x45c442(0x2d6)]=function(){const _0x1e71b2=_0x45c442;return $gameMessage[_0x1e71b2(0xe8)][_0x1e71b2(0x286)]>=$gameSystem[_0x1e71b2(0x12a)]()&&this[_0x1e71b2(0xdf)]()!==0x191;},Game_Interpreter[_0x45c442(0x176)][_0x45c442(0x114)]=function(_0x555025){const _0x5531aa=_0x45c442;switch(this[_0x5531aa(0xdf)]()){case 0x66:this[_0x5531aa(0x2d8)]++,this[_0x5531aa(0x2a8)](this[_0x5531aa(0x14f)]()[_0x5531aa(0x2d0)]);break;case 0x67:this[_0x5531aa(0x2d8)]++,this[_0x5531aa(0x1f5)](this['currentCommand']()['parameters']);break;case 0x68:this[_0x5531aa(0x2d8)]++,this['setupItemChoice'](this['currentCommand']()['parameters']);break;}},VisuMZ['MessageCore'][_0x45c442(0xe9)]=Game_Interpreter[_0x45c442(0x176)][_0x45c442(0x2a8)],Game_Interpreter['prototype']['setupChoices']=function(_0x521661){const _0x20b8f7=_0x45c442;_0x521661=this[_0x20b8f7(0x1d0)](),VisuMZ[_0x20b8f7(0xe5)][_0x20b8f7(0xe9)][_0x20b8f7(0x211)](this,_0x521661);},Game_Interpreter[_0x45c442(0x176)][_0x45c442(0x1d0)]=function(){const _0x44b1b2=_0x45c442,_0x4913dd=this[_0x44b1b2(0x2d8)],_0x582527=[];let _0x2e0080=0x0;this[_0x44b1b2(0x2d8)]++;while(this[_0x44b1b2(0x2d8)]<this[_0x44b1b2(0x116)][_0x44b1b2(0x286)]){if(this[_0x44b1b2(0x14f)]()['indent']===this[_0x44b1b2(0x240)]){if(this[_0x44b1b2(0x14f)]()[_0x44b1b2(0x27d)]===0x194&&this[_0x44b1b2(0xdf)]()!==0x66)break;else{if(this[_0x44b1b2(0x14f)]()['code']===0x66)this[_0x44b1b2(0x2a5)](_0x2e0080,this[_0x44b1b2(0x14f)](),_0x4913dd),this[_0x44b1b2(0x2d8)]-=0x2;else this[_0x44b1b2(0x14f)]()[_0x44b1b2(0x27d)]===0x192&&(this[_0x44b1b2(0x14f)]()[_0x44b1b2(0x2d0)][0x0]=_0x2e0080,_0x2e0080++);}}this['_index']++;}return this[_0x44b1b2(0x2d8)]=_0x4913dd,this[_0x44b1b2(0x14f)]()[_0x44b1b2(0x2d0)];},Game_Interpreter['prototype'][_0x45c442(0x2a5)]=function(_0x15f1a9,_0x2729fd,_0x1b2452){const _0x2c3768=_0x45c442;this[_0x2c3768(0x1aa)](_0x15f1a9,_0x2729fd,_0x1b2452),this[_0x2c3768(0x185)](_0x15f1a9,_0x2729fd,_0x1b2452),this[_0x2c3768(0x1f8)](_0x2729fd,_0x1b2452);},Game_Interpreter[_0x45c442(0x176)]['adjustShowChoiceDefault']=function(_0x1b6792,_0x1b7494,_0x22877b){const _0x2835b9=_0x45c442;if(_0x1b7494[_0x2835b9(0x2d0)][0x2]<0x0)return;const _0x31fde1=_0x1b7494[_0x2835b9(0x2d0)][0x2]+_0x1b6792;this[_0x2835b9(0x116)][_0x22877b][_0x2835b9(0x2d0)][0x2]=_0x31fde1;},Game_Interpreter['prototype'][_0x45c442(0x185)]=function(_0x5844e7,_0x12f555,_0x205596){const _0x53aaa9=_0x45c442;if(_0x12f555['parameters'][0x1]>=0x0){var _0x12164c=_0x12f555['parameters'][0x1]+_0x5844e7;this['_list'][_0x205596]['parameters'][0x1]=_0x12164c;}else _0x12f555[_0x53aaa9(0x2d0)][0x1]===-0x2&&(this[_0x53aaa9(0x116)][_0x205596][_0x53aaa9(0x2d0)][0x1]=_0x12f555[_0x53aaa9(0x2d0)][0x1]);},Game_Interpreter[_0x45c442(0x176)][_0x45c442(0x1f8)]=function(_0x2bf53e,_0x58d7fe){const _0xd97c65=_0x45c442;for(const _0x3ffe4d of _0x2bf53e[_0xd97c65(0x2d0)][0x0]){this[_0xd97c65(0x116)][_0x58d7fe][_0xd97c65(0x2d0)][0x0][_0xd97c65(0x2a2)](_0x3ffe4d);}this[_0xd97c65(0x116)][_0xd97c65(0x276)](this['_index']-0x1,0x2);};function Game_MessageCommonEvent(){const _0x1bfbed=_0x45c442;this[_0x1bfbed(0x2a6)](...arguments);}Game_MessageCommonEvent[_0x45c442(0x176)]['initialize']=function(_0x1e9693,_0x77a506){const _0x1f6b17=_0x45c442;this[_0x1f6b17(0x10d)]=_0x1e9693,this[_0x1f6b17(0x273)]=_0x77a506||0x0,this[_0x1f6b17(0x232)]();},Game_MessageCommonEvent[_0x45c442(0x176)][_0x45c442(0x1a6)]=function(){const _0x37ede3=_0x45c442;return $dataCommonEvents[this[_0x37ede3(0x10d)]];},Game_MessageCommonEvent[_0x45c442(0x176)][_0x45c442(0x2ce)]=function(){const _0x563875=_0x45c442;return this[_0x563875(0x1a6)]()[_0x563875(0x2ce)];},Game_MessageCommonEvent[_0x45c442(0x176)]['refresh']=function(){const _0x33c816=_0x45c442;this[_0x33c816(0x163)]=new Game_Interpreter(),this[_0x33c816(0x163)][_0x33c816(0x186)](this[_0x33c816(0x2ce)](),this[_0x33c816(0x273)]);},Game_MessageCommonEvent['prototype'][_0x45c442(0x1e0)]=function(){const _0x28f7b5=_0x45c442;this['_interpreter']&&(this['_interpreter'][_0x28f7b5(0x216)]()?this[_0x28f7b5(0x163)][_0x28f7b5(0x1e0)]():this[_0x28f7b5(0x22d)]());},Game_MessageCommonEvent[_0x45c442(0x176)]['clear']=function(){const _0x1ca79f=_0x45c442;this[_0x1ca79f(0x163)]=null;},Scene_Message[_0x45c442(0x176)]['messageWindowRect']=function(){const _0x4d8bd9=_0x45c442,_0x468499=Math[_0x4d8bd9(0x2d9)](Graphics[_0x4d8bd9(0x1ce)],$gameSystem[_0x4d8bd9(0xdc)]()),_0x138937=$gameSystem[_0x4d8bd9(0x12a)](),_0x2481d8=this[_0x4d8bd9(0x17d)](_0x138937,![]),_0x12be93=(Graphics[_0x4d8bd9(0x10f)]-_0x468499)/0x2,_0x1ce5e0=0x0;return new Rectangle(_0x12be93,_0x1ce5e0,_0x468499,_0x2481d8);},VisuMZ['MessageCore'][_0x45c442(0x1df)]=Scene_Options[_0x45c442(0x176)]['maxCommands'],Scene_Options['prototype'][_0x45c442(0x1c0)]=function(){const _0x1101af=_0x45c442;let _0x2d6e2e=VisuMZ[_0x1101af(0xe5)][_0x1101af(0x1df)][_0x1101af(0x211)](this);const _0x588440=VisuMZ['MessageCore'][_0x1101af(0x237)];if(_0x588440[_0x1101af(0xc4)][_0x1101af(0xe6)]&&_0x588440[_0x1101af(0xc4)][_0x1101af(0x129)])_0x2d6e2e++;return _0x2d6e2e;},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x2a4)]=Window_Base['prototype'][_0x45c442(0x2a6)],Window_Base[_0x45c442(0x176)][_0x45c442(0x2a6)]=function(_0x2ed1ba){const _0x4281f=_0x45c442;this['initMessageCore'](_0x2ed1ba),VisuMZ['MessageCore'][_0x4281f(0x2a4)]['call'](this,_0x2ed1ba);},Window_Base[_0x45c442(0x176)][_0x45c442(0x18f)]=function(_0x41248a){const _0x961a3a=_0x45c442;this['initTextAlignement'](),this[_0x961a3a(0x2b7)](),this[_0x961a3a(0x15d)](_0x41248a);},Window_Base[_0x45c442(0x176)][_0x45c442(0x262)]=function(){const _0x195397=_0x45c442;this['setTextAlignment'](_0x195397(0x16d));},Window_Base[_0x45c442(0x176)]['setTextAlignment']=function(_0x3483cf){this['_textAlignment']=_0x3483cf;},Window_Base[_0x45c442(0x176)][_0x45c442(0x2be)]=function(){return this['_textAlignment'];},VisuMZ['MessageCore'][_0x45c442(0xfe)]=Window_Base[_0x45c442(0x176)][_0x45c442(0x2c1)],Window_Base[_0x45c442(0x176)][_0x45c442(0x2c1)]=function(_0x1267db){const _0x462160=_0x45c442;return this['resetWordWrap'](),VisuMZ[_0x462160(0xe5)][_0x462160(0xfe)][_0x462160(0x211)](this,_0x1267db);},VisuMZ[_0x45c442(0xe5)]['Window_Base_processAllText']=Window_Base[_0x45c442(0x176)]['processAllText'],Window_Base[_0x45c442(0x176)][_0x45c442(0x23e)]=function(_0x2bb252){const _0x2023e4=_0x45c442;VisuMZ['MessageCore'][_0x2023e4(0x2ac)]['call'](this,_0x2bb252);if(_0x2bb252['drawing'])this[_0x2023e4(0x272)]('default');},Window_Base[_0x45c442(0x176)][_0x45c442(0x2b7)]=function(){this['setWordWrap'](![]);},Window_Base['prototype'][_0x45c442(0x205)]=function(){const _0x54c762=_0x45c442;return this[_0x54c762(0x167)];},Window_Base['prototype'][_0x45c442(0x29b)]=function(_0x14126c){const _0x41d280=_0x45c442;return this[_0x41d280(0x167)]=_0x14126c,'';},Window_Base['prototype'][_0x45c442(0x15d)]=function(_0x5e0e9e){const _0xb2a98b=_0x45c442;this[_0xb2a98b(0x1ee)]=JsonEx[_0xb2a98b(0x1da)](_0x5e0e9e);},Window_Base[_0x45c442(0x176)]['resetFontSettings']=function(){const _0xe89856=_0x45c442;this[_0xe89856(0x231)]['fontFace']=$gameSystem[_0xe89856(0x248)](),this[_0xe89856(0x231)]['fontSize']=$gameSystem['mainFontSize'](),this[_0xe89856(0x231)][_0xe89856(0x1d8)]=![],this[_0xe89856(0x231)]['fontItalic']=![],this[_0xe89856(0x155)]();},Window_Base['prototype'][_0x45c442(0x155)]=function(){const _0x3f77cc=_0x45c442;this[_0x3f77cc(0x23b)](ColorManager[_0x3f77cc(0x1fb)]()),this[_0x3f77cc(0x296)](ColorManager[_0x3f77cc(0x174)]());const _0xf7314c=VisuMZ['MessageCore']['Settings'][_0x3f77cc(0x13a)];_0xf7314c['DefaultOutlineWidth']===undefined&&(_0xf7314c['DefaultOutlineWidth']=0x3),this[_0x3f77cc(0x231)]['outlineWidth']=_0xf7314c[_0x3f77cc(0x145)],this[_0x3f77cc(0xfd)](![]);},Window_Base[_0x45c442(0x176)][_0x45c442(0xfd)]=function(_0x593dfa){const _0x3a749d=_0x45c442;this[_0x3a749d(0xd9)]=_0x593dfa;},Window_Base[_0x45c442(0x176)]['isColorLocked']=function(){const _0x1567c9=_0x45c442;return this[_0x1567c9(0xd9)];},Window_Base[_0x45c442(0x176)][_0x45c442(0x235)]=function(){return![];},Window_Base[_0x45c442(0x176)][_0x45c442(0x154)]=function(){const _0x50bf11=_0x45c442,_0xa6730a=[_0x50bf11(0x28b),_0x50bf11(0x234),'fontBold',_0x50bf11(0xf6),'textColor',_0x50bf11(0x14a),'outlineWidth',_0x50bf11(0x17a)];let _0x1d01c3={};for(const _0x41f1aa of _0xa6730a){_0x1d01c3[_0x41f1aa]=this[_0x50bf11(0x231)][_0x41f1aa];}return _0x1d01c3;},Window_Base[_0x45c442(0x176)]['returnPreservedFontSettings']=function(_0x43510e){const _0x5b0308=_0x45c442;for(const _0x269dd9 in _0x43510e){this[_0x5b0308(0x231)][_0x269dd9]=_0x43510e[_0x269dd9];}},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x2b2)]=Window_Base[_0x45c442(0x176)][_0x45c442(0x1e0)],Window_Base['prototype'][_0x45c442(0x1e0)]=function(){const _0x1f116b=_0x45c442;VisuMZ[_0x1f116b(0xe5)][_0x1f116b(0x2b2)]['call'](this),this[_0x1f116b(0x1b8)]();},Window_Base['prototype'][_0x45c442(0x14d)]=function(){return![];},Window_Base[_0x45c442(0x176)]['updateMove']=function(){const _0x215dcc=_0x45c442;this[_0x215dcc(0x2ca)]>0x0&&(this[_0x215dcc(0x14d)]()&&(this['x']=this[_0x215dcc(0x223)](this['x'],this[_0x215dcc(0x13c)]),this['y']=this[_0x215dcc(0x223)](this['y'],this[_0x215dcc(0x2b3)]),this[_0x215dcc(0x1ce)]=this['applyMoveEasing'](this[_0x215dcc(0x1ce)],this['_moveTargetWidth']),this[_0x215dcc(0x1b2)]=this['applyMoveEasing'](this['height'],this[_0x215dcc(0x1b3)]),this[_0x215dcc(0x227)]()),this[_0x215dcc(0x2ca)]--);},Window_Base[_0x45c442(0x176)][_0x45c442(0x227)]=function(_0x28ebce,_0x833b1){const _0x1e93e3=_0x45c442;!_0x28ebce&&(this[_0x1e93e3(0x1ce)]=Math[_0x1e93e3(0x2d9)](this[_0x1e93e3(0x1ce)],Graphics[_0x1e93e3(0x1ce)]),this[_0x1e93e3(0x1b2)]=Math[_0x1e93e3(0x2d9)](this['height'],Graphics[_0x1e93e3(0x1b2)]));if(!_0x833b1){const _0x28a254=-(Math['floor'](Graphics[_0x1e93e3(0x1ce)]-Graphics[_0x1e93e3(0x10f)])/0x2),_0x748aca=_0x28a254+Graphics[_0x1e93e3(0x1ce)]-this[_0x1e93e3(0x1ce)],_0x18f724=-(Math[_0x1e93e3(0x1ad)](Graphics[_0x1e93e3(0x1b2)]-Graphics[_0x1e93e3(0x2b8)])/0x2),_0x180ac7=_0x18f724+Graphics[_0x1e93e3(0x1b2)]-this[_0x1e93e3(0x1b2)];this['x']=this['x'][_0x1e93e3(0x1f4)](_0x28a254,_0x748aca),this['y']=this['y'][_0x1e93e3(0x1f4)](_0x18f724,_0x180ac7);}},Window_Base[_0x45c442(0x176)]['applyMoveEasing']=function(_0x41adb8,_0x32ba29){const _0x20024c=_0x45c442,_0x220368=this[_0x20024c(0x2ca)],_0x53f0b4=this['_wholeMoveDuration'],_0x3f5f72=this[_0x20024c(0x106)]((_0x53f0b4-_0x220368)/_0x53f0b4),_0x281a20=this['calcMoveEasing']((_0x53f0b4-_0x220368+0x1)/_0x53f0b4),_0x56e459=(_0x41adb8-_0x32ba29*_0x3f5f72)/(0x1-_0x3f5f72);return _0x56e459+(_0x32ba29-_0x56e459)*_0x281a20;},Window_Base[_0x45c442(0x176)]['calcMoveEasing']=function(_0x9854e6){const _0x5704f6=_0x45c442,_0x4a88a2=0x2;switch(this[_0x5704f6(0x246)]){case 0x0:return _0x9854e6;case 0x1:return this[_0x5704f6(0x24e)](_0x9854e6,_0x4a88a2);case 0x2:return this['easeOut'](_0x9854e6,_0x4a88a2);case 0x3:return this[_0x5704f6(0x12e)](_0x9854e6,_0x4a88a2);default:return Imported[_0x5704f6(0xc7)]?VisuMZ['applyMoveEasing'](_0x9854e6,this[_0x5704f6(0x246)]):_0x9854e6;}},Window_Base[_0x45c442(0x176)][_0x45c442(0x253)]=function(_0x2d1fde,_0x52aa6e,_0x20c1f5,_0x4500db,_0x54cf94,_0x6c8f99){const _0x34dc53=_0x45c442;this[_0x34dc53(0x13c)]=_0x2d1fde,this['_moveTargetY']=_0x52aa6e,this[_0x34dc53(0x298)]=_0x20c1f5||this['width'],this[_0x34dc53(0x1b3)]=_0x4500db||this[_0x34dc53(0x1b2)],this['_moveDuration']=_0x54cf94||0x1;if(this[_0x34dc53(0x2ca)]<=0x0)this['_moveDuration']=0x1;this[_0x34dc53(0x21d)]=this['_moveDuration'],this[_0x34dc53(0x246)]=_0x6c8f99||0x0;},Window_Base['prototype'][_0x45c442(0x291)]=function(_0x2e3907,_0x1854fd,_0x201df5,_0x59558b,_0x2165a4,_0x435a2f){const _0x3adfcd=_0x45c442;this[_0x3adfcd(0x13c)]=this['x']+_0x2e3907,this['_moveTargetY']=this['y']+_0x1854fd,this[_0x3adfcd(0x298)]=this[_0x3adfcd(0x1ce)]+(_0x201df5||0x0),this[_0x3adfcd(0x1b3)]=this['height']+(_0x59558b||0x0),this[_0x3adfcd(0x2ca)]=_0x2165a4||0x1;if(this['_moveDuration']<=0x0)this[_0x3adfcd(0x2ca)]=0x1;this[_0x3adfcd(0x21d)]=this[_0x3adfcd(0x2ca)],this['_moveEasingType']=_0x435a2f||0x0;},Window_Base[_0x45c442(0x176)][_0x45c442(0x28a)]=function(_0x44e213,_0x494769){const _0x425a16=_0x45c442;this[_0x425a16(0x253)](this[_0x425a16(0x1ee)]['x'],this[_0x425a16(0x1ee)]['y'],this[_0x425a16(0x1ee)]['width'],this[_0x425a16(0x1ee)][_0x425a16(0x1b2)],_0x44e213,_0x494769);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x26a)]=Window_Base[_0x45c442(0x176)][_0x45c442(0x23b)],Window_Base['prototype'][_0x45c442(0x23b)]=function(_0x2991d8){const _0x5813a2=_0x45c442;if(this[_0x5813a2(0x2b0)]())return;_0x2991d8=_0x2991d8['replace'](/\,/g,''),this[_0x5813a2(0x280)]=this[_0x5813a2(0x280)]||[],this[_0x5813a2(0x280)][_0x5813a2(0x1d1)](this[_0x5813a2(0x231)]['textColor']),VisuMZ[_0x5813a2(0xe5)][_0x5813a2(0x26a)]['call'](this,_0x2991d8);},Window_Base[_0x45c442(0x176)][_0x45c442(0x1c9)]=function(_0x34cc23){const _0x401991=_0x45c442;this['obtainEscapeParam'](_0x34cc23);if(this[_0x401991(0x2b0)]())return;_0x34cc23['drawing']&&(this['_textColorStack']=this[_0x401991(0x280)]||[],this['contents'][_0x401991(0x18c)]=this[_0x401991(0x280)][_0x401991(0x1c7)]()||ColorManager[_0x401991(0x1fb)]());},Window_Base[_0x45c442(0x176)][_0x45c442(0x270)]=function(_0x52b007){const _0x1f8396=_0x45c442;return _0x52b007=this[_0x1f8396(0x117)](_0x52b007),_0x52b007=this['convertBackslashCharacters'](_0x52b007),_0x52b007=this[_0x1f8396(0x141)](_0x52b007),_0x52b007=this[_0x1f8396(0x2cb)](_0x52b007),_0x52b007=this['convertShowChoiceEscapeCodes'](_0x52b007),_0x52b007=this[_0x1f8396(0x130)](_0x52b007),_0x52b007=this[_0x1f8396(0xde)](_0x52b007),_0x52b007=this[_0x1f8396(0x178)](_0x52b007),_0x52b007=this[_0x1f8396(0x292)](_0x52b007),_0x52b007=this[_0x1f8396(0x282)](_0x52b007),_0x52b007=this['convertMessageCoreEscapeReplacements'](_0x52b007),_0x52b007=this[_0x1f8396(0x108)](_0x52b007),_0x52b007=this[_0x1f8396(0x141)](_0x52b007),_0x52b007=this[_0x1f8396(0x28f)](_0x52b007),_0x52b007=this[_0x1f8396(0x1d4)](_0x52b007),_0x52b007;},Window_Base['prototype'][_0x45c442(0x117)]=function(_0x31d579){const _0x5bed55=_0x45c442;for(const _0xf84b73 of VisuMZ['MessageCore']['Settings'][_0x5bed55(0x283)]){_0x31d579[_0x5bed55(0x172)](_0xf84b73[_0x5bed55(0x1b4)])&&(_0x31d579=_0x31d579[_0x5bed55(0x2c0)](_0xf84b73[_0x5bed55(0x1b4)],_0xf84b73['textCodeResult'][_0x5bed55(0x179)](this)));}return _0x31d579;},Window_Base[_0x45c442(0x176)][_0x45c442(0x1c6)]=function(_0x33eef6){const _0x35732f=_0x45c442;return _0x33eef6=_0x33eef6[_0x35732f(0x2c0)](/\\/g,'\x1b'),_0x33eef6=_0x33eef6[_0x35732f(0x2c0)](/\x1b\x1b/g,'\x5c'),_0x33eef6;},Window_Base[_0x45c442(0x176)][_0x45c442(0x141)]=function(_0x1f1df2){const _0x107d98=_0x45c442;for(;;){if(_0x1f1df2[_0x107d98(0x172)](/\\V\[(\d+)\]/gi))_0x1f1df2=_0x1f1df2[_0x107d98(0x2c0)](/\\V\[(\d+)\]/gi,(_0x2eb2cf,_0x20702f)=>this[_0x107d98(0x1c6)](String($gameVariables[_0x107d98(0x254)](parseInt(_0x20702f)))));else{if(_0x1f1df2['match'](/\x1bV\[(\d+)\]/gi))_0x1f1df2=_0x1f1df2[_0x107d98(0x2c0)](/\x1bV\[(\d+)\]/gi,(_0x33a719,_0x28eb1f)=>this['convertBackslashCharacters'](String($gameVariables[_0x107d98(0x254)](parseInt(_0x28eb1f)))));else break;}}return _0x1f1df2;},Window_Base[_0x45c442(0x176)][_0x45c442(0x2cb)]=function(_0x2553a7){return this['registerActorNameAutoColorChanges'](),_0x2553a7;},Window_Base['prototype'][_0x45c442(0x108)]=function(_0x591aa1){return _0x591aa1;},Window_Base['prototype'][_0x45c442(0x182)]=function(_0x26d556){const _0x4b4d2f=_0x45c442;return _0x26d556=_0x26d556[_0x4b4d2f(0x2c0)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x26d556=_0x26d556['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x26d556=_0x26d556[_0x4b4d2f(0x2c0)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x26d556;},Window_Base[_0x45c442(0x176)]['convertFontSettingsEscapeCharacters']=function(_0x297199){const _0x384c80=_0x45c442;return _0x297199=_0x297199[_0x384c80(0x2c0)](/<B>/gi,_0x384c80(0x1b9)),_0x297199=_0x297199[_0x384c80(0x2c0)](/<\/B>/gi,'\x1bBOLD[0]'),_0x297199=_0x297199[_0x384c80(0x2c0)](/<I>/gi,_0x384c80(0x1b6)),_0x297199=_0x297199[_0x384c80(0x2c0)](/<\/I>/gi,_0x384c80(0x224)),_0x297199;},Window_Base[_0x45c442(0x176)]['convertTextAlignmentEscapeCharacters']=function(_0x540687){const _0x351f2e=_0x45c442;return _0x540687=_0x540687[_0x351f2e(0x2c0)](/<LEFT>/gi,_0x351f2e(0x10c)),_0x540687=_0x540687[_0x351f2e(0x2c0)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x540687=_0x540687[_0x351f2e(0x2c0)](/<CENTER>/gi,_0x351f2e(0x149)),_0x540687=_0x540687[_0x351f2e(0x2c0)](/<\/CENTER>/gi,_0x351f2e(0x28d)),_0x540687=_0x540687[_0x351f2e(0x2c0)](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x540687=_0x540687['replace'](/<\/RIGHT>/gi,_0x351f2e(0x28d)),_0x540687;},Window_Base['prototype']['convertLockColorsEscapeCharacters']=function(_0x441720){const _0x569bcc=_0x45c442;return _0x441720=_0x441720[_0x569bcc(0x2c0)](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x441720=_0x441720[_0x569bcc(0x2c0)](/<\/COLORLOCK>/gi,_0x569bcc(0x252)),_0x441720=_0x441720[_0x569bcc(0x2c0)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x441720=_0x441720[_0x569bcc(0x2c0)](/\)\)\)/gi,_0x569bcc(0x252)),_0x441720;},Window_Base['prototype']['convertBaseEscapeCharacters']=function(_0x5a689e){const _0xee268c=_0x45c442;return _0x5a689e=_0x5a689e[_0xee268c(0x2c0)](/\x1bN\[(\d+)\]/gi,(_0x497d82,_0x328028)=>this[_0xee268c(0xf5)](parseInt(_0x328028))),_0x5a689e=_0x5a689e['replace'](/\x1bP\[(\d+)\]/gi,(_0x4e9e26,_0x31f725)=>this[_0xee268c(0x229)](parseInt(_0x31f725))),_0x5a689e=_0x5a689e['replace'](/\x1bG/gi,TextManager['currencyUnit']),_0x5a689e;},Window_Base[_0x45c442(0x176)][_0x45c442(0x282)]=function(_0x136c38){const _0x59116c=_0x45c442;for(const _0x55f822 of VisuMZ[_0x59116c(0xe5)][_0x59116c(0x237)]['TextCodeActions']){_0x136c38[_0x59116c(0x172)](_0x55f822[_0x59116c(0x1b4)])&&(_0x136c38=_0x136c38['replace'](_0x55f822[_0x59116c(0x1b4)],_0x55f822[_0x59116c(0x169)]),_0x136c38=this[_0x59116c(0x141)](_0x136c38));}return _0x136c38;},Window_Base['prototype']['convertMessageCoreEscapeReplacements']=function(_0x309496){const _0x32f763=_0x45c442;for(const _0x37fa0b of VisuMZ['MessageCore'][_0x32f763(0x237)][_0x32f763(0x238)]){_0x309496[_0x32f763(0x172)](_0x37fa0b[_0x32f763(0x1b4)])&&(_0x309496=_0x309496[_0x32f763(0x2c0)](_0x37fa0b['textCodeCheck'],_0x37fa0b[_0x32f763(0x169)]['bind'](this)),_0x309496=this[_0x32f763(0x141)](_0x309496));}return _0x309496;},Window_Base[_0x45c442(0x176)][_0x45c442(0xf5)]=function(_0x49c5ad){const _0x317c88=_0x45c442,_0x271dd2=_0x49c5ad>=0x1?$gameActors[_0x317c88(0x161)](_0x49c5ad):null,_0x473207=_0x271dd2?_0x271dd2[_0x317c88(0x2ae)]():'',_0x3c7a1b=Number(VisuMZ[_0x317c88(0xe5)][_0x317c88(0x237)][_0x317c88(0x26c)][_0x317c88(0x293)]);return this[_0x317c88(0x235)]()&&_0x3c7a1b!==0x0?_0x317c88(0x278)[_0x317c88(0x228)](_0x3c7a1b,_0x473207):_0x473207;},Window_Base['prototype']['partyMemberName']=function(_0x37734e){const _0x3e0525=_0x45c442,_0x3c8fdf=_0x37734e>=0x1?$gameParty[_0x3e0525(0x107)]()[_0x37734e-0x1]:null,_0x3ca31e=_0x3c8fdf?_0x3c8fdf['name']():'',_0xe7bddc=Number(VisuMZ[_0x3e0525(0xe5)][_0x3e0525(0x237)]['AutoColor'][_0x3e0525(0x293)]);return this[_0x3e0525(0x235)]()&&_0xe7bddc!==0x0?_0x3e0525(0x278)[_0x3e0525(0x228)](_0xe7bddc,_0x3ca31e):_0x3ca31e;},Window_Base['prototype'][_0x45c442(0x28f)]=function(_0x293e6c){const _0x21fb9f=_0x45c442;return this[_0x21fb9f(0x235)]()&&(_0x293e6c=this[_0x21fb9f(0x184)](_0x293e6c),_0x293e6c=this[_0x21fb9f(0x22a)](_0x293e6c)),_0x293e6c;},Window_Base['prototype'][_0x45c442(0x184)]=function(_0x10a924){const _0x277f68=_0x45c442;for(autoColor of VisuMZ[_0x277f68(0xe5)]['AutoColorRegExp']){_0x10a924=_0x10a924[_0x277f68(0x2c0)](autoColor[0x0],autoColor[0x1]);}return _0x10a924;},Window_Base[_0x45c442(0x176)][_0x45c442(0x23d)]=function(){const _0x11f689=_0x45c442;this[_0x11f689(0x2b6)]=[];},Window_Base[_0x45c442(0x176)][_0x45c442(0x20c)]=function(){const _0x415dda=_0x45c442;this[_0x415dda(0x23d)]();const _0x5be705=VisuMZ[_0x415dda(0xe5)][_0x415dda(0x237)][_0x415dda(0x26c)],_0x242703=_0x5be705[_0x415dda(0x293)];if(_0x242703<=0x0)return;for(const _0x244b57 of $gameActors[_0x415dda(0x2c6)]){if(!_0x244b57)continue;const _0x4058c9=_0x244b57[_0x415dda(0x2ae)]();if(_0x4058c9[_0x415dda(0x1e4)]()[_0x415dda(0x286)]<=0x0)continue;if(/^\d+$/[_0x415dda(0x210)](_0x4058c9))continue;if(_0x4058c9[_0x415dda(0x172)](/-----/i))continue;let _0x521dd6=VisuMZ['MessageCore'][_0x415dda(0x2c4)](_0x4058c9);const _0x205607=new RegExp('\x5cb'+_0x521dd6+'\x5cb','g'),_0x4bd44e=_0x415dda(0x278)['format'](_0x242703,_0x4058c9);this[_0x415dda(0x2b6)][_0x415dda(0x2a2)]([_0x205607,_0x4bd44e]);}},Window_Base[_0x45c442(0x176)]['processActorNameAutoColorChanges']=function(_0x1c4d12){const _0x2b0df7=_0x45c442;this[_0x2b0df7(0x2b6)]===undefined&&this[_0x2b0df7(0x20c)]();for(autoColor of this[_0x2b0df7(0x2b6)]){_0x1c4d12=_0x1c4d12[_0x2b0df7(0x2c0)](autoColor[0x0],autoColor[0x1]);}return _0x1c4d12;},Window_Base[_0x45c442(0x176)][_0x45c442(0x15b)]=function(_0x2c1243,_0x560c2b,_0x24250c){const _0x22e77a=_0x45c442;if(!_0x2c1243)return'';const _0xc9e6b4=_0x2c1243[_0x560c2b];let _0x685641='';if(_0xc9e6b4&&_0x24250c&&_0xc9e6b4['iconIndex']){const _0x3c523b=_0x22e77a(0xff);_0x685641=_0x3c523b['format'](_0xc9e6b4['iconIndex'],_0xc9e6b4['name']);}else _0xc9e6b4?_0x685641=_0xc9e6b4['name']:_0x685641='';return this[_0x22e77a(0x235)]()&&(_0x685641=this['applyDatabaseAutoColor'](_0x685641,_0x2c1243)),_0x685641;},Window_Base[_0x45c442(0x176)][_0x45c442(0x217)]=function(_0x10908a){const _0x27a755=_0x45c442,_0x2ea6b8=$gameParty[_0x27a755(0x1a9)]();if(_0x2ea6b8['id']<0x0)return'';let _0x2b2da1=null;if(_0x2ea6b8[_0x27a755(0xdb)]===0x0)_0x2b2da1=$dataItems[_0x2ea6b8['id']];if(_0x2ea6b8[_0x27a755(0xdb)]===0x1)_0x2b2da1=$dataWeapons[_0x2ea6b8['id']];if(_0x2ea6b8[_0x27a755(0xdb)]===0x2)_0x2b2da1=$dataArmors[_0x2ea6b8['id']];if(!_0x2b2da1)return'';return _0x10908a?_0x27a755(0xff)[_0x27a755(0x228)](_0x2b2da1[_0x27a755(0x204)],_0x2b2da1[_0x27a755(0x2ae)]):_0x2b2da1['name'];},Window_Base['prototype']['lastGainedObjectQuantity']=function(){const _0xb8bce1=_0x45c442,_0x4f7a98=$gameParty['getLastGainedItemData']();if(_0x4f7a98['id']<=0x0)return'';return _0x4f7a98[_0xb8bce1(0x10e)];},Window_Base[_0x45c442(0x176)][_0x45c442(0x2cd)]=function(_0xd5f20,_0x39c00a){const _0x2549dd=_0x45c442,_0x47dc1d=VisuMZ[_0x2549dd(0xe5)][_0x2549dd(0x237)][_0x2549dd(0x26c)];let _0x7f0571=0x0;if(_0x39c00a===$dataActors)_0x7f0571=_0x47dc1d['Actors'];if(_0x39c00a===$dataClasses)_0x7f0571=_0x47dc1d['Classes'];if(_0x39c00a===$dataSkills)_0x7f0571=_0x47dc1d[_0x2549dd(0x25b)];if(_0x39c00a===$dataItems)_0x7f0571=_0x47dc1d[_0x2549dd(0x1f9)];if(_0x39c00a===$dataWeapons)_0x7f0571=_0x47dc1d[_0x2549dd(0xc9)];if(_0x39c00a===$dataArmors)_0x7f0571=_0x47dc1d[_0x2549dd(0x1b5)];if(_0x39c00a===$dataEnemies)_0x7f0571=_0x47dc1d[_0x2549dd(0x29c)];if(_0x39c00a===$dataStates)_0x7f0571=_0x47dc1d['States'];return _0x7f0571>0x0&&(_0xd5f20='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x7f0571,_0xd5f20)),_0xd5f20;},Window_Base[_0x45c442(0x176)][_0x45c442(0x1d4)]=function(_0x34be41){const _0x413292=_0x45c442;_0x34be41=_0x34be41[_0x413292(0x2c0)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x523a9a,_0x311089)=>this[_0x413292(0x29b)](!![])),_0x34be41=_0x34be41[_0x413292(0x2c0)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x1c74cc,_0x32d122)=>this[_0x413292(0x29b)](![])),_0x34be41=_0x34be41[_0x413292(0x2c0)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x32c98a,_0x774e10)=>this[_0x413292(0x29b)](![]));if(_0x34be41['match'](Window_Message['_autoSizeRegexp']))this[_0x413292(0x29b)](![]);else _0x34be41[_0x413292(0x172)](Window_Message[_0x413292(0x25e)])&&this[_0x413292(0x29b)](![]);if(!this[_0x413292(0x205)]())return _0x34be41;if(_0x34be41[_0x413292(0x286)]<=0x0)return _0x34be41;return VisuMZ[_0x413292(0xe5)]['Settings'][_0x413292(0x1fc)][_0x413292(0x194)]?(_0x34be41=_0x34be41[_0x413292(0x2c0)](/[\n\r]+/g,'\x20'),_0x34be41=_0x34be41[_0x413292(0x2c0)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x34be41=_0x34be41[_0x413292(0x2c0)](/[\n\r]+/g,''),_0x34be41=_0x34be41[_0x413292(0x2c0)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x34be41=this[_0x413292(0x18e)](_0x34be41),_0x34be41=_0x34be41[_0x413292(0x2ba)]('\x20')[_0x413292(0x18a)](_0x413292(0x25a)),_0x34be41=_0x34be41[_0x413292(0x2c0)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x34be41=_0x34be41[_0x413292(0x2c0)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x34be41;},Window_Base[_0x45c442(0x176)]['addWrapBreakAfterPunctuation']=function(_0x37a80b){return _0x37a80b;},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x203)]=Window_Base[_0x45c442(0x176)]['processNewLine'],Window_Base[_0x45c442(0x176)][_0x45c442(0x2bd)]=function(_0x544cf6){const _0x3e78cd=_0x45c442;VisuMZ[_0x3e78cd(0xe5)][_0x3e78cd(0x203)][_0x3e78cd(0x211)](this,_0x544cf6),this[_0x3e78cd(0x115)](_0x544cf6);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x23c)]=Window_Base['prototype']['processControlCharacter'],Window_Base[_0x45c442(0x176)][_0x45c442(0x226)]=function(_0x1e40e7,_0x115292){const _0x43178d=_0x45c442;VisuMZ[_0x43178d(0xe5)][_0x43178d(0x23c)]['call'](this,_0x1e40e7,_0x115292),_0x115292===_0x43178d(0x25a)&&this[_0x43178d(0x279)](_0x1e40e7);},Window_Base[_0x45c442(0x176)][_0x45c442(0xf0)]=function(_0x11787b){const _0x2b74cf=_0x45c442;var _0x564c67=/^\<(.*?)\>/['exec'](_0x11787b[_0x2b74cf(0x19f)][_0x2b74cf(0x221)](_0x11787b[_0x2b74cf(0x13e)]));return _0x564c67?(_0x11787b[_0x2b74cf(0x13e)]+=_0x564c67[0x0][_0x2b74cf(0x286)],String(_0x564c67[0x0][_0x2b74cf(0x221)](0x1,_0x564c67[0x0][_0x2b74cf(0x286)]-0x1))):'';},VisuMZ['MessageCore'][_0x45c442(0x175)]=Window_Base[_0x45c442(0x176)]['processEscapeCharacter'],Window_Base[_0x45c442(0x176)]['processEscapeCharacter']=function(_0x440a7d,_0x5e5c6d){const _0x15756a=_0x45c442;switch(_0x440a7d){case'C':_0x5e5c6d['drawing']?VisuMZ[_0x15756a(0xe5)]['Window_Base_processEscapeCharacter'][_0x15756a(0x211)](this,_0x440a7d,_0x5e5c6d):this[_0x15756a(0x147)](_0x5e5c6d);break;case'I':case'{':case'}':VisuMZ[_0x15756a(0xe5)][_0x15756a(0x175)][_0x15756a(0x211)](this,_0x440a7d,_0x5e5c6d);break;case'FS':this[_0x15756a(0x21b)](_0x5e5c6d);break;case'PX':this['processPxTextCode'](_0x5e5c6d);break;case'PY':this[_0x15756a(0x171)](_0x5e5c6d);break;case'BOLD':this[_0x15756a(0x16e)](this[_0x15756a(0x147)](_0x5e5c6d));break;case'CENTERPICTURE':this[_0x15756a(0x290)](_0x5e5c6d);break;case _0x15756a(0xd5):this[_0x15756a(0x24f)](_0x5e5c6d);break;case _0x15756a(0x2b5):this['processCommonEvent'](_0x5e5c6d);break;case'ITALIC':this[_0x15756a(0x233)](this[_0x15756a(0x147)](_0x5e5c6d));break;case _0x15756a(0x15a):this[_0x15756a(0x13b)](_0x5e5c6d);break;case'PREVCOLOR':this['processPreviousColor'](_0x5e5c6d);break;case'TEXTALIGNMENT':this[_0x15756a(0x1f7)](_0x5e5c6d);break;case _0x15756a(0x1ca):this['processCustomWait'](_0x5e5c6d);break;case _0x15756a(0x1b0):this[_0x15756a(0x279)](_0x5e5c6d);break;default:this[_0x15756a(0x1dd)](_0x440a7d,_0x5e5c6d);}},Window_Base[_0x45c442(0x176)][_0x45c442(0x1dd)]=function(_0x134423,_0x58ef1d){const _0xb596dc=_0x45c442;for(const _0x4320c8 of VisuMZ[_0xb596dc(0xe5)][_0xb596dc(0x237)][_0xb596dc(0x27b)]){if(_0x4320c8[_0xb596dc(0xcc)]===_0x134423){if(_0x4320c8['Type']==='')this['obtainEscapeParam'](_0x58ef1d);_0x4320c8[_0xb596dc(0x1c8)][_0xb596dc(0x211)](this,_0x58ef1d);if(this[_0xb596dc(0x101)]===Window_Message){const _0x146e6=_0x4320c8[_0xb596dc(0x258)]||0x0;if(_0x146e6>0x0)this['launchMessageCommonEvent'](_0x146e6);}}}},Window_Base[_0x45c442(0x176)][_0x45c442(0xc6)]=function(){const _0x531f22=_0x45c442;this[_0x531f22(0x231)]['fontSize']+=VisuMZ[_0x531f22(0xe5)][_0x531f22(0x237)][_0x531f22(0x13a)][_0x531f22(0x2bc)],this[_0x531f22(0x231)][_0x531f22(0x234)]=Math[_0x531f22(0x2d9)](this[_0x531f22(0x231)]['fontSize'],VisuMZ[_0x531f22(0xe5)][_0x531f22(0x237)]['General'][_0x531f22(0x19d)]);},Window_Base['prototype'][_0x45c442(0x2d2)]=function(){const _0x2e27b1=_0x45c442;this[_0x2e27b1(0x231)]['fontSize']-=VisuMZ['MessageCore'][_0x2e27b1(0x237)][_0x2e27b1(0x13a)][_0x2e27b1(0x2bc)],this['contents'][_0x2e27b1(0x234)]=Math[_0x2e27b1(0x257)](this[_0x2e27b1(0x231)][_0x2e27b1(0x234)],VisuMZ['MessageCore'][_0x2e27b1(0x237)][_0x2e27b1(0x13a)][_0x2e27b1(0xd7)]);},Window_Base[_0x45c442(0x176)][_0x45c442(0x21b)]=function(_0x388c45){const _0x5060c6=_0x45c442,_0x30ca03=this[_0x5060c6(0x147)](_0x388c45);this['contents'][_0x5060c6(0x234)]=_0x30ca03['clamp'](VisuMZ['MessageCore']['Settings'][_0x5060c6(0x13a)][_0x5060c6(0xd7)],VisuMZ[_0x5060c6(0xe5)][_0x5060c6(0x237)][_0x5060c6(0x13a)][_0x5060c6(0x19d)]);},Window_Base['prototype'][_0x45c442(0x207)]=function(_0x38931b){const _0x3eea1b=_0x45c442;let _0x8ded6c=this[_0x3eea1b(0x231)][_0x3eea1b(0x234)];const _0x490fcc=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x12d4d0=_0x490fcc[_0x3eea1b(0x160)](_0x38931b);if(!_0x12d4d0)break;const _0x2ae0b1=String(_0x12d4d0[0x1])[_0x3eea1b(0x1ba)]();if(_0x2ae0b1==='{')this['makeFontBigger']();else{if(_0x2ae0b1==='}')this[_0x3eea1b(0x2d2)]();else _0x2ae0b1==='FS'&&(this[_0x3eea1b(0x231)]['fontSize']=parseInt(_0x12d4d0[0x3])['clamp'](VisuMZ[_0x3eea1b(0xe5)][_0x3eea1b(0x237)][_0x3eea1b(0x13a)][_0x3eea1b(0xd7)],VisuMZ[_0x3eea1b(0xe5)][_0x3eea1b(0x237)][_0x3eea1b(0x13a)]['FontBiggerCap']));}this[_0x3eea1b(0x231)][_0x3eea1b(0x234)]>_0x8ded6c&&(_0x8ded6c=this[_0x3eea1b(0x231)][_0x3eea1b(0x234)]);}return _0x8ded6c;},Window_Base[_0x45c442(0x176)]['processPxTextCode']=function(_0x2615d2){const _0x4198bc=_0x45c442;_0x2615d2['x']=this[_0x4198bc(0x147)](_0x2615d2),VisuMZ[_0x4198bc(0xe5)][_0x4198bc(0x237)][_0x4198bc(0x13a)][_0x4198bc(0x1ff)]&&(_0x2615d2['x']+=_0x2615d2[_0x4198bc(0x2a0)]);},Window_Base['prototype'][_0x45c442(0x171)]=function(_0x31898e){const _0x169ab6=_0x45c442;_0x31898e['y']=this['obtainEscapeParam'](_0x31898e),VisuMZ[_0x169ab6(0xe5)][_0x169ab6(0x237)]['General'][_0x169ab6(0x1ff)]&&(_0x31898e['y']+=_0x31898e[_0x169ab6(0x1f2)]);},Window_Base['prototype'][_0x45c442(0x16e)]=function(_0x5eb9f6){const _0x27acd3=_0x45c442;this[_0x27acd3(0x231)][_0x27acd3(0x1d8)]=!!_0x5eb9f6;},Window_Base[_0x45c442(0x176)][_0x45c442(0x233)]=function(_0x142b8d){const _0x4107ad=_0x45c442;this[_0x4107ad(0x231)][_0x4107ad(0xf6)]=!!_0x142b8d;},Window_Base[_0x45c442(0x176)][_0x45c442(0x1f7)]=function(_0xbd9374){const _0x2a67c3=_0x45c442,_0x48b846=this[_0x2a67c3(0x147)](_0xbd9374);if(!_0xbd9374['drawing'])return;switch(_0x48b846){case 0x0:this[_0x2a67c3(0x272)](_0x2a67c3(0x16d));return;case 0x1:this[_0x2a67c3(0x272)]('left');break;case 0x2:this['setTextAlignment'](_0x2a67c3(0x222));break;case 0x3:this[_0x2a67c3(0x272)](_0x2a67c3(0xfa));break;}this['processTextAlignmentX'](_0xbd9374);},Window_Base[_0x45c442(0x176)][_0x45c442(0x115)]=function(_0x1bab71){const _0x807042=_0x45c442;if(!_0x1bab71[_0x807042(0x180)])return;if(_0x1bab71[_0x807042(0x2c7)])return;if(this[_0x807042(0x2be)]()===_0x807042(0x16d))return;let _0x3535da=_0x1bab71[_0x807042(0x19f)][_0x807042(0x187)]('\x1bTEXTALIGNMENT',_0x1bab71[_0x807042(0x13e)]+0x1),_0x16d64a=_0x1bab71[_0x807042(0x19f)][_0x807042(0x187)]('\x0a',_0x1bab71['index']+0x1);if(_0x3535da<0x0)_0x3535da=_0x1bab71[_0x807042(0x19f)]['length']+0x1;if(_0x16d64a>0x0)_0x3535da=Math['min'](_0x3535da,_0x16d64a);const _0x53d520=_0x1bab71['text'][_0x807042(0x1eb)](_0x1bab71[_0x807042(0x13e)],_0x3535da),_0x34eb6a=this[_0x807042(0x1bd)](_0x53d520)['width'],_0x2dee24=_0x1bab71[_0x807042(0x1ce)]||this[_0x807042(0x24b)],_0x92963d=this[_0x807042(0x101)]===Window_Message&&$gameMessage[_0x807042(0x119)]()!=='';switch(this[_0x807042(0x2be)]()){case _0x807042(0x164):_0x1bab71['x']=_0x1bab71[_0x807042(0x2a0)];break;case'center':_0x1bab71['x']=_0x1bab71[_0x807042(0x2a0)],_0x1bab71['x']+=Math[_0x807042(0x1ad)]((_0x2dee24-_0x34eb6a)/0x2);_0x92963d&&(_0x1bab71['x']-=_0x1bab71[_0x807042(0x2a0)]/0x2);break;case _0x807042(0xfa):_0x1bab71['x']=_0x2dee24-_0x34eb6a+_0x1bab71['startX'];_0x92963d&&(_0x1bab71['x']-=_0x1bab71[_0x807042(0x2a0)]);break;}},Window_Base[_0x45c442(0x176)][_0x45c442(0x1bd)]=function(_0x426a16){const _0x286408=_0x45c442;_0x426a16=_0x426a16[_0x286408(0x2c0)](/\x1b!/g,''),_0x426a16=_0x426a16[_0x286408(0x2c0)](/\x1b\|/g,''),_0x426a16=_0x426a16[_0x286408(0x2c0)](/\x1b\./g,'');const _0xb720cf=this[_0x286408(0x153)](_0x426a16,0x0,0x0,0x0),_0x2f67bd=this[_0x286408(0x154)]();return _0xb720cf[_0x286408(0x180)]=![],this[_0x286408(0x23e)](_0xb720cf),this[_0x286408(0x159)](_0x2f67bd),{'width':_0xb720cf[_0x286408(0x1e3)],'height':_0xb720cf[_0x286408(0x189)]};},Window_Base['prototype'][_0x45c442(0x279)]=function(_0x2e1897){const _0x9239e4=_0x45c442,_0xd4bf11=(_0x2e1897[_0x9239e4(0x2c7)]?-0x1:0x1)*this[_0x9239e4(0x124)]('\x20');_0x2e1897['x']+=_0xd4bf11;if(this[_0x9239e4(0x147)](_0x2e1897)>0x0)_0x2e1897['x']+=_0xd4bf11;if(_0x2e1897[_0x9239e4(0x2c7)])return;let _0x3d9c31=_0x2e1897[_0x9239e4(0x19f)][_0x9239e4(0x187)](_0x9239e4(0x25a),_0x2e1897[_0x9239e4(0x13e)]+0x1),_0x1e6cd9=_0x2e1897['text'][_0x9239e4(0x187)]('\x0a',_0x2e1897[_0x9239e4(0x13e)]+0x1);if(_0x3d9c31<0x0)_0x3d9c31=_0x2e1897[_0x9239e4(0x19f)][_0x9239e4(0x286)]+0x1;if(_0x1e6cd9>0x0)_0x3d9c31=Math['min'](_0x3d9c31,_0x1e6cd9);const _0x30524e=_0x2e1897[_0x9239e4(0x19f)]['substring'](_0x2e1897['index'],_0x3d9c31),_0x366e14=this['textSizeExWordWrap'](_0x30524e)[_0x9239e4(0x1ce)];let _0xf0c975=_0x2e1897[_0x9239e4(0x1ce)]||this['innerWidth'];if(this[_0x9239e4(0x101)]===Window_Message){const _0x2bd903=$gameMessage['faceName']()===''?0x0:ImageManager[_0x9239e4(0x255)]+0x14;_0xf0c975-=_0x2bd903,VisuMZ[_0x9239e4(0xe5)][_0x9239e4(0x237)][_0x9239e4(0x1fc)][_0x9239e4(0x1dc)]&&(_0xf0c975-=_0x2bd903);}let _0x49508c=![];if(_0x2e1897['x']+_0x366e14>_0x2e1897[_0x9239e4(0x2a0)]+_0xf0c975)_0x49508c=!![];if(_0x366e14===0x0)_0x49508c=!![];_0x49508c&&(_0x2e1897['text']=_0x2e1897['text'][_0x9239e4(0x221)](0x0,_0x2e1897[_0x9239e4(0x13e)])+'\x0a'+_0x2e1897[_0x9239e4(0x19f)]['substr'](_0x2e1897[_0x9239e4(0x13e)]));},Window_Base[_0x45c442(0x176)][_0x45c442(0x105)]=function(_0x3fe80d){const _0x5da5fe=_0x45c442,_0x570ef7=this[_0x5da5fe(0x153)](_0x3fe80d,0x0,0x0,0x0),_0x19629d=this['getPreservedFontSettings']();return _0x570ef7[_0x5da5fe(0x180)]=![],this['setWordWrap'](![]),this[_0x5da5fe(0x23e)](_0x570ef7),this[_0x5da5fe(0x29b)](!![]),this[_0x5da5fe(0x159)](_0x19629d),{'width':_0x570ef7[_0x5da5fe(0x1e3)],'height':_0x570ef7[_0x5da5fe(0x189)]};},Window_Base[_0x45c442(0x176)][_0x45c442(0x110)]=function(_0x4d1df2){const _0x72dd19=_0x45c442;return this[_0x72dd19(0x147)](_0x4d1df2);},Window_Base['prototype'][_0x45c442(0x13b)]=function(_0x37884d){const _0x1cb80e=_0x45c442,_0x48126a=this[_0x1cb80e(0xf0)](_0x37884d)[_0x1cb80e(0x2ba)](',');if(!_0x37884d[_0x1cb80e(0x180)])return;const _0x2c4fd9=_0x48126a[0x0][_0x1cb80e(0x1e4)](),_0x415e29=_0x48126a[0x1]||0x0,_0x134311=_0x48126a[0x2]||0x0,_0x310b46=ImageManager[_0x1cb80e(0x1de)](_0x2c4fd9),_0x3a5d94=this[_0x1cb80e(0x231)][_0x1cb80e(0x17a)];_0x310b46[_0x1cb80e(0x219)](this[_0x1cb80e(0x1a3)][_0x1cb80e(0x179)](this,_0x310b46,_0x37884d['x'],_0x37884d['y'],_0x415e29,_0x134311,_0x3a5d94));},Window_Base[_0x45c442(0x176)][_0x45c442(0x1a3)]=function(_0x1a860c,_0x20bb0f,_0x48c590,_0x1d7d95,_0x47ec67,_0x1468d5){const _0x4c84a5=_0x45c442;_0x1d7d95=_0x1d7d95||_0x1a860c[_0x4c84a5(0x1ce)],_0x47ec67=_0x47ec67||_0x1a860c['height'],this[_0x4c84a5(0x1ef)][_0x4c84a5(0x17a)]=_0x1468d5,this[_0x4c84a5(0x1ef)]['blt'](_0x1a860c,0x0,0x0,_0x1a860c[_0x4c84a5(0x1ce)],_0x1a860c[_0x4c84a5(0x1b2)],_0x20bb0f,_0x48c590,_0x1d7d95,_0x47ec67),this['contentsBack']['paintOpacity']=0xff;},Window_Base['prototype']['processDrawCenteredPicture']=function(_0x37a881){const _0x458486=_0x45c442,_0x4649c3=this['obtainEscapeString'](_0x37a881)[_0x458486(0x2ba)](',');if(!_0x37a881[_0x458486(0x180)])return;const _0xf4ac4f=_0x4649c3[0x0][_0x458486(0x1e4)](),_0x46ca93=ImageManager[_0x458486(0x1de)](_0xf4ac4f),_0x681c89=JsonEx[_0x458486(0x1da)](_0x37a881),_0x52ec11=this[_0x458486(0x231)]['paintOpacity'];_0x46ca93[_0x458486(0x219)](this[_0x458486(0x23f)][_0x458486(0x179)](this,_0x46ca93,_0x681c89,_0x52ec11));},Window_Base[_0x45c442(0x176)][_0x45c442(0x23f)]=function(_0x58a58a,_0xb6641e,_0x442795){const _0x59a0eb=_0x45c442,_0x36c0cc=_0xb6641e[_0x59a0eb(0x1ce)]||this['innerWidth'],_0xda0a1f=this[_0x59a0eb(0x2d8)]!==undefined?this[_0x59a0eb(0x1fd)]():this[_0x59a0eb(0x111)],_0x31168d=_0x36c0cc/_0x58a58a[_0x59a0eb(0x1ce)],_0x188623=_0xda0a1f/_0x58a58a[_0x59a0eb(0x1b2)],_0x255565=Math[_0x59a0eb(0x2d9)](_0x31168d,_0x188623,0x1),_0x39370a=this['_index']!==undefined?(this[_0x59a0eb(0x263)](0x0)[_0x59a0eb(0x1b2)]-this['lineHeight']())/0x2:0x0,_0x1fd19f=_0x58a58a['width']*_0x255565,_0x5db6bf=_0x58a58a[_0x59a0eb(0x1b2)]*_0x255565,_0x276855=Math['floor']((_0x36c0cc-_0x1fd19f)/0x2)+_0xb6641e[_0x59a0eb(0x2a0)],_0x5bfd72=Math[_0x59a0eb(0x1ad)]((_0xda0a1f-_0x5db6bf)/0x2)+_0xb6641e[_0x59a0eb(0x1f2)]-_0x39370a*0x2;this[_0x59a0eb(0x1ef)]['paintOpacity']=_0x442795,this[_0x59a0eb(0x1ef)][_0x59a0eb(0x297)](_0x58a58a,0x0,0x0,_0x58a58a[_0x59a0eb(0x1ce)],_0x58a58a[_0x59a0eb(0x1b2)],_0x276855,_0x5bfd72,_0x1fd19f,_0x5db6bf),this[_0x59a0eb(0x1ef)]['paintOpacity']=0xff;},Window_Base[_0x45c442(0x176)][_0x45c442(0x24f)]=function(_0x3428fa){const _0x5b59f4=_0x45c442,_0x4ced80=this['obtainEscapeParam'](_0x3428fa);if(_0x3428fa[_0x5b59f4(0x180)])this[_0x5b59f4(0xfd)](_0x4ced80>0x0);},Window_Base[_0x45c442(0x176)][_0x45c442(0xd8)]=function(_0x502588){const _0x119814=_0x45c442,_0x2bf7c9=this['obtainEscapeParam'](_0x502588);this[_0x119814(0x101)]===Window_Message&&_0x502588['drawing']&&this[_0x119814(0x2a9)](_0x2bf7c9);},Window_Help[_0x45c442(0x176)][_0x45c442(0x2b7)]=function(){const _0x540dcb=_0x45c442;this[_0x540dcb(0x29b)]($gameSystem[_0x540dcb(0x243)]());},Window_Help['prototype'][_0x45c442(0x235)]=function(){return!![];},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x181)]=Window_Help[_0x45c442(0x176)][_0x45c442(0x232)],Window_Help['prototype'][_0x45c442(0x232)]=function(){const _0x27407a=_0x45c442;this[_0x27407a(0x23d)](),VisuMZ['MessageCore']['Window_Help_refresh'][_0x27407a(0x211)](this),this[_0x27407a(0x2b7)]();},VisuMZ['MessageCore'][_0x45c442(0x1bf)]=Window_Options[_0x45c442(0x176)][_0x45c442(0x146)],Window_Options[_0x45c442(0x176)][_0x45c442(0x146)]=function(){const _0x1b1cde=_0x45c442;VisuMZ[_0x1b1cde(0xe5)][_0x1b1cde(0x1bf)][_0x1b1cde(0x211)](this),this['addMessageCoreCommands']();},Window_Options[_0x45c442(0x176)]['addMessageCoreCommands']=function(){const _0x2b7a0f=_0x45c442;VisuMZ[_0x2b7a0f(0xe5)][_0x2b7a0f(0x237)][_0x2b7a0f(0xc4)][_0x2b7a0f(0xe6)]&&this[_0x2b7a0f(0x239)]();},Window_Options[_0x45c442(0x176)]['addMessageCoreTextSpeedCommand']=function(){const _0x427111=_0x45c442,_0x11e04c=TextManager[_0x427111(0x152)],_0x1538fd=_0x427111(0x14c);this[_0x427111(0x131)](_0x11e04c,_0x1538fd);},VisuMZ[_0x45c442(0xe5)]['Window_Options_statusText']=Window_Options[_0x45c442(0x176)][_0x45c442(0x29f)],Window_Options['prototype']['statusText']=function(_0x4a4e69){const _0x1d86a4=_0x45c442,_0x3d6b1a=this['commandSymbol'](_0x4a4e69);if(_0x3d6b1a===_0x1d86a4(0x14c))return this['textSpeedStatusText']();return VisuMZ[_0x1d86a4(0xe5)][_0x1d86a4(0x24d)][_0x1d86a4(0x211)](this,_0x4a4e69);},VisuMZ['MessageCore'][_0x45c442(0x1fe)]=Window_Options['prototype']['isVolumeSymbol'],Window_Options[_0x45c442(0x176)][_0x45c442(0x1db)]=function(_0x4099ca){const _0x3d1a2f=_0x45c442;if(_0x4099ca===_0x3d1a2f(0x14c))return!![];return VisuMZ[_0x3d1a2f(0xe5)]['Window_Options_isVolumeSymbol']['call'](this,_0x4099ca);},Window_Options[_0x45c442(0x176)][_0x45c442(0x230)]=function(){const _0x3e8573=_0x45c442,_0x2cccc4=this['getConfigValue']('textSpeed');return _0x2cccc4>0xa?TextManager[_0x3e8573(0x2c2)]:_0x2cccc4;},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x251)]=Window_Options[_0x45c442(0x176)][_0x45c442(0x1c1)],Window_Options[_0x45c442(0x176)][_0x45c442(0x1c1)]=function(_0x1ff6f7,_0x2ecd4d,_0x43f8c0){const _0x3e25e3=_0x45c442;if(_0x1ff6f7===_0x3e25e3(0x14c))return this[_0x3e25e3(0x197)](_0x1ff6f7,_0x2ecd4d,_0x43f8c0);VisuMZ['MessageCore']['Window_Options_changeVolume'][_0x3e25e3(0x211)](this,_0x1ff6f7,_0x2ecd4d,_0x43f8c0);},Window_Options[_0x45c442(0x176)][_0x45c442(0x197)]=function(_0x2c44d5,_0x294bed,_0x4f55b9){const _0x2cddb6=_0x45c442,_0x5d5fe2=this[_0x2cddb6(0x148)](_0x2c44d5),_0x20dc9b=0x1,_0xac1885=_0x5d5fe2+(_0x294bed?_0x20dc9b:-_0x20dc9b);_0xac1885>0xb&&_0x4f55b9?this['changeValue'](_0x2c44d5,0x1):this[_0x2cddb6(0x1af)](_0x2c44d5,_0xac1885[_0x2cddb6(0x1f4)](0x1,0xb));},Window_Message['prototype'][_0x45c442(0x18b)]=function(){const _0x51cd35=_0x45c442;Window_Base['prototype'][_0x51cd35(0x18b)][_0x51cd35(0x211)](this),VisuMZ[_0x51cd35(0xe5)][_0x51cd35(0x237)][_0x51cd35(0x13a)][_0x51cd35(0xe4)]&&this[_0x51cd35(0x20a)]();},Window_Message[_0x45c442(0x176)][_0x45c442(0x20a)]=function(){const _0x42aac1=_0x45c442;this['_dimmerSprite']['x']=Math[_0x42aac1(0x1e9)](this[_0x42aac1(0x1ce)]/0x2),this[_0x42aac1(0x28c)][_0x42aac1(0x281)]['x']=0.5,this[_0x42aac1(0x28c)]['scale']['x']=Graphics[_0x42aac1(0x1ce)];},VisuMZ['MessageCore'][_0x45c442(0xec)]=Window_Message['prototype'][_0x45c442(0x136)],Window_Message['prototype'][_0x45c442(0x136)]=function(){const _0x5f3137=_0x45c442;VisuMZ[_0x5f3137(0xe5)][_0x5f3137(0xec)][_0x5f3137(0x211)](this),this[_0x5f3137(0x23d)](),this['resetWordWrap'](),this[_0x5f3137(0xfd)](![]),this[_0x5f3137(0x272)](_0x5f3137(0x16d)),this[_0x5f3137(0x173)](VisuMZ[_0x5f3137(0xe5)][_0x5f3137(0x237)]['General']['MessageTextDelay']);},Window_Message[_0x45c442(0x176)]['resetWordWrap']=function(){const _0x297c7b=_0x45c442;this[_0x297c7b(0x29b)]($gameSystem['isMessageWindowWordWrap']());},Window_Message[_0x45c442(0x176)][_0x45c442(0x235)]=function(){return!![];},Window_Message[_0x45c442(0x176)][_0x45c442(0x173)]=function(_0x2300fc){const _0x29f243=_0x45c442,_0x200687=0xb-ConfigManager[_0x29f243(0x14c)];_0x2300fc=Math[_0x29f243(0x1e9)](_0x2300fc*_0x200687),this[_0x29f243(0x20e)]=_0x2300fc,this['_textDelay']=_0x2300fc;},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x10b)]=Window_Message[_0x45c442(0x176)][_0x45c442(0x25c)],Window_Message[_0x45c442(0x176)][_0x45c442(0x25c)]=function(){const _0x5a0e04=_0x45c442;return VisuMZ[_0x5a0e04(0xe5)]['Window_Message_isTriggered'][_0x5a0e04(0x211)](this)||Input['isPressed'](VisuMZ[_0x5a0e04(0xe5)][_0x5a0e04(0x237)][_0x5a0e04(0x13a)][_0x5a0e04(0x29a)]);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x10a)]=Window_Message[_0x45c442(0x176)]['updatePlacement'],Window_Message['prototype']['updatePlacement']=function(){const _0x113234=_0x45c442;let _0x42b4d2=this['y'];VisuMZ[_0x113234(0xe5)][_0x113234(0x10a)]['call'](this);if(this[_0x113234(0x2a7)])this['y']=_0x42b4d2;this[_0x113234(0x227)]();},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x275)]=Window_Message['prototype'][_0x45c442(0x264)],Window_Message[_0x45c442(0x176)][_0x45c442(0x264)]=function(_0x3d7438){const _0x52fd67=_0x45c442;this[_0x52fd67(0x11b)](_0x3d7438),VisuMZ[_0x52fd67(0xe5)]['Window_Message_newPage'][_0x52fd67(0x211)](this,_0x3d7438),this['createContents']();},Window_Message[_0x45c442(0x176)][_0x45c442(0x11b)]=function(_0x5d033f){const _0x131cce=_0x45c442;this[_0x131cce(0x1e6)](_0x5d033f),this[_0x131cce(0x277)]();},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x1cd)]=Window_Message[_0x45c442(0x176)][_0x45c442(0x16f)],Window_Message[_0x45c442(0x176)]['terminateMessage']=function(){const _0x10c3dd=_0x45c442;VisuMZ[_0x10c3dd(0xe5)][_0x10c3dd(0x1cd)]['call'](this),this['clearFlags']();if(this[_0x10c3dd(0x267)])this[_0x10c3dd(0x2b9)]();},Window_Message[_0x45c442(0x176)]['updateDimensions']=function(){const _0x32b893=_0x45c442;this['width']=$gameSystem[_0x32b893(0xdc)](),this['width']=Math[_0x32b893(0x2d9)](Graphics[_0x32b893(0x1ce)],this['width']);const _0x1bd181=$gameSystem[_0x32b893(0x12a)]();this[_0x32b893(0x1b2)]=SceneManager[_0x32b893(0x274)][_0x32b893(0x17d)](_0x1bd181,![]),this['height']=Math[_0x32b893(0x2d9)](Graphics['height'],this['height']);if($gameTemp[_0x32b893(0x156)])this[_0x32b893(0x247)]();},Window_Message['prototype'][_0x45c442(0x247)]=function(){const _0x1eb8e4=_0x45c442;this['x']=(Graphics[_0x1eb8e4(0x10f)]-this[_0x1eb8e4(0x1ce)])/0x2,$gameTemp['_centerMessageWindow']=undefined,this[_0x1eb8e4(0x227)]();},Window_Message[_0x45c442(0x176)][_0x45c442(0x1b8)]=function(){const _0x52488d=_0x45c442,_0x58370c={'x':this['x'],'y':this['y']};Window_Base[_0x52488d(0x176)]['updateMove'][_0x52488d(0x211)](this),this[_0x52488d(0x1c4)](_0x58370c);},Window_Message[_0x45c442(0x176)][_0x45c442(0x14d)]=function(){return!![];},Window_Message[_0x45c442(0x176)]['updateNameBoxMove']=function(_0x294ab1){const _0x5102ce=_0x45c442;this[_0x5102ce(0x1ab)]&&(this[_0x5102ce(0x1ab)]['x']+=this['x']-_0x294ab1['x'],this[_0x5102ce(0x1ab)]['y']+=this['y']-_0x294ab1['y']);},Window_Message['prototype'][_0x45c442(0x28a)]=function(_0x5cd6a3,_0x265eb3){const _0x4a7340=_0x45c442;this[_0x4a7340(0x253)](this[_0x4a7340(0x1ee)]['x'],this[_0x4a7340(0xc1)]*(Graphics[_0x4a7340(0x2b8)]-this[_0x4a7340(0x1b2)])/0x2,this['_resetRect'][_0x4a7340(0x1ce)],this[_0x4a7340(0x1ee)][_0x4a7340(0x1b2)],_0x5cd6a3,_0x265eb3);},Window_Message[_0x45c442(0x176)][_0x45c442(0x110)]=function(_0x1c18ae){const _0x2da0e0=_0x45c442,_0x235181=Window_Base[_0x2da0e0(0x176)]['processCommonEvent'][_0x2da0e0(0x211)](this,_0x1c18ae);this['launchMessageCommonEvent'](_0x235181);},Window_Message['prototype']['launchMessageCommonEvent']=function(_0x3079d5){const _0x2f9172=_0x45c442;if($gameParty[_0x2f9172(0x118)]()){}else $gameMap[_0x2f9172(0x140)](_0x3079d5);},Window_Message[_0x45c442(0x176)][_0x45c442(0x2aa)]=function(_0xd3e557){const _0x2f95e0=_0x45c442;this[_0x2f95e0(0x20e)]--,this[_0x2f95e0(0x20e)]<=0x0&&(this[_0x2f95e0(0x1e8)](_0xd3e557),Window_Base[_0x2f95e0(0x176)]['processCharacter'][_0x2f95e0(0x211)](this,_0xd3e557));},Window_Message[_0x45c442(0x176)][_0x45c442(0x1e8)]=function(_0x3a463f){const _0x58166a=_0x45c442;this[_0x58166a(0x20e)]=this[_0x58166a(0xd0)];if(this['_textDelay']<=0x0)this['_showFast']=!![];},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x2c3)]=Window_Message[_0x45c442(0x176)][_0x45c442(0x208)],Window_Message[_0x45c442(0x176)]['processEscapeCharacter']=function(_0x37ed56,_0x11fc00){const _0x36ab00=_0x45c442;!_0x11fc00[_0x36ab00(0x180)]?Window_Base[_0x36ab00(0x176)][_0x36ab00(0x208)][_0x36ab00(0x211)](this,_0x37ed56,_0x11fc00):VisuMZ[_0x36ab00(0xe5)][_0x36ab00(0x2c3)][_0x36ab00(0x211)](this,_0x37ed56,_0x11fc00);},Window_Message['prototype']['prepareAutoSizeEscapeCharacters']=function(_0x1c02b3){const _0x517d73=_0x45c442;let _0x10af92=_0x1c02b3[_0x517d73(0x19f)];_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x156372=_0x517d73;return this[_0x156372(0x125)](_0x10af92,!![],!![]),this[_0x156372(0x24c)](_0x156372(0xd1)),'';}),_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x4b3ca5=_0x517d73;return this[_0x4b3ca5(0x125)](_0x10af92,!![],![]),this[_0x4b3ca5(0x24c)]('none'),'';}),_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x22935c=_0x517d73;return this[_0x22935c(0x125)](_0x10af92,![],!![]),this['processAutoPosition']('none'),'';});if(SceneManager[_0x517d73(0x123)]())_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x47998f,_0x410b2c)=>{const _0x3d0729=_0x517d73;return this[_0x3d0729(0x125)](_0x10af92,!![],!![]),this[_0x3d0729(0x24c)](_0x3d0729(0xe7),Number(_0x410b2c)||0x1),'';}),_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x58cb15,_0x16828d)=>{const _0x3e2ea4=_0x517d73;return this[_0x3e2ea4(0x125)](_0x10af92,!![],!![]),this[_0x3e2ea4(0x24c)]('battle\x20party',Number(_0x16828d)||0x0),'';}),_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x545f6d,_0x238444)=>{const _0x5ad72a=_0x517d73;return this[_0x5ad72a(0x125)](_0x10af92,!![],!![]),this['processAutoPosition'](_0x5ad72a(0x122),Number(_0x238444)||0x0),'';});else SceneManager[_0x517d73(0x294)]()&&(_0x10af92=_0x10af92['replace'](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x50402c,_0x3a7f51)=>{const _0x49d9d0=_0x517d73;return this[_0x49d9d0(0x125)](_0x10af92,!![],!![]),this[_0x49d9d0(0x24c)](_0x49d9d0(0x22c),0x0),'';}),_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xc8c1c0,_0x4f643b)=>{const _0x445130=_0x517d73;return this[_0x445130(0x125)](_0x10af92,!![],!![]),this[_0x445130(0x24c)](_0x445130(0x20d),Number(_0x4f643b)||0x1),'';}),_0x10af92=_0x10af92['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x497ae6,_0x5c5e06)=>{const _0x1fe2b5=_0x517d73;return this[_0x1fe2b5(0x125)](_0x10af92,!![],!![]),this[_0x1fe2b5(0x24c)]('map\x20party',Number(_0x5c5e06)||0x0),'';}),_0x10af92=_0x10af92[_0x517d73(0x2c0)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x10da58,_0x36ecea)=>{const _0x10cb35=_0x517d73;return this[_0x10cb35(0x125)](_0x10af92,!![],!![]),this['processAutoPosition'](_0x10cb35(0x198),Number(_0x36ecea)||0x0),'';}));_0x1c02b3[_0x517d73(0x19f)]=_0x10af92;},Window_Message[_0x45c442(0x29d)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message['_autoPosRegExp']=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x45c442(0x176)][_0x45c442(0x125)]=function(_0x55a028,_0x48a75b,_0x87cf6f){const _0x267b72=_0x45c442;_0x55a028=_0x55a028['replace'](Window_Message[_0x267b72(0x29d)],''),_0x55a028=_0x55a028[_0x267b72(0x2c0)](Window_Message['_autoPosRegExp'],''),this[_0x267b72(0xf2)]=!![];const _0x10e672=this['textSizeEx'](_0x55a028);if(_0x48a75b){let _0x56542a=_0x10e672['width']+$gameSystem[_0x267b72(0x201)]()*0x2+0x6;const _0xcc75f0=$gameMessage[_0x267b72(0x119)]()!=='',_0x5369c4=ImageManager[_0x267b72(0x255)],_0x4b957b=0x14;_0x56542a+=_0xcc75f0?_0x5369c4+_0x4b957b:0x4,$gameSystem['setMessageWindowWidth'](_0x56542a);}if(_0x87cf6f){let _0xd4e790=Math[_0x267b72(0x295)](_0x10e672[_0x267b72(0x1b2)]/this[_0x267b72(0x2bb)]());$gameSystem[_0x267b72(0x206)](_0xd4e790);}this[_0x267b72(0x29e)](),this[_0x267b72(0xf2)]=![],this['_messagePositionReset']=!![];},Window_Message['prototype']['updateAutoSizePosition']=function(){const _0x206d35=_0x45c442;this[_0x206d35(0x277)](),this[_0x206d35(0x28e)](),this[_0x206d35(0x247)](),this['updateTransform'](),this['contents'][_0x206d35(0x22d)](),this[_0x206d35(0x2cf)]();},Window_Message['prototype']['processAutoPosition']=function(_0x5833cc,_0x175ae1){const _0x33f2da=_0x45c442;switch(_0x5833cc[_0x33f2da(0x1d5)]()[_0x33f2da(0x1e4)]()){case _0x33f2da(0xe7):this[_0x33f2da(0x2a7)]=$gameActors[_0x33f2da(0x161)](_0x175ae1);break;case _0x33f2da(0x112):this[_0x33f2da(0x2a7)]=$gameParty['members']()[_0x175ae1-0x1];break;case _0x33f2da(0x122):this[_0x33f2da(0x2a7)]=$gameTroop[_0x33f2da(0x107)]()[_0x175ae1-0x1];break;case _0x33f2da(0x22c):this[_0x33f2da(0x2a7)]=$gamePlayer;break;case _0x33f2da(0x20d):const _0x7f8f66=$gameActors[_0x33f2da(0x161)](_0x175ae1)[_0x33f2da(0x13e)]();_0x7f8f66===0x0?this[_0x33f2da(0x2a7)]=$gamePlayer:this[_0x33f2da(0x2a7)]=$gamePlayer[_0x33f2da(0x183)]()['follower'](_0x7f8f66-0x1);break;case'map\x20party':_0x175ae1===0x1?this[_0x33f2da(0x2a7)]=$gamePlayer:this[_0x33f2da(0x2a7)]=$gamePlayer['followers']()[_0x33f2da(0xd2)](_0x175ae1-0x2);break;case _0x33f2da(0x198):this[_0x33f2da(0x2a7)]=$gameMap[_0x33f2da(0x1a6)](_0x175ae1);break;}this[_0x33f2da(0x2a7)]&&this[_0x33f2da(0x1ae)]();},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x289)]=Window_Message[_0x45c442(0x176)][_0x45c442(0x2b1)],Window_Message[_0x45c442(0x176)][_0x45c442(0x2b1)]=function(){const _0x977e4=_0x45c442;this[_0x977e4(0x1ae)](),VisuMZ[_0x977e4(0xe5)][_0x977e4(0x289)][_0x977e4(0x211)](this);},Window_Message[_0x45c442(0x176)][_0x45c442(0x1ae)]=function(){const _0x3cbf65=_0x45c442;if(!this['_autoPositionTarget'])return;const _0x381978=SceneManager[_0x3cbf65(0x274)];if(!_0x381978)return;if(!_0x381978['_spriteset'])return;const _0x1d46cb=_0x381978[_0x3cbf65(0x2bf)][_0x3cbf65(0x284)](this[_0x3cbf65(0x2a7)]);if(!_0x1d46cb)return;let _0x4bad5a=_0x1d46cb['x'];_0x4bad5a-=this['width']/0x2,_0x4bad5a-=(Graphics[_0x3cbf65(0x1ce)]-Graphics[_0x3cbf65(0x10f)])/0x2;let _0x10294f=_0x1d46cb['y'];_0x10294f-=this['height'],_0x10294f-=(Graphics[_0x3cbf65(0x1b2)]-Graphics[_0x3cbf65(0x2b8)])/0x2,_0x1d46cb[_0x3cbf65(0x17e)]?_0x10294f-=_0x1d46cb[_0x3cbf65(0x17e)]()[_0x3cbf65(0x1b2)]+0x18:_0x10294f-=_0x1d46cb[_0x3cbf65(0x1b2)]+0x8,this['x']=Math[_0x3cbf65(0x1e9)](_0x4bad5a),this['y']=Math[_0x3cbf65(0x1e9)](_0x10294f),this[_0x3cbf65(0x227)](!![],![]),this['_nameBoxWindow']['updatePlacement']();},Window_Message[_0x45c442(0x176)]['messagePositionReset']=function(){const _0x1efb4d=_0x45c442;this[_0x1efb4d(0x267)]=![],this[_0x1efb4d(0x2a7)]=undefined,$gameSystem['initMessageCore'](),this[_0x1efb4d(0x29e)](),this[_0x1efb4d(0x128)]=0x0;},Window_Message[_0x45c442(0x176)][_0x45c442(0x2cb)]=function(_0x354a0c){const _0x16d4a2=_0x45c442;return Window_Base[_0x16d4a2(0x176)][_0x16d4a2(0x2cb)][_0x16d4a2(0x211)](this,_0x354a0c);},Window_Message[_0x45c442(0x176)][_0x45c442(0x108)]=function(_0x58d85a){const _0x51bae6=_0x45c442;return Window_Base['prototype'][_0x51bae6(0x108)]['call'](this,_0x58d85a);},Window_Message[_0x45c442(0x176)][_0x45c442(0x1a1)]=function(_0x3446db){const _0x58aee3=_0x45c442;this[_0x58aee3(0x1d7)](_0x3446db),Window_Base[_0x58aee3(0x176)]['flushTextState'][_0x58aee3(0x211)](this,_0x3446db),this[_0x58aee3(0x225)](_0x3446db);},Window_Message[_0x45c442(0x176)][_0x45c442(0x1d7)]=function(_0x39d88f){},Window_Message[_0x45c442(0x176)]['postFlushTextState']=function(_0x266051){},Window_NameBox[_0x45c442(0x176)]['isAutoColorAffected']=function(){return![];},Window_NameBox[_0x45c442(0x176)][_0x45c442(0x155)]=function(){const _0x95a2eb=_0x45c442;Window_Base[_0x95a2eb(0x176)][_0x95a2eb(0x155)][_0x95a2eb(0x211)](this),this[_0x95a2eb(0x23b)](this[_0x95a2eb(0x220)]());},Window_NameBox[_0x45c442(0x176)][_0x45c442(0x220)]=function(){const _0x28e8c0=_0x45c442,_0x1f447c=VisuMZ[_0x28e8c0(0xe5)][_0x28e8c0(0x237)][_0x28e8c0(0x13a)][_0x28e8c0(0x1e2)];return ColorManager['textColor'](_0x1f447c);},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x27c)]=Window_NameBox[_0x45c442(0x176)][_0x45c442(0x28e)],Window_NameBox[_0x45c442(0x176)][_0x45c442(0x28e)]=function(){const _0x52464b=_0x45c442;VisuMZ[_0x52464b(0xe5)][_0x52464b(0x27c)][_0x52464b(0x211)](this),this[_0x52464b(0x1fa)](),this[_0x52464b(0x25d)](),this['clampPlacementPosition'](),this[_0x52464b(0xeb)]();},Window_NameBox[_0x45c442(0x176)][_0x45c442(0x2cb)]=function(_0x4f902b){const _0x3c98ab=_0x45c442;return _0x4f902b=_0x4f902b['replace'](/<LEFT>/gi,this['setRelativePosition'][_0x3c98ab(0x179)](this,0x0)),_0x4f902b=_0x4f902b[_0x3c98ab(0x2c0)](/<CENTER>/gi,this[_0x3c98ab(0x11c)][_0x3c98ab(0x179)](this,0x5)),_0x4f902b=_0x4f902b[_0x3c98ab(0x2c0)](/<RIGHT>/gi,this['setRelativePosition'][_0x3c98ab(0x179)](this,0xa)),_0x4f902b=_0x4f902b[_0x3c98ab(0x2c0)](/<POSITION:[ ](\d+)>/gi,(_0x4a5bb3,_0x50cf70)=>this[_0x3c98ab(0x11c)](parseInt(_0x50cf70))),_0x4f902b=_0x4f902b[_0x3c98ab(0x2c0)](/<\/LEFT>/gi,''),_0x4f902b=_0x4f902b[_0x3c98ab(0x2c0)](/<\/CENTER>/gi,''),_0x4f902b=_0x4f902b['replace'](/<\/RIGHT>/gi,''),Window_Base[_0x3c98ab(0x176)][_0x3c98ab(0x2cb)][_0x3c98ab(0x211)](this,_0x4f902b);},Window_NameBox[_0x45c442(0x176)][_0x45c442(0x11c)]=function(_0xd03657){const _0x4d165c=_0x45c442;return this[_0x4d165c(0x26f)]=_0xd03657,'';},Window_NameBox[_0x45c442(0x176)]['updateRelativePosition']=function(){const _0x5e2d96=_0x45c442;if($gameMessage['isRTL']())return;this[_0x5e2d96(0x26f)]=this[_0x5e2d96(0x26f)]||0x0;const _0x1bcc6a=this[_0x5e2d96(0x1a0)],_0x8452ed=Math[_0x5e2d96(0x1ad)](_0x1bcc6a['width']*this[_0x5e2d96(0x26f)]/0xa);this['x']=_0x1bcc6a['x']+_0x8452ed-Math[_0x5e2d96(0x1ad)](this[_0x5e2d96(0x1ce)]/0x2),this['x']=this['x']['clamp'](_0x1bcc6a['x'],_0x1bcc6a['x']+_0x1bcc6a[_0x5e2d96(0x1ce)]-this[_0x5e2d96(0x1ce)]);},Window_NameBox[_0x45c442(0x176)][_0x45c442(0x25d)]=function(){const _0x51c9ab=_0x45c442;if($gameMessage[_0x51c9ab(0x1be)]())return;this[_0x51c9ab(0x26f)]=this[_0x51c9ab(0x26f)]||0x0;const _0x3969df=VisuMZ['MessageCore'][_0x51c9ab(0x237)][_0x51c9ab(0x13a)][_0x51c9ab(0x1cf)],_0x45227f=VisuMZ[_0x51c9ab(0xe5)][_0x51c9ab(0x237)][_0x51c9ab(0x13a)][_0x51c9ab(0x19b)],_0x2115f8=(0x5-this[_0x51c9ab(0x26f)])/0x5;this['x']+=Math['floor'](_0x3969df*_0x2115f8),this['y']+=_0x45227f;},Window_NameBox[_0x45c442(0x176)]['updateOverlappingY']=function(){const _0x2dc000=_0x45c442,_0x715be8=this[_0x2dc000(0x1a0)],_0x4f8a9c=_0x715be8['y'],_0x196f2f=VisuMZ[_0x2dc000(0xe5)][_0x2dc000(0x237)][_0x2dc000(0x13a)][_0x2dc000(0x19b)];_0x4f8a9c>this['y']&&_0x4f8a9c<this['y']+this[_0x2dc000(0x1b2)]-_0x196f2f&&(this['y']=_0x715be8['y']+_0x715be8[_0x2dc000(0x1b2)]);},VisuMZ[_0x45c442(0xe5)]['Window_NameBox_refresh']=Window_NameBox[_0x45c442(0x176)]['refresh'],Window_NameBox[_0x45c442(0x176)][_0x45c442(0x232)]=function(){const _0x160fc1=_0x45c442;this[_0x160fc1(0x26f)]=0x0,VisuMZ[_0x160fc1(0xe5)][_0x160fc1(0x2a1)][_0x160fc1(0x211)](this);},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x205)]=function(){return![];},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x235)]=function(){return!![];},Window_ChoiceList['prototype'][_0x45c442(0x2bb)]=function(){const _0x3aaf50=_0x45c442;return $gameSystem[_0x3aaf50(0x1d9)]();},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x1ec)]=function(){const _0x3dc467=_0x45c442;return $gameSystem[_0x3dc467(0x250)]();},Window_ChoiceList[_0x45c442(0x176)]['start']=function(){const _0xb17603=_0x45c442;this[_0xb17603(0x166)](),this['refresh'](),this[_0xb17603(0x242)](),this[_0xb17603(0x21e)](),this['activate']();},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x232)]=function(){const _0x39ad7b=_0x45c442;this[_0x39ad7b(0x2a3)](),this[_0x39ad7b(0x139)](),this[_0x39ad7b(0x1a0)]&&(this[_0x39ad7b(0x28e)](),this[_0x39ad7b(0x133)]()),this[_0x39ad7b(0x2cf)](),Window_Selectable[_0x39ad7b(0x176)][_0x39ad7b(0x232)][_0x39ad7b(0x211)](this);},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x139)]=function(){const _0xd24765=_0x45c442,_0x5daad3=$gameMessage[_0xd24765(0x18d)]();let _0xb3803d=0x0;for(const _0x3a9926 of _0x5daad3){if(this['isChoiceVisible'](_0x3a9926)){const _0x5deee9=_0x3a9926,_0x94c563=this[_0xd24765(0x135)](_0x3a9926);this[_0xd24765(0x131)](_0x5deee9,_0xd24765(0xf4),_0x94c563,_0xb3803d);}_0xb3803d++;}},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x1e7)]=function(_0x302727){const _0x5ab7b1=_0x45c442;if(_0x302727[_0x5ab7b1(0x172)](/<HIDE>/i))return![];if(_0x302727['match'](/<SHOW>/i))return!![];if(_0x302727[_0x5ab7b1(0x172)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5adc1b=JSON[_0x5ab7b1(0x1ea)]('['+RegExp['$1'][_0x5ab7b1(0x172)](/\d+/g)+']');for(const _0xb452a2 of _0x5adc1b){if(!$gameSwitches['value'](_0xb452a2))return![];}return!![];}if(_0x302727[_0x5ab7b1(0x172)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a3bdd=JSON[_0x5ab7b1(0x1ea)]('['+RegExp['$1'][_0x5ab7b1(0x172)](/\d+/g)+']');for(const _0x575027 of _0x2a3bdd){if(!$gameSwitches['value'](_0x575027))return![];}return!![];}if(_0x302727[_0x5ab7b1(0x172)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3035df=JSON[_0x5ab7b1(0x1ea)]('['+RegExp['$1'][_0x5ab7b1(0x172)](/\d+/g)+']');for(const _0x3f4b7a of _0x3035df){if($gameSwitches[_0x5ab7b1(0x254)](_0x3f4b7a))return!![];}return![];}if(_0x302727[_0x5ab7b1(0x172)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x493407=JSON[_0x5ab7b1(0x1ea)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x6d5c97 of _0x493407){if(!$gameSwitches[_0x5ab7b1(0x254)](_0x6d5c97))return!![];}return![];}if(_0x302727['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19b9b8=JSON['parse']('['+RegExp['$1'][_0x5ab7b1(0x172)](/\d+/g)+']');for(const _0x2bfcbf of _0x19b9b8){if(!$gameSwitches[_0x5ab7b1(0x254)](_0x2bfcbf))return!![];}return![];}if(_0x302727[_0x5ab7b1(0x172)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1828ce=JSON[_0x5ab7b1(0x1ea)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4e08ee of _0x1828ce){if($gameSwitches[_0x5ab7b1(0x254)](_0x4e08ee))return![];}return!![];}return!![];},Window_ChoiceList[_0x45c442(0x176)]['isChoiceEnabled']=function(_0x53eef3){const _0xc1a0f6=_0x45c442;if(_0x53eef3[_0xc1a0f6(0x172)](/<DISABLE>/i))return![];if(_0x53eef3['match'](/<ENABLE>/i))return!![];if(_0x53eef3['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5da458=JSON[_0xc1a0f6(0x1ea)]('['+RegExp['$1'][_0xc1a0f6(0x172)](/\d+/g)+']');for(const _0x36b7a1 of _0x5da458){if(!$gameSwitches[_0xc1a0f6(0x254)](_0x36b7a1))return![];}return!![];}if(_0x53eef3[_0xc1a0f6(0x172)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xbd804f=JSON[_0xc1a0f6(0x1ea)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4a78ba of _0xbd804f){if(!$gameSwitches['value'](_0x4a78ba))return![];}return!![];}if(_0x53eef3[_0xc1a0f6(0x172)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5296d5=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4583de of _0x5296d5){if($gameSwitches[_0xc1a0f6(0x254)](_0x4583de))return!![];}return![];}if(_0x53eef3[_0xc1a0f6(0x172)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3180b4=JSON[_0xc1a0f6(0x1ea)]('['+RegExp['$1'][_0xc1a0f6(0x172)](/\d+/g)+']');for(const _0x37da1c of _0x3180b4){if(!$gameSwitches[_0xc1a0f6(0x254)](_0x37da1c))return!![];}return![];}if(_0x53eef3['match'](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36142a=JSON[_0xc1a0f6(0x1ea)]('['+RegExp['$1'][_0xc1a0f6(0x172)](/\d+/g)+']');for(const _0x3ecd3e of _0x36142a){if(!$gameSwitches['value'](_0x3ecd3e))return!![];}return![];}if(_0x53eef3[_0xc1a0f6(0x172)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c1a61=JSON[_0xc1a0f6(0x1ea)]('['+RegExp['$1'][_0xc1a0f6(0x172)](/\d+/g)+']');for(const _0x5bb31d of _0x3c1a61){if($gameSwitches[_0xc1a0f6(0x254)](_0x5bb31d))return![];}return!![];}return!![];},VisuMZ[_0x45c442(0xe5)][_0x45c442(0x20b)]=Window_ChoiceList['prototype'][_0x45c442(0x28e)],Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x28e)]=function(){const _0x22e529=_0x45c442;VisuMZ['MessageCore']['Window_ChoiceList_updatePlacement']['call'](this),this[_0x22e529(0x227)]();},Window_ChoiceList['prototype'][_0x45c442(0x133)]=function(){const _0x1ddad6=_0x45c442;if(!this[_0x1ddad6(0x2b4)])return;const _0x561c64=0x8,_0x4007a9=this['_cancelButton'],_0x374a02=this['x']+this['width'],_0x88c85a=Math[_0x1ddad6(0x1ad)]((Graphics[_0x1ddad6(0x1ce)]-Graphics['boxWidth'])/0x2);_0x374a02>=Graphics[_0x1ddad6(0x10f)]+_0x88c85a-_0x4007a9[_0x1ddad6(0x1ce)]+_0x561c64?_0x4007a9['x']=-_0x4007a9[_0x1ddad6(0x1ce)]-_0x561c64:_0x4007a9['x']=this[_0x1ddad6(0x1ce)]+_0x561c64,_0x4007a9['y']=this[_0x1ddad6(0x1b2)]/0x2-_0x4007a9['height']/0x2;},VisuMZ[_0x45c442(0xe5)]['Window_ChoiceList_windowX']=Window_ChoiceList[_0x45c442(0x176)]['windowX'],Window_ChoiceList[_0x45c442(0x176)]['windowX']=function(){const _0x844b5b=_0x45c442;return this[_0x844b5b(0x1a0)]?this[_0x844b5b(0x2d7)]():VisuMZ['MessageCore']['Window_ChoiceList_windowX'][_0x844b5b(0x211)](this);},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x2d7)]=function(){const _0x42e93e=_0x45c442,_0x34051e=$gameMessage[_0x42e93e(0x16a)]();if(_0x34051e===0x1)return(Graphics[_0x42e93e(0x10f)]-this[_0x42e93e(0xe1)]())/0x2;else return _0x34051e===0x2?this[_0x42e93e(0x1a0)]['x']+this[_0x42e93e(0x1a0)][_0x42e93e(0x1ce)]-this['windowWidth']():this[_0x42e93e(0x1a0)]['x'];},Window_ChoiceList['prototype']['windowWidth']=function(){const _0x233453=_0x45c442,_0x503b70=(this['maxChoiceWidth']()+this['colSpacing']())*this[_0x233453(0x1ec)]()+this[_0x233453(0x142)]*0x2;return Math[_0x233453(0x2d9)](_0x503b70,Graphics[_0x233453(0x1ce)]);},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0xea)]=function(){const _0x39a2f4=_0x45c442,_0x3ef8fa=Math['ceil']($gameMessage['choices']()['length']/this[_0x39a2f4(0x1ec)]());return Math[_0x39a2f4(0x2d9)](_0x3ef8fa,this[_0x39a2f4(0x11d)]());},Window_ChoiceList[_0x45c442(0x176)]['maxLines']=function(){const _0x2aa312=_0x45c442,_0x5c1cb8=this[_0x2aa312(0x1a0)],_0xf68340=_0x5c1cb8?_0x5c1cb8['y']:0x0,_0x380982=_0x5c1cb8?_0x5c1cb8[_0x2aa312(0x1b2)]:0x0,_0x24e523=Graphics['boxHeight']/0x2;return _0xf68340<_0x24e523&&_0xf68340+_0x380982>_0x24e523?0x4:$gameSystem[_0x2aa312(0x13f)]();},Window_ChoiceList[_0x45c442(0x176)][_0x45c442(0x2d3)]=function(){const _0x2626dc=_0x45c442;let _0x28a264=0x60;for(const _0x325871 of this[_0x2626dc(0x116)]){const _0xb52ce9=_0x325871['name'],_0x859771=this['textSizeEx'](_0xb52ce9)[_0x2626dc(0x1ce)],_0x19137=Math[_0x2626dc(0x295)](_0x859771)+this['itemPadding']()*0x2;_0x28a264<_0x19137&&(_0x28a264=_0x19137);}return _0x28a264;},Window_ChoiceList['prototype']['drawItem']=function(_0x126c9c){const _0x5f514b=_0x45c442,_0xd1ef38=this['itemLineRect'](_0x126c9c),_0x126f2d=$gameSystem['getChoiceListTextAlign']()!==_0x5f514b(0x16d)?'<%1>'[_0x5f514b(0x228)]($gameSystem[_0x5f514b(0x14e)]()):'',_0x1a0529=_0x126f2d+this[_0x5f514b(0x17b)](_0x126c9c);this[_0x5f514b(0x2c5)](this[_0x5f514b(0x120)](_0x126c9c)),this['drawTextEx'](_0x1a0529,_0xd1ef38['x'],_0xd1ef38['y'],_0xd1ef38[_0x5f514b(0x1ce)]);},Window_ChoiceList['prototype'][_0x45c442(0x12b)]=function(){const _0x19cac3=_0x45c442;$gameMessage['onChoice'](this['currentExt']()),this['_messageWindow']['terminateMessage'](),this[_0x19cac3(0x11f)]();};