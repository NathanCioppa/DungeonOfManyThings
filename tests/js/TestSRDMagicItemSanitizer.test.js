const SRDMagicItemSanitizer = require('../../data_tools/SRDMagicItemSanitizer');
const assert = require('assert');

// Testing done with Mocha, https://github.com/mochajs/mocha

const sampleSRDMagicItems = [
    {
        "index": "adamantine-armor",
        "name": "Adamantine Armor",
        "equipment_category": {
            "index": "armor",
            "name": "Armor",
            "url": "/api/2014/equipment-categories/armor"
        },
        "rarity": {
            "name": "Uncommon"
        },
        "variants": [],
        "variant": false,
        "desc": [
            "Armor (medium or heavy, but not hide), uncommon",
            "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit."
        ],
        "image": "/api/images/magic-items/adamantine-armor.png",
        "url": "/api/2014/magic-items/adamantine-armor"
    },
    {
        "index": "ammunition",
        "name": "Ammunition, +1, +2, or +3",
        "equipment_category": {
            "index": "ammunition",
            "name": "Ammunition",
            "url": "/api/2014/equipment-categories/ammunition"
        },
        "rarity": {
            "name": "Varies"
        },
        "variants": [
            {
                "index": "ammunition-1",
                "name": "Ammunition, +1",
                "url": "/api/2014/magic-items/ammunition-1"
            },
            {
                "index": "ammunition-2",
                "name": "Ammunition, +2",
                "url": "/api/2014/magic-items/ammunition-2"
            },
            {
                "index": "ammunition-3",
                "name": "Ammunition, +3",
                "url": "/api/2014/magic-items/ammunition-3"
            }
        ],
        "variant": false,
        "desc": [
            "Weapon (any ammunition), uncommon (+1), rare (+2), or very rare (+3)",
            "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the rarity of the ammunition. Once it hits a target, the ammunition is no longer magical."
        ],
        "image": "/api/images/magic-items/ammunition.png",
        "url": "/api/2014/magic-items/ammunition"
    },
    {
        "index": "ammunition-1",
        "name": "Ammunition, +1",
        "equipment_category": {
            "index": "ammunition",
            "name": "Ammunition",
            "url": "/api/2014/equipment-categories/ammunition"
        },
        "rarity": {
            "name": "Uncommon"
        },
        "variants": [],
        "variant": true,
        "desc": [
            "Weapon (any ammunition), uncommon",
            "You have a +1 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical."
        ],
        "image": "/api/images/magic-items/ammunition.png",
        "url": "/api/2014/magic-items/ammunition-1"
    },
    {
        "index": "ammunition-2",
        "name": "Ammunition, +2",
        "equipment_category": {
            "index": "ammunition",
            "name": "Ammunition",
            "url": "/api/2014/equipment-categories/ammunition"
        },
        "rarity": {
            "name": "Rare"
        },
        "variants": [],
        "variant": true,
        "desc": [
            "Weapon (any ammunition), rare",
            "You have a +2 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical."
        ],
        "image": "/api/images/magic-items/ammunition.png",
        "url": "/api/2014/magic-items/ammunition-2"
    }
]

describe("SRDMagicItemSanitizer", () => {
    describe("#SanitizeMagicItems", () => {
        it('should return an empty array when given an empty array or somthing that is not an array', () => {
            let actual = SRDMagicItemSanitizer.sanitizeMagicItems([]);
            assert.deepStrictEqual(actual, []);

            actual = SRDMagicItemSanitizer.sanitizeMagicItems(5);
            assert.deepStrictEqual(actual, []);
        })
        it('should return an array of identical length if nothing in the array has rarity "Varies"', () => {
            const actual = SRDMagicItemSanitizer.sanitizeMagicItems([{ rarity: {} }, { rarity: {} }, { rarity: {} }]);
            assert.deepStrictEqual(actual.length, 3);
        })
        it('should correctly sanitize an array of SRD Magic Items', () => {
            const actual = SRDMagicItemSanitizer.sanitizeMagicItems(sampleSRDMagicItems);
            assert.deepStrictEqual(actual, [
                {name:"Adamantine Armor", type:0, rarity:2},
                { name:'Ammunition, +1', type:1,rarity:2},
                { name: 'Ammunition, +2', type: 1, rarity: 3 }
            ]);
        })
    })
})