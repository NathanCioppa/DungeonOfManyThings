// Purpose of this file is to turn the data from https://github.com/5e-bits/5e-database/blob/main/src/2014/5e-SRD-Monsters.json
// into data that is specifically able to be used in this codebase.
//
// Any additional monsters would have to be added individually(tools will be made to do this in the future)
// This is just meant to be a neat way to add a large amount of well known D&D monsters into this game.
//
// This will not be run or used in the game. It is strictly a development tool.
// Ex: If at some point I decide that monster proficiencies are relevant to the game, I would add a function to this file that rips monster proficiences from 5e-SRD-Monsters.json and formats those proficiences in a usable way.

module.exports = {
    sanitizeMonsters,
    sanitizeMonster,
    getName,
    getSize,
    getType,
    getSubtype,
    getArmorClass,
    getHitPoints,
    getHitPointsRoll,
    getSpeed,
    getStrength,
    getDexterity,
    getConstitution,
    getIntelligence,
    getWisdom,
    getCharisma,
    getChallengeRating,
    getXP,
    getAlignment,
    checkIsLegendary,
    getSpellcasting
};

const fs = require('fs');

function sanitizeMonsters(monsters) {
    if (!Array.isArray(monsters)) {
        console.warn('Input is not an array, returning empty array.');
        return [];
    }
    return monsters.map(sanitizeMonster);
}

function sanitizeMonster(monster) {
    return {
        name: getName(monster),
        size: getSize(monster.size),
        type: getType(monster),
        subtype: getSubtype(monster),
        armor_class: getArmorClass(monster),
        hit_points: getHitPoints(monster),
        hit_points_roll: getHitPointsRoll(monster),
        speed: getSpeed(monster.speed),
        strength: getStrength(monster),
        dexterity: getDexterity(monster),
        constitution: getConstitution(monster),
        intelligence: getIntelligence(monster),
        wisdom: getWisdom(monster),
        charisma: getCharisma(monster),
        challenge_rating: getChallengeRating(monster),
        xp: getXP(monster),
        is_legendary: checkIsLegendary(monster),
        spellcasting: getSpellcasting(monster),
        alignment: getAlignment(monster)
    };
}

function getName(monster) {
    return monster.name !== undefined ? monster.name.toString() : "";
}

function getType(monster) {
    return monster.type !== undefined ? monster.type.toString() : "";
}

function getSubtype(monster) {
    return monster.subtype !== undefined ? monster.subtype.toString() : "";
}

function getHitPointsRoll(monster) {
    const validHitPointRollRegex = /^\d+d\d+(?:[-+]\d+)?$/
    if (monster.hit_points_roll == undefined)
        return ""

    return validHitPointRollRegex.test(monster.hit_points_roll) ? monster.hit_points_roll : "";
}

function getHitPoints(monster) {
    if (typeof monster.hit_points !== 'number') {
        return -1;
    }
    return monster.hit_points;
}

function getStrength(monster) {
    if (typeof monster.strength !== 'number') {
        return -1;
    }
    return monster.strength;
}

function getDexterity(monster) {
    if (typeof monster.dexterity !== 'number') {
        return -1;
    }
    return monster.dexterity;
}

function getConstitution(monster) {
    if (typeof monster.constitution !== 'number') {
        return -1;
    }
    return monster.constitution;
}

function getIntelligence(monster) {
    if (typeof monster.intelligence !== 'number') {
        return -1;
    }
    return monster.intelligence;
}

function getWisdom(monster) {
    if (typeof monster.wisdom !== 'number') {
        return -1;
    }
    return monster.wisdom;
}

function getCharisma(monster) {
    if (typeof monster.charisma !== 'number') {
        return -1;
    }
    return monster.charisma;
}

function getChallengeRating(monster) {
    if (typeof monster.challenge_rating !== 'number') {
        return -1;
    }
    return monster.challenge_rating;
}

function getXP(monster) {
    if (typeof monster.xp !== 'number') {
        return -1;
    }
    return monster.xp;
}

// As much as it pains me to just hardcode all the possible values for alignment, I doubt that anything new is being added to this data set.
// Even if new monsters are added I'll probably just be using the copy of the data that is alredy in this repository so I'd never even realize.
// Function would probably have to be updated if the data set is changed. 
function getAlignment(monster) {
    let alignment = {
        order: {
            lawful: false,
            neutral: false,
            chaotic: false
        },
        morality: {
            good: false,
            neutral: false,
            evil: false
        }
    };

    if (!monster.alignment || monster.alignment === "unaligned") {
        return alignment; // Default for unaligned monsters
    }

    const alignmentText = monster.alignment.toLowerCase();

    switch (alignmentText) {
        case "lawful evil":
            alignment.morality.evil = true;
            alignment.order.lawful = true;
            break;

        case "chaotic evil":
            alignment.morality.evil = true;
            alignment.order.chaotic = true;
            break;

        case "chaotic good":
            alignment.morality.good = true;
            alignment.order.chaotic = true;
            break;

        case "lawful good":
            alignment.morality.good = true;
            alignment.order.lawful = true;
            break;

        case "neutral":
            alignment.morality.neutral = true;
            alignment.order.neutral = true;
            break;

        case "lawful neutral":
            alignment.morality.neutral = true;
            alignment.order.lawful = true;
            break;

        case "neutral evil":
            alignment.morality.evil = true;
            alignment.order.neutral = true;
            break;

        case "neutral good":
            alignment.morality.good = true;
            alignment.order.neutral = true;
            break;

        case "chaotic neutral":
            alignment.morality.neutral = true;
            alignment.order.chaotic = true;
            break;

        case "any alignment":
            alignment.morality.good = true;
            alignment.morality.neutral = true;
            alignment.morality.evil = true;
            alignment.order.lawful = true;
            alignment.order.neutral = true;
            alignment.order.chaotic = true;
            break;

        case "any non-good alignment":
            alignment.morality.neutral = true;
            alignment.morality.evil = true;
            alignment.order.lawful = true;
            alignment.order.neutral = true;
            alignment.order.chaotic = true;
            break;

        case "any non-lawful alignment":
            alignment.morality.good = true;
            alignment.morality.neutral = true;
            alignment.morality.evil = true;
            alignment.order.neutral = true;
            alignment.order.chaotic = true;
            break;

        case "any chaotic alignment":
            alignment.morality.good = true;
            alignment.morality.neutral = true;
            alignment.morality.evil = true;
            alignment.order.chaotic = true;
            break;

        case "any evil alignment":
            alignment.morality.evil = true;
            alignment.order.lawful = true;
            alignment.order.neutral = true;
            alignment.order.chaotic = true;
            break;

        case "neutral good (50%) or neutral evil (50%)":
            alignment.morality.good = true;
            alignment.morality.evil = true;
            alignment.order.neutral = true;
            break;

        default:
            // Default to unaligned if no match
            return alignment;
    }

    return alignment;
}
    

