// This file is for development purposes only, not used by the game
// Pulls items from 5e-SRD-Equipment.json and formats them into a json file usable by the game
// json in this project copied from https://github.com/5e-bits/5e-database/blob/main/src/2014/5e-SRD-Equipment.json

const fs = require('fs');

const rawData = fs.readFileSync('./data/5e-SRD-Equipment.json', 'utf-8');
const items = JSON.parse(rawData);

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




console.log( getAllCategories(items));

