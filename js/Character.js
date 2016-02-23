var sheet = {
            level: 1,
            hp: 0,
            bloodiedval: 0,
            defenses: {
                ac: 0,
                fort: 0,
                will: 0,
                ref: 0
            },
            abilities: {
                str: 0,
                con: 0,
                dex: 0,
                int: 0,
                wis: 0,
                cha: 0
            },
            surges: 0,
            surgevalue: 0,
            actionpoints: 1,
            initiative: 0,
            insight: 0,
            perception: 0,
            speed: 6,
            secondwind: 1,
            reach: 1,
            conditions: {
                blinded: false,
                bloodied: false,
                dazed: false,
                deafened: false,
                dominated: false,
                dying: false,
                helpless: false,
                immobilized: false,
                marked: false,
                petrified: false,
                prone: false,
                restrained: false,
                slowed: false,
                stunned: false,
                surprised: false,
                unconscious: false,
                weakened: false
            },
            slots: {
                armor: '',
                mainhand: '',
                offhand: '',
                leftring: '',
                rightring: '',
                arms: '',
                head: '',
                feet: '',
                hands: '',
                neck: '',
                waist: '',
                tattoo: '',
                kifocus: ''
            },
            skills: {
                acrobatics: 0,
                arcana: 0,
                athletics: 0,
                bluff: 0,
                diplomacy: 0,
                dungeoneering: 0,
                endurance: 0,
                heal: 0,
                history: 0,
                insight: 0,
                intimidate: 0,
                nature: 0,
                perception: 0,
                religion: 0,
                stealth: 0,
                streetwise: 0,
                thievery: 0
            },
            powers: {},
            baseattack: 0,
            basedamage: 0,
            resistences: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            vulnerabilities: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            equipment: {},
            metadata: {
                movement: 0,
                actions: [[1,1,1],[1,0,2],[0,2,1],[0,1,2],[0,0,3]],
                lastaction: {
                    power: {},
                    target: {}
                }
            }
}; //do not modify

var pregen1 = {
            level: 1,
            hp: 27,
            bloodiedval: 13,
            defenses: {
                ac: 18,
                fort: 16,
                will: 12,
                ref: 15
            },
            abilities: {
                str: 4,
                con: 1,
                dex: -1,
                int: 0,
                wis: 3,
                cha: 1
            },
            surges: 0,
            surgevalue: 6,
            actionpoints: 1,
            initiative: -1,
            insight: 18,
            perception: 13,
            speed: 6,
            secondwind: 1,
            reach: 1,
            conditions: {
                blinded: false,
                bloodied: false,
                dazed: false,
                deafened: false,
                dominated: false,
                dying: false,
                helpless: false,
                immobilized: false,
                marked: false,
                petrified: false,
                prone: false,
                restrained: false,
                slowed: false,
                stunned: false,
                surprised: false,
                unconscious: false,
                weakened: false
            },
            slots: {
                armor: 'plate',
                mainhand: '',
                offhand: '',
                leftring: '',
                rightring: '',
                arms: '',
                head: '',
                feet: '',
                hands: '',
                neck: '',
                waist: '',
                tattoo: '',
                kifocus: ''
            },
            skills: {
                acrobatics: 0,
                arcana: 0,
                athletics: 0,
                bluff: 0,
                diplomacy: 0,
                dungeoneering: 0,
                endurance: 4,
                heal: 8,
                history: 5,
                insight: 5,
                intimidate: 0,
                nature: 0,
                perception: 0,
                religion: 0,
                stealth: 0,
                streetwise: 0,
                thievery: 0
            },
            powers: {},
            baseattack: 7,
            basedamage: 4,
            resistences: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            vulnerabilities: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            equipment: {},
            metadata: {
                movement: 0,
                actions: [[1,1,1],[1,0,2],[0,2,1],[0,1,2],[0,0,3]],
                lastaction: {
                    power: {},
                    target: {}
                }
            }
};

var pregen2 = {
            level: 1,
            hp: 23,
            bloodiedval: 11,
            defenses: {
                ac: 16,
                fort: 14,
                will: 15,
                ref: 14
            },
            abilities: {
                str: 2,
                con: 0,
                dex: 4,
                int: 0,
                wis: 3,
                cha: -1
            },
            surges: 0,
            surgevalue: 5,
            actionpoints: 1,
            initiative: 6,
            insight: 13,
            perception: 18,
            speed: 6,
            secondwind: 1,
            reach: 1,
            conditions: {
                blinded: false,
                bloodied: false,
                dazed: false,
                deafened: false,
                dominated: false,
                dying: false,
                helpless: false,
                immobilized: false,
                marked: false,
                petrified: false,
                prone: false,
                restrained: false,
                slowed: false,
                stunned: false,
                surprised: false,
                unconscious: false,
                weakened: false
            },
            slots: {
                armor: 'cloth',
                mainhand: 'none',
                offhand: '',
                leftring: '',
                rightring: '',
                arms: '',
                head: '',
                feet: '',
                hands: '',
                neck: '',
                waist: '',
                tattoo: '',
                kifocus: ''
            },
            skills: {
                acrobatics: 11,
                arcana: 0,
                athletics: 9,
                bluff: 0,
                diplomacy: 0,
                dungeoneering: 0,
                endurance: 0,
                heal: 0,
                history: 0,
                insight: 0,
                intimidate: 0,
                nature: 0,
                perception: 8,
                religion: 0,
                stealth: 9,
                streetwise: 0,
                thievery: 0
            },
            powers: {},
            baseattack: 5,
            basedamage: 4,
            resistences: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            vulnerabilities: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            equipment: {},
            metadata: {
                movement: 0,
                actions: [[1,1,1],[1,0,2],[0,2,1],[0,1,2],[0,0,3]],
                lastaction: {
                    power: {},
                    target: {}
                }
            }
};
    

