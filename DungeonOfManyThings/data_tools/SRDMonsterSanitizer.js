module.exports = {
    sanitizeMonsters,
    sanitizeMonster,
    getProperty,
    getArmorClass,
    checkIsLegendary,
    getSpellcasting,
    getSize,
    getSpeed
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
        name: getProperty(monster, 'name'),
        size: getSize(monster.size),
        type: getProperty(monster, 'type'),
        subtype: getProperty(monster, 'subtype'),
        armor_class: getArmorClass(monster),
        hit_points: getProperty(monster, 'hit_points'),
        hit_points_roll: getProperty(monster, 'hit_points_roll'),
        speed: getSpeed(monster.speed),
        strength: getProperty(monster, 'strength'),
        dexterity: getProperty(monster, 'dexterity'),
        constitution: getProperty(monster, 'constitution'),
        intelligence: getProperty(monster, 'intelligence'),
        wisdom: getProperty(monster, 'wisdom'),
        charisma: getProperty(monster, 'charisma'),
        challenge_rating: getProperty(monster, 'challenge_rating'),
        xp: getProperty(monster, 'xp'),
        is_legendary: checkIsLegendary(monster),
        spellcasting: getSpellcasting(monster),
        alignment: getProperty(monster, 'alignment')
    };
}

function getProperty(monster, property) {
    return monster[property] !== undefined ? monster[property] : -1;
}

function getArmorClass(monster) {
    if (monster.armor_class && monster.armor_class.length > 0) {
        return monster.armor_class[0].value !== undefined ? monster.armor_class[0].value : -1;
    }
    return -1;
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
        walk: -1,
        fly: -1,
        swim: -1,
        burrow: -1,
        climb: -1,
    }

    if (speed == undefined) return speedObj;
    if (typeof speed.walk == "string") {
        walkSpeed = Number(speed.walk.split(" ")[0])
        if (walkSpeed != NaN)
            speedObj.walk = walkSpeed;
    }
    if (typeof speed.fly == "string") {
        flySpeed = Number(speed.fly.split(" ")[0])
        if (flySpeed != NaN)
            speedObj.fly = flySpeed;
    }
    if (typeof speed.swim == "string") {
        swimSpeed = Number(speed.swim.split(" ")[0]);
        if (swimSpeed != NaN)
            speedObj.swim = swimSpeed;
    }
    if (typeof speed.burrow == "string") {
        burrowSpeed = Number(speed.burrow.split(" ")[0]);
        if (burrowSpeed != NaN)
            speedObj.burrow = burrowSpeed;
    }
    if (typeof speed.climb == "string") {
        climbSpeed = Number(speed.climb.split(" ")[0]);
        if (climbSpeed != NaN)
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
            if (monster.special_abilities[i].name === "Spellcasting") {
                s = monster.special_abilities[i]
                spellcasting.has_spellcasting = true;
                spellcasting.level = s.level == undefined ? -1 : s.level;
                if (s.ability == undefined || s.ability.index == undefined) 
                    spellcasting.ability = -1;
                else if (s.ability.index == "int") 
                    spellcasting.ability = 0;
                else if (s.ability.index == "wis") 
                    spellcasting.ability = 1;
                else if (s.ability.index == "cha") 
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

//const rawData = fs.readFileSync('./data/5e-SRD-Monsters.json', 'utf-8');
//const monsters = JSON.parse(rawData);

//const sanitizedMonsters = sanitizeMonsters(monsters);

//console.log(JSON.stringify(sanitizedMonsters, null, 2));
