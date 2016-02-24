var weapons = {
    club: {prof: 2, damage: '1d6', range: 1, price: 1, weight: 3, group: 'mace', properties: [], hands: 'one', category: 'simple melee'},
    
    dagger: {prof: 3, damage: '1d4', range: [5, 10], price: 1, weight: 1, group: 'light blade', properties: ['off-hand', 'light thrown'], hands: 'one', category: 'simple melee'},
    
    javelin: {prof: 2, damage: '1d6', range: [10, 20], price: 5, weight: 2, group: 'spear', properties: ['heavy thrown'], hands: 'one', category: 'simple melee'},
    
    mace: {prof: 2, damage: '1d8', range: 1, price: 5, weight: 6, group: 'mace', properties: ['versatile'], hands: 'one', category: 'simple melee'},
    
    sickle: {prof: 2, damage: '1d6', range: 1, price: 2, weight: 2, group: 'light blade', properties: ['off-hand'], hands: 'one', category: 'simple melee'},
    
    spear: {prof: 2, damage: '1d8', range: 1, price: 5, weight: 6, group: 'spear', properties: ['versatile'], hands: 'one', category: 'simple melee'},
    
    greatclub: {prof: 2, damage: '2d4', range: 1, price: 1, weight: 10, group: 'mace', properties: [], hands: 'two', category: 'simple melee'},
    
    morningstar: {prof: 2, damage: '1d10', range: 1, price: 10, weight: 8, group: 'mace', properties: [], hands: 'two', category: 'simple melee'},
    
    quarterstaff: {prof: 2, damage: '1d8', range: 1, price: 5, weight: 4, group: 'staff', properties: [], hands: 'two', category: 'simple melee'},
    
    scythe: {prof: 2, damage: '2d4', range: 1, price: 5, weight: 10, group: 'heavy blade', properties: [], hands: 'two', category: 'simple melee'},
    
    battleaxe: {prof: 2, damage: '1d10', range: 1, price: 15, weight: 6, group: 'axe', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    flail: {prof: 2, damage: '1d10', range: 1, price: 10, weight: 5, group: 'flail', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    handaxe: {prof: 2, damage: '1d6', range: [5, 10], price: 5, weight: 3, group: 'axe', properties: ['off-hand', 'heavy thrown'], hands: 'one', category: 'military melee'},
    
    longsword: {prof: 3, damage: '1d8', range: 1, price: 15, weight: 4, group: 'heavy blade', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    scimitar: {prof: 2, damage: '1d8', range: 1, price: 10, weight: 4, group: 'heavy blade', properties: ['high crit'], hands: 'one', category: 'military melee'},
    
    shortsword: {prof: 3, damage: '1d6', range: 1, price: 10, weight: 2, group: 'light blade', properties: ['off-hand'], hands: 'one', category: 'military melee'},
    
    throwinghammer: {prof: 2, damage: '1d6', range: [5, 10], price: 5, weight: 2, group: 'hammer', properties: ['off-hand', 'heavy thrown'], hands: 'one', category: 'military melee'},
    
    warhammer: {prof: 2, damage: '1d10', range: 1, price: 15, weight: 5, group: 'hammer', properties: ['versatile'], hands: 'one', category: 'military melee'},
    
    warpick: {prof: 2, damage: '1d8', range: 1, price: 15, weight: 6, group: 'pick', properties: ['high crit', 'versatile'], hands: 'one', category: 'military melee'},
    
    falchion: {prof: 3, damage: '2d4', range: 1, price: 25, weight: 7, group: 'heavy blade', properties: ['high crit'], hands: 'two', category: 'military melee'},
    
    glaive: {prof: 3, damage: '2d4', range: 1, price: 25, weight: 10, group: 'heavy blade', properties: ['reach'], hands: 'two', category: 'military melee'},
    
    greataxe: {prof: 2, damage: '1d12', range: 1, price: 30, weight: 12, group: 'axe', properties: ['high crit'], hands: 'two', category: 'military melee'},
    
    greatsword: {prof: 3, damage: '1d10', range: 1, price: 30, weight: 12, group: 'heavy blade', properties: [], hands: 'two', category: 'military melee'},
    
    halberd: {prof: 2, damage: '1d10', range: 1, price: 25, weight: 12, group: 'axe', properties: ['reach'], hands: 'two', category: 'military melee'},
    
    heavyflail: {prof: 2, damage: '2d6', range: 1, price: 25, weight: 10, group: 'flail', properties: [], hands: 'two', category: 'military melee'},
    
    longspear: {prof: 2, damage: '1d10', range: 1, price: 10, weight: 9, group: 'spear', properties: ['reach'], hands: 'two', category: 'military melee'},
    
    maul: {prof: 2, damage: '2d6', range: 1, price: 30, weight: 12, group: 'hammer', properties: [], hands: 'two', category: 'military melee'},
    
    bastardsword: {prof: 3, damage: '1d10', range: 1, price: 30, weight: 6, group: 'heavy blade', properties: ['versatile'], hands: 'one', category: 'superior melee'},
    
    katar: {prof: 3, damage: '1d6', range: 1, price: 3, weight: 1, group: 'light blade', properties: ['off-hand', 'high crit'], hands: 'one', category: 'superior melee'},
    
    rapier: {prof: 3, damage: '1d8', range: 1, price: 25, weight: 2, group: 'light blade', properties: [], hands: 'one', category: 'superior melee'},
    
    spikedchain: {prof: 3, damage: '2d4', range: 1, price: 30, weight: 10, group: 'flail', properties: ['reach'], hands: 'two', category: 'superior melee'},
    //ranged
    handcrossbow: {prof: 2, damage: '1d6', range: [10, 20], price: 25, weight: 2, group: 'crossbow', properties: ['load free'], hands: 'one', category: 'simple ranged'},
    
    sling: {prof: 2, damage: '1d6', range: [10, 20], price: 1, weight: 0, group: 'sling', properties: ['load free'], hands: 'one', category: 'simple ranged'},
    
    crossbow: {prof: 2, damage: '1d8', range: [15, 30], price: 25, weight: 4, group: 'crossbow', properties: ['load minor'], hands: 'two', category: 'simple ranged'},
    
    longbow: {prof: 2, damage: '1d10', range: [20, 40], price: 30, weight: 3, group: 'bow', properties: ['load free'], hands: 'two', category: 'military ranged'},
    
    shortbow: {prof: 2, damage: '1d8', range: [15, 30], price: 25, weight: 2, group: 'bow', properties: ['load free', 'small'], hands: 'two', category: 'military ranged'},
    
    shuriken: {prof: 3, damage: '1d4', range: [6, 12], price: 1, weight: 0.5, group: 'light blade', properties: ['light thrown'], hands: 'one', category: 'superior ranged'},
    
    unarmed: {prof: 0, damage: '1d4', range: 1, price: 0, weight: 0, group: 'unarmed', properties: [], hands: 'one', category: 'improvised melee'}
};
//prof: 0, damage: '', range: 1, price: 0, weight: 0, group: '', properties: [], hands: ''