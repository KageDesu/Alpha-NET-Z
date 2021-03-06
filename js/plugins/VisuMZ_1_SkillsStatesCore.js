//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.10] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x3d2b=['adjustItemWidthByShopStatus','length','ShowData','updateCommandNameWindow','isAlive','right','helpAreaHeight','removeState','Game_Action_applyItemUserEffect','skillTypeWindowRect','Game_BattlerBase_decreaseBuff','applyStateCategoryRemovalEffects','applyDebuffTurnManipulationEffects','ceil','resetStateCounts','canClearState','stateExpireJS','onExpireBuffGlobalJS','_costSettings','Sprite_Gauge_gaugeRate','_skills','CoreEngine','onExpireState','resetFontSettings','Game_Battler_regenerateAll','checkShowHideBattleNotetags','Window_SkillList_setActor','applySkillsStatesCoreEffects','getStypeIdWithName','removeBuff','regenerateAll','getColorDataFromPluginParameters','iconWidth','buffColor','refresh','HiddenSkillTypes','Settings','Game_Actor_forgetSkill','getStateOriginByKey','onEraseBuff','Sprite_StateIcon_updateFrame','itemWindowRectSkillsStatesCore','log','Window_StatusBase_placeGauge','removeStatesAuto','ignore','shopStatusWindowRectSkillsStatesCore','frameCount','CanPayJS','test','skill','gradientFillRect','EnableLayout','round','ReapplyRules','Game_BattlerBase_clearStates','isCommandEnabled','onAddBuffJS','innerWidth','onAddStateGlobalJS','states','learnSkill','item','changePaintOpacity','Game_Unit_isAllDead','replace','toUpperCase','DataOffsetX','includes','isDebuffAffected','MultiplierJS','width','itemWindowRect','getStateReapplyRulings','#%1','onEraseStateGlobalJS','3025aUWJWZ','Game_Actor_learnSkill','outlineColor','anchor','ARRAYFUNC','ListWindowCols','index','usableSkills','itemAt','onDatabaseLoaded','makeCurrentTroopUniqueID','meetsPassiveStateConditionSwitches','isPassiveStateStackable','stateEraseJS','Name','maxSlipDamage','Game_BattlerBase_refresh','getStateOrigin','_stateRetainType','SkillSceneStatusBgType','iconIndex','MaxTurns','LUK','NUM','Window_SkillList_updateHelp','VisuMZ_0_CoreEngine','SkillsStatesCore','drawSkillCost','commandNameWindowDrawBackground','stateAddJS','isBottomHelpMode','makeAdditionalSkillCostText','number','gainMp','_scene','actor','_skillTypeWindow','_buffs','gainSilentTp','onRemoveState','buffLength','helpWindowRect','makeCommandList','BattleManager_endAction','skillVisibleJS','States','convertPassiveStates','categories','skillCostSeparator','Game_BattlerBase_initMembers','meetsSkillConditions','paramBuffRate','includesSkillsStatesCore','commandNameWindowDrawText','exit','ColorBuff','mpCost','indexOf','isStateExpired','Game_Battler_addDebuff','autoRemovalTiming','totalStateCategoryAffected','meetsSkillConditionsGlobalJS','5frAhxe','_stypeId','Game_Troop_setup','Window_StatusBase_drawActorIcons','filter','isMaxDebuffAffected','clearStatesWithStateRetain','itemTextAlign','heal','stateMpSlipDamageJS','colSpacing','checkShowHideSkillNotetags','auto','Game_Actor_skillTypes','iconHeight','debuffColor','process_VisuMZ_SkillsStatesCore_State_Notetags','AGI','totalStateCategory','setBuffTurns','onExpireBuffJS','Game_BattlerBase_overwriteBuffTurns','removeStatesByCategoryAll','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','addPassiveStatesFromOtherPlugins','applyStateTurnManipulationEffects','enemy','ParseSkillNotetags','Sprite_Gauge_setup','setStateDisplay','innerHeight','checkShowHideNotetags','Scene_Skill_helpWindowRect','boxWidth','meetsPassiveStateConditionClasses','drawText','STRUCT','setActor','PayJS','_currentActor','Param','skillTpCost','clearStates','Game_BattlerBase_recoverAll','stateMpSlipHealJS','ARRAYJSON','initMembersSkillsStatesCore','DisplayedParams','setPassiveStateSlipDamageJS','DataOffsetY','onExpireDebuffJS','parameters','loadBitmap','getStateRetainType','JSON','onEraseDebuffJS','_states','clearStateOrigin','onExpireStateCustomJS','shopStatusWindowRect','eraseBuff','addPassiveStatesByNotetag','statesByCategory','_classIDs','format','ShowJS','TurnOffsetX','ParseStateNotetags','Skills','isUseModernControls','isGroupDefeatStateAffected','_itemWindow','drawActorIcons','ActionEndUpdate','ARRAYNUM','prototype','statusWindowRectSkillsStatesCore','NEGATIVE','getClassIdWithName','buff','maxItems','getCurrentStateOriginKey','currentValue','name','statePassiveConditionJS','CmdStyle','_shopStatusWindow','passiveStates','Game_BattlerBase_resetStateCounts','stateData','Parse_Notetags_State_SlipEffectJS','stateTpSlipHealJS','Parse_Notetags_State_Category','EVAL','_turnDisplaySprite','setStateOrigin','version','54431dwxPoO','MDF','buttonAssistText1','convertGaugeTypeSkillsStatesCore','clamp','isBuffExpired','max','_battler','applyItemUserEffect','Enemy','IconStypeMagic','StackBuffMax','_stateDisplay','shopStatusWidth','recover\x20all','_stored_buffColor','addDebuff','drawActorBuffTurns','map','canUse','ALL','isRightInputMode','slipHp','center','Scene_Skill_statusWindowRect','stateTurns','_subject','fillRect','_statusWindow','meetsPassiveStateConditions','sort','constructor','TurnOffsetY','Window_SkillStatus_refresh','uiMenuStyle','placeExactGauge','getStateIdWithName','Game_BattlerBase_eraseState','gaugeRate','_skillIDs','drawActorBuffRates','commandStyle','statusWindowRect','addState','Scene_Skill_createItemWindow','onEraseStateJS','_buffTurns','_colorCache','Scene_Boot_onDatabaseLoaded','skillEnableJS','Buffs','SkillMenuStatusRect','Game_BattlerBase_states','_stateIDs','setupSkillsStatesCore','stateId','greater','onAddDebuffGlobalJS','helpWindowRectSkillsStatesCore','skillMpCost','MAXMP','TextJS','_categoryWindow','text','keys','addPassiveStatesTraitSets','parse','clearStateDisplay','actions','VisuMZ_1_MainMenuCore','Parse_Notetags_State_ApplyRemoveLeaveJS','isStateAffected','helpAreaTop','clearStateRetainType','bitmap','slipTp','lineHeight','allowCreateShopStatusWindow','endAction','normalColor','setStateTurns','Window_SkillList_includes','menuActor','onAddDebuff','setStateData','getStateData','textColor','untitled','stateTpSlipDamageJS','isBuffOrDebuffAffected','onExpireStateJS','addDebuffTurns','success','TurnFontSize','drawItemStyleIcon','onEraseDebuff','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','createItemWindow','createCommandNameWindow','getColor','238237uDvuek','PassiveStates','PassiveConditionJS','onEraseBuffGlobalJS','onRegenerateCustomStateDamageOverTime','Parse_Notetags_State_PassiveJS','stateColor','increaseBuff','onAddStateCustomJS','overwriteBuffTurns','inBattle','priority','addPassiveStatesByPluginParameters','icon','Sprite_Gauge_currentMaxValue','stateMaximumTurns','_stored_debuffColor','actorId','concat','buffTurns','recoverAll','DataFontSize','Costs','clearStateData','isStateResist','POSITIVE','useDigitGrouping','_cache','skills','ATK','157xsNXms','_stateTurns','Sprite_Gauge_currentValue','calcWindowHeight','getCurrentTroopUniqueID','VisuMZ_1_ElementStatusCore','maxCols','setStypeId','updateTurnDisplaySprite','stateHpSlipHealJS','skillTypeWindowRectSkillsStatesCore','CalcJS','uiHelpPosition','textSizeEx','onEraseStateCustomJS','remove','updateStateTurns','Sprite_StateIcon_loadBitmap','updateHelp','canPaySkillCost','mainAreaTop','ShowTurns','Global','description','statusWidth','VisuMZ_1_ItemsEquipsCore','death','478296yiOyVc','VisuMZ_2_ClassChangeSystem','_stateMaxTurns','setStatusWindow','fontSize','note','updatedLayoutStyle','drawActorStateTurns','changeOutlineColor','Game_BattlerBase_skillMpCost','callUpdateHelp','Game_BattlerBase_meetsSkillConditions','ParseClassIDs','addStateTurns','convertTargetToStateOriginKey','opacity','ANY','redrawSkillsStatesCore','Scene_Skill_skillTypeWindowRect','onExpireDebuffGlobalJS','setItem','match','Game_BattlerBase_buffIconIndex','meetsSkillConditionsEnableJS','setBackgroundType','drawActorStateData','_commandNameWindow','isActor','_result','getSkillIdWithName','Game_BattlerBase_skillTpCost','onAddStateMakeCustomSlipValues','STR','213453QsSJnb','Game_BattlerBase_die','drawExtendedParameter','contents','isStateRemoved','meetsPassiveStateGlobalConditionJS','commandName','damage','groupDefeat','ARRAYEVAL','toLowerCase','checkCacheKey','checkSkillTypeMatch','push','%1%','user','createAllSkillCostText','trim','forgetSkill','updateFrame','SkillConditionJS','changeTextColor','checkShowHideSwitchNotetags','makeSuccess','%1\x20%2\x20%3','skillTypes','isLearnedSkill','createSkillCostText','currentValueSkillsStatesCore','split','_stateOrigin','clear','onEraseDebuffGlobalJS','mainAreaHeight','buttonAssistSwitch','\x5cI[%1]%2','addChild','stateHpSlipDamageJS','placeGauge','804677bdEAPX','_actor','currentClass','passiveStateObjects','height','active','addBuffTurns','itemLineRect','onAddStateJS','addBuff','<member-%1>','setDebuffTurns','checkSkillConditionsNotetags','meetsStateCondition','skillId','getSkillTypes','onAddBuff','drawItem','isStateAddable','initialize','retrieveStateColor','commandStyleCheck','createTurnDisplaySprite','Parse_Notetags_Skill_Cost','onExpireDebuff','paramValueByName','555680RvRJSf','isBuffAffected','mainFontFace','redraw','Game_Battler_addState','onEraseBuffJS','Window_SkillList_maxCols','fontBold','BattleHiddenSkillTypes','ColorNegative','getStateDisplay','SkillSceneAdjustSkillList','regenerateAllSkillsStatesCore','drawTextEx','isMaxBuffAffected','ColorNeutral','_stateData','call','rgba(0,\x200,\x200,\x201)','_currentTroopUniqueID','Scene_Skill_itemWindowRect','process_VisuMZ_SkillsStatesCore_Skill_Notetags','floor','meetsPassiveStateConditionJS','resetTextColor','hasState','drawItemStyleIconText','Game_BattlerBase_eraseBuff','Sprite_Gauge_redraw','iconText','die','aliveMembers','setup','isSkillUsableForAutoBattle','<troop-%1>','hasSkill','slipMp','_stypeIDs','onAddState','none','<enemy-%1>','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','state','isUseSkillsStatesCoreUpdatedLayout','buffIconIndex','shift','GaugeMaxJS','getCurrentStateActiveUser','ConvertParams','setStateRetainType','status','eraseState','value','isSkillCostShown','onAddBuffGlobalJS','onExpireBuff','MAT','currentDisplayedValue','isPlaytest','removeStatesByCategory','stypeId','onExpireStateGlobalJS','magicSkills','mainCommandWidth','multiclasses','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isAllDead','_animationIndex','updateStatesActionEnd','add','initMembers','Game_Battler_addBuff','isPartyAllAffectedByGroupDefeatStates','isStateCategoryAffected','Window_SkillType_initialize','Parse_Notetags_Skill_JS'];const _0x2a68=function(_0x248196,_0x2f23cd){_0x248196=_0x248196-0x16c;let _0x3d2b6a=_0x3d2b[_0x248196];return _0x3d2b6a;};const _0x19e25e=_0x2a68;(function(_0x5591b0,_0x2c877e){const _0x5a102a=_0x2a68;while(!![]){try{const _0x444c8e=parseInt(_0x5a102a(0x30e))+parseInt(_0x5a102a(0x20a))*-parseInt(_0x5a102a(0x32c))+-parseInt(_0x5a102a(0x172))+-parseInt(_0x5a102a(0x249))*parseInt(_0x5a102a(0x2aa))+parseInt(_0x5a102a(0x347))+parseInt(_0x5a102a(0x368))+parseInt(_0x5a102a(0x38f));if(_0x444c8e===_0x2c877e)break;else _0x5591b0['push'](_0x5591b0['shift']());}catch(_0x11070f){_0x5591b0['push'](_0x5591b0['shift']());}}}(_0x3d2b,0x6971f));var label=_0x19e25e(0x224),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x19e25e(0x24d)](function(_0x1fc37d){const _0x2ff34a=_0x19e25e;return _0x1fc37d[_0x2ff34a(0x1a4)]&&_0x1fc37d[_0x2ff34a(0x343)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x19e25e(0x1e2)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x19e25e(0x1a2)]=function(_0xec67f,_0x141a3d){const _0x2a0873=_0x19e25e;for(const _0x1b26fa in _0x141a3d){if(_0x1b26fa[_0x2a0873(0x35c)](/(.*):(.*)/i)){const _0x2db17c=String(RegExp['$1']),_0x492cdd=String(RegExp['$2'])[_0x2a0873(0x200)]()[_0x2a0873(0x379)]();let _0x4158e3,_0x1c7bc3,_0x159b4b;switch(_0x492cdd){case _0x2a0873(0x221):_0x4158e3=_0x141a3d[_0x1b26fa]!==''?Number(_0x141a3d[_0x1b26fa]):0x0;break;case _0x2a0873(0x293):_0x1c7bc3=_0x141a3d[_0x1b26fa]!==''?JSON['parse'](_0x141a3d[_0x1b26fa]):[],_0x4158e3=_0x1c7bc3[_0x2a0873(0x2bc)](_0x2e4e20=>Number(_0x2e4e20));break;case _0x2a0873(0x2a6):_0x4158e3=_0x141a3d[_0x1b26fa]!==''?eval(_0x141a3d[_0x1b26fa]):null;break;case _0x2a0873(0x371):_0x1c7bc3=_0x141a3d[_0x1b26fa]!==''?JSON[_0x2a0873(0x2ec)](_0x141a3d[_0x1b26fa]):[],_0x4158e3=_0x1c7bc3['map'](_0x479890=>eval(_0x479890));break;case _0x2a0873(0x27f):_0x4158e3=_0x141a3d[_0x1b26fa]!==''?JSON['parse'](_0x141a3d[_0x1b26fa]):'';break;case _0x2a0873(0x276):_0x1c7bc3=_0x141a3d[_0x1b26fa]!==''?JSON[_0x2a0873(0x2ec)](_0x141a3d[_0x1b26fa]):[],_0x4158e3=_0x1c7bc3['map'](_0x429b60=>JSON[_0x2a0873(0x2ec)](_0x429b60));break;case'FUNC':_0x4158e3=_0x141a3d[_0x1b26fa]!==''?new Function(JSON['parse'](_0x141a3d[_0x1b26fa])):new Function('return\x200');break;case _0x2a0873(0x20e):_0x1c7bc3=_0x141a3d[_0x1b26fa]!==''?JSON[_0x2a0873(0x2ec)](_0x141a3d[_0x1b26fa]):[],_0x4158e3=_0x1c7bc3[_0x2a0873(0x2bc)](_0x429450=>new Function(JSON[_0x2a0873(0x2ec)](_0x429450)));break;case _0x2a0873(0x367):_0x4158e3=_0x141a3d[_0x1b26fa]!==''?String(_0x141a3d[_0x1b26fa]):'';break;case'ARRAYSTR':_0x1c7bc3=_0x141a3d[_0x1b26fa]!==''?JSON[_0x2a0873(0x2ec)](_0x141a3d[_0x1b26fa]):[],_0x4158e3=_0x1c7bc3[_0x2a0873(0x2bc)](_0x1cb479=>String(_0x1cb479));break;case _0x2a0873(0x26d):_0x159b4b=_0x141a3d[_0x1b26fa]!==''?JSON[_0x2a0873(0x2ec)](_0x141a3d[_0x1b26fa]):{},_0xec67f[_0x2db17c]={},VisuMZ[_0x2a0873(0x1a2)](_0xec67f[_0x2db17c],_0x159b4b);continue;case'ARRAYSTRUCT':_0x1c7bc3=_0x141a3d[_0x1b26fa]!==''?JSON[_0x2a0873(0x2ec)](_0x141a3d[_0x1b26fa]):[],_0x4158e3=_0x1c7bc3[_0x2a0873(0x2bc)](_0x18542d=>VisuMZ[_0x2a0873(0x1a2)]({},JSON['parse'](_0x18542d)));break;default:continue;}_0xec67f[_0x2db17c]=_0x4158e3;}}return _0xec67f;},(_0x522ab7=>{const _0x3682ca=_0x19e25e,_0x99f8d4=_0x522ab7['name'];for(const _0x265ea2 of dependencies){if(!Imported[_0x265ea2]){alert(_0x3682ca(0x1b3)[_0x3682ca(0x289)](_0x99f8d4,_0x265ea2)),SceneManager['exit']();break;}}const _0x5085d3=_0x522ab7['description'];if(_0x5085d3[_0x3682ca(0x35c)](/\[Version[ ](.*?)\]/i)){const _0xa6a5e4=Number(RegExp['$1']);_0xa6a5e4!==VisuMZ[label][_0x3682ca(0x2a9)]&&(alert(_0x3682ca(0x260)[_0x3682ca(0x289)](_0x99f8d4,_0xa6a5e4)),SceneManager[_0x3682ca(0x240)]());}if(_0x5085d3['match'](/\[Tier[ ](\d+)\]/i)){const _0x3ed918=Number(RegExp['$1']);_0x3ed918<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x99f8d4,_0x3ed918,tier)),SceneManager['exit']()):tier=Math['max'](_0x3ed918,tier);}VisuMZ[_0x3682ca(0x1a2)](VisuMZ[label][_0x3682ca(0x1e2)],_0x522ab7[_0x3682ca(0x27c)]);})(pluginData),VisuMZ[_0x19e25e(0x224)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x19e25e(0x213)],Scene_Boot[_0x19e25e(0x294)][_0x19e25e(0x213)]=function(){const _0x2ad7db=_0x19e25e;VisuMZ[_0x2ad7db(0x224)][_0x2ad7db(0x2da)][_0x2ad7db(0x183)](this),this['process_VisuMZ_SkillsStatesCore_Notetags']();},Scene_Boot[_0x19e25e(0x294)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x274631=_0x19e25e;if(VisuMZ['ParseAllNotetags'])return;this[_0x274631(0x187)](),this[_0x274631(0x259)]();},Scene_Boot['prototype'][_0x19e25e(0x187)]=function(){const _0x3beb57=_0x19e25e;for(const _0xc4b77e of $dataSkills){if(!_0xc4b77e)continue;VisuMZ[_0x3beb57(0x224)]['Parse_Notetags_Skill_Cost'](_0xc4b77e),VisuMZ[_0x3beb57(0x224)][_0x3beb57(0x1bd)](_0xc4b77e);}},Scene_Boot[_0x19e25e(0x294)][_0x19e25e(0x259)]=function(){const _0x2b152d=_0x19e25e;for(const _0x359991 of $dataStates){if(!_0x359991)continue;VisuMZ[_0x2b152d(0x224)]['Parse_Notetags_State_Category'](_0x359991),VisuMZ[_0x2b152d(0x224)][_0x2b152d(0x313)](_0x359991),VisuMZ[_0x2b152d(0x224)][_0x2b152d(0x2a3)](_0x359991),VisuMZ[_0x2b152d(0x224)][_0x2b152d(0x2f0)](_0x359991);}},VisuMZ[_0x19e25e(0x224)]['ParseSkillNotetags']=VisuMZ[_0x19e25e(0x264)],VisuMZ[_0x19e25e(0x264)]=function(_0x539b6e){const _0x50c9f0=_0x19e25e;VisuMZ[_0x50c9f0(0x224)]['ParseSkillNotetags']['call'](this,_0x539b6e),VisuMZ['SkillsStatesCore'][_0x50c9f0(0x16f)](_0x539b6e),VisuMZ[_0x50c9f0(0x224)][_0x50c9f0(0x1bd)](_0x539b6e);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x28c)]=VisuMZ[_0x19e25e(0x28c)],VisuMZ[_0x19e25e(0x28c)]=function(_0x1fe997){const _0x40b8e3=_0x19e25e;VisuMZ[_0x40b8e3(0x224)][_0x40b8e3(0x28c)]['call'](this,_0x1fe997),VisuMZ[_0x40b8e3(0x224)]['Parse_Notetags_State_Category'](_0x1fe997),VisuMZ[_0x40b8e3(0x224)][_0x40b8e3(0x313)](_0x1fe997),VisuMZ[_0x40b8e3(0x224)][_0x40b8e3(0x2a3)](_0x1fe997),VisuMZ[_0x40b8e3(0x224)][_0x40b8e3(0x2f0)](_0x1fe997);},VisuMZ[_0x19e25e(0x224)]['Parse_Notetags_Skill_Cost']=function(_0x36caa9){const _0x11c7cc=_0x19e25e,_0x127ebe=_0x36caa9[_0x11c7cc(0x34c)];_0x127ebe['match'](/<MP COST:[ ](\d+)>/i)&&(_0x36caa9[_0x11c7cc(0x242)]=Number(RegExp['$1'])),_0x127ebe['match'](/<TP COST:[ ](\d+)>/i)&&(_0x36caa9['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x19e25e(0x224)]['skillEnableJS']={},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x236)]={},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x1bd)]=function(_0x4abafb){const _0x2606bd=_0x19e25e,_0x42a548=_0x4abafb[_0x2606bd(0x34c)];if(_0x42a548['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x5a6456=String(RegExp['$1']),_0xda10c4=_0x2606bd(0x19b)[_0x2606bd(0x289)](_0x5a6456);VisuMZ[_0x2606bd(0x224)][_0x2606bd(0x2db)][_0x4abafb['id']]=new Function(_0x2606bd(0x1f0),_0xda10c4);}if(_0x42a548[_0x2606bd(0x35c)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x123787=String(RegExp['$1']),_0x51ad94='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2606bd(0x289)](_0x123787);VisuMZ[_0x2606bd(0x224)][_0x2606bd(0x236)][_0x4abafb['id']]=new Function(_0x2606bd(0x1f0),_0x51ad94);}},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x2a5)]=function(_0x40003e){const _0x631751=_0x19e25e;_0x40003e[_0x631751(0x239)]=[_0x631751(0x2be),_0x631751(0x357)];const _0xcbe374=_0x40003e[_0x631751(0x34c)],_0xffb7c1=_0xcbe374['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xffb7c1)for(const _0x38066e of _0xffb7c1){_0x38066e[_0x631751(0x35c)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x9e576f=String(RegExp['$1'])[_0x631751(0x200)]()[_0x631751(0x379)]()['split'](',');for(const _0x23d62c of _0x9e576f){_0x40003e[_0x631751(0x239)]['push'](_0x23d62c[_0x631751(0x379)]());}}if(_0xcbe374['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4cd6d4=RegExp['$1'][_0x631751(0x385)](/[\r\n]+/);for(const _0x240eca of _0x4cd6d4){_0x40003e['categories']['push'](_0x240eca[_0x631751(0x200)]()[_0x631751(0x379)]());}}_0xcbe374[_0x631751(0x35c)](/<POSITIVE STATE>/i)&&_0x40003e[_0x631751(0x239)]['push'](_0x631751(0x327)),_0xcbe374[_0x631751(0x35c)](/<NEGATIVE STATE>/i)&&_0x40003e[_0x631751(0x239)][_0x631751(0x375)](_0x631751(0x296));},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x29d)]={},VisuMZ['SkillsStatesCore'][_0x19e25e(0x313)]=function(_0x3daf82){const _0x51f50c=_0x19e25e,_0x5e5c7a=_0x3daf82['note'];if(_0x5e5c7a[_0x51f50c(0x35c)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x52e15b=String(RegExp['$1']),_0x19403e='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x51f50c(0x289)](_0x52e15b);VisuMZ[_0x51f50c(0x224)]['statePassiveConditionJS'][_0x3daf82['id']]=new Function(_0x51f50c(0x19c),_0x19403e);}},VisuMZ[_0x19e25e(0x224)]['stateHpSlipDamageJS']={},VisuMZ['SkillsStatesCore'][_0x19e25e(0x335)]={},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x252)]={},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x275)]={},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x302)]={},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x2a4)]={},VisuMZ[_0x19e25e(0x224)]['Parse_Notetags_State_SlipEffectJS']=function(_0x74f674){const _0x416d01=_0x19e25e,_0x45f9c6=_0x74f674[_0x416d01(0x34c)],_0x168add=_0x416d01(0x30a);if(_0x45f9c6[_0x416d01(0x35c)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x35f8ee=String(RegExp['$1']),_0x51e216=_0x168add['format'](_0x35f8ee,'damage',-0x1,_0x416d01(0x2c0));VisuMZ[_0x416d01(0x224)][_0x416d01(0x38d)][_0x74f674['id']]=new Function(_0x416d01(0x2e1),_0x51e216);}else{if(_0x45f9c6[_0x416d01(0x35c)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x599729=String(RegExp['$1']),_0x4d6f35=_0x168add[_0x416d01(0x289)](_0x599729,'heal',0x1,'slipHp');VisuMZ[_0x416d01(0x224)][_0x416d01(0x335)][_0x74f674['id']]=new Function(_0x416d01(0x2e1),_0x4d6f35);}}if(_0x45f9c6[_0x416d01(0x35c)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x32eb8a=String(RegExp['$1']),_0x47fe90=_0x168add['format'](_0x32eb8a,_0x416d01(0x36f),-0x1,_0x416d01(0x196));VisuMZ['SkillsStatesCore'][_0x416d01(0x252)][_0x74f674['id']]=new Function(_0x416d01(0x2e1),_0x47fe90);}else{if(_0x45f9c6['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x4bf080=String(RegExp['$1']),_0xc7ff26=_0x168add['format'](_0x4bf080,_0x416d01(0x251),0x1,_0x416d01(0x196));VisuMZ[_0x416d01(0x224)][_0x416d01(0x275)][_0x74f674['id']]=new Function(_0x416d01(0x2e1),_0xc7ff26);}}if(_0x45f9c6[_0x416d01(0x35c)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0xf97ad3=String(RegExp['$1']),_0x4ec673=_0x168add[_0x416d01(0x289)](_0xf97ad3,'damage',-0x1,'slipTp');VisuMZ['SkillsStatesCore']['stateTpSlipDamageJS'][_0x74f674['id']]=new Function(_0x416d01(0x2e1),_0x4ec673);}else{if(_0x45f9c6[_0x416d01(0x35c)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x289c18=String(RegExp['$1']),_0x24789d=_0x168add[_0x416d01(0x289)](_0x289c18,_0x416d01(0x251),0x1,_0x416d01(0x2f5));VisuMZ[_0x416d01(0x224)][_0x416d01(0x2a4)][_0x74f674['id']]=new Function(_0x416d01(0x2e1),_0x24789d);}}},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x227)]={},VisuMZ['SkillsStatesCore']['stateEraseJS']={},VisuMZ[_0x19e25e(0x224)]['stateExpireJS']={},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x2f0)]=function(_0x46fd70){const _0x5c8bfa=_0x19e25e,_0x2aa96a=_0x46fd70[_0x5c8bfa(0x34c)],_0x460e17='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x2aa96a['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x4e99b3=String(RegExp['$1']),_0x4cb1ab=_0x460e17['format'](_0x4e99b3);VisuMZ[_0x5c8bfa(0x224)][_0x5c8bfa(0x227)][_0x46fd70['id']]=new Function(_0x5c8bfa(0x2e1),_0x4cb1ab);}if(_0x2aa96a[_0x5c8bfa(0x35c)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x51f7a4=String(RegExp['$1']),_0x168a18=_0x460e17[_0x5c8bfa(0x289)](_0x51f7a4);VisuMZ[_0x5c8bfa(0x224)][_0x5c8bfa(0x217)][_0x46fd70['id']]=new Function(_0x5c8bfa(0x2e1),_0x168a18);}if(_0x2aa96a['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0xeddd49=String(RegExp['$1']),_0x183848=_0x460e17[_0x5c8bfa(0x289)](_0xeddd49);VisuMZ[_0x5c8bfa(0x224)][_0x5c8bfa(0x1ce)][_0x46fd70['id']]=new Function(_0x5c8bfa(0x2e1),_0x183848);}},DataManager[_0x19e25e(0x297)]=function(_0x14009e){const _0xbcb423=_0x19e25e;_0x14009e=_0x14009e['toUpperCase']()['trim'](),this[_0xbcb423(0x288)]=this[_0xbcb423(0x288)]||{};if(this[_0xbcb423(0x288)][_0x14009e])return this['_classIDs'][_0x14009e];for(const _0x1a7ead of $dataClasses){if(!_0x1a7ead)continue;let _0x29b517=_0x1a7ead[_0xbcb423(0x29c)];_0x29b517=_0x29b517[_0xbcb423(0x1ff)](/\x1I\[(\d+)\]/gi,''),_0x29b517=_0x29b517[_0xbcb423(0x1ff)](/\\I\[(\d+)\]/gi,''),this[_0xbcb423(0x288)][_0x29b517[_0xbcb423(0x200)]()[_0xbcb423(0x379)]()]=_0x1a7ead['id'];}return this['_classIDs'][_0x14009e]||0x0;},DataManager[_0x19e25e(0x39e)]=function(_0x3719e1){const _0x20d5a6=_0x19e25e;this[_0x20d5a6(0x197)]=this[_0x20d5a6(0x197)]||{};if(this[_0x20d5a6(0x197)][_0x3719e1['id']])return this[_0x20d5a6(0x197)][_0x3719e1['id']];this['_stypeIDs'][_0x3719e1['id']]=[_0x3719e1[_0x20d5a6(0x1ae)]];if(_0x3719e1[_0x20d5a6(0x34c)][_0x20d5a6(0x35c)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25386a=JSON[_0x20d5a6(0x2ec)]('['+RegExp['$1'][_0x20d5a6(0x35c)](/\d+/g)+']');this[_0x20d5a6(0x197)][_0x3719e1['id']]=this[_0x20d5a6(0x197)][_0x3719e1['id']][_0x20d5a6(0x320)](_0x25386a);}else{if(_0x3719e1[_0x20d5a6(0x34c)][_0x20d5a6(0x35c)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x3352ed=RegExp['$1'][_0x20d5a6(0x385)](',');for(const _0x501b81 of _0x3352ed){const _0x52aef6=DataManager[_0x20d5a6(0x1da)](_0x501b81);if(_0x52aef6)this[_0x20d5a6(0x197)][_0x3719e1['id']][_0x20d5a6(0x375)](_0x52aef6);}}}return this[_0x20d5a6(0x197)][_0x3719e1['id']];},DataManager['getStypeIdWithName']=function(_0x5987c2){const _0x31b78f=_0x19e25e;_0x5987c2=_0x5987c2[_0x31b78f(0x200)]()[_0x31b78f(0x379)](),this[_0x31b78f(0x197)]=this[_0x31b78f(0x197)]||{};if(this['_stypeIDs'][_0x5987c2])return this[_0x31b78f(0x197)][_0x5987c2];for(let _0xcc0183=0x1;_0xcc0183<0x64;_0xcc0183++){if(!$dataSystem[_0x31b78f(0x381)][_0xcc0183])continue;let _0x155203=$dataSystem[_0x31b78f(0x381)][_0xcc0183]['toUpperCase']()[_0x31b78f(0x379)]();_0x155203=_0x155203['replace'](/\x1I\[(\d+)\]/gi,''),_0x155203=_0x155203['replace'](/\\I\[(\d+)\]/gi,''),this[_0x31b78f(0x197)][_0x155203]=_0xcc0183;}return this[_0x31b78f(0x197)][_0x5987c2]||0x0;},DataManager[_0x19e25e(0x364)]=function(_0x4ee732){const _0x2723a5=_0x19e25e;_0x4ee732=_0x4ee732[_0x2723a5(0x200)]()['trim'](),this[_0x2723a5(0x2d1)]=this['_skillIDs']||{};if(this[_0x2723a5(0x2d1)][_0x4ee732])return this['_skillIDs'][_0x4ee732];for(const _0x4b3766 of $dataSkills){if(!_0x4b3766)continue;this[_0x2723a5(0x2d1)][_0x4b3766[_0x2723a5(0x29c)][_0x2723a5(0x200)]()[_0x2723a5(0x379)]()]=_0x4b3766['id'];}return this['_skillIDs'][_0x4ee732]||0x0;},DataManager[_0x19e25e(0x2ce)]=function(_0x4f9eae){const _0x569a85=_0x19e25e;_0x4f9eae=_0x4f9eae[_0x569a85(0x200)]()[_0x569a85(0x379)](),this[_0x569a85(0x2df)]=this[_0x569a85(0x2df)]||{};if(this[_0x569a85(0x2df)][_0x4f9eae])return this[_0x569a85(0x2df)][_0x4f9eae];for(const _0x8bdd17 of $dataStates){if(!_0x8bdd17)continue;this[_0x569a85(0x2df)][_0x8bdd17[_0x569a85(0x29c)][_0x569a85(0x200)]()[_0x569a85(0x379)]()]=_0x8bdd17['id'];}return this['_stateIDs'][_0x4f9eae]||0x0;},DataManager[_0x19e25e(0x31d)]=function(_0x23a252){const _0x34e0d0=_0x19e25e;this[_0x34e0d0(0x349)]=this['_stateMaxTurns']||{};if(this[_0x34e0d0(0x349)][_0x23a252])return this[_0x34e0d0(0x349)][_0x23a252];return $dataStates[_0x23a252][_0x34e0d0(0x34c)][_0x34e0d0(0x35c)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x34e0d0(0x349)][_0x23a252]=Number(RegExp['$1']):this['_stateMaxTurns'][_0x23a252]=VisuMZ[_0x34e0d0(0x224)][_0x34e0d0(0x1e2)][_0x34e0d0(0x237)]['MaxTurns'],this['_stateMaxTurns'][_0x23a252];},ColorManager[_0x19e25e(0x1dd)]=function(_0x2b8e8c,_0x4e1ef9){const _0x1dcca4=_0x19e25e;return _0x4e1ef9=String(_0x4e1ef9),this[_0x1dcca4(0x2d9)]=this['_colorCache']||{},_0x4e1ef9['match'](/#(.*)/i)?this[_0x1dcca4(0x2d9)][_0x2b8e8c]=_0x1dcca4(0x208)['format'](String(RegExp['$1'])):this[_0x1dcca4(0x2d9)][_0x2b8e8c]=this['textColor'](Number(_0x4e1ef9)),this[_0x1dcca4(0x2d9)][_0x2b8e8c];},ColorManager[_0x19e25e(0x30d)]=function(_0xdc304b){const _0x372426=_0x19e25e;return _0xdc304b=String(_0xdc304b),_0xdc304b[_0x372426(0x35c)](/#(.*)/i)?_0x372426(0x208)[_0x372426(0x289)](String(RegExp['$1'])):this[_0x372426(0x300)](Number(_0xdc304b));},ColorManager[_0x19e25e(0x314)]=function(_0x285b45){const _0x53604b=_0x19e25e;if(typeof _0x285b45===_0x53604b(0x22a))_0x285b45=$dataStates[_0x285b45];const _0x28e592='_stored_state-%1-color'['format'](_0x285b45['id']);this[_0x53604b(0x2d9)]=this['_colorCache']||{};if(this[_0x53604b(0x2d9)][_0x28e592])return this[_0x53604b(0x2d9)][_0x28e592];const _0x2a7550=this[_0x53604b(0x16c)](_0x285b45);return this[_0x53604b(0x1dd)](_0x28e592,_0x2a7550);},ColorManager[_0x19e25e(0x16c)]=function(_0x2843dd){const _0x4f2d93=_0x19e25e,_0x2857b5=_0x2843dd['note'];if(_0x2857b5[_0x4f2d93(0x35c)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2857b5[_0x4f2d93(0x35c)](/<POSITIVE STATE>/i))return VisuMZ[_0x4f2d93(0x224)][_0x4f2d93(0x1e2)][_0x4f2d93(0x237)]['ColorPositive'];else return _0x2857b5[_0x4f2d93(0x35c)](/<NEGATIVE STATE>/i)?VisuMZ[_0x4f2d93(0x224)][_0x4f2d93(0x1e2)][_0x4f2d93(0x237)][_0x4f2d93(0x17b)]:VisuMZ[_0x4f2d93(0x224)]['Settings'][_0x4f2d93(0x237)][_0x4f2d93(0x181)];}},ColorManager[_0x19e25e(0x1df)]=function(){const _0x1201b6=_0x19e25e,_0x22c83b=_0x1201b6(0x2b9);this[_0x1201b6(0x2d9)]=this[_0x1201b6(0x2d9)]||{};if(this[_0x1201b6(0x2d9)][_0x22c83b])return this['_colorCache'][_0x22c83b];const _0x341fc1=VisuMZ[_0x1201b6(0x224)][_0x1201b6(0x1e2)]['Buffs'][_0x1201b6(0x241)];return this['getColorDataFromPluginParameters'](_0x22c83b,_0x341fc1);},ColorManager[_0x19e25e(0x258)]=function(){const _0x1d0f72=_0x19e25e,_0x192952=_0x1d0f72(0x31e);this[_0x1d0f72(0x2d9)]=this['_colorCache']||{};if(this['_colorCache'][_0x192952])return this[_0x1d0f72(0x2d9)][_0x192952];const _0x2b1ec7=VisuMZ[_0x1d0f72(0x224)][_0x1d0f72(0x1e2)][_0x1d0f72(0x2dc)]['ColorDebuff'];return this[_0x1d0f72(0x1dd)](_0x192952,_0x2b1ec7);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x235)]=BattleManager['endAction'],BattleManager[_0x19e25e(0x2f8)]=function(){const _0x5efce0=_0x19e25e;this[_0x5efce0(0x1b6)](),VisuMZ[_0x5efce0(0x224)]['BattleManager_endAction']['call'](this);},BattleManager[_0x19e25e(0x1b6)]=function(){const _0x98983a=_0x19e25e,_0x1ff914=VisuMZ[_0x98983a(0x224)]['Settings']['States'];if(!_0x1ff914)return;if(_0x1ff914['ActionEndUpdate']===![])return;if(!this[_0x98983a(0x2c4)])return;this[_0x98983a(0x2c4)][_0x98983a(0x1b6)]();},Game_Battler['prototype'][_0x19e25e(0x1b6)]=function(){const _0x1fe64d=_0x19e25e;for(const _0x370d44 of this[_0x1fe64d(0x281)]){const _0x119b7f=$dataStates[_0x370d44];if(!_0x119b7f)continue;if(_0x119b7f[_0x1fe64d(0x246)]!==0x1)continue;this['_stateTurns'][_0x370d44]>0x0&&this[_0x1fe64d(0x32d)][_0x370d44]--;}this[_0x1fe64d(0x1ea)](0x1);},Game_BattlerBase['prototype'][_0x19e25e(0x33c)]=function(){const _0x2a2413=_0x19e25e,_0x52b230=VisuMZ[_0x2a2413(0x224)][_0x2a2413(0x1e2)][_0x2a2413(0x237)];for(const _0x3b194d of this[_0x2a2413(0x281)]){const _0x8712dc=$dataStates[_0x3b194d];if(_0x52b230&&_0x52b230[_0x2a2413(0x292)]!==![]){if(_0x8712dc&&_0x8712dc[_0x2a2413(0x246)]===0x1)continue;}this[_0x2a2413(0x32d)][_0x3b194d]>0x0&&this[_0x2a2413(0x32d)][_0x3b194d]--;}},VisuMZ[_0x19e25e(0x224)]['Game_Action_applyItemUserEffect']=Game_Action[_0x19e25e(0x294)][_0x19e25e(0x2b2)],Game_Action[_0x19e25e(0x294)][_0x19e25e(0x2b2)]=function(_0x560137){const _0x40c9be=_0x19e25e;VisuMZ[_0x40c9be(0x224)][_0x40c9be(0x1c6)]['call'](this,_0x560137),this['applySkillsStatesCoreEffects'](_0x560137);},Game_Action[_0x19e25e(0x294)][_0x19e25e(0x1d9)]=function(_0x297bbd){const _0x5ee603=_0x19e25e;this[_0x5ee603(0x1c9)](_0x297bbd),this[_0x5ee603(0x262)](_0x297bbd),this['applyBuffTurnManipulationEffects'](_0x297bbd),this[_0x5ee603(0x1ca)](_0x297bbd);},Game_Action[_0x19e25e(0x294)]['applyStateCategoryRemovalEffects']=function(_0x1072f9){const _0x16e03c=_0x19e25e;if(_0x1072f9[_0x16e03c(0x1fa)]()[_0x16e03c(0x1bf)]<=0x0)return;const _0x483da1=this[_0x16e03c(0x1fc)]()['note'];if(_0x483da1[_0x16e03c(0x35c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x2123c9=String(RegExp['$1']);_0x1072f9[_0x16e03c(0x25f)]();}const _0x4c8b05=_0x483da1[_0x16e03c(0x35c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x4c8b05)for(const _0x3c69a7 of _0x4c8b05){_0x3c69a7[_0x16e03c(0x35c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x322508=String(RegExp['$1']),_0x5c125a=Number(RegExp['$2']);_0x1072f9[_0x16e03c(0x1ad)](_0x322508,_0x5c125a);}},Game_Action[_0x19e25e(0x294)][_0x19e25e(0x262)]=function(_0x12c3cd){const _0x2fa7fb=_0x19e25e,_0x555099=this[_0x2fa7fb(0x1fc)]()[_0x2fa7fb(0x34c)],_0x5170e5=_0x555099[_0x2fa7fb(0x35c)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x5170e5)for(const _0x8fddb3 of _0x5170e5){let _0x4e670b=0x0,_0x14bfbe=0x0;if(_0x8fddb3[_0x2fa7fb(0x35c)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x4e670b=Number(RegExp['$1']),_0x14bfbe=Number(RegExp['$2']);else _0x8fddb3[_0x2fa7fb(0x35c)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x4e670b=DataManager[_0x2fa7fb(0x2ce)](RegExp['$1']),_0x14bfbe=Number(RegExp['$2']));_0x12c3cd[_0x2fa7fb(0x2fa)](_0x4e670b,_0x14bfbe),this[_0x2fa7fb(0x37f)](_0x12c3cd);}const _0xf2fab3=_0x555099[_0x2fa7fb(0x35c)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0xf2fab3)for(const _0x1a92d7 of _0xf2fab3){let _0x59b79f=0x0,_0x461356=0x0;if(_0x1a92d7['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x59b79f=Number(RegExp['$1']),_0x461356=Number(RegExp['$2']);else _0x1a92d7[_0x2fa7fb(0x35c)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x59b79f=DataManager[_0x2fa7fb(0x2ce)](RegExp['$1']),_0x461356=Number(RegExp['$2']));_0x12c3cd[_0x2fa7fb(0x354)](_0x59b79f,_0x461356),this[_0x2fa7fb(0x37f)](_0x12c3cd);}},Game_Action[_0x19e25e(0x294)]['applyBuffTurnManipulationEffects']=function(_0x4171ed){const _0x12f269=_0x19e25e,_0xe7c27f=['MAXHP',_0x12f269(0x2e6),'ATK','DEF','MAT',_0x12f269(0x2ab),'AGI',_0x12f269(0x220)],_0x42cae8=this[_0x12f269(0x1fc)]()[_0x12f269(0x34c)],_0x2af18b=_0x42cae8[_0x12f269(0x35c)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x2af18b)for(const _0x3e9853 of _0x2af18b){_0x3e9853[_0x12f269(0x35c)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x424b0d=_0xe7c27f[_0x12f269(0x243)](String(RegExp['$1'])['toUpperCase']()),_0x58f35c=Number(RegExp['$2']);_0x424b0d>=0x0&&(_0x4171ed[_0x12f269(0x25c)](_0x424b0d,_0x58f35c),this[_0x12f269(0x37f)](_0x4171ed));}const _0xae3efd=_0x42cae8[_0x12f269(0x35c)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xae3efd)for(const _0x26f681 of _0x2af18b){_0x26f681['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x21fd7f=_0xe7c27f['indexOf'](String(RegExp['$1'])[_0x12f269(0x200)]()),_0x4a2be7=Number(RegExp['$2']);_0x21fd7f>=0x0&&(_0x4171ed['addBuffTurns'](_0x21fd7f,_0x4a2be7),this[_0x12f269(0x37f)](_0x4171ed));}},Game_Action[_0x19e25e(0x294)][_0x19e25e(0x1ca)]=function(_0x17a3d0){const _0x17a1ad=_0x19e25e,_0x1a4d7f=['MAXHP','MAXMP',_0x17a1ad(0x32b),'DEF',_0x17a1ad(0x1aa),_0x17a1ad(0x2ab),_0x17a1ad(0x25a),'LUK'],_0x1b5d9a=this[_0x17a1ad(0x1fc)]()[_0x17a1ad(0x34c)],_0x33d8e0=_0x1b5d9a[_0x17a1ad(0x35c)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x33d8e0)for(const _0x1a31f8 of _0x33d8e0){_0x1a31f8[_0x17a1ad(0x35c)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x32cf01=_0x1a4d7f[_0x17a1ad(0x243)](String(RegExp['$1'])[_0x17a1ad(0x200)]()),_0x200580=Number(RegExp['$2']);_0x32cf01>=0x0&&(_0x17a3d0[_0x17a1ad(0x39a)](_0x32cf01,_0x200580),this['makeSuccess'](_0x17a3d0));}const _0x28ae63=_0x1b5d9a[_0x17a1ad(0x35c)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x28ae63)for(const _0x480b0a of _0x33d8e0){_0x480b0a[_0x17a1ad(0x35c)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x524430=_0x1a4d7f['indexOf'](String(RegExp['$1'])[_0x17a1ad(0x200)]()),_0x294891=Number(RegExp['$2']);_0x524430>=0x0&&(_0x17a3d0['addDebuffTurns'](_0x524430,_0x294891),this[_0x17a1ad(0x37f)](_0x17a3d0));}},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x23b)]=Game_BattlerBase['prototype']['initMembers'],Game_BattlerBase[_0x19e25e(0x294)]['initMembers']=function(){const _0x56b620=_0x19e25e;this[_0x56b620(0x329)]={},this[_0x56b620(0x277)](),VisuMZ[_0x56b620(0x224)][_0x56b620(0x23b)][_0x56b620(0x183)](this);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x277)]=function(){const _0x175a4e=_0x19e25e;this[_0x175a4e(0x21c)]='',this[_0x175a4e(0x182)]={},this[_0x175a4e(0x2b6)]={},this[_0x175a4e(0x386)]={};},Game_BattlerBase['prototype'][_0x19e25e(0x373)]=function(_0x334091){const _0x415872=_0x19e25e;return this[_0x415872(0x329)]=this['_cache']||{},this[_0x415872(0x329)][_0x334091]!==undefined;},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x21a)]=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1e0)]=function(){const _0x3039f2=_0x19e25e;this[_0x3039f2(0x329)]={},VisuMZ[_0x3039f2(0x224)]['Game_BattlerBase_refresh']['call'](this);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x2cf)]=Game_BattlerBase[_0x19e25e(0x294)]['eraseState'],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1a5)]=function(_0x169893){const _0x4a0adf=_0x19e25e;let _0x419549=this[_0x4a0adf(0x2f1)](_0x169893);VisuMZ[_0x4a0adf(0x224)][_0x4a0adf(0x2cf)][_0x4a0adf(0x183)](this,_0x169893);if(_0x419549&&!this[_0x4a0adf(0x2f1)](_0x169893))this[_0x4a0adf(0x231)](_0x169893);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x231)]=function(_0x47a102){this['clearStateData'](_0x47a102),this['clearStateDisplay'](_0x47a102),this['clearStateOrigin'](_0x47a102);},VisuMZ['SkillsStatesCore'][_0x19e25e(0x2a1)]=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1cc)],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1cc)]=function(_0x44e096){const _0x3e3f29=_0x19e25e,_0x196101=$dataStates[_0x44e096],_0x54a5d4=this[_0x3e3f29(0x2c3)](_0x44e096),_0x53267b=this[_0x3e3f29(0x207)](_0x196101)[_0x3e3f29(0x372)]()[_0x3e3f29(0x379)]();switch(_0x53267b){case _0x3e3f29(0x1eb):if(_0x54a5d4<=0x0)VisuMZ[_0x3e3f29(0x224)]['Game_BattlerBase_resetStateCounts'][_0x3e3f29(0x183)](this,_0x44e096);break;case'reset':VisuMZ[_0x3e3f29(0x224)][_0x3e3f29(0x2a1)][_0x3e3f29(0x183)](this,_0x44e096);break;case'greater':VisuMZ[_0x3e3f29(0x224)][_0x3e3f29(0x2a1)][_0x3e3f29(0x183)](this,_0x44e096),this[_0x3e3f29(0x32d)][_0x44e096]=Math[_0x3e3f29(0x2b0)](this[_0x3e3f29(0x32d)][_0x44e096],_0x54a5d4);break;case _0x3e3f29(0x1b7):VisuMZ[_0x3e3f29(0x224)][_0x3e3f29(0x2a1)]['call'](this,_0x44e096),this[_0x3e3f29(0x32d)][_0x44e096]+=_0x54a5d4;break;default:VisuMZ[_0x3e3f29(0x224)][_0x3e3f29(0x2a1)][_0x3e3f29(0x183)](this,_0x44e096);break;}},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x207)]=function(_0x5a4ac5){const _0x289886=_0x19e25e,_0x2a8247=_0x5a4ac5[_0x289886(0x34c)];return _0x2a8247[_0x289886(0x35c)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x289886(0x224)][_0x289886(0x1e2)][_0x289886(0x237)][_0x289886(0x1f4)];},VisuMZ['SkillsStatesCore'][_0x19e25e(0x25e)]=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x317)],Game_BattlerBase[_0x19e25e(0x294)]['overwriteBuffTurns']=function(_0x2e388c,_0x6fca28){const _0x56e65d=_0x19e25e,_0x17229b=VisuMZ[_0x56e65d(0x224)]['Settings'][_0x56e65d(0x2dc)][_0x56e65d(0x1f4)],_0xbb38dd=this[_0x56e65d(0x321)](_0x2e388c);switch(_0x17229b){case _0x56e65d(0x1eb):if(_0xbb38dd<=0x0)this[_0x56e65d(0x2d8)][_0x2e388c]=_0x6fca28;break;case'reset':this[_0x56e65d(0x2d8)][_0x2e388c]=_0x6fca28;break;case _0x56e65d(0x2e2):this['_buffTurns'][_0x2e388c]=Math['max'](_0xbb38dd,_0x6fca28);break;case'add':this[_0x56e65d(0x2d8)][_0x2e388c]+=_0x6fca28;break;default:VisuMZ[_0x56e65d(0x224)][_0x56e65d(0x25e)][_0x56e65d(0x183)](this,_0x2e388c,_0x6fca28);break;}const _0x37a3a4=VisuMZ[_0x56e65d(0x224)][_0x56e65d(0x1e2)]['Buffs'][_0x56e65d(0x21f)];this['_buffTurns'][_0x2e388c]=this[_0x56e65d(0x2d8)][_0x2e388c][_0x56e65d(0x2ae)](0x0,_0x37a3a4);},Game_BattlerBase['prototype'][_0x19e25e(0x28f)]=function(){const _0x317afa=_0x19e25e;if(this[_0x317afa(0x329)][_0x317afa(0x370)]!==undefined)return this['_cache'][_0x317afa(0x370)];this[_0x317afa(0x329)]['groupDefeat']=![];const _0x39c799=this[_0x317afa(0x1fa)]();for(const _0x549a29 of _0x39c799){if(!_0x549a29)continue;if(_0x549a29[_0x317afa(0x34c)][_0x317afa(0x35c)](/<GROUP DEFEAT>/i)){this[_0x317afa(0x329)]['groupDefeat']=!![];break;}}return this['_cache']['groupDefeat'];},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x1f5)]=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x273)],Game_BattlerBase['prototype']['clearStates']=function(){const _0x53d726=_0x19e25e;this[_0x53d726(0x27e)]()!==''?this[_0x53d726(0x24f)]():(VisuMZ[_0x53d726(0x224)][_0x53d726(0x1f5)][_0x53d726(0x183)](this),this[_0x53d726(0x277)]());},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x24f)]=function(){const _0x2973ce=_0x19e25e,_0x192083=this['states']();for(const _0x8ade1c of _0x192083){if(_0x8ade1c&&this[_0x2973ce(0x1cd)](_0x8ade1c))this[_0x2973ce(0x1a5)](_0x8ade1c['id']);}this[_0x2973ce(0x329)]={};},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1cd)]=function(_0x26e5cd){const _0xbe812e=_0x19e25e,_0x56046e=this[_0xbe812e(0x27e)]();if(_0x56046e!==''){const _0xd21c0f=_0x26e5cd[_0xbe812e(0x34c)];if(_0x56046e==='death'&&_0xd21c0f[_0xbe812e(0x35c)](/<NO DEATH CLEAR>/i))return![];if(_0x56046e===_0xbe812e(0x2b8)&&_0xd21c0f['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x26e5cd['id']);},Game_BattlerBase[_0x19e25e(0x294)]['getStateRetainType']=function(){const _0x5e0744=_0x19e25e;return this[_0x5e0744(0x21c)];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1a3)]=function(_0x2e9e9c){const _0x405170=_0x19e25e;this[_0x405170(0x21c)]=_0x2e9e9c;},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x2f3)]=function(){const _0x2f42f9=_0x19e25e;this[_0x2f42f9(0x21c)]='';},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x369)]=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x190)],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x190)]=function(){const _0x253f04=_0x19e25e;this[_0x253f04(0x1a3)](_0x253f04(0x346)),VisuMZ[_0x253f04(0x224)]['Game_BattlerBase_die'][_0x253f04(0x183)](this),this[_0x253f04(0x2f3)]();},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x274)]=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x322)],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x322)]=function(){const _0x8e7fb9=_0x19e25e;this['setStateRetainType'](_0x8e7fb9(0x2b8)),VisuMZ[_0x8e7fb9(0x224)][_0x8e7fb9(0x274)][_0x8e7fb9(0x183)](this),this[_0x8e7fb9(0x2f3)]();},Game_BattlerBase['prototype'][_0x19e25e(0x33f)]=function(_0x39d198){const _0x1f3a84=_0x19e25e;for(settings of VisuMZ['SkillsStatesCore'][_0x1f3a84(0x1e2)][_0x1f3a84(0x324)]){const _0x19ae52=settings[_0x1f3a84(0x337)][_0x1f3a84(0x183)](this,_0x39d198);if(!settings[_0x1f3a84(0x1ee)][_0x1f3a84(0x183)](this,_0x39d198,_0x19ae52))return![];}return!![];},Game_BattlerBase[_0x19e25e(0x294)]['paySkillCost']=function(_0xfb3f64){const _0x23c351=_0x19e25e;for(settings of VisuMZ['SkillsStatesCore'][_0x23c351(0x1e2)][_0x23c351(0x324)]){const _0x490ca2=settings[_0x23c351(0x337)][_0x23c351(0x183)](this,_0xfb3f64);settings[_0x23c351(0x26f)][_0x23c351(0x183)](this,_0xfb3f64,_0x490ca2);}},VisuMZ['SkillsStatesCore'][_0x19e25e(0x352)]=Game_BattlerBase[_0x19e25e(0x294)]['meetsSkillConditions'],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x23c)]=function(_0x41609){const _0xe5d803=_0x19e25e;if(!_0x41609)return![];if(!VisuMZ[_0xe5d803(0x224)][_0xe5d803(0x352)][_0xe5d803(0x183)](this,_0x41609))return![];if(!this[_0xe5d803(0x39b)](_0x41609))return![];if(!this[_0xe5d803(0x35e)](_0x41609))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x41609))return![];return!![];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x39b)]=function(_0x381f79){if(!this['checkSkillConditionsSwitchNotetags'](_0x381f79))return![];return!![];},Game_BattlerBase[_0x19e25e(0x294)]['checkSkillConditionsSwitchNotetags']=function(_0x597815){const _0x191294=_0x19e25e,_0xbb1d77=_0x597815[_0x191294(0x34c)];if(_0xbb1d77[_0x191294(0x35c)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x92af14=JSON[_0x191294(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x197e05 of _0x92af14){if(!$gameSwitches[_0x191294(0x1a6)](_0x197e05))return![];}return!![];}if(_0xbb1d77[_0x191294(0x35c)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16e94f=JSON[_0x191294(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x306076 of _0x16e94f){if(!$gameSwitches[_0x191294(0x1a6)](_0x306076))return![];}return!![];}if(_0xbb1d77[_0x191294(0x35c)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x206e6d=JSON[_0x191294(0x2ec)]('['+RegExp['$1'][_0x191294(0x35c)](/\d+/g)+']');for(const _0x19a31b of _0x206e6d){if($gameSwitches[_0x191294(0x1a6)](_0x19a31b))return!![];}return![];}if(_0xbb1d77[_0x191294(0x35c)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a3d24=JSON[_0x191294(0x2ec)]('['+RegExp['$1'][_0x191294(0x35c)](/\d+/g)+']');for(const _0x44b03a of _0x4a3d24){if(!$gameSwitches[_0x191294(0x1a6)](_0x44b03a))return!![];}return![];}if(_0xbb1d77['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3fb590=JSON[_0x191294(0x2ec)]('['+RegExp['$1'][_0x191294(0x35c)](/\d+/g)+']');for(const _0x2f263a of _0x3fb590){if(!$gameSwitches[_0x191294(0x1a6)](_0x2f263a))return!![];}return![];}if(_0xbb1d77[_0x191294(0x35c)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56c621=JSON[_0x191294(0x2ec)]('['+RegExp['$1'][_0x191294(0x35c)](/\d+/g)+']');for(const _0x439b1e of _0x56c621){if($gameSwitches[_0x191294(0x1a6)](_0x439b1e))return![];}return!![];}return!![];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x35e)]=function(_0x5bb3bb){const _0x4e749f=_0x19e25e,_0x4be368=_0x5bb3bb['note'],_0x16a52d=VisuMZ[_0x4e749f(0x224)][_0x4e749f(0x2db)];return _0x16a52d[_0x5bb3bb['id']]?_0x16a52d[_0x5bb3bb['id']][_0x4e749f(0x183)](this,_0x5bb3bb):!![];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x248)]=function(_0x1deb76){const _0x269cc8=_0x19e25e;return VisuMZ['SkillsStatesCore'][_0x269cc8(0x1e2)][_0x269cc8(0x28d)][_0x269cc8(0x37c)][_0x269cc8(0x183)](this,_0x1deb76);},VisuMZ[_0x19e25e(0x224)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase['prototype'][_0x19e25e(0x2e5)],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x2e5)]=function(_0x4b77ce){const _0x56e4b8=_0x19e25e;for(settings of VisuMZ[_0x56e4b8(0x224)][_0x56e4b8(0x1e2)][_0x56e4b8(0x324)]){if(settings['Name'][_0x56e4b8(0x200)]()==='MP')return settings['CalcJS'][_0x56e4b8(0x183)](this,_0x4b77ce);}return VisuMZ[_0x56e4b8(0x224)][_0x56e4b8(0x350)]['call'](this,_0x4b77ce);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x365)]=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x272)],Game_BattlerBase['prototype']['skillTpCost']=function(_0x25ccee){const _0x2ce463=_0x19e25e;for(settings of VisuMZ[_0x2ce463(0x224)][_0x2ce463(0x1e2)][_0x2ce463(0x324)]){if(settings[_0x2ce463(0x218)]['toUpperCase']()==='TP')return settings['CalcJS'][_0x2ce463(0x183)](this,_0x25ccee);}return VisuMZ[_0x2ce463(0x224)][_0x2ce463(0x365)][_0x2ce463(0x183)](this,_0x25ccee);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x18b)]=function(_0x33163e){const _0x15c897=_0x19e25e;if(typeof _0x33163e===_0x15c897(0x22a))_0x33163e=$dataStates[_0x33163e];return this[_0x15c897(0x1fa)]()[_0x15c897(0x202)](_0x33163e);},VisuMZ['SkillsStatesCore'][_0x19e25e(0x2de)]=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1fa)],Game_BattlerBase['prototype'][_0x19e25e(0x1fa)]=function(){const _0x23cb0b=_0x19e25e;let _0xf22476=VisuMZ[_0x23cb0b(0x224)][_0x23cb0b(0x2de)]['call'](this);return this['addPassiveStates'](_0xf22476),_0xf22476;},Game_BattlerBase[_0x19e25e(0x294)]['addPassiveStates']=function(_0x71ea52){const _0xaa91e4=_0x19e25e,_0x259348=this[_0xaa91e4(0x2a0)]();for(state of _0x259348){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x71ea52['includes'](state))continue;_0x71ea52[_0xaa91e4(0x375)](state);}_0x259348[_0xaa91e4(0x1bf)]>0x0&&_0x71ea52[_0xaa91e4(0x2c8)]((_0x3d1418,_0x325ed8)=>{const _0x523524=_0xaa91e4,_0x502848=_0x3d1418[_0x523524(0x319)],_0x5dde6a=_0x325ed8[_0x523524(0x319)];if(_0x502848!==_0x5dde6a)return _0x5dde6a-_0x502848;return _0x3d1418-_0x325ed8;});},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x216)]=function(_0x1cad20){const _0xba160e=_0x19e25e;return _0x1cad20[_0xba160e(0x34c)][_0xba160e(0x35c)](/<PASSIVE STACKABLE>/i);},Game_BattlerBase['prototype'][_0x19e25e(0x238)]=function(){const _0x50102d=_0x19e25e,_0x37d29a=[];for(const _0x1326c0 of this[_0x50102d(0x329)][_0x50102d(0x2a0)]){const _0x5c378c=$dataStates[_0x1326c0];if(!_0x5c378c)continue;if(!this[_0x50102d(0x2c7)](_0x5c378c))continue;_0x37d29a[_0x50102d(0x375)](_0x5c378c);}return _0x37d29a;},Game_BattlerBase[_0x19e25e(0x294)]['meetsPassiveStateConditions']=function(_0x31803a){const _0x7e3476=_0x19e25e;if(!this[_0x7e3476(0x26b)](_0x31803a))return![];if(!this[_0x7e3476(0x215)](_0x31803a))return![];if(!this[_0x7e3476(0x189)](_0x31803a))return![];if(!this[_0x7e3476(0x36d)](_0x31803a))return![];return!![];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x26b)]=function(_0x393634){return!![];},Game_Actor[_0x19e25e(0x294)][_0x19e25e(0x26b)]=function(_0x1292fe){const _0x1e58b0=_0x19e25e,_0x2dd431=_0x1292fe[_0x1e58b0(0x34c)];if(_0x2dd431[_0x1e58b0(0x35c)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x3ca8dc=String(RegExp['$1'])[_0x1e58b0(0x385)](',')[_0x1e58b0(0x2bc)](_0x19397d=>_0x19397d[_0x1e58b0(0x379)]()),_0x4128cf=VisuMZ[_0x1e58b0(0x224)][_0x1e58b0(0x353)](_0x3ca8dc);return _0x4128cf[_0x1e58b0(0x202)](this[_0x1e58b0(0x391)]());}if(_0x2dd431[_0x1e58b0(0x35c)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x2f83e3=String(RegExp['$1'])[_0x1e58b0(0x385)](',')[_0x1e58b0(0x2bc)](_0x361196=>_0x361196[_0x1e58b0(0x379)]()),_0x25406b=VisuMZ['SkillsStatesCore'][_0x1e58b0(0x353)](_0x2f83e3);let _0x345fe3=[this[_0x1e58b0(0x391)]()];return Imported[_0x1e58b0(0x348)]&&this[_0x1e58b0(0x1b2)]&&(_0x345fe3=this[_0x1e58b0(0x1b2)]()),_0x25406b[_0x1e58b0(0x24d)](_0x3483dd=>_0x345fe3[_0x1e58b0(0x202)](_0x3483dd))[_0x1e58b0(0x1bf)]>0x0;}return Game_BattlerBase['prototype'][_0x1e58b0(0x26b)][_0x1e58b0(0x183)](this,_0x1292fe);},VisuMZ[_0x19e25e(0x224)]['ParseClassIDs']=function(_0x15a43c){const _0xd3633d=_0x19e25e,_0x59623a=[];for(let _0x1a8ce5 of _0x15a43c){_0x1a8ce5=(String(_0x1a8ce5)||'')[_0xd3633d(0x379)]();const _0x1ead47=/^\d+$/[_0xd3633d(0x1ef)](_0x1a8ce5);_0x1ead47?_0x59623a[_0xd3633d(0x375)](Number(_0x1a8ce5)):_0x59623a['push'](DataManager[_0xd3633d(0x297)](_0x1a8ce5));}return _0x59623a[_0xd3633d(0x2bc)](_0x577600=>$dataClasses[Number(_0x577600)])[_0xd3633d(0x33b)](null);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x215)]=function(_0x99350f){const _0x4ed63c=_0x19e25e,_0x5a258f=_0x99350f[_0x4ed63c(0x34c)];if(_0x5a258f[_0x4ed63c(0x35c)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13b70a=JSON[_0x4ed63c(0x2ec)]('['+RegExp['$1'][_0x4ed63c(0x35c)](/\d+/g)+']');for(const _0x513cf1 of _0x13b70a){if(!$gameSwitches[_0x4ed63c(0x1a6)](_0x513cf1))return![];}return!![];}if(_0x5a258f[_0x4ed63c(0x35c)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16c944=JSON[_0x4ed63c(0x2ec)]('['+RegExp['$1'][_0x4ed63c(0x35c)](/\d+/g)+']');for(const _0x2689e3 of _0x16c944){if(!$gameSwitches['value'](_0x2689e3))return![];}return!![];}if(_0x5a258f[_0x4ed63c(0x35c)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x33083c=JSON[_0x4ed63c(0x2ec)]('['+RegExp['$1'][_0x4ed63c(0x35c)](/\d+/g)+']');for(const _0x2596b9 of _0x33083c){if($gameSwitches['value'](_0x2596b9))return!![];}return![];}if(_0x5a258f[_0x4ed63c(0x35c)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5deb29=JSON[_0x4ed63c(0x2ec)]('['+RegExp['$1'][_0x4ed63c(0x35c)](/\d+/g)+']');for(const _0x2d46e5 of _0x5deb29){if(!$gameSwitches[_0x4ed63c(0x1a6)](_0x2d46e5))return!![];}return![];}if(_0x5a258f[_0x4ed63c(0x35c)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d3a0b=JSON[_0x4ed63c(0x2ec)]('['+RegExp['$1'][_0x4ed63c(0x35c)](/\d+/g)+']');for(const _0x3e9ea7 of _0x5d3a0b){if(!$gameSwitches[_0x4ed63c(0x1a6)](_0x3e9ea7))return!![];}return![];}if(_0x5a258f['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x243d4f=JSON[_0x4ed63c(0x2ec)]('['+RegExp['$1'][_0x4ed63c(0x35c)](/\d+/g)+']');for(const _0x524a55 of _0x243d4f){if($gameSwitches[_0x4ed63c(0x1a6)](_0x524a55))return![];}return!![];}return!![];},Game_BattlerBase['prototype']['meetsPassiveStateConditionJS']=function(_0x1dd552){const _0x28770d=_0x19e25e,_0x57f524=VisuMZ[_0x28770d(0x224)][_0x28770d(0x29d)];if(_0x57f524[_0x1dd552['id']]&&!_0x57f524[_0x1dd552['id']][_0x28770d(0x183)](this,_0x1dd552))return![];return!![];},Game_BattlerBase[_0x19e25e(0x294)]['meetsPassiveStateGlobalConditionJS']=function(_0x46937d){const _0x44b186=_0x19e25e;return VisuMZ[_0x44b186(0x224)][_0x44b186(0x1e2)]['PassiveStates'][_0x44b186(0x310)][_0x44b186(0x183)](this,_0x46937d);},Game_BattlerBase['prototype'][_0x19e25e(0x2a0)]=function(){const _0x2af5cf=_0x19e25e;if(this[_0x2af5cf(0x373)](_0x2af5cf(0x2a0)))return this[_0x2af5cf(0x238)]();return this[_0x2af5cf(0x329)]['passiveStates']=[],this['addPassiveStatesFromOtherPlugins'](),this['addPassiveStatesByNotetag'](),this[_0x2af5cf(0x31a)](),this[_0x2af5cf(0x238)]();},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x261)]=function(){const _0x2179e6=_0x19e25e;if(Imported[_0x2179e6(0x331)])this[_0x2179e6(0x2eb)]();},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x392)]=function(){return[];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x286)]=function(){const _0xb28e65=_0x19e25e,_0x7451f5=this['passiveStateObjects']();for(const _0x1a3971 of _0x7451f5){if(!_0x1a3971)continue;const _0x1b13dc=_0x1a3971[_0xb28e65(0x34c)][_0xb28e65(0x35c)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x1b13dc)for(const _0x359629 of _0x1b13dc){_0x359629[_0xb28e65(0x35c)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x3cca23=RegExp['$1'];if(_0x3cca23[_0xb28e65(0x35c)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0xb5de54=JSON[_0xb28e65(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0xb28e65(0x329)][_0xb28e65(0x2a0)]=this[_0xb28e65(0x329)]['passiveStates'][_0xb28e65(0x320)](_0xb5de54);}else{const _0x44d1e6=_0x3cca23['split'](',');for(const _0x2d3740 of _0x44d1e6){const _0xb0d957=DataManager[_0xb28e65(0x2ce)](_0x2d3740);if(_0xb0d957)this[_0xb28e65(0x329)][_0xb28e65(0x2a0)][_0xb28e65(0x375)](_0xb0d957);}}}}},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x31a)]=function(){const _0x3e3121=_0x19e25e,_0x2ca581=VisuMZ[_0x3e3121(0x224)][_0x3e3121(0x1e2)][_0x3e3121(0x30f)][_0x3e3121(0x342)];this[_0x3e3121(0x329)][_0x3e3121(0x2a0)]=this[_0x3e3121(0x329)][_0x3e3121(0x2a0)][_0x3e3121(0x320)](_0x2ca581);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x2c3)]=function(_0x1e08a0){const _0x3afb77=_0x19e25e;if(typeof _0x1e08a0!==_0x3afb77(0x22a))_0x1e08a0=_0x1e08a0['id'];return this['_stateTurns'][_0x1e08a0]||0x0;},Game_BattlerBase['prototype'][_0x19e25e(0x2fa)]=function(_0x116f17,_0xbce757){const _0x275200=_0x19e25e;if(typeof _0x116f17!==_0x275200(0x22a))_0x116f17=_0x116f17['id'];if(this['isStateAffected'](_0x116f17)){const _0x180d2c=DataManager['stateMaximumTurns'](_0x116f17);this[_0x275200(0x32d)][_0x116f17]=_0xbce757['clamp'](0x0,_0x180d2c);if(this['_stateTurns'][_0x116f17]<=0x0)this['removeState'](_0x116f17);}},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x354)]=function(_0x580d9c,_0x52abd1){const _0x3fc98d=_0x19e25e;if(typeof _0x580d9c!==_0x3fc98d(0x22a))_0x580d9c=_0x580d9c['id'];this['isStateAffected'](_0x580d9c)&&(_0x52abd1+=this[_0x3fc98d(0x2c3)](_0x580d9c),this[_0x3fc98d(0x2fa)](_0x580d9c,_0x52abd1));},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x18d)]=Game_BattlerBase['prototype'][_0x19e25e(0x285)],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x285)]=function(_0x17777b){const _0x4418cf=_0x19e25e,_0x5596d8=this[_0x4418cf(0x22f)][_0x17777b];VisuMZ[_0x4418cf(0x224)]['Game_BattlerBase_eraseBuff'][_0x4418cf(0x183)](this,_0x17777b);if(_0x5596d8>0x0)this[_0x4418cf(0x1e5)](_0x17777b);if(_0x5596d8<0x0)this['onEraseDebuff'](_0x17777b);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x315)],Game_BattlerBase[_0x19e25e(0x294)]['increaseBuff']=function(_0x55e2a9){const _0x3fb038=_0x19e25e;VisuMZ[_0x3fb038(0x224)]['Game_BattlerBase_increaseBuff'][_0x3fb038(0x183)](this,_0x55e2a9);if(!this[_0x3fb038(0x303)](_0x55e2a9))this[_0x3fb038(0x285)](_0x55e2a9);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x1c8)]=Game_BattlerBase[_0x19e25e(0x294)]['decreaseBuff'],Game_BattlerBase[_0x19e25e(0x294)]['decreaseBuff']=function(_0x2b0e69){const _0x15f530=_0x19e25e;VisuMZ['SkillsStatesCore'][_0x15f530(0x1c8)][_0x15f530(0x183)](this,_0x2b0e69);if(!this[_0x15f530(0x303)](_0x2b0e69))this[_0x15f530(0x285)](_0x2b0e69);},Game_BattlerBase['prototype'][_0x19e25e(0x1e5)]=function(_0x2725e1){},Game_BattlerBase[_0x19e25e(0x294)]['onEraseDebuff']=function(_0x17227a){},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x180)]=function(_0x59ea6e){const _0x5b8827=_0x19e25e;return this[_0x5b8827(0x22f)][_0x59ea6e]===VisuMZ[_0x5b8827(0x224)][_0x5b8827(0x1e2)][_0x5b8827(0x2dc)][_0x5b8827(0x2b5)];},Game_BattlerBase['prototype'][_0x19e25e(0x24e)]=function(_0x1b7865){const _0x13abe0=_0x19e25e;return this[_0x13abe0(0x22f)][_0x1b7865]===-VisuMZ[_0x13abe0(0x224)][_0x13abe0(0x1e2)][_0x13abe0(0x2dc)]['StackDebuffMax'];},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x35d)]=Game_BattlerBase['prototype']['buffIconIndex'],Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x19e)]=function(_0x4c3855,_0x4174e2){const _0x3cb83c=_0x19e25e;return _0x4c3855=_0x4c3855[_0x3cb83c(0x2ae)](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x3cb83c(0x35d)][_0x3cb83c(0x183)](this,_0x4c3855,_0x4174e2);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x23d)]=function(_0x424e7b){const _0x46ef5a=_0x19e25e,_0x21a6ee=this[_0x46ef5a(0x22f)][_0x424e7b];return VisuMZ[_0x46ef5a(0x224)]['Settings'][_0x46ef5a(0x2dc)][_0x46ef5a(0x204)][_0x46ef5a(0x183)](this,_0x424e7b,_0x21a6ee);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x321)]=function(_0x580f6f){return this['_buffTurns'][_0x580f6f]||0x0;},Game_BattlerBase['prototype']['debuffTurns']=function(_0x5b707f){const _0x4aa17a=_0x19e25e;return this[_0x4aa17a(0x321)](_0x5b707f);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x25c)]=function(_0x5eb81a,_0x1194e9){const _0x1fc7d2=_0x19e25e;if(this[_0x1fc7d2(0x173)](_0x5eb81a)){const _0x4f42ee=VisuMZ[_0x1fc7d2(0x224)]['Settings'][_0x1fc7d2(0x2dc)]['MaxTurns'];this[_0x1fc7d2(0x2d8)][_0x5eb81a]=_0x1194e9[_0x1fc7d2(0x2ae)](0x0,_0x4f42ee);}},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x395)]=function(_0x1e3401,_0x21c317){const _0x510b32=_0x19e25e;this[_0x510b32(0x173)](_0x1e3401)&&(_0x21c317+=this[_0x510b32(0x321)](stateId),this[_0x510b32(0x2fa)](_0x1e3401,_0x21c317));},Game_BattlerBase[_0x19e25e(0x294)]['setDebuffTurns']=function(_0x229b4c,_0x4afdca){const _0x5353ef=_0x19e25e;if(this['isDebuffAffected'](_0x229b4c)){const _0x4c53c7=VisuMZ[_0x5353ef(0x224)][_0x5353ef(0x1e2)][_0x5353ef(0x2dc)][_0x5353ef(0x21f)];this[_0x5353ef(0x2d8)][_0x229b4c]=_0x4afdca[_0x5353ef(0x2ae)](0x0,_0x4c53c7);}},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x305)]=function(_0x2734eb,_0x2adebe){const _0x29ee2e=_0x19e25e;this[_0x29ee2e(0x203)](_0x2734eb)&&(_0x2adebe+=this[_0x29ee2e(0x321)](stateId),this[_0x29ee2e(0x2fa)](_0x2734eb,_0x2adebe));},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x2a2)]=function(_0x59b7d4){const _0x5dd4da=_0x19e25e;if(typeof _0x59b7d4!==_0x5dd4da(0x22a))_0x59b7d4=_0x59b7d4['id'];return this['_stateData']=this[_0x5dd4da(0x182)]||{},this['_stateData'][_0x59b7d4]=this[_0x5dd4da(0x182)][_0x59b7d4]||{},this[_0x5dd4da(0x182)][_0x59b7d4];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x2ff)]=function(_0x613894,_0x2b3222){const _0x56d6c9=_0x19e25e;if(typeof _0x613894!==_0x56d6c9(0x22a))_0x613894=_0x613894['id'];const _0x2b8eed=this[_0x56d6c9(0x2a2)](_0x613894);return _0x2b8eed[_0x2b3222];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x2fe)]=function(_0x596301,_0xe927a4,_0xcff14a){const _0x587add=_0x19e25e;if(typeof _0x596301!=='number')_0x596301=_0x596301['id'];const _0x135f94=this[_0x587add(0x2a2)](_0x596301);_0x135f94[_0xe927a4]=_0xcff14a;},Game_BattlerBase['prototype'][_0x19e25e(0x325)]=function(_0x4388bb){const _0x3e8fab=_0x19e25e;if(typeof _0x4388bb!=='number')_0x4388bb=_0x4388bb['id'];this[_0x3e8fab(0x182)]=this['_stateData']||{},this[_0x3e8fab(0x182)][_0x4388bb]={};},Game_BattlerBase['prototype'][_0x19e25e(0x17c)]=function(_0x4bcd16){const _0x4a4d88=_0x19e25e;if(typeof _0x4bcd16!=='number')_0x4bcd16=_0x4bcd16['id'];return this[_0x4a4d88(0x2b6)]=this['_stateDisplay']||{},this[_0x4a4d88(0x2b6)][_0x4bcd16]===undefined&&(this[_0x4a4d88(0x2b6)][_0x4bcd16]=''),this[_0x4a4d88(0x2b6)][_0x4bcd16];},Game_BattlerBase['prototype'][_0x19e25e(0x266)]=function(_0x29b885,_0x1d4315){const _0x26e095=_0x19e25e;if(typeof _0x29b885!==_0x26e095(0x22a))_0x29b885=_0x29b885['id'];this[_0x26e095(0x2b6)]=this['_stateDisplay']||{},this[_0x26e095(0x2b6)][_0x29b885]=_0x1d4315;},Game_BattlerBase['prototype'][_0x19e25e(0x2ed)]=function(_0x570cc0){const _0x1d3489=_0x19e25e;if(typeof _0x570cc0!==_0x1d3489(0x22a))_0x570cc0=_0x570cc0['id'];this['_stateDisplay']=this[_0x1d3489(0x2b6)]||{},this[_0x1d3489(0x2b6)][_0x570cc0]='';},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x21b)]=function(_0x438892){const _0x41a0a5=_0x19e25e;if(typeof _0x438892!==_0x41a0a5(0x22a))_0x438892=_0x438892['id'];this[_0x41a0a5(0x386)]=this[_0x41a0a5(0x386)]||{},this[_0x41a0a5(0x386)][_0x438892]=this[_0x41a0a5(0x386)][_0x438892]||_0x41a0a5(0x377);const _0x3cf3f7=this[_0x41a0a5(0x386)][_0x438892];return this['getStateOriginByKey'](_0x3cf3f7);},Game_BattlerBase['prototype'][_0x19e25e(0x2a8)]=function(_0xf9cdb8,_0x5f06ee){const _0x319712=_0x19e25e;this[_0x319712(0x386)]=this[_0x319712(0x386)]||{};const _0x1d4a6e=_0x5f06ee?this['convertTargetToStateOriginKey'](_0x5f06ee):this[_0x319712(0x29a)]();this[_0x319712(0x386)][_0xf9cdb8]=_0x1d4a6e;},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x282)]=function(_0x2fc596){const _0xd5024f=_0x19e25e;this[_0xd5024f(0x386)]=this[_0xd5024f(0x386)]||{},delete this[_0xd5024f(0x386)][_0x2fc596];},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x29a)]=function(){const _0xdaf079=_0x19e25e,_0x61e210=this[_0xdaf079(0x1a1)]();return this[_0xdaf079(0x355)](_0x61e210);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x1a1)]=function(){const _0x2ca3c1=_0x19e25e;if($gameParty[_0x2ca3c1(0x318)]()){if(BattleManager[_0x2ca3c1(0x2c4)])return BattleManager[_0x2ca3c1(0x2c4)];else{if(BattleManager[_0x2ca3c1(0x270)])return BattleManager['_currentActor'];}}else{const _0x184813=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x2ca3c1(0x202)](_0x184813['constructor']))return $gameParty[_0x2ca3c1(0x2fc)]();}return this;},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x355)]=function(_0x24e044){const _0x35ff1d=_0x19e25e;if(!_0x24e044)return _0x35ff1d(0x377);if(_0x24e044[_0x35ff1d(0x362)]())return'<actor-%1>'['format'](_0x24e044[_0x35ff1d(0x31f)]());else{const _0x2adb5b=_0x35ff1d(0x19a)['format'](_0x24e044['enemyId']()),_0x45f2a3=_0x35ff1d(0x399)[_0x35ff1d(0x289)](_0x24e044[_0x35ff1d(0x210)]()),_0x331b20=_0x35ff1d(0x194)[_0x35ff1d(0x289)]($gameTroop[_0x35ff1d(0x330)]());return _0x35ff1d(0x380)[_0x35ff1d(0x289)](_0x2adb5b,_0x45f2a3,_0x331b20);}return _0x35ff1d(0x377);},Game_BattlerBase['prototype'][_0x19e25e(0x1e4)]=function(_0x24aa80){const _0x44c92e=_0x19e25e;if(_0x24aa80===_0x44c92e(0x377))return this;else{if(_0x24aa80[_0x44c92e(0x35c)](/<actor-(\d+)>/i))return $gameActors[_0x44c92e(0x22d)](Number(RegExp['$1']));else{if($gameParty[_0x44c92e(0x318)]()&&_0x24aa80[_0x44c92e(0x35c)](/<troop-(\d+)>/i)){const _0x23e263=Number(RegExp['$1']);if(_0x23e263===$gameTroop[_0x44c92e(0x330)]()){if(_0x24aa80[_0x44c92e(0x35c)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x24aa80[_0x44c92e(0x35c)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x176)]=Game_Battler[_0x19e25e(0x294)]['addState'],Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x2d5)]=function(_0x1eb40d){const _0x44ee62=_0x19e25e,_0x265ca5=this['isStateAddable'](_0x1eb40d);VisuMZ['SkillsStatesCore']['Game_Battler_addState'][_0x44ee62(0x183)](this,_0x1eb40d);if(_0x265ca5&&this[_0x44ee62(0x18b)]($dataStates[_0x1eb40d])){this[_0x44ee62(0x198)](_0x1eb40d);;}},VisuMZ['SkillsStatesCore']['Game_Battler_isStateAddable']=Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x3a1)],Game_Battler['prototype'][_0x19e25e(0x3a1)]=function(_0x3136a1){const _0xe06060=_0x19e25e,_0x1a994e=$dataStates[_0x3136a1];if(_0x1a994e&&_0x1a994e[_0xe06060(0x34c)][_0xe06060(0x35c)](/<NO DEATH CLEAR>/i))return!this[_0xe06060(0x326)](_0x3136a1)&&!this['isStateRestrict'](_0x3136a1)&&!this[_0xe06060(0x363)][_0xe06060(0x36c)](_0x3136a1);return VisuMZ[_0xe06060(0x224)]['Game_Battler_isStateAddable']['call'](this,_0x3136a1);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x198)]=function(_0x46f09d){const _0x39b7c3=_0x19e25e;this[_0x39b7c3(0x2a8)](_0x46f09d),this['onAddStateMakeCustomSlipValues'](_0x46f09d),this[_0x39b7c3(0x316)](_0x46f09d),this[_0x39b7c3(0x1f9)](_0x46f09d);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x231)]=function(_0x5e6076){const _0x579120=_0x19e25e;Game_BattlerBase[_0x579120(0x294)][_0x579120(0x231)][_0x579120(0x183)](this,_0x5e6076),this[_0x579120(0x33a)](_0x5e6076),this[_0x579120(0x209)](_0x5e6076);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1ea)]=function(_0x212065){const _0x801443=_0x19e25e;for(const _0x42b7e5 of this[_0x801443(0x1fa)]()){this[_0x801443(0x244)](_0x42b7e5['id'])&&_0x42b7e5[_0x801443(0x246)]===_0x212065&&(this[_0x801443(0x1c5)](_0x42b7e5['id']),this[_0x801443(0x1d4)](_0x42b7e5['id']),this[_0x801443(0x1af)](_0x42b7e5['id']));}},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1d4)]=function(_0x221136){const _0xcff407=_0x19e25e;this[_0xcff407(0x283)](_0x221136);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x316)]=function(_0x46ef3b){const _0x3cc034=_0x19e25e,_0x239f9b=VisuMZ[_0x3cc034(0x224)][_0x3cc034(0x227)];if(_0x239f9b[_0x46ef3b])_0x239f9b[_0x46ef3b]['call'](this,_0x46ef3b);},Game_Battler['prototype'][_0x19e25e(0x33a)]=function(_0x2b8ac3){const _0x395f9d=_0x19e25e,_0x466654=VisuMZ['SkillsStatesCore'][_0x395f9d(0x217)];if(_0x466654[_0x2b8ac3])_0x466654[_0x2b8ac3][_0x395f9d(0x183)](this,_0x2b8ac3);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x283)]=function(_0xbcbf22){const _0x51f673=_0x19e25e,_0x44730b=VisuMZ[_0x51f673(0x224)]['stateExpireJS'];if(_0x44730b[_0xbcbf22])_0x44730b[_0xbcbf22][_0x51f673(0x183)](this,_0xbcbf22);},Game_Battler[_0x19e25e(0x294)]['onAddStateGlobalJS']=function(_0x204e56){const _0x1e370f=_0x19e25e;try{VisuMZ[_0x1e370f(0x224)][_0x1e370f(0x1e2)][_0x1e370f(0x237)][_0x1e370f(0x397)][_0x1e370f(0x183)](this,_0x204e56);}catch(_0x30f9f4){if($gameTemp['isPlaytest']())console[_0x1e370f(0x1e8)](_0x30f9f4);}},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x209)]=function(_0x3c9c5c){const _0x604079=_0x19e25e;try{VisuMZ[_0x604079(0x224)][_0x604079(0x1e2)][_0x604079(0x237)][_0x604079(0x2d7)][_0x604079(0x183)](this,_0x3c9c5c);}catch(_0x207816){if($gameTemp[_0x604079(0x1ac)]())console[_0x604079(0x1e8)](_0x207816);}},Game_Battler[_0x19e25e(0x294)]['onExpireStateGlobalJS']=function(_0x3d6343){const _0x5eed5b=_0x19e25e;try{VisuMZ[_0x5eed5b(0x224)][_0x5eed5b(0x1e2)][_0x5eed5b(0x237)][_0x5eed5b(0x304)][_0x5eed5b(0x183)](this,_0x3d6343);}catch(_0x4338cd){if($gameTemp[_0x5eed5b(0x1ac)]())console[_0x5eed5b(0x1e8)](_0x4338cd);}},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x287)]=function(_0x23c036){const _0x18a19f=_0x19e25e;return _0x23c036=_0x23c036[_0x18a19f(0x200)]()['trim'](),this[_0x18a19f(0x1fa)]()['filter'](_0x1f3ccc=>_0x1f3ccc[_0x18a19f(0x239)]['includes'](_0x23c036));},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1ad)]=function(_0x576873,_0x373d27){const _0x454537=_0x19e25e;_0x576873=_0x576873['toUpperCase']()[_0x454537(0x379)](),_0x373d27=_0x373d27||0x0;const _0x4a75d8=this['statesByCategory'](_0x576873),_0x13d8fa=[];for(const _0x318af7 of _0x4a75d8){if(!_0x318af7)continue;if(_0x373d27<=0x0)return;_0x13d8fa['push'](_0x318af7['id']),this[_0x454537(0x363)][_0x454537(0x306)]=!![],_0x373d27--;}while(_0x13d8fa['length']>0x0){this['removeState'](_0x13d8fa[_0x454537(0x19f)]());}},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x25f)]=function(_0x265738){const _0x2a29c6=_0x19e25e;_0x265738=_0x265738[_0x2a29c6(0x200)]()['trim']();const _0x46ab41=this['statesByCategory'](_0x265738),_0x1b3ff9=[];for(const _0x110d9e of _0x46ab41){if(!_0x110d9e)continue;_0x1b3ff9[_0x2a29c6(0x375)](_0x110d9e['id']),this[_0x2a29c6(0x363)][_0x2a29c6(0x306)]=!![];}while(_0x1b3ff9[_0x2a29c6(0x1bf)]>0x0){this['removeState'](_0x1b3ff9['shift']());}},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1bb)]=function(_0xd40f7a){return this['totalStateCategoryAffected'](_0xd40f7a)>0x0;},Game_Battler['prototype']['hasStateCategory']=function(_0x567f4a){const _0x3c773d=_0x19e25e;return this[_0x3c773d(0x25b)](_0x567f4a)>0x0;},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x247)]=function(_0x4a9f37){const _0x102fed=_0x19e25e,_0x19c665=this[_0x102fed(0x287)](_0x4a9f37)[_0x102fed(0x24d)](_0x40980f=>this[_0x102fed(0x2f1)](_0x40980f['id']));return _0x19c665[_0x102fed(0x1bf)];},Game_Battler[_0x19e25e(0x294)]['totalStateCategory']=function(_0x35594f){const _0x15a46a=_0x19e25e,_0x25fec2=this[_0x15a46a(0x287)](_0x35594f);return _0x25fec2[_0x15a46a(0x1bf)];},VisuMZ['SkillsStatesCore']['Game_Battler_addBuff']=Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x398)],Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x398)]=function(_0x2a6f93,_0x406925){const _0x189caf=_0x19e25e;VisuMZ[_0x189caf(0x224)][_0x189caf(0x1b9)][_0x189caf(0x183)](this,_0x2a6f93,_0x406925),this[_0x189caf(0x173)](_0x2a6f93)&&this[_0x189caf(0x39f)](_0x2a6f93,_0x406925);},VisuMZ['SkillsStatesCore'][_0x19e25e(0x245)]=Game_Battler[_0x19e25e(0x294)]['addDebuff'],Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x2ba)]=function(_0x453661,_0x5cbe71){const _0x3001cb=_0x19e25e;VisuMZ[_0x3001cb(0x224)]['Game_Battler_addDebuff'][_0x3001cb(0x183)](this,_0x453661,_0x5cbe71),this[_0x3001cb(0x203)](_0x453661)&&this[_0x3001cb(0x2fd)](_0x453661,_0x5cbe71);},Game_Battler['prototype']['removeBuffsAuto']=function(){const _0xb3add0=_0x19e25e;for(let _0x18e7ae=0x0;_0x18e7ae<this[_0xb3add0(0x232)]();_0x18e7ae++){if(this[_0xb3add0(0x2af)](_0x18e7ae)){const _0x5d0bc0=this[_0xb3add0(0x22f)][_0x18e7ae];this[_0xb3add0(0x1db)](_0x18e7ae);if(_0x5d0bc0>0x0)this[_0xb3add0(0x1a9)](_0x18e7ae);if(_0x5d0bc0<0x0)this[_0xb3add0(0x170)](_0x18e7ae);}}},Game_Battler[_0x19e25e(0x294)]['onAddBuff']=function(_0x4a0824,_0x30c621){const _0xd0eba3=_0x19e25e;this[_0xd0eba3(0x1a8)](_0x4a0824,_0x30c621);},Game_Battler[_0x19e25e(0x294)]['onAddDebuff']=function(_0x2eea9e,_0x5ee1f3){const _0x30e2cd=_0x19e25e;this[_0x30e2cd(0x2e3)](_0x2eea9e,_0x5ee1f3);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1e5)]=function(_0x203483){const _0x83b0b1=_0x19e25e;Game_BattlerBase[_0x83b0b1(0x294)][_0x83b0b1(0x1e5)][_0x83b0b1(0x183)](this,_0x203483),this['onEraseBuffGlobalJS'](_0x203483);},Game_Battler['prototype'][_0x19e25e(0x309)]=function(_0x5ab092){const _0x29140c=_0x19e25e;Game_BattlerBase[_0x29140c(0x294)][_0x29140c(0x309)][_0x29140c(0x183)](this,_0x5ab092),this[_0x29140c(0x388)](_0x5ab092);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1a9)]=function(_0x503771){const _0xa3756b=_0x19e25e;this[_0xa3756b(0x1cf)](_0x503771);},Game_Battler['prototype'][_0x19e25e(0x170)]=function(_0x10296c){const _0x14209f=_0x19e25e;this[_0x14209f(0x35a)](_0x10296c);},Game_Battler[_0x19e25e(0x294)]['onAddBuffGlobalJS']=function(_0x278065,_0x4d445f){const _0xd5c4a1=_0x19e25e;VisuMZ[_0xd5c4a1(0x224)][_0xd5c4a1(0x1e2)][_0xd5c4a1(0x2dc)][_0xd5c4a1(0x1f7)]['call'](this,_0x278065,_0x4d445f);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x2e3)]=function(_0x45799e,_0x379860){const _0x468f4c=_0x19e25e;VisuMZ[_0x468f4c(0x224)][_0x468f4c(0x1e2)][_0x468f4c(0x2dc)]['onAddDebuffJS']['call'](this,_0x45799e,_0x379860);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x311)]=function(_0x545271){const _0x3c81aa=_0x19e25e;VisuMZ[_0x3c81aa(0x224)][_0x3c81aa(0x1e2)][_0x3c81aa(0x2dc)][_0x3c81aa(0x177)][_0x3c81aa(0x183)](this,_0x545271);},Game_BattlerBase[_0x19e25e(0x294)][_0x19e25e(0x388)]=function(_0x506436){const _0x2f5312=_0x19e25e;VisuMZ[_0x2f5312(0x224)][_0x2f5312(0x1e2)][_0x2f5312(0x2dc)][_0x2f5312(0x280)]['call'](this,_0x506436);},Game_Battler['prototype'][_0x19e25e(0x1cf)]=function(_0x2ed2d9){const _0x21859c=_0x19e25e;VisuMZ[_0x21859c(0x224)][_0x21859c(0x1e2)][_0x21859c(0x2dc)][_0x21859c(0x25d)][_0x21859c(0x183)](this,_0x2ed2d9);},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x35a)]=function(_0x36a558){const _0x3fb277=_0x19e25e;VisuMZ[_0x3fb277(0x224)][_0x3fb277(0x1e2)]['Buffs'][_0x3fb277(0x27b)]['call'](this,_0x36a558);},Game_Battler['prototype'][_0x19e25e(0x366)]=function(_0x57ecb6){const _0x2308b5=_0x19e25e,_0x555f52=VisuMZ[_0x2308b5(0x224)],_0x6e9044=[_0x2308b5(0x38d),_0x2308b5(0x335),_0x2308b5(0x252),_0x2308b5(0x275),_0x2308b5(0x302),_0x2308b5(0x2a4)];for(const _0x599b65 of _0x6e9044){_0x555f52[_0x599b65][_0x57ecb6]&&_0x555f52[_0x599b65][_0x57ecb6][_0x2308b5(0x183)](this,_0x57ecb6);}},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x1d6)]=Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1dc)],Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x1dc)]=function(){const _0x3140ef=_0x19e25e;VisuMZ[_0x3140ef(0x224)][_0x3140ef(0x1d6)][_0x3140ef(0x183)](this),this['setPassiveStateSlipDamageJS'](),this[_0x3140ef(0x17e)]();},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x279)]=function(){const _0x194b7f=_0x19e25e;for(const _0x1e2256 of this[_0x194b7f(0x2a0)]()){if(!_0x1e2256)continue;this[_0x194b7f(0x366)](_0x1e2256['id']);}},Game_Battler[_0x19e25e(0x294)]['regenerateAllSkillsStatesCore']=function(){const _0x2db14c=_0x19e25e;if(!this[_0x2db14c(0x1c2)]())return;const _0x198a51=this[_0x2db14c(0x1fa)]();for(const _0x56907b of _0x198a51){if(!_0x56907b)continue;this[_0x2db14c(0x312)](_0x56907b);}},Game_Battler[_0x19e25e(0x294)][_0x19e25e(0x312)]=function(_0x4094f3){const _0x4111d4=_0x19e25e,_0x333857=this['getStateData'](_0x4094f3['id'],_0x4111d4(0x2c0))||0x0,_0x39cd1a=-this[_0x4111d4(0x219)](),_0x526b74=Math[_0x4111d4(0x2b0)](_0x333857,_0x39cd1a);if(_0x526b74!==0x0)this['gainHp'](_0x526b74);const _0x3a078c=this[_0x4111d4(0x2ff)](_0x4094f3['id'],_0x4111d4(0x196))||0x0;if(_0x3a078c!==0x0)this[_0x4111d4(0x22b)](_0x3a078c);const _0x57cf2b=this['getStateData'](_0x4094f3['id'],_0x4111d4(0x2f5))||0x0;if(_0x57cf2b!==0x0)this[_0x4111d4(0x230)](_0x57cf2b);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x256)]=Game_Actor[_0x19e25e(0x294)]['skillTypes'],Game_Actor[_0x19e25e(0x294)][_0x19e25e(0x381)]=function(){const _0x495df1=_0x19e25e,_0x979a4f=VisuMZ[_0x495df1(0x224)][_0x495df1(0x256)][_0x495df1(0x183)](this),_0xbda007=VisuMZ['SkillsStatesCore']['Settings'][_0x495df1(0x28d)];let _0x28f4c2=_0xbda007[_0x495df1(0x1e1)];return $gameParty[_0x495df1(0x318)]()&&(_0x28f4c2=_0x28f4c2['concat'](_0xbda007[_0x495df1(0x17a)])),_0x979a4f['filter'](_0x3872fa=>!_0x28f4c2[_0x495df1(0x202)](_0x3872fa));},Game_Actor[_0x19e25e(0x294)][_0x19e25e(0x211)]=function(){const _0x418de5=_0x19e25e;return this[_0x418de5(0x32a)]()[_0x418de5(0x24d)](_0x2cb99c=>this[_0x418de5(0x193)](_0x2cb99c));},Game_Actor[_0x19e25e(0x294)][_0x19e25e(0x193)]=function(_0x26eba3){const _0x1883ae=_0x19e25e;if(!this[_0x1883ae(0x2bd)](_0x26eba3))return![];const _0x451571=this[_0x1883ae(0x381)](),_0x256c46=DataManager[_0x1883ae(0x39e)](_0x26eba3),_0x5d54ac=_0x451571[_0x1883ae(0x24d)](_0x4b5dc6=>_0x256c46[_0x1883ae(0x202)](_0x4b5dc6));return _0x5d54ac[_0x1883ae(0x1bf)]>0x0;},Game_Actor['prototype'][_0x19e25e(0x392)]=function(){const _0x12c2c8=_0x19e25e;let _0x26658f=[this[_0x12c2c8(0x22d)](),this[_0x12c2c8(0x391)]()];_0x26658f=_0x26658f[_0x12c2c8(0x320)](this['equips']()[_0x12c2c8(0x24d)](_0x41ef0b=>_0x41ef0b));for(const _0x56d0eb of this[_0x12c2c8(0x1d2)]){const _0x5c8004=$dataSkills[_0x56d0eb];if(_0x5c8004)_0x26658f[_0x12c2c8(0x375)](_0x5c8004);}return _0x26658f;},Game_Actor[_0x19e25e(0x294)]['addPassiveStatesByPluginParameters']=function(){const _0x3fb461=_0x19e25e;Game_Battler[_0x3fb461(0x294)][_0x3fb461(0x31a)][_0x3fb461(0x183)](this);const _0x551fec=VisuMZ[_0x3fb461(0x224)]['Settings'][_0x3fb461(0x30f)]['Actor'];this[_0x3fb461(0x329)][_0x3fb461(0x2a0)]=this['_cache']['passiveStates'][_0x3fb461(0x320)](_0x551fec);},VisuMZ[_0x19e25e(0x224)]['Game_Actor_learnSkill']=Game_Actor['prototype'][_0x19e25e(0x1fb)],Game_Actor[_0x19e25e(0x294)][_0x19e25e(0x1fb)]=function(_0x5b8974){const _0x36aa50=_0x19e25e;VisuMZ[_0x36aa50(0x224)][_0x36aa50(0x20b)][_0x36aa50(0x183)](this,_0x5b8974),this[_0x36aa50(0x329)]={};},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x1e3)]=Game_Actor[_0x19e25e(0x294)][_0x19e25e(0x37a)],Game_Actor[_0x19e25e(0x294)][_0x19e25e(0x37a)]=function(_0x2b1137){const _0x210d7e=_0x19e25e;VisuMZ[_0x210d7e(0x224)][_0x210d7e(0x1e3)][_0x210d7e(0x183)](this,_0x2b1137),this[_0x210d7e(0x329)]={};},Game_Enemy[_0x19e25e(0x294)]['passiveStateObjects']=function(){const _0x502b6e=_0x19e25e;let _0x1c150f=[this[_0x502b6e(0x263)]()];return _0x1c150f[_0x502b6e(0x320)](this[_0x502b6e(0x32a)]());},Game_Enemy[_0x19e25e(0x294)][_0x19e25e(0x31a)]=function(){const _0xc3092e=_0x19e25e;Game_Battler[_0xc3092e(0x294)][_0xc3092e(0x31a)][_0xc3092e(0x183)](this);const _0x422c20=VisuMZ[_0xc3092e(0x224)][_0xc3092e(0x1e2)]['PassiveStates'][_0xc3092e(0x2b3)];this[_0xc3092e(0x329)]['passiveStates']=this[_0xc3092e(0x329)]['passiveStates']['concat'](_0x422c20);},Game_Enemy[_0x19e25e(0x294)]['skills']=function(){const _0x48c646=_0x19e25e,_0x1ca0bd=[];for(const _0x1cea86 of this[_0x48c646(0x263)]()[_0x48c646(0x2ee)]){const _0x521719=$dataSkills[_0x1cea86[_0x48c646(0x39d)]];if(_0x521719&&!_0x1ca0bd[_0x48c646(0x202)](_0x521719))_0x1ca0bd[_0x48c646(0x375)](_0x521719);}return _0x1ca0bd;},Game_Enemy[_0x19e25e(0x294)][_0x19e25e(0x39c)]=function(_0x4bdf48){const _0x272737=_0x19e25e;return this[_0x272737(0x18b)]($dataStates[_0x4bdf48]);},VisuMZ['SkillsStatesCore'][_0x19e25e(0x1fe)]=Game_Unit[_0x19e25e(0x294)][_0x19e25e(0x1b4)],Game_Unit[_0x19e25e(0x294)][_0x19e25e(0x1b4)]=function(){const _0x5b4209=_0x19e25e;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ[_0x5b4209(0x224)][_0x5b4209(0x1fe)]['call'](this);},Game_Unit[_0x19e25e(0x294)][_0x19e25e(0x1ba)]=function(){const _0x3604e0=_0x19e25e,_0x3904a6=this[_0x3604e0(0x191)]();for(const _0x1d8518 of _0x3904a6){if(!_0x1d8518[_0x3604e0(0x28f)]())return![];}return!![];},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x24b)]=Game_Troop['prototype'][_0x19e25e(0x192)],Game_Troop[_0x19e25e(0x294)][_0x19e25e(0x192)]=function(_0x1cdba9){const _0x53d59e=_0x19e25e;VisuMZ[_0x53d59e(0x224)]['Game_Troop_setup'][_0x53d59e(0x183)](this,_0x1cdba9),this['makeCurrentTroopUniqueID']();},Game_Troop[_0x19e25e(0x294)][_0x19e25e(0x214)]=function(){const _0x4d9a69=_0x19e25e;this['_currentTroopUniqueID']=Graphics[_0x4d9a69(0x1ed)];},Game_Troop['prototype']['getCurrentTroopUniqueID']=function(){const _0x523a82=_0x19e25e;return this['_currentTroopUniqueID']=this[_0x523a82(0x185)]||Graphics['frameCount'],this['_currentTroopUniqueID'];},Scene_Skill['prototype'][_0x19e25e(0x228)]=function(){const _0x52d257=_0x19e25e;if(ConfigManager[_0x52d257(0x2cc)]&&ConfigManager[_0x52d257(0x338)]!==undefined)return ConfigManager[_0x52d257(0x338)];else{if(this[_0x52d257(0x19d)]())return this[_0x52d257(0x34d)]()['match'](/LOWER/i);else Scene_ItemBase[_0x52d257(0x294)][_0x52d257(0x2bf)][_0x52d257(0x183)](this);}},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x2bf)]=function(){const _0x2c3516=_0x19e25e;if(ConfigManager[_0x2c3516(0x2cc)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager['uiInputPosition'];else return this[_0x2c3516(0x19d)]()?this[_0x2c3516(0x34d)]()[_0x2c3516(0x35c)](/RIGHT/i):Scene_ItemBase[_0x2c3516(0x294)][_0x2c3516(0x2bf)][_0x2c3516(0x183)](this);},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x34d)]=function(){const _0x25ffd4=_0x19e25e;return VisuMZ[_0x25ffd4(0x224)][_0x25ffd4(0x1e2)][_0x25ffd4(0x28d)]['LayoutStyle'];},Scene_Skill['prototype']['isUseModernControls']=function(){const _0x4946b5=_0x19e25e;return this[_0x4946b5(0x2e8)]&&this['_categoryWindow'][_0x4946b5(0x28e)]();},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x19d)]=function(){const _0x466830=_0x19e25e;return VisuMZ[_0x466830(0x224)][_0x466830(0x1e2)][_0x466830(0x28d)][_0x466830(0x1f2)];},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x269)]=Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x233)],Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x233)]=function(){const _0x4f3e46=_0x19e25e;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x4f3e46(0x2e4)]():VisuMZ['SkillsStatesCore'][_0x4f3e46(0x269)][_0x4f3e46(0x183)](this);},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x2e4)]=function(){const _0x46e98a=_0x19e25e,_0x291032=0x0,_0x38c176=this[_0x46e98a(0x2f2)](),_0x4d4b54=Graphics[_0x46e98a(0x26a)],_0x5fa8a=this[_0x46e98a(0x1c4)]();return new Rectangle(_0x291032,_0x38c176,_0x4d4b54,_0x5fa8a);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x359)]=Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x1c7)],Scene_Skill[_0x19e25e(0x294)]['skillTypeWindowRect']=function(){const _0x4611f7=_0x19e25e;return this[_0x4611f7(0x19d)]()?this[_0x4611f7(0x336)]():VisuMZ[_0x4611f7(0x224)][_0x4611f7(0x359)][_0x4611f7(0x183)](this);},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x336)]=function(){const _0x461da7=_0x19e25e,_0x32404e=this['mainCommandWidth'](),_0xf6f9db=this[_0x461da7(0x32f)](0x3,!![]),_0x369e39=this['isRightInputMode']()?Graphics[_0x461da7(0x26a)]-_0x32404e:0x0,_0x3e45ee=this['mainAreaTop']();return new Rectangle(_0x369e39,_0x3e45ee,_0x32404e,_0xf6f9db);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x2c2)]=Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x2d4)],Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x2d4)]=function(){const _0x38bf4b=_0x19e25e;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x38bf4b(0x295)]():VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect']['call'](this);},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x295)]=function(){const _0x120232=_0x19e25e,_0x186a17=Graphics[_0x120232(0x26a)]-this[_0x120232(0x1b1)](),_0x36626e=this['_skillTypeWindow']['height'],_0x1dcc1c=this['isRightInputMode']()?0x0:Graphics[_0x120232(0x26a)]-_0x186a17,_0x55ae0b=this[_0x120232(0x340)]();return new Rectangle(_0x1dcc1c,_0x55ae0b,_0x186a17,_0x36626e);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x2d6)]=Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x30b)],Scene_Skill[_0x19e25e(0x294)]['createItemWindow']=function(){const _0x185cae=_0x19e25e;VisuMZ[_0x185cae(0x224)][_0x185cae(0x2d6)][_0x185cae(0x183)](this),this[_0x185cae(0x2f7)]()&&this['createShopStatusWindow']();},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x186)]=Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x206)],Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x206)]=function(){const _0x306eb7=_0x19e25e;if(this[_0x306eb7(0x19d)]())return this[_0x306eb7(0x1e7)]();else{const _0x2f7ea7=VisuMZ['SkillsStatesCore'][_0x306eb7(0x186)][_0x306eb7(0x183)](this);return this[_0x306eb7(0x2f7)]()&&this[_0x306eb7(0x1be)]()&&(_0x2f7ea7[_0x306eb7(0x205)]-=this[_0x306eb7(0x2b7)]()),_0x2f7ea7;}},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x1e7)]=function(){const _0x4cb236=_0x19e25e,_0x2d2841=Graphics[_0x4cb236(0x26a)]-this[_0x4cb236(0x2b7)](),_0x3820db=this[_0x4cb236(0x389)]()-this['_statusWindow'][_0x4cb236(0x393)],_0x42c232=this[_0x4cb236(0x2bf)]()?Graphics['boxWidth']-_0x2d2841:0x0,_0x4aa740=this[_0x4cb236(0x2c6)]['y']+this['_statusWindow'][_0x4cb236(0x393)];return new Rectangle(_0x42c232,_0x4aa740,_0x2d2841,_0x3820db);},Scene_Skill['prototype'][_0x19e25e(0x2f7)]=function(){const _0xe16b79=_0x19e25e;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this[_0xe16b79(0x19d)]()?!![]:VisuMZ[_0xe16b79(0x224)][_0xe16b79(0x1e2)]['Skills']['ShowShopStatus'];},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x1be)]=function(){const _0x276ab1=_0x19e25e;return VisuMZ[_0x276ab1(0x224)]['Settings'][_0x276ab1(0x28d)][_0x276ab1(0x17d)];},Scene_Skill[_0x19e25e(0x294)]['createShopStatusWindow']=function(){const _0x35a812=_0x19e25e,_0x2a8467=this['shopStatusWindowRect']();this['_shopStatusWindow']=new Window_ShopStatus(_0x2a8467),this['addWindow'](this['_shopStatusWindow']),this['_itemWindow']['setStatusWindow'](this[_0x35a812(0x29f)]);const _0x2185eb=VisuMZ['SkillsStatesCore'][_0x35a812(0x1e2)]['Skills'][_0x35a812(0x21d)];this[_0x35a812(0x29f)][_0x35a812(0x35f)](_0x2185eb||0x0);},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x284)]=function(){const _0x53483f=_0x19e25e;return this[_0x53483f(0x19d)]()?this[_0x53483f(0x1ec)]():VisuMZ['SkillsStatesCore'][_0x53483f(0x1e2)][_0x53483f(0x28d)][_0x53483f(0x2dd)][_0x53483f(0x183)](this);},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x1ec)]=function(){const _0x5a7266=_0x19e25e,_0x235ff5=this['shopStatusWidth'](),_0x39c0e4=this[_0x5a7266(0x290)][_0x5a7266(0x393)],_0x112f54=this['isRightInputMode']()?0x0:Graphics[_0x5a7266(0x26a)]-this[_0x5a7266(0x2b7)](),_0x2a2bf3=this[_0x5a7266(0x290)]['y'];return new Rectangle(_0x112f54,_0x2a2bf3,_0x235ff5,_0x39c0e4);},Scene_Skill[_0x19e25e(0x294)]['shopStatusWidth']=function(){const _0x56d6f7=_0x19e25e;return Imported[_0x56d6f7(0x345)]?Scene_Shop['prototype'][_0x56d6f7(0x344)]():0x0;},Scene_Skill[_0x19e25e(0x294)][_0x19e25e(0x2ac)]=function(){const _0x4c9ed6=_0x19e25e;return this[_0x4c9ed6(0x22e)]&&this[_0x4c9ed6(0x22e)][_0x4c9ed6(0x394)]?TextManager[_0x4c9ed6(0x38a)]:'';},VisuMZ[_0x19e25e(0x224)]['Sprite_Gauge_initMembers']=Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x1b8)],Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x1b8)]=function(){const _0x4757ca=_0x19e25e;VisuMZ[_0x4757ca(0x224)]['Sprite_Gauge_initMembers'][_0x4757ca(0x183)](this),this[_0x4757ca(0x1d0)]=null;},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x265)]=Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x192)],Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x192)]=function(_0xfa3265,_0x13f207){const _0xfcadb1=_0x19e25e;this[_0xfcadb1(0x2e0)](_0xfa3265,_0x13f207),_0x13f207=_0x13f207[_0xfcadb1(0x372)](),VisuMZ[_0xfcadb1(0x224)]['Sprite_Gauge_setup'][_0xfcadb1(0x183)](this,_0xfa3265,_0x13f207);},Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x2e0)]=function(_0xed59a5,_0x481284){const _0x29cb26=_0x19e25e,_0x170970=VisuMZ['SkillsStatesCore'][_0x29cb26(0x1e2)][_0x29cb26(0x324)][_0x29cb26(0x24d)](_0xfd34fb=>_0xfd34fb[_0x29cb26(0x218)]['toUpperCase']()===_0x481284[_0x29cb26(0x200)]());_0x170970[_0x29cb26(0x1bf)]>=0x1?this[_0x29cb26(0x1d0)]=_0x170970[0x0]:this[_0x29cb26(0x1d0)]=null;},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x32e)]=Sprite_Gauge['prototype'][_0x19e25e(0x29b)],Sprite_Gauge['prototype'][_0x19e25e(0x29b)]=function(){const _0xd7af78=_0x19e25e;return this[_0xd7af78(0x2b1)]&&this[_0xd7af78(0x1d0)]?this[_0xd7af78(0x384)]():VisuMZ['SkillsStatesCore'][_0xd7af78(0x32e)][_0xd7af78(0x183)](this);},Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x384)]=function(){const _0xa75a92=_0x19e25e;return this[_0xa75a92(0x1d0)]['GaugeCurrentJS']['call'](this['_battler']);},VisuMZ[_0x19e25e(0x224)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x19e25e(0x294)]['currentMaxValue'],Sprite_Gauge[_0x19e25e(0x294)]['currentMaxValue']=function(){const _0x56af6a=_0x19e25e;return this[_0x56af6a(0x2b1)]&&this[_0x56af6a(0x1d0)]?this['currentMaxValueSkillsStatesCore']():VisuMZ['SkillsStatesCore'][_0x56af6a(0x31c)][_0x56af6a(0x183)](this);},Sprite_Gauge['prototype']['currentMaxValueSkillsStatesCore']=function(){const _0x282021=_0x19e25e;return this[_0x282021(0x1d0)][_0x282021(0x1a0)][_0x282021(0x183)](this[_0x282021(0x2b1)]);},VisuMZ['SkillsStatesCore'][_0x19e25e(0x1d1)]=Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x2d0)],Sprite_Gauge[_0x19e25e(0x294)]['gaugeRate']=function(){const _0x35d92b=_0x19e25e,_0x164456=VisuMZ[_0x35d92b(0x224)]['Sprite_Gauge_gaugeRate'][_0x35d92b(0x183)](this);return _0x164456[_0x35d92b(0x2ae)](0x0,0x1);},VisuMZ['SkillsStatesCore'][_0x19e25e(0x18e)]=Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x175)],Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x175)]=function(){const _0x1cb805=_0x19e25e;this[_0x1cb805(0x2b1)]&&this[_0x1cb805(0x1d0)]?(this[_0x1cb805(0x2f4)]['clear'](),this[_0x1cb805(0x358)]()):VisuMZ[_0x1cb805(0x224)]['Sprite_Gauge_redraw'][_0x1cb805(0x183)](this);},Sprite_Gauge['prototype'][_0x19e25e(0x1ab)]=function(){const _0x47cf48=_0x19e25e;let _0xde966=this[_0x47cf48(0x29b)]();return Imported[_0x47cf48(0x223)]&&this[_0x47cf48(0x328)]()&&(_0xde966=VisuMZ['GroupDigits'](_0xde966)),_0xde966;},Sprite_Gauge[_0x19e25e(0x294)][_0x19e25e(0x358)]=function(){const _0x5f2d6f=_0x19e25e;this[_0x5f2d6f(0x1d0)]['GaugeDrawJS'][_0x5f2d6f(0x183)](this);},Sprite_Gauge['prototype']['drawFullGauge']=function(_0x3063be,_0x1aa1c4,_0x3b2428,_0x596a24,_0x5114fa,_0x11e45e){const _0x1235d4=_0x19e25e,_0x346b29=this[_0x1235d4(0x2d0)](),_0x41ecc6=Math[_0x1235d4(0x188)]((_0x5114fa-0x2)*_0x346b29),_0x48751c=_0x11e45e-0x2,_0xc8c9af=this['gaugeBackColor']();this[_0x1235d4(0x2f4)][_0x1235d4(0x2c5)](_0x3b2428,_0x596a24,_0x5114fa,_0x11e45e,_0xc8c9af),this[_0x1235d4(0x2f4)][_0x1235d4(0x1f1)](_0x3b2428+0x1,_0x596a24+0x1,_0x41ecc6,_0x48751c,_0x3063be,_0x1aa1c4);},VisuMZ['SkillsStatesCore'][_0x19e25e(0x33d)]=Sprite_StateIcon['prototype'][_0x19e25e(0x27d)],Sprite_StateIcon[_0x19e25e(0x294)]['loadBitmap']=function(){const _0x3fdc5a=_0x19e25e;VisuMZ['SkillsStatesCore'][_0x3fdc5a(0x33d)]['call'](this),this[_0x3fdc5a(0x16e)]();},Sprite_StateIcon[_0x19e25e(0x294)]['createTurnDisplaySprite']=function(){const _0x1d4f07=_0x19e25e,_0x4928f5=Window_Base[_0x1d4f07(0x294)][_0x1d4f07(0x2f6)]();this['_turnDisplaySprite']=new Sprite(),this[_0x1d4f07(0x2a7)]['bitmap']=new Bitmap(ImageManager[_0x1d4f07(0x1de)],_0x4928f5),this[_0x1d4f07(0x2a7)][_0x1d4f07(0x20d)]['x']=this[_0x1d4f07(0x20d)]['x'],this[_0x1d4f07(0x2a7)]['anchor']['y']=this[_0x1d4f07(0x20d)]['y'],this['addChild'](this[_0x1d4f07(0x2a7)]),this['contents']=this[_0x1d4f07(0x2a7)]['bitmap'];},VisuMZ['SkillsStatesCore'][_0x19e25e(0x1e6)]=Sprite_StateIcon[_0x19e25e(0x294)][_0x19e25e(0x37b)],Sprite_StateIcon[_0x19e25e(0x294)][_0x19e25e(0x37b)]=function(){const _0x50edbb=_0x19e25e;VisuMZ[_0x50edbb(0x224)]['Sprite_StateIcon_updateFrame'][_0x50edbb(0x183)](this),this[_0x50edbb(0x334)]();},Sprite_StateIcon[_0x19e25e(0x294)][_0x19e25e(0x26c)]=function(_0xb1818a,_0x4026fb,_0x3b1977,_0xde0791,_0x5ddf94){const _0x3075d2=_0x19e25e;this['contents'][_0x3075d2(0x26c)](_0xb1818a,_0x4026fb,_0x3b1977,_0xde0791,this[_0x3075d2(0x36b)][_0x3075d2(0x393)],_0x5ddf94);},Sprite_StateIcon[_0x19e25e(0x294)][_0x19e25e(0x334)]=function(){const _0x5827e=_0x19e25e;this[_0x5827e(0x1d5)](),this[_0x5827e(0x36b)][_0x5827e(0x387)]();const _0x407521=this['_battler'];if(!_0x407521)return;const _0x46756d=_0x407521[_0x5827e(0x1fa)]()[_0x5827e(0x24d)](_0x2440c2=>_0x2440c2[_0x5827e(0x21e)]>0x0),_0xe9b88f=[...Array(0x8)[_0x5827e(0x2ea)]()]['filter'](_0x494f96=>_0x407521['buff'](_0x494f96)!==0x0),_0x52aa97=this[_0x5827e(0x1b5)],_0x58f68f=_0x46756d[_0x52aa97];if(_0x58f68f)Window_Base[_0x5827e(0x294)][_0x5827e(0x34e)]['call'](this,_0x407521,_0x58f68f,0x0,0x0),Window_Base[_0x5827e(0x294)][_0x5827e(0x360)][_0x5827e(0x183)](this,_0x407521,_0x58f68f,0x0,0x0);else{const _0xeeeb55=_0xe9b88f[_0x52aa97-_0x46756d[_0x5827e(0x1bf)]];if(!_0xeeeb55)return;Window_Base['prototype'][_0x5827e(0x2bb)][_0x5827e(0x183)](this,_0x407521,_0xeeeb55,0x0,0x0),Window_Base[_0x5827e(0x294)][_0x5827e(0x2d2)][_0x5827e(0x183)](this,_0x407521,_0xeeeb55,0x0,0x0);}},Sprite_StateIcon[_0x19e25e(0x294)][_0x19e25e(0x1d5)]=function(){const _0x4cb579=_0x19e25e;this[_0x4cb579(0x36b)]['fontFace']=$gameSystem[_0x4cb579(0x174)](),this[_0x4cb579(0x36b)][_0x4cb579(0x34b)]=$gameSystem['mainFontSize'](),this[_0x4cb579(0x18a)]();},Sprite_StateIcon[_0x19e25e(0x294)]['resetTextColor']=function(){const _0x167065=_0x19e25e;this[_0x167065(0x37d)](ColorManager[_0x167065(0x2f9)]()),this['changeOutlineColor'](ColorManager[_0x167065(0x20c)]());},Sprite_StateIcon['prototype']['changeTextColor']=function(_0x37b71c){const _0x3b7b5f=_0x19e25e;this[_0x3b7b5f(0x36b)][_0x3b7b5f(0x300)]=_0x37b71c;},Sprite_StateIcon['prototype']['changeOutlineColor']=function(_0x18e56f){const _0x243d25=_0x19e25e;this[_0x243d25(0x36b)][_0x243d25(0x20c)]=_0x18e56f;},Window_Base['prototype'][_0x19e25e(0x225)]=function(_0x1006a8,_0x3d00bd,_0x268f64,_0xf9ffe0,_0x3a5576){const _0xaee3aa=_0x19e25e,_0x3cdc68=this[_0xaee3aa(0x378)](_0x1006a8,_0x3d00bd),_0x453e0d=this[_0xaee3aa(0x339)](_0x3cdc68,_0x268f64,_0xf9ffe0,_0x3a5576),_0x2ba8df=_0x268f64+_0x3a5576-_0x453e0d[_0xaee3aa(0x205)];this['drawTextEx'](_0x3cdc68,_0x2ba8df,_0xf9ffe0,_0x3a5576),this['resetFontSettings']();},Window_Base['prototype'][_0x19e25e(0x378)]=function(_0x359f04,_0x4686c1){const _0x251647=_0x19e25e;let _0x22e01b='';for(settings of VisuMZ['SkillsStatesCore'][_0x251647(0x1e2)]['Costs']){if(!this['isSkillCostShown'](_0x359f04,_0x4686c1,settings))continue;if(_0x22e01b['length']>0x0)_0x22e01b+=this['skillCostSeparator']();_0x22e01b+=this[_0x251647(0x383)](_0x359f04,_0x4686c1,settings);}_0x22e01b=this[_0x251647(0x229)](_0x359f04,_0x4686c1,_0x22e01b);if(_0x4686c1['note'][_0x251647(0x35c)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x22e01b[_0x251647(0x1bf)]>0x0)_0x22e01b+=this[_0x251647(0x23a)]();_0x22e01b+=String(RegExp['$1']);}return _0x22e01b;},Window_Base['prototype'][_0x19e25e(0x229)]=function(_0x4a253b,_0x4ed357,_0x19d3de){return _0x19d3de;},Window_Base[_0x19e25e(0x294)][_0x19e25e(0x1a7)]=function(_0x1bfc59,_0x415aff,_0x52b700){const _0x58e305=_0x19e25e,_0x56d18b=_0x52b700[_0x58e305(0x337)][_0x58e305(0x183)](_0x1bfc59,_0x415aff);return _0x52b700[_0x58e305(0x28a)][_0x58e305(0x183)](_0x1bfc59,_0x415aff,_0x56d18b,_0x52b700);},Window_Base['prototype'][_0x19e25e(0x383)]=function(_0x3b3703,_0x4605e2,_0x330199){const _0x2ffe57=_0x19e25e,_0x197493=_0x330199[_0x2ffe57(0x337)]['call'](_0x3b3703,_0x4605e2);return _0x330199[_0x2ffe57(0x2e7)][_0x2ffe57(0x183)](_0x3b3703,_0x4605e2,_0x197493,_0x330199);},Window_Base['prototype'][_0x19e25e(0x23a)]=function(){return'\x20';},Window_Base['prototype'][_0x19e25e(0x291)]=function(_0x5ba011,_0x2d5a53,_0x59402b,_0x53e2c3){const _0x558ea1=_0x19e25e;if(!_0x5ba011)return;VisuMZ[_0x558ea1(0x224)]['Window_StatusBase_drawActorIcons'][_0x558ea1(0x183)](this,_0x5ba011,_0x2d5a53,_0x59402b,_0x53e2c3),this['drawActorIconsAllTurnCounters'](_0x5ba011,_0x2d5a53,_0x59402b,_0x53e2c3);},Window_Base[_0x19e25e(0x294)]['drawActorIconsAllTurnCounters']=function(_0x40ff2a,_0x5e87e7,_0x5779b8,_0x36670a){const _0x96a997=_0x19e25e;_0x36670a=_0x36670a||0x90;const _0xc3938a=ImageManager[_0x96a997(0x1de)],_0x378626=_0x40ff2a['allIcons']()['slice'](0x0,Math[_0x96a997(0x188)](_0x36670a/_0xc3938a)),_0x24747b=_0x40ff2a['states']()['filter'](_0x2562db=>_0x2562db[_0x96a997(0x21e)]>0x0),_0x21c0a1=[...Array(0x8)[_0x96a997(0x2ea)]()][_0x96a997(0x24d)](_0x4e941a=>_0x40ff2a[_0x96a997(0x298)](_0x4e941a)!==0x0),_0x4b4a97=[];let _0x1494f6=_0x5e87e7;for(let _0x4bce38=0x0;_0x4bce38<_0x378626[_0x96a997(0x1bf)];_0x4bce38++){this[_0x96a997(0x1d5)]();const _0x672352=_0x24747b[_0x4bce38];if(_0x672352)!_0x4b4a97[_0x96a997(0x202)](_0x672352)&&this['drawActorStateTurns'](_0x40ff2a,_0x672352,_0x1494f6,_0x5779b8),this[_0x96a997(0x360)](_0x40ff2a,_0x672352,_0x1494f6,_0x5779b8),_0x4b4a97[_0x96a997(0x375)](_0x672352);else{const _0x25ee48=_0x21c0a1[_0x4bce38-_0x24747b[_0x96a997(0x1bf)]];this[_0x96a997(0x2bb)](_0x40ff2a,_0x25ee48,_0x1494f6,_0x5779b8),this['drawActorBuffRates'](_0x40ff2a,_0x25ee48,_0x1494f6,_0x5779b8);}_0x1494f6+=_0xc3938a;}},Window_Base[_0x19e25e(0x294)][_0x19e25e(0x34e)]=function(_0xb1c19b,_0x3f6247,_0x446f71,_0x1fda02){const _0x54b977=_0x19e25e;if(!VisuMZ[_0x54b977(0x224)]['Settings']['States'][_0x54b977(0x341)])return;if(!_0xb1c19b[_0x54b977(0x2f1)](_0x3f6247['id']))return;if(_0x3f6247[_0x54b977(0x246)]===0x0)return;if(_0x3f6247['note'][_0x54b977(0x35c)](/<HIDE STATE TURNS>/i))return;const _0x24cdde=_0xb1c19b['stateTurns'](_0x3f6247['id']),_0x448ba0=ImageManager[_0x54b977(0x1de)],_0x2684cf=ColorManager[_0x54b977(0x314)](_0x3f6247);this[_0x54b977(0x37d)](_0x2684cf),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x54b977(0x36b)][_0x54b977(0x179)]=!![],this[_0x54b977(0x36b)][_0x54b977(0x34b)]=VisuMZ[_0x54b977(0x224)][_0x54b977(0x1e2)][_0x54b977(0x237)][_0x54b977(0x307)],_0x446f71+=VisuMZ[_0x54b977(0x224)][_0x54b977(0x1e2)][_0x54b977(0x237)][_0x54b977(0x28b)],_0x1fda02+=VisuMZ[_0x54b977(0x224)][_0x54b977(0x1e2)]['States'][_0x54b977(0x2ca)],this[_0x54b977(0x26c)](_0x24cdde,_0x446f71,_0x1fda02,_0x448ba0,_0x54b977(0x1c3)),this[_0x54b977(0x36b)][_0x54b977(0x179)]=![],this[_0x54b977(0x1d5)]();},Window_Base[_0x19e25e(0x294)]['drawActorStateData']=function(_0x2b3658,_0xd7323b,_0x4b3f72,_0xe6c82b){const _0x54f99e=_0x19e25e;if(!VisuMZ[_0x54f99e(0x224)][_0x54f99e(0x1e2)][_0x54f99e(0x237)][_0x54f99e(0x1c0)])return;const _0x38e3be=ImageManager['iconWidth'],_0x12e958=ImageManager[_0x54f99e(0x257)]/0x2,_0x342a27=ColorManager[_0x54f99e(0x2f9)]();this['changeTextColor'](_0x342a27),this[_0x54f99e(0x34f)](_0x54f99e(0x184)),this['contents']['fontBold']=!![],this[_0x54f99e(0x36b)]['fontSize']=VisuMZ['SkillsStatesCore']['Settings']['States']['DataFontSize'],_0x4b3f72+=VisuMZ[_0x54f99e(0x224)][_0x54f99e(0x1e2)][_0x54f99e(0x237)][_0x54f99e(0x201)],_0xe6c82b+=VisuMZ[_0x54f99e(0x224)]['Settings'][_0x54f99e(0x237)][_0x54f99e(0x27a)];const _0x10ad62=String(_0x2b3658['getStateDisplay'](_0xd7323b['id']));this[_0x54f99e(0x26c)](_0x10ad62,_0x4b3f72,_0xe6c82b,_0x38e3be,_0x54f99e(0x2c1)),this[_0x54f99e(0x36b)][_0x54f99e(0x179)]=![],this[_0x54f99e(0x1d5)]();},Window_Base[_0x19e25e(0x294)][_0x19e25e(0x2bb)]=function(_0x2ec377,_0x3474dc,_0xd5a373,_0x324847){const _0x1fd3ce=_0x19e25e;if(!VisuMZ['SkillsStatesCore']['Settings'][_0x1fd3ce(0x2dc)][_0x1fd3ce(0x341)])return;const _0x197bbf=_0x2ec377['buff'](_0x3474dc);if(_0x197bbf===0x0)return;const _0x3e7d41=_0x2ec377['buffTurns'](_0x3474dc),_0x597e8b=ImageManager['iconWidth'],_0x540414=_0x197bbf>0x0?ColorManager[_0x1fd3ce(0x1df)]():ColorManager[_0x1fd3ce(0x258)]();this[_0x1fd3ce(0x37d)](_0x540414),this[_0x1fd3ce(0x34f)](_0x1fd3ce(0x184)),this[_0x1fd3ce(0x36b)][_0x1fd3ce(0x179)]=!![],this[_0x1fd3ce(0x36b)][_0x1fd3ce(0x34b)]=VisuMZ['SkillsStatesCore'][_0x1fd3ce(0x1e2)]['Buffs'][_0x1fd3ce(0x307)],_0xd5a373+=VisuMZ[_0x1fd3ce(0x224)][_0x1fd3ce(0x1e2)][_0x1fd3ce(0x2dc)][_0x1fd3ce(0x28b)],_0x324847+=VisuMZ[_0x1fd3ce(0x224)][_0x1fd3ce(0x1e2)][_0x1fd3ce(0x2dc)][_0x1fd3ce(0x2ca)],this[_0x1fd3ce(0x26c)](_0x3e7d41,_0xd5a373,_0x324847,_0x597e8b,_0x1fd3ce(0x1c3)),this['contents'][_0x1fd3ce(0x179)]=![],this['resetFontSettings']();},Window_Base[_0x19e25e(0x294)]['drawActorBuffRates']=function(_0x214ec1,_0x3d82fc,_0x21b6ba,_0x56d2ef){const _0x1e00d0=_0x19e25e;if(!VisuMZ[_0x1e00d0(0x224)][_0x1e00d0(0x1e2)]['Buffs'][_0x1e00d0(0x1c0)])return;const _0x1290ef=_0x214ec1[_0x1e00d0(0x23d)](_0x3d82fc),_0x1dad04=_0x214ec1[_0x1e00d0(0x298)](_0x3d82fc),_0x1ac6ff=ImageManager[_0x1e00d0(0x1de)],_0x589b8a=ImageManager[_0x1e00d0(0x257)]/0x2,_0x4eea5a=_0x1dad04>0x0?ColorManager['buffColor']():ColorManager['debuffColor']();this[_0x1e00d0(0x37d)](_0x4eea5a),this[_0x1e00d0(0x34f)](_0x1e00d0(0x184)),this[_0x1e00d0(0x36b)][_0x1e00d0(0x179)]=!![],this['contents'][_0x1e00d0(0x34b)]=VisuMZ[_0x1e00d0(0x224)][_0x1e00d0(0x1e2)][_0x1e00d0(0x2dc)][_0x1e00d0(0x323)],_0x21b6ba+=VisuMZ[_0x1e00d0(0x224)][_0x1e00d0(0x1e2)][_0x1e00d0(0x2dc)]['DataOffsetX'],_0x56d2ef+=VisuMZ[_0x1e00d0(0x224)][_0x1e00d0(0x1e2)][_0x1e00d0(0x2dc)][_0x1e00d0(0x27a)];const _0x535489=_0x1e00d0(0x376)['format'](Math[_0x1e00d0(0x1f3)](_0x1290ef*0x64));this[_0x1e00d0(0x26c)](_0x535489,_0x21b6ba,_0x56d2ef,_0x1ac6ff,_0x1e00d0(0x2c1)),this[_0x1e00d0(0x36b)][_0x1e00d0(0x179)]=![],this[_0x1e00d0(0x1d5)]();},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x1e9)]=Window_StatusBase[_0x19e25e(0x294)][_0x19e25e(0x38e)],Window_StatusBase[_0x19e25e(0x294)]['placeGauge']=function(_0x5193c3,_0x535289,_0x391f3a,_0x2f9a92){const _0xe0dd41=_0x19e25e;if(_0x5193c3['isActor']())_0x535289=this[_0xe0dd41(0x2ad)](_0x5193c3,_0x535289);this[_0xe0dd41(0x2cd)](_0x5193c3,_0x535289,_0x391f3a,_0x2f9a92);},Window_StatusBase[_0x19e25e(0x294)][_0x19e25e(0x2cd)]=function(_0x575364,_0x44ba95,_0x443951,_0x29db7f){const _0x3a22bf=_0x19e25e;if([_0x3a22bf(0x199),_0x3a22bf(0x301)]['includes'](_0x44ba95[_0x3a22bf(0x372)]()))return;VisuMZ[_0x3a22bf(0x224)][_0x3a22bf(0x1e9)]['call'](this,_0x575364,_0x44ba95,_0x443951,_0x29db7f);},Window_StatusBase[_0x19e25e(0x294)][_0x19e25e(0x2ad)]=function(_0xb4a19f,_0x26fe64){const _0x17b995=_0x19e25e,_0x2e9ab7=_0xb4a19f[_0x17b995(0x391)]()[_0x17b995(0x34c)];if(_0x26fe64==='hp'&&_0x2e9ab7[_0x17b995(0x35c)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x26fe64==='mp'&&_0x2e9ab7['match'](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x26fe64==='tp'&&_0x2e9ab7[_0x17b995(0x35c)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x26fe64;}},VisuMZ['SkillsStatesCore'][_0x19e25e(0x24c)]=Window_StatusBase[_0x19e25e(0x294)]['drawActorIcons'],Window_StatusBase['prototype'][_0x19e25e(0x291)]=function(_0xdb9d69,_0x3dd8a6,_0x3e3452,_0x41a61f){const _0x509d7f=_0x19e25e;if(!_0xdb9d69)return;Window_Base[_0x509d7f(0x294)][_0x509d7f(0x291)]['call'](this,_0xdb9d69,_0x3dd8a6,_0x3e3452,_0x41a61f);},VisuMZ[_0x19e25e(0x224)]['Window_SkillType_initialize']=Window_SkillType['prototype'][_0x19e25e(0x3a2)],Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x3a2)]=function(_0x5d2d32){const _0x5bd559=_0x19e25e;VisuMZ[_0x5bd559(0x224)][_0x5bd559(0x1bc)]['call'](this,_0x5d2d32),this[_0x5bd559(0x30c)](_0x5d2d32);},Window_SkillType[_0x19e25e(0x294)]['createCommandNameWindow']=function(_0x5842eb){const _0x1c7d78=_0x19e25e,_0x2a701f=new Rectangle(0x0,0x0,_0x5842eb[_0x1c7d78(0x205)],_0x5842eb[_0x1c7d78(0x393)]);this[_0x1c7d78(0x361)]=new Window_Base(_0x2a701f),this[_0x1c7d78(0x361)][_0x1c7d78(0x356)]=0x0,this[_0x1c7d78(0x38c)](this[_0x1c7d78(0x361)]),this[_0x1c7d78(0x1c1)]();},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x351)]=function(){const _0x4c01df=_0x19e25e;Window_Command['prototype']['callUpdateHelp'][_0x4c01df(0x183)](this);if(this[_0x4c01df(0x361)])this['updateCommandNameWindow']();},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x1c1)]=function(){const _0x7e1ade=_0x19e25e,_0x4a5b1b=this['_commandNameWindow'];_0x4a5b1b[_0x7e1ade(0x36b)][_0x7e1ade(0x387)]();const _0x2a3d97=this[_0x7e1ade(0x16d)](this[_0x7e1ade(0x210)]());if(_0x2a3d97===_0x7e1ade(0x31b)&&this[_0x7e1ade(0x299)]()>0x0){const _0x2e14c6=this[_0x7e1ade(0x396)](this['index']());let _0x57ef45=this[_0x7e1ade(0x36e)](this['index']());_0x57ef45=_0x57ef45[_0x7e1ade(0x1ff)](/\\I\[(\d+)\]/gi,''),_0x4a5b1b[_0x7e1ade(0x1d5)](),this['commandNameWindowDrawBackground'](_0x57ef45,_0x2e14c6),this[_0x7e1ade(0x23f)](_0x57ef45,_0x2e14c6),this['commandNameWindowCenter'](_0x57ef45,_0x2e14c6);}},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x226)]=function(_0x958f7f,_0x3dd24e){},Window_SkillType['prototype'][_0x19e25e(0x23f)]=function(_0x1ebfe6,_0xd56ea1){const _0x2f8b8c=_0x19e25e,_0x4ced4e=this[_0x2f8b8c(0x361)];_0x4ced4e[_0x2f8b8c(0x26c)](_0x1ebfe6,0x0,_0xd56ea1['y'],_0x4ced4e[_0x2f8b8c(0x1f8)],_0x2f8b8c(0x2c1));},Window_SkillType[_0x19e25e(0x294)]['commandNameWindowCenter']=function(_0xc8c5ca,_0xbba812){const _0x3d2bac=_0x19e25e,_0x2560c9=this[_0x3d2bac(0x361)],_0x31cce2=$gameSystem['windowPadding'](),_0xd4855c=_0xbba812['x']+Math[_0x3d2bac(0x188)](_0xbba812[_0x3d2bac(0x205)]/0x2)+_0x31cce2;_0x2560c9['x']=_0x2560c9[_0x3d2bac(0x205)]/-0x2+_0xd4855c,_0x2560c9['y']=Math[_0x3d2bac(0x188)](_0xbba812[_0x3d2bac(0x393)]/0x2);},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x28e)]=function(){const _0x4a7992=_0x19e25e;return Imported[_0x4a7992(0x223)]&&Window_Command[_0x4a7992(0x294)]['isUseModernControls'][_0x4a7992(0x183)](this);},Window_SkillType['prototype'][_0x19e25e(0x234)]=function(){const _0x4ebc6a=_0x19e25e;if(!this[_0x4ebc6a(0x390)])return;const _0x3305ee=this['_actor'][_0x4ebc6a(0x381)]();for(const _0x4eb604 of _0x3305ee){const _0x4b3eee=this['makeCommandName'](_0x4eb604);this['addCommand'](_0x4b3eee,_0x4ebc6a(0x1f0),!![],_0x4eb604);}},Window_SkillType[_0x19e25e(0x294)]['makeCommandName']=function(_0x54a0a2){const _0x420aa2=_0x19e25e;let _0x571d02=$dataSystem[_0x420aa2(0x381)][_0x54a0a2];if(_0x571d02[_0x420aa2(0x35c)](/\\I\[(\d+)\]/i))return _0x571d02;if(this[_0x420aa2(0x2d3)]()==='text')return _0x571d02;const _0x2196f8=VisuMZ[_0x420aa2(0x224)]['Settings'][_0x420aa2(0x28d)],_0x5b8da7=$dataSystem[_0x420aa2(0x1b0)][_0x420aa2(0x202)](_0x54a0a2),_0x157cc8=_0x5b8da7?_0x2196f8[_0x420aa2(0x2b4)]:_0x2196f8['IconStypeNorm'];return _0x420aa2(0x38b)[_0x420aa2(0x289)](_0x157cc8,_0x571d02);},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x250)]=function(){return VisuMZ['SkillsStatesCore']['Settings']['Skills']['CmdTextAlign'];},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x3a0)]=function(_0x543dab){const _0x1286b5=_0x19e25e,_0x5e6d23=this['commandStyleCheck'](_0x543dab);if(_0x5e6d23===_0x1286b5(0x18f))this[_0x1286b5(0x18c)](_0x543dab);else _0x5e6d23===_0x1286b5(0x31b)?this[_0x1286b5(0x308)](_0x543dab):Window_Command[_0x1286b5(0x294)][_0x1286b5(0x3a0)][_0x1286b5(0x183)](this,_0x543dab);},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x2d3)]=function(){const _0x71b89e=_0x19e25e;return VisuMZ[_0x71b89e(0x224)]['Settings'][_0x71b89e(0x28d)][_0x71b89e(0x29e)];},Window_SkillType['prototype']['commandStyleCheck']=function(_0x36f346){const _0x4312f8=_0x19e25e;if(_0x36f346<0x0)return'text';const _0x39458f=this[_0x4312f8(0x2d3)]();if(_0x39458f!==_0x4312f8(0x255))return _0x39458f;else{if(this[_0x4312f8(0x299)]()>0x0){const _0x32ea6c=this[_0x4312f8(0x36e)](_0x36f346);if(_0x32ea6c[_0x4312f8(0x35c)](/\\I\[(\d+)\]/i)){const _0xcfa11a=this[_0x4312f8(0x396)](_0x36f346),_0x3ac6b8=this['textSizeEx'](_0x32ea6c)['width'];return _0x3ac6b8<=_0xcfa11a[_0x4312f8(0x205)]?_0x4312f8(0x18f):_0x4312f8(0x31b);}}}return _0x4312f8(0x2e9);},Window_SkillType['prototype'][_0x19e25e(0x18c)]=function(_0x41e5da){const _0x47f2b4=_0x19e25e,_0x124576=this[_0x47f2b4(0x396)](_0x41e5da),_0x39d462=this[_0x47f2b4(0x36e)](_0x41e5da),_0x52ad4c=this['textSizeEx'](_0x39d462)['width'];this[_0x47f2b4(0x1fd)](this[_0x47f2b4(0x1f6)](_0x41e5da));const _0x108b5a=this[_0x47f2b4(0x250)]();if(_0x108b5a===_0x47f2b4(0x1c3))this[_0x47f2b4(0x17f)](_0x39d462,_0x124576['x']+_0x124576[_0x47f2b4(0x205)]-_0x52ad4c,_0x124576['y'],_0x52ad4c);else{if(_0x108b5a===_0x47f2b4(0x2c1)){const _0x4f995b=_0x124576['x']+Math['floor']((_0x124576[_0x47f2b4(0x205)]-_0x52ad4c)/0x2);this[_0x47f2b4(0x17f)](_0x39d462,_0x4f995b,_0x124576['y'],_0x52ad4c);}else this['drawTextEx'](_0x39d462,_0x124576['x'],_0x124576['y'],_0x52ad4c);}},Window_SkillType[_0x19e25e(0x294)][_0x19e25e(0x308)]=function(_0x5cec3a){const _0x2813ee=_0x19e25e;this[_0x2813ee(0x36e)](_0x5cec3a)[_0x2813ee(0x35c)](/\\I\[(\d+)\]/i);const _0x546a1d=Number(RegExp['$1'])||0x0,_0x240bcf=this[_0x2813ee(0x396)](_0x5cec3a),_0x4aba93=_0x240bcf['x']+Math[_0x2813ee(0x188)]((_0x240bcf['width']-ImageManager['iconWidth'])/0x2),_0x51335b=_0x240bcf['y']+(_0x240bcf['height']-ImageManager[_0x2813ee(0x257)])/0x2;this['drawIcon'](_0x546a1d,_0x4aba93,_0x51335b);},VisuMZ[_0x19e25e(0x224)][_0x19e25e(0x2cb)]=Window_SkillStatus[_0x19e25e(0x294)][_0x19e25e(0x1e0)],Window_SkillStatus['prototype'][_0x19e25e(0x1e0)]=function(){const _0x1f0e98=_0x19e25e;VisuMZ[_0x1f0e98(0x224)]['Window_SkillStatus_refresh'][_0x1f0e98(0x183)](this);if(this[_0x1f0e98(0x390)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x19e25e(0x294)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x1f7caa=_0x19e25e;if(!Imported[_0x1f7caa(0x223)])return;if(!Imported[_0x1f7caa(0x2ef)])return;const _0x48cebf=this['gaugeLineHeight']();let _0x2b9c4b=this[_0x1f7caa(0x253)]()/0x2+0xb4+0xb4+0xb4,_0x47d585=this[_0x1f7caa(0x1f8)]-_0x2b9c4b-0x2;if(_0x47d585>=0x12c){const _0x30d4be=VisuMZ[_0x1f7caa(0x1d3)][_0x1f7caa(0x1e2)][_0x1f7caa(0x271)][_0x1f7caa(0x278)],_0x28bfbd=Math[_0x1f7caa(0x188)](_0x47d585/0x2)-0x18;let _0x3c26fd=_0x2b9c4b,_0x44b4c1=Math[_0x1f7caa(0x188)]((this[_0x1f7caa(0x267)]-Math[_0x1f7caa(0x1cb)](_0x30d4be['length']/0x2)*_0x48cebf)/0x2),_0x18eca2=0x0;for(const _0x465499 of _0x30d4be){this[_0x1f7caa(0x36a)](_0x3c26fd,_0x44b4c1,_0x28bfbd,_0x465499),_0x18eca2++,_0x18eca2%0x2===0x0?(_0x3c26fd=_0x2b9c4b,_0x44b4c1+=_0x48cebf):_0x3c26fd+=_0x28bfbd+0x18;}}this[_0x1f7caa(0x1d5)]();},Window_SkillStatus[_0x19e25e(0x294)][_0x19e25e(0x36a)]=function(_0x26aeaa,_0x483b27,_0x1a37a3,_0x5e0f3f){const _0x3bab62=_0x19e25e,_0x199a3e=this['gaugeLineHeight']();this[_0x3bab62(0x1d5)](),this['drawParamText'](_0x26aeaa,_0x483b27,_0x1a37a3,_0x5e0f3f,!![]),this[_0x3bab62(0x18a)](),this['contents'][_0x3bab62(0x34b)]-=0x8;const _0x4ca1d5=this[_0x3bab62(0x390)][_0x3bab62(0x171)](_0x5e0f3f,!![]);this[_0x3bab62(0x36b)]['drawText'](_0x4ca1d5,_0x26aeaa,_0x483b27,_0x1a37a3,_0x199a3e,_0x3bab62(0x1c3));},VisuMZ['SkillsStatesCore'][_0x19e25e(0x2fb)]=Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x202)],Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x202)]=function(_0x251a1e){const _0x5cb8de=_0x19e25e;return this[_0x5cb8de(0x23e)](_0x251a1e);},VisuMZ['SkillsStatesCore']['Window_SkillList_maxCols']=Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x332)],Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x332)]=function(){const _0x5e8493=_0x19e25e;return SceneManager[_0x5e8493(0x22c)][_0x5e8493(0x2c9)]===Scene_Battle?VisuMZ[_0x5e8493(0x224)][_0x5e8493(0x178)]['call'](this):VisuMZ['SkillsStatesCore'][_0x5e8493(0x1e2)][_0x5e8493(0x28d)][_0x5e8493(0x20f)];},VisuMZ['SkillsStatesCore'][_0x19e25e(0x1d8)]=Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x26e)],Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x26e)]=function(_0x2c0290){const _0x1f4900=_0x19e25e,_0x557e2d=this['_actor']!==_0x2c0290;VisuMZ[_0x1f4900(0x224)][_0x1f4900(0x1d8)][_0x1f4900(0x183)](this,_0x2c0290),_0x557e2d&&(this[_0x1f4900(0x2c6)]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x1f4900(0x2c6)][_0x1f4900(0x35b)](this[_0x1f4900(0x212)](0x0)));},Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x333)]=function(_0x36aedb){const _0x3117cc=_0x19e25e;if(this[_0x3117cc(0x24a)]===_0x36aedb)return;this[_0x3117cc(0x24a)]=_0x36aedb,this[_0x3117cc(0x1e0)](),this['scrollTo'](0x0,0x0),this[_0x3117cc(0x2c6)]&&this[_0x3117cc(0x2c6)][_0x3117cc(0x2c9)]===Window_ShopStatus&&this['_statusWindow'][_0x3117cc(0x35b)](this[_0x3117cc(0x212)](0x0));},Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x23e)]=function(_0x92c46a){const _0x382cae=_0x19e25e;if(!_0x92c46a)return VisuMZ[_0x382cae(0x224)][_0x382cae(0x2fb)][_0x382cae(0x183)](this,_0x92c46a);if(!this[_0x382cae(0x374)](_0x92c46a))return![];if(!this['checkShowHideNotetags'](_0x92c46a))return![];if(!this['checkShowHideJS'](_0x92c46a))return![];return!![];},Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x374)]=function(_0x3447fc){const _0x1c2b6b=_0x19e25e;return DataManager[_0x1c2b6b(0x39e)](_0x3447fc)['includes'](this['_stypeId']);},Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x268)]=function(_0x4bf2bb){const _0x23b586=_0x19e25e;if(!this['checkShowHideBattleNotetags'](_0x4bf2bb))return![];if(!this[_0x23b586(0x37e)](_0x4bf2bb))return![];if(!this[_0x23b586(0x254)](_0x4bf2bb))return![];return!![];},Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x1d7)]=function(_0x3fe8da){const _0x4c9a8d=_0x19e25e,_0x1480dc=_0x3fe8da[_0x4c9a8d(0x34c)];if(_0x1480dc[_0x4c9a8d(0x35c)](/<HIDE IN BATTLE>/i)&&$gameParty['inBattle']())return![];else return _0x1480dc['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x4c9a8d(0x318)]()?![]:!![];},Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x37e)]=function(_0xcf4fea){const _0x37a7cf=_0x19e25e,_0x3d6809=_0xcf4fea['note'];if(_0x3d6809['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd4d2eb=JSON[_0x37a7cf(0x2ec)]('['+RegExp['$1'][_0x37a7cf(0x35c)](/\d+/g)+']');for(const _0x557ad4 of _0xd4d2eb){if(!$gameSwitches[_0x37a7cf(0x1a6)](_0x557ad4))return![];}return!![];}if(_0x3d6809['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b9f87=JSON[_0x37a7cf(0x2ec)]('['+RegExp['$1'][_0x37a7cf(0x35c)](/\d+/g)+']');for(const _0x543637 of _0x1b9f87){if(!$gameSwitches['value'](_0x543637))return![];}return!![];}if(_0x3d6809[_0x37a7cf(0x35c)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x84a84c=JSON[_0x37a7cf(0x2ec)]('['+RegExp['$1'][_0x37a7cf(0x35c)](/\d+/g)+']');for(const _0x2278c2 of _0x84a84c){if($gameSwitches[_0x37a7cf(0x1a6)](_0x2278c2))return!![];}return![];}if(_0x3d6809['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ab883=JSON[_0x37a7cf(0x2ec)]('['+RegExp['$1'][_0x37a7cf(0x35c)](/\d+/g)+']');for(const _0x4a13b1 of _0x1ab883){if(!$gameSwitches[_0x37a7cf(0x1a6)](_0x4a13b1))return!![];}return![];}if(_0x3d6809[_0x37a7cf(0x35c)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4fcdc8=JSON['parse']('['+RegExp['$1'][_0x37a7cf(0x35c)](/\d+/g)+']');for(const _0x2a70fb of _0x4fcdc8){if(!$gameSwitches[_0x37a7cf(0x1a6)](_0x2a70fb))return!![];}return![];}if(_0x3d6809['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x352c5e=JSON[_0x37a7cf(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x972f12 of _0x352c5e){if($gameSwitches[_0x37a7cf(0x1a6)](_0x972f12))return![];}return!![];}return!![];},Window_SkillList[_0x19e25e(0x294)]['checkShowHideSkillNotetags']=function(_0x4745fa){const _0x41b4f6=_0x19e25e,_0x370c9f=_0x4745fa[_0x41b4f6(0x34c)];if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x213465=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2b49d5 of _0x213465){if(!this[_0x41b4f6(0x390)][_0x41b4f6(0x382)](_0x2b49d5))return![];}return!![];}else{if(_0x370c9f['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x212c9c=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x5562dc of _0x212c9c){const _0x252218=DataManager[_0x41b4f6(0x364)](_0x5562dc);if(!_0x252218)continue;if(!this['_actor'][_0x41b4f6(0x382)](_0x252218))return![];}return!![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa314c9=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x500836 of _0xa314c9){if(!this[_0x41b4f6(0x390)]['isLearnedSkill'](_0x500836))return![];}return!![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x208123=RegExp['$1']['split'](',');for(const _0xf951da of _0x208123){const _0x1129a6=DataManager[_0x41b4f6(0x364)](_0xf951da);if(!_0x1129a6)continue;if(!this[_0x41b4f6(0x390)][_0x41b4f6(0x382)](_0x1129a6))return![];}return!![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x124014=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4d94a1 of _0x124014){if(this[_0x41b4f6(0x390)][_0x41b4f6(0x382)](_0x4d94a1))return!![];}return![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x513519=RegExp['$1']['split'](',');for(const _0x450341 of _0x513519){const _0x15b044=DataManager[_0x41b4f6(0x364)](_0x450341);if(!_0x15b044)continue;if(this[_0x41b4f6(0x390)]['isLearnedSkill'](_0x15b044))return!![];}return![];}}if(_0x370c9f['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x327b43=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x89bad2 of _0x327b43){if(!this[_0x41b4f6(0x390)][_0x41b4f6(0x382)](_0x89bad2))return!![];}return![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x548229=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x3322ca of _0x548229){const _0x28a2e6=DataManager[_0x41b4f6(0x364)](_0x3322ca);if(!_0x28a2e6)continue;if(!this[_0x41b4f6(0x390)]['isLearnedSkill'](_0x28a2e6))return!![];}return![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2db6f3=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x39c8f0 of _0x2db6f3){if(!this[_0x41b4f6(0x390)]['isLearnedSkill'](_0x39c8f0))return!![];}return![];}else{if(_0x370c9f['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3b3a44=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x4b0628 of _0x3b3a44){const _0x155371=DataManager[_0x41b4f6(0x364)](_0x4b0628);if(!_0x155371)continue;if(!this['_actor'][_0x41b4f6(0x382)](_0x155371))return!![];}return![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d2d1d=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x1b9e41 of _0x4d2d1d){if(this[_0x41b4f6(0x390)]['isLearnedSkill'](_0x1b9e41))return![];}return!![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xe5588b=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x16fc35 of _0xe5588b){const _0x3e7b8f=DataManager[_0x41b4f6(0x364)](_0x16fc35);if(!_0x3e7b8f)continue;if(this['_actor'][_0x41b4f6(0x382)](_0x3e7b8f))return![];}return!![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1259c7=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x32ae33 of _0x1259c7){if(!this[_0x41b4f6(0x390)][_0x41b4f6(0x195)](_0x32ae33))return![];}return!![];}else{if(_0x370c9f['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2acb2c=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x1a660a of _0x2acb2c){const _0xf96350=DataManager[_0x41b4f6(0x364)](_0x1a660a);if(!_0xf96350)continue;if(!this['_actor']['hasSkill'](_0xf96350))return![];}return!![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3efc1f=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x503281 of _0x3efc1f){if(!this[_0x41b4f6(0x390)]['hasSkill'](_0x503281))return![];}return!![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x22ec5d=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x4d7860 of _0x22ec5d){const _0x3226af=DataManager[_0x41b4f6(0x364)](_0x4d7860);if(!_0x3226af)continue;if(!this['_actor']['hasSkill'](_0x3226af))return![];}return!![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x291975=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x5c5857 of _0x291975){if(this['_actor'][_0x41b4f6(0x195)](_0x5c5857))return!![];}return![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x57674b=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x55e71e of _0x57674b){const _0x19fbe7=DataManager['getSkillIdWithName'](_0x55e71e);if(!_0x19fbe7)continue;if(this[_0x41b4f6(0x390)][_0x41b4f6(0x195)](_0x19fbe7))return!![];}return![];}}if(_0x370c9f['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38fe8d=JSON['parse']('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x181cc8 of _0x38fe8d){if(!this[_0x41b4f6(0x390)][_0x41b4f6(0x195)](_0x181cc8))return!![];}return![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x440fe4=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x592a4b of _0x440fe4){const _0x3abc96=DataManager['getSkillIdWithName'](_0x592a4b);if(!_0x3abc96)continue;if(!this['_actor'][_0x41b4f6(0x195)](_0x3abc96))return!![];}return![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x214295=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1'][_0x41b4f6(0x35c)](/\d+/g)+']');for(const _0x3f4523 of _0x214295){if(!this['_actor'][_0x41b4f6(0x195)](_0x3f4523))return!![];}return![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5df8ac=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x183f39 of _0x5df8ac){const _0x23116c=DataManager[_0x41b4f6(0x364)](_0x183f39);if(!_0x23116c)continue;if(!this[_0x41b4f6(0x390)][_0x41b4f6(0x195)](_0x23116c))return!![];}return![];}}if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x401bf9=JSON[_0x41b4f6(0x2ec)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2c6c50 of _0x401bf9){if(this[_0x41b4f6(0x390)][_0x41b4f6(0x195)](_0x2c6c50))return![];}return!![];}else{if(_0x370c9f[_0x41b4f6(0x35c)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x20d7e9=RegExp['$1'][_0x41b4f6(0x385)](',');for(const _0x77d37f of _0x20d7e9){const _0x1283df=DataManager[_0x41b4f6(0x364)](_0x77d37f);if(!_0x1283df)continue;if(this[_0x41b4f6(0x390)][_0x41b4f6(0x195)](_0x1283df))return![];}return!![];}}return!![];},Window_SkillList[_0x19e25e(0x294)]['checkShowHideJS']=function(_0x11781a){const _0x1779b0=_0x19e25e,_0x2671bc=_0x11781a[_0x1779b0(0x34c)],_0x2b3ec5=VisuMZ[_0x1779b0(0x224)][_0x1779b0(0x236)];return _0x2b3ec5[_0x11781a['id']]?_0x2b3ec5[_0x11781a['id']][_0x1779b0(0x183)](this,_0x11781a):!![];},Window_SkillList['prototype'][_0x19e25e(0x225)]=function(_0x441101,_0x196214,_0xd77257,_0x2bbead){const _0x36ad1a=_0x19e25e;Window_Base['prototype'][_0x36ad1a(0x225)]['call'](this,this[_0x36ad1a(0x390)],_0x441101,_0x196214,_0xd77257,_0x2bbead);},Window_SkillList['prototype'][_0x19e25e(0x34a)]=function(_0x38b2f9){const _0x1740e9=_0x19e25e;this[_0x1740e9(0x2c6)]=_0x38b2f9,this[_0x1740e9(0x351)]();},VisuMZ['SkillsStatesCore'][_0x19e25e(0x222)]=Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x33e)],Window_SkillList[_0x19e25e(0x294)][_0x19e25e(0x33e)]=function(){const _0x10d256=_0x19e25e;VisuMZ[_0x10d256(0x224)][_0x10d256(0x222)][_0x10d256(0x183)](this),this[_0x10d256(0x2c6)]&&this['_statusWindow'][_0x10d256(0x2c9)]===Window_ShopStatus&&this[_0x10d256(0x2c6)][_0x10d256(0x35b)](this[_0x10d256(0x1fc)]());};