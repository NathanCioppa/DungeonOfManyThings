const fs = require('fs');
const rawDataMagic = fs.readFileSync('./data/5e-SRD-Magic-Items.json', 'utf-8');
const rawDataEquipment = fs.readFileSync('./data/5e-SRD-Equipment.json', 'utf-8');
let magicItems = JSON.parse(rawDataMagic);
let equipment = JSON.parse(rawDataEquipment);

magicItems = sanitizeMagicArmor(pullAllMagicArmor(magicItems));
equipment = sanitizeNonMagicArmor(pullAllNonMagicArmor(equipment));

let armorJson = equipment.concat(magicItems);
armorJson = armorJson.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0;
})

//armorJson.map(item => { if(item.type === -1) console.log(item)})
//console.log(armorJson)

fs.writeFileSync('./DungeonOfManyThings/data/armor.json', JSON.stringify(armorJson, null, 2), 'utf-8');

function pullAllMagicArmor(magicItems) {
    let magicArmor = [];
    magicItems.map(item => {
        if (item.equipment_category.name === 'Armor' && item.rarity.name !== "Varies") {
            magicArmor.push(item);
        }
    });
    return magicArmor;
}

function sanitizeMagicArmor(magicArmor) {
    sanitizedArmor = [];
    magicArmor.map(item => {
        sanitizedArmor.push(sanitizeMagicArmorItem(item))
    })
    return sanitizedArmor
}

function sanitizeMagicArmorItem(magicArmor) {
    return {
        name: getName(magicArmor),
        rarity: getRarityMagic(magicArmor),
        type: getTypeMagic(magicArmor),
    }
}

function getName(item) {
    return typeof item.name === 'string' ? item.name : ""
}

function getTypeMagic(item) {
    if (!item.desc || !Array.isArray(item.desc) || item.desc.length === 0 || typeof item.desc[0] !== 'string') return -1
    const desc = item.desc[0].toLowerCase()
    let isLight = desc.includes("light")
    let isMedium = desc.includes("medium") || desc.includes("scale mail")
    let isHeavy = desc.includes("heavy")
    let isShield = desc.includes("shield")

    if (isShield) return 7
    if (isLight && isMedium && isHeavy) return 4
    if (isLight && isMedium) return 1
    if (isLight && isHeavy) return 3
    if (isMedium && isHeavy) return 5
    if (isLight) return 0
    if (isMedium) return 2
    if (isHeavy) return 6
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



function pullAllNonMagicArmor(equipment) {
    let nonMagicArmor = [];
    equipment.map(item => {
        if (item.equipment_category.name === 'Armor') {
            nonMagicArmor.push(item);
        }
    });
    return nonMagicArmor;
}

function sanitizeNonMagicArmor(nonMagicArmor) {
    sanitizedArmor = [];
    nonMagicArmor.map(item => {
        sanitizedArmor.push(sanitizeNonMagicArmorItem(item))
    })
    return sanitizedArmor
}

function sanitizeNonMagicArmorItem(nonMagicArmor) {
    return {
        name: getName(nonMagicArmor),
        type: getTypeNonMagicArmorItem(nonMagicArmor),
        rarity: 0,
    }
}

function getTypeNonMagicArmorItem(nonMagicArmor) {
    if (typeof nonMagicArmor.armor_category !== 'string') return -1
    const armorCategory = nonMagicArmor.armor_category.toLowerCase()
    if (armorCategory === 'light') return 0
    if (armorCategory === 'medium') return 2
    if (armorCategory === 'heavy') return 6
    if (armorCategory === 'shield') return 7
    return -1
}