const SRDMonsterSanitizer = require('../../data_tools/SRDMonsterSanitizer');
const assert = require('assert');

// Testing done with Mocha, https://github.com/mochajs/mocha

const sampleEmptyMonster = {
    name: "",
    size: -1,
    type: "",
    subtype: "",
    armor_class: -1,
    hit_points: -1,
    hit_points_roll: "",
    speed: {
        walk: 0,
        fly: 0,
        swim: 0,
        burrow: 0,
        climb: 0
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
    alignment: {
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
    }
}

const sampleSRDMonsterCorrectTypes = {
    "name": "",
    "size": "",
    "type": "",
    "alignment": "",
    "armor_class": [
        {
            "type": "",
            "value": 0
        }
    ],
    "hit_points": 135,
    "hit_points_roll": "18d10+36",
    "speed": {
        "walk": "",
        "swim": ""
    },
    "special_abilities":[],
    "strength": 21,
    "dexterity": 9,
    "constitution": 15,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 18,
    "challenge_rating": 10,
    "xp": 5900,
}

const sampleSRDMonsterWrongTypes1 = {
    "name": 0,
    "size": 0,
    "type": 0,
    "alignment": 0,
    "armor_class": [
        {
            "type": 0,
            "value": ""
        }
    ],
    "hit_points": "",
    "hit_points_roll": 0,
    "speed": {
        "walk": "",
        "swim": ""
    },
    "special_abilities": [
        {
            name: 0
        }
    ],
    "strength": "",
    "dexterity": "",
    "constitution":"",
    "intelligence": "",
    "wisdom": "",
    "charisma": "",
    "challenge_rating": "",
    "xp": "",
}

const sampleSRDMonsterWrongTypes2 = {
    "name": 0,
    "size": 0,
    "type": 0,
    "alignment": 0,
    "armor_class": [
        {
            "type": 0,
            "value": ""
        }
    ],
    "hit_points": "",
    "hit_points_roll": 0,
    "speed": {
        "walk": "",
        "swim": ""
    },
    "special_abilities": {},
    "strength": "",
    "dexterity": "",
    "constitution": "",
    "intelligence": "",
    "wisdom": "",
    "charisma": "",
    "challenge_rating": "",
    "xp": "",
}

const sampleSRDMonsterWrongTypes3 = {
    "name": 0,
    "size": 0,
    "type": 0,
    "alignment": 0,
    "armor_class": [
        {
            "type": 0,
            "value": ""
        }
    ],
    "hit_points": "",
    "hit_points_roll": 0,
    "speed": {
        "walk": "",
        "swim": ""
    },
    "special_abilities": 0,
    "strength": "",
    "dexterity": "",
    "constitution": "",
    "intelligence": "",
    "wisdom": "",
    "charisma": "",
    "challenge_rating": "",
    "xp": "",
}

const sampleSRDMonsterWrongTypes4 = {
    "name": 0,
    "size": 0,
    "type": 0,
    "alignment": 0,
    "armor_class": 0,
    "hit_points": "",
    "hit_points_roll": 0,
    "speed": {
        "walk": "",
        "swim": ""
    },
    "strength": "",
    "dexterity": "",
    "constitution": "",
    "intelligence": "",
    "wisdom": "",
    "charisma": "",
    "challenge_rating": "",
    "xp": "",
}

const sampleSRDMonsterWrongTypes5 = {
    "name": 0,
    "size": 0,
    "type": 0,
    "alignment": 0,
    "armor_class": {},
    "hit_points": "",
    "hit_points_roll": 0,
    "speed": {
        "walk": "",
        "swim": ""
    },
    "strength": "",
    "dexterity": "",
    "constitution": "",
    "intelligence": "",
    "wisdom": "",
    "charisma": "",
    "challenge_rating": "",
    "xp": "",
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

const requiredSpeedFields = ["walk", "fly", "swim", "burrow", "climb"]

const requiredSpellcastingFields = ["has_spellcasting", "level", "ability"]

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
        it("should return a monster with all required properties, and those properties only", () => {
            let result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({}));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ name: "x", size: "y", type: "z", subtype: "a", armor_class: 1, hit_points: 2, hit_points_roll: 3, speed: { walk: 4, fly: 5, swim: 6, burrow: 7, climb: 8 }, strength: 9, dexterity: 10, constitution: 11, intelligence: 12, wisdom: 13, charisma: 14, challenge_rating: 15, xp: 16, spellcasting: { has_spellcasting: true, level: 17, ability: "b" }, alignment: "a" }));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ armor_class: 1, hit_points: 2, hit_points_roll: 3, speed: {}, strength: 9, dexterity: 10, constitution: 11, intelligence: 12, xp: 16, spellcasting: { has_spellcasting: true, level: 17, ability: "b" }, alignment: "c" }));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ name: "x", size: "y", type: "z", subtype: "a", armor_class: 1, hit_points: 2, hit_points_roll: 3, strength: 9, dexterity: 10, constitution: 11, intelligence: 12, wisdom: 13, charisma: 14, challenge_rating: 15, xp: 16, spellcasting: { has_spellcasting: true }, level: 17, ability: "b" , alignment: "true" }));
            assert.deepStrictEqual(result, requiredFields);

            result = Object.getOwnPropertyNames(SRDMonsterSanitizer.sanitizeMonster({ undexpectedProperty: "x", "unexpProperty": 0, prop: false }));
            assert.deepStrictEqual(result, requiredFields);
        })
        it('should return a monster with all string properties set to an empty string, all boolean properties set to false, all number properties except for speed set to -1, and all speed properties set to 0 if the monster being sanitized has no properties.', () => {
            const result = SRDMonsterSanitizer.sanitizeMonster({});
            assert.deepStrictEqual(result, sampleEmptyMonster);
        })
        it('should return a monster with all string properties set to an empty string, all boolean properties set to false, all number properties except for speed set to -1, and all speed properties set to 0 if the monster being sanitized only has properties that are not expected', () => {
            const result = SRDMonsterSanitizer.sanitizeMonster({undexpectedProperty:"x", "unexpProperty":0, prop: false});
            assert.deepStrictEqual(result, sampleEmptyMonster);
        })
        it("should return a monster with all properties of the correct type, when expected properties are given of the correct type", () => {
            const result = SRDMonsterSanitizer.sanitizeMonster(sampleSRDMonsterCorrectTypes);
            checkHasCorrectTypes(result);
        })
        it("should return a monster with all properties of the correct type, when expected properties are given of the wrong type", () => {
            let result = SRDMonsterSanitizer.sanitizeMonster(sampleSRDMonsterWrongTypes1);
            checkHasCorrectTypes(result);

            result = SRDMonsterSanitizer.sanitizeMonster(sampleSRDMonsterWrongTypes2);
            checkHasCorrectTypes(result);

            result = SRDMonsterSanitizer.sanitizeMonster(sampleSRDMonsterWrongTypes3);
            checkHasCorrectTypes(result);

            result = SRDMonsterSanitizer.sanitizeMonster(sampleSRDMonsterWrongTypes4);
            checkHasCorrectTypes(result);

            result = SRDMonsterSanitizer.sanitizeMonster(sampleSRDMonsterWrongTypes5);
            checkHasCorrectTypes(result);
        })
    })

    describe('#getName()', () => {
        it('should return the name as a string when a valid name is provided', () => {
            const monster = { name: "Goblin" };
            const result = SRDMonsterSanitizer.getName(monster);
            assert.equal(result, "Goblin");
        });

        it('should return an empty string when the name is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getName(monster);
            assert.equal(result, "");
        });

        it('should return the name as a string when the name is a number', () => {
            const monster = { name: 123 };
            const result = SRDMonsterSanitizer.getName(monster);
            assert.equal(result, "123");
        });

        it('should return the name as a string when the name is a boolean', () => {
            const monster = { name: true };
            const result = SRDMonsterSanitizer.getName(monster);
            assert.equal(result, "true");
        });

        it('should return the name as a string when the name is an object', () => {
            const monster = { name: { key: "value" } };
            const result = SRDMonsterSanitizer.getName(monster);
            assert.equal(result, "[object Object]");
        });
    });

    describe('#getType()', () => {
        it('should return the type as a string when a valid type is provided', () => {
            const monster = { type: "Beast" };
            const result = SRDMonsterSanitizer.getType(monster);
            assert.equal(result, "Beast");
        });

        it('should return an empty string when type is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getType(monster);
            assert.equal(result, "");
        });
    });

    describe('#getSubtype()', () => {
        it('should return the subtype as a string when a valid subtype is provided', () => {
            const monster = { subtype: "Elf" };
            const result = SRDMonsterSanitizer.getSubtype(monster);
            assert.equal(result, "Elf");
        });

        it('should return an empty string when subtype is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getSubtype(monster);
            assert.equal(result, "");
        });
    });

    describe('#getHitPoints()', () => {
        it('should return the hit points as a number when a valid number is provided', () => {
            const monster = { hit_points: 30 };
            const result = SRDMonsterSanitizer.getHitPoints(monster);
            assert.equal(result, 30);
        });

        it('should return -1 when hit_points is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getHitPoints(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when hit_points is not a valid number', () => {
            const monster = { hit_points: "invalid" };
            const result = SRDMonsterSanitizer.getHitPoints(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getStrength()', () => {
        it('should return the strength value as a number when valid', () => {
            const monster = { strength: 18 };
            const result = SRDMonsterSanitizer.getStrength(monster);
            assert.equal(result, 18);
        });

        it('should return -1 when strength is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getStrength(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when strength is not a valid number', () => {
            const monster = { strength: "invalid" };
            const result = SRDMonsterSanitizer.getStrength(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getDexterity()', () => {
        it('should return the dexterity value as a number when valid', () => {
            const monster = { dexterity: 14 };
            const result = SRDMonsterSanitizer.getDexterity(monster);
            assert.equal(result, 14);
        });

        it('should return -1 when dexterity is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getDexterity(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when dexterity is not a valid number', () => {
            const monster = { dexterity: "invalid" };
            const result = SRDMonsterSanitizer.getDexterity(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getConstitution()', () => {
        it('should return the constitution value as a number when valid', () => {
            const monster = { constitution: 16 };
            const result = SRDMonsterSanitizer.getConstitution(monster);
            assert.equal(result, 16);
        });

        it('should return -1 when constitution is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getConstitution(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when constitution is not a valid number', () => {
            const monster = { constitution: "invalid" };
            const result = SRDMonsterSanitizer.getConstitution(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getIntelligence()', () => {
        it('should return the intelligence value as a number when valid', () => {
            const monster = { intelligence: 10 };
            const result = SRDMonsterSanitizer.getIntelligence(monster);
            assert.equal(result, 10);
        });

        it('should return -1 when intelligence is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getIntelligence(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when intelligence is not a valid number', () => {
            const monster = { intelligence: "invalid" };
            const result = SRDMonsterSanitizer.getIntelligence(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getWisdom()', () => {
        it('should return the wisdom value as a number when valid', () => {
            const monster = { wisdom: 12 };
            const result = SRDMonsterSanitizer.getWisdom(monster);
            assert.equal(result, 12);
        });

        it('should return -1 when wisdom is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getWisdom(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when wisdom is not a valid number', () => {
            const monster = { wisdom: "invalid" };
            const result = SRDMonsterSanitizer.getWisdom(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getCharisma()', () => {
        it('should return the charisma value as a number when valid', () => {
            const monster = { charisma: 14 };
            const result = SRDMonsterSanitizer.getCharisma(monster);
            assert.equal(result, 14);
        });

        it('should return -1 when charisma is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getCharisma(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when charisma is not a valid number', () => {
            const monster = { charisma: "invalid" };
            const result = SRDMonsterSanitizer.getCharisma(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getChallengeRating()', () => {
        it('should return the challenge rating as a number when valid', () => {
            const monster = { challenge_rating: 5 };
            const result = SRDMonsterSanitizer.getChallengeRating(monster);
            assert.equal(result, 5);
        });

        it('should return -1 when challenge_rating is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getChallengeRating(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when challenge_rating is not a valid number', () => {
            const monster = { challenge_rating: "invalid" };
            const result = SRDMonsterSanitizer.getChallengeRating(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getXP()', () => {
        it('should return the XP as a number when valid', () => {
            const monster = { xp: 1800 };
            const result = SRDMonsterSanitizer.getXP(monster);
            assert.equal(result, 1800);
        });

        it('should return -1 when xp is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getXP(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when xp is not a valid number', () => {
            const monster = { xp: "invalid" };
            const result = SRDMonsterSanitizer.getXP(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getArmorClass()', () => {
        it('should return the armor class value when a valid armor_class array is provided', () => {
            const monster = { armor_class: [{ value: 15 }] };
            const result = SRDMonsterSanitizer.getArmorClass(monster);
            assert.equal(result, 15);
        });

        it('should return -1 when armor_class is undefined', () => {
            const monster = {};
            const result = SRDMonsterSanitizer.getArmorClass(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when armor_class is not an array', () => {
            const monster = { armor_class: "invalid" };
            const result = SRDMonsterSanitizer.getArmorClass(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when armor_class array is empty', () => {
            const monster = { armor_class: [] };
            const result = SRDMonsterSanitizer.getArmorClass(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when armor_class array does not contain valid objects', () => {
            const monster = { armor_class: [{ invalidKey: 10 }] };
            const result = SRDMonsterSanitizer.getArmorClass(monster);
            assert.equal(result, -1);
        });

        it('should return -1 when armor_class value is not a valid number', () => {
            const monster = { armor_class: [{ value: "invalid" }] };
            const result = SRDMonsterSanitizer.getArmorClass(monster);
            assert.equal(result, -1);
        });
    });

    describe('#getSize()', () => {
        it('should return the correct number for a valid size', () => {
            assert.equal(SRDMonsterSanitizer.getSize("Tiny"), 0);
            assert.equal(SRDMonsterSanitizer.getSize("Small"), 1);
            assert.equal(SRDMonsterSanitizer.getSize("Medium"), 2);
            assert.equal(SRDMonsterSanitizer.getSize("Large"), 3);
            assert.equal(SRDMonsterSanitizer.getSize("Huge"), 4);
            assert.equal(SRDMonsterSanitizer.getSize("Gargantuan"), 5);
        });

        it('should return -1 for an invalid size', () => {
            assert.equal(SRDMonsterSanitizer.getSize("Colossal"), -1);
            assert.equal(SRDMonsterSanitizer.getSize(""), -1);
            assert.equal(SRDMonsterSanitizer.getSize(null), -1);
            assert.equal(SRDMonsterSanitizer.getSize(undefined), -1);
            assert.equal(SRDMonsterSanitizer.getSize(123), -1);
            assert.equal(SRDMonsterSanitizer.getSize({}), -1);
        });
    });

    describe("#getSpeed()", () => {
        it('should return a speed object with the correct properties, and only those properties', () => {
            const returnedProperties = Object.getOwnPropertyNames(SRDMonsterSanitizer.getSpeed({}));
            assert.deepStrictEqual(returnedProperties, requiredSpeedFields);
        })
        it('should return a speed object with the correct properties and values when valid speeds are provided', () => {
            const result = SRDMonsterSanitizer.getSpeed({ walk: "30 ft", fly: "60 ft", swim: "20 ft", burrow: "10 ft", climb: "15 ft" });
            const expected = {
                walk: 30,
                fly: 60,
                swim: 20,
                burrow: 10,
                climb: 15
            };
            assert.deepStrictEqual(result, expected);
        })
        it('should return 0 in fields that are not present', () => {
            let actual = SRDMonsterSanitizer.getSpeed({});
            assert.deepStrictEqual(actual, sampleEmptyMonster.speed);

            actual = SRDMonsterSanitizer.getSpeed({walk: "1 ft", fly: "2"});
            expected = {
                walk: 1,
                fly: 2,
                swim: 0,
                burrow: 0,
                climb: 0
            }
            assert.deepStrictEqual(actual, expected);
        })
        it('should return 0 in all fields and all fields should be present if an invalid speed is given', () => {
            let actual = SRDMonsterSanitizer.getSpeed({ walk: "invalid", swim: 5 });
            assert.deepStrictEqual(actual, sampleEmptyMonster.speed)

            actual = SRDMonsterSanitizer.getSpeed(7);
            assert.deepStrictEqual(actual, sampleEmptyMonster.speed)

            actual = SRDMonsterSanitizer.getSpeed(true);
            assert.deepStrictEqual(actual, sampleEmptyMonster.speed)

            actual = SRDMonsterSanitizer.getSpeed([]);
            assert.deepStrictEqual(actual, sampleEmptyMonster.speed)
        })

    })

    describe("#getSpellcasting()", () => {
        it('should contain the expcted fields, and those fields only for any input', () => {
            let actual = Object.getOwnPropertyNames(SRDMonsterSanitizer.getSpellcasting({}));
            assert.deepStrictEqual(actual, requiredSpellcastingFields);

            actual = Object.getOwnPropertyNames(SRDMonsterSanitizer.getSpellcasting(0));
            assert.deepStrictEqual(actual, requiredSpellcastingFields);

            actual = Object.getOwnPropertyNames(SRDMonsterSanitizer.getSpellcasting("a"));
            assert.deepStrictEqual(actual, requiredSpellcastingFields);

            actual = Object.getOwnPropertyNames(SRDMonsterSanitizer.getSpellcasting(false));
            assert.deepStrictEqual(actual, requiredSpellcastingFields);

            actual = Object.getOwnPropertyNames(SRDMonsterSanitizer.getSpellcasting({property: "a"}));
            assert.deepStrictEqual(actual, requiredSpellcastingFields);
        })

        it('should return the corresponding integer for each spellcasting ability, and -1 for any invalid input', () => {
            let monster = {
                special_abilities: [
                    { name: "Spellcasting", spellcasting: { level: 1, ability: { index: "int" }, spells: [{level:5}] } }
                ]
            }
            let result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, 0);

            monster.special_abilities[0].spellcasting.ability.index = "wis";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, 1);

            monster.special_abilities[0].spellcasting.ability.index = "cha";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, 2);

            monster.special_abilities[0].spellcasting.ability.index = "str";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);

            monster.special_abilities[0].spellcasting.ability.index = 5;
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);

            monster.special_abilities[0].spellcasting.ability.index = false;
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);

            monster.special_abilities[0].spellcasting.ability.index = {};
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);

            monster.special_abilities[0].name = "Innate Spellcasting"
            monster.special_abilities[0].spellcasting.ability.index = "int";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, 0);

            monster.special_abilities[0].spellcasting.ability.index = "wis";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, 1);

            monster.special_abilities[0].spellcasting.ability.index = "cha";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, 2);

            monster.special_abilities[0].spellcasting.ability.index = "str";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);

            monster.special_abilities[0].spellcasting.ability.index = 5;
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);

            monster.special_abilities[0].spellcasting.ability.index = false;
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);

            monster.special_abilities[0].spellcasting.ability.index = {};
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.ability, -1);
        })

        it("should set level to the corresponding spellcasting level if it is valid, and -1 otherwise", () => {
            let monster = {
                special_abilities: [
                    { name: "Spellcasting", spellcasting: { level: 1, ability: { index: "int" } } }
                ]
            }
            let result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, 1);

            monster.special_abilities[0].spellcasting.level = 7;
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, 7);

            monster.special_abilities[0].spellcasting.level = "invalid";
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, -1);

            monster.special_abilities[0].spellcasting.level = 0;
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, 0);

            monster.special_abilities[0].spellcasting.level = {};
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, -1);

            monster.special_abilities[0].spellcasting.level = [];
            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, -1);

        })

        it('should have both level and ability set to -1 if has_spellcasting is false', () => {
            let monster = {
                special_abilities: [
                    { name: "NotSpellcasting", spellcasting: { level: 1, ability: { index: "int" } } }
                ]
            }
            let result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, -1);
            assert.equal(result.ability, -1);

            monster = {}

            result = SRDMonsterSanitizer.getSpellcasting(monster);
            assert.equal(result.level, -1);
            assert.equal(result.ability, -1);
        })
    })
});

function checkHasCorrectTypes(sanitizedMonster) {
    assert.equal(typeof sanitizedMonster.name, 'string');
    assert.equal(typeof sanitizedMonster.type, 'string');
    assert.equal(typeof sanitizedMonster.subtype, 'string');
    assert.equal(typeof sanitizedMonster.hit_points_roll, 'string');

    assert.equal(typeof sanitizedMonster.size, 'number');
    assert.equal(typeof sanitizedMonster.armor_class, 'number');
    assert.equal(typeof sanitizedMonster.hit_points, 'number');
    assert.equal(typeof sanitizedMonster.strength, 'number');
    assert.equal(typeof sanitizedMonster.dexterity, 'number');
    assert.equal(typeof sanitizedMonster.constitution, 'number');
    assert.equal(typeof sanitizedMonster.intelligence, 'number');
    assert.equal(typeof sanitizedMonster.wisdom, 'number');
    assert.equal(typeof sanitizedMonster.charisma, 'number');
    assert.equal(typeof sanitizedMonster.challenge_rating, 'number');
    assert.equal(typeof sanitizedMonster.xp, 'number');

    assert.equal(typeof sanitizedMonster.is_legendary, 'boolean');

    assert.equal(typeof sanitizedMonster.speed, 'object');
    assert.equal(typeof sanitizedMonster.spellcasting, 'object');
    assert.equal(typeof sanitizedMonster.alignment, 'object');
}