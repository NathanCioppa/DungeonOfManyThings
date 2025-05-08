// used as a helper to format SRD magic item data into a json file usable by the game
// Not used by the game
// Strictly a development tool

//const fs = require('fs');

//const rawData = fs.readFileSync('./data/5e-SRD-Magic-Items.json', 'utf-8');
//const items = JSON.parse(rawData);

module.exports = {
    sanitizeMagicItems,
    sanitizeMagicItem,
    getName,
    getRarity,
    getType
}

function getAllCategories(items) {
    const categories = new Set();
    items.forEach(item => {
        if (item.equipment_category) {
            categories.add(item.equipment_category.name);
        }
    });
    return Array.from(categories);
}

function getAllRarities(items) {
    const categories = new Set();
    items.forEach(item => {
        categories.add(item.rarity.name);
    });
    return Array.from(categories);
}

function getAllOfVaryingRarity(items) {
    let varying = [];
    items.forEach(item => {
        if (item.rarity.name === 'Varies') {
            varying.push(item.name);
        }
        
    });
    return varying;
}



const possibleCategories = [
    'Armor', 'Ammunition', 'Wondrous Items', 'Weapon', 'Rod', 'Potion', 'Ring', 'Scroll', 'Staff', 'Wand'
]
const possibleRarities = [
    'Uncommon',
    'Varies',
    'Rare',
    'Very Rare',
    'Legendary',
    'Common',
    'Artifact'
]

function sanitizeMagicItems(items) {
    if (!Array.isArray(items)) {
        console.warn('Input is not an array, returning empty array');
        return [];
    }
    let sanitizedItems = []
    items.map(item => {
        if (item.rarity.name !== 'Varies')
            sanitizedItems.push(sanitizeMagicItem(item));
    })
    return sanitizedItems;
}

function sanitizeMagicItem(item) {
    return {
        name: getName(item),
        rarity: getRarity(item),
        type: getType(item)
    }
}

function getName(item) {
    return typeof item.name === 'string' ? item.name : ""; 
}

// every item of the Varies rarity has its varients also listed as separate items, so anthing with that rarity will not be added to the data

function getRarity(item) {
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

function getType(item) {
    if (!item.equipment_category)
        return ""

    let n = item.equipment_category.name

    if (n === "Armor")
        return 0
    if (n === "Ammunition")
        return 1
    if (n === "Wondrous Items")
        return 2
    if (n === "Weapon")
        return 3
    if (n === "Rod")
        return 4
    if (n === "Potion")
        return 5
    if (n === "Ring")
        return 6
    if (n === "Scroll")
        return 7
    if (n === "Staff")
        return 8
    if (n === "Wand")
        return 9
    return -1
}