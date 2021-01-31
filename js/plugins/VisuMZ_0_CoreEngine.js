//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.23] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
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
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @max 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @max 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @max 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @max 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
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
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
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
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x482d=['startMove','getLastPluginCommandInterpreter','OpenConsole','updateMain','targets','NameInputMessage','lineHeight','Window_Selectable_cursorDown','paramchangeTextColor','URL','targetSpritePosition','isPhysical','setSideButtonLayout','IconXParam8','BattleSystem','defineProperty','_actor','updateOrigin','platform','rgba(0,\x200,\x200,\x201.0)','SaveMenu','clearRect','SEMICOLON','_bitmap','XParamVocab1','skills','center','CustomParamNames','drawAllParams','TitlePicButtons','PHA','_movementWholeDuration','OUTQUART','setBattleSystem','update','command111','subject','faceHeight','numberWindowRect','updatePositionCoreEngineShakeVert','F13','itemSuccessRate','volume','ColorMPGauge1','select','charCode','alwaysDash','isBottomHelpMode','picture','isCollidedWithEvents','INSERT','ParseSkillNotetags','strokeRect','onMoveEnd','command355','getInputButtonString','_actorWindow','GRD','Game_Action_itemEva','Bitmap_drawTextOutline','Bitmap_blt','OUTQUINT','ColSpacing','bitmapHeight','REC','showFauxAnimations','Total','createFauxAnimationSprite','drawCircle','Scene_Item_create','Window_Selectable_itemRect','OutlineColorDmg','processKeyboardHandling','_movementDuration','Bitmap_fillRect','ActorRect','eventsXyNt','ItemBgType','ColorTPGauge2','touchUI','Abbreviation','_effectsContainer','helpAreaTopSideButtonLayout','ActorTPColor','Game_Character_processMoveCommand','wholeDuration','IconXParam2','buttonAssistCancel','map','registerCommand','BattleManager_processEscape','DimColor1','addChild','onClick','parameters','mainAreaHeight','updateScene','Renderer','wait','_stored_hpGaugeColor1','initBasic','Game_Picture_move','MAX_GL_TEXTURES','_sellWindow','_closing','INQUART','buttonAssistWindowRect','processKeyboardDelete','INOUTQUART','ParseArmorNotetags','startAnimation','ParseEnemyNotetags','setBackgroundOpacity','_shakeSpeed','0.00','onMouseEnter','onKeyDownKeysF6F7','setEasingType','XParamVocab9','text','updatePictureAntiZoom','_statusParamsWindow','backOpacity','WIN_OEM_FJ_MASSHOU','DrawItemBackgroundJS','HIT','CommandBgType','<%1\x20%2:[\x20]','ProfileRect','showDevTools','createTitleButtons','ColorCTGauge1','cursorPagedown','checkCacheKey','animationShouldMirror','StatusParamsBgType','Scene_Equip_create','StatusBgType','param','save','_baseSprite','EquipMenu','ZERO','SwitchActorText','StatusParamsRect','NONCONVERT','anchorCoreEasing','INELASTIC','CategoryBgType','sqrt','PRINT','ARRAYSTRUCT','_statusWindow','COMMA','gainGold','QoL','addLoadListener','Conditional\x20Branch\x20Script\x20Error','updateFauxAnimations','drawGauge','CategoryRect','SPACE','_digitGrouping','darwin','targetEvaRate','maxItems','NUMPAD5','JUNJA','changeTextColor','contentsOpacity','initDigitGrouping','areTileShadowsHidden','XParamVocab4','paramName','number','Window_NumberInput_start','index','OutlineColorGauge','attackSkillId','GoldChange','maxLvGaugeColor1','_inputWindow','_isButtonHidden','loadBitmap','process_VisuMZ_CoreEngine_CustomParameters','createFauxAnimationQueue','_stored_maxLvGaugeColor1','Game_Action_itemHit','CTB','system','resetFontSettings','MRG','_screenX','QwertyLayout','Game_BattlerBase_refresh','Flat','createCustomParameter','_windowLayer','startNormalGame','itemLineRect','Sprite_Actor_setActorHome','level','initialBattleSystem','ATTN','471002JZNyYo','MenuBg','statusEquipWindowRect','Input_setupEventHandlers','clearForcedGameTroopSettingsCoreEngine','currentExp','NUMPAD6','F12','toLowerCase','_hp','HANJA','processHandling','setMute','textColor','imageSmoothingEnabled','([\x5c+\x5c-]\x5cd+)>','_backgroundSprite','parseForcedGameTroopSettingsCoreEngine','Window_NameInput_processTouch','ApplyEasing','resize','getCoreEngineScreenShakeStyle','onNameOk','Graphics_printError','Window_ShopSell_isEnabled','Subtitle','Sprite_Battler_startMove','parse','addCommand','inBattle','paramRate2','_buttonAssistWindow','processKeyboardBackspace','isNextScene','paramBase','MAT','initMembersCoreEngine','Graphics_centerElement','OPEN_BRACKET','sparamPlusJS','backgroundBitmap','BuyRect','fontSize','snapForBackground','_dimmerSprite','top','PERCENT','INOUTCUBIC','playBuzzer','ctrlKey','isMapScrollLinked','Window_StatusBase_drawActorLevel','TGR','OptionsRect','faceWidth','IconSParam1','Flat2','(\x5cd+)>','VisuMZ_2_BattleSystemBTB','crisisColor','ListBgType','_lastPluginCommandInterpreter','Icon','WindowLayer_render','hit','ONE','_registerKeyInput','hideButtonFromView','_inputSpecialKeyCode','_skillTypeWindow','ParamName','keypress','GoldFontSize','makeInputButtonString','clamp','MAXMP','item','createBuffer','updatePosition','ATK','setMainFontSize','cancel','outlineColorGauge','Scene_Battle_update','includes','ALWAYS','tileHeight','EnableNameInput','pop','Scene_MenuBase_mainAreaTop','BACK_QUOTE','xparamFlatBonus','cos','ColorMaxLvGauge1','note','CustomParamType','DIVIDE','isHandled','fillStyle','INOUTQUAD','setupCoreEasing','processDigitChange','Sprite_Button_initialize','EISU','transform','drawGameVersion','Sprite_Gauge_gaugeRate','isArrowPressed','buyWindowRect','_itemWindow','padding','refreshDimmerBitmap','drawValue','process_VisuMZ_CoreEngine_Functions','PictureEasingType','_defaultStretchMode','shift','image-rendering','_number','SceneManager_isGameActive','Window','buttonAssistWindowButtonRect','_timerSprite','StatusEquipBgType','LINEAR','openURL','PAUSE','Window_Base_update','setSideView','faces','isBusy','NewGameBoot','WIN_OEM_FJ_LOYA','TPB\x20WAIT','value','isTpb','tilesets','outlineColor','defaultInputMode','_stored_tpCostColor','name','Sprite_Animation_processSoundTimings','NUM_LOCK','KeyboardInput','_sideButtonLayout','process_VisuMZ_CoreEngine_RegExp','Scene_Menu_create','PictureEraseRange','encounterStep','RegExp','xparamPlus2','updateClose','clearCachedKeys','Tilemap_addShadow','drawFace','OUTCUBIC','%1%2','buttonAssistText%1','isEnemy','BgFilename2','pageup','SideView','ARRAYNUM','areButtonsOutsideMainUI','TimeProgress','smallParamFontSize','applyEasing','powerDownColor','open','stencilFunc','xparamFlatJS','KeyTAB','FUNC','SUBTRACT','IconSParam3','_paramPlus','CommandList','Padding','TextCodeNicknames','ButtonHeight','IconXParam7','processTouch','Scene_Base_createWindowLayer','_pictureContainer','isAnimationForEach','ParseActorNotetags','PRINTSCREEN','drawActorExpGauge','_context','Scene_Skill_create','SystemSetFontSize','IconParam3','animationNextDelay','button','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','printError','itemHitImprovedAccuracy','targetY','mpCostColor','drawItem','statusParamsWindowRect','mainAreaTopSideButtonLayout','KeySHIFT','([\x5c+\x5c-]\x5cd+)([%％])>','ColorSystem','HYPHEN_MINUS','DELETE','xparam','F18','F7key','SLASH','Spriteset_Base_initialize','F24','parallaxes','drawParamText','SystemSetWindowPadding','Window_NameInput_cursorUp','call','horizontal','_editWindow','batch','updateLastTarget','WIN_OEM_JUMP','exp','description','SParamVocab8','Scene_GameEnd_createBackground','disable','_createInternalTextures','makeAutoBattleActions','Untitled','DTB','advanced','WIN_OEM_FJ_JISHO','currentLevelExp','animations','keyMapper','movePageButtonSideButtonLayout','ColorHPGauge2','updatePositionCoreEngineShakeOriginal','isKeyItem','integer','HOME','XParamVocab6','EndingID','isClickEnabled','isFullDocumentTitle','maxLevel','expGaugeColor2','setupValueFont','F6key','Rate1','type','gaugeBackColor','Game_Actor_paramBase','ItemBackColor1','drawIconBySize','EnableNumberInput','initVisuMZCoreEngine','SParamVocab7','toUpperCase','initialize','903699qszrZV','isGameActive','isPlaytest','IconSParam6','Plus1','LUK','EQUALS','ProfileBgType','pixelated','IconParam6','paramWidth','setupCoreEngine','IconSParam9','_inputString','KeyItemProtect','mainAreaHeightSideButtonLayout','Scene_Map_updateScene','Scene_Map_initialize','mmp','Graphics_defaultStretchMode','MRF','mirror','PixelateImageRendering','NUM','IconParam7','STENCIL_BUFFER_BIT','Scene_Boot_startNormalGame','drawCharacter','paramRateJS','GroupDigits','KEEP','enableDigitGroupingEx','_menuButton','makeCoreEngineCommandList','SlotRect','drawActorSimpleStatus','xparamRate2','drawBackgroundRect','cursorUp','_coreEngineShakeStyle','_commandWindow','areButtonsHidden','META','maxLvGaugeColor2','outlineColorDmg','duration','initialLevel','nickname','_repositioned','expGaugeColor1','_setupEventHandlers','_forcedBattleSys','currentClass','xparamRate','buttonAssistWindowSideRect','floor','isSideView','WIN_OEM_ATTN','tpGaugeColor2','_optionsWindow','openness','Game_Picture_show','reserveCommonEvent','traitObjects','isPressed','tpColor','dummyWindowRect','actor','levelUp','push','SCROLL_LOCK','drawCurrencyValue','LoadError','XParamVocab2','itemHeight','drawTextEx','allowShiftScrolling','keyRepeatWait','_slotWindow','cancelShowButton','setMoveEasingType','text%1','setGuard','PositionJS','setHandler','gaugeLineHeight','inputWindowRect','CustomParam','drawNewParam','boxWidth','SParameterFormula','hpColor','height','displayY','IconParam1','HELP','ARRAYFUNC','createButtonAssistWindow','DigitGroupingExText','ctGaugeColor2','paramFlatJS','isCancelled','missed','Window_NameInput_processHandling','createFauxAnimation','ButtonAssist','none','CTRL','_baseTexture','isTouchedInsideFrame','backspace','Scene_Boot_onDatabaseLoaded','isRepeated','adjustSprite','KeyUnlisted','Game_Event_isCollidedWithEvents','CLEAR','drawCurrentParam','onKeyDown','children','EXR','CoreEngine','F16','sv_enemies','OptionsMenu','isWindowMaskingEnabled','commandWindowRows','NUMPAD1','guardSkillId','FadeSpeed','ARRAYJSON','renderNoMask','Window_Base_drawCharacter','GoldRect','paramRate','SkillTypeBgType','MDF','VisuMZ_2_BattleSystemCTB','drawActorClass','itemWindowRect','getColorDataFromPluginParameters','Game_Temp_initialize','targetObjects','cursorDown','targetOpacity','Activated','WIN_ICO_00','_changingClass','_onKeyDown','OnLoadJS','erasePicture','width','ParseTilesetNotetags','IconSParam8','battleSystem','QUESTION_MARK','skillId','DOUBLE_QUOTE','substring','TRAIT_PARAM','helpAreaHeight','WIN_OEM_CUSEL','NoTileShadows','gaugeHeight','INOUTELASTIC','start','itemBackColor2','updateOpen','setClickHandler','985241xStWRX','terminate','img/%1/','retrieveFauxAnimation','IconXParam6','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Sprite_Picture_updateOrigin','STENCIL_TEST','Game_Picture_calcEasing','addWindow','ActorHPColor','XParamVocab3','setActorHome','paramY','isOpen','STB','split','_stored_mpGaugeColor1','fillRect','FDR','TextCodeClassNames','paramPlusJS','Scene_Battle_createSpriteset','performEscape','WIN_OEM_PA1','_cacheScaleY','ColorPowerUp','ColorCrisis','waiting','_mapNameWindow','Bitmap_drawCircle','Window_Selectable_cursorUp','enable','isHovered','JSON','PIPE','STR','Plus','blockWidth','Game_Interpreter_PluginCommand','_fauxAnimationSprites','xparamFlat1','ParseItemNotetags','paramRate1','Window_Selectable_drawBackgroundRect','expRate','_cache','Game_Map_setup','581040IGLKDK','buttonAssistText3','Window_NameInput_cursorRight','isRightInputMode','ColorGaugeBack','processBack','DOLLAR','TRG','Window_Base_drawIcon','Input_clear','processCursorMove','222979IpBpWk','setSkill','TranslucentOpacity','IconParam0','NameMenu','GetParamIcon','ListRect','sparamRate','EQUAL','OUTELASTIC','CustomParamIcons','AutoStretch','HASH','RowSpacing','_pagedownButton','_statusEquipWindow','determineSideButtonLayoutValid','xparamPlus','title','Window_NumberInput_processDigitChange','key%1','_hideTileShadows','updateBackOpacity','Window_NameInput_refresh','DisplayedParams','cursorRight','titles2','CEV','rightArrowWidth','createWindowLayer','_shakePower','Scene_Map_updateMainMultiply','fadeSpeed','LESS_THAN','Game_Picture_x','_backSprite1','iconWidth','left','_stored_hpGaugeColor2','test','replace','pictureId','toFixed','ARRAYEVAL','_stored_deathColor','MenuLayout','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','AntiZoomPictures','XParamVocab5','categoryWindowRect','Location','openingSpeed','repositionCancelButtonSideButtonLayout','checkSmartEventCollision','nw.gui','scale','BaseTexture','NUMPAD0','updateOpacity','DEF','Spriteset_Base_update','keyboard','removeAllFauxAnimations','SystemLoadImages','changeClass','mpColor','ValueJS','apply','Game_Picture_y','moveMenuButtonSideButtonLayout','OPEN_CURLY_BRACKET','INSINE','process_VisuMZ_CoreEngine_Notetags','Sprite_Gauge_currentValue','filters','setFrame','CLOSE_PAREN','innerHeight','HelpBgType','IconXParam3','KANA','processTimingData','endAnimation','battlebacks1','_stored_powerUpColor','EditRect','REPLACE','CANCEL','isMagical','bgsVolume','SkillTypeRect','FontSize','updatePlayTestF7','opacity','filter','INBOUNCE','Color','boxHeight','BackOpacity','setup','Enemy','(\x5cd+\x5c.?\x5cd+)>','Sprite_destroy','_destroyInternalTextures','FINAL','_pageupButton','EXSEL','font-smooth','XParamVocab0','updatePadding','initMembers','getColor','NEAREST','Input_onKeyDown','IconXParam5','round','scaleSprite','loadSystemImages','terms','Window_Base_initialize','setAnchor','processKeyboardHome','sv_actors','WIN_OEM_RESET','itemRect','adjustBoxSize','drawGameSubtitle','Game_Picture_initBasic','IconSet','TAB','stringKeyMap','itypeId','flush','BoxMargin','mpGaugeColor2','Scene_MenuBase_helpAreaTop','Symbol','startShake','ColorExpGauge2','addChildToBack','dimColor2','goldWindowRect','CIRCUMFLEX','Type','NumberBgType','playTestF6','processCursorMoveModernControls','SParamVocab1','Plus2','MCR','_drawTextShadow','GoldBgType','drawIcon','ItemRect','SlotBgType','processSoundTimings','MAX_SAFE_INTEGER','isBeingTouched','shake','isMaxLevel','targetX','WIN_OEM_COPY','_targetOffsetX','child_process','ConvertParams','ItemHeight','Spriteset_Battle_createEnemies','randomInt','useDigitGroupingEx','itemBackColor1','isSideButtonLayout','bind','focus','visible','fromCharCode','CustomParamAbb','format','destroy','Game_Troop_setup','horzJS','hide','forceOutOfPlaytest','Scene_MenuBase_mainAreaHeight','outbounce','AccuracyBoost','Bitmap_clearRect','processTouchModernControls','Game_Actor_levelUp','Scene_Battle_createCancelButton','cursorLeft','Spriteset_Base_updatePosition','_targetAnchor','F19','buttonAssistOffset%1','makeDocumentTitle','_stored_mpCostColor','Game_BattlerBase_initMembers','Window_NameInput_cursorPagedown','xparamPlusJS','members','textWidth','clearStencil','SCALE_MODES','isUseModernControls','SideButtons','FontSmoothing','pagedown','OpenSpeed','_encounterCount','EREOF','onDatabaseLoaded','adjustPictureAntiZoom','VisuMZ_2_BattleSystemFTB','MULTIPLY','AGI','ColorDeath','getBackgroundOpacity','random','LevelUpFullMp','Linear','_buyWindow','setBackgroundType','sellWindowRect','background','_colorCache','_anchor','LEFT','drawText','setupButtonImage','enemies','tab','isMenuButtonAssistEnabled','BTB','_buttonType','canUse','centerSprite','Game_Screen_initialize','WIN_ICO_CLEAR','moveRelativeToResolutionChange','drawActorNickname','OUTBACK','ShowJS','F17','paramMax','Title','Scene_MenuBase_createCancelButton','IconSParam2','Script\x20Call\x20Error','ItemBackColor2','MainMenu','drawGameTitle','loadWindowskin','mainAreaTop','ParseStateNotetags','_stored_crisisColor','stencilOp','ONE_MINUS_SRC_ALPHA','LevelUpFullHp','RIGHT','BlurFilter','_spriteset','Max','blendFunc','CNT','calcEasing','XParameterFormula','TCR','NumberRect','_mp','Game_Picture_updateMove','setLastPluginCommandInterpreter','NUMPAD8','maxCols','helpAreaTop','updateTransform','_stored_expGaugeColor2','StatusMenu','pictures','IconSParam5','itemEva','setCoreEngineScreenShakeStyle','Scene_Shop_create','sparamFlat2','DefaultStyle','xScrollLinkedOffset','ADD','SELECT','SellBgType','PreserveNumbers','ColorPowerDown','INCUBIC','SystemSetBattleSystem','VOLUME_MUTE','SmartEventCollisionPriority','isPlaying','toLocaleString','_mode','INOUTQUINT','originalJS','hpGaugeColor1','isOpenAndActive','_onKeyPress','commandWindowRect','exit','Flat1','version','buttonAssistOffset3','EXECUTE','RepositionEnemies','DATABASE','itemHit','_centerElement','_stored_ctGaugeColor2','createBackground','VisuMZ_2_BattleSystemSTB','F11','F10','Window_Selectable_processCursorMove','createCancelButton','maxGold','setCoreEngineUpdateWindowBg','command357','catchUnknownError','MDR','IconSParam7','encounterStepsMinimum','setHome','isNwjs','enter','Window_NameInput_cursorDown','OptionsBgType','match','Window_Base_drawText','deselect','applyCoreEasing','optSideView','createCustomBackgroundImages','DigitGroupingLocale','bgs','updateMainMultiply','RightMenus','_categoryWindow','Bitmap_gradientFillRect','initCoreEngine','DECIMAL','option','initButtonHidden','DrawIcons','Game_Party_consumeItem','_duration','WIN_OEM_ENLW','ESC','ctGaugeColor1','resetTextColor','CrisisRate','clearZoom','SEPARATOR','Sprite_AnimationMV_processTimingData','prototype','Power','vertJS','clear','ColorManager_loadWindowskin','loadGameImagesCoreEngine','EXCLAMATION','FTB','PLAY','_targetOffsetY','titleCommandWindow','createJsQuickFunction','menuShowButton','_cancelButton','paramValueByName','CONTEXT_MENU','_internalTextures','buttonAssistKey%1','move','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','DummyBgType','WIN_OEM_BACKTAB','buttonAssistOffset2','Game_System_initialize','NUMPAD2','OUTBOUNCE','contents','resetBattleSystem','setTargetAnchor','contains','CreateBattleSystemID','setAction','Bitmap_measureTextWidth','mute','StartID','popScene','ShowDevTools','CRI','Window_NameInput_cursorPageup','process_VisuMZ_CoreEngine_jsQuickFunctions','updateAnchor','Game_Action_updateLastTarget','applyForcedGameTroopSettingsCoreEngine','down','%2%1%3','MEV','PDR','numActions','systemColor','refresh','menu','fillText','default','_addShadow','isActor','ParseClassNotetags','FontShadows','editWindowRect','IconXParam9','_commandList','ParseWeaponNotetags','buttonAssistOffset1','DummyRect','OPEN_PAREN','Game_Interpreter_command111','useDigitGrouping','VisuMZ_1_OptionsCore','NewGameCommonEventAll','CommandWidth','_centerElementCoreEngine','SkillMenu','PictureFilename','_playtestF7Looping','isOptionValid','playCursor','Manual','SHIFT','meVolume','anchor','pow','buttonAssistKey1','paramBaseAboveLevel99','translucentOpacity','EditBgType','IconXParam4','blt','inbounce','buttonAssistText1','string','Scene_Map_createSpriteset','Page','end','onMouseExit','currentValue','Window_Base_createTextState','isBottomButtonMode','sparamFlatJS','createCommandWindow','dashToggle','749436CFbByU','buttonAssistKey2','targetBackOpacity','ParamMax','Basic','ItemStyle','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Key%1','actorWindowRect','paramFlatBonus','ButtonFadeSpeed','calcCoreEasing','xparamFlat2','createEnemies','bgm','PERIOD','Gold','battlebacks2','reduce','paramMaxJS','_digitGroupingEx','createMenuButton','loadTitle2','getCustomBackgroundSettings','_screenY','_stored_powerDownColor','Settings','yScrollLinkedOffset','learnings','makeDeepCopy','ActorBgType','TextJS','drawActorLevel','bgmVolume','down2','successRate','RequireFocus','max','processAlwaysEscape','ENTER_SPECIAL','catchLoadError','%1/','ShowItemBackground','min','F21','targetContentsOpacity','keyCode','BasicParameterFormula','1875056fFcbot','Window_NameInput_cursorLeft','valueOutlineColor','TextManager_param','isNumpadPressed','buttonAreaHeight','RevertPreserveNumbers','(\x5cd+)([%％])>','currencyUnit','EncounterRateMinimum','1JTZfWp','TextFmt','setWindowPadding','getLevel','_CoreEngineSettings','onPress','_playTestFastMode','initCoreEasing','CAPSLOCK','pendingColor','altKey','_maxDigits','subtitle','F15','updateDocumentTitle','isTriggered','DefaultMode','Graphics','params','initCoreEngineScreenShake','INOUTSINE','dimColor1','playTestF7','IconXParam0','MODECHANGE','destroyed','buttonAssistSwitch','stop','Input_pollGamepads','cursorPageup','INBACK','updateCoreEasing','normalColor','StatusEquipRect','createDigits','processEscape','home','isItemStyle','toString','_hovered','_blank','_coreEasing','_hideButtons','Scene_Boot_loadSystemImages','right','setAttack','isCursorMovable','Sprite_Button_updateOpacity','makeActionList','_shakeDuration','Bitmap_resize','Rate2','ASTERISK','WASD','bitmap','4ntcAQj','COLON','#%1','INEXPO','_backgroundFilter','Window_NameInput_initialize','layoutSettings','reserveNewGameCommonEvent','F22','seVolume','CRSEL','updateDashToggle','status','_numberWindow','measureTextWidth','buttonAssistKey3','_forcedTroopView','_muteSound','paramPlus','mainCommandWidth','ItemPadding','constructor','asin','add','mainFontSize','EVA','CommandRect','OS_KEY','updateMove','_profileWindow','Scene_Boot_updateDocumentTitle','processKeyboardDigitChange','setActorHomeRepositioned','SParamVocab6','subjectHitRate','IconParam5','BACK_SLASH','_stored_pendingColor','_coreEasingType','log','makeEncounterCount','Scene_Status_create','Game_Interpreter_command355','WIN_OEM_PA2','INCIRC','eva','Scene_MenuBase_createPageButtons','numberShowButton','_fauxAnimationQueue','sin','getBattleSystem','OUTSINE','Bitmap_drawText','BgType','ParamChange','result','XParamVocab8','Game_Interpreter_command122','Input_shouldPreventDefault','createPageButtons','Rate','OutlineColor','F23','trim','<JS\x20%1\x20%2:[\x20](.*)>','INQUAD','Window_Base_drawFace','consumeItem','active','sparamRate2','catchException','tpCostColor','_goldWindow','listWindowRect','updatePositionCoreEngineShakeRand','_stored_expGaugeColor1','_pressed','pagedownShowButton','_scene','removeFauxAnimation','_offsetY','titles1','displayX','_listWindow','TitleCommandList','_drawTextOutline','BottomButtons','INOUTBOUNCE','Window_StatusBase_drawActorSimpleStatus','Game_Actor_changeClass','IconParam4','updateKeyText','processCursorHomeEndTrigger','ParseAllNotetags','xparamRateJS','F20','WIN_OEM_FJ_ROYA','atbActive','F14','DigitGroupingDamageSprites','enemy','HRG','targetScaleY','ImprovedAccuracySystem','destroyCoreEngineMarkedBitmaps','Spriteset_Base_destroy','_backSprite2','buttonAssistOk','onButtonImageLoad','createSpriteset','nextLevelExp','isItem','OpenURL','levelUpRecovery','style','processMoveCommand','isSmartEventCollisionOn','exec','sparam','pictureButtons','smoothSelect','markCoreEngineModified','\x5c}❪TAB❫\x5c{','INOUTCIRC','uiAreaHeight','enableDigitGrouping','isActiveTpb','Bitmap_strokeRect','reservePlayTestNewGameCommonEvent','HelpRect','sparamFlat1','INOUTEXPO','charAt','statusWindowRect','VOLUME_DOWN','_helpWindow','create','MAXHP','render','_data','StatusRect','startAutoNewGame','playCursorSound','repositionEnemiesByResolution','_clickHandler','Scene_MenuBase_createBackground','ColorExpGauge1','_gamepadWait','removeChild','DamageColor','Param','LvExpGauge','escape','normal','Window_Selectable_processTouch','ScreenShake','GameEnd','evaded','isEnabled','ActorMPColor','buttonY','Actor','updatePositionCoreEngine','gaugeRate','itemPadding','isSpecialCode','isExpGaugeDrawn','_storedStack','helpWindowRect','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','_pollGamepads','playOk','AMPERSAND','getButtonAssistLocation','SceneManager_initialize','gradientFillRect','getInputMultiButtonStrings','PRESERVCONVERSION(%1)','ModernControls','SLEEP','INQUINT','switchModes','NewGameCommonEvent','length','setupNewGame','ColorTPCost','xdg-open','mev','CallHandlerJS'];const _0x4809=function(_0x51e162,_0x7195a9){_0x51e162=_0x51e162-0x6c;let _0x482d45=_0x482d[_0x51e162];return _0x482d45;};const _0x40c38a=_0x4809;(function(_0x448eb0,_0x5388ac){const _0x599505=_0x4809;while(!![]){try{const _0xe74b63=parseInt(_0x599505(0x1bb))+parseInt(_0x599505(0x589))+parseInt(_0x599505(0x18b))+parseInt(_0x599505(0x38f))+-parseInt(_0x599505(0xe2))+-parseInt(_0x599505(0x400))*-parseInt(_0x599505(0x1c6))+-parseInt(_0x599505(0x3c9))*parseInt(_0x599505(0x3bf));if(_0xe74b63===_0x5388ac)break;else _0x448eb0['push'](_0x448eb0['shift']());}catch(_0x5c1ed3){_0x448eb0['push'](_0x448eb0['shift']());}}}(_0x482d,0xdbb28));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x40c38a(0x224)](function(_0x3f0d32){const _0xaf1e64=_0x40c38a;return _0x3f0d32[_0xaf1e64(0x40c)]&&_0x3f0d32['description'][_0xaf1e64(0x5dd)]('['+label+']');})[0x0];VisuMZ[label][_0x40c38a(0x3a9)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x40c38a(0x26a)]=function(_0x36c26,_0x3bbdc2){const _0x5e31eb=_0x40c38a;for(const _0x2a2c51 in _0x3bbdc2){if(_0x2a2c51[_0x5e31eb(0x311)](/(.*):(.*)/i)){const _0x521b56=String(RegExp['$1']),_0x306fd1=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x596392,_0x36687e,_0x5dc36f;switch(_0x306fd1){case _0x5e31eb(0xf9):_0x596392=_0x3bbdc2[_0x2a2c51]!==''?Number(_0x3bbdc2[_0x2a2c51]):0x0;break;case _0x5e31eb(0x7e):_0x36687e=_0x3bbdc2[_0x2a2c51]!==''?JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51]):[],_0x596392=_0x36687e['map'](_0x412e5b=>Number(_0x412e5b));break;case'EVAL':_0x596392=_0x3bbdc2[_0x2a2c51]!==''?eval(_0x3bbdc2[_0x2a2c51]):null;break;case _0x5e31eb(0x1f1):_0x36687e=_0x3bbdc2[_0x2a2c51]!==''?JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51]):[],_0x596392=_0x36687e[_0x5e31eb(0x515)](_0x595cfe=>eval(_0x595cfe));break;case _0x5e31eb(0x1ad):_0x596392=_0x3bbdc2[_0x2a2c51]!==''?JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51]):'';break;case _0x5e31eb(0x164):_0x36687e=_0x3bbdc2[_0x2a2c51]!==''?JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51]):[],_0x596392=_0x36687e[_0x5e31eb(0x515)](_0x4c68d2=>JSON['parse'](_0x4c68d2));break;case _0x5e31eb(0x88):_0x596392=_0x3bbdc2[_0x2a2c51]!==''?new Function(JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51])):new Function('return\x200');break;case _0x5e31eb(0x142):_0x36687e=_0x3bbdc2[_0x2a2c51]!==''?JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51]):[],_0x596392=_0x36687e[_0x5e31eb(0x515)](_0x2184be=>new Function(JSON[_0x5e31eb(0x5a4)](_0x2184be)));break;case _0x5e31eb(0x1af):_0x596392=_0x3bbdc2[_0x2a2c51]!==''?String(_0x3bbdc2[_0x2a2c51]):'';break;case'ARRAYSTR':_0x36687e=_0x3bbdc2[_0x2a2c51]!==''?JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51]):[],_0x596392=_0x36687e[_0x5e31eb(0x515)](_0x1f329a=>String(_0x1f329a));break;case'STRUCT':_0x5dc36f=_0x3bbdc2[_0x2a2c51]!==''?JSON[_0x5e31eb(0x5a4)](_0x3bbdc2[_0x2a2c51]):{},_0x36c26[_0x521b56]={},VisuMZ[_0x5e31eb(0x26a)](_0x36c26[_0x521b56],_0x5dc36f);continue;case _0x5e31eb(0x554):_0x36687e=_0x3bbdc2[_0x2a2c51]!==''?JSON['parse'](_0x3bbdc2[_0x2a2c51]):[],_0x596392=_0x36687e['map'](_0x578bba=>VisuMZ[_0x5e31eb(0x26a)]({},JSON[_0x5e31eb(0x5a4)](_0x578bba)));break;default:continue;}_0x36c26[_0x521b56]=_0x596392;}}return _0x36c26;},(_0x236fed=>{const _0x31a8a8=_0x40c38a,_0x14b024=_0x236fed[_0x31a8a8(0x615)];for(const _0x52f1d4 of dependencies){if(!Imported[_0x52f1d4]){alert(_0x31a8a8(0x1f4)[_0x31a8a8(0x276)](_0x14b024,_0x52f1d4)),SceneManager[_0x31a8a8(0x2f5)]();break;}}const _0x20eb6b=_0x236fed[_0x31a8a8(0xbc)];if(_0x20eb6b['match'](/\[Version[ ](.*?)\]/i)){const _0x5edc6f=Number(RegExp['$1']);_0x5edc6f!==VisuMZ[label][_0x31a8a8(0x2f7)]&&(alert(_0x31a8a8(0x9e)['format'](_0x14b024,_0x5edc6f)),SceneManager[_0x31a8a8(0x2f5)]());}if(_0x20eb6b[_0x31a8a8(0x311)](/\[Tier[ ](\d+)\]/i)){const _0x560663=Number(RegExp['$1']);_0x560663<tier?(alert(_0x31a8a8(0x395)[_0x31a8a8(0x276)](_0x14b024,_0x560663,tier)),SceneManager[_0x31a8a8(0x2f5)]()):tier=Math[_0x31a8a8(0x3b4)](_0x560663,tier);}VisuMZ[_0x31a8a8(0x26a)](VisuMZ[label]['Settings'],_0x236fed[_0x31a8a8(0x51b)]);})(pluginData),VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x173)]={'PluginCommands':!![]},PluginManager[_0x40c38a(0x516)](pluginData[_0x40c38a(0x615)],_0x40c38a(0x470),_0x115347=>{const _0x3692e6=_0x40c38a;VisuMZ[_0x3692e6(0x26a)](_0x115347,_0x115347);const _0x2e19fe=_0x115347[_0x3692e6(0x4c6)];VisuMZ[_0x3692e6(0x606)](_0x2e19fe);}),PluginManager[_0x40c38a(0x516)](pluginData['name'],_0x40c38a(0x570),_0x167d44=>{const _0x3da0d3=_0x40c38a;VisuMZ[_0x3da0d3(0x26a)](_0x167d44,_0x167d44);const _0x969c19=_0x167d44[_0x3da0d3(0x60f)]||0x0;$gameParty[_0x3da0d3(0x557)](_0x969c19);}),PluginManager['registerCommand'](pluginData['name'],_0x40c38a(0x5fb),_0x242c93=>{const _0x44b307=_0x40c38a;VisuMZ[_0x44b307(0x26a)](_0x242c93,_0x242c93);const _0xbd03d0=_0x242c93[_0x44b307(0x1ef)]||0x1,_0xac37d1=_0x242c93['easingType']||_0x44b307(0x2a1),_0x1dbf5b=$gameScreen[_0x44b307(0x4ed)](_0xbd03d0);_0x1dbf5b&&_0x1dbf5b[_0x44b307(0x532)](_0xac37d1);}),PluginManager[_0x40c38a(0x516)](pluginData['name'],'PictureEraseAll',_0x5f05b0=>{const _0x5e2961=_0x40c38a;for(let _0x18bfdb=0x1;_0x18bfdb<=0x64;_0x18bfdb++){$gameScreen[_0x5e2961(0x178)](_0x18bfdb);}}),PluginManager['registerCommand'](pluginData[_0x40c38a(0x615)],_0x40c38a(0x6f),_0x10f2c2=>{const _0x52a975=_0x40c38a;VisuMZ[_0x52a975(0x26a)](_0x10f2c2,_0x10f2c2);const _0x2cacbb=Math[_0x52a975(0x3ba)](_0x10f2c2[_0x52a975(0x34e)],_0x10f2c2[_0x52a975(0xd0)]),_0x5ce729=Math[_0x52a975(0x3b4)](_0x10f2c2[_0x52a975(0x34e)],_0x10f2c2[_0x52a975(0xd0)]);for(let _0x3e0c2d=_0x2cacbb;_0x3e0c2d<=_0x5ce729;_0x3e0c2d++){$gameScreen[_0x52a975(0x178)](_0x3e0c2d);}}),PluginManager[_0x40c38a(0x516)](pluginData[_0x40c38a(0x615)],_0x40c38a(0x49b),_0x56baa3=>{const _0x4d2b5c=_0x40c38a;VisuMZ[_0x4d2b5c(0x26a)](_0x56baa3,_0x56baa3);const _0x27e003=_0x56baa3[_0x4d2b5c(0x255)]||'random',_0x5a1246=_0x56baa3[_0x4d2b5c(0x32d)][_0x4d2b5c(0x5d3)](0x1,0x9),_0x4ced70=_0x56baa3['Speed'][_0x4d2b5c(0x5d3)](0x1,0x9),_0x44d09d=_0x56baa3['Duration']||0x1,_0x43dfe6=_0x56baa3['Wait'];$gameScreen[_0x4d2b5c(0x2de)](_0x27e003),$gameScreen[_0x4d2b5c(0x24f)](_0x5a1246,_0x4ced70,_0x44d09d);if(_0x43dfe6){const _0x6dd70e=$gameTemp[_0x4d2b5c(0x4be)]();if(_0x6dd70e)_0x6dd70e[_0x4d2b5c(0x51f)](_0x44d09d);}}),PluginManager[_0x40c38a(0x516)](pluginData['name'],_0x40c38a(0x9a),_0x5848d9=>{const _0x4fe4c9=_0x40c38a;VisuMZ[_0x4fe4c9(0x26a)](_0x5848d9,_0x5848d9);const _0x2121d8=_0x5848d9['option']||0x1;$gameSystem[_0x4fe4c9(0x5d9)](_0x2121d8);}),PluginManager[_0x40c38a(0x516)](pluginData['name'],'SystemSetSideView',_0x160c2f=>{const _0x21b548=_0x40c38a;if($gameParty['inBattle']())return;VisuMZ[_0x21b548(0x26a)](_0x160c2f,_0x160c2f);const _0x4a3ab7=_0x160c2f[_0x21b548(0x31f)];if(_0x4a3ab7[_0x21b548(0x311)](/Front/i))$gameSystem[_0x21b548(0x609)](![]);else _0x4a3ab7[_0x21b548(0x311)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x21b548(0x609)](!$gameSystem[_0x21b548(0x11a)]());}),PluginManager['registerCommand'](pluginData[_0x40c38a(0x615)],'SystemLoadAudio',_0x205b76=>{const _0x3ff13e=_0x40c38a;if($gameParty[_0x3ff13e(0x5a6)]())return;VisuMZ[_0x3ff13e(0x26a)](_0x205b76,_0x205b76);const _0x266298=[_0x3ff13e(0x39d),_0x3ff13e(0x318),'me','se'];for(const _0x4b14fe of _0x266298){const _0x53e274=_0x205b76[_0x4b14fe],_0x430bc9=_0x3ff13e(0x3b8)[_0x3ff13e(0x276)](_0x4b14fe);for(const _0x3fc71b of _0x53e274){console[_0x3ff13e(0x427)](_0x430bc9,_0x3fc71b),AudioManager[_0x3ff13e(0x5d6)](_0x430bc9,_0x3fc71b);}}}),PluginManager[_0x40c38a(0x516)](pluginData[_0x40c38a(0x615)],_0x40c38a(0x205),_0x1f8a3b=>{const _0x5a8a3d=_0x40c38a;if($gameParty[_0x5a8a3d(0x5a6)]())return;VisuMZ[_0x5a8a3d(0x26a)](_0x1f8a3b,_0x1f8a3b);const _0x5cb6d3=[_0x5a8a3d(0xc7),_0x5a8a3d(0x219),'battlebacks2','characters',_0x5a8a3d(0x2ab),_0x5a8a3d(0x60a),_0x5a8a3d(0xb1),_0x5a8a3d(0x2db),_0x5a8a3d(0x240),_0x5a8a3d(0x15d),_0x5a8a3d(0x57a),_0x5a8a3d(0x611),_0x5a8a3d(0x451),'titles2'];for(const _0x324abe of _0x5cb6d3){const _0x2427c8=_0x1f8a3b[_0x324abe],_0x11d003=_0x5a8a3d(0x18d)[_0x5a8a3d(0x276)](_0x324abe);for(const _0x1f6a11 of _0x2427c8){ImageManager[_0x5a8a3d(0x574)](_0x11d003,_0x1f6a11);}}}),PluginManager[_0x40c38a(0x516)](pluginData[_0x40c38a(0x615)],_0x40c38a(0x2e9),_0x479246=>{const _0x15f88f=_0x40c38a;if($gameParty['inBattle']())return;VisuMZ[_0x15f88f(0x26a)](_0x479246,_0x479246);const _0x3561fa=_0x479246['option'][_0x15f88f(0xe0)]()[_0x15f88f(0x43f)](),_0x459e96=VisuMZ[_0x15f88f(0x15b)][_0x15f88f(0x34a)](_0x3561fa);$gameSystem[_0x15f88f(0x4de)](_0x459e96);}),VisuMZ['CoreEngine'][_0x40c38a(0x34a)]=function(_0x5dae09){const _0x5d5c24=_0x40c38a;_0x5dae09=_0x5dae09||_0x5d5c24(0x2fb),_0x5dae09=String(_0x5dae09)[_0x5d5c24(0xe0)]()[_0x5d5c24(0x43f)]();switch(_0x5dae09){case _0x5d5c24(0xc3):return 0x0;case'TPB\x20ACTIVE':Imported[_0x5d5c24(0x36e)]&&(ConfigManager[_0x5d5c24(0x461)]=!![]);return 0x1;case _0x5d5c24(0x60e):Imported[_0x5d5c24(0x36e)]&&(ConfigManager[_0x5d5c24(0x461)]=![]);return 0x2;case'CTB':if(Imported[_0x5d5c24(0x16b)])return _0x5d5c24(0x579);break;case _0x5d5c24(0x19a):if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x5d5c24(0x19a);break;case _0x5d5c24(0x2ae):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x5d5c24(0x2ae);break;case _0x5d5c24(0x333):if(Imported[_0x5d5c24(0x29a)])return'FTB';break;}return $dataSystem[_0x5d5c24(0x17c)];},PluginManager[_0x40c38a(0x516)](pluginData[_0x40c38a(0x615)],_0x40c38a(0xb3),_0xe3bcf5=>{const _0x128f92=_0x40c38a;VisuMZ[_0x128f92(0x26a)](_0xe3bcf5,_0xe3bcf5);const _0x40293d=_0xe3bcf5[_0x128f92(0x31f)]||0x1;$gameSystem[_0x128f92(0x3cb)](_0x40293d);}),VisuMZ['CoreEngine'][_0x40c38a(0x151)]=Scene_Boot[_0x40c38a(0x32c)]['onDatabaseLoaded'],Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x298)]=function(){const _0x527229=_0x40c38a;VisuMZ[_0x527229(0x15b)][_0x527229(0x151)][_0x527229(0xb5)](this),this[_0x527229(0x6d)](),this[_0x527229(0x20e)](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x527229(0x5fa)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x527229(0x45d)]();},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x71)]={},Scene_Boot['prototype'][_0x40c38a(0x6d)]=function(){const _0x325279=_0x40c38a,_0x398194=[_0x325279(0x489),_0x325279(0x5d4),_0x325279(0x5d8),_0x325279(0x201),_0x325279(0x5ac),_0x325279(0x16a),_0x325279(0x29c),_0x325279(0xe7)],_0xda34e6=[_0x325279(0x53a),'EVA','CRI',_0x325279(0x1e1),_0x325279(0x359),_0x325279(0xf6),_0x325279(0x2cd),_0x325279(0x465),_0x325279(0x57c),_0x325279(0x1c2)],_0x440963=[_0x325279(0x5bd),_0x325279(0x4f6),_0x325279(0x4fd),_0x325279(0x4db),'MCR',_0x325279(0x2d0),_0x325279(0x35a),_0x325279(0x309),_0x325279(0x19e),'EXR'],_0x253846=[_0x398194,_0xda34e6,_0x440963],_0x448a81=[_0x325279(0x1b0),_0x325279(0xe6),'Plus2','Max',_0x325279(0x43c),_0x325279(0xd7),_0x325279(0x3fc),_0x325279(0x580),'Flat1',_0x325279(0x5c1)];for(const _0x5e4481 of _0x253846){let _0xeb0430='';if(_0x5e4481===_0x398194)_0xeb0430=_0x325279(0x547);if(_0x5e4481===_0xda34e6)_0xeb0430=_0x325279(0xab);if(_0x5e4481===_0x440963)_0xeb0430=_0x325279(0x476);for(const _0x20a914 of _0x448a81){let _0x856050=_0x325279(0x78)['format'](_0xeb0430,_0x20a914);VisuMZ['CoreEngine'][_0x325279(0x71)][_0x856050]=[],VisuMZ[_0x325279(0x15b)]['RegExp'][_0x856050+'JS']=[];let _0x29906f=_0x325279(0x53c);if([_0x325279(0x1b0),_0x325279(0x580)]['includes'](_0x20a914))_0x29906f+=_0x325279(0x598);else{if([_0x325279(0xe6),_0x325279(0x2f6)][_0x325279(0x5dd)](_0x20a914))_0x29906f+=_0x325279(0xa7);else{if([_0x325279(0x25a),'Flat2'][_0x325279(0x5dd)](_0x20a914))_0x29906f+=_0x325279(0x4a9);else{if(_0x20a914===_0x325279(0x2cb))_0x29906f+=_0x325279(0x5c2);else{if(_0x20a914===_0x325279(0xd7))_0x29906f+=_0x325279(0x3c6);else _0x20a914===_0x325279(0x3fc)&&(_0x29906f+=_0x325279(0x22b));}}}}for(const _0x2b2676 of _0x5e4481){let _0x541414=_0x20a914[_0x325279(0x1ee)](/[\d+]/g,'')[_0x325279(0xe0)]();const _0x1da229=_0x29906f[_0x325279(0x276)](_0x2b2676,_0x541414);VisuMZ['CoreEngine'][_0x325279(0x71)][_0x856050][_0x325279(0x127)](new RegExp(_0x1da229,'i'));const _0x486ad3=_0x325279(0x440)[_0x325279(0x276)](_0x2b2676,_0x541414);VisuMZ['CoreEngine']['RegExp'][_0x856050+'JS'][_0x325279(0x127)](new RegExp(_0x486ad3,'i'));}}}},Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x20e)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Settings']=function(){const _0x5f3a84=_0x40c38a;VisuMZ[_0x5f3a84(0x15b)][_0x5f3a84(0x3a9)]['QoL'][_0x5f3a84(0x4bf)]&&VisuMZ['ShowDevTools'](!![]);VisuMZ[_0x5f3a84(0x15b)]['Settings']['QoL'][_0x5f3a84(0x4b2)]&&(Input['keyMapper'][0x23]=_0x5f3a84(0x387),Input[_0x5f3a84(0xc8)][0x24]=_0x5f3a84(0x3ed));if(VisuMZ[_0x5f3a84(0x15b)][_0x5f3a84(0x3a9)][_0x5f3a84(0x14b)]){const _0x1c5edd=VisuMZ['CoreEngine'][_0x5f3a84(0x3a9)][_0x5f3a84(0x14b)];_0x1c5edd[_0x5f3a84(0xa6)]=_0x1c5edd[_0x5f3a84(0xa6)]||'\x5c}❪SHIFT❫\x5c{',_0x1c5edd[_0x5f3a84(0x87)]=_0x1c5edd[_0x5f3a84(0x87)]||_0x5f3a84(0x47a);}VisuMZ[_0x5f3a84(0x15b)][_0x5f3a84(0x3a9)][_0x5f3a84(0x618)][_0x5f3a84(0x3fe)]&&(Input[_0x5f3a84(0xc8)][0x57]='up',Input[_0x5f3a84(0xc8)][0x41]=_0x5f3a84(0x1eb),Input[_0x5f3a84(0xc8)][0x53]=_0x5f3a84(0x357),Input[_0x5f3a84(0xc8)][0x44]='right',Input['keyMapper'][0x45]=_0x5f3a84(0x294)),VisuMZ['CoreEngine'][_0x5f3a84(0x3a9)][_0x5f3a84(0x618)]['DashToggleR']&&(Input[_0x5f3a84(0xc8)][0x52]=_0x5f3a84(0x38e));},Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x5fa)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x353)]=function(){const _0x3a735e=_0x40c38a,_0x316548=VisuMZ[_0x3a735e(0x15b)]['Settings']['jsQuickFunc'];for(const _0x2fdfd0 of _0x316548){const _0x6b1411=_0x2fdfd0['FunctionName'][_0x3a735e(0x1ee)](/[ ]/g,''),_0x16c99d=_0x2fdfd0['CodeJS'];VisuMZ['CoreEngine'][_0x3a735e(0x337)](_0x6b1411,_0x16c99d);}},VisuMZ[_0x40c38a(0x15b)]['createJsQuickFunction']=function(_0x50c71b,_0x2e2102){const _0x1b777e=_0x40c38a;if(!!window[_0x50c71b]){if($gameTemp[_0x1b777e(0xe4)]())console[_0x1b777e(0x427)](_0x1b777e(0x33f)[_0x1b777e(0x276)](_0x50c71b));}const _0x3cfe05=_0x1b777e(0x190)[_0x1b777e(0x276)](_0x50c71b,_0x2e2102);window[_0x50c71b]=new Function(_0x3cfe05);},Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x575)]=function(){const _0x34e410=_0x40c38a,_0x4628fb=VisuMZ[_0x34e410(0x15b)]['Settings'][_0x34e410(0x139)];if(!_0x4628fb)return;for(const _0x5b2145 of _0x4628fb){if(!_0x5b2145)continue;VisuMZ[_0x34e410(0x15b)][_0x34e410(0x581)](_0x5b2145);}},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x4d8)]={},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1d0)]={},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5e8)]={},VisuMZ['CoreEngine']['CustomParamAbb']={},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x581)]=function(_0x37ac81){const _0x3c4e89=_0x40c38a,_0x3dfdd7=_0x37ac81[_0x3c4e89(0x50d)],_0x3c701e=_0x37ac81[_0x3c4e89(0x5cf)],_0x5f2bff=_0x37ac81[_0x3c4e89(0x5c7)],_0x3c33ae=_0x37ac81[_0x3c4e89(0x255)],_0x908e08=new Function(_0x37ac81[_0x3c4e89(0x208)]);VisuMZ[_0x3c4e89(0x15b)][_0x3c4e89(0x4d8)][_0x3dfdd7[_0x3c4e89(0xe0)]()[_0x3c4e89(0x43f)]()]=_0x3c701e,VisuMZ[_0x3c4e89(0x15b)][_0x3c4e89(0x1d0)][_0x3dfdd7[_0x3c4e89(0xe0)]()[_0x3c4e89(0x43f)]()]=_0x5f2bff,VisuMZ[_0x3c4e89(0x15b)][_0x3c4e89(0x5e8)][_0x3dfdd7['toUpperCase']()[_0x3c4e89(0x43f)]()]=_0x3c33ae,VisuMZ[_0x3c4e89(0x15b)]['CustomParamAbb'][_0x3dfdd7[_0x3c4e89(0xe0)]()['trim']()]=_0x3dfdd7,Object[_0x3c4e89(0x4cc)](Game_BattlerBase['prototype'],_0x3dfdd7,{'get'(){const _0x26bc3d=_0x3c4e89,_0xa6b4ea=_0x908e08[_0x26bc3d(0xb5)](this);return _0x3c33ae===_0x26bc3d(0xcd)?Math['round'](_0xa6b4ea):_0xa6b4ea;}});},VisuMZ[_0x40c38a(0x45d)]=function(){const _0x53b6aa=_0x40c38a;for(const _0x4db444 of $dataActors){if(_0x4db444)VisuMZ[_0x53b6aa(0x95)](_0x4db444);}for(const _0x1cca0d of $dataClasses){if(_0x1cca0d)VisuMZ[_0x53b6aa(0x363)](_0x1cca0d);}for(const _0x6ee63a of $dataSkills){if(_0x6ee63a)VisuMZ[_0x53b6aa(0x4f0)](_0x6ee63a);}for(const _0x5c3914 of $dataItems){if(_0x5c3914)VisuMZ[_0x53b6aa(0x1b5)](_0x5c3914);}for(const _0x4e9809 of $dataWeapons){if(_0x4e9809)VisuMZ['ParseWeaponNotetags'](_0x4e9809);}for(const _0xd586c5 of $dataArmors){if(_0xd586c5)VisuMZ[_0x53b6aa(0x52a)](_0xd586c5);}for(const _0xc41de9 of $dataEnemies){if(_0xc41de9)VisuMZ[_0x53b6aa(0x52c)](_0xc41de9);}for(const _0x418a41 of $dataStates){if(_0x418a41)VisuMZ['ParseStateNotetags'](_0x418a41);}for(const _0x3537fa of $dataTilesets){if(_0x3537fa)VisuMZ[_0x53b6aa(0x17a)](_0x3537fa);}},VisuMZ[_0x40c38a(0x95)]=function(_0x19ad03){},VisuMZ[_0x40c38a(0x363)]=function(_0x5bf4f1){},VisuMZ[_0x40c38a(0x4f0)]=function(_0x57283e){},VisuMZ[_0x40c38a(0x1b5)]=function(_0x1fb420){},VisuMZ[_0x40c38a(0x368)]=function(_0x43483a){},VisuMZ[_0x40c38a(0x52a)]=function(_0x428186){},VisuMZ[_0x40c38a(0x52c)]=function(_0x357db5){},VisuMZ[_0x40c38a(0x2c3)]=function(_0x26f844){},VisuMZ[_0x40c38a(0x17a)]=function(_0x1de21d){},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x95)]=VisuMZ[_0x40c38a(0x95)],VisuMZ[_0x40c38a(0x95)]=function(_0x43ca04){const _0x568be0=_0x40c38a;VisuMZ[_0x568be0(0x15b)][_0x568be0(0x95)][_0x568be0(0xb5)](this,_0x43ca04);const _0x11a9d7=_0x43ca04[_0x568be0(0x5e7)];if(_0x11a9d7[_0x568be0(0x311)](/<MAX LEVEL:[ ](\d+)>/i)){_0x43ca04[_0x568be0(0xd3)]=Number(RegExp['$1']);if(_0x43ca04[_0x568be0(0xd3)]===0x0)_0x43ca04['maxLevel']=Number[_0x568be0(0x262)];}_0x11a9d7[_0x568be0(0x311)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x43ca04[_0x568be0(0x110)]=Math[_0x568be0(0x3ba)](Number(RegExp['$1']),_0x43ca04['maxLevel']));},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x363)]=VisuMZ[_0x40c38a(0x363)],VisuMZ[_0x40c38a(0x363)]=function(_0xc28e41){const _0x44d8b9=_0x40c38a;VisuMZ[_0x44d8b9(0x15b)][_0x44d8b9(0x363)][_0x44d8b9(0xb5)](this,_0xc28e41);if(_0xc28e41[_0x44d8b9(0x3ab)])for(const _0x14cb46 of _0xc28e41['learnings']){_0x14cb46['note'][_0x44d8b9(0x311)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x14cb46[_0x44d8b9(0x586)]=Math[_0x44d8b9(0x3b4)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x52c)]=VisuMZ[_0x40c38a(0x52c)],VisuMZ[_0x40c38a(0x52c)]=function(_0xec8b57){const _0x330ea7=_0x40c38a;VisuMZ[_0x330ea7(0x15b)][_0x330ea7(0x52c)][_0x330ea7(0xb5)](this,_0xec8b57),_0xec8b57['level']=0x1;const _0x54c6cc=_0xec8b57['note'];if(_0x54c6cc[_0x330ea7(0x311)](/<LEVEL:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x586)]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<MAXHP:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x3db)][0x0]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<MAXMP:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x3db)][0x1]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<ATK:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x3db)][0x2]=Number(RegExp['$1']);if(_0x54c6cc['match'](/<DEF:[ ](\d+)>/i))_0xec8b57['params'][0x3]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<MAT:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x3db)][0x4]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<MDF:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x3db)][0x5]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<AGI:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x3db)][0x6]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<LUK:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0x3db)][0x7]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<EXP:[ ](\d+)>/i))_0xec8b57[_0x330ea7(0xbb)]=Number(RegExp['$1']);if(_0x54c6cc[_0x330ea7(0x311)](/<GOLD:[ ](\d+)>/i))_0xec8b57['gold']=Number(RegExp['$1']);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0xf5)]=Graphics[_0x40c38a(0x5fc)],Graphics[_0x40c38a(0x5fc)]=function(){const _0x99fb8=_0x40c38a;switch(VisuMZ[_0x99fb8(0x15b)]['Settings'][_0x99fb8(0x558)][_0x99fb8(0x1d1)]){case'stretch':return!![];case _0x99fb8(0x499):return![];default:return VisuMZ['CoreEngine']['Graphics_defaultStretchMode'][_0x99fb8(0xb5)](this);}},VisuMZ['CoreEngine'][_0x40c38a(0x5a0)]=Graphics[_0x40c38a(0x9f)],Graphics[_0x40c38a(0x9f)]=function(_0x29eb90,_0xf89ff7,_0x350f8d=null){const _0x4594eb=_0x40c38a;VisuMZ[_0x4594eb(0x15b)]['Graphics_printError'][_0x4594eb(0xb5)](this,_0x29eb90,_0xf89ff7,_0x350f8d),VisuMZ[_0x4594eb(0x350)](![]);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5ae)]=Graphics[_0x40c38a(0x2fd)],Graphics[_0x40c38a(0x2fd)]=function(_0x10b1e2){const _0x4aaa7e=_0x40c38a;VisuMZ[_0x4aaa7e(0x15b)][_0x4aaa7e(0x5ae)][_0x4aaa7e(0xb5)](this,_0x10b1e2),this[_0x4aaa7e(0x371)](_0x10b1e2);},Graphics[_0x40c38a(0x371)]=function(_0x4a84ba){const _0x52b8e2=_0x40c38a;VisuMZ[_0x52b8e2(0x15b)][_0x52b8e2(0x3a9)][_0x52b8e2(0x558)][_0x52b8e2(0x293)]&&(_0x4a84ba[_0x52b8e2(0x472)][_0x52b8e2(0x231)]=_0x52b8e2(0x14c));VisuMZ[_0x52b8e2(0x15b)]['Settings'][_0x52b8e2(0x558)][_0x52b8e2(0xf8)]&&(_0x4a84ba['style'][_0x52b8e2(0x5fe)]=_0x52b8e2(0xea));const _0x409a59=Math[_0x52b8e2(0x3b4)](0x0,Math[_0x52b8e2(0x119)](_0x4a84ba[_0x52b8e2(0x179)]*this['_realScale'])),_0xdcdae7=Math['max'](0x0,Math['floor'](_0x4a84ba['height']*this['_realScale']));_0x4a84ba[_0x52b8e2(0x472)][_0x52b8e2(0x179)]=_0x409a59+'px',_0x4a84ba[_0x52b8e2(0x472)][_0x52b8e2(0x13e)]=_0xdcdae7+'px';},Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x479)]=function(){this['_customModified']=!![];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x22c)]=Sprite[_0x40c38a(0x32c)][_0x40c38a(0x277)],Sprite[_0x40c38a(0x32c)][_0x40c38a(0x277)]=function(){const _0x1954ce=_0x40c38a;VisuMZ[_0x1954ce(0x15b)][_0x1954ce(0x22c)][_0x1954ce(0xb5)](this),this[_0x1954ce(0x468)]();},Sprite[_0x40c38a(0x32c)][_0x40c38a(0x468)]=function(){const _0x12e6fb=_0x40c38a;if(!this['bitmap'])return;if(!this[_0x12e6fb(0x3ff)]['_customModified'])return;this['bitmap']['_baseTexture']&&!this[_0x12e6fb(0x4d4)][_0x12e6fb(0x14e)][_0x12e6fb(0x3e2)]&&this[_0x12e6fb(0x3ff)]['destroy']();},VisuMZ['CoreEngine'][_0x40c38a(0x3fb)]=Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x59d)],Bitmap[_0x40c38a(0x32c)]['resize']=function(_0x3409fb,_0x3bd061){const _0x60481c=_0x40c38a;VisuMZ[_0x60481c(0x15b)][_0x60481c(0x3fb)][_0x60481c(0xb5)](this,_0x3409fb,_0x3bd061),this[_0x60481c(0x479)]();},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x4f9)]=Bitmap['prototype'][_0x40c38a(0x381)],Bitmap['prototype']['blt']=function(_0xe4adbf,_0x5151b7,_0x58e4f9,_0xa2f9df,_0x3bffc7,_0x4757fc,_0xa19e5c,_0x11d957,_0x411d3a){const _0x231361=_0x40c38a;VisuMZ[_0x231361(0x15b)][_0x231361(0x4f9)][_0x231361(0xb5)](this,_0xe4adbf,_0x5151b7,_0x58e4f9,_0xa2f9df,_0x3bffc7,_0x4757fc,_0xa19e5c,_0x11d957,_0x411d3a),this[_0x231361(0x479)]();},VisuMZ[_0x40c38a(0x15b)]['Bitmap_clearRect']=Bitmap['prototype'][_0x40c38a(0x4d2)],Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x4d2)]=function(_0x3a924e,_0x3e432a,_0x4aa987,_0x2ef962){const _0x29be56=_0x40c38a;VisuMZ[_0x29be56(0x15b)][_0x29be56(0x27f)]['call'](this,_0x3a924e,_0x3e432a,_0x4aa987,_0x2ef962),this[_0x29be56(0x479)]();},VisuMZ['CoreEngine'][_0x40c38a(0x507)]=Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x19d)],Bitmap[_0x40c38a(0x32c)]['fillRect']=function(_0x551e44,_0x1bd64c,_0x40e61c,_0x5e2ed7,_0x102829){const _0xdcb94c=_0x40c38a;VisuMZ['CoreEngine'][_0xdcb94c(0x507)][_0xdcb94c(0xb5)](this,_0x551e44,_0x1bd64c,_0x40e61c,_0x5e2ed7,_0x102829),this[_0xdcb94c(0x479)]();},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x47f)]=Bitmap['prototype']['strokeRect'],Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x4f1)]=function(_0x369592,_0x2a2e3a,_0x1493af,_0x4f170b,_0x1c062e){const _0x159776=_0x40c38a;VisuMZ['CoreEngine'][_0x159776(0x47f)][_0x159776(0xb5)](this,_0x369592,_0x2a2e3a,_0x1493af,_0x4f170b,_0x1c062e),this['markCoreEngineModified']();},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x31c)]=Bitmap['prototype'][_0x40c38a(0x4af)],Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x4af)]=function(_0x3f6067,_0x160b11,_0x2bb1ae,_0xd9f150,_0x3d2f14,_0x5a73e7,_0x10d9af){const _0xeabaf0=_0x40c38a;VisuMZ['CoreEngine'][_0xeabaf0(0x31c)][_0xeabaf0(0xb5)](this,_0x3f6067,_0x160b11,_0x2bb1ae,_0xd9f150,_0x3d2f14,_0x5a73e7,_0x10d9af),this['markCoreEngineModified']();},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1a9)]=Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x501)],Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x501)]=function(_0x10762e,_0x2dcf00,_0x1ac248,_0x22ffc4){const _0x536408=_0x40c38a;_0x10762e=Math['round'](_0x10762e),_0x2dcf00=Math[_0x536408(0x239)](_0x2dcf00),_0x1ac248=Math[_0x536408(0x239)](_0x1ac248),VisuMZ[_0x536408(0x15b)][_0x536408(0x1a9)][_0x536408(0xb5)](this,_0x10762e,_0x2dcf00,_0x1ac248,_0x22ffc4),this[_0x536408(0x479)]();},VisuMZ[_0x40c38a(0x15b)]['Bitmap_measureTextWidth']=Bitmap[_0x40c38a(0x32c)]['measureTextWidth'],Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x40e)]=function(_0x298630){const _0x47121b=_0x40c38a;return Math['round'](VisuMZ[_0x47121b(0x15b)][_0x47121b(0x34c)][_0x47121b(0xb5)](this,_0x298630));},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x434)]=Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x2a9)],Bitmap[_0x40c38a(0x32c)]['drawText']=function(_0x4aac59,_0x43fed6,_0x3a8835,_0x5ef0bf,_0x1a76bf,_0x258761){const _0x198cd9=_0x40c38a;_0x43fed6=Math[_0x198cd9(0x239)](_0x43fed6),_0x3a8835=Math[_0x198cd9(0x239)](_0x3a8835),_0x5ef0bf=Math[_0x198cd9(0x239)](_0x5ef0bf),_0x1a76bf=Math[_0x198cd9(0x239)](_0x1a76bf),VisuMZ[_0x198cd9(0x15b)]['Bitmap_drawText']['call'](this,_0x4aac59,_0x43fed6,_0x3a8835,_0x5ef0bf,_0x1a76bf,_0x258761),this[_0x198cd9(0x479)]();},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x4f8)]=Bitmap['prototype'][_0x40c38a(0x455)],Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x455)]=function(_0x139333,_0x2eed02,_0x1ef81d,_0x1f6cc0){const _0x4eb7c1=_0x40c38a;VisuMZ['CoreEngine'][_0x4eb7c1(0x3a9)][_0x4eb7c1(0x558)][_0x4eb7c1(0x364)]?this[_0x4eb7c1(0x25c)](_0x139333,_0x2eed02,_0x1ef81d,_0x1f6cc0):VisuMZ[_0x4eb7c1(0x15b)][_0x4eb7c1(0x4f8)][_0x4eb7c1(0xb5)](this,_0x139333,_0x2eed02,_0x1ef81d,_0x1f6cc0);},Bitmap[_0x40c38a(0x32c)][_0x40c38a(0x25c)]=function(_0x208a6f,_0x5dccc6,_0x489840,_0x30c8fc){const _0x428255=_0x40c38a,_0x42451e=this['context'];_0x42451e[_0x428255(0x5eb)]=this[_0x428255(0x612)],_0x42451e[_0x428255(0x35f)](_0x208a6f,_0x5dccc6+0x2,_0x489840+0x2,_0x30c8fc);},VisuMZ['CoreEngine'][_0x40c38a(0x1c4)]=Input[_0x40c38a(0x32f)],Input[_0x40c38a(0x32f)]=function(){const _0x29c377=_0x40c38a;VisuMZ[_0x29c377(0x15b)][_0x29c377(0x1c4)][_0x29c377(0xb5)](this),this[_0x29c377(0xef)]=undefined,this[_0x29c377(0x5cd)]=undefined,this['_gamepadWait']=Input[_0x29c377(0x12f)];},VisuMZ[_0x40c38a(0x15b)]['Input_update']=Input[_0x40c38a(0x4df)],Input['update']=function(){const _0x5ab949=_0x40c38a;VisuMZ['CoreEngine']['Input_update']['call'](this);if(this['_gamepadWait'])this[_0x5ab949(0x493)]--;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3e5)]=Input[_0x40c38a(0x4aa)],Input['_pollGamepads']=function(){const _0x11f708=_0x40c38a;if(this[_0x11f708(0x493)])return;VisuMZ[_0x11f708(0x15b)][_0x11f708(0x3e5)][_0x11f708(0xb5)](this);},VisuMZ['CoreEngine']['Input_setupEventHandlers']=Input[_0x40c38a(0x114)],Input[_0x40c38a(0x114)]=function(){const _0x28bbd6=_0x40c38a;VisuMZ[_0x28bbd6(0x15b)][_0x28bbd6(0x58c)][_0x28bbd6(0xb5)](this),document['addEventListener'](_0x28bbd6(0x5d0),this[_0x28bbd6(0x2f3)][_0x28bbd6(0x271)](this));},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x237)]=Input[_0x40c38a(0x176)],Input['_onKeyDown']=function(_0x5db17b){const _0x154702=_0x40c38a;this[_0x154702(0x5cd)]=_0x5db17b['keyCode'],VisuMZ[_0x154702(0x15b)][_0x154702(0x237)][_0x154702(0xb5)](this,_0x5db17b);},Input[_0x40c38a(0x2f3)]=function(_0x3107fa){const _0x41168a=_0x40c38a;this[_0x41168a(0x5cb)](_0x3107fa);},Input['_registerKeyInput']=function(_0x10923c){const _0xba176c=_0x40c38a;this['_inputSpecialKeyCode']=_0x10923c[_0xba176c(0x3bd)];let _0x4436a1=String[_0xba176c(0x274)](_0x10923c[_0xba176c(0x4ea)]);this[_0xba176c(0xef)]===undefined?this[_0xba176c(0xef)]=_0x4436a1:this[_0xba176c(0xef)]+=_0x4436a1;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x43a)]=Input['_shouldPreventDefault'],Input['_shouldPreventDefault']=function(_0x480976){const _0x959f1=_0x40c38a;if(_0x480976===0x8)return![];return VisuMZ['CoreEngine']['Input_shouldPreventDefault'][_0x959f1(0xb5)](this,_0x480976);},Input[_0x40c38a(0x4a5)]=function(_0x3aa181){const _0x25e32a=_0x40c38a;if(_0x3aa181[_0x25e32a(0x311)](/backspace/i))return this[_0x25e32a(0x5cd)]===0x8;if(_0x3aa181[_0x25e32a(0x311)](/enter/i))return this[_0x25e32a(0x5cd)]===0xd;if(_0x3aa181[_0x25e32a(0x311)](/escape/i))return this[_0x25e32a(0x5cd)]===0x1b;},Input[_0x40c38a(0x3c3)]=function(){const _0x4664af=_0x40c38a;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x4664af(0x5cd)]);},Input[_0x40c38a(0x5f4)]=function(){const _0x242388=_0x40c38a;return[0x25,0x26,0x27,0x28][_0x242388(0x349)](this[_0x242388(0x5cd)]);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x75)]=Tilemap[_0x40c38a(0x32c)][_0x40c38a(0x361)],Tilemap[_0x40c38a(0x32c)]['_addShadow']=function(_0x4096b0,_0x2f14be,_0x49273c,_0x593930){const _0x3ae755=_0x40c38a;if($gameMap&&$gameMap[_0x3ae755(0x568)]())return;VisuMZ['CoreEngine']['Tilemap_addShadow']['call'](this,_0x4096b0,_0x2f14be,_0x49273c,_0x593930);},Tilemap[_0x40c38a(0x51e)][_0x40c38a(0x32c)][_0x40c38a(0xc0)]=function(){const _0x1d70d2=_0x40c38a;this[_0x1d70d2(0x22d)]();for(let _0x260d60=0x0;_0x260d60<Tilemap['Layer'][_0x1d70d2(0x523)];_0x260d60++){const _0x2396cd=new PIXI[(_0x1d70d2(0x1fe))]();_0x2396cd['setSize'](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0x1d70d2(0x558)]['PixelateImageRendering']&&(_0x2396cd['scaleMode']=PIXI[_0x1d70d2(0x290)][_0x1d70d2(0x236)]),this[_0x1d70d2(0x33c)][_0x1d70d2(0x127)](_0x2396cd);}},WindowLayer[_0x40c38a(0x32c)]['isMaskingEnabled']=function(){const _0x42b42a=_0x40c38a;return SceneManager&&SceneManager[_0x42b42a(0x44e)]?SceneManager[_0x42b42a(0x44e)][_0x42b42a(0x15f)]():!![];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5c8)]=WindowLayer[_0x40c38a(0x32c)][_0x40c38a(0x48a)],WindowLayer[_0x40c38a(0x32c)][_0x40c38a(0x48a)]=function render(_0x521f70){const _0x41abfa=_0x40c38a;this['isMaskingEnabled']()?VisuMZ[_0x41abfa(0x15b)][_0x41abfa(0x5c8)][_0x41abfa(0xb5)](this,_0x521f70):this[_0x41abfa(0x165)](_0x521f70);},WindowLayer[_0x40c38a(0x32c)]['renderNoMask']=function render(_0x436469){const _0x691272=_0x40c38a;if(!this['visible'])return;const _0xae1478=new PIXI[(_0x691272(0x3da))](),_0xb5c50f=_0x436469['gl'],_0x4cbf7c=this[_0x691272(0x159)]['clone']();_0x436469['framebuffer']['forceStencil'](),_0xae1478[_0x691272(0x5f1)]=this[_0x691272(0x5f1)],_0x436469[_0x691272(0xb8)][_0x691272(0x24a)](),_0xb5c50f[_0x691272(0x1ab)](_0xb5c50f[_0x691272(0x192)]);while(_0x4cbf7c[_0x691272(0x4b7)]>0x0){const _0x464a8b=_0x4cbf7c['shift']();_0x464a8b['_isWindow']&&_0x464a8b[_0x691272(0x273)]&&_0x464a8b[_0x691272(0x11e)]>0x0&&(_0xb5c50f[_0x691272(0x85)](_0xb5c50f[_0x691272(0x1ce)],0x0,~0x0),_0xb5c50f[_0x691272(0x2c5)](_0xb5c50f[_0x691272(0x100)],_0xb5c50f[_0x691272(0x100)],_0xb5c50f[_0x691272(0x100)]),_0x464a8b[_0x691272(0x48a)](_0x436469),_0x436469[_0x691272(0xb8)]['flush'](),_0xae1478[_0x691272(0x32f)](),_0xb5c50f['stencilFunc'](_0xb5c50f[_0x691272(0x5de)],0x1,~0x0),_0xb5c50f[_0x691272(0x2c5)](_0xb5c50f['REPLACE'],_0xb5c50f['REPLACE'],_0xb5c50f[_0x691272(0x21c)]),_0xb5c50f[_0x691272(0x2cc)](_0xb5c50f[_0x691272(0x54b)],_0xb5c50f[_0x691272(0x5ca)]),_0xae1478[_0x691272(0x48a)](_0x436469),_0x436469[_0x691272(0xb8)]['flush'](),_0xb5c50f[_0x691272(0x2cc)](_0xb5c50f[_0x691272(0x5ca)],_0xb5c50f[_0x691272(0x2c6)]));}_0xb5c50f[_0x691272(0xbf)](_0xb5c50f['STENCIL_TEST']),_0xb5c50f[_0x691272(0x32f)](_0xb5c50f[_0x691272(0xfb)]),_0xb5c50f[_0x691272(0x28f)](0x0),_0x436469[_0x691272(0xb8)][_0x691272(0x24a)]();for(const _0x4bd579 of this['children']){!_0x4bd579['_isWindow']&&_0x4bd579['visible']&&_0x4bd579[_0x691272(0x48a)](_0x436469);}_0x436469[_0x691272(0xb8)][_0x691272(0x24a)]();},DataManager[_0x40c38a(0xcc)]=function(_0x202fe6){const _0x59e94e=_0x40c38a;return this[_0x59e94e(0x46f)](_0x202fe6)&&_0x202fe6[_0x59e94e(0x249)]===0x2;},VisuMZ[_0x40c38a(0x15b)]['DataManager_setupNewGame']=DataManager[_0x40c38a(0x4b8)],DataManager[_0x40c38a(0x4b8)]=function(){const _0x42e76a=_0x40c38a;VisuMZ[_0x42e76a(0x15b)]['DataManager_setupNewGame'][_0x42e76a(0xb5)](this),this[_0x42e76a(0x480)](),this[_0x42e76a(0x407)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x25d652=_0x40c38a;if($gameTemp['isPlaytest']()){const _0x5443fb=VisuMZ['CoreEngine'][_0x25d652(0x3a9)][_0x25d652(0x558)][_0x25d652(0x4b6)];if(_0x5443fb>0x0)$gameTemp['reserveCommonEvent'](_0x5443fb);}},DataManager[_0x40c38a(0x407)]=function(){const _0x591175=_0x40c38a,_0x22d611=VisuMZ['CoreEngine'][_0x591175(0x3a9)][_0x591175(0x558)][_0x591175(0x36f)]||0x0;if(_0x22d611>0x0)$gameTemp[_0x591175(0x120)](_0x22d611);},TextManager[_0x40c38a(0x248)]=['','','',_0x40c38a(0x21d),'','',_0x40c38a(0x141),'','BACKSPACE',_0x40c38a(0x247),'','',_0x40c38a(0x156),'ENTER',_0x40c38a(0x3b6),'',_0x40c38a(0x378),_0x40c38a(0x14d),'ALT',_0x40c38a(0x607),_0x40c38a(0x3d1),_0x40c38a(0x216),_0x40c38a(0x5f0),_0x40c38a(0x564),_0x40c38a(0x22e),_0x40c38a(0x593),'',_0x40c38a(0x325),'CONVERT',_0x40c38a(0x54e),'ACCEPT',_0x40c38a(0x3e1),_0x40c38a(0x55e),'PGUP','PGDN','END',_0x40c38a(0xce),_0x40c38a(0x2a8),'UP',_0x40c38a(0x2c8),'DOWN',_0x40c38a(0x2e4),_0x40c38a(0x553),_0x40c38a(0x2f9),_0x40c38a(0x96),_0x40c38a(0x4ef),_0x40c38a(0xaa),'','0','1','2','3','4','5','6','7','8','9',_0x40c38a(0x401),_0x40c38a(0x4d3),_0x40c38a(0x1e7),'EQUALS','GREATER_THAN',_0x40c38a(0x17d),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x40c38a(0x41b),'',_0x40c38a(0x33b),'',_0x40c38a(0x4b3),_0x40c38a(0x1ff),_0x40c38a(0x161),_0x40c38a(0x344),'NUMPAD3','NUMPAD4',_0x40c38a(0x563),_0x40c38a(0x58f),'NUMPAD7',_0x40c38a(0x2d5),'NUMPAD9',_0x40c38a(0x29b),_0x40c38a(0x2e3),_0x40c38a(0x32a),_0x40c38a(0x89),_0x40c38a(0x31e),_0x40c38a(0x5e9),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x40c38a(0x302),_0x40c38a(0x301),_0x40c38a(0x590),_0x40c38a(0x4e5),_0x40c38a(0x462),_0x40c38a(0x3d6),_0x40c38a(0x15c),_0x40c38a(0x2b8),_0x40c38a(0xac),_0x40c38a(0x286),_0x40c38a(0x45f),_0x40c38a(0x3bb),_0x40c38a(0x408),_0x40c38a(0x43e),_0x40c38a(0xb0),'','','','','','','','',_0x40c38a(0x617),_0x40c38a(0x128),_0x40c38a(0xc5),_0x40c38a(0x538),'WIN_OEM_FJ_TOUROKU',_0x40c38a(0x60d),_0x40c38a(0x460),'','','','','','','','','',_0x40c38a(0x254),_0x40c38a(0x332),_0x40c38a(0x17f),_0x40c38a(0x1d2),_0x40c38a(0x1c1),_0x40c38a(0x5b7),_0x40c38a(0x4ac),'UNDERSCORE',_0x40c38a(0x36b),_0x40c38a(0x212),_0x40c38a(0x3fd),'PLUS',_0x40c38a(0x1ae),_0x40c38a(0xa9),_0x40c38a(0x20c),'CLOSE_CURLY_BRACKET','TILDE','','','','',_0x40c38a(0x2ea),_0x40c38a(0x486),'VOLUME_UP','','',_0x40c38a(0x4d3),_0x40c38a(0xe8),_0x40c38a(0x556),'MINUS',_0x40c38a(0x39e),_0x40c38a(0xae),_0x40c38a(0x5e3),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x40c38a(0x5af),_0x40c38a(0x424),'CLOSE_BRACKET','QUOTE','',_0x40c38a(0x10c),'ALTGR','','WIN_ICO_HELP',_0x40c38a(0x174),'',_0x40c38a(0x2b3),'','',_0x40c38a(0x241),_0x40c38a(0xba),_0x40c38a(0x1a3),_0x40c38a(0x42b),'WIN_OEM_PA3','WIN_OEM_WSCTRL',_0x40c38a(0x183),_0x40c38a(0x11b),'WIN_OEM_FINISH',_0x40c38a(0x267),'WIN_OEM_AUTO',_0x40c38a(0x324),_0x40c38a(0x341),_0x40c38a(0x588),_0x40c38a(0x40a),_0x40c38a(0x230),_0x40c38a(0x297),_0x40c38a(0x334),'ZOOM','','PA1','WIN_OEM_CLEAR',''],TextManager[_0x40c38a(0x46b)]=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)]['ButtonAssist']['OkText'],TextManager[_0x40c38a(0x514)]=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)][_0x40c38a(0x14b)]['CancelText'],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine']['Settings'][_0x40c38a(0x14b)][_0x40c38a(0x54c)],VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3c2)]=TextManager[_0x40c38a(0x547)],TextManager[_0x40c38a(0x547)]=function(_0x2dd804){const _0x5146ee=_0x40c38a;return typeof _0x2dd804===_0x5146ee(0x56b)?VisuMZ[_0x5146ee(0x15b)][_0x5146ee(0x3c2)]['call'](this,_0x2dd804):this['paramName'](_0x2dd804);},TextManager[_0x40c38a(0x56a)]=function(_0x8431b8){const _0x5a6d7a=_0x40c38a;_0x8431b8=String(_0x8431b8||'')[_0x5a6d7a(0xe0)]();const _0x57cf4b=VisuMZ['CoreEngine'][_0x5a6d7a(0x3a9)]['Param'];if(_0x8431b8===_0x5a6d7a(0x489))return $dataSystem[_0x5a6d7a(0x23c)][_0x5a6d7a(0x3db)][0x0];if(_0x8431b8===_0x5a6d7a(0x5d4))return $dataSystem[_0x5a6d7a(0x23c)][_0x5a6d7a(0x3db)][0x1];if(_0x8431b8===_0x5a6d7a(0x5d8))return $dataSystem[_0x5a6d7a(0x23c)][_0x5a6d7a(0x3db)][0x2];if(_0x8431b8==='DEF')return $dataSystem[_0x5a6d7a(0x23c)][_0x5a6d7a(0x3db)][0x3];if(_0x8431b8===_0x5a6d7a(0x5ac))return $dataSystem[_0x5a6d7a(0x23c)][_0x5a6d7a(0x3db)][0x4];if(_0x8431b8===_0x5a6d7a(0x16a))return $dataSystem[_0x5a6d7a(0x23c)][_0x5a6d7a(0x3db)][0x5];if(_0x8431b8===_0x5a6d7a(0x29c))return $dataSystem[_0x5a6d7a(0x23c)][_0x5a6d7a(0x3db)][0x6];if(_0x8431b8===_0x5a6d7a(0xe7))return $dataSystem['terms'][_0x5a6d7a(0x3db)][0x7];if(_0x8431b8===_0x5a6d7a(0x53a))return _0x57cf4b[_0x5a6d7a(0x232)];if(_0x8431b8==='EVA')return _0x57cf4b[_0x5a6d7a(0x4d5)];if(_0x8431b8==='CRI')return _0x57cf4b[_0x5a6d7a(0x12b)];if(_0x8431b8===_0x5a6d7a(0x1e1))return _0x57cf4b[_0x5a6d7a(0x196)];if(_0x8431b8===_0x5a6d7a(0x359))return _0x57cf4b[_0x5a6d7a(0x569)];if(_0x8431b8===_0x5a6d7a(0xf6))return _0x57cf4b[_0x5a6d7a(0x1f6)];if(_0x8431b8===_0x5a6d7a(0x2cd))return _0x57cf4b[_0x5a6d7a(0xcf)];if(_0x8431b8==='HRG')return _0x57cf4b['XParamVocab7'];if(_0x8431b8===_0x5a6d7a(0x57c))return _0x57cf4b[_0x5a6d7a(0x438)];if(_0x8431b8===_0x5a6d7a(0x1c2))return _0x57cf4b[_0x5a6d7a(0x533)];if(_0x8431b8===_0x5a6d7a(0x5bd))return _0x57cf4b['SParamVocab0'];if(_0x8431b8==='GRD')return _0x57cf4b[_0x5a6d7a(0x259)];if(_0x8431b8===_0x5a6d7a(0x4fd))return _0x57cf4b['SParamVocab2'];if(_0x8431b8===_0x5a6d7a(0x4db))return _0x57cf4b['SParamVocab3'];if(_0x8431b8===_0x5a6d7a(0x25b))return _0x57cf4b['SParamVocab4'];if(_0x8431b8===_0x5a6d7a(0x2d0))return _0x57cf4b['SParamVocab5'];if(_0x8431b8===_0x5a6d7a(0x35a))return _0x57cf4b[_0x5a6d7a(0x421)];if(_0x8431b8===_0x5a6d7a(0x309))return _0x57cf4b[_0x5a6d7a(0xdf)];if(_0x8431b8===_0x5a6d7a(0x19e))return _0x57cf4b[_0x5a6d7a(0xbd)];if(_0x8431b8===_0x5a6d7a(0x15a))return _0x57cf4b['SParamVocab9'];if(VisuMZ[_0x5a6d7a(0x15b)][_0x5a6d7a(0x4d8)][_0x8431b8])return VisuMZ[_0x5a6d7a(0x15b)][_0x5a6d7a(0x4d8)][_0x8431b8];return'';},TextManager[_0x40c38a(0x4f4)]=function(_0x42ca33){const _0x143ec7=_0x40c38a;if(_0x42ca33===_0x143ec7(0x5da))_0x42ca33=_0x143ec7(0x498);let _0x364070=[];for(let _0x23c88d in Input['keyMapper']){_0x23c88d=Number(_0x23c88d);if(_0x23c88d>=0x60&&_0x23c88d<=0x69)continue;if([0x12,0x20][_0x143ec7(0x5dd)](_0x23c88d))continue;_0x42ca33===Input[_0x143ec7(0xc8)][_0x23c88d]&&_0x364070[_0x143ec7(0x127)](_0x23c88d);}for(let _0x3f5eda=0x0;_0x3f5eda<_0x364070[_0x143ec7(0x4b7)];_0x3f5eda++){_0x364070[_0x3f5eda]=TextManager['stringKeyMap'][_0x364070[_0x3f5eda]];}return this[_0x143ec7(0x5d2)](_0x364070);},TextManager[_0x40c38a(0x5d2)]=function(_0xb48aee){const _0x220df6=_0x40c38a,_0x4d3f1a=VisuMZ[_0x220df6(0x15b)][_0x220df6(0x3a9)][_0x220df6(0x14b)],_0x523ff1=_0x4d3f1a[_0x220df6(0x154)],_0x4ec227=_0xb48aee[_0x220df6(0x5e1)](),_0x52f8c5=_0x220df6(0x396)[_0x220df6(0x276)](_0x4ec227);return _0x4d3f1a[_0x52f8c5]?_0x4d3f1a[_0x52f8c5]:_0x523ff1[_0x220df6(0x276)](_0x4ec227);},TextManager[_0x40c38a(0x4b0)]=function(_0x550e2b,_0x681011){const _0xbd3f36=_0x40c38a,_0x51e53d=VisuMZ[_0xbd3f36(0x15b)][_0xbd3f36(0x3a9)][_0xbd3f36(0x14b)],_0x1be0a6=_0x51e53d['MultiKeyFmt'],_0x183e24=this[_0xbd3f36(0x4f4)](_0x550e2b),_0x326a68=this[_0xbd3f36(0x4f4)](_0x681011);return _0x1be0a6['format'](_0x183e24,_0x326a68);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x330)]=ColorManager['loadWindowskin'],ColorManager[_0x40c38a(0x2c1)]=function(){const _0x5bd28e=_0x40c38a;VisuMZ[_0x5bd28e(0x15b)][_0x5bd28e(0x330)][_0x5bd28e(0xb5)](this),this['_colorCache']=this[_0x5bd28e(0x2a6)]||{};},ColorManager[_0x40c38a(0x16e)]=function(_0x2a5a83,_0x32e106){const _0x1583a6=_0x40c38a;return _0x32e106=String(_0x32e106),this[_0x1583a6(0x2a6)]=this[_0x1583a6(0x2a6)]||{},_0x32e106['match'](/#(.*)/i)?this[_0x1583a6(0x2a6)][_0x2a5a83]='#%1'[_0x1583a6(0x276)](String(RegExp['$1'])):this[_0x1583a6(0x2a6)][_0x2a5a83]=this[_0x1583a6(0x596)](Number(_0x32e106)),this[_0x1583a6(0x2a6)][_0x2a5a83];},ColorManager[_0x40c38a(0x235)]=function(_0x26e332){const _0xa03007=_0x40c38a;return _0x26e332=String(_0x26e332),_0x26e332['match'](/#(.*)/i)?_0xa03007(0x402)['format'](String(RegExp['$1'])):this[_0xa03007(0x596)](Number(_0x26e332));},ColorManager[_0x40c38a(0x74)]=function(){const _0x1b7c2b=_0x40c38a;this[_0x1b7c2b(0x2a6)]={};},ColorManager[_0x40c38a(0x3e9)]=function(){const _0x48d1e8=_0x40c38a,_0x2c0188='_stored_normalColor';this[_0x48d1e8(0x2a6)]=this[_0x48d1e8(0x2a6)]||{};if(this[_0x48d1e8(0x2a6)][_0x2c0188])return this['_colorCache'][_0x2c0188];const _0x4d16ae=VisuMZ['CoreEngine']['Settings'][_0x48d1e8(0x226)]['ColorNormal'];return this[_0x48d1e8(0x16e)](_0x2c0188,_0x4d16ae);},ColorManager[_0x40c38a(0x35c)]=function(){const _0x241f56=_0x40c38a,_0x254c7c='_stored_systemColor';this[_0x241f56(0x2a6)]=this[_0x241f56(0x2a6)]||{};if(this[_0x241f56(0x2a6)][_0x254c7c])return this[_0x241f56(0x2a6)][_0x254c7c];const _0x4487ac=VisuMZ[_0x241f56(0x15b)][_0x241f56(0x3a9)][_0x241f56(0x226)][_0x241f56(0xa8)];return this[_0x241f56(0x16e)](_0x254c7c,_0x4487ac);},ColorManager[_0x40c38a(0x5c4)]=function(){const _0x287877=_0x40c38a,_0x120adf=_0x287877(0x2c4);this['_colorCache']=this[_0x287877(0x2a6)]||{};if(this['_colorCache'][_0x120adf])return this[_0x287877(0x2a6)][_0x120adf];const _0x7fce70=VisuMZ[_0x287877(0x15b)]['Settings'][_0x287877(0x226)][_0x287877(0x1a6)];return this[_0x287877(0x16e)](_0x120adf,_0x7fce70);},ColorManager['deathColor']=function(){const _0x431264=_0x40c38a,_0x4c463=_0x431264(0x1f2);this[_0x431264(0x2a6)]=this[_0x431264(0x2a6)]||{};if(this[_0x431264(0x2a6)][_0x4c463])return this['_colorCache'][_0x4c463];const _0x5f4487=VisuMZ[_0x431264(0x15b)]['Settings'][_0x431264(0x226)][_0x431264(0x29d)];return this[_0x431264(0x16e)](_0x4c463,_0x5f4487);},ColorManager['gaugeBackColor']=function(){const _0x48cb65=_0x40c38a,_0x2d0ef6='_stored_gaugeBackColor';this[_0x48cb65(0x2a6)]=this[_0x48cb65(0x2a6)]||{};if(this['_colorCache'][_0x2d0ef6])return this[_0x48cb65(0x2a6)][_0x2d0ef6];const _0x2b185c=VisuMZ[_0x48cb65(0x15b)][_0x48cb65(0x3a9)][_0x48cb65(0x226)][_0x48cb65(0x1bf)];return this['getColorDataFromPluginParameters'](_0x2d0ef6,_0x2b185c);},ColorManager[_0x40c38a(0x2f1)]=function(){const _0x313be4=_0x40c38a,_0x5c3686=_0x313be4(0x520);this[_0x313be4(0x2a6)]=this[_0x313be4(0x2a6)]||{};if(this[_0x313be4(0x2a6)][_0x5c3686])return this['_colorCache'][_0x5c3686];const _0x2460c8=VisuMZ[_0x313be4(0x15b)][_0x313be4(0x3a9)][_0x313be4(0x226)]['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0x5c3686,_0x2460c8);},ColorManager['hpGaugeColor2']=function(){const _0x2aee72=_0x40c38a,_0x3f40cb=_0x2aee72(0x1ec);this[_0x2aee72(0x2a6)]=this[_0x2aee72(0x2a6)]||{};if(this[_0x2aee72(0x2a6)][_0x3f40cb])return this['_colorCache'][_0x3f40cb];const _0x111065=VisuMZ[_0x2aee72(0x15b)][_0x2aee72(0x3a9)]['Color'][_0x2aee72(0xca)];return this[_0x2aee72(0x16e)](_0x3f40cb,_0x111065);},ColorManager['mpGaugeColor1']=function(){const _0x351c32=_0x40c38a,_0x19b05f=_0x351c32(0x19c);this[_0x351c32(0x2a6)]=this[_0x351c32(0x2a6)]||{};if(this[_0x351c32(0x2a6)][_0x19b05f])return this[_0x351c32(0x2a6)][_0x19b05f];const _0x516ea8=VisuMZ['CoreEngine']['Settings'][_0x351c32(0x226)][_0x351c32(0x4e8)];return this[_0x351c32(0x16e)](_0x19b05f,_0x516ea8);},ColorManager[_0x40c38a(0x24c)]=function(){const _0x336e4a=_0x40c38a,_0x2bdc44='_stored_mpGaugeColor2';this[_0x336e4a(0x2a6)]=this['_colorCache']||{};if(this[_0x336e4a(0x2a6)][_0x2bdc44])return this[_0x336e4a(0x2a6)][_0x2bdc44];const _0x59974f=VisuMZ[_0x336e4a(0x15b)][_0x336e4a(0x3a9)]['Color']['ColorMPGauge2'];return this[_0x336e4a(0x16e)](_0x2bdc44,_0x59974f);},ColorManager[_0x40c38a(0xa2)]=function(){const _0x199547=_0x40c38a,_0x1165e2=_0x199547(0x289);this[_0x199547(0x2a6)]=this['_colorCache']||{};if(this[_0x199547(0x2a6)][_0x1165e2])return this[_0x199547(0x2a6)][_0x1165e2];const _0x2e7f20=VisuMZ['CoreEngine']['Settings'][_0x199547(0x226)]['ColorMPCost'];return this[_0x199547(0x16e)](_0x1165e2,_0x2e7f20);},ColorManager['powerUpColor']=function(){const _0x1f3e65=_0x40c38a,_0x4343b4=_0x1f3e65(0x21a);this[_0x1f3e65(0x2a6)]=this[_0x1f3e65(0x2a6)]||{};if(this[_0x1f3e65(0x2a6)][_0x4343b4])return this[_0x1f3e65(0x2a6)][_0x4343b4];const _0x327363=VisuMZ[_0x1f3e65(0x15b)][_0x1f3e65(0x3a9)][_0x1f3e65(0x226)][_0x1f3e65(0x1a5)];return this[_0x1f3e65(0x16e)](_0x4343b4,_0x327363);},ColorManager[_0x40c38a(0x83)]=function(){const _0x40d695=_0x40c38a,_0xc7b18c=_0x40d695(0x3a8);this[_0x40d695(0x2a6)]=this['_colorCache']||{};if(this[_0x40d695(0x2a6)][_0xc7b18c])return this[_0x40d695(0x2a6)][_0xc7b18c];const _0x8ab486=VisuMZ[_0x40d695(0x15b)][_0x40d695(0x3a9)][_0x40d695(0x226)][_0x40d695(0x2e7)];return this[_0x40d695(0x16e)](_0xc7b18c,_0x8ab486);},ColorManager[_0x40c38a(0x326)]=function(){const _0x4976f9=_0x40c38a,_0x582f54='_stored_ctGaugeColor1';this[_0x4976f9(0x2a6)]=this[_0x4976f9(0x2a6)]||{};if(this[_0x4976f9(0x2a6)][_0x582f54])return this['_colorCache'][_0x582f54];const _0x4da080=VisuMZ['CoreEngine'][_0x4976f9(0x3a9)][_0x4976f9(0x226)][_0x4976f9(0x540)];return this[_0x4976f9(0x16e)](_0x582f54,_0x4da080);},ColorManager[_0x40c38a(0x145)]=function(){const _0x1ef4e5=_0x40c38a,_0x20e0d1=_0x1ef4e5(0x2fe);this[_0x1ef4e5(0x2a6)]=this['_colorCache']||{};if(this[_0x1ef4e5(0x2a6)][_0x20e0d1])return this[_0x1ef4e5(0x2a6)][_0x20e0d1];const _0x8b4d3d=VisuMZ[_0x1ef4e5(0x15b)][_0x1ef4e5(0x3a9)][_0x1ef4e5(0x226)]['ColorCTGauge2'];return this['getColorDataFromPluginParameters'](_0x20e0d1,_0x8b4d3d);},ColorManager['tpGaugeColor1']=function(){const _0x93e091=_0x40c38a,_0x15eef8='_stored_tpGaugeColor1';this[_0x93e091(0x2a6)]=this[_0x93e091(0x2a6)]||{};if(this['_colorCache'][_0x15eef8])return this[_0x93e091(0x2a6)][_0x15eef8];const _0x36fd0f=VisuMZ[_0x93e091(0x15b)]['Settings']['Color']['ColorTPGauge1'];return this[_0x93e091(0x16e)](_0x15eef8,_0x36fd0f);},ColorManager[_0x40c38a(0x11c)]=function(){const _0x5bd758=_0x40c38a,_0x32e874='_stored_tpGaugeColor2';this[_0x5bd758(0x2a6)]=this[_0x5bd758(0x2a6)]||{};if(this[_0x5bd758(0x2a6)][_0x32e874])return this[_0x5bd758(0x2a6)][_0x32e874];const _0x35c2ae=VisuMZ[_0x5bd758(0x15b)]['Settings']['Color'][_0x5bd758(0x50b)];return this[_0x5bd758(0x16e)](_0x32e874,_0x35c2ae);},ColorManager[_0x40c38a(0x447)]=function(){const _0x480742=_0x40c38a,_0x4bbeea=_0x480742(0x614);this[_0x480742(0x2a6)]=this[_0x480742(0x2a6)]||{};if(this[_0x480742(0x2a6)][_0x4bbeea])return this['_colorCache'][_0x4bbeea];const _0x26861=VisuMZ[_0x480742(0x15b)][_0x480742(0x3a9)][_0x480742(0x226)][_0x480742(0x4b9)];return this[_0x480742(0x16e)](_0x4bbeea,_0x26861);},ColorManager[_0x40c38a(0x3d2)]=function(){const _0x41e9e1=_0x40c38a,_0x3950a2=_0x41e9e1(0x425);this[_0x41e9e1(0x2a6)]=this[_0x41e9e1(0x2a6)]||{};if(this[_0x41e9e1(0x2a6)][_0x3950a2])return this['_colorCache'][_0x3950a2];const _0x149c6c=VisuMZ['CoreEngine']['Settings'][_0x41e9e1(0x226)][_0x41e9e1(0x4b9)];return this['getColorDataFromPluginParameters'](_0x3950a2,_0x149c6c);},ColorManager[_0x40c38a(0x113)]=function(){const _0xbab638=_0x40c38a,_0x4a1b01=_0xbab638(0x44b);this[_0xbab638(0x2a6)]=this[_0xbab638(0x2a6)]||{};if(this[_0xbab638(0x2a6)][_0x4a1b01])return this[_0xbab638(0x2a6)][_0x4a1b01];const _0x2966be=VisuMZ[_0xbab638(0x15b)][_0xbab638(0x3a9)][_0xbab638(0x226)][_0xbab638(0x492)];return this[_0xbab638(0x16e)](_0x4a1b01,_0x2966be);},ColorManager[_0x40c38a(0xd4)]=function(){const _0x208313=_0x40c38a,_0x5cf57d=_0x208313(0x2d9);this['_colorCache']=this[_0x208313(0x2a6)]||{};if(this[_0x208313(0x2a6)][_0x5cf57d])return this['_colorCache'][_0x5cf57d];const _0x774219=VisuMZ['CoreEngine'][_0x208313(0x3a9)][_0x208313(0x226)][_0x208313(0x250)];return this['getColorDataFromPluginParameters'](_0x5cf57d,_0x774219);},ColorManager[_0x40c38a(0x571)]=function(){const _0x1ed92f=_0x40c38a,_0x555855=_0x1ed92f(0x577);this[_0x1ed92f(0x2a6)]=this[_0x1ed92f(0x2a6)]||{};if(this[_0x1ed92f(0x2a6)][_0x555855])return this['_colorCache'][_0x555855];const _0x471d18=VisuMZ[_0x1ed92f(0x15b)][_0x1ed92f(0x3a9)][_0x1ed92f(0x226)][_0x1ed92f(0x5e6)];return this['getColorDataFromPluginParameters'](_0x555855,_0x471d18);},ColorManager['maxLvGaugeColor2']=function(){const _0x1131cf=_0x40c38a,_0x28e0cf='_stored_maxLvGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x28e0cf])return this[_0x1131cf(0x2a6)][_0x28e0cf];const _0x8bfaae=VisuMZ['CoreEngine'][_0x1131cf(0x3a9)][_0x1131cf(0x226)]['ColorMaxLvGauge2'];return this[_0x1131cf(0x16e)](_0x28e0cf,_0x8bfaae);},ColorManager[_0x40c38a(0x13d)]=function(_0x2a10fc){const _0x2b4c04=_0x40c38a;return VisuMZ[_0x2b4c04(0x15b)][_0x2b4c04(0x3a9)][_0x2b4c04(0x226)][_0x2b4c04(0x195)][_0x2b4c04(0xb5)](this,_0x2a10fc);},ColorManager[_0x40c38a(0x207)]=function(_0x1959f7){const _0xd2e164=_0x40c38a;return VisuMZ[_0xd2e164(0x15b)][_0xd2e164(0x3a9)]['Color'][_0xd2e164(0x49f)][_0xd2e164(0xb5)](this,_0x1959f7);},ColorManager[_0x40c38a(0x123)]=function(_0x5ef9c7){const _0x274303=_0x40c38a;return VisuMZ[_0x274303(0x15b)][_0x274303(0x3a9)][_0x274303(0x226)][_0x274303(0x510)][_0x274303(0xb5)](this,_0x5ef9c7);},ColorManager[_0x40c38a(0x4c5)]=function(_0x1d395d){const _0x4a80b4=_0x40c38a;return VisuMZ[_0x4a80b4(0x15b)][_0x4a80b4(0x3a9)][_0x4a80b4(0x226)][_0x4a80b4(0x436)][_0x4a80b4(0xb5)](this,_0x1d395d);},ColorManager['damageColor']=function(_0xc60fe1){const _0x47d9e1=_0x40c38a;return VisuMZ[_0x47d9e1(0x15b)][_0x47d9e1(0x3a9)][_0x47d9e1(0x226)][_0x47d9e1(0x495)]['call'](this,_0xc60fe1);},ColorManager[_0x40c38a(0x612)]=function(){const _0x3ddcb3=_0x40c38a;return VisuMZ['CoreEngine'][_0x3ddcb3(0x3a9)][_0x3ddcb3(0x226)][_0x3ddcb3(0x43d)];},ColorManager[_0x40c38a(0x10e)]=function(){const _0x3c2203=_0x40c38a;return VisuMZ[_0x3c2203(0x15b)][_0x3c2203(0x3a9)][_0x3c2203(0x226)][_0x3c2203(0x504)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager['outlineColorGauge']=function(){const _0x39c2a0=_0x40c38a;return VisuMZ['CoreEngine'][_0x39c2a0(0x3a9)][_0x39c2a0(0x226)][_0x39c2a0(0x56e)]||_0x39c2a0(0x4d0);},ColorManager['dimColor1']=function(){const _0x287ac1=_0x40c38a;return VisuMZ['CoreEngine'][_0x287ac1(0x3a9)][_0x287ac1(0x226)][_0x287ac1(0x518)];},ColorManager[_0x40c38a(0x252)]=function(){const _0xdee29d=_0x40c38a;return VisuMZ['CoreEngine'][_0xdee29d(0x3a9)][_0xdee29d(0x226)]['DimColor2'];},ColorManager[_0x40c38a(0x26f)]=function(){const _0x199ddd=_0x40c38a;return VisuMZ[_0x199ddd(0x15b)][_0x199ddd(0x3a9)][_0x199ddd(0x226)][_0x199ddd(0xdb)];},ColorManager[_0x40c38a(0x188)]=function(){const _0x3a6470=_0x40c38a;return VisuMZ[_0x3a6470(0x15b)][_0x3a6470(0x3a9)][_0x3a6470(0x226)][_0x3a6470(0x2be)];},SceneManager[_0x40c38a(0x4a7)]=[],VisuMZ['CoreEngine'][_0x40c38a(0x4ae)]=SceneManager[_0x40c38a(0xe1)],SceneManager[_0x40c38a(0xe1)]=function(){const _0x5c05f0=_0x40c38a;VisuMZ[_0x5c05f0(0x15b)][_0x5c05f0(0x4ae)][_0x5c05f0(0xb5)](this),this[_0x5c05f0(0xde)]();},VisuMZ['CoreEngine']['SceneManager_onKeyDown']=SceneManager[_0x40c38a(0x158)],SceneManager[_0x40c38a(0x158)]=function(_0x49e6bd){const _0x548c73=_0x40c38a;if($gameTemp)this[_0x548c73(0x531)](_0x49e6bd);VisuMZ[_0x548c73(0x15b)]['SceneManager_onKeyDown'][_0x548c73(0xb5)](this,_0x49e6bd);},SceneManager[_0x40c38a(0x531)]=function(_0x77b2cb){const _0x315e87=_0x40c38a;if(!_0x77b2cb[_0x315e87(0x5ba)]&&!_0x77b2cb[_0x315e87(0x3d3)])switch(_0x77b2cb[_0x315e87(0x3bd)]){case 0x75:this['playTestF6']();break;case 0x76:this[_0x315e87(0x3df)]();break;}},SceneManager[_0x40c38a(0x257)]=function(){const _0x2beaaf=_0x40c38a;if($gameTemp[_0x2beaaf(0xe4)]()&&VisuMZ[_0x2beaaf(0x15b)][_0x2beaaf(0x3a9)]['QoL'][_0x2beaaf(0xd6)]){ConfigManager[_0x2beaaf(0x409)]!==0x0?(ConfigManager[_0x2beaaf(0x3b0)]=0x0,ConfigManager[_0x2beaaf(0x21f)]=0x0,ConfigManager[_0x2beaaf(0x379)]=0x0,ConfigManager[_0x2beaaf(0x409)]=0x0):(ConfigManager[_0x2beaaf(0x3b0)]=0x64,ConfigManager[_0x2beaaf(0x21f)]=0x64,ConfigManager[_0x2beaaf(0x379)]=0x64,ConfigManager[_0x2beaaf(0x409)]=0x64);ConfigManager[_0x2beaaf(0x548)]();if(this[_0x2beaaf(0x44e)][_0x2beaaf(0x415)]===Scene_Options){if(this[_0x2beaaf(0x44e)][_0x2beaaf(0x11d)])this[_0x2beaaf(0x44e)][_0x2beaaf(0x11d)][_0x2beaaf(0x35d)]();if(this[_0x2beaaf(0x44e)][_0x2beaaf(0x453)])this[_0x2beaaf(0x44e)][_0x2beaaf(0x453)]['refresh']();}}},SceneManager[_0x40c38a(0x3df)]=function(){const _0x400610=_0x40c38a;$gameTemp[_0x400610(0xe4)]()&&VisuMZ[_0x400610(0x15b)]['Settings'][_0x400610(0x558)][_0x400610(0xad)]&&($gameTemp[_0x400610(0x3cf)]=!$gameTemp[_0x400610(0x3cf)]);},SceneManager[_0x40c38a(0xde)]=function(){const _0x452b25=_0x40c38a;this[_0x452b25(0x6c)]=![],this['_hideButtons']=!VisuMZ[_0x452b25(0x15b)]['Settings']['UI']['ShowButtons'];},SceneManager['setSideButtonLayout']=function(_0x177a6e){const _0x20f1d1=_0x40c38a;VisuMZ[_0x20f1d1(0x15b)][_0x20f1d1(0x3a9)]['UI']['SideButtons']&&(this[_0x20f1d1(0x6c)]=_0x177a6e);},SceneManager[_0x40c38a(0x270)]=function(){const _0x1f4d0c=_0x40c38a;return this[_0x1f4d0c(0x6c)];},SceneManager[_0x40c38a(0x10b)]=function(){const _0x268705=_0x40c38a;return this[_0x268705(0x3f3)];},SceneManager[_0x40c38a(0x7f)]=function(){const _0x9c95f=_0x40c38a;return this[_0x9c95f(0x10b)]()||this['isSideButtonLayout']();},VisuMZ[_0x40c38a(0x15b)]['SceneManager_isGameActive']=SceneManager[_0x40c38a(0xe3)],SceneManager[_0x40c38a(0xe3)]=function(){const _0x513b18=_0x40c38a;return VisuMZ[_0x513b18(0x15b)][_0x513b18(0x3a9)][_0x513b18(0x558)][_0x513b18(0x3b3)]?VisuMZ[_0x513b18(0x15b)][_0x513b18(0x600)][_0x513b18(0xb5)](this):!![];},SceneManager[_0x40c38a(0x446)]=function(_0x449f1d){const _0x17dea8=_0x40c38a;if(_0x449f1d instanceof Error)this['catchNormalError'](_0x449f1d);else _0x449f1d instanceof Array&&_0x449f1d[0x0]===_0x17dea8(0x12a)?this[_0x17dea8(0x3b7)](_0x449f1d):this[_0x17dea8(0x308)](_0x449f1d);this[_0x17dea8(0x3e4)]();},VisuMZ['CoreEngine']['BattleManager_processEscape']=BattleManager[_0x40c38a(0x3ec)],BattleManager['processEscape']=function(){const _0x246f7c=_0x40c38a;if(VisuMZ[_0x246f7c(0x15b)][_0x246f7c(0x3a9)]['QoL']['EscapeAlways'])this[_0x246f7c(0x3b5)]();else return VisuMZ[_0x246f7c(0x15b)][_0x246f7c(0x517)][_0x246f7c(0xb5)](this);},BattleManager[_0x40c38a(0x3b5)]=function(){const _0x2eda09=_0x40c38a;return $gameParty[_0x2eda09(0x1a2)](),SoundManager['playEscape'](),this['onEscapeSuccess'](),!![];},BattleManager[_0x40c38a(0x610)]=function(){const _0x41b0bf=_0x40c38a;return $gameSystem[_0x41b0bf(0x432)]()>=0x1;},BattleManager[_0x40c38a(0x47e)]=function(){const _0x3839e8=_0x40c38a;return $gameSystem[_0x3839e8(0x432)]()===0x1;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x16f)]=Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0xe1)],Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(){const _0x4cf4f3=_0x40c38a;VisuMZ[_0x4cf4f3(0x15b)][_0x4cf4f3(0x16f)][_0x4cf4f3(0xb5)](this),this[_0x4cf4f3(0x27b)](),this['createFauxAnimationQueue']();},Game_Temp[_0x40c38a(0x32c)]['forceOutOfPlaytest']=function(){const _0x130f41=_0x40c38a;VisuMZ[_0x130f41(0x15b)][_0x130f41(0x3a9)][_0x130f41(0x558)]['ForceNoPlayTest']&&(this['_isPlaytest']=![]);},Game_Temp['prototype'][_0x40c38a(0x576)]=function(){const _0x37c19d=_0x40c38a;this[_0x37c19d(0x430)]=[];},Game_Temp['prototype']['requestFauxAnimation']=function(_0x25a230,_0x9143ad,_0x11c4f5,_0x1baf15){const _0x492568=_0x40c38a;if(!this[_0x492568(0x4fe)]())return;_0x11c4f5=_0x11c4f5||![],_0x1baf15=_0x1baf15||![];if($dataAnimations[_0x9143ad]){const _0x312a55={'targets':_0x25a230,'animationId':_0x9143ad,'mirror':_0x11c4f5,'mute':_0x1baf15};this[_0x492568(0x430)]['push'](_0x312a55);for(const _0x3950d8 of _0x25a230){_0x3950d8[_0x492568(0x52b)]&&_0x3950d8[_0x492568(0x52b)]();}}},Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0x4fe)]=function(){return!![];},Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0x18e)]=function(){const _0x32f5e1=_0x40c38a;return this['_fauxAnimationQueue'][_0x32f5e1(0x5fd)]();},Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0x2d4)]=function(_0x1a1717){this['_lastPluginCommandInterpreter']=_0x1a1717;},Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0x4be)]=function(){const _0x39ade1=_0x40c38a;return this[_0x39ade1(0x5c6)];},Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0x58d)]=function(){const _0x5dcc5a=_0x40c38a;this[_0x5dcc5a(0x410)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x40c38a(0x32c)][_0x40c38a(0x356)]=function(_0x1157c8){const _0x3eeec1=_0x40c38a;$gameMap&&$dataMap&&$dataMap[_0x3eeec1(0x5e7)]&&this[_0x3eeec1(0x59a)]($dataMap[_0x3eeec1(0x5e7)]);const _0x119dcc=$dataTroops[_0x1157c8];_0x119dcc&&this[_0x3eeec1(0x59a)](_0x119dcc[_0x3eeec1(0x615)]);},Game_Temp[_0x40c38a(0x32c)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x5128ae){const _0x409077=_0x40c38a;if(!_0x5128ae)return;if(_0x5128ae[_0x409077(0x311)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x409077(0x410)]='FV';else{if(_0x5128ae['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x409077(0x410)]='SV';else{if(_0x5128ae['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0xa1553e=String(RegExp['$1']);if(_0xa1553e[_0x409077(0x311)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x409077(0x410)]='FV';else _0xa1553e[_0x409077(0x311)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x5128ae[_0x409077(0x311)](/<(?:DTB)>/i))this[_0x409077(0x115)]=0x0;else{if(_0x5128ae[_0x409077(0x311)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x409077(0x115)]=0x1;else{if(_0x5128ae['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x5128ae[_0x409077(0x311)](/<(?:CTB)>/i))Imported[_0x409077(0x16b)]&&(this[_0x409077(0x115)]=_0x409077(0x579));else{if(_0x5128ae['match'](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x409077(0x115)]='STB');else{if(_0x5128ae['match'](/<(?:BTB)>/i))Imported[_0x409077(0x5c3)]&&(this[_0x409077(0x115)]=_0x409077(0x2ae));else{if(_0x5128ae[_0x409077(0x311)](/<(?:FTB)>/i))Imported[_0x409077(0x29a)]&&(this['_forcedBattleSys']=_0x409077(0x333));else{if(_0x5128ae[_0x409077(0x311)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3f9d44=String(RegExp['$1']);if(_0x3f9d44[_0x409077(0x311)](/DTB/i))this[_0x409077(0x115)]=0x0;else{if(_0x3f9d44[_0x409077(0x311)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x409077(0x115)]=0x1;else{if(_0x3f9d44[_0x409077(0x311)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x409077(0x115)]=0x2;else{if(_0x3f9d44['match'](/CTB/i))Imported[_0x409077(0x16b)]&&(this[_0x409077(0x115)]='CTB');else{if(_0x3f9d44[_0x409077(0x311)](/STB/i))Imported[_0x409077(0x300)]&&(this['_forcedBattleSys']=_0x409077(0x19a));else{if(_0x3f9d44[_0x409077(0x311)](/BTB/i))Imported[_0x409077(0x5c3)]&&(this[_0x409077(0x115)]=_0x409077(0x2ae));else _0x3f9d44[_0x409077(0x311)](/FTB/i)&&(Imported[_0x409077(0x29a)]&&(this[_0x409077(0x115)]=_0x409077(0x333)));}}}}}}}}}}}}}},VisuMZ[_0x40c38a(0x15b)]['Game_System_initialize']=Game_System[_0x40c38a(0x32c)][_0x40c38a(0xe1)],Game_System[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(){const _0x26becf=_0x40c38a;VisuMZ[_0x26becf(0x15b)][_0x26becf(0x343)][_0x26becf(0xb5)](this),this[_0x26becf(0x31d)]();},Game_System[_0x40c38a(0x32c)][_0x40c38a(0x31d)]=function(){const _0x243b39=_0x40c38a;this[_0x243b39(0x3cd)]={'SideView':$dataSystem[_0x243b39(0x315)],'BattleSystem':this[_0x243b39(0x587)](),'FontSize':$dataSystem[_0x243b39(0xc4)][_0x243b39(0x5b3)],'Padding':0xc};},Game_System[_0x40c38a(0x32c)][_0x40c38a(0x11a)]=function(){const _0x1433a6=_0x40c38a;if($gameTemp[_0x1433a6(0x410)]==='SV')return!![];else{if($gameTemp[_0x1433a6(0x410)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x1433a6(0x3cd)][_0x1433a6(0x7d)]===undefined)this[_0x1433a6(0x31d)]();return this[_0x1433a6(0x3cd)][_0x1433a6(0x7d)];},Game_System[_0x40c38a(0x32c)][_0x40c38a(0x609)]=function(_0x5392a5){const _0x33cd85=_0x40c38a;if(this[_0x33cd85(0x3cd)]===undefined)this[_0x33cd85(0x31d)]();if(this[_0x33cd85(0x3cd)][_0x33cd85(0x7d)]===undefined)this[_0x33cd85(0x31d)]();this[_0x33cd85(0x3cd)][_0x33cd85(0x7d)]=_0x5392a5;},Game_System['prototype'][_0x40c38a(0x347)]=function(){const _0x120991=_0x40c38a;if(this[_0x120991(0x3cd)]===undefined)this[_0x120991(0x31d)]();this['_CoreEngineSettings']['BattleSystem']=this[_0x120991(0x587)]();},Game_System['prototype'][_0x40c38a(0x587)]=function(){const _0x1a87d8=_0x40c38a,_0x439d80=(VisuMZ[_0x1a87d8(0x15b)][_0x1a87d8(0x3a9)][_0x1a87d8(0x4cb)]||'DATABASE')[_0x1a87d8(0xe0)]()[_0x1a87d8(0x43f)]();return VisuMZ[_0x1a87d8(0x15b)]['CreateBattleSystemID'](_0x439d80);},Game_System[_0x40c38a(0x32c)][_0x40c38a(0x432)]=function(){const _0x58cd11=_0x40c38a;if($gameTemp[_0x58cd11(0x115)]!==undefined)return $gameTemp[_0x58cd11(0x115)];if(this[_0x58cd11(0x3cd)]===undefined)this[_0x58cd11(0x31d)]();if(this[_0x58cd11(0x3cd)]['BattleSystem']===undefined)this[_0x58cd11(0x347)]();return this[_0x58cd11(0x3cd)][_0x58cd11(0x4cb)];},Game_System[_0x40c38a(0x32c)]['setBattleSystem']=function(_0x186c8f){const _0x4620f5=_0x40c38a;if(this[_0x4620f5(0x3cd)]===undefined)this['initCoreEngine']();if(this[_0x4620f5(0x3cd)][_0x4620f5(0x4cb)]===undefined)this['resetBattleSystem']();this[_0x4620f5(0x3cd)][_0x4620f5(0x4cb)]=_0x186c8f;},Game_System[_0x40c38a(0x32c)][_0x40c38a(0x418)]=function(){const _0x3dcab3=_0x40c38a;if(this[_0x3dcab3(0x3cd)]===undefined)this[_0x3dcab3(0x31d)]();if(this[_0x3dcab3(0x3cd)][_0x3dcab3(0x221)]===undefined)this[_0x3dcab3(0x31d)]();return this['_CoreEngineSettings'][_0x3dcab3(0x221)];},Game_System[_0x40c38a(0x32c)]['setMainFontSize']=function(_0x576168){const _0xbbd545=_0x40c38a;if(this['_CoreEngineSettings']===undefined)this[_0xbbd545(0x31d)]();if(this['_CoreEngineSettings'][_0xbbd545(0x80)]===undefined)this[_0xbbd545(0x31d)]();this[_0xbbd545(0x3cd)][_0xbbd545(0x221)]=_0x576168;},Game_System['prototype']['windowPadding']=function(){const _0xa7d11f=_0x40c38a;if(this[_0xa7d11f(0x3cd)]===undefined)this[_0xa7d11f(0x31d)]();if(this[_0xa7d11f(0x3cd)][_0xa7d11f(0x8d)]===undefined)this['initCoreEngine']();return this[_0xa7d11f(0x3cd)][_0xa7d11f(0x8d)];},Game_System[_0x40c38a(0x32c)]['setWindowPadding']=function(_0x326f6c){const _0x5a30eb=_0x40c38a;if(this[_0x5a30eb(0x3cd)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x5a30eb(0x80)]===undefined)this[_0x5a30eb(0x31d)]();this[_0x5a30eb(0x3cd)][_0x5a30eb(0x8d)]=_0x326f6c;},VisuMZ[_0x40c38a(0x15b)]['Game_Screen_initialize']=Game_Screen['prototype'][_0x40c38a(0xe1)],Game_Screen[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(){const _0x4380d7=_0x40c38a;VisuMZ[_0x4380d7(0x15b)][_0x4380d7(0x2b2)]['call'](this),this[_0x4380d7(0x3dc)]();},Game_Screen['prototype'][_0x40c38a(0x3dc)]=function(){const _0xf1b0b=_0x40c38a,_0x18f4f9=VisuMZ[_0xf1b0b(0x15b)]['Settings'][_0xf1b0b(0x49b)];this[_0xf1b0b(0x109)]=_0x18f4f9?.[_0xf1b0b(0x2e1)]||_0xf1b0b(0x29f);},Game_Screen[_0x40c38a(0x32c)][_0x40c38a(0x59e)]=function(){const _0x4e1920=_0x40c38a;if(this[_0x4e1920(0x109)]===undefined)this[_0x4e1920(0x3dc)]();return this[_0x4e1920(0x109)];},Game_Screen[_0x40c38a(0x32c)][_0x40c38a(0x2de)]=function(_0x16474c){const _0x46edb5=_0x40c38a;if(this[_0x46edb5(0x109)]===undefined)this[_0x46edb5(0x3dc)]();this[_0x46edb5(0x109)]=_0x16474c[_0x46edb5(0x591)]()[_0x46edb5(0x43f)]();},Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x5bb)]=function(){const _0x2f1ca4=_0x40c38a;if($gameParty['inBattle']())return![];return this[_0x2f1ca4(0x615)]()&&this[_0x2f1ca4(0x615)]()[_0x2f1ca4(0x484)](0x0)==='!';},VisuMZ['CoreEngine'][_0x40c38a(0x1e8)]=Game_Picture[_0x40c38a(0x32c)]['x'],Game_Picture[_0x40c38a(0x32c)]['x']=function(){const _0x37c385=_0x40c38a;return this[_0x37c385(0x5bb)]()?this[_0x37c385(0x2e2)]():VisuMZ[_0x37c385(0x15b)][_0x37c385(0x1e8)][_0x37c385(0xb5)](this);},Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x2e2)]=function(){const _0x404d1e=_0x40c38a,_0x561cdb=$gameMap[_0x404d1e(0x452)]()*$gameMap['tileWidth']();return this['_x']-_0x561cdb;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x20a)]=Game_Picture[_0x40c38a(0x32c)]['y'],Game_Picture[_0x40c38a(0x32c)]['y']=function(){const _0x326100=_0x40c38a;return this['isMapScrollLinked']()?this[_0x326100(0x3aa)]():VisuMZ[_0x326100(0x15b)][_0x326100(0x20a)][_0x326100(0xb5)](this);},Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x3aa)]=function(){const _0x3a6e5a=_0x40c38a,_0x377111=$gameMap[_0x3a6e5a(0x13f)]()*$gameMap[_0x3a6e5a(0x5df)]();return this['_y']-_0x377111;},Game_Picture[_0x40c38a(0x32c)]['setEasingType']=function(_0x52a8cf){this['_coreEasingType']=_0x52a8cf;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x193)]=Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x2ce)],Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x2ce)]=function(_0x1e96d6){const _0x23132d=_0x40c38a;return this[_0x23132d(0x426)]=this[_0x23132d(0x426)]||0x0,[0x0,0x1,0x2,0x3][_0x23132d(0x5dd)](this['_coreEasingType'])?VisuMZ['CoreEngine'][_0x23132d(0x193)][_0x23132d(0xb5)](this,_0x1e96d6):VisuMZ['ApplyEasing'](_0x1e96d6,this[_0x23132d(0x426)]);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x578)]=Game_Action[_0x40c38a(0x32c)][_0x40c38a(0x2fc)],Game_Action[_0x40c38a(0x32c)]['itemHit']=function(_0x182ca8){const _0x2dfeb4=_0x40c38a;return VisuMZ[_0x2dfeb4(0x15b)][_0x2dfeb4(0x3a9)][_0x2dfeb4(0x558)][_0x2dfeb4(0x467)]?this['itemHitImprovedAccuracy'](_0x182ca8):VisuMZ[_0x2dfeb4(0x15b)][_0x2dfeb4(0x578)][_0x2dfeb4(0xb5)](this,_0x182ca8);},Game_Action[_0x40c38a(0x32c)][_0x40c38a(0xa0)]=function(_0x28aff1){const _0x21222f=_0x40c38a,_0x1327e0=this[_0x21222f(0x4e6)](_0x28aff1),_0x248410=this[_0x21222f(0x422)](_0x28aff1),_0x2b07ca=this[_0x21222f(0x561)](_0x28aff1);return _0x1327e0*(_0x248410-_0x2b07ca);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x4f7)]=Game_Action[_0x40c38a(0x32c)][_0x40c38a(0x2dd)],Game_Action['prototype'][_0x40c38a(0x2dd)]=function(_0x55dc45){const _0x304484=_0x40c38a;return VisuMZ[_0x304484(0x15b)][_0x304484(0x3a9)][_0x304484(0x558)][_0x304484(0x467)]?0x0:VisuMZ[_0x304484(0x15b)]['Game_Action_itemEva']['call'](this,_0x55dc45);},Game_Action['prototype'][_0x40c38a(0x4e6)]=function(_0xbf32cc){const _0x30f78b=_0x40c38a;return this[_0x30f78b(0x5d5)]()[_0x30f78b(0x3b2)]*0.01;},Game_Action[_0x40c38a(0x32c)][_0x40c38a(0x422)]=function(_0x1d1fb6){const _0x3b5df3=_0x40c38a;if(VisuMZ[_0x3b5df3(0x15b)][_0x3b5df3(0x3a9)]['QoL'][_0x3b5df3(0x27e)]&&this['isItem']())return 0x1;return this[_0x3b5df3(0x4c8)]()?VisuMZ[_0x3b5df3(0x15b)]['Settings'][_0x3b5df3(0x558)][_0x3b5df3(0x27e)]&&this[_0x3b5df3(0x4e1)]()[_0x3b5df3(0x362)]()?this[_0x3b5df3(0x4e1)]()[_0x3b5df3(0x5c9)]+0.05:this[_0x3b5df3(0x4e1)]()[_0x3b5df3(0x5c9)]:0x1;},Game_Action[_0x40c38a(0x32c)][_0x40c38a(0x561)]=function(_0x3cb0f8){const _0x496d5c=_0x40c38a;if(this[_0x496d5c(0x4e1)]()[_0x496d5c(0x362)]()===_0x3cb0f8[_0x496d5c(0x362)]())return 0x0;if(this[_0x496d5c(0x4c8)]())return VisuMZ[_0x496d5c(0x15b)]['Settings'][_0x496d5c(0x558)][_0x496d5c(0x27e)]&&_0x3cb0f8[_0x496d5c(0x7a)]()?_0x3cb0f8[_0x496d5c(0x42d)]-0.05:_0x3cb0f8[_0x496d5c(0x42d)];else return this[_0x496d5c(0x21e)]()?_0x3cb0f8[_0x496d5c(0x4bb)]:0x0;},VisuMZ['CoreEngine']['Game_Action_updateLastTarget']=Game_Action[_0x40c38a(0x32c)][_0x40c38a(0xb9)],Game_Action[_0x40c38a(0x32c)][_0x40c38a(0xb9)]=function(_0xf5ba43){const _0x4ebef7=_0x40c38a;VisuMZ[_0x4ebef7(0x15b)][_0x4ebef7(0x355)][_0x4ebef7(0xb5)](this,_0xf5ba43);if(VisuMZ[_0x4ebef7(0x15b)]['Settings'][_0x4ebef7(0x558)][_0x4ebef7(0x467)])return;const _0x8fc2b7=_0xf5ba43[_0x4ebef7(0x437)]();_0x8fc2b7[_0x4ebef7(0x148)]&&(0x1-this['itemEva'](_0xf5ba43)>this[_0x4ebef7(0x2fc)](_0xf5ba43)&&(_0x8fc2b7[_0x4ebef7(0x148)]=![],_0x8fc2b7[_0x4ebef7(0x49d)]=!![]));},VisuMZ['CoreEngine'][_0x40c38a(0x28a)]=Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x234)],Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x234)]=function(){const _0x6bf142=_0x40c38a;this[_0x6bf142(0x1b9)]={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers'][_0x6bf142(0xb5)](this);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x57f)]=Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x35d)],Game_BattlerBase['prototype'][_0x40c38a(0x35d)]=function(){const _0x45d22f=_0x40c38a;this[_0x45d22f(0x1b9)]={},VisuMZ[_0x45d22f(0x15b)]['Game_BattlerBase_refresh'][_0x45d22f(0xb5)](this);},Game_BattlerBase['prototype'][_0x40c38a(0x542)]=function(_0x707637){const _0x37f66c=_0x40c38a;return this[_0x37f66c(0x1b9)]=this['_cache']||{},this['_cache'][_0x707637]!==undefined;},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x412)]=function(_0x47771f){const _0x49b428=_0x40c38a,_0x2f4ec1=(_0x44b0ae,_0x453071)=>{const _0x476668=_0x4809;if(!_0x453071)return _0x44b0ae;if(_0x453071[_0x476668(0x5e7)]['match'](VisuMZ[_0x476668(0x15b)][_0x476668(0x71)][_0x476668(0x412)][_0x47771f])){var _0x1f7120=Number(RegExp['$1']);_0x44b0ae+=_0x1f7120;}if(_0x453071[_0x476668(0x5e7)][_0x476668(0x311)](VisuMZ[_0x476668(0x15b)][_0x476668(0x71)][_0x476668(0x1a0)][_0x47771f])){var _0x4d594d=String(RegExp['$1']);try{_0x44b0ae+=eval(_0x4d594d);}catch(_0x46cb02){if($gameTemp['isPlaytest']())console[_0x476668(0x427)](_0x46cb02);}}return _0x44b0ae;};return this[_0x49b428(0x121)]()['reduce'](_0x2f4ec1,this[_0x49b428(0x8b)][_0x47771f]);},Game_BattlerBase['prototype'][_0x40c38a(0x2b9)]=function(_0x22f64a){const _0x2497c1=_0x40c38a;var _0x3eea43=_0x2497c1(0x393)+(this[_0x2497c1(0x362)]()?_0x2497c1(0x4a1):_0x2497c1(0x22a))+_0x2497c1(0x392)+_0x22f64a;if(this['checkCacheKey'](_0x3eea43))return this[_0x2497c1(0x1b9)][_0x3eea43];this['_cache'][_0x3eea43]=eval(VisuMZ[_0x2497c1(0x15b)][_0x2497c1(0x3a9)]['Param'][_0x3eea43]);const _0x16b262=(_0x52bcef,_0xc51514)=>{const _0x841d88=_0x2497c1;if(!_0xc51514)return _0x52bcef;if(_0xc51514[_0x841d88(0x5e7)][_0x841d88(0x311)](VisuMZ[_0x841d88(0x15b)][_0x841d88(0x71)]['paramMax'][_0x22f64a])){var _0x54b6ea=Number(RegExp['$1']);if(_0x54b6ea===0x0)_0x54b6ea=Number[_0x841d88(0x262)];_0x52bcef=Math['max'](_0x52bcef,_0x54b6ea);}if(_0xc51514['note']['match'](VisuMZ['CoreEngine'][_0x841d88(0x71)][_0x841d88(0x3a2)][_0x22f64a])){var _0x46b6bf=String(RegExp['$1']);try{_0x52bcef=Math[_0x841d88(0x3b4)](_0x52bcef,Number(eval(_0x46b6bf)));}catch(_0x369a5f){if($gameTemp[_0x841d88(0xe4)]())console[_0x841d88(0x427)](_0x369a5f);}}return _0x52bcef;};if(this[_0x2497c1(0x1b9)][_0x3eea43]===0x0)this[_0x2497c1(0x1b9)][_0x3eea43]=Number[_0x2497c1(0x262)];return this['_cache'][_0x3eea43]=this[_0x2497c1(0x121)]()['reduce'](_0x16b262,this['_cache'][_0x3eea43]),this[_0x2497c1(0x1b9)][_0x3eea43];},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x168)]=function(_0x1c6e89){const _0x82e7ac=_0x40c38a,_0x34f9b4=this['traitsPi'](Game_BattlerBase[_0x82e7ac(0x181)],_0x1c6e89),_0x1e09dc=(_0x23a90e,_0x42af44)=>{const _0x3b7f3d=_0x82e7ac;if(!_0x42af44)return _0x23a90e;if(_0x42af44[_0x3b7f3d(0x5e7)]['match'](VisuMZ[_0x3b7f3d(0x15b)]['RegExp'][_0x3b7f3d(0x1b6)][_0x1c6e89])){var _0x1efdf9=Number(RegExp['$1'])/0x64;_0x23a90e*=_0x1efdf9;}if(_0x42af44[_0x3b7f3d(0x5e7)]['match'](VisuMZ['CoreEngine'][_0x3b7f3d(0x71)][_0x3b7f3d(0x5a7)][_0x1c6e89])){var _0x1efdf9=Number(RegExp['$1']);_0x23a90e*=_0x1efdf9;}if(_0x42af44[_0x3b7f3d(0x5e7)][_0x3b7f3d(0x311)](VisuMZ[_0x3b7f3d(0x15b)][_0x3b7f3d(0x71)][_0x3b7f3d(0xfe)][_0x1c6e89])){var _0x4a09fe=String(RegExp['$1']);try{_0x23a90e*=eval(_0x4a09fe);}catch(_0x324eb1){if($gameTemp[_0x3b7f3d(0xe4)]())console['log'](_0x324eb1);}}return _0x23a90e;};return this[_0x82e7ac(0x121)]()['reduce'](_0x1e09dc,_0x34f9b4);},Game_BattlerBase['prototype'][_0x40c38a(0x398)]=function(_0x2b43bd){const _0x17954e=_0x40c38a,_0xc4f4f9=(_0x29b0b8,_0x43a318)=>{const _0x1f5a8d=_0x4809;if(!_0x43a318)return _0x29b0b8;if(_0x43a318['note'][_0x1f5a8d(0x311)](VisuMZ['CoreEngine'][_0x1f5a8d(0x71)]['paramFlat'][_0x2b43bd])){var _0x438830=Number(RegExp['$1']);_0x29b0b8+=_0x438830;}if(_0x43a318[_0x1f5a8d(0x5e7)][_0x1f5a8d(0x311)](VisuMZ[_0x1f5a8d(0x15b)]['RegExp'][_0x1f5a8d(0x146)][_0x2b43bd])){var _0xa88cf=String(RegExp['$1']);try{_0x29b0b8+=eval(_0xa88cf);}catch(_0x4c13d0){if($gameTemp[_0x1f5a8d(0xe4)]())console[_0x1f5a8d(0x427)](_0x4c13d0);}}return _0x29b0b8;};return this['traitObjects']()[_0x17954e(0x3a1)](_0xc4f4f9,0x0);},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x547)]=function(_0x3f1eb8){const _0x335742=_0x40c38a;let _0x3c3530=_0x335742(0x547)+_0x3f1eb8+'Total';if(this['checkCacheKey'](_0x3c3530))return this[_0x335742(0x1b9)][_0x3c3530];return this[_0x335742(0x1b9)][_0x3c3530]=Math['round'](VisuMZ[_0x335742(0x15b)][_0x335742(0x3a9)]['Param'][_0x335742(0x3be)][_0x335742(0xb5)](this,_0x3f1eb8)),this['_cache'][_0x3c3530];},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x1d7)]=function(_0x44d0fb){const _0x28a373=_0x40c38a,_0x5bc601=(_0x41f516,_0x3bcc0f)=>{const _0x1ce4aa=_0x4809;if(!_0x3bcc0f)return _0x41f516;if(_0x3bcc0f[_0x1ce4aa(0x5e7)][_0x1ce4aa(0x311)](VisuMZ['CoreEngine']['RegExp']['xparamPlus1'][_0x44d0fb])){var _0x2121b4=Number(RegExp['$1'])/0x64;_0x41f516+=_0x2121b4;}if(_0x3bcc0f['note'][_0x1ce4aa(0x311)](VisuMZ[_0x1ce4aa(0x15b)][_0x1ce4aa(0x71)][_0x1ce4aa(0x72)][_0x44d0fb])){var _0x2121b4=Number(RegExp['$1']);_0x41f516+=_0x2121b4;}if(_0x3bcc0f[_0x1ce4aa(0x5e7)][_0x1ce4aa(0x311)](VisuMZ['CoreEngine']['RegExp'][_0x1ce4aa(0x28c)][_0x44d0fb])){var _0x1606b2=String(RegExp['$1']);try{_0x41f516+=eval(_0x1606b2);}catch(_0x3bc507){if($gameTemp[_0x1ce4aa(0xe4)]())console[_0x1ce4aa(0x427)](_0x3bc507);}}return _0x41f516;};return this[_0x28a373(0x121)]()[_0x28a373(0x3a1)](_0x5bc601,0x0);},Game_BattlerBase['prototype'][_0x40c38a(0x117)]=function(_0x15123c){const _0x360afc=_0x40c38a,_0x2c29dc=(_0x35fefa,_0x290278)=>{const _0x118f71=_0x4809;if(!_0x290278)return _0x35fefa;if(_0x290278[_0x118f71(0x5e7)][_0x118f71(0x311)](VisuMZ[_0x118f71(0x15b)][_0x118f71(0x71)]['xparamRate1'][_0x15123c])){var _0x108925=Number(RegExp['$1'])/0x64;_0x35fefa*=_0x108925;}if(_0x290278['note'][_0x118f71(0x311)](VisuMZ[_0x118f71(0x15b)][_0x118f71(0x71)][_0x118f71(0x106)][_0x15123c])){var _0x108925=Number(RegExp['$1']);_0x35fefa*=_0x108925;}if(_0x290278['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x118f71(0x45e)][_0x15123c])){var _0x2113f6=String(RegExp['$1']);try{_0x35fefa*=eval(_0x2113f6);}catch(_0x5a206e){if($gameTemp[_0x118f71(0xe4)]())console[_0x118f71(0x427)](_0x5a206e);}}return _0x35fefa;};return this[_0x360afc(0x121)]()['reduce'](_0x2c29dc,0x1);},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x5e4)]=function(_0x56cfdf){const _0x5d663d=_0x40c38a,_0x256d01=(_0x1c75ba,_0x46ccde)=>{const _0x21681d=_0x4809;if(!_0x46ccde)return _0x1c75ba;if(_0x46ccde[_0x21681d(0x5e7)][_0x21681d(0x311)](VisuMZ[_0x21681d(0x15b)]['RegExp'][_0x21681d(0x1b4)][_0x56cfdf])){var _0x46f2d0=Number(RegExp['$1'])/0x64;_0x1c75ba+=_0x46f2d0;}if(_0x46ccde[_0x21681d(0x5e7)][_0x21681d(0x311)](VisuMZ[_0x21681d(0x15b)][_0x21681d(0x71)][_0x21681d(0x39b)][_0x56cfdf])){var _0x46f2d0=Number(RegExp['$1']);_0x1c75ba+=_0x46f2d0;}if(_0x46ccde[_0x21681d(0x5e7)][_0x21681d(0x311)](VisuMZ['CoreEngine']['RegExp'][_0x21681d(0x86)][_0x56cfdf])){var _0x20e7b2=String(RegExp['$1']);try{_0x1c75ba+=eval(_0x20e7b2);}catch(_0x54cb29){if($gameTemp['isPlaytest']())console[_0x21681d(0x427)](_0x54cb29);}}return _0x1c75ba;};return this['traitObjects']()[_0x5d663d(0x3a1)](_0x256d01,0x0);},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0xab)]=function(_0x38d40f){const _0x1fddc5=_0x40c38a;let _0x3cf762='xparam'+_0x38d40f+_0x1fddc5(0x4ff);if(this[_0x1fddc5(0x542)](_0x3cf762))return this[_0x1fddc5(0x1b9)][_0x3cf762];return this['_cache'][_0x3cf762]=VisuMZ['CoreEngine']['Settings'][_0x1fddc5(0x496)][_0x1fddc5(0x2cf)]['call'](this,_0x38d40f),this[_0x1fddc5(0x1b9)][_0x3cf762];},Game_BattlerBase[_0x40c38a(0x32c)]['sparamPlus']=function(_0x47a647){const _0x238dc8=_0x40c38a,_0x47554e=(_0x1a9167,_0x28c5c5)=>{const _0xd48f87=_0x4809;if(!_0x28c5c5)return _0x1a9167;if(_0x28c5c5[_0xd48f87(0x5e7)][_0xd48f87(0x311)](VisuMZ['CoreEngine']['RegExp']['sparamPlus1'][_0x47a647])){var _0x4fa960=Number(RegExp['$1'])/0x64;_0x1a9167+=_0x4fa960;}if(_0x28c5c5[_0xd48f87(0x5e7)]['match'](VisuMZ['CoreEngine'][_0xd48f87(0x71)]['sparamPlus2'][_0x47a647])){var _0x4fa960=Number(RegExp['$1']);_0x1a9167+=_0x4fa960;}if(_0x28c5c5[_0xd48f87(0x5e7)]['match'](VisuMZ[_0xd48f87(0x15b)][_0xd48f87(0x71)][_0xd48f87(0x5b0)][_0x47a647])){var _0x1e2897=String(RegExp['$1']);try{_0x1a9167+=eval(_0x1e2897);}catch(_0x4e142f){if($gameTemp[_0xd48f87(0xe4)]())console[_0xd48f87(0x427)](_0x4e142f);}}return _0x1a9167;};return this[_0x238dc8(0x121)]()[_0x238dc8(0x3a1)](_0x47554e,0x0);},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x1cd)]=function(_0x68a5e0){const _0x46445a=_0x40c38a,_0x5855a2=(_0x2dcd31,_0x41e411)=>{const _0x1625ca=_0x4809;if(!_0x41e411)return _0x2dcd31;if(_0x41e411['note'][_0x1625ca(0x311)](VisuMZ[_0x1625ca(0x15b)][_0x1625ca(0x71)]['sparamRate1'][_0x68a5e0])){var _0x5e073f=Number(RegExp['$1'])/0x64;_0x2dcd31*=_0x5e073f;}if(_0x41e411[_0x1625ca(0x5e7)][_0x1625ca(0x311)](VisuMZ['CoreEngine']['RegExp'][_0x1625ca(0x445)][_0x68a5e0])){var _0x5e073f=Number(RegExp['$1']);_0x2dcd31*=_0x5e073f;}if(_0x41e411['note'][_0x1625ca(0x311)](VisuMZ['CoreEngine']['RegExp']['sparamRateJS'][_0x68a5e0])){var _0x2342f5=String(RegExp['$1']);try{_0x2dcd31*=eval(_0x2342f5);}catch(_0x5290d8){if($gameTemp[_0x1625ca(0xe4)]())console['log'](_0x5290d8);}}return _0x2dcd31;};return this[_0x46445a(0x121)]()[_0x46445a(0x3a1)](_0x5855a2,0x1);},Game_BattlerBase[_0x40c38a(0x32c)]['sparamFlatBonus']=function(_0x5a0a27){const _0x181377=_0x40c38a,_0x27e005=(_0x410740,_0x179b7f)=>{const _0x594d48=_0x4809;if(!_0x179b7f)return _0x410740;if(_0x179b7f[_0x594d48(0x5e7)][_0x594d48(0x311)](VisuMZ['CoreEngine'][_0x594d48(0x71)][_0x594d48(0x482)][_0x5a0a27])){var _0x50671c=Number(RegExp['$1'])/0x64;_0x410740+=_0x50671c;}if(_0x179b7f[_0x594d48(0x5e7)][_0x594d48(0x311)](VisuMZ[_0x594d48(0x15b)][_0x594d48(0x71)][_0x594d48(0x2e0)][_0x5a0a27])){var _0x50671c=Number(RegExp['$1']);_0x410740+=_0x50671c;}if(_0x179b7f[_0x594d48(0x5e7)][_0x594d48(0x311)](VisuMZ[_0x594d48(0x15b)][_0x594d48(0x71)][_0x594d48(0x38c)][_0x5a0a27])){var _0x21c97f=String(RegExp['$1']);try{_0x410740+=eval(_0x21c97f);}catch(_0x2f438e){if($gameTemp[_0x594d48(0xe4)]())console['log'](_0x2f438e);}}return _0x410740;};return this[_0x181377(0x121)]()[_0x181377(0x3a1)](_0x27e005,0x0);},Game_BattlerBase[_0x40c38a(0x32c)][_0x40c38a(0x476)]=function(_0xde5ee3){const _0x272a8c=_0x40c38a;let _0x4280b7=_0x272a8c(0x476)+_0xde5ee3+'Total';if(this[_0x272a8c(0x542)](_0x4280b7))return this[_0x272a8c(0x1b9)][_0x4280b7];return this[_0x272a8c(0x1b9)][_0x4280b7]=VisuMZ['CoreEngine'][_0x272a8c(0x3a9)]['Param'][_0x272a8c(0x13c)][_0x272a8c(0xb5)](this,_0xde5ee3),this[_0x272a8c(0x1b9)][_0x4280b7];},Game_BattlerBase[_0x40c38a(0x32c)]['paramValueByName']=function(_0x4e9930,_0x29465b){const _0x416cbf=_0x40c38a;if(typeof paramId==='number')return this[_0x416cbf(0x547)](_0x4e9930);_0x4e9930=String(_0x4e9930||'')[_0x416cbf(0xe0)]();if(_0x4e9930===_0x416cbf(0x489))return this['param'](0x0);if(_0x4e9930===_0x416cbf(0x5d4))return this[_0x416cbf(0x547)](0x1);if(_0x4e9930===_0x416cbf(0x5d8))return this['param'](0x2);if(_0x4e9930===_0x416cbf(0x201))return this['param'](0x3);if(_0x4e9930===_0x416cbf(0x5ac))return this[_0x416cbf(0x547)](0x4);if(_0x4e9930==='MDF')return this[_0x416cbf(0x547)](0x5);if(_0x4e9930===_0x416cbf(0x29c))return this[_0x416cbf(0x547)](0x6);if(_0x4e9930===_0x416cbf(0xe7))return this[_0x416cbf(0x547)](0x7);if(_0x4e9930===_0x416cbf(0x53a))return _0x29465b?String(Math['round'](this[_0x416cbf(0xab)](0x0)*0x64))+'%':this[_0x416cbf(0xab)](0x0);if(_0x4e9930===_0x416cbf(0x419))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0xab)](0x1)*0x64))+'%':this[_0x416cbf(0xab)](0x1);if(_0x4e9930===_0x416cbf(0x351))return _0x29465b?String(Math[_0x416cbf(0x239)](this['xparam'](0x2)*0x64))+'%':this[_0x416cbf(0xab)](0x2);if(_0x4e9930===_0x416cbf(0x1e1))return _0x29465b?String(Math[_0x416cbf(0x239)](this['xparam'](0x3)*0x64))+'%':this[_0x416cbf(0xab)](0x3);if(_0x4e9930===_0x416cbf(0x359))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0xab)](0x4)*0x64))+'%':this[_0x416cbf(0xab)](0x4);if(_0x4e9930==='MRF')return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0xab)](0x5)*0x64))+'%':this[_0x416cbf(0xab)](0x5);if(_0x4e9930===_0x416cbf(0x2cd))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0xab)](0x6)*0x64))+'%':this[_0x416cbf(0xab)](0x6);if(_0x4e9930==='HRG')return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0xab)](0x7)*0x64))+'%':this[_0x416cbf(0xab)](0x7);if(_0x4e9930==='MRG')return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0xab)](0x8)*0x64))+'%':this[_0x416cbf(0xab)](0x8);if(_0x4e9930==='TRG')return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0xab)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x4e9930==='TGR')return _0x29465b?String(Math[_0x416cbf(0x239)](this['sparam'](0x0)*0x64))+'%':this[_0x416cbf(0x476)](0x0);if(_0x4e9930===_0x416cbf(0x4f6))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0x476)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x4e9930==='REC')return _0x29465b?String(Math[_0x416cbf(0x239)](this['sparam'](0x2)*0x64))+'%':this[_0x416cbf(0x476)](0x2);if(_0x4e9930===_0x416cbf(0x4db))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0x476)](0x3)*0x64))+'%':this[_0x416cbf(0x476)](0x3);if(_0x4e9930===_0x416cbf(0x25b))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0x476)](0x4)*0x64))+'%':this[_0x416cbf(0x476)](0x4);if(_0x4e9930===_0x416cbf(0x2d0))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0x476)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x4e9930===_0x416cbf(0x35a))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0x476)](0x6)*0x64))+'%':this[_0x416cbf(0x476)](0x6);if(_0x4e9930===_0x416cbf(0x309))return _0x29465b?String(Math['round'](this[_0x416cbf(0x476)](0x7)*0x64))+'%':this[_0x416cbf(0x476)](0x7);if(_0x4e9930===_0x416cbf(0x19e))return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0x476)](0x8)*0x64))+'%':this[_0x416cbf(0x476)](0x8);if(_0x4e9930==='EXR')return _0x29465b?String(Math[_0x416cbf(0x239)](this[_0x416cbf(0x476)](0x9)*0x64))+'%':this[_0x416cbf(0x476)](0x9);if(VisuMZ[_0x416cbf(0x15b)][_0x416cbf(0x275)][_0x4e9930]){const _0x2cfaad=VisuMZ[_0x416cbf(0x15b)][_0x416cbf(0x275)][_0x4e9930],_0x25dceb=this[_0x2cfaad];return VisuMZ[_0x416cbf(0x15b)][_0x416cbf(0x5e8)][_0x4e9930]===_0x416cbf(0xcd)?_0x25dceb:_0x29465b?String(Math[_0x416cbf(0x239)](_0x25dceb*0x64))+'%':_0x25dceb;}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x1a2213=_0x40c38a;return this['isAlive']()&&this['_hp']<this['mhp']*VisuMZ[_0x1a2213(0x15b)][_0x1a2213(0x3a9)][_0x1a2213(0x496)][_0x1a2213(0x328)];},Game_Battler[_0x40c38a(0x32c)]['performMiss']=function(){SoundManager['playMiss'](),this['requestMotion']('evade');},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0xda)]=Game_Actor[_0x40c38a(0x32c)][_0x40c38a(0x5ab)],Game_Actor['prototype'][_0x40c38a(0x5ab)]=function(_0x4c8fd9){const _0x3b924d=_0x40c38a;if(this['level']>0x63)return this['paramBaseAboveLevel99'](_0x4c8fd9);return VisuMZ[_0x3b924d(0x15b)][_0x3b924d(0xda)][_0x3b924d(0xb5)](this,_0x4c8fd9);},Game_Actor[_0x40c38a(0x32c)][_0x40c38a(0x37d)]=function(_0x1297ae){const _0x4890cd=_0x40c38a,_0x41e9d4=this[_0x4890cd(0x116)]()[_0x4890cd(0x3db)][_0x1297ae][0x63],_0x2efa50=this['currentClass']()['params'][_0x1297ae][0x62];return _0x41e9d4+(_0x41e9d4-_0x2efa50)*(this[_0x4890cd(0x586)]-0x63);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x459)]=Game_Actor['prototype'][_0x40c38a(0x206)],Game_Actor[_0x40c38a(0x32c)]['changeClass']=function(_0x1f82ef,_0x504468){const _0x4d79bc=_0x40c38a;$gameTemp[_0x4d79bc(0x175)]=!![],VisuMZ['CoreEngine'][_0x4d79bc(0x459)][_0x4d79bc(0xb5)](this,_0x1f82ef,_0x504468),$gameTemp[_0x4d79bc(0x175)]=undefined;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x281)]=Game_Actor['prototype'][_0x40c38a(0x126)],Game_Actor[_0x40c38a(0x32c)][_0x40c38a(0x126)]=function(){const _0x9ce92=_0x40c38a;VisuMZ[_0x9ce92(0x15b)]['Game_Actor_levelUp'][_0x9ce92(0xb5)](this);if(!$gameTemp[_0x9ce92(0x175)])this[_0x9ce92(0x471)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x262dbe=_0x40c38a;this[_0x262dbe(0x1b9)]={};if(VisuMZ['CoreEngine'][_0x262dbe(0x3a9)][_0x262dbe(0x558)][_0x262dbe(0x2c7)])this[_0x262dbe(0x592)]=this['mhp'];if(VisuMZ[_0x262dbe(0x15b)]['Settings'][_0x262dbe(0x558)][_0x262dbe(0x2a0)])this[_0x262dbe(0x2d2)]=this[_0x262dbe(0xf4)];},Game_Actor[_0x40c38a(0x32c)]['expRate']=function(){const _0x3d0b47=_0x40c38a;if(this[_0x3d0b47(0x265)]())return 0x1;const _0x3ae05f=this[_0x3d0b47(0x46e)]()-this['currentLevelExp'](),_0x943397=this[_0x3d0b47(0x58e)]()-this[_0x3d0b47(0xc6)]();return(_0x943397/_0x3ae05f)['clamp'](0x0,0x1);},Game_Actor[_0x40c38a(0x32c)][_0x40c38a(0x121)]=function(){const _0x2f1169=_0x40c38a,_0x3cf136=Game_Battler[_0x2f1169(0x32c)][_0x2f1169(0x121)][_0x2f1169(0xb5)](this);for(const _0x1ac78 of this['equips']()){_0x1ac78&&_0x3cf136[_0x2f1169(0x127)](_0x1ac78);}return _0x3cf136[_0x2f1169(0x127)](this[_0x2f1169(0x116)](),this[_0x2f1169(0x125)]()),_0x3cf136;},Object[_0x40c38a(0x4cc)](Game_Enemy[_0x40c38a(0x32c)],'level',{'get':function(){const _0x444308=_0x40c38a;return this[_0x444308(0x3cc)]();},'configurable':!![]}),Game_Enemy[_0x40c38a(0x32c)][_0x40c38a(0x3cc)]=function(){const _0x537979=_0x40c38a;return this[_0x537979(0x464)]()[_0x537979(0x586)];},Game_Enemy[_0x40c38a(0x32c)][_0x40c38a(0x2b4)]=function(){const _0x24d5f8=_0x40c38a;!this[_0x24d5f8(0x112)]&&(this[_0x24d5f8(0x3a7)]+=Math['round']((Graphics['height']-0x270)/0x2),this[_0x24d5f8(0x3a7)]-=Math[_0x24d5f8(0x119)]((Graphics[_0x24d5f8(0x13e)]-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this['_screenX']-=Math['floor']((Graphics[_0x24d5f8(0x179)]-Graphics['boxWidth'])/0x2):this[_0x24d5f8(0x57d)]+=Math[_0x24d5f8(0x239)]((Graphics[_0x24d5f8(0x13b)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x40c38a(0x32c)][_0x40c38a(0x305)]=function(){const _0x1df476=_0x40c38a;return VisuMZ[_0x1df476(0x15b)][_0x1df476(0x3a9)][_0x1df476(0x39f)]['GoldMax'];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x322)]=Game_Party[_0x40c38a(0x32c)][_0x40c38a(0x443)],Game_Party[_0x40c38a(0x32c)][_0x40c38a(0x443)]=function(_0x1fb8ae){const _0x2531fc=_0x40c38a;if(VisuMZ[_0x2531fc(0x15b)][_0x2531fc(0x3a9)][_0x2531fc(0x558)][_0x2531fc(0xf0)]&&DataManager['isKeyItem'](_0x1fb8ae))return;VisuMZ[_0x2531fc(0x15b)][_0x2531fc(0x322)]['call'](this,_0x1fb8ae);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x278)]=Game_Troop[_0x40c38a(0x32c)][_0x40c38a(0x229)],Game_Troop[_0x40c38a(0x32c)][_0x40c38a(0x229)]=function(_0x2f78c8){const _0x2ccc98=_0x40c38a;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x2ccc98(0x356)](_0x2f78c8),VisuMZ[_0x2ccc98(0x15b)][_0x2ccc98(0x278)][_0x2ccc98(0xb5)](this,_0x2f78c8);},VisuMZ[_0x40c38a(0x15b)]['Game_Map_setup']=Game_Map['prototype']['setup'],Game_Map[_0x40c38a(0x32c)][_0x40c38a(0x229)]=function(_0x60157){const _0x4ef8b1=_0x40c38a;VisuMZ[_0x4ef8b1(0x15b)][_0x4ef8b1(0x1ba)][_0x4ef8b1(0xb5)](this,_0x60157),this['setupCoreEngine'](_0x60157);},Game_Map['prototype']['setupCoreEngine']=function(){const _0x28178d=_0x40c38a;this[_0x28178d(0x1db)]=VisuMZ[_0x28178d(0x15b)][_0x28178d(0x3a9)]['QoL'][_0x28178d(0x184)]||![];if($dataMap&&$dataMap[_0x28178d(0x5e7)]){if($dataMap[_0x28178d(0x5e7)]['match'](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x28178d(0x5e7)][_0x28178d(0x311)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map[_0x40c38a(0x32c)][_0x40c38a(0x568)]=function(){const _0x2ea89b=_0x40c38a;if(this[_0x2ea89b(0x1db)]===undefined)this[_0x2ea89b(0xed)]();return this['_hideTileShadows'];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x511)]=Game_Character[_0x40c38a(0x32c)][_0x40c38a(0x473)],Game_Character['prototype'][_0x40c38a(0x473)]=function(_0x2bc22e){const _0x5b8a55=_0x40c38a;try{VisuMZ[_0x5b8a55(0x15b)]['Game_Character_processMoveCommand'][_0x5b8a55(0xb5)](this,_0x2bc22e);}catch(_0x165fe0){if($gameTemp['isPlaytest']())console[_0x5b8a55(0x427)](_0x165fe0);}},Game_Player[_0x40c38a(0x32c)][_0x40c38a(0x428)]=function(){const _0x71090b=_0x40c38a,_0x3c6c07=$gameMap[_0x71090b(0x70)]();this[_0x71090b(0x296)]=Math[_0x71090b(0x26d)](_0x3c6c07)+Math[_0x71090b(0x26d)](_0x3c6c07)+this['encounterStepsMinimum']();},Game_Player[_0x40c38a(0x32c)][_0x40c38a(0x30b)]=function(){const _0x32ede3=_0x40c38a;return $dataMap&&$dataMap[_0x32ede3(0x5e7)]&&$dataMap['note'][_0x32ede3(0x311)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x32ede3(0x3a9)][_0x32ede3(0x558)][_0x32ede3(0x3c8)];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x155)]=Game_Event['prototype'][_0x40c38a(0x4ee)],Game_Event[_0x40c38a(0x32c)][_0x40c38a(0x4ee)]=function(_0x415bbb,_0x6563e3){const _0x253553=_0x40c38a;return this['isSmartEventCollisionOn']()?this[_0x253553(0x1fb)](_0x415bbb,_0x6563e3):VisuMZ[_0x253553(0x15b)][_0x253553(0x155)][_0x253553(0xb5)](this,_0x415bbb,_0x6563e3);},Game_Event['prototype'][_0x40c38a(0x474)]=function(){const _0x39e8cf=_0x40c38a;return VisuMZ['CoreEngine']['Settings'][_0x39e8cf(0x558)][_0x39e8cf(0x2eb)];},Game_Event[_0x40c38a(0x32c)][_0x40c38a(0x1fb)]=function(_0x4db0b8,_0x4ec9d6){const _0x3c99bc=_0x40c38a;if(!this['isNormalPriority']())return![];else{const _0x486301=$gameMap[_0x3c99bc(0x509)](_0x4db0b8,_0x4ec9d6)[_0x3c99bc(0x224)](_0x27c474=>_0x27c474['isNormalPriority']());return _0x486301[_0x3c99bc(0x4b7)]>0x0;}},VisuMZ[_0x40c38a(0x15b)]['Game_Interpreter_command111']=Game_Interpreter[_0x40c38a(0x32c)][_0x40c38a(0x4e0)],Game_Interpreter[_0x40c38a(0x32c)][_0x40c38a(0x4e0)]=function(_0x399d0b){const _0x32e46=_0x40c38a;try{VisuMZ[_0x32e46(0x15b)][_0x32e46(0x36c)]['call'](this,_0x399d0b);}catch(_0x35d206){$gameTemp['isPlaytest']()&&(console[_0x32e46(0x427)](_0x32e46(0x55a)),console[_0x32e46(0x427)](_0x35d206)),this['skipBranch']();}return!![];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x439)]=Game_Interpreter[_0x40c38a(0x32c)]['command122'],Game_Interpreter[_0x40c38a(0x32c)]['command122']=function(_0x491a27){const _0xeeda8f=_0x40c38a;try{VisuMZ[_0xeeda8f(0x15b)][_0xeeda8f(0x439)][_0xeeda8f(0xb5)](this,_0x491a27);}catch(_0x5a8cec){$gameTemp['isPlaytest']()&&(console[_0xeeda8f(0x427)]('Control\x20Variables\x20Script\x20Error'),console[_0xeeda8f(0x427)](_0x5a8cec));}return!![];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x42a)]=Game_Interpreter[_0x40c38a(0x32c)][_0x40c38a(0x4f3)],Game_Interpreter['prototype'][_0x40c38a(0x4f3)]=function(){const _0x6d78b0=_0x40c38a;try{VisuMZ[_0x6d78b0(0x15b)][_0x6d78b0(0x42a)]['call'](this);}catch(_0x3d2352){$gameTemp[_0x6d78b0(0xe4)]()&&(console[_0x6d78b0(0x427)](_0x6d78b0(0x2bd)),console['log'](_0x3d2352));}return!![];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1b2)]=Game_Interpreter[_0x40c38a(0x32c)]['command357'],Game_Interpreter[_0x40c38a(0x32c)][_0x40c38a(0x307)]=function(_0x52d0a1){const _0x4b68b9=_0x40c38a;return $gameTemp[_0x4b68b9(0x2d4)](this),VisuMZ['CoreEngine'][_0x4b68b9(0x1b2)][_0x4b68b9(0xb5)](this,_0x52d0a1);},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x1e6)]=function(){const _0x4f4fc9=_0x40c38a;return VisuMZ[_0x4f4fc9(0x15b)][_0x4f4fc9(0x3a9)]['UI'][_0x4f4fc9(0x163)];},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x4ec)]=function(){const _0xdd190b=_0x40c38a;return VisuMZ[_0xdd190b(0x15b)][_0xdd190b(0x3a9)]['UI']['BottomHelp'];},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x38b)]=function(){const _0x2579cc=_0x40c38a;return VisuMZ[_0x2579cc(0x15b)]['Settings']['UI'][_0x2579cc(0x456)];},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x1be)]=function(){const _0x2a9fe8=_0x40c38a;return VisuMZ['CoreEngine'][_0x2a9fe8(0x3a9)]['UI'][_0x2a9fe8(0x31a)];},Scene_Base['prototype'][_0x40c38a(0x413)]=function(){const _0xf298d7=_0x40c38a;return VisuMZ[_0xf298d7(0x15b)]['Settings']['UI'][_0xf298d7(0x370)];},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x3c4)]=function(){const _0x168c0e=_0x40c38a;return VisuMZ[_0x168c0e(0x15b)][_0x168c0e(0x3a9)]['UI'][_0x168c0e(0x8f)];},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x15f)]=function(){const _0x5c1d4d=_0x40c38a;return VisuMZ[_0x5c1d4d(0x15b)][_0x5c1d4d(0x3a9)][_0x5c1d4d(0x601)]['EnableMasking'];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x92)]=Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x1e3)],Scene_Base['prototype'][_0x40c38a(0x1e3)]=function(){const _0x51ae26=_0x40c38a;VisuMZ[_0x51ae26(0x15b)][_0x51ae26(0x92)][_0x51ae26(0xb5)](this),this['createButtonAssistWindow'](),this[_0x51ae26(0x582)]['x']=Math[_0x51ae26(0x239)](this['_windowLayer']['x']),this[_0x51ae26(0x582)]['y']=Math[_0x51ae26(0x239)](this['_windowLayer']['y']);},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x143)]=function(){},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x37c)]=function(){const _0x3f7d23=_0x40c38a;return TextManager['getInputMultiButtonStrings'](_0x3f7d23(0x7c),_0x3f7d23(0x294));},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x390)]=function(){const _0x2348db=_0x40c38a;return TextManager['getInputButtonString'](_0x2348db(0x2ac));},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x40f)]=function(){const _0x442d24=_0x40c38a;return TextManager['getInputButtonString'](_0x442d24(0x5fd));},Scene_Base[_0x40c38a(0x32c)]['buttonAssistKey4']=function(){const _0x1a59fe=_0x40c38a;return TextManager[_0x1a59fe(0x4f4)]('ok');},Scene_Base[_0x40c38a(0x32c)]['buttonAssistKey5']=function(){const _0x50d146=_0x40c38a;return TextManager[_0x50d146(0x4f4)](_0x50d146(0x5da));},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x383)]=function(){const _0xf51e99=_0x40c38a;return this[_0xf51e99(0x22f)]&&this['_pageupButton']['visible']?TextManager[_0xf51e99(0x3e3)]:'';},Scene_Base[_0x40c38a(0x32c)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x1bc)]=function(){return'';},Scene_Base['prototype']['buttonAssistText4']=function(){return TextManager['buttonAssistOk'];},Scene_Base['prototype']['buttonAssistText5']=function(){const _0x31f72c=_0x40c38a;return TextManager[_0x31f72c(0x514)];},Scene_Base['prototype'][_0x40c38a(0x369)]=function(){return 0x0;},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x342)]=function(){return 0x0;},Scene_Base[_0x40c38a(0x32c)][_0x40c38a(0x2f8)]=function(){return 0x0;},Scene_Base[_0x40c38a(0x32c)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3f4)]=Scene_Boot['prototype'][_0x40c38a(0x23b)],Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x23b)]=function(){const _0x2f75d8=_0x40c38a;VisuMZ['CoreEngine'][_0x2f75d8(0x3f4)][_0x2f75d8(0xb5)](this),this[_0x2f75d8(0x331)]();},Scene_Boot['prototype']['loadGameImagesCoreEngine']=function(){const _0x3b8db8=_0x40c38a,_0xff98c4=['animations','battlebacks1',_0x3b8db8(0x3a0),'characters',_0x3b8db8(0x2ab),_0x3b8db8(0x60a),_0x3b8db8(0xb1),_0x3b8db8(0x2db),_0x3b8db8(0x240),'sv_enemies','system',_0x3b8db8(0x611),_0x3b8db8(0x451),_0x3b8db8(0x1e0)];for(const _0x29f0d5 of _0xff98c4){const _0x4af3fd=VisuMZ['CoreEngine'][_0x3b8db8(0x3a9)]['ImgLoad'][_0x29f0d5],_0x23332f=_0x3b8db8(0x18d)[_0x3b8db8(0x276)](_0x29f0d5);for(const _0x432a55 of _0x4af3fd){ImageManager[_0x3b8db8(0x574)](_0x23332f,_0x432a55);}}},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0xfc)]=Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x583)],Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x583)]=function(){const _0x3a1117=_0x40c38a;Utils[_0x3a1117(0x375)](_0x3a1117(0x1ed))&&VisuMZ['CoreEngine'][_0x3a1117(0x3a9)][_0x3a1117(0x558)][_0x3a1117(0x60c)]?this[_0x3a1117(0x48d)]():VisuMZ[_0x3a1117(0x15b)][_0x3a1117(0xfc)][_0x3a1117(0xb5)](this);},Scene_Boot[_0x40c38a(0x32c)]['startAutoNewGame']=function(){DataManager['setupNewGame'](),SceneManager['goto'](Scene_Map);},Scene_Boot['prototype'][_0x40c38a(0x243)]=function(){const _0x303fc6=_0x40c38a,_0x2414ce=$dataSystem[_0x303fc6(0xc4)]['uiAreaWidth'],_0x13e7fd=$dataSystem[_0x303fc6(0xc4)][_0x303fc6(0x47c)],_0xca42fd=VisuMZ[_0x303fc6(0x15b)][_0x303fc6(0x3a9)]['UI'][_0x303fc6(0x24b)];Graphics[_0x303fc6(0x13b)]=_0x2414ce-_0xca42fd*0x2,Graphics[_0x303fc6(0x227)]=_0x13e7fd-_0xca42fd*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x40c38a(0x15b)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x40c38a(0x32c)]['updateDocumentTitle'],Scene_Boot['prototype'][_0x40c38a(0x3d7)]=function(){const _0x2093b9=_0x40c38a;this[_0x2093b9(0xd2)]()?this['makeDocumentTitle']():VisuMZ[_0x2093b9(0x15b)][_0x2093b9(0x41e)]['call'](this);},Scene_Boot[_0x40c38a(0x32c)]['isFullDocumentTitle']=function(){const _0x25a04e=_0x40c38a;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x25a04e(0x3d5)]==='Subtitle')return![];if(Scene_Title[_0x25a04e(0x2f7)]==='')return![];if(Scene_Title[_0x25a04e(0x2f7)]===_0x25a04e(0x52f))return![];return!![];},Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x288)]=function(){const _0x2646ac=_0x40c38a,_0x3b232c=$dataSystem['gameTitle'],_0xd66509=Scene_Title[_0x2646ac(0x3d5)]||'',_0x4cc807=Scene_Title[_0x2646ac(0x2f7)]||'',_0x27afdb=VisuMZ[_0x2646ac(0x15b)][_0x2646ac(0x3a9)][_0x2646ac(0x1f3)]['Title']['DocumentTitleFmt'],_0x496886=_0x27afdb[_0x2646ac(0x276)](_0x3b232c,_0xd66509,_0x4cc807);document[_0x2646ac(0x1d8)]=_0x496886;},Scene_Boot[_0x40c38a(0x32c)][_0x40c38a(0x1d6)]=function(){const _0x475433=_0x40c38a;if(VisuMZ[_0x475433(0x15b)][_0x475433(0x3a9)]['UI'][_0x475433(0x292)]){const _0x27acdf=Graphics[_0x475433(0x179)]-Graphics[_0x475433(0x13b)]-VisuMZ[_0x475433(0x15b)][_0x475433(0x3a9)]['UI'][_0x475433(0x24b)]*0x2,_0x53c734=Sprite_Button['prototype'][_0x475433(0x1b1)][_0x475433(0xb5)](this)*0x4;if(_0x27acdf>=_0x53c734)SceneManager[_0x475433(0x4c9)](!![]);}},Scene_Title[_0x40c38a(0x3d5)]=VisuMZ['CoreEngine'][_0x40c38a(0x3a9)][_0x40c38a(0x1f3)]['Title'][_0x40c38a(0x5a2)],Scene_Title['version']=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)][_0x40c38a(0x1f3)]['Title']['Version'],Scene_Title[_0x40c38a(0x477)]=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)][_0x40c38a(0x4da)],VisuMZ['CoreEngine']['Scene_Title_drawGameTitle']=Scene_Title['prototype']['drawGameTitle'],Scene_Title[_0x40c38a(0x32c)][_0x40c38a(0x2c0)]=function(){const _0x182f46=_0x40c38a;VisuMZ[_0x182f46(0x15b)][_0x182f46(0x3a9)][_0x182f46(0x1f3)]['Title']['drawGameTitle'][_0x182f46(0xb5)](this);if(Scene_Title[_0x182f46(0x3d5)]!==''&&Scene_Title['subtitle']!==_0x182f46(0x5a2))this[_0x182f46(0x244)]();if(Scene_Title[_0x182f46(0x2f7)]!==''&&Scene_Title[_0x182f46(0x2f7)]!=='0.00')this[_0x182f46(0x5f2)]();},Scene_Title[_0x40c38a(0x32c)][_0x40c38a(0x244)]=function(){const _0x202adf=_0x40c38a;VisuMZ[_0x202adf(0x15b)]['Settings']['MenuLayout']['Title'][_0x202adf(0x244)][_0x202adf(0xb5)](this);},Scene_Title[_0x40c38a(0x32c)][_0x40c38a(0x5f2)]=function(){const _0x573f28=_0x40c38a;VisuMZ[_0x573f28(0x15b)]['Settings'][_0x573f28(0x1f3)][_0x573f28(0x2ba)]['drawGameVersion'][_0x573f28(0xb5)](this);},Scene_Title['prototype']['createCommandWindow']=function(){const _0x8ebcf1=_0x40c38a;this[_0x8ebcf1(0x53f)]();const _0x419b20=$dataSystem[_0x8ebcf1(0x336)][_0x8ebcf1(0x2a5)],_0x55580b=this['commandWindowRect']();this[_0x8ebcf1(0x10a)]=new Window_TitleCommand(_0x55580b),this['_commandWindow'][_0x8ebcf1(0x2a3)](_0x419b20);const _0x49c58c=this[_0x8ebcf1(0x2f4)]();this[_0x8ebcf1(0x10a)][_0x8ebcf1(0x33e)](_0x49c58c['x'],_0x49c58c['y'],_0x49c58c[_0x8ebcf1(0x179)],_0x49c58c['height']),this[_0x8ebcf1(0x194)](this[_0x8ebcf1(0x10a)]);},Scene_Title[_0x40c38a(0x32c)][_0x40c38a(0x160)]=function(){const _0x200ea8=_0x40c38a;return this[_0x200ea8(0x10a)]?this[_0x200ea8(0x10a)][_0x200ea8(0x562)]():VisuMZ[_0x200ea8(0x15b)][_0x200ea8(0x3a9)][_0x200ea8(0x454)][_0x200ea8(0x4b7)];},Scene_Title['prototype'][_0x40c38a(0x2f4)]=function(){const _0x86f7=_0x40c38a;return VisuMZ['CoreEngine'][_0x86f7(0x3a9)][_0x86f7(0x1f3)]['Title'][_0x86f7(0x41a)][_0x86f7(0xb5)](this);},Scene_Title[_0x40c38a(0x32c)][_0x40c38a(0x53f)]=function(){const _0x315ea3=_0x40c38a;for(const _0x58fb6d of Scene_Title[_0x315ea3(0x477)]){const _0x3af4a1=new Sprite_TitlePictureButton(_0x58fb6d);this['addChild'](_0x3af4a1);}},VisuMZ['CoreEngine'][_0x40c38a(0xf3)]=Scene_Map['prototype'][_0x40c38a(0xe1)],Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(){const _0x21422b=_0x40c38a;VisuMZ[_0x21422b(0x15b)][_0x21422b(0xf3)][_0x21422b(0xb5)](this),$gameTemp[_0x21422b(0x58d)]();},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1e5)]=Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x319)],Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x319)]=function(){const _0x462d50=_0x40c38a;VisuMZ[_0x462d50(0x15b)]['Scene_Map_updateMainMultiply']['call'](this),$gameTemp[_0x462d50(0x3cf)]&&!$gameMessage[_0x462d50(0x60b)]()&&(this[_0x462d50(0x4c0)](),SceneManager['updateEffekseer']());},Scene_Map['prototype'][_0x40c38a(0x18c)]=function(){const _0x10c284=_0x40c38a;Scene_Message[_0x10c284(0x32c)]['terminate'][_0x10c284(0xb5)](this),!SceneManager[_0x10c284(0x5aa)](Scene_Battle)&&(this['_spriteset'][_0x10c284(0x4df)](),this[_0x10c284(0x1a8)][_0x10c284(0x27a)](),this[_0x10c284(0x582)][_0x10c284(0x273)]=![],SceneManager[_0x10c284(0x5b4)]()),$gameScreen[_0x10c284(0x329)]();},VisuMZ[_0x40c38a(0x15b)]['Scene_Map_createMenuButton']=Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x3a4)],Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x3a4)]=function(){const _0x47a50c=_0x40c38a;VisuMZ['CoreEngine']['Scene_Map_createMenuButton'][_0x47a50c(0xb5)](this),SceneManager[_0x47a50c(0x270)]()&&this[_0x47a50c(0x20b)]();},Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x20b)]=function(){const _0x5cb151=_0x40c38a;this[_0x5cb151(0x102)]['x']=Graphics[_0x5cb151(0x13b)]+0x4;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0xf2)]=Scene_Map['prototype']['updateScene'],Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x51d)]=function(){const _0x48aadd=_0x40c38a;VisuMZ[_0x48aadd(0x15b)][_0x48aadd(0xf2)]['call'](this),this[_0x48aadd(0x40b)]();},Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x40b)]=function(){const _0x736fa=_0x40c38a;Input[_0x736fa(0x3d8)]('dashToggle')&&(ConfigManager[_0x736fa(0x4eb)]=!ConfigManager['alwaysDash'],ConfigManager[_0x736fa(0x548)]());},VisuMZ[_0x40c38a(0x15b)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x2d7)],Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x2d7)]=function(){const _0x2b5a73=_0x40c38a;let _0x73f77e=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x73f77e=this[_0x2b5a73(0x50f)]():_0x73f77e=VisuMZ[_0x2b5a73(0x15b)][_0x2b5a73(0x24d)][_0x2b5a73(0xb5)](this),this[_0x2b5a73(0x2ad)]()&&this['getButtonAssistLocation']()===_0x2b5a73(0x5b6)&&(_0x73f77e+=Window_ButtonAssist[_0x2b5a73(0x32c)][_0x2b5a73(0x4c3)]()),_0x73f77e;},Scene_MenuBase[_0x40c38a(0x32c)]['helpAreaTopSideButtonLayout']=function(){const _0x437851=_0x40c38a;return this[_0x437851(0x4ec)]()?this['mainAreaBottom']():0x0;},VisuMZ[_0x40c38a(0x15b)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x2c2)],Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x2c2)]=function(){const _0x34057b=_0x40c38a;return SceneManager[_0x34057b(0x7f)]()?this[_0x34057b(0xa5)]():VisuMZ[_0x34057b(0x15b)][_0x34057b(0x5e2)]['call'](this);},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0xa5)]=function(){const _0x5039fb=_0x40c38a;return!this[_0x5039fb(0x4ec)]()?this['helpAreaBottom']():0x0;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x27c)]=Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x51c)],Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x51c)]=function(){const _0x332b7a=_0x40c38a;let _0x2bad44=0x0;return SceneManager[_0x332b7a(0x7f)]()?_0x2bad44=this[_0x332b7a(0xf1)]():_0x2bad44=VisuMZ[_0x332b7a(0x15b)][_0x332b7a(0x27c)][_0x332b7a(0xb5)](this),this[_0x332b7a(0x2ad)]()&&this['getButtonAssistLocation']()!=='button'&&(_0x2bad44-=Window_ButtonAssist['prototype'][_0x332b7a(0x4c3)]()),_0x2bad44;},Scene_MenuBase[_0x40c38a(0x32c)]['mainAreaHeightSideButtonLayout']=function(){const _0x22c39e=_0x40c38a;return Graphics[_0x22c39e(0x227)]-this['helpAreaHeight']();},VisuMZ['CoreEngine'][_0x40c38a(0x491)]=Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x2ff)],Scene_MenuBase[_0x40c38a(0x32c)]['createBackground']=function(){const _0x515eb0=_0x40c38a;this[_0x515eb0(0x404)]=new PIXI['filters'][(_0x515eb0(0x2c9))](clamp=!![]),this[_0x515eb0(0x599)]=new Sprite(),this[_0x515eb0(0x599)]['bitmap']=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x515eb0(0x210)]=[this[_0x515eb0(0x404)]],this[_0x515eb0(0x519)](this[_0x515eb0(0x599)]),this[_0x515eb0(0x52d)](0xc0),this[_0x515eb0(0x52d)](this[_0x515eb0(0x29e)]()),this[_0x515eb0(0x316)]();},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x29e)]=function(){const _0x2416ef=_0x40c38a,_0x17889d=String(this[_0x2416ef(0x415)]['name']),_0x232b49=this['getCustomBackgroundSettings'](_0x17889d);return _0x232b49?_0x232b49['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype'][_0x40c38a(0x316)]=function(){const _0x5afdce=_0x40c38a,_0x5931c5=String(this[_0x5afdce(0x415)][_0x5afdce(0x615)]),_0x40d067=this[_0x5afdce(0x3a6)](_0x5931c5);_0x40d067&&(_0x40d067['BgFilename1']!==''||_0x40d067['BgFilename2']!=='')&&(this[_0x5afdce(0x1e9)]=new Sprite(ImageManager['loadTitle1'](_0x40d067['BgFilename1'])),this[_0x5afdce(0x46a)]=new Sprite(ImageManager[_0x5afdce(0x3a5)](_0x40d067[_0x5afdce(0x7b)])),this[_0x5afdce(0x519)](this[_0x5afdce(0x1e9)]),this['addChild'](this[_0x5afdce(0x46a)]),this['_backSprite1']['bitmap'][_0x5afdce(0x559)](this[_0x5afdce(0x153)][_0x5afdce(0x271)](this,this['_backSprite1'])),this[_0x5afdce(0x46a)]['bitmap'][_0x5afdce(0x559)](this['adjustSprite'][_0x5afdce(0x271)](this,this[_0x5afdce(0x46a)])));},Scene_MenuBase[_0x40c38a(0x32c)]['getCustomBackgroundSettings']=function(_0x5ea319){const _0x377a20=_0x40c38a;return VisuMZ[_0x377a20(0x15b)]['Settings'][_0x377a20(0x58a)][_0x5ea319]||VisuMZ[_0x377a20(0x15b)][_0x377a20(0x3a9)][_0x377a20(0x58a)]['Scene_Unlisted'];},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x153)]=function(_0x3a61da){const _0x19a3a2=_0x40c38a;this[_0x19a3a2(0x23a)](_0x3a61da),this[_0x19a3a2(0x2b1)](_0x3a61da);},VisuMZ[_0x40c38a(0x15b)]['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x304)],Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x304)]=function(){const _0x1d15a4=_0x40c38a;VisuMZ[_0x1d15a4(0x15b)][_0x1d15a4(0x2bb)]['call'](this),SceneManager[_0x1d15a4(0x270)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x40c38a(0x32c)]['moveCancelButtonSideButtonLayout']=function(){const _0x4d5231=_0x40c38a;this['_cancelButton']['x']=Graphics[_0x4d5231(0x13b)]+0x4;},VisuMZ[_0x40c38a(0x15b)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x43b)],Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x43b)]=function(){const _0x685408=_0x40c38a;VisuMZ[_0x685408(0x15b)][_0x685408(0x42e)]['call'](this),SceneManager[_0x685408(0x270)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0xc9)]=function(){const _0x2b2d4f=_0x40c38a;this[_0x2b2d4f(0x22f)]['x']=-0x1*(this[_0x2b2d4f(0x22f)][_0x2b2d4f(0x179)]+this['_pagedownButton'][_0x2b2d4f(0x179)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x2b2d4f(0x1d4)]['width']+0x4);},Scene_MenuBase[_0x40c38a(0x32c)]['isMenuButtonAssistEnabled']=function(){const _0x5b6cef=_0x40c38a;return VisuMZ['CoreEngine'][_0x5b6cef(0x3a9)][_0x5b6cef(0x14b)]['Enable'];},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x4ad)]=function(){const _0x392dd1=_0x40c38a;return SceneManager[_0x392dd1(0x270)]()||SceneManager[_0x392dd1(0x10b)]()?VisuMZ['CoreEngine'][_0x392dd1(0x3a9)][_0x392dd1(0x14b)][_0x392dd1(0x1f8)]:_0x392dd1(0x9d);},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x143)]=function(){const _0x45f99f=_0x40c38a;if(!this[_0x45f99f(0x2ad)]())return;const _0x5445ae=this[_0x45f99f(0x527)]();this[_0x45f99f(0x5a8)]=new Window_ButtonAssist(_0x5445ae),this[_0x45f99f(0x194)](this[_0x45f99f(0x5a8)]);},Scene_MenuBase['prototype'][_0x40c38a(0x527)]=function(){const _0x4fa8d0=_0x40c38a;return this[_0x4fa8d0(0x4ad)]()===_0x4fa8d0(0x9d)?this[_0x4fa8d0(0x602)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x602)]=function(){const _0x38ef59=_0x40c38a,_0x5a3361=ConfigManager[_0x38ef59(0x50c)]?(Sprite_Button[_0x38ef59(0x32c)][_0x38ef59(0x1b1)]()+0x6)*0x2:0x0,_0x250db0=this[_0x38ef59(0x4a0)](),_0x540eee=Graphics[_0x38ef59(0x13b)]-_0x5a3361*0x2,_0x11c305=this[_0x38ef59(0x3c4)]();return new Rectangle(_0x5a3361,_0x250db0,_0x540eee,_0x11c305);},Scene_MenuBase[_0x40c38a(0x32c)][_0x40c38a(0x118)]=function(){const _0x2e9c14=_0x40c38a,_0x20ce5f=Graphics[_0x2e9c14(0x13b)],_0x35c3dc=Window_ButtonAssist[_0x2e9c14(0x32c)][_0x2e9c14(0x4c3)](),_0x13bde0=0x0;let _0x1f7a87=0x0;return this[_0x2e9c14(0x4ad)]()===_0x2e9c14(0x5b6)?_0x1f7a87=0x0:_0x1f7a87=Graphics['boxHeight']-_0x35c3dc,new Rectangle(_0x13bde0,_0x1f7a87,_0x20ce5f,_0x35c3dc);},Scene_Menu[_0x40c38a(0x406)]=VisuMZ[_0x40c38a(0x15b)]['Settings'][_0x40c38a(0x1f3)][_0x40c38a(0x2bf)],VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x6e)]=Scene_Menu[_0x40c38a(0x32c)][_0x40c38a(0x488)],Scene_Menu[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x44f588=_0x40c38a;VisuMZ[_0x44f588(0x15b)]['Scene_Menu_create'][_0x44f588(0xb5)](this),this[_0x44f588(0x306)]();},Scene_Menu[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0x341d33=_0x40c38a;this['_commandWindow']&&this['_commandWindow'][_0x341d33(0x2a3)](Scene_Menu[_0x341d33(0x406)][_0x341d33(0x53b)]),this[_0x341d33(0x448)]&&this[_0x341d33(0x448)]['setBackgroundType'](Scene_Menu[_0x341d33(0x406)][_0x341d33(0x25d)]),this[_0x341d33(0x555)]&&this[_0x341d33(0x555)][_0x341d33(0x2a3)](Scene_Menu[_0x341d33(0x406)]['StatusBgType']);},Scene_Menu[_0x40c38a(0x32c)][_0x40c38a(0x2f4)]=function(){const _0x506713=_0x40c38a;return Scene_Menu['layoutSettings'][_0x506713(0x41a)]['call'](this);},Scene_Menu['prototype'][_0x40c38a(0x253)]=function(){const _0x41a4d9=_0x40c38a;return Scene_Menu[_0x41a4d9(0x406)][_0x41a4d9(0x167)]['call'](this);},Scene_Menu[_0x40c38a(0x32c)][_0x40c38a(0x485)]=function(){const _0x5185d2=_0x40c38a;return Scene_Menu[_0x5185d2(0x406)][_0x5185d2(0x48c)][_0x5185d2(0xb5)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)]['MenuLayout']['ItemMenu'],VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x502)]=Scene_Item['prototype'][_0x40c38a(0x488)],Scene_Item[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x5181d2=_0x40c38a;VisuMZ['CoreEngine'][_0x5181d2(0x502)][_0x5181d2(0xb5)](this),this[_0x5181d2(0x306)]();},Scene_Item[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0x33d13d=_0x40c38a;this['_helpWindow']&&this[_0x33d13d(0x487)][_0x33d13d(0x2a3)](Scene_Item['layoutSettings']['HelpBgType']),this['_categoryWindow']&&this[_0x33d13d(0x31b)]['setBackgroundType'](Scene_Item[_0x33d13d(0x406)][_0x33d13d(0x551)]),this[_0x33d13d(0x5f6)]&&this[_0x33d13d(0x5f6)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x33d13d(0x50a)]),this[_0x33d13d(0x4f5)]&&this['_actorWindow'][_0x33d13d(0x2a3)](Scene_Item[_0x33d13d(0x406)][_0x33d13d(0x3ad)]);},Scene_Item[_0x40c38a(0x32c)][_0x40c38a(0x4a8)]=function(){const _0x1223d5=_0x40c38a;return Scene_Item[_0x1223d5(0x406)][_0x1223d5(0x481)][_0x1223d5(0xb5)](this);},Scene_Item[_0x40c38a(0x32c)]['categoryWindowRect']=function(){const _0x88694a=_0x40c38a;return Scene_Item['layoutSettings'][_0x88694a(0x55d)]['call'](this);},Scene_Item[_0x40c38a(0x32c)][_0x40c38a(0x16d)]=function(){const _0x510e3c=_0x40c38a;return Scene_Item[_0x510e3c(0x406)][_0x510e3c(0x25f)][_0x510e3c(0xb5)](this);},Scene_Item['prototype'][_0x40c38a(0x397)]=function(){const _0x5423fe=_0x40c38a;return Scene_Item[_0x5423fe(0x406)][_0x5423fe(0x508)]['call'](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x40c38a(0x15b)]['Settings'][_0x40c38a(0x1f3)][_0x40c38a(0x372)],VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x99)]=Scene_Skill['prototype'][_0x40c38a(0x488)],Scene_Skill[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x17e102=_0x40c38a;VisuMZ[_0x17e102(0x15b)][_0x17e102(0x99)][_0x17e102(0xb5)](this),this[_0x17e102(0x306)]();},Scene_Skill[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0x4e7b20=_0x40c38a;this[_0x4e7b20(0x487)]&&this[_0x4e7b20(0x487)][_0x4e7b20(0x2a3)](Scene_Skill['layoutSettings']['HelpBgType']),this[_0x4e7b20(0x5ce)]&&this[_0x4e7b20(0x5ce)][_0x4e7b20(0x2a3)](Scene_Skill[_0x4e7b20(0x406)][_0x4e7b20(0x169)]),this[_0x4e7b20(0x555)]&&this[_0x4e7b20(0x555)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x4e7b20(0x546)]),this[_0x4e7b20(0x5f6)]&&this[_0x4e7b20(0x5f6)]['setBackgroundType'](Scene_Skill['layoutSettings']['ItemBgType']),this['_actorWindow']&&this['_actorWindow']['setBackgroundType'](Scene_Skill[_0x4e7b20(0x406)]['ActorBgType']);},Scene_Skill[_0x40c38a(0x32c)]['helpWindowRect']=function(){const _0x31dd28=_0x40c38a;return Scene_Skill[_0x31dd28(0x406)][_0x31dd28(0x481)][_0x31dd28(0xb5)](this);},Scene_Skill[_0x40c38a(0x32c)]['skillTypeWindowRect']=function(){const _0x34709a=_0x40c38a;return Scene_Skill[_0x34709a(0x406)][_0x34709a(0x220)][_0x34709a(0xb5)](this);},Scene_Skill[_0x40c38a(0x32c)][_0x40c38a(0x485)]=function(){const _0x5708ad=_0x40c38a;return Scene_Skill[_0x5708ad(0x406)][_0x5708ad(0x48c)][_0x5708ad(0xb5)](this);},Scene_Skill[_0x40c38a(0x32c)][_0x40c38a(0x16d)]=function(){const _0x220849=_0x40c38a;return Scene_Skill[_0x220849(0x406)][_0x220849(0x25f)]['call'](this);},Scene_Skill[_0x40c38a(0x32c)][_0x40c38a(0x397)]=function(){const _0x4ed515=_0x40c38a;return Scene_Skill['layoutSettings'][_0x4ed515(0x508)]['call'](this);},Scene_Equip[_0x40c38a(0x406)]=VisuMZ['CoreEngine'][_0x40c38a(0x3a9)][_0x40c38a(0x1f3)][_0x40c38a(0x54a)],VisuMZ['CoreEngine']['Scene_Equip_create']=Scene_Equip[_0x40c38a(0x32c)][_0x40c38a(0x488)],Scene_Equip[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x4e8c4f=_0x40c38a;VisuMZ[_0x4e8c4f(0x15b)][_0x4e8c4f(0x545)]['call'](this),this[_0x4e8c4f(0x306)]();},Scene_Equip[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0x52c4e9=_0x40c38a;this['_helpWindow']&&this[_0x52c4e9(0x487)][_0x52c4e9(0x2a3)](Scene_Equip[_0x52c4e9(0x406)]['HelpBgType']),this[_0x52c4e9(0x555)]&&this[_0x52c4e9(0x555)][_0x52c4e9(0x2a3)](Scene_Equip[_0x52c4e9(0x406)][_0x52c4e9(0x546)]),this[_0x52c4e9(0x10a)]&&this['_commandWindow'][_0x52c4e9(0x2a3)](Scene_Equip[_0x52c4e9(0x406)][_0x52c4e9(0x53b)]),this[_0x52c4e9(0x130)]&&this[_0x52c4e9(0x130)][_0x52c4e9(0x2a3)](Scene_Equip[_0x52c4e9(0x406)][_0x52c4e9(0x260)]),this[_0x52c4e9(0x5f6)]&&this[_0x52c4e9(0x5f6)][_0x52c4e9(0x2a3)](Scene_Equip[_0x52c4e9(0x406)][_0x52c4e9(0x50a)]);},Scene_Equip[_0x40c38a(0x32c)][_0x40c38a(0x4a8)]=function(){const _0x955714=_0x40c38a;return Scene_Equip[_0x955714(0x406)]['HelpRect'][_0x955714(0xb5)](this);},Scene_Equip[_0x40c38a(0x32c)][_0x40c38a(0x485)]=function(){const _0x4a0415=_0x40c38a;return Scene_Equip[_0x4a0415(0x406)][_0x4a0415(0x48c)][_0x4a0415(0xb5)](this);},Scene_Equip[_0x40c38a(0x32c)]['commandWindowRect']=function(){const _0x8da784=_0x40c38a;return Scene_Equip['layoutSettings'][_0x8da784(0x41a)][_0x8da784(0xb5)](this);},Scene_Equip[_0x40c38a(0x32c)]['slotWindowRect']=function(){const _0x557003=_0x40c38a;return Scene_Equip[_0x557003(0x406)][_0x557003(0x104)][_0x557003(0xb5)](this);},Scene_Equip['prototype'][_0x40c38a(0x16d)]=function(){const _0x19bd15=_0x40c38a;return Scene_Equip['layoutSettings'][_0x19bd15(0x25f)]['call'](this);},Scene_Status[_0x40c38a(0x406)]=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)][_0x40c38a(0x1f3)][_0x40c38a(0x2da)],VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x429)]=Scene_Status[_0x40c38a(0x32c)][_0x40c38a(0x488)],Scene_Status[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x29ac14=_0x40c38a;VisuMZ[_0x29ac14(0x15b)]['Scene_Status_create']['call'](this),this[_0x29ac14(0x306)]();},Scene_Status[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0x51918d=_0x40c38a;this[_0x51918d(0x41d)]&&this[_0x51918d(0x41d)][_0x51918d(0x2a3)](Scene_Status['layoutSettings'][_0x51918d(0xe9)]),this[_0x51918d(0x555)]&&this[_0x51918d(0x555)]['setBackgroundType'](Scene_Status[_0x51918d(0x406)][_0x51918d(0x546)]),this[_0x51918d(0x536)]&&this['_statusParamsWindow']['setBackgroundType'](Scene_Status['layoutSettings'][_0x51918d(0x544)]),this[_0x51918d(0x1d5)]&&this['_statusEquipWindow'][_0x51918d(0x2a3)](Scene_Status['layoutSettings'][_0x51918d(0x604)]);},Scene_Status[_0x40c38a(0x32c)]['profileWindowRect']=function(){const _0x3a8627=_0x40c38a;return Scene_Status[_0x3a8627(0x406)][_0x3a8627(0x53d)][_0x3a8627(0xb5)](this);},Scene_Status['prototype'][_0x40c38a(0x485)]=function(){const _0x2a02fe=_0x40c38a;return Scene_Status[_0x2a02fe(0x406)]['StatusRect'][_0x2a02fe(0xb5)](this);},Scene_Status[_0x40c38a(0x32c)][_0x40c38a(0xa4)]=function(){const _0x5796f4=_0x40c38a;return Scene_Status[_0x5796f4(0x406)][_0x5796f4(0x54d)][_0x5796f4(0xb5)](this);},Scene_Status['prototype'][_0x40c38a(0x58b)]=function(){const _0x379df3=_0x40c38a;return Scene_Status[_0x379df3(0x406)][_0x379df3(0x3ea)][_0x379df3(0xb5)](this);},Scene_Options[_0x40c38a(0x406)]=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)][_0x40c38a(0x1f3)][_0x40c38a(0x15e)],VisuMZ[_0x40c38a(0x15b)]['Scene_Options_create']=Scene_Options[_0x40c38a(0x32c)][_0x40c38a(0x488)],Scene_Options[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x4c0a52=_0x40c38a;VisuMZ[_0x4c0a52(0x15b)]['Scene_Options_create'][_0x4c0a52(0xb5)](this),this[_0x4c0a52(0x306)]();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x18bfc4=_0x40c38a;this['_optionsWindow']&&this[_0x18bfc4(0x11d)][_0x18bfc4(0x2a3)](Scene_Options[_0x18bfc4(0x406)][_0x18bfc4(0x310)]);},Scene_Options[_0x40c38a(0x32c)]['optionsWindowRect']=function(){const _0x1b81d0=_0x40c38a;return Scene_Options['layoutSettings'][_0x1b81d0(0x5be)]['call'](this);},Scene_Save[_0x40c38a(0x406)]=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)]['MenuLayout'][_0x40c38a(0x4d1)],Scene_Save[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x7eac8b=_0x40c38a;Scene_File[_0x7eac8b(0x32c)][_0x7eac8b(0x488)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0xbd738d=_0x40c38a;this[_0xbd738d(0x487)]&&this['_helpWindow'][_0xbd738d(0x2a3)](Scene_Save[_0xbd738d(0x406)]['HelpBgType']),this['_listWindow']&&this[_0xbd738d(0x453)][_0xbd738d(0x2a3)](Scene_Save['layoutSettings'][_0xbd738d(0x5c5)]);},Scene_Save[_0x40c38a(0x32c)][_0x40c38a(0x4a8)]=function(){const _0xe08572=_0x40c38a;return Scene_Save[_0xe08572(0x406)][_0xe08572(0x481)]['call'](this);},Scene_Save[_0x40c38a(0x32c)][_0x40c38a(0x449)]=function(){const _0x200b4f=_0x40c38a;return Scene_Save['layoutSettings'][_0x200b4f(0x1cc)]['call'](this);},Scene_Load[_0x40c38a(0x406)]=VisuMZ[_0x40c38a(0x15b)]['Settings'][_0x40c38a(0x1f3)]['LoadMenu'],Scene_Load[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x5add54=_0x40c38a;Scene_File['prototype'][_0x5add54(0x488)][_0x5add54(0xb5)](this),this[_0x5add54(0x306)]();},Scene_Load[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0x534f86=_0x40c38a;this[_0x534f86(0x487)]&&this[_0x534f86(0x487)][_0x534f86(0x2a3)](Scene_Load[_0x534f86(0x406)][_0x534f86(0x214)]),this['_listWindow']&&this[_0x534f86(0x453)][_0x534f86(0x2a3)](Scene_Load['layoutSettings'][_0x534f86(0x5c5)]);},Scene_Load['prototype'][_0x40c38a(0x4a8)]=function(){const _0x3c6200=_0x40c38a;return Scene_Load['layoutSettings'][_0x3c6200(0x481)][_0x3c6200(0xb5)](this);},Scene_Load['prototype'][_0x40c38a(0x449)]=function(){const _0x209eb3=_0x40c38a;return Scene_Load[_0x209eb3(0x406)][_0x209eb3(0x1cc)][_0x209eb3(0xb5)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)]['MenuLayout'][_0x40c38a(0x49c)],VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0xbe)]=Scene_GameEnd[_0x40c38a(0x32c)][_0x40c38a(0x2ff)],Scene_GameEnd['prototype'][_0x40c38a(0x2ff)]=function(){const _0x1103c2=_0x40c38a;Scene_MenuBase[_0x1103c2(0x32c)][_0x1103c2(0x2ff)]['call'](this);},Scene_GameEnd[_0x40c38a(0x32c)][_0x40c38a(0x38d)]=function(){const _0x2c4c95=_0x40c38a,_0x5b8482=this[_0x2c4c95(0x2f4)]();this[_0x2c4c95(0x10a)]=new Window_GameEnd(_0x5b8482),this[_0x2c4c95(0x10a)][_0x2c4c95(0x136)]('cancel',this[_0x2c4c95(0x34f)][_0x2c4c95(0x271)](this)),this['addWindow'](this[_0x2c4c95(0x10a)]),this[_0x2c4c95(0x10a)][_0x2c4c95(0x2a3)](Scene_GameEnd[_0x2c4c95(0x406)][_0x2c4c95(0x53b)]);},Scene_GameEnd['prototype'][_0x40c38a(0x2f4)]=function(){const _0x1c7783=_0x40c38a;return Scene_GameEnd[_0x1c7783(0x406)][_0x1c7783(0x41a)][_0x1c7783(0xb5)](this);},Scene_Shop['layoutSettings']=VisuMZ['CoreEngine'][_0x40c38a(0x3a9)][_0x40c38a(0x1f3)]['ShopMenu'],VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x2df)]=Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x488)],Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x488)]=function(){const _0x28af92=_0x40c38a;VisuMZ[_0x28af92(0x15b)][_0x28af92(0x2df)][_0x28af92(0xb5)](this),this[_0x28af92(0x306)]();},Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x306)]=function(){const _0x4be101=_0x40c38a;this['_helpWindow']&&this[_0x4be101(0x487)][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)]['HelpBgType']),this[_0x4be101(0x448)]&&this['_goldWindow'][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)][_0x4be101(0x25d)]),this['_commandWindow']&&this[_0x4be101(0x10a)][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)][_0x4be101(0x53b)]),this['_dummyWindow']&&this['_dummyWindow'][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)][_0x4be101(0x340)]),this['_numberWindow']&&this[_0x4be101(0x40d)][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)][_0x4be101(0x256)]),this['_statusWindow']&&this['_statusWindow']['setBackgroundType'](Scene_Shop['layoutSettings']['StatusBgType']),this['_buyWindow']&&this[_0x4be101(0x2a2)][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)]['BuyBgType']),this[_0x4be101(0x31b)]&&this[_0x4be101(0x31b)][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)][_0x4be101(0x551)]),this[_0x4be101(0x524)]&&this[_0x4be101(0x524)][_0x4be101(0x2a3)](Scene_Shop[_0x4be101(0x406)][_0x4be101(0x2e5)]);},Scene_Shop['prototype'][_0x40c38a(0x4a8)]=function(){const _0x4e6e78=_0x40c38a;return Scene_Shop[_0x4e6e78(0x406)][_0x4e6e78(0x481)]['call'](this);},Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x253)]=function(){const _0x4e4a12=_0x40c38a;return Scene_Shop[_0x4e4a12(0x406)][_0x4e4a12(0x167)]['call'](this);},Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x2f4)]=function(){const _0x196620=_0x40c38a;return Scene_Shop[_0x196620(0x406)][_0x196620(0x41a)]['call'](this);},Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x124)]=function(){const _0x37aa91=_0x40c38a;return Scene_Shop[_0x37aa91(0x406)][_0x37aa91(0x36a)][_0x37aa91(0xb5)](this);},Scene_Shop['prototype'][_0x40c38a(0x4e3)]=function(){const _0x317166=_0x40c38a;return Scene_Shop[_0x317166(0x406)][_0x317166(0x2d1)][_0x317166(0xb5)](this);},Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x485)]=function(){const _0x26eb94=_0x40c38a;return Scene_Shop[_0x26eb94(0x406)][_0x26eb94(0x48c)][_0x26eb94(0xb5)](this);},Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x5f5)]=function(){const _0xa39fa4=_0x40c38a;return Scene_Shop[_0xa39fa4(0x406)][_0xa39fa4(0x5b2)][_0xa39fa4(0xb5)](this);},Scene_Shop['prototype'][_0x40c38a(0x1f7)]=function(){const _0x7bc665=_0x40c38a;return Scene_Shop['layoutSettings'][_0x7bc665(0x55d)][_0x7bc665(0xb5)](this);},Scene_Shop[_0x40c38a(0x32c)][_0x40c38a(0x2a4)]=function(){const _0x25b646=_0x40c38a;return Scene_Shop['layoutSettings']['SellRect'][_0x25b646(0xb5)](this);},Scene_Name[_0x40c38a(0x406)]=VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)]['MenuLayout'][_0x40c38a(0x1ca)],VisuMZ[_0x40c38a(0x15b)]['Scene_Name_create']=Scene_Name[_0x40c38a(0x32c)]['create'],Scene_Name[_0x40c38a(0x32c)]['create']=function(){const _0x4daff3=_0x40c38a;VisuMZ['CoreEngine']['Scene_Name_create'][_0x4daff3(0xb5)](this),this[_0x4daff3(0x306)]();},Scene_Name[_0x40c38a(0x32c)]['setCoreEngineUpdateWindowBg']=function(){const _0x380e2d=_0x40c38a;this[_0x380e2d(0xb7)]&&this[_0x380e2d(0xb7)]['setBackgroundType'](Scene_Name['layoutSettings'][_0x380e2d(0x37f)]),this[_0x380e2d(0x572)]&&this[_0x380e2d(0x572)]['setBackgroundType'](Scene_Name['layoutSettings']['InputBgType']);},Scene_Name[_0x40c38a(0x32c)][_0x40c38a(0x182)]=function(){return 0x0;},Scene_Name[_0x40c38a(0x32c)][_0x40c38a(0x365)]=function(){const _0x522ab2=_0x40c38a;return Scene_Name[_0x522ab2(0x406)][_0x522ab2(0x21b)]['call'](this);},Scene_Name['prototype'][_0x40c38a(0x138)]=function(){const _0x2da682=_0x40c38a;return Scene_Name[_0x2da682(0x406)]['InputRect'][_0x2da682(0xb5)](this);},Scene_Name[_0x40c38a(0x32c)][_0x40c38a(0x5e0)]=function(){const _0x54feb4=_0x40c38a;if(!this[_0x54feb4(0x572)])return![];return VisuMZ[_0x54feb4(0x15b)][_0x54feb4(0x3a9)][_0x54feb4(0x618)][_0x54feb4(0x5e0)];},Scene_Name[_0x40c38a(0x32c)][_0x40c38a(0x37c)]=function(){const _0x3d90e3=_0x40c38a;return this[_0x3d90e3(0x5e0)]()?TextManager['getInputButtonString'](_0x3d90e3(0x2ac)):Scene_MenuBase[_0x3d90e3(0x32c)][_0x3d90e3(0x37c)][_0x3d90e3(0xb5)](this);},Scene_Name['prototype'][_0x40c38a(0x383)]=function(){const _0x3de105=_0x40c38a;if(this[_0x3de105(0x5e0)]()){const _0xa215ba=VisuMZ[_0x3de105(0x15b)][_0x3de105(0x3a9)][_0x3de105(0x618)];return this['_inputWindow'][_0x3de105(0x2ee)]===_0x3de105(0x203)?_0xa215ba['Keyboard']||'Keyboard':_0xa215ba[_0x3de105(0x377)]||_0x3de105(0x377);}else return Scene_MenuBase[_0x3de105(0x32c)][_0x3de105(0x383)][_0x3de105(0xb5)](this);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5dc)]=Scene_Battle[_0x40c38a(0x32c)][_0x40c38a(0x4df)],Scene_Battle[_0x40c38a(0x32c)][_0x40c38a(0x4df)]=function(){const _0x2eda94=_0x40c38a;VisuMZ[_0x2eda94(0x15b)]['Scene_Battle_update'][_0x2eda94(0xb5)](this);if($gameTemp[_0x2eda94(0x3cf)])this[_0x2eda94(0x222)]();},Scene_Battle['prototype'][_0x40c38a(0x222)]=function(){const _0xfcddb=_0x40c38a;!BattleManager['isInputting']()&&!this[_0xfcddb(0x374)]&&!$gameMessage[_0xfcddb(0x60b)]()&&(this[_0xfcddb(0x374)]=!![],this['update'](),SceneManager['updateEffekseer'](),this[_0xfcddb(0x374)]=![]);},VisuMZ['CoreEngine'][_0x40c38a(0x282)]=Scene_Battle[_0x40c38a(0x32c)]['createCancelButton'],Scene_Battle[_0x40c38a(0x32c)]['createCancelButton']=function(){const _0x78b228=_0x40c38a;VisuMZ['CoreEngine'][_0x78b228(0x282)][_0x78b228(0xb5)](this),SceneManager['isSideButtonLayout']()&&this[_0x78b228(0x1fa)]();},Scene_Battle['prototype'][_0x40c38a(0x1fa)]=function(){const _0x54ffa1=_0x40c38a;this[_0x54ffa1(0x339)]['x']=Graphics['boxWidth']+0x4,this['isBottomButtonMode']()?this[_0x54ffa1(0x339)]['y']=Graphics[_0x54ffa1(0x227)]-this[_0x54ffa1(0x3c4)]():this[_0x54ffa1(0x339)]['y']=0x0;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5ef)]=Sprite_Button[_0x40c38a(0x32c)][_0x40c38a(0xe1)],Sprite_Button[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(_0x1e5acf){const _0x580e8b=_0x40c38a;VisuMZ[_0x580e8b(0x15b)][_0x580e8b(0x5ef)][_0x580e8b(0xb5)](this,_0x1e5acf),this[_0x580e8b(0x320)]();},Sprite_Button[_0x40c38a(0x32c)]['initButtonHidden']=function(){const _0x5c8907=_0x40c38a,_0x2e2f6b=VisuMZ['CoreEngine'][_0x5c8907(0x3a9)]['UI'];this[_0x5c8907(0x573)]=![];switch(this[_0x5c8907(0x2af)]){case'cancel':this[_0x5c8907(0x573)]=!_0x2e2f6b[_0x5c8907(0x131)];break;case _0x5c8907(0x7c):case _0x5c8907(0x294):this[_0x5c8907(0x573)]=!_0x2e2f6b[_0x5c8907(0x44d)];break;case _0x5c8907(0x357):case'up':case _0x5c8907(0x3b1):case'up2':case'ok':this[_0x5c8907(0x573)]=!_0x2e2f6b[_0x5c8907(0x42f)];break;case _0x5c8907(0x35e):this[_0x5c8907(0x573)]=!_0x2e2f6b[_0x5c8907(0x338)];break;}},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3f8)]=Sprite_Button[_0x40c38a(0x32c)][_0x40c38a(0x200)],Sprite_Button['prototype'][_0x40c38a(0x200)]=function(){const _0x53f118=_0x40c38a;SceneManager[_0x53f118(0x10b)]()||this[_0x53f118(0x573)]?this[_0x53f118(0x5cc)]():VisuMZ[_0x53f118(0x15b)]['Sprite_Button_updateOpacity'][_0x53f118(0xb5)](this);},Sprite_Button['prototype']['hideButtonFromView']=function(){const _0x24bf2f=_0x40c38a;this[_0x24bf2f(0x273)]=![],this[_0x24bf2f(0x223)]=0x0,this['x']=Graphics[_0x24bf2f(0x179)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5a3)]=Sprite_Battler[_0x40c38a(0x32c)][_0x40c38a(0x4bd)],Sprite_Battler[_0x40c38a(0x32c)]['startMove']=function(_0x4f8191,_0x385ab6,_0x26bca3){const _0x13eeef=_0x40c38a;(this[_0x13eeef(0x268)]!==_0x4f8191||this[_0x13eeef(0x335)]!==_0x385ab6)&&(this[_0x13eeef(0x132)](_0x13eeef(0x2a1)),this['_movementWholeDuration']=_0x26bca3),VisuMZ[_0x13eeef(0x15b)][_0x13eeef(0x5a3)][_0x13eeef(0xb5)](this,_0x4f8191,_0x385ab6,_0x26bca3);},Sprite_Battler[_0x40c38a(0x32c)][_0x40c38a(0x132)]=function(_0x12d13b){this['_moveEasingType']=_0x12d13b;},Sprite_Battler['prototype']['updateMove']=function(){const _0x12ffad=_0x40c38a;if(this[_0x12ffad(0x506)]<=0x0)return;const _0x1f6b1f=this[_0x12ffad(0x506)],_0xcfa43a=this[_0x12ffad(0x4dc)],_0x5895d7=this['_moveEasingType'];this['_offsetX']=this[_0x12ffad(0x82)](this['_offsetX'],this[_0x12ffad(0x268)],_0x1f6b1f,_0xcfa43a,_0x5895d7),this['_offsetY']=this['applyEasing'](this[_0x12ffad(0x450)],this['_targetOffsetY'],_0x1f6b1f,_0xcfa43a,_0x5895d7),this[_0x12ffad(0x506)]--;if(this[_0x12ffad(0x506)]<=0x0)this[_0x12ffad(0x4f2)]();},Sprite_Battler[_0x40c38a(0x32c)][_0x40c38a(0x82)]=function(_0x42feb8,_0x24a7df,_0x3efc06,_0x4bed0c,_0x306ecf){const _0x175c30=_0x40c38a,_0x14511d=VisuMZ[_0x175c30(0x59c)]((_0x4bed0c-_0x3efc06)/_0x4bed0c,_0x306ecf||_0x175c30(0x2a1)),_0x10df94=VisuMZ['ApplyEasing']((_0x4bed0c-_0x3efc06+0x1)/_0x4bed0c,_0x306ecf||'Linear'),_0x1f7da6=(_0x42feb8-_0x24a7df*_0x14511d)/(0x1-_0x14511d);return _0x1f7da6+(_0x24a7df-_0x1f7da6)*_0x10df94;},VisuMZ[_0x40c38a(0x15b)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x40c38a(0x32c)]['setActorHome'],Sprite_Actor[_0x40c38a(0x32c)][_0x40c38a(0x197)]=function(_0x4c3199){const _0x52eb95=_0x40c38a;VisuMZ[_0x52eb95(0x15b)][_0x52eb95(0x3a9)]['UI']['RepositionActors']?this[_0x52eb95(0x420)](_0x4c3199):VisuMZ[_0x52eb95(0x15b)][_0x52eb95(0x585)][_0x52eb95(0xb5)](this,_0x4c3199);},Sprite_Actor[_0x40c38a(0x32c)][_0x40c38a(0x420)]=function(_0x12f17e){const _0x501456=_0x40c38a;let _0x6bb513=Math[_0x501456(0x239)](Graphics[_0x501456(0x179)]/0x2+0xc0);_0x6bb513-=Math['floor']((Graphics[_0x501456(0x179)]-Graphics[_0x501456(0x13b)])/0x2),_0x6bb513+=_0x12f17e*0x20;let _0x3b7fd6=Graphics[_0x501456(0x13e)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x3b7fd6-=Math[_0x501456(0x119)]((Graphics[_0x501456(0x13e)]-Graphics[_0x501456(0x227)])/0x2),_0x3b7fd6+=_0x12f17e*0x30,this[_0x501456(0x30c)](_0x6bb513,_0x3b7fd6);},Sprite_Actor[_0x40c38a(0x32c)]['retreat']=function(){const _0x4061e1=_0x40c38a;this[_0x4061e1(0x4bd)](0x4b0,0x0,0x78);},Sprite_Animation[_0x40c38a(0x32c)][_0x40c38a(0x595)]=function(_0x239c5c){const _0x3c5340=_0x40c38a;this[_0x3c5340(0x411)]=_0x239c5c;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x616)]=Sprite_Animation[_0x40c38a(0x32c)]['processSoundTimings'],Sprite_Animation[_0x40c38a(0x32c)][_0x40c38a(0x261)]=function(){const _0x5e2e3e=_0x40c38a;if(this[_0x5e2e3e(0x411)])return;VisuMZ[_0x5e2e3e(0x15b)][_0x5e2e3e(0x616)][_0x5e2e3e(0xb5)](this);},Sprite_Animation[_0x40c38a(0x32c)][_0x40c38a(0x4c7)]=function(_0xdbdcf9){const _0x1a991c=_0x40c38a;if(_0xdbdcf9['_mainSprite']){}const _0xf99440=this['_animation'][_0x1a991c(0x615)];let _0x2bc32a=_0xdbdcf9[_0x1a991c(0x13e)]*_0xdbdcf9[_0x1a991c(0x1fd)]['y'],_0x2e1cc1=0x0,_0x22ec56=-_0x2bc32a/0x2;if(_0xf99440[_0x1a991c(0x311)](/<(?:HEAD|HEADER|TOP)>/i))_0x22ec56=-_0x2bc32a;if(_0xf99440[_0x1a991c(0x311)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x22ec56=0x0;if(_0xf99440[_0x1a991c(0x311)](/<(?:LEFT)>/i))_0x2e1cc1=-_0xdbdcf9[_0x1a991c(0x179)]/0x2;if(_0xf99440[_0x1a991c(0x311)](/<(?:RIGHT)>/i))_0x22ec56=_0xdbdcf9[_0x1a991c(0x179)]/0x2;if(_0xf99440[_0x1a991c(0x311)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x2e1cc1=Number(RegExp['$1'])*_0xdbdcf9[_0x1a991c(0x179)];_0xf99440[_0x1a991c(0x311)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x22ec56=(0x1-Number(RegExp['$1']))*-_0x2bc32a);_0xf99440[_0x1a991c(0x311)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x2e1cc1=Number(RegExp['$1'])*_0xdbdcf9[_0x1a991c(0x179)],_0x22ec56=(0x1-Number(RegExp['$2']))*-_0x2bc32a);if(_0xf99440[_0x1a991c(0x311)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x2e1cc1+=Number(RegExp['$1']);if(_0xf99440[_0x1a991c(0x311)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x22ec56+=Number(RegExp['$1']);_0xf99440[_0x1a991c(0x311)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2e1cc1+=Number(RegExp['$1']),_0x22ec56+=Number(RegExp['$2']));const _0x297bc3=new Point(_0x2e1cc1,_0x22ec56);return _0xdbdcf9[_0x1a991c(0x2d8)](),_0xdbdcf9['worldTransform'][_0x1a991c(0x209)](_0x297bc3);},Sprite_AnimationMV['prototype']['setMute']=function(_0x5dc2c8){this['_muteSound']=_0x5dc2c8;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x32b)]=Sprite_AnimationMV[_0x40c38a(0x32c)]['processTimingData'],Sprite_AnimationMV[_0x40c38a(0x32c)][_0x40c38a(0x217)]=function(_0x3fd998){const _0x47000d=_0x40c38a;this[_0x47000d(0x411)]&&(_0x3fd998=JsonEx['makeDeepCopy'](_0x3fd998),_0x3fd998['se']&&(_0x3fd998['se'][_0x47000d(0x4e7)]=0x0)),VisuMZ[_0x47000d(0x15b)][_0x47000d(0x32b)][_0x47000d(0xb5)](this,_0x3fd998);},Sprite_Damage[_0x40c38a(0x32c)][_0x40c38a(0x3eb)]=function(_0x265acd){const _0xaf1d26=_0x40c38a;let _0x5d078e=Math['abs'](_0x265acd)[_0xaf1d26(0x3ef)]();this[_0xaf1d26(0x36d)]()&&(_0x5d078e=VisuMZ[_0xaf1d26(0xff)](_0x5d078e));const _0x22f0e0=this[_0xaf1d26(0x5b3)](),_0x51919a=Math[_0xaf1d26(0x119)](_0x22f0e0*0.75);for(let _0x1b2ac3=0x0;_0x1b2ac3<_0x5d078e[_0xaf1d26(0x4b7)];_0x1b2ac3++){const _0x176cdd=this['createChildSprite'](_0x51919a,_0x22f0e0);_0x176cdd[_0xaf1d26(0x3ff)]['drawText'](_0x5d078e[_0x1b2ac3],0x0,0x0,_0x51919a,_0x22f0e0,'center'),_0x176cdd['x']=(_0x1b2ac3-(_0x5d078e['length']-0x1)/0x2)*_0x51919a,_0x176cdd['dy']=-_0x1b2ac3;}},Sprite_Damage[_0x40c38a(0x32c)][_0x40c38a(0x36d)]=function(){const _0x25ff09=_0x40c38a;return VisuMZ[_0x25ff09(0x15b)][_0x25ff09(0x3a9)][_0x25ff09(0x558)][_0x25ff09(0x463)];},Sprite_Damage[_0x40c38a(0x32c)][_0x40c38a(0x3c1)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x40c38a(0x15b)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x40c38a(0x32c)][_0x40c38a(0x4a3)],Sprite_Gauge[_0x40c38a(0x32c)][_0x40c38a(0x4a3)]=function(){const _0x2c7371=_0x40c38a;return VisuMZ[_0x2c7371(0x15b)][_0x2c7371(0x5f3)][_0x2c7371(0xb5)](this)[_0x2c7371(0x5d3)](0x0,0x1);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x20f)]=Sprite_Gauge['prototype'][_0x40c38a(0x389)],Sprite_Gauge[_0x40c38a(0x32c)][_0x40c38a(0x389)]=function(){const _0x21e7e8=_0x40c38a;let _0x122b4b=VisuMZ[_0x21e7e8(0x15b)][_0x21e7e8(0x20f)]['call'](this);return _0x122b4b;},Sprite_Gauge[_0x40c38a(0x32c)][_0x40c38a(0x5f9)]=function(){const _0x307049=_0x40c38a;let _0x27c3aa=this['currentValue']();this[_0x307049(0x36d)]()&&(_0x27c3aa=VisuMZ['GroupDigits'](_0x27c3aa));const _0x4790d4=this['bitmapWidth']()-0x1,_0x28f82e=this[_0x307049(0x4fc)]();this[_0x307049(0xd5)](),this[_0x307049(0x3ff)]['drawText'](_0x27c3aa,0x0,0x0,_0x4790d4,_0x28f82e,_0x307049(0x3f5));},Sprite_Gauge[_0x40c38a(0x32c)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x40c38a(0x32c)][_0x40c38a(0x36d)]=function(){const _0x81e818=_0x40c38a;return VisuMZ['CoreEngine'][_0x81e818(0x3a9)][_0x81e818(0x558)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x40c38a(0x32c)][_0x40c38a(0x3c1)]=function(){const _0x1b4b2=_0x40c38a;return ColorManager[_0x1b4b2(0x5db)]();};function Sprite_TitlePictureButton(){const _0xe2c580=_0x40c38a;this[_0xe2c580(0xe1)](...arguments);}Sprite_TitlePictureButton[_0x40c38a(0x32c)]=Object[_0x40c38a(0x488)](Sprite_Clickable[_0x40c38a(0x32c)]),Sprite_TitlePictureButton[_0x40c38a(0x32c)][_0x40c38a(0x415)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype'][_0x40c38a(0xe1)]=function(_0x3b5e64){const _0x54aef4=_0x40c38a;Sprite_Clickable[_0x54aef4(0x32c)]['initialize'][_0x54aef4(0xb5)](this),this[_0x54aef4(0x48b)]=_0x3b5e64,this[_0x54aef4(0x490)]=null,this[_0x54aef4(0x229)]();},Sprite_TitlePictureButton['prototype'][_0x40c38a(0x229)]=function(){const _0x4a9b45=_0x40c38a;this['x']=Graphics[_0x4a9b45(0x179)],this['y']=Graphics[_0x4a9b45(0x13e)],this[_0x4a9b45(0x273)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x40c38a(0x32c)][_0x40c38a(0x2aa)]=function(){const _0x26757b=_0x40c38a;this[_0x26757b(0x3ff)]=ImageManager['loadPicture'](this['_data'][_0x26757b(0x373)]),this[_0x26757b(0x3ff)][_0x26757b(0x559)](this['onButtonImageLoad'][_0x26757b(0x271)](this));},Sprite_TitlePictureButton['prototype'][_0x40c38a(0x46c)]=function(){const _0x4ee7e1=_0x40c38a;this[_0x4ee7e1(0x48b)][_0x4ee7e1(0x177)][_0x4ee7e1(0xb5)](this),this[_0x4ee7e1(0x48b)][_0x4ee7e1(0x135)][_0x4ee7e1(0xb5)](this),this[_0x4ee7e1(0x18a)](this[_0x4ee7e1(0x48b)][_0x4ee7e1(0x4bc)][_0x4ee7e1(0x271)](this));},Sprite_TitlePictureButton[_0x40c38a(0x32c)][_0x40c38a(0x4df)]=function(){const _0x3741e9=_0x40c38a;Sprite_Clickable[_0x3741e9(0x32c)]['update']['call'](this),this[_0x3741e9(0x200)](),this[_0x3741e9(0x91)]();},Sprite_TitlePictureButton[_0x40c38a(0x32c)][_0x40c38a(0x1e6)]=function(){const _0x3513d6=_0x40c38a;return VisuMZ[_0x3513d6(0x15b)]['Settings'][_0x3513d6(0x1f3)][_0x3513d6(0x2ba)][_0x3513d6(0x399)];},Sprite_TitlePictureButton[_0x40c38a(0x32c)][_0x40c38a(0x200)]=function(){const _0x1a934b=_0x40c38a;this['_pressed']?this[_0x1a934b(0x223)]=0xff:(this[_0x1a934b(0x223)]+=this[_0x1a934b(0x273)]?this[_0x1a934b(0x1e6)]():-0x1*this[_0x1a934b(0x1e6)](),this['opacity']=Math['min'](0xc0,this[_0x1a934b(0x223)]));},Sprite_TitlePictureButton[_0x40c38a(0x32c)]['setClickHandler']=function(_0x2e284e){const _0xb16419=_0x40c38a;this[_0xb16419(0x490)]=_0x2e284e;},Sprite_TitlePictureButton['prototype'][_0x40c38a(0x51a)]=function(){const _0x7213c3=_0x40c38a;this[_0x7213c3(0x490)]&&this['_clickHandler']();},VisuMZ[_0x40c38a(0x15b)]['Spriteset_Base_initialize']=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(){const _0x2673b5=_0x40c38a;VisuMZ[_0x2673b5(0x15b)][_0x2673b5(0xaf)][_0x2673b5(0xb5)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x5ad)]=function(){const _0x1131a0=_0x40c38a;this[_0x1131a0(0x1b3)]=[],this['_cacheScaleX']=this[_0x1131a0(0x1fd)]['x'],this[_0x1131a0(0x1a4)]=this[_0x1131a0(0x1fd)]['y'];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x469)]=Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x277)],Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x277)]=function(_0x20fed3){const _0x45ff0e=_0x40c38a;this[_0x45ff0e(0x204)](),VisuMZ[_0x45ff0e(0x15b)][_0x45ff0e(0x469)]['call'](this,_0x20fed3);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x202)]=Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x4df)],Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x4df)]=function(){const _0x5c0848=_0x40c38a;VisuMZ[_0x5c0848(0x15b)]['Spriteset_Base_update']['call'](this),this[_0x5c0848(0x535)](),this[_0x5c0848(0x55b)]();},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x535)]=function(){const _0x4913b6=_0x40c38a;if(!VisuMZ[_0x4913b6(0x15b)][_0x4913b6(0x3a9)][_0x4913b6(0x558)][_0x4913b6(0x1f5)])return;if(this['_cacheScaleX']===this[_0x4913b6(0x1fd)]['x']&&this['_cacheScaleY']===this[_0x4913b6(0x1fd)]['y'])return;this['adjustPictureAntiZoom'](),this['_cacheScaleX']=this[_0x4913b6(0x1fd)]['x'],this['_cacheScaleY']=this[_0x4913b6(0x1fd)]['y'];},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x299)]=function(){const _0x5a9aae=_0x40c38a;this['scale']['x']!==0x0&&(this['_pictureContainer'][_0x5a9aae(0x1fd)]['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x5a9aae(0x1fd)]['x'])),this['scale']['y']!==0x0&&(this[_0x5a9aae(0x93)][_0x5a9aae(0x1fd)]['y']=0x1/this[_0x5a9aae(0x1fd)]['y'],this[_0x5a9aae(0x93)]['y']=-(this['y']/this['scale']['y']));},Spriteset_Base['prototype'][_0x40c38a(0x55b)]=function(){const _0x140eea=_0x40c38a;for(const _0x122f03 of this['_fauxAnimationSprites']){!_0x122f03[_0x140eea(0x2ec)]()&&this['removeFauxAnimation'](_0x122f03);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x40c38a(0x32c)]['processFauxAnimationRequests']=function(){const _0x42f39b=_0x40c38a;for(;;){const _0x2768be=$gameTemp['retrieveFauxAnimation']();if(_0x2768be)this[_0x42f39b(0x14a)](_0x2768be);else break;}},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x14a)]=function(_0x4fd10a){const _0xe5bf3c=_0x40c38a,_0x4f5c0d=$dataAnimations[_0x4fd10a['animationId']],_0x3d2628=_0x4fd10a[_0xe5bf3c(0x4c1)],_0xe6daf8=_0x4fd10a[_0xe5bf3c(0xf7)],_0x3d9039=_0x4fd10a[_0xe5bf3c(0x34d)];let _0x7dc3b8=this['animationBaseDelay']();const _0x3854af=this[_0xe5bf3c(0x9c)]();if(this[_0xe5bf3c(0x94)](_0x4f5c0d))for(const _0x287362 of _0x3d2628){this[_0xe5bf3c(0x500)]([_0x287362],_0x4f5c0d,_0xe6daf8,_0x7dc3b8,_0x3d9039),_0x7dc3b8+=_0x3854af;}else this['createFauxAnimationSprite'](_0x3d2628,_0x4f5c0d,_0xe6daf8,_0x7dc3b8,_0x3d9039);},Spriteset_Base[_0x40c38a(0x32c)]['createFauxAnimationSprite']=function(_0x506177,_0x52de04,_0x3c30d8,_0x18ecd1,_0x100cd4){const _0x24e265=_0x40c38a,_0x2ab10b=this['isMVAnimation'](_0x52de04),_0x377046=new(_0x2ab10b?Sprite_AnimationMV:Sprite_Animation)(),_0x1d832f=this['makeTargetSprites'](_0x506177);this[_0x24e265(0x543)](_0x506177[0x0])&&(_0x3c30d8=!_0x3c30d8),_0x377046[_0x24e265(0x170)]=_0x506177,_0x377046[_0x24e265(0x229)](_0x1d832f,_0x52de04,_0x3c30d8,_0x18ecd1),_0x377046[_0x24e265(0x595)](_0x100cd4),this[_0x24e265(0x50e)][_0x24e265(0x519)](_0x377046),this[_0x24e265(0x1b3)][_0x24e265(0x127)](_0x377046);},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x44f)]=function(_0x585e9d){const _0x2de439=_0x40c38a;this[_0x2de439(0x1b3)]['remove'](_0x585e9d),this[_0x2de439(0x50e)][_0x2de439(0x494)](_0x585e9d);for(const _0x3f6184 of _0x585e9d[_0x2de439(0x170)]){_0x3f6184[_0x2de439(0x218)]&&_0x3f6184[_0x2de439(0x218)]();}_0x585e9d[_0x2de439(0x277)]();},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x204)]=function(){const _0x910f4b=_0x40c38a;for(const _0x443a8b of this[_0x910f4b(0x1b3)]){this['removeFauxAnimation'](_0x443a8b);}},Spriteset_Base[_0x40c38a(0x32c)]['isFauxAnimationPlaying']=function(){const _0x4ca192=_0x40c38a;return this[_0x4ca192(0x1b3)][_0x4ca192(0x4b7)]>0x0;},VisuMZ[_0x40c38a(0x15b)]['Spriteset_Base_updatePosition']=Spriteset_Base['prototype']['updatePosition'],Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x5d7)]=function(){const _0x2054de=_0x40c38a;VisuMZ['CoreEngine'][_0x2054de(0x284)][_0x2054de(0xb5)](this),this[_0x2054de(0x4a2)]();},Spriteset_Base[_0x40c38a(0x32c)]['updatePositionCoreEngine']=function(){const _0x781c2a=_0x40c38a;if(!$gameScreen)return;if($gameScreen[_0x781c2a(0x3fa)]<=0x0)return;this['x']-=Math[_0x781c2a(0x239)]($gameScreen['shake']());const _0x3d2563=$gameScreen[_0x781c2a(0x59e)]();switch($gameScreen[_0x781c2a(0x59e)]()){case'original':this['updatePositionCoreEngineShakeOriginal']();break;case _0x781c2a(0xb6):this['updatePositionCoreEngineShakeHorz']();break;case'vertical':this[_0x781c2a(0x4e4)]();break;default:this[_0x781c2a(0x44a)]();break;}},Spriteset_Base['prototype'][_0x40c38a(0xcb)]=function(){const _0x28ec71=_0x40c38a,_0x3ee4c4=VisuMZ[_0x28ec71(0x15b)][_0x28ec71(0x3a9)][_0x28ec71(0x49b)];if(_0x3ee4c4&&_0x3ee4c4[_0x28ec71(0x2f0)])return _0x3ee4c4[_0x28ec71(0x2f0)][_0x28ec71(0xb5)](this);this['x']+=Math[_0x28ec71(0x239)]($gameScreen[_0x28ec71(0x264)]());},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x44a)]=function(){const _0x148c16=_0x40c38a,_0x245cad=VisuMZ['CoreEngine'][_0x148c16(0x3a9)][_0x148c16(0x49b)];if(_0x245cad&&_0x245cad['randomJS'])return _0x245cad['randomJS']['call'](this);const _0x1e3469=$gameScreen['_shakePower']*0.75,_0x591c46=$gameScreen[_0x148c16(0x52e)]*0.6,_0x5a84a3=$gameScreen[_0x148c16(0x3fa)];this['x']+=Math[_0x148c16(0x239)](Math['randomInt'](_0x1e3469)-Math[_0x148c16(0x26d)](_0x591c46))*(Math[_0x148c16(0x3ba)](_0x5a84a3,0x1e)*0.5),this['y']+=Math[_0x148c16(0x239)](Math[_0x148c16(0x26d)](_0x1e3469)-Math[_0x148c16(0x26d)](_0x591c46))*(Math[_0x148c16(0x3ba)](_0x5a84a3,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x1f5422=_0x40c38a,_0x214d79=VisuMZ[_0x1f5422(0x15b)][_0x1f5422(0x3a9)]['ScreenShake'];if(_0x214d79&&_0x214d79[_0x1f5422(0x279)])return _0x214d79[_0x1f5422(0x279)][_0x1f5422(0xb5)](this);const _0xa12dea=$gameScreen[_0x1f5422(0x1e4)]*0.75,_0x55bae7=$gameScreen['_shakeSpeed']*0.6,_0x3730e9=$gameScreen[_0x1f5422(0x3fa)];this['x']+=Math[_0x1f5422(0x239)](Math[_0x1f5422(0x26d)](_0xa12dea)-Math[_0x1f5422(0x26d)](_0x55bae7))*(Math[_0x1f5422(0x3ba)](_0x3730e9,0x1e)*0.5);},Spriteset_Base[_0x40c38a(0x32c)][_0x40c38a(0x4e4)]=function(){const _0x43b5af=_0x40c38a,_0x581e76=VisuMZ['CoreEngine'][_0x43b5af(0x3a9)]['ScreenShake'];if(_0x581e76&&_0x581e76[_0x43b5af(0x32e)])return _0x581e76[_0x43b5af(0x32e)][_0x43b5af(0xb5)](this);const _0x505417=$gameScreen[_0x43b5af(0x1e4)]*0.75,_0x2780d0=$gameScreen[_0x43b5af(0x52e)]*0.6,_0x3182ac=$gameScreen[_0x43b5af(0x3fa)];this['y']+=Math[_0x43b5af(0x239)](Math[_0x43b5af(0x26d)](_0x505417)-Math[_0x43b5af(0x26d)](_0x2780d0))*(Math[_0x43b5af(0x3ba)](_0x3182ac,0x1e)*0.5);},Spriteset_Battle[_0x40c38a(0x32c)][_0x40c38a(0x2ff)]=function(){const _0x2d5d32=_0x40c38a;this[_0x2d5d32(0x404)]=new PIXI['filters'][(_0x2d5d32(0x2c9))](clamp=!![]),this[_0x2d5d32(0x599)]=new Sprite(),this['_backgroundSprite'][_0x2d5d32(0x3ff)]=SceneManager[_0x2d5d32(0x5b1)](),this[_0x2d5d32(0x599)][_0x2d5d32(0x210)]=[this[_0x2d5d32(0x404)]],this[_0x2d5d32(0x549)][_0x2d5d32(0x519)](this[_0x2d5d32(0x599)]);},VisuMZ[_0x40c38a(0x15b)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x40c38a(0x32c)][_0x40c38a(0x39c)],Spriteset_Battle[_0x40c38a(0x32c)]['createEnemies']=function(){const _0x54e77c=_0x40c38a;VisuMZ['CoreEngine'][_0x54e77c(0x3a9)]['UI'][_0x54e77c(0x2fa)]&&this[_0x54e77c(0x48f)](),VisuMZ['CoreEngine'][_0x54e77c(0x26c)][_0x54e77c(0xb5)](this);},Spriteset_Battle['prototype'][_0x40c38a(0x48f)]=function(){const _0x234339=_0x40c38a;for(member of $gameTroop[_0x234339(0x28d)]()){member[_0x234339(0x2b4)]();}},VisuMZ[_0x40c38a(0x15b)]['Window_Base_initialize']=Window_Base['prototype'][_0x40c38a(0xe1)],Window_Base[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(_0x2016a5){const _0x14d707=_0x40c38a;_0x2016a5['x']=Math['round'](_0x2016a5['x']),_0x2016a5['y']=Math[_0x14d707(0x239)](_0x2016a5['y']),_0x2016a5[_0x14d707(0x179)]=Math[_0x14d707(0x239)](_0x2016a5[_0x14d707(0x179)]),_0x2016a5[_0x14d707(0x13e)]=Math[_0x14d707(0x239)](_0x2016a5[_0x14d707(0x13e)]),this[_0x14d707(0x567)](),VisuMZ[_0x14d707(0x15b)][_0x14d707(0x23d)]['call'](this,_0x2016a5),this[_0x14d707(0x3d0)]();},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x567)]=function(){const _0x4a2542=_0x40c38a;this[_0x4a2542(0x55f)]=VisuMZ[_0x4a2542(0x15b)]['Settings'][_0x4a2542(0x558)]['DigitGroupingStandardText'],this[_0x4a2542(0x3a3)]=VisuMZ['CoreEngine'][_0x4a2542(0x3a9)]['QoL'][_0x4a2542(0x144)];},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x4c3)]=function(){const _0x2c7f7e=_0x40c38a;return VisuMZ[_0x2c7f7e(0x15b)]['Settings']['Window']['LineHeight'];},Window_Base[_0x40c38a(0x32c)]['itemPadding']=function(){const _0x196c80=_0x40c38a;return VisuMZ['CoreEngine'][_0x196c80(0x3a9)]['Window'][_0x196c80(0x414)];},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x1dc)]=function(){const _0x18bb2b=_0x40c38a;this[_0x18bb2b(0x537)]=VisuMZ[_0x18bb2b(0x15b)][_0x18bb2b(0x3a9)]['Window'][_0x18bb2b(0x228)];},Window_Base['prototype'][_0x40c38a(0x37e)]=function(){const _0x2f5ead=_0x40c38a;return VisuMZ[_0x2f5ead(0x15b)][_0x2f5ead(0x3a9)][_0x2f5ead(0x601)][_0x2f5ead(0x1c8)];},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x1f9)]=function(){const _0x37e812=_0x40c38a;return VisuMZ['CoreEngine']['Settings'][_0x37e812(0x601)][_0x37e812(0x295)];},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x608)]=Window_Base[_0x40c38a(0x32c)]['update'],Window_Base['prototype'][_0x40c38a(0x4df)]=function(){const _0x5c3db7=_0x40c38a;VisuMZ['CoreEngine'][_0x5c3db7(0x608)][_0x5c3db7(0xb5)](this),this[_0x5c3db7(0x3e8)]();},Window_Base['prototype'][_0x40c38a(0x189)]=function(){const _0x1ca4a4=_0x40c38a;this['_opening']&&(this[_0x1ca4a4(0x11e)]+=this[_0x1ca4a4(0x1f9)](),this[_0x1ca4a4(0x199)]()&&(this['_opening']=![]));},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x73)]=function(){const _0x19ca9a=_0x40c38a;this[_0x19ca9a(0x525)]&&(this[_0x19ca9a(0x11e)]-=this['openingSpeed'](),this['isClosed']()&&(this[_0x19ca9a(0x525)]=![]));},VisuMZ['CoreEngine'][_0x40c38a(0x312)]=Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x2a9)],Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x2a9)]=function(_0x2f0b0b,_0x15d6db,_0x51dc2e,_0x131764,_0x473645){const _0x21d87c=_0x40c38a;if(this[_0x21d87c(0x36d)]())_0x2f0b0b=VisuMZ[_0x21d87c(0xff)](_0x2f0b0b);VisuMZ[_0x21d87c(0x15b)]['Window_Base_drawText']['call'](this,_0x2f0b0b,_0x15d6db,_0x51dc2e,_0x131764,_0x473645);},Window_Base[_0x40c38a(0x32c)]['useDigitGrouping']=function(){const _0x1b7241=_0x40c38a;return this[_0x1b7241(0x55f)];},VisuMZ['CoreEngine']['Window_Base_createTextState']=Window_Base[_0x40c38a(0x32c)]['createTextState'],Window_Base[_0x40c38a(0x32c)]['createTextState']=function(_0x8e70ba,_0x556fff,_0x56ab9f,_0x394ee4){const _0x506c9f=_0x40c38a;var _0x27176d=VisuMZ[_0x506c9f(0x15b)][_0x506c9f(0x38a)][_0x506c9f(0xb5)](this,_0x8e70ba,_0x556fff,_0x56ab9f,_0x394ee4);if(this['useDigitGroupingEx']())_0x27176d['text']=VisuMZ['GroupDigits'](_0x27176d[_0x506c9f(0x534)]);return _0x27176d;},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x26e)]=function(){const _0x4fd39e=_0x40c38a;return this[_0x4fd39e(0x3a3)];},Window_Base['prototype'][_0x40c38a(0x47d)]=function(_0x1e5b6d){const _0x4d9aa5=_0x40c38a;this[_0x4d9aa5(0x55f)]=_0x1e5b6d;},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x101)]=function(_0x147ecf){const _0x2aa153=_0x40c38a;this[_0x2aa153(0x3a3)]=_0x147ecf;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1c3)]=Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x25e)],Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x25e)]=function(_0x24a874,_0xfa2bc2,_0x596bc0){const _0x118d83=_0x40c38a;_0xfa2bc2=Math[_0x118d83(0x239)](_0xfa2bc2),_0x596bc0=Math[_0x118d83(0x239)](_0x596bc0),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0x118d83(0xb5)](this,_0x24a874,_0xfa2bc2,_0x596bc0);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x442)]=Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x76)],Window_Base['prototype'][_0x40c38a(0x76)]=function(_0x331e28,_0x3d4683,_0x209d59,_0x55ea38,_0x51325a,_0x46b0c3){const _0x28cb08=_0x40c38a;_0x51325a=_0x51325a||ImageManager[_0x28cb08(0x5bf)],_0x46b0c3=_0x46b0c3||ImageManager[_0x28cb08(0x4e2)],_0x209d59=Math[_0x28cb08(0x239)](_0x209d59),_0x55ea38=Math[_0x28cb08(0x239)](_0x55ea38),_0x51325a=Math[_0x28cb08(0x239)](_0x51325a),_0x46b0c3=Math['round'](_0x46b0c3),VisuMZ['CoreEngine'][_0x28cb08(0x442)][_0x28cb08(0xb5)](this,_0x331e28,_0x3d4683,_0x209d59,_0x55ea38,_0x51325a,_0x46b0c3);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x166)]=Window_Base[_0x40c38a(0x32c)][_0x40c38a(0xfd)],Window_Base['prototype'][_0x40c38a(0xfd)]=function(_0x563534,_0x3fd61a,_0x2d7103,_0x2defe0){const _0x116d08=_0x40c38a;_0x2d7103=Math['round'](_0x2d7103),_0x2defe0=Math[_0x116d08(0x239)](_0x2defe0),VisuMZ[_0x116d08(0x15b)][_0x116d08(0x166)][_0x116d08(0xb5)](this,_0x563534,_0x3fd61a,_0x2d7103,_0x2defe0);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x503)]=Window_Selectable['prototype'][_0x40c38a(0x242)],Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x242)]=function(_0x41c0fd){const _0x2f3ef3=_0x40c38a;let _0x15dd50=VisuMZ['CoreEngine'][_0x2f3ef3(0x503)][_0x2f3ef3(0xb5)](this,_0x41c0fd);return _0x15dd50['x']=Math[_0x2f3ef3(0x239)](_0x15dd50['x']),_0x15dd50['y']=Math[_0x2f3ef3(0x239)](_0x15dd50['y']),_0x15dd50[_0x2f3ef3(0x179)]=Math[_0x2f3ef3(0x239)](_0x15dd50[_0x2f3ef3(0x179)]),_0x15dd50['height']=Math[_0x2f3ef3(0x239)](_0x15dd50[_0x2f3ef3(0x13e)]),_0x15dd50;},VisuMZ['CoreEngine'][_0x40c38a(0x458)]=Window_StatusBase['prototype'][_0x40c38a(0x105)],Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0x105)]=function(_0x53bb0f,_0xbb1905,_0x37eb58){const _0x22a0bf=_0x40c38a;_0xbb1905=Math[_0x22a0bf(0x239)](_0xbb1905),_0x37eb58=Math[_0x22a0bf(0x239)](_0x37eb58),VisuMZ[_0x22a0bf(0x15b)][_0x22a0bf(0x458)][_0x22a0bf(0xb5)](this,_0x53bb0f,_0xbb1905,_0x37eb58);},Window_Base[_0x40c38a(0x32c)]['initCoreEasing']=function(){const _0xdcefca=_0x40c38a;this[_0xdcefca(0x3f2)]={'duration':0x0,'wholeDuration':0x0,'type':_0xdcefca(0x605),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0xdcefca(0x1fd)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0xdcefca(0x223)],'targetBackOpacity':this[_0xdcefca(0x537)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x3e8)]=function(){const _0x13cdb2=_0x40c38a;if(!this['_coreEasing'])return;if(this['_coreEasing'][_0x13cdb2(0x10f)]<=0x0)return;this['x']=this[_0x13cdb2(0x314)](this['x'],this['_coreEasing'][_0x13cdb2(0x266)]),this['y']=this[_0x13cdb2(0x314)](this['y'],this[_0x13cdb2(0x3f2)][_0x13cdb2(0xa1)]),this[_0x13cdb2(0x1fd)]['x']=this[_0x13cdb2(0x314)](this['scale']['x'],this[_0x13cdb2(0x3f2)]['targetScaleX']),this[_0x13cdb2(0x1fd)]['y']=this[_0x13cdb2(0x314)](this['scale']['y'],this[_0x13cdb2(0x3f2)]['targetScaleY']),this[_0x13cdb2(0x223)]=this[_0x13cdb2(0x314)](this[_0x13cdb2(0x223)],this['_coreEasing'][_0x13cdb2(0x172)]),this['backOpacity']=this['applyCoreEasing'](this[_0x13cdb2(0x537)],this[_0x13cdb2(0x3f2)][_0x13cdb2(0x391)]),this[_0x13cdb2(0x566)]=this[_0x13cdb2(0x314)](this[_0x13cdb2(0x566)],this[_0x13cdb2(0x3f2)][_0x13cdb2(0x3bc)]),this[_0x13cdb2(0x3f2)][_0x13cdb2(0x10f)]--;},Window_Base[_0x40c38a(0x32c)]['applyCoreEasing']=function(_0xe2ea95,_0x2920f5){const _0x1c9fff=_0x40c38a;if(!this[_0x1c9fff(0x3f2)])return _0x2920f5;const _0xd57fbd=this[_0x1c9fff(0x3f2)][_0x1c9fff(0x10f)],_0x1767af=this['_coreEasing'][_0x1c9fff(0x512)],_0x1d7292=this['calcCoreEasing']((_0x1767af-_0xd57fbd)/_0x1767af),_0x1d00c8=this[_0x1c9fff(0x39a)]((_0x1767af-_0xd57fbd+0x1)/_0x1767af),_0x363bb7=(_0xe2ea95-_0x2920f5*_0x1d7292)/(0x1-_0x1d7292);return _0x363bb7+(_0x2920f5-_0x363bb7)*_0x1d00c8;},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x39a)]=function(_0x3b06a2){const _0x4dbe7b=_0x40c38a;if(!this[_0x4dbe7b(0x3f2)])return _0x3b06a2;return VisuMZ[_0x4dbe7b(0x59c)](_0x3b06a2,this['_coreEasing'][_0x4dbe7b(0xd8)]||_0x4dbe7b(0x605));},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x54f)]=function(_0x462a2a,_0xca4bc4){const _0xa8b1f3=_0x40c38a;if(!this[_0xa8b1f3(0x3f2)])return;this['x']=this[_0xa8b1f3(0x3f2)][_0xa8b1f3(0x266)],this['y']=this[_0xa8b1f3(0x3f2)][_0xa8b1f3(0xa1)],this[_0xa8b1f3(0x1fd)]['x']=this['_coreEasing']['targetScaleX'],this[_0xa8b1f3(0x1fd)]['y']=this[_0xa8b1f3(0x3f2)][_0xa8b1f3(0x466)],this[_0xa8b1f3(0x223)]=this[_0xa8b1f3(0x3f2)]['targetOpacity'],this[_0xa8b1f3(0x537)]=this['_coreEasing'][_0xa8b1f3(0x391)],this['contentsOpacity']=this[_0xa8b1f3(0x3f2)][_0xa8b1f3(0x3bc)],this[_0xa8b1f3(0x5ed)](_0x462a2a,_0xca4bc4,this['x'],this['y'],this[_0xa8b1f3(0x1fd)]['x'],this['scale']['y'],this[_0xa8b1f3(0x223)],this[_0xa8b1f3(0x537)],this['contentsOpacity']);},Window_Base[_0x40c38a(0x32c)]['setupCoreEasing']=function(_0x5a954f,_0x3c5f4f,_0x1774f5,_0x56b245,_0x3de2d1,_0x1b92e9,_0x24206c,_0x4d82a3,_0x3090dd){this['_coreEasing']={'duration':_0x5a954f,'wholeDuration':_0x5a954f,'type':_0x3c5f4f,'targetX':_0x1774f5,'targetY':_0x56b245,'targetScaleX':_0x3de2d1,'targetScaleY':_0x1b92e9,'targetOpacity':_0x24206c,'targetBackOpacity':_0x4d82a3,'targetContentsOpacity':_0x3090dd};},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0x129)]=function(_0x283e06,_0x233cf2,_0xb99a22,_0x379cee,_0x2b62db){const _0x3204f4=_0x40c38a;this[_0x3204f4(0x57b)](),this[_0x3204f4(0x346)][_0x3204f4(0x5b3)]=VisuMZ[_0x3204f4(0x15b)]['Settings']['Gold'][_0x3204f4(0x5d1)];const _0x495754=VisuMZ[_0x3204f4(0x15b)]['Settings'][_0x3204f4(0x39f)]['GoldIcon'];if(_0x495754>0x0&&_0x233cf2===TextManager[_0x3204f4(0x3c7)]){const _0x1ab39e=_0x379cee+(this[_0x3204f4(0x4c3)]()-ImageManager['iconHeight'])/0x2;this[_0x3204f4(0x25e)](_0x495754,_0xb99a22+(_0x2b62db-ImageManager[_0x3204f4(0x1ea)]),_0x1ab39e),_0x2b62db-=ImageManager['iconWidth']+0x4;}else this[_0x3204f4(0x565)](ColorManager[_0x3204f4(0x35c)]()),this[_0x3204f4(0x2a9)](_0x233cf2,_0xb99a22,_0x379cee,_0x2b62db,_0x3204f4(0x3f5)),_0x2b62db-=this[_0x3204f4(0x28e)](_0x233cf2)+0x6;this[_0x3204f4(0x327)]();const _0x35b934=this[_0x3204f4(0x28e)](this[_0x3204f4(0x55f)]?VisuMZ[_0x3204f4(0xff)](_0x283e06):_0x283e06);_0x35b934>_0x2b62db?this[_0x3204f4(0x2a9)](VisuMZ['CoreEngine'][_0x3204f4(0x3a9)][_0x3204f4(0x39f)]['GoldOverlap'],_0xb99a22,_0x379cee,_0x2b62db,'right'):this['drawText'](_0x283e06,_0xb99a22,_0x379cee,_0x2b62db,'right'),this['resetFontSettings']();},Window_Base[_0x40c38a(0x32c)][_0x40c38a(0xdc)]=function(_0x5bc32d,_0x4b388e,_0x31b1d0,_0x170fdd,_0x5b0290){const _0x364f91=_0x40c38a,_0x253c52=ImageManager['loadSystem'](_0x364f91(0x246)),_0x158a13=ImageManager['iconWidth'],_0xbe02c0=ImageManager['iconHeight'],_0x1d248c=_0x5bc32d%0x10*_0x158a13,_0x292e5b=Math['floor'](_0x5bc32d/0x10)*_0xbe02c0,_0x34ea21=_0x170fdd,_0x400cfb=_0x170fdd;this['contents']['_context'][_0x364f91(0x597)]=_0x5b0290,this[_0x364f91(0x346)][_0x364f91(0x381)](_0x253c52,_0x1d248c,_0x292e5b,_0x158a13,_0xbe02c0,_0x4b388e,_0x31b1d0,_0x34ea21,_0x400cfb),this['contents'][_0x364f91(0x98)][_0x364f91(0x597)]=!![];},Window_Base[_0x40c38a(0x32c)]['drawGauge']=function(_0x555bb0,_0x4f68ea,_0x1ff796,_0x25ec2a,_0x53427b,_0xad4ba){const _0x1a4bcb=_0x40c38a,_0x562f7f=Math[_0x1a4bcb(0x119)]((_0x1ff796-0x2)*_0x25ec2a),_0x588766=Sprite_Gauge[_0x1a4bcb(0x32c)][_0x1a4bcb(0x185)]['call'](this),_0x310418=_0x4f68ea+this[_0x1a4bcb(0x4c3)]()-_0x588766-0x2;this[_0x1a4bcb(0x346)][_0x1a4bcb(0x19d)](_0x555bb0,_0x310418,_0x1ff796,_0x588766,ColorManager[_0x1a4bcb(0xd9)]()),this['contents'][_0x1a4bcb(0x4af)](_0x555bb0+0x1,_0x310418+0x1,_0x562f7f,_0x588766-0x2,_0x53427b,_0xad4ba);},Window_Selectable[_0x40c38a(0x32c)]['cursorDown']=function(_0x5fa30b){const _0x5ead81=_0x40c38a;let _0xa50a92=this['index']();const _0xbce77=this[_0x5ead81(0x562)](),_0x4067d1=this[_0x5ead81(0x2d6)]();if(this[_0x5ead81(0x291)]()&&(_0xa50a92<_0xbce77||_0x5fa30b&&_0x4067d1===0x1)){_0xa50a92+=_0x4067d1;if(_0xa50a92>=_0xbce77)_0xa50a92=_0xbce77-0x1;this[_0x5ead81(0x478)](_0xa50a92);}else!this[_0x5ead81(0x291)]()&&((_0xa50a92<_0xbce77-_0x4067d1||_0x5fa30b&&_0x4067d1===0x1)&&this[_0x5ead81(0x478)]((_0xa50a92+_0x4067d1)%_0xbce77));},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x4c4)]=Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x171)],Window_Selectable['prototype'][_0x40c38a(0x171)]=function(_0x1ac255){const _0x30b55d=_0x40c38a;this[_0x30b55d(0x291)]()&&_0x1ac255&&this[_0x30b55d(0x2d6)]()===0x1&&this[_0x30b55d(0x56d)]()===this['maxItems']()-0x1?this[_0x30b55d(0x478)](0x0):VisuMZ['CoreEngine'][_0x30b55d(0x4c4)][_0x30b55d(0xb5)](this,_0x1ac255);},Window_Selectable[_0x40c38a(0x32c)]['cursorUp']=function(_0x56fd38){const _0x42ebed=_0x40c38a;let _0x319413=Math[_0x42ebed(0x3b4)](0x0,this[_0x42ebed(0x56d)]());const _0x620f4e=this[_0x42ebed(0x562)](),_0x6a7d27=this[_0x42ebed(0x2d6)]();if(this[_0x42ebed(0x291)]()&&_0x319413>0x0||_0x56fd38&&_0x6a7d27===0x1){_0x319413-=_0x6a7d27;if(_0x319413<=0x0)_0x319413=0x0;this[_0x42ebed(0x478)](_0x319413);}else!this['isUseModernControls']()&&((_0x319413>=_0x6a7d27||_0x56fd38&&_0x6a7d27===0x1)&&this['smoothSelect']((_0x319413-_0x6a7d27+_0x620f4e)%_0x620f4e));},VisuMZ['CoreEngine']['Window_Selectable_cursorUp']=Window_Selectable[_0x40c38a(0x32c)]['cursorUp'],Window_Selectable['prototype'][_0x40c38a(0x108)]=function(_0x17e372){const _0xee1434=_0x40c38a;this['isUseModernControls']()&&_0x17e372&&this[_0xee1434(0x2d6)]()===0x1&&this[_0xee1434(0x56d)]()===0x0?this['smoothSelect'](this[_0xee1434(0x562)]()-0x1):VisuMZ[_0xee1434(0x15b)][_0xee1434(0x1aa)][_0xee1434(0xb5)](this,_0x17e372);},Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x291)]=function(){const _0x157672=_0x40c38a;return VisuMZ[_0x157672(0x15b)][_0x157672(0x3a9)][_0x157672(0x558)][_0x157672(0x4b2)];},VisuMZ['CoreEngine']['Window_Selectable_processCursorMove']=Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x1c5)],Window_Selectable[_0x40c38a(0x32c)]['processCursorMove']=function(){const _0x5ba76c=_0x40c38a;this[_0x5ba76c(0x291)]()?(this[_0x5ba76c(0x258)](),this[_0x5ba76c(0x45c)]()):VisuMZ['CoreEngine'][_0x5ba76c(0x303)]['call'](this);},Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x12e)]=function(){return!![];},Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x258)]=function(){const _0x1c0e87=_0x40c38a;if(this[_0x1c0e87(0x3f7)]()){const _0x4fc4e9=this[_0x1c0e87(0x56d)]();Input[_0x1c0e87(0x152)](_0x1c0e87(0x357))&&(Input[_0x1c0e87(0x122)](_0x1c0e87(0x5fd))&&this[_0x1c0e87(0x12e)]()?this[_0x1c0e87(0x541)]():this[_0x1c0e87(0x171)](Input['isTriggered']('down'))),Input[_0x1c0e87(0x152)]('up')&&(Input[_0x1c0e87(0x122)](_0x1c0e87(0x5fd))&&this[_0x1c0e87(0x12e)]()?this[_0x1c0e87(0x3e6)]():this[_0x1c0e87(0x108)](Input[_0x1c0e87(0x3d8)]('up'))),Input[_0x1c0e87(0x152)](_0x1c0e87(0x3f5))&&this[_0x1c0e87(0x1df)](Input[_0x1c0e87(0x3d8)](_0x1c0e87(0x3f5))),Input[_0x1c0e87(0x152)](_0x1c0e87(0x1eb))&&this[_0x1c0e87(0x283)](Input[_0x1c0e87(0x3d8)]('left')),!this[_0x1c0e87(0x5ea)]('pagedown')&&Input[_0x1c0e87(0x152)](_0x1c0e87(0x294))&&this[_0x1c0e87(0x541)](),!this[_0x1c0e87(0x5ea)](_0x1c0e87(0x7c))&&Input[_0x1c0e87(0x152)](_0x1c0e87(0x7c))&&this[_0x1c0e87(0x3e6)](),this['index']()!==_0x4fc4e9&&this[_0x1c0e87(0x48e)]();}},Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x45c)]=function(){const _0x19592b=_0x40c38a;if(this[_0x19592b(0x3f7)]()){const _0x3aebd7=this[_0x19592b(0x56d)]();Input[_0x19592b(0x3d8)]('home')&&this[_0x19592b(0x478)](Math[_0x19592b(0x3ba)](this['index'](),0x0)),Input[_0x19592b(0x3d8)](_0x19592b(0x387))&&this[_0x19592b(0x478)](Math[_0x19592b(0x3b4)](this['index'](),this[_0x19592b(0x562)]()-0x1)),this[_0x19592b(0x56d)]()!==_0x3aebd7&&this[_0x19592b(0x48e)]();}},VisuMZ[_0x40c38a(0x15b)]['Window_Selectable_processTouch']=Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x91)],Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x91)]=function(){const _0x577da4=_0x40c38a;this[_0x577da4(0x291)]()?this[_0x577da4(0x280)]():VisuMZ[_0x577da4(0x15b)][_0x577da4(0x49a)]['call'](this);},Window_Selectable['prototype']['processTouchModernControls']=function(){const _0x93960e=_0x40c38a;VisuMZ[_0x93960e(0x15b)]['Window_Selectable_processTouch'][_0x93960e(0xb5)](this);},Window_Selectable[_0x40c38a(0x32c)]['colSpacing']=function(){const _0x1f1a75=_0x40c38a;return VisuMZ[_0x1f1a75(0x15b)][_0x1f1a75(0x3a9)][_0x1f1a75(0x601)][_0x1f1a75(0x4fb)];},Window_Selectable[_0x40c38a(0x32c)]['rowSpacing']=function(){const _0x4e1e38=_0x40c38a;return VisuMZ[_0x4e1e38(0x15b)]['Settings'][_0x4e1e38(0x601)][_0x4e1e38(0x1d3)];},Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x12c)]=function(){const _0x369e1d=_0x40c38a;return Window_Scrollable[_0x369e1d(0x32c)][_0x369e1d(0x12c)][_0x369e1d(0xb5)](this)+VisuMZ[_0x369e1d(0x15b)]['Settings'][_0x369e1d(0x601)][_0x369e1d(0x26b)];;},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1b7)]=Window_Selectable[_0x40c38a(0x32c)]['drawBackgroundRect'],Window_Selectable[_0x40c38a(0x32c)][_0x40c38a(0x107)]=function(_0x51e772){const _0x27f2e7=_0x40c38a,_0x2b82e1=VisuMZ['CoreEngine']['Settings'][_0x27f2e7(0x601)];if(_0x2b82e1[_0x27f2e7(0x3b9)]===![])return;_0x2b82e1[_0x27f2e7(0x539)]?_0x2b82e1[_0x27f2e7(0x539)][_0x27f2e7(0xb5)](this,_0x51e772):VisuMZ['CoreEngine'][_0x27f2e7(0x1b7)][_0x27f2e7(0xb5)](this,_0x51e772);},VisuMZ[_0x40c38a(0x15b)]['Window_Gold_refresh']=Window_Gold[_0x40c38a(0x32c)][_0x40c38a(0x35d)],Window_Gold[_0x40c38a(0x32c)][_0x40c38a(0x35d)]=function(){const _0x2c049a=_0x40c38a;this[_0x2c049a(0x3ee)]()?this['drawGoldItemStyle']():VisuMZ[_0x2c049a(0x15b)]['Window_Gold_refresh'][_0x2c049a(0xb5)](this);},Window_Gold[_0x40c38a(0x32c)][_0x40c38a(0x3ee)]=function(){const _0x4e93c3=_0x40c38a;if(TextManager[_0x4e93c3(0x3c7)]!==this['currencyUnit']())return![];return VisuMZ[_0x4e93c3(0x15b)][_0x4e93c3(0x3a9)][_0x4e93c3(0x39f)][_0x4e93c3(0x394)];},Window_Gold[_0x40c38a(0x32c)]['drawGoldItemStyle']=function(){const _0x59529a=_0x40c38a;this[_0x59529a(0x57b)](),this[_0x59529a(0x346)]['clear'](),this[_0x59529a(0x346)]['fontSize']=VisuMZ[_0x59529a(0x15b)]['Settings'][_0x59529a(0x39f)][_0x59529a(0x5d1)];const _0x34557f=VisuMZ[_0x59529a(0x15b)][_0x59529a(0x3a9)][_0x59529a(0x39f)]['GoldIcon'],_0x3e86d3=this[_0x59529a(0x584)](0x0);if(_0x34557f>0x0){const _0x46af9c=_0x3e86d3['y']+(this[_0x59529a(0x4c3)]()-ImageManager['iconHeight'])/0x2;this[_0x59529a(0x25e)](_0x34557f,_0x3e86d3['x'],_0x46af9c);const _0x2f1399=ImageManager[_0x59529a(0x1ea)]+0x4;_0x3e86d3['x']+=_0x2f1399,_0x3e86d3[_0x59529a(0x179)]-=_0x2f1399;}this[_0x59529a(0x565)](ColorManager[_0x59529a(0x35c)]()),this['drawText'](this[_0x59529a(0x3c7)](),_0x3e86d3['x'],_0x3e86d3['y'],_0x3e86d3[_0x59529a(0x179)],_0x59529a(0x1eb));const _0x2307c0=this['textWidth'](this[_0x59529a(0x3c7)]())+0x6;;_0x3e86d3['x']+=_0x2307c0,_0x3e86d3[_0x59529a(0x179)]-=_0x2307c0,this[_0x59529a(0x327)]();const _0x1e3778=this[_0x59529a(0x60f)](),_0x2c89be=this['textWidth'](this[_0x59529a(0x55f)]?VisuMZ[_0x59529a(0xff)](this['value']()):this[_0x59529a(0x60f)]());_0x2c89be>_0x3e86d3['width']?this[_0x59529a(0x2a9)](VisuMZ[_0x59529a(0x15b)]['Settings']['Gold']['GoldOverlap'],_0x3e86d3['x'],_0x3e86d3['y'],_0x3e86d3[_0x59529a(0x179)],_0x59529a(0x3f5)):this[_0x59529a(0x2a9)](this[_0x59529a(0x60f)](),_0x3e86d3['x'],_0x3e86d3['y'],_0x3e86d3[_0x59529a(0x179)],_0x59529a(0x3f5)),this[_0x59529a(0x57b)]();},Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0xb2)]=function(_0x39ffdc,_0x2ffcd9,_0x5b62c2,_0x3ffb1c,_0x5f52d2){const _0x3c6e1c=_0x40c38a;_0x3ffb1c=String(_0x3ffb1c||'')['toUpperCase']();if(VisuMZ[_0x3c6e1c(0x15b)][_0x3c6e1c(0x3a9)][_0x3c6e1c(0x496)][_0x3c6e1c(0x321)]){const _0xe64943=VisuMZ[_0x3c6e1c(0x1cb)](_0x3ffb1c);_0x5f52d2?(this[_0x3c6e1c(0xdc)](_0xe64943,_0x39ffdc,_0x2ffcd9,this['gaugeLineHeight']()),_0x5b62c2-=this[_0x3c6e1c(0x137)]()+0x2,_0x39ffdc+=this['gaugeLineHeight']()+0x2):(this['drawIcon'](_0xe64943,_0x39ffdc+0x2,_0x2ffcd9+0x2),_0x5b62c2-=ImageManager[_0x3c6e1c(0x1ea)]+0x4,_0x39ffdc+=ImageManager['iconWidth']+0x4);}const _0x1b3f06=TextManager[_0x3c6e1c(0x547)](_0x3ffb1c);this['resetFontSettings'](),this['changeTextColor'](ColorManager[_0x3c6e1c(0x35c)]()),_0x5f52d2?(this[_0x3c6e1c(0x346)][_0x3c6e1c(0x5b3)]=this[_0x3c6e1c(0x81)](),this[_0x3c6e1c(0x346)][_0x3c6e1c(0x2a9)](_0x1b3f06,_0x39ffdc,_0x2ffcd9,_0x5b62c2,this[_0x3c6e1c(0x137)](),_0x3c6e1c(0x1eb))):this[_0x3c6e1c(0x2a9)](_0x1b3f06,_0x39ffdc,_0x2ffcd9,_0x5b62c2),this[_0x3c6e1c(0x57b)]();},Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0x81)]=function(){const _0x568d6d=_0x40c38a;return $gameSystem[_0x568d6d(0x418)]()-0x8;},Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0x16c)]=function(_0x1d7922,_0xa34e92,_0x919deb,_0xd94b35){const _0x559cb2=_0x40c38a;_0xd94b35=_0xd94b35||0xa8,this[_0x559cb2(0x327)]();if(VisuMZ[_0x559cb2(0x15b)][_0x559cb2(0x3a9)]['UI'][_0x559cb2(0x19f)])this[_0x559cb2(0x12d)](_0x1d7922['currentClass']()[_0x559cb2(0x615)],_0xa34e92,_0x919deb,_0xd94b35);else{const _0x34bfb9=_0x1d7922[_0x559cb2(0x116)]()[_0x559cb2(0x615)]['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x34bfb9,_0xa34e92,_0x919deb,_0xd94b35);}},Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0x2b5)]=function(_0x11510f,_0x37f500,_0x4b80c0,_0x46f8d3){const _0x590f03=_0x40c38a;_0x46f8d3=_0x46f8d3||0x10e,this[_0x590f03(0x327)]();if(VisuMZ['CoreEngine'][_0x590f03(0x3a9)]['UI'][_0x590f03(0x8e)])this[_0x590f03(0x12d)](_0x11510f[_0x590f03(0x111)](),_0x37f500,_0x4b80c0,_0x46f8d3);else{const _0x553a73=_0x11510f[_0x590f03(0x111)]()[_0x590f03(0x1ee)](/\\I\[(\d+)\]/gi,'');this[_0x590f03(0x2a9)](_0x11510f[_0x590f03(0x111)](),_0x37f500,_0x4b80c0,_0x46f8d3);}},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5bc)]=Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0x3af)],Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0x3af)]=function(_0x1ce364,_0x38d999,_0x1b924f){const _0x2ca797=_0x40c38a;if(this[_0x2ca797(0x4a6)]())this[_0x2ca797(0x97)](_0x1ce364,_0x38d999,_0x1b924f);VisuMZ[_0x2ca797(0x15b)][_0x2ca797(0x5bc)][_0x2ca797(0xb5)](this,_0x1ce364,_0x38d999,_0x1b924f);},Window_StatusBase[_0x40c38a(0x32c)]['isExpGaugeDrawn']=function(){const _0x4b3528=_0x40c38a;return VisuMZ[_0x4b3528(0x15b)][_0x4b3528(0x3a9)]['UI'][_0x4b3528(0x497)];},Window_StatusBase[_0x40c38a(0x32c)][_0x40c38a(0x97)]=function(_0x26147c,_0x1f183d,_0x323075){const _0x1b9965=_0x40c38a;if(!_0x26147c)return;if(!_0x26147c[_0x1b9965(0x362)]())return;const _0x53035e=0x80,_0x2c219d=_0x26147c[_0x1b9965(0x1b8)]();let _0x285938=ColorManager[_0x1b9965(0x113)](),_0x4362e0=ColorManager['expGaugeColor2']();_0x2c219d>=0x1&&(_0x285938=ColorManager[_0x1b9965(0x571)](),_0x4362e0=ColorManager[_0x1b9965(0x10d)]()),this[_0x1b9965(0x55c)](_0x1f183d,_0x323075,_0x53035e,_0x2c219d,_0x285938,_0x4362e0);},Window_EquipStatus[_0x40c38a(0x32c)][_0x40c38a(0x4d9)]=function(){const _0x5b81ba=_0x40c38a;let _0xf1e834=0x0;for(const _0x303cc0 of VisuMZ[_0x5b81ba(0x15b)][_0x5b81ba(0x3a9)][_0x5b81ba(0x496)][_0x5b81ba(0x1de)]){const _0x101400=this[_0x5b81ba(0x4a4)](),_0x1a525a=this[_0x5b81ba(0x198)](_0xf1e834);this[_0x5b81ba(0xa3)](_0x101400,_0x1a525a,_0x303cc0),_0xf1e834++;}},Window_EquipStatus[_0x40c38a(0x32c)]['drawParamName']=function(_0xe6f5e4,_0x57ad0e,_0x4f0cc3){const _0x428a06=_0x40c38a,_0x535d09=this['paramX']()-this[_0x428a06(0x4a4)]()*0x2;this['drawParamText'](_0xe6f5e4,_0x57ad0e,_0x535d09,_0x4f0cc3,![]);},Window_EquipStatus[_0x40c38a(0x32c)][_0x40c38a(0x157)]=function(_0x52142c,_0x2ac7fa,_0x558916){const _0x1e9d07=_0x40c38a,_0x3fb0a4=this[_0x1e9d07(0xec)]();this[_0x1e9d07(0x327)](),this[_0x1e9d07(0x2a9)](this[_0x1e9d07(0x4cd)][_0x1e9d07(0x33a)](_0x558916,!![]),_0x52142c,_0x2ac7fa,_0x3fb0a4,'right');},Window_EquipStatus[_0x40c38a(0x32c)]['drawRightArrow']=function(_0x4b8a9d,_0x5cb90b){const _0xab3f84=_0x40c38a,_0x14da0b=this[_0xab3f84(0x1e2)]();this[_0xab3f84(0x565)](ColorManager[_0xab3f84(0x35c)]());const _0x2957c8=VisuMZ[_0xab3f84(0x15b)][_0xab3f84(0x3a9)]['UI']['ParamArrow'];this[_0xab3f84(0x2a9)](_0x2957c8,_0x4b8a9d,_0x5cb90b,_0x14da0b,_0xab3f84(0x4d7));},Window_EquipStatus['prototype'][_0x40c38a(0x13a)]=function(_0x14df64,_0x4196b3,_0x317cf5){const _0x355779=_0x40c38a,_0x488365=this['paramWidth'](),_0x275867=this['_tempActor'][_0x355779(0x33a)](_0x317cf5),_0x2b258a=_0x275867-this[_0x355779(0x4cd)]['paramValueByName'](_0x317cf5);this['changeTextColor'](ColorManager[_0x355779(0x4c5)](_0x2b258a)),this[_0x355779(0x2a9)](VisuMZ['ConvertNumberToString'](_0x275867,0x0,_0x317cf5),_0x14df64,_0x4196b3,_0x488365,'right');},Window_StatusParams[_0x40c38a(0x32c)][_0x40c38a(0x562)]=function(){const _0x1cfe32=_0x40c38a;return VisuMZ[_0x1cfe32(0x15b)][_0x1cfe32(0x3a9)][_0x1cfe32(0x496)][_0x1cfe32(0x1de)][_0x1cfe32(0x4b7)];},Window_StatusParams['prototype'][_0x40c38a(0xa3)]=function(_0x2a3ab8){const _0x6ead17=_0x40c38a,_0x520c89=this['itemLineRect'](_0x2a3ab8),_0x3b024c=VisuMZ[_0x6ead17(0x15b)][_0x6ead17(0x3a9)][_0x6ead17(0x496)][_0x6ead17(0x1de)][_0x2a3ab8],_0x24a6a0=TextManager[_0x6ead17(0x547)](_0x3b024c),_0x1cf630=this[_0x6ead17(0x4cd)][_0x6ead17(0x33a)](_0x3b024c,!![]);this[_0x6ead17(0xb2)](_0x520c89['x'],_0x520c89['y'],0xa0,_0x3b024c,![]),this[_0x6ead17(0x327)](),this[_0x6ead17(0x2a9)](_0x1cf630,_0x520c89['x']+0xa0,_0x520c89['y'],0x3c,_0x6ead17(0x3f5));};if(VisuMZ['CoreEngine'][_0x40c38a(0x3a9)][_0x40c38a(0x618)][_0x40c38a(0x5e0)]){VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)][_0x40c38a(0x618)][_0x40c38a(0x57e)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x40c38a(0x386),'OK']);;VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x405)]=Window_NameInput[_0x40c38a(0x32c)]['initialize'],Window_NameInput['prototype'][_0x40c38a(0xe1)]=function(_0x23b655){const _0xe1c5aa=_0x40c38a;this[_0xe1c5aa(0x2ee)]=this['defaultInputMode'](),VisuMZ[_0xe1c5aa(0x15b)][_0xe1c5aa(0x405)][_0xe1c5aa(0xb5)](this,_0x23b655),Input[_0xe1c5aa(0x32f)](),this[_0xe1c5aa(0x313)]();},Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x613)]=function(){const _0x4850b5=_0x40c38a;return VisuMZ[_0x4850b5(0x15b)]['Settings']['KeyboardInput'][_0x4850b5(0x3d9)]||_0x4850b5(0x203);},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x149)]=Window_NameInput['prototype'][_0x40c38a(0x594)],Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x594)]=function(){const _0x14f9ce=_0x40c38a;if(!this[_0x14f9ce(0x199)]())return;if(!this[_0x14f9ce(0x444)])return;if(Input[_0x14f9ce(0x4a5)](_0x14f9ce(0x150)))Input[_0x14f9ce(0x32f)](),this[_0x14f9ce(0x1c0)]();else{if(Input[_0x14f9ce(0x3d8)](_0x14f9ce(0x2ac)))Input[_0x14f9ce(0x32f)](),this[_0x14f9ce(0x2ee)]===_0x14f9ce(0x203)?this[_0x14f9ce(0x4b5)](_0x14f9ce(0x360)):this[_0x14f9ce(0x4b5)](_0x14f9ce(0x203));else{if(this['_mode']==='keyboard')this[_0x14f9ce(0x505)]();else Input[_0x14f9ce(0x4a5)](_0x14f9ce(0x498))?(Input[_0x14f9ce(0x32f)](),this[_0x14f9ce(0x4b5)](_0x14f9ce(0x203))):VisuMZ['CoreEngine'][_0x14f9ce(0x149)][_0x14f9ce(0xb5)](this);}}},VisuMZ[_0x40c38a(0x15b)]['Window_NameInput_processTouch']=Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x91)],Window_NameInput[_0x40c38a(0x32c)]['processTouch']=function(){const _0x5b9f85=_0x40c38a;if(!this[_0x5b9f85(0x2f2)]())return;if(this[_0x5b9f85(0x2ee)]===_0x5b9f85(0x203)){if(TouchInput[_0x5b9f85(0x3d8)]()&&this[_0x5b9f85(0x14f)]())this[_0x5b9f85(0x4b5)](_0x5b9f85(0x360));else TouchInput[_0x5b9f85(0x147)]()&&this[_0x5b9f85(0x4b5)](_0x5b9f85(0x360));}else VisuMZ[_0x5b9f85(0x15b)][_0x5b9f85(0x59b)][_0x5b9f85(0xb5)](this);},Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x505)]=function(){const _0x23f1b0=_0x40c38a;if(Input[_0x23f1b0(0x4a5)](_0x23f1b0(0x30e)))Input['clear'](),this[_0x23f1b0(0x59f)]();else{if(Input[_0x23f1b0(0xef)]!==undefined){let _0x266cff=Input[_0x23f1b0(0xef)],_0x415375=_0x266cff[_0x23f1b0(0x4b7)];for(let _0x3c5263=0x0;_0x3c5263<_0x415375;++_0x3c5263){this['_editWindow'][_0x23f1b0(0x417)](_0x266cff[_0x3c5263])?SoundManager['playOk']():SoundManager[_0x23f1b0(0x5b9)]();}Input[_0x23f1b0(0x32f)]();}}},Window_NameInput['prototype'][_0x40c38a(0x4b5)]=function(_0x1140b1){const _0x54f1a5=_0x40c38a;let _0x37445b=this[_0x54f1a5(0x2ee)];this[_0x54f1a5(0x2ee)]=_0x1140b1,_0x37445b!==this[_0x54f1a5(0x2ee)]&&(this[_0x54f1a5(0x35d)](),SoundManager['playOk'](),this['_mode']===_0x54f1a5(0x360)?this[_0x54f1a5(0x4e9)](0x0):this[_0x54f1a5(0x4e9)](-0x1));},VisuMZ['CoreEngine'][_0x40c38a(0x30f)]=Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x171)],Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x171)]=function(_0x3b4f73){const _0x2a470d=_0x40c38a;if(this['_mode']===_0x2a470d(0x203)&&!Input[_0x2a470d(0x5f4)]())return;if(Input[_0x2a470d(0x3c3)]())return;VisuMZ['CoreEngine'][_0x2a470d(0x30f)]['call'](this,_0x3b4f73),this[_0x2a470d(0x4b5)](_0x2a470d(0x360));},VisuMZ['CoreEngine'][_0x40c38a(0xb4)]=Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x108)],Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x108)]=function(_0x48b621){const _0x2a8126=_0x40c38a;if(this[_0x2a8126(0x2ee)]===_0x2a8126(0x203)&&!Input['isArrowPressed']())return;if(Input[_0x2a8126(0x3c3)]())return;VisuMZ[_0x2a8126(0x15b)]['Window_NameInput_cursorUp']['call'](this,_0x48b621),this[_0x2a8126(0x4b5)](_0x2a8126(0x360));},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1bd)]=Window_NameInput['prototype'][_0x40c38a(0x1df)],Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x1df)]=function(_0x4870d9){const _0x1037fb=_0x40c38a;if(this['_mode']===_0x1037fb(0x203)&&!Input[_0x1037fb(0x5f4)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x1037fb(0x1bd)][_0x1037fb(0xb5)](this,_0x4870d9),this[_0x1037fb(0x4b5)](_0x1037fb(0x360));},VisuMZ[_0x40c38a(0x15b)]['Window_NameInput_cursorLeft']=Window_NameInput['prototype'][_0x40c38a(0x283)],Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x283)]=function(_0x46c99e){const _0xc26b5=_0x40c38a;if(this['_mode']===_0xc26b5(0x203)&&!Input[_0xc26b5(0x5f4)]())return;if(Input[_0xc26b5(0x3c3)]())return;VisuMZ[_0xc26b5(0x15b)][_0xc26b5(0x3c0)][_0xc26b5(0xb5)](this,_0x46c99e),this[_0xc26b5(0x4b5)]('default');},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x28b)]=Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x541)],Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x541)]=function(){const _0x56940e=_0x40c38a;if(this[_0x56940e(0x2ee)]===_0x56940e(0x203))return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown'][_0x56940e(0xb5)](this),this[_0x56940e(0x4b5)](_0x56940e(0x360));},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x352)]=Window_NameInput[_0x40c38a(0x32c)]['cursorPageup'],Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x3e6)]=function(){const _0x3b4dc7=_0x40c38a;if(this[_0x3b4dc7(0x2ee)]===_0x3b4dc7(0x203))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x3b4dc7(0x15b)][_0x3b4dc7(0x352)][_0x3b4dc7(0xb5)](this),this['switchModes'](_0x3b4dc7(0x360));},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x1dd)]=Window_NameInput[_0x40c38a(0x32c)][_0x40c38a(0x35d)],Window_NameInput['prototype'][_0x40c38a(0x35d)]=function(){const _0x4673fc=_0x40c38a;if(this[_0x4673fc(0x2ee)]===_0x4673fc(0x203)){this[_0x4673fc(0x346)][_0x4673fc(0x32f)](),this['contentsBack']['clear'](),this[_0x4673fc(0x327)]();let _0x2b5129=VisuMZ['CoreEngine'][_0x4673fc(0x3a9)]['KeyboardInput'][_0x4673fc(0x4c2)][_0x4673fc(0x19b)]('\x0a'),_0x58b30d=_0x2b5129[_0x4673fc(0x4b7)],_0x2e4916=(this[_0x4673fc(0x213)]-_0x58b30d*this['lineHeight']())/0x2;for(let _0x379334=0x0;_0x379334<_0x58b30d;++_0x379334){let _0x5e3109=_0x2b5129[_0x379334],_0x470cff=this['textSizeEx'](_0x5e3109)[_0x4673fc(0x179)],_0x44650f=Math[_0x4673fc(0x119)]((this['contents']['width']-_0x470cff)/0x2);this[_0x4673fc(0x12d)](_0x5e3109,_0x44650f,_0x2e4916),_0x2e4916+=this[_0x4673fc(0x4c3)]();}}else VisuMZ[_0x4673fc(0x15b)][_0x4673fc(0x1dd)][_0x4673fc(0xb5)](this);};};VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x5a1)]=Window_ShopSell[_0x40c38a(0x32c)][_0x40c38a(0x49e)],Window_ShopSell[_0x40c38a(0x32c)][_0x40c38a(0x49e)]=function(_0x5b83b6){const _0x4dd416=_0x40c38a;return VisuMZ[_0x4dd416(0x15b)][_0x4dd416(0x3a9)][_0x4dd416(0x558)][_0x4dd416(0xf0)]&&DataManager['isKeyItem'](_0x5b83b6)?![]:VisuMZ[_0x4dd416(0x15b)][_0x4dd416(0x5a1)][_0x4dd416(0xb5)](this,_0x5b83b6);},Window_NumberInput[_0x40c38a(0x32c)][_0x40c38a(0x291)]=function(){return![];};VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x3a9)][_0x40c38a(0x618)][_0x40c38a(0xdd)]&&(VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x56c)]=Window_NumberInput['prototype'][_0x40c38a(0x187)],Window_NumberInput[_0x40c38a(0x32c)][_0x40c38a(0x187)]=function(){const _0x27d709=_0x40c38a;VisuMZ[_0x27d709(0x15b)][_0x27d709(0x56c)]['call'](this),this[_0x27d709(0x4e9)](this[_0x27d709(0x3d4)]-0x1);},VisuMZ[_0x40c38a(0x15b)]['Window_NumberInput_processDigitChange']=Window_NumberInput['prototype'][_0x40c38a(0x5ee)],Window_NumberInput[_0x40c38a(0x32c)][_0x40c38a(0x5ee)]=function(){const _0x4b18c5=_0x40c38a;if(!this['isOpenAndActive']())return;if(Input[_0x4b18c5(0x3c3)]())this[_0x4b18c5(0x41f)]();else{if(Input[_0x4b18c5(0x4a5)](_0x4b18c5(0x150)))this[_0x4b18c5(0x5a9)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x4b18c5(0x528)]();else{if(Input[_0x4b18c5(0x5cd)]===0x24)this[_0x4b18c5(0x23f)]();else Input[_0x4b18c5(0x5cd)]===0x23?this['processKeyboardEnd']():(VisuMZ['CoreEngine'][_0x4b18c5(0x1d9)][_0x4b18c5(0xb5)](this),Input[_0x4b18c5(0x32f)]());}}}},Window_NumberInput[_0x40c38a(0x32c)][_0x40c38a(0x1c5)]=function(){const _0x13db5f=_0x40c38a;if(!this[_0x13db5f(0x3f7)]())return;Input['isNumpadPressed']()?this[_0x13db5f(0x41f)]():Window_Selectable[_0x13db5f(0x32c)][_0x13db5f(0x1c5)][_0x13db5f(0xb5)](this);},Window_NumberInput[_0x40c38a(0x32c)][_0x40c38a(0x45c)]=function(){},Window_NumberInput['prototype'][_0x40c38a(0x41f)]=function(){const _0x2fc1c2=_0x40c38a;if(String(this[_0x2fc1c2(0x5ff)])[_0x2fc1c2(0x4b7)]>=this[_0x2fc1c2(0x3d4)])return;this[_0x2fc1c2(0x5ff)]=Number(String(this[_0x2fc1c2(0x5ff)])+Input[_0x2fc1c2(0xef)]);const _0x49bd60='9'['repeat'](this[_0x2fc1c2(0x3d4)]);this[_0x2fc1c2(0x5ff)]=this[_0x2fc1c2(0x5ff)][_0x2fc1c2(0x5d3)](0x0,_0x49bd60),Input[_0x2fc1c2(0x32f)](),this[_0x2fc1c2(0x35d)](),SoundManager[_0x2fc1c2(0x376)](),this[_0x2fc1c2(0x4e9)](this[_0x2fc1c2(0x3d4)]-0x1);},Window_NumberInput[_0x40c38a(0x32c)]['processKeyboardBackspace']=function(){const _0x39adab=_0x40c38a;this[_0x39adab(0x5ff)]=Number(String(this[_0x39adab(0x5ff)])['slice'](0x0,-0x1)),this[_0x39adab(0x5ff)]=Math[_0x39adab(0x3b4)](0x0,this[_0x39adab(0x5ff)]),Input[_0x39adab(0x32f)](),this[_0x39adab(0x35d)](),SoundManager[_0x39adab(0x376)](),this[_0x39adab(0x4e9)](this[_0x39adab(0x3d4)]-0x1);},Window_NumberInput[_0x40c38a(0x32c)][_0x40c38a(0x528)]=function(){const _0x67dc8=_0x40c38a;this['_number']=Number(String(this[_0x67dc8(0x5ff)])[_0x67dc8(0x180)](0x1)),this[_0x67dc8(0x5ff)]=Math[_0x67dc8(0x3b4)](0x0,this[_0x67dc8(0x5ff)]),Input['clear'](),this[_0x67dc8(0x35d)](),SoundManager[_0x67dc8(0x376)](),this['select'](this[_0x67dc8(0x3d4)]-0x1);});;Window_TitleCommand[_0x40c38a(0x367)]=VisuMZ[_0x40c38a(0x15b)]['Settings'][_0x40c38a(0x454)],Window_TitleCommand[_0x40c38a(0x32c)]['makeCommandList']=function(){const _0xa78254=_0x40c38a;this[_0xa78254(0x103)]();},Window_TitleCommand[_0x40c38a(0x32c)][_0x40c38a(0x103)]=function(){const _0x4410e6=_0x40c38a;for(const _0x30b0ef of Window_TitleCommand[_0x4410e6(0x367)]){if(_0x30b0ef[_0x4410e6(0x2b7)][_0x4410e6(0xb5)](this)){const _0x1111dd=_0x30b0ef[_0x4410e6(0x24e)];let _0x3c72db=_0x30b0ef['TextStr'];if(['','Untitled'][_0x4410e6(0x5dd)](_0x3c72db))_0x3c72db=_0x30b0ef['TextJS'][_0x4410e6(0xb5)](this);const _0x31517f=_0x30b0ef['EnableJS']['call'](this),_0x4666a2=_0x30b0ef['ExtJS'][_0x4410e6(0xb5)](this);this['addCommand'](_0x3c72db,_0x1111dd,_0x31517f,_0x4666a2),this[_0x4410e6(0x136)](_0x1111dd,_0x30b0ef[_0x4410e6(0x4bc)][_0x4410e6(0x271)](this,_0x4666a2));}}},Window_GameEnd[_0x40c38a(0x367)]=VisuMZ[_0x40c38a(0x15b)]['Settings']['MenuLayout'][_0x40c38a(0x49c)][_0x40c38a(0x8c)],Window_GameEnd[_0x40c38a(0x32c)]['makeCommandList']=function(){const _0x1fcce7=_0x40c38a;this[_0x1fcce7(0x103)]();},Window_GameEnd['prototype']['makeCoreEngineCommandList']=function(){const _0xa31e4e=_0x40c38a;for(const _0x2e48de of Window_GameEnd['_commandList']){if(_0x2e48de[_0xa31e4e(0x2b7)][_0xa31e4e(0xb5)](this)){const _0x754470=_0x2e48de[_0xa31e4e(0x24e)];let _0x19281d=_0x2e48de['TextStr'];if(['',_0xa31e4e(0xc2)]['includes'](_0x19281d))_0x19281d=_0x2e48de[_0xa31e4e(0x3ae)][_0xa31e4e(0xb5)](this);const _0x1b17a1=_0x2e48de['EnableJS'][_0xa31e4e(0xb5)](this),_0x473619=_0x2e48de['ExtJS'][_0xa31e4e(0xb5)](this);this[_0xa31e4e(0x5a5)](_0x19281d,_0x754470,_0x1b17a1,_0x473619),this[_0xa31e4e(0x136)](_0x754470,_0x2e48de['CallHandlerJS'][_0xa31e4e(0x271)](this,_0x473619));}}};function Window_ButtonAssist(){const _0x1a136a=_0x40c38a;this[_0x1a136a(0xe1)](...arguments);}Window_ButtonAssist[_0x40c38a(0x32c)]=Object['create'](Window_Base[_0x40c38a(0x32c)]),Window_ButtonAssist[_0x40c38a(0x32c)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x40c38a(0x32c)][_0x40c38a(0xe1)]=function(_0x5c44a0){const _0x365097=_0x40c38a;this['_data']={},Window_Base[_0x365097(0x32c)][_0x365097(0xe1)]['call'](this,_0x5c44a0),this[_0x365097(0x2a3)](VisuMZ[_0x365097(0x15b)][_0x365097(0x3a9)]['ButtonAssist'][_0x365097(0x435)]||0x0),this[_0x365097(0x35d)]();},Window_ButtonAssist[_0x40c38a(0x32c)]['makeFontBigger']=function(){const _0x51af64=_0x40c38a;this[_0x51af64(0x346)][_0x51af64(0x5b3)]<=0x60&&(this[_0x51af64(0x346)][_0x51af64(0x5b3)]+=0x6);},Window_ButtonAssist['prototype']['makeFontSmaller']=function(){const _0x37a3bd=_0x40c38a;this[_0x37a3bd(0x346)][_0x37a3bd(0x5b3)]>=0x18&&(this[_0x37a3bd(0x346)][_0x37a3bd(0x5b3)]-=0x6);},Window_ButtonAssist[_0x40c38a(0x32c)]['update']=function(){const _0x37db13=_0x40c38a;Window_Base[_0x37db13(0x32c)][_0x37db13(0x4df)][_0x37db13(0xb5)](this),this[_0x37db13(0x45b)]();},Window_ButtonAssist['prototype'][_0x40c38a(0x233)]=function(){const _0x5e66fd=_0x40c38a;this['padding']=SceneManager['_scene'][_0x5e66fd(0x4ad)]()!==_0x5e66fd(0x9d)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x40c38a(0x45b)]=function(){const _0x21fa22=_0x40c38a,_0x4655cf=SceneManager[_0x21fa22(0x44e)];for(let _0x4bd989=0x1;_0x4bd989<=0x5;_0x4bd989++){if(this[_0x21fa22(0x48b)][_0x21fa22(0x1da)[_0x21fa22(0x276)](_0x4bd989)]!==_0x4655cf[_0x21fa22(0x33d)[_0x21fa22(0x276)](_0x4bd989)]())return this['refresh']();if(this[_0x21fa22(0x48b)][_0x21fa22(0x133)[_0x21fa22(0x276)](_0x4bd989)]!==_0x4655cf[_0x21fa22(0x79)[_0x21fa22(0x276)](_0x4bd989)]())return this['refresh']();}},Window_ButtonAssist[_0x40c38a(0x32c)][_0x40c38a(0x35d)]=function(){const _0x1abcb3=_0x40c38a;this[_0x1abcb3(0x346)][_0x1abcb3(0x32f)]();for(let _0x113f52=0x1;_0x113f52<=0x5;_0x113f52++){this['drawSegment'](_0x113f52);}},Window_ButtonAssist['prototype']['drawSegment']=function(_0x40a314){const _0x596ecf=_0x40c38a,_0x3e593f=this['innerWidth']/0x5,_0x492906=SceneManager[_0x596ecf(0x44e)],_0x55ae9b=_0x492906[_0x596ecf(0x33d)[_0x596ecf(0x276)](_0x40a314)](),_0x3a4469=_0x492906['buttonAssistText%1'['format'](_0x40a314)]();this[_0x596ecf(0x48b)][_0x596ecf(0x1da)['format'](_0x40a314)]=_0x55ae9b,this['_data'][_0x596ecf(0x133)[_0x596ecf(0x276)](_0x40a314)]=_0x3a4469;if(_0x55ae9b==='')return;if(_0x3a4469==='')return;const _0x835620=_0x492906[_0x596ecf(0x287)[_0x596ecf(0x276)](_0x40a314)](),_0x398d1f=this[_0x596ecf(0x4a4)](),_0x2026ce=_0x3e593f*(_0x40a314-0x1)+_0x398d1f+_0x835620,_0x12e3f1=VisuMZ['CoreEngine'][_0x596ecf(0x3a9)][_0x596ecf(0x14b)][_0x596ecf(0x3ca)];this[_0x596ecf(0x12d)](_0x12e3f1[_0x596ecf(0x276)](_0x55ae9b,_0x3a4469),_0x2026ce,0x0,_0x3e593f-_0x398d1f*0x2);},VisuMZ['ShowDevTools']=function(_0x16554a){const _0x11d66d=_0x40c38a;if(Utils[_0x11d66d(0x375)](_0x11d66d(0x1ed))){var _0x4e027a=require(_0x11d66d(0x1fc))[_0x11d66d(0x601)]['get']();SceneManager[_0x11d66d(0x53e)]();if(_0x16554a)setTimeout(_0x4e027a[_0x11d66d(0x272)][_0x11d66d(0x271)](_0x4e027a),0x190);}},VisuMZ[_0x40c38a(0x59c)]=function(_0x1ca415,_0x3d3c6c){const _0x10af1d=_0x40c38a;_0x3d3c6c=_0x3d3c6c['toUpperCase']();var _0x22f7a6=1.70158,_0x2b3fb3=0.7;switch(_0x3d3c6c){case _0x10af1d(0x605):return _0x1ca415;case _0x10af1d(0x20d):return-0x1*Math[_0x10af1d(0x5e5)](_0x1ca415*(Math['PI']/0x2))+0x1;case _0x10af1d(0x433):return Math[_0x10af1d(0x431)](_0x1ca415*(Math['PI']/0x2));case _0x10af1d(0x3dd):return-0.5*(Math[_0x10af1d(0x5e5)](Math['PI']*_0x1ca415)-0x1);case _0x10af1d(0x441):return _0x1ca415*_0x1ca415;case'OUTQUAD':return _0x1ca415*(0x2-_0x1ca415);case _0x10af1d(0x5ec):return _0x1ca415<0.5?0x2*_0x1ca415*_0x1ca415:-0x1+(0x4-0x2*_0x1ca415)*_0x1ca415;case _0x10af1d(0x2e8):return _0x1ca415*_0x1ca415*_0x1ca415;case _0x10af1d(0x77):var _0x5a20a6=_0x1ca415-0x1;return _0x5a20a6*_0x5a20a6*_0x5a20a6+0x1;case _0x10af1d(0x5b8):return _0x1ca415<0.5?0x4*_0x1ca415*_0x1ca415*_0x1ca415:(_0x1ca415-0x1)*(0x2*_0x1ca415-0x2)*(0x2*_0x1ca415-0x2)+0x1;case _0x10af1d(0x526):return _0x1ca415*_0x1ca415*_0x1ca415*_0x1ca415;case _0x10af1d(0x4dd):var _0x5a20a6=_0x1ca415-0x1;return 0x1-_0x5a20a6*_0x5a20a6*_0x5a20a6*_0x5a20a6;case _0x10af1d(0x529):var _0x5a20a6=_0x1ca415-0x1;return _0x1ca415<0.5?0x8*_0x1ca415*_0x1ca415*_0x1ca415*_0x1ca415:0x1-0x8*_0x5a20a6*_0x5a20a6*_0x5a20a6*_0x5a20a6;case _0x10af1d(0x4b4):return _0x1ca415*_0x1ca415*_0x1ca415*_0x1ca415*_0x1ca415;case _0x10af1d(0x4fa):var _0x5a20a6=_0x1ca415-0x1;return 0x1+_0x5a20a6*_0x5a20a6*_0x5a20a6*_0x5a20a6*_0x5a20a6;case _0x10af1d(0x2ef):var _0x5a20a6=_0x1ca415-0x1;return _0x1ca415<0.5?0x10*_0x1ca415*_0x1ca415*_0x1ca415*_0x1ca415*_0x1ca415:0x1+0x10*_0x5a20a6*_0x5a20a6*_0x5a20a6*_0x5a20a6*_0x5a20a6;case _0x10af1d(0x403):if(_0x1ca415===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x1ca415-0x1));case'OUTEXPO':if(_0x1ca415===0x1)return 0x1;return-Math[_0x10af1d(0x37b)](0x2,-0xa*_0x1ca415)+0x1;case _0x10af1d(0x483):if(_0x1ca415===0x0||_0x1ca415===0x1)return _0x1ca415;var _0x2db310=_0x1ca415*0x2,_0xc95342=_0x2db310-0x1;if(_0x2db310<0x1)return 0.5*Math[_0x10af1d(0x37b)](0x2,0xa*_0xc95342);return 0.5*(-Math[_0x10af1d(0x37b)](0x2,-0xa*_0xc95342)+0x2);case _0x10af1d(0x42c):var _0x2db310=_0x1ca415/0x1;return-0x1*(Math['sqrt'](0x1-_0x2db310*_0x1ca415)-0x1);case'OUTCIRC':var _0x5a20a6=_0x1ca415-0x1;return Math[_0x10af1d(0x552)](0x1-_0x5a20a6*_0x5a20a6);case _0x10af1d(0x47b):var _0x2db310=_0x1ca415*0x2,_0xc95342=_0x2db310-0x2;if(_0x2db310<0x1)return-0.5*(Math['sqrt'](0x1-_0x2db310*_0x2db310)-0x1);return 0.5*(Math[_0x10af1d(0x552)](0x1-_0xc95342*_0xc95342)+0x1);case _0x10af1d(0x3e7):return _0x1ca415*_0x1ca415*((_0x22f7a6+0x1)*_0x1ca415-_0x22f7a6);case _0x10af1d(0x2b6):var _0x2db310=_0x1ca415/0x1-0x1;return _0x2db310*_0x2db310*((_0x22f7a6+0x1)*_0x2db310+_0x22f7a6)+0x1;break;case'INOUTBACK':var _0x2db310=_0x1ca415*0x2,_0x4b0a8d=_0x2db310-0x2,_0x5dfa6a=_0x22f7a6*1.525;if(_0x2db310<0x1)return 0.5*_0x2db310*_0x2db310*((_0x5dfa6a+0x1)*_0x2db310-_0x5dfa6a);return 0.5*(_0x4b0a8d*_0x4b0a8d*((_0x5dfa6a+0x1)*_0x4b0a8d+_0x5dfa6a)+0x2);case _0x10af1d(0x550):if(_0x1ca415===0x0||_0x1ca415===0x1)return _0x1ca415;var _0x2db310=_0x1ca415/0x1,_0xc95342=_0x2db310-0x1,_0x25ac40=0x1-_0x2b3fb3,_0x5dfa6a=_0x25ac40/(0x2*Math['PI'])*Math[_0x10af1d(0x416)](0x1);return-(Math[_0x10af1d(0x37b)](0x2,0xa*_0xc95342)*Math[_0x10af1d(0x431)]((_0xc95342-_0x5dfa6a)*(0x2*Math['PI'])/_0x25ac40));case _0x10af1d(0x1cf):var _0x25ac40=0x1-_0x2b3fb3,_0x2db310=_0x1ca415*0x2;if(_0x1ca415===0x0||_0x1ca415===0x1)return _0x1ca415;var _0x5dfa6a=_0x25ac40/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x10af1d(0x37b)](0x2,-0xa*_0x2db310)*Math['sin']((_0x2db310-_0x5dfa6a)*(0x2*Math['PI'])/_0x25ac40)+0x1;case _0x10af1d(0x186):var _0x25ac40=0x1-_0x2b3fb3;if(_0x1ca415===0x0||_0x1ca415===0x1)return _0x1ca415;var _0x2db310=_0x1ca415*0x2,_0xc95342=_0x2db310-0x1,_0x5dfa6a=_0x25ac40/(0x2*Math['PI'])*Math[_0x10af1d(0x416)](0x1);if(_0x2db310<0x1)return-0.5*(Math[_0x10af1d(0x37b)](0x2,0xa*_0xc95342)*Math['sin']((_0xc95342-_0x5dfa6a)*(0x2*Math['PI'])/_0x25ac40));return Math[_0x10af1d(0x37b)](0x2,-0xa*_0xc95342)*Math[_0x10af1d(0x431)]((_0xc95342-_0x5dfa6a)*(0x2*Math['PI'])/_0x25ac40)*0.5+0x1;case _0x10af1d(0x345):var _0x2db310=_0x1ca415/0x1;if(_0x2db310<0x1/2.75)return 7.5625*_0x2db310*_0x2db310;else{if(_0x2db310<0x2/2.75){var _0x4b0a8d=_0x2db310-1.5/2.75;return 7.5625*_0x4b0a8d*_0x4b0a8d+0.75;}else{if(_0x2db310<2.5/2.75){var _0x4b0a8d=_0x2db310-2.25/2.75;return 7.5625*_0x4b0a8d*_0x4b0a8d+0.9375;}else{var _0x4b0a8d=_0x2db310-2.625/2.75;return 7.5625*_0x4b0a8d*_0x4b0a8d+0.984375;}}}case _0x10af1d(0x225):var _0x1befdb=0x1-VisuMZ['ApplyEasing'](0x1-_0x1ca415,_0x10af1d(0x27d));return _0x1befdb;case _0x10af1d(0x457):if(_0x1ca415<0.5)var _0x1befdb=VisuMZ[_0x10af1d(0x59c)](_0x1ca415*0x2,_0x10af1d(0x382))*0.5;else var _0x1befdb=VisuMZ[_0x10af1d(0x59c)](_0x1ca415*0x2-0x1,_0x10af1d(0x27d))*0.5+0.5;return _0x1befdb;default:return _0x1ca415;}},VisuMZ[_0x40c38a(0x1cb)]=function(_0x37e362){const _0xc8a6d=_0x40c38a;_0x37e362=String(_0x37e362)[_0xc8a6d(0xe0)]();const _0x55779d=VisuMZ[_0xc8a6d(0x15b)][_0xc8a6d(0x3a9)][_0xc8a6d(0x496)];if(_0x37e362===_0xc8a6d(0x489))return _0x55779d[_0xc8a6d(0x1c9)];if(_0x37e362===_0xc8a6d(0x5d4))return _0x55779d[_0xc8a6d(0x140)];if(_0x37e362===_0xc8a6d(0x5d8))return _0x55779d['IconParam2'];if(_0x37e362===_0xc8a6d(0x201))return _0x55779d[_0xc8a6d(0x9b)];if(_0x37e362===_0xc8a6d(0x5ac))return _0x55779d[_0xc8a6d(0x45a)];if(_0x37e362==='MDF')return _0x55779d[_0xc8a6d(0x423)];if(_0x37e362===_0xc8a6d(0x29c))return _0x55779d[_0xc8a6d(0xeb)];if(_0x37e362==='LUK')return _0x55779d[_0xc8a6d(0xfa)];if(_0x37e362===_0xc8a6d(0x53a))return _0x55779d[_0xc8a6d(0x3e0)];if(_0x37e362===_0xc8a6d(0x419))return _0x55779d['IconXParam1'];if(_0x37e362===_0xc8a6d(0x351))return _0x55779d[_0xc8a6d(0x513)];if(_0x37e362===_0xc8a6d(0x1e1))return _0x55779d[_0xc8a6d(0x215)];if(_0x37e362===_0xc8a6d(0x359))return _0x55779d[_0xc8a6d(0x380)];if(_0x37e362===_0xc8a6d(0xf6))return _0x55779d[_0xc8a6d(0x238)];if(_0x37e362==='CNT')return _0x55779d[_0xc8a6d(0x18f)];if(_0x37e362===_0xc8a6d(0x465))return _0x55779d[_0xc8a6d(0x90)];if(_0x37e362===_0xc8a6d(0x57c))return _0x55779d[_0xc8a6d(0x4ca)];if(_0x37e362===_0xc8a6d(0x1c2))return _0x55779d[_0xc8a6d(0x366)];if(_0x37e362===_0xc8a6d(0x5bd))return _0x55779d['IconSParam0'];if(_0x37e362==='GRD')return _0x55779d[_0xc8a6d(0x5c0)];if(_0x37e362==='REC')return _0x55779d[_0xc8a6d(0x2bc)];if(_0x37e362===_0xc8a6d(0x4db))return _0x55779d[_0xc8a6d(0x8a)];if(_0x37e362===_0xc8a6d(0x25b))return _0x55779d['IconSParam4'];if(_0x37e362==='TCR')return _0x55779d[_0xc8a6d(0x2dc)];if(_0x37e362==='PDR')return _0x55779d[_0xc8a6d(0xe5)];if(_0x37e362===_0xc8a6d(0x309))return _0x55779d[_0xc8a6d(0x30a)];if(_0x37e362===_0xc8a6d(0x19e))return _0x55779d[_0xc8a6d(0x17b)];if(_0x37e362===_0xc8a6d(0x15a))return _0x55779d[_0xc8a6d(0xee)];if(VisuMZ['CoreEngine']['CustomParamIcons'][_0x37e362])return VisuMZ['CoreEngine'][_0xc8a6d(0x1d0)][_0x37e362]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x290116,_0x14ee26,_0xcc7a09){const _0x2bf489=_0x40c38a;if(_0xcc7a09===undefined&&_0x290116%0x1===0x0)return _0x290116;if(_0xcc7a09!==undefined&&['MAXHP',_0x2bf489(0x5d4),_0x2bf489(0x5d8),'DEF',_0x2bf489(0x5ac),'MDF',_0x2bf489(0x29c),_0x2bf489(0xe7)][_0x2bf489(0x5dd)](String(_0xcc7a09)[_0x2bf489(0xe0)]()[_0x2bf489(0x43f)]()))return _0x290116;return _0x14ee26=_0x14ee26||0x0,String((_0x290116*0x64)[_0x2bf489(0x1f0)](_0x14ee26))+'%';},VisuMZ[_0x40c38a(0xff)]=function(_0x382fc){const _0x3ff1dd=_0x40c38a;_0x382fc=String(_0x382fc);if(!_0x382fc)return _0x382fc;if(typeof _0x382fc!==_0x3ff1dd(0x384))return _0x382fc;const _0x2f007d=VisuMZ[_0x3ff1dd(0x15b)][_0x3ff1dd(0x3a9)]['QoL'][_0x3ff1dd(0x317)]||'en-US',_0x44cfc0={'maximumFractionDigits':0x6};_0x382fc=_0x382fc[_0x3ff1dd(0x1ee)](/\[(.*?)\]/g,(_0x1f97c3,_0x265ff3)=>{const _0x381b8d=_0x3ff1dd;return VisuMZ[_0x381b8d(0x2e6)](_0x265ff3,'[',']');}),_0x382fc=_0x382fc['replace'](/<(.*?)>/g,(_0x7ae9e0,_0x4119c5)=>{const _0x2f4305=_0x3ff1dd;return VisuMZ[_0x2f4305(0x2e6)](_0x4119c5,'<','>');}),_0x382fc=_0x382fc[_0x3ff1dd(0x1ee)](/\{\{(.*?)\}\}/g,(_0x5075ef,_0x3ad0ba)=>{return VisuMZ['PreserveNumbers'](_0x3ad0ba,'','');}),_0x382fc=_0x382fc[_0x3ff1dd(0x1ee)](/(\d+\.?\d*)/g,(_0x31142d,_0x1a1bff)=>{const _0x5a59f6=_0x3ff1dd;let _0x27cbb0=_0x1a1bff;if(_0x27cbb0[0x0]==='0')return _0x27cbb0;if(_0x27cbb0[_0x27cbb0[_0x5a59f6(0x4b7)]-0x1]==='.')return Number(_0x27cbb0)[_0x5a59f6(0x2ed)](_0x2f007d,_0x44cfc0)+'.';else return _0x27cbb0[_0x27cbb0[_0x5a59f6(0x4b7)]-0x1]===','?Number(_0x27cbb0)[_0x5a59f6(0x2ed)](_0x2f007d,_0x44cfc0)+',':Number(_0x27cbb0)[_0x5a59f6(0x2ed)](_0x2f007d,_0x44cfc0);});let _0x4a70af=0x3;while(_0x4a70af--){_0x382fc=VisuMZ[_0x3ff1dd(0x3c5)](_0x382fc);}return _0x382fc;},VisuMZ[_0x40c38a(0x2e6)]=function(_0xc203c,_0x3db928,_0x2c8b34){const _0xa88ee3=_0x40c38a;return _0xc203c=_0xc203c['replace'](/(\d)/gi,(_0x205d88,_0x225f7c)=>_0xa88ee3(0x4b1)[_0xa88ee3(0x276)](Number(_0x225f7c))),_0xa88ee3(0x358)[_0xa88ee3(0x276)](_0xc203c,_0x3db928,_0x2c8b34);},VisuMZ['RevertPreserveNumbers']=function(_0x1e0cff){return _0x1e0cff=_0x1e0cff['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5d40e3,_0x1022a5)=>Number(parseInt(_0x1022a5))),_0x1e0cff;},VisuMZ[_0x40c38a(0x606)]=function(_0x811ae0){const _0x467c15=_0x40c38a;SoundManager[_0x467c15(0x4ab)]();if(!Utils[_0x467c15(0x30d)]()){const _0x13e005=window[_0x467c15(0x84)](_0x811ae0,_0x467c15(0x3f1));}else{const _0x12d9d3=process[_0x467c15(0x4cf)]==_0x467c15(0x560)?_0x467c15(0x84):process[_0x467c15(0x4cf)]=='win32'?_0x467c15(0x187):_0x467c15(0x4ba);require(_0x467c15(0x269))[_0x467c15(0x475)](_0x12d9d3+'\x20'+_0x811ae0);}},Sprite_Clickable[_0x40c38a(0x32c)][_0x40c38a(0x91)]=function(){const _0x16b8b7=_0x40c38a;this[_0x16b8b7(0xd1)]()?(this[_0x16b8b7(0x263)]()?(!this[_0x16b8b7(0x3f0)]&&TouchInput[_0x16b8b7(0x1ac)]()&&(this[_0x16b8b7(0x3f0)]=!![],this[_0x16b8b7(0x530)]()),TouchInput[_0x16b8b7(0x3d8)]()&&(this[_0x16b8b7(0x44c)]=!![],this[_0x16b8b7(0x3ce)]())):(this['_hovered']&&this[_0x16b8b7(0x388)](),this[_0x16b8b7(0x44c)]=![],this[_0x16b8b7(0x3f0)]=![]),this['_pressed']&&TouchInput['isReleased']()&&(this[_0x16b8b7(0x44c)]=![],this[_0x16b8b7(0x51a)]())):(this[_0x16b8b7(0x44c)]=![],this[_0x16b8b7(0x3f0)]=![]);},Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x37a)]=function(){return this['_anchor'];},VisuMZ[_0x40c38a(0x15b)]['Game_Picture_initBasic']=Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x521)],Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x521)]=function(){const _0x33fab3=_0x40c38a;VisuMZ[_0x33fab3(0x15b)][_0x33fab3(0x245)][_0x33fab3(0xb5)](this),this[_0x33fab3(0x2a7)]={'x':0x0,'y':0x0},this[_0x33fab3(0x285)]={'x':0x0,'y':0x0};},VisuMZ[_0x40c38a(0x15b)][_0x40c38a(0x2d3)]=Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x41c)],Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x41c)]=function(){const _0x3bf63d=_0x40c38a;this['updateAnchor'](),VisuMZ[_0x3bf63d(0x15b)][_0x3bf63d(0x2d3)][_0x3bf63d(0xb5)](this);},VisuMZ['CoreEngine'][_0x40c38a(0x11f)]=Game_Picture[_0x40c38a(0x32c)]['show'],Game_Picture['prototype']['show']=function(_0x21450d,_0x4945c9,_0x5eae9e,_0x1d19ce,_0x3f2794,_0x320801,_0x30b1af,_0x4d0c6d){const _0x5c3c4a=_0x40c38a;VisuMZ['CoreEngine'][_0x5c3c4a(0x11f)]['call'](this,_0x21450d,_0x4945c9,_0x5eae9e,_0x1d19ce,_0x3f2794,_0x320801,_0x30b1af,_0x4d0c6d),this[_0x5c3c4a(0x23e)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4945c9]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x40c38a(0x522)]=Game_Picture['prototype'][_0x40c38a(0x33e)],Game_Picture[_0x40c38a(0x32c)]['move']=function(_0xe2f088,_0x505418,_0x11ca81,_0x320167,_0x333f3c,_0x4013b5,_0x3eaaa6,_0x268fac,_0x5553ca){const _0xe489ed=_0x40c38a;VisuMZ[_0xe489ed(0x15b)][_0xe489ed(0x522)][_0xe489ed(0xb5)](this,_0xe2f088,_0x505418,_0x11ca81,_0x320167,_0x333f3c,_0x4013b5,_0x3eaaa6,_0x268fac,_0x5553ca),this[_0xe489ed(0x348)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0xe2f088]||{'x':0x0,'y':0x0});},Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x354)]=function(){const _0x358c47=_0x40c38a;this[_0x358c47(0x323)]>0x0&&(this[_0x358c47(0x2a7)]['x']=this[_0x358c47(0x82)](this['_anchor']['x'],this[_0x358c47(0x285)]['x']),this[_0x358c47(0x2a7)]['y']=this['applyEasing'](this['_anchor']['y'],this[_0x358c47(0x285)]['y']));},Game_Picture[_0x40c38a(0x32c)][_0x40c38a(0x23e)]=function(_0x3c3794){const _0x2fb10f=_0x40c38a;this[_0x2fb10f(0x2a7)]=_0x3c3794,this[_0x2fb10f(0x285)]=JsonEx[_0x2fb10f(0x3ac)](this[_0x2fb10f(0x2a7)]);},Game_Picture['prototype'][_0x40c38a(0x348)]=function(_0x3f36c4){this['_targetAnchor']=_0x3f36c4;},VisuMZ['CoreEngine'][_0x40c38a(0x191)]=Sprite_Picture[_0x40c38a(0x32c)][_0x40c38a(0x4ce)],Sprite_Picture['prototype']['updateOrigin']=function(){const _0x124683=_0x40c38a,_0x4df1d3=this[_0x124683(0x4ed)]();!_0x4df1d3['anchor']()?VisuMZ[_0x124683(0x15b)][_0x124683(0x191)][_0x124683(0xb5)](this):(this[_0x124683(0x37a)]['x']=_0x4df1d3['anchor']()['x'],this[_0x124683(0x37a)]['y']=_0x4df1d3[_0x124683(0x37a)]()['y']);},Game_Action[_0x40c38a(0x32c)]['setEnemyAction']=function(_0xaf9b22){const _0x24e9c4=_0x40c38a;if(_0xaf9b22){const _0x513043=_0xaf9b22[_0x24e9c4(0x17e)];if(_0x513043===0x1&&this[_0x24e9c4(0x4e1)]()[_0x24e9c4(0x56f)]()!==0x1)this[_0x24e9c4(0x3f6)]();else _0x513043===0x2&&this[_0x24e9c4(0x4e1)]()[_0x24e9c4(0x162)]()!==0x2?this[_0x24e9c4(0x134)]():this[_0x24e9c4(0x1c7)](_0x513043);}else this[_0x24e9c4(0x32f)]();},Game_Actor[_0x40c38a(0x32c)]['usableSkills']=function(){const _0xc9b893=_0x40c38a;return this[_0xc9b893(0x4d6)]()[_0xc9b893(0x224)](_0x327685=>this['canUse'](_0x327685)&&this['skillTypes']()[_0xc9b893(0x5dd)](_0x327685['stypeId']));},Window_Base[_0x40c38a(0x32c)]['createDimmerSprite']=function(){const _0x165bbc=_0x40c38a;this[_0x165bbc(0x5b5)]=new Sprite(),this[_0x165bbc(0x5b5)][_0x165bbc(0x3ff)]=new Bitmap(0x0,0x0),this[_0x165bbc(0x5b5)]['x']=0x0,this[_0x165bbc(0x251)](this[_0x165bbc(0x5b5)]);},Window_Base['prototype'][_0x40c38a(0x5f8)]=function(){const _0x569400=_0x40c38a;if(this['_dimmerSprite']){const _0x504a2a=this['_dimmerSprite'][_0x569400(0x3ff)],_0x1ed897=this[_0x569400(0x179)],_0x46b0d3=this[_0x569400(0x13e)],_0xeaa339=this[_0x569400(0x5f7)],_0x23043c=ColorManager[_0x569400(0x3de)](),_0x30f4c0=ColorManager[_0x569400(0x252)]();_0x504a2a[_0x569400(0x59d)](_0x1ed897,_0x46b0d3),_0x504a2a[_0x569400(0x4af)](0x0,0x0,_0x1ed897,_0xeaa339,_0x30f4c0,_0x23043c,!![]),_0x504a2a[_0x569400(0x19d)](0x0,_0xeaa339,_0x1ed897,_0x46b0d3-_0xeaa339*0x2,_0x23043c),_0x504a2a['gradientFillRect'](0x0,_0x46b0d3-_0xeaa339,_0x1ed897,_0xeaa339,_0x23043c,_0x30f4c0,!![]),this['_dimmerSprite'][_0x569400(0x211)](0x0,0x0,_0x1ed897,_0x46b0d3);}},Game_Actor[_0x40c38a(0x32c)][_0x40c38a(0xc1)]=function(){const _0x4532e9=_0x40c38a;for(let _0x37fb4c=0x0;_0x37fb4c<this[_0x4532e9(0x35b)]();_0x37fb4c++){const _0x17c048=this[_0x4532e9(0x3f9)]();let _0x4ff83e=Number['MIN_SAFE_INTEGER'];this[_0x4532e9(0x34b)](_0x37fb4c,_0x17c048[0x0]);for(const _0x5d2ce6 of _0x17c048){const _0x1b9d38=_0x5d2ce6['evaluate']();_0x1b9d38>_0x4ff83e&&(_0x4ff83e=_0x1b9d38,this[_0x4532e9(0x34b)](_0x37fb4c,_0x5d2ce6));}}this['setActionState'](_0x4532e9(0x1a7));},Window_BattleItem['prototype']['isEnabled']=function(_0x5c5659){const _0x7806b=_0x40c38a;return BattleManager['actor']()?BattleManager[_0x7806b(0x125)]()[_0x7806b(0x2b0)](_0x5c5659):Window_ItemList['prototype'][_0x7806b(0x49e)][_0x7806b(0xb5)](this,_0x5c5659);},VisuMZ['CoreEngine'][_0x40c38a(0x385)]=Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x46d)],Scene_Map[_0x40c38a(0x32c)][_0x40c38a(0x46d)]=function(){const _0x53c490=_0x40c38a;VisuMZ['CoreEngine'][_0x53c490(0x385)][_0x53c490(0xb5)](this);const _0x510739=this[_0x53c490(0x2ca)][_0x53c490(0x603)];if(_0x510739)this[_0x53c490(0x519)](_0x510739);},VisuMZ['CoreEngine']['Scene_Battle_createSpriteset']=Scene_Battle[_0x40c38a(0x32c)][_0x40c38a(0x46d)],Scene_Battle[_0x40c38a(0x32c)]['createSpriteset']=function(){const _0x5716e7=_0x40c38a;VisuMZ[_0x5716e7(0x15b)][_0x5716e7(0x1a1)][_0x5716e7(0xb5)](this);const _0x23a3fb=this[_0x5716e7(0x2ca)][_0x5716e7(0x603)];if(_0x23a3fb)this[_0x5716e7(0x519)](_0x23a3fb);};