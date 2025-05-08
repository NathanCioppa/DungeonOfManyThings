// This file is for development purposes only, not used by the game
// Pulls items from 5e-SRD-Equipment.json and formats them into a json file usable by the game
// json in this project copied from https://github.com/5e-bits/5e-database/blob/main/src/2014/5e-SRD-Equipment.json

//const fs = require('fs');

//const rawData = fs.readFileSync('./data/5e-SRD-Equipment.json', 'utf-8');
//let items = JSON.parse(rawData);

//items = sanitizeItems(items);

//fs.writeFileSync('./DungeonOfManyThings/data/non-magic-items.json', JSON.stringify(items, null, 2));

function getAllCategories(items) {
  const categories = new Set();
  items.forEach(item => {
    if (item.equipment_category) {
      categories.add(item.equipment_category.name);
    }
  });
  return Array.from(categories);
}



const possibleCategories = ["Weapon", "Armor", "Adventuring Gear", "Tools", "Mounts and Vehicles"]
// determined from getAllCategories, i just needed to know all values

function sanitizeItems(items) {
    let sanitizedItems = [];
    items.map(item => {
        sanitizedItems.push(sanitizeItem(item))
    })
    return sanitizedItems
}

function sanitizeItem(item) {
    return {
        name: getName(item),
        type: getType(item)
    }
}

// remove parenthesized parts of names
function getName(item) {
    if (typeof item.name !== 'string') return ""

    let name = item.name
    let nameNoParens = ""
    for (let i = 0; i < name.length; i++) {
        if (name[i] === "(") break
        nameNoParens+= name[i]
    }
    return nameNoParens.trim()
}

function getType(item) {
    if(!item.equipment_category) return ""
    return typeof item.equipment_category.name === 'string' ? item.equipment_category.name : ""
}