function getArmorClass(monster) {
    if (!monster || typeof monster !== 'object' || !Array.isArray(monster.armor_class)) {
        return -1; // Return -1 for invalid or missing input
    }

    if (monster.armor_class.length > 0 && typeof monster.armor_class[0] === 'object') {
        return monster.armor_class[0].value !== undefined && !isNaN(Number(monster.armor_class[0].value))
            ? Number(monster.armor_class[0].value)
            : -1;
    }

    return -1; // Default to -1 if no valid armor class is found
}

function checkIsLegendary(monster) {
    if (monster.legendary_actions && monster.legendary_actions.length > 0) {
        return true;
    }
    if (monster.special_abilities) {
        for (let i = 0; i < monster.special_abilities.length; i++) {
            if (monster.special_abilities[i].name === "Legendary Resistance") {
                return true;
            }
        }
    }
    return false;
}

function getSpeed(speed) {
    let speedObj = {
        walk: 0,
        fly: 0,
        swim: 0,
        burrow: 0,
        climb: 0,
    }
    if (speed == undefined) return speedObj;
    if (typeof speed.walk == "string") {
        let walkSpeed = Number(speed.walk.split(" ")[0])
        if (!isNaN(walkSpeed))
            speedObj.walk = walkSpeed;
    }
    if (typeof speed.fly == "string") {
        let flySpeed = Number(speed.fly.split(" ")[0])
        if (!isNaN(flySpeed))
            speedObj.fly = flySpeed;
    }
    if (typeof speed.swim == "string") {
        let swimSpeed = Number(speed.swim.split(" ")[0]);
        if (!isNaN(swimSpeed))
            speedObj.swim = swimSpeed;
    }
    if (typeof speed.burrow == "string") {
        let burrowSpeed = Number(speed.burrow.split(" ")[0]);
        if (!isNaN(burrowSpeed))
            speedObj.burrow = burrowSpeed;
    }
    if (typeof speed.climb == "string") {
        let climbSpeed = Number(speed.climb.split(" ")[0]);
        if (!isNaN(climbSpeed))
            speedObj.climb = climbSpeed;
    }
    return speedObj;
}

    

function getSpellcasting(monster) {
    let spellcasting = {
        has_spellcasting: false,
        level: -1,
        ability: -1
    }

    if (monster.special_abilities) {
        for (let i = 0; i < monster.special_abilities.length; i++) {
            if (monster.special_abilities[i].name === "Spellcasting" || monster.special_abilities[i].name === "Innate Spellcasting") {
                s = monster.special_abilities[i].spellcasting
                spellcasting.has_spellcasting = true;

                if (s.level == undefined || typeof s.level !== 'number') 
                    spellcasting.level = -1;
                else 
                    spellcasting.level = s.level;

                if (monster.special_abilities[i].name === "Innate Spellcasting") {
                    for (let i = 0; i < s.spells.length; i++) {
                        if (s.spells[i].level > spellcasting.level) {
                            spellcasting.level = s.spells[i].level;
                        }
                    }
                }

                if (s.ability == undefined || s.ability.index == undefined) 
                    spellcasting.ability = -1;
                else if (s.ability.index === "int") 
                    spellcasting.ability = 0;
                else if (s.ability.index === "wis") 
                    spellcasting.ability = 1;
                else if (s.ability.index === "cha") 
                    spellcasting.ability = 2;
                else 
                    spellcasting.ability = -1;

                break;
            }
        }
    }
    return spellcasting;
}

function getSize(size) {
    const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
    return sizes.indexOf(size) !== -1 ? sizes.indexOf(size) : -1;
}

const rawData = fs.readFileSync('./data/5e-SRD-Monsters.json', 'utf-8');
const monsters = JSON.parse(rawData);

//const uniqueAlignments = new Set();
//monsters.forEach(monster => {
//    if (monster.alignment) {
//        uniqueAlignments.add(monster.alignment);
//    }
//});

// Output all unique alignments
//console.log("Unique Alignments:");
//console.log([...uniqueAlignments]);

const sanitizedMonsters = sanitizeMonsters(monsters);
fs.writeFileSync('./data/monsters.json', JSON.stringify(sanitizedMonsters, null, 2));

//console.log(JSON.stringify(sanitizedMonsters, null, 2));
