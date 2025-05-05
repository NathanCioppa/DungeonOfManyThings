const SRDMonsterSanitizer = require('../../DungeonOfManyThings/data_tools/SRDMonsterSanitizer');
const assert = require('assert');

// Testing done with Mocha, https://github.com/mochajs/mocha

const sampleEmptyMonster = {
    name: -1,
    size: -1,
    type: -1,
    subtype: -1,
    armor_class: -1,
    hit_points: -1,
    hit_points_roll: -1,
    speed: {
        walk: -1,
        fly: -1,
        swim: -1,
        burrow: -1,
        climb: -1
    },
    strength: -1,
    dexterity: -1,
    constitution: -1,
    intelligence: -1,
    wisdom: -1,
    charisma: -1,
    challenge_rating: -1,
    xp: -1,
    is_legendary: false,
    spellcasting: {
        has_spellcasting: false,
        level: -1,
        ability: -1,
    },
    alignment: -1
}

const requiredFields = [
    "name",
    "size",
    "type",
    "subtype",
    "armor_class",
    "hit_points",
    "hit_points_roll",
    "speed",
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
    "challenge_rating",
    "xp",
    "is_legendary",
    "spellcasting",
    "alignment"
]

describe('SRDMonsterSanitizer', () => {
    describe('#sanitizeMonsters()', () => {
        it('should return an empty array if the input is not an array', () => {
            const badInputs = [1, "x", true, undefined, null, {}]
            for (let i = 0; i < badInputs.length; i++) {
                const result = SRDMonsterSanitizer.sanitizeMonsters(badInputs[i]);
                assert.deepStrictEqual(result, []);
            }
        });
        it('should return an empty array when given an empty array', () => {
            const result = SRDMonsterSanitizer.sanitizeMonsters([]);
            assert.deepStrictEqual(result, []);
        });
        it('should return an array of identical size to the array given', () => {
            let input = [{}];
            let result = SRDMonsterSanitizer.sanitizeMonsters(input);
            assert.equal(result.length, input.length);

            input = [{}, {}, {}];
            result = SRDMonsterSanitizer.sanitizeMonsters(input);
            assert.equal(result.length, input.length);

            input = [1, {}, "", false];
            result = SRDMonsterSanitizer.sanitizeMonsters(input);
            assert.equal(result.length, input.length);

            input = [];
            result = SRDMonsterSanitizer.sanitizeMonsters(input);
            assert.equal(result.length, input.length);
        }); 
    });

    describe('#sanitizeMonster()', () => {
        it("should return a monster with all required fields, and those fields only", () => {
            let result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({}));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster(sampleEmptyMonster));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ name: "x", size: "y", type: "z", subtype: "a", armor_class: 1, hit_points: 2, hit_points_roll: 3, speed: { walk: 4, fly: 5, swim: 6, burrow: 7, climb: 8 }, strength: 9, dexterity: 10, constitution: 11, intelligence: 12, wisdom: 13, charisma: 14, challenge_rating: 15, xp: 16, spellcasting: { has_spellcasting: true, level: 17, ability: "b" }, alignment: "c" }));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ armor_class: 1, hit_points: 2, hit_points_roll: 3, speed: { walk: 4, fly: 5, swim: 6, burrow: 7, climb: 8 }, strength: 9, dexterity: 10, constitution: 11, intelligence: 12, xp: 16, spellcasting: { has_spellcasting: true, level: 17, ability: "b" }, alignment: "c" }));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ name: "x", size: "y", type: "z", subtype: "a", armor_class: 1, hit_points: 2, hit_points_roll: 3, strength: 9, dexterity: 10, constitution: 11, intelligence: 12, wisdom: 13, charisma: 14, challenge_rating: 15, xp: 16, spellcasting: { has_spellcasting: true }, level: 17, ability: "b" , alignment: "c" }));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ undexpectedProperty: "x", "unexpProperty": 0, prop: false }));
            assert.deepStrictEqual(result, requiredFields);
        })
        it('should return a monster with all non-boolean feilds set to -1, and all boolean fields set to false if the monster being sanitized has no properties.', () => {
            const result = SRDMonsterSanitizer.sanitizeMonster({});
            assert.deepStrictEqual(result, sampleEmptyMonster);
        })
        it('should return a monster with all  non-boolean feilds set to -1, and all boolean fields set to false if the monster being sanitized only has properties that are not expected', () => {
            const result = SRDMonsterSanitizer.sanitizeMonster({undexpectedProperty:"x", "unexpProperty":0, prop: false});
            assert.deepStrictEqual(result, sampleEmptyMonster);
        })
        it('should return a monster with all  non-boolean feilds set to -1, and all boolean fields set to false if the monster being sanitized only has properties that are not expected', () => {
            const result = SRDMonsterSanitizer.sanitizeMonster({ undexpectedProperty: "x", "unexpProperty": 0, prop: false });
            assert.deepStrictEqual(result, sampleEmptyMonster);
        })
    })

    //TODO
    // test the rest of the methods in SRDMonsterSanitizer
    // test that speed is an object with the correct properties
    // test that spellcasting is an object with the correct properties

});