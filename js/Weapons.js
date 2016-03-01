var weapons = {
    club: {name: 'club', prof: 2, damage: '1d6', range: 1, price: 1, weight: 3, group: 'mace', properties: [], hands: 'one', category: 'simple melee'},
    
    dagger: {name: 'dagger', prof: 3, damage: '1d4', range: [5, 10], price: 1, weight: 1, group: 'light blade', properties: ['off-hand', 'light thrown'], hands: 'one', category: 'simple melee'},
    
    javelin: {name: 'javelin', prof: 2, damage: '1d6', range: [10, 20], price: 5, weight: 2, group: 'spear', properties: ['heavy thrown'], hands: 'one', category: 'simple melee'},
    
    mace: {name: 'mace', prof: 2, damage: '1d8', range: 1, price: 5, weight: 6, group: 'mace', properties: ['versatile'], hands: 'one', category: 'simple melee'},
    
    sickle: {name: 'sickle', prof: 2, damage: '1d6', range: 1, price: 2, weight: 2, group: 'light blade', properties: ['off-hand'], hands: 'one', category: 'simple melee'},
    
    spear: {name: 'spear', prof: 2, damage: '1d8', range: 1, price: 5, weight: 6, group: 'spear', properties: ['versatile'], hands: 'one', category: 'simple melee'},
    
    greatclub: {name: 'great club', prof: 2, damage: '2d4', range: 1, price: 1, weight: 10, group: 'mace', properties: [], hands: 'two', category: 'simple melee'},
    
    morningstar: {name: 'morningstar', prof: 2, damage: '1d10', range: 1, price: 10, weight: 8, group: 'mace', properties: [], hands: 'two', category: 'simple melee'},
    
    quarterstaff: {name: 'quarterstaff', prof: 2, damage: '1d8', range: 1, price: 5, weight: 4, group: 'staff', properties: [], hands: 'two', category: 'simple melee'},
    
    scythe: {name: 'scythe', prof: 2, damage: '2d4', range: 1, price: 5, weight: 10, group: 'heavy blade', properties: [], hands: 'two', category: 'simple melee'},
    
    battleaxe: {name: 'battle axe', prof: 2, damage: '1d10', range: 1, price: 15, weight: 6, group: 'axe', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    flail: {name: 'flail', prof: 2, damage: '1d10', range: 1, price: 10, weight: 5, group: 'flail', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    handaxe: {name: 'hand axe', prof: 2, damage: '1d6', range: [5, 10], price: 5, weight: 3, group: 'axe', properties: ['off-hand', 'heavy thrown'], hands: 'one', category: 'military melee'},
    
    longsword: {name: 'long sword', prof: 3, damage: '1d8', range: 1, price: 15, weight: 4, group: 'heavy blade', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    scimitar: {name: 'scimitar', prof: 2, damage: '1d8', range: 1, price: 10, weight: 4, group: 'heavy blade', properties: ['high crit'], hands: 'one', category: 'military melee'},
    
    shortsword: {name: 'short sword', prof: 3, damage: '1d6', range: 1, price: 10, weight: 2, group: 'light blade', properties: ['off-hand'], hands: 'one', category: 'military melee'},
    
    throwinghammer: {name: 'throwing hammer', prof: 2, damage: '1d6', range: [5, 10], price: 5, weight: 2, group: 'hammer', properties: ['off-hand', 'heavy thrown'], hands: 'one', category: 'military melee'},
    
    warhammer: {name: 'warhammer', prof: 2, damage: '1d10', range: 1, price: 15, weight: 5, group: 'hammer', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    warpick: {name: 'warpick', prof: 2, damage: '1d8', range: 1, price: 15, weight: 6, group: 'pick', properties: ['high crit', 'versatile'], hands: 'one', category: 'military melee'},
    
    falchion: {name: 'falchion', prof: 3, damage: '2d4', range: 1, price: 25, weight: 7, group: 'heavy blade', properties: ['high crit'], hands: 'two', category: 'military melee'},
    
    glaive: {name: 'glaive', prof: 3, damage: '2d4', range: 1, price: 25, weight: 10, group: 'heavy blade', properties: ['reach'], hands: 'two', category: 'military melee'},
    
    greataxe: {name: 'great axe', prof: 2, damage: '1d12', range: 1, price: 30, weight: 12, group: 'axe', properties: ['high crit'], hands: 'two', category: 'military melee'},
    
    greatsword: {name: 'great sword', prof: 3, damage: '1d10', range: 1, price: 30, weight: 12, group: 'heavy blade', properties: [], hands: 'two', category: 'military melee'},
    
    halberd: {name: 'halberd', prof: 2, damage: '1d10', range: 1, price: 25, weight: 12, group: 'axe', properties: ['reach'], hands: 'two', category: 'military melee'},
    
    heavyflail: {name: 'heavy flail', prof: 2, damage: '2d6', range: 1, price: 25, weight: 10, group: 'flail', properties: [], hands: 'two', category: 'military melee'},
    
    longspear: {name: 'long spear', prof: 2, damage: '1d10', range: 1, price: 10, weight: 9, group: 'spear', properties: ['reach'], hands: 'two', category: 'military melee'},
    
    maul: {name: 'maul', prof: 2, damage: '2d6', range: 1, price: 30, weight: 12, group: 'hammer', properties: [], hands: 'two', category: 'military melee'},
    
    bastardsword: {name: 'bastard sword', prof: 3, damage: '1d10', range: 1, price: 30, weight: 6, group: 'heavy blade', properties: ['versatile'], hands: 'one', category: 'superior melee'},
    
    katar: {name: 'katar', prof: 3, damage: '1d6', range: 1, price: 3, weight: 1, group: 'light blade', properties: ['off-hand', 'high crit'], hands: 'one', category: 'superior melee'},
    
    rapier: {name: 'rapier', prof: 3, damage: '1d8', range: 1, price: 25, weight: 2, group: 'light blade', properties: [], hands: 'one', category: 'superior melee'},
    
    spikedchain: {name: 'spiked chain', prof: 3, damage: '2d4', range: 1, price: 30, weight: 10, group: 'flail', properties: ['reach'], hands: 'two', category: 'superior melee'},
    //ranged
    handcrossbow: {name: 'hand crossbow', prof: 2, damage: '1d6', range: [10, 20], price: 25, weight: 2, group: 'crossbow', properties: ['load free'], hands: 'one', category: 'simple ranged'},
    
    sling: {name: 'sling', prof: 2, damage: '1d6', range: [10, 20], price: 1, weight: 0, group: 'sling', properties: ['load free'], hands: 'one', category: 'simple ranged'},
    
    crossbow: {name: 'crossbow', prof: 2, damage: '1d8', range: [15, 30], price: 25, weight: 4, group: 'crossbow', properties: ['load minor'], hands: 'two', category: 'simple ranged'},
    
    longbow: {name: 'longbow', prof: 2, damage: '1d10', range: [20, 40], price: 30, weight: 3, group: 'bow', properties: ['load free'], hands: 'two', category: 'military ranged'},
    
    shortbow: {name: 'shortbow', prof: 2, damage: '1d8', range: [15, 30], price: 25, weight: 2, group: 'bow', properties: ['load free', 'small'], hands: 'two', category: 'military ranged'},
    
    shuriken: {name: 'shuriken', prof: 3, damage: '1d4', range: [6, 12], price: 1, weight: 0.5, group: 'light blade', properties: ['light thrown'], hands: 'one', category: 'superior ranged'},
    
    unarmed: {name: 'unarmed', prof: 0, damage: '1d4', range: 1, price: 0, weight: 0, group: 'unarmed', properties: [], hands: 'one', category: 'improvised melee'}
};
//prof: 0, damage: '', range: 1, price: 0, weight: 0, group: '', properties: [], hands: ''