//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 * 
 * Dual Wielding
 * 
 * - Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 * animations at once, with the combined ATK of each weapon. It's confusing to
 * look at and does not portray the nature of "Dual Wielding".
 * 
 * - Dual Wielding, or in the case of users adding in third and fourth weapons,
 * Multi Wielding is now changed. Each weapon is displayed individually, each
 * producing its own attack animation, showing each weapon type, and applying
 * only that weapon's ATK, Traits, and related effects. It is no longer a
 * combined effect to display everything at once like RPG Maker MZ default.
 * 
 * - If an actor has multiple weapon slots but some of them are unequipped,
 * then the action will treat the attack as a single attack. There will be no
 * barehanded attack to add on top of it. This is to match RPG Maker MZ's
 * decision to omit a second animation if the same scenario is applied.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 *  Combat Log
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * <Battle Portrait Offset: +x, +y>
 * <Battle Portrait Offset: -x, -y>
 * 
 * <Battle Portrait Offset X: +x>
 * <Battle Portrait Offset X: -x>
 * 
 * <Battle Portrait Offset Y: +y>
 * <Battle Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" and "Border" Battle Layouts.
 * - Offsets the X and Y coordinates for the battle portrait.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 * 
 * <Auto Action Sequence>
 * 
 * - Used for: Skill, Item Notetags
 * - If the Action Sequence Plugin Parameter "Auto Notetag" is enabled, this
 *   plugin will prevent custom action sequences from happening for the skill
 *   or item, and instead, use an Automatic Action Sequence instead.
 * - Ignore this if you have "Auto Notetag" disabled or set to false.
 * 
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 * 
 *   Copy to Combat Log?:
 *   - Copies text to the Combat Log.
 *   - Requires VisuMZ_4_CombatLog
 * 
 *     Combat Log Icon:
 *     - What icon would you like to bind to this entry?
 *     - Requires VisuMZ_4_CombatLog
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 * 
 * MECH: BTB Brave Points
 * - Alters the target(s) Brave Points to an exact value.
 * - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Alter Brave Points By:
 *   - Alters the target(s) Brave Points.
 *   - Positive for gaining BP.
 *   - Negative for losing BP.
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *       - You may use JavaScript code.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Weapon ===
 *
 * Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * ---
 *
 * WEAPON: Clear Weapon Slot
 * - Clears the active weapon slot (making others valid again).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to clear the active weapon slot for.
 *
 * ---
 *
 * WEAPON: Next Weapon Slot
 * - Goes to next active weapon slot (making others invalid).
 * - If next slot is weaponless, don't label jump.
 *
 *   Targets:
 *   - Select unit(s) to change the next active weapon slot for.
 *
 * ---
 *
 * WEAPON: Set Weapon Slot
 * - Sets the active weapon slot (making others invalid).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to change the active weapon slot for.
 *
 *   Weapon Slot ID:
 *   - Select weapon slot to make active (making others invalid).
 *   - Use 0 to clear and normalize. You may use JavaScript code.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 * 
 * Quality of Life
 * 
 *   Auto Notetag:
 *   - Automatically apply the <Custom Action Sequence> notetag effect to any
 *     item or skill that has a Common Event?
 *   - Any item or skill without a Common Event attached to it will use the
 *     Automatic Action Sequences instead.
 *   - The <Auto Action Sequence> notetag will disable this effect for that
 *     particular skill or item.
 * 
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** ACSET: Setup Action Set and ACSET: All Targets Action Set updated
 * *** New parameter added: Dual/Multi Wield?
 * **** Add times struck based on weapon quantity equipped?
 * * New Features!
 * ** Dual Wielding now functions differently. Made by Olivia.
 * *** Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 *     animations at once, with the combined ATK of each weapon. It's confusing
 *     to look at and does not portray the nature of "Dual Wielding".
 * *** Dual Wielding, or in the case of users adding in third and fourth
 *     weapons, Multi Wielding is now changed. Each weapon is displayed
 *     individually, each producing its own attack animation, showing each
 *     weapon type, and applying only that weapon's ATK, Traits, and related
 *     effects. It is no longer a combined effect to display everything at once
 *     like RPG Maker MZ default.
 * *** If an actor has multiple weapon slots but some of them are unequipped,
 *     then the action will treat the attack as a single attack. There will be
 *     no barehanded attack to add on top of it. This is to match RPG Maker
 *     MZ's decision to omit a second animation if the same scenario is
 *     applied.
 * ** New Action Sequence Plugin Commands added by Yanfly
 * *** ANIM: Attack Animation 2+
 * **** Plays the animation associated with the user's 2nd weapon.
 *      Plays nothing if there is no 2nd weapon equipped.
 * ** New Action Sequence Plugin Commands added by Olivia
 * *** WEAPON: Clear Weapon Slot
 * *** WEAPON: Next Weapon Slot
 * *** WEAPON: Set Weapon Slot
 * **** These are Action Sequence Plugin Commands for devs who want finer
 *      control over Dual/Multi Wielding weapons.
 * 
 * Version 1.22: January 15, 2021
 * * Compatibility Update
 * ** Compatibility with "All Skills" Actor Command should now work with the
 *    Skills & States Core hide skill notetags.
 * 
 * Version 1.21: January 8, 2021
 * * Bug Fixes!
 * ** "MOVE: Home Reset" Plugin Command Action Sequence should work properly.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Notetag snuck in by Arisu
 * *** <Auto Action Sequence>
 * **** Used for those who have the "Auto Notetag" Plugin Parameter enabled and
 *      just want to use an automatic Action Sequence instead.
 * ** New Plugin Parameter snuck in by Arisu!
 * *** Plugin Parameters > Action Sequences > Quality of Life > Auto Notetag
 * **** Automatically apply the <Custom Action Sequence> notetag effect to any
 *      item or skill that has a Common Event?
 * **** Any item or skill without a Common Event attached to it will use the
 *      Automatic Action Sequences instead.
 * **** The <Auto Action Sequence> notetag will disable this effect for that
 *      particular skill or item.
 * ** Arisu, you're going to be responsible for any bugs these may cause.
 * *** Bring it!!!!
 * **** And handling any bug report emails that are sent because this was
 *      turned on by accident.
 * ***** Please read the documentation, guys!
 * 
 * Version 1.20: January 1, 2021
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors that have received damage
 *    will return back to place after flinching. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Battle Portrait Offset: +x, +y>
 * *** <Battle Portrait Offset X: +x>
 * *** <Battle Portrait Offset Y: +y>
 * **** This is used with the "Portrait" and "Border" Battle Layouts.
 * **** Offsets the X and Y coordinates for the battle portrait.
 * 
 * Version 1.19: December 25, 2020
 * * Bug Fixes!
 * ** Removing a state from a Sideview Enemy during the middle of their a non-
 *    looping motion will no longer reset their motion to neutral.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** Action Sequence "PROJECTILE: Icon" now supports code for the "Icon"
 *    parameter. Update made by Yanfly.
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors will no longer step back
 *    after an enemy's action is finished. Fix made by Yanfly and Shiro.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** Action Sequence "BTLOG: Add Text" is updated for the convenience of a new
 *    option to quickly copy the displayed text to the VisuStella MZ Combat Log
 *    if that plugin is installed. Added by Yanfly.
 * 
 * Version 1.17: December 11, 2020
 * * Bug Fixes!
 * ** Common Events in TPB Active that cause forced actions will no longer
 *    cause currently inputting actors that match the forced action battler to
 *    crash the game. Fix made by Yanfly and Shiro.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * ** Action Sequence "MOVE: Move To Target(s)" is now changed so that if the
 *    "Melee Distance" value is set to 0, battlers will no longer stand a half
 *    body distance away. Added by Yanfly.
 * 
 * Version 1.16: December 4, 2020
 * * Bug Fixes!
 * ** Bug fixes made for the RPG Maker MZ base code. If a battler has no
 *    actions, then their action speed will not be Infinity. Fix by Olivia.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's 1st weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation2
 * @text ANIM: Attack Animation 2+
 * @desc Plays the animation associated with the user's other weapons.
 * Plays nothing if there is no other weapon equipped.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Slot:eval
 * @text Slot
 * @desc Which weapon slot to get this data from?
 * Main-hand weapon is weapon slot 1.
 * @default 2
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 * 
 * @arg CopyCombatLog:eval
 * @text Copy to Combat Log?
 * @type boolean
 * @on Copy Text
 * @off Don't Copy
 * @desc Copies text to the Combat Log.
 * Requires VisuMZ_4_CombatLog
 * @default true
 *
 * @arg CombatLogIcon:num
 * @text Combat Log Icon
 * @parent CopyCombatLog:eval
 * @desc What icon would you like to bind to this entry?
 * Requires VisuMZ_4_CombatLog
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BtbGain
 * @text MECH: BTB Brave Points
 * @desc Alters the target(s) Brave Points to an exact value.
 * Requires VisuMZ_2_BattleSystemBTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 * 
 * @arg BravePoints:eval
 * @text Alter Brave Points By
 * @desc Alters the target(s) Brave Points.
 * Positive for gaining BP. Negative for losing BP.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_FtbAction
 * @text MECH: FTB Action Count
 * @desc Alters the subject team's available Action Count.
 * Requires VisuMZ_2_BattleSystemFTB!
 * 
 * @arg ActionCount:eval
 * @text Action Count
 * @desc Alters the subject team's available Action Count.
 * Positive for gaining actions. Negative for losing actions.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceProjectile
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakProjectile
 * @text Action Sequences - Projectiles
 * @desc Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Animation
 * @text PROJECTILE: Animation
 * @desc Create an animation projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Settings
 * @type animation
 * @desc Determine which animation to use as a projectile.
 * @default 77
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExAni>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Icon
 * @text PROJECTILE: Icon
 * @desc Create an icon projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Icon:eval
 * @text Icon Index
 * @parent Settings
 * @desc Determine which icon to use as a projectile.
 * You may use JavaScript code.
 * @default 118
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Picture
 * @text PROJECTILE: Picture
 * @desc Create a picture projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Picture:str
 * @text Picture Filename
 * @parent Settings
 * @type file
 * @dir img/pictures/
 * @desc Determine which picture to use as a projectile.
 * @default Untitled
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceWeapon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakWeapon
 * @text Action Sequences - Weapon
 * @desc Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_ClearActiveWeapon
 * @text WEAPON: Clear Weapon Slot
 * @desc Clears the active weapon slot (making others valid again).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to clear the active weapon slot for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_NextActiveWeapon
 * @text WEAPON: Next Weapon Slot
 * @desc Goes to next active weapon slot (making others invalid).
 * If next slot is weaponless, don't label jump.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the next active weapon slot for.
 * @default ["user"]
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a weapon is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_SetActiveWeapon
 * @text WEAPON: Set Weapon Slot
 * @desc Sets the active weapon slot (making others invalid).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the active weapon slot for.
 * @default ["user"]
 * 
 * @arg SlotID:eval
 * @text Weapon Slot ID
 * @desc Select weapon slot to make active (making others invalid).
 * Use 0 to clear and normalize. You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @option combat log
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param QoL
 * @text Quality of Life
 *
 * @param AutoNotetag:eval
 * @text Auto Notetag
 * @parent QoL
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically apply the <Custom Action Sequence> notetag
 * effect to any item or skill that has a Common Event?
 * @default false
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Start Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileStart:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Start from battler target(s)
 * @value target
 * @option Point - Start from a point on the screen
 * @value point
 * @desc Select where the projectile should start from.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to start the projectile from.
 * @default ["user"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Create one projectile at the center of the targets?
 * Or create a projectile for each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Goal Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileGoal:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Goal is battler target(s)
 * @value target
 * @option Point - Goal is a point on the screen
 * @value point
 * @desc Select where the projectile should go to.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for projectile to go to.
 * @default ["all targets"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Set goal in the center of targets?
 * Or create a projectile to go to each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExAni:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
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
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExtra:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the projectile?
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
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
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Hue:eval
 * @text Hue
 * @parent Settings
 * @desc Adjust the hue of the projectile.
 * Insert a number between 0 and 360.
 * @default 0
 * 
 * @param Scale:eval
 * @text Scale
 * @parent Settings
 * @desc Adjust the size scaling of the projectile.
 * Use decimals for exact control.
 * @default 1.0
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
//=============================================================================

const _0x3735=['ActSeq_Animation_AttackAnimation2','dying','checkTpbInputClose','ActSeq_ChangeSkew','wtypeId','getBattlePortraitFilename','_customDamageFormula','Sprite_Actor_initMembers','isTpbMainPhase','refresh','PreDamageJS','push','AsTarget','guardSkillId','isDead','battleCorePreBattleCommonEvent','isFrameVisible','getSkillIdWithName','Game_Battler_performEvasion','onAngleEnd','clearHorrorEffects','_skillWindow','DigitGroupingDamageSprites','anchorY','bossCollapse','finishActionSet','uiMenuStyle','JS\x20%1START\x20ACTION','createDamageContainer','createActorCommandWindow','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','clearFreezeMotionForWeapons','displayCritical','command283','createDigits','isMeleeSingleTargetAction','adjustPosition_1for1','displayStartMessages','SceneManager_isSceneChanging','isGuardWaiting','Radius','battleCameraData','command339','makeHpDamageText','_battleCoreNoElement','show','changeCtbCastTime','displayType','_flipScaleX','WaitForProjectile','Debuffs','default','HP_Flat','updateWaitMode','autoMeleeMultiTargetActionSet','setHue','setHelpWindow','_visualHpGauge_JustDied','isPartyTpbInputtable','performSTBExploiter','forceAction','createAllWindows','setup','setupBattlebackBattleCore','setAttack','ShowHide','randomInt','Battleback','performActionMotions','performMiss','ReflectPlayback','ShowMpDmg','_inputting','log','setHorrorEffectSettings','performFlinch','updateAngleCalculations','AUTO\x20BATTLE','singleSkill','front\x20base','damage','Targets','swing','startJump','_distortionSprite','Sprite_Actor_createStateSprite','DamageRate','_animation','CounterPlayback','DamageStyles','right','battleback1Name','pow','ActSeq_Movement_Jump','isDisplayEmergedEnemies','startDamagePopup','missed','checkAutoCustomActionSequenceNotetagEffect','makeTargetSelectionMoreVisible','610768EoUCHN','DefaultHardCap','WaitForZoom','updateEventMain','getDualWieldTimes','maxItems','_svBattlerData','setupTextPopup','commandStyle','performCastAnimation','cancelButtonText','isAnyProjectilePresent','startOpacity','PostApplyAsUserJS','itemTextAlign','ApplyImmortal','Height','Game_Party_removeActor','alive\x20friends','updateAction','finalizeScale','ActSeq_Movement_Opacity','loadBitmap','setEventCallback','PostStartTurnJS','isOpen','Amp','_targetGrowX','battleStatusWindowAnimationContainer','ActSeq_Mechanics_CtbSpeed','isAnyoneGrowing','PreStartTurnJS','VisuMZ_0_CoreEngine','_homeX','CreateActionSequenceTargets','AS\x20USER','jump','\x5cI[%1]%2','AllowCollapse','playEnemyDamage','setupDamagePopup','surprise','ParseClassNotetags','makeCommandList','_opacityEasing','CommandAddOptions','Sprite_Battler_setBattler','_cache','Game_Battler_forceAction','Game_Actor_setup','waitForFloat','_targetOpacity','setupHpGaugeSprite','commandNameWindowDrawText','Scene_Battle_updateStatusWindowPosition','PreEndActionJS','Post','ActSeq_Movement_MoveToTarget','Game_Battler_clearDamagePopup','isAutoBattle','_logWindow','createMiss','_growEasing','partyCommandWindowRect','battleSpriteSkew','battleMembers','performDamage','drawItemStatusXPStyle','padding','RegExp','softDamageCapRate','max','DefaultStyle','callOkHandler','getBattlePortraitOffsetX','setupZoomBlurImpactFilter','parse','addOptionsCommand','clearDamagePopup','attackSkillId','zoomDuration','createBattleUIOffsetY','updateStatusWindowPosition','Scene_Battle_commandFight','Scene_Map_initialize','ActSeq_Element_Clear','DisablePartyCmd','drawText','missile','_multipliers','battleGrow','process_VisuMZ_BattleCore_BaseTroops','okTargetSelectionVisibility','checkTpbInputOpen','value','_borderPortraitSprite','CriticalColor','inHomePosition','GUARD','Window_BattleLog_pushBaseLine','Game_BattlerBase_initMembers','angle','clear','makeActions','partyCommandWindowRectBorderStyle','selectNextCommandTpb','registerCommand','isForFriend','cameraOffsetDuration','Game_BattlerBase_refresh','ActionItemMsg','createKeyJS','isOptionsCommandEnabled','isClicked','casting','ParseSkillNotetags','BattleStartEvent','_methods','stepBack','close','hpHealingFmt','fight','deadMembers','mpHealingFmt','current\x20target','_targets','Scene_Battle_skillWindowRect','FlashColor','updateBattlebackBitmap','regenerateAll','Game_Temp_requestAnimation','isSideButtonLayout','startSkew','undecided','ActSeq_Mechanics_StbRemoveExcessActions','processBattleCoreJS','_item','map','Sprite_Battler_setHome','DTB','isForRandomBattleCore','updateCancel','getItemDamageAmountTextOriginal','drawItemImageXPStyle','isUndecided','_requestRefresh','EscapeSuccessJS','ActSeq_BattleLog_Clear','updateBorderStyle','reserveCommonEvent','setActiveWeaponSet','_actor','isQueueOptionsMenu','Game_Enemy_transform','setActionState','3mOXqRE','PostDamageJS','updateShadowPosition','CmdIconFight','_weaponSprite','createAnimationContainer','isImmortal','exit','endBattle','_target','shadow','BattleDefeatJS','ActSeq_Mechanics_TextPopup','drawSingleSkillCost','_baseY','battleLayoutStyle','preemptive','tone','ResetFocus','CmdStyle','battleCamera','applyEasing','Scene_Battle_onActorCancel','drawItemStatus','itemEffectAddNormalState','isCancelled','Spriteset_Battle_update','createCommandNameWindow','message1','loadSvEnemy','processForcedAction','critical','ActSeq_Angle_WaitForAngle','displayRemovedStates','turnCount','addBattleCoreAutoBattleStartupCommand','Window_BattleLog_performEvasion','growBattler','_targetAngle','battleSys','PortraitScale','initVisibility','weatherType','processRefresh','noise','ActSeq_Motion_RefreshMotion','Buffs','terminate','motionSpeed','command301','BravePoints','RepositionEnemies','CastMagical','selectPreviousCommand','BattleLogRectJS','JS\x20%1START\x20TURN','toLowerCase','EFFECT_COMMON_EVENT','addDamageSprite','ActSeq_BattleLog_WaitForBattleLog','Game_Map_battleback1Name','Destination','_effectDuration','_regionBattleback1','ActSeq_Horror_TVRemove','ShowCurrentState','isChanting','performMagicEvasion','Game_System_initialize','ARRAYFUNC','CriticalDmgFlat','UNTITLED','_preBattleCommonEvent','ActSeq_Angle_Reset','remove','boxWidth','_activeWeaponSlot','JumpToLabel','Spriteset_Battle_updateActors','notFocusValid','placeStateIcon','ShowPortraitsBorderStyle','getConfigValue','isAutoBattleCommandAdded','Filename','ActSeq_Mechanics_AtbGauge','StartTurnWait','canUseItemCommand','clearFreezeMotion','duration','_forcedBattlers','%1EndBattleJS','Scene_Battle_selectPreviousCommand','Window_BattleLog_popupDamage','forceEscapeSprite','BattleManager_initMembers','float','_jumpMaxHeight','bind','isAnyoneMoving','updateShadowVisibility','bgType','_shake','PreEndTurnJS','validTargets','DefaultSoftScaler','ActSeq_Zoom_Scale','Sprite_Enemy_initVisibility','adjustPosition_ScaleUp','prepareCustomActionSequence','mainSpriteWidth','itemHeight','_skewWholeDuration','loop','_effectType','Sprite_StateIcon_updateFrame','useDigitGrouping','performAction','currentClass','thrust','MANUAL','damageOffsetX','ConvertParams','turn','Game_Interpreter_PluginCommand','addAutoBattleCommands','isSpriteVisible','setupBattleback','getBattlePortraitOffsetY','customDamageFormula','VisuMZ_2_PartySystem','drawBackgroundRect','process_VisuMZ_BattleCore_Action_Notetags','_actorSprites','NUM','selectNextActor','svBattlerAnchorX','svAnchorY','CommandAddAutoBattle','isTriggered','createContents','Sprite_Battler_updatePosition','placeActorName','Game_Party_addActor','setBattleAngle','refreshDimmerBitmap','setHelpWindowItem','createAnimationSprite','Formula','ActSeq_Camera_WaitForCamera','mainSprite','blt','checkShowHideBattleNotetags','cameraClamp','resizeWindowBorderStyle','executeDamage','Sprite_Enemy_setHue','canGuard','requestRefresh','makeDeepCopy','addSingleSkillCommand','extraHeight','updateCollapse','AutoMeleeSolo','canGuardBattleCore','isFlipped','drawTextEx','startMove','join','ActorCmd','isCharging','WaitCount2','_phase','floor','windowAreaHeight','ActionEffect','Elements','commandStyleCheck','_itemWindow','SideviewSelect','Game_Interpreter_terminate','arPenFlat','updateShadow','nextActiveWeaponSlot','sortEnemies','onEncounter','STYPES','startSpin','Window_BattleLog_performCounter','Window_BattleLog_displayMpDamage','sort','_angleDuration','actorCommandSingleSkill','Game_Enemy_setup','_battlerHue','iconHeight','isEscapeCommandEnabled','SkewX','getSkillTypes','ActSeq_Impact_ZoomBlurTargetCenter','isCustomBattleScope','alive\x20battlers','displayHpDamage','update','addCombatLogCommand','Linear','process_VisuMZ_BattleCore_Notetags','needsSelection','Shadow','ShowEnemyGauge','splice','dead\x20battlers','updateEffectContainers','deathStateId','_animationSprites','TextColor','eraseState','_spriteset','isBattlerFlipped','popupDamage','dataId','ActionAnimation','_battlerName','head','isSceneBattle','stepForward','guard','drawActorFace','Variable','Game_Battler_performDamage','_skewX','Game_Interpreter_updateWaitMode','IconStypeNorm','stepFlinch','ActSeq_Movement_Spin','_currentAngle','Window_BattleLog_displayTpDamage','waitForAnimation','Game_Interpreter_command301','_stateSprite','Game_Map_battleback2Name','startBattle','updateVisibility','battleCommandIcon','_statusWindow','#%1','applyFreezeMotionFrames','createWeather','CommandVisible','attackAnimationIdSlot','message4','processDefeat','Sprite_Battler_initMembers','Enemy-%1-%2','createCommandVisibleJS','moveBattlerDistance','battleCommandName','AS\x20TARGET','WaitForCamera','JS\x20%1END\x20ACTION','_regionBattleback2','AutoNotetag','Game_Actor_makeActionList','commandSymbol','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','requestFauxAnimation','spinBattler','motionType','makeEscapeRatio','helpAreaHeight','spriteId','Strength','SvBattlerSolo-%1-%2','CastCertain','isAutoBattleCommandEnabled','BackColor','isBorderStylePortraitShown','createInnerPortrait','opponentsUnit','drain','ShowRemovedBuff','reverse','bitmapHeight','addNewState','ARRAYJSON','NameOffsetY','_targetSkewX','ActSeq_Mechanics_Collapse','Actions','HelpFight','moveToStartPositionBattleCore','compareEnemySprite','addLoadListener','moveToStartPosition','drawGauge','_offsetX','Scene_Battle_createHelpWindow','_damageContainer','isFloating','sleep','SkillItemMiddleLayout','ActSeq_Target_RandTarget','Scene_Battle_startActorCommandSelection','getStypeIdWithName','_battleLayoutStyle','centerFrontViewSprite','BattleCore','Window_BattleStatus_drawItemImage','MP_Rate','weapons','battleCoreResumeLaunchBattle','ParseStateNotetags','loadBattleback2','ActSeq_Element_ForceElements','isJumping','canMove','filter','height','BattleManager_startAction','refreshMotion','BattleManager_processVictory','iconIndex','extraPositionY','showAnimation','indexOf','3451529ISJcsd','needsSelectionBattleCore','enemy','onSkewEnd','scope','addImmortal','loadPicture','updatePositionBattleCore','_additionalSprites','Name','flashColor','repeats','string','isEnemy','open','XPSpriteYLocation','getHardDamageCap','skillId','battleAngle','BattleManager_inputtingAction','process_VisuMZ_BattleCore_DamageStyles','changeBattlerOpacity','hue','Window_BattleLog_displayCurrentState','PreApplyAsTargetJS','_battlerContainer','createBattleUIOffsetX','Game_Battler_startTpbTurn','maxCommands','allowRandomSpeed','OffsetX','LastSelected','isBattlerGrounded','changePaintOpacity','autoSelect','setActorHome','WaitForAnimation','PreEndBattleJS','ParseItemNotetags','startTurn','jumpBattler','startActorCommandSelection','criticalHitFlat','_subject','DamageStyleList','actorCommandWindowRect','left','_duration','setupMotionBlurImpactFilter','MotionFrameWait','1099663IPhxFU','Scene_Battle_start','faceWidth','textColor','updateCustomActionSequence','NameFontSize','toString','addChild','ForceRandom','_cursorSprite','ActSeq_Target_NextTarget','mainSpriteHeight','invokeMagicReflection','getWtypeIdWithName','front\x20center','AutoBattleBgType','StartName','ParseWeaponNotetags','canBattlerMove','makeAutoBattleActions','isBattleTest','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','ActSeq_Movement_MoveToPoint','ActSeq_Horror_NoiseCreate','concat','setupBattleCoreData','adjustWeaponSpriteOffset','CmdIconOptions','parseForcedGameTroopSettingsBattleCore','DigitGrouping','isSkill','changeBattlebacks','onBattleStartBattleCore','onFloatEnd','Index','innerHeight','isPhysical','Scene_Battle_terminate','onEscapeFailure','Sprite_Battler_updateMain','chantStyle','ActSeq_Impact_ShockwaveCenterTargets','createStateIconSprite','isBattleFlipped','all\x20targets','statusWindowRect','_tpbNeedsPartyCommand','WaitForEffect','isDuringNonLoopingMotion','commandEscape','isAppeared','%1Event','_back2Sprite','escape','Window_PartyCommand_initialize','Class-%1-%2','VisuMZ_1_SkillsStatesCore','svBattlerData','SkillItemBorderCols','updateFloat','commandNameWindowCenter','waitForEffect','placeGauge','Game_Action_clear','Targets2','_shadowSprite','Game_Action_itemEffectAddAttackState','Game_Battler_clearMotion','_floatDuration','CmdTextAlign','CriticalHitMultiplier','updateScale','canUse','ActSeq_Movement_FaceTarget','damageContainer','apply','hpDamage','1:1','ActSeq_BattleLog_DisplayAction','_skillIDs','reduce','Scene_Battle_createPartyCommandWindow','Window_BattleEnemy_show','processBorderActor','ActSeq_Movement_WaitForJump','_growY','fillRect','resizeWindowXPStyle','isRightInputMode','setBattler','wait','DistanceX','_motionSpeed','battleFloat','_actionBattlers','drawItemStyleIcon','filterArea','IconStypeMagic','startGrow','_flinched','speed','_armorPenetration','_targetGrowY','DamageFlat','BattleManager_isTpbMainPhase','MDF','displayChangedBuffs','addText','createChildSprite','onEncounterBattleCore','BattleManager_onEncounter','isCustomActionSequence','isGrowing','return\x200','createBattleFieldContainer','_cancelButton','skewBattler','fittingHeight','ActSeq_Mechanics_WaitForEffect','isNextScene','Window_BattleLog_refresh','isOpponent','attachSpritesToDistortionSprite','drawItemImage','autoBattle','Window_BattleLog_performActionEnd','_attackAnimationId','_animationContainer','alive\x20opponents\x20not\x20target','compareBattlerSprites','#ffffff','refreshRequest','_actionInputIndex','Window_BattleLog_performAction','addAttackCommand','LUK','makeActionList','isVisualHpGaugeDisplayed','ElementStatusCore','displayMpDamage','ArRedRate','applyVariance','ShowFacesListStyle','isMagical','svBattlerShadowVisible','alive\x20friends\x20not\x20target','ArRedFlat','iterateBattler','PostStartActionJS','alive\x20battlers\x20not\x20target','BattleVictoryJS','ShowAddedDebuff','VisuMZ_1_MainMenuCore','ActSeq_Mechanics_CtbOrder','shouldPopupDamage','move','setWaitMode','applyForcedGameTroopSettingsBattleCore','ActSeq_Set_TargetActionSet','isMeleeMultiTargetAction','contentsOpacity','hpAffected','ActionCount','WaitForAngle','loadEnemy','updateActors','VisuMZ_3_ActSeqImpact','ShowHpDmg','Sprite_Enemy_setBattler','isAnimationShownOnBattlePortrait','_actions','isConfused','prev\x20target','occasion','isBypassDamageCap','addFightCommand','cancel','actorCommandEscape','clearActiveWeaponSet','isAtbCastingState','createBorderStylePortraitSprite','performAttackSlot','_scene','PreDamageAsTargetJS','svAnchorX','COMBAT\x20LOG','subject','isEffecting','charging','_currentActor','cancelTargetSelectionVisibility','1ePAXfx','stop','createTargetsJS','removeBuffsAuto','Game_Action_apply','substitute','WaitForScale','animationId','refreshBattlerMotions','isBattleSys','updateHelp','VisuMZ_2_DragonbonesUnion','pattern','createHelpWindow','PerformAction','_growWholeDuration','Window_BattleEnemy_initialize','transform','alive\x20actors\x20not\x20target','_updateCursorArea','isPreviousSceneBattleTransitionable','AsUser','_windowLayer','isPartyCommandWindowDisabled','parameters','canEscape','updateSkew','IconSet','abs','STR','drawItemImageListStyle','fontSize','BattleEndEvent','evade','createHpGaugeSprite','_actorWindow','applyAngleChange','_homeY','isAttack','ActSeq_Mechanics_RemoveBuffDebuff','updateStateSprite','Window_BattleLog_displayCritical','partyCommandWindowRectDefaultStyle','physical','MIN_SAFE_INTEGER','atbInterrupt','_enemyID','_updateFilterArea','redraw','updatePosition','PopupDuration','isTickBased','logActionList','onGrowEnd','updateSpin','skillItemWindowRectBorderStyle','Game_BattlerBase_eraseState','StartTurnShow','ShowAddedState','_updateCursorFilterArea','StyleOFF','requestMotionRefresh','damageOffsetY','performActionEnd','_targetFloatHeight','JS\x20%1END\x20TURN','call','RevertAngle','_motionCount','_pattern','worldTransform','isAnyoneChangingOpacity','opacity','ActionSkillMsg1','battlelog','_svBattlerSprite','createEffectActionSet','waitForOpacity','applyItem','setupShockwaveImpactFilter','Scene_Battle_stop','Game_Troop_setup','_cursorArea','ActSeq_Impact_MotionBlurScreen','updateOpacity','initBattleCore','WaitForMovement','Scene_Battle_updateBattleProcess','center','isActiveTpb','drawItemStatusListStyle','addedDebuffs','isDTB','type','Window_BattleLog_performReflection','ActSeq_Horror_GlitchCreate','Game_Action_isForFriend','gainBravePoints','criticalHitRate','Pre','_back1Sprite','waitForJump','Text','addGeneralOptions','updateRefresh','allBattleMembers','SkipPartyCmd','itemRect','prepareBorderActor','processEscape','_autoBattleWindow','setImmortal','AnchorX','ActSeq_Camera_Reset','Sprite_Actor_setBattler','checkShowHideSkillNotetags','battleEffect','Game_Action_isForRandom','Damage','AutoBattleRect','_enemyIDs','Sprite_Enemy_update','process_VisuMZ_BattleCore_Failsafes','addSingleSkillCommands','ActSeq_Mechanics_VariablePopup','ActSeq_DB_DragonbonesMotionAni','VisuMZ_1_ElementStatusCore','traitObjects','GroupDigits','DefaultDamageStyle','SkewY','delay','ActSeq_Projectile_Icon','innerWidth','Scene_ItemBase_applyItem','_borderPortraitDuration','Actor','updateBossCollapse','Scene_Battle_startEnemySelection','onDatabaseLoaded','ResetOffset','launchBattle','isDamagePopupRequested','displayItemMessage','makeTargets','isDebuffAffected','_forcing','HelpItem','die','some','_jumpDuration','removeState','setHome','addBuff','SvWeaponSolo-%1-%2','ActSeq_Motion_WaitMotionFrame','text\x20target','makeTargetsBattleCore','commandNameWindowDrawBackground','updatePadding','ActSeq_Animation_AttackAnimation','isAnyoneFloating','performCollapse','getAttackMotion','itemHit','actor','maxCols','HitRate','attack','startActorSelection','isBattleRefreshRequested','FlinchDuration','text','onAllActionsEnd','%1EndActionJS','Window_SkillList_maxCols','ShowTpDmg','_updateClientArea','Scene_Battle_onEnemyOk','createMainSprite','Scene_Battle_windowAreaHeight','_tpbSceneChangeCacheActor','addState','MessageWait','_tpbState','AdjustRect','hasBeenDefeatedBefore','_text','HitFlat','commandName','battleCommands','onRegeneratePlayStateAnimation','HpGauge','PopupOffsetX','WaitForFloat','_jumpWholeDuration','Exploiter','_surprise','isActor','_enemy','angleDuration','initialize','playReflection','command119','isLearnedSkill','_dimmerSprite','inBattle','DistanceAdjust','CommandWidth','HP_Rate','buffAdd','initMembers','BattleLayout','dead','COMBATLOG','PartyCmd','windowPadding','TP_Rate','_createEffectsContainer','isItem','ShowReflect','_lines','ActSeq_Animation_ShowAnimation','weaponTypes','isDying','TPB','EmergeText','getAttackWeaponAnimationId','_baseLineStack','DefeatEvent','removedStateObjects','round','Game_Action_evalDamageFormula','selectNextCommand','_borderPortraitTargetX','slices','_angleWholeDuration','onBattleStart','forceWeaponAnimation','isOptionsCommandAdded','ActSeq_Weapon_NextActiveWeapon','process_VisuMZ_BattleCore_jsFunctions','isAnimationPlaying','stypeId','isSkewing','lineRect','ATTACK','currentSymbol','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','AlphaFilter','AllowRandomSpeed','setBattlerBattleCore','ActSeq_Target_CurrentIndex','updateHpGaugePosition','CriticalHitRate','ForceExploited','textSizeEx','battlerSprites','commandAutoBattle','autoBattleUseSkills','autoBattleStart','dragonbonesData','start','setupBattleCore','startInput','ParseActorNotetags','Scene_Battle_onActorOk','pages','PostEndActionJS','constructor','PopupPosition','createBattleFieldBattleCore','createString','Window_BattleLog_displayFailure','updateMain','setFrame','isForOne','updateBorderSprite','code','visible','CmdIconEscape','getSimilarSTypes','weatherPower','inputtingAction','addSkillTypeCommand','ScaleY','_motionType','anchor','displaySubstitute','setBattlerFlip','options','targetActionSet','updateJump','MaxLines','statusText','ShowPortraits','drawSkillCost','ActSeq_Set_WholeActionSet','registerDefeatedEnemy','createBattleField','ActSeq_Mechanics_ArmorPenetration','_baseX','Point','retreat','AutoMeleeAoE','_callSceneOptions','EscapeSuccess','EscapeFail','_stateIconSprite','_battleCoreForcedElements','updateStart','ConfigManager_makeData','sliceMax','Sprite_Battler_damageOffsetY','TP_Flat','PRE-','_enemyId','command301_PreBattleEvent','_growDuration','VisuMZ_2_BattleSystemATB','Opacity','OverallFormulaJS','drawItemImagePortraitStyle','resetFontSettings','Sprite_Enemy_createStateIconSprite','PostApply%1JS','SKILLS','autoMeleeSingleTargetActionSet','WaitCount','ActSeq_Weapon_ClearActiveWeapon','Sprite_Battler_startMove','clearElementChanges','startMotion','smooth','Armor-%1-%2','changeAtbCastTime','slice','WaitForJump','updateBitmap','becomeSTBExploited','_lastEnemy','Spriteset_Battle_createBattleField','itemLineRect','_actorCommandWindow','CoreEngine','_createDamageContainer','ShowWeapon','Game_BattlerBase_canGuard','addActor','setCustomDamageFormula','performEvasion','_forcedBattleLayout','Sprite_Actor_updateShadow','unshift','setBattleCameraOffset','displayAction','enemyId','iconText','repositionEnemiesByResolution','repeatTargets','ActSeq_Mechanics_AddBuffDebuff','ShowCounter','preparePartyRefresh','checkCacheKey','index','portrait','isBattleCoreTargetScope','clearBattleCoreData','useItem','_opacityDuration','removeAnimation','battleJump','_branch','Victory','createPartyCommandWindow','_mainSprite','getDefeatedEnemies','DualWield','performActionEndMembers','FlashDuration','_dragonbonesSpriteContainer','_growX','_isBattlerFlipped','isHiddenSkill','refreshCursor','ActSeq_Mechanics_Multipliers','addAutoBattleCommand','BattleManager_endBattle','VisuMZ_2_BattleSystemSTB','flashDuration','updateStyleOpacity','Window_BattleLog_performSubstitute','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','process_VisuMZ_BattleCore_TraitObject_Notetags','animationShouldMirror','StepDistanceX','createCancelButton','command357','_waitMode','createDamageSprite','ActSeq_Animation_CastAnimation','isInputting','displayActionResults','victory','canAttackBattleCore','onDisabledPartyCommandSelection','JS\x20%1APPLY\x20%2','Window_Options_addGeneralOptions','Window_BattleLog_performActionStart','popBaseLine','getNextDamagePopup','makeActionListAutoAttack','States','gaugeX','attackAnimationId2','PostRegenerateJS','moveBattlerToPoint','displayCurrentState','PreApplyJS','AttackAnimation','AddHpGaugeOption','clone','changeTurnOrderByCTB','addSkillCommands','endAnimation','OffsetAdjust','CmdTextAutoBattle','helpWindowRect','Game_Battler_makeSpeed','setHandler','Game_Map_setupBattleback','isSceneChanging','Sprite_Enemy_updateBossCollapse','PopupShiftX','command3011','Scale','BattleManager_updatePhase','Scene_Battle_startPartyCommandSelection','applyBattleCoreJS','ActSeq_Movement_WaitForOpacity','dimColor1','Wave','isActing','makeActionOrders','rowSpacing','process_VisuMZ_BattleCore_CreateRegExp','_weather','refreshActorPortrait','ARRAYSTR','SmoothImage','destroyDamageSprite','getAttackMotionSlot','addItemCommand','BattleLog','ITEM','PostDamageAsUserJS','ScaleUp','ConvertActionSequenceTarget','refreshStatusWindow','Window_BattleLog_popBaseLine','freezeFrame','HelpOptions','dead\x20opponents','_action','VisuMZ_2_BattleSystemBTB','Window_Options_statusText','addChildAt','Scene_Battle_createAllWindows','wholeActionSet','drawIcon','Scene_Battle_createCancelButton','drawItem','clearForcedGameTroopSettingsBattleCore','Duration','nameY','mainSpriteScaleY','isCertainHit','Game_Battler_regenerateAll','create','AnchorY','isAnyoneJumping','BARE\x20HANDS','freezeMotion','includes','CalcEscapeRaiseJS','skillWindowRect','user','PreRegenerateJS','collapse','motionIdle','Window_BattleLog_clear','arPenRate','cancelActorInput','VisuMZ_4_CombatLog','RequiresDefeat','showHelpWindow','regionId','displayReflectionPlayBack','actorCommandCancelTPB','addDebuff','Game_Battler_performMiss','PostStartBattleJS','TargetLocation','setBattlerFacePoint','PostEndBattleJS','_indent','ext','Window_BattleLog_displayEvasion','Scene_Battle_itemWindowRect','_endBattle','TimeScale','ShowMissEvasion','isForFriendBattleCore','_battler','displayCounter','Parse_Notetags_Action','updateShadowBattleCore','filters','XPActorDefaultHeight','isGuard','SkillItemStandardCols','collapseType','Sprite_Actor_update','needsActorInputCancel','PreStartActionJS','isSideView','updateGrow','backColor','CastAnimation','_commonEventQueue','removeImmortal','damageRate','Window_ItemList_maxCols','currentValue','actionSplicePoint','forceMotion','Window_ActorCommand_setup','battleback2Name','StepDuration','applyData','swapEnemyIDs','setBattlerMotionTrailData','_skewY','ActSeq_Movement_WaitForSkew','walk','Scene_Battle_onEnemyCancel','_index','Game_Actor_equips','callOptions','performAttack','getNextSubjectFromPool','_targetIndex','abnormal','setupWeaponAnimation','Game_BattlerBase_canAttack','ShowSubstitute','setupMotion','State-%1-%2','removeHorrorEffect','battler','gainCurrentActionsFTB','message2','isSpinning','WaitForSpin','_enemies','processRandomizedData','_enemyNameContainer','_escapeRatio','isMoving','skillItemWindowRectMiddle','partyCommandWindowRectXPStyle','evalDamageFormula','MAXHP','actorCommandAutoBattle','Scene_Battle_startActorSelection','skew','_stypeIDs','shift','destroy','CriticalDmgRate','_allTargets','statusTextAutoBattleStyle','parent','clearRect','createShadowSprite','actor%1-portrait','Game_Action_executeDamage','Game_Battler_performActionStart','ActSeq_Movement_FacePoint','displayBuffs','addCustomCommands','Sprite_Actor_updateFrame','-%1\x20MP','BattleManager_endAction','_battleField','ActSeq_BattleLog_UI','createEnemyNameContainer','ActSeq_Motion_ClearFreezeFrame','DefaultSoftCap','Sprite_Actor_moveToStartPosition','isForAll','alive\x20actors\x20not\x20user','_defeatedEnemies','split','battleZoom','Parse_Notetags_Targets','ActionSequence','clearResult','Rate','forceSelect','startTpbTurn','battleUIOffsetX','_executedValue','magicSkills','_floatEasing','endAction','sliceMin','softDamageCap','addGuardCommand','JS\x20%1START\x20BATTLE','mainSpriteScaleX','performJump','_targetSkewY','ActSeq_Impact_MotionBlurTarget','magicReflection','ChangeOrderBy','repositionCancelButtonBorderStyle','randomTargets','XPActorCommandLines','arRedFlat','traitSet','Frame','MAXMP','WaitCount1','battleSkew','_helpWindow','isAnyoneSpinning','%1EndTurnJS','Window_BattleLog_performMagicEvasion','updateCommandNameWindow','ActionSkillMsg2','_createCursorArea','applyGuard','min','Scene_Battle_partyCommandWindowRect','_totalValue','mpDamageFmt','SvMotionIdleSolo-%1-%2','performMoveToTargets','updateBattleProcess','maxBattleMembers','BattleManager_makeActionOrders','performActionStart','requestMotion','battleMove','PostEndTurnJS','createAutoBattleWindow','pushBaseLine','StepDistanceY','waitForMovement','actions','createEmptyBitmap','ActionEnd','initBattlePortrait','Window_BattleLog_performRecovery','ActSeq_Motion_MotionType','Sprite_Enemy_loadBitmap','ActSeq_Movement_MoveBy','ActSeq_Impact_ColorBreak','autoBattleAtStart','updateWeather','resize','hasSkill','displayReflection','createLowerLayer','gainHp','setupCriticalEffect','attackMotions','list','getDamageStyle','BattleManager_selectNextCommand','ActSeq_Motion_FreezeMotionFrame','Game_Battler_onTurnEnd','Window_ActorCommand_initialize','displayTpDamage','displayFailure','_jumpHeight','createActionSequenceProjectile','snapForBackground','BattleManager_startBattle','Direction','_angleRevertOnFinish','DamageType%1','performReflection','createJS','Game_Action_isForOpponent','stateMotionIndex','addChildToBack','timeScale','setMoveEasingType','getLastPluginCommandInterpreter','frameVisible','loadSystem','CalcEscapeRatioJS','FocusX','performSubstitute','showPortraits','_list','result','hide','_battlePortrait','performWeaponAnimation','_hpGaugeSprite','444493ATObkZ','startFloat','CriticalHitFlat','actionEffect','_damages','onSelectAction','5059SMNLCN','ParseEnemyNotetags','_canLose','adjustPosition_ScaleToFit','_damagePopupArray','isSkipPartyCommandWindow','children','FocusY','trueRandomTarget','performMoveToPoint','gainTp','Game_BattlerBase_die','_emptyBitmap','hardDamageCap','autoBattleStyle','process_VisuMZ_BattleCore_PluginParams','_partyCommandWindow','clearMotion','Scene_Battle_selectNextCommand','format','ShowPopup','criticalDmgFlat','setVisibleUI','isFightCommandEnabled','enemyNames','ActSeq_Animation_WaitForAnimation','gradientFillRect','137eYqtre','okButtonText','drawItemStyleIconText','_preemptive','addEscapeCommand','CmdIconAutoBattle','replace','addShowHpGaugeCommand','updateForceAction','applySoftDamageCap','BattleManager_processDefeat','callUpdateHelp','displayEvasion','ARRAYSTRUCT','_appeared','Mechanics','_motion','isTurnBased','_animationCount','getBattlePortrait','GuardFormulaJS','_freezeMotionData','BattleManager_onEscapeFailure','_colorType','isNonSubmenuCancel','Immortal','scale','_skewDuration','setBattleSkew','evaded','sortDamageSprites','optDisplayTp','Enemy','startWeaponAnimation','aliveMembers','autoSelectLastSelected','setBackgroundType','ClearBattleLog','MotionType','ShowActorGauge','Setting','Sprite_Weapon_loadBitmap','Scene_Battle_createActorCommandWindow','not\x20focus','floatBattler','BattleManager_onEscapeSuccess','Window_BattleLog_performDamage','onActorCancel','allowCollapse','ActSeq_Movement_WaitForSpin','helpWindowRectBorderStyle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','battleProjectiles','currentExt','waitCount','skillTypes','active','statusWindowRectBorderStyle','callNextMethod','usePremadeActionSequence','<CENTER>%1','attackAnimationId1','isShownOnBattlePortrait','battleDisplayText','processPostBattleCommonEvents','NewPopupBottom','currentAction','_angleEasing','processAnimationRequests','finishActorInput','updateStateSpriteBattleCore','SvWeaponMass-%1-%2','statusWindowRectDefaultStyle','createActors','AddOption','anchorX','ActSeq_Impact_ZoomBlurPoint','adjustFlippedBattlefield','isAlive','Sprite_Actor_updateBitmap','_padding','autoBattleWindowRect','SvMotionIdleMass-%1-%2','mpDamage','ActSeq_Mechanics_AddState','removeChild','bitmap','ForceDeath','updateBattlebackBitmap1','applyImmortal','STRUCT','isHidden','onOpacityEnd','contents','commandOptions','FUNC','ActSeq_Mechanics_StbExploit','clearActiveWeaponSlot','_battleCoreBattleStartEvent','PrioritySortActive','_floatHeight','CheckMapBattleEventValid','isBusy','BattleManager_cancelActorInput','ARRAYNUM','performRecovery','isForOpponent','Game_Action_needsSelection','onEnemyOk','itemWindowRect','isPlaytest','findTargetSprite','getEnemyIdWithName','Game_BattlerBase_isStateResist','startAction','hasSvBattler','actionBattleCoreJS','Turns','_effectsContainer','numTargets','Settings','setActiveWeaponSlot','getTraitSetKeys','itemEffectAddAttackState','makeDamageValue','Sprite_Enemy_updateCollapse','battleUIOffsetY','ForceExploiter','match','AGI','WaitForSkew','name','equips','opacityStart','Scene_Battle_helpWindowRect','DisplayAction','ActSeq_Skew_Reset','visualHpGauge','alive\x20opponents','ActSeq_Mechanics_FtbAction','Game_Action_makeTargets','Sprite_Enemy_updateStateSprite','PARTY','mhp','putActiveBattlerOnTop','displayAddedStates','basicGaugesY','item','uiInputPosition','ActSeq_Set_FinishAction','gainMp','isTpb','isForRandom','isAnyoneSkewing','ActSeq_Animation_ChangeBattlePortrait','_immortal','BattleManager_startInput','Sprite_Actor_setActorHome','helpAreaBottom','VisuMZ_2_BattleSystemCTB','skill','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ActSeq_Movement_WaitForFloat','battleOpacity','ActSeq_Impact_MotionTrailCreate','statusWindowRectXPStyle','toUpperCase','requestAnimation','applyHardDamageCap','Sprite_Battler_isMoving','commandFight','description','calcWindowHeight','initMembersBattleCore','isItemCommandEnabled','JS\x20ESCAPE\x20FAILURE','length','ActSeq_Camera_FocusTarget','border','adjustPosition_ScaleDown','addPartyCommand','PreStartBattleJS','Intensity','autoSelectPriority','svBattlerAnchorY','setupActionSet','StartTurnMsg','setSTBExploited','_commandNameWindow','EVAL','regenerateAllBattleCore','showNormalAnimation','setLastPluginCommandInterpreter','evalDamageFormulaBattleCore','HomePosJS','applyArmorModifiers','_opacityWholeDuration','FaceAway','removeActor','movement','svShadow','friendsUnit','canAttack','updatePhase','onActorOk','VisuMZ_2_HorrorEffects','OffsetY','lineHeight','makeData','damageStyle','getItemDamageAmountTextBattleCore','setupIconTextPopup','isForOpponentBattleCore','_floatWholeDuration','Mirror','_tempEquipCheck','attackStates','prototype','maxLines','Interrupt','isFriendly','WtypeId','VisuMZ_3_ActSeqProjectiles','startAttackWeaponAnimation','ActSeq_Mechanics_StbExtraAction','PopupShiftY','initElementStatusCore','_flashDuration','Parse_Notetags_TraitObjects','Game_Battler_onBattleStart','boxHeight','trim','getInputButtonString','StyleON','BattleManager_startTurn','_weaponImageId','Game_Action_itemEffectAddNormalState','JS\x20%1REGENERATE','note','battleCoreTpbMainPhase','ChargeRate','AutoBattleMsg','CheckSkillCommandShowSwitches','_enemySprites','param','dead\x20enemies','ATK','_battleCoreAddedElements','_createCursorSprite','isSkillItemWindowsMiddle','MOTIONS','iconWidth','PrioritySortActors','activate','ActSeq_Movement_WaitForScale','ceil','logWindowRect','1326528RRIIgM','MAT','animation','AutoBattle','ParseArmorNotetags','VisuMZ_3_ActSeqCamera','_enemyWindow','setBattleCameraPoint','ReflectAnimation','createPartyCommandWindowBattleCore','ActSeq_Mechanics_BtbGain','addAnimationSpriteToContainer','placeTimeGauge','onTurnEnd','_lastPluginCommandInterpreter','damageFlat','onJumpEnd','startPartyCommandSelection','dimColor2','_flashColor','createStateSprite','ActSeq_Horror_GlitchRemove','getMenuImage','_wtypeIDs','_skewEasing','SlotID','1173201VbNsdl','Window_BattleStatus_initialize','PopupOffsetY','origin','ActSeq_BattleLog_Refresh','canAddSkillCommand','Sprite_Battleback_adjustPosition','battleAnimation','invokeAction','Game_BattlerBase_addNewState','Window_BattleLog_performCollapse','action','width','icon','getColor','Sprite_Battler_damageOffsetX','onEscapeSuccess','updateFlip','waitForNewLine','Style','MotionIdle','adjustPosition','animationWait','targetObjects','setText','_autoBattle','DEF','ShowFailure','isNextSceneBattleTransitionable','custom','ActSeq_Weapon_SetActiveWeapon','battlerSmoothImage','%1Apply%2JS','ActSeq_Target_PrevTarget','charged','Angle','applyCritical','Game_Action_itemHit','equipSlots','setBattlePortrait','members','addedBuffs','makeSpeed','performCounter','Window_BattleLog_performMiss','EasingType','removeAnimationFromContainer','isMagicSkill','Window_BattleLog_displayMiss','formula','ESCAPE','updateFrame','EscapeFailureJS','weaponImageId','battleSpin','emerge','FaceDirection','chant','addCommand','measureTextWidth'];const _0x4686=function(_0x93324c,_0x1c4d4d){_0x93324c=_0x93324c-0x17d;let _0x373583=_0x3735[_0x93324c];return _0x373583;};const _0x2832c8=_0x4686;(function(_0x2a40d6,_0x877be9){const _0x2c9276=_0x4686;while(!![]){try{const _0x4555c9=parseInt(_0x2c9276(0x82a))+-parseInt(_0x2c9276(0x771))+parseInt(_0x2c9276(0x64f))*-parseInt(_0x2c9276(0x8c5))+-parseInt(_0x2c9276(0x2c7))+-parseInt(_0x2c9276(0x386))*-parseInt(_0x2c9276(0x78b))+-parseInt(_0x2c9276(0x655))*parseInt(_0x2c9276(0x670))+parseInt(_0x2c9276(0x295));if(_0x4555c9===_0x877be9)break;else _0x2a40d6['push'](_0x2a40d6['shift']());}catch(_0x216281){_0x2a40d6['push'](_0x2a40d6['shift']());}}}(_0x3735,0xbf199));var label=_0x2832c8(0x282),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2832c8(0x28c)](function(_0x55fff7){const _0x3b95b7=_0x2832c8;return _0x55fff7['status']&&_0x55fff7[_0x3b95b7(0x71b)][_0x3b95b7(0x569)]('['+label+']');})[0x0];VisuMZ[label][_0x2832c8(0x6e8)]=VisuMZ[label][_0x2832c8(0x6e8)]||{},VisuMZ['ConvertParams']=function(_0x10ef26,_0x5394b8){const _0x5e1c96=_0x2832c8;for(const _0x1ea2e1 in _0x5394b8){if(_0x1ea2e1[_0x5e1c96(0x6f0)](/(.*):(.*)/i)){const _0x16954b=String(RegExp['$1']),_0x49599d=String(RegExp['$2'])[_0x5e1c96(0x716)]()[_0x5e1c96(0x757)]();let _0x3a1b1a,_0x33118d,_0x12cb75;switch(_0x49599d){case _0x5e1c96(0x1d6):_0x3a1b1a=_0x5394b8[_0x1ea2e1]!==''?Number(_0x5394b8[_0x1ea2e1]):0x0;break;case _0x5e1c96(0x6d8):_0x33118d=_0x5394b8[_0x1ea2e1]!==''?JSON[_0x5e1c96(0x876)](_0x5394b8[_0x1ea2e1]):[],_0x3a1b1a=_0x33118d[_0x5e1c96(0x8b3)](_0x52f258=>Number(_0x52f258));break;case _0x5e1c96(0x72d):_0x3a1b1a=_0x5394b8[_0x1ea2e1]!==''?eval(_0x5394b8[_0x1ea2e1]):null;break;case'ARRAYEVAL':_0x33118d=_0x5394b8[_0x1ea2e1]!==''?JSON[_0x5e1c96(0x876)](_0x5394b8[_0x1ea2e1]):[],_0x3a1b1a=_0x33118d['map'](_0x148e35=>eval(_0x148e35));break;case'JSON':_0x3a1b1a=_0x5394b8[_0x1ea2e1]!==''?JSON[_0x5e1c96(0x876)](_0x5394b8[_0x1ea2e1]):'';break;case _0x5e1c96(0x26c):_0x33118d=_0x5394b8[_0x1ea2e1]!==''?JSON['parse'](_0x5394b8[_0x1ea2e1]):[],_0x3a1b1a=_0x33118d[_0x5e1c96(0x8b3)](_0x4502fb=>JSON[_0x5e1c96(0x876)](_0x4502fb));break;case _0x5e1c96(0x6cf):_0x3a1b1a=_0x5394b8[_0x1ea2e1]!==''?new Function(JSON[_0x5e1c96(0x876)](_0x5394b8[_0x1ea2e1])):new Function(_0x5e1c96(0x338));break;case _0x5e1c96(0x195):_0x33118d=_0x5394b8[_0x1ea2e1]!==''?JSON[_0x5e1c96(0x876)](_0x5394b8[_0x1ea2e1]):[],_0x3a1b1a=_0x33118d[_0x5e1c96(0x8b3)](_0x238288=>new Function(JSON['parse'](_0x238288)));break;case _0x5e1c96(0x3a3):_0x3a1b1a=_0x5394b8[_0x1ea2e1]!==''?String(_0x5394b8[_0x1ea2e1]):'';break;case _0x5e1c96(0x546):_0x33118d=_0x5394b8[_0x1ea2e1]!==''?JSON[_0x5e1c96(0x876)](_0x5394b8[_0x1ea2e1]):[],_0x3a1b1a=_0x33118d[_0x5e1c96(0x8b3)](_0x6bb771=>String(_0x6bb771));break;case _0x5e1c96(0x6ca):_0x12cb75=_0x5394b8[_0x1ea2e1]!==''?JSON['parse'](_0x5394b8[_0x1ea2e1]):{},_0x10ef26[_0x16954b]={},VisuMZ['ConvertParams'](_0x10ef26[_0x16954b],_0x12cb75);continue;case _0x5e1c96(0x67d):_0x33118d=_0x5394b8[_0x1ea2e1]!==''?JSON['parse'](_0x5394b8[_0x1ea2e1]):[],_0x3a1b1a=_0x33118d[_0x5e1c96(0x8b3)](_0x48b404=>VisuMZ['ConvertParams']({},JSON[_0x5e1c96(0x876)](_0x48b404)));break;default:continue;}_0x10ef26[_0x16954b]=_0x3a1b1a;}}return _0x10ef26;},(_0x8fcb34=>{const _0x1d7d42=_0x2832c8,_0x852de6=_0x8fcb34[_0x1d7d42(0x6f3)];for(const _0x1be90b of dependencies){if(!Imported[_0x1be90b]){alert(_0x1d7d42(0x711)[_0x1d7d42(0x668)](_0x852de6,_0x1be90b)),SceneManager[_0x1d7d42(0x8cc)]();break;}}const _0x51ec3c=_0x8fcb34[_0x1d7d42(0x71b)];if(_0x51ec3c[_0x1d7d42(0x6f0)](/\[Version[ ](.*?)\]/i)){const _0x2e2c65=Number(RegExp['$1']);_0x2e2c65!==VisuMZ[label]['version']&&(alert(_0x1d7d42(0x6a3)[_0x1d7d42(0x668)](_0x852de6,_0x2e2c65)),SceneManager[_0x1d7d42(0x8cc)]());}if(_0x51ec3c['match'](/\[Tier[ ](\d+)\]/i)){const _0x21455a=Number(RegExp['$1']);_0x21455a<tier?(alert(_0x1d7d42(0x47e)[_0x1d7d42(0x668)](_0x852de6,_0x21455a,tier)),SceneManager[_0x1d7d42(0x8cc)]()):tier=Math['max'](_0x21455a,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1d7d42(0x6e8)],_0x8fcb34[_0x1d7d42(0x39e)]);})(pluginData),VisuMZ['CreateActionSequenceTargets']=function(_0x45ee08){const _0x4c8e54=_0x2832c8;let _0x141ff7=[];for(const _0x1a1036 of _0x45ee08){_0x141ff7=_0x141ff7['concat'](VisuMZ[_0x4c8e54(0x54f)](_0x1a1036));}return _0x141ff7['filter'](_0x3cd505=>_0x3cd505);},VisuMZ[_0x2832c8(0x54f)]=function(_0x19233a){const _0x5713d6=_0x2832c8,_0x8567ad=BattleManager[_0x5713d6(0x3ef)]()[_0x5713d6(0x28c)](_0x1486a3=>_0x1486a3&&_0x1486a3[_0x5713d6(0x2f9)]()),_0x28547f=BattleManager[_0x5713d6(0x2c0)],_0x5953e7=BattleManager[_0x5713d6(0x8ce)],_0x22c2d8=BattleManager[_0x5713d6(0x5ca)]?BattleManager[_0x5713d6(0x5ca)][_0x5713d6(0x4d6)](0x0):_0x8567ad;_0x19233a=_0x19233a[_0x5713d6(0x188)]()['trim']();if(_0x19233a===_0x5713d6(0x56c))return[_0x28547f];else{if(_0x19233a===_0x5713d6(0x8a6))return[_0x5953e7];else{if(_0x19233a===_0x5713d6(0x373)){if(_0x5953e7){const _0x3fc1b4=_0x22c2d8[_0x5713d6(0x294)](_0x5953e7);return _0x3fc1b4>=0x0?[_0x22c2d8[_0x3fc1b4-0x1]||_0x5953e7]:[_0x5953e7];}}else{if(_0x19233a===_0x5713d6(0x422)){if(_0x5953e7){const _0x4f2d2e=_0x22c2d8[_0x5713d6(0x294)](_0x5953e7);return _0x4f2d2e>=0x0?[_0x22c2d8[_0x4f2d2e+0x1]||_0x5953e7]:[_0x5953e7];}}else{if(_0x19233a===_0x5713d6(0x2f3))return _0x22c2d8;else{if(_0x19233a==='focus')return[_0x28547f]['concat'](_0x22c2d8);else{if(_0x19233a===_0x5713d6(0x69b))return _0x8567ad[_0x5713d6(0x28c)](_0x5e88e9=>_0x5e88e9!==_0x28547f&&!_0x22c2d8[_0x5713d6(0x569)](_0x5e88e9)&&_0x5e88e9[_0x5713d6(0x19f)]());}}}}}}if(_0x28547f){if(_0x19233a===_0x5713d6(0x83c))return _0x28547f[_0x5713d6(0x739)]()[_0x5713d6(0x692)]();else{if(_0x19233a==='alive\x20friends\x20not\x20user')return _0x28547f['friendsUnit']()['aliveMembers']()['filter'](_0x1ac293=>_0x1ac293!==_0x28547f);else{if(_0x19233a===_0x5713d6(0x358))return _0x28547f[_0x5713d6(0x739)]()[_0x5713d6(0x692)]()['filter'](_0x5e29d9=>_0x5e29d9!==_0x5953e7);else{if(_0x19233a==='dead\x20friends')return _0x28547f['friendsUnit']()[_0x5713d6(0x8a4)]();else{if(_0x19233a[_0x5713d6(0x6f0)](/FRIEND INDEX (\d+)/i)){const _0x3a67a1=Number(RegExp['$1']);return[_0x28547f['friendsUnit']()[_0x5713d6(0x7b3)]()[_0x3a67a1]];}}}}}if(_0x19233a===_0x5713d6(0x6fa))return _0x28547f['opponentsUnit']()[_0x5713d6(0x692)]();else{if(_0x19233a===_0x5713d6(0x347))return _0x28547f[_0x5713d6(0x266)]()[_0x5713d6(0x692)]()['filter'](_0x4f8edb=>_0x4f8edb!==_0x5953e7);else{if(_0x19233a===_0x5713d6(0x554))return _0x28547f['opponentsUnit']()[_0x5713d6(0x8a4)]();else{if(_0x19233a['match'](/OPPONENT INDEX (\d+)/i)){const _0x4e2429=Number(RegExp['$1']);return[_0x28547f[_0x5713d6(0x266)]()[_0x5713d6(0x7b3)]()[_0x4e2429]];}}}}}if(_0x19233a==='alive\x20actors')return $gameParty['aliveMembers']();else{if(_0x19233a===_0x5713d6(0x5df))return $gameParty[_0x5713d6(0x692)]()[_0x5713d6(0x28c)](_0x482f1b=>_0x482f1b!==_0x28547f);else{if(_0x19233a===_0x5713d6(0x398))return $gameParty[_0x5713d6(0x692)]()[_0x5713d6(0x28c)](_0x816d24=>_0x816d24!==_0x5953e7);else{if(_0x19233a==='dead\x20actors')return $gameParty['deadMembers']();else{if(_0x19233a['match'](/ACTOR INDEX (\d+)/i)){const _0x45e4a8=Number(RegExp['$1']);return[$gameParty[_0x5713d6(0x7b3)]()[_0x45e4a8]];}else{if(_0x19233a[_0x5713d6(0x6f0)](/ACTOR ID (\d+)/i)){const _0x1fdcaf=Number(RegExp['$1']);return[$gameActors[_0x5713d6(0x42b)](_0x1fdcaf)];}}}}}}if(_0x19233a==='alive\x20enemies')return $gameTroop[_0x5713d6(0x692)]();else{if(_0x19233a==='alive\x20enemies\x20not\x20user')return $gameTroop['aliveMembers']()[_0x5713d6(0x28c)](_0x33037a=>_0x33037a!==_0x28547f);else{if(_0x19233a==='alive\x20enemies\x20not\x20target')return $gameTroop[_0x5713d6(0x692)]()[_0x5713d6(0x28c)](_0x136363=>_0x136363!==_0x5953e7);else{if(_0x19233a===_0x5713d6(0x765))return $gameTroop['deadMembers']();else{if(_0x19233a[_0x5713d6(0x6f0)](/ENEMY INDEX (\d+)/i)){const _0x4ace2c=Number(RegExp['$1']);return[$gameTroop[_0x5713d6(0x7b3)]()[_0x4ace2c]];}else{if(_0x19233a[_0x5713d6(0x6f0)](/ENEMY ID (\d+)/i)){const _0x59509f=Number(RegExp['$1']);return $gameTroop[_0x5713d6(0x692)]()[_0x5713d6(0x28c)](_0x286a51=>_0x286a51[_0x5713d6(0x4ea)]()===_0x59509f);}}}}}}if(_0x19233a===_0x5713d6(0x219))return _0x8567ad[_0x5713d6(0x28c)](_0xdf387=>_0xdf387['isAlive']());else{if(_0x19233a==='alive\x20battlers\x20not\x20user')return _0x8567ad[_0x5713d6(0x28c)](_0x46e3ec=>_0x46e3ec[_0x5713d6(0x6be)]()&&_0x46e3ec!==_0x28547f);else{if(_0x19233a===_0x5713d6(0x35c))return _0x8567ad[_0x5713d6(0x28c)](_0x2aa451=>_0x2aa451[_0x5713d6(0x6be)]()&&_0x2aa451!==_0x5953e7);else{if(_0x19233a===_0x5713d6(0x223))return _0x8567ad[_0x5713d6(0x28c)](_0x138907=>_0x138907[_0x5713d6(0x7d5)]());}}}return[];},PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],'ActSeq_Set_SetupAction',_0x4c043b=>{const _0x25cac5=_0x2832c8;if(!SceneManager[_0x25cac5(0x230)]())return;VisuMZ['ConvertParams'](_0x4c043b,_0x4c043b);const _0x43937f=$gameTemp['getLastPluginCommandInterpreter'](),_0x5d6d16=BattleManager['_action'],_0x2173f6=BattleManager['_subject'],_0x213db1=BattleManager[_0x25cac5(0x5ca)]?BattleManager['_allTargets'][_0x25cac5(0x4d6)](0x0):[],_0x4ad607=BattleManager[_0x25cac5(0x866)];if(!_0x43937f||!_0x5d6d16||!_0x2173f6)return;if(!_0x5d6d16[_0x25cac5(0x703)]())return;if(_0x4c043b[_0x25cac5(0x6f7)])_0x4ad607[_0x25cac5(0x4e9)](_0x2173f6,_0x5d6d16[_0x25cac5(0x703)]());_0x4c043b[_0x25cac5(0x839)]&&_0x4ad607['push']('applyImmortal',_0x2173f6,_0x213db1,!![]);if(_0x4c043b['ActionStart'])_0x4ad607['push'](_0x25cac5(0x612),_0x2173f6,_0x5d6d16);if(_0x4c043b[_0x25cac5(0x3dc)])_0x4ad607[_0x25cac5(0x7d2)]('waitForMovement');if(_0x4c043b[_0x25cac5(0x596)])_0x4ad607[_0x25cac5(0x7d2)](_0x25cac5(0x833),_0x2173f6,_0x5d6d16);if(_0x4c043b[_0x25cac5(0x2b9)])_0x4ad607['push'](_0x25cac5(0x23d));_0x43937f[_0x25cac5(0x363)](_0x25cac5(0x3d0));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x4af),_0x469a5c=>{const _0x37da19=_0x2832c8;if(!SceneManager[_0x37da19(0x230)]())return;VisuMZ['ConvertParams'](_0x469a5c,_0x469a5c);const _0x1fac77=$gameTemp[_0x37da19(0x642)](),_0x3234de=BattleManager['_action'],_0x33d0a6=BattleManager[_0x37da19(0x2c0)],_0x31276f=BattleManager['_allTargets']?BattleManager[_0x37da19(0x5ca)]['slice'](0x0):[],_0x2c0b5d=BattleManager['_logWindow'],_0x113a7f=_0x469a5c[_0x37da19(0x4ff)]??![];if(!_0x1fac77||!_0x3234de||!_0x33d0a6)return;if(!_0x3234de['item']())return;let _0x325c6e=_0x113a7f?_0x2c0b5d['getDualWieldTimes'](_0x33d0a6):0x1;for(let _0x537e16=0x0;_0x537e16<_0x325c6e;_0x537e16++){_0x113a7f&&_0x33d0a6[_0x37da19(0x44c)]()&&_0x2c0b5d['push'](_0x37da19(0x8c0),_0x33d0a6,_0x537e16);if(_0x469a5c[_0x37da19(0x394)])_0x2c0b5d[_0x37da19(0x7d2)](_0x37da19(0x1c5),_0x33d0a6,_0x3234de);if(_0x469a5c[_0x37da19(0x4ce)]>0x0)_0x2c0b5d[_0x37da19(0x7d2)]('waitCount',_0x469a5c[_0x37da19(0x4ce)]);if(_0x469a5c[_0x37da19(0x22d)])_0x2c0b5d[_0x37da19(0x7d2)](_0x37da19(0x293),_0x33d0a6,_0x31276f,_0x3234de[_0x37da19(0x703)]()[_0x37da19(0x38d)]);if(_0x469a5c[_0x37da19(0x2b9)])_0x2c0b5d[_0x37da19(0x7d2)](_0x37da19(0x23d));for(const _0x10ab72 of _0x31276f){if(!_0x10ab72)continue;if(_0x469a5c[_0x37da19(0x1ff)])_0x2c0b5d[_0x37da19(0x7d2)](_0x37da19(0x652),_0x33d0a6,_0x10ab72);}}_0x113a7f&&_0x33d0a6[_0x37da19(0x44c)]()&&_0x2c0b5d[_0x37da19(0x7d2)](_0x37da19(0x379),_0x33d0a6);if(_0x469a5c[_0x37da19(0x839)])_0x2c0b5d[_0x37da19(0x7d2)](_0x37da19(0x6c9),_0x33d0a6,_0x31276f,![]);_0x1fac77['setWaitMode']('battlelog');}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x365),_0x4073b0=>{const _0x1daf87=_0x2832c8;if(!SceneManager[_0x1daf87(0x230)]())return;VisuMZ[_0x1daf87(0x1ca)](_0x4073b0,_0x4073b0);const _0x5ec4d4=$gameTemp[_0x1daf87(0x642)](),_0xd01ca1=BattleManager[_0x1daf87(0x555)],_0x513484=BattleManager[_0x1daf87(0x2c0)],_0xe78972=BattleManager['_allTargets']?BattleManager['_allTargets'][_0x1daf87(0x4d6)](0x0):[],_0x49f0ce=BattleManager[_0x1daf87(0x866)],_0x199931=_0x4073b0[_0x1daf87(0x4ff)]??![];if(!_0x5ec4d4||!_0xd01ca1||!_0x513484)return;if(!_0xd01ca1[_0x1daf87(0x703)]())return;let _0x3c627c=_0x199931?_0x49f0ce['getDualWieldTimes'](_0x513484):0x1;for(let _0x130ed6=0x0;_0x130ed6<_0x3c627c;_0x130ed6++){for(const _0x1faf9d of _0xe78972){if(!_0x1faf9d)continue;_0x199931&&_0x513484[_0x1daf87(0x44c)]()&&_0x49f0ce[_0x1daf87(0x7d2)](_0x1daf87(0x8c0),_0x513484,_0x130ed6);if(_0x4073b0['PerformAction'])_0x49f0ce[_0x1daf87(0x7d2)](_0x1daf87(0x1c5),_0x513484,_0xd01ca1);if(_0x4073b0[_0x1daf87(0x5ff)]>0x0)_0x49f0ce[_0x1daf87(0x7d2)](_0x1daf87(0x6a6),_0x4073b0[_0x1daf87(0x5ff)]);if(_0x4073b0[_0x1daf87(0x22d)])_0x49f0ce[_0x1daf87(0x7d2)](_0x1daf87(0x293),_0x513484,[_0x1faf9d],_0xd01ca1[_0x1daf87(0x703)]()['animationId']);if(_0x4073b0[_0x1daf87(0x1fb)]>0x0)_0x49f0ce[_0x1daf87(0x7d2)](_0x1daf87(0x6a6),_0x4073b0[_0x1daf87(0x1fb)]);if(_0x4073b0['ActionEffect'])_0x49f0ce[_0x1daf87(0x7d2)]('actionEffect',_0x513484,_0x1faf9d);}}_0x199931&&_0x513484['isActor']()&&_0x49f0ce[_0x1daf87(0x7d2)](_0x1daf87(0x379),_0x513484);if(_0x4073b0[_0x1daf87(0x839)])_0x49f0ce[_0x1daf87(0x7d2)](_0x1daf87(0x6c9),_0x513484,_0xe78972,![]);_0x5ec4d4[_0x1daf87(0x363)]('battlelog');}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x705),_0x40bb4c=>{const _0xca93aa=_0x2832c8;if(!SceneManager[_0xca93aa(0x230)]())return;VisuMZ[_0xca93aa(0x1ca)](_0x40bb4c,_0x40bb4c);const _0x20a47d=$gameTemp[_0xca93aa(0x642)](),_0x35f5af=BattleManager['_action'],_0x3f681c=BattleManager[_0xca93aa(0x2c0)],_0x426fba=BattleManager['_allTargets']?BattleManager[_0xca93aa(0x5ca)]['slice'](0x0):[],_0x9e7592=BattleManager['_logWindow'];if(!_0x20a47d||!_0x35f5af||!_0x3f681c)return;if(!_0x35f5af['item']())return;if(_0x40bb4c[_0xca93aa(0x839)])_0x9e7592[_0xca93aa(0x7d2)]('applyImmortal',_0x3f681c,_0x426fba,![]);if(_0x40bb4c['WaitForNewLine'])_0x9e7592['push'](_0xca93aa(0x79d));if(_0x40bb4c[_0xca93aa(0x2f6)])_0x9e7592[_0xca93aa(0x7d2)](_0xca93aa(0x304));if(_0x40bb4c[_0xca93aa(0x695)])_0x9e7592[_0xca93aa(0x7d2)](_0xca93aa(0x890));if(_0x40bb4c[_0xca93aa(0x61c)])_0x9e7592['push'](_0xca93aa(0x3c5),_0x3f681c);if(_0x40bb4c[_0xca93aa(0x3dc)])_0x9e7592[_0xca93aa(0x7d2)]('waitForMovement');_0x20a47d['setWaitMode']('battlelog');}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_ChangeAngle',_0x2dcc99=>{const _0x79a5d3=_0x2832c8;if(!SceneManager[_0x79a5d3(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x79a5d3(0x1ca)](_0x2dcc99,_0x2dcc99);const _0x461a04=$gameTemp[_0x79a5d3(0x642)](),_0x1403f3=_0x2dcc99[_0x79a5d3(0x36a)];if(!_0x461a04)return;$gameScreen[_0x79a5d3(0x1e0)](_0x2dcc99[_0x79a5d3(0x7ae)],_0x2dcc99[_0x79a5d3(0x55f)],_0x2dcc99['EasingType']);if(_0x1403f3)_0x461a04[_0x79a5d3(0x363)](_0x79a5d3(0x2a7));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x199),_0xe4f6d3=>{const _0x425c15=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x425c15(0x776)])return;VisuMZ['ConvertParams'](_0xe4f6d3,_0xe4f6d3);const _0x40908e=$gameTemp['getLastPluginCommandInterpreter'](),_0x45c544=_0xe4f6d3[_0x425c15(0x36a)];if(!_0x40908e)return;$gameScreen[_0x425c15(0x1e0)](0x0,_0xe4f6d3[_0x425c15(0x55f)],_0xe4f6d3[_0x425c15(0x7b8)]);if(_0x45c544)_0x40908e[_0x425c15(0x363)](_0x425c15(0x2a7));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x8e5),_0x584474=>{const _0x2a0085=_0x2832c8;if(!SceneManager[_0x2a0085(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x585bb6=$gameTemp[_0x2a0085(0x642)]();if(!_0x585bb6)return;_0x585bb6['setWaitMode'](_0x2a0085(0x2a7));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],'ActSeq_Animation_ActionAnimation',_0x282d8d=>{const _0x45bbe9=_0x2832c8;if(!SceneManager[_0x45bbe9(0x230)]())return;VisuMZ[_0x45bbe9(0x1ca)](_0x282d8d,_0x282d8d);const _0x3be8c7=$gameTemp[_0x45bbe9(0x642)](),_0xabe20b=BattleManager[_0x45bbe9(0x555)],_0x2fe7ba=BattleManager[_0x45bbe9(0x2c0)],_0x509a24=VisuMZ[_0x45bbe9(0x84c)](_0x282d8d['Targets']),_0x58b1d0=_0x282d8d[_0x45bbe9(0x746)],_0x3186d5=BattleManager[_0x45bbe9(0x866)];if(!_0x3be8c7||!_0xabe20b||!_0x2fe7ba)return;if(!_0xabe20b[_0x45bbe9(0x703)]())return;let _0x8c5238=_0xabe20b[_0x45bbe9(0x703)]()['animationId'];if(_0x8c5238<0x0)_0x8c5238=_0x2fe7ba[_0x45bbe9(0x6ad)]();$gameTemp[_0x45bbe9(0x717)](_0x509a24,_0x8c5238,_0x58b1d0),_0x282d8d[_0x45bbe9(0x2b9)]&&_0x3be8c7[_0x45bbe9(0x363)](_0x45bbe9(0x792));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x426),_0x59fa3b=>{const _0x10cecb=_0x2832c8;if(!SceneManager[_0x10cecb(0x230)]())return;VisuMZ[_0x10cecb(0x1ca)](_0x59fa3b,_0x59fa3b);const _0x4b2def=$gameTemp['getLastPluginCommandInterpreter'](),_0xc582b4=BattleManager[_0x10cecb(0x2c0)],_0x3358f9=VisuMZ[_0x10cecb(0x84c)](_0x59fa3b[_0x10cecb(0x818)]),_0x123a60=_0x59fa3b[_0x10cecb(0x746)],_0x1c4970=BattleManager[_0x10cecb(0x866)];if(!_0x4b2def||!_0xc582b4)return;const _0x483934=_0xc582b4[_0x10cecb(0x6ad)]();$gameTemp[_0x10cecb(0x717)](_0x3358f9,_0x483934,_0x123a60),_0x59fa3b[_0x10cecb(0x2b9)]&&_0x4b2def[_0x10cecb(0x363)]('battleAnimation');}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x7c7),_0x22ef46=>{const _0x2a6b9a=_0x2832c8;if(!SceneManager[_0x2a6b9a(0x230)]())return;VisuMZ[_0x2a6b9a(0x1ca)](_0x22ef46,_0x22ef46);const _0x3f0a66=_0x17d70b[_0x2a6b9a(0x249)](_0x22ef46['Slot']);if(_0x3f0a66<=0x0)return;const _0x58bfb0=$gameTemp[_0x2a6b9a(0x642)](),_0x17d70b=BattleManager[_0x2a6b9a(0x2c0)],_0x498663=VisuMZ[_0x2a6b9a(0x84c)](_0x22ef46[_0x2a6b9a(0x818)]),_0xdd8450=_0x22ef46[_0x2a6b9a(0x746)],_0xaeb19f=BattleManager['_logWindow'];if(!_0x58bfb0||!_0x17d70b)return;$gameTemp[_0x2a6b9a(0x717)](_0x498663,_0x3f0a66,_0xdd8450),_0x22ef46[_0x2a6b9a(0x2b9)]&&_0x58bfb0[_0x2a6b9a(0x363)](_0x2a6b9a(0x792));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x516),_0x3f5e40=>{const _0x1a2a10=_0x2832c8;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x1a2a10(0x1ca)](_0x3f5e40,_0x3f5e40);const _0x397f59=$gameTemp[_0x1a2a10(0x642)](),_0x330056=BattleManager[_0x1a2a10(0x555)],_0x5a49bd=_0x3f5e40['Mirror'],_0x32acce=VisuMZ['CreateActionSequenceTargets'](_0x3f5e40[_0x1a2a10(0x818)]);if(!_0x397f59||!_0x330056)return;if(!_0x330056['item']())return;for(const _0x2ffb86 of _0x32acce){if(!_0x2ffb86)continue;_0x2ffb86[_0x1a2a10(0x833)](_0x330056,_0x5a49bd);}if(_0x3f5e40[_0x1a2a10(0x2b9)])_0x397f59[_0x1a2a10(0x363)](_0x1a2a10(0x792));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x70a),_0x43847b=>{const _0x47b585=_0x2832c8;VisuMZ[_0x47b585(0x1ca)](_0x43847b,_0x43847b);const _0x534dae=$gameTemp[_0x47b585(0x642)](),_0x214b82=VisuMZ[_0x47b585(0x84c)](_0x43847b['Targets']),_0x42b5b3=_0x43847b[_0x47b585(0x1a4)];if(!_0x42b5b3)return;for(const _0x26361a of _0x214b82){if(!_0x26361a)continue;if(!_0x26361a[_0x47b585(0x44c)]())continue;_0x26361a[_0x47b585(0x7b2)](_0x42b5b3);}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x464),_0x5c168b=>{const _0x9b80ad=_0x2832c8;if(!SceneManager[_0x9b80ad(0x230)]())return;VisuMZ[_0x9b80ad(0x1ca)](_0x5c168b,_0x5c168b);const _0x2d4777=$gameTemp[_0x9b80ad(0x642)](),_0x8bffca=VisuMZ[_0x9b80ad(0x84c)](_0x5c168b[_0x9b80ad(0x818)]),_0x2caedb=_0x5c168b['AnimationID'],_0x4e4581=_0x5c168b[_0x9b80ad(0x746)];if(!_0x2d4777)return;$gameTemp['requestAnimation'](_0x8bffca,_0x2caedb,_0x4e4581);if(_0x5c168b[_0x9b80ad(0x2b9)])_0x2d4777[_0x9b80ad(0x363)]('battleAnimation');}),PluginManager['registerCommand'](pluginData['name'],_0x2832c8(0x66e),_0x16b37b=>{const _0x39aabd=_0x2832c8;if(!SceneManager['isSceneBattle']())return;const _0x55028c=$gameTemp[_0x39aabd(0x642)]();if(!_0x55028c)return;_0x55028c[_0x39aabd(0x363)](_0x39aabd(0x792));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_BattleLog_AddText',_0x5929c9=>{const _0x339eba=_0x2832c8;if(!SceneManager[_0x339eba(0x230)]())return;VisuMZ['ConvertParams'](_0x5929c9,_0x5929c9);const _0x530664=BattleManager[_0x339eba(0x866)],_0x19bac8=_0x5929c9['CopyCombatLog']&&Imported[_0x339eba(0x573)];_0x530664['addText'](_0x5929c9[_0x339eba(0x3ec)]),_0x19bac8&&Imported[_0x339eba(0x573)]&&$gameSystem['addTextToCombatLog'](_0x5929c9[_0x339eba(0x3ec)]||'',_0x5929c9['CombatLogIcon']||0x0);}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x8bd),_0x1024ac=>{const _0x23055b=_0x2832c8;if(!SceneManager[_0x23055b(0x230)]())return;const _0x56e620=BattleManager[_0x23055b(0x866)];_0x56e620['clear']();}),PluginManager['registerCommand'](pluginData['name'],_0x2832c8(0x315),_0x5da650=>{const _0x24737f=_0x2832c8;if(!SceneManager['isSceneBattle']())return;const _0x44e8e1=$gameTemp[_0x24737f(0x642)](),_0x407587=BattleManager['_action'],_0x4c8f1d=BattleManager[_0x24737f(0x2c0)],_0x19cd4d=BattleManager['_logWindow'];if(!_0x44e8e1||!_0x407587||!_0x4c8f1d)return;if(!_0x407587['item']())return;_0x19cd4d[_0x24737f(0x4e9)](_0x4c8f1d,_0x407587['item']()),_0x44e8e1['setWaitMode']('battlelog');}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_BattleLog_PopBaseLine',_0x4db8f5=>{const _0x2fada7=_0x2832c8;if(!SceneManager[_0x2fada7(0x230)]())return;const _0x197a64=BattleManager[_0x2fada7(0x866)];_0x197a64[_0x2fada7(0x51f)]();}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_BattleLog_PushBaseLine',_0xab4466=>{const _0x2d5824=_0x2832c8;if(!SceneManager[_0x2d5824(0x230)]())return;const _0x2b8440=BattleManager[_0x2d5824(0x866)];_0x2b8440[_0x2d5824(0x617)]();}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x78f),_0x6000ea=>{const _0x4f1b6c=_0x2832c8;if(!SceneManager['isSceneBattle']())return;const _0x5bffe5=BattleManager[_0x4f1b6c(0x866)];_0x5bffe5[_0x4f1b6c(0x7d0)]();}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x5d9),_0x570e8c=>{const _0x1b6a96=_0x2832c8;if(!SceneManager[_0x1b6a96(0x230)]())return;VisuMZ['ConvertParams'](_0x570e8c,_0x570e8c),SceneManager[_0x1b6a96(0x37d)][_0x1b6a96(0x66b)](_0x570e8c[_0x1b6a96(0x808)]);}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x18b),_0x161b2d=>{const _0x3b7da0=_0x2832c8;if(!SceneManager[_0x3b7da0(0x230)]())return;const _0x3aadaf=$gameTemp[_0x3b7da0(0x642)]();_0x3aadaf['setWaitMode'](_0x3b7da0(0x3d0));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_BattleLog_WaitForNewLine',_0x400e99=>{const _0x2a4495=_0x2832c8;if(!SceneManager[_0x2a4495(0x230)]())return;const _0x5717c3=$gameTemp[_0x2a4495(0x642)](),_0x50ba60=BattleManager['_logWindow'];_0x50ba60['waitForNewLine'](),_0x5717c3[_0x2a4495(0x363)]('battlelog');}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Camera_Clamp',_0x56b581=>{const _0xaa7418=_0x2832c8;if(!SceneManager[_0xaa7418(0x230)]())return;if(!Imported[_0xaa7418(0x776)])return;VisuMZ[_0xaa7418(0x1ca)](_0x56b581,_0x56b581);const _0x28d08d=$gameScreen[_0xaa7418(0x7f0)]();_0x28d08d[_0xaa7418(0x1e9)]=_0x56b581[_0xaa7418(0x698)];}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Camera_FocusPoint',_0x38b7c1=>{const _0xc4ea91=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0xc4ea91(0x1ca)](_0x38b7c1,_0x38b7c1);const _0x33d45a=$gameTemp['getLastPluginCommandInterpreter'](),_0x43fdd8=_0x38b7c1[_0xc4ea91(0x252)];$gameScreen[_0xc4ea91(0x778)](_0x38b7c1[_0xc4ea91(0x646)],_0x38b7c1[_0xc4ea91(0x65c)],_0x38b7c1['Duration'],_0x38b7c1[_0xc4ea91(0x7b8)]);if(_0x43fdd8)_0x33d45a[_0xc4ea91(0x363)](_0xc4ea91(0x8d9));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x721),_0x1e8c3b=>{const _0x406606=_0x2832c8;if(!SceneManager[_0x406606(0x230)]())return;if(!Imported[_0x406606(0x776)])return;VisuMZ[_0x406606(0x1ca)](_0x1e8c3b,_0x1e8c3b);const _0x2d5e3b=$gameTemp[_0x406606(0x642)](),_0x23a50f=VisuMZ['CreateActionSequenceTargets'](_0x1e8c3b[_0x406606(0x818)]),_0x4650ca=_0x1e8c3b[_0x406606(0x252)];$gameScreen['setBattleCameraTargets'](_0x23a50f,_0x1e8c3b['Duration'],_0x1e8c3b[_0x406606(0x7b8)]);if(_0x4650ca)_0x2d5e3b['setWaitMode'](_0x406606(0x8d9));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Camera_Offset',_0x51f005=>{const _0xfe822d=_0x2832c8;if(!SceneManager[_0xfe822d(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0xfe822d(0x1ca)](_0x51f005,_0x51f005);const _0x54d270=$gameTemp['getLastPluginCommandInterpreter'](),_0x4d6605=_0x51f005[_0xfe822d(0x252)];$gameScreen[_0xfe822d(0x4e8)](_0x51f005[_0xfe822d(0x2b3)],_0x51f005[_0xfe822d(0x73e)],_0x51f005[_0xfe822d(0x55f)],_0x51f005[_0xfe822d(0x7b8)]);if(_0x4d6605)_0x54d270[_0xfe822d(0x363)](_0xfe822d(0x8d9));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x3f7),_0x4edd79=>{const _0x12034b=_0x2832c8;if(!SceneManager[_0x12034b(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x12034b(0x1ca)](_0x4edd79,_0x4edd79);const _0x21f051=$gameTemp[_0x12034b(0x642)](),_0x37b7ca=_0x4edd79[_0x12034b(0x8d7)],_0x3ce095=_0x4edd79[_0x12034b(0x412)],_0x2eed7e=_0x4edd79[_0x12034b(0x252)];if(_0x37b7ca){const _0x20db11=Math['round'](Graphics[_0x12034b(0x797)]/0x2),_0x2be78e=Math[_0x12034b(0x46d)](Graphics['height']/0x2);$gameScreen[_0x12034b(0x778)](_0x20db11,_0x2be78e,_0x4edd79[_0x12034b(0x55f)],_0x4edd79['EasingType']);}_0x3ce095&&$gameScreen[_0x12034b(0x4e8)](0x0,0x0,_0x4edd79[_0x12034b(0x55f)],_0x4edd79['EasingType']);if(_0x2eed7e)_0x21f051[_0x12034b(0x363)](_0x12034b(0x8d9));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x1e5),_0xd97059=>{const _0x242226=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x242226(0x776)])return;const _0x462a97=$gameTemp[_0x242226(0x642)]();if(!_0x462a97)return;_0x462a97[_0x242226(0x363)](_0x242226(0x8d9));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x403),_0x13f84d=>{const _0x325b0c=_0x2832c8;if(!SceneManager[_0x325b0c(0x230)]())return;if(!Imported[_0x325b0c(0x391)])return;VisuMZ[_0x325b0c(0x1ca)](_0x13f84d,_0x13f84d);const _0xcbb800=VisuMZ[_0x325b0c(0x84c)](_0x13f84d[_0x325b0c(0x818)]),_0x18f1aa=_0x13f84d['MotionAni'][_0x325b0c(0x188)]()[_0x325b0c(0x757)]();for(const _0x11cfb3 of _0xcbb800){if(!_0x11cfb3)continue;_0x11cfb3['requestDragonbonesAnimation'](_0x18f1aa);}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_DB_DragonbonesTimeScale',_0x4fd561=>{const _0x30c46d=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_2_DragonbonesUnion'])return;VisuMZ[_0x30c46d(0x1ca)](_0x4fd561,_0x4fd561);const _0x5857cf=VisuMZ[_0x30c46d(0x84c)](_0x4fd561[_0x30c46d(0x818)]),_0xcad6cf=_0x4fd561[_0x30c46d(0x584)];for(const _0x2be135 of _0x5857cf){if(!_0x2be135)continue;_0x2be135[_0x30c46d(0x48b)]()[_0x30c46d(0x640)]=_0xcad6cf;}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Element_AddElements',_0x5e46f8=>{const _0x4a056b=_0x2832c8;if(!SceneManager[_0x4a056b(0x230)]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;VisuMZ[_0x4a056b(0x1ca)](_0x5e46f8,_0x5e46f8);const _0x2a63d2=BattleManager['_action'],_0x214c9b=_0x5e46f8[_0x4a056b(0x200)];if(!_0x2a63d2)return;_0x2a63d2[_0x4a056b(0x767)]=_0x214c9b;}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x87f),_0x5d3fc9=>{const _0x5b737d=_0x2832c8;if(!SceneManager[_0x5b737d(0x230)]())return;if(!Imported[_0x5b737d(0x404)])return;const _0x51c991=BattleManager[_0x5b737d(0x555)];if(!_0x51c991)return;_0x51c991[_0x5b737d(0x4d1)]();}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x289),_0x4c844e=>{const _0x43c979=_0x2832c8;if(!SceneManager[_0x43c979(0x230)]())return;if(!Imported[_0x43c979(0x404)])return;VisuMZ['ConvertParams'](_0x4c844e,_0x4c844e);const _0x32a121=BattleManager[_0x43c979(0x555)],_0x4e51e7=_0x4c844e[_0x43c979(0x200)];if(!_0x32a121)return;_0x32a121[_0x43c979(0x4bb)]=_0x4e51e7;}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],'ActSeq_Element_NullElements',_0x3f348c=>{const _0x15f6d2=_0x2832c8;if(!SceneManager[_0x15f6d2(0x230)]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;const _0x8bd5a=BattleManager[_0x15f6d2(0x555)];if(!_0x8bd5a)return;_0x8bd5a[_0x15f6d2(0x7f3)]=!![];}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Horror_Clear',_0x5e38e6=>{const _0x19573c=_0x2832c8;if(!Imported[_0x19573c(0x73d)])return;if(!SceneManager[_0x19573c(0x230)]())return;VisuMZ[_0x19573c(0x1ca)](_0x5e38e6,_0x5e38e6);const _0x5ee541=VisuMZ[_0x19573c(0x84c)](_0x5e38e6[_0x19573c(0x818)]);for(const _0x3f006c of _0x5ee541){if(!_0x3f006c)continue;_0x3f006c[_0x19573c(0x5b4)](_0x19573c(0x8f1)),_0x3f006c['removeHorrorEffect']('glitch'),_0x3f006c[_0x19573c(0x5b4)]('tv'),_0x3f006c[_0x19573c(0x7db)]();}$gamePlayer[_0x19573c(0x7d0)]();}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x3e5),_0x3e44bc=>{const _0x4539ee=_0x2832c8;if(!Imported[_0x4539ee(0x73d)])return;if(!SceneManager[_0x4539ee(0x230)]())return;VisuMZ['ConvertParams'](_0x3e44bc,_0x3e44bc);const _0x4ed017=VisuMZ[_0x4539ee(0x84c)](_0x3e44bc['Targets']),_0xe3e214='glitch';_0x3e44bc[_0x4539ee(0x5ee)]=Math[_0x4539ee(0x76f)](_0x3e44bc[_0x4539ee(0x471)]/0x2),_0x3e44bc[_0x4539ee(0x4be)]=_0x3e44bc['slices'],_0x3e44bc[_0x4539ee(0x34a)]=!![];for(const _0x47fccf of _0x4ed017){if(!_0x47fccf)continue;_0x47fccf[_0x4539ee(0x811)](_0xe3e214,_0x3e44bc);}$gamePlayer[_0x4539ee(0x7d0)]();}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x786),_0x420174=>{const _0x10d60a=_0x2832c8;if(!Imported[_0x10d60a(0x73d)])return;if(!SceneManager[_0x10d60a(0x230)]())return;VisuMZ['ConvertParams'](_0x420174,_0x420174);const _0x268549=VisuMZ[_0x10d60a(0x84c)](_0x420174[_0x10d60a(0x818)]);for(const _0x3e8e1f of _0x268549){if(!_0x3e8e1f)continue;_0x3e8e1f[_0x10d60a(0x5b4)]('glitch');}$gamePlayer[_0x10d60a(0x7d0)]();}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x2de),_0xc9d915=>{const _0x4bb339=_0x2832c8;if(!Imported[_0x4bb339(0x73d)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0xc9d915,_0xc9d915);const _0x570397=VisuMZ[_0x4bb339(0x84c)](_0xc9d915[_0x4bb339(0x818)]),_0x2711fe='noise';for(const _0x39d1f2 of _0x570397){if(!_0x39d1f2)continue;_0x39d1f2['setHorrorEffectSettings'](_0x2711fe,_0xc9d915);}$gamePlayer[_0x4bb339(0x7d0)]();}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Horror_NoiseRemove',_0x22aac2=>{const _0x4e9401=_0x2832c8;if(!Imported[_0x4e9401(0x73d)])return;if(!SceneManager[_0x4e9401(0x230)]())return;VisuMZ[_0x4e9401(0x1ca)](_0x22aac2,_0x22aac2);const _0x161527=VisuMZ['CreateActionSequenceTargets'](_0x22aac2[_0x4e9401(0x818)]);for(const _0x240c2a of _0x161527){if(!_0x240c2a)continue;_0x240c2a[_0x4e9401(0x5b4)]('noise');}$gamePlayer[_0x4e9401(0x7d0)]();}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Horror_TVCreate',_0x1cd276=>{const _0x56c580=_0x2832c8;if(!Imported[_0x56c580(0x73d)])return;if(!SceneManager[_0x56c580(0x230)]())return;VisuMZ[_0x56c580(0x1ca)](_0x1cd276,_0x1cd276);const _0x8ee36e=VisuMZ[_0x56c580(0x84c)](_0x1cd276[_0x56c580(0x818)]),_0x2ec3ed='tv';for(const _0x20ef6e of _0x8ee36e){if(!_0x20ef6e)continue;_0x20ef6e['setHorrorEffectSettings'](_0x2ec3ed,_0x1cd276);}$gamePlayer['refresh']();}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x190),_0x365a00=>{const _0xdb9e7c=_0x2832c8;if(!Imported[_0xdb9e7c(0x73d)])return;if(!SceneManager[_0xdb9e7c(0x230)]())return;VisuMZ[_0xdb9e7c(0x1ca)](_0x365a00,_0x365a00);const _0x3e7e96=VisuMZ[_0xdb9e7c(0x84c)](_0x365a00[_0xdb9e7c(0x818)]);for(const _0x574d05 of _0x3e7e96){if(!_0x574d05)continue;_0x574d05['removeHorrorEffect']('tv');}$gamePlayer['refresh']();}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x622),_0x567aaa=>{const _0x518bd7=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x518bd7(0x36d)])return;const _0x1a9c85=SceneManager[_0x518bd7(0x37d)][_0x518bd7(0x229)];if(!_0x1a9c85)return;VisuMZ[_0x518bd7(0x1ca)](_0x567aaa,_0x567aaa);const _0x367a93=_0x567aaa[_0x518bd7(0x726)]||0x1,_0xef8dc9=_0x567aaa[_0x518bd7(0x55f)]||0x1,_0x2f096c=_0x567aaa[_0x518bd7(0x7b8)]||_0x518bd7(0x21d);_0x1a9c85['setupRgbSplitImpactFilter'](_0x367a93,_0xef8dc9,_0x2f096c);}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x3d9),_0x2d9a1f=>{const _0x8cf902=_0x2832c8;if(!SceneManager[_0x8cf902(0x230)]())return;if(!Imported[_0x8cf902(0x36d)])return;const _0x1f9c52=SceneManager[_0x8cf902(0x37d)][_0x8cf902(0x229)];if(!_0x1f9c52)return;VisuMZ[_0x8cf902(0x1ca)](_0x2d9a1f,_0x2d9a1f);const _0x33fb9d=Number(_0x2d9a1f[_0x8cf902(0x7ae)])||0x0,_0x277bd2=Number(_0x2d9a1f[_0x8cf902(0x5e6)]),_0xd31918=_0x2d9a1f[_0x8cf902(0x55f)]||0x1,_0x218b7e=_0x2d9a1f[_0x8cf902(0x7b8)]||_0x8cf902(0x21d);_0x1f9c52[_0x8cf902(0x2c5)](_0x33fb9d,_0x277bd2,_0xd31918,_0x218b7e);}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x5f5),_0xbe9a49=>{const _0x1b8b7c=_0x2832c8;if(!SceneManager[_0x1b8b7c(0x230)]())return;if(!Imported[_0x1b8b7c(0x36d)])return;const _0x28b60f=SceneManager[_0x1b8b7c(0x37d)]['_spriteset'];if(!_0x28b60f)return;VisuMZ[_0x1b8b7c(0x1ca)](_0xbe9a49,_0xbe9a49);const _0x538ae0=Number(_0xbe9a49[_0x1b8b7c(0x7ae)])||0x0,_0x25aa48=Number(_0xbe9a49[_0x1b8b7c(0x5e6)]),_0xf81c1b=_0xbe9a49[_0x1b8b7c(0x55f)]||0x1,_0x47f2b7=_0xbe9a49[_0x1b8b7c(0x7b8)]||_0x1b8b7c(0x21d),_0x3b1cf8=VisuMZ[_0x1b8b7c(0x84c)](_0xbe9a49[_0x1b8b7c(0x818)]);for(const _0x17d990 of _0x3b1cf8){if(!_0x17d990)continue;if(!_0x17d990[_0x1b8b7c(0x5b5)]())continue;_0x17d990['battler']()[_0x1b8b7c(0x2c5)](_0x538ae0,_0x25aa48,_0xf81c1b,_0x47f2b7);}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x714),_0x3499ea=>{const _0x14b862=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x14b862(0x36d)])return;VisuMZ['ConvertParams'](_0x3499ea,_0x3499ea);const _0x58f53b={'delay':_0x3499ea[_0x14b862(0x409)],'duration':_0x3499ea[_0x14b862(0x1a9)],'hue':_0x3499ea[_0x14b862(0x2ab)],'opacityStart':_0x3499ea[_0x14b862(0x6f5)],'tone':_0x3499ea[_0x14b862(0x8d6)],'visible':!![]},_0x353466=VisuMZ['CreateActionSequenceTargets'](_0x3499ea[_0x14b862(0x818)]);for(const _0x4a61ba of _0x353466){if(!_0x4a61ba)continue;_0x4a61ba[_0x14b862(0x5a3)](_0x58f53b);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Impact_MotionTrailRemove',_0x181113=>{const _0x527875=_0x2832c8;if(!SceneManager[_0x527875(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ[_0x527875(0x1ca)](_0x181113,_0x181113);const _0x3c6e80=VisuMZ[_0x527875(0x84c)](_0x181113[_0x527875(0x818)]);for(const _0x1cc643 of _0x3c6e80){if(!_0x1cc643)continue;_0x1cc643['clearBattlerMotionTrailData']();}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Impact_ShockwavePoint',_0x5ad76f=>{const _0x149ef0=_0x2832c8;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x2172d6=SceneManager[_0x149ef0(0x37d)][_0x149ef0(0x229)];if(!_0x2172d6)return;VisuMZ[_0x149ef0(0x1ca)](_0x5ad76f,_0x5ad76f);const _0x195c78=_0x5ad76f['X']||0x0,_0x2e3bb7=_0x5ad76f['Y']||0x0,_0x5abca6=_0x5ad76f['Amp']||0x0,_0x25b85a=_0x5ad76f[_0x149ef0(0x53f)]||0x0,_0x4a7902=_0x5ad76f[_0x149ef0(0x55f)]||0x1;_0x2172d6['setupShockwaveImpactFilter'](_0x195c78,_0x2e3bb7,_0x5abca6,_0x25b85a,_0x4a7902);}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Impact_ShockwaveEachTargets',_0x2ed509=>{const _0x5203f2=_0x2832c8;if(!SceneManager[_0x5203f2(0x230)]())return;if(!Imported[_0x5203f2(0x36d)])return;const _0x1e446d=SceneManager[_0x5203f2(0x37d)][_0x5203f2(0x229)];if(!_0x1e446d)return;VisuMZ[_0x5203f2(0x1ca)](_0x2ed509,_0x2ed509);const _0x5663a6=VisuMZ['CreateActionSequenceTargets'](_0x2ed509['Targets']),_0x4f44a2=_0x2ed509[_0x5203f2(0x57c)],_0x4d200d=_0x2ed509[_0x5203f2(0x2b3)]||0x0,_0x1504ac=_0x2ed509['OffsetY']||0x0,_0x2ee1df=_0x2ed509[_0x5203f2(0x844)]||0x0,_0x388bb2=_0x2ed509[_0x5203f2(0x53f)]||0x0,_0x1d05a3=_0x2ed509['Duration']||0x1;for(const _0x5c7d5a of _0x5663a6){if(!_0x5c7d5a)continue;if(!_0x5c7d5a['battler']())continue;const _0x4c6e3d=_0x5c7d5a[_0x5203f2(0x5b5)]();let _0x422645=_0x4c6e3d[_0x5203f2(0x4b3)],_0x28152f=_0x4c6e3d[_0x5203f2(0x8d3)];_0x422645+=(Graphics['width']-Graphics['boxWidth'])/0x2,_0x28152f+=(Graphics[_0x5203f2(0x28d)]-Graphics[_0x5203f2(0x756)])/0x2;if(_0x4f44a2['match'](/front/i))_0x422645+=(_0x5c7d5a[_0x5203f2(0x2a2)]()?0x1:-0x1)*_0x4c6e3d[_0x5203f2(0x1be)]()/0x2;else _0x4f44a2['match'](/back/i)&&(_0x422645+=(_0x5c7d5a['isEnemy']()?-0x1:0x1)*_0x4c6e3d[_0x5203f2(0x1be)]()/0x2);if(_0x4f44a2[_0x5203f2(0x6f0)](/head/i))_0x28152f-=_0x4c6e3d[_0x5203f2(0x2d2)]();else _0x4f44a2['match'](/center/i)&&(_0x28152f-=_0x4c6e3d[_0x5203f2(0x2d2)]()/0x2);_0x422645+=_0x4d200d,_0x28152f+=_0x1504ac,_0x1e446d[_0x5203f2(0x3d5)](_0x422645,_0x28152f,_0x2ee1df,_0x388bb2,_0x1d05a3);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x2f0),_0x460359=>{const _0x1d0256=_0x2832c8;if(!SceneManager[_0x1d0256(0x230)]())return;if(!Imported[_0x1d0256(0x36d)])return;const _0x571036=SceneManager[_0x1d0256(0x37d)]['_spriteset'];if(!_0x571036)return;VisuMZ[_0x1d0256(0x1ca)](_0x460359,_0x460359);const _0x6e0c5=VisuMZ[_0x1d0256(0x84c)](_0x460359[_0x1d0256(0x818)]),_0x364790=_0x460359[_0x1d0256(0x57c)],_0x3ac340=_0x460359[_0x1d0256(0x2b3)]||0x0,_0x509de8=_0x460359[_0x1d0256(0x73e)]||0x0,_0x5676df=_0x460359[_0x1d0256(0x844)]||0x0,_0x2559d6=_0x460359[_0x1d0256(0x53f)]||0x0,_0x52b090=_0x460359[_0x1d0256(0x55f)]||0x1,_0x5eb028=Math[_0x1d0256(0x609)](..._0x6e0c5[_0x1d0256(0x8b3)](_0x41e560=>_0x41e560[_0x1d0256(0x5b5)]()[_0x1d0256(0x4b3)]-_0x41e560[_0x1d0256(0x5b5)]()[_0x1d0256(0x1be)]()/0x2)),_0x59c75f=Math[_0x1d0256(0x871)](..._0x6e0c5[_0x1d0256(0x8b3)](_0x23defe=>_0x23defe[_0x1d0256(0x5b5)]()[_0x1d0256(0x4b3)]+_0x23defe[_0x1d0256(0x5b5)]()[_0x1d0256(0x1be)]()/0x2)),_0x2aab7c=Math['min'](..._0x6e0c5[_0x1d0256(0x8b3)](_0x3a06d6=>_0x3a06d6[_0x1d0256(0x5b5)]()[_0x1d0256(0x8d3)]-_0x3a06d6[_0x1d0256(0x5b5)]()[_0x1d0256(0x2d2)]())),_0x48891c=Math[_0x1d0256(0x871)](..._0x6e0c5[_0x1d0256(0x8b3)](_0x24cbf0=>_0x24cbf0[_0x1d0256(0x5b5)]()['_baseY'])),_0x3f2633=_0x6e0c5[_0x1d0256(0x28c)](_0x4bc18e=>_0x4bc18e[_0x1d0256(0x44c)]())[_0x1d0256(0x720)],_0x147410=_0x6e0c5[_0x1d0256(0x28c)](_0x38822e=>_0x38822e[_0x1d0256(0x2a2)]())[_0x1d0256(0x720)];let _0x50d346=0x0,_0x1efc1b=0x0;if(_0x364790['match'](/front/i))_0x50d346=_0x3f2633>=_0x147410?_0x5eb028:_0x59c75f;else{if(_0x364790[_0x1d0256(0x6f0)](/middle/i))_0x50d346=(_0x5eb028+_0x59c75f)/0x2,melee=-0x1;else _0x364790[_0x1d0256(0x6f0)](/back/i)&&(_0x50d346=_0x3f2633>=_0x147410?_0x59c75f:_0x5eb028);}if(_0x364790['match'](/head/i))_0x1efc1b=_0x2aab7c;else{if(_0x364790[_0x1d0256(0x6f0)](/center/i))_0x1efc1b=(_0x2aab7c+_0x48891c)/0x2;else _0x364790[_0x1d0256(0x6f0)](/base/i)&&(_0x1efc1b=_0x48891c);}_0x50d346+=(Graphics[_0x1d0256(0x797)]-Graphics['boxWidth'])/0x2,_0x1efc1b+=(Graphics[_0x1d0256(0x28d)]-Graphics[_0x1d0256(0x756)])/0x2,_0x50d346+=_0x3ac340,_0x1efc1b+=_0x509de8,_0x571036[_0x1d0256(0x3d5)](_0x50d346,_0x1efc1b,_0x5676df,_0x2559d6,_0x52b090);}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x6bc),_0x596ffb=>{const _0x5f1ee3=_0x2832c8;if(!Imported[_0x5f1ee3(0x36d)])return;const _0x89afb0=SceneManager['_scene'][_0x5f1ee3(0x229)];if(!_0x89afb0)return;VisuMZ[_0x5f1ee3(0x1ca)](_0x596ffb,_0x596ffb);const _0x3001fc=_0x596ffb['X']||0x0,_0xa1b51a=_0x596ffb['Y']||0x0,_0xe7e2b4=_0x596ffb[_0x5f1ee3(0x25f)]||0x0,_0x289162=_0x596ffb[_0x5f1ee3(0x7ef)]||0x0,_0x4af2dd=_0x596ffb[_0x5f1ee3(0x55f)]||0x1,_0x240390=_0x596ffb[_0x5f1ee3(0x7b8)]||_0x5f1ee3(0x21d);_0x89afb0[_0x5f1ee3(0x875)](_0xe7e2b4,_0x3001fc,_0xa1b51a,_0x289162,_0x4af2dd,_0x240390);}),PluginManager['registerCommand'](pluginData['name'],_0x2832c8(0x217),_0x39a3b=>{const _0x3952b6=_0x2832c8;if(!Imported[_0x3952b6(0x36d)])return;const _0xac5bb7=SceneManager[_0x3952b6(0x37d)][_0x3952b6(0x229)];if(!_0xac5bb7)return;VisuMZ[_0x3952b6(0x1ca)](_0x39a3b,_0x39a3b);const _0x422897=VisuMZ[_0x3952b6(0x84c)](_0x39a3b['Targets']),_0x2fdf65=_0x39a3b[_0x3952b6(0x57c)],_0x41cb26=_0x39a3b[_0x3952b6(0x2b3)]||0x0,_0x1fba87=_0x39a3b[_0x3952b6(0x73e)]||0x0,_0x3cae13=_0x39a3b[_0x3952b6(0x25f)]||0x0,_0x34ed8c=_0x39a3b['Radius']||0x0,_0x161058=_0x39a3b[_0x3952b6(0x55f)]||0x1,_0x55ce57=_0x39a3b[_0x3952b6(0x7b8)]||'Linear',_0x3181d4=Math[_0x3952b6(0x609)](..._0x422897[_0x3952b6(0x8b3)](_0x2def1e=>_0x2def1e[_0x3952b6(0x5b5)]()[_0x3952b6(0x4b3)]-_0x2def1e[_0x3952b6(0x5b5)]()['mainSpriteWidth']()/0x2)),_0x24a17f=Math[_0x3952b6(0x871)](..._0x422897[_0x3952b6(0x8b3)](_0x43fa53=>_0x43fa53[_0x3952b6(0x5b5)]()[_0x3952b6(0x4b3)]+_0x43fa53[_0x3952b6(0x5b5)]()[_0x3952b6(0x1be)]()/0x2)),_0xb743da=Math[_0x3952b6(0x609)](..._0x422897[_0x3952b6(0x8b3)](_0x694ac5=>_0x694ac5[_0x3952b6(0x5b5)]()[_0x3952b6(0x8d3)]-_0x694ac5['battler']()[_0x3952b6(0x2d2)]())),_0x5255b8=Math[_0x3952b6(0x871)](..._0x422897[_0x3952b6(0x8b3)](_0x532e22=>_0x532e22[_0x3952b6(0x5b5)]()[_0x3952b6(0x8d3)])),_0xa6b8b0=_0x422897[_0x3952b6(0x28c)](_0x4aea3b=>_0x4aea3b[_0x3952b6(0x44c)]())[_0x3952b6(0x720)],_0x5e89b0=_0x422897['filter'](_0x2527e9=>_0x2527e9['isEnemy']())[_0x3952b6(0x720)];let _0x36d3e5=0x0,_0x23ee97=0x0;if(_0x2fdf65[_0x3952b6(0x6f0)](/front/i))_0x36d3e5=_0xa6b8b0>=_0x5e89b0?_0x3181d4:_0x24a17f;else{if(_0x2fdf65[_0x3952b6(0x6f0)](/middle/i))_0x36d3e5=(_0x3181d4+_0x24a17f)/0x2,melee=-0x1;else _0x2fdf65[_0x3952b6(0x6f0)](/back/i)&&(_0x36d3e5=_0xa6b8b0>=_0x5e89b0?_0x24a17f:_0x3181d4);}if(_0x2fdf65[_0x3952b6(0x6f0)](/head/i))_0x23ee97=_0xb743da;else{if(_0x2fdf65[_0x3952b6(0x6f0)](/center/i))_0x23ee97=(_0xb743da+_0x5255b8)/0x2;else _0x2fdf65['match'](/base/i)&&(_0x23ee97=_0x5255b8);}_0x36d3e5+=(Graphics[_0x3952b6(0x797)]-Graphics['boxWidth'])/0x2,_0x23ee97+=(Graphics[_0x3952b6(0x28d)]-Graphics[_0x3952b6(0x756)])/0x2,_0x36d3e5+=_0x41cb26,_0x23ee97+=_0x1fba87,_0xac5bb7[_0x3952b6(0x875)](_0x3cae13,_0x36d3e5,_0x23ee97,_0x34ed8c,_0x161058,_0x55ce57);}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Mechanics_ActionEffect',_0x283411=>{const _0x1743d4=_0x2832c8;if(!SceneManager[_0x1743d4(0x230)]())return;VisuMZ[_0x1743d4(0x1ca)](_0x283411,_0x283411);const _0x57e255=$gameTemp[_0x1743d4(0x642)](),_0x4e660a=BattleManager[_0x1743d4(0x555)],_0x4825b5=BattleManager[_0x1743d4(0x2c0)],_0xdd79b0=BattleManager[_0x1743d4(0x866)];if(!_0x57e255||!_0x4e660a||!_0x4825b5)return;if(!_0x4e660a[_0x1743d4(0x703)]())return;const _0x9a10e0=VisuMZ['CreateActionSequenceTargets'](_0x283411[_0x1743d4(0x818)]);for(const _0x515f24 of _0x9a10e0){if(!_0x515f24)continue;_0xdd79b0[_0x1743d4(0x7d2)]('actionEffect',_0x4825b5,_0x515f24);}_0x57e255[_0x1743d4(0x363)]('battlelog');}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x4ee),_0x18d1af=>{const _0x824acc=_0x2832c8;if(!SceneManager[_0x824acc(0x230)]())return;VisuMZ['ConvertParams'](_0x18d1af,_0x18d1af);const _0x123463=[_0x824acc(0x5c2),'MAXMP','ATK',_0x824acc(0x7a5),_0x824acc(0x772),_0x824acc(0x330),_0x824acc(0x6f1),_0x824acc(0x34e)],_0xd8b8b2=_0x18d1af['Buffs'],_0x5f2241=_0x18d1af[_0x824acc(0x7f9)],_0x126d24=_0x18d1af[_0x824acc(0x6e5)],_0x5878b5=VisuMZ[_0x824acc(0x84c)](_0x18d1af[_0x824acc(0x818)]);for(const _0x374610 of _0x5878b5){if(!_0x374610)continue;for(const _0x33b47f of _0xd8b8b2){const _0x3bc973=_0x123463['indexOf'](_0x33b47f[_0x824acc(0x716)]()['trim']());_0x3bc973>=0x0&&_0x3bc973<=0x7&&_0x374610[_0x824acc(0x41f)](_0x3bc973,_0x126d24);}for(const _0x2bacfe of _0x5f2241){const _0x17ca63=_0x123463[_0x824acc(0x294)](_0x2bacfe[_0x824acc(0x716)]()[_0x824acc(0x757)]());_0x17ca63>=0x0&&_0x17ca63<=0x7&&_0x374610[_0x824acc(0x579)](_0x17ca63,_0x126d24);}}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x6c4),_0x168bda=>{const _0x369dc8=_0x2832c8;if(!SceneManager[_0x369dc8(0x230)]())return;VisuMZ[_0x369dc8(0x1ca)](_0x168bda,_0x168bda);const _0x137399=_0x168bda[_0x369dc8(0x522)],_0x166546=VisuMZ[_0x369dc8(0x84c)](_0x168bda[_0x369dc8(0x818)]);for(const _0x2df76a of _0x166546){if(!_0x2df76a)continue;for(const _0x360139 of _0x137399){_0x2df76a[_0x369dc8(0x43c)](_0x360139);}}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x4b2),_0x4c54ce=>{const _0x114e68=_0x2832c8;if(!SceneManager[_0x114e68(0x230)]())return;VisuMZ[_0x114e68(0x1ca)](_0x4c54ce,_0x4c54ce);const _0x22a116=BattleManager[_0x114e68(0x555)],_0x5e6e1d={'arPenRate':_0x4c54ce['ArPenRate'],'arPenFlat':_0x4c54ce['ArPenFlat'],'arRedRate':_0x4c54ce[_0x114e68(0x353)],'arRedFlat':_0x4c54ce[_0x114e68(0x359)]};_0x22a116[_0x114e68(0x32c)]=_0x5e6e1d;}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x1a5),_0x173253=>{const _0xcbff4e=_0x2832c8;if(!SceneManager[_0xcbff4e(0x230)]())return;if(!Imported[_0xcbff4e(0x4c5)])return;VisuMZ[_0xcbff4e(0x1ca)](_0x173253,_0x173253);const _0x4feb1b=VisuMZ[_0xcbff4e(0x84c)](_0x173253[_0xcbff4e(0x818)]),_0x484b39=_0x173253['ChargeRate'],_0x2975a4=_0x173253['ChargeRate'],_0x22be63=_0x173253[_0xcbff4e(0x74b)];for(const _0x5ab2ce of _0x4feb1b){if(!_0x5ab2ce)continue;if(_0x5ab2ce['isAtbChargingState']())_0x5ab2ce['changeAtbChargeTime'](_0x484b39);else{if(_0x5ab2ce[_0xcbff4e(0x37a)]()){_0x5ab2ce[_0xcbff4e(0x4d5)](_0x2975a4);if(_0x22be63)_0x5ab2ce[_0xcbff4e(0x3b3)]();}}}}),PluginManager['registerCommand'](pluginData['name'],_0x2832c8(0x77b),_0x3320ad=>{const _0x1beaef=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x1beaef(0x556)])return;VisuMZ[_0x1beaef(0x1ca)](_0x3320ad,_0x3320ad);const _0x256062=VisuMZ[_0x1beaef(0x84c)](_0x3320ad[_0x1beaef(0x818)]),_0x52a901=_0x3320ad[_0x1beaef(0x182)];for(const _0x5a7b27 of _0x256062){if(!_0x5a7b27)continue;_0x5a7b27[_0x1beaef(0x3e7)](_0x52a901);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x26f),_0x281a31=>{const _0x254fb1=_0x2832c8;if(!SceneManager[_0x254fb1(0x230)]())return;VisuMZ[_0x254fb1(0x1ca)](_0x281a31,_0x281a31);const _0x5b3246=$gameTemp[_0x254fb1(0x642)](),_0x1380a3=BattleManager[_0x254fb1(0x555)],_0x1707e4=BattleManager[_0x254fb1(0x2c0)];if(!_0x5b3246||!_0x1380a3||!_0x1707e4)return;if(!_0x1380a3[_0x254fb1(0x703)]())return;const _0x5f28be=VisuMZ[_0x254fb1(0x84c)](_0x281a31['Targets']);for(const _0x5c5379 of _0x5f28be){if(!_0x5c5379)continue;_0x281a31[_0x254fb1(0x6c7)]&&(_0x5c5379['removeImmortal'](),_0x5c5379[_0x254fb1(0x43c)](_0x5c5379[_0x254fb1(0x225)]())),_0x5c5379['isDeathStateAffected']()&&_0x5c5379['performCollapse']();}_0x5b3246['setWaitMode']('battleEffect');}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x360),_0x123df6=>{const _0x3d1613=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3d1613(0x70f)])return;VisuMZ[_0x3d1613(0x1ca)](_0x123df6,_0x123df6);const _0x2e4cfc=VisuMZ[_0x3d1613(0x84c)](_0x123df6[_0x3d1613(0x818)]),_0x4548ea=_0x123df6[_0x3d1613(0x5f7)];for(const _0x2bcf06 of _0x2e4cfc){if(!_0x2bcf06)continue;_0x2bcf06[_0x3d1613(0x52c)](_0x4548ea);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x847),_0x535c22=>{const _0x3613d4=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3613d4(0x70f)])return;VisuMZ[_0x3613d4(0x1ca)](_0x535c22,_0x535c22);const _0x2bcfb1=VisuMZ[_0x3613d4(0x84c)](_0x535c22[_0x3613d4(0x818)]),_0x5e9eae=_0x535c22[_0x3613d4(0x760)],_0x2ec32e=_0x535c22[_0x3613d4(0x760)];for(const _0x2eff99 of _0x2bcfb1){if(!_0x2eff99)continue;if(_0x2eff99[_0x3613d4(0x43e)]===_0x3613d4(0x383))_0x2eff99['changeCtbChargeTime'](_0x5e9eae);else _0x2eff99[_0x3613d4(0x43e)]==='casting'&&_0x2eff99[_0x3613d4(0x7f5)](_0x2ec32e);}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Mechanics_CustomDmgFormula',_0x1832eb=>{const _0x1ee863=_0x2832c8;if(!SceneManager[_0x1ee863(0x230)]())return;VisuMZ[_0x1ee863(0x1ca)](_0x1832eb,_0x1832eb);const _0x5520e9=BattleManager[_0x1ee863(0x555)];if(!_0x5520e9)return;let _0x170f4b=_0x1832eb[_0x1ee863(0x1e4)];_0x5520e9[_0x1ee863(0x4e3)](_0x170f4b);}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Mechanics_DamagePopup',_0x1eda8f=>{const _0x2e2d3b=_0x2832c8;if(!SceneManager[_0x2e2d3b(0x230)]())return;VisuMZ[_0x2e2d3b(0x1ca)](_0x1eda8f,_0x1eda8f);const _0x11b04d=VisuMZ['CreateActionSequenceTargets'](_0x1eda8f[_0x2e2d3b(0x818)]);for(const _0x431cf4 of _0x11b04d){if(!_0x431cf4)continue;if(_0x431cf4[_0x2e2d3b(0x361)]())_0x431cf4[_0x2e2d3b(0x826)]();}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Mechanics_DeathBreak',_0x582718=>{const _0x5b36fe=_0x2832c8;if(!SceneManager[_0x5b36fe(0x230)]())return;VisuMZ[_0x5b36fe(0x1ca)](_0x582718,_0x582718);const _0x33d33c=$gameTemp['getLastPluginCommandInterpreter'](),_0x3beada=BattleManager[_0x5b36fe(0x2c0)],_0x2cc89a=_0x582718['JumpToLabel'];if(!_0x33d33c)return;if(!_0x3beada)return;_0x3beada&&_0x3beada[_0x5b36fe(0x7d5)]()&&_0x2cc89a['toUpperCase']()[_0x5b36fe(0x757)]()!==_0x5b36fe(0x197)&&_0x33d33c[_0x5b36fe(0x451)]([_0x2cc89a]);}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x6fb),_0x1d23d3=>{const _0x13c2e5=_0x2832c8;if(!SceneManager[_0x13c2e5(0x230)]())return;if(!Imported['VisuMZ_2_BattleSystemFTB'])return;VisuMZ['ConvertParams'](_0x1d23d3,_0x1d23d3);const _0xb53f16=_0x1d23d3[_0x13c2e5(0x369)];BattleManager[_0x13c2e5(0x2c0)]&&BattleManager[_0x13c2e5(0x2c0)][_0x13c2e5(0x739)]()[_0x13c2e5(0x5b6)](_0xb53f16);}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_HpMpTp',_0x3a590b=>{const _0xce8b81=_0x2832c8;if(!SceneManager[_0xce8b81(0x230)]())return;VisuMZ[_0xce8b81(0x1ca)](_0x3a590b,_0x3a590b);const _0x2758de=VisuMZ[_0xce8b81(0x84c)](_0x3a590b[_0xce8b81(0x818)]),_0x59595a=_0x3a590b[_0xce8b81(0x457)],_0x374a57=_0x3a590b[_0xce8b81(0x7fb)],_0xbf717a=_0x3a590b[_0xce8b81(0x284)],_0x578cad=_0x3a590b['MP_Flat'],_0x4b9615=_0x3a590b[_0xce8b81(0x45f)],_0x4e78ce=_0x3a590b[_0xce8b81(0x4c0)],_0x6d2829=_0x3a590b[_0xce8b81(0x669)];for(const _0x129ccc of _0x2758de){if(!_0x129ccc)continue;const _0x528bde=_0x129ccc[_0xce8b81(0x6be)](),_0x5201dd=Math[_0xce8b81(0x46d)](_0x59595a*_0x129ccc[_0xce8b81(0x6ff)]+_0x374a57),_0x8eaa00=Math[_0xce8b81(0x46d)](_0xbf717a*_0x129ccc['mmp']+_0x578cad),_0xf1c327=Math[_0xce8b81(0x46d)](_0x4b9615*_0x129ccc['maxTp']()+_0x4e78ce);if(_0x5201dd!==0x0)_0x129ccc[_0xce8b81(0x629)](_0x5201dd);if(_0x8eaa00!==0x0)_0x129ccc[_0xce8b81(0x706)](_0x8eaa00);if(_0xf1c327!==0x0)_0x129ccc[_0xce8b81(0x65f)](_0xf1c327);if(_0x6d2829)_0x129ccc[_0xce8b81(0x826)]();_0x528bde&&_0x129ccc['isDead']()&&_0x129ccc['performCollapse']();}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Mechanics_Immortal',_0x4f1297=>{const _0x5eef0f=_0x2832c8;if(!SceneManager[_0x5eef0f(0x230)]())return;VisuMZ[_0x5eef0f(0x1ca)](_0x4f1297,_0x4f1297);const _0x2f89e8=VisuMZ[_0x5eef0f(0x84c)](_0x4f1297[_0x5eef0f(0x818)]);for(const _0x6b6b69 of _0x2f89e8){if(!_0x6b6b69)continue;_0x6b6b69[_0x5eef0f(0x3f5)](_0x4f1297[_0x5eef0f(0x689)]);}}),PluginManager['registerCommand'](pluginData['name'],_0x2832c8(0x507),_0x21d72f=>{const _0x4206dc=_0x2832c8;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4206dc(0x1ca)](_0x21d72f,_0x21d72f);const _0x435387=BattleManager['_action'],_0x1951a4={'criticalHitRate':_0x21d72f[_0x4206dc(0x484)],'criticalHitFlat':_0x21d72f[_0x4206dc(0x651)],'criticalDmgRate':_0x21d72f[_0x4206dc(0x5c9)],'criticalDmgFlat':_0x21d72f[_0x4206dc(0x196)],'damageRate':_0x21d72f[_0x4206dc(0x81d)],'damageFlat':_0x21d72f[_0x4206dc(0x32e)],'hitRate':_0x21d72f[_0x4206dc(0x42d)],'hitFlat':_0x21d72f[_0x4206dc(0x442)]};_0x435387[_0x4206dc(0x883)]=_0x1951a4;}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x3ad),_0x37c743=>{const _0x35c5ce=_0x2832c8;if(!SceneManager[_0x35c5ce(0x230)]())return;VisuMZ[_0x35c5ce(0x1ca)](_0x37c743,_0x37c743);const _0x50289a=[_0x35c5ce(0x5c2),_0x35c5ce(0x5fe),_0x35c5ce(0x766),_0x35c5ce(0x7a5),_0x35c5ce(0x772),_0x35c5ce(0x330),'AGI',_0x35c5ce(0x34e)],_0x36a99f=_0x37c743[_0x35c5ce(0x17e)],_0x23616c=_0x37c743[_0x35c5ce(0x7f9)],_0x2cbf98=VisuMZ[_0x35c5ce(0x84c)](_0x37c743['Targets']);for(const _0x532f64 of _0x2cbf98){if(!_0x532f64)continue;for(const _0x5af43c of _0x36a99f){const _0x30099c=_0x50289a[_0x35c5ce(0x294)](_0x5af43c[_0x35c5ce(0x716)]()[_0x35c5ce(0x757)]());_0x30099c>=0x0&&_0x30099c<=0x7&&_0x532f64['isBuffAffected'](_0x30099c)&&_0x532f64['removeBuff'](_0x30099c);}for(const _0x119e16 of _0x23616c){const _0x29d6ee=_0x50289a[_0x35c5ce(0x294)](_0x119e16['toUpperCase']()[_0x35c5ce(0x757)]());_0x29d6ee>=0x0&&_0x29d6ee<=0x7&&_0x532f64[_0x35c5ce(0x417)](_0x29d6ee)&&_0x532f64['removeBuff'](_0x29d6ee);}}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Mechanics_RemoveState',_0x2b523d=>{const _0x9831a8=_0x2832c8;if(!SceneManager[_0x9831a8(0x230)]())return;VisuMZ[_0x9831a8(0x1ca)](_0x2b523d,_0x2b523d);const _0xd173ef=_0x2b523d[_0x9831a8(0x522)],_0x459ce6=VisuMZ[_0x9831a8(0x84c)](_0x2b523d[_0x9831a8(0x818)]);for(const _0x12c331 of _0x459ce6){if(!_0x12c331)continue;for(const _0x42eca7 of _0xd173ef){_0x12c331[_0x9831a8(0x41d)](_0x42eca7);}}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x6d0),_0x483d10=>{const _0x44e9ea=_0x2832c8;if(!SceneManager[_0x44e9ea(0x230)]())return;if(!Imported['VisuMZ_2_BattleSystemSTB'])return;VisuMZ[_0x44e9ea(0x1ca)](_0x483d10,_0x483d10);const _0x2cb58e=_0x483d10['Exploited'],_0x228446=VisuMZ[_0x44e9ea(0x84c)](_0x483d10[_0x44e9ea(0x818)]),_0x52141c=_0x483d10[_0x44e9ea(0x485)],_0x3d335f=_0x483d10[_0x44e9ea(0x44a)],_0x2f1690=_0x483d10[_0x44e9ea(0x6ef)],_0x576af5=BattleManager[_0x44e9ea(0x555)];if(_0x2cb58e)for(const _0x358f51 of _0x228446){if(!_0x358f51)continue;if(_0x358f51===user)continue;if(_0x52141c)_0x358f51[_0x44e9ea(0x72b)](![]);_0x358f51[_0x44e9ea(0x4d9)](BattleManager[_0x44e9ea(0x2c0)],_0x576af5);}if(_0x3d335f&&BattleManager[_0x44e9ea(0x2c0)]){if(_0x2f1690)BattleManager['_subject'][_0x44e9ea(0x72b)](![]);const _0x5cbf6b=_0x228446[0x0];BattleManager[_0x44e9ea(0x802)](_0x5cbf6b,_0x576af5);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x750),_0x5d63f6=>{const _0x3f38dc=_0x2832c8;if(!SceneManager[_0x3f38dc(0x230)]())return;if(!Imported[_0x3f38dc(0x50a)])return;VisuMZ[_0x3f38dc(0x1ca)](_0x5d63f6,_0x5d63f6);const _0x5e636a=_0x5d63f6[_0x3f38dc(0x270)];BattleManager[_0x3f38dc(0x2c0)]&&BattleManager[_0x3f38dc(0x2c0)]['stbGainInstant'](_0x5e636a);}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x8b0),_0x3dcdd0=>{const _0x4e80c7=_0x2832c8;if(!SceneManager[_0x4e80c7(0x230)]())return;if(!Imported[_0x4e80c7(0x50a)])return;VisuMZ[_0x4e80c7(0x1ca)](_0x3dcdd0,_0x3dcdd0);let _0x20cee7=_0x3dcdd0[_0x4e80c7(0x270)];if(BattleManager[_0x4e80c7(0x2c0)]){BattleManager[_0x4e80c7(0x2c0)][_0x4e80c7(0x371)]=BattleManager['_subject'][_0x4e80c7(0x371)]||[];while(_0x20cee7--){if(BattleManager[_0x4e80c7(0x2c0)][_0x4e80c7(0x371)]['length']<=0x0)break;BattleManager[_0x4e80c7(0x2c0)][_0x4e80c7(0x371)]['shift']();}}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x8d1),_0x3ac589=>{const _0x2f3dc5=_0x2832c8;if(!SceneManager[_0x2f3dc5(0x230)]())return;VisuMZ[_0x2f3dc5(0x1ca)](_0x3ac589,_0x3ac589);const _0x4e073f=VisuMZ[_0x2f3dc5(0x84c)](_0x3ac589[_0x2f3dc5(0x818)]),_0x136e61=_0x3ac589[_0x2f3dc5(0x3ec)],_0x4daf85={'textColor':ColorManager[_0x2f3dc5(0x799)](_0x3ac589['TextColor']),'flashColor':_0x3ac589[_0x2f3dc5(0x8a9)],'flashDuration':_0x3ac589[_0x2f3dc5(0x501)]};for(const _0x2823ff of _0x4e073f){if(!_0x2823ff)continue;_0x2823ff[_0x2f3dc5(0x831)](_0x136e61,_0x4daf85);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x402),_0x81551c=>{const _0x2b1550=_0x2832c8;if(!SceneManager[_0x2b1550(0x230)]())return;VisuMZ[_0x2b1550(0x1ca)](_0x81551c,_0x81551c);const _0x42e9d3=VisuMZ[_0x2b1550(0x84c)](_0x81551c[_0x2b1550(0x818)]);let _0x17cafd=$gameVariables['value'](_0x81551c[_0x2b1550(0x234)]);Imported['VisuMZ_0_CoreEngine']&&_0x81551c[_0x2b1550(0x2e4)]&&(_0x17cafd=VisuMZ[_0x2b1550(0x406)](_0x17cafd));const _0x249bca=String(_0x17cafd),_0x1f0e84={'textColor':ColorManager[_0x2b1550(0x799)](_0x81551c[_0x2b1550(0x227)]),'flashColor':_0x81551c[_0x2b1550(0x8a9)],'flashDuration':_0x81551c[_0x2b1550(0x501)]};for(const _0x578df5 of _0x42e9d3){if(!_0x578df5)continue;_0x578df5[_0x2b1550(0x831)](_0x249bca,_0x1f0e84);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x33d),_0x5d0145=>{const _0x10f509=_0x2832c8;if(!SceneManager[_0x10f509(0x230)]())return;const _0x4b4dc8=$gameTemp[_0x10f509(0x642)]();if(!_0x4b4dc8)return;_0x4b4dc8['setWaitMode'](_0x10f509(0x3fa));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x5db),_0x42bd9a=>{const _0x3b6af9=_0x2832c8;if(!SceneManager[_0x3b6af9(0x230)]())return;VisuMZ['ConvertParams'](_0x42bd9a,_0x42bd9a);const _0x5a0691=VisuMZ[_0x3b6af9(0x84c)](_0x42bd9a[_0x3b6af9(0x818)]);for(const _0x58ffd4 of _0x5a0691){if(!_0x58ffd4)continue;_0x58ffd4['clearFreezeMotion']();}}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x62f),_0x2cef74=>{const _0xfe7a9a=_0x2832c8;if(!SceneManager[_0xfe7a9a(0x230)]())return;VisuMZ['ConvertParams'](_0x2cef74,_0x2cef74);const _0x4e21f4=VisuMZ[_0xfe7a9a(0x84c)](_0x2cef74[_0xfe7a9a(0x818)]),_0x4cb502=_0x2cef74[_0xfe7a9a(0x696)][_0xfe7a9a(0x188)]()[_0xfe7a9a(0x757)](),_0x5ce12c=_0x2cef74['ShowWeapon'],_0x1848b6=_0x2cef74[_0xfe7a9a(0x5fd)];for(const _0x29e00d of _0x4e21f4){if(!_0x29e00d)continue;_0x29e00d[_0xfe7a9a(0x568)](_0x4cb502,_0x5ce12c,_0x1848b6);}}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x61f),_0x35f056=>{const _0x256510=_0x2832c8;if(!SceneManager[_0x256510(0x230)]())return;VisuMZ[_0x256510(0x1ca)](_0x35f056,_0x35f056);const _0x1cab44=VisuMZ[_0x256510(0x84c)](_0x35f056[_0x256510(0x818)]),_0x45ee7b=_0x35f056[_0x256510(0x696)][_0x256510(0x188)]()[_0x256510(0x757)](),_0x13e284=_0x35f056[_0x256510(0x4e0)];for(const _0x329335 of _0x1cab44){if(!_0x329335)continue;if(_0x45ee7b[_0x256510(0x6f0)](/ATTACK[ ](\d+)/i))_0x329335['performAttackSlot'](Number(RegExp['$1']));else _0x45ee7b==='attack'?_0x329335[_0x256510(0x5ab)]():_0x329335[_0x256510(0x613)](_0x45ee7b);if(!_0x13e284)_0x329335[_0x256510(0x691)](0x0);else{if(_0x13e284&&[_0x256510(0x1c7),_0x256510(0x819),'missle'][_0x256510(0x569)](_0x45ee7b)){}}}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Motion_PerformAction',_0x188667=>{const _0x5ba9fe=_0x2832c8;if(!SceneManager[_0x5ba9fe(0x230)]())return;VisuMZ['ConvertParams'](_0x188667,_0x188667);const _0x5cf84a=BattleManager[_0x5ba9fe(0x555)];if(!_0x5cf84a)return;if(!_0x5cf84a[_0x5ba9fe(0x703)]())return;const _0x32a135=VisuMZ['CreateActionSequenceTargets'](_0x188667['Targets']);for(const _0x3898a2 of _0x32a135){if(!_0x3898a2)continue;_0x3898a2[_0x5ba9fe(0x1c5)](_0x5cf84a);}}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x17d),_0x32c7e1=>{const _0x17f634=_0x2832c8;if(!SceneManager[_0x17f634(0x230)]())return;VisuMZ[_0x17f634(0x1ca)](_0x32c7e1,_0x32c7e1);const _0x164ec3=VisuMZ[_0x17f634(0x84c)](_0x32c7e1[_0x17f634(0x818)]);for(const _0x48de1e of _0x164ec3){if(!_0x48de1e)continue;if(!_0x48de1e['battler']())continue;_0x48de1e[_0x17f634(0x5b5)]()[_0x17f634(0x28f)]();}}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x421),_0x350ab3=>{const _0x4faf10=_0x2832c8;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x350ab3,_0x350ab3);const _0x2b965b=$gameTemp[_0x4faf10(0x642)](),_0x5ca6e1=_0x350ab3[_0x4faf10(0x2c6)]*Sprite_Battler[_0x4faf10(0x323)];_0x2b965b['wait'](_0x5ca6e1);}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],'ActSeq_Movement_BattleStep',_0x33273c=>{const _0x5b40a8=_0x2832c8;if(!SceneManager[_0x5b40a8(0x230)]())return;VisuMZ[_0x5b40a8(0x1ca)](_0x33273c,_0x33273c);const _0x3d1faf=$gameTemp[_0x5b40a8(0x642)](),_0x416229=BattleManager[_0x5b40a8(0x555)];if(!_0x3d1faf||!_0x416229)return;if(!_0x416229['item']())return;const _0x359516=VisuMZ[_0x5b40a8(0x84c)](_0x33273c['Targets']);for(const _0x5834f1 of _0x359516){if(!_0x5834f1)continue;_0x5834f1[_0x5b40a8(0x612)](_0x416229);}if(_0x33273c[_0x5b40a8(0x3dc)])_0x3d1faf[_0x5b40a8(0x363)](_0x5b40a8(0x614));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Movement_FaceDirection',_0x451a7e=>{const _0x4bfff6=_0x2832c8;if(!SceneManager[_0x4bfff6(0x230)]())return;if(!$gameSystem[_0x4bfff6(0x593)]())return;VisuMZ[_0x4bfff6(0x1ca)](_0x451a7e,_0x451a7e);const _0x45bb31=VisuMZ[_0x4bfff6(0x84c)](_0x451a7e['Targets']);let _0x31f90c=_0x451a7e['Direction'][_0x4bfff6(0x6f0)](/back/i);for(const _0x4017af of _0x45bb31){if(!_0x4017af)continue;if(_0x451a7e[_0x4bfff6(0x638)][_0x4bfff6(0x6f0)](/rand/i))_0x31f90c=Math[_0x4bfff6(0x809)](0x2);_0x4017af[_0x4bfff6(0x4a7)](!!_0x31f90c);}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x5d2),_0x379c56=>{const _0x326fcb=_0x2832c8;if(!SceneManager[_0x326fcb(0x230)]())return;if(!$gameSystem[_0x326fcb(0x593)]())return;VisuMZ[_0x326fcb(0x1ca)](_0x379c56,_0x379c56);const _0x1022c0=VisuMZ[_0x326fcb(0x84c)](_0x379c56[_0x326fcb(0x818)]);let _0x3a17c7=_0x379c56[_0x326fcb(0x4b4)];const _0x41ee69=_0x379c56[_0x326fcb(0x735)];for(const _0x39152d of _0x1022c0){if(!_0x39152d)continue;let _0x9678ae=_0x39152d[_0x326fcb(0x5b5)]()['_baseX'],_0x5bdc95=_0x39152d['battler']()[_0x326fcb(0x8d3)];if(_0x3a17c7[_0x326fcb(0x6f0)](/home/i))_0x9678ae=_0x39152d['battler']()[_0x326fcb(0x84b)],_0x5bdc95=_0x39152d[_0x326fcb(0x5b5)]()['_homeY'];else{if(_0x3a17c7[_0x326fcb(0x6f0)](/center/i))_0x9678ae=Graphics['boxWidth']/0x2,_0x5bdc95=Graphics[_0x326fcb(0x756)]/0x2;else _0x3a17c7['match'](/point (\d+), (\d+)/i)&&(_0x9678ae=Number(RegExp['$1']),_0x5bdc95=Number(RegExp['$2']));}_0x39152d[_0x326fcb(0x57d)](Math[_0x326fcb(0x46d)](_0x9678ae),Math[_0x326fcb(0x46d)](_0x5bdc95),!!_0x41ee69);}}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x310),_0x49c142=>{const _0x3470db=_0x2832c8;if(!SceneManager[_0x3470db(0x230)]())return;if(!$gameSystem[_0x3470db(0x593)]())return;VisuMZ[_0x3470db(0x1ca)](_0x49c142,_0x49c142);const _0x46116b=VisuMZ[_0x3470db(0x84c)](_0x49c142['Targets1']),_0x33d6a8=VisuMZ[_0x3470db(0x84c)](_0x49c142[_0x3470db(0x307)]),_0x450c26=_0x33d6a8[_0x3470db(0x8b3)](_0xbfab2e=>_0xbfab2e&&_0xbfab2e[_0x3470db(0x5b5)]()?_0xbfab2e[_0x3470db(0x5b5)]()[_0x3470db(0x4b3)]:0x0)/(_0x33d6a8[_0x3470db(0x720)]||0x1),_0x4aaf00=_0x33d6a8['map'](_0x2dfcba=>_0x2dfcba&&_0x2dfcba['battler']()?_0x2dfcba[_0x3470db(0x5b5)]()[_0x3470db(0x8d3)]:0x0)/(_0x33d6a8[_0x3470db(0x720)]||0x1),_0x7de2bc=_0x49c142[_0x3470db(0x735)];for(const _0x44ff88 of _0x46116b){if(!_0x44ff88)continue;_0x44ff88[_0x3470db(0x57d)](Math[_0x3470db(0x46d)](_0x450c26),Math[_0x3470db(0x46d)](_0x4aaf00),!!_0x7de2bc);}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Movement_Float',_0x3db7b1=>{const _0x5c1b88=_0x2832c8;if(!SceneManager[_0x5c1b88(0x230)]())return;VisuMZ[_0x5c1b88(0x1ca)](_0x3db7b1,_0x3db7b1);const _0x37b32d=$gameTemp[_0x5c1b88(0x642)](),_0x30bc4e=VisuMZ[_0x5c1b88(0x84c)](_0x3db7b1[_0x5c1b88(0x818)]),_0x4dcab4=_0x3db7b1[_0x5c1b88(0x83a)],_0xac5d92=_0x3db7b1['Duration'],_0x20065b=_0x3db7b1[_0x5c1b88(0x7b8)],_0x4bee62=_0x3db7b1[_0x5c1b88(0x448)];if(!_0x37b32d)return;for(const _0x200345 of _0x30bc4e){if(!_0x200345)continue;_0x200345['floatBattler'](_0x4dcab4,_0xac5d92,_0x20065b);}if(_0x4bee62)_0x37b32d['setWaitMode'](_0x5c1b88(0x324));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Movement_HomeReset',_0x148ed2=>{const _0x3ced61=_0x2832c8;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x148ed2,_0x148ed2);const _0x4e40fe=$gameTemp[_0x3ced61(0x642)]();if(!_0x4e40fe)return;const _0x469f01=VisuMZ[_0x3ced61(0x84c)](_0x148ed2[_0x3ced61(0x818)]);for(const _0x2a8ddd of _0x469f01){if(!_0x2a8ddd)continue;_0x2a8ddd[_0x3ced61(0x3c5)](),_0x2a8ddd[_0x3ced61(0x500)]();}if(_0x148ed2[_0x3ced61(0x3dc)])_0x4e40fe[_0x3ced61(0x363)]('battleMove');}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x824),_0x23fceb=>{const _0x2f9c92=_0x2832c8;if(!SceneManager[_0x2f9c92(0x230)]())return;VisuMZ[_0x2f9c92(0x1ca)](_0x23fceb,_0x23fceb);const _0x34adc5=$gameTemp['getLastPluginCommandInterpreter'](),_0x76d953=VisuMZ[_0x2f9c92(0x84c)](_0x23fceb[_0x2f9c92(0x818)]),_0x291d42=_0x23fceb['Height'],_0xe43e7b=_0x23fceb['Duration'],_0x5843f7=_0x23fceb[_0x2f9c92(0x4d7)];if(!_0x34adc5)return;for(const _0x2b0219 of _0x76d953){if(!_0x2b0219)continue;_0x2b0219[_0x2f9c92(0x2bd)](_0x291d42,_0xe43e7b);}if(_0x5843f7)_0x34adc5['setWaitMode'](_0x2f9c92(0x4f9));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x621),_0x5a6ab0=>{const _0x53a68e=_0x2832c8;if(!SceneManager[_0x53a68e(0x230)]())return;if(!$gameSystem[_0x53a68e(0x593)]())return;VisuMZ[_0x53a68e(0x1ca)](_0x5a6ab0,_0x5a6ab0);const _0xd78e10=$gameTemp[_0x53a68e(0x642)](),_0x1afe90=VisuMZ[_0x53a68e(0x84c)](_0x5a6ab0[_0x53a68e(0x818)]),_0x1a7c59=_0x5a6ab0[_0x53a68e(0x455)],_0x468be3=_0x5a6ab0[_0x53a68e(0x322)],_0x4b7f64=_0x5a6ab0['DistanceY'],_0x46d88c=_0x5a6ab0[_0x53a68e(0x55f)],_0x26f927=_0x5a6ab0[_0x53a68e(0x7c3)],_0x3c42ae=_0x5a6ab0[_0x53a68e(0x7b8)],_0x1e1d3f=_0x5a6ab0[_0x53a68e(0x696)],_0x36cdfa=_0x5a6ab0[_0x53a68e(0x3dc)];if(!_0xd78e10)return;for(const _0x469673 of _0x1afe90){if(!_0x469673)continue;let _0x2b34a8=_0x468be3,_0x101405=_0x4b7f64;if(_0x1a7c59[_0x53a68e(0x6f0)](/horz/i))_0x2b34a8*=_0x469673[_0x53a68e(0x44c)]()?-0x1:0x1;if(_0x1a7c59['match'](/vert/i))_0x101405*=_0x469673[_0x53a68e(0x44c)]()?-0x1:0x1;_0x469673[_0x53a68e(0x24f)](_0x2b34a8,_0x101405,_0x46d88c,_0x26f927,_0x3c42ae),_0x469673['requestMotion'](_0x1e1d3f);}if(_0x36cdfa)_0xd78e10[_0x53a68e(0x363)](_0x53a68e(0x614));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x2dd),_0x5d7fa8=>{const _0x4f3fc5=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x4f3fc5(0x593)]())return;VisuMZ[_0x4f3fc5(0x1ca)](_0x5d7fa8,_0x5d7fa8);const _0x4f6613=$gameTemp['getLastPluginCommandInterpreter'](),_0x417712=VisuMZ[_0x4f3fc5(0x84c)](_0x5d7fa8[_0x4f3fc5(0x818)]),_0xc85976=_0x5d7fa8[_0x4f3fc5(0x18d)],_0x190720=_0x5d7fa8[_0x4f3fc5(0x52f)],_0x4e4777=_0x5d7fa8[_0x4f3fc5(0x2b3)],_0x351a52=_0x5d7fa8[_0x4f3fc5(0x73e)],_0x3814fa=_0x5d7fa8[_0x4f3fc5(0x55f)],_0x2c4deb=_0x5d7fa8[_0x4f3fc5(0x7c3)],_0x5d4b6c=_0x5d7fa8[_0x4f3fc5(0x7b8)],_0x1081df=_0x5d7fa8['MotionType'],_0x22fd4b=_0x5d7fa8[_0x4f3fc5(0x3dc)];if(!_0x4f6613)return;for(const _0x31e426 of _0x417712){if(!_0x31e426)continue;let _0x51367a=_0x31e426[_0x4f3fc5(0x5b5)]()[_0x4f3fc5(0x4b3)],_0x61e840=_0x31e426[_0x4f3fc5(0x5b5)]()[_0x4f3fc5(0x8d3)];if(_0xc85976['match'](/home/i))_0x51367a=_0x31e426['battler']()[_0x4f3fc5(0x84b)],_0x61e840=_0x31e426['battler']()['_homeY'];else{if(_0xc85976[_0x4f3fc5(0x6f0)](/center/i))_0x51367a=Graphics[_0x4f3fc5(0x19b)]/0x2,_0x61e840=Graphics[_0x4f3fc5(0x756)]/0x2;else _0xc85976[_0x4f3fc5(0x6f0)](/point (\d+), (\d+)/i)&&(_0x51367a=Number(RegExp['$1']),_0x61e840=Number(RegExp['$2']));}if(_0x190720[_0x4f3fc5(0x6f0)](/horz/i))_0x51367a+=_0x31e426[_0x4f3fc5(0x44c)]()?-_0x4e4777:_0x4e4777;if(_0x190720[_0x4f3fc5(0x6f0)](/vert/i))_0x61e840+=_0x31e426[_0x4f3fc5(0x44c)]()?-_0x351a52:_0x351a52;_0x31e426[_0x4f3fc5(0x526)](_0x51367a,_0x61e840,_0x3814fa,_0x2c4deb,_0x5d4b6c,-0x1),_0x31e426[_0x4f3fc5(0x613)](_0x1081df);}if(_0x22fd4b)_0x4f6613[_0x4f3fc5(0x363)](_0x4f3fc5(0x614));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x863),_0xaddd04=>{const _0xd31880=_0x2832c8;if(!SceneManager[_0xd31880(0x230)]())return;if(!$gameSystem[_0xd31880(0x593)]())return;VisuMZ[_0xd31880(0x1ca)](_0xaddd04,_0xaddd04);const _0x463a9d=$gameTemp[_0xd31880(0x642)](),_0x6297c2=VisuMZ[_0xd31880(0x84c)](_0xaddd04['Targets1']),_0x3d09d9=VisuMZ[_0xd31880(0x84c)](_0xaddd04[_0xd31880(0x307)]),_0x108d9b=_0xaddd04['TargetLocation'];let _0x4cc348=_0xaddd04['MeleeDistance'];const _0x3c5124=_0xaddd04[_0xd31880(0x52f)],_0x583ffb=_0xaddd04[_0xd31880(0x2b3)],_0x4c2c8c=_0xaddd04[_0xd31880(0x73e)],_0x41b0f9=_0xaddd04[_0xd31880(0x55f)],_0x45d6d2=_0xaddd04[_0xd31880(0x7c3)],_0x13c505=_0xaddd04[_0xd31880(0x7b8)],_0x25111b=_0xaddd04[_0xd31880(0x696)],_0x4af5b6=_0xaddd04[_0xd31880(0x3dc)],_0x4694c1=Math[_0xd31880(0x609)](..._0x3d09d9[_0xd31880(0x8b3)](_0x4add10=>_0x4add10[_0xd31880(0x5b5)]()[_0xd31880(0x4b3)]-_0x4add10[_0xd31880(0x5b5)]()[_0xd31880(0x1be)]()/0x2)),_0x3b5338=Math[_0xd31880(0x871)](..._0x3d09d9[_0xd31880(0x8b3)](_0x28b31a=>_0x28b31a['battler']()[_0xd31880(0x4b3)]+_0x28b31a[_0xd31880(0x5b5)]()['mainSpriteWidth']()/0x2)),_0x34e19e=Math[_0xd31880(0x609)](..._0x3d09d9[_0xd31880(0x8b3)](_0x14a738=>_0x14a738[_0xd31880(0x5b5)]()[_0xd31880(0x8d3)]-_0x14a738[_0xd31880(0x5b5)]()[_0xd31880(0x2d2)]())),_0x59185f=Math[_0xd31880(0x871)](..._0x3d09d9[_0xd31880(0x8b3)](_0x4709ed=>_0x4709ed[_0xd31880(0x5b5)]()['_baseY'])),_0x888817=_0x3d09d9[_0xd31880(0x28c)](_0x223305=>_0x223305[_0xd31880(0x44c)]())['length'],_0x5f4b5c=_0x3d09d9['filter'](_0x310968=>_0x310968[_0xd31880(0x2a2)]())[_0xd31880(0x720)];let _0x24f8a1=0x0,_0x3376bb=0x0;if(_0x108d9b[_0xd31880(0x6f0)](/front/i))_0x24f8a1=_0x888817>=_0x5f4b5c?_0x4694c1:_0x3b5338;else{if(_0x108d9b['match'](/middle/i))_0x24f8a1=(_0x4694c1+_0x3b5338)/0x2,_0x4cc348=-0x1;else _0x108d9b[_0xd31880(0x6f0)](/back/i)&&(_0x24f8a1=_0x888817>=_0x5f4b5c?_0x3b5338:_0x4694c1);}if(_0x108d9b['match'](/head/i))_0x3376bb=_0x34e19e;else{if(_0x108d9b[_0xd31880(0x6f0)](/center/i))_0x3376bb=(_0x34e19e+_0x59185f)/0x2;else _0x108d9b[_0xd31880(0x6f0)](/base/i)&&(_0x3376bb=_0x59185f);}if(!_0x463a9d)return;for(const _0x1deac8 of _0x6297c2){if(!_0x1deac8)continue;let _0x56485b=_0x24f8a1,_0x5de9f5=_0x3376bb;if(_0x3c5124[_0xd31880(0x6f0)](/horz/i))_0x56485b+=_0x1deac8['isActor']()?-_0x583ffb:_0x583ffb;if(_0x3c5124[_0xd31880(0x6f0)](/vert/i))_0x5de9f5+=_0x1deac8[_0xd31880(0x44c)]()?-_0x4c2c8c:_0x4c2c8c;_0x1deac8[_0xd31880(0x526)](_0x56485b,_0x5de9f5,_0x41b0f9,_0x45d6d2,_0x13c505,_0x4cc348),_0x1deac8['requestMotion'](_0x25111b);}if(_0x4af5b6)_0x463a9d['setWaitMode'](_0xd31880(0x614));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x83f),_0x5f16e1=>{const _0x4b1e75=_0x2832c8;if(!SceneManager[_0x4b1e75(0x230)]())return;VisuMZ[_0x4b1e75(0x1ca)](_0x5f16e1,_0x5f16e1);const _0x168d03=$gameTemp[_0x4b1e75(0x642)](),_0x3185d4=VisuMZ[_0x4b1e75(0x84c)](_0x5f16e1['Targets']),_0x52dcde=_0x5f16e1[_0x4b1e75(0x4c6)],_0x22a5c0=_0x5f16e1[_0x4b1e75(0x55f)],_0x1c721d=_0x5f16e1[_0x4b1e75(0x7b8)],_0x4c0a27=_0x5f16e1['WaitForOpacity'];if(!_0x168d03)return;for(const _0x254ed9 of _0x3185d4){if(!_0x254ed9)continue;_0x254ed9[_0x4b1e75(0x2aa)](_0x52dcde,_0x22a5c0,_0x1c721d);}if(_0x4c0a27)_0x168d03[_0x4b1e75(0x363)](_0x4b1e75(0x713));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Movement_Scale',_0x5da530=>{const _0x3f7e0e=_0x2832c8;if(!SceneManager[_0x3f7e0e(0x230)]())return;VisuMZ[_0x3f7e0e(0x1ca)](_0x5da530,_0x5da530);const _0x49a4e5=$gameTemp['getLastPluginCommandInterpreter'](),_0x5852f9=VisuMZ[_0x3f7e0e(0x84c)](_0x5da530[_0x3f7e0e(0x818)]),_0x4df298=_0x5da530['ScaleX'],_0x35f918=_0x5da530[_0x3f7e0e(0x4a3)],_0x49aa4d=_0x5da530['Duration'],_0x5bd53c=_0x5da530[_0x3f7e0e(0x7b8)],_0x3bd39b=_0x5da530[_0x3f7e0e(0x38c)];if(!_0x49a4e5)return;for(const _0x137290 of _0x5852f9){if(!_0x137290)continue;_0x137290[_0x3f7e0e(0x8ea)](_0x4df298,_0x35f918,_0x49aa4d,_0x5bd53c);}if(_0x3bd39b)_0x49a4e5[_0x3f7e0e(0x363)](_0x3f7e0e(0x884));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Movement_Skew',_0x51981e=>{const _0x75ca04=_0x2832c8;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x75ca04(0x1ca)](_0x51981e,_0x51981e);const _0x22ba75=$gameTemp[_0x75ca04(0x642)](),_0xd82929=VisuMZ[_0x75ca04(0x84c)](_0x51981e[_0x75ca04(0x818)]),_0x1b43a3=_0x51981e[_0x75ca04(0x215)],_0x699e5c=_0x51981e[_0x75ca04(0x408)],_0x2f6b0b=_0x51981e['Duration'],_0x4278c6=_0x51981e[_0x75ca04(0x7b8)],_0x4776c4=_0x51981e['WaitForSkew'];if(!_0x22ba75)return;for(const _0xada670 of _0xd82929){if(!_0xada670)continue;_0xada670[_0x75ca04(0x33b)](_0x1b43a3,_0x699e5c,_0x2f6b0b,_0x4278c6);}if(_0x4776c4)_0x22ba75[_0x75ca04(0x363)](_0x75ca04(0x86a));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x23a),_0x716e3b=>{const _0x5286e2=_0x2832c8;if(!SceneManager[_0x5286e2(0x230)]())return;VisuMZ[_0x5286e2(0x1ca)](_0x716e3b,_0x716e3b);const _0x3ff0af=$gameTemp[_0x5286e2(0x642)](),_0x4ecdd1=VisuMZ[_0x5286e2(0x84c)](_0x716e3b['Targets']),_0x3e5ba1=_0x716e3b['Angle'],_0x364a0a=_0x716e3b[_0x5286e2(0x55f)],_0xf29f1=_0x716e3b[_0x5286e2(0x7b8)],_0x493089=_0x716e3b[_0x5286e2(0x3c9)],_0x2888db=_0x716e3b[_0x5286e2(0x5b9)];if(!_0x3ff0af)return;for(const _0x7a7d51 of _0x4ecdd1){if(!_0x7a7d51)continue;_0x7a7d51[_0x5286e2(0x25a)](_0x3e5ba1,_0x364a0a,_0xf29f1,_0x493089);}if(_0x2888db)_0x3ff0af[_0x5286e2(0x363)](_0x5286e2(0x7c1));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x712),_0xf34017=>{const _0x4126f3=_0x2832c8;if(!SceneManager[_0x4126f3(0x230)]())return;const _0x4a26aa=$gameTemp[_0x4126f3(0x642)]();if(!_0x4a26aa)return;_0x4a26aa[_0x4126f3(0x363)](_0x4126f3(0x324));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x31b),_0x11d936=>{const _0x528619=_0x2832c8;if(!SceneManager['isSceneBattle']())return;const _0x44abe0=$gameTemp[_0x528619(0x642)]();if(!_0x44abe0)return;_0x44abe0['setWaitMode'](_0x528619(0x4f9));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Movement_WaitForMovement',_0x36b174=>{const _0x3f359f=_0x2832c8;if(!SceneManager[_0x3f359f(0x230)]())return;const _0x5509d3=$gameTemp[_0x3f359f(0x642)]();if(!_0x5509d3)return;_0x5509d3[_0x3f359f(0x363)]('battleMove');}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x53d),_0x1122a0=>{const _0x3e325d=_0x2832c8;if(!SceneManager[_0x3e325d(0x230)]())return;const _0x4ff442=$gameTemp[_0x3e325d(0x642)]();if(!_0x4ff442)return;_0x4ff442[_0x3e325d(0x363)](_0x3e325d(0x713));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x76e),_0x5d7083=>{const _0x314e04=_0x2832c8;if(!SceneManager[_0x314e04(0x230)]())return;const _0x46cd1c=$gameTemp[_0x314e04(0x642)]();if(!_0x46cd1c)return;_0x46cd1c[_0x314e04(0x363)]('battleGrow');}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x5a5),_0x267c12=>{const _0x231546=_0x2832c8;if(!SceneManager[_0x231546(0x230)]())return;const _0x23f7ec=$gameTemp[_0x231546(0x642)]();if(!_0x23f7ec)return;_0x23f7ec['setWaitMode'](_0x231546(0x86a));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x6a1),_0x2f4ded=>{const _0x3736a5=_0x2832c8;if(!SceneManager[_0x3736a5(0x230)]())return;const _0x148505=$gameTemp[_0x3736a5(0x642)]();if(!_0x148505)return;_0x148505['setWaitMode'](_0x3736a5(0x7c1));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],'ActSeq_Projectile_Animation',_0x3a2f75=>{const _0x1afce9=_0x2832c8;if(!SceneManager[_0x1afce9(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ['ConvertParams'](_0x3a2f75,_0x3a2f75);const _0x18bcd5=$gameTemp[_0x1afce9(0x642)](),_0x50030c=_0x3a2f75[_0x1afce9(0x7f8)];if(!_0x18bcd5)return;const _0x974686=BattleManager[_0x1afce9(0x229)];if(!_0x974686)return;_0x974686[_0x1afce9(0x635)](_0x3a2f75);if(_0x50030c)_0x18bcd5[_0x1afce9(0x363)](_0x1afce9(0x6a4));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x40a),_0x5ef1f6=>{const _0x341f00=_0x2832c8;if(!SceneManager[_0x341f00(0x230)]())return;if(!Imported[_0x341f00(0x74e)])return;VisuMZ[_0x341f00(0x1ca)](_0x5ef1f6,_0x5ef1f6);const _0x570c22=$gameTemp[_0x341f00(0x642)](),_0x916a07=_0x5ef1f6[_0x341f00(0x7f8)];if(!_0x570c22)return;const _0x421a1b=BattleManager['_spriteset'];if(!_0x421a1b)return;_0x421a1b[_0x341f00(0x635)](_0x5ef1f6);if(_0x916a07)_0x570c22[_0x341f00(0x363)](_0x341f00(0x6a4));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Projectile_Picture',_0xf0c4b0=>{const _0x12b470=_0x2832c8;if(!SceneManager[_0x12b470(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ[_0x12b470(0x1ca)](_0xf0c4b0,_0xf0c4b0);const _0x588692=$gameTemp[_0x12b470(0x642)](),_0xc76b52=_0xf0c4b0['WaitForProjectile'];if(!_0x588692)return;const _0x37e135=BattleManager['_spriteset'];if(!_0x37e135)return;_0x37e135[_0x12b470(0x635)](_0xf0c4b0);if(_0xc76b52)_0x588692['setWaitMode'](_0x12b470(0x6a4));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x7ca),_0x2c483a=>{const _0x98578f=_0x2832c8;if(!SceneManager[_0x98578f(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x98578f(0x1ca)](_0x2c483a,_0x2c483a);const _0x1545d0=$gameTemp[_0x98578f(0x642)](),_0x51dfd9=_0x2c483a[_0x98578f(0x6f2)];if(!_0x1545d0)return;$gameScreen[_0x98578f(0x68c)](_0x2c483a[_0x98578f(0x215)],_0x2c483a['SkewY'],_0x2c483a[_0x98578f(0x55f)],_0x2c483a['EasingType']);if(_0x51dfd9)_0x1545d0[_0x98578f(0x363)](_0x98578f(0x600));}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x6f8),_0x5f0c04=>{const _0xf695c0=_0x2832c8;if(!SceneManager[_0xf695c0(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0xf695c0(0x1ca)](_0x5f0c04,_0x5f0c04);const _0x51825a=$gameTemp[_0xf695c0(0x642)](),_0x5d26ed=_0x5f0c04[_0xf695c0(0x6f2)];if(!_0x51825a)return;$gameScreen[_0xf695c0(0x68c)](0x0,0x0,_0x5f0c04[_0xf695c0(0x55f)],_0x5f0c04[_0xf695c0(0x7b8)]);if(_0x5d26ed)_0x51825a[_0xf695c0(0x363)](_0xf695c0(0x600));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Skew_WaitForSkew',_0xdeb677=>{const _0x5ca808=_0x2832c8;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x5ca808(0x776)])return;const _0x4c13f1=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4c13f1)return;_0x4c13f1['setWaitMode'](_0x5ca808(0x600));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x482),_0x177aa6=>{const _0x4f6c45=_0x2832c8;if(!SceneManager[_0x4f6c45(0x230)]())return;VisuMZ['ConvertParams'](_0x177aa6,_0x177aa6);const _0x1d1b6f=$gameTemp[_0x4f6c45(0x642)](),_0x13f8f5=_0x177aa6[_0x4f6c45(0x2e9)],_0x12b410=_0x177aa6[_0x4f6c45(0x19d)];if(!_0x1d1b6f)return;BattleManager[_0x4f6c45(0x5ad)]=_0x13f8f5,BattleManager['_target']=BattleManager[_0x4f6c45(0x5ca)]?BattleManager[_0x4f6c45(0x5ca)][BattleManager['_targetIndex']]||null:null,BattleManager[_0x4f6c45(0x8ce)]&&_0x12b410[_0x4f6c45(0x716)]()[_0x4f6c45(0x757)]()!==_0x4f6c45(0x197)&&_0x1d1b6f[_0x4f6c45(0x451)]([_0x12b410]);}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x2d1),_0x874a8d=>{const _0x188aaa=_0x2832c8;if(!SceneManager[_0x188aaa(0x230)]())return;VisuMZ[_0x188aaa(0x1ca)](_0x874a8d,_0x874a8d);const _0x3c3def=$gameTemp[_0x188aaa(0x642)](),_0x1a82ca=_0x874a8d[_0x188aaa(0x19d)];if(!_0x3c3def)return;BattleManager[_0x188aaa(0x5ad)]++,BattleManager[_0x188aaa(0x8ce)]=BattleManager['_allTargets'][BattleManager[_0x188aaa(0x5ad)]]||null,BattleManager['_target']&&_0x1a82ca[_0x188aaa(0x716)]()['trim']()!==_0x188aaa(0x197)&&_0x3c3def[_0x188aaa(0x451)]([_0x1a82ca]);}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x7ac),_0x2bdff0=>{const _0x1ce725=_0x2832c8;if(!SceneManager[_0x1ce725(0x230)]())return;VisuMZ[_0x1ce725(0x1ca)](_0x2bdff0,_0x2bdff0);const _0x73f46e=$gameTemp[_0x1ce725(0x642)](),_0x3b4eaf=_0x2bdff0[_0x1ce725(0x19d)];if(!_0x73f46e)return;BattleManager[_0x1ce725(0x5ad)]--,BattleManager['_target']=BattleManager['_allTargets'][BattleManager[_0x1ce725(0x5ad)]]||null,BattleManager['_target']&&_0x3b4eaf['toUpperCase']()[_0x1ce725(0x757)]()!=='UNTITLED'&&_0x73f46e[_0x1ce725(0x451)]([_0x3b4eaf]);}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x27d),_0x2b684c=>{const _0x5ad64d=_0x2832c8;if(!SceneManager[_0x5ad64d(0x230)]())return;VisuMZ[_0x5ad64d(0x1ca)](_0x2b684c,_0x2b684c);const _0x1b4995=$gameTemp[_0x5ad64d(0x642)](),_0x8d7b1e=_0x2b684c[_0x5ad64d(0x2cf)],_0x174173=_0x2b684c[_0x5ad64d(0x19d)];if(!_0x1b4995)return;const _0x47223d=BattleManager['_targetIndex'];for(;;){BattleManager[_0x5ad64d(0x5ad)]=Math['randomInt'](BattleManager[_0x5ad64d(0x5ca)][_0x5ad64d(0x720)]);if(!_0x8d7b1e)break;if(BattleManager['_targetIndex']!==_0x47223d)break;if(BattleManager[_0x5ad64d(0x5ca)][_0x5ad64d(0x720)]<=0x1){BattleManager['_targetIndex']=0x0;break;}}BattleManager[_0x5ad64d(0x8ce)]=BattleManager[_0x5ad64d(0x5ca)][BattleManager[_0x5ad64d(0x5ad)]]||null,BattleManager[_0x5ad64d(0x8ce)]&&_0x174173[_0x5ad64d(0x716)]()[_0x5ad64d(0x757)]()!=='UNTITLED'&&_0x1b4995[_0x5ad64d(0x451)]([_0x174173]);}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x4cf),_0x577928=>{const _0x8aa6a=_0x2832c8;if(!SceneManager[_0x8aa6a(0x230)]())return;VisuMZ[_0x8aa6a(0x1ca)](_0x577928,_0x577928);const _0x453966=VisuMZ[_0x8aa6a(0x84c)](_0x577928['Targets']);for(const _0x59c633 of _0x453966){if(!_0x59c633)continue;if(!_0x59c633[_0x8aa6a(0x44c)]())continue;_0x59c633[_0x8aa6a(0x6d1)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x2832c8(0x476),_0x401aec=>{const _0x2ebcef=_0x2832c8;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x401aec,_0x401aec);const _0x252317=$gameTemp[_0x2ebcef(0x642)]();let _0x5e2dfd=![];const _0x4a5fb8=_0x401aec[_0x2ebcef(0x19d)],_0x4e66d0=VisuMZ[_0x2ebcef(0x84c)](_0x401aec[_0x2ebcef(0x818)]);for(const _0x37d20a of _0x4e66d0){if(!_0x37d20a)continue;if(!_0x37d20a[_0x2ebcef(0x44c)]())continue;_0x37d20a['nextActiveWeaponSlot'](),_0x37d20a[_0x2ebcef(0x285)]()[_0x2ebcef(0x720)]>0x0?_0x5e2dfd=!![]:_0x37d20a['clearActiveWeaponSlot']();}_0x5e2dfd&&_0x4a5fb8[_0x2ebcef(0x716)]()[_0x2ebcef(0x757)]()!==_0x2ebcef(0x197)&&_0x252317['command119']([_0x4a5fb8]);}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],_0x2832c8(0x7a9),_0x4b5622=>{const _0x3583d9=_0x2832c8;if(!SceneManager[_0x3583d9(0x230)]())return;VisuMZ['ConvertParams'](_0x4b5622,_0x4b5622);let _0x912ac4=_0x4b5622[_0x3583d9(0x78a)];_0x912ac4--,_0x912ac4=Math[_0x3583d9(0x871)](_0x912ac4,0x0);const _0x202a9a=VisuMZ['CreateActionSequenceTargets'](_0x4b5622[_0x3583d9(0x818)]);for(const _0x2c2fce of _0x202a9a){if(!_0x2c2fce)continue;if(!_0x2c2fce[_0x3583d9(0x44c)]())continue;_0x2c2fce[_0x3583d9(0x6e9)](_0x912ac4);}}),PluginManager[_0x2832c8(0x894)](pluginData['name'],_0x2832c8(0x1ba),_0x43de12=>{const _0x3f44c8=_0x2832c8;if(!SceneManager[_0x3f44c8(0x230)]())return;if(!Imported[_0x3f44c8(0x776)])return;VisuMZ['ConvertParams'](_0x43de12,_0x43de12);const _0x336d4d=$gameTemp[_0x3f44c8(0x642)](),_0x4ebaba=_0x43de12[_0x3f44c8(0x82c)];if(!_0x336d4d)return;$gameScreen['setBattleZoom'](_0x43de12[_0x3f44c8(0x539)],_0x43de12['Duration'],_0x43de12['EasingType']);if(_0x4ebaba)_0x336d4d[_0x3f44c8(0x363)](_0x3f44c8(0x5e2));}),PluginManager[_0x2832c8(0x894)](pluginData[_0x2832c8(0x6f3)],'ActSeq_Zoom_Reset',_0x34fd33=>{const _0x5f2f27=_0x2832c8;if(!SceneManager[_0x5f2f27(0x230)]())return;if(!Imported[_0x5f2f27(0x776)])return;VisuMZ[_0x5f2f27(0x1ca)](_0x34fd33,_0x34fd33);const _0x5b4bb1=$gameTemp[_0x5f2f27(0x642)](),_0x2fe793=_0x34fd33['WaitForZoom'];if(!_0x5b4bb1)return;$gameScreen['setBattleZoom'](0x1,_0x34fd33[_0x5f2f27(0x55f)],_0x34fd33[_0x5f2f27(0x7b8)]);if(_0x2fe793)_0x5b4bb1[_0x5f2f27(0x363)](_0x5f2f27(0x5e2));}),PluginManager['registerCommand'](pluginData[_0x2832c8(0x6f3)],'ActSeq_Zoom_WaitForZoom',_0x2e7d7e=>{const _0x1daf7e=_0x2832c8;if(!SceneManager[_0x1daf7e(0x230)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x5b9dd8=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x5b9dd8)return;_0x5b9dd8[_0x1daf7e(0x363)](_0x1daf7e(0x5e2));}),VisuMZ['BattleCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x2832c8(0x749)][_0x2832c8(0x411)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x2f0aa9=_0x2832c8;this[_0x2f0aa9(0x400)](),this[_0x2f0aa9(0x664)](),this['process_VisuMZ_BattleCore_DamageStyles'](),this[_0x2f0aa9(0x543)](),VisuMZ[_0x2f0aa9(0x282)]['Scene_Boot_onDatabaseLoaded'][_0x2f0aa9(0x3c8)](this),this[_0x2f0aa9(0x21e)](),this[_0x2f0aa9(0x885)]();},Scene_Boot[_0x2832c8(0x749)][_0x2832c8(0x21e)]=function(){const _0x4bf9ce=_0x2832c8;if(VisuMZ['ParseAllNotetags'])return;this[_0x4bf9ce(0x1d4)](),this[_0x4bf9ce(0x50f)](),this[_0x4bf9ce(0x477)]();},Scene_Boot[_0x2832c8(0x749)][_0x2832c8(0x400)]=function(){const _0x410bd9=_0x2832c8,_0x51307e=$dataSystem['weaponTypes'][_0x410bd9(0x720)];for(let _0xe7d01a=0x0;_0xe7d01a<_0x51307e;_0xe7d01a++){const _0x373e5e=$dataSystem[_0x410bd9(0x62b)][_0xe7d01a];if(_0x373e5e)continue;$dataSystem[_0x410bd9(0x62b)][_0xe7d01a]=JsonEx['makeDeepCopy']($dataSystem[_0x410bd9(0x62b)][0x0]);}},Scene_Boot[_0x2832c8(0x749)][_0x2832c8(0x664)]=function(){const _0x2e1892=_0x2832c8,_0x2f15a8=VisuMZ[_0x2e1892(0x282)][_0x2e1892(0x6e8)];_0x2f15a8[_0x2e1892(0x3fc)][_0x2e1892(0x494)]===undefined&&(_0x2f15a8['Damage'][_0x2e1892(0x494)]='base'),_0x2f15a8[_0x2e1892(0x40e)]['SmoothImage']===undefined&&(_0x2f15a8['Actor'][_0x2e1892(0x547)]=![]),_0x2f15a8[_0x2e1892(0x690)]['SmoothImage']===undefined&&(_0x2f15a8[_0x2e1892(0x690)][_0x2e1892(0x547)]=!![]),_0x2f15a8[_0x2e1892(0x40e)][_0x2e1892(0x6d3)]===undefined&&(_0x2f15a8[_0x2e1892(0x40e)][_0x2e1892(0x6d3)]=![]),_0x2f15a8[_0x2e1892(0x40e)][_0x2e1892(0x76c)]===undefined&&(_0x2f15a8[_0x2e1892(0x40e)][_0x2e1892(0x76c)]=!![]);},VisuMZ[_0x2832c8(0x820)]={},Scene_Boot[_0x2832c8(0x749)][_0x2832c8(0x2a9)]=function(){const _0x596894=_0x2832c8;for(const _0xc48be3 of VisuMZ[_0x596894(0x282)][_0x596894(0x6e8)]['Damage'][_0x596894(0x2c1)]){if(!_0xc48be3)continue;const _0x354c19=_0xc48be3[_0x596894(0x29e)]['toUpperCase']()[_0x596894(0x757)]();VisuMZ[_0x596894(0x820)][_0x354c19]=_0xc48be3;}},VisuMZ['BattleCore'][_0x2832c8(0x86f)]={},Scene_Boot[_0x2832c8(0x749)]['process_VisuMZ_BattleCore_CreateRegExp']=function(){const _0x182d98=_0x2832c8,_0x4d3b17=VisuMZ[_0x182d98(0x282)][_0x182d98(0x86f)],_0x17ffb6=_0x182d98(0x7e5),_0x1d1fa0=[[_0x182d98(0x3e9),_0x182d98(0x4c1)],[_0x182d98(0x862),'POST-']],_0x17114e=[[_0x182d98(0x7ab),_0x182d98(0x51c)],['%1Damage%2JS','JS\x20%1DAMAGE\x20%2']],_0x4f334c=[['',''],[_0x182d98(0x39b),_0x182d98(0x84d)],['AsTarget',_0x182d98(0x251)]];for(const _0x43cab4 of _0x17114e){for(const _0x58b308 of _0x4f334c){for(const _0x2e2d46 of _0x1d1fa0){const _0x2d365c=_0x43cab4[0x0][_0x182d98(0x668)](_0x2e2d46[0x0],_0x58b308[0x0]),_0x11aa54=_0x43cab4[0x1][_0x182d98(0x668)](_0x2e2d46[0x1],_0x58b308[0x1])[_0x182d98(0x757)](),_0x5b30e7=new RegExp(_0x17ffb6[_0x182d98(0x668)](_0x11aa54),'i');_0x4d3b17[_0x2d365c]=_0x5b30e7;}}}const _0x2fa1f6=[['%1StartActionJS',_0x182d98(0x7e2)],[_0x182d98(0x434),_0x182d98(0x253)]];for(const _0x3fb768 of _0x2fa1f6){for(const _0x42c7d0 of _0x1d1fa0){const _0x2859a2=_0x3fb768[0x0][_0x182d98(0x668)](_0x42c7d0[0x0]),_0x5b8900=_0x3fb768[0x1][_0x182d98(0x668)](_0x42c7d0[0x1]),_0x2f5e59=new RegExp(_0x17ffb6[_0x182d98(0x668)](_0x5b8900),'i');_0x4d3b17[_0x2859a2]=_0x2f5e59;}}const _0x51f579=[['%1StartBattleJS',_0x182d98(0x5f1)],[_0x182d98(0x1ab),'JS\x20%1END\x20BATTLE'],['BattleVictoryJS','JS\x20BATTLE\x20VICTORY'],[_0x182d98(0x8d0),'JS\x20BATTLE\x20DEFEAT'],[_0x182d98(0x8bc),'JS\x20ESCAPE\x20SUCCESS'],[_0x182d98(0x7bf),_0x182d98(0x71f)],['%1StartTurnJS',_0x182d98(0x187)],[_0x182d98(0x603),_0x182d98(0x3c7)],['%1RegenerateJS',_0x182d98(0x75d)]];for(const _0x1e0044 of _0x51f579){for(const _0x19c721 of _0x1d1fa0){const _0x32c505=_0x1e0044[0x0][_0x182d98(0x668)](_0x19c721[0x0]),_0x3e3b03=_0x1e0044[0x1][_0x182d98(0x668)](_0x19c721[0x1]),_0x43a416=new RegExp(_0x17ffb6[_0x182d98(0x668)](_0x3e3b03),'i');_0x4d3b17[_0x32c505]=_0x43a416;}}},Scene_Boot['prototype'][_0x2832c8(0x1d4)]=function(){const _0x35beeb=_0x2832c8,_0x3de39b=$dataSkills[_0x35beeb(0x2df)]($dataItems);for(const _0x885c4d of _0x3de39b){if(!_0x885c4d)continue;VisuMZ['BattleCore'][_0x35beeb(0x589)](_0x885c4d);}},Scene_Boot['prototype'][_0x2832c8(0x50f)]=function(){const _0x421d47=_0x2832c8,_0x40e396=$dataActors[_0x421d47(0x2df)]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x10e0c5 of _0x40e396){if(!_0x10e0c5)continue;VisuMZ['BattleCore']['Parse_Notetags_TraitObjects'](_0x10e0c5);}},Scene_Boot['prototype'][_0x2832c8(0x885)]=function(){const _0x176b95=_0x2832c8,_0xc96f3d=VisuMZ[_0x176b95(0x282)][_0x176b95(0x6e8)]['Mechanics']['BaseTroopIDs'],_0xe15784=[];for(const _0x10170d of _0xc96f3d){const _0x8f1651=$dataTroops[_0x10170d];if(_0x8f1651)_0xe15784[_0x176b95(0x7d2)](JsonEx[_0x176b95(0x1ef)](_0x8f1651));}for(const _0x3c2edc of $dataTroops){if(!_0x3c2edc)continue;for(const _0x40e1ef of _0xe15784){if(_0x40e1ef['id']===_0x3c2edc['id'])continue;_0x3c2edc[_0x176b95(0x491)]=_0x3c2edc['pages'][_0x176b95(0x2df)](_0x40e1ef['pages']);}}},Scene_Boot[_0x2832c8(0x749)]['process_VisuMZ_BattleCore_jsFunctions']=function(){const _0x1b4411=_0x2832c8,_0x4dcf38=$dataSkills[_0x1b4411(0x2df)]($dataItems);for(const _0x2d1e6e of _0x4dcf38){if(!_0x2d1e6e)continue;VisuMZ[_0x1b4411(0x282)][_0x1b4411(0x5e3)](_0x2d1e6e);}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x48f)]=VisuMZ[_0x2832c8(0x48f)],VisuMZ[_0x2832c8(0x48f)]=function(_0x5a94fb){const _0x348f4f=_0x2832c8;VisuMZ[_0x348f4f(0x282)][_0x348f4f(0x48f)]&&VisuMZ[_0x348f4f(0x282)][_0x348f4f(0x48f)][_0x348f4f(0x3c8)](this,_0x5a94fb),VisuMZ[_0x348f4f(0x282)]['Parse_Notetags_TraitObjects'](_0x5a94fb);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x854)]=VisuMZ[_0x2832c8(0x854)],VisuMZ[_0x2832c8(0x854)]=function(_0x288a74){const _0x1b0823=_0x2832c8;VisuMZ['BattleCore'][_0x1b0823(0x854)]&&VisuMZ[_0x1b0823(0x282)][_0x1b0823(0x854)][_0x1b0823(0x3c8)](this,_0x288a74),VisuMZ[_0x1b0823(0x282)][_0x1b0823(0x754)](_0x288a74);},VisuMZ[_0x2832c8(0x282)]['ParseSkillNotetags']=VisuMZ[_0x2832c8(0x89d)],VisuMZ[_0x2832c8(0x89d)]=function(_0x3a6a89){const _0x404929=_0x2832c8;VisuMZ[_0x404929(0x282)]['ParseSkillNotetags']&&VisuMZ[_0x404929(0x282)]['ParseSkillNotetags'][_0x404929(0x3c8)](this,_0x3a6a89),VisuMZ[_0x404929(0x282)][_0x404929(0x589)](_0x3a6a89),VisuMZ['BattleCore'][_0x404929(0x5e3)](_0x3a6a89);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x2bb)]=VisuMZ[_0x2832c8(0x2bb)],VisuMZ[_0x2832c8(0x2bb)]=function(_0x47431b){const _0x3fc711=_0x2832c8;VisuMZ[_0x3fc711(0x282)][_0x3fc711(0x2bb)]&&VisuMZ[_0x3fc711(0x282)][_0x3fc711(0x2bb)]['call'](this,_0x47431b),VisuMZ['BattleCore']['Parse_Notetags_Action'](_0x47431b),VisuMZ[_0x3fc711(0x282)]['Parse_Notetags_Targets'](_0x47431b);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x2d8)]=VisuMZ[_0x2832c8(0x2d8)],VisuMZ[_0x2832c8(0x2d8)]=function(_0x3b5294){const _0x8b00fe=_0x2832c8;VisuMZ[_0x8b00fe(0x282)]['ParseWeaponNotetags']&&VisuMZ[_0x8b00fe(0x282)][_0x8b00fe(0x2d8)]['call'](this,_0x3b5294),VisuMZ[_0x8b00fe(0x282)][_0x8b00fe(0x754)](_0x3b5294);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x775)]=VisuMZ[_0x2832c8(0x775)],VisuMZ['ParseArmorNotetags']=function(_0x50fda7){const _0x153736=_0x2832c8;VisuMZ['BattleCore'][_0x153736(0x775)]&&VisuMZ['BattleCore']['ParseArmorNotetags']['call'](this,_0x50fda7),VisuMZ[_0x153736(0x282)][_0x153736(0x754)](_0x50fda7);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x656)]=VisuMZ[_0x2832c8(0x656)],VisuMZ[_0x2832c8(0x656)]=function(_0x2f3edc){const _0x320c7e=_0x2832c8;VisuMZ['BattleCore'][_0x320c7e(0x656)]&&VisuMZ['BattleCore']['ParseEnemyNotetags'][_0x320c7e(0x3c8)](this,_0x2f3edc),VisuMZ['BattleCore']['Parse_Notetags_TraitObjects'](_0x2f3edc);},VisuMZ['BattleCore']['ParseStateNotetags']=VisuMZ[_0x2832c8(0x287)],VisuMZ[_0x2832c8(0x287)]=function(_0x38c310){const _0x3a55fa=_0x2832c8;VisuMZ[_0x3a55fa(0x282)]['ParseStateNotetags']&&VisuMZ[_0x3a55fa(0x282)][_0x3a55fa(0x287)][_0x3a55fa(0x3c8)](this,_0x38c310),VisuMZ[_0x3a55fa(0x282)][_0x3a55fa(0x754)](_0x38c310);},VisuMZ['BattleCore'][_0x2832c8(0x589)]=function(_0x396323){const _0x5b141c=_0x2832c8,_0x313831=[_0x5b141c(0x528),'PostApplyJS',_0x5b141c(0x7d1),_0x5b141c(0x8c6),'PreStartActionJS','PostStartActionJS',_0x5b141c(0x861),_0x5b141c(0x492)];for(const _0x439ab9 of _0x313831){VisuMZ['BattleCore']['createJS'](_0x396323,_0x439ab9);}const _0x3ad212=_0x396323['note'];_0x3ad212[_0x5b141c(0x6f0)](/<ALWAYS CRITICAL/i)&&(_0x396323[_0x5b141c(0x817)][_0x5b141c(0x8e4)]=!![]),_0x3ad212[_0x5b141c(0x6f0)](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x396323[_0x5b141c(0x2a0)]=Math[_0x5b141c(0x871)](0x1,Number(RegExp['$1']))),_0x3ad212['match'](/<TARGET:[ ](.*)>/i)&&(_0x396323[_0x5b141c(0x299)]=String(RegExp['$1'])['toUpperCase']()[_0x5b141c(0x757)]());},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x754)]=function(_0x2cfbca){const _0x36251b=_0x2832c8,_0x1a69f7=['PreApplyAsUserJS',_0x36251b(0x837),'PreDamageAsUserJS',_0x36251b(0x54d),_0x36251b(0x2ad),'PostApplyAsTargetJS',_0x36251b(0x37e),'PostDamageAsTargetJS',_0x36251b(0x592),'PostStartActionJS',_0x36251b(0x861),_0x36251b(0x492),_0x36251b(0x725),_0x36251b(0x57b),_0x36251b(0x2ba),'PostEndBattleJS',_0x36251b(0x35d),'BattleDefeatJS',_0x36251b(0x8bc),_0x36251b(0x7bf),_0x36251b(0x849),_0x36251b(0x842),_0x36251b(0x1b7),_0x36251b(0x615),_0x36251b(0x56d),_0x36251b(0x525)];for(const _0x2ef902 of _0x1a69f7){VisuMZ[_0x36251b(0x282)][_0x36251b(0x63c)](_0x2cfbca,_0x2ef902);}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x5e3)]=function(_0x3dbc53){const _0x2dca82=_0x2832c8,_0x492298=_0x3dbc53[_0x2dca82(0x75e)];if(_0x492298[_0x2dca82(0x6f0)](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x5b20a1=String(RegExp['$1']),_0x527bfd=VisuMZ[_0x2dca82(0x282)][_0x2dca82(0x899)](_0x3dbc53,_0x2dca82(0x818));VisuMZ[_0x2dca82(0x282)]['createTargetsJS'](_0x5b20a1,_0x527bfd);}if(_0x492298['match'](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x39fbec=String(RegExp['$1']),_0x1f66fa=VisuMZ[_0x2dca82(0x282)][_0x2dca82(0x899)](_0x3dbc53,_0x2dca82(0x248));VisuMZ[_0x2dca82(0x282)]['createCommandVisibleJS'](_0x39fbec,_0x1f66fa);}},VisuMZ[_0x2832c8(0x282)]['JS']={},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x63c)]=function(_0x7e1089,_0x375eac){const _0x43c277=_0x2832c8,_0x403f72=_0x7e1089['note'];if(_0x403f72['match'](VisuMZ[_0x43c277(0x282)][_0x43c277(0x86f)][_0x375eac])){const _0x4dd072=RegExp['$1'],_0x4679e0=_0x43c277(0x50e)[_0x43c277(0x668)](_0x4dd072),_0x5ee3dd=VisuMZ[_0x43c277(0x282)][_0x43c277(0x899)](_0x7e1089,_0x375eac);VisuMZ['BattleCore']['JS'][_0x5ee3dd]=new Function(_0x4679e0);}},VisuMZ['BattleCore']['createKeyJS']=function(_0x3e65c4,_0x4e29f3){const _0x52e4d3=_0x2832c8;let _0x8b30d9='';if($dataActors['includes'](_0x3e65c4))_0x8b30d9='Actor-%1-%2'['format'](_0x3e65c4['id'],_0x4e29f3);if($dataClasses[_0x52e4d3(0x569)](_0x3e65c4))_0x8b30d9=_0x52e4d3(0x2fe)[_0x52e4d3(0x668)](_0x3e65c4['id'],_0x4e29f3);if($dataSkills[_0x52e4d3(0x569)](_0x3e65c4))_0x8b30d9='Skill-%1-%2'[_0x52e4d3(0x668)](_0x3e65c4['id'],_0x4e29f3);if($dataItems[_0x52e4d3(0x569)](_0x3e65c4))_0x8b30d9='Item-%1-%2'[_0x52e4d3(0x668)](_0x3e65c4['id'],_0x4e29f3);if($dataWeapons[_0x52e4d3(0x569)](_0x3e65c4))_0x8b30d9='Weapon-%1-%2'[_0x52e4d3(0x668)](_0x3e65c4['id'],_0x4e29f3);if($dataArmors['includes'](_0x3e65c4))_0x8b30d9=_0x52e4d3(0x4d4)['format'](_0x3e65c4['id'],_0x4e29f3);if($dataEnemies['includes'](_0x3e65c4))_0x8b30d9=_0x52e4d3(0x24d)['format'](_0x3e65c4['id'],_0x4e29f3);if($dataStates['includes'](_0x3e65c4))_0x8b30d9=_0x52e4d3(0x5b3)[_0x52e4d3(0x668)](_0x3e65c4['id'],_0x4e29f3);return _0x8b30d9;},VisuMZ['BattleCore'][_0x2832c8(0x388)]=function(_0x298b5b,_0x399330){const _0x51e8b1=_0x2832c8,_0x3ecdbd=_0x51e8b1(0x2dc)[_0x51e8b1(0x668)](_0x298b5b);VisuMZ[_0x51e8b1(0x282)]['JS'][_0x399330]=new Function(_0x3ecdbd);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x24e)]=function(_0x10f02d,_0x495684){const _0x1a0a18=_0x2832c8,_0x4c9f91=_0x1a0a18(0x258)[_0x1a0a18(0x668)](_0x10f02d);VisuMZ[_0x1a0a18(0x282)]['JS'][_0x495684]=new Function(_0x4c9f91);},TextManager[_0x2832c8(0x343)]=VisuMZ['BattleCore'][_0x2832c8(0x6e8)][_0x2832c8(0x45d)][_0x2832c8(0x530)],TextManager[_0x2832c8(0x48a)]=VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x6e8)][_0x2832c8(0x774)][_0x2832c8(0x2d7)],TextManager[_0x2832c8(0x663)]=VisuMZ['BattleCore'][_0x2832c8(0x6e8)][_0x2832c8(0x774)]['StyleName'],TextManager[_0x2832c8(0x6f9)]=VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x6e8)][_0x2832c8(0x446)][_0x2832c8(0x29e)],ColorManager[_0x2832c8(0x799)]=function(_0xd87740){const _0x4822ea=_0x2832c8;return _0xd87740=String(_0xd87740),_0xd87740[_0x4822ea(0x6f0)](/#(.*)/i)?_0x4822ea(0x245)[_0x4822ea(0x668)](String(RegExp['$1'])):this[_0x4822ea(0x2ca)](Number(_0xd87740));},DataManager[_0x2832c8(0x62d)]=function(_0x4f8e4f){const _0x1266ce=_0x2832c8;if(_0x4f8e4f[_0x1266ce(0x75e)][_0x1266ce(0x6f0)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x3a3734=String(RegExp['$1'])[_0x1266ce(0x716)]()[_0x1266ce(0x757)]();if(_0x3a3734===_0x1266ce(0x1c8))return'MANUAL';if(VisuMZ[_0x1266ce(0x820)][_0x3a3734])return _0x3a3734;}const _0x110f9d=VisuMZ[_0x1266ce(0x282)][_0x1266ce(0x6e8)]['Damage'][_0x1266ce(0x407)][_0x1266ce(0x716)]()[_0x1266ce(0x757)]();if(VisuMZ[_0x1266ce(0x820)][_0x110f9d])return _0x110f9d;return _0x1266ce(0x1c8);},DataManager['getStypeIdWithName']=function(_0x463a12){const _0x1f895d=_0x2832c8;_0x463a12=_0x463a12[_0x1f895d(0x716)]()[_0x1f895d(0x757)](),this[_0x1f895d(0x5c6)]=this[_0x1f895d(0x5c6)]||{};if(this[_0x1f895d(0x5c6)][_0x463a12])return this[_0x1f895d(0x5c6)][_0x463a12];for(let _0xebe7fb=0x1;_0xebe7fb<0x64;_0xebe7fb++){if(!$dataSystem['skillTypes'][_0xebe7fb])continue;let _0x25898f=$dataSystem[_0x1f895d(0x6a7)][_0xebe7fb][_0x1f895d(0x716)]()[_0x1f895d(0x757)]();_0x25898f=_0x25898f[_0x1f895d(0x676)](/\x1I\[(\d+)\]/gi,''),_0x25898f=_0x25898f[_0x1f895d(0x676)](/\\I\[(\d+)\]/gi,''),this[_0x1f895d(0x5c6)][_0x25898f]=_0xebe7fb;}return this[_0x1f895d(0x5c6)][_0x463a12]||0x0;},DataManager[_0x2832c8(0x7d8)]=function(_0x1f875a){const _0x265f7a=_0x2832c8;_0x1f875a=_0x1f875a['toUpperCase']()[_0x265f7a(0x757)](),this[_0x265f7a(0x316)]=this[_0x265f7a(0x316)]||{};if(this[_0x265f7a(0x316)][_0x1f875a])return this[_0x265f7a(0x316)][_0x1f875a];for(const _0x3a6ede of $dataSkills){if(!_0x3a6ede)continue;this['_skillIDs'][_0x3a6ede[_0x265f7a(0x6f3)][_0x265f7a(0x716)]()[_0x265f7a(0x757)]()]=_0x3a6ede['id'];}return this['_skillIDs'][_0x1f875a]||0x0;},DataManager[_0x2832c8(0x6e0)]=function(_0x2e440b){const _0x4995ad=_0x2832c8;_0x2e440b=_0x2e440b[_0x4995ad(0x716)]()[_0x4995ad(0x757)](),this[_0x4995ad(0x3fe)]=this[_0x4995ad(0x3fe)]||{};if(this['_enemyIDs'][_0x2e440b])return this['_enemyIDs'][_0x2e440b];for(const _0x4b5034 of $dataEnemies){if(!_0x4b5034)continue;this[_0x4995ad(0x3fe)][_0x4b5034[_0x4995ad(0x6f3)][_0x4995ad(0x716)]()[_0x4995ad(0x757)]()]=_0x4b5034['id'];}return this[_0x4995ad(0x3fe)][_0x2e440b]||0x0;},DataManager[_0x2832c8(0x2d4)]=function(_0xc0672){const _0x1e465b=_0x2832c8;_0xc0672=_0xc0672[_0x1e465b(0x716)]()[_0x1e465b(0x757)](),this[_0x1e465b(0x788)]=this[_0x1e465b(0x788)]||{};if(this[_0x1e465b(0x788)][_0xc0672])return this[_0x1e465b(0x788)][_0xc0672];for(let _0x2611e2=0x1;_0x2611e2<0x64;_0x2611e2++){if(!$dataSystem[_0x1e465b(0x465)][_0x2611e2])continue;let _0x1f6522=$dataSystem[_0x1e465b(0x465)][_0x2611e2]['toUpperCase']()[_0x1e465b(0x757)]();_0x1f6522=_0x1f6522['replace'](/\x1I\[(\d+)\]/gi,''),_0x1f6522=_0x1f6522[_0x1e465b(0x676)](/\\I\[(\d+)\]/gi,''),this[_0x1e465b(0x788)][_0x1f6522]=_0x2611e2;}return this[_0x1e465b(0x788)][_0x1e465b(0x567)]=0x0,this[_0x1e465b(0x788)][_0xc0672]||0x0;},DataManager[_0x2832c8(0x6af)]=function(_0x2a8abc){const _0x52eb24=_0x2832c8,_0x2a329a=_0x52eb24(0x84f);let _0x31ddab=_0x2a8abc[_0x52eb24(0x291)],_0x51ade5=_0x2a8abc[_0x52eb24(0x6f3)];const _0x396009=_0x2a8abc[_0x52eb24(0x75e)];return _0x396009[_0x52eb24(0x6f0)](/<DISPLAY ICON: (\d+)>/i)&&(_0x31ddab=Number(RegExp['$1'])),_0x396009[_0x52eb24(0x6f0)](/<DISPLAY TEXT: (.*)>/i)&&(_0x51ade5=String(RegExp['$1'])),_0x2a329a['format'](_0x31ddab,_0x51ade5);},DataManager['battleCommandName']=function(_0x4da935){const _0x5b25ae=_0x2832c8;return _0x4da935['note'][_0x5b25ae(0x6f0)](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x4da935[_0x5b25ae(0x6f3)];},DataManager[_0x2832c8(0x243)]=function(_0x1dba60){const _0x1e500a=_0x2832c8;return _0x1dba60['note'][_0x1e500a(0x6f0)](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x1dba60['iconIndex'];},DataManager[_0x2832c8(0x5a2)]=function(_0x25166e){const _0x488caf=_0x2832c8,_0x54ab8f=$dataEnemies[_0x25166e];if(_0x54ab8f){if(_0x54ab8f[_0x488caf(0x75e)][_0x488caf(0x6f0)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x344ece=String(RegExp['$1'])[_0x488caf(0x5e1)](/[\r\n]+/)[_0x488caf(0x19a)](''),_0x335a3b=this[_0x488caf(0x5bb)](_0x344ece);_0x25166e=this[_0x488caf(0x6e0)](_0x335a3b)||_0x25166e,_0x25166e=DataManager[_0x488caf(0x5a2)](_0x25166e);}}return _0x25166e;},DataManager[_0x2832c8(0x5bb)]=function(_0x1d001f){const _0x2e8d47=_0x2832c8;let _0xaf450e=0x0;const _0x2e599b={};for(const _0x566692 of _0x1d001f){if(_0x566692[_0x2e8d47(0x6f0)](/(.*):[ ](\d+)/i)){const _0x367215=String(RegExp['$1'])['trim'](),_0x44fc1c=Number(RegExp['$2']);_0x2e599b[_0x367215]=_0x44fc1c,_0xaf450e+=_0x44fc1c;}else{if(_0x566692[_0x2e8d47(0x6f0)](/(.*):[ ](\d+\.?\d+)/i)){const _0x490932=String(RegExp['$1'])[_0x2e8d47(0x757)](),_0x341316=Number(RegExp['$2']);_0x2e599b[_0x490932]=_0x341316,_0xaf450e+=_0x341316;}else _0x566692!==''&&(_0x2e599b[_0x566692]=0x1,_0xaf450e++);}}if(_0xaf450e<=0x0)return'';let _0x48f2f9=Math['random']()*_0xaf450e;for(const _0x20d748 in _0x2e599b){_0x48f2f9-=_0x2e599b[_0x20d748];if(_0x48f2f9<=0x0)return _0x20d748;}return'';},DataManager[_0x2832c8(0x828)]=function(_0xcf0b66){const _0x561f92=_0x2832c8;if(!_0xcf0b66)return![];if(!VisuMZ[_0x561f92(0x282)][_0x561f92(0x6e8)][_0x561f92(0x5e4)][_0x561f92(0x255)])return![];if(_0xcf0b66[_0x561f92(0x75e)][_0x561f92(0x6f0)](/<AUTO ACTION SEQUENCE>/i))return![];for(const _0x24136b of _0xcf0b66['effects']){if(!_0x24136b)continue;if(_0x24136b[_0x561f92(0x49c)]===Game_Action[_0x561f92(0x189)])return!![];}return![];},ConfigManager[_0x2832c8(0x623)]=![],ConfigManager['autoBattleUseSkills']=![],ConfigManager[_0x2832c8(0x6f9)]=!![],VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x4bd)]=ConfigManager[_0x2832c8(0x740)],ConfigManager['makeData']=function(){const _0x33a4e6=_0x2832c8,_0x27bcc1=VisuMZ[_0x33a4e6(0x282)][_0x33a4e6(0x4bd)][_0x33a4e6(0x3c8)](this);return _0x27bcc1[_0x33a4e6(0x623)]=this[_0x33a4e6(0x623)],_0x27bcc1['autoBattleUseSkills']=this['autoBattleUseSkills'],_0x27bcc1[_0x33a4e6(0x6f9)]=this[_0x33a4e6(0x6f9)],_0x27bcc1;},VisuMZ[_0x2832c8(0x282)]['ConfigManager_applyData']=ConfigManager[_0x2832c8(0x5a1)],ConfigManager[_0x2832c8(0x5a1)]=function(_0x366905){const _0x309df7=_0x2832c8;VisuMZ['BattleCore']['ConfigManager_applyData'][_0x309df7(0x3c8)](this,_0x366905),'autoBattleAtStart'in _0x366905?this[_0x309df7(0x623)]=_0x366905[_0x309df7(0x623)]:this[_0x309df7(0x623)]=![],'autoBattleUseSkills'in _0x366905?this[_0x309df7(0x489)]=_0x366905[_0x309df7(0x489)]:this['autoBattleUseSkills']=![],_0x309df7(0x6f9)in _0x366905?this['visualHpGauge']=_0x366905[_0x309df7(0x6f9)]:this[_0x309df7(0x6f9)]=!![];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x1af)]=BattleManager[_0x2832c8(0x459)],BattleManager[_0x2832c8(0x459)]=function(){const _0x94e911=_0x2832c8;VisuMZ[_0x94e911(0x282)][_0x94e911(0x1af)]['call'](this),this['_forcedBattlers']=[];},BattleManager[_0x2832c8(0x550)]=function(){const _0x548cba=_0x2832c8;if(!SceneManager[_0x548cba(0x230)]())return;const _0x1f8209=SceneManager[_0x548cba(0x37d)][_0x548cba(0x244)];if(_0x1f8209)_0x1f8209['requestRefresh']();},BattleManager[_0x2832c8(0x8ec)]=function(){const _0x1c50f9=_0x2832c8;if(BattleManager[_0x1c50f9(0x707)]())return _0x1c50f9(0x467);return _0x1c50f9(0x8b5);},BattleManager[_0x2832c8(0x38f)]=function(_0xb82d9){const _0x42208d=_0x2832c8;return _0xb82d9=_0xb82d9[_0x42208d(0x716)]()['trim'](),this[_0x42208d(0x8ec)]()===_0xb82d9;},BattleManager[_0x2832c8(0x3e2)]=function(){const _0x5c7424=_0x2832c8;return this[_0x5c7424(0x38f)]('DTB');},BattleManager[_0x2832c8(0x681)]=function(){return this['isDTB']();},BattleManager[_0x2832c8(0x3b9)]=function(){const _0x512ee8=_0x2832c8;return!this[_0x512ee8(0x681)]();},BattleManager['isTeamBased']=function(){const _0x44b540=_0x2832c8;return!this[_0x44b540(0x681)]()&&!this['isTickBased']();},BattleManager[_0x2832c8(0x8b1)]=function(_0x33e87c){const _0x1feef6=_0x2832c8;$gameParty['processBattleCoreJS'](_0x33e87c),$gameTroop[_0x1feef6(0x8b1)](_0x33e87c);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x637)]=BattleManager[_0x2832c8(0x241)],BattleManager[_0x2832c8(0x241)]=function(){const _0x531958=_0x2832c8;this[_0x531958(0x583)]=![],this[_0x531958(0x7a4)]=ConfigManager[_0x531958(0x623)],this[_0x531958(0x8b1)](_0x531958(0x725)),VisuMZ[_0x531958(0x282)][_0x531958(0x637)]['call'](this),this[_0x531958(0x8b1)](_0x531958(0x57b));},BattleManager[_0x2832c8(0x6b0)]=function(_0x2dcf01){const _0x4b3465=_0x2832c8,_0x30bf61=VisuMZ[_0x4b3465(0x282)]['Settings']['Mechanics'];_0x30bf61[_0x4b3465(0x3a6)]&&VisuMZ[_0x4b3465(0x282)]['CheckMapBattleEventValid'](_0x30bf61[_0x4b3465(0x3a6)])&&$gameTemp[_0x4b3465(0x8bf)](_0x30bf61['BattleEndEvent']);const _0xf322c8=_0x4b3465(0x2fa)[_0x4b3465(0x668)](_0x2dcf01);_0x30bf61[_0xf322c8]&&VisuMZ[_0x4b3465(0x282)][_0x4b3465(0x6d5)](_0x30bf61[_0xf322c8])&&$gameTemp[_0x4b3465(0x8bf)](_0x30bf61[_0xf322c8]);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x290)]=BattleManager['processVictory'],BattleManager['processVictory']=function(){const _0x28a1fb=_0x2832c8;this['processBattleCoreJS'](_0x28a1fb(0x35d)),VisuMZ[_0x28a1fb(0x282)]['BattleManager_processVictory']['call'](this),this['processPostBattleCommonEvents'](_0x28a1fb(0x4fb));},VisuMZ['BattleCore'][_0x2832c8(0x67a)]=BattleManager[_0x2832c8(0x24b)],BattleManager['processDefeat']=function(){const _0xf7e59f=_0x2832c8;this['processBattleCoreJS']('BattleDefeatJS'),VisuMZ[_0xf7e59f(0x282)][_0xf7e59f(0x67a)][_0xf7e59f(0x3c8)](this),this[_0xf7e59f(0x6b0)]('Defeat');},VisuMZ['BattleCore'][_0x2832c8(0x509)]=BattleManager[_0x2832c8(0x8cd)],BattleManager['endBattle']=function(_0x3cc1eb){const _0x45f958=_0x2832c8;this['_endBattle']=!![],this[_0x45f958(0x7a4)]=![],this[_0x45f958(0x8b1)](_0x45f958(0x2ba)),VisuMZ[_0x45f958(0x282)][_0x45f958(0x509)][_0x45f958(0x3c8)](this,_0x3cc1eb),this[_0x45f958(0x8b1)](_0x45f958(0x57e));},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x75a)]=BattleManager[_0x2832c8(0x2bc)],BattleManager[_0x2832c8(0x2bc)]=function(){const _0x116caf=_0x2832c8;if(this[_0x116caf(0x681)]())this[_0x116caf(0x8b1)](_0x116caf(0x849));VisuMZ['BattleCore'][_0x116caf(0x75a)][_0x116caf(0x3c8)](this);if(this['isTurnBased']())this[_0x116caf(0x8b1)](_0x116caf(0x842));},VisuMZ['BattleCore'][_0x2832c8(0x28e)]=BattleManager['startAction'],BattleManager[_0x2832c8(0x6e2)]=function(){const _0x41337b=_0x2832c8,_0x1bba74=this[_0x41337b(0x2c0)]['currentAction']();if(_0x1bba74)_0x1bba74[_0x41337b(0x6e4)](_0x41337b(0x592));VisuMZ[_0x41337b(0x282)][_0x41337b(0x28e)][_0x41337b(0x3c8)](this);if(_0x1bba74)_0x1bba74[_0x41337b(0x6e4)](_0x41337b(0x35b));},VisuMZ['BattleCore'][_0x2832c8(0x5d7)]=BattleManager[_0x2832c8(0x5ed)],BattleManager[_0x2832c8(0x5ed)]=function(){const _0x3dba7f=_0x2832c8,_0x747b44=this[_0x3dba7f(0x555)];_0x747b44&&_0x747b44[_0x3dba7f(0x6e4)](_0x3dba7f(0x861)),VisuMZ[_0x3dba7f(0x282)]['BattleManager_endAction'][_0x3dba7f(0x3c8)](this),_0x747b44&&_0x747b44['actionBattleCoreJS'](_0x3dba7f(0x492)),this[_0x3dba7f(0x38e)](this[_0x3dba7f(0x3ef)]());},BattleManager[_0x2832c8(0x38e)]=function(_0x4fd848){const _0x3244cc=_0x2832c8;for(const _0x29d931 of _0x4fd848){if(!_0x29d931)continue;if(!_0x29d931['battler']())continue;_0x29d931[_0x3244cc(0x5b5)]()[_0x3244cc(0x28f)]();}},BattleManager[_0x2832c8(0x83d)]=function(){const _0x179d7d=_0x2832c8;!this[_0x179d7d(0x866)][_0x179d7d(0x6d6)]()&&this[_0x179d7d(0x5ed)]();},Game_Battler['prototype'][_0x2832c8(0x433)]=function(){const _0x5be2de=_0x2832c8;this[_0x5be2de(0x5e5)](),this[_0x5be2de(0x389)]();},BattleManager[_0x2832c8(0x25c)]=function(){const _0x52d790=_0x2832c8;this['_escapeRatio']=VisuMZ[_0x52d790(0x282)][_0x52d790(0x6e8)][_0x52d790(0x67f)][_0x52d790(0x645)][_0x52d790(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x69d)]=BattleManager[_0x2832c8(0x79b)],BattleManager[_0x2832c8(0x79b)]=function(){const _0x3f2e1e=_0x2832c8;this[_0x3f2e1e(0x8b1)](_0x3f2e1e(0x8bc)),BattleManager[_0x3f2e1e(0x229)][_0x3f2e1e(0x3f3)](),VisuMZ[_0x3f2e1e(0x282)]['BattleManager_onEscapeSuccess'][_0x3f2e1e(0x3c8)](this),this[_0x3f2e1e(0x6b0)](_0x3f2e1e(0x4b8));},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x686)]=BattleManager[_0x2832c8(0x2ed)],BattleManager['onEscapeFailure']=function(){const _0x4a1606=_0x2832c8;this[_0x4a1606(0x8b1)]('EscapeFailureJS');const _0x35df57=this[_0x4a1606(0x5bd)];VisuMZ[_0x4a1606(0x282)][_0x4a1606(0x686)][_0x4a1606(0x3c8)](this),this[_0x4a1606(0x5bd)]=_0x35df57+VisuMZ[_0x4a1606(0x282)][_0x4a1606(0x6e8)][_0x4a1606(0x67f)][_0x4a1606(0x56a)]['call'](this),this[_0x4a1606(0x6b0)](_0x4a1606(0x4b9));},BattleManager[_0x2832c8(0x7ec)]=function(){const _0x5e4888=_0x2832c8;let _0x1e295e=![];if(this[_0x5e4888(0x825)]())for(const _0x2abbd6 of $gameTroop[_0x5e4888(0x66d)]()){this[_0x5e4888(0x866)][_0x5e4888(0x7d2)](_0x5e4888(0x332),TextManager[_0x5e4888(0x7c2)][_0x5e4888(0x668)](_0x2abbd6)),this[_0x5e4888(0x866)][_0x5e4888(0x7d2)](_0x5e4888(0x321)),_0x1e295e=!![];}if(this[_0x5e4888(0x673)])this['_logWindow']['push'](_0x5e4888(0x332),TextManager[_0x5e4888(0x8d5)][_0x5e4888(0x668)]($gameParty[_0x5e4888(0x6f3)]())),this[_0x5e4888(0x866)][_0x5e4888(0x7d2)](_0x5e4888(0x321));else this['_surprise']&&(this[_0x5e4888(0x866)][_0x5e4888(0x7d2)]('addText',TextManager[_0x5e4888(0x853)][_0x5e4888(0x668)]($gameParty[_0x5e4888(0x6f3)]())),this[_0x5e4888(0x866)][_0x5e4888(0x7d2)](_0x5e4888(0x321)));_0x1e295e&&(this[_0x5e4888(0x866)][_0x5e4888(0x7d2)](_0x5e4888(0x321)),this[_0x5e4888(0x866)][_0x5e4888(0x7d2)](_0x5e4888(0x890))),this[_0x5e4888(0x707)]()&&this[_0x5e4888(0x65a)]()&&(this[_0x5e4888(0x2f5)]=![]);},BattleManager[_0x2832c8(0x825)]=function(){const _0x1afdc6=_0x2832c8;if(BattleManager[_0x1afdc6(0x7a4)])return![];return VisuMZ['BattleCore'][_0x1afdc6(0x6e8)][_0x1afdc6(0x690)][_0x1afdc6(0x468)];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x70c)]=BattleManager['startInput'],BattleManager['startInput']=function(){const _0x572d1e=_0x2832c8;VisuMZ[_0x572d1e(0x282)][_0x572d1e(0x70c)]['call'](this),this[_0x572d1e(0x3e2)]()&&this[_0x572d1e(0x65a)]()&&!this[_0x572d1e(0x44b)]&&$gameParty['canInput']()&&this[_0x572d1e(0x46f)]();},BattleManager[_0x2832c8(0x65a)]=function(){const _0x733868=_0x2832c8;return VisuMZ[_0x733868(0x282)][_0x733868(0x6e8)]['PartyCmd'][_0x733868(0x3f0)];},BattleManager[_0x2832c8(0x887)]=function(){const _0x449c6b=_0x2832c8;this[_0x449c6b(0x801)]()&&this[_0x449c6b(0x46f)]();},VisuMZ['BattleCore'][_0x2832c8(0x27e)]=Scene_Battle[_0x2832c8(0x749)]['startActorCommandSelection'],Scene_Battle['prototype'][_0x2832c8(0x2be)]=function(){const _0x53cc69=_0x2832c8;VisuMZ[_0x53cc69(0x282)][_0x53cc69(0x27e)]['call'](this),BattleManager[_0x53cc69(0x707)]()&&BattleManager[_0x53cc69(0x2f5)]&&(BattleManager[_0x53cc69(0x2f5)]=![],this[_0x53cc69(0x578)]());},BattleManager[_0x2832c8(0x2d3)]=function(_0x129a29,_0x5decd0){const _0x1b576f=_0x2832c8;this[_0x1b576f(0x555)]['_reflectionTarget']=_0x5decd0,this[_0x1b576f(0x866)][_0x1b576f(0x627)](_0x5decd0),this[_0x1b576f(0x866)][_0x1b576f(0x577)](_0x129a29,this[_0x1b576f(0x555)]),this[_0x1b576f(0x555)][_0x1b576f(0x312)](_0x129a29),this[_0x1b576f(0x866)][_0x1b576f(0x518)](_0x129a29,_0x129a29);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x611)]=BattleManager[_0x2832c8(0x541)],BattleManager['makeActionOrders']=function(){const _0x6edd93=_0x2832c8;VisuMZ['BattleCore'][_0x6edd93(0x611)][_0x6edd93(0x3c8)](this),this[_0x6edd93(0x325)]=this[_0x6edd93(0x325)]['filter'](_0x5535e5=>_0x5535e5&&_0x5535e5['isAppeared']());},VisuMZ['BattleCore']['BattleManager_updatePhase']=BattleManager[_0x2832c8(0x73b)],BattleManager[_0x2832c8(0x73b)]=function(_0x4ee66b){const _0x71ef6c=_0x2832c8;if(this[_0x71ef6c(0x1fc)]===_0x71ef6c(0x7a8))this[_0x71ef6c(0x2cb)]();else this[_0x71ef6c(0x1fc)]===_0x71ef6c(0x803)?this[_0x71ef6c(0x678)]():VisuMZ['BattleCore'][_0x71ef6c(0x53a)][_0x71ef6c(0x3c8)](this,_0x4ee66b);},BattleManager[_0x2832c8(0x1bd)]=function(){const _0x4d6e18=_0x2832c8;this[_0x4d6e18(0x5ca)]=this[_0x4d6e18(0x8a7)][_0x4d6e18(0x4d6)](0x0),this[_0x4d6e18(0x5ad)]=0x0,this['_target']=this['_allTargets'][0x0]||null,this[_0x4d6e18(0x1fc)]=_0x4d6e18(0x7a8);},BattleManager[_0x2832c8(0x2cb)]=function(){const _0x2e54f5=_0x2832c8;!this[_0x2e54f5(0x82d)]()&&!this[_0x2e54f5(0x866)]['isBusy']()&&(this['_phase']=_0x2e54f5(0x796));},BattleManager[_0x2832c8(0x803)]=function(_0x2cbddc){const _0x5ce32a=_0x2832c8;this['_actionBattlers'][_0x5ce32a(0x19a)](_0x2cbddc);if(_0x2cbddc===this['_subject'])return;const _0xc10396=JsonEx[_0x5ce32a(0x1ef)](_0x2cbddc[_0x5ce32a(0x6b2)]());this['_forcedBattlers'][_0x5ce32a(0x7d2)]([_0x2cbddc,_0xc10396]);},BattleManager[_0x2832c8(0x8e3)]=function(){},BattleManager[_0x2832c8(0x4bc)]=function(){const _0xa924cf=_0x2832c8;if(this[_0xa924cf(0x707)]())this['_phase']=_0xa924cf(0x1cb);else this['_forcedBattlers'][_0xa924cf(0x720)]>0x0?this[_0xa924cf(0x1fc)]=_0xa924cf(0x1cb):this[_0xa924cf(0x48e)]();},BattleManager['getNextSubject']=function(){const _0x84b7b7=_0x2832c8,_0x1af654=this[_0x84b7b7(0x2c0)];_0x1af654&&this['isTpb']()&&_0x1af654[_0x84b7b7(0x8c4)](_0x84b7b7(0x8af));for(;;){const _0x3bbd1d=this['getNextSubjectFromPool']();if(!_0x3bbd1d)return null;if(_0x3bbd1d['isBattleMember']()&&_0x3bbd1d[_0x84b7b7(0x6be)]())return _0x3bbd1d;}},BattleManager[_0x2832c8(0x5ac)]=function(){const _0x1d0703=_0x2832c8;if(this[_0x1d0703(0x1aa)][_0x1d0703(0x720)]>0x0){const _0x3fc398=this[_0x1d0703(0x1aa)][_0x1d0703(0x5c7)](),_0x4d3474=_0x3fc398[0x0];return _0x4d3474[_0x1d0703(0x371)]=_0x4d3474[_0x1d0703(0x371)]||[],_0x4d3474[_0x1d0703(0x371)][0x0]=_0x3fc398[0x1],_0x4d3474;}else return this[_0x1d0703(0x325)][_0x1d0703(0x5c7)]();},VisuMZ['BattleCore'][_0x2832c8(0x85a)]=Game_Battler['prototype'][_0x2832c8(0x803)],Game_Battler[_0x2832c8(0x749)]['forceAction']=function(_0x47fbc1,_0x45266b){const _0x3c873a=_0x2832c8;VisuMZ[_0x3c873a(0x282)][_0x3c873a(0x85a)][_0x3c873a(0x3c8)](this,_0x47fbc1,_0x45266b),this[_0x3c873a(0x371)][this[_0x3c873a(0x371)][_0x3c873a(0x720)]-0x1]['_forceAction']=!![];},Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x7f1)]=function(_0x59ec51){const _0x5421a9=_0x2832c8;return this[_0x5421a9(0x35a)](_0x59ec51[0x0],_0x59ec51[0x1],_0x42eec2=>{const _0x57f321=_0x5421a9;!_0x42eec2['isDeathStateAffected']()&&(_0x42eec2[_0x57f321(0x803)](_0x59ec51[0x2],_0x59ec51[0x3]),BattleManager[_0x57f321(0x803)](_0x42eec2));}),!![];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x532)]=Game_Battler[_0x2832c8(0x749)]['makeSpeed'],Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x7b5)]=function(){const _0x598280=_0x2832c8;VisuMZ[_0x598280(0x282)]['Game_Battler_makeSpeed'][_0x598280(0x3c8)](this),this['_actions']['length']<=0x0&&(this['_speed']=Number[_0x598280(0x3b2)]);},VisuMZ[_0x2832c8(0x282)]['BattleManager_selectNextCommand']=BattleManager[_0x2832c8(0x46f)],BattleManager[_0x2832c8(0x46f)]=function(){const _0xbf189d=_0x2832c8;this[_0xbf189d(0x707)]()?this[_0xbf189d(0x893)]():VisuMZ[_0xbf189d(0x282)][_0xbf189d(0x62e)][_0xbf189d(0x3c8)](this);},BattleManager['selectNextCommandTpb']=function(){const _0x16d426=_0x2832c8;if(this[_0x16d426(0x384)]){if(this[_0x16d426(0x384)][_0x16d426(0x46f)]())return;this[_0x16d426(0x6b5)](),this[_0x16d426(0x7c9)](),!this[_0x16d426(0x2c0)]&&!this[_0x16d426(0x384)]&&SceneManager['_scene'][_0x16d426(0x60f)]();}else!this[_0x16d426(0x2c0)]&&this[_0x16d426(0x1d7)]();},BattleManager[_0x2832c8(0x7c9)]=function(){const _0x5861ff=_0x2832c8;(!this['isPartyTpbInputtable']()||this[_0x5861ff(0x591)]())&&(this[_0x5861ff(0x43b)]&&(!$gameParty[_0x5861ff(0x86b)]()[_0x5861ff(0x569)](this[_0x5861ff(0x43b)])&&(this[_0x5861ff(0x43b)]=null)),!this[_0x5861ff(0x43b)]?(this['cancelActorInput'](),this['_currentActor']=null,this['_inputting']=![]):(this[_0x5861ff(0x384)]=this[_0x5861ff(0x43b)],this[_0x5861ff(0x384)]['_tpbState']=_0x5861ff(0x7ad),this[_0x5861ff(0x80f)]=!![],this[_0x5861ff(0x43b)]=null));},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x32f)]=BattleManager['isTpbMainPhase'],BattleManager[_0x2832c8(0x7cf)]=function(){const _0x191471=_0x2832c8;return this['_phase']===_0x191471(0x7a8)?this['battleCoreTpbMainPhase']():VisuMZ[_0x191471(0x282)][_0x191471(0x32f)][_0x191471(0x3c8)](this);},BattleManager[_0x2832c8(0x75f)]=function(){const _0x433677=_0x2832c8;return this[_0x433677(0x3df)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x6d7)]=BattleManager[_0x2832c8(0x572)],BattleManager[_0x2832c8(0x572)]=function(){const _0x54be87=_0x2832c8;this['isTpb']()&&this[_0x54be87(0x1fc)]==='battleEnd'&&(this[_0x54be87(0x384)]=null),VisuMZ['BattleCore'][_0x54be87(0x6d7)][_0x54be87(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x2a8)]=BattleManager[_0x2832c8(0x4a1)],BattleManager[_0x2832c8(0x4a1)]=function(){const _0x1d5de4=_0x2832c8,_0x11ed4e=this[_0x1d5de4(0x384)];if(_0x11ed4e&&!_0x11ed4e[_0x1d5de4(0x4a1)]()){const _0x39003a=_0x11ed4e[_0x1d5de4(0x34b)];_0x11ed4e['_actions'][_0x39003a]=new Game_Action(_0x11ed4e);}return VisuMZ[_0x1d5de4(0x282)][_0x1d5de4(0x2a8)][_0x1d5de4(0x3c8)](this);},SceneManager[_0x2832c8(0x230)]=function(){const _0x3b13cc=_0x2832c8;return this[_0x3b13cc(0x37d)]&&this[_0x3b13cc(0x37d)][_0x3b13cc(0x493)]===Scene_Battle;},SceneManager[_0x2832c8(0x2f2)]=function(){const _0x2c468d=_0x2832c8;return Spriteset_Battle[_0x2c468d(0x749)][_0x2c468d(0x1f5)]();},SceneManager[_0x2832c8(0x39a)]=function(){if(SceneManager['isPreviousScene'](Scene_Options))return!![];return![];},SceneManager['isNextSceneBattleTransitionable']=function(){const _0x4958d0=_0x2832c8;if(SceneManager[_0x4958d0(0x33e)](Scene_Options))return!![];return![];},VisuMZ['BattleCore'][_0x2832c8(0x8ac)]=Game_Temp[_0x2832c8(0x749)][_0x2832c8(0x717)],Game_Temp[_0x2832c8(0x749)]['requestAnimation']=function(_0x30c164,_0x4102d0,_0x3de0d8){const _0xeac1ae=_0x2832c8;_0x30c164=_0x30c164[_0xeac1ae(0x28c)]((_0x5e32ea,_0xaae2a6,_0x10940c)=>_0x10940c[_0xeac1ae(0x294)](_0x5e32ea)===_0xaae2a6),SceneManager[_0xeac1ae(0x230)]()&&SceneManager[_0xeac1ae(0x2f2)]()&&(_0x3de0d8=!_0x3de0d8),VisuMZ[_0xeac1ae(0x282)][_0xeac1ae(0x8ac)]['call'](this,_0x30c164,_0x4102d0,_0x3de0d8),SceneManager['isSceneBattle']()&&BattleManager[_0xeac1ae(0x229)][_0xeac1ae(0x6b4)]();},Game_Temp[_0x2832c8(0x749)][_0x2832c8(0x730)]=function(_0x1e570c){this['_lastPluginCommandInterpreter']=_0x1e570c;},Game_Temp[_0x2832c8(0x749)][_0x2832c8(0x642)]=function(){const _0x115a1a=_0x2832c8;return this[_0x115a1a(0x77f)];},Game_Temp[_0x2832c8(0x749)][_0x2832c8(0x55e)]=function(){const _0x4312d6=_0x2832c8;this[_0x4312d6(0x4e5)]=undefined;},Game_Temp[_0x2832c8(0x749)][_0x2832c8(0x364)]=function(_0x17aba8){const _0x16c7b4=_0x2832c8;$gameMap&&$dataMap&&$dataMap[_0x16c7b4(0x75e)]&&this['parseForcedGameTroopSettingsBattleCore']($dataMap[_0x16c7b4(0x75e)]);const _0x4c9405=$dataTroops[_0x17aba8];_0x4c9405&&this[_0x16c7b4(0x2e3)](_0x4c9405[_0x16c7b4(0x6f3)]);},Game_Temp[_0x2832c8(0x749)][_0x2832c8(0x2e3)]=function(_0x30c042){const _0x39e67b=_0x2832c8;if(!_0x30c042)return;if(_0x30c042[_0x39e67b(0x6f0)](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x2068b6=String(RegExp['$1']);if(_0x2068b6[_0x39e67b(0x6f0)](/DEFAULT/i))this[_0x39e67b(0x4e5)]='default';else{if(_0x2068b6['match'](/LIST/i))this[_0x39e67b(0x4e5)]=_0x39e67b(0x62c);else{if(_0x2068b6[_0x39e67b(0x6f0)](/XP/i))this['_forcedBattleLayout']='xp';else{if(_0x2068b6[_0x39e67b(0x6f0)](/PORTRAIT/i))this[_0x39e67b(0x4e5)]=_0x39e67b(0x4f3);else _0x2068b6[_0x39e67b(0x6f0)](/BORDER/i)&&(this['_forcedBattleLayout']=_0x39e67b(0x722));}}}}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x194)]=Game_System[_0x2832c8(0x749)][_0x2832c8(0x44f)],Game_System[_0x2832c8(0x749)]['initialize']=function(){const _0x1a32dd=_0x2832c8;VisuMZ[_0x1a32dd(0x282)]['Game_System_initialize']['call'](this),this[_0x1a32dd(0x3db)]();},Game_System['prototype'][_0x2832c8(0x3db)]=function(){const _0x243d91=_0x2832c8;this[_0x243d91(0x5e0)]=this[_0x243d91(0x5e0)]||[];},Game_System[_0x2832c8(0x749)][_0x2832c8(0x4fe)]=function(){const _0x409939=_0x2832c8;if(this[_0x409939(0x5e0)]===undefined)this[_0x409939(0x3db)]();return this[_0x409939(0x5e0)];},Game_System[_0x2832c8(0x749)][_0x2832c8(0x4b0)]=function(_0x176403){const _0x4e3dfe=_0x2832c8;if(this[_0x4e3dfe(0x5e0)]===undefined)this[_0x4e3dfe(0x3db)]();if(!_0x176403)return;if(this[_0x4e3dfe(0x5e0)][_0x4e3dfe(0x569)](_0x176403))return;this[_0x4e3dfe(0x5e0)]['push'](_0x176403),this[_0x4e3dfe(0x5e0)]['sort']((_0x46545f,_0x2be214)=>_0x46545f-_0x2be214);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x794)]=Game_BattlerBase[_0x2832c8(0x749)]['addNewState'],Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x26b)]=function(_0x205e5c){const _0x14e931=_0x2832c8,_0x511e46=this[_0x14e931(0x6be)](),_0x39bff2=this[_0x14e931(0x63e)]();VisuMZ['BattleCore'][_0x14e931(0x794)][_0x14e931(0x3c8)](this,_0x205e5c),this[_0x14e931(0x2a2)]()&&_0x511e46&&this[_0x14e931(0x7d5)]()&&(this['_visualHpGauge_JustDied']=!this[_0x14e931(0x440)](),$gameSystem[_0x14e931(0x4b0)](this[_0x14e931(0x4ea)]())),SceneManager[_0x14e931(0x230)]()&&_0x39bff2!==this['stateMotionIndex']()&&(this[_0x14e931(0x5b5)]()&&this[_0x14e931(0x5b5)]()[_0x14e931(0x28f)]());},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x440)]=function(){const _0x6b9e8e=_0x2832c8;return $gameSystem[_0x6b9e8e(0x4fe)]()[_0x6b9e8e(0x569)](this[_0x6b9e8e(0x4c2)]);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x3be)]=Game_BattlerBase['prototype']['eraseState'],Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x228)]=function(_0x1efe32){const _0x43483b=_0x2832c8;VisuMZ[_0x43483b(0x282)][_0x43483b(0x3be)]['call'](this,_0x1efe32),this[_0x43483b(0x2a2)]()&&_0x1efe32===this['deathStateId']()&&this[_0x43483b(0x6be)]()&&(this[_0x43483b(0x800)]=![]),SceneManager['isSceneBattle']()&&this['requestMotionRefresh']();},VisuMZ['BattleCore'][_0x2832c8(0x306)]=Game_Action[_0x2832c8(0x749)][_0x2832c8(0x890)],Game_Action[_0x2832c8(0x749)]['clear']=function(){const _0x50b4a8=_0x2832c8;VisuMZ[_0x50b4a8(0x282)][_0x50b4a8(0x306)][_0x50b4a8(0x3c8)](this),this[_0x50b4a8(0x32c)]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this['_multipliers']={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0x50b4a8(0x7cd)]='default';},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x6ec)]=function(_0x2ba194,_0x49b4ce){const _0x1fe0e6=_0x2832c8;return VisuMZ['BattleCore'][_0x1fe0e6(0x6e8)]['Damage'][_0x1fe0e6(0x4c7)][_0x1fe0e6(0x3c8)](this,_0x2ba194,_0x49b4ce);},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x354)]=function(_0x48c107,_0x269f9f){const _0x100787=_0x2832c8;return VisuMZ[_0x100787(0x282)][_0x100787(0x6e8)][_0x100787(0x3fc)]['VarianceFormulaJS']['call'](this,_0x48c107,_0x269f9f);},Game_Action['prototype'][_0x2832c8(0x608)]=function(_0x186326,_0x2c848f){const _0x155730=_0x2832c8;return VisuMZ['BattleCore'][_0x155730(0x6e8)][_0x155730(0x3fc)][_0x155730(0x684)]['call'](this,_0x186326,_0x2c848f);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x7b0)]=Game_Action[_0x2832c8(0x749)][_0x2832c8(0x42a)],Game_Action['prototype']['itemHit']=function(_0x1c7edf){const _0x1aff70=_0x2832c8,_0x59ede6=this['item']()[_0x1aff70(0x75e)];if(_0x59ede6[_0x1aff70(0x6f0)](/<ALWAYS HIT>/i))return 0x1;else{if(_0x59ede6[_0x1aff70(0x6f0)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0xbc2087=VisuMZ[_0x1aff70(0x282)][_0x1aff70(0x7b0)][_0x1aff70(0x3c8)](this,_0x1c7edf);return _0xbc2087=this[_0x1aff70(0x883)]['hitRate']*_0xbc2087+this['_multipliers']['hitFlat'],_0xbc2087;}}},Game_Action[_0x2832c8(0x749)]['itemCri']=function(_0x4bfde3){const _0x2f059c=_0x2832c8;if(!this['item']()[_0x2f059c(0x817)][_0x2f059c(0x8e4)])return 0x0;let _0x37a428=VisuMZ[_0x2f059c(0x282)][_0x2f059c(0x6e8)][_0x2f059c(0x3fc)]['CriticalHitRateJS'][_0x2f059c(0x3c8)](this,_0x4bfde3);return _0x37a428=this[_0x2f059c(0x883)][_0x2f059c(0x3e8)]*_0x37a428+this[_0x2f059c(0x883)][_0x2f059c(0x2bf)],_0x37a428;},Game_Action['prototype'][_0x2832c8(0x7af)]=function(_0x344776){const _0x4231c9=_0x2832c8;return _0x344776=VisuMZ[_0x4231c9(0x282)][_0x4231c9(0x6e8)][_0x4231c9(0x3fc)][_0x4231c9(0x30d)][_0x4231c9(0x3c8)](this,_0x344776),_0x344776=this[_0x4231c9(0x883)]['criticalDmgRate']*_0x344776+this[_0x4231c9(0x883)][_0x4231c9(0x66a)],_0x344776;},VisuMZ['BattleCore'][_0x2832c8(0x46e)]=Game_Action[_0x2832c8(0x749)][_0x2832c8(0x5c1)],Game_Action[_0x2832c8(0x749)][_0x2832c8(0x5c1)]=function(_0x52b120){const _0x4a72ce=_0x2832c8;if(this[_0x4a72ce(0x7cd)]!==_0x4a72ce(0x7fa))return this[_0x4a72ce(0x1d1)](_0x52b120);else return DataManager[_0x4a72ce(0x62d)](this['item']())===_0x4a72ce(0x1c8)?VisuMZ[_0x4a72ce(0x282)][_0x4a72ce(0x46e)]['call'](this,_0x52b120):this[_0x4a72ce(0x731)](_0x52b120);},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x4e3)]=function(_0x1c5568){const _0x16e6f8=_0x2832c8;this[_0x16e6f8(0x7cd)]=_0x1c5568;},Game_Action[_0x2832c8(0x749)]['customDamageFormula']=function(_0x5fb437){const _0x5b1631=_0x2832c8,_0x4ac71c=this['item'](),_0x3d9413=_0x4ac71c[_0x5b1631(0x817)][_0x5b1631(0x7bc)];_0x4ac71c[_0x5b1631(0x817)][_0x5b1631(0x7bc)]=this[_0x5b1631(0x7cd)];let _0x47f17f=VisuMZ[_0x5b1631(0x282)][_0x5b1631(0x46e)][_0x5b1631(0x3c8)](this,_0x5fb437);return _0x4ac71c[_0x5b1631(0x817)][_0x5b1631(0x7bc)]=_0x3d9413,_0x47f17f;},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x741)]=function(){const _0x2cf733=_0x2832c8;if(this[_0x2cf733(0x703)]()[_0x2cf733(0x75e)][_0x2cf733(0x6f0)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x40ba55=String(RegExp['$1'])[_0x2cf733(0x716)]()[_0x2cf733(0x757)]();return _0x40ba55;}return _0x2cf733(0x1c8);},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x731)]=function(_0x278b18){const _0x673952=_0x2832c8,_0x13b8c2=DataManager[_0x673952(0x62d)](this[_0x673952(0x703)]()),_0x5bef15=VisuMZ['DamageStyles'][_0x13b8c2];try{return _0x5bef15['Formula'][_0x673952(0x3c8)](this,_0x278b18);}catch(_0x3a1bc6){if($gameTemp['isPlaytest']())console[_0x673952(0x810)](_0x3a1bc6);return VisuMZ[_0x673952(0x282)][_0x673952(0x46e)][_0x673952(0x3c8)](this);}},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x733)]=function(_0x54d0fd,_0x4b49e4){const _0x2cbbfc=_0x2832c8;if(this[_0x2cbbfc(0x562)]())return _0x4b49e4;const _0xf8329c=this[_0x2cbbfc(0x381)](),_0x3e15e2=_0x54d0fd;let _0x3d724f=[],_0x4c7d52=[];_0x3d724f[_0x2cbbfc(0x7d2)](this[_0x2cbbfc(0x32c)][_0x2cbbfc(0x205)],this['_armorPenetration'][_0x2cbbfc(0x5fb)]),_0x4c7d52['push'](this[_0x2cbbfc(0x32c)][_0x2cbbfc(0x571)],this[_0x2cbbfc(0x32c)]['arRedRate']);const _0x1408e3=this[_0x2cbbfc(0x2eb)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0xadc1a9=this[_0x2cbbfc(0x2eb)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x4dc865=this[_0x2cbbfc(0x2eb)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x1daf9d=this[_0x2cbbfc(0x2eb)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0x3d724f=_0x3d724f[_0x2cbbfc(0x2df)](_0x3e15e2[_0x2cbbfc(0x405)]()[_0x2cbbfc(0x8b3)](_0x4a92c5=>_0x4a92c5&&_0x4a92c5[_0x2cbbfc(0x75e)][_0x2cbbfc(0x6f0)](_0x1408e3)?Number(RegExp['$1']):0x0)),_0x4c7d52=_0x4c7d52[_0x2cbbfc(0x2df)](_0x3e15e2[_0x2cbbfc(0x405)]()[_0x2cbbfc(0x8b3)](_0x20b471=>_0x20b471&&_0x20b471[_0x2cbbfc(0x75e)][_0x2cbbfc(0x6f0)](_0xadc1a9)?Number(RegExp['$1'])/0x64:0x0)),_0x3d724f=_0x3d724f['concat'](_0xf8329c[_0x2cbbfc(0x405)]()[_0x2cbbfc(0x8b3)](_0x523f6b=>_0x523f6b&&_0x523f6b[_0x2cbbfc(0x75e)][_0x2cbbfc(0x6f0)](_0x4dc865)?Number(RegExp['$1']):0x0)),_0x4c7d52=_0x4c7d52[_0x2cbbfc(0x2df)](_0xf8329c[_0x2cbbfc(0x405)]()['map'](_0x3f4248=>_0x3f4248&&_0x3f4248[_0x2cbbfc(0x75e)][_0x2cbbfc(0x6f0)](_0x1daf9d)?Number(RegExp['$1'])/0x64:0x0)),this[_0x2cbbfc(0x703)]()['note'][_0x2cbbfc(0x6f0)](_0x4dc865)&&_0x3d724f['push'](Number(RegExp['$1'])),this[_0x2cbbfc(0x703)]()[_0x2cbbfc(0x75e)]['match'](_0x1daf9d)&&_0x4c7d52[_0x2cbbfc(0x7d2)](Number(RegExp['$1'])),_0x4b49e4=_0x3d724f[_0x2cbbfc(0x317)]((_0x5e1b10,_0xa0e5ec)=>_0x5e1b10-_0xa0e5ec,_0x4b49e4),_0x4b49e4>0x0&&(_0x4b49e4=_0x4c7d52[_0x2cbbfc(0x317)]((_0xa456ed,_0x1c93e1)=>_0xa456ed*(0x1-_0x1c93e1),_0x4b49e4)),_0x4b49e4;},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x5d0)]=Game_Action[_0x2832c8(0x749)]['executeDamage'],Game_Action[_0x2832c8(0x749)][_0x2832c8(0x1eb)]=function(_0x5ccad6,_0xd3721a){const _0x34e52d=_0x2832c8;_0xd3721a=_0xd3721a*this[_0x34e52d(0x883)][_0x34e52d(0x599)],_0xd3721a+=this[_0x34e52d(0x883)][_0x34e52d(0x780)]*(_0xd3721a>=0x0?0x1:-0x1),_0xd3721a=this['applyBattleCoreJS']('PreDamage%1JS',_0x5ccad6,_0xd3721a,![]),_0xd3721a=this['applyDamageCaps'](_0xd3721a),_0xd3721a=Math['round'](_0xd3721a),this[_0x34e52d(0x5ea)]=_0xd3721a,this[_0x34e52d(0x60b)]=this[_0x34e52d(0x60b)]||0x0,this[_0x34e52d(0x60b)]+=_0xd3721a,VisuMZ[_0x34e52d(0x282)][_0x34e52d(0x5d0)][_0x34e52d(0x3c8)](this,_0x5ccad6,_0xd3721a),this[_0x34e52d(0x53c)]('PostDamage%1JS',_0x5ccad6,_0xd3721a,!![]);},Game_Action[_0x2832c8(0x749)]['applyDamageCaps']=function(_0x2b0773){const _0x300769=_0x2832c8;if(this[_0x300769(0x375)]())return _0x2b0773;return _0x2b0773=this[_0x300769(0x679)](_0x2b0773),_0x2b0773=this['applyHardDamageCap'](_0x2b0773),_0x2b0773;},Game_Action[_0x2832c8(0x749)]['isBypassDamageCap']=function(){const _0x594d2d=_0x2832c8,_0x4d5136=/<BYPASS DAMAGE CAP>/i;if(this['item']()[_0x594d2d(0x75e)][_0x594d2d(0x6f0)](_0x4d5136))return!![];if(this[_0x594d2d(0x381)]()[_0x594d2d(0x405)]()['some'](_0x11d86b=>_0x11d86b&&_0x11d86b[_0x594d2d(0x75e)][_0x594d2d(0x6f0)](_0x4d5136)))return!![];return!VisuMZ['BattleCore'][_0x594d2d(0x6e8)][_0x594d2d(0x3fc)]['EnableDamageCap'];},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x679)]=function(_0x427b2a){const _0xee604d=_0x2832c8;if(!VisuMZ['BattleCore']['Settings']['Damage']['EnableSoftCap'])return _0x427b2a;const _0x575081=/<BYPASS SOFT DAMAGE CAP>/i;if(this['item']()[_0xee604d(0x75e)][_0xee604d(0x6f0)](_0x575081))return!![];if(this['subject']()[_0xee604d(0x405)]()[_0xee604d(0x41b)](_0x12f85b=>_0x12f85b&&_0x12f85b['note'][_0xee604d(0x6f0)](_0x575081)))return!![];const _0x3b7750=_0x427b2a<0x0?-0x1:0x1;_0x427b2a=Math[_0xee604d(0x3a2)](_0x427b2a);let _0x2fff67=this['subject']()[_0xee604d(0x870)]();this['item']()[_0xee604d(0x75e)]['match'](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x2fff67+=Number(RegExp['$1'])/0x64);_0x2fff67=_0x2fff67['clamp'](0.01,0x1);const _0xa699e2=this[_0xee604d(0x2a5)](),_0x1b08fb=_0x2fff67*_0xa699e2;if(_0x427b2a>_0x1b08fb&&_0xa699e2>_0x1b08fb){_0x427b2a-=_0x1b08fb;const _0x5dd297=VisuMZ[_0xee604d(0x282)]['Settings'][_0xee604d(0x3fc)][_0xee604d(0x1b9)],_0x4e809c=Math[_0xee604d(0x871)](0x1-_0x427b2a/((_0xa699e2-_0x1b08fb)*_0x5dd297+_0x427b2a),0.01);_0x427b2a*=_0x4e809c,_0x427b2a+=_0x1b08fb;}return _0x427b2a*_0x3b7750;},Game_Action['prototype'][_0x2832c8(0x2a5)]=function(){const _0x2aed08=_0x2832c8;return this['item']()[_0x2aed08(0x75e)][_0x2aed08(0x6f0)](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x2aed08(0x381)]()[_0x2aed08(0x662)]();},Game_Action['prototype'][_0x2832c8(0x718)]=function(_0x227bb3){const _0x54a751=_0x2832c8;let _0x3e5eab=this[_0x54a751(0x2a5)]();return _0x227bb3['clamp'](-_0x3e5eab,_0x3e5eab);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x38a)]=Game_Action['prototype'][_0x2832c8(0x312)],Game_Action[_0x2832c8(0x749)]['apply']=function(_0x5112e7){const _0x47e8b7=_0x2832c8;this[_0x47e8b7(0x53c)]('PreApply%1JS',_0x5112e7,0x0,!![]),VisuMZ[_0x47e8b7(0x282)][_0x47e8b7(0x38a)][_0x47e8b7(0x3c8)](this,_0x5112e7),this[_0x47e8b7(0x53c)](_0x47e8b7(0x4cb),_0x5112e7,this[_0x47e8b7(0x5ea)]||0x0,!![]);},Game_Action[_0x2832c8(0x749)]['applyBattleCoreJS']=function(_0x82fc63,_0x4698c4,_0x46bc0b,_0x3d52d5){const _0xd18ea8=_0x2832c8;_0x46bc0b=_0x46bc0b||0x0;const _0x220e7c=_0x46bc0b,_0x5c1072=VisuMZ['BattleCore']['Settings'][_0xd18ea8(0x67f)],_0x65aca3=_0x82fc63[_0xd18ea8(0x668)]('');if(_0x5c1072[_0x65aca3]){_0x46bc0b=_0x5c1072[_0x65aca3]['call'](this,_0x46bc0b,_0x4698c4);if(_0x3d52d5)_0x46bc0b=_0x220e7c;}let _0x1cf471=VisuMZ[_0xd18ea8(0x282)][_0xd18ea8(0x899)](this[_0xd18ea8(0x703)](),_0x82fc63[_0xd18ea8(0x668)](''));if(VisuMZ[_0xd18ea8(0x282)]['JS'][_0x1cf471]){_0x46bc0b=VisuMZ['BattleCore']['JS'][_0x1cf471]['call'](this,this['subject'](),_0x4698c4,this[_0xd18ea8(0x703)](),_0x46bc0b);if(_0x3d52d5)_0x46bc0b=_0x220e7c;}for(const _0x4182b6 of this[_0xd18ea8(0x381)]()[_0xd18ea8(0x405)]()){if(!_0x4182b6)continue;_0x1cf471=VisuMZ[_0xd18ea8(0x282)]['createKeyJS'](_0x4182b6,_0x82fc63[_0xd18ea8(0x668)](_0xd18ea8(0x39b)));if(VisuMZ[_0xd18ea8(0x282)]['JS'][_0x1cf471]){_0x46bc0b=VisuMZ[_0xd18ea8(0x282)]['JS'][_0x1cf471][_0xd18ea8(0x3c8)](this,this[_0xd18ea8(0x381)](),_0x4698c4,_0x4182b6,_0x46bc0b);if(_0x3d52d5)_0x46bc0b=_0x220e7c;}}for(const _0x407ff9 of _0x4698c4[_0xd18ea8(0x405)]()){if(!_0x407ff9)continue;_0x1cf471=VisuMZ[_0xd18ea8(0x282)]['createKeyJS'](_0x407ff9,_0x82fc63[_0xd18ea8(0x668)](_0xd18ea8(0x7d3)));if(VisuMZ['BattleCore']['JS'][_0x1cf471]){_0x46bc0b=VisuMZ['BattleCore']['JS'][_0x1cf471][_0xd18ea8(0x3c8)](this,this[_0xd18ea8(0x381)](),_0x4698c4,_0x407ff9,_0x46bc0b);if(_0x3d52d5)_0x46bc0b=_0x220e7c;}}return _0x46bc0b;},Game_Action['prototype'][_0x2832c8(0x6e4)]=function(_0x5a7fe2){const _0x2e8d03=_0x2832c8,_0x5aad4e=this[_0x2e8d03(0x60b)]||0x0,_0x58ee0b=VisuMZ[_0x2e8d03(0x282)]['Settings'][_0x2e8d03(0x67f)],_0x3c0ed4=_0x5a7fe2[_0x2e8d03(0x668)]('');_0x58ee0b[_0x3c0ed4]&&_0x58ee0b[_0x3c0ed4][_0x2e8d03(0x3c8)](this,_0x5aad4e);let _0x2bf3ae=VisuMZ['BattleCore']['createKeyJS'](this[_0x2e8d03(0x703)](),_0x5a7fe2);VisuMZ[_0x2e8d03(0x282)]['JS'][_0x2bf3ae]&&VisuMZ[_0x2e8d03(0x282)]['JS'][_0x2bf3ae]['call'](this,this[_0x2e8d03(0x381)](),this[_0x2e8d03(0x381)](),this[_0x2e8d03(0x703)](),_0x5aad4e);for(const _0x39beb4 of this[_0x2e8d03(0x381)]()[_0x2e8d03(0x405)]()){if(!_0x39beb4)continue;_0x2bf3ae=VisuMZ[_0x2e8d03(0x282)][_0x2e8d03(0x899)](_0x39beb4,_0x5a7fe2),VisuMZ[_0x2e8d03(0x282)]['JS'][_0x2bf3ae]&&VisuMZ[_0x2e8d03(0x282)]['JS'][_0x2bf3ae][_0x2e8d03(0x3c8)](this,this['subject'](),this[_0x2e8d03(0x381)](),_0x39beb4,_0x5aad4e);}},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x32b)]=function(){const _0x420576=_0x2832c8;return VisuMZ[_0x420576(0x282)]['Settings'][_0x420576(0x67f)]['CalcActionSpeedJS'][_0x420576(0x3c8)](this);},Game_Action['prototype'][_0x2832c8(0x2b2)]=function(){const _0x49a48f=_0x2832c8;return VisuMZ[_0x49a48f(0x282)]['Settings']['Mechanics'][_0x49a48f(0x480)];},Game_Action['prototype'][_0x2832c8(0x218)]=function(){const _0x3293aa=_0x2832c8;return this[_0x3293aa(0x703)]()['note'][_0x3293aa(0x6f0)](/<JS TARGETS>/i);},Game_Action['prototype']['isBattleCoreTargetScope']=function(){const _0x1a9a72=_0x2832c8;if(!this[_0x1a9a72(0x418)]&&this[_0x1a9a72(0x381)]()[_0x1a9a72(0x372)]())return![];if(this[_0x1a9a72(0x218)]())return!![];return typeof this[_0x1a9a72(0x703)]()['scope']===_0x1a9a72(0x2a1);},VisuMZ['BattleCore'][_0x2832c8(0x63d)]=Game_Action[_0x2832c8(0x749)][_0x2832c8(0x6da)],Game_Action[_0x2832c8(0x749)]['isForOpponent']=function(){const _0x274924=_0x2832c8;return this['isBattleCoreTargetScope']()&&!this[_0x274924(0x218)]()?this[_0x274924(0x744)]():VisuMZ['BattleCore'][_0x274924(0x63d)]['call'](this);},Game_Action['prototype'][_0x2832c8(0x744)]=function(){const _0x5e4f11=_0x2832c8,_0x20e2b9=this['item']()[_0x5e4f11(0x299)];return _0x20e2b9['match'](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x3e6)]=Game_Action[_0x2832c8(0x749)]['isForFriend'],Game_Action['prototype'][_0x2832c8(0x895)]=function(){const _0x1d1a55=_0x2832c8;return this[_0x1d1a55(0x4f4)]()&&!this['isCustomBattleScope']()?this[_0x1d1a55(0x586)]():VisuMZ[_0x1d1a55(0x282)][_0x1d1a55(0x3e6)][_0x1d1a55(0x3c8)](this);},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x586)]=function(){const _0x5e3bd3=_0x2832c8,_0x195de2=this[_0x5e3bd3(0x703)]()['scope'];return _0x195de2[_0x5e3bd3(0x6f0)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ['BattleCore'][_0x2832c8(0x3fb)]=Game_Action['prototype'][_0x2832c8(0x708)],Game_Action[_0x2832c8(0x749)][_0x2832c8(0x708)]=function(){const _0xda252e=_0x2832c8;return this[_0xda252e(0x4f4)]()&&!this[_0xda252e(0x218)]()?this[_0xda252e(0x8b6)]():VisuMZ[_0xda252e(0x282)][_0xda252e(0x3fb)][_0xda252e(0x3c8)](this);},Game_Action[_0x2832c8(0x749)]['isForRandomBattleCore']=function(){const _0x435878=_0x2832c8,_0x1d4a1b=this[_0x435878(0x703)]()[_0x435878(0x299)];return _0x1d4a1b[_0x435878(0x6f0)](/(?:RAND|RANDOM)/i);},VisuMZ['BattleCore'][_0x2832c8(0x6db)]=Game_Action[_0x2832c8(0x749)][_0x2832c8(0x21f)],Game_Action[_0x2832c8(0x749)][_0x2832c8(0x21f)]=function(){const _0x1bc39a=_0x2832c8;return this['isBattleCoreTargetScope']()&&!this[_0x1bc39a(0x218)]()?this['needsSelectionBattleCore']():VisuMZ['BattleCore'][_0x1bc39a(0x6db)][_0x1bc39a(0x3c8)](this);},Game_Action[_0x2832c8(0x749)][_0x2832c8(0x296)]=function(){const _0x3e67a9=_0x2832c8,_0x2636f7=this[_0x3e67a9(0x703)]()[_0x3e67a9(0x299)];if(_0x2636f7[_0x3e67a9(0x6f0)](/RANDOM/i))return![];return VisuMZ[_0x3e67a9(0x282)]['Game_Action_needsSelection'][_0x3e67a9(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x6fc)]=Game_Action['prototype'][_0x2832c8(0x416)],Game_Action[_0x2832c8(0x749)][_0x2832c8(0x416)]=function(){const _0x1e74f8=_0x2832c8;return this[_0x1e74f8(0x4f4)]()?this['makeTargetsBattleCore']():VisuMZ[_0x1e74f8(0x282)][_0x1e74f8(0x6fc)][_0x1e74f8(0x3c8)](this);},Game_Action['prototype'][_0x2832c8(0x423)]=function(){const _0x1e930c=_0x2832c8;let _0x161852=[];const _0x8ca79=String(this[_0x1e930c(0x703)]()[_0x1e930c(0x299)]),_0x4002d6=VisuMZ['BattleCore'][_0x1e930c(0x899)](this['item'](),_0x1e930c(0x818));if(VisuMZ[_0x1e930c(0x282)]['JS'][_0x4002d6]){const _0x1128ff=VisuMZ[_0x1e930c(0x282)]['createKeyJS'](this[_0x1e930c(0x703)](),'Targets');return _0x161852=VisuMZ[_0x1e930c(0x282)]['JS'][_0x1128ff][_0x1e930c(0x3c8)](this,this[_0x1e930c(0x381)](),_0x161852),this[_0x1e930c(0x4ed)](_0x161852);}if(_0x8ca79['match'](/(\d+) RANDOM ANY/i)){let _0x140d82=Number(RegExp['$1']);while(_0x140d82--){const _0x353dc6=Math['randomInt'](0x2)===0x0?this[_0x1e930c(0x266)]():this[_0x1e930c(0x739)]();_0x161852['push'](_0x353dc6['trueRandomTarget']());}return this[_0x1e930c(0x4ed)](_0x161852);}if(_0x8ca79[_0x1e930c(0x6f0)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x324633=Number(RegExp['$1']);while(_0x324633--){_0x161852[_0x1e930c(0x7d2)](this[_0x1e930c(0x266)]()['trueRandomTarget']());}return this['repeatTargets'](_0x161852);}if(_0x8ca79[_0x1e930c(0x6f0)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x180cd2=Number(RegExp['$1']);while(_0x180cd2--){_0x161852[_0x1e930c(0x7d2)](this[_0x1e930c(0x739)]()[_0x1e930c(0x65d)]());}return this[_0x1e930c(0x4ed)](_0x161852);}if(_0x8ca79['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x161852[_0x1e930c(0x7d2)](...this[_0x1e930c(0x739)]()[_0x1e930c(0x692)]()[_0x1e930c(0x28c)](_0x121801=>_0x121801!==this[_0x1e930c(0x381)]())),this[_0x1e930c(0x4ed)](_0x161852);return VisuMZ['BattleCore'][_0x1e930c(0x6fc)][_0x1e930c(0x3c8)](this);},Game_Action['prototype'][_0x2832c8(0x5f9)]=function(_0x3a7703){const _0x78ae4e=_0x2832c8,_0x95cf02=[];for(let _0x44f9a0=0x0;_0x44f9a0<this[_0x78ae4e(0x6e7)]();_0x44f9a0++){_0x95cf02[_0x78ae4e(0x7d2)](_0x3a7703[_0x78ae4e(0x65d)]());}return _0x95cf02;},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x309)]=Game_Action[_0x2832c8(0x749)][_0x2832c8(0x6eb)],Game_Action['prototype'][_0x2832c8(0x6eb)]=function(_0x458ed5,_0x8651de){const _0xb74d35=_0x2832c8,_0x104948=_0x458ed5[_0xb74d35(0x8cb)]();this[_0xb74d35(0x381)]()[_0xb74d35(0x748)]()[_0xb74d35(0x569)](_0x458ed5[_0xb74d35(0x225)]())&&_0x458ed5['setImmortal'](![]),VisuMZ['BattleCore']['Game_Action_itemEffectAddAttackState']['call'](this,_0x458ed5,_0x8651de),_0x458ed5[_0xb74d35(0x3f5)](_0x104948);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x75c)]=Game_Action[_0x2832c8(0x749)][_0x2832c8(0x8dd)],Game_Action[_0x2832c8(0x749)][_0x2832c8(0x8dd)]=function(_0x18358c,_0x3e2bd9){const _0x3a6c9a=_0x2832c8,_0x596f35=_0x18358c[_0x3a6c9a(0x8cb)]();_0x3e2bd9[_0x3a6c9a(0x22c)]===_0x18358c[_0x3a6c9a(0x225)]()&&_0x18358c[_0x3a6c9a(0x3f5)](![]),VisuMZ[_0x3a6c9a(0x282)][_0x3a6c9a(0x75c)]['call'](this,_0x18358c,_0x3e2bd9),_0x18358c['setImmortal'](_0x596f35);},VisuMZ['BattleCore'][_0x2832c8(0x88e)]=Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x459)],Game_BattlerBase['prototype'][_0x2832c8(0x459)]=function(){const _0x5dc7e0=_0x2832c8;VisuMZ[_0x5dc7e0(0x282)][_0x5dc7e0(0x88e)]['call'](this),this[_0x5dc7e0(0x71d)]();},Game_BattlerBase[_0x2832c8(0x749)]['initMembersBattleCore']=function(){const _0x53c161=_0x2832c8;this[_0x53c161(0x70b)]=![];},VisuMZ['BattleCore'][_0x2832c8(0x897)]=Game_BattlerBase['prototype'][_0x2832c8(0x7d0)],Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x7d0)]=function(){const _0x5aed91=_0x2832c8;this[_0x5aed91(0x859)]={},VisuMZ[_0x5aed91(0x282)]['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x4f1)]=function(_0x274d99){const _0x5b81aa=_0x2832c8;return this[_0x5b81aa(0x859)]=this[_0x5b81aa(0x859)]||{},this[_0x5b81aa(0x859)][_0x274d99]!==undefined;},Game_BattlerBase['prototype'][_0x2832c8(0x662)]=function(){const _0x38495a=_0x2832c8;if(this[_0x38495a(0x859)]['hardDamageCap']!==undefined)return this['_cache'][_0x38495a(0x662)];const _0x12cc39=/<DAMAGE CAP:[ ](\d+)>/i,_0x36d378=this[_0x38495a(0x405)]()[_0x38495a(0x8b3)](_0xab724b=>_0xab724b&&_0xab724b[_0x38495a(0x75e)]['match'](_0x12cc39)?Number(RegExp['$1']):0x0);let _0x2b86a0=_0x36d378['length']>0x0?Math[_0x38495a(0x871)](..._0x36d378):0x0;if(_0x2b86a0<=0x0)_0x2b86a0=VisuMZ['BattleCore'][_0x38495a(0x6e8)]['Damage'][_0x38495a(0x82b)];return this[_0x38495a(0x859)]['hardDamageCap']=_0x2b86a0,this[_0x38495a(0x859)][_0x38495a(0x662)];},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x870)]=function(){const _0x34fb13=_0x2832c8;if(this[_0x34fb13(0x859)][_0x34fb13(0x5ef)]!==undefined)return this[_0x34fb13(0x859)][_0x34fb13(0x5ef)];let _0x4f7060=VisuMZ[_0x34fb13(0x282)][_0x34fb13(0x6e8)][_0x34fb13(0x3fc)][_0x34fb13(0x5dc)];const _0x10fe75=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x4caa94=this[_0x34fb13(0x405)]()[_0x34fb13(0x8b3)](_0x35bc42=>_0x35bc42&&_0x35bc42['note'][_0x34fb13(0x6f0)](_0x10fe75)?Number(RegExp['$1'])/0x64:0x0);return _0x4f7060=_0x4caa94[_0x34fb13(0x317)]((_0x5d641c,_0x433b64)=>_0x5d641c+_0x433b64,_0x4f7060),this[_0x34fb13(0x859)][_0x34fb13(0x5ef)]=_0x4f7060,this[_0x34fb13(0x859)][_0x34fb13(0x5ef)]['clamp'](0.01,0x1);},VisuMZ['BattleCore'][_0x2832c8(0x660)]=Game_BattlerBase['prototype']['die'],Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x41a)]=function(){const _0x408d4a=_0x2832c8;VisuMZ['BattleCore'][_0x408d4a(0x660)][_0x408d4a(0x3c8)](this),SceneManager[_0x408d4a(0x230)]()&&this[_0x408d4a(0x613)]('dead');},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x5b5)]=function(){const _0x4ebe4a=_0x2832c8;if(!SceneManager['isSceneBattle']())return null;if(!SceneManager[_0x4ebe4a(0x37d)]['_spriteset'])return null;return SceneManager[_0x4ebe4a(0x37d)][_0x4ebe4a(0x229)][_0x4ebe4a(0x6df)](this);},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x1d8)]=function(){const _0x16aec1=_0x2832c8;return VisuMZ[_0x16aec1(0x282)][_0x16aec1(0x6e8)][_0x16aec1(0x40e)]['AnchorX'];},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x728)]=function(){const _0x1c673c=_0x2832c8;return VisuMZ[_0x1c673c(0x282)][_0x1c673c(0x6e8)][_0x1c673c(0x40e)][_0x1c673c(0x565)];},Game_BattlerBase['prototype']['svBattlerShadowVisible']=function(){const _0x521d5e=_0x2832c8;return this[_0x521d5e(0x44c)]&&this[_0x521d5e(0x44c)]()?VisuMZ[_0x521d5e(0x282)][_0x521d5e(0x6e8)]['Actor'][_0x521d5e(0x220)]:VisuMZ[_0x521d5e(0x282)][_0x521d5e(0x6e8)][_0x521d5e(0x690)][_0x521d5e(0x220)];},Game_BattlerBase[_0x2832c8(0x749)]['battlerSmoothImage']=function(){return!![];},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x5e9)]=function(){return 0x0;},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x6ee)]=function(){return 0x0;},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x2af)]=function(_0x1f90bc){const _0x119d93=_0x2832c8;if(!_0x1f90bc)return 0x0;let _0x3dbb0e=0x0;const _0x201c4f=_0x1f90bc[_0x119d93(0x75e)];return _0x201c4f[_0x119d93(0x6f0)](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x3dbb0e+=Number(RegExp['$1'])),_0x201c4f[_0x119d93(0x6f0)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3dbb0e+=Number(RegExp['$1'])),_0x3dbb0e;},Game_BattlerBase['prototype'][_0x2832c8(0x87b)]=function(_0x48de11){const _0xf9224b=_0x2832c8;if(!_0x48de11)return 0x0;let _0x379880=0x0;const _0x493d1f=_0x48de11[_0xf9224b(0x75e)];return _0x493d1f[_0xf9224b(0x6f0)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x379880+=Number(RegExp['$1'])),_0x493d1f['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x379880+=Number(RegExp['$2'])),_0x379880;},VisuMZ[_0x2832c8(0x282)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x2832c8(0x749)]['isStateResist'],Game_BattlerBase['prototype']['isStateResist']=function(_0xfe59d6){const _0x5e66c2=_0x2832c8;if(_0xfe59d6===this[_0x5e66c2(0x225)]()&&this[_0x5e66c2(0x8cb)]())return!![];return VisuMZ['BattleCore'][_0x5e66c2(0x6e1)]['call'](this,_0xfe59d6);},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x8cb)]=function(){const _0x13d0a5=_0x2832c8;return this[_0x13d0a5(0x70b)];},Game_BattlerBase['prototype'][_0x2832c8(0x3f5)]=function(_0x2940e0){_0x2940e0?this['addImmortal']():this['removeImmortal']();},Game_BattlerBase['prototype'][_0x2832c8(0x29a)]=function(){const _0x5bc17e=_0x2832c8;if(this[_0x5bc17e(0x7d5)]())return;this[_0x5bc17e(0x70b)]=!![];},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x598)]=function(){const _0x33e3cb=_0x2832c8,_0x496f65=this['isAlive']();this[_0x33e3cb(0x70b)]=![],this[_0x33e3cb(0x7d0)](),this['isDead']()&&_0x496f65&&(this[_0x33e3cb(0x428)](),this[_0x33e3cb(0x3c3)]());},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x5b0)]=Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x73a)],Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x73a)]=function(){const _0x2cbfa0=_0x2832c8;if(!this[_0x2cbfa0(0x51a)]())return![];return VisuMZ[_0x2cbfa0(0x282)][_0x2cbfa0(0x5b0)]['call'](this);},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x51a)]=function(){const _0xe8a74b=_0x2832c8;for(const _0x2e022b of this[_0xe8a74b(0x405)]()){if(!_0x2e022b)continue;if(_0x2e022b[_0xe8a74b(0x75e)][_0xe8a74b(0x6f0)](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x4e1)]=Game_BattlerBase['prototype']['canGuard'],Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x1ed)]=function(){const _0x53a584=_0x2832c8;if(!this[_0x53a584(0x1f4)]())return![];return VisuMZ['BattleCore']['Game_BattlerBase_canGuard'][_0x53a584(0x3c8)](this);},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x1f4)]=function(){const _0x2d9865=_0x2832c8;for(const _0x43caaa of this[_0x2d9865(0x405)]()){if(!_0x43caaa)continue;if(_0x43caaa[_0x2d9865(0x75e)]['match'](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x2832c8(0x749)][_0x2832c8(0x1a7)]=function(){const _0x364302=_0x2832c8;for(const _0x574c57 of this[_0x364302(0x405)]()){if(!_0x574c57)continue;if(_0x574c57['note'][_0x364302(0x6f0)](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ['BattleCore'][_0x2832c8(0x563)]=Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x8ab)],Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x8ab)]=function(){const _0x5ccfb8=_0x2832c8;if(SceneManager[_0x5ccfb8(0x230)]()&&$gameTroop[_0x5ccfb8(0x8e7)]()<=0x0)return;this['processBattleCoreJS']('PreRegenerateJS'),VisuMZ[_0x5ccfb8(0x282)]['Game_Battler_regenerateAll'][_0x5ccfb8(0x3c8)](this),this['regenerateAllBattleCore'](),this[_0x5ccfb8(0x8b1)](_0x5ccfb8(0x525));},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x72e)]=function(){const _0x5662cf=_0x2832c8;if(SceneManager[_0x5662cf(0x230)]())for(const _0x48dc91 of this[_0x5662cf(0x405)]()){if(!_0x48dc91)continue;this['onRegeneratePlayStateAnimation'](_0x48dc91);}},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x445)]=function(_0x5bf0e1){const _0x1096c8=_0x2832c8;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!SceneManager['isSceneBattle']())return;if(this[_0x1096c8(0x7d5)]())return;if(this[_0x1096c8(0x6cb)]())return;if(_0x5bf0e1[_0x1096c8(0x75e)][_0x1096c8(0x6f0)](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0xdf66a9=Number(RegExp['$1']);$gameTemp[_0x1096c8(0x259)]([this],_0xdf66a9,![],![]);}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x2b0)]=Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x5e8)],Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x5e8)]=function(){const _0x30d760=_0x2832c8;this['processBattleCoreJS'](_0x30d760(0x849)),VisuMZ[_0x30d760(0x282)][_0x30d760(0x2b0)]['call'](this),this[_0x30d760(0x8b1)](_0x30d760(0x842));},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x630)]=Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x77e)],Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x77e)]=function(){const _0x58b3a0=_0x2832c8;this[_0x58b3a0(0x8b1)](_0x58b3a0(0x1b7)),VisuMZ[_0x58b3a0(0x282)]['Game_Battler_onTurnEnd'][_0x58b3a0(0x3c8)](this),this[_0x58b3a0(0x8b1)](_0x58b3a0(0x615));},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x8b1)]=function(_0x481189){const _0x417d9a=_0x2832c8,_0x8bf95a=VisuMZ[_0x417d9a(0x282)][_0x417d9a(0x6e8)][_0x417d9a(0x67f)];if(_0x8bf95a[_0x481189])_0x8bf95a[_0x481189][_0x417d9a(0x3c8)](this);for(const _0x569bc1 of this['traitObjects']()){if(!_0x569bc1)continue;key=VisuMZ[_0x417d9a(0x282)]['createKeyJS'](_0x569bc1,_0x481189),VisuMZ['BattleCore']['JS'][key]&&VisuMZ[_0x417d9a(0x282)]['JS'][key][_0x417d9a(0x3c8)](this,this,this,_0x569bc1,0x0);}},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x2ef)]=function(){const _0x160474=_0x2832c8;return VisuMZ['BattleCore'][_0x160474(0x6e8)]['Actor']['ChantStyle']||![];},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x192)]=function(){const _0x51f588=_0x2832c8;if(this['isWaiting']()){if(this[_0x51f588(0x2ef)]()){if(this[_0x51f588(0x371)]['some'](_0x111dfe=>_0x111dfe[_0x51f588(0x703)]()&&_0x111dfe[_0x51f588(0x356)]()))return!![];}else{if(this[_0x51f588(0x371)][_0x51f588(0x41b)](_0x2c30e7=>_0x2c30e7['item']()&&_0x2c30e7[_0x51f588(0x7ba)]()))return!![];}}if(BattleManager[_0x51f588(0x707)]()&&this['_tpbState']==='casting')return this['chantStyle']()?this[_0x51f588(0x6b2)]()&&this[_0x51f588(0x6b2)]()[_0x51f588(0x703)]()&&this[_0x51f588(0x6b2)]()[_0x51f588(0x356)]():this[_0x51f588(0x6b2)]()&&this[_0x51f588(0x6b2)]()[_0x51f588(0x703)]()&&this['currentAction']()[_0x51f588(0x7ba)]();return![];},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x1fa)]=function(){const _0x53b5cb=_0x2832c8;if(BattleManager[_0x53b5cb(0x707)]()&&this[_0x53b5cb(0x43e)]===_0x53b5cb(0x89c))return this[_0x53b5cb(0x2ef)]()?this['currentAction']()&&this[_0x53b5cb(0x6b2)]()[_0x53b5cb(0x703)]()&&!this[_0x53b5cb(0x6b2)]()['isMagical']():this['currentAction']()&&this[_0x53b5cb(0x6b2)]()[_0x53b5cb(0x703)]()&&!this[_0x53b5cb(0x6b2)]()[_0x53b5cb(0x7ba)]();return![];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x864)]=Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x878)],Game_Battler['prototype'][_0x2832c8(0x878)]=function(){const _0x11cf78=_0x2832c8;VisuMZ[_0x11cf78(0x282)][_0x11cf78(0x864)][_0x11cf78(0x3c8)](this),this[_0x11cf78(0x659)]=[];},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x414)]=function(){const _0x2bc62c=_0x2832c8;if(!this[_0x2bc62c(0x659)])this[_0x2bc62c(0x878)]();return this[_0x2bc62c(0x659)][_0x2bc62c(0x720)]>0x0;},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x826)]=function(){const _0x583ed7=_0x2832c8;if(!SceneManager[_0x583ed7(0x230)]())return;if(!this['_damagePopupArray'])this['clearDamagePopup']();this['createSeparateDamagePopups']();const _0x5ece4a=this[_0x583ed7(0x5b5)]();if(_0x5ece4a)_0x5ece4a[_0x583ed7(0x852)]();},Game_Battler[_0x2832c8(0x749)]['createSeparateDamagePopups']=function(){const _0x5a16fa=_0x2832c8,_0x1c5ecd=this[_0x5a16fa(0x64a)]();if(_0x1c5ecd[_0x5a16fa(0x827)]||_0x1c5ecd['evaded']){const _0x3fb735=JsonEx[_0x5a16fa(0x1ef)](_0x1c5ecd);_0x3fb735[_0x5a16fa(0x368)]=![],_0x3fb735['mpDamage']=0x0,this[_0x5a16fa(0x659)]['push'](_0x3fb735);}if(_0x1c5ecd[_0x5a16fa(0x368)]){const _0x51a03c=JsonEx[_0x5a16fa(0x1ef)](_0x1c5ecd);_0x51a03c['missed']=![],_0x51a03c[_0x5a16fa(0x68d)]=![],_0x51a03c[_0x5a16fa(0x6c3)]=0x0,this['_damagePopupArray'][_0x5a16fa(0x7d2)](_0x51a03c);}if(_0x1c5ecd['mpDamage']!==0x0){const _0x490c8e=JsonEx[_0x5a16fa(0x1ef)](_0x1c5ecd);_0x490c8e[_0x5a16fa(0x827)]=![],_0x490c8e['evaded']=![],_0x490c8e[_0x5a16fa(0x368)]=![],this[_0x5a16fa(0x659)][_0x5a16fa(0x7d2)](_0x490c8e);}},Game_Battler['prototype']['getNextDamagePopup']=function(){const _0x5f3e0d=_0x2832c8;if(!this[_0x5f3e0d(0x659)])this[_0x5f3e0d(0x878)]();return VisuMZ[_0x5f3e0d(0x282)][_0x5f3e0d(0x6e8)][_0x5f3e0d(0x3fc)][_0x5f3e0d(0x6b1)]?this[_0x5f3e0d(0x659)][_0x5f3e0d(0x5c7)]():this[_0x5f3e0d(0x659)]['pop']();},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x831)]=function(_0x2f8dc6,_0x12955d){const _0x29e02f=_0x2832c8;if(!SceneManager[_0x29e02f(0x230)]())return;if(!this['battler']())return;if(_0x2f8dc6[_0x29e02f(0x720)]<=0x0)return;_0x12955d=_0x12955d||{},_0x12955d[_0x29e02f(0x2ca)]=_0x12955d[_0x29e02f(0x2ca)]||_0x29e02f(0x349),_0x12955d[_0x29e02f(0x29f)]=_0x12955d[_0x29e02f(0x29f)]||[0x0,0x0,0x0,0x0],_0x12955d['flashDuration']=_0x12955d[_0x29e02f(0x50b)]||0x0,this[_0x29e02f(0x5b5)]()['setupTextPopup'](_0x2f8dc6,_0x12955d);},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x743)]=function(_0x3a0905,_0x395837,_0x8ea468){const _0x397093=_0x2832c8;if(!SceneManager[_0x397093(0x230)]())return;if(!this[_0x397093(0x5b5)]())return;if(_0x395837['length']<=0x0)return;_0x8ea468=_0x8ea468||{},_0x8ea468[_0x397093(0x2ca)]=_0x8ea468['textColor']||'#ffffff',_0x8ea468[_0x397093(0x29f)]=_0x8ea468[_0x397093(0x29f)]||[0x0,0x0,0x0,0x0],_0x8ea468[_0x397093(0x50b)]=_0x8ea468[_0x397093(0x50b)]||0x0,this[_0x397093(0x5b5)]()['setupIconTextPopup'](_0x3a0905,_0x395837,_0x8ea468);},Game_Battler['prototype'][_0x2832c8(0x19f)]=function(){const _0x593632=_0x2832c8;if(this[_0x593632(0x6cb)]())return![];if(this[_0x593632(0x6be)]()&&this[_0x593632(0x2f9)]())return!![];if(this[_0x593632(0x2a2)]()&&this['hasSvBattler']()){if(this[_0x593632(0x7d5)]()&&this['allowCollapse']())return![];}else{if(this[_0x593632(0x7d5)]())return![];}return!![];},VisuMZ['BattleCore'][_0x2832c8(0x30a)]=Game_Battler[_0x2832c8(0x749)]['clearMotion'],Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x666)]=function(){const _0x2c0638=_0x2832c8;VisuMZ[_0x2c0638(0x282)][_0x2c0638(0x30a)][_0x2c0638(0x3c8)](this),this[_0x2c0638(0x1a8)]();},Game_Battler[_0x2832c8(0x749)]['canBattlerMove']=function(){return!![];},Game_Battler['prototype'][_0x2832c8(0x2b5)]=function(){return![];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x755)]=Game_Battler['prototype'][_0x2832c8(0x473)],Game_Battler[_0x2832c8(0x749)]['onBattleStart']=function(_0x5f3612){const _0x59bebb=_0x2832c8;VisuMZ[_0x59bebb(0x282)]['Game_Battler_onBattleStart']['call'](this,_0x5f3612),this[_0x59bebb(0x2e7)](_0x5f3612);},Game_Battler['prototype']['onBattleStartBattleCore']=function(_0x5332f7){this['setBattlerFlip'](![]);},VisuMZ['BattleCore']['Game_Battler_performActionStart']=Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x612)],Game_Battler[_0x2832c8(0x749)]['performActionStart']=function(_0x17e4c8){const _0x164cd1=_0x2832c8;VisuMZ[_0x164cd1(0x282)][_0x164cd1(0x5d1)][_0x164cd1(0x3c8)](this,_0x17e4c8);if(!_0x17e4c8[_0x164cd1(0x58d)]()){const _0x177a47=this[_0x164cd1(0x5b5)]();if(_0x177a47)_0x177a47[_0x164cd1(0x231)]();}this[_0x164cd1(0x4a7)](![]);},Game_Battler['prototype']['performActionEndMembers']=function(){const _0x2af35e=_0x2832c8,_0x13c11c=this['_flinched'];this[_0x2af35e(0x32a)]=![];if(BattleManager[_0x2af35e(0x3df)]()&&this[_0x2af35e(0x517)]()){const _0x3d3f53=this[_0x2af35e(0x5b5)]();if(_0x3d3f53&&_0x13c11c)_0x3d3f53[_0x2af35e(0x231)]();return;}const _0x269483=this[_0x2af35e(0x5b5)]();if(_0x269483)_0x269483['stepBack']();this[_0x2af35e(0x4a7)](![]),this['requestMotionRefresh']();},Game_Battler['prototype'][_0x2832c8(0x80b)]=function(_0x1dbb7e){const _0x5018e7=_0x2832c8;if(_0x1dbb7e['isAttack']())this['performAttack']();else{if(_0x1dbb7e[_0x5018e7(0x58d)]())this[_0x5018e7(0x613)](_0x5018e7(0x232));else{if(_0x1dbb7e[_0x5018e7(0x356)]())this[_0x5018e7(0x613)]('spell');else{if(_0x1dbb7e[_0x5018e7(0x2e5)]())_0x1dbb7e[_0x5018e7(0x703)]()[_0x5018e7(0x817)][_0x5018e7(0x3e3)]>0x0?this['performAttack']():this[_0x5018e7(0x613)](_0x5018e7(0x710));else _0x1dbb7e[_0x5018e7(0x461)]()&&this[_0x5018e7(0x613)](_0x5018e7(0x703));}}}},Game_Battler[_0x2832c8(0x749)]['getAttackMotion']=function(){return $dataSystem['attackMotions'][0x0];},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x469)]=function(){const _0x3afd47=_0x2832c8,_0x3ded66=this['getAttackMotion']();return _0x3ded66?_0x3ded66[_0x3afd47(0x7c0)]:0x0;},Game_Battler[_0x2832c8(0x749)]['performSubstitute']=function(_0x2f0487){const _0x315761=_0x2832c8;if(!$gameSystem[_0x315761(0x593)]())return;const _0x52598b=this[_0x315761(0x5b5)](),_0x46eac7=_0x2f0487[_0x315761(0x5b5)]();if(!_0x52598b||!_0x46eac7)return;const _0x29f174=_0x46eac7[_0x315761(0x4b3)],_0x5b73e1=_0x46eac7[_0x315761(0x8d3)];this['moveBattlerToPoint'](_0x29f174,_0x5b73e1,0x0,![],_0x315761(0x21d),-0x1),_0x52598b['updatePosition']();const _0x146f29=VisuMZ[_0x315761(0x282)][_0x315761(0x6e8)][_0x315761(0x5e4)];let _0x3fd732=(_0x46eac7[_0x315761(0x797)]+_0x52598b['width'])/0x2;_0x3fd732*=this['isActor']()?0x1:-0x1;let _0x538dd6=_0x146f29[_0x315761(0x618)]*(this[_0x315761(0x44c)]()?0x1:-0x1);_0x2f0487[_0x315761(0x24f)](_0x3fd732,_0x538dd6,0x0,![],_0x315761(0x21d)),_0x46eac7[_0x315761(0x3b7)]();},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x613)]=function(_0x5a7678){const _0x1ad742=_0x2832c8;if(SceneManager[_0x1ad742(0x230)]()){const _0x4c1f9b=this[_0x1ad742(0x5b5)]();_0x4c1f9b&&(_0x4c1f9b[_0x1ad742(0x59d)](_0x5a7678),[_0x1ad742(0x819),_0x1ad742(0x1c7),_0x1ad742(0x882)]['includes'](_0x5a7678)&&this[_0x1ad742(0x64d)]());}this[_0x1ad742(0x1a8)]();},Game_Battler['prototype']['performWeaponAnimation']=function(){},Game_Battler['prototype'][_0x2832c8(0x691)]=function(_0x19b18f){const _0x36e3fe=_0x2832c8;if(SceneManager[_0x36e3fe(0x230)]()){const _0x588665=this[_0x36e3fe(0x5b5)]();if(_0x588665)_0x588665['forceWeaponAnimation'](_0x19b18f);}},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x74f)]=function(){const _0x2fb94a=_0x2832c8;if(SceneManager[_0x2fb94a(0x230)]()){const _0x7432e3=this['getAttackWeaponAnimationId']();this[_0x2fb94a(0x691)](_0x7432e3);}},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x833)]=function(_0x128e16,_0x5f0204){const _0x3f0349=_0x2832c8;if(!_0x128e16)return;if(!_0x128e16[_0x3f0349(0x703)]())return;if(_0x128e16['isAttack']())return;if(_0x128e16[_0x3f0349(0x58d)]())return;if(_0x128e16['isItem']())return;let _0x3a371c=0x0;const _0x22cb1a=VisuMZ[_0x3f0349(0x282)][_0x3f0349(0x6e8)][_0x3f0349(0x5e4)],_0x43ff8e=_0x128e16[_0x3f0349(0x703)]()[_0x3f0349(0x75e)];if(_0x43ff8e[_0x3f0349(0x6f0)](/<CAST ANIMATION: (\d+)>/i))_0x3a371c=Number(RegExp['$1']);else{if(_0x43ff8e[_0x3f0349(0x6f0)](/<NO CAST ANIMATION>/i))return;else{if(_0x128e16['isCertainHit']())_0x3a371c=_0x22cb1a[_0x3f0349(0x261)];else{if(_0x128e16['isPhysical']())_0x3a371c=_0x22cb1a['CastPhysical'];else _0x128e16[_0x3f0349(0x356)]()&&(_0x3a371c=_0x22cb1a[_0x3f0349(0x184)]);}}}_0x3a371c>0x0&&$gameTemp['requestAnimation']([this],_0x3a371c,!!_0x5f0204);},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x63b)]=function(){const _0xc491d3=_0x2832c8;SoundManager[_0xc491d3(0x450)]();let _0x34fd01=VisuMZ[_0xc491d3(0x282)][_0xc491d3(0x6e8)][_0xc491d3(0x5e4)][_0xc491d3(0x779)];_0x34fd01>0x0&&$gameTemp[_0xc491d3(0x717)]([this],_0x34fd01);},VisuMZ['BattleCore'][_0x2832c8(0x235)]=Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x86c)],Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x86c)]=function(){const _0x128bac=_0x2832c8;VisuMZ[_0x128bac(0x282)]['Game_Battler_performDamage'][_0x128bac(0x3c8)](this),this[_0x128bac(0x812)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x57a)]=Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x80c)],Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x80c)]=function(){const _0x366770=_0x2832c8;VisuMZ['BattleCore'][_0x366770(0x57a)][_0x366770(0x3c8)](this),this[_0x366770(0x812)]();},VisuMZ['BattleCore'][_0x2832c8(0x7d9)]=Game_Battler['prototype']['performEvasion'],Game_Battler[_0x2832c8(0x749)]['performEvasion']=function(){const _0xbdef52=_0x2832c8;VisuMZ['BattleCore']['Game_Battler_performEvasion'][_0xbdef52(0x3c8)](this),this[_0xbdef52(0x812)]();},Game_Battler['prototype'][_0x2832c8(0x812)]=function(){const _0x328ab1=_0x2832c8;if(!$gameSystem['isSideView']())return;if(this[_0x328ab1(0x32a)])return;this[_0x328ab1(0x32a)]=!![];const _0x5254f3=this['battler']();if(_0x5254f3)_0x5254f3[_0x328ab1(0x239)]();},Game_Battler['prototype'][_0x2832c8(0x3c3)]=function(){const _0x3a9520=_0x2832c8;if(this[_0x3a9520(0x7d5)]()&&this['_motionType']!==_0x3a9520(0x45b)){this[_0x3a9520(0x613)](_0x3a9520(0x45b));return;}if(this[_0x3a9520(0x7d5)]()&&this[_0x3a9520(0x4a4)]===_0x3a9520(0x45b))return;if(!!this[_0x3a9520(0x685)])return;if(this['isEnemy']()){if(!this['isDuringNonLoopingMotion']())this[_0x3a9520(0x5b5)]()['refreshMotion']();this[_0x3a9520(0x1a8)]();return;}if(this['_motionType']==='victory')return;if(this['_motionType']==='escape'&&!BattleManager[_0x3a9520(0x517)]())return;if(this['_motionType']===_0x3a9520(0x232)&&!BattleManager['isInputting']())return;this[_0x3a9520(0x666)]();if(this['battler']()&&BattleManager[_0x3a9520(0x517)]()){this[_0x3a9520(0x5b5)]()[_0x3a9520(0x28f)](),this[_0x3a9520(0x1a8)]();return;}},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x2f7)]=function(){const _0x390c76=_0x2832c8;if(!this[_0x390c76(0x6e3)]())return![];const _0x164b25=this[_0x390c76(0x5b5)]();if(!_0x164b25)return![];const _0x1aa1dd=_0x164b25[_0x390c76(0x3d1)];if(!_0x1aa1dd)return![];const _0x158d6b=_0x1aa1dd['_motion'];return _0x158d6b&&!_0x158d6b[_0x390c76(0x1c1)];},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x22a)]=function(){const _0x3d8777=_0x2832c8;return this[_0x3d8777(0x504)];},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x4a7)]=function(_0x4cbde7){const _0x20a58c=_0x2832c8;if(!$gameSystem[_0x20a58c(0x593)]())return;this[_0x20a58c(0x504)]=_0x4cbde7;const _0x2c6f18=this[_0x20a58c(0x5b5)]();if(_0x2c6f18)_0x2c6f18[_0x20a58c(0x79c)]();},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x57d)]=function(_0x342b62,_0x4cbaee,_0x7dc81b){const _0x51b0e8=_0x2832c8;if(!$gameSystem['isSideView']())return;const _0x433e5c=this['battler']();if(!_0x433e5c)return;if(_0x342b62===_0x433e5c[_0x51b0e8(0x4b3)])return;let _0x3146d5=![];if(this['isActor']()){if(_0x342b62>_0x433e5c[_0x51b0e8(0x4b3)])_0x3146d5=!![];if(_0x342b62<_0x433e5c['_baseX'])_0x3146d5=![];}else{if(this[_0x51b0e8(0x2a2)]()){if(_0x342b62>_0x433e5c['_baseX'])_0x3146d5=![];if(_0x342b62<_0x433e5c[_0x51b0e8(0x4b3)])_0x3146d5=!![];}};this[_0x51b0e8(0x4a7)](_0x7dc81b?!_0x3146d5:_0x3146d5),_0x433e5c['updateFlip']();},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x24f)]=function(_0x1c73dd,_0x425e44,_0x517661,_0x36eac5,_0x231451){const _0xa086b0=_0x2832c8;if(!$gameSystem['isSideView']())return;const _0x1abd3e=this['battler']();if(!_0x1abd3e)return;if(_0x36eac5)this[_0xa086b0(0x57d)](_0x1c73dd+_0x1abd3e[_0xa086b0(0x4b3)],_0x425e44+_0x1abd3e[_0xa086b0(0x8d3)],![]);_0x1c73dd+=_0x1abd3e['_baseX']-_0x1abd3e['_homeX'],_0x425e44+=_0x1abd3e[_0xa086b0(0x8d3)]-_0x1abd3e[_0xa086b0(0x3ab)],_0x1abd3e[_0xa086b0(0x1f7)](_0x1c73dd,_0x425e44,_0x517661);if(Imported[_0xa086b0(0x84a)])_0x1abd3e[_0xa086b0(0x641)](_0x231451||_0xa086b0(0x21d));},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x526)]=function(_0x1516f7,_0xf57cbf,_0xb23b78,_0x59da66,_0x12956d,_0x500165){const _0x304ae8=_0x2832c8;if(!$gameSystem['isSideView']())return;const _0xc004d7=this[_0x304ae8(0x5b5)]();if(!_0xc004d7)return;_0x500165=_0x500165||0x0;if(_0x500165>0x0){if(_0xc004d7[_0x304ae8(0x4b3)]>_0x1516f7)_0x1516f7+=_0xc004d7[_0x304ae8(0x797)]/0x2+_0x500165;if(_0xc004d7[_0x304ae8(0x4b3)]<_0x1516f7)_0x1516f7-=_0xc004d7['width']/0x2+_0x500165;}if(_0x59da66)this['setBattlerFacePoint'](_0x1516f7,_0xf57cbf,![]);_0x1516f7-=_0xc004d7[_0x304ae8(0x84b)],_0xf57cbf-=_0xc004d7[_0x304ae8(0x3ab)],_0xc004d7[_0x304ae8(0x1f7)](_0x1516f7,_0xf57cbf,_0xb23b78);if(Imported['VisuMZ_0_CoreEngine'])_0xc004d7[_0x304ae8(0x641)](_0x12956d||_0x304ae8(0x21d));},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x69c)]=function(_0x2038cf,_0x2eb213,_0x299525){const _0x1acfc8=_0x2832c8;if(!$gameSystem[_0x1acfc8(0x593)]())return;const _0x550c6b=this['battler']();if(!_0x550c6b)return;_0x550c6b['startFloat'](_0x2038cf,_0x2eb213,_0x299525);},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x2bd)]=function(_0x36e01b,_0x5793a8){const _0x3b661e=_0x2832c8;if(!$gameSystem[_0x3b661e(0x593)]())return;const _0x5515f0=this['battler']();if(!_0x5515f0)return;_0x5515f0['startJump'](_0x36e01b,_0x5793a8);},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x25a)]=function(_0x2033db,_0x29852e,_0x161b89,_0x1fba75){const _0x3021e0=_0x2832c8;if(!$gameSystem[_0x3021e0(0x593)]())return;const _0x5148cb=this[_0x3021e0(0x5b5)]();if(!_0x5148cb)return;_0x5148cb['startSpin'](_0x2033db,_0x29852e,_0x161b89,_0x1fba75);},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x33b)]=function(_0x9b4014,_0x2c7360,_0x3653db,_0xcfd940){const _0x17a773=_0x2832c8;if(!$gameSystem['isSideView']())return;const _0x3f8edc=this['battler']();if(!_0x3f8edc)return;this[_0x17a773(0x44c)]()&&(_0x9b4014*=-0x1,_0x2c7360*=-0x1),_0x3f8edc[_0x17a773(0x8ae)](_0x9b4014,_0x2c7360,_0x3653db,_0xcfd940);},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x8ea)]=function(_0x8b06a7,_0x594b23,_0x1ad134,_0x3a232f){const _0x553089=_0x2832c8;if(!$gameSystem[_0x553089(0x593)]())return;const _0x1fd0d7=this[_0x553089(0x5b5)]();if(!_0x1fd0d7)return;_0x1fd0d7['startGrow'](_0x8b06a7,_0x594b23,_0x1ad134,_0x3a232f);},Game_Battler[_0x2832c8(0x749)]['changeBattlerOpacity']=function(_0xeeebf5,_0x4aeabf,_0x4f0bdc){const _0x14cdf2=_0x2832c8;if(!$gameSystem[_0x14cdf2(0x593)]())return;const _0x195c90=this[_0x14cdf2(0x5b5)]();if(!_0x195c90)return;_0x195c90[_0x14cdf2(0x836)](_0xeeebf5,_0x4aeabf,_0x4f0bdc);},Game_Battler['prototype'][_0x2832c8(0x1a8)]=function(){const _0x228bf0=_0x2832c8,_0x51831e=!!this[_0x228bf0(0x685)];this[_0x228bf0(0x685)]=undefined,_0x51831e&&(this[_0x228bf0(0x3c3)](),this[_0x228bf0(0x7e6)]());},Game_Battler['prototype'][_0x2832c8(0x7e6)]=function(){const _0x2dc58f=_0x2832c8;if(!SceneManager[_0x2dc58f(0x230)]())return;const _0x37428d=this[_0x2dc58f(0x5b5)]();if(!_0x37428d)return;let _0x2bca09=this[_0x2dc58f(0x44c)]()?_0x37428d[_0x2dc58f(0x8c9)]:_0x37428d[_0x2dc58f(0x3d1)]['_weaponSprite'];_0x2bca09&&_0x2bca09['setup'](0x0);},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x568)]=function(_0x1d7389,_0x1b3d1,_0x2c5d00){const _0x571369=_0x2832c8;if(this['isEnemy']()&&!this[_0x571369(0x6e3)]())return;let _0x5d5c01=0x0,_0x2ca957=0x0;_0x1d7389[_0x571369(0x6f0)](/ATTACK[ ](\d+)/i)&&(_0x2ca957=Number(RegExp['$1']),_0x2ca957--);if(this[_0x571369(0x44c)]()){const _0x482bb4=this[_0x571369(0x285)]();_0x5d5c01=_0x482bb4[_0x2ca957]?_0x482bb4[_0x2ca957][_0x571369(0x7cb)]:0x0;}else this[_0x571369(0x2a2)]()&&(_0x5d5c01=this[_0x571369(0x300)]()[_0x571369(0x7cb)]||0x0);const _0x2429a3=$dataSystem[_0x571369(0x62b)][_0x5d5c01];_0x1d7389['match'](/attack/i)&&(_0x1d7389=[_0x571369(0x1c7),_0x571369(0x819),_0x571369(0x882)][_0x2429a3[_0x571369(0x3e3)]]||_0x571369(0x819)),this[_0x571369(0x685)]={'motionType':_0x1d7389,'weaponImageId':_0x1b3d1?_0x2429a3[_0x571369(0x7c0)]:0x0,'pattern':_0x2c5d00};},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x74c)]=function(_0x40dbff){if(!_0x40dbff)return![];return _0x40dbff['friendsUnit']()===this['friendsUnit']();},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x340)]=function(_0x3b6fc9){const _0x45547a=_0x2832c8;if(!_0x3b6fc9)return![];return _0x3b6fc9[_0x45547a(0x266)]()===this[_0x45547a(0x739)]();},VisuMZ[_0x2832c8(0x282)]['Game_Actor_setup']=Game_Actor[_0x2832c8(0x749)]['setup'],Game_Actor[_0x2832c8(0x749)]['setup']=function(_0x286734){const _0x7708d2=_0x2832c8;VisuMZ['BattleCore'][_0x7708d2(0x85b)][_0x7708d2(0x3c8)](this,_0x286734),this[_0x7708d2(0x61d)]();},Game_Actor[_0x2832c8(0x749)]['initBattlePortrait']=function(){const _0x5ebd63=_0x2832c8;this['_battlePortrait']='',this['actor']()&&this[_0x5ebd63(0x42b)]()[_0x5ebd63(0x75e)][_0x5ebd63(0x6f0)](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x5ebd63(0x64c)]=String(RegExp['$1']));},Game_Actor[_0x2832c8(0x749)]['getBattlePortraitFilename']=function(){const _0x1638fe=_0x2832c8;if(this[_0x1638fe(0x683)]()!=='')return this[_0x1638fe(0x683)]();else{if(Imported[_0x1638fe(0x35f)]&&this[_0x1638fe(0x787)]()!=='')return this[_0x1638fe(0x787)]();}return'';},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x683)]=function(){const _0xaf5221=_0x2832c8;if(this[_0xaf5221(0x64c)]===undefined)this[_0xaf5221(0x61d)]();return this[_0xaf5221(0x64c)];},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x7b2)]=function(_0x3dbf49){const _0x24e547=_0x2832c8;if(this[_0x24e547(0x64c)]===undefined)this['initBattlePortrait']();this[_0x24e547(0x64c)]=_0x3dbf49;if(SceneManager['isSceneBattle']()&&$gameParty[_0x24e547(0x86b)]()[_0x24e547(0x569)](this)){const _0x467ae8=SceneManager[_0x24e547(0x37d)][_0x24e547(0x244)];if(_0x467ae8)_0x467ae8[_0x24e547(0x545)](this);}},Game_Actor[_0x2832c8(0x749)]['isSpriteVisible']=function(){return!![];},Game_Actor['prototype']['isAutoBattle']=function(){const _0x2d37a0=_0x2832c8;if(!this[_0x2d37a0(0x372)]()&&BattleManager[_0x2d37a0(0x7a4)])return!![];return Game_Battler[_0x2d37a0(0x749)][_0x2d37a0(0x865)][_0x2d37a0(0x3c8)](this);},VisuMZ['BattleCore']['Game_Actor_makeActionList']=Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x34f)],Game_Actor[_0x2832c8(0x749)]['makeActionList']=function(){const _0x2596ac=_0x2832c8;if(BattleManager[_0x2596ac(0x7a4)]&&!ConfigManager[_0x2596ac(0x489)])return this[_0x2596ac(0x521)]();else{return VisuMZ[_0x2596ac(0x282)][_0x2596ac(0x256)][_0x2596ac(0x3c8)](this);;}},Game_Actor[_0x2832c8(0x749)]['makeActionListAutoAttack']=function(){const _0xe86bd3=_0x2832c8,_0x4c9bb5=[],_0x406ff2=new Game_Action(this);return _0x406ff2[_0xe86bd3(0x807)](),_0x4c9bb5[_0xe86bd3(0x7d2)](_0x406ff2),_0x4c9bb5;},Game_Actor['prototype'][_0x2832c8(0x444)]=function(){const _0x18d6d9=_0x2832c8;return this[_0x18d6d9(0x1c6)]()[_0x18d6d9(0x75e)]['match'](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?String(RegExp['$1'])[_0x18d6d9(0x5e1)](/[\r\n]+/):VisuMZ[_0x18d6d9(0x282)][_0x18d6d9(0x6e8)][_0x18d6d9(0x1f9)]['BattleCmdList'];},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x1d8)]=function(){const _0x3483ab=_0x2832c8;if(this[_0x3483ab(0x859)]['svAnchorX']!==undefined)return this[_0x3483ab(0x859)][_0x3483ab(0x37f)];return this[_0x3483ab(0x42b)]()['note'][_0x3483ab(0x6f0)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this['_cache'][_0x3483ab(0x37f)]=eval(RegExp['$1']),this[_0x3483ab(0x859)][_0x3483ab(0x1d9)]=eval(RegExp['$2'])):this[_0x3483ab(0x859)][_0x3483ab(0x37f)]=Game_Battler[_0x3483ab(0x749)][_0x3483ab(0x1d8)][_0x3483ab(0x3c8)](this),this[_0x3483ab(0x859)][_0x3483ab(0x37f)];},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x728)]=function(){const _0x4def0b=_0x2832c8;if(this[_0x4def0b(0x859)]['svAnchorY']!==undefined)return this['_cache'][_0x4def0b(0x1d9)];return this[_0x4def0b(0x42b)]()['note']['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x4def0b(0x859)][_0x4def0b(0x37f)]=eval(RegExp['$1']),this[_0x4def0b(0x859)][_0x4def0b(0x1d9)]=eval(RegExp['$2'])):this[_0x4def0b(0x859)][_0x4def0b(0x1d9)]=Game_Battler[_0x4def0b(0x749)][_0x4def0b(0x728)][_0x4def0b(0x3c8)](this),this['_cache'][_0x4def0b(0x1d9)];},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x357)]=function(){const _0x21c255=_0x2832c8;if(this[_0x21c255(0x859)]['svShadow']!==undefined)return this[_0x21c255(0x859)]['svShadow'];if(this['actor']()[_0x21c255(0x75e)][_0x21c255(0x6f0)](/<SIDEVIEW SHOW SHADOW>/i))this['_cache'][_0x21c255(0x738)]=!![];else this['actor']()[_0x21c255(0x75e)][_0x21c255(0x6f0)](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x21c255(0x859)]['svShadow']=![]:this[_0x21c255(0x859)]['svShadow']=Game_Battler['prototype']['svBattlerShadowVisible']['call'](this);return this[_0x21c255(0x859)][_0x21c255(0x738)];},Game_Actor['prototype'][_0x2832c8(0x7aa)]=function(){const _0x309806=_0x2832c8;return VisuMZ[_0x309806(0x282)]['Settings']['Actor'][_0x309806(0x547)];},Game_Actor['prototype']['performWeaponAnimation']=function(){const _0x2a4a41=_0x2832c8,_0x529ab9=this[_0x2a4a41(0x285)](),_0x51fa7e=_0x529ab9[0x0]?_0x529ab9[0x0][_0x2a4a41(0x7cb)]:0x0,_0x5d6a35=$dataSystem['attackMotions'][_0x51fa7e];_0x5d6a35&&this[_0x2a4a41(0x691)](_0x5d6a35[_0x2a4a41(0x7c0)]);},Game_Actor['prototype'][_0x2832c8(0x1c5)]=function(_0x3adb95){const _0x4793ab=_0x2832c8;Game_Battler[_0x4793ab(0x749)][_0x4793ab(0x1c5)][_0x4793ab(0x3c8)](this,_0x3adb95),this['performActionMotions'](_0x3adb95);},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x429)]=function(){const _0x5e6daa=_0x2832c8,_0x52f147=this[_0x5e6daa(0x285)](),_0x28242e=_0x52f147[0x0]?_0x52f147[0x0]['wtypeId']:0x0;return $dataSystem[_0x5e6daa(0x62b)][_0x28242e];},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x249)]=function(_0x30cdbd){const _0x114eff=_0x2832c8;_0x30cdbd=_0x30cdbd||0x1,_0x30cdbd--;const _0x3b37a7=this['weapons']();return _0x3b37a7[_0x30cdbd]?_0x3b37a7[_0x30cdbd][_0x114eff(0x38d)]:0x0;},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x549)]=function(_0x3db91e){const _0x13480b=_0x2832c8;_0x3db91e=_0x3db91e||0x1,_0x3db91e--;const _0x3bd9b6=this[_0x13480b(0x285)](),_0x2a8eb7=_0x3bd9b6[_0x3db91e]?_0x3bd9b6[_0x3db91e]['wtypeId']:0x0;return $dataSystem[_0x13480b(0x62b)][_0x2a8eb7];},Game_Actor['prototype'][_0x2832c8(0x37c)]=function(_0x238641){const _0x1b5e22=_0x2832c8;_0x238641=_0x238641||0x1,_0x238641--;const _0x885ad2=this['weapons'](),_0x1d0b99=_0x885ad2[_0x238641]?_0x885ad2[_0x238641][_0x1b5e22(0x7cb)]:0x0,_0x474422=$dataSystem[_0x1b5e22(0x62b)][_0x1d0b99];if(_0x474422){if(_0x474422[_0x1b5e22(0x3e3)]===0x0)this[_0x1b5e22(0x613)]('thrust');else{if(_0x474422['type']===0x1)this['requestMotion'](_0x1b5e22(0x819));else _0x474422[_0x1b5e22(0x3e3)]===0x2&&this[_0x1b5e22(0x613)]('missile');}this[_0x1b5e22(0x691)](_0x474422[_0x1b5e22(0x7c0)]);}},Game_Battler[_0x2832c8(0x749)]['setActiveWeaponSlot']=function(_0xb7d76e){this['_activeWeaponSlot']=_0xb7d76e||0x0;},Game_Battler['prototype'][_0x2832c8(0x207)]=function(){const _0x11be00=_0x2832c8;this[_0x11be00(0x19c)]=this['_activeWeaponSlot']||0x0,this[_0x11be00(0x19c)]++;},Game_Battler[_0x2832c8(0x749)][_0x2832c8(0x6d1)]=function(){const _0x54939e=_0x2832c8;this[_0x54939e(0x19c)]=undefined;},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x5a9)]=Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x6f4)],Game_Actor['prototype'][_0x2832c8(0x6f4)]=function(){const _0x12b131=_0x2832c8;let _0x195eb8=VisuMZ[_0x12b131(0x282)]['Game_Actor_equips'][_0x12b131(0x3c8)](this);if(this[_0x12b131(0x747)])return _0x195eb8;if(this[_0x12b131(0x19c)]!==undefined){this[_0x12b131(0x747)]=!![];const _0x4369fc=this[_0x12b131(0x7b1)]();for(let _0x1a8a99=0x0;_0x1a8a99<_0x4369fc['length'];_0x1a8a99++){_0x4369fc[_0x1a8a99]===0x1&&this[_0x12b131(0x19c)]!==_0x1a8a99&&(_0x195eb8[_0x1a8a99]=null);}this['_tempEquipCheck']=undefined;}return _0x195eb8;},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x82e)]=function(_0x5c28c5){const _0x7dba36=_0x2832c8;return _0x5c28c5['isActor']()?_0x5c28c5[_0x7dba36(0x285)]()['length']||0x1:0x1;},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x8c0)]=function(_0x2c796b,_0x48eed7){const _0x10c47d=_0x2832c8;_0x2c796b&&_0x2c796b[_0x10c47d(0x44c)]()&&_0x2c796b[_0x10c47d(0x6e9)](_0x48eed7),this['callNextMethod']();},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x379)]=function(_0x3b0ad4){const _0x1bb183=_0x2832c8;_0x3b0ad4&&_0x3b0ad4[_0x1bb183(0x44c)]()&&_0x3b0ad4[_0x1bb183(0x6d1)](),this[_0x1bb183(0x6aa)]();},Game_Actor[_0x2832c8(0x749)]['battleUIOffsetX']=function(){const _0x5aabda=_0x2832c8;let _0x337541=_0x5aabda(0x5e9);if(this[_0x5aabda(0x4f1)](_0x337541))return this[_0x5aabda(0x859)][_0x337541];return this['_cache'][_0x337541]=this[_0x5aabda(0x2af)](this[_0x5aabda(0x42b)]()),this[_0x5aabda(0x859)][_0x337541];},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x6ee)]=function(){const _0x229573=_0x2832c8;let _0x59616d=_0x229573(0x6ee);if(this[_0x229573(0x4f1)](_0x59616d))return this[_0x229573(0x859)][_0x59616d];return this['_cache'][_0x59616d]=this[_0x229573(0x87b)](this[_0x229573(0x42b)]()),this['_cache'][_0x59616d];},VisuMZ[_0x2832c8(0x282)]['Game_Enemy_setup']=Game_Enemy['prototype'][_0x2832c8(0x805)],Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x805)]=function(_0x134d43,_0x51e9c8,_0x15d3f9){const _0x2ce149=_0x2832c8;_0x134d43=DataManager[_0x2ce149(0x5a2)](_0x134d43),VisuMZ[_0x2ce149(0x282)][_0x2ce149(0x211)]['call'](this,_0x134d43,_0x51e9c8,_0x15d3f9),Imported[_0x2ce149(0x404)]&&this[_0x2ce149(0x752)](),this[_0x2ce149(0x4f5)](),this[_0x2ce149(0x2e0)](),Imported[_0x2ce149(0x404)]&&this['recoverAll']();},Game_Enemy['prototype'][_0x2832c8(0x4f5)]=function(){const _0x145ddd=_0x2832c8,_0x5b1e8a=VisuMZ[_0x145ddd(0x282)][_0x145ddd(0x6e8)][_0x145ddd(0x690)];this['_attackAnimationId']=_0x5b1e8a[_0x145ddd(0x529)],this[_0x145ddd(0x830)]={};},Game_Enemy['prototype'][_0x2832c8(0x2e0)]=function(){const _0x360d91=_0x2832c8,_0x186878=VisuMZ[_0x360d91(0x282)][_0x360d91(0x6e8)][_0x360d91(0x690)],_0xf00c45=this[_0x360d91(0x297)]()[_0x360d91(0x75e)];this[_0x360d91(0x830)]={'name':'','wtypeId':_0x186878[_0x360d91(0x74d)],'collapse':_0x186878[_0x360d91(0x850)],'motionIdle':_0x186878[_0x360d91(0x79f)],'width':_0x186878['Width']||0x40,'height':_0x186878[_0x360d91(0x83a)]||0x40,'anchorX':_0x186878[_0x360d91(0x3f6)]||0x0,'anchorY':_0x186878[_0x360d91(0x565)]||0x0,'shadow':_0x186878['Shadow']};_0xf00c45[_0x360d91(0x6f0)](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x360d91(0x345)]=Number(RegExp['$1']));const _0x17cfc3=this[_0x360d91(0x830)];if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW BATTLER: (.*)>/i))_0x17cfc3[_0x360d91(0x6f3)]=String(RegExp['$1']);else{if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x2806f1=String(RegExp['$1'])[_0x360d91(0x5e1)](/[\r\n]+/)[_0x360d91(0x19a)]('');_0x17cfc3[_0x360d91(0x6f3)]=DataManager[_0x360d91(0x5bb)](_0x2806f1);}}_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x17cfc3[_0x360d91(0x6bb)]=eval(RegExp['$1']),_0x17cfc3[_0x360d91(0x7de)]=eval(RegExp['$2']));if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW COLLAPSE>/i))_0x17cfc3['collapse']=!![];else _0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW NO COLLAPSE>/i)&&(_0x17cfc3[_0x360d91(0x56e)]=![]);if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW SHOW SHADOW>/i))_0x17cfc3[_0x360d91(0x8cf)]=!![];else _0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x17cfc3[_0x360d91(0x8cf)]=![]);if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW IDLE MOTION: (.*)>/i))_0x17cfc3['motionIdle']=String(RegExp['$1'])[_0x360d91(0x188)]()['trim']();else{if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x2d9ee8=String(RegExp['$1'])[_0x360d91(0x5e1)](/[\r\n]+/)[_0x360d91(0x19a)]('');_0x17cfc3[_0x360d91(0x56f)]=DataManager[_0x360d91(0x5bb)](_0x2d9ee8);}}_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x17cfc3[_0x360d91(0x797)]=Number(RegExp['$1']),_0x17cfc3[_0x360d91(0x28d)]=Number(RegExp['$2']));if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW WEAPON: (.*)>/i))_0x17cfc3[_0x360d91(0x7cb)]=DataManager['getWtypeIdWithName'](RegExp['$1']);else{if(_0xf00c45[_0x360d91(0x6f0)](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x2c1400=String(RegExp['$1'])[_0x360d91(0x5e1)](/[\r\n]+/)[_0x360d91(0x19a)](''),_0x40d51d=DataManager[_0x360d91(0x5bb)](_0x2c1400);_0x17cfc3[_0x360d91(0x7cb)]=DataManager[_0x360d91(0x2d4)](_0x40d51d);}}if(Imported[_0x360d91(0x404)]){const _0x4289eb=this[_0x360d91(0x6ea)]();for(const _0x3bdb58 of _0x4289eb){const _0x580791=this[_0x360d91(0x5fc)](_0x3bdb58)['Name'][_0x360d91(0x716)]()[_0x360d91(0x757)](),_0x27956c=_0x3bdb58[_0x360d91(0x716)]()['trim']();if(_0xf00c45['match'](VisuMZ[_0x360d91(0x351)]['RegExp'][_0x360d91(0x260)[_0x360d91(0x668)](_0x27956c,_0x580791)]))_0x17cfc3['name']=String(RegExp['$1']);else{if(_0xf00c45[_0x360d91(0x6f0)](VisuMZ[_0x360d91(0x351)][_0x360d91(0x86f)]['SvBattlerMass-%1-%2'[_0x360d91(0x668)](_0x27956c,_0x580791)])){const _0x3fc78f=String(RegExp['$1'])[_0x360d91(0x5e1)](/[\r\n]+/)['remove']('');_0x17cfc3['name']=DataManager[_0x360d91(0x5bb)](_0x3fc78f);}}if(_0xf00c45[_0x360d91(0x6f0)](VisuMZ[_0x360d91(0x351)][_0x360d91(0x86f)][_0x360d91(0x420)['format'](_0x27956c,_0x580791)]))_0x17cfc3['wtypeId']=DataManager['getWtypeIdWithName'](RegExp['$1']);else{if(_0xf00c45[_0x360d91(0x6f0)](VisuMZ[_0x360d91(0x351)][_0x360d91(0x86f)][_0x360d91(0x6b7)[_0x360d91(0x668)](_0x27956c,_0x580791)])){const _0x3792a=String(RegExp['$1'])[_0x360d91(0x5e1)](/[\r\n]+/)[_0x360d91(0x19a)](''),_0x45986d=DataManager[_0x360d91(0x5bb)](_0x3792a);_0x17cfc3['wtypeId']=DataManager['getWtypeIdWithName'](_0x45986d);}}if(_0xf00c45[_0x360d91(0x6f0)](VisuMZ['ElementStatusCore'][_0x360d91(0x86f)][_0x360d91(0x60d)['format'](_0x27956c,_0x580791)]))_0x17cfc3['motionIdle']=String(RegExp['$1'])[_0x360d91(0x188)]()['trim']();else{if(_0xf00c45[_0x360d91(0x6f0)](VisuMZ[_0x360d91(0x351)][_0x360d91(0x86f)][_0x360d91(0x6c2)[_0x360d91(0x668)](_0x27956c,_0x580791)])){const _0x50cfbc=String(RegExp['$1'])[_0x360d91(0x5e1)](/[\r\n]+/)[_0x360d91(0x19a)]('');_0x17cfc3['motionIdle']=DataManager[_0x360d91(0x5bb)](_0x50cfbc);}}}}},Game_Enemy[_0x2832c8(0x749)]['attackAnimationId1']=function(){const _0x3d7431=_0x2832c8;return this[_0x3d7431(0x345)]||0x0;},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x524)]=function(){const _0x34639b=_0x2832c8;return this[_0x34639b(0x6ad)]();},Game_Enemy['prototype'][_0x2832c8(0x249)]=function(_0x1f20f4){const _0x1c9481=_0x2832c8;return this[_0x1c9481(0x6ad)]();},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x2d9)]=function(){const _0x400bb0=_0x2832c8;if(this[_0x400bb0(0x297)]()[_0x400bb0(0x75e)][_0x400bb0(0x6f0)](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler['prototype'][_0x400bb0(0x2d9)][_0x400bb0(0x3c8)](this);},Game_Enemy['prototype'][_0x2832c8(0x2b5)]=function(){const _0x3c3448=_0x2832c8;if(this[_0x3c3448(0x297)]()[_0x3c3448(0x75e)][_0x3c3448(0x6f0)](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy[_0x2832c8(0x749)]['skills']=function(){const _0x1afada=_0x2832c8,_0x19c8ef=[];for(const _0x1580cf of this[_0x1afada(0x297)]()[_0x1afada(0x61a)]){const _0x28cb4b=$dataSkills[_0x1580cf[_0x1afada(0x2a6)]];if(_0x28cb4b&&!_0x19c8ef['includes'](_0x28cb4b))_0x19c8ef[_0x1afada(0x7d2)](_0x28cb4b);}return _0x19c8ef;},Game_Enemy['prototype']['battleUIOffsetX']=function(){const _0x547b84=_0x2832c8;let _0x4da149=_0x547b84(0x5e9);if(this['checkCacheKey'](_0x4da149))return this[_0x547b84(0x859)][_0x4da149];return this[_0x547b84(0x859)][_0x4da149]=this[_0x547b84(0x2af)](this[_0x547b84(0x297)]()),this['_cache'][_0x4da149];},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x6ee)]=function(){const _0x35e930=_0x2832c8;let _0x51f05c=_0x35e930(0x6ee);if(this['checkCacheKey'](_0x51f05c))return this['_cache'][_0x51f05c];return this[_0x35e930(0x859)][_0x51f05c]=this[_0x35e930(0x87b)](this['enemy']()),this[_0x35e930(0x859)][_0x51f05c];},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x300)]=function(){const _0x18747e=_0x2832c8;if(this[_0x18747e(0x830)]!==undefined)return this[_0x18747e(0x830)];return this[_0x18747e(0x2e0)](),this[_0x18747e(0x830)];},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x6e3)]=function(){const _0x21074c=_0x2832c8;return this['svBattlerData']()[_0x21074c(0x6f3)]!=='';},Game_Enemy['prototype']['svBattlerName']=function(){const _0x1b670d=_0x2832c8;return this[_0x1b670d(0x300)]()[_0x1b670d(0x6f3)];},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x7aa)]=function(){const _0x113723=_0x2832c8;return this[_0x113723(0x6e3)]()?VisuMZ[_0x113723(0x282)]['Settings'][_0x113723(0x40e)]['SmoothImage']:VisuMZ['BattleCore']['Settings'][_0x113723(0x690)][_0x113723(0x547)];},Game_Enemy[_0x2832c8(0x749)]['performAction']=function(_0x973daf){const _0x2b2ee6=_0x2832c8;Game_Battler[_0x2b2ee6(0x749)]['performAction']['call'](this,_0x973daf);if(this[_0x2b2ee6(0x6e3)]())this[_0x2b2ee6(0x80b)](_0x973daf);},Game_Enemy[_0x2832c8(0x749)]['performAttack']=function(){const _0x418ff8=_0x2832c8,_0x164790=this['svBattlerData']()[_0x418ff8(0x7cb)]||0x0,_0x23ed46=$dataSystem[_0x418ff8(0x62b)][_0x164790];if(_0x23ed46){if(_0x23ed46[_0x418ff8(0x3e3)]===0x0)this[_0x418ff8(0x613)](_0x418ff8(0x1c7));else{if(_0x23ed46[_0x418ff8(0x3e3)]===0x1)this[_0x418ff8(0x613)](_0x418ff8(0x819));else _0x23ed46[_0x418ff8(0x3e3)]===0x2&&this[_0x418ff8(0x613)](_0x418ff8(0x882));}}},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x64d)]=function(){const _0x58bb93=_0x2832c8,_0x32f9b8=this[_0x58bb93(0x300)]()[_0x58bb93(0x7cb)]||0x0,_0x4ef347=$dataSystem[_0x58bb93(0x62b)][_0x32f9b8];_0x4ef347&&this['startWeaponAnimation'](_0x4ef347[_0x58bb93(0x7c0)]);},Game_Enemy['prototype']['getAttackMotion']=function(){const _0x557d62=_0x2832c8,_0x1ba870=this[_0x557d62(0x300)]()[_0x557d62(0x7cb)]||0x0;return $dataSystem[_0x557d62(0x62b)][_0x1ba870];},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x549)]=function(_0x113b56){const _0x4e53c4=_0x2832c8;return this[_0x4e53c4(0x429)]();},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x86c)]=function(){const _0x154722=_0x2832c8;Game_Battler[_0x154722(0x749)]['performDamage'][_0x154722(0x3c8)](this),this[_0x154722(0x1ce)]()&&this[_0x154722(0x6e3)]()&&this[_0x154722(0x613)]('damage'),SoundManager[_0x154722(0x851)]();},Game_Enemy['prototype']['performEvasion']=function(){const _0x266734=_0x2832c8;Game_Battler[_0x266734(0x749)][_0x266734(0x4e4)][_0x266734(0x3c8)](this),this['requestMotion'](_0x266734(0x3a7));},Game_Enemy['prototype'][_0x2832c8(0x193)]=function(){const _0x136e3e=_0x2832c8;Game_Battler[_0x136e3e(0x749)][_0x136e3e(0x193)][_0x136e3e(0x3c8)](this),this[_0x136e3e(0x613)]('evade');},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x7b6)]=function(){const _0xe6b582=_0x2832c8;Game_Battler[_0xe6b582(0x749)][_0xe6b582(0x7b6)][_0xe6b582(0x3c8)](this),this[_0xe6b582(0x5ab)]();},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x6a0)]=function(){const _0x5e36b2=_0x2832c8;if(this[_0x5e36b2(0x6e3)]()){if(this[_0x5e36b2(0x58f)]()>=0x1)return!![];return this[_0x5e36b2(0x300)]()['collapse'];}else return!![];},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x1d8)]=function(){const _0x2d103c=_0x2832c8;return this['svBattlerData']()[_0x2d103c(0x6bb)];},Game_Enemy['prototype'][_0x2832c8(0x728)]=function(){const _0x4e843d=_0x2832c8;return this[_0x4e843d(0x300)]()[_0x4e843d(0x7de)];},Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x357)]=function(){const _0x414237=_0x2832c8;return this[_0x414237(0x300)]()['shadow'];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x8c3)]=Game_Enemy[_0x2832c8(0x749)][_0x2832c8(0x397)],Game_Enemy[_0x2832c8(0x749)]['transform']=function(_0x275304){const _0x96084e=_0x2832c8;VisuMZ[_0x96084e(0x282)][_0x96084e(0x8c3)]['call'](this,_0x275304),this[_0x96084e(0x4f5)](),this[_0x96084e(0x2e0)]();const _0x12f6d0=this['battler']();if(_0x12f6d0)_0x12f6d0['setBattler'](this);},Game_Unit[_0x2832c8(0x749)]['processBattleCoreJS']=function(_0x519b91){const _0x5ce4e0=_0x2832c8;for(const _0x5af899 of this[_0x5ce4e0(0x7b3)]()){if(_0x5af899)_0x5af899[_0x5ce4e0(0x8b1)](_0x519b91);}},Game_Unit[_0x2832c8(0x749)][_0x2832c8(0x65d)]=function(){const _0x524422=_0x2832c8,_0x84cb2c=this[_0x524422(0x692)]();return _0x84cb2c[Math['randomInt'](_0x84cb2c[_0x524422(0x720)])];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x1df)]=Game_Party[_0x2832c8(0x749)][_0x2832c8(0x4e2)],Game_Party[_0x2832c8(0x749)][_0x2832c8(0x4e2)]=function(_0x4ce4fd){const _0x4552ec=_0x2832c8;VisuMZ[_0x4552ec(0x282)]['Game_Party_addActor'][_0x4552ec(0x3c8)](this,_0x4ce4fd),BattleManager[_0x4552ec(0x550)]();},VisuMZ['BattleCore']['Game_Party_removeActor']=Game_Party['prototype'][_0x2832c8(0x736)],Game_Party['prototype'][_0x2832c8(0x736)]=function(_0x2d7af5){const _0x1416ea=_0x2832c8;VisuMZ[_0x1416ea(0x282)][_0x1416ea(0x83b)][_0x1416ea(0x3c8)](this,_0x2d7af5),BattleManager[_0x1416ea(0x550)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x3d7)]=Game_Troop[_0x2832c8(0x749)][_0x2832c8(0x805)],Game_Troop[_0x2832c8(0x749)][_0x2832c8(0x805)]=function(_0x45aaa9){const _0x4ca04f=_0x2832c8;$gameTemp[_0x4ca04f(0x55e)](),$gameTemp[_0x4ca04f(0x364)](_0x45aaa9),VisuMZ['BattleCore']['Game_Troop_setup'][_0x4ca04f(0x3c8)](this,_0x45aaa9);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x534)]=Game_Map['prototype'][_0x2832c8(0x1cf)],Game_Map[_0x2832c8(0x749)][_0x2832c8(0x1cf)]=function(){const _0x49c1ad=_0x2832c8;VisuMZ[_0x49c1ad(0x282)]['Game_Map_setupBattleback']['call'](this),this[_0x49c1ad(0x806)]();},Game_Map[_0x2832c8(0x749)][_0x2832c8(0x806)]=function(){const _0x917db1=_0x2832c8;this['_regionBattleback1']={},this['_regionBattleback2']={};if(!$dataMap)return;const _0x570359=$dataMap[_0x917db1(0x75e)];if(!_0x570359)return;const _0xf7f8e4=_0x570359[_0x917db1(0x6f0)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0xf7f8e4)for(const _0x1f6655 of _0xf7f8e4){_0x1f6655[_0x917db1(0x6f0)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x3786d3=Number(RegExp['$1']),_0x3b2be3=Number(RegExp['$2']),_0x22e3e1=_0x3b2be3===0x1?this[_0x917db1(0x18f)]:this[_0x917db1(0x254)],_0x3801d0=String(RegExp['$3']);_0x22e3e1[_0x3786d3]=_0x3801d0;}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x18c)]=Game_Map[_0x2832c8(0x749)][_0x2832c8(0x822)],Game_Map[_0x2832c8(0x749)]['battleback1Name']=function(){const _0x1157d2=_0x2832c8;if(!BattleManager[_0x1157d2(0x2db)]()){const _0x1dca9d=$gamePlayer[_0x1157d2(0x576)]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x1157d2(0x18f)]&&this[_0x1157d2(0x18f)][_0x1dca9d])return this[_0x1157d2(0x18f)][_0x1dca9d];}return VisuMZ[_0x1157d2(0x282)]['Game_Map_battleback1Name']['call'](this);},VisuMZ['BattleCore']['Game_Map_battleback2Name']=Game_Map[_0x2832c8(0x749)]['battleback2Name'],Game_Map[_0x2832c8(0x749)][_0x2832c8(0x59f)]=function(){const _0x1cee76=_0x2832c8;if(!BattleManager[_0x1cee76(0x2db)]()){const _0x57b58b=$gamePlayer[_0x1cee76(0x576)]($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this[_0x1cee76(0x254)][_0x57b58b])return this[_0x1cee76(0x254)][_0x57b58b];}return VisuMZ['BattleCore'][_0x1cee76(0x240)][_0x1cee76(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x1cc)]=Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x513)],Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x513)]=function(_0x2258cf){const _0x1b46dd=_0x2832c8;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x1b46dd(0x282)][_0x1b46dd(0x1cc)][_0x1b46dd(0x3c8)](this,_0x2258cf);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x237)]=Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x7fc)],Game_Interpreter[_0x2832c8(0x749)]['updateWaitMode']=function(){const _0x88fc46=_0x2832c8;if(SceneManager['isSceneBattle']())switch(this[_0x88fc46(0x514)]){case _0x88fc46(0x2a7):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen['battleCameraData']()[_0x88fc46(0x44e)]>0x0)return!![];this[_0x88fc46(0x514)]='';}break;case _0x88fc46(0x792):if(BattleManager['_spriteset']['isAnimationPlaying']())return!![];this[_0x88fc46(0x514)]='';break;case _0x88fc46(0x8d9):if(Imported[_0x88fc46(0x776)]){if($gameScreen[_0x88fc46(0x7f0)]()['cameraDuration']>0x0)return!![];if($gameScreen[_0x88fc46(0x7f0)]()[_0x88fc46(0x896)]>0x0)return!![];this[_0x88fc46(0x514)]='';}break;case _0x88fc46(0x3fa):if(BattleManager[_0x88fc46(0x229)][_0x88fc46(0x382)]())return!![];this['_waitMode']='';break;case'battleFloat':if(BattleManager[_0x88fc46(0x229)]['isAnyoneFloating']())return!![];this[_0x88fc46(0x514)]='';break;case _0x88fc46(0x4f9):if(BattleManager[_0x88fc46(0x229)][_0x88fc46(0x566)]())return!![];this[_0x88fc46(0x514)]='';break;case _0x88fc46(0x3d0):if(BattleManager[_0x88fc46(0x866)][_0x88fc46(0x6d6)]())return!![];this['_waitMode']='';break;case _0x88fc46(0x614):if(BattleManager[_0x88fc46(0x229)][_0x88fc46(0x1b3)]())return!![];this[_0x88fc46(0x514)]='';break;case _0x88fc46(0x713):if(BattleManager[_0x88fc46(0x229)][_0x88fc46(0x3cd)]())return!![];this[_0x88fc46(0x514)]='';break;case'battleGrow':if(BattleManager['_spriteset']['isAnyoneGrowing']())return!![];this[_0x88fc46(0x514)]='';break;case _0x88fc46(0x86a):if(BattleManager[_0x88fc46(0x229)]['isAnyoneSkewing']())return!![];this['_waitMode']='';break;case _0x88fc46(0x6a4):if(Imported[_0x88fc46(0x74e)]){if(BattleManager[_0x88fc46(0x229)][_0x88fc46(0x835)]())return!![];this[_0x88fc46(0x514)]='';}break;case _0x88fc46(0x600):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x88fc46(0x7f0)]()['skewDuration']>0x0)return!![];this[_0x88fc46(0x514)]='';}break;case'battleSpin':if(BattleManager[_0x88fc46(0x229)]['isAnyoneSpinning']())return!![];this[_0x88fc46(0x514)]='';break;case _0x88fc46(0x5e2):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x88fc46(0x7f0)]()[_0x88fc46(0x87a)]>0x0)return!![];this[_0x88fc46(0x514)]='';}break;}return VisuMZ['BattleCore'][_0x88fc46(0x237)][_0x88fc46(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x23e)]=Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x181)],Game_Interpreter[_0x2832c8(0x749)]['command301']=function(_0x5ec2b7){const _0x74a54e=_0x2832c8;return!$gameParty[_0x74a54e(0x454)]()?this['command301_PreBattleEvent'](_0x5ec2b7):VisuMZ['BattleCore'][_0x74a54e(0x23e)][_0x74a54e(0x3c8)](this,_0x5ec2b7);},Game_Interpreter['prototype'][_0x2832c8(0x538)]=function(_0x51acdf){const _0x1d7e18=_0x2832c8;return VisuMZ['BattleCore'][_0x1d7e18(0x23e)][_0x1d7e18(0x3c8)](this,_0x51acdf),BattleManager[_0x1d7e18(0x841)](_0xc91ea=>{const _0x1a0f1d=_0x1d7e18;this[_0x1a0f1d(0x4fa)][this[_0x1a0f1d(0x57f)]]=_0xc91ea;}),!![];},VisuMZ['BattleCore'][_0x2832c8(0x6d5)]=function(_0x5b7d0d){const _0x28443b=_0x2832c8,_0x342174=$dataCommonEvents[_0x5b7d0d];if(!_0x342174)return![];if(_0x342174[_0x28443b(0x62c)][_0x28443b(0x720)]<=0x1)return![];return!![];},Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x4c3)]=function(_0x2dd651){const _0x42e521=_0x2832c8,_0x37e243=VisuMZ['BattleCore'][_0x42e521(0x6e8)]['Mechanics'],_0xe99ee7=_0x37e243[_0x42e521(0x89e)],_0x5a99ef=$dataCommonEvents[_0xe99ee7];if(_0x5a99ef&&VisuMZ[_0x42e521(0x282)]['CheckMapBattleEventValid'](_0xe99ee7)){const _0x494e18=this['isOnCurrentMap']()?this['_eventId']:0x0,_0x4640f7=_0x5a99ef[_0x42e521(0x62c)];this['setupChild'](_0x4640f7,_0x494e18),this[_0x42e521(0x649)]=JsonEx['makeDeepCopy'](this[_0x42e521(0x649)]);const _0x23fbe0={'code':0xbc3,'indent':0x0,'parameters':JsonEx['makeDeepCopy'](_0x2dd651)};return this[_0x42e521(0x649)][_0x42e521(0x222)](this[_0x42e521(0x5a8)]+0x1,0x0,_0x23fbe0),!![];}else return VisuMZ[_0x42e521(0x282)][_0x42e521(0x23e)][_0x42e521(0x3c8)](this,_0x2dd651);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x335)]=BattleManager[_0x2832c8(0x209)],BattleManager[_0x2832c8(0x209)]=function(){const _0x1a922e=_0x2832c8;VisuMZ[_0x1a922e(0x282)][_0x1a922e(0x335)][_0x1a922e(0x3c8)](this),this[_0x1a922e(0x334)]();},BattleManager[_0x2832c8(0x334)]=function(){const _0x561251=_0x2832c8,_0xb555a4=VisuMZ['BattleCore'][_0x561251(0x6e8)]['Mechanics'],_0x591f5e=_0xb555a4['BattleStartEvent'];_0x591f5e&&VisuMZ[_0x561251(0x282)][_0x561251(0x6d5)](_0x591f5e)&&(this[_0x561251(0x6d2)]=!![],$gameTemp[_0x561251(0x8bf)](_0xb555a4[_0x561251(0x89e)]),$gameMap['updateInterpreter'](),$gameMap['_interpreter'][_0x561251(0x198)]=!![]),_0xb555a4[_0x561251(0x46b)]>0x0&&(this[_0x561251(0x657)]=!![]);},VisuMZ[_0x2832c8(0x282)]['Scene_Map_launchBattle']=Scene_Map[_0x2832c8(0x749)][_0x2832c8(0x413)],Scene_Map[_0x2832c8(0x749)][_0x2832c8(0x413)]=function(){const _0x2854c2=_0x2832c8;BattleManager[_0x2854c2(0x6d2)]?this[_0x2854c2(0x7d6)]():VisuMZ[_0x2854c2(0x282)]['Scene_Map_launchBattle'][_0x2854c2(0x3c8)](this);},Scene_Map['prototype'][_0x2832c8(0x7d6)]=function(){this['_active']=!![];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x7ed)]=SceneManager['isSceneChanging'],SceneManager[_0x2832c8(0x535)]=function(){const _0x4d7aef=_0x2832c8;if(BattleManager[_0x4d7aef(0x6d2)])return![];return VisuMZ[_0x4d7aef(0x282)][_0x4d7aef(0x7ed)][_0x4d7aef(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x204)]=Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x17f)],Game_Interpreter[_0x2832c8(0x749)]['terminate']=function(){const _0x20688f=_0x2832c8;VisuMZ[_0x20688f(0x282)]['Game_Interpreter_terminate'][_0x20688f(0x3c8)](this),this[_0x20688f(0x198)]&&(this[_0x20688f(0x198)]=undefined,SceneManager[_0x20688f(0x37d)][_0x20688f(0x286)]());},Scene_Map[_0x2832c8(0x749)]['battleCoreResumeLaunchBattle']=function(){const _0x209be9=_0x2832c8;BattleManager[_0x209be9(0x6d2)]=undefined,this[_0x209be9(0x387)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x87e)]=Scene_Map['prototype'][_0x2832c8(0x44f)],Scene_Map[_0x2832c8(0x749)]['initialize']=function(){const _0x34ba1a=_0x2832c8;VisuMZ[_0x34ba1a(0x282)][_0x34ba1a(0x87e)][_0x34ba1a(0x3c8)](this),$gameTemp[_0x34ba1a(0x55e)]();},VisuMZ[_0x2832c8(0x282)]['Scene_ItemBase_applyItem']=Scene_ItemBase[_0x2832c8(0x749)][_0x2832c8(0x3d4)],Scene_ItemBase['prototype']['applyItem']=function(){const _0x1e6e55=_0x2832c8;VisuMZ[_0x1e6e55(0x282)][_0x1e6e55(0x40c)][_0x1e6e55(0x3c8)](this),this['item']()['note'][_0x1e6e55(0x6f0)](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp['_commonEventQueue']=[]),DataManager[_0x1e6e55(0x828)](this[_0x1e6e55(0x703)]())&&($gameTemp[_0x1e6e55(0x597)]=[]);},VisuMZ[_0x2832c8(0x282)]['Scene_Options_maxCommands']=Scene_Options[_0x2832c8(0x749)][_0x2832c8(0x2b1)],Scene_Options[_0x2832c8(0x749)][_0x2832c8(0x2b1)]=function(){const _0x16a40a=_0x2832c8;let _0x1f28f6=VisuMZ[_0x16a40a(0x282)]['Scene_Options_maxCommands']['call'](this);const _0x414cb6=VisuMZ['BattleCore'][_0x16a40a(0x6e8)];if(_0x414cb6['AutoBattle'][_0x16a40a(0x6ba)]&&_0x414cb6['AutoBattle'][_0x16a40a(0x43f)])_0x1f28f6+=0x2;if(_0x414cb6[_0x16a40a(0x446)]['AddOption']&&_0x414cb6[_0x16a40a(0x446)][_0x16a40a(0x43f)])_0x1f28f6+=0x1;return _0x1f28f6;},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x2c8)]=Scene_Battle['prototype'][_0x2832c8(0x48c)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x48c)]=function(){const _0x429999=_0x2832c8;SceneManager[_0x429999(0x39a)]()?(Scene_Message[_0x429999(0x749)][_0x429999(0x48c)][_0x429999(0x3c8)](this),this['_spriteset']&&this[_0x429999(0x229)]['update']()):VisuMZ[_0x429999(0x282)][_0x429999(0x2c8)][_0x429999(0x3c8)](this);},VisuMZ['BattleCore']['Scene_Battle_stop']=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x387)],Scene_Battle['prototype']['stop']=function(){const _0x2cb557=_0x2832c8;SceneManager[_0x2cb557(0x7a7)]()?Scene_Message[_0x2cb557(0x749)][_0x2cb557(0x387)]['call'](this):VisuMZ['BattleCore'][_0x2cb557(0x3d6)][_0x2cb557(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x2ec)]=Scene_Battle['prototype'][_0x2832c8(0x17f)],Scene_Battle[_0x2832c8(0x749)]['terminate']=function(){const _0x18fc1d=_0x2832c8;SceneManager['isNextSceneBattleTransitionable']()?Scene_Message[_0x18fc1d(0x749)][_0x18fc1d(0x17f)][_0x18fc1d(0x3c8)](this):VisuMZ['BattleCore']['Scene_Battle_terminate'][_0x18fc1d(0x3c8)](this);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x31f)]=function(){const _0x56d651=_0x2832c8;if(ConfigManager[_0x56d651(0x7e1)]&&ConfigManager[_0x56d651(0x704)]!==undefined)return ConfigManager[_0x56d651(0x704)];else{if(this['battleLayoutStyle']()===_0x56d651(0x722))return![];else{return Scene_Message[_0x56d651(0x749)][_0x56d651(0x31f)]['call'](this);;}}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x559)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x804)],Scene_Battle['prototype'][_0x2832c8(0x804)]=function(){const _0x2bfa96=_0x2832c8;this[_0x2bfa96(0x5da)](),VisuMZ[_0x2bfa96(0x282)]['Scene_Battle_createAllWindows']['call'](this),this[_0x2bfa96(0x616)]();},VisuMZ['BattleCore']['Scene_Battle_createCancelButton']=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x512)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x512)]=function(){const _0x42193b=_0x2832c8;VisuMZ[_0x42193b(0x282)][_0x42193b(0x55c)][_0x42193b(0x3c8)](this),this['battleLayoutStyle']()===_0x42193b(0x722)&&this[_0x42193b(0x5f8)]();},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x66b)]=function(_0x61491d){const _0x5cbdbe=_0x2832c8;_0x61491d?(this[_0x5cbdbe(0x39c)]['x']=(Graphics[_0x5cbdbe(0x797)]-Graphics['boxWidth'])/0x2,this[_0x5cbdbe(0x39c)]['y']=(Graphics[_0x5cbdbe(0x28d)]-Graphics[_0x5cbdbe(0x756)])/0x2):(this['_windowLayer']['x']=Graphics[_0x5cbdbe(0x797)]*0xa,this[_0x5cbdbe(0x39c)]['y']=Graphics[_0x5cbdbe(0x28d)]*0xa);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x667)]=Scene_Battle['prototype']['selectNextCommand'],Scene_Battle['prototype'][_0x2832c8(0x46f)]=function(){const _0x4587f5=_0x2832c8,_0x23da26=BattleManager['actor']();VisuMZ['BattleCore'][_0x4587f5(0x667)][_0x4587f5(0x3c8)](this);if(_0x23da26){if(_0x23da26===BattleManager[_0x4587f5(0x42b)]())return;if(_0x23da26===BattleManager['_subject'])return;if(_0x23da26[_0x4587f5(0x5b5)]())_0x23da26[_0x4587f5(0x5b5)]()[_0x4587f5(0x8a0)]();}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x1ac)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x185)],Scene_Battle[_0x2832c8(0x749)]['selectPreviousCommand']=function(){const _0x35063f=_0x2832c8,_0x1657a2=BattleManager[_0x35063f(0x42b)]();if(_0x1657a2&&_0x1657a2['battler'])_0x1657a2['battler']()[_0x35063f(0x8a0)]();VisuMZ[_0x35063f(0x282)][_0x35063f(0x1ac)][_0x35063f(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)]['Scene_Battle_logWindowRect']=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x770)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x770)]=function(){const _0x41ee45=_0x2832c8;if(VisuMZ['BattleCore']['Settings'][_0x41ee45(0x54b)][_0x41ee45(0x186)])return VisuMZ[_0x41ee45(0x282)][_0x41ee45(0x6e8)][_0x41ee45(0x54b)][_0x41ee45(0x186)][_0x41ee45(0x3c8)](this);return VisuMZ[_0x41ee45(0x282)]['Scene_Battle_logWindowRect'][_0x41ee45(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x318)]=Scene_Battle[_0x2832c8(0x749)]['createPartyCommandWindow'],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x4fc)]=function(){const _0x3eeaf0=_0x2832c8;VisuMZ['BattleCore'][_0x3eeaf0(0x318)][_0x3eeaf0(0x3c8)](this),this[_0x3eeaf0(0x77a)]();},Scene_Battle[_0x2832c8(0x749)]['createPartyCommandWindowBattleCore']=function(){const _0x4a7aac=_0x2832c8,_0x5c1c01=this[_0x4a7aac(0x665)];_0x5c1c01['setHandler'](_0x4a7aac(0x343),this[_0x4a7aac(0x488)][_0x4a7aac(0x1b2)](this)),_0x5c1c01[_0x4a7aac(0x533)](_0x4a7aac(0x4a8),this[_0x4a7aac(0x6ce)][_0x4a7aac(0x1b2)](this));const _0x803be2=this[_0x4a7aac(0x8d4)]();switch(_0x803be2){case'xp':case _0x4a7aac(0x4f3):return this[_0x4a7aac(0x665)][_0x4a7aac(0x694)](0x1);break;}},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x488)]=function(){const _0x59943a=_0x2832c8;BattleManager['_autoBattle']=!![],$gameParty[_0x59943a(0x891)](),this['selectNextCommand'](),BattleManager[_0x59943a(0x707)]()&&(BattleManager['_inputting']=![]);},Scene_Battle[_0x2832c8(0x749)]['commandOptions']=function(){const _0x163cbc=_0x2832c8;this[_0x163cbc(0x8c2)]()?(this[_0x163cbc(0x4b7)]=!![],this[_0x163cbc(0x866)]['push']('addText',VisuMZ[_0x163cbc(0x282)][_0x163cbc(0x6e8)][_0x163cbc(0x45d)]['ActiveTpbOptionsMessage'])):this[_0x163cbc(0x5aa)]();},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x8c2)]=function(){const _0x5db6f6=_0x2832c8;return BattleManager[_0x5db6f6(0x3df)]();},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x5aa)]=function(){const _0x45c1a2=_0x2832c8;this[_0x45c1a2(0x4b7)]=![],this[_0x45c1a2(0x229)]['update'](),this[_0x45c1a2(0x39c)][_0x45c1a2(0x49d)]=![];if(BattleManager[_0x45c1a2(0x2db)]())($dataSystem[_0x45c1a2(0x822)]||$dataSystem[_0x45c1a2(0x59f)])&&SceneManager['snapForBackground']();else($gameMap['battleback1Name']()||$gameMap['battleback2Name']())&&SceneManager[_0x45c1a2(0x636)]();SceneManager['push'](Scene_Options),BattleManager[_0x45c1a2(0x707)]()&&(BattleManager[_0x45c1a2(0x43b)]=BattleManager[_0x45c1a2(0x42b)]());},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x3dd)]=Scene_Battle[_0x2832c8(0x749)]['updateBattleProcess'],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x60f)]=function(){const _0x46504f=_0x2832c8;VisuMZ[_0x46504f(0x282)][_0x46504f(0x3dd)][_0x46504f(0x3c8)](this);if(this['_callSceneOptions']&&!BattleManager[_0x46504f(0x2c0)])this[_0x46504f(0x5aa)]();},Scene_Battle[_0x2832c8(0x749)]['createAutoBattleWindow']=function(){const _0x5223b7=_0x2832c8,_0x313354=this[_0x5223b7(0x6c1)]();this[_0x5223b7(0x3f4)]=new Window_AutoBattleCancel(_0x313354),this[_0x5223b7(0x3f4)][_0x5223b7(0x64b)](),this['addChild'](this['_autoBattleWindow']);},Scene_Battle[_0x2832c8(0x749)]['autoBattleWindowRect']=function(){const _0x18b32d=_0x2832c8;return VisuMZ[_0x18b32d(0x282)][_0x18b32d(0x6e8)][_0x18b32d(0x774)][_0x18b32d(0x3fd)][_0x18b32d(0x3c8)](this);},Scene_Battle['prototype']['isPartyCommandWindowDisabled']=function(){const _0x1e9d2a=_0x2832c8;return VisuMZ[_0x1e9d2a(0x282)][_0x1e9d2a(0x6e8)][_0x1e9d2a(0x45d)][_0x1e9d2a(0x880)];},VisuMZ[_0x2832c8(0x282)]['Scene_Battle_startPartyCommandSelection']=Scene_Battle[_0x2832c8(0x749)]['startPartyCommandSelection'],Scene_Battle['prototype'][_0x2832c8(0x782)]=function(){const _0x2c6689=_0x2832c8;this[_0x2c6689(0x39d)]()?this[_0x2c6689(0x51b)]():VisuMZ[_0x2c6689(0x282)]['Scene_Battle_startPartyCommandSelection'][_0x2c6689(0x3c8)](this);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x51b)]=function(){const _0x4163b7=_0x2832c8;if(BattleManager[_0x4163b7(0x3e2)]())this['selectNextCommand']();else BattleManager[_0x4163b7(0x707)]()&&VisuMZ[_0x4163b7(0x282)][_0x4163b7(0x53b)][_0x4163b7(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x87d)]=Scene_Battle[_0x2832c8(0x749)]['commandFight'],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x71a)]=function(){const _0x571290=_0x2832c8;BattleManager[_0x571290(0x707)]()?this[_0x571290(0x2be)]():VisuMZ[_0x571290(0x282)]['Scene_Battle_commandFight'][_0x571290(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)]['Scene_Battle_createActorCommandWindow']=Scene_Battle['prototype'][_0x2832c8(0x7e4)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x7e4)]=function(){const _0x442a45=_0x2832c8;VisuMZ[_0x442a45(0x282)][_0x442a45(0x69a)][_0x442a45(0x3c8)](this),this['createActorCommandWindowBattleCore']();},Scene_Battle['prototype']['createActorCommandWindowBattleCore']=function(){const _0xd7111b=_0x2832c8,_0x9bf082=this[_0xd7111b(0x4dd)];_0x9bf082[_0xd7111b(0x533)](_0xd7111b(0x2fc),this[_0xd7111b(0x378)][_0xd7111b(0x1b2)](this)),_0x9bf082[_0xd7111b(0x533)]('autoBattle',this[_0xd7111b(0x5c3)][_0xd7111b(0x1b2)](this)),_0x9bf082[_0xd7111b(0x533)]('singleSkill',this[_0xd7111b(0x210)][_0xd7111b(0x1b2)](this)),BattleManager[_0xd7111b(0x707)]()&&(this['isPartyCommandWindowDisabled']()?delete _0x9bf082['_handlers'][_0xd7111b(0x377)]:_0x9bf082[_0xd7111b(0x533)](_0xd7111b(0x377),this[_0xd7111b(0x578)][_0xd7111b(0x1b2)](this)));},Scene_Battle['prototype'][_0x2832c8(0x378)]=function(){const _0x50af20=_0x2832c8;this[_0x50af20(0x2f8)]();},Scene_Battle['prototype'][_0x2832c8(0x5c3)]=function(){const _0x17e3c3=_0x2832c8;BattleManager[_0x17e3c3(0x42b)]()[_0x17e3c3(0x2da)](),BattleManager[_0x17e3c3(0x6b5)](),BattleManager['selectNextActor'](),this['changeInputWindow']();},Scene_Battle[_0x2832c8(0x749)]['actorCommandSingleSkill']=function(){const _0x52b4e3=_0x2832c8,_0xa14ae4=BattleManager['inputtingAction']();_0xa14ae4['setSkill'](this[_0x52b4e3(0x4dd)][_0x52b4e3(0x6a5)]()),this[_0x52b4e3(0x654)]();},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x578)]=function(){const _0x72d2c4=_0x2832c8;this[_0x72d2c4(0x665)][_0x72d2c4(0x805)](),this[_0x72d2c4(0x4dd)][_0x72d2c4(0x8a1)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x278)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x393)],Scene_Battle['prototype'][_0x2832c8(0x393)]=function(){const _0x44eab3=_0x2832c8;VisuMZ[_0x44eab3(0x282)][_0x44eab3(0x278)][_0x44eab3(0x3c8)](this),this['createHelpWindowBattleCore']();},Scene_Battle[_0x2832c8(0x749)]['createHelpWindowBattleCore']=function(){const _0x1411a4=_0x2832c8;this['_actorCommandWindow'][_0x1411a4(0x7ff)](this['_helpWindow']),this[_0x1411a4(0x665)][_0x1411a4(0x7ff)](this[_0x1411a4(0x601)]);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x8d4)]=function(){const _0x163e71=_0x2832c8;if($gameTemp[_0x163e71(0x4e5)]!==undefined)return $gameTemp[_0x163e71(0x4e5)];if(this['_battleLayoutStyle'])return this[_0x163e71(0x280)];return this[_0x163e71(0x280)]=VisuMZ[_0x163e71(0x282)][_0x163e71(0x6e8)][_0x163e71(0x45a)][_0x163e71(0x79e)][_0x163e71(0x188)]()[_0x163e71(0x757)](),this['_battleLayoutStyle'];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x43a)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x1fe)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x1fe)]=function(){const _0x4d6246=_0x2832c8,_0x225e7d=this[_0x4d6246(0x8d4)]();switch(_0x225e7d){case'list':return this[_0x4d6246(0x71c)](Math[_0x4d6246(0x871)](0x1,$gameParty[_0x4d6246(0x610)]()),!![]);break;default:return VisuMZ['BattleCore'][_0x4d6246(0x43a)][_0x4d6246(0x3c8)](this);break;}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x6f6)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x531)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x531)]=function(){const _0x42ae95=_0x2832c8,_0x11e534=this[_0x42ae95(0x8d4)]();switch(_0x11e534){case'border':return this[_0x42ae95(0x6a2)]();break;case _0x42ae95(0x7fa):case _0x42ae95(0x62c):case'xp':case _0x42ae95(0x4f3):default:return VisuMZ['BattleCore'][_0x42ae95(0x6f6)][_0x42ae95(0x3c8)](this);break;}},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x2f4)]=function(){const _0x88b47a=_0x2832c8,_0xf4b56a=this['battleLayoutStyle']();switch(_0xf4b56a){case'xp':case _0x88b47a(0x4f3):return this[_0x88b47a(0x715)]();break;case'border':return this[_0x88b47a(0x6a9)]();break;case'default':case'list':default:return this[_0x88b47a(0x6b8)]();break;}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x60a)]=Scene_Battle[_0x2832c8(0x749)]['partyCommandWindowRect'],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x869)]=function(){const _0x1637aa=_0x2832c8,_0x5f075=this[_0x1637aa(0x8d4)]();switch(_0x5f075){case'xp':case _0x1637aa(0x4f3):return this[_0x1637aa(0x5c0)]();break;case'border':return this[_0x1637aa(0x892)]();case _0x1637aa(0x7fa):case _0x1637aa(0x62c):default:return this[_0x1637aa(0x3b0)]();break;}},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x3b0)]=function(){const _0x1f6c6f=_0x2832c8,_0x45602a=VisuMZ[_0x1f6c6f(0x282)]['Settings']['BattleLayout'],_0x4fc362=_0x45602a['CommandWidth']||0xc0,_0x4cf581=this[_0x1f6c6f(0x1fe)](),_0x1f90a7=this['isRightInputMode']()?Graphics['boxWidth']-_0x4fc362:0x0,_0x27e87c=Graphics[_0x1f6c6f(0x756)]-_0x4cf581;return new Rectangle(_0x1f90a7,_0x27e87c,_0x4fc362,_0x4cf581);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x2c2)]=function(){const _0x57f010=_0x2832c8;return this[_0x57f010(0x869)]();},VisuMZ['BattleCore'][_0x2832c8(0x860)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x87c)],Scene_Battle[_0x2832c8(0x749)]['updateStatusWindowPosition']=function(){const _0x2277e3=_0x2832c8,_0x26b3a3=this[_0x2277e3(0x8d4)]();switch(_0x26b3a3){case'xp':case _0x2277e3(0x4f3):case _0x2277e3(0x722):break;case _0x2277e3(0x7fa):case _0x2277e3(0x62c):default:VisuMZ[_0x2277e3(0x282)][_0x2277e3(0x860)][_0x2277e3(0x3c8)](this);break;}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x5c4)]=Scene_Battle['prototype'][_0x2832c8(0x42f)],Scene_Battle['prototype'][_0x2832c8(0x42f)]=function(){const _0x2716c9=_0x2832c8;VisuMZ[_0x2716c9(0x282)][_0x2716c9(0x5c4)][_0x2716c9(0x3c8)](this),this[_0x2716c9(0x829)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x410)]=Scene_Battle['prototype']['startEnemySelection'],Scene_Battle[_0x2832c8(0x749)]['startEnemySelection']=function(){const _0x4b022f=_0x2832c8;VisuMZ[_0x4b022f(0x282)][_0x4b022f(0x410)][_0x4b022f(0x3c8)](this),this[_0x4b022f(0x777)][_0x4b022f(0x2b7)](),this[_0x4b022f(0x829)]();},Scene_Battle[_0x2832c8(0x749)]['makeTargetSelectionMoreVisible']=function(){const _0x533b24=_0x2832c8,_0x2289ed=this[_0x533b24(0x8d4)]();['xp',_0x533b24(0x4f3),_0x533b24(0x722)][_0x533b24(0x569)](_0x2289ed)&&this[_0x533b24(0x4dd)][_0x533b24(0x8a1)](),(_0x2289ed==='border'||this[_0x533b24(0x769)]())&&(this[_0x533b24(0x7dc)]['close'](),this[_0x533b24(0x202)][_0x533b24(0x8a1)]());},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x490)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x73c)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x73c)]=function(){const _0xc732f8=_0x2832c8;VisuMZ[_0xc732f8(0x282)][_0xc732f8(0x490)]['call'](this),this[_0xc732f8(0x886)]();},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x688)]=function(){const _0x459722=_0x2832c8;return[_0x459722(0x42e),_0x459722(0x232),_0x459722(0x815)][_0x459722(0x569)](this[_0x459722(0x4dd)][_0x459722(0x47d)]());},VisuMZ['BattleCore'][_0x2832c8(0x8db)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x69f)],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x69f)]=function(){const _0x179a39=_0x2832c8;this[_0x179a39(0x688)]()?(this[_0x179a39(0x244)][_0x179a39(0x7f4)](),this[_0x179a39(0x3a9)][_0x179a39(0x64b)](),this[_0x179a39(0x4dd)][_0x179a39(0x76d)]()):VisuMZ['BattleCore'][_0x179a39(0x8db)][_0x179a39(0x3c8)](this),this[_0x179a39(0x385)]();},VisuMZ[_0x2832c8(0x282)]['Scene_Battle_onEnemyOk']=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x6dc)],Scene_Battle['prototype'][_0x2832c8(0x6dc)]=function(){const _0x451d60=_0x2832c8;VisuMZ[_0x451d60(0x282)][_0x451d60(0x438)][_0x451d60(0x3c8)](this),this[_0x451d60(0x886)]();},VisuMZ['BattleCore']['Scene_Battle_onEnemyCancel']=Scene_Battle[_0x2832c8(0x749)]['onEnemyCancel'],Scene_Battle[_0x2832c8(0x749)]['onEnemyCancel']=function(){const _0x542812=_0x2832c8;this[_0x542812(0x688)]()?(this[_0x542812(0x244)][_0x542812(0x7f4)](),this[_0x542812(0x777)][_0x542812(0x64b)](),this['_actorCommandWindow']['activate']()):VisuMZ[_0x542812(0x282)][_0x542812(0x5a7)]['call'](this),this[_0x542812(0x385)]();},Scene_Battle[_0x2832c8(0x749)]['okTargetSelectionVisibility']=function(){const _0x4807e1=_0x2832c8,_0x53d954=this[_0x4807e1(0x8d4)]();(_0x53d954===_0x4807e1(0x722)||this[_0x4807e1(0x769)]())&&(this[_0x4807e1(0x7dc)][_0x4807e1(0x2a3)](),this[_0x4807e1(0x7dc)][_0x4807e1(0x6a8)]&&this[_0x4807e1(0x7dc)]['show'](),this[_0x4807e1(0x202)]['open'](),this[_0x4807e1(0x202)][_0x4807e1(0x6a8)]&&this[_0x4807e1(0x202)]['show']());},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x385)]=function(){const _0x3cae26=_0x2832c8,_0x2563cf=this['battleLayoutStyle']();['xp',_0x3cae26(0x4f3),_0x3cae26(0x722)][_0x3cae26(0x569)](_0x2563cf)&&this[_0x3cae26(0x4dd)][_0x3cae26(0x2a3)](),this['okTargetSelectionVisibility']();},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x6b8)]=function(){const _0x21b5f4=_0x2832c8,_0x2dd80a=VisuMZ[_0x21b5f4(0x282)]['Settings'][_0x21b5f4(0x45a)],_0x4256f1=Window_BattleStatus['prototype'][_0x21b5f4(0x1f1)](),_0x4ccc34=Graphics[_0x21b5f4(0x19b)]-(_0x2dd80a[_0x21b5f4(0x456)]||0xc0),_0x27e84a=this[_0x21b5f4(0x1fe)]()+_0x4256f1,_0x55c57f=this[_0x21b5f4(0x31f)]()?0x0:Graphics[_0x21b5f4(0x19b)]-_0x4ccc34,_0x61a81e=Graphics['boxHeight']-_0x27e84a+_0x4256f1;return new Rectangle(_0x55c57f,_0x61a81e,_0x4ccc34,_0x27e84a);},Scene_Battle['prototype'][_0x2832c8(0x715)]=function(){const _0x355a5d=_0x2832c8,_0x4efc12=Window_BattleStatus['prototype'][_0x355a5d(0x1f1)](),_0x2a3c21=Graphics['boxWidth'],_0xd21f5b=this[_0x355a5d(0x1fe)]()+_0x4efc12,_0x47846a=0x0,_0x540151=Graphics[_0x355a5d(0x756)]-_0xd21f5b+_0x4efc12;return new Rectangle(_0x47846a,_0x540151,_0x2a3c21,_0xd21f5b);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x5c0)]=function(){const _0x23e810=_0x2832c8,_0x14eda7=Graphics['boxWidth']/0x2,_0x2ccefb=this['calcWindowHeight'](VisuMZ['BattleCore'][_0x23e810(0x6e8)][_0x23e810(0x45a)][_0x23e810(0x5fa)],!![]),_0x3705f5=Math[_0x23e810(0x46d)]((Graphics['boxWidth']-_0x14eda7)/0x2),_0x4038de=Graphics[_0x23e810(0x756)]-_0x2ccefb-this['statusWindowRectXPStyle']()[_0x23e810(0x28d)];return new Rectangle(_0x3705f5,_0x4038de,_0x14eda7,_0x2ccefb);},Scene_Battle['prototype']['helpWindowRectBorderStyle']=function(){const _0x25c243=_0x2832c8,_0x350202=Graphics['width'],_0x1408c9=Math[_0x25c243(0x46d)]((Graphics['boxWidth']-_0x350202)/0x2),_0x5d4224=this[_0x25c243(0x25d)](),_0x42748c=(Graphics[_0x25c243(0x28d)]-Graphics['boxHeight'])/-0x2;return new Rectangle(_0x1408c9,_0x42748c,_0x350202,_0x5d4224);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x6a9)]=function(){const _0xfecc5c=_0x2832c8,_0x1955b9=Graphics[_0xfecc5c(0x797)],_0x1f3d30=Math[_0xfecc5c(0x46d)]((Graphics[_0xfecc5c(0x19b)]-_0x1955b9)/0x2),_0x58e1e5=this[_0xfecc5c(0x71c)](0x4,!![]),_0x15ff7e=Graphics[_0xfecc5c(0x756)]-_0x58e1e5+(Graphics[_0xfecc5c(0x28d)]-Graphics[_0xfecc5c(0x756)])/0x2;return new Rectangle(_0x1f3d30,_0x15ff7e,_0x1955b9,_0x58e1e5);},Scene_Battle['prototype'][_0x2832c8(0x892)]=function(){const _0x59fc46=_0x2832c8,_0x36e9c3=Math[_0x59fc46(0x1fd)](Graphics['width']/0x3),_0x4bad94=this[_0x59fc46(0x31f)]()?(Graphics[_0x59fc46(0x797)]+Graphics[_0x59fc46(0x19b)])/0x2-_0x36e9c3:(Graphics['width']-Graphics[_0x59fc46(0x19b)])/-0x2,_0x39a08f=this['helpWindowRectBorderStyle'](),_0x2fe2b5=_0x39a08f['y']+_0x39a08f[_0x59fc46(0x28d)],_0x3ed075=this['statusWindowRectBorderStyle'](),_0x3a445b=_0x3ed075['y']-_0x2fe2b5;return new Rectangle(_0x4bad94,_0x2fe2b5,_0x36e9c3,_0x3a445b);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x3bd)]=function(){const _0x553387=_0x2832c8,_0x4258d9=Math['ceil'](Graphics[_0x553387(0x797)]/0x3),_0x4688b8=Math[_0x553387(0x46d)]((Graphics[_0x553387(0x19b)]-_0x4258d9)/0x2),_0x368654=this[_0x553387(0x892)](),_0x5134bc=_0x368654['y'],_0x2a5aea=_0x368654[_0x553387(0x28d)];return new Rectangle(_0x4688b8,_0x5134bc,_0x4258d9,_0x2a5aea);},Scene_Battle[_0x2832c8(0x749)]['repositionCancelButtonBorderStyle']=function(){const _0xfcb145=_0x2832c8;this[_0xfcb145(0x33a)]['y']=this[_0xfcb145(0x601)]['y']+this[_0xfcb145(0x601)][_0xfcb145(0x28d)],this['isRightInputMode']()?this[_0xfcb145(0x8d4)]()===_0xfcb145(0x722)?this['_cancelButton']['x']=0x8:this[_0xfcb145(0x33a)]['x']=-this['_cancelButton'][_0xfcb145(0x797)]-0x4:this[_0xfcb145(0x33a)]['x']=Graphics[_0xfcb145(0x797)]-(Graphics[_0xfcb145(0x797)]-Graphics[_0xfcb145(0x19b)])/0x2-this[_0xfcb145(0x33a)][_0xfcb145(0x797)]-0x4;},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x8a8)]=Scene_Battle['prototype']['skillWindowRect'],Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x56b)]=function(){const _0x72d932=_0x2832c8;if(this[_0x72d932(0x8d4)]()===_0x72d932(0x722))return this[_0x72d932(0x3bd)]();else return this[_0x72d932(0x769)]()?this['skillItemWindowRectMiddle']():VisuMZ[_0x72d932(0x282)]['Scene_Battle_skillWindowRect']['call'](this);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x582)]=Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x6dd)],Scene_Battle['prototype'][_0x2832c8(0x6dd)]=function(){const _0x5e2d0f=_0x2832c8;if(this[_0x5e2d0f(0x8d4)]()===_0x5e2d0f(0x722))return this['skillItemWindowRectBorderStyle']();else return this['isSkillItemWindowsMiddle']()?this[_0x5e2d0f(0x5bf)]():VisuMZ[_0x5e2d0f(0x282)][_0x5e2d0f(0x582)][_0x5e2d0f(0x3c8)](this);},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x769)]=function(){const _0xc462b4=_0x2832c8;return VisuMZ[_0xc462b4(0x282)][_0xc462b4(0x6e8)][_0xc462b4(0x45a)][_0xc462b4(0x27c)];},Scene_Battle[_0x2832c8(0x749)][_0x2832c8(0x5bf)]=function(){const _0x2ddaa8=_0x2832c8,_0x44d180=Sprite_Button[_0x2ddaa8(0x749)]['blockWidth']()*0x2+0x4;let _0x439ab0=Graphics[_0x2ddaa8(0x19b)]-_0x44d180;Imported['VisuMZ_0_CoreEngine']&&SceneManager[_0x2ddaa8(0x8ad)]()&&(_0x439ab0+=_0x44d180);const _0x35f775=this[_0x2ddaa8(0x70e)](),_0x401297=Graphics[_0x2ddaa8(0x756)]-_0x35f775-this[_0x2ddaa8(0x2f4)]()['height']+Window_BattleStatus[_0x2ddaa8(0x749)][_0x2ddaa8(0x1f1)](),_0x3a8f13=0x0;return new Rectangle(_0x3a8f13,_0x35f775,_0x439ab0,_0x401297);},Scene_Battle[_0x2832c8(0x749)]['createEnemyNameContainer']=function(){const _0x419b21=_0x2832c8;this[_0x419b21(0x5bc)]=new Sprite(),this[_0x419b21(0x5bc)]['x']=this[_0x419b21(0x39c)]['x'],this['_enemyNameContainer']['y']=this[_0x419b21(0x39c)]['y'];const _0x4320cb=this[_0x419b21(0x65b)][_0x419b21(0x294)](this['_windowLayer']);this[_0x419b21(0x558)](this[_0x419b21(0x5bc)],_0x4320cb);for(let _0x14a668=0x0;_0x14a668<0x8;_0x14a668++){const _0x2a2c64=new Window_EnemyName(_0x14a668);this[_0x419b21(0x5bc)][_0x419b21(0x2ce)](_0x2a2c64);}},Sprite_Battler[_0x2832c8(0x323)]=VisuMZ['BattleCore'][_0x2832c8(0x6e8)]['Actor']['MotionSpeed'],VisuMZ['BattleCore']['Sprite_Battler_initMembers']=Sprite_Battler['prototype'][_0x2832c8(0x459)],Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x459)]=function(){const _0x29187b=_0x2832c8;VisuMZ[_0x29187b(0x282)][_0x29187b(0x24c)][_0x29187b(0x3c8)](this),this[_0x29187b(0x71d)]();if(this[_0x29187b(0x493)]===Sprite_Enemy)this[_0x29187b(0x5ce)]();this['createDistortionSprite']();},Sprite_Battler[_0x2832c8(0x749)]['initMembersBattleCore']=function(){const _0x57f344=_0x2832c8;this[_0x57f344(0x4b3)]=0x0,this[_0x57f344(0x8d3)]=0x0,this[_0x57f344(0x6d4)]=0x0,this[_0x57f344(0x3c6)]=0x0,this[_0x57f344(0x30b)]=0x0,this['_floatWholeDuration']=0x0,this[_0x57f344(0x5ec)]=_0x57f344(0x21d),this['_jumpHeight']=0x0,this[_0x57f344(0x1b1)]=0x0,this[_0x57f344(0x41c)]=0x0,this[_0x57f344(0x449)]=0x0,this['_targetOpacity']=0xff,this['_opacityDuration']=0x0,this[_0x57f344(0x734)]=0x0,this[_0x57f344(0x856)]=_0x57f344(0x21d),this[_0x57f344(0x23b)]=0x0,this[_0x57f344(0x8eb)]=0x0,this['_angleDuration']=0x0,this[_0x57f344(0x472)]=0x0,this[_0x57f344(0x6b3)]=_0x57f344(0x21d),this['_angleRevertOnFinish']=!![],this[_0x57f344(0x236)]=0x0,this[_0x57f344(0x5a4)]=0x0,this['_targetSkewX']=0x0,this[_0x57f344(0x5f4)]=0x0,this[_0x57f344(0x68b)]=0x0,this[_0x57f344(0x1c0)]=0x0,this['_skewEasing']='Linear',this[_0x57f344(0x503)]=0x1,this[_0x57f344(0x31c)]=0x1,this[_0x57f344(0x845)]=0x1,this[_0x57f344(0x32d)]=0x1,this[_0x57f344(0x4c4)]=0x0,this[_0x57f344(0x395)]=0x0,this['_growEasing']=_0x57f344(0x21d),this[_0x57f344(0x7f7)]=0x1;},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x5ce)]=function(){const _0x46f14e=_0x2832c8;this['_shadowSprite']=new Sprite(),this[_0x46f14e(0x308)][_0x46f14e(0x6c6)]=ImageManager[_0x46f14e(0x644)]('Shadow2'),this[_0x46f14e(0x308)]['bitmap']['smooth']=VisuMZ[_0x46f14e(0x282)][_0x46f14e(0x6e8)]['Actor'][_0x46f14e(0x547)],this[_0x46f14e(0x308)][_0x46f14e(0x4a5)]['x']=0.5,this[_0x46f14e(0x308)]['anchor']['y']=0.5,this[_0x46f14e(0x308)]['y']=-0x2,this[_0x46f14e(0x308)][_0x46f14e(0x49d)]=![],this[_0x46f14e(0x2ce)](this['_shadowSprite']);},Sprite_Battler[_0x2832c8(0x749)]['createDistortionSprite']=function(){const _0x34ba82=_0x2832c8;this['_distortionSprite']=new Sprite(),this['_distortionSprite'][_0x34ba82(0x4a5)]['x']=0.5,this[_0x34ba82(0x81b)][_0x34ba82(0x4a5)]['y']=0.5,this[_0x34ba82(0x2ce)](this[_0x34ba82(0x81b)]);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x341)]=function(){const _0x380b67=_0x2832c8;if(!this[_0x380b67(0x81b)])return;if(this[_0x380b67(0x308)]){const _0x3e3ca2=this['getChildIndex'](this[_0x380b67(0x81b)]);this[_0x380b67(0x558)](this[_0x380b67(0x308)],_0x3e3ca2),this[_0x380b67(0x1b4)]();}this[_0x380b67(0x3d1)]&&this[_0x380b67(0x81b)][_0x380b67(0x2ce)](this[_0x380b67(0x3d1)]),this['_weaponSprite']&&this['_distortionSprite'][_0x380b67(0x2ce)](this['_weaponSprite']),this['_mainSprite']&&this['_distortionSprite'][_0x380b67(0x2ce)](this['_mainSprite']),this[_0x380b67(0x502)]&&this['_distortionSprite'][_0x380b67(0x2ce)](this[_0x380b67(0x502)]);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x1b4)]=function(){const _0x39370f=_0x2832c8;if(!this['_shadowSprite'])return;if(this['_battler']&&this[_0x39370f(0x587)][_0x39370f(0x357)]()){const _0x1374a1=this[_0x39370f(0x308)][_0x39370f(0x6c6)];this[_0x39370f(0x308)][_0x39370f(0x499)](0x0,0x0,_0x1374a1[_0x39370f(0x797)],_0x1374a1[_0x39370f(0x28d)]);}else this[_0x39370f(0x308)]['setFrame'](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x311)]=function(){const _0x8dd6f3=_0x2832c8;return SceneManager[_0x8dd6f3(0x230)]()?SceneManager[_0x8dd6f3(0x37d)]['_spriteset'][_0x8dd6f3(0x279)]:this[_0x8dd6f3(0x5cc)];},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x831)]=function(_0x44393b,_0x365b2c){const _0x40fc50=_0x2832c8;if(!this['_battler'][_0x40fc50(0x1ce)]())return;const _0x1d1819=VisuMZ[_0x40fc50(0x282)][_0x40fc50(0x6e8)][_0x40fc50(0x3fc)],_0x19632e=new Sprite_Damage();_0x19632e[_0x40fc50(0x2c4)]=_0x1d1819['PopupDuration'],this[_0x40fc50(0x68e)](_0x19632e),_0x19632e['setupTextPopup'](_0x44393b,_0x365b2c),this[_0x40fc50(0x18a)](_0x19632e);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x743)]=function(_0x211399,_0x231fa5,_0xfab605){const _0x155d8f=_0x2832c8;if(!this['_battler'][_0x155d8f(0x1ce)]())return;const _0xd09b8c=VisuMZ['BattleCore'][_0x155d8f(0x6e8)][_0x155d8f(0x3fc)],_0xe65053=new Sprite_Damage();_0xe65053['_duration']=_0xd09b8c[_0x155d8f(0x3b8)],this[_0x155d8f(0x68e)](_0xe65053),_0xe65053[_0x155d8f(0x743)](_0x211399,_0x231fa5,_0xfab605),this[_0x155d8f(0x18a)](_0xe65053);},Sprite_Battler['prototype'][_0x2832c8(0x852)]=function(){const _0x1d81bd=_0x2832c8;if(!this['_battler'][_0x1d81bd(0x414)]())return;while(this[_0x1d81bd(0x587)]['isDamagePopupRequested']()){this[_0x1d81bd(0x587)][_0x1d81bd(0x1ce)]()&&this[_0x1d81bd(0x515)]();}this[_0x1d81bd(0x587)][_0x1d81bd(0x878)](),this[_0x1d81bd(0x587)][_0x1d81bd(0x5e5)]();},Sprite_Battler['prototype']['createDamageSprite']=function(){const _0x4cdc92=_0x2832c8,_0x52efd3=VisuMZ[_0x4cdc92(0x282)][_0x4cdc92(0x6e8)][_0x4cdc92(0x3fc)],_0x12d447=new Sprite_Damage();_0x12d447[_0x4cdc92(0x2c4)]=_0x52efd3['PopupDuration'],this[_0x4cdc92(0x68e)](_0x12d447),_0x12d447['setup'](this[_0x4cdc92(0x587)]),_0x12d447[_0x4cdc92(0x48d)](this[_0x4cdc92(0x587)]),this['addDamageSprite'](_0x12d447);},Sprite_Battler['prototype'][_0x2832c8(0x18a)]=function(_0x2b81c1){const _0x1e3d10=_0x2832c8;this['_damages']['push'](_0x2b81c1);if(this[_0x1e3d10(0x6ae)]())SceneManager['_scene'][_0x1e3d10(0x244)][_0x1e3d10(0x18a)](_0x2b81c1,this[_0x1e3d10(0x587)]);else{this[_0x1e3d10(0x311)]()[_0x1e3d10(0x2ce)](_0x2b81c1);if(SceneManager[_0x1e3d10(0x2f2)]())_0x2b81c1[_0x1e3d10(0x68a)]['x']=-0x1;}},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x6ae)]=function(){const _0x2de74d=_0x2832c8;return!$gameSystem[_0x2de74d(0x593)]()&&this['_battler']&&this[_0x2de74d(0x587)][_0x2de74d(0x44c)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x68e)]=function(_0x447b46){const _0x208a21=_0x2832c8,_0x2d3694=VisuMZ[_0x208a21(0x282)][_0x208a21(0x6e8)][_0x208a21(0x3fc)],_0x46bea2=SceneManager[_0x208a21(0x2f2)]()?-0x1:0x1;let _0xf0fcca=this['x'],_0x553571=this['y'];const _0x3512bd=SceneManager[_0x208a21(0x37d)][_0x208a21(0x244)];if(_0x3512bd&&this[_0x208a21(0x5cc)]===_0x3512bd){_0xf0fcca+=_0x3512bd['x']-this[_0x208a21(0x1c9)]();const _0x580f79=_0x3512bd[_0x208a21(0x73f)]()*0x3/0x4;_0x553571=_0x3512bd['y']+_0x580f79,_0x553571=Math['min'](_0x553571,_0x3512bd['y']+this['y']-this[_0x208a21(0x28d)]+_0x580f79);}_0x447b46['x']=Math['round'](_0xf0fcca+this[_0x208a21(0x1c9)]()*_0x46bea2),_0x447b46['y']=Math[_0x208a21(0x46d)](_0x553571+this[_0x208a21(0x3c4)]());if(_0x2d3694[_0x208a21(0x6b1)])for(const _0x1bb9e6 of this[_0x208a21(0x653)]){_0x1bb9e6['x']+=_0x2d3694[_0x208a21(0x537)]*_0x46bea2,_0x1bb9e6['y']+=_0x2d3694[_0x208a21(0x751)];}else{const _0x595eb4=this[_0x208a21(0x653)][this[_0x208a21(0x653)][_0x208a21(0x720)]-0x1];_0x595eb4&&(_0x447b46['x']=_0x595eb4['x']+_0x2d3694[_0x208a21(0x537)]*_0x46bea2,_0x447b46['y']=_0x595eb4['y']+_0x2d3694[_0x208a21(0x751)]);}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x79a)]=Sprite_Battler['prototype']['damageOffsetX'],Sprite_Battler['prototype'][_0x2832c8(0x1c9)]=function(){const _0x12f005=_0x2832c8;let _0x52837c=VisuMZ[_0x12f005(0x282)][_0x12f005(0x79a)][_0x12f005(0x3c8)](this),_0x427a67=VisuMZ[_0x12f005(0x282)][_0x12f005(0x6e8)][_0x12f005(0x3fc)][_0x12f005(0x447)]||0x0;return Math[_0x12f005(0x46d)](_0x52837c+_0x427a67);},VisuMZ['BattleCore'][_0x2832c8(0x4bf)]=Sprite_Battler[_0x2832c8(0x749)]['damageOffsetY'],Sprite_Battler['prototype']['damageOffsetY']=function(){const _0x290c59=_0x2832c8;let _0x3674d7=VisuMZ['BattleCore']['Sprite_Battler_damageOffsetY'][_0x290c59(0x3c8)](this);switch(VisuMZ['BattleCore']['Settings']['Damage'][_0x290c59(0x494)]){case _0x290c59(0x22f):_0x3674d7-=this[_0x290c59(0x28d)]*this['scale']['y'];break;case _0x290c59(0x3de):_0x3674d7-=this['height']*this[_0x290c59(0x68a)]['y']*0.5;break;}let _0xecf4a9=VisuMZ[_0x290c59(0x282)][_0x290c59(0x6e8)][_0x290c59(0x3fc)][_0x290c59(0x78d)]||0x0;return Math[_0x290c59(0x46d)](_0x3674d7+_0xecf4a9);},Sprite_Actor[_0x2832c8(0x749)]['damageOffsetX']=function(){const _0x26db5b=_0x2832c8;return Sprite_Battler[_0x26db5b(0x749)][_0x26db5b(0x1c9)][_0x26db5b(0x3c8)](this);},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x3c4)]=function(){const _0x2b36c4=_0x2832c8;return Sprite_Battler[_0x2b36c4(0x749)][_0x2b36c4(0x3c4)]['call'](this);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x548)]=function(_0x1d71a7){const _0x4007df=_0x2832c8;this[_0x4007df(0x6ae)]()?SceneManager[_0x4007df(0x37d)][_0x4007df(0x244)]['removeDamageSprite'](_0x1d71a7):(this[_0x4007df(0x311)]()[_0x4007df(0x6c5)](_0x1d71a7),this[_0x4007df(0x653)][_0x4007df(0x19a)](_0x1d71a7),_0x1d71a7[_0x4007df(0x5c8)]());},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x8b4)]=Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x41e)],Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x41e)]=function(_0x1b2d9c,_0x145f99){const _0x431bf5=_0x2832c8,_0x2b93dd=VisuMZ['BattleCore'][_0x431bf5(0x6e8)];if(this['constructor']===Sprite_Actor)_0x1b2d9c+=_0x2b93dd[_0x431bf5(0x40e)][_0x431bf5(0x2b3)]||0x0,_0x145f99+=_0x2b93dd[_0x431bf5(0x40e)][_0x431bf5(0x73e)]||0x0;else this[_0x431bf5(0x493)]===Sprite_Enemy&&(_0x1b2d9c+=_0x2b93dd['Enemy'][_0x431bf5(0x2b3)]||0x0,_0x145f99+=_0x2b93dd[_0x431bf5(0x690)][_0x431bf5(0x73e)]||0x0);VisuMZ['BattleCore'][_0x431bf5(0x8b4)][_0x431bf5(0x3c8)](this,_0x1b2d9c,_0x145f99);},VisuMZ[_0x2832c8(0x282)]['Sprite_Battler_update']=Sprite_Battler[_0x2832c8(0x749)]['update'],Sprite_Battler['prototype']['update']=function(){const _0x46833e=_0x2832c8;VisuMZ[_0x46833e(0x282)]['Sprite_Battler_update'][_0x46833e(0x3c8)](this),!this['_battler']&&this['_hpGaugeSprite']&&(this[_0x46833e(0x64e)][_0x46833e(0x49d)]=![]);},VisuMZ[_0x2832c8(0x282)]['Sprite_Battler_updateMain']=Sprite_Battler['prototype'][_0x2832c8(0x498)],Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x498)]=function(){const _0x201a5f=_0x2832c8;this[_0x201a5f(0x30e)](),this[_0x201a5f(0x3a0)](),this[_0x201a5f(0x3bc)](),this[_0x201a5f(0x79c)](),this['updateHpGaugePosition'](),VisuMZ[_0x201a5f(0x282)][_0x201a5f(0x2ee)]['call'](this);if(this['constructor']===Sprite_Enemy)this[_0x201a5f(0x206)]();},VisuMZ['BattleCore']['Sprite_Battler_updatePosition']=Sprite_Battler['prototype'][_0x2832c8(0x3b7)],Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x3b7)]=function(){const _0x29a360=_0x2832c8;VisuMZ['BattleCore'][_0x29a360(0x1dd)][_0x29a360(0x3c8)](this),this[_0x29a360(0x29c)](),this[_0x29a360(0x3da)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x29c)]=function(){const _0x34abb8=_0x2832c8;this['_baseX']=this['x'],this['_baseY']=this['y'],this[_0x34abb8(0x302)](),this[_0x34abb8(0x4aa)](),this['x']+=this['extraPositionX'](),this['y']+=this['extraPositionY'](),this['x']=Math['round'](this['x']),this['y']=Math[_0x34abb8(0x46d)](this['y']);},Sprite_Battler[_0x2832c8(0x749)]['extraPositionX']=function(){let _0x16f4a6=0x0;return _0x16f4a6;},Sprite_Battler['prototype'][_0x2832c8(0x292)]=function(){const _0x162ff5=_0x2832c8;let _0x315529=0x0;this[_0x162ff5(0x587)]&&!this[_0x162ff5(0x587)]['isBattlerGrounded']()&&(_0x315529-=this[_0x162ff5(0x6d4)],_0x315529-=this['_jumpHeight']);if(this[_0x162ff5(0x81b)]&&this[_0x162ff5(0x493)]!==Sprite_SvEnemy){const _0x5e8a5c=this[_0x162ff5(0x81b)]['scale']['y'];_0x315529-=(_0x5e8a5c-0x1)*this['height'];}return _0x315529;},Sprite_Battler['prototype'][_0x2832c8(0x79c)]=function(){const _0x1055e0=_0x2832c8,_0x507c0a=this['_battler']&&this['_battler'][_0x1055e0(0x22a)]();this[_0x1055e0(0x7f7)]=(_0x507c0a?-0x1:0x1)*Math[_0x1055e0(0x3a2)](this[_0x1055e0(0x68a)]['x']);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x650)]=function(_0x21c8af,_0xe29c4c,_0xdcf394){const _0x214bb3=_0x2832c8;if(!this[_0x214bb3(0x28b)]())return;if(this[_0x214bb3(0x3c6)]===_0x21c8af)return;this[_0x214bb3(0x3c6)]=_0x21c8af,this[_0x214bb3(0x30b)]=_0xe29c4c,this[_0x214bb3(0x745)]=_0xe29c4c,this[_0x214bb3(0x5ec)]=_0xdcf394||_0x214bb3(0x21d);if(_0xe29c4c<=0x0)this['_floatHeight']=_0x21c8af;},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x302)]=function(){const _0x24e830=_0x2832c8;if(this[_0x24e830(0x30b)]<=0x0)return;const _0x75eb5d=this['_floatDuration'],_0x72c19b=this['_floatWholeDuration'],_0x18885f=this[_0x24e830(0x5ec)];Imported[_0x24e830(0x84a)]?this['_floatHeight']=this[_0x24e830(0x8da)](this[_0x24e830(0x6d4)],this[_0x24e830(0x3c6)],_0x75eb5d,_0x72c19b,_0x18885f):this['_floatHeight']=(this['_floatHeight']*(_0x75eb5d-0x1)+this[_0x24e830(0x3c6)])/_0x75eb5d;this[_0x24e830(0x30b)]--;if(this[_0x24e830(0x30b)]<=0x0)this[_0x24e830(0x2e8)]();},Sprite_Battler[_0x2832c8(0x749)]['onFloatEnd']=function(){const _0x3cc285=_0x2832c8;this['_floatHeight']=this[_0x3cc285(0x3c6)];},Sprite_Battler[_0x2832c8(0x749)]['isFloating']=function(){const _0x2a5699=_0x2832c8;return this[_0x2a5699(0x30b)]>0x0;},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x81a)]=function(_0x5467f7,_0x4a2ee7){const _0x5ba0c1=_0x2832c8;if(!this['canMove']())return;if(_0x4a2ee7<=0x0)return;this[_0x5ba0c1(0x1b1)]=_0x5467f7,this[_0x5ba0c1(0x41c)]=_0x4a2ee7,this[_0x5ba0c1(0x449)]=_0x4a2ee7;},Sprite_Battler['prototype'][_0x2832c8(0x4aa)]=function(){const _0x3ea54b=_0x2832c8;if(this['_jumpDuration']<=0x0)return;const _0x43b575=this[_0x3ea54b(0x449)]-this[_0x3ea54b(0x41c)],_0x3bb105=this[_0x3ea54b(0x449)]/0x2,_0x38be1d=this[_0x3ea54b(0x1b1)],_0x418de7=-_0x38be1d/Math[_0x3ea54b(0x823)](_0x3bb105,0x2);this[_0x3ea54b(0x634)]=_0x418de7*Math[_0x3ea54b(0x823)](_0x43b575-_0x3bb105,0x2)+_0x38be1d,this[_0x3ea54b(0x41c)]--;if(this['_jumpDuration']<=0x0)return this[_0x3ea54b(0x781)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x781)]=function(){const _0x3483c9=_0x2832c8;this[_0x3483c9(0x634)]=0x0;},Sprite_Battler['prototype'][_0x2832c8(0x28a)]=function(){return this['_jumpDuration']>0x0;},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x836)]=function(_0x14086f,_0x5ef295,_0x40ad76){const _0x4987ec=_0x2832c8;if(this[_0x4987ec(0x85d)]===_0x14086f)return;this[_0x4987ec(0x85d)]=_0x14086f,this[_0x4987ec(0x4f7)]=_0x5ef295,this[_0x4987ec(0x734)]=_0x5ef295,this[_0x4987ec(0x856)]=_0x40ad76||_0x4987ec(0x21d);if(_0x5ef295<=0x0)this[_0x4987ec(0x3ce)]=_0x14086f;},Sprite_Battler[_0x2832c8(0x749)]['updateOpacity']=function(){const _0x279bc3=_0x2832c8;if(this[_0x279bc3(0x4f7)]<=0x0)return;const _0x574482=this[_0x279bc3(0x4f7)],_0x851949=this[_0x279bc3(0x734)],_0x175c99=this[_0x279bc3(0x856)];Imported[_0x279bc3(0x84a)]?this[_0x279bc3(0x3ce)]=this[_0x279bc3(0x8da)](this[_0x279bc3(0x3ce)],this['_targetOpacity'],_0x574482,_0x851949,_0x175c99):this['opacity']=(this[_0x279bc3(0x3ce)]*(_0x574482-0x1)+this[_0x279bc3(0x85d)])/_0x574482;this[_0x279bc3(0x4f7)]--;if(this[_0x279bc3(0x4f7)]<=0x0)this['onOpacityEnd']();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x6cc)]=function(){const _0x261f3f=_0x2832c8;this[_0x261f3f(0x3ce)]=this[_0x261f3f(0x85d)];},Sprite_Battler[_0x2832c8(0x749)]['isChangingOpacity']=function(){return this['_opacityDuration']>0x0;},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x206)]=function(){const _0x44dbbf=_0x2832c8;this[_0x44dbbf(0x308)][_0x44dbbf(0x49d)]=this['_battler'][_0x44dbbf(0x6e3)](),this[_0x44dbbf(0x8c7)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x8c7)]=function(){const _0x37a97e=_0x2832c8;if(!this['_shadowSprite'])return;this[_0x37a97e(0x308)]['y']=Math[_0x37a97e(0x46d)](-this['extraPositionY']()-0x2);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x30e)]=function(){const _0x412257=_0x2832c8;if(this[_0x412257(0x493)]===Sprite_SvEnemy)return;this[_0x412257(0x594)](),this[_0x412257(0x83e)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x83e)]=function(){const _0x415f22=_0x2832c8,_0x57d0c2=this[_0x415f22(0x81b)];_0x57d0c2&&(_0x57d0c2[_0x415f22(0x68a)]['x']=this[_0x415f22(0x5f2)](),_0x57d0c2[_0x415f22(0x68a)]['y']=this['mainSpriteScaleY']());},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x5f2)]=function(){const _0x17e455=_0x2832c8;let _0x3aac42=0x1;return _0x3aac42*=this['_flipScaleX'],_0x3aac42*=this[_0x17e455(0x503)],_0x3aac42;},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x561)]=function(){const _0x485254=_0x2832c8;return 0x1*this[_0x485254(0x31c)];},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x1be)]=function(){const _0xca89f3=_0x2832c8;return this['width']*this[_0xca89f3(0x5f2)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x2d2)]=function(){const _0x21cb30=_0x2832c8;return this[_0x21cb30(0x28d)]*this[_0x21cb30(0x561)]();},Sprite_Battler['prototype'][_0x2832c8(0x329)]=function(_0x1c4317,_0x56222b,_0x5e8b04,_0x43254c){const _0x560ffc=_0x2832c8;if(!this[_0x560ffc(0x28b)]())return;if(!this[_0x560ffc(0x81b)])return;if(this['_targetGrowX']===_0x1c4317&&this[_0x560ffc(0x32d)]===_0x56222b)return;this[_0x560ffc(0x845)]=_0x1c4317,this[_0x560ffc(0x32d)]=_0x56222b,this[_0x560ffc(0x4c4)]=_0x5e8b04,this[_0x560ffc(0x395)]=_0x5e8b04,this['_growEasing']=_0x43254c||_0x560ffc(0x21d),_0x5e8b04<=0x0&&(this[_0x560ffc(0x503)]=this['_targetGrowX'],this['_growY']=this[_0x560ffc(0x32d)]);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x594)]=function(){const _0x2c860b=_0x2832c8;if(this[_0x2c860b(0x4c4)]<=0x0)return;if(!this[_0x2c860b(0x81b)])return;const _0x287e3a=this[_0x2c860b(0x4c4)],_0x4cf2aa=this[_0x2c860b(0x395)],_0x20a3d7=this[_0x2c860b(0x868)];Imported[_0x2c860b(0x84a)]?(this[_0x2c860b(0x503)]=this[_0x2c860b(0x8da)](this['_growX'],this[_0x2c860b(0x845)],_0x287e3a,_0x4cf2aa,_0x20a3d7),this[_0x2c860b(0x31c)]=this['applyEasing'](this[_0x2c860b(0x31c)],this[_0x2c860b(0x32d)],_0x287e3a,_0x4cf2aa,_0x20a3d7)):(this[_0x2c860b(0x503)]=(this['_growX']*(_0x287e3a-0x1)+this[_0x2c860b(0x845)])/_0x287e3a,this[_0x2c860b(0x31c)]=(this[_0x2c860b(0x31c)]*(_0x287e3a-0x1)+this['_targetGrowY'])/_0x287e3a);this['_growDuration']--;if(this[_0x2c860b(0x4c4)]<=0x0)this[_0x2c860b(0x3bb)]();},Sprite_Battler[_0x2832c8(0x749)]['onGrowEnd']=function(){const _0x35f931=_0x2832c8;this[_0x35f931(0x503)]=this['_targetGrowX'],this[_0x35f931(0x31c)]=this['_targetGrowY'];},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x337)]=function(){const _0x311165=_0x2832c8;return this[_0x311165(0x4c4)]>0x0;},Sprite_Battler['prototype']['startSkew']=function(_0x37d3ec,_0x460412,_0x27800a,_0x1dad86){const _0xbf7560=_0x2832c8;if(!this[_0xbf7560(0x28b)]())return;if(!this[_0xbf7560(0x81b)])return;if(this[_0xbf7560(0x26e)]===_0x37d3ec&&this[_0xbf7560(0x5f4)]===_0x460412)return;this[_0xbf7560(0x26e)]=_0x37d3ec,this[_0xbf7560(0x5f4)]=_0x460412,this[_0xbf7560(0x68b)]=_0x27800a,this['_skewWholeDuration']=_0x27800a,this[_0xbf7560(0x789)]=_0x1dad86||_0xbf7560(0x21d),_0x27800a<=0x0&&(this[_0xbf7560(0x81b)]['skew']['x']=this['_targetSkewX'],this[_0xbf7560(0x81b)]['skew']['y']=this[_0xbf7560(0x5f4)]);},Sprite_Battler[_0x2832c8(0x749)]['updateSkew']=function(){const _0x321115=_0x2832c8;if(this[_0x321115(0x68b)]<=0x0)return;if(!this[_0x321115(0x81b)])return;const _0x5e9fd9=this['_skewDuration'],_0x55122f=this[_0x321115(0x1c0)],_0x16d30f=this[_0x321115(0x789)],_0x5c7bae=this['_distortionSprite'];Imported[_0x321115(0x84a)]?(_0x5c7bae[_0x321115(0x5c5)]['x']=this[_0x321115(0x8da)](_0x5c7bae[_0x321115(0x5c5)]['x'],this['_targetSkewX'],_0x5e9fd9,_0x55122f,_0x16d30f),_0x5c7bae['skew']['y']=this[_0x321115(0x8da)](_0x5c7bae[_0x321115(0x5c5)]['y'],this[_0x321115(0x5f4)],_0x5e9fd9,_0x55122f,_0x16d30f)):(_0x5c7bae['skew']['x']=(_0x5c7bae[_0x321115(0x5c5)]['x']*(_0x5e9fd9-0x1)+this['_targetSkewX'])/_0x5e9fd9,_0x5c7bae[_0x321115(0x5c5)]['y']=(_0x5c7bae[_0x321115(0x5c5)]['y']*(_0x5e9fd9-0x1)+this['_targetSkewY'])/_0x5e9fd9);this[_0x321115(0x68b)]--;if(this['_skewDuration']<=0x0)this[_0x321115(0x298)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x298)]=function(){const _0x2705eb=_0x2832c8;this['_distortionSprite'][_0x2705eb(0x5c5)]['x']=this[_0x2705eb(0x26e)],this[_0x2705eb(0x81b)][_0x2705eb(0x5c5)]['y']=this[_0x2705eb(0x5f4)];},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x47a)]=function(){const _0x3a27e2=_0x2832c8;return this[_0x3a27e2(0x68b)]>0x0;},Sprite_Battler['prototype'][_0x2832c8(0x20b)]=function(_0x252d07,_0x29c8a8,_0x4af5a0,_0x4917bb){const _0x5b6470=_0x2832c8;if(!this[_0x5b6470(0x28b)]())return;if(!this[_0x5b6470(0x81b)])return;if(this[_0x5b6470(0x8eb)]===_0x252d07)return;this[_0x5b6470(0x8eb)]=_0x252d07,this[_0x5b6470(0x20f)]=_0x29c8a8,this[_0x5b6470(0x472)]=_0x29c8a8,this[_0x5b6470(0x6b3)]=_0x4af5a0||'Linear',this['_angleRevertOnFinish']=_0x4917bb,this['_angleRevertOnFinish']===undefined&&(this[_0x5b6470(0x639)]=!![]),_0x29c8a8<=0x0&&(this[_0x5b6470(0x23b)]=_0x252d07,this[_0x5b6470(0x639)]&&(this['_targetAngle']=0x0,this['_currentAngle']=0x0));},Sprite_Battler['prototype'][_0x2832c8(0x3bc)]=function(){const _0x539f41=_0x2832c8;this[_0x539f41(0x813)](),this['applyAngleChange']();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x813)]=function(){const _0x989473=_0x2832c8;if(this[_0x989473(0x20f)]<=0x0)return;const _0x49cf11=this[_0x989473(0x20f)],_0x43c92b=this['_angleWholeDuration'],_0x2dfd29=this[_0x989473(0x6b3)];Imported[_0x989473(0x84a)]?this[_0x989473(0x23b)]=this['applyEasing'](this['_currentAngle'],this[_0x989473(0x8eb)],_0x49cf11,_0x43c92b,_0x2dfd29):this[_0x989473(0x23b)]=(this['_currentAngle']*(_0x49cf11-0x1)+this[_0x989473(0x8eb)])/_0x49cf11;this[_0x989473(0x20f)]--;if(this[_0x989473(0x20f)]<=0x0)this['onAngleEnd']();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x7da)]=function(){const _0xa0d780=_0x2832c8;this[_0xa0d780(0x23b)]=this['_targetAngle'],this[_0xa0d780(0x639)]&&(this[_0xa0d780(0x8eb)]=0x0,this[_0xa0d780(0x23b)]=0x0);},Sprite_Battler['prototype'][_0x2832c8(0x5b8)]=function(){const _0x18e6a9=_0x2832c8;return this[_0x18e6a9(0x20f)]>0x0;},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x3aa)]=function(){const _0x136c91=_0x2832c8;if(!this[_0x136c91(0x81b)])return;const _0x54ba32=this['_currentAngle'],_0x42cd9f=this[_0x136c91(0x68a)]['x'],_0x2a8499=this[_0x136c91(0x587)][_0x136c91(0x44c)]()?-0x1:0x1;this[_0x136c91(0x81b)][_0x136c91(0x88f)]=_0x54ba32*_0x42cd9f*_0x2a8499;const _0x4cb8c0=this['_distortionSprite'][_0x136c91(0x68a)]['y'];this['_distortionSprite']['y']=this[_0x136c91(0x28d)]*-0.5*(0x2-_0x4cb8c0);const _0x4dc34c=[this[_0x136c91(0x4fd)],this['_svBattlerSprite'],this[_0x136c91(0x502)]];for(const _0x1b82a4 of _0x4dc34c){if(!_0x1b82a4)continue;_0x1b82a4['y']=this['height']*0.5;}this['_shadowSprite']&&(this[_0x136c91(0x308)]['scale']['x']=this[_0x136c91(0x81b)]['scale']['x'],this['_shadowSprite'][_0x136c91(0x68a)]['y']=this['_distortionSprite'][_0x136c91(0x68a)]['y']);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x81c)]=Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x785)],Sprite_Actor['prototype'][_0x2832c8(0x785)]=function(){const _0x4ed9e6=_0x2832c8;VisuMZ[_0x4ed9e6(0x282)][_0x4ed9e6(0x81c)]['call'](this),VisuMZ['BattleCore'][_0x4ed9e6(0x6e8)][_0x4ed9e6(0x446)][_0x4ed9e6(0x697)]&&this[_0x4ed9e6(0x3a8)]();},VisuMZ[_0x2832c8(0x282)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x2f1)],Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x2f1)]=function(){const _0x5ee967=_0x2832c8;VisuMZ['BattleCore'][_0x5ee967(0x6e8)][_0x5ee967(0x446)][_0x5ee967(0x221)]&&this[_0x5ee967(0x3a8)](),VisuMZ[_0x5ee967(0x282)][_0x5ee967(0x4ca)][_0x5ee967(0x3c8)](this);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x3a8)]=function(){const _0x1e055a=_0x2832c8;if(!ConfigManager[_0x1e055a(0x6f9)])return;if(this['constructor']===Sprite_SvEnemy)return;const _0xfed891=VisuMZ['BattleCore'][_0x1e055a(0x6e8)]['HpGauge'],_0x19b303=new Sprite_HpGauge();_0x19b303[_0x1e055a(0x4a5)]['x']=_0xfed891['AnchorX'],_0x19b303[_0x1e055a(0x4a5)]['y']=_0xfed891[_0x1e055a(0x565)],_0x19b303[_0x1e055a(0x68a)]['x']=_0x19b303[_0x1e055a(0x68a)]['y']=_0xfed891[_0x1e055a(0x539)],this[_0x1e055a(0x64e)]=_0x19b303,this[_0x1e055a(0x2ce)](this['_hpGaugeSprite']);},VisuMZ[_0x2832c8(0x282)]['Sprite_Battler_setBattler']=Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x320)],Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x320)]=function(_0x35441d){const _0x11f2bd=_0x2832c8;VisuMZ[_0x11f2bd(0x282)][_0x11f2bd(0x858)][_0x11f2bd(0x3c8)](this,_0x35441d),this[_0x11f2bd(0x85e)](_0x35441d);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x85e)]=function(_0x5bca41){const _0x15d587=_0x2832c8;if(!_0x5bca41)return;if(!this[_0x15d587(0x64e)])return;if(_0x5bca41['isActor']()){}else{if(_0x5bca41['isEnemy']()){if(this[_0x15d587(0x493)]===Sprite_SvEnemy&&!_0x5bca41[_0x15d587(0x6e3)]())return;}}this['_hpGaugeSprite'][_0x15d587(0x805)](_0x5bca41,'hp');},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x483)]=function(){const _0x485f41=_0x2832c8;if(!this['_battler'])return;if(!this[_0x485f41(0x64e)])return;const _0x29969a=VisuMZ['BattleCore'][_0x485f41(0x6e8)][_0x485f41(0x446)],_0x562cec=this['_hpGaugeSprite'];_0x562cec[_0x485f41(0x49d)]=this[_0x485f41(0x350)]();const _0x27089a=_0x29969a[_0x485f41(0x2b3)],_0x2e6431=_0x29969a[_0x485f41(0x73e)];_0x562cec['x']=_0x27089a,_0x562cec['x']+=this[_0x485f41(0x587)][_0x485f41(0x5e9)](),_0x562cec['y']=-this[_0x485f41(0x28d)]+_0x2e6431,_0x562cec['y']+=this[_0x485f41(0x587)][_0x485f41(0x6ee)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x350)]=function(){const _0x221b25=_0x2832c8;if(!this[_0x221b25(0x587)])return![];if(this[_0x221b25(0x587)][_0x221b25(0x44c)]())return!![];const _0x30847d=this[_0x221b25(0x587)]['enemy']()['note'];if(_0x30847d[_0x221b25(0x6f0)](/<SHOW HP GAUGE>/i))return!![];if(_0x30847d[_0x221b25(0x6f0)](/<HIDE HP GAUGE>/i))return![];const _0x41fff5=VisuMZ[_0x221b25(0x282)][_0x221b25(0x6e8)][_0x221b25(0x446)];if(_0x41fff5[_0x221b25(0x574)]){if(_0x41fff5['BTestBypass']&&BattleManager[_0x221b25(0x2db)]())return!![];if(this[_0x221b25(0x587)][_0x221b25(0x800)])return![];return this['_battler']['hasBeenDefeatedBefore']();}return!![];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x719)]=Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x5be)],Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x5be)]=function(){const _0x431758=_0x2832c8;if(!this['_battler'])return![];return VisuMZ[_0x431758(0x282)][_0x431758(0x719)][_0x431758(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x4d0)]=Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x1f7)],Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x1f7)]=function(_0x58e744,_0x1c090d,_0x4e30c0){const _0x3e51cc=_0x2832c8;this['canMove']()&&VisuMZ[_0x3e51cc(0x282)][_0x3e51cc(0x4d0)][_0x3e51cc(0x3c8)](this,_0x58e744,_0x1c090d,_0x4e30c0);},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x28b)]=function(){const _0x22d0b2=_0x2832c8;if(this[_0x22d0b2(0x587)]&&this[_0x22d0b2(0x587)][_0x22d0b2(0x7d5)]())return![];if(this['_battler']&&!this[_0x22d0b2(0x587)]['canBattlerMove']())return![];return $gameSystem[_0x22d0b2(0x593)]();},Sprite_Battler[_0x2832c8(0x749)][_0x2832c8(0x231)]=function(){},Sprite_Battler['prototype'][_0x2832c8(0x8a0)]=function(){const _0x47d8d4=_0x2832c8;this[_0x47d8d4(0x1f7)](0x0,0x0,0xc);},Sprite_Battler[_0x2832c8(0x749)]['retreat']=function(){},Sprite_Battler['prototype'][_0x2832c8(0x239)]=function(){const _0x239a31=_0x2832c8,_0x2de328=VisuMZ['BattleCore'][_0x239a31(0x6e8)][_0x239a31(0x40e)],_0x299c5b=this[_0x239a31(0x587)]&&this[_0x239a31(0x587)][_0x239a31(0x44c)]()?0x1:-0x1,_0x1526b9=this[_0x239a31(0x4b3)]-this[_0x239a31(0x84b)]+_0x299c5b*_0x2de328['FlinchDistanceX'],_0x27bf1e=this[_0x239a31(0x8d3)]-this[_0x239a31(0x3ab)]+_0x299c5b*_0x2de328['FlinchDistanceY'],_0x3ebb51=_0x2de328[_0x239a31(0x431)];this['startMove'](_0x1526b9,_0x27bf1e,_0x3ebb51);},VisuMZ[_0x2832c8(0x282)]['Sprite_Actor_initMembers']=Sprite_Actor['prototype']['initMembers'],Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x459)]=function(){const _0x1a7bd5=_0x2832c8;VisuMZ[_0x1a7bd5(0x282)][_0x1a7bd5(0x7ce)][_0x1a7bd5(0x3c8)](this),this['attachSpritesToDistortionSprite']();},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x1e6)]=function(){const _0x2ae17a=_0x2832c8;return this[_0x2ae17a(0x81b)]||this[_0x2ae17a(0x4fd)]||this;},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x5dd)]=Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x275)],Sprite_Actor['prototype'][_0x2832c8(0x275)]=function(){},Sprite_Actor[_0x2832c8(0x749)]['moveToStartPositionBattleCore']=function(_0x2c3c98){const _0x401a35=_0x2832c8;if(SceneManager[_0x401a35(0x39a)]())return;if(!_0x2c3c98)return;if(!_0x2c3c98[_0x401a35(0x28b)]())return;VisuMZ[_0x401a35(0x282)]['Sprite_Actor_moveToStartPosition'][_0x401a35(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x70d)]=Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x2b8)],Sprite_Actor['prototype']['setActorHome']=function(_0x2373ee){const _0x4d2a39=_0x2832c8;VisuMZ[_0x4d2a39(0x282)][_0x4d2a39(0x6e8)][_0x4d2a39(0x40e)]['HomePosJS']?VisuMZ[_0x4d2a39(0x282)][_0x4d2a39(0x6e8)]['Actor'][_0x4d2a39(0x732)]['call'](this,_0x2373ee):VisuMZ[_0x4d2a39(0x282)][_0x4d2a39(0x70d)][_0x4d2a39(0x3c8)](this,_0x2373ee);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x3f8)]=Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x320)],Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x320)]=function(_0x43d9c2){const _0x847865=_0x2832c8;VisuMZ[_0x847865(0x282)][_0x847865(0x3f8)][_0x847865(0x3c8)](this,_0x43d9c2),this[_0x847865(0x481)](_0x43d9c2);},Sprite_Actor['prototype'][_0x2832c8(0x481)]=function(_0xb0ea47){const _0x3aed4a=_0x2832c8;if(!_0xb0ea47)return;if(!this['_mainSprite'])return;this[_0x3aed4a(0x4fd)][_0x3aed4a(0x4a5)]['x']=this[_0x3aed4a(0x8c1)][_0x3aed4a(0x1d8)](),this['_mainSprite'][_0x3aed4a(0x4a5)]['y']=this[_0x3aed4a(0x8c1)][_0x3aed4a(0x728)](),this[_0x3aed4a(0x1b4)]();},VisuMZ[_0x2832c8(0x282)]['Sprite_Actor_update']=Sprite_Actor[_0x2832c8(0x749)]['update'],Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x21b)]=function(){const _0x3754d5=_0x2832c8;VisuMZ[_0x3754d5(0x282)][_0x3754d5(0x590)][_0x3754d5(0x3c8)](this),this[_0x3754d5(0x8c1)]&&(this['updateStateSprite'](),this['updateStyleOpacity']());},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x6bf)]=Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x4d8)],Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x4d8)]=function(){const _0x1fd901=_0x2832c8;VisuMZ[_0x1fd901(0x282)][_0x1fd901(0x6bf)][_0x1fd901(0x3c8)](this),this[_0x1fd901(0x4fd)]&&this[_0x1fd901(0x4fd)]['bitmap']&&this['_battler']&&(this['_mainSprite'][_0x1fd901(0x6c6)][_0x1fd901(0x4d3)]!==this['_battler'][_0x1fd901(0x7aa)]()&&(this[_0x1fd901(0x4fd)][_0x1fd901(0x6c6)][_0x1fd901(0x4d3)]=this[_0x1fd901(0x587)]['battlerSmoothImage']()));},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x4e6)]=Sprite_Actor['prototype'][_0x2832c8(0x206)],Sprite_Actor[_0x2832c8(0x749)]['updateShadow']=function(){const _0x47e085=_0x2832c8;VisuMZ[_0x47e085(0x282)][_0x47e085(0x4e6)][_0x47e085(0x3c8)](this),this[_0x47e085(0x58a)]();},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x58a)]=function(){const _0x3438e1=_0x2832c8;if(!this[_0x3438e1(0x4fd)])return;if(!this['_shadowSprite'])return;this[_0x3438e1(0x1b4)](),this[_0x3438e1(0x8c7)]();},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x3ae)]=function(){const _0x291440=_0x2832c8;this[_0x291440(0x23f)][_0x291440(0x68a)]['x']=0x1/(this['scale']['x']||0.001),this[_0x291440(0x23f)][_0x291440(0x68a)]['y']=0x1/(this[_0x291440(0x68a)]['y']||0.001);},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x50c)]=function(){const _0x454ece=_0x2832c8;if(!$gameSystem[_0x454ece(0x593)]()&&this[_0x454ece(0x493)]===Sprite_Actor){const _0x391c10=Scene_Battle[_0x454ece(0x749)][_0x454ece(0x8d4)]();['default',_0x454ece(0x62c),_0x454ece(0x4f3),_0x454ece(0x722)][_0x454ece(0x569)](_0x391c10)&&(this[_0x454ece(0x3ce)]=0x0);}},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x28f)]=function(){const _0x114d6d=_0x2832c8,_0x3c61bf=this[_0x114d6d(0x8c1)];if(_0x3c61bf){const _0x1b0390=_0x3c61bf[_0x114d6d(0x63e)]();if(_0x3c61bf[_0x114d6d(0x517)]()||_0x3c61bf[_0x114d6d(0x540)]())this[_0x114d6d(0x4d2)](_0x114d6d(0x5a6));else{if(_0x1b0390===0x3)this[_0x114d6d(0x4d2)](_0x114d6d(0x45b));else{if(_0x1b0390===0x2)this[_0x114d6d(0x4d2)](_0x114d6d(0x27b));else{if(this[_0x114d6d(0x1ae)])this[_0x114d6d(0x4d2)](_0x114d6d(0x2fc));else{if(_0x3c61bf[_0x114d6d(0x1fa)]())this[_0x114d6d(0x4d2)]('wait');else{if(_0x3c61bf[_0x114d6d(0x192)]())this[_0x114d6d(0x4d2)](_0x114d6d(0x7c4));else{if(_0x3c61bf[_0x114d6d(0x58d)]()||_0x3c61bf[_0x114d6d(0x7ee)]())this[_0x114d6d(0x4d2)](_0x114d6d(0x232));else{if(_0x1b0390===0x1)this[_0x114d6d(0x4d2)](_0x114d6d(0x5ae));else{if(_0x3c61bf[_0x114d6d(0x466)]())this[_0x114d6d(0x4d2)](_0x114d6d(0x7c8));else{if(_0x3c61bf['isUndecided']())this[_0x114d6d(0x4d2)](_0x114d6d(0x5a6));else _0x3c61bf[_0x114d6d(0x6b2)]()?this[_0x114d6d(0x4d2)]('wait'):this[_0x114d6d(0x4d2)](_0x114d6d(0x5a6));}}}}}}}}}}},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x4b5)]=function(){const _0x52c2bc=_0x2832c8,_0x380cec=0xa,_0x22499f=0x12c*_0x380cec,_0x4af8b4=0x1e*_0x380cec;this[_0x52c2bc(0x1f7)](_0x22499f,0x0,_0x4af8b4);},Sprite_Actor[_0x2832c8(0x749)]['onMoveEnd']=function(){const _0x4dc52f=_0x2832c8;Sprite_Battler[_0x4dc52f(0x749)]['onMoveEnd'][_0x4dc52f(0x3c8)](this);},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x180)]=function(){const _0x2cfe42=_0x2832c8;return Sprite_Battler[_0x2cfe42(0x323)];},Sprite_Weapon[_0x2832c8(0x749)][_0x2832c8(0x7a1)]=function(){const _0x2829da=_0x2832c8;return Sprite_Battler[_0x2829da(0x323)];},Sprite_Actor['prototype'][_0x2832c8(0x5b2)]=function(){},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x5af)]=function(){},Sprite_Actor[_0x2832c8(0x749)]['updateMotionCount']=function(){const _0x2761cc=_0x2832c8;if(this[_0x2761cc(0x680)]&&++this[_0x2761cc(0x3ca)]>=this['motionSpeed']()){if(this[_0x2761cc(0x680)][_0x2761cc(0x1c1)])this[_0x2761cc(0x3cb)]=(this[_0x2761cc(0x3cb)]+0x1)%0x4;else this[_0x2761cc(0x3cb)]<0x2?this[_0x2761cc(0x3cb)]++:this[_0x2761cc(0x28f)]();this[_0x2761cc(0x3ca)]=0x0;}},Sprite_Actor[_0x2832c8(0x749)]['forceMotion']=function(_0x1c9bfe){const _0x5917da=_0x2832c8;if(_0x1c9bfe===_0x5917da(0x519))this['_checkOn']=!![];if(this['_battler']&&this[_0x5917da(0x587)][_0x5917da(0x7d5)]()){this['_motion']=Sprite_Actor['MOTIONS'][_0x5917da(0x45b)];return;}const _0x32bd29=Sprite_Actor[_0x5917da(0x76a)][_0x1c9bfe];this[_0x5917da(0x680)]=_0x32bd29,this['_motionCount']=0x0,this[_0x5917da(0x3cb)]=0x0;},Sprite_Actor['prototype']['forceWeaponAnimation']=function(_0x22031c){const _0x781f49=_0x2832c8;this[_0x781f49(0x2e1)](),this[_0x781f49(0x8c9)][_0x781f49(0x805)](_0x22031c),this[_0x781f49(0x8c1)]['clearWeaponAnimation']();},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x2e1)]=function(){const _0x3773f2=_0x2832c8;let _0x16f155=-0x10,_0x45c66c=this[_0x3773f2(0x28d)]*0.5;const _0x5bed90=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0xb1ed9=this[_0x3773f2(0x587)]['traitObjects']()[_0x3773f2(0x8b3)](_0x5a18f1=>_0x5a18f1&&_0x5a18f1['note'][_0x3773f2(0x6f0)](_0x5bed90)?Number(RegExp['$1']):0x0),_0x2090d0=this['_battler']['traitObjects']()['map'](_0x4b24df=>_0x4b24df&&_0x4b24df[_0x3773f2(0x75e)][_0x3773f2(0x6f0)](_0x5bed90)?Number(RegExp['$2']):0x0);_0x16f155=_0xb1ed9[_0x3773f2(0x317)]((_0xb25371,_0x51071f)=>_0xb25371+_0x51071f,_0x16f155),_0x45c66c=_0x2090d0[_0x3773f2(0x317)]((_0x5310c2,_0x5a06aa)=>_0x5310c2+_0x5a06aa,_0x45c66c),this[_0x3773f2(0x8c9)]['x']=_0x16f155,this[_0x3773f2(0x8c9)]['y']=_0x45c66c,this[_0x3773f2(0x8c9)]['update']();},Sprite_Weapon[_0x2832c8(0x749)][_0x2832c8(0x805)]=function(_0x45a62c){const _0x3454d4=_0x2832c8;this[_0x3454d4(0x75b)]=_0x45a62c,this[_0x3454d4(0x682)]=-0x1,this[_0x3454d4(0x3cb)]=0x0,this[_0x3454d4(0x840)](),this[_0x3454d4(0x7be)]();},Sprite_Actor['prototype']['updateTargetPosition']=function(){},Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x231)]=function(){const _0x437161=_0x2832c8,_0xd15faf=VisuMZ[_0x437161(0x282)][_0x437161(0x6e8)][_0x437161(0x5e4)],_0x4c9184=_0xd15faf['StepDistanceX'],_0x92a37e=_0xd15faf[_0x437161(0x618)],_0x41a2f4=_0xd15faf[_0x437161(0x5a0)];this[_0x437161(0x1f7)](-_0x4c9184,-_0x92a37e,_0x41a2f4);},VisuMZ[_0x2832c8(0x282)]['Sprite_Actor_updateFrame']=Sprite_Actor[_0x2832c8(0x749)][_0x2832c8(0x7be)],Sprite_Actor['prototype'][_0x2832c8(0x7be)]=function(){const _0x72bcf5=_0x2832c8;this[_0x72bcf5(0x246)](),VisuMZ['BattleCore'][_0x72bcf5(0x5d5)][_0x72bcf5(0x3c8)](this);},Sprite_Actor[_0x2832c8(0x749)]['applyFreezeMotionFrames']=function(){const _0x5dba7c=_0x2832c8;if(this[_0x5dba7c(0x587)]&&this[_0x5dba7c(0x587)][_0x5dba7c(0x685)]){const _0x1a09db=this['_battler']['_freezeMotionData'];this[_0x5dba7c(0x680)]=Sprite_Actor[_0x5dba7c(0x76a)][_0x1a09db[_0x5dba7c(0x25b)]],this['_pattern']=_0x1a09db[_0x5dba7c(0x392)];const _0x12e6e6=this[_0x5dba7c(0x8c9)];_0x12e6e6[_0x5dba7c(0x552)](_0x1a09db[_0x5dba7c(0x7c0)],_0x1a09db['pattern']),this[_0x5dba7c(0x2e1)]();}},Sprite_Weapon[_0x2832c8(0x749)][_0x2832c8(0x552)]=function(_0x255fa9,_0x51dfd0){const _0x5b5cd8=_0x2832c8;this[_0x5b5cd8(0x75b)]=_0x255fa9,this[_0x5b5cd8(0x682)]=-Infinity,this[_0x5b5cd8(0x3cb)]=_0x51dfd0,this[_0x5b5cd8(0x840)](),this['updateFrame']();},Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x459)]=function(){const _0x3119f1=_0x2832c8;Sprite_Battler[_0x3119f1(0x749)][_0x3119f1(0x459)][_0x3119f1(0x3c8)](this),this['_enemy']=null,this[_0x3119f1(0x67e)]=![],this[_0x3119f1(0x22e)]='',this[_0x3119f1(0x212)]=0x0,this[_0x3119f1(0x1c2)]=null,this[_0x3119f1(0x18e)]=0x0,this[_0x3119f1(0x1b6)]=0x0,this[_0x3119f1(0x439)](),this[_0x3119f1(0x2f1)]();},VisuMZ['BattleCore'][_0x2832c8(0x3ff)]=Sprite_Enemy['prototype']['update'],Sprite_Enemy[_0x2832c8(0x749)]['update']=function(){const _0x5a6ecf=_0x2832c8;VisuMZ[_0x5a6ecf(0x282)][_0x5a6ecf(0x3ff)][_0x5a6ecf(0x3c8)](this),this['updateShadowVisibility']();},Sprite_Enemy[_0x2832c8(0x749)]['createMainSprite']=function(){const _0x35b30b=_0x2832c8;this[_0x35b30b(0x4fd)]=new Sprite(),this['_mainSprite']['anchor']['x']=0.5,this[_0x35b30b(0x4fd)][_0x35b30b(0x4a5)]['y']=0x1,this[_0x35b30b(0x2ce)](this[_0x35b30b(0x4fd)]),this['attachSpritesToDistortionSprite']();},Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x1e6)]=function(){const _0x512f5c=_0x2832c8;return this['_distortionSprite']||this[_0x512f5c(0x4fd)]||this;},Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x840)]=function(_0x476068){const _0x10d3c5=_0x2832c8;this[_0x10d3c5(0x6c6)]=new Bitmap(0x1,0x1),$gameSystem['isSideView']()?this['_mainSprite'][_0x10d3c5(0x6c6)]=ImageManager[_0x10d3c5(0x8e2)](_0x476068):this[_0x10d3c5(0x4fd)][_0x10d3c5(0x6c6)]=ImageManager[_0x10d3c5(0x36b)](_0x476068),this['_mainSprite'][_0x10d3c5(0x6c6)][_0x10d3c5(0x274)](this[_0x10d3c5(0x61b)][_0x10d3c5(0x1b2)](this));},Sprite_Enemy['prototype'][_0x2832c8(0x61b)]=function(){const _0x48c434=_0x2832c8,_0x5da2b7=this[_0x48c434(0x4fd)][_0x48c434(0x6c6)];_0x5da2b7&&(this[_0x48c434(0x6c6)]=new Bitmap(_0x5da2b7[_0x48c434(0x797)],_0x5da2b7[_0x48c434(0x28d)]));},VisuMZ['BattleCore'][_0x2832c8(0x1ec)]=Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x7fe)],Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x7fe)]=function(_0x2fec4c){const _0x587ecd=_0x2832c8;this[_0x587ecd(0x4fd)]&&this[_0x587ecd(0x4fd)][_0x587ecd(0x7fe)](_0x2fec4c);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x1bb)]=Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x8ee)],Sprite_Enemy[_0x2832c8(0x749)]['initVisibility']=function(){const _0x55728d=_0x2832c8;this['allowCollapse']()?VisuMZ['BattleCore'][_0x55728d(0x1bb)][_0x55728d(0x3c8)](this):(this[_0x55728d(0x67e)]=!this[_0x55728d(0x44d)][_0x55728d(0x6cb)](),!this[_0x55728d(0x67e)]&&(this[_0x55728d(0x3ce)]=0x0));},VisuMZ['BattleCore'][_0x2832c8(0x6ed)]=Sprite_Enemy['prototype'][_0x2832c8(0x1f2)],Sprite_Enemy['prototype']['updateCollapse']=function(){const _0x1b65f0=_0x2832c8;if(this[_0x1b65f0(0x6a0)]())VisuMZ[_0x1b65f0(0x282)][_0x1b65f0(0x6ed)][_0x1b65f0(0x3c8)](this);},Sprite_Enemy['prototype'][_0x2832c8(0x7be)]=function(){const _0x1abf00=_0x2832c8;Sprite_Battler[_0x1abf00(0x749)][_0x1abf00(0x7be)][_0x1abf00(0x3c8)](this);const _0x56840a=this['mainSprite']()||this;if(!_0x56840a)return;!_0x56840a[_0x1abf00(0x6c6)]&&(_0x56840a[_0x1abf00(0x6c6)]=new Bitmap(this[_0x1abf00(0x797)],this['height'])),this['_effectType']===_0x1abf00(0x7df)?this[_0x1abf00(0x4fd)]['setFrame'](0x0,0x0,this[_0x1abf00(0x4fd)][_0x1abf00(0x797)],this[_0x1abf00(0x18e)]):_0x56840a[_0x1abf00(0x499)](0x0,0x0,_0x56840a[_0x1abf00(0x6c6)][_0x1abf00(0x797)],this[_0x1abf00(0x6c6)][_0x1abf00(0x28d)]);},VisuMZ['BattleCore'][_0x2832c8(0x536)]=Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x40f)],Sprite_Enemy[_0x2832c8(0x749)]['updateBossCollapse']=function(){const _0x2203c6=_0x2832c8;if(this[_0x2203c6(0x6a0)]())VisuMZ['BattleCore'][_0x2203c6(0x536)][_0x2203c6(0x3c8)](this);},Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x5be)]=function(){const _0x4eff6a=_0x2832c8;return Sprite_Battler[_0x4eff6a(0x749)][_0x4eff6a(0x5be)][_0x4eff6a(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x6fd)]=Sprite_Enemy['prototype'][_0x2832c8(0x3ae)],Sprite_Enemy[_0x2832c8(0x749)]['updateStateSprite']=function(){const _0x35c349=_0x2832c8;VisuMZ[_0x35c349(0x282)][_0x35c349(0x6fd)][_0x35c349(0x3c8)](this),this[_0x35c349(0x6b6)]();},Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x6b6)]=function(){const _0x2b2165=_0x2832c8;this[_0x2b2165(0x4ba)]['x']=0x0,this['_stateIconSprite']['x']+=this[_0x2b2165(0x587)]['battleUIOffsetX'](),this[_0x2b2165(0x4ba)]['y']=-this['bitmap'][_0x2b2165(0x28d)]-this[_0x2b2165(0x4ba)][_0x2b2165(0x28d)],this[_0x2b2165(0x4ba)]['y']+=this[_0x2b2165(0x587)][_0x2b2165(0x6ee)](),this[_0x2b2165(0x4ba)]['scale']['x']=0x1/(this['scale']['x']||0.001),this[_0x2b2165(0x4ba)][_0x2b2165(0x68a)]['y']=0x1/(this[_0x2b2165(0x68a)]['y']||0.001),this[_0x2b2165(0x6e3)]()&&(this[_0x2b2165(0x3d1)][_0x2b2165(0x23f)][_0x2b2165(0x68a)]['x']=-0x1/(this[_0x2b2165(0x68a)]['x']||0.001),this[_0x2b2165(0x3d1)]['_stateSprite'][_0x2b2165(0x68a)]['y']=0x1/(this['scale']['y']||0.001));},VisuMZ[_0x2832c8(0x282)]['Sprite_Enemy_setBattler']=Sprite_Enemy[_0x2832c8(0x749)]['setBattler'],Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x320)]=function(_0x5202ee){const _0x4f690c=_0x2832c8;VisuMZ[_0x4f690c(0x282)][_0x4f690c(0x36f)][_0x4f690c(0x3c8)](this,_0x5202ee),this['setSvBattlerSprite'](_0x5202ee);},Sprite_Enemy[_0x2832c8(0x749)]['setSvBattlerSprite']=function(_0xe60bd6){const _0x2ec9d4=_0x2832c8;!this[_0x2ec9d4(0x3d1)]&&(this[_0x2ec9d4(0x3d1)]=new Sprite_SvEnemy(_0xe60bd6),this[_0x2ec9d4(0x341)]()),this[_0x2ec9d4(0x3d1)][_0x2ec9d4(0x320)](_0xe60bd6);},Sprite_Enemy['prototype'][_0x2832c8(0x6e3)]=function(){const _0x5e75c7=_0x2832c8;return this[_0x5e75c7(0x44d)]&&this[_0x5e75c7(0x44d)][_0x5e75c7(0x6e3)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x620)]=Sprite_Enemy['prototype'][_0x2832c8(0x840)],Sprite_Enemy['prototype'][_0x2832c8(0x840)]=function(_0x3c0db8){const _0x3a3078=_0x2832c8;if(this['hasSvBattler']()){const _0x1f0f1e=this['_enemy'][_0x3a3078(0x300)]();this['bitmap']=new Bitmap(_0x1f0f1e[_0x3a3078(0x797)],_0x1f0f1e[_0x3a3078(0x28d)]);}else VisuMZ[_0x3a3078(0x282)][_0x3a3078(0x620)][_0x3a3078(0x3c8)](this,_0x3c0db8);},Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x6a0)]=function(){const _0x58f8f4=_0x2832c8;return this[_0x58f8f4(0x6e3)]()?this[_0x58f8f4(0x44d)][_0x58f8f4(0x6a0)]():!![];},Sprite_Enemy[_0x2832c8(0x749)]['refreshMotion']=function(){const _0x4fad86=_0x2832c8;this[_0x4fad86(0x6e3)]()&&this[_0x4fad86(0x3d1)][_0x4fad86(0x28f)]();},Sprite_Enemy['prototype']['forceMotion']=function(_0x597ac8){const _0x5160a4=_0x2832c8;if(this[_0x5160a4(0x6e3)]())this[_0x5160a4(0x3d1)][_0x5160a4(0x59d)](_0x597ac8);},Sprite_Enemy[_0x2832c8(0x749)][_0x2832c8(0x474)]=function(_0x463091){const _0x4011df=_0x2832c8;if(this['hasSvBattler']())this['_svBattlerSprite'][_0x4011df(0x474)](_0x463091);},Sprite_Enemy['prototype']['stepForward']=function(){const _0x5e7f5e=_0x2832c8,_0x18f2e9=VisuMZ['BattleCore'][_0x5e7f5e(0x6e8)]['ActionSequence'],_0xe2fb7a=_0x18f2e9[_0x5e7f5e(0x511)],_0x4cba23=_0x18f2e9[_0x5e7f5e(0x618)],_0x247b56=_0x18f2e9[_0x5e7f5e(0x5a0)];this[_0x5e7f5e(0x1f7)](_0xe2fb7a,_0x4cba23,_0x247b56);};function Sprite_SvEnemy(){const _0x4c3bda=_0x2832c8;this[_0x4c3bda(0x44f)](...arguments);}Sprite_SvEnemy[_0x2832c8(0x749)]=Object['create'](Sprite_Actor[_0x2832c8(0x749)]),Sprite_SvEnemy[_0x2832c8(0x749)][_0x2832c8(0x493)]=Sprite_SvEnemy,Sprite_SvEnemy['prototype'][_0x2832c8(0x44f)]=function(_0x38b5e5){const _0x13c393=_0x2832c8;Sprite_Actor[_0x13c393(0x749)]['initialize'][_0x13c393(0x3c8)](this,_0x38b5e5),this[_0x13c393(0x68a)]['x']=-0x1,this[_0x13c393(0x23f)][_0x13c393(0x68a)]['x']=-0x1;},Sprite_SvEnemy[_0x2832c8(0x749)][_0x2832c8(0x5ce)]=function(){},Sprite_SvEnemy[_0x2832c8(0x749)][_0x2832c8(0x275)]=function(){},Sprite_SvEnemy[_0x2832c8(0x749)]['setActorHome']=function(_0x4eb8b3){},Sprite_SvEnemy[_0x2832c8(0x749)]['updateShadow']=function(){},Sprite_SvEnemy['prototype']['updateShadowPosition']=function(){},Sprite_SvEnemy['prototype'][_0x2832c8(0x3ae)]=function(){const _0x17b4a2=_0x2832c8;this[_0x17b4a2(0x23f)]['visible']=![];},Sprite_SvEnemy['prototype']['updateBitmap']=function(){const _0x140c94=_0x2832c8;Sprite_Battler['prototype'][_0x140c94(0x4d8)][_0x140c94(0x3c8)](this);const _0x5c85a1=this[_0x140c94(0x8c1)]['svBattlerName']();this[_0x140c94(0x22e)]!==_0x5c85a1&&(this[_0x140c94(0x22e)]=_0x5c85a1,this[_0x140c94(0x4fd)][_0x140c94(0x6c6)]=ImageManager['loadSvActor'](_0x5c85a1)),this[_0x140c94(0x4fd)]&&this['_mainSprite'][_0x140c94(0x6c6)]&&this['_battler']&&(this['_mainSprite'][_0x140c94(0x6c6)]['smooth']!==this[_0x140c94(0x587)][_0x140c94(0x7aa)]()&&(this[_0x140c94(0x4fd)][_0x140c94(0x6c6)][_0x140c94(0x4d3)]=this[_0x140c94(0x587)]['battlerSmoothImage']()));},Sprite_SvEnemy[_0x2832c8(0x749)]['retreat']=function(){},Sprite_SvEnemy['prototype'][_0x2832c8(0x1f7)]=function(_0x2ee327,_0x296e95,_0x2b676c){const _0x5a3286=_0x2832c8;if(this[_0x5a3286(0x5cc)])this[_0x5a3286(0x5cc)]['startMove'](_0x2ee327,_0x296e95,_0x2b676c);},Sprite_SvEnemy[_0x2832c8(0x749)][_0x2832c8(0x28f)]=function(){const _0x434910=_0x2832c8,_0x475eb1=this[_0x434910(0x8c1)];if(_0x475eb1){const _0xb25102=_0x475eb1[_0x434910(0x63e)]();if(_0x475eb1[_0x434910(0x517)]()||_0x475eb1[_0x434910(0x540)]())this[_0x434910(0x4d2)](_0x434910(0x5a6));else{if(_0xb25102===0x3)this[_0x434910(0x4d2)](_0x434910(0x45b));else{if(_0xb25102===0x2)this[_0x434910(0x4d2)](_0x434910(0x27b));else{if(_0x475eb1['isChanting']())this['startMotion'](_0x434910(0x7c4));else{if(_0x475eb1['isGuard']()||_0x475eb1['isGuardWaiting']())this[_0x434910(0x4d2)]('guard');else{if(_0xb25102===0x1)this[_0x434910(0x4d2)](_0x434910(0x5ae));else{if(_0x475eb1[_0x434910(0x466)]())this['startMotion'](_0x434910(0x7c8));else _0x475eb1[_0x434910(0x8ba)]()?this[_0x434910(0x4d2)]('walk'):this[_0x434910(0x4d2)](_0x475eb1[_0x434910(0x300)]()[_0x434910(0x56f)]||'walk');}}}}}}}},Sprite_SvEnemy['prototype'][_0x2832c8(0x88b)]=function(){const _0x4aa47c=_0x2832c8;return this['parent']?this[_0x4aa47c(0x5cc)][_0x4aa47c(0x277)]===0x0&&this[_0x4aa47c(0x5cc)]['_offsetY']===0x0:!![];},Sprite_SvEnemy[_0x2832c8(0x749)][_0x2832c8(0x79c)]=function(){},Sprite_Damage[_0x2832c8(0x749)]['setupBattleCore']=function(_0x54451f){const _0x4a3492=_0x2832c8,_0x2cdd3c=_0x54451f[_0x4a3492(0x520)]()||_0x54451f[_0x4a3492(0x64a)]();if(_0x2cdd3c[_0x4a3492(0x827)]||_0x2cdd3c['evaded'])this['_colorType']=0x0,this[_0x4a3492(0x867)]();else{if(_0x2cdd3c[_0x4a3492(0x368)])this[_0x4a3492(0x687)]=_0x2cdd3c[_0x4a3492(0x313)]>=0x0?0x0:0x1,this[_0x4a3492(0x7e9)](_0x2cdd3c['hpDamage']);else _0x54451f[_0x4a3492(0x6be)]()&&_0x2cdd3c['mpDamage']!==0x0&&(this[_0x4a3492(0x687)]=_0x2cdd3c[_0x4a3492(0x6c3)]>=0x0?0x2:0x3,this[_0x4a3492(0x7e9)](_0x2cdd3c['mpDamage']));}_0x2cdd3c[_0x4a3492(0x8e4)]&&this[_0x4a3492(0x62a)]();},Sprite_Damage[_0x2832c8(0x749)][_0x2832c8(0x805)]=function(_0x390069){},Sprite_Damage[_0x2832c8(0x749)][_0x2832c8(0x7e9)]=function(_0x2db261){const _0x2b466f=_0x2832c8;let _0xce2452=this[_0x2b466f(0x496)](_0x2db261);const _0xd7410d=this[_0x2b466f(0x3a5)](),_0x370080=Math[_0x2b466f(0x1fd)](_0xd7410d*0.75);for(let _0x10d259=0x0;_0x10d259<_0xce2452[_0x2b466f(0x720)];_0x10d259++){const _0x36c79c=this[_0x2b466f(0x333)](_0x370080,_0xd7410d);_0x36c79c[_0x2b466f(0x6c6)]['drawText'](_0xce2452[_0x10d259],0x0,0x0,_0x370080,_0xd7410d,'center'),_0x36c79c['x']=(_0x10d259-(_0xce2452[_0x2b466f(0x720)]-0x1)/0x2)*_0x370080,_0x36c79c['dy']=-_0x10d259;}},Sprite_Damage[_0x2832c8(0x749)][_0x2832c8(0x496)]=function(_0xd4479e){const _0x4d296a=_0x2832c8;let _0x441465=Math[_0x4d296a(0x3a2)](_0xd4479e)[_0x4d296a(0x2cd)]();this[_0x4d296a(0x1c4)]()&&(_0x441465=VisuMZ[_0x4d296a(0x406)](_0x441465));const _0x5c23f8=VisuMZ['BattleCore'][_0x4d296a(0x6e8)][_0x4d296a(0x3fc)];let _0x77c8e='',_0x197ab9='';switch(this[_0x4d296a(0x687)]){case 0x0:_0x77c8e=_0x5c23f8['hpDamageFmt']||'-%1',_0x197ab9=TextManager['hp'];if(_0xd4479e===0x0)_0x77c8e='%1';break;case 0x1:_0x77c8e=_0x5c23f8[_0x4d296a(0x8a2)]||'+%1',_0x197ab9=TextManager['hp'];break;case 0x2:_0x77c8e=_0x5c23f8[_0x4d296a(0x60c)]||_0x4d296a(0x5d6),_0x197ab9=TextManager['mp'];break;case 0x3:_0x77c8e=_0x5c23f8[_0x4d296a(0x8a5)]||'+%1\x20MP',_0x197ab9=TextManager['mp'];break;}return _0x77c8e['format'](_0x441465,_0x197ab9)[_0x4d296a(0x757)]();},Sprite_Damage['prototype'][_0x2832c8(0x1c4)]=function(){const _0x3a6820=_0x2832c8;return Imported[_0x3a6820(0x84a)]?VisuMZ[_0x3a6820(0x4de)]['Settings']['QoL'][_0x3a6820(0x7dd)]:![];},Sprite_Damage['prototype']['setupCriticalEffect']=function(){const _0x5e71dc=_0x2832c8,_0x3ca0b5=VisuMZ[_0x5e71dc(0x282)]['Settings']['Damage'];this['_flashColor']=_0x3ca0b5[_0x5e71dc(0x88a)][_0x5e71dc(0x4d6)](0x0),this[_0x5e71dc(0x753)]=_0x3ca0b5['CriticalDuration'];},Sprite_Damage[_0x2832c8(0x749)][_0x2832c8(0x831)]=function(_0x4a5c93,_0x92d3c1){const _0xedaeb9=_0x2832c8;this[_0xedaeb9(0x784)]=_0x92d3c1[_0xedaeb9(0x29f)]||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx['makeDeepCopy'](this[_0xedaeb9(0x784)]),this[_0xedaeb9(0x753)]=_0x92d3c1['flashDuration']||0x0;const _0x409bdc=this['fontSize'](),_0x19f953=Math['floor'](_0x409bdc*0x1e),_0x419dee=this[_0xedaeb9(0x333)](_0x19f953,_0x409bdc);_0x419dee[_0xedaeb9(0x6c6)]['textColor']=ColorManager[_0xedaeb9(0x799)](_0x92d3c1['textColor']),_0x419dee[_0xedaeb9(0x6c6)][_0xedaeb9(0x881)](_0x4a5c93,0x0,0x0,_0x19f953,_0x409bdc,_0xedaeb9(0x3de)),_0x419dee['dy']=0x0;},Sprite_Damage[_0x2832c8(0x749)][_0x2832c8(0x743)]=function(_0x5801d2,_0xc2ab53,_0x5257c6){const _0x2e3570=_0x2832c8,_0x5767bf=Math[_0x2e3570(0x871)](this[_0x2e3570(0x3a5)](),ImageManager[_0x2e3570(0x213)]),_0x7635b=Math[_0x2e3570(0x1fd)](_0x5767bf*0x1e),_0x2f5c4c=this['createChildSprite'](_0x7635b,_0x5767bf),_0x377a62=ImageManager[_0x2e3570(0x76b)]/0x2,_0x2740b7=_0x2f5c4c[_0x2e3570(0x6c6)][_0x2e3570(0x7c6)](_0xc2ab53+'\x20');_0x2f5c4c[_0x2e3570(0x6c6)][_0x2e3570(0x2ca)]=ColorManager[_0x2e3570(0x799)](_0x5257c6['textColor']),_0x2f5c4c[_0x2e3570(0x6c6)]['drawText'](_0xc2ab53,_0x377a62,0x0,_0x7635b-_0x377a62,_0x5767bf,'center');const _0x2a5de7=Math[_0x2e3570(0x46d)]((_0x5767bf-ImageManager[_0x2e3570(0x213)])/0x2),_0x8fe92c=_0x7635b/0x2-ImageManager[_0x2e3570(0x76b)]-_0x2740b7/0x2+_0x377a62/0x2,_0x16b779=ImageManager[_0x2e3570(0x644)](_0x2e3570(0x3a1)),_0x3935a3=ImageManager[_0x2e3570(0x76b)],_0x599a79=ImageManager['iconHeight'],_0x1f314f=_0x5801d2%0x10*_0x3935a3,_0x2a5a56=Math[_0x2e3570(0x1fd)](_0x5801d2/0x10)*_0x599a79;_0x2f5c4c[_0x2e3570(0x6c6)][_0x2e3570(0x1e7)](_0x16b779,_0x1f314f,_0x2a5a56,_0x3935a3,_0x599a79,_0x8fe92c,_0x2a5de7),this['_flashColor']=_0x5257c6['flashColor']||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx['makeDeepCopy'](this['_flashColor']),this[_0x2e3570(0x753)]=_0x5257c6[_0x2e3570(0x50b)]||0x0,_0x2f5c4c['dy']=0x0;},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x1c3)]=Sprite_StateIcon['prototype'][_0x2832c8(0x7be)],Sprite_StateIcon[_0x2832c8(0x749)]['updateFrame']=function(){const _0x44d6b5=_0x2832c8;VisuMZ[_0x44d6b5(0x282)]['Sprite_StateIcon_updateFrame'][_0x44d6b5(0x3c8)](this),this[_0x44d6b5(0x49d)]=this['_iconIndex']>0x0?!![]:![];},VisuMZ['BattleCore']['Sprite_Weapon_loadBitmap']=Sprite_Weapon[_0x2832c8(0x749)][_0x2832c8(0x840)],Sprite_Weapon[_0x2832c8(0x749)][_0x2832c8(0x840)]=function(){const _0xd4f962=_0x2832c8;VisuMZ[_0xd4f962(0x282)][_0xd4f962(0x699)][_0xd4f962(0x3c8)](this),this[_0xd4f962(0x6c6)]&&(this[_0xd4f962(0x6c6)][_0xd4f962(0x4d3)]=VisuMZ[_0xd4f962(0x282)][_0xd4f962(0x6e8)][_0xd4f962(0x40e)][_0xd4f962(0x547)]);};function Sprite_HpGauge(){const _0x18f4ac=_0x2832c8;this[_0x18f4ac(0x44f)](...arguments);}Sprite_HpGauge['prototype']=Object[_0x2832c8(0x564)](Sprite_Gauge[_0x2832c8(0x749)]),Sprite_HpGauge[_0x2832c8(0x749)][_0x2832c8(0x493)]=Sprite_HpGauge,Sprite_HpGauge['prototype']['initialize']=function(){const _0x126de4=_0x2832c8;Sprite_Gauge[_0x126de4(0x749)]['initialize'][_0x126de4(0x3c8)](this);},Sprite_HpGauge['prototype'][_0x2832c8(0x523)]=function(){return 0x0;},Sprite_HpGauge['prototype'][_0x2832c8(0x3b6)]=function(){const _0x32a332=_0x2832c8;this[_0x32a332(0x6c6)]['clear']();const _0x49aaf3=this[_0x32a332(0x59b)]();!isNaN(_0x49aaf3)&&this[_0x32a332(0x276)]();},VisuMZ[_0x2832c8(0x282)]['Sprite_Battleback_adjustPosition']=Sprite_Battleback[_0x2832c8(0x749)][_0x2832c8(0x7a0)],Sprite_Battleback[_0x2832c8(0x749)][_0x2832c8(0x7a0)]=function(){const _0x531a56=_0x2832c8,_0x2dc2c8=VisuMZ[_0x531a56(0x282)]['Settings'][_0x531a56(0x80a)];if(!_0x2dc2c8)return VisuMZ[_0x531a56(0x282)][_0x531a56(0x791)][_0x531a56(0x3c8)](this);const _0x30c358=String(_0x2dc2c8[_0x531a56(0x872)])||'MZ';switch(_0x30c358){case'MZ':VisuMZ[_0x531a56(0x282)][_0x531a56(0x791)]['call'](this);break;case _0x531a56(0x314):this['adjustPosition_1for1']();break;case'ScaleToFit':this[_0x531a56(0x658)]();break;case'ScaleDown':this[_0x531a56(0x723)]();break;case _0x531a56(0x54e):this[_0x531a56(0x1bc)]();break;}},Sprite_Battleback[_0x2832c8(0x749)][_0x2832c8(0x7eb)]=function(){const _0x3f71e2=_0x2832c8;this[_0x3f71e2(0x797)]=Graphics[_0x3f71e2(0x797)],this[_0x3f71e2(0x28d)]=Graphics[_0x3f71e2(0x28d)];const _0x367274=0x1;this['scale']['x']=_0x367274,this['scale']['y']=_0x367274,this['x']=0x0,this['y']=0x0;},Sprite_Battleback['prototype'][_0x2832c8(0x658)]=function(){const _0x36ff2d=_0x2832c8;this[_0x36ff2d(0x797)]=Graphics['width'],this[_0x36ff2d(0x28d)]=Graphics[_0x36ff2d(0x28d)];const _0x39aee7=this[_0x36ff2d(0x797)]/this[_0x36ff2d(0x6c6)][_0x36ff2d(0x797)],_0x1f2c53=this[_0x36ff2d(0x28d)]/this[_0x36ff2d(0x6c6)]['height'],_0x48e16d=Math[_0x36ff2d(0x871)](_0x39aee7,_0x1f2c53);this[_0x36ff2d(0x68a)]['x']=_0x48e16d,this[_0x36ff2d(0x68a)]['y']=_0x48e16d,this['x']=(Graphics[_0x36ff2d(0x797)]-this[_0x36ff2d(0x797)])/0x2,this['y']=Graphics['height']-this[_0x36ff2d(0x28d)];},Sprite_Battleback['prototype'][_0x2832c8(0x723)]=function(){const _0x317c68=_0x2832c8;this[_0x317c68(0x797)]=Graphics[_0x317c68(0x797)],this['height']=Graphics['height'];const _0xaaba4c=Math[_0x317c68(0x609)](0x1,this[_0x317c68(0x797)]/this[_0x317c68(0x6c6)][_0x317c68(0x797)]),_0x447f1c=Math[_0x317c68(0x609)](0x1,this[_0x317c68(0x28d)]/this[_0x317c68(0x6c6)][_0x317c68(0x28d)]),_0x4cc00d=Math[_0x317c68(0x871)](_0xaaba4c,_0x447f1c);this[_0x317c68(0x68a)]['x']=_0x4cc00d,this[_0x317c68(0x68a)]['y']=_0x4cc00d,this['x']=(Graphics[_0x317c68(0x797)]-this[_0x317c68(0x797)])/0x2,this['y']=Graphics[_0x317c68(0x28d)]-this[_0x317c68(0x28d)];},Sprite_Battleback[_0x2832c8(0x749)][_0x2832c8(0x1bc)]=function(){const _0x4c4d2=_0x2832c8;this['width']=Graphics[_0x4c4d2(0x797)],this[_0x4c4d2(0x28d)]=Graphics['height'];const _0x1f73c2=Math['max'](0x1,this[_0x4c4d2(0x797)]/this[_0x4c4d2(0x6c6)]['width']),_0x5883e4=Math['max'](0x1,this[_0x4c4d2(0x28d)]/this[_0x4c4d2(0x6c6)][_0x4c4d2(0x28d)]),_0x330418=Math['max'](_0x1f73c2,_0x5883e4);this[_0x4c4d2(0x68a)]['x']=_0x330418,this[_0x4c4d2(0x68a)]['y']=_0x330418,this['x']=(Graphics[_0x4c4d2(0x797)]-this[_0x4c4d2(0x797)])/0x2,this['y']=Graphics[_0x4c4d2(0x28d)]-this[_0x4c4d2(0x28d)];},Spriteset_Battle[_0x2832c8(0x749)]['isFlipped']=function(){const _0x24783a=_0x2832c8;if(!$gameSystem[_0x24783a(0x593)]())return![];return![];},Spriteset_Battle[_0x2832c8(0x749)]['animationBaseDelay']=function(){return 0x0;},Spriteset_Battle[_0x2832c8(0x749)]['animationNextDelay']=function(){return 0x0;},VisuMZ[_0x2832c8(0x282)]['Spriteset_Battle_createLowerLayer']=Spriteset_Battle['prototype'][_0x2832c8(0x628)],Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x628)]=function(){const _0x5a4e72=_0x2832c8;VisuMZ[_0x5a4e72(0x282)]['Spriteset_Battle_createLowerLayer'][_0x5a4e72(0x3c8)](this),this['createWeather']();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x8df)]=Spriteset_Battle[_0x2832c8(0x749)]['update'],Spriteset_Battle['prototype'][_0x2832c8(0x21b)]=function(){const _0x44f745=_0x2832c8;VisuMZ[_0x44f745(0x282)][_0x44f745(0x8df)]['call'](this),this[_0x44f745(0x624)]();},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x247)]=function(){const _0x54aec9=_0x2832c8;this[_0x54aec9(0x544)]=new Weather(),this[_0x54aec9(0x5d8)]['addChild'](this[_0x54aec9(0x544)]);},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x624)]=function(){const _0x159084=_0x2832c8;this['_weather'][_0x159084(0x3e3)]=$gameScreen[_0x159084(0x8ef)](),this['_weather']['power']=$gameScreen[_0x159084(0x4a0)]();},Game_Interpreter[_0x2832c8(0x749)]['command236']=function(_0x3d00b4){$gameScreen['changeWeather'](_0x3d00b4[0x0],_0x3d00b4[0x1],_0x3d00b4[0x2]);if(_0x3d00b4[0x3])this['wait'](_0x3d00b4[0x2]);return!![];},VisuMZ[_0x2832c8(0x282)]['Game_Interpreter_command283']=Game_Interpreter[_0x2832c8(0x749)][_0x2832c8(0x7e8)],Game_Interpreter[_0x2832c8(0x749)]['command283']=function(_0x4b50e0){const _0x2b449f=_0x2832c8;return SceneManager[_0x2b449f(0x230)]()?(SceneManager[_0x2b449f(0x37d)]['_spriteset'][_0x2b449f(0x2e6)](_0x4b50e0[0x0],_0x4b50e0[0x1]),!![]):VisuMZ['BattleCore']['Game_Interpreter_command283'][_0x2b449f(0x3c8)](this,_0x4b50e0);},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x8aa)]=function(_0x17bf59,_0x87df0c){const _0x42633c=_0x2832c8;_0x17bf59[_0x42633c(0x6c6)]=_0x87df0c;},Spriteset_Battle[_0x2832c8(0x749)]['changeBattlebacks']=function(_0xcda3a8,_0x55224a){const _0x583000=_0x2832c8;_0xcda3a8=_0xcda3a8||'',_0x55224a=_0x55224a||'';_0xcda3a8===''&&_0x55224a===''&&(_0xcda3a8=this[_0x583000(0x3ea)]['battleback1Name'](),_0x55224a=this[_0x583000(0x2fb)][_0x583000(0x59f)]());const _0x32d46f=ImageManager['loadBattleback1'](_0xcda3a8),_0x13a217=ImageManager[_0x583000(0x288)](_0x55224a);_0x32d46f['addLoadListener'](this[_0x583000(0x6c8)]['bind'](this,this['_back1Sprite'],this[_0x583000(0x2fb)],_0x32d46f,_0x13a217));},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x6c8)]=function(_0x1c7f5a,_0x5c49c2,_0x19821e,_0x162a25){const _0x4f1d69=_0x2832c8;_0x162a25[_0x4f1d69(0x274)](this['updateBattlebackBitmap2'][_0x4f1d69(0x1b2)](this,_0x1c7f5a,_0x5c49c2,_0x19821e,_0x162a25));},Spriteset_Battle[_0x2832c8(0x749)]['updateBattlebackBitmap2']=function(_0x430a5f,_0x3b20e4,_0x11893c,_0xfc70fa){const _0x3b3d20=_0x2832c8;_0x430a5f[_0x3b3d20(0x6c6)]=_0x11893c,_0x3b20e4[_0x3b3d20(0x6c6)]=_0xfc70fa,_0x430a5f[_0x3b3d20(0x7a0)](),_0x3b20e4[_0x3b3d20(0x7a0)]();},VisuMZ[_0x2832c8(0x282)]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x4b1)],Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x4b1)]=function(){const _0x28bfcb=_0x2832c8;VisuMZ[_0x28bfcb(0x282)][_0x28bfcb(0x4db)]['call'](this),this[_0x28bfcb(0x495)]();},Spriteset_Battle['prototype'][_0x2832c8(0x495)]=function(){const _0xbf83c4=_0x2832c8;this[_0xbf83c4(0x339)](),this[_0xbf83c4(0x8ca)](),this[_0xbf83c4(0x7e3)](),this['adjustFlippedBattlefield']();},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x339)]=function(){const _0x414516=_0x2832c8;this[_0x414516(0x2ae)]=new Sprite(),this[_0x414516(0x5d8)][_0x414516(0x2ce)](this['_battlerContainer']);},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x8ca)]=function(){const _0x2bb03d=_0x2832c8;this['_animationContainer']=new Sprite(),this[_0x2bb03d(0x5d8)][_0x2bb03d(0x2ce)](this['_animationContainer']);},Spriteset_Battle[_0x2832c8(0x749)]['createDamageContainer']=function(){const _0x561d27=_0x2832c8;this[_0x561d27(0x279)]=new Sprite(),this[_0x561d27(0x279)]['x']=this['_battleField']['x'],this[_0x561d27(0x279)]['y']=this[_0x561d27(0x5d8)]['y'],this[_0x561d27(0x2ce)](this[_0x561d27(0x279)]);},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x6bd)]=function(){const _0x6b70e8=_0x2832c8;if(!this[_0x6b70e8(0x1f5)]())return;this[_0x6b70e8(0x2ae)][_0x6b70e8(0x68a)]['x']=-0x1,this[_0x6b70e8(0x2ae)]['x']=this[_0x6b70e8(0x5d8)][_0x6b70e8(0x797)],this[_0x6b70e8(0x346)][_0x6b70e8(0x68a)]['x']=-0x1,this[_0x6b70e8(0x346)]['x']=this[_0x6b70e8(0x5d8)][_0x6b70e8(0x797)],this[_0x6b70e8(0x279)]['scale']['x']=-0x1,this[_0x6b70e8(0x279)]['x']=this[_0x6b70e8(0x5d8)]['x']+this[_0x6b70e8(0x5d8)][_0x6b70e8(0x797)];},Spriteset_Battle[_0x2832c8(0x749)]['createEnemies']=function(){const _0x1d0c11=_0x2832c8;Imported[_0x1d0c11(0x84a)]&&VisuMZ[_0x1d0c11(0x4de)][_0x1d0c11(0x6e8)]['UI'][_0x1d0c11(0x183)]&&this[_0x1d0c11(0x4ec)]();const _0x5b9979=$gameTroop['members'](),_0x415b35=[];for(const _0xf38787 of _0x5b9979){_0x415b35[_0x1d0c11(0x7d2)](new Sprite_Enemy(_0xf38787));}_0x415b35[_0x1d0c11(0x20e)](this[_0x1d0c11(0x273)]['bind'](this));for(const _0x5c263a of _0x415b35){this['_battlerContainer'][_0x1d0c11(0x2ce)](_0x5c263a);}this[_0x1d0c11(0x763)]=_0x415b35;},Spriteset_Battle['prototype'][_0x2832c8(0x6b9)]=function(){const _0x2b9ef9=_0x2832c8;this[_0x2b9ef9(0x1d5)]=[];for(let _0x5df6ab=0x0;_0x5df6ab<$gameParty[_0x2b9ef9(0x610)]();_0x5df6ab++){const _0x5ea7fa=$gameParty[_0x2b9ef9(0x86b)]()[_0x5df6ab],_0x470be0=new Sprite_Actor();_0x470be0[_0x2b9ef9(0x272)](_0x5ea7fa),_0x470be0['setBattler'](_0x5ea7fa),_0x470be0[_0x2b9ef9(0x21b)](),this['_actorSprites'][_0x2b9ef9(0x7d2)](_0x470be0),this['_battlerContainer'][_0x2b9ef9(0x2ce)](_0x470be0);}},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x1e3)]=function(_0x8ba619,_0x5b4b1d,_0x499488,_0x39b2f0){const _0x2dabac=_0x2832c8,_0x4bf0a7=this['isMVAnimation'](_0x5b4b1d),_0x59033c=new(_0x4bf0a7?Sprite_AnimationMV:Sprite_Animation)(),_0x3f23c8=this['makeTargetSprites'](_0x8ba619);this[_0x2dabac(0x510)](_0x8ba619[0x0])&&(_0x499488=!_0x499488),_0x59033c[_0x2dabac(0x7a2)]=_0x8ba619,_0x59033c['setup'](_0x3f23c8,_0x5b4b1d,_0x499488,_0x39b2f0),this[_0x2dabac(0x77c)](_0x59033c);},Spriteset_Battle['prototype'][_0x2832c8(0x77c)]=function(_0x14c021){const _0x163af9=_0x2832c8;this[_0x163af9(0x370)](_0x14c021)?this[_0x163af9(0x846)]()['addChild'](_0x14c021):this[_0x163af9(0x346)][_0x163af9(0x2ce)](_0x14c021),this[_0x163af9(0x226)][_0x163af9(0x7d2)](_0x14c021);},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x370)]=function(_0x25d9f8){const _0x4d1d8f=_0x2832c8;if(!_0x25d9f8)return![];if(!_0x25d9f8[_0x4d1d8f(0x81e)])return![];if(_0x25d9f8['_animation'][_0x4d1d8f(0x7f6)]!==0x0)return![];if(!_0x25d9f8[_0x4d1d8f(0x7a2)][0x0])return![];if(!_0x25d9f8[_0x4d1d8f(0x7a2)][0x0]['isActor']())return![];if($gameSystem[_0x4d1d8f(0x593)]())return![];if(!this[_0x4d1d8f(0x846)]())return![];return Window_BattleStatus[_0x4d1d8f(0x749)][_0x4d1d8f(0x8d4)]()==='portrait';},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x846)]=function(){const _0x522ead=_0x2832c8;if(!SceneManager[_0x522ead(0x37d)])return;if(!SceneManager[_0x522ead(0x37d)][_0x522ead(0x244)])return;if(!SceneManager['_scene']['_statusWindow'][_0x522ead(0x6e6)])return;return SceneManager[_0x522ead(0x37d)][_0x522ead(0x244)][_0x522ead(0x6e6)];},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x4f8)]=function(_0x23da87){const _0x481345=_0x2832c8;this[_0x481345(0x7b9)](_0x23da87);for(const _0x8b938 of _0x23da87[_0x481345(0x7a2)]){_0x8b938['endAnimation']&&_0x8b938[_0x481345(0x52e)]();}_0x23da87[_0x481345(0x5c8)]();},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x7b9)]=function(_0x26bac2){const _0x19543d=_0x2832c8;this[_0x19543d(0x226)]['remove'](_0x26bac2),this['isAnimationShownOnBattlePortrait'](_0x26bac2)?this[_0x19543d(0x846)]()['removeChild'](_0x26bac2):this[_0x19543d(0x346)][_0x19543d(0x6c5)](_0x26bac2);},VisuMZ['BattleCore'][_0x2832c8(0x19e)]=Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x36c)],Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x36c)]=function(){const _0x25dd78=_0x2832c8;VisuMZ[_0x25dd78(0x282)]['Spriteset_Battle_updateActors'][_0x25dd78(0x3c8)](this),this['updateBattlerContainer']();},Spriteset_Battle[_0x2832c8(0x749)]['updateBattlerContainer']=function(){const _0x24bc5c=_0x2832c8;this[_0x24bc5c(0x2ae)][_0x24bc5c(0x65b)][_0x24bc5c(0x20e)](this[_0x24bc5c(0x348)][_0x24bc5c(0x1b2)](this)),this['putActiveBattlerOnTop']();},Spriteset_Battle[_0x2832c8(0x749)]['compareBattlerSprites']=function(_0x311cab,_0x494536){const _0x404b50=_0x2832c8;if(VisuMZ[_0x404b50(0x282)][_0x404b50(0x6e8)]['Actor'][_0x404b50(0x76c)]){if(_0x311cab[_0x404b50(0x587)]&&_0x494536['_battler']){if(_0x311cab['_battler'][_0x404b50(0x44c)]()&&_0x494536[_0x404b50(0x587)][_0x404b50(0x2a2)]())return 0x1;else{if(_0x494536[_0x404b50(0x587)][_0x404b50(0x44c)]()&&_0x311cab[_0x404b50(0x587)][_0x404b50(0x2a2)]())return-0x1;}}}return _0x311cab[_0x404b50(0x8d3)]!==_0x494536[_0x404b50(0x8d3)]?_0x311cab[_0x404b50(0x8d3)]-_0x494536[_0x404b50(0x8d3)]:_0x494536[_0x404b50(0x25e)]-_0x311cab[_0x404b50(0x25e)];},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x700)]=function(){const _0x5b8f7e=_0x2832c8;if(!VisuMZ['BattleCore'][_0x5b8f7e(0x6e8)][_0x5b8f7e(0x40e)][_0x5b8f7e(0x6d3)])return;const _0xce13bf=BattleManager['_subject'];if(_0xce13bf){if(_0xce13bf[_0x5b8f7e(0x44c)]()&&!$gameSystem[_0x5b8f7e(0x593)]())return;const _0x5985e3=_0xce13bf[_0x5b8f7e(0x5b5)]();if(_0x5985e3&&_0xce13bf[_0x5b8f7e(0x44c)]())this[_0x5b8f7e(0x2ae)][_0x5b8f7e(0x2ce)](_0x5985e3);}},Spriteset_Battle['prototype']['processEscape']=function(){const _0x3512fb=_0x2832c8;for(const _0x99c952 of $gameParty[_0x3512fb(0x692)]()){if(!_0x99c952)continue;if(!_0x99c952['battler']())continue;_0x99c952[_0x3512fb(0x5b5)]()[_0x3512fb(0x1ae)]=!![],_0x99c952[_0x3512fb(0x5b5)]()['retreat']();}},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x6d6)]=function(){return![];},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x427)]=function(){const _0x49a812=_0x2832c8;return this[_0x49a812(0x487)]()['some'](_0x2c5ca8=>_0x2c5ca8[_0x49a812(0x27a)]());},Spriteset_Battle[_0x2832c8(0x749)]['isAnyoneJumping']=function(){const _0x3e4c36=_0x2832c8;return this[_0x3e4c36(0x487)]()[_0x3e4c36(0x41b)](_0x3e3051=>_0x3e3051[_0x3e4c36(0x28a)]());},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x848)]=function(){const _0x485405=_0x2832c8;return this['battlerSprites']()[_0x485405(0x41b)](_0x219444=>_0x219444['isGrowing']());},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x709)]=function(){const _0x437740=_0x2832c8;return this[_0x437740(0x487)]()['some'](_0x1f3010=>_0x1f3010[_0x437740(0x47a)]());},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x602)]=function(){const _0x16d204=_0x2832c8;return this[_0x16d204(0x487)]()[_0x16d204(0x41b)](_0x422b69=>_0x422b69[_0x16d204(0x5b8)]());},Spriteset_Battle[_0x2832c8(0x749)][_0x2832c8(0x3cd)]=function(){const _0x160b37=_0x2832c8;return this['battlerSprites']()[_0x160b37(0x41b)](_0x5a97ee=>_0x5a97ee['isChangingOpacity']());},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x59a)]=Window_ItemList['prototype'][_0x2832c8(0x42c)],Window_ItemList['prototype'][_0x2832c8(0x42c)]=function(){const _0x1dd609=_0x2832c8;return SceneManager[_0x1dd609(0x230)]()?SceneManager[_0x1dd609(0x37d)][_0x1dd609(0x8d4)]()==='border'?VisuMZ[_0x1dd609(0x282)][_0x1dd609(0x6e8)][_0x1dd609(0x45a)][_0x1dd609(0x301)]:VisuMZ[_0x1dd609(0x282)]['Settings'][_0x1dd609(0x45a)][_0x1dd609(0x58e)]:VisuMZ['BattleCore'][_0x1dd609(0x59a)][_0x1dd609(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x435)]=Window_SkillList[_0x2832c8(0x749)][_0x2832c8(0x42c)],Window_SkillList['prototype']['maxCols']=function(){const _0x302876=_0x2832c8;return SceneManager[_0x302876(0x230)]()?SceneManager[_0x302876(0x37d)][_0x302876(0x8d4)]()===_0x302876(0x722)?VisuMZ[_0x302876(0x282)]['Settings']['BattleLayout'][_0x302876(0x301)]:VisuMZ['BattleCore'][_0x302876(0x6e8)][_0x302876(0x45a)][_0x302876(0x58e)]:VisuMZ[_0x302876(0x282)][_0x302876(0x435)][_0x302876(0x3c8)](this);},VisuMZ['BattleCore'][_0x2832c8(0x51d)]=Window_Options[_0x2832c8(0x749)][_0x2832c8(0x3ed)],Window_Options['prototype'][_0x2832c8(0x3ed)]=function(){const _0x2a4e61=_0x2832c8;VisuMZ[_0x2a4e61(0x282)]['Window_Options_addGeneralOptions'][_0x2a4e61(0x3c8)](this),this[_0x2a4e61(0x1cd)](),this[_0x2a4e61(0x677)]();},Window_Options[_0x2832c8(0x749)][_0x2832c8(0x1cd)]=function(){const _0x78395=_0x2832c8;VisuMZ[_0x78395(0x282)][_0x78395(0x6e8)]['AutoBattle'][_0x78395(0x6ba)]&&(this[_0x78395(0x8e8)](),this['addBattleCoreAutoBattleStyleCommand']());},Window_Options[_0x2832c8(0x749)][_0x2832c8(0x677)]=function(){const _0x182996=_0x2832c8;if(!VisuMZ[_0x182996(0x282)]['Settings'][_0x182996(0x446)][_0x182996(0x52a)])return;const _0x15dd4b=TextManager[_0x182996(0x6f9)],_0x51fc4d='visualHpGauge';this[_0x182996(0x7c5)](_0x15dd4b,_0x51fc4d);},Window_Options[_0x2832c8(0x749)][_0x2832c8(0x8e8)]=function(){const _0x483a9e=_0x2832c8,_0x186a98=TextManager[_0x483a9e(0x48a)],_0x14244a=_0x483a9e(0x623);this[_0x483a9e(0x7c5)](_0x186a98,_0x14244a);},Window_Options[_0x2832c8(0x749)]['addBattleCoreAutoBattleStyleCommand']=function(){const _0x3518e2=_0x2832c8,_0x3ac74e=TextManager[_0x3518e2(0x663)],_0x322943=_0x3518e2(0x489);this[_0x3518e2(0x7c5)](_0x3ac74e,_0x322943);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x557)]=Window_Options['prototype'][_0x2832c8(0x4ac)],Window_Options['prototype']['statusText']=function(_0x3ad287){const _0x2a6001=_0x2832c8,_0x1c4077=this['commandSymbol'](_0x3ad287);return _0x1c4077===_0x2a6001(0x489)?this['statusTextAutoBattleStyle']():VisuMZ[_0x2a6001(0x282)][_0x2a6001(0x557)]['call'](this,_0x3ad287);},Window_Options[_0x2832c8(0x749)][_0x2832c8(0x5cb)]=function(){const _0x2e3866=_0x2832c8,_0x52d8a1=VisuMZ['BattleCore'][_0x2e3866(0x6e8)][_0x2e3866(0x774)],_0x4ed7cb=this[_0x2e3866(0x1a2)](_0x2e3866(0x489));return _0x4ed7cb?_0x52d8a1[_0x2e3866(0x759)]:_0x52d8a1[_0x2e3866(0x3c2)];},Window_ShopStatus[_0x2832c8(0x749)]['getItemDamageAmountLabelBattleCore']=function(){const _0x36ba52=_0x2832c8,_0x5655b8=DataManager[_0x36ba52(0x62d)](this[_0x36ba52(0x8b2)]),_0x1ebd7f=VisuMZ[_0x36ba52(0x820)][_0x5655b8];if(!_0x1ebd7f)return this['getItemDamageAmountLabelOriginal']();const _0x2cb4f6=_0x36ba52(0x63a)[_0x36ba52(0x668)](this[_0x36ba52(0x8b2)][_0x36ba52(0x817)][_0x36ba52(0x3e3)]),_0x59821e=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x36ba52(0x8b2)][_0x36ba52(0x817)][_0x36ba52(0x3e3)]];return _0x1ebd7f[_0x2cb4f6][_0x36ba52(0x668)](_0x59821e);},Window_ShopStatus[_0x2832c8(0x749)][_0x2832c8(0x742)]=function(){const _0x10a904=_0x2832c8,_0x2e387f=DataManager[_0x10a904(0x62d)](this[_0x10a904(0x8b2)]),_0x1c89b4=VisuMZ[_0x10a904(0x820)][_0x2e387f];if(!_0x1c89b4)return this[_0x10a904(0x8b8)]();return _0x1c89b4['DamageDisplay'][_0x10a904(0x3c8)](this);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x2fd)]=Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x44f)],Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x44f)]=function(_0x34f1fc){const _0x494bf5=_0x2832c8;VisuMZ[_0x494bf5(0x282)][_0x494bf5(0x2fd)][_0x494bf5(0x3c8)](this,_0x34f1fc),this[_0x494bf5(0x8e0)](_0x34f1fc);},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x8e0)]=function(_0x17c61c){const _0x358453=_0x2832c8,_0x31debc=new Rectangle(0x0,0x0,_0x17c61c[_0x358453(0x797)],_0x17c61c[_0x358453(0x28d)]);this[_0x358453(0x72c)]=new Window_Base(_0x31debc),this[_0x358453(0x72c)][_0x358453(0x3ce)]=0x0,this[_0x358453(0x2ce)](this['_commandNameWindow']),this[_0x358453(0x605)]();},Window_PartyCommand[_0x2832c8(0x749)]['callUpdateHelp']=function(){const _0x5a502b=_0x2832c8;Window_Command[_0x5a502b(0x749)][_0x5a502b(0x67b)]['call'](this);if(this[_0x5a502b(0x72c)])this[_0x5a502b(0x605)]();},Window_PartyCommand[_0x2832c8(0x749)]['updateCommandNameWindow']=function(){const _0x45d507=_0x2832c8,_0x5b0ab7=this[_0x45d507(0x72c)];_0x5b0ab7['contents'][_0x45d507(0x890)]();const _0x3bc309=this[_0x45d507(0x201)](this[_0x45d507(0x4f2)]());if(_0x3bc309===_0x45d507(0x798)&&this[_0x45d507(0x82f)]()>0x0){const _0x2663d7=this[_0x45d507(0x4dc)](this[_0x45d507(0x4f2)]());let _0x5e5ab3=this[_0x45d507(0x443)](this[_0x45d507(0x4f2)]());_0x5e5ab3=_0x5e5ab3['replace'](/\\I\[(\d+)\]/gi,''),_0x5b0ab7[_0x45d507(0x4c9)](),this[_0x45d507(0x424)](_0x5e5ab3,_0x2663d7),this[_0x45d507(0x85f)](_0x5e5ab3,_0x2663d7),this[_0x45d507(0x303)](_0x5e5ab3,_0x2663d7);}},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x424)]=function(_0x381d71,_0x422fe1){},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x85f)]=function(_0x25766a,_0x504c13){const _0x1afe73=_0x2832c8,_0x2c8820=this['_commandNameWindow'];_0x2c8820['drawText'](_0x25766a,0x0,_0x504c13['y'],_0x2c8820[_0x1afe73(0x40b)],_0x1afe73(0x3de));},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x303)]=function(_0x27376e,_0x52077e){const _0x3a2636=_0x2832c8,_0x1e5300=this[_0x3a2636(0x72c)],_0x537436=$gameSystem[_0x3a2636(0x45e)](),_0x50d901=_0x52077e['x']+Math[_0x3a2636(0x1fd)](_0x52077e[_0x3a2636(0x797)]/0x2)+_0x537436;_0x1e5300['x']=_0x1e5300[_0x3a2636(0x797)]/-0x2+_0x50d901,_0x1e5300['y']=Math[_0x3a2636(0x1fd)](_0x52077e[_0x3a2636(0x28d)]/0x2);},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x855)]=function(){const _0x3d7d63=_0x2832c8;this[_0x3d7d63(0x376)](),this[_0x3d7d63(0x508)](),this[_0x3d7d63(0x5d4)](),this[_0x3d7d63(0x877)](),this['addEscapeCommand']();},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x376)]=function(){const _0x13545e=_0x2832c8,_0x302877=this[_0x13545e(0x832)](),_0x33b097=VisuMZ[_0x13545e(0x282)][_0x13545e(0x6e8)][_0x13545e(0x45d)][_0x13545e(0x8c8)],_0x4caf31=_0x302877===_0x13545e(0x432)?TextManager[_0x13545e(0x8a3)]:'\x5cI[%1]%2'[_0x13545e(0x668)](_0x33b097,TextManager[_0x13545e(0x8a3)]),_0xe19a2f=this[_0x13545e(0x66c)]();this['addCommand'](_0x4caf31,'fight',_0xe19a2f);},Window_PartyCommand['prototype'][_0x2832c8(0x66c)]=function(){return!![];},Window_PartyCommand['prototype'][_0x2832c8(0x508)]=function(){const _0x263ae8=_0x2832c8;if(!this[_0x263ae8(0x1a3)]())return;const _0x4cdac5=this['commandStyle'](),_0x211d61=VisuMZ['BattleCore'][_0x263ae8(0x6e8)][_0x263ae8(0x45d)]['CmdIconAutoBattle'],_0x52ed59=_0x4cdac5===_0x263ae8(0x432)?TextManager[_0x263ae8(0x343)]:_0x263ae8(0x84f)[_0x263ae8(0x668)](_0x211d61,TextManager[_0x263ae8(0x343)]),_0x3c21d8=this['isAutoBattleCommandEnabled']();this[_0x263ae8(0x7c5)](_0x52ed59,_0x263ae8(0x343),_0x3c21d8);},Window_PartyCommand['prototype'][_0x2832c8(0x1a3)]=function(){const _0x2e87c2=_0x2832c8;return VisuMZ[_0x2e87c2(0x282)][_0x2e87c2(0x6e8)][_0x2e87c2(0x45d)][_0x2e87c2(0x1da)];},Window_PartyCommand['prototype'][_0x2832c8(0x262)]=function(){return!![];},Window_PartyCommand[_0x2832c8(0x749)]['addCustomCommands']=function(){},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x877)]=function(){const _0x3cfb7c=_0x2832c8;if(!this[_0x3cfb7c(0x475)]())return;const _0x511805=this[_0x3cfb7c(0x832)](),_0x466071=VisuMZ[_0x3cfb7c(0x282)]['Settings']['PartyCmd'][_0x3cfb7c(0x2e2)],_0x5234db=_0x511805===_0x3cfb7c(0x432)?TextManager[_0x3cfb7c(0x4a8)]:_0x3cfb7c(0x84f)[_0x3cfb7c(0x668)](_0x466071,TextManager[_0x3cfb7c(0x4a8)]),_0x5727e7=this['isOptionsCommandEnabled']();this[_0x3cfb7c(0x7c5)](_0x5234db,'options',_0x5727e7);},Window_PartyCommand['prototype'][_0x2832c8(0x475)]=function(){const _0x44948e=_0x2832c8;return VisuMZ[_0x44948e(0x282)]['Settings'][_0x44948e(0x45d)][_0x44948e(0x857)];},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x89a)]=function(){return!![];},Window_PartyCommand['prototype']['addEscapeCommand']=function(){const _0x519e54=_0x2832c8,_0x5a38ee=this[_0x519e54(0x832)](),_0xdf6485=VisuMZ['BattleCore'][_0x519e54(0x6e8)]['PartyCmd'][_0x519e54(0x49e)],_0x5f1f7a=_0x5a38ee===_0x519e54(0x432)?TextManager[_0x519e54(0x2fc)]:_0x519e54(0x84f)[_0x519e54(0x668)](_0xdf6485,TextManager[_0x519e54(0x2fc)]),_0x3d1b11=this['isEscapeCommandEnabled']();this[_0x519e54(0x7c5)](_0x5f1f7a,'escape',_0x3d1b11);},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x214)]=function(){const _0x1e17e2=_0x2832c8;return BattleManager[_0x1e17e2(0x39f)]();},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x838)]=function(){const _0x2ffb8a=_0x2832c8;return VisuMZ['BattleCore'][_0x2ffb8a(0x6e8)]['PartyCmd']['CmdTextAlign'];},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x55d)]=function(_0x2d8702){const _0x20403e=_0x2832c8,_0x506f29=this['commandStyleCheck'](_0x2d8702);if(_0x506f29===_0x20403e(0x4eb))this['drawItemStyleIconText'](_0x2d8702);else _0x506f29===_0x20403e(0x798)?this[_0x20403e(0x326)](_0x2d8702):Window_Command[_0x20403e(0x749)][_0x20403e(0x55d)][_0x20403e(0x3c8)](this,_0x2d8702);},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x832)]=function(){const _0x3a50f5=_0x2832c8;return VisuMZ[_0x3a50f5(0x282)]['Settings'][_0x3a50f5(0x45d)]['CmdStyle'];},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x201)]=function(_0x496ff8){const _0x173f0b=_0x2832c8;if(_0x496ff8<0x0)return _0x173f0b(0x432);const _0x304fb2=this[_0x173f0b(0x832)]();if(_0x304fb2!=='auto')return _0x304fb2;else{if(this['maxItems']()>0x0){const _0x325c38=this[_0x173f0b(0x443)](_0x496ff8);if(_0x325c38[_0x173f0b(0x6f0)](/\\I\[(\d+)\]/i)){const _0x5f3e38=this['itemLineRect'](_0x496ff8),_0x643c29=this[_0x173f0b(0x486)](_0x325c38)[_0x173f0b(0x797)];return _0x643c29<=_0x5f3e38[_0x173f0b(0x797)]?_0x173f0b(0x4eb):'icon';}}}return _0x173f0b(0x432);},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x672)]=function(_0x45344e){const _0x1b221f=_0x2832c8,_0x3c11a3=this['itemLineRect'](_0x45344e),_0x29bce6=this[_0x1b221f(0x443)](_0x45344e),_0x2f749b=this[_0x1b221f(0x486)](_0x29bce6)[_0x1b221f(0x797)];this[_0x1b221f(0x2b6)](this['isCommandEnabled'](_0x45344e));const _0xa9f1=this[_0x1b221f(0x838)]();if(_0xa9f1===_0x1b221f(0x821))this[_0x1b221f(0x1f6)](_0x29bce6,_0x3c11a3['x']+_0x3c11a3[_0x1b221f(0x797)]-_0x2f749b,_0x3c11a3['y'],_0x2f749b);else{if(_0xa9f1===_0x1b221f(0x3de)){const _0x47caf6=_0x3c11a3['x']+Math[_0x1b221f(0x1fd)]((_0x3c11a3[_0x1b221f(0x797)]-_0x2f749b)/0x2);this[_0x1b221f(0x1f6)](_0x29bce6,_0x47caf6,_0x3c11a3['y'],_0x2f749b);}else this[_0x1b221f(0x1f6)](_0x29bce6,_0x3c11a3['x'],_0x3c11a3['y'],_0x2f749b);}},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x326)]=function(_0x44f542){const _0x46de52=_0x2832c8;this[_0x46de52(0x443)](_0x44f542)[_0x46de52(0x6f0)](/\\I\[(\d+)\]/i);const _0x3d0cb0=Number(RegExp['$1'])||0x0,_0x29dfb5=this[_0x46de52(0x4dc)](_0x44f542),_0x29c962=_0x29dfb5['x']+Math[_0x46de52(0x1fd)]((_0x29dfb5['width']-ImageManager['iconWidth'])/0x2),_0x4ebb92=_0x29dfb5['y']+(_0x29dfb5[_0x46de52(0x28d)]-ImageManager[_0x46de52(0x213)])/0x2;this[_0x46de52(0x55b)](_0x3d0cb0,_0x29c962,_0x4ebb92);},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x64b)]=function(){},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x76d)]=function(){const _0x5ac098=_0x2832c8;Window_Command['prototype'][_0x5ac098(0x76d)]['call'](this);const _0x3065d8=this['battleLayoutStyle']();_0x3065d8===_0x5ac098(0x722)&&this[_0x5ac098(0x575)]();},Window_PartyCommand[_0x2832c8(0x749)]['battleLayoutStyle']=function(){const _0x5b2c9f=_0x2832c8;if(this[_0x5b2c9f(0x280)])return this[_0x5b2c9f(0x280)];return this[_0x5b2c9f(0x280)]=SceneManager[_0x5b2c9f(0x37d)][_0x5b2c9f(0x8d4)](),this[_0x5b2c9f(0x280)];},Window_PartyCommand[_0x2832c8(0x749)][_0x2832c8(0x390)]=function(){const _0x146bcd=_0x2832c8,_0x946b16=VisuMZ[_0x146bcd(0x282)][_0x146bcd(0x6e8)]['PartyCmd'],_0x512c67=this['currentSymbol']();switch(_0x512c67){case _0x146bcd(0x8a3):this[_0x146bcd(0x601)][_0x146bcd(0x7a3)](_0x946b16[_0x146bcd(0x271)]);break;case _0x146bcd(0x343):this[_0x146bcd(0x601)][_0x146bcd(0x7a3)](_0x946b16['HelpAutoBattle']);break;case _0x146bcd(0x4a8):this['_helpWindow'][_0x146bcd(0x7a3)](_0x946b16[_0x146bcd(0x553)]);break;case _0x146bcd(0x2fc):this[_0x146bcd(0x601)][_0x146bcd(0x7a3)](_0x946b16['HelpEscape']);break;default:this['_helpWindow'][_0x146bcd(0x7a3)]('');break;}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x631)]=Window_ActorCommand['prototype'][_0x2832c8(0x44f)],Window_ActorCommand[_0x2832c8(0x749)]['initialize']=function(_0x315cc7){const _0x4fb5e3=_0x2832c8;VisuMZ[_0x4fb5e3(0x282)][_0x4fb5e3(0x631)]['call'](this,_0x315cc7),this[_0x4fb5e3(0x8e0)](_0x315cc7);},Window_ActorCommand[_0x2832c8(0x749)]['createCommandNameWindow']=function(_0x37299d){const _0xfd92f5=_0x2832c8,_0x314686=new Rectangle(0x0,0x0,_0x37299d[_0xfd92f5(0x797)],_0x37299d[_0xfd92f5(0x28d)]);this[_0xfd92f5(0x72c)]=new Window_Base(_0x314686),this['_commandNameWindow'][_0xfd92f5(0x3ce)]=0x0,this['addChild'](this['_commandNameWindow']),this[_0xfd92f5(0x605)]();},Window_ActorCommand[_0x2832c8(0x749)]['callUpdateHelp']=function(){const _0x402ddc=_0x2832c8;Window_Command[_0x402ddc(0x749)][_0x402ddc(0x67b)]['call'](this);if(this[_0x402ddc(0x72c)])this[_0x402ddc(0x605)]();},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x605)]=function(){const _0x2741ab=_0x2832c8,_0x2b62e8=this[_0x2741ab(0x72c)];_0x2b62e8[_0x2741ab(0x6cd)][_0x2741ab(0x890)]();const _0x3539dd=this['commandStyleCheck'](this[_0x2741ab(0x4f2)]());if(_0x3539dd===_0x2741ab(0x798)&&this[_0x2741ab(0x82f)]()>0x0){const _0x401b68=this[_0x2741ab(0x4dc)](this[_0x2741ab(0x4f2)]());let _0x135799=this[_0x2741ab(0x443)](this[_0x2741ab(0x4f2)]());_0x135799=_0x135799[_0x2741ab(0x676)](/\\I\[(\d+)\]/gi,''),_0x2b62e8['resetFontSettings'](),this[_0x2741ab(0x424)](_0x135799,_0x401b68),this[_0x2741ab(0x85f)](_0x135799,_0x401b68),this['commandNameWindowCenter'](_0x135799,_0x401b68);}},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x424)]=function(_0x71ad02,_0x1ab88e){},Window_ActorCommand['prototype'][_0x2832c8(0x85f)]=function(_0x27c52b,_0x43f4f2){const _0x5687d2=_0x2832c8,_0x4ededc=this[_0x5687d2(0x72c)];_0x4ededc[_0x5687d2(0x881)](_0x27c52b,0x0,_0x43f4f2['y'],_0x4ededc[_0x5687d2(0x40b)],'center');},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x303)]=function(_0x183cd8,_0x42e719){const _0x5d5b26=_0x2832c8,_0x1d1b78=this[_0x5d5b26(0x72c)],_0x19dfef=$gameSystem[_0x5d5b26(0x45e)](),_0x509078=_0x42e719['x']+Math['floor'](_0x42e719[_0x5d5b26(0x797)]/0x2)+_0x19dfef;_0x1d1b78['x']=_0x1d1b78['width']/-0x2+_0x509078,_0x1d1b78['y']=Math['floor'](_0x42e719['height']/0x2);},Window_ActorCommand[_0x2832c8(0x749)]['makeCommandList']=function(){const _0x53a386=_0x2832c8;if(!this[_0x53a386(0x8c1)])return;const _0x17994e=this[_0x53a386(0x8c1)][_0x53a386(0x444)]();for(const _0x2c2930 of _0x17994e){this['makeBattleCommand'](_0x2c2930[_0x53a386(0x716)]()[_0x53a386(0x757)]());}},Window_ActorCommand[_0x2832c8(0x749)]['makeBattleCommand']=function(_0x2ed2c7){const _0x6ffac8=_0x2832c8;_0x2ed2c7===_0x6ffac8(0x47c)&&this[_0x6ffac8(0x34d)]();[_0x6ffac8(0x20a),_0x6ffac8(0x4cc)]['includes'](_0x2ed2c7)&&this[_0x6ffac8(0x52d)]();_0x2ed2c7===_0x6ffac8(0x88c)&&this['addGuardCommand']();_0x2ed2c7===_0x6ffac8(0x54c)&&this[_0x6ffac8(0x54a)]();_0x2ed2c7===_0x6ffac8(0x7bd)&&this['addEscapeCommand']();_0x2ed2c7===_0x6ffac8(0x814)&&this[_0x6ffac8(0x508)]();if(_0x2ed2c7['match'](/STYPE: (\d+)/i)){const _0x278e4c=Number(RegExp['$1']);this[_0x6ffac8(0x4a2)](_0x278e4c);}else{if(_0x2ed2c7['match'](/STYPE: (.*)/i)){const _0x119676=DataManager[_0x6ffac8(0x27f)](RegExp['$1']);this[_0x6ffac8(0x4a2)](_0x119676);}}_0x2ed2c7==='ALL\x20SKILLS'&&this[_0x6ffac8(0x401)]();if(_0x2ed2c7[_0x6ffac8(0x6f0)](/SKILL: (\d+)/i)){const _0x33777c=Number(RegExp['$1']);this[_0x6ffac8(0x1f0)]($dataSkills[_0x33777c]);}else{if(_0x2ed2c7[_0x6ffac8(0x6f0)](/SKILL: (.*)/i)){const _0x3e30e3=DataManager[_0x6ffac8(0x7d8)](RegExp['$1']);this[_0x6ffac8(0x1f0)]($dataSkills[_0x3e30e3]);}}_0x2ed2c7===_0x6ffac8(0x6fe)&&Imported[_0x6ffac8(0x1d2)]&&this[_0x6ffac8(0x724)](),[_0x6ffac8(0x45c),_0x6ffac8(0x380)][_0x6ffac8(0x569)](_0x2ed2c7)&&Imported[_0x6ffac8(0x573)]&&this[_0x6ffac8(0x21c)]();},Window_ActorCommand['prototype'][_0x2832c8(0x34d)]=function(){const _0x5d7254=_0x2832c8,_0x117eb8=$dataSkills[this[_0x5d7254(0x8c1)]['attackSkillId']()];if(!_0x117eb8)return;if(!this[_0x5d7254(0x790)](_0x117eb8))return;const _0x44d66e=this[_0x5d7254(0x832)](),_0xa88148=DataManager[_0x5d7254(0x250)](_0x117eb8),_0x3c3e0a=DataManager[_0x5d7254(0x243)](_0x117eb8),_0x3e79ef=_0x44d66e===_0x5d7254(0x432)?_0xa88148:'\x5cI[%1]%2'[_0x5d7254(0x668)](_0x3c3e0a,_0xa88148);this[_0x5d7254(0x7c5)](_0x3e79ef,_0x5d7254(0x42e),this[_0x5d7254(0x8c1)][_0x5d7254(0x73a)]());},Window_ActorCommand['prototype'][_0x2832c8(0x5f0)]=function(){const _0x51a523=_0x2832c8,_0x3c7067=$dataSkills[this['_actor'][_0x51a523(0x7d4)]()];if(!_0x3c7067)return;if(!this[_0x51a523(0x790)](_0x3c7067))return;const _0x1da52c=this[_0x51a523(0x832)](),_0x7eda03=DataManager[_0x51a523(0x250)](_0x3c7067),_0x2fec86=DataManager[_0x51a523(0x243)](_0x3c7067),_0x4340c9=_0x1da52c===_0x51a523(0x432)?_0x7eda03:_0x51a523(0x84f)[_0x51a523(0x668)](_0x2fec86,_0x7eda03);this['addCommand'](_0x4340c9,'guard',this[_0x51a523(0x8c1)][_0x51a523(0x1ed)]());},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x54a)]=function(){const _0x1d29ce=_0x2832c8,_0xff0681=this[_0x1d29ce(0x832)](),_0x46e054=VisuMZ[_0x1d29ce(0x282)][_0x1d29ce(0x6e8)][_0x1d29ce(0x1f9)]['CmdIconItem'],_0x586790=_0xff0681==='text'?TextManager[_0x1d29ce(0x703)]:_0x1d29ce(0x84f)[_0x1d29ce(0x668)](_0x46e054,TextManager[_0x1d29ce(0x703)]),_0x1059b0=this[_0x1d29ce(0x71e)]();this[_0x1d29ce(0x7c5)](_0x586790,_0x1d29ce(0x703),_0x1059b0);},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x71e)]=function(){const _0x12b00d=_0x2832c8;return this[_0x12b00d(0x8c1)]&&this[_0x12b00d(0x8c1)][_0x12b00d(0x1a7)]();},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x52d)]=function(){const _0x28daa9=_0x2832c8,_0x156d92=this['_actor'][_0x28daa9(0x6a7)]();for(const _0xf341bd of _0x156d92){this[_0x28daa9(0x4a2)](_0xf341bd);}},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x4a2)]=function(_0x468b6a){const _0x376d96=_0x2832c8;let _0x3ae856=$dataSystem['skillTypes'][_0x468b6a];if(!_0x3ae856)return;let _0x24c6b1=_0x3ae856;const _0x1742c3=this[_0x376d96(0x832)]();if(_0x1742c3==='text')_0x24c6b1=_0x24c6b1[_0x376d96(0x676)](/\x1I\[(\d+)\]/gi,''),_0x24c6b1=_0x24c6b1[_0x376d96(0x676)](/\\I\[(\d+)\]/gi,'');else{if(!_0x3ae856[_0x376d96(0x6f0)](/\\I\[(\d+)\]/i)){const _0x4f75b3=Imported[_0x376d96(0x2ff)]?VisuMZ['SkillsStatesCore'][_0x376d96(0x6e8)]['Skills']:VisuMZ[_0x376d96(0x282)]['Settings'][_0x376d96(0x1f9)],_0x12b9fe=$dataSystem[_0x376d96(0x5eb)][_0x376d96(0x569)](_0x468b6a),_0x5ef131=_0x12b9fe?_0x4f75b3[_0x376d96(0x328)]:_0x4f75b3[_0x376d96(0x238)];_0x24c6b1=_0x376d96(0x84f)[_0x376d96(0x668)](_0x5ef131,_0x3ae856);}}this[_0x376d96(0x7c5)](_0x24c6b1,_0x376d96(0x710),!![],_0x468b6a);},Window_ActorCommand['prototype'][_0x2832c8(0x401)]=function(){const _0x47a790=_0x2832c8,_0x2a9504=this['_actor'][_0x47a790(0x6a7)](),_0x9029b6=this['_actor']['skills']();for(const _0x1d67c0 of _0x9029b6){if(!_0x1d67c0)continue;if(Imported['VisuMZ_1_SkillsStatesCore']){if(this['getSimilarSTypes'](_0x1d67c0))continue;if(this['isHiddenSkill'](_0x1d67c0))continue;}else{if(!_0x2a9504[_0x47a790(0x569)](_0x1d67c0[_0x47a790(0x479)]))continue;}this[_0x47a790(0x1f0)](_0x1d67c0);}},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x49f)]=function(_0x1cbbda){const _0x1140c0=_0x2832c8,_0x47a5ca=this[_0x1140c0(0x8c1)][_0x1140c0(0x6a7)](),_0xe48f07=_0x47a5ca[_0x1140c0(0x28c)](_0x2163fd=>DataManager[_0x1140c0(0x216)](_0x1cbbda)[_0x1140c0(0x569)](_0x2163fd));return _0xe48f07['length']<=0x0;},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x505)]=function(_0x548617){const _0x1fdb0d=_0x2832c8;if(!Window_SkillList['prototype'][_0x1fdb0d(0x1e8)][_0x1fdb0d(0x3c8)](this,_0x548617))return!![];if(!Window_SkillList[_0x1fdb0d(0x749)]['checkShowHideSwitchNotetags'][_0x1fdb0d(0x3c8)](this,_0x548617))return!![];if(!Window_SkillList[_0x1fdb0d(0x749)][_0x1fdb0d(0x3f9)]['call'](this,_0x548617))return!![];return![];},Window_ActorCommand['prototype'][_0x2832c8(0x1f0)]=function(_0x593c71){const _0x384fff=_0x2832c8;if(!_0x593c71)return;if(!this['canAddSkillCommand'](_0x593c71))return;const _0x5d9bc6=this[_0x384fff(0x832)](),_0x595c23=DataManager['battleCommandName'](_0x593c71),_0x44b756=DataManager['battleCommandIcon'](_0x593c71),_0x5ef414=_0x5d9bc6===_0x384fff(0x432)?_0x595c23:_0x384fff(0x84f)[_0x384fff(0x668)](_0x44b756,_0x595c23),_0x59e029=this[_0x384fff(0x8c1)][_0x384fff(0x30f)](_0x593c71);this[_0x384fff(0x7c5)](_0x5ef414,_0x384fff(0x815),_0x59e029,_0x593c71['id']);},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x790)]=function(_0x339bba){const _0x4a96c5=_0x2832c8,_0x535ac5=_0x339bba[_0x4a96c5(0x75e)];if(_0x535ac5['match'](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x4a96c5(0x8c1)][_0x4a96c5(0x452)](_0x339bba['id']))return![];}if(_0x535ac5[_0x4a96c5(0x6f0)](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x4a96c5(0x8c1)][_0x4a96c5(0x626)](_0x339bba['id']))return![];}const _0xb98ea6=VisuMZ[_0x4a96c5(0x282)][_0x4a96c5(0x899)](_0x339bba,_0x4a96c5(0x248));if(VisuMZ[_0x4a96c5(0x282)]['JS'][_0xb98ea6]){if(!VisuMZ[_0x4a96c5(0x282)]['JS'][_0xb98ea6][_0x4a96c5(0x3c8)](this,this[_0x4a96c5(0x8c1)],_0x339bba))return![];}return VisuMZ[_0x4a96c5(0x282)][_0x4a96c5(0x762)](_0x339bba);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x762)]=function(_0x1db4b9){const _0x4993ef=_0x2832c8,_0x580a2c=_0x1db4b9[_0x4993ef(0x75e)];if(_0x580a2c[_0x4993ef(0x6f0)](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a3487=JSON[_0x4993ef(0x876)]('['+RegExp['$1'][_0x4993ef(0x6f0)](/\d+/g)+']');for(const _0x50494b of _0x3a3487){if(!$gameSwitches[_0x4993ef(0x888)](_0x50494b))return![];}return!![];}if(_0x580a2c[_0x4993ef(0x6f0)](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ddb34=JSON[_0x4993ef(0x876)]('['+RegExp['$1'][_0x4993ef(0x6f0)](/\d+/g)+']');for(const _0x2ad7da of _0x4ddb34){if(!$gameSwitches[_0x4993ef(0x888)](_0x2ad7da))return![];}return!![];}if(_0x580a2c['match'](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b7369=JSON[_0x4993ef(0x876)]('['+RegExp['$1'][_0x4993ef(0x6f0)](/\d+/g)+']');for(const _0xb9df6b of _0x1b7369){if($gameSwitches[_0x4993ef(0x888)](_0xb9df6b))return!![];}return![];}if(_0x580a2c[_0x4993ef(0x6f0)](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x44aa64=JSON[_0x4993ef(0x876)]('['+RegExp['$1'][_0x4993ef(0x6f0)](/\d+/g)+']');for(const _0x1c690a of _0x44aa64){if(!$gameSwitches[_0x4993ef(0x888)](_0x1c690a))return!![];}return![];}if(_0x580a2c['match'](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c21f2=JSON[_0x4993ef(0x876)]('['+RegExp['$1'][_0x4993ef(0x6f0)](/\d+/g)+']');for(const _0xf222eb of _0x2c21f2){if(!$gameSwitches[_0x4993ef(0x888)](_0xf222eb))return!![];}return![];}if(_0x580a2c['match'](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2796d2=JSON[_0x4993ef(0x876)]('['+RegExp['$1'][_0x4993ef(0x6f0)](/\d+/g)+']');for(const _0x1a988b of _0x2796d2){if($gameSwitches[_0x4993ef(0x888)](_0x1a988b))return![];}return!![];}return!![];},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x674)]=function(){const _0x59dc5b=_0x2832c8,_0xa17110=this[_0x59dc5b(0x832)](),_0x1c39a4=VisuMZ['BattleCore'][_0x59dc5b(0x6e8)]['PartyCmd']['CmdIconEscape'],_0x2695c6=_0xa17110==='text'?TextManager[_0x59dc5b(0x2fc)]:'\x5cI[%1]%2'['format'](_0x1c39a4,TextManager[_0x59dc5b(0x2fc)]),_0x2399e6=this[_0x59dc5b(0x214)]();this['addCommand'](_0x2695c6,'escape',_0x2399e6);},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x214)]=function(){const _0x16d709=_0x2832c8;return BattleManager[_0x16d709(0x39f)]();},Window_ActorCommand[_0x2832c8(0x749)]['addAutoBattleCommand']=function(){const _0x2b085f=_0x2832c8,_0x2b4917=this[_0x2b085f(0x832)](),_0x59db59=VisuMZ['BattleCore'][_0x2b085f(0x6e8)][_0x2b085f(0x45d)][_0x2b085f(0x675)],_0x3e81ae=_0x2b4917==='text'?TextManager[_0x2b085f(0x343)]:_0x2b085f(0x84f)[_0x2b085f(0x668)](_0x59db59,TextManager[_0x2b085f(0x343)]),_0x2f4792=this[_0x2b085f(0x262)]();this['addCommand'](_0x3e81ae,'autoBattle',_0x2f4792);},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x262)]=function(){return!![];},Window_ActorCommand['prototype'][_0x2832c8(0x838)]=function(){const _0x45a182=_0x2832c8;return VisuMZ[_0x45a182(0x282)]['Settings']['ActorCmd'][_0x45a182(0x30c)];},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x55d)]=function(_0x30cb13){const _0x41f998=_0x2832c8,_0x30fdb6=this[_0x41f998(0x201)](_0x30cb13);if(_0x30fdb6===_0x41f998(0x4eb))this[_0x41f998(0x672)](_0x30cb13);else _0x30fdb6===_0x41f998(0x798)?this['drawItemStyleIcon'](_0x30cb13):Window_Command[_0x41f998(0x749)][_0x41f998(0x55d)][_0x41f998(0x3c8)](this,_0x30cb13);this['drawSingleSkillCost'](_0x30cb13);},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x832)]=function(){const _0x193dc1=_0x2832c8;return VisuMZ[_0x193dc1(0x282)]['Settings'][_0x193dc1(0x1f9)][_0x193dc1(0x8d8)];},Window_ActorCommand['prototype'][_0x2832c8(0x201)]=function(_0x10f7fe){const _0x2c7b7d=_0x2832c8;if(_0x10f7fe<0x0)return _0x2c7b7d(0x432);const _0x48fd53=this[_0x2c7b7d(0x832)]();if(_0x48fd53!=='auto')return _0x48fd53;else{if(this['maxItems']()>0x0){const _0x40186b=this[_0x2c7b7d(0x443)](_0x10f7fe);if(_0x40186b[_0x2c7b7d(0x6f0)](/\\I\[(\d+)\]/i)){const _0x9f287=this[_0x2c7b7d(0x4dc)](_0x10f7fe),_0x5916ab=this[_0x2c7b7d(0x486)](_0x40186b)[_0x2c7b7d(0x797)];return _0x5916ab<=_0x9f287[_0x2c7b7d(0x797)]?_0x2c7b7d(0x4eb):_0x2c7b7d(0x798);}}}return _0x2c7b7d(0x432);},Window_ActorCommand['prototype']['drawItemStyleIconText']=function(_0x49fe7c){const _0x5a3101=_0x2832c8,_0xe5e8b1=this[_0x5a3101(0x4dc)](_0x49fe7c),_0x5086d5=this[_0x5a3101(0x443)](_0x49fe7c),_0x5dc1d6=this[_0x5a3101(0x486)](_0x5086d5)['width'];this['changePaintOpacity'](this['isCommandEnabled'](_0x49fe7c));const _0x356f58=this[_0x5a3101(0x838)]();if(_0x356f58===_0x5a3101(0x821))this[_0x5a3101(0x1f6)](_0x5086d5,_0xe5e8b1['x']+_0xe5e8b1[_0x5a3101(0x797)]-_0x5dc1d6,_0xe5e8b1['y'],_0x5dc1d6);else{if(_0x356f58===_0x5a3101(0x3de)){const _0x792cd6=_0xe5e8b1['x']+Math[_0x5a3101(0x1fd)]((_0xe5e8b1['width']-_0x5dc1d6)/0x2);this[_0x5a3101(0x1f6)](_0x5086d5,_0x792cd6,_0xe5e8b1['y'],_0x5dc1d6);}else this['drawTextEx'](_0x5086d5,_0xe5e8b1['x'],_0xe5e8b1['y'],_0x5dc1d6);}},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x326)]=function(_0xb8f7ff){const _0x5ce6e3=_0x2832c8;this[_0x5ce6e3(0x443)](_0xb8f7ff)['match'](/\\I\[(\d+)\]/i);const _0x4b6d7c=Number(RegExp['$1'])||0x0,_0x33a3bd=this[_0x5ce6e3(0x4dc)](_0xb8f7ff),_0x43d17f=_0x33a3bd['x']+Math[_0x5ce6e3(0x1fd)]((_0x33a3bd[_0x5ce6e3(0x797)]-ImageManager['iconWidth'])/0x2),_0x38799d=_0x33a3bd['y']+(_0x33a3bd[_0x5ce6e3(0x28d)]-ImageManager[_0x5ce6e3(0x213)])/0x2;this[_0x5ce6e3(0x55b)](_0x4b6d7c,_0x43d17f,_0x38799d);},Window_ActorCommand['prototype'][_0x2832c8(0x8d2)]=function(_0x34ff61){const _0x2e2d09=_0x2832c8,_0x258906=this[_0x2e2d09(0x257)](_0x34ff61);if(!['attack','guard','singleSkill'][_0x2e2d09(0x569)](_0x258906))return;const _0x1f3570=this['itemLineRect'](_0x34ff61);let _0x5a8d84=null;if(_0x258906===_0x2e2d09(0x42e))_0x5a8d84=$dataSkills[this[_0x2e2d09(0x8c1)][_0x2e2d09(0x879)]()];else _0x258906==='guard'?_0x5a8d84=$dataSkills[this[_0x2e2d09(0x8c1)][_0x2e2d09(0x7d4)]()]:_0x5a8d84=$dataSkills[this[_0x2e2d09(0x649)][_0x34ff61][_0x2e2d09(0x580)]];this[_0x2e2d09(0x4ae)](this[_0x2e2d09(0x8c1)],_0x5a8d84,_0x1f3570['x'],_0x1f3570['y'],_0x1f3570[_0x2e2d09(0x797)]);},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x4ae)]=function(_0x20415f,_0x538d34,_0x1b7c50,_0x16f2f0,_0x4a483d){const _0x40ed30=_0x2832c8;if(!_0x538d34)return;Imported[_0x40ed30(0x2ff)]?Window_Command['prototype'][_0x40ed30(0x4ae)][_0x40ed30(0x3c8)](this,_0x20415f,_0x538d34,_0x1b7c50,_0x16f2f0,_0x4a483d):Window_SkillList[_0x40ed30(0x749)][_0x40ed30(0x4ae)][_0x40ed30(0x3c8)](this,_0x538d34,_0x1b7c50,_0x16f2f0,_0x4a483d);},Window_ActorCommand[_0x2832c8(0x749)]['hide']=function(){},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x76d)]=function(){const _0x34804f=_0x2832c8;Window_Command[_0x34804f(0x749)][_0x34804f(0x76d)]['call'](this);const _0x30932b=this[_0x34804f(0x8d4)]();_0x30932b==='border'&&this['showHelpWindow']();},Window_ActorCommand['prototype'][_0x2832c8(0x8d4)]=function(){const _0x406ad5=_0x2832c8;if(this[_0x406ad5(0x280)])return this[_0x406ad5(0x280)];return this[_0x406ad5(0x280)]=SceneManager[_0x406ad5(0x37d)][_0x406ad5(0x8d4)](),this[_0x406ad5(0x280)];},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x59e)]=Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x805)],Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x805)]=function(_0x393b82){const _0x2b8da9=_0x2832c8,_0x467af3=this[_0x2b8da9(0x8d4)]();if(_0x393b82&&['xp',_0x2b8da9(0x4f3)][_0x2b8da9(0x569)](_0x467af3))this[_0x2b8da9(0x31e)](_0x393b82);else _0x393b82&&[_0x2b8da9(0x722)]['includes'](_0x467af3)&&(this[_0x2b8da9(0x1ea)](_0x393b82),this[_0x2b8da9(0x575)]());VisuMZ['BattleCore'][_0x2b8da9(0x59e)][_0x2b8da9(0x3c8)](this,_0x393b82),_0x393b82&&$gameTroop[_0x2b8da9(0x692)]()[_0x2b8da9(0x720)]>0x0&&_0x393b82['battler']()&&_0x393b82['battler']()[_0x2b8da9(0x231)]();},Window_ActorCommand[_0x2832c8(0x749)]['resizeWindowXPStyle']=function(_0x58fbff){const _0x4b3ae6=_0x2832c8,_0x48f7c5=Math[_0x4b3ae6(0x46d)](Graphics[_0x4b3ae6(0x19b)]/0x3),_0x3ef989=Math[_0x4b3ae6(0x46d)](Graphics['boxWidth']/$gameParty['battleMembers']()['length']),_0x1d8dc5=Math[_0x4b3ae6(0x609)](_0x48f7c5,_0x3ef989),_0x4d2f1b=this[_0x4b3ae6(0x33c)](VisuMZ[_0x4b3ae6(0x282)]['Settings'][_0x4b3ae6(0x45a)][_0x4b3ae6(0x5fa)]),_0x3f8c10=_0x3ef989*_0x58fbff[_0x4b3ae6(0x4f2)]()+(_0x3ef989-_0x1d8dc5)/0x2,_0x465f14=SceneManager[_0x4b3ae6(0x37d)][_0x4b3ae6(0x244)]['y']-_0x4d2f1b;this[_0x4b3ae6(0x362)](_0x3f8c10,_0x465f14,_0x1d8dc5,_0x4d2f1b),this[_0x4b3ae6(0x1dc)](),this[_0x4b3ae6(0x694)](0x1);},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x1ea)]=function(_0xa9af63){const _0xf672cf=_0x2832c8,_0x53750a=SceneManager[_0xf672cf(0x37d)][_0xf672cf(0x892)]();this[_0xf672cf(0x362)](_0x53750a['x'],_0x53750a['y'],_0x53750a[_0xf672cf(0x797)],_0x53750a[_0xf672cf(0x28d)]),this[_0xf672cf(0x1dc)](),this[_0xf672cf(0x694)](0x0);},Window_ActorCommand['prototype'][_0x2832c8(0x1e1)]=function(){const _0x27b8fe=_0x2832c8;if(this[_0x27b8fe(0x453)]){const _0x1ad4d4=this[_0x27b8fe(0x453)][_0x27b8fe(0x6c6)],_0xfaaa13=this['width']-0x8,_0x267b3e=this['height'],_0x51129a=this['padding'],_0x44f1d8=ColorManager[_0x27b8fe(0x53e)](),_0x59962d=ColorManager[_0x27b8fe(0x783)]();this[_0x27b8fe(0x453)]['x']=0x4,_0x1ad4d4[_0x27b8fe(0x625)](_0xfaaa13,_0x267b3e),_0x1ad4d4[_0x27b8fe(0x66f)](0x0,0x0,_0xfaaa13,_0x51129a,_0x59962d,_0x44f1d8,!![]),_0x1ad4d4[_0x27b8fe(0x31d)](0x0,_0x51129a,_0xfaaa13,_0x267b3e-_0x51129a*0x2,_0x44f1d8),_0x1ad4d4['gradientFillRect'](0x0,_0x267b3e-_0x51129a,_0xfaaa13,_0x51129a,_0x44f1d8,_0x59962d,!![]),this[_0x27b8fe(0x453)][_0x27b8fe(0x499)](0x0,0x0,_0xfaaa13,_0x267b3e);}},Window_ActorCommand[_0x2832c8(0x749)][_0x2832c8(0x390)]=function(){const _0x12b570=_0x2832c8;if(!this['_actor'])return;const _0x10232a=VisuMZ[_0x12b570(0x282)][_0x12b570(0x6e8)][_0x12b570(0x1f9)],_0x403a54=this[_0x12b570(0x47d)]();switch(_0x403a54){case _0x12b570(0x42e):this[_0x12b570(0x1e2)]($dataSkills[this[_0x12b570(0x8c1)]['attackSkillId']()]);break;case _0x12b570(0x232):this[_0x12b570(0x1e2)]($dataSkills[this[_0x12b570(0x8c1)][_0x12b570(0x7d4)]()]);break;case _0x12b570(0x710):const _0x6fa53b=_0x10232a['HelpSkillType'],_0x5e644c=_0x6fa53b[_0x12b570(0x668)]($dataSystem['skillTypes'][this['currentExt']()]);this[_0x12b570(0x601)][_0x12b570(0x7a3)](_0x5e644c);break;case'singleSkill':this[_0x12b570(0x1e2)]($dataSkills[this[_0x12b570(0x6a5)]()]);break;case _0x12b570(0x703):this[_0x12b570(0x601)][_0x12b570(0x7a3)](_0x10232a[_0x12b570(0x419)]);break;case'escape':this[_0x12b570(0x601)]['setText'](_0x10232a['HelpEscape']);break;case _0x12b570(0x343):this['_helpWindow'][_0x12b570(0x7a3)](_0x10232a['HelpAutoBattle']);break;default:this['_helpWindow'][_0x12b570(0x7a3)]('');break;}},VisuMZ['BattleCore'][_0x2832c8(0x78c)]=Window_BattleStatus[_0x2832c8(0x749)]['initialize'],Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x44f)]=function(_0x523e02){const _0x46adb8=_0x2832c8;VisuMZ['BattleCore'][_0x46adb8(0x78c)][_0x46adb8(0x3c8)](this,_0x523e02),this[_0x46adb8(0x3db)]();},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x3db)]=function(){const _0x25f34c=_0x2832c8;this[_0x25f34c(0x643)]=this['isFrameVisible']();},Window_BattleStatus[_0x2832c8(0x749)]['battleLayoutStyle']=function(){const _0x15f48a=_0x2832c8;if(this[_0x15f48a(0x280)])return this[_0x15f48a(0x280)];return this[_0x15f48a(0x280)]=SceneManager[_0x15f48a(0x37d)][_0x15f48a(0x8d4)](),this[_0x15f48a(0x280)];},Window_BattleStatus[_0x2832c8(0x749)]['isFrameVisible']=function(){const _0x2fb42b=_0x2832c8,_0x24d1aa=this[_0x2fb42b(0x8d4)]();switch(_0x24d1aa){case'list':case'border':return!![];break;case _0x2fb42b(0x7fa):case'xp':case _0x2fb42b(0x4f3):default:return![];break;}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x1f1)]=function(){return this['isFrameVisible']()?0x0:0xa;},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x42c)]=function(){const _0x223e9b=_0x2832c8,_0x380ea1=this[_0x223e9b(0x8d4)]();switch(_0x380ea1){case _0x223e9b(0x62c):return 0x1;break;case'xp':case _0x223e9b(0x4f3):return $gameParty[_0x223e9b(0x86b)]()[_0x223e9b(0x720)];break;case'default':default:return $gameParty[_0x223e9b(0x610)]();break;}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x1bf)]=function(){const _0x94efec=_0x2832c8,_0x371d9d=this['battleLayoutStyle']();switch(_0x371d9d){case _0x94efec(0x62c):return Window_StatusBase[_0x94efec(0x749)][_0x94efec(0x1bf)][_0x94efec(0x3c8)](this);break;case _0x94efec(0x7fa):case'xp':case _0x94efec(0x4f3):default:return this['innerHeight'];break;}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x542)]=function(){const _0x53714f=_0x2832c8,_0x13785a=this[_0x53714f(0x8d4)]();switch(_0x13785a){case _0x53714f(0x62c):return Window_StatusBase[_0x53714f(0x749)][_0x53714f(0x542)][_0x53714f(0x3c8)](this);break;case _0x53714f(0x7fa):case'xp':case'portrait':default:return 0x0;break;}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x425)]=function(){const _0x4fbc6d=_0x2832c8;this[_0x4fbc6d(0x7d7)]()?Window_StatusBase[_0x4fbc6d(0x749)][_0x4fbc6d(0x425)]['call'](this):this[_0x4fbc6d(0x86e)]=0x8;},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x1ee)]=function(){const _0x37be0a=_0x2832c8;this[_0x37be0a(0x8bb)]=!![];},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x21b)]=function(){const _0x4bc806=_0x2832c8;Window_StatusBase[_0x4bc806(0x749)]['update']['call'](this),this[_0x4bc806(0x3ee)](),this[_0x4bc806(0x224)]();if(this['battleLayoutStyle']()===_0x4bc806(0x722))this['updateBorderStyle']();},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x3ee)]=function(){const _0x39d4fd=_0x2832c8;if($gameTemp[_0x39d4fd(0x430)]())this[_0x39d4fd(0x4f0)](),this[_0x39d4fd(0x8bb)]=![];else this[_0x39d4fd(0x8bb)]&&(this[_0x39d4fd(0x8bb)]=![],this[_0x39d4fd(0x7d0)]());},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x7f4)]=function(){const _0x23a20c=_0x2832c8;Window_StatusBase['prototype']['show'][_0x23a20c(0x3c8)](this);if(!$gameSystem[_0x23a20c(0x593)]())this[_0x23a20c(0x7d0)]();},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x64b)]=function(){const _0x1441b0=_0x2832c8;if(this['constructor']===Window_BattleStatus)return;Window_StatusBase['prototype']['hide'][_0x1441b0(0x3c8)](this);},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x1d3)]=function(_0x2c1254){const _0x2a7456=_0x2832c8,_0x41c1b8=this[_0x2a7456(0x8d4)]();switch(_0x41c1b8){case'xp':case _0x2a7456(0x4f3):break;case _0x2a7456(0x7fa):case _0x2a7456(0x62c):case _0x2a7456(0x722):default:return Window_StatusBase['prototype'][_0x2a7456(0x1d3)][_0x2a7456(0x3c8)](this,_0x2c1254);break;}},VisuMZ['BattleCore'][_0x2832c8(0x283)]=Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x342)],Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x342)]=function(_0x567da0){const _0x41054f=_0x2832c8,_0x541f67=this['battleLayoutStyle']();switch(_0x541f67){case'list':this[_0x41054f(0x3a4)](_0x567da0);break;case'xp':this[_0x41054f(0x8b9)](_0x567da0);break;case'portrait':this['drawItemImagePortraitStyle'](_0x567da0);break;case _0x41054f(0x7fa):case _0x41054f(0x722):default:VisuMZ['BattleCore'][_0x41054f(0x283)]['call'](this,_0x567da0);break;}},Window_BattleStatus['prototype'][_0x2832c8(0x8dc)]=function(_0x47778c){const _0x35736b=_0x2832c8,_0x147559=this[_0x35736b(0x8d4)]();if(!$gameSystem[_0x35736b(0x593)]())this['centerFrontViewSprite'](_0x47778c);switch(_0x147559){case _0x35736b(0x62c):this['drawItemStatusListStyle'](_0x47778c);break;case'xp':case'portrait':case'default':case _0x35736b(0x722):default:this['drawItemStatusXPStyle'](_0x47778c);break;}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x506)]=function(){const _0x503cf0=_0x2832c8,_0x23e7fb=this[_0x503cf0(0x8d4)]();if(['xp'][_0x503cf0(0x569)](_0x23e7fb)&&!$gameSystem[_0x503cf0(0x593)]()){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x503cf0(0x749)][_0x503cf0(0x506)]['call'](this);},Window_BattleStatus['prototype'][_0x2832c8(0x281)]=function(_0x27578f){const _0x587779=_0x2832c8,_0x49b637=this[_0x587779(0x42b)](_0x27578f)[_0x587779(0x5b5)]();if(!_0x49b637)return;const _0x41f8e2=this['battleLayoutStyle'](),_0x5ad655=this[_0x587779(0x3f1)](_0x27578f);let _0x5f1e5e=Math[_0x587779(0x46d)](_0x5ad655['x']+_0x5ad655[_0x587779(0x797)]/0x2);['list'][_0x587779(0x569)](_0x41f8e2)&&(_0x5f1e5e=_0x5ad655[_0x587779(0x797)]/$gameParty[_0x587779(0x86b)]()[_0x587779(0x720)],_0x5f1e5e*=_0x27578f,_0x5f1e5e+=_0x5ad655[_0x587779(0x797)]/$gameParty['battleMembers']()[_0x587779(0x720)]/0x2);let _0x2006a7=Math[_0x587779(0x46d)](this['frontviewSpriteY'](_0x27578f,_0x49b637,_0x5ad655));_0x49b637['setHome'](_0x5f1e5e,_0x2006a7),this['addChildAt'](_0x49b637,0x1),_0x49b637['show']();},Window_BattleStatus['prototype']['frontviewSpriteY']=function(_0x1a2592,_0x49746e,_0x17c886){const _0x24c9b1=_0x2832c8,_0x55ab43=VisuMZ[_0x24c9b1(0x282)]['Settings'][_0x24c9b1(0x45a)],_0x59b466=this[_0x24c9b1(0x8d4)]();if(_0x59b466==='xp'){const _0x28a374=_0x55ab43[_0x24c9b1(0x2a4)];switch(_0x28a374[_0x24c9b1(0x188)]()[_0x24c9b1(0x757)]()){case'bottom':return _0x17c886[_0x24c9b1(0x28d)]-_0x49746e['_shadowSprite'][_0x24c9b1(0x28d)]/0x4;break;case _0x24c9b1(0x3de):const _0x2c4ade=_0x55ab43[_0x24c9b1(0x58c)];return(_0x17c886[_0x24c9b1(0x28d)]+(_0x49746e[_0x24c9b1(0x28d)]||_0x2c4ade))/0x2;break;case'top':return 0x0;case _0x24c9b1(0x6f3):default:return this[_0x24c9b1(0x560)](_0x17c886);break;}}else{if(_0x59b466===_0x24c9b1(0x4f3)){}}return _0x49746e[_0x24c9b1(0x28d)];},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x3a4)]=function(_0x4fa734){const _0x1f252a=_0x2832c8;if(!VisuMZ[_0x1f252a(0x282)]['Settings']['BattleLayout'][_0x1f252a(0x355)])return;const _0x32a9bc=this[_0x1f252a(0x42b)](_0x4fa734),_0x3988a8=this[_0x1f252a(0x3f1)](_0x4fa734);_0x3988a8[_0x1f252a(0x797)]=ImageManager[_0x1f252a(0x2c9)],_0x3988a8[_0x1f252a(0x28d)]-=0x2,this[_0x1f252a(0x233)](_0x32a9bc,_0x3988a8['x']+0x1,_0x3988a8['y']+0x1,_0x3988a8['width'],_0x3988a8[_0x1f252a(0x28d)]);},Window_BattleStatus['prototype'][_0x2832c8(0x3e0)]=function(_0x5fc2ce){const _0x2fd15f=_0x2832c8,_0x32036c=$dataSystem[_0x2fd15f(0x68f)]?0x4:0x3,_0x11481a=_0x32036c*0x80+(_0x32036c-0x1)*0x8+0x4,_0x43b51c=this[_0x2fd15f(0x42b)](_0x5fc2ce),_0x590bec=this[_0x2fd15f(0x3f1)](_0x5fc2ce);let _0x2770d3=_0x590bec['x']+this[_0x2fd15f(0x86e)];VisuMZ[_0x2fd15f(0x282)][_0x2fd15f(0x6e8)]['BattleLayout']['ShowFacesListStyle']?_0x2770d3=_0x590bec['x']+ImageManager['faceWidth']+0x8:_0x2770d3+=ImageManager[_0x2fd15f(0x76b)];const _0x51ab5b=Math[_0x2fd15f(0x46d)](Math[_0x2fd15f(0x609)](_0x590bec['x']+_0x590bec[_0x2fd15f(0x797)]-_0x11481a,_0x2770d3)),_0x3e52bf=Math[_0x2fd15f(0x46d)](_0x590bec['y']+(_0x590bec[_0x2fd15f(0x28d)]-Sprite_Name[_0x2fd15f(0x749)][_0x2fd15f(0x26a)]())/0x2),_0x28dc59=Math[_0x2fd15f(0x46d)](_0x51ab5b-ImageManager['iconWidth']/0x2-0x4),_0x34b015=Math[_0x2fd15f(0x46d)](_0x590bec['y']+(_0x590bec[_0x2fd15f(0x28d)]-ImageManager[_0x2fd15f(0x213)])/0x2+ImageManager['iconHeight']/0x2);let _0xc877a3=_0x51ab5b+0x88;const _0x37436f=_0x3e52bf;this[_0x2fd15f(0x77d)](_0x43b51c,_0x51ab5b-0x4,_0x3e52bf),this[_0x2fd15f(0x1de)](_0x43b51c,_0x51ab5b,_0x3e52bf),this[_0x2fd15f(0x1a0)](_0x43b51c,_0x28dc59,_0x34b015),this[_0x2fd15f(0x305)](_0x43b51c,'hp',_0xc877a3+0x88*0x0,_0x37436f),this[_0x2fd15f(0x305)](_0x43b51c,'mp',_0xc877a3+0x88*0x1,_0x37436f),$dataSystem[_0x2fd15f(0x68f)]&&this[_0x2fd15f(0x305)](_0x43b51c,'tp',_0xc877a3+0x88*0x2,_0x37436f);},Window_BattleStatus[_0x2832c8(0x749)]['drawItemImageXPStyle']=function(_0x5e3fb8){const _0x1017d3=_0x2832c8;if(!$gameSystem['isSideView']())return;VisuMZ[_0x1017d3(0x282)]['Window_BattleStatus_drawItemImage'][_0x1017d3(0x3c8)](this,_0x5e3fb8);},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x86d)]=function(_0x5a6f8f){const _0x2b82ca=_0x2832c8,_0x1dbfdb=this[_0x2b82ca(0x42b)](_0x5a6f8f),_0x619aa8=this[_0x2b82ca(0x3f1)](_0x5a6f8f),_0x2db84f=Math[_0x2b82ca(0x46d)](_0x619aa8['x']+(_0x619aa8[_0x2b82ca(0x797)]-0x80)/0x2),_0x4057ea=this[_0x2b82ca(0x560)](_0x619aa8);let _0x257454=_0x2db84f-ImageManager['iconWidth']/0x2-0x4,_0x430d39=_0x4057ea+ImageManager[_0x2b82ca(0x213)]/0x2;_0x257454-ImageManager['iconWidth']/0x2<_0x619aa8['x']&&(_0x257454=_0x2db84f+ImageManager[_0x2b82ca(0x76b)]/0x2-0x4,_0x430d39=_0x4057ea-ImageManager[_0x2b82ca(0x213)]/0x2);const _0x1748f1=_0x2db84f,_0x5a677a=this[_0x2b82ca(0x702)](_0x619aa8);this[_0x2b82ca(0x77d)](_0x1dbfdb,_0x2db84f,_0x4057ea),this[_0x2b82ca(0x1de)](_0x1dbfdb,_0x2db84f,_0x4057ea),this['placeStateIcon'](_0x1dbfdb,_0x257454,_0x430d39),this['placeBasicGauges'](_0x1dbfdb,_0x1748f1,_0x5a677a);},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x648)]=function(_0x423b5e){const _0x4e6320=_0x2832c8;if(!VisuMZ[_0x4e6320(0x282)][_0x4e6320(0x6e8)][_0x4e6320(0x45a)][_0x4e6320(0x4ad)])return![];if(_0x423b5e[_0x4e6320(0x683)]())return!![];return Imported[_0x4e6320(0x35f)]&&_0x423b5e[_0x4e6320(0x787)]();},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x874)]=function(){const _0x426529=_0x2832c8;if(this['actor']()[_0x426529(0x75e)][_0x426529(0x6f0)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()[_0x426529(0x75e)][_0x426529(0x6f0)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x2832c8(0x749)][_0x2832c8(0x1d0)]=function(){const _0x38a963=_0x2832c8;if(this[_0x38a963(0x42b)]()[_0x38a963(0x75e)][_0x38a963(0x6f0)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x38a963(0x42b)]()['note']['match'](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Window_BattleStatus['prototype'][_0x2832c8(0x4c8)]=function(_0x484ece){const _0x4d5f31=_0x2832c8,_0x21aa38=this['actor'](_0x484ece);if(this[_0x4d5f31(0x648)](_0x21aa38)){const _0x4edfc=_0x4d5f31(0x5cf)[_0x4d5f31(0x668)](_0x21aa38['actorId']()),_0x2d474a=this[_0x4d5f31(0x265)](_0x4edfc,Sprite),_0x564cf2=_0x21aa38['getBattlePortraitFilename']();_0x564cf2!==''?_0x2d474a[_0x4d5f31(0x6c6)]=ImageManager[_0x4d5f31(0x29b)](_0x564cf2):_0x2d474a['bitmap']=ImageManager[_0x4d5f31(0x661)];const _0x55ee68=this[_0x4d5f31(0x3f1)](_0x484ece);_0x2d474a[_0x4d5f31(0x4a5)]['x']=0.5,_0x2d474a[_0x4d5f31(0x4a5)]['y']=0x1;let _0x1ee298=Math[_0x4d5f31(0x46d)](_0x55ee68['x']+_0x55ee68[_0x4d5f31(0x797)]/0x2)+this[_0x4d5f31(0x86e)];_0x1ee298+=_0x21aa38['getBattlePortraitOffsetX']();let _0x1f8efd=Math[_0x4d5f31(0x46d)](this[_0x4d5f31(0x28d)]);_0x1f8efd+=_0x21aa38['getBattlePortraitOffsetY'](),_0x2d474a[_0x4d5f31(0x362)](_0x1ee298,_0x1f8efd);const _0xab9d15=VisuMZ[_0x4d5f31(0x282)][_0x4d5f31(0x6e8)][_0x4d5f31(0x45a)][_0x4d5f31(0x8ed)];_0x2d474a['scale']['x']=_0xab9d15,_0x2d474a['scale']['y']=_0xab9d15,_0x2d474a[_0x4d5f31(0x7f4)]();}else{const _0xb3f4d8=this['faceRect'](_0x484ece);this[_0x4d5f31(0x233)](_0x21aa38,_0xb3f4d8['x'],_0xb3f4d8['y'],_0xb3f4d8[_0x4d5f31(0x797)],_0xb3f4d8['height']);}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x265)]=function(_0x1b9ec0,_0xabf901){const _0x1cd2ac=_0x2832c8,_0x3af951=this[_0x1cd2ac(0x29d)];if(_0x3af951[_0x1b9ec0])return _0x3af951[_0x1b9ec0];else{const _0x43e39c=new _0xabf901();return _0x3af951[_0x1b9ec0]=_0x43e39c,this[_0x1cd2ac(0x63f)](_0x43e39c),this['addChildToBack'](this[_0x1cd2ac(0x3d8)]),_0x43e39c;}},Window_BattleStatus[_0x2832c8(0x749)]['_createClientArea']=function(){const _0xcc6486=_0x2832c8;this['_createCursorArea'](),this[_0xcc6486(0x460)](),Window_StatusBase['prototype']['_createClientArea'][_0xcc6486(0x3c8)](this),this[_0xcc6486(0x4df)]();},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x607)]=function(){const _0x457f28=_0x2832c8;this[_0x457f28(0x3d8)]=new Sprite(),this[_0x457f28(0x3d8)][_0x457f28(0x58b)]=[new PIXI[(_0x457f28(0x58b))][(_0x457f28(0x47f))]()],this[_0x457f28(0x3d8)][_0x457f28(0x327)]=new Rectangle(),this[_0x457f28(0x3d8)][_0x457f28(0x362)](this[_0x457f28(0x6c0)],this[_0x457f28(0x6c0)]),this[_0x457f28(0x2ce)](this['_cursorArea']);},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x460)]=function(){const _0x254727=_0x2832c8;this[_0x254727(0x6e6)]=new Sprite(),this[_0x254727(0x2ce)](this[_0x254727(0x6e6)]);},Window_BattleStatus['prototype'][_0x2832c8(0x4df)]=function(){const _0x49e1af=_0x2832c8;this[_0x49e1af(0x279)]=new Sprite(),this[_0x49e1af(0x2ce)](this[_0x49e1af(0x279)]);},Window_BattleStatus['prototype'][_0x2832c8(0x768)]=function(){const _0x42e9f2=_0x2832c8;this[_0x42e9f2(0x2d0)]=new Sprite();for(let _0x2b7fc0=0x0;_0x2b7fc0<0x9;_0x2b7fc0++){this[_0x42e9f2(0x2d0)][_0x42e9f2(0x2ce)](new Sprite());}this[_0x42e9f2(0x3d8)]['addChild'](this[_0x42e9f2(0x2d0)]);},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x437)]=function(){const _0x3d4226=_0x2832c8;Window_StatusBase['prototype'][_0x3d4226(0x437)][_0x3d4226(0x3c8)](this),this[_0x3d4226(0x399)]();},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x399)]=function(){const _0x233c6f=_0x2832c8,_0x7c47c2=this['_padding'];this[_0x233c6f(0x3d8)][_0x233c6f(0x362)](_0x7c47c2,_0x7c47c2),this[_0x233c6f(0x3d8)]['x']=_0x7c47c2-this['origin']['x'],this['_cursorArea']['y']=_0x7c47c2-this[_0x233c6f(0x78e)]['y'],this['innerWidth']>0x0&&this['innerHeight']>0x0?this['_cursorArea'][_0x233c6f(0x49d)]=this[_0x233c6f(0x843)]():this[_0x233c6f(0x3d8)][_0x233c6f(0x49d)]=![];},Window_BattleStatus[_0x2832c8(0x749)]['_updateFilterArea']=function(){const _0x3c66c4=_0x2832c8;Window_StatusBase[_0x3c66c4(0x749)][_0x3c66c4(0x3b5)][_0x3c66c4(0x3c8)](this),this[_0x3c66c4(0x3c1)]();},Window_BattleStatus['prototype'][_0x2832c8(0x3c1)]=function(){const _0x41e1bd=_0x2832c8,_0x21a5e0=this['_cursorArea'][_0x41e1bd(0x3cc)][_0x41e1bd(0x312)](new Point(0x0,0x0)),_0xe06965=this[_0x41e1bd(0x3d8)][_0x41e1bd(0x327)];_0xe06965['x']=_0x21a5e0['x']+this[_0x41e1bd(0x78e)]['x'],_0xe06965['y']=_0x21a5e0['y']+this['origin']['y'],_0xe06965[_0x41e1bd(0x797)]=this['innerWidth'],_0xe06965[_0x41e1bd(0x28d)]=this[_0x41e1bd(0x2ea)];},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x545)]=function(_0xe41b1b){const _0x3edc8a=_0x2832c8;if(this['battleLayoutStyle']()!=='portrait')return;this[_0x3edc8a(0x4c8)](_0xe41b1b[_0x3edc8a(0x4f2)]());},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x18a)]=function(_0x3a4178,_0x4e0483){const _0x5a6fae=_0x2832c8;if(!this[_0x5a6fae(0x279)])return;if(!_0x3a4178)return;if(!_0x4e0483)return;const _0xb8e393=this[_0x5a6fae(0x3f1)](_0x4e0483[_0x5a6fae(0x4f2)]());_0xb8e393['x']+=_0xb8e393[_0x5a6fae(0x797)]/0x2+this['padding'],_0x3a4178['x']=_0xb8e393['x'],_0x3a4178['y']=_0xb8e393['y'],this[_0x5a6fae(0x279)][_0x5a6fae(0x2ce)](_0x3a4178);},Window_BattleStatus[_0x2832c8(0x749)]['removeDamageSprite']=function(_0x35cbce){const _0x9b9a38=_0x2832c8;if(!this['_damageContainer'])return;if(!_0x35cbce)return;this[_0x9b9a38(0x279)][_0x9b9a38(0x6c5)](_0x35cbce);},Window_BattleStatus['prototype'][_0x2832c8(0x8be)]=function(){const _0x2598af=_0x2832c8;if(!this[_0x2598af(0x264)]())return;if(!this['_borderPortraitSprite'])this[_0x2598af(0x37b)]();this[_0x2598af(0x3f2)](),this[_0x2598af(0x49b)]();},Window_BattleStatus[_0x2832c8(0x749)]['isBorderStylePortraitShown']=function(){const _0x58f9df=_0x2832c8;if(this[_0x58f9df(0x493)]!==Window_BattleStatus)return![];if(!SceneManager[_0x58f9df(0x230)]())return![];return VisuMZ[_0x58f9df(0x282)][_0x58f9df(0x6e8)][_0x58f9df(0x45a)][_0x58f9df(0x1a1)];},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x37b)]=function(){const _0x56e669=_0x2832c8;this['_borderPortraitSprite']=new Sprite();const _0x21d006=SceneManager[_0x56e669(0x37d)],_0x12ec3d=_0x21d006[_0x56e669(0x65b)][_0x56e669(0x294)](_0x21d006['_windowLayer']);_0x21d006['addChildAt'](this[_0x56e669(0x889)],_0x12ec3d),this[_0x56e669(0x889)][_0x56e669(0x4a5)]['x']=0.5,this['_borderPortraitSprite'][_0x56e669(0x4a5)]['y']=0x1;const _0x5b8bd9=VisuMZ[_0x56e669(0x282)]['Settings'][_0x56e669(0x45a)]['PortraitScaleBorderStyle'];this[_0x56e669(0x889)][_0x56e669(0x68a)]['x']=_0x5b8bd9,this[_0x56e669(0x889)][_0x56e669(0x68a)]['y']=_0x5b8bd9,this['_borderPortraitSprite']['y']=this['y']+this[_0x56e669(0x28d)],this[_0x56e669(0x40d)]=0x0;},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x3f2)]=function(){const _0x151885=_0x2832c8;this['_borderPortraitSprite']['visible']=BattleManager[_0x151885(0x517)]();const _0x1ab4bb=BattleManager[_0x151885(0x42b)]();if(_0x1ab4bb===this[_0x151885(0x889)][_0x151885(0x42b)])return;this[_0x151885(0x889)][_0x151885(0x42b)]=_0x1ab4bb||this['_borderPortraitSprite']['actor'];if(!_0x1ab4bb)return;else{if(_0x1ab4bb['getBattlePortraitFilename']()===''){this[_0x151885(0x889)][_0x151885(0x6c6)]=ImageManager[_0x151885(0x661)];return;}else{const _0x1a1c3b=ImageManager[_0x151885(0x29b)](_0x1ab4bb[_0x151885(0x7cc)]());_0x1a1c3b[_0x151885(0x274)](this[_0x151885(0x31a)][_0x151885(0x1b2)](this,_0x1a1c3b));}}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x31a)]=function(_0x1319db){const _0x18fb7e=_0x2832c8;this[_0x18fb7e(0x40d)]=0x14,this['_borderPortraitSprite'][_0x18fb7e(0x6c6)]=_0x1319db;SceneManager[_0x18fb7e(0x37d)]['isRightInputMode']()?(this['_borderPortraitSprite']['x']=0x0,this[_0x18fb7e(0x470)]=Math[_0x18fb7e(0x76f)](_0x1319db[_0x18fb7e(0x797)]/0x2)):(this[_0x18fb7e(0x889)]['x']=this[_0x18fb7e(0x797)],this['_borderPortraitTargetX']=this['width']*0x3/0x4);this[_0x18fb7e(0x889)][_0x18fb7e(0x3ce)]=0x0,this[_0x18fb7e(0x889)]['y']=this['y']+this[_0x18fb7e(0x28d)];const _0x145c8e=BattleManager[_0x18fb7e(0x42b)]();_0x145c8e&&(this[_0x18fb7e(0x470)]+=_0x145c8e[_0x18fb7e(0x874)](),this[_0x18fb7e(0x889)]['y']+=_0x145c8e[_0x18fb7e(0x1d0)]());},Window_BattleStatus['prototype'][_0x2832c8(0x49b)]=function(){const _0x54cced=_0x2832c8;if(this['_borderPortraitDuration']>0x0){const _0x2ad1a8=this['_borderPortraitDuration'],_0x3f1296=this[_0x54cced(0x889)];_0x3f1296['x']=(_0x3f1296['x']*(_0x2ad1a8-0x1)+this[_0x54cced(0x470)])/_0x2ad1a8,_0x3f1296['opacity']=(_0x3f1296['opacity']*(_0x2ad1a8-0x1)+0xff)/_0x2ad1a8,this[_0x54cced(0x40d)]--;}},Window_BattleStatus[_0x2832c8(0x749)][_0x2832c8(0x224)]=function(){const _0x3dbba7=_0x2832c8;return;this[_0x3dbba7(0x6e6)]&&(this['_effectsContainer']['x']=this['x'],this['_effectsContainer']['y']=this['y']),this[_0x3dbba7(0x279)]&&(this['_damageContainer']['x']=this['x'],this['_damageContainer']['y']=this['y']);},VisuMZ['BattleCore'][_0x2832c8(0x396)]=Window_BattleEnemy[_0x2832c8(0x749)][_0x2832c8(0x44f)],Window_BattleEnemy[_0x2832c8(0x749)][_0x2832c8(0x44f)]=function(_0xb11e1a){const _0x2ca69b=_0x2832c8;this['_lastEnemy']=null,VisuMZ[_0x2ca69b(0x282)][_0x2ca69b(0x396)][_0x2ca69b(0x3c8)](this,_0xb11e1a);},Window_BattleEnemy[_0x2832c8(0x749)][_0x2832c8(0x42c)]=function(){const _0x59ad06=_0x2832c8;return this[_0x59ad06(0x82f)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x319)]=Window_BattleEnemy[_0x2832c8(0x749)][_0x2832c8(0x7f4)],Window_BattleEnemy['prototype'][_0x2832c8(0x7f4)]=function(){const _0x44646b=_0x2832c8;VisuMZ[_0x44646b(0x282)]['Window_BattleEnemy_show'][_0x44646b(0x3c8)](this),this['y']=Graphics[_0x44646b(0x28d)]*0xa;},Window_BattleEnemy['prototype'][_0x2832c8(0x1b8)]=function(){const _0x203177=_0x2832c8;return $gameTroop['aliveMembers']()[_0x203177(0x4d6)](0x0);},Window_BattleEnemy[_0x2832c8(0x749)][_0x2832c8(0x7d0)]=function(){const _0x3a047a=_0x2832c8;this['_enemies']=this[_0x3a047a(0x1b8)](),this[_0x3a047a(0x208)](),Window_Selectable[_0x3a047a(0x749)][_0x3a047a(0x7d0)][_0x3a047a(0x3c8)](this);},Window_BattleEnemy[_0x2832c8(0x749)]['sortEnemies']=function(){const _0xb299f2=_0x2832c8;this['_enemies'][_0xb299f2(0x20e)]((_0x31af0b,_0x131c64)=>{const _0x4d52d5=_0xb299f2;return _0x31af0b['battler']()[_0x4d52d5(0x4b3)]===_0x131c64[_0x4d52d5(0x5b5)]()['_baseX']?_0x31af0b[_0x4d52d5(0x5b5)]()[_0x4d52d5(0x8d3)]-_0x131c64[_0x4d52d5(0x5b5)]()[_0x4d52d5(0x8d3)]:_0x31af0b[_0x4d52d5(0x5b5)]()[_0x4d52d5(0x4b3)]-_0x131c64['battler']()['_baseX'];}),SceneManager[_0xb299f2(0x2f2)]()&&this['_enemies'][_0xb299f2(0x269)]();},Window_BattleEnemy['prototype'][_0x2832c8(0x2b7)]=function(){const _0x4cf5b4=_0x2832c8,_0x37016d=VisuMZ[_0x4cf5b4(0x282)][_0x4cf5b4(0x6e8)][_0x4cf5b4(0x690)];_0x37016d[_0x4cf5b4(0x2b4)]?this[_0x4cf5b4(0x693)]():this[_0x4cf5b4(0x727)]();},Window_BattleEnemy['prototype']['autoSelectLastSelected']=function(){const _0x38e02e=_0x2832c8;if(this[_0x38e02e(0x4da)]&&this[_0x38e02e(0x5ba)][_0x38e02e(0x569)](this[_0x38e02e(0x4da)])){const _0x125449=this[_0x38e02e(0x5ba)]['indexOf'](this[_0x38e02e(0x4da)]);this[_0x38e02e(0x5e7)](_0x125449);}else this[_0x38e02e(0x727)]();},Window_BattleEnemy[_0x2832c8(0x749)][_0x2832c8(0x727)]=function(){const _0x1f0ec7=_0x2832c8,_0x3f4fb0=VisuMZ[_0x1f0ec7(0x282)][_0x1f0ec7(0x6e8)][_0x1f0ec7(0x690)];let _0x526a67=![];$gameSystem[_0x1f0ec7(0x593)]()?_0x526a67=_0x3f4fb0[_0x1f0ec7(0x203)]:_0x526a67=_0x3f4fb0['FrontViewSelect'],this[_0x1f0ec7(0x5e7)](_0x526a67?this[_0x1f0ec7(0x82f)]()-0x1:0x0);},Window_BattleEnemy['prototype'][_0x2832c8(0x873)]=function(){const _0x1bc35b=_0x2832c8;Window_Selectable['prototype'][_0x1bc35b(0x873)][_0x1bc35b(0x3c8)](this),this[_0x1bc35b(0x4da)]=this[_0x1bc35b(0x297)]();},Window_BattleItem['prototype'][_0x2832c8(0x569)]=function(_0x51c91e){const _0x484d1a=_0x2832c8;if(!_0x51c91e)return![];return _0x51c91e[_0x484d1a(0x374)]===0x0||_0x51c91e[_0x484d1a(0x374)]===0x1;};function Window_AutoBattleCancel(){this['initialize'](...arguments);}Window_AutoBattleCancel[_0x2832c8(0x749)]=Object[_0x2832c8(0x564)](Window_Base[_0x2832c8(0x749)]),Window_AutoBattleCancel[_0x2832c8(0x749)][_0x2832c8(0x493)]=Window_AutoBattleCancel,Window_AutoBattleCancel['prototype'][_0x2832c8(0x44f)]=function(_0x51718f){const _0xa40841=_0x2832c8;Window_Base[_0xa40841(0x749)][_0xa40841(0x44f)]['call'](this,_0x51718f),this['setBackgroundType'](this[_0xa40841(0x1b5)]()),this[_0xa40841(0x7d0)]();},Window_AutoBattleCancel[_0x2832c8(0x749)][_0x2832c8(0x1b5)]=function(){const _0x3d7f08=_0x2832c8;return VisuMZ['BattleCore']['Settings'][_0x3d7f08(0x774)][_0x3d7f08(0x2d6)];},Window_AutoBattleCancel[_0x2832c8(0x749)][_0x2832c8(0x7d0)]=function(){const _0x2a03e5=_0x2832c8;this[_0x2a03e5(0x6cd)][_0x2a03e5(0x890)]();const _0x7f4ce=VisuMZ[_0x2a03e5(0x282)][_0x2a03e5(0x6e8)][_0x2a03e5(0x774)][_0x2a03e5(0x761)],_0x1fc0b4=_0x7f4ce[_0x2a03e5(0x668)](this['okButtonText'](),this[_0x2a03e5(0x834)]()),_0x7fc140=this[_0x2a03e5(0x486)](_0x1fc0b4)[_0x2a03e5(0x797)],_0x378aa4=Math[_0x2a03e5(0x1fd)]((this['innerWidth']-_0x7fc140)/0x2);this[_0x2a03e5(0x1f6)](_0x1fc0b4,_0x378aa4,0x0,_0x7fc140);},Window_AutoBattleCancel[_0x2832c8(0x749)][_0x2832c8(0x671)]=function(){const _0x5b3b0d=_0x2832c8;return Imported[_0x5b3b0d(0x84a)]?TextManager[_0x5b3b0d(0x758)]('ok'):VisuMZ[_0x5b3b0d(0x282)]['Settings'][_0x5b3b0d(0x774)]['AutoBattleOK'];},Window_AutoBattleCancel['prototype']['cancelButtonText']=function(){const _0x1ccd96=_0x2832c8;return Imported['VisuMZ_0_CoreEngine']?TextManager[_0x1ccd96(0x758)](_0x1ccd96(0x377)):VisuMZ[_0x1ccd96(0x282)][_0x1ccd96(0x6e8)][_0x1ccd96(0x774)]['AutoBattleCancel'];},Window_AutoBattleCancel['prototype'][_0x2832c8(0x21b)]=function(){const _0x254d19=_0x2832c8;Window_Base[_0x254d19(0x749)][_0x254d19(0x21b)][_0x254d19(0x3c8)](this),this[_0x254d19(0x242)](),this[_0x254d19(0x8b7)]();},Window_AutoBattleCancel[_0x2832c8(0x749)]['updateVisibility']=function(){this['visible']=BattleManager['_autoBattle'];},Window_AutoBattleCancel[_0x2832c8(0x749)][_0x2832c8(0x8b7)]=function(){const _0x364637=_0x2832c8;if(!BattleManager[_0x364637(0x7a4)])return;(Input[_0x364637(0x1db)]('ok')||Input[_0x364637(0x1db)](_0x364637(0x377))||TouchInput[_0x364637(0x89b)]()||TouchInput[_0x364637(0x8de)]())&&(SoundManager['playCancel'](),BattleManager[_0x364637(0x7a4)]=![],Input[_0x364637(0x890)](),TouchInput['clear']());};function Window_EnemyName(){const _0x41221a=_0x2832c8;this[_0x41221a(0x44f)](...arguments);}Window_EnemyName[_0x2832c8(0x749)]=Object[_0x2832c8(0x564)](Window_Base[_0x2832c8(0x749)]),Window_EnemyName[_0x2832c8(0x749)][_0x2832c8(0x493)]=Window_EnemyName,Window_EnemyName[_0x2832c8(0x749)]['initialize']=function(_0x5cf608){const _0x2fbc5f=_0x2832c8;this['_enemyID']=_0x5cf608,this[_0x2fbc5f(0x441)]='';const _0x12c440=new Rectangle(0x0,0x0,Graphics[_0x2fbc5f(0x19b)],this[_0x2fbc5f(0x73f)]()*0x4);Window_Base[_0x2fbc5f(0x749)][_0x2fbc5f(0x44f)][_0x2fbc5f(0x3c8)](this,_0x12c440),this[_0x2fbc5f(0x694)](0x2),this[_0x2fbc5f(0x367)]=0x0;},Window_EnemyName[_0x2832c8(0x749)]['updatePadding']=function(){this['padding']=0x0;},Window_EnemyName[_0x2832c8(0x749)]['enemy']=function(){const _0x3fa4c2=_0x2832c8;return $gameTroop[_0x3fa4c2(0x7b3)]()[this[_0x3fa4c2(0x3b4)]];},Window_EnemyName[_0x2832c8(0x749)][_0x2832c8(0x21b)]=function(){const _0x9ce871=_0x2832c8;Window_Base[_0x9ce871(0x749)]['update'][_0x9ce871(0x3c8)](this);if(this['enemy']()&&this[_0x9ce871(0x297)]()['name']()!==this[_0x9ce871(0x441)])this['refresh']();this[_0x9ce871(0x3da)](),this['updatePosition']();},Window_EnemyName[_0x2832c8(0x749)]['updateOpacity']=function(){const _0x591d0b=_0x2832c8;if(!this[_0x591d0b(0x297)]()){if(this[_0x591d0b(0x367)]>0x0)this['contentsOpacity']-=0x10;}else{if(this[_0x591d0b(0x297)]()[_0x591d0b(0x7d5)]()){if(this['contentsOpacity']>0x0)this[_0x591d0b(0x367)]-=0x10;}else{if(SceneManager[_0x591d0b(0x37d)][_0x591d0b(0x777)]&&SceneManager[_0x591d0b(0x37d)][_0x591d0b(0x777)]['active']&&SceneManager['_scene'][_0x591d0b(0x777)][_0x591d0b(0x5ba)][_0x591d0b(0x569)](this['enemy']())){if(this[_0x591d0b(0x367)]<0xff)this[_0x591d0b(0x367)]+=0x10;}else this['contentsOpacity']>0x0&&(this[_0x591d0b(0x367)]-=0x10);}}},Window_EnemyName[_0x2832c8(0x749)]['updatePosition']=function(){const _0x2cdd0a=_0x2832c8;if(!this[_0x2cdd0a(0x297)]())return;SceneManager['isBattleFlipped']()?this['x']=Graphics['boxWidth']-this['enemy']()[_0x2cdd0a(0x5b5)]()[_0x2cdd0a(0x4b3)]:this['x']=this['enemy']()[_0x2cdd0a(0x5b5)]()[_0x2cdd0a(0x4b3)];this['x']-=Math[_0x2cdd0a(0x46d)](this[_0x2cdd0a(0x797)]/0x2),this['y']=this['enemy']()[_0x2cdd0a(0x5b5)]()['_baseY']-Math['round'](this['lineHeight']()*1.5);const _0x15eb6f=VisuMZ[_0x2cdd0a(0x282)][_0x2cdd0a(0x6e8)][_0x2cdd0a(0x690)];this['x']+=_0x15eb6f['NameOffsetX']||0x0,this['y']+=_0x15eb6f[_0x2cdd0a(0x26d)]||0x0;},Window_EnemyName[_0x2832c8(0x749)]['resetFontSettings']=function(){const _0x12b1e9=_0x2832c8;Window_Base[_0x12b1e9(0x749)][_0x12b1e9(0x4c9)][_0x12b1e9(0x3c8)](this),this['contents'][_0x12b1e9(0x3a5)]=VisuMZ[_0x12b1e9(0x282)][_0x12b1e9(0x6e8)][_0x12b1e9(0x690)][_0x12b1e9(0x2cc)];},Window_EnemyName[_0x2832c8(0x749)][_0x2832c8(0x7d0)]=function(){const _0x40efe5=_0x2832c8;this['contents'][_0x40efe5(0x890)]();if(!this['enemy']())return;this['_text']=this[_0x40efe5(0x297)]()[_0x40efe5(0x6f3)]();const _0x2e2e91=this['textSizeEx'](this[_0x40efe5(0x441)])[_0x40efe5(0x797)],_0x55af22=Math[_0x40efe5(0x46d)]((this[_0x40efe5(0x40b)]-_0x2e2e91)/0x2);this['drawTextEx'](this['_text'],_0x55af22,0x0,_0x2e2e91+0x8);},Window_BattleLog['prototype'][_0x2832c8(0x74a)]=function(){const _0x4c9245=_0x2832c8;return VisuMZ[_0x4c9245(0x282)][_0x4c9245(0x6e8)][_0x4c9245(0x54b)][_0x4c9245(0x4ab)];},Window_BattleLog[_0x2832c8(0x749)]['messageSpeed']=function(){const _0xd6cb38=_0x2832c8;return VisuMZ[_0xd6cb38(0x282)]['Settings'][_0xd6cb38(0x54b)][_0xd6cb38(0x43d)];},Window_BattleLog['prototype'][_0x2832c8(0x595)]=function(){const _0x3cffa0=_0x2832c8;return VisuMZ[_0x3cffa0(0x282)]['Settings'][_0x3cffa0(0x54b)][_0x3cffa0(0x263)];},Window_BattleLog[_0x2832c8(0x749)]['isFastForward']=function(){return![];},Window_BattleLog[_0x2832c8(0x749)]['actionEffect']=function(_0x262107,_0x5735a1){const _0x456da9=_0x2832c8;this[_0x456da9(0x4e7)](_0x456da9(0x59c)),BattleManager[_0x456da9(0x793)](_0x262107,_0x5735a1),this['callNextMethod']();},Window_BattleLog['prototype'][_0x2832c8(0x59c)]=function(){const _0x3ef8b8=_0x2832c8;this[_0x3ef8b8(0x6aa)]();},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x7d2)]=function(_0x3fe96c){const _0xc03eff=_0x2832c8,_0x2782aa=Array[_0xc03eff(0x749)][_0xc03eff(0x4d6)][_0xc03eff(0x3c8)](arguments,0x1),_0x363b63={'name':_0x3fe96c,'params':_0x2782aa},_0x157b5d=this[_0xc03eff(0x89f)][_0xc03eff(0x8b3)](_0x2ed28a=>_0x2ed28a[_0xc03eff(0x6f3)])[_0xc03eff(0x294)](_0xc03eff(0x59c));_0x157b5d>=0x0?this[_0xc03eff(0x89f)][_0xc03eff(0x222)](_0x157b5d,0x0,_0x363b63):this['_methods']['push'](_0x363b63);},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x4e7)]=function(_0x13a070){const _0x45d712=_0x2832c8,_0x357b01=Array[_0x45d712(0x749)][_0x45d712(0x4d6)]['call'](arguments,0x1);this[_0x45d712(0x89f)][_0x45d712(0x4e7)]({'name':_0x13a070,'params':_0x357b01});},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x3ba)]=function(){const _0x385d2f=_0x2832c8;if(!$gameTemp[_0x385d2f(0x6de)]())return;console[_0x385d2f(0x810)](this['_methods']['map'](_0x1ba90c=>_0x1ba90c['name'])[_0x385d2f(0x1f8)]('\x0a'));},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x33f)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x7d0)],Window_BattleLog[_0x2832c8(0x749)]['refresh']=function(){const _0x518b36=_0x2832c8;this[_0x518b36(0x8bb)]=!![];},VisuMZ[_0x2832c8(0x282)]['Window_BattleLog_update']=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x21b)],Window_BattleLog[_0x2832c8(0x749)]['update']=function(){const _0x42aa99=_0x2832c8;VisuMZ[_0x42aa99(0x282)]['Window_BattleLog_update']['call'](this);if(this['_requestRefresh'])this[_0x42aa99(0x8f0)]();},Window_BattleLog[_0x2832c8(0x749)]['processRefresh']=function(){const _0xe6c2bb=_0x2832c8;this[_0xe6c2bb(0x8bb)]=![],VisuMZ[_0xe6c2bb(0x282)][_0xe6c2bb(0x33f)][_0xe6c2bb(0x3c8)](this);},Window_BattleLog[_0x2832c8(0x749)]['drawLineText']=function(_0x448ec6){const _0xe492f4=_0x2832c8;let _0x573c3b=VisuMZ[_0xe492f4(0x282)]['Settings'][_0xe492f4(0x54b)]['TextAlign'][_0xe492f4(0x188)]()['trim'](),_0x544aab=this[_0xe492f4(0x463)][_0x448ec6];if(_0x544aab[_0xe492f4(0x6f0)](/<LEFT>/i))_0x573c3b=_0xe492f4(0x2c3);else{if(_0x544aab[_0xe492f4(0x6f0)](/<CENTER>/i))_0x573c3b=_0xe492f4(0x3de);else _0x544aab[_0xe492f4(0x6f0)](/<RIGHT>/i)&&(_0x573c3b=_0xe492f4(0x821));}_0x544aab=_0x544aab[_0xe492f4(0x676)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x544aab=_0x544aab[_0xe492f4(0x676)](/\\I\[0\]/gi,'');const _0x2b3b41=this[_0xe492f4(0x47b)](_0x448ec6);this['contents'][_0xe492f4(0x5cd)](_0x2b3b41['x'],_0x2b3b41['y'],_0x2b3b41[_0xe492f4(0x797)],_0x2b3b41['height']);const _0x3742be=this[_0xe492f4(0x486)](_0x544aab)[_0xe492f4(0x797)];let _0x323696=_0x2b3b41['x'];if(_0x573c3b==='center')_0x323696+=(_0x2b3b41[_0xe492f4(0x797)]-_0x3742be)/0x2;else _0x573c3b===_0xe492f4(0x821)&&(_0x323696+=_0x2b3b41[_0xe492f4(0x797)]-_0x3742be);this[_0xe492f4(0x1f6)](_0x544aab,_0x323696,_0x2b3b41['y'],_0x3742be+0x8);},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x332)]=function(_0x14e058){const _0x6ebaef=_0x2832c8;this[_0x6ebaef(0x463)][_0x6ebaef(0x7d2)](_0x14e058),this[_0x6ebaef(0x7d0)](),this[_0x6ebaef(0x6aa)]();},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x7fc)]=function(){const _0x12cf2d=_0x2832c8;let _0x196b06=![];switch(this[_0x12cf2d(0x514)]){case'effect':_0x196b06=this['_spriteset'][_0x12cf2d(0x382)]();break;case _0x12cf2d(0x737):_0x196b06=this[_0x12cf2d(0x229)][_0x12cf2d(0x1b3)]();break;case _0x12cf2d(0x773):_0x196b06=this[_0x12cf2d(0x229)][_0x12cf2d(0x478)]();break;case'float':_0x196b06=this['_spriteset'][_0x12cf2d(0x427)]();break;case'jump':_0x196b06=this[_0x12cf2d(0x229)][_0x12cf2d(0x566)]();break;case _0x12cf2d(0x3ce):_0x196b06=this[_0x12cf2d(0x229)][_0x12cf2d(0x3cd)]();break;}return!_0x196b06&&(this[_0x12cf2d(0x514)]=''),_0x196b06;},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x23d)]=function(){this['setWaitMode']('animation');},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x85c)]=function(){const _0x2ad62e=_0x2832c8;this[_0x2ad62e(0x363)](_0x2ad62e(0x1b0));},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x3eb)]=function(){const _0x3c389=_0x2832c8;this[_0x3c389(0x363)](_0x3c389(0x84e));},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x3d3)]=function(){const _0x58a0db=_0x2832c8;this[_0x58a0db(0x363)]('opacity');},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x2bc)]=function(){const _0x38a9bd=_0x2832c8,_0x1fcf43=VisuMZ[_0x38a9bd(0x282)][_0x38a9bd(0x6e8)][_0x38a9bd(0x54b)];if(!_0x1fcf43[_0x38a9bd(0x3bf)])return;this[_0x38a9bd(0x7d2)](_0x38a9bd(0x332),_0x1fcf43[_0x38a9bd(0x72a)][_0x38a9bd(0x668)]($gameTroop[_0x38a9bd(0x8e7)]())),this['push'](_0x38a9bd(0x6a6),_0x1fcf43[_0x38a9bd(0x1a6)]),this[_0x38a9bd(0x7d2)](_0x38a9bd(0x890));},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x6e2)]=function(_0x2dbd1f,_0x3adf87,_0x5bffdc){const _0x4c4576=_0x2832c8;this[_0x4c4576(0x336)](_0x3adf87)?BattleManager[_0x4c4576(0x1bd)]():this[_0x4c4576(0x6ab)](_0x2dbd1f,_0x3adf87,_0x5bffdc);},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x336)]=function(_0x3b3a25){const _0x5e5958=_0x2832c8;if(!SceneManager['isSceneBattle']())return![];if(!_0x3b3a25)return![];if(!_0x3b3a25[_0x5e5958(0x703)]())return![];if(_0x3b3a25['item']()[_0x5e5958(0x75e)]['match'](/<CUSTOM ACTION SEQUENCE>/i))return!![];if(DataManager['checkAutoCustomActionSequenceNotetagEffect'](_0x3b3a25[_0x5e5958(0x703)]()))return!![];return![];},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x6ab)]=function(_0x46c1c6,_0x2fb51d,_0x54fab2){const _0xbfe13d=_0x2832c8,_0x5c0826=_0x2fb51d[_0xbfe13d(0x703)]();this['setupActionSet'](_0x46c1c6,_0x2fb51d,_0x54fab2),this[_0xbfe13d(0x3d2)](_0x46c1c6,_0x2fb51d,_0x54fab2),this[_0xbfe13d(0x7e0)](_0x46c1c6,_0x2fb51d,_0x54fab2);},Window_BattleLog['prototype'][_0x2832c8(0x4e9)]=function(_0x35f638,_0x53f269){const _0x16b887=_0x2832c8,_0x9f747f=VisuMZ[_0x16b887(0x282)][_0x16b887(0x6e8)][_0x16b887(0x54b)];_0x9f747f['ActionCenteredName']&&this[_0x16b887(0x7d2)]('addText',_0x16b887(0x6ac)[_0x16b887(0x668)](DataManager[_0x16b887(0x6af)](_0x53f269)));if(DataManager[_0x16b887(0x2e5)](_0x53f269)){if(_0x9f747f[_0x16b887(0x3cf)])this[_0x16b887(0x415)](_0x53f269[_0x16b887(0x8e1)],_0x35f638,_0x53f269);if(_0x9f747f[_0x16b887(0x606)])this[_0x16b887(0x415)](_0x53f269[_0x16b887(0x5b7)],_0x35f638,_0x53f269);}else{if(_0x9f747f[_0x16b887(0x898)])this['displayItemMessage'](TextManager[_0x16b887(0x4f6)],_0x35f638,_0x53f269);}},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x729)]=function(_0x4b6b73,_0x2cddab,_0x566439){const _0x3b7566=_0x2832c8,_0x230743=_0x2cddab[_0x3b7566(0x703)]();this[_0x3b7566(0x4e9)](_0x4b6b73,_0x230743),this[_0x3b7566(0x7d2)](_0x3b7566(0x6c9),_0x4b6b73,_0x566439,!![]),this['push'](_0x3b7566(0x612),_0x4b6b73,_0x2cddab),this[_0x3b7566(0x7d2)](_0x3b7566(0x619)),this[_0x3b7566(0x7d2)](_0x3b7566(0x833),_0x4b6b73,_0x2cddab),this[_0x3b7566(0x7d2)](_0x3b7566(0x23d));},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x3d2)]=function(_0xc617e9,_0x567cff,_0x4dafed){const _0x5f550a=_0x2832c8;if(this['isMeleeSingleTargetAction'](_0x567cff))this[_0x5f550a(0x4cd)](_0xc617e9,_0x567cff,_0x4dafed);else{if(this[_0x5f550a(0x366)](_0x567cff))this[_0x5f550a(0x7fd)](_0xc617e9,_0x567cff,_0x4dafed);else _0x567cff[_0x5f550a(0x708)]()?this[_0x5f550a(0x4a9)](_0xc617e9,_0x567cff,_0x4dafed):this[_0x5f550a(0x55a)](_0xc617e9,_0x567cff,_0x4dafed);}},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x7ea)]=function(_0x29d0f6){const _0xe76714=_0x2832c8;if(!_0x29d0f6['isPhysical']())return![];if(!_0x29d0f6[_0xe76714(0x49a)]())return![];if(!_0x29d0f6[_0xe76714(0x6da)]())return![];return VisuMZ[_0xe76714(0x282)][_0xe76714(0x6e8)]['ActionSequence'][_0xe76714(0x1f3)];},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x4cd)]=function(_0x566ad1,_0x3ba57e,_0x425680){const _0x416e9a=_0x2832c8,_0x24689a=_0x566ad1[_0x416e9a(0x429)]()[_0x416e9a(0x3e3)]<0x2,_0x1d00be=0x14,_0x375cb0=0x30;_0x24689a&&(this[_0x416e9a(0x7d2)](_0x416e9a(0x5f3),[_0x566ad1],_0x375cb0,_0x1d00be),this[_0x416e9a(0x7d2)]('performMoveToTargets',_0x566ad1,_0x425680,_0x416e9a(0x816),_0x1d00be,!![],'Linear',!![]),this['push'](_0x416e9a(0x613),[_0x566ad1],_0x416e9a(0x5a6)),this[_0x416e9a(0x7d2)](_0x416e9a(0x619)));let _0x55d58e=_0x3ba57e[_0x416e9a(0x3ac)]()?this[_0x416e9a(0x82e)](_0x566ad1):0x1;for(let _0x533b41=0x0;_0x533b41<_0x55d58e;_0x533b41++){_0x3ba57e[_0x416e9a(0x3ac)]()&&_0x566ad1['isActor']()&&this[_0x416e9a(0x7d2)](_0x416e9a(0x8c0),_0x566ad1,_0x533b41),_0x3ba57e['item']()[_0x416e9a(0x38d)]<0x0?this[_0x416e9a(0x4a9)](_0x566ad1,_0x3ba57e,_0x425680):this[_0x416e9a(0x55a)](_0x566ad1,_0x3ba57e,_0x425680);}_0x3ba57e['isAttack']()&&_0x566ad1[_0x416e9a(0x44c)]()&&this[_0x416e9a(0x7d2)](_0x416e9a(0x379),_0x566ad1);this[_0x416e9a(0x7d2)](_0x416e9a(0x6c9),_0x566ad1,_0x425680,![]);if(_0x24689a){const _0x6cf6fd=_0x566ad1[_0x416e9a(0x5b5)]();this[_0x416e9a(0x7d2)](_0x416e9a(0x5f3),[_0x566ad1],_0x375cb0,_0x1d00be),this['push'](_0x416e9a(0x65e),_0x566ad1,_0x6cf6fd[_0x416e9a(0x84b)],_0x6cf6fd['_homeY'],_0x1d00be,![],_0x416e9a(0x21d)),this[_0x416e9a(0x7d2)](_0x416e9a(0x613),[_0x566ad1],_0x416e9a(0x3a7)),this[_0x416e9a(0x7d2)]('waitForMovement'),this['push']('requestMotion',[_0x566ad1],_0x416e9a(0x5a6));}},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x366)]=function(_0x316e28){const _0x4ec472=_0x2832c8;if(!_0x316e28[_0x4ec472(0x2eb)]())return![];if(!_0x316e28[_0x4ec472(0x5de)]())return![];if(!_0x316e28['isForOpponent']())return![];return VisuMZ[_0x4ec472(0x282)][_0x4ec472(0x6e8)][_0x4ec472(0x5e4)][_0x4ec472(0x4b6)];},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x7fd)]=function(_0x3c52f9,_0x4298b1,_0x77ea69){const _0x2e9e0f=_0x2832c8,_0x5ee32d=_0x3c52f9[_0x2e9e0f(0x429)]()[_0x2e9e0f(0x3e3)]<0x2,_0x3328c5=0x14,_0x19e4c4=0x30;_0x5ee32d&&(this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x5f3),[_0x3c52f9],_0x19e4c4,_0x3328c5),this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x60e),_0x3c52f9,_0x77ea69,_0x2e9e0f(0x2d5),_0x3328c5,!![],_0x2e9e0f(0x21d),!![]),this['push'](_0x2e9e0f(0x613),[_0x3c52f9],'walk'),this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x619)));let _0x1e54b8=_0x4298b1['isAttack']()?this[_0x2e9e0f(0x82e)](_0x3c52f9):0x1;for(let _0x8278ba=0x0;_0x8278ba<_0x1e54b8;_0x8278ba++){_0x4298b1[_0x2e9e0f(0x3ac)]()&&_0x3c52f9[_0x2e9e0f(0x44c)]()&&this['push'](_0x2e9e0f(0x8c0),_0x3c52f9,_0x8278ba),this[_0x2e9e0f(0x55a)](_0x3c52f9,_0x4298b1,_0x77ea69);}_0x4298b1[_0x2e9e0f(0x3ac)]()&&_0x3c52f9[_0x2e9e0f(0x44c)]()&&this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x379),_0x3c52f9);this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x6c9),_0x3c52f9,_0x77ea69,![]);if(_0x5ee32d){const _0x39abc4=_0x3c52f9['battler']();this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x5f3),[_0x3c52f9],_0x19e4c4,_0x3328c5),this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x65e),_0x3c52f9,_0x39abc4[_0x2e9e0f(0x84b)],_0x39abc4[_0x2e9e0f(0x3ab)],_0x3328c5,![],_0x2e9e0f(0x21d)),this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x613),[_0x3c52f9],'evade'),this[_0x2e9e0f(0x7d2)](_0x2e9e0f(0x619)),this['push'](_0x2e9e0f(0x613),[_0x3c52f9],_0x2e9e0f(0x5a6));}},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x4a9)]=function(_0x56f875,_0x31e4b9,_0x4c2128){const _0x4bc8b8=_0x2832c8,_0x4bb4cf=_0x31e4b9[_0x4bc8b8(0x703)]();for(const _0x532230 of _0x4c2128){if(!_0x532230)continue;this[_0x4bc8b8(0x7d2)](_0x4bc8b8(0x1c5),_0x56f875,_0x31e4b9),this[_0x4bc8b8(0x7d2)](_0x4bc8b8(0x6a6),Sprite_Battler[_0x4bc8b8(0x323)]),this['push'](_0x4bc8b8(0x293),_0x56f875,[_0x532230],_0x4bb4cf[_0x4bc8b8(0x38d)]),this[_0x4bc8b8(0x7d2)](_0x4bc8b8(0x6a6),0x18),this[_0x4bc8b8(0x7d2)](_0x4bc8b8(0x652),_0x56f875,_0x532230);}},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x55a)]=function(_0x59fd59,_0x5bc7c2,_0x2765ce){const _0x501ef8=_0x2832c8,_0x53877f=_0x5bc7c2[_0x501ef8(0x703)]();this[_0x501ef8(0x7d2)](_0x501ef8(0x1c5),_0x59fd59,_0x5bc7c2),this[_0x501ef8(0x7d2)](_0x501ef8(0x6a6),Sprite_Battler['_motionSpeed']),this[_0x501ef8(0x7d2)](_0x501ef8(0x293),_0x59fd59,_0x2765ce[_0x501ef8(0x52b)](),_0x53877f[_0x501ef8(0x38d)]),this[_0x501ef8(0x7d2)]('waitForAnimation');for(const _0x2fd136 of _0x2765ce){if(!_0x2fd136)continue;this[_0x501ef8(0x7d2)](_0x501ef8(0x652),_0x59fd59,_0x2fd136);}},Window_BattleLog['prototype'][_0x2832c8(0x7e0)]=function(_0x597849,_0x47e6c4,_0x55ff29){const _0x118f2e=_0x2832c8,_0x3b906d=_0x47e6c4[_0x118f2e(0x703)]();this['push'](_0x118f2e(0x6c9),_0x597849,_0x55ff29,![]),this[_0x118f2e(0x7d2)](_0x118f2e(0x79d)),this['push'](_0x118f2e(0x304)),this['push'](_0x118f2e(0x890)),this[_0x118f2e(0x7d2)](_0x118f2e(0x3c5),_0x597849),this[_0x118f2e(0x7d2)]('waitForMovement');},Window_BattleLog['prototype']['endAction']=function(_0x33d595){},VisuMZ[_0x2832c8(0x282)]['Window_BattleLog_displayCurrentState']=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x527)],Window_BattleLog['prototype']['displayCurrentState']=function(_0x57639f){const _0x37530a=_0x2832c8;if(!VisuMZ[_0x37530a(0x282)][_0x37530a(0x6e8)][_0x37530a(0x54b)][_0x37530a(0x191)])return;VisuMZ[_0x37530a(0x282)][_0x37530a(0x2ac)]['call'](this,_0x57639f);},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x588)]=function(_0x1ff27b){const _0x4bf50f=_0x2832c8;this[_0x4bf50f(0x7d2)](_0x4bf50f(0x7b6),_0x1ff27b);VisuMZ[_0x4bf50f(0x282)][_0x4bf50f(0x6e8)][_0x4bf50f(0x5e4)][_0x4bf50f(0x81f)]&&this['push'](_0x4bf50f(0x293),_0x1ff27b,[BattleManager[_0x4bf50f(0x2c0)]],-0x1);if(!VisuMZ['BattleCore'][_0x4bf50f(0x6e8)][_0x4bf50f(0x54b)][_0x4bf50f(0x4ef)])return;this['push'](_0x4bf50f(0x332),TextManager['counterAttack'][_0x4bf50f(0x668)](_0x1ff27b[_0x4bf50f(0x6f3)]()));},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x627)]=function(_0x32bf11){const _0x432d27=_0x2832c8;this['push'](_0x432d27(0x63b),_0x32bf11);if(!VisuMZ[_0x432d27(0x282)]['Settings'][_0x432d27(0x54b)][_0x432d27(0x462)])return;this[_0x432d27(0x7d2)]('addText',TextManager[_0x432d27(0x5f6)][_0x432d27(0x668)](_0x32bf11[_0x432d27(0x6f3)]()));},Window_BattleLog[_0x2832c8(0x749)]['displayReflectionPlayBack']=function(_0x363c88,_0x173b38){const _0x2a374e=_0x2832c8;if(VisuMZ[_0x2a374e(0x282)][_0x2a374e(0x6e8)][_0x2a374e(0x5e4)][_0x2a374e(0x80d)]){const _0x33b98a=_0x173b38[_0x2a374e(0x703)]();this[_0x2a374e(0x7d2)](_0x2a374e(0x293),_0x363c88,[_0x363c88],_0x33b98a[_0x2a374e(0x38d)]);}},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x4a6)]=function(_0x2e3200,_0x4ef7eb){const _0x37d7a8=_0x2832c8;this[_0x37d7a8(0x7d2)](_0x37d7a8(0x647),_0x2e3200,_0x4ef7eb);if(!VisuMZ[_0x37d7a8(0x282)][_0x37d7a8(0x6e8)]['BattleLog'][_0x37d7a8(0x5b1)])return;const _0x5609ab=_0x2e3200[_0x37d7a8(0x6f3)](),_0x3fd1fa=TextManager[_0x37d7a8(0x38b)][_0x37d7a8(0x668)](_0x5609ab,_0x4ef7eb[_0x37d7a8(0x6f3)]());this[_0x37d7a8(0x7d2)](_0x37d7a8(0x332),_0x3fd1fa);},VisuMZ['BattleCore'][_0x2832c8(0x497)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x633)],Window_BattleLog[_0x2832c8(0x749)]['displayFailure']=function(_0x4724d1){const _0x299882=_0x2832c8;if(!VisuMZ[_0x299882(0x282)][_0x299882(0x6e8)]['BattleLog'][_0x299882(0x7a6)])return;VisuMZ[_0x299882(0x282)][_0x299882(0x497)][_0x299882(0x3c8)](this,_0x4724d1);},VisuMZ['BattleCore'][_0x2832c8(0x3af)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x7e7)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x7e7)]=function(_0x5dce18){const _0x22f66f=_0x2832c8;if(!VisuMZ[_0x22f66f(0x282)][_0x22f66f(0x6e8)][_0x22f66f(0x54b)]['ShowCritical'])return;VisuMZ[_0x22f66f(0x282)][_0x22f66f(0x3af)][_0x22f66f(0x3c8)](this,_0x5dce18);},VisuMZ['BattleCore'][_0x2832c8(0x7bb)]=Window_BattleLog[_0x2832c8(0x749)]['displayMiss'],Window_BattleLog[_0x2832c8(0x749)]['displayMiss']=function(_0x118cef){const _0x290d28=_0x2832c8;!VisuMZ[_0x290d28(0x282)][_0x290d28(0x6e8)][_0x290d28(0x54b)]['ShowMissEvasion']?this[_0x290d28(0x7d2)]('performMiss',_0x118cef):VisuMZ[_0x290d28(0x282)][_0x290d28(0x7bb)][_0x290d28(0x3c8)](this,_0x118cef);},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x581)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x67c)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x67c)]=function(_0x388f83){const _0x4113c4=_0x2832c8;!VisuMZ[_0x4113c4(0x282)][_0x4113c4(0x6e8)][_0x4113c4(0x54b)][_0x4113c4(0x585)]?_0x388f83[_0x4113c4(0x64a)]()[_0x4113c4(0x3b1)]?this['push'](_0x4113c4(0x4e4),_0x388f83):this[_0x4113c4(0x7d2)](_0x4113c4(0x193),_0x388f83):VisuMZ[_0x4113c4(0x282)][_0x4113c4(0x581)][_0x4113c4(0x3c8)](this,_0x388f83);},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x21a)]=function(_0x5098f9){const _0x467b09=_0x2832c8;_0x5098f9['result']()[_0x467b09(0x368)]&&(_0x5098f9['result']()[_0x467b09(0x313)]>0x0&&!_0x5098f9[_0x467b09(0x64a)]()[_0x467b09(0x267)]&&this['push'](_0x467b09(0x86c),_0x5098f9),_0x5098f9[_0x467b09(0x64a)]()[_0x467b09(0x313)]<0x0&&this[_0x467b09(0x7d2)](_0x467b09(0x6d9),_0x5098f9),VisuMZ[_0x467b09(0x282)]['Settings']['BattleLog'][_0x467b09(0x36e)]&&this[_0x467b09(0x7d2)](_0x467b09(0x332),this[_0x467b09(0x7f2)](_0x5098f9)));},VisuMZ['BattleCore'][_0x2832c8(0x20d)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x352)],Window_BattleLog[_0x2832c8(0x749)]['displayMpDamage']=function(_0x511542){const _0x4506d4=_0x2832c8;if(!VisuMZ[_0x4506d4(0x282)][_0x4506d4(0x6e8)]['BattleLog'][_0x4506d4(0x80e)])return;VisuMZ[_0x4506d4(0x282)][_0x4506d4(0x20d)][_0x4506d4(0x3c8)](this,_0x511542);},VisuMZ['BattleCore'][_0x2832c8(0x23c)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x632)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x632)]=function(_0x5973a3){const _0x3c26cd=_0x2832c8;if(!VisuMZ[_0x3c26cd(0x282)][_0x3c26cd(0x6e8)][_0x3c26cd(0x54b)][_0x3c26cd(0x436)])return;VisuMZ[_0x3c26cd(0x282)][_0x3c26cd(0x23c)]['call'](this,_0x5973a3);},Window_BattleLog['prototype'][_0x2832c8(0x701)]=function(_0x444424){const _0x2df5b0=_0x2832c8,_0x3b44de=_0x444424[_0x2df5b0(0x64a)](),_0x20c755=_0x3b44de['addedStateObjects']();for(const _0x202a8b of _0x20c755){const _0x778996=_0x444424[_0x2df5b0(0x44c)]()?_0x202a8b['message1']:_0x202a8b[_0x2df5b0(0x5b7)];_0x778996&&VisuMZ[_0x2df5b0(0x282)][_0x2df5b0(0x6e8)][_0x2df5b0(0x54b)][_0x2df5b0(0x3c0)]&&(this[_0x2df5b0(0x7d2)](_0x2df5b0(0x51f)),this['push']('pushBaseLine'),this[_0x2df5b0(0x7d2)](_0x2df5b0(0x332),_0x778996[_0x2df5b0(0x668)](_0x444424[_0x2df5b0(0x6f3)]())),this[_0x2df5b0(0x7d2)]('wait')),_0x202a8b['id']===_0x444424[_0x2df5b0(0x225)]()&&this['push'](_0x2df5b0(0x428),_0x444424);}},Window_BattleLog['prototype'][_0x2832c8(0x8e6)]=function(_0x1ab946){const _0x469981=_0x2832c8;if(!VisuMZ['BattleCore'][_0x469981(0x6e8)][_0x469981(0x54b)]['ShowRemovedState'])return;const _0x37a6ce=_0x1ab946[_0x469981(0x64a)](),_0x3d5051=_0x37a6ce[_0x469981(0x46c)]();for(const _0x4d81bc of _0x3d5051){_0x4d81bc['message4']&&(this['push'](_0x469981(0x51f)),this[_0x469981(0x7d2)](_0x469981(0x617)),this[_0x469981(0x7d2)](_0x469981(0x332),_0x4d81bc[_0x469981(0x24a)]['format'](_0x1ab946[_0x469981(0x6f3)]())),this[_0x469981(0x7d2)]('wait'));}},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x331)]=function(_0x295c05){const _0x1c2688=_0x2832c8,_0x4e17b8=VisuMZ['BattleCore'][_0x1c2688(0x6e8)][_0x1c2688(0x54b)],_0x1508ef=_0x295c05[_0x1c2688(0x64a)]();if(_0x4e17b8['ShowAddedBuff'])this[_0x1c2688(0x5d3)](_0x295c05,_0x1508ef[_0x1c2688(0x7b4)],TextManager[_0x1c2688(0x458)]);if(_0x4e17b8[_0x1c2688(0x35e)])this[_0x1c2688(0x5d3)](_0x295c05,_0x1508ef[_0x1c2688(0x3e1)],TextManager['debuffAdd']);if(_0x4e17b8[_0x1c2688(0x268)])this['displayBuffs'](_0x295c05,_0x1508ef['removedBuffs'],TextManager['buffRemove']);},Window_BattleLog[_0x2832c8(0x749)]['displayBuffs']=function(_0x513640,_0x1a9cf4,_0x101745){const _0x467302=_0x2832c8;for(const _0x479d5e of _0x1a9cf4){const _0x44ea37=_0x101745['format'](_0x513640['name'](),TextManager[_0x467302(0x764)](_0x479d5e));this[_0x467302(0x7d2)](_0x467302(0x51f)),this['push'](_0x467302(0x617)),this[_0x467302(0x7d2)]('addText',_0x44ea37),this[_0x467302(0x7d2)]('wait');}},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x570)]=Window_BattleLog['prototype'][_0x2832c8(0x890)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x890)]=function(){const _0x1a0780=_0x2832c8;VisuMZ[_0x1a0780(0x282)][_0x1a0780(0x570)]['call'](this),this[_0x1a0780(0x6aa)]();},VisuMZ['BattleCore'][_0x2832c8(0x88d)]=Window_BattleLog['prototype'][_0x2832c8(0x617)],Window_BattleLog[_0x2832c8(0x749)]['pushBaseLine']=function(){const _0x21d1d=_0x2832c8;VisuMZ[_0x21d1d(0x282)][_0x21d1d(0x88d)][_0x21d1d(0x3c8)](this),this[_0x21d1d(0x6aa)]();},VisuMZ['BattleCore'][_0x2832c8(0x551)]=Window_BattleLog['prototype'][_0x2832c8(0x51f)],Window_BattleLog['prototype'][_0x2832c8(0x51f)]=function(){const _0x5b142b=_0x2832c8;VisuMZ['BattleCore'][_0x5b142b(0x551)]['call'](this),this[_0x5b142b(0x7d0)](),this[_0x5b142b(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x1ad)]=Window_BattleLog['prototype'][_0x2832c8(0x22b)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x22b)]=function(_0x1abd96){const _0x7d14b3=_0x2832c8;VisuMZ['BattleCore'][_0x7d14b3(0x1ad)][_0x7d14b3(0x3c8)](this,_0x1abd96),this[_0x7d14b3(0x6aa)]();},Window_BattleLog[_0x2832c8(0x749)]['waitForNewLine']=function(){const _0x2f9875=_0x2832c8;let _0xecf7b3=0x0;this[_0x2f9875(0x46a)][_0x2f9875(0x720)]>0x0&&(_0xecf7b3=this[_0x2f9875(0x46a)][this[_0x2f9875(0x46a)][_0x2f9875(0x720)]-0x1]),this['_lines']['length']>_0xecf7b3?this[_0x2f9875(0x321)]():this[_0x2f9875(0x6aa)]();},VisuMZ['BattleCore']['Window_BattleLog_performActionStart']=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x612)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x612)]=function(_0x56aaa7,_0xc7b7df){const _0x5d30da=_0x2832c8;VisuMZ[_0x5d30da(0x282)][_0x5d30da(0x51e)][_0x5d30da(0x3c8)](this,_0x56aaa7,_0xc7b7df),this[_0x5d30da(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x34c)]=Window_BattleLog['prototype'][_0x2832c8(0x1c5)],Window_BattleLog[_0x2832c8(0x749)]['performAction']=function(_0x303602,_0x470189){const _0x3c4005=_0x2832c8;VisuMZ[_0x3c4005(0x282)]['Window_BattleLog_performAction'][_0x3c4005(0x3c8)](this,_0x303602,_0x470189),this[_0x3c4005(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x344)]=Window_BattleLog['prototype'][_0x2832c8(0x3c5)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x3c5)]=function(_0x3af542){const _0x288627=_0x2832c8;VisuMZ[_0x288627(0x282)][_0x288627(0x344)]['call'](this,_0x3af542);for(const _0xadb3b7 of BattleManager[_0x288627(0x3ef)]()){if(!_0xadb3b7)continue;if(_0xadb3b7[_0x288627(0x7d5)]())continue;_0xadb3b7[_0x288627(0x500)]();}this[_0x288627(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x69e)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x86c)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x86c)]=function(_0x10f2c7){const _0x3e3781=_0x2832c8;VisuMZ[_0x3e3781(0x282)][_0x3e3781(0x69e)]['call'](this,_0x10f2c7),this[_0x3e3781(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x7b7)]=Window_BattleLog['prototype']['performMiss'],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x80c)]=function(_0x109042){const _0x446093=_0x2832c8;VisuMZ['BattleCore']['Window_BattleLog_performMiss']['call'](this,_0x109042),this[_0x446093(0x6aa)]();},VisuMZ['BattleCore']['Window_BattleLog_performRecovery']=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x6d9)],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x6d9)]=function(_0x4a730d){const _0x415868=_0x2832c8;VisuMZ['BattleCore'][_0x415868(0x61e)][_0x415868(0x3c8)](this,_0x4a730d),this[_0x415868(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x8e9)]=Window_BattleLog['prototype']['performEvasion'],Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x4e4)]=function(_0x4d7656){const _0x59457e=_0x2832c8;VisuMZ[_0x59457e(0x282)]['Window_BattleLog_performEvasion'][_0x59457e(0x3c8)](this,_0x4d7656),this[_0x59457e(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x604)]=Window_BattleLog[_0x2832c8(0x749)]['performMagicEvasion'],Window_BattleLog[_0x2832c8(0x749)]['performMagicEvasion']=function(_0x36f179){const _0x38cfa8=_0x2832c8;VisuMZ[_0x38cfa8(0x282)][_0x38cfa8(0x604)]['call'](this,_0x36f179),this['callNextMethod']();},VisuMZ['BattleCore'][_0x2832c8(0x20c)]=Window_BattleLog['prototype'][_0x2832c8(0x7b6)],Window_BattleLog[_0x2832c8(0x749)]['performCounter']=function(_0x55011e){const _0x12a9c1=_0x2832c8;VisuMZ[_0x12a9c1(0x282)][_0x12a9c1(0x20c)][_0x12a9c1(0x3c8)](this,_0x55011e),this[_0x12a9c1(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x3e4)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x63b)],Window_BattleLog[_0x2832c8(0x749)]['performReflection']=function(_0x3164f0){const _0x53dfca=_0x2832c8;VisuMZ[_0x53dfca(0x282)]['Window_BattleLog_performReflection'][_0x53dfca(0x3c8)](this,_0x3164f0),this['callNextMethod']();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x50d)]=Window_BattleLog[_0x2832c8(0x749)]['performSubstitute'],Window_BattleLog['prototype']['performSubstitute']=function(_0x1a83ae,_0x580f98){const _0x32a5ef=_0x2832c8;VisuMZ['BattleCore'][_0x32a5ef(0x50d)][_0x32a5ef(0x3c8)](this,_0x1a83ae,_0x580f98),this[_0x32a5ef(0x6aa)]();},VisuMZ[_0x2832c8(0x282)][_0x2832c8(0x795)]=Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x428)],Window_BattleLog['prototype'][_0x2832c8(0x428)]=function(_0xdf799b){const _0x510af7=_0x2832c8;VisuMZ[_0x510af7(0x282)]['Window_BattleLog_performCollapse'][_0x510af7(0x3c8)](this,_0xdf799b),this[_0x510af7(0x6aa)]();},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x833)]=function(_0x2c0a9e,_0x2134d7){const _0x70efc8=_0x2832c8;_0x2c0a9e[_0x70efc8(0x833)](_0x2134d7),this['callNextMethod']();},Window_BattleLog[_0x2832c8(0x749)]['showEnemyAttackAnimation']=function(_0x9e41fa,_0x3fe3af){const _0x5b68b2=_0x2832c8,_0x568979=_0x9e41fa[_0x5b68b2(0x6ad)]();_0x568979<=0x0?SoundManager['playEnemyAttack']():this[_0x5b68b2(0x72f)](_0x3fe3af,_0x568979);},Window_BattleLog[_0x2832c8(0x749)]['applyImmortal']=function(_0x43f22c,_0x9ec1a5,_0x1d1ea2){const _0x3b0ca6=_0x2832c8,_0x23d6b9=[_0x43f22c][_0x3b0ca6(0x2df)](_0x9ec1a5);for(const _0x243700 of _0x23d6b9){if(!_0x243700)continue;_0x243700[_0x3b0ca6(0x3f5)](_0x1d1ea2);}this[_0x3b0ca6(0x6aa)]();},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x6a6)]=function(_0x12db47){this['_waitCount']=_0x12db47;},Window_BattleLog['prototype'][_0x2832c8(0x613)]=function(_0x2c5357,_0x5e9cdc){const _0x5377d1=_0x2832c8;for(const _0x37dcaf of _0x2c5357){if(!_0x37dcaf)continue;_0x37dcaf[_0x5377d1(0x613)](_0x5e9cdc);}this['callNextMethod']();},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x65e)]=function(_0x45dccc,_0x515fdd,_0x27ae00,_0x104cb3,_0x19921e,_0x1fbfd7){const _0x1be9fe=_0x2832c8;_0x45dccc[_0x1be9fe(0x526)](_0x515fdd,_0x27ae00,_0x104cb3,_0x19921e,_0x1fbfd7,-0x1),this['callNextMethod']();},Window_BattleLog['prototype'][_0x2832c8(0x60e)]=function(_0x1afbff,_0x58b81a,_0x23bb9d,_0x142e13,_0x4619e5,_0x394d9e,_0x538b10){const _0x5046b5=_0x2832c8,_0x1608c4=Math[_0x5046b5(0x609)](..._0x58b81a['map'](_0x680b3c=>_0x680b3c[_0x5046b5(0x5b5)]()['_baseX']-_0x680b3c[_0x5046b5(0x5b5)]()[_0x5046b5(0x1be)]()/0x2)),_0x1d1efa=Math['max'](..._0x58b81a[_0x5046b5(0x8b3)](_0x1cb8f4=>_0x1cb8f4['battler']()[_0x5046b5(0x4b3)]+_0x1cb8f4['battler']()['mainSpriteWidth']()/0x2)),_0xe284e5=Math[_0x5046b5(0x609)](..._0x58b81a[_0x5046b5(0x8b3)](_0xdc56ce=>_0xdc56ce[_0x5046b5(0x5b5)]()[_0x5046b5(0x8d3)]-_0xdc56ce[_0x5046b5(0x5b5)]()[_0x5046b5(0x2d2)]())),_0x272c73=Math[_0x5046b5(0x871)](..._0x58b81a[_0x5046b5(0x8b3)](_0xf52993=>_0xf52993[_0x5046b5(0x5b5)]()['_baseY'])),_0x32c9a6=_0x58b81a['filter'](_0x113ee3=>_0x113ee3[_0x5046b5(0x44c)]())[_0x5046b5(0x720)],_0x2049bb=_0x58b81a[_0x5046b5(0x28c)](_0x52eb59=>_0x52eb59[_0x5046b5(0x2a2)]())[_0x5046b5(0x720)];let _0x41eaee=0x0,_0x165030=0x0;if(_0x23bb9d[_0x5046b5(0x6f0)](/front/i))_0x41eaee=_0x32c9a6>=_0x2049bb?_0x1608c4:_0x1d1efa;else{if(_0x23bb9d[_0x5046b5(0x6f0)](/middle/i))_0x41eaee=(_0x1608c4+_0x1d1efa)/0x2,_0x538b10=-0x1;else _0x23bb9d['match'](/back/i)&&(_0x41eaee=_0x32c9a6>=_0x2049bb?_0x1d1efa:_0x1608c4);}if(_0x23bb9d['match'](/head/i))_0x165030=_0xe284e5;else{if(_0x23bb9d[_0x5046b5(0x6f0)](/center/i))_0x165030=(_0xe284e5+_0x272c73)/0x2;else _0x23bb9d[_0x5046b5(0x6f0)](/base/i)&&(_0x165030=_0x272c73);}_0x1afbff[_0x5046b5(0x526)](_0x41eaee,_0x165030,_0x142e13,_0x4619e5,_0x394d9e,_0x538b10),this[_0x5046b5(0x6aa)]();},Window_BattleLog[_0x2832c8(0x749)][_0x2832c8(0x5f3)]=function(_0x377324,_0x35f590,_0x5d7588){const _0x1487a5=_0x2832c8;for(const _0x4770f4 of _0x377324){if(!_0x4770f4)continue;_0x4770f4[_0x1487a5(0x2bd)](_0x35f590,_0x5d7588);}this[_0x1487a5(0x6aa)]();};