// Pulls both regular weapons and magic weapons from the SRD data and formats into a json file
// Development tool only

//const fs = require('fs');
//const rawDataMagic = fs.readFileSync('./data/5e-SRD-Magic-Items.json', 'utf-8');
//const rawDataEquipment = fs.readFileSync('./data/5e-SRD-Equipment.json', 'utf-8');
//let magicItems = JSON.parse(rawDataMagic);
//let equipment = JSON.parse(rawDataEquipment);

//magicItems = sanitizeMagicWeapons(pullAllMagicWeapons(magicItems));
//equipment = sanitizeNonMagicWeapons(pullAllNonMagicWeapons(equipment));

//let weaponsJson = equipment.concat(magicItems);
//weaponsJson = weaponsJson.sort((a, b) => {
//    const nameA = a.name.toLowerCase();
//    const nameB = b.name.toLowerCase(); 
//    if (nameA < nameB) return -1
//    if (nameA > nameB) return 1
//    return 0;
//})

//fs.writeFileSync('./DungeonOfManyThings/data/weapons.json', JSON.stringify(weaponsJson, null, 2), 'utf-8');



function pullAllMagicWeapons(magicItems) {
    let magicWeapons = [];
    magicItems.map(item => {
        if (item.equipment_category.name === 'Weapon' && item.rarity.name !== "Varies") {
            magicWeapons.push(item);
        }
    });
    return magicWeapons;
}



function pullAllNonMagicWeapons(equipment) {
    let nonMagicWeapons = [];
    equipment.map(item => {
        if (item.equipment_category.name === 'Weapon') {
            nonMagicWeapons.push(item);
        }
    });
    return nonMagicWeapons;
}

function sanitizeNonMagicWeapons(nonMagicWeapons) {
    sanitizedWeapons = [];
    nonMagicWeapons.map(item => {
        sanitizedWeapons.push(sanitizeNonMagicWeapon(item))
    })
    return sanitizedWeapons
}

function sanitizeNonMagicWeapon(nonMagicWeapon) {
    return {
        name: getName(nonMagicWeapon),
        category: getCategoryNonMagic(nonMagicWeapon),
        range: getRangeNonMagic(nonMagicWeapon),
        rarity: 0,
    }
}

function getName(item) {
    return typeof item.name === 'string' ? item.name : ""
}

function getCategoryNonMagic(item) {
    const category = item.weapon_category
    if (category === 'Simple') return 0
    if (category === 'Martial') return 1
    return -1
}
function getRangeNonMagic(item) {
    const range = item.weapon_range
    if (range === 'Melee') return 0
    if (range === 'Ranged') return 1
    return -1
}

function getAllNonMagicWeaponNames(nonMagicWeapons) {
    let names = new Set()
    nonMagicWeapons.map(item => {
        names.add(item.name.toLowerCase())
    })
    return names
}





function sanitizeMagicWeapons(magicWeapons) {
    let sanitizedWeapons = []
    magicWeapons.map(item => {
        sanitizedWeapons.push(sanitizeMagicWeapon(item));
    })
    return sanitizedWeapons;
}

function sanitizeMagicWeapon(magicWeapon) {
    return {
        name: getName(magicWeapon),
        category: 2,
        range: getRangeMagic(magicWeapon),
        rarity: getRarityMagic(magicWeapon)
    }
}

function getRangeMagic(item) {
    if (!Array.isArray(item.desc) || item.desc.length === 0 || typeof item.desc[0] !== 'string') return -1
    const weaponDescription = item.desc[0].toLowerCase()

    let signifiersMelee = [
        "sword",
        'club',
        'dagger',
        'handaxe',
        'hammer',
        'mace',
        'staff',
        'sickle',
        'spear',
        'axe',
        'flail',
        'glaive',
        'halberd',
        'lance',
        'maul',
        'morningstar',
        'pike',
        'rapier',
        'scimitar',
        'trident',
        'war pick',
        'whip',
    ]

    const signifiersRanged = [
        "bow",
        'javelin',
        'dart',
        'sling',
        'blowgun',
        'net',
        'ammunition'

    ]

    let hasSignifierMelee = false
    let hasSignifierRanged = false

    signifiersMelee.map(signifier => {
        if (weaponDescription.includes(signifier)) hasSignifierMelee = true
    })
    signifiersRanged.map(signifier => {
        if (weaponDescription.includes(signifier)) hasSignifierRanged = true
    })
    if (hasSignifierMelee && hasSignifierRanged) return -1
    if (hasSignifierMelee) return 0
    if (hasSignifierRanged) return 1
    return -1
}


function getRarityMagic(item) {
    if (!item.rarity) return -1
    if (item.rarity.name === "Common")
        return 1;
    if (item.rarity.name === "Uncommon")
        return 2;
    if (item.rarity.name === "Rare")
        return 3;
    if (item.rarity.name === "Very Rare")
        return 4;
    if (item.rarity.name === "Legendary")
        return 5;
    if (item.rarity.name === "Artifact")
        return 6;
    return -1
}