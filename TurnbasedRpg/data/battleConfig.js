const _types = {
    None: "None",
    Normal: "Normal",
    Fire: "Fire",
    Water: "Water",
    Spirit: "Spirit",
    Demon: "Demon",
    Plant: "Plant",
    Electric: "Electric"
}

const _effectiveness = {
    attackNeutral: 1,
    defenseStrongAgainst: 0.5,
    defenseWeakAgainst: 1.5,
}

const _healingModes ={
    Health: "Health",
    Stamina: "Stamina",
    Mana: "Mana"
}

const _typeMatchups = [{
    
        name: "Normal",
        color: "grey",
        attacksBoostedAgainst: [_types.Plant],
        attacksWeakAgainst: [_types.Demon],
        defenseStrongAgainst: [_types.None],
        defenseWeakAgainst: [_types.Spirit, _types.Demon, _types.Fire]
    },
    {
        name: "Fire",
        color: "red",
        attacksBoostedAgainst: [_types.Plant, _types.Normal],
        attacksWeakAgainst: [_types.Spirit, _types.Water],
        defenseStrongAgainst: [_types.Electric, _types.Plant],
        defenseWeakAgainst: [_types.Water]
    },
    {
        name: "Water",
        color: "#00a3a8",
        attacksBoostedAgainst: [_types.Spirit, _types.Fire],
        attacksWeakAgainst: [_types.Plant, _types.Demon],
        defenseStrongAgainst: [_types.Fire, _types.Spirit],
        defenseWeakAgainst: [_types.Electric, _types.Plant]
    },
    {
        name: "Plant",
        color: "green",
        attacksBoostedAgainst: [_types.Water, _types.Demon],
        attacksWeakAgainst: [_types.Plant, _types.Fire],
        defenseStrongAgainst: [_types.Water, _types.Demon],
        defenseWeakAgainst: [_types.Fire]
    },
    {
        name: "Spirit",
        color: "white",
        attacksBoostedAgainst: [_types.Demon, _types.Normal],
        attacksWeakAgainst: [_types.Electric, _types.Water],
        defenseStrongAgainst: [_types.Fire, _types.Demon],
        defenseWeakAgainst: [_types.Electric, _types.Water]
    },
    {
        name: "Demon",
        color: "purple",
        attacksBoostedAgainst: [_types.Normal, _types.Electric],
        attacksWeakAgainst: [_types.Spirit, _types.Plant],
        defenseStrongAgainst: [_types.Water, _types.Electric],
        defenseWeakAgainst: [_types.Plant, _types.Spirit]
    },
    {
        name: "Electric",
        color: "orange",
        attacksBoostedAgainst: [_types.Spirit, _types.Water],
        attacksWeakAgainst: [_types.Fire, _types.Demon],
        defenseStrongAgainst: [_types.Plant, _types.Spirit],
        defenseWeakAgainst: [_types.Demon]
    }
]

//animations: 0 = tackle-type, 1 = throwing animation
const _attacks = {
    Tackle: {
        name: "Tackle",
        damage: 10,
        type: _types.Normal,
        animation: 0,
        src: " "
    },
    Slingshot: {
        name: "Slingshot",
        damage: 10,
        type: _types.Normal,
        animation: 1,
        src: "./img/Battle/Attacks/pebble.png"
    },
    Dagger: {
        name:"Dagger",
        damage: 30,
        type: _types.Normal,
        animation: 1,
        src: "./img/Battle/Attacks/sword.png"
    }, 
    Splash: {
        name:"Splash",
        damage: 20,
        type: _types.Water,
        animation: 1,
        src: "./img/Battle/Attacks/bubble.png"
    },
    Fireball: {
        name:"Fireball",
        damage: 20,
        type: _types.Fire,
        animation: 1,
        src: "./img/Battle/Attacks/fire.png"
    },
    Thorns: {
        name:"Thorns",
        damage:20,
        type: _types.Plant,
        animation: 1,
        src: "./img/Battle/Attacks/thorns.png"
    },
    DarkStar: {
        name:"Dark Star",
        damage:20,
        type: _types.Demon,
        animation: 1,
        src: "./img/Battle/Attacks/darkStar.png"
    },
    SpiritFire: {
        name: "Spiritfire",
        damage: 20,
        type: _types.Spirit,
        animation: 1,
        src: "./img/Battle/Attacks/spiritFire.png"
    }, 
    Thunder:{
        name: "Thunder",
        damage: 20,
        type: _types.Electric,
        animation: 1,
        src: "./img/Battle/Attacks/electricCloud.png"
    }
}


const _monsters = {
    Player: {
        name: "You",
        health: {
            max: 100,
            current:100,
        },
        position: {
            x: 200,
            y: 200
        },
        image: {src: _playerSpecialImage.src},
        frames: { max: 3, hold: 30},
        animate: true,
        isEnemy: false,
        sprites: {
            entry:_playerSpecialImage,
            idle: _playerSpecialImage,
            attack: _playerSpecialImage,
            hurt: _playerSpecialImage
        },
        type: _types.Normal,
        stamina: 10,
        mana: {
            max: 10,
            current: 2
        },
        physicalDefense: 1,
        magicalDefense: 1,
        physicalStrength: 1,
        magicalPower: 1,
        attacks: [_attacks.Dagger, _attacks.Tackle, _attacks.Slingshot, _attacks.Splash],
    },
    Slime: {
        name: "Slime",
        health: {max: 50, current:50},
     
        image: {src: _slimeIdleImage.src},
        frames: { max: 3, hold: 30},
        sprites: {
            entry: _slimeEntryImage,
            idle: _slimeIdleImage,
            attack: _slimeAttackImage,
            hurt: _slimeHurtImage
        },
        animate: true,
        type: _types.Water,
        stamina: 10,
        mana: {
            max: 3,
            current: 3
        },
        physicalDefense: 5,
        magicalDefense: 10,
        physicalStrength: 1,
        magicalPower: 1,
        attacks: [_attacks.Splash]
    },
    Snare: {
        name: "Snare",
        health: {max: 150, current:150},
        image: {src: _snareEntryImage.src},
        frames: { max: 3, hold: 30},
        sprites: {
            entry: _snareEntryImage,
            idle: _snareIdleImage,
            attack: _snareAttackImage,
            hurt: _snareHurtImage
        },
        animate: true,
        type: _types.Plant,
        stamina: 10,
        mana: {
            max: 10,
            current: 10
        },
        physicalDefense: 1,
        magicalDefense: 1,
        physicalStrength: 1,
        magicalPower: 1,
        attacks: [_attacks.Thorns]
    },
    Shadow: {
        name: "Shadow",
        health: {max: 100, current:100},
        image: {src: _shadowIdleImage.src},
        frames: { max: 3, hold: 30},
        sprites: {
            entry: _shadowEntryImage,
            idle: _shadowIdleImage,
            attack: _shadowAttackImage,
            hurt: _shadowHurtImage
        },
        animate: true,
        type: _types.Demon,
        stamina: 10,
        mana: {
            max: 10,
            current: 10
        },
        physicalDefense: 1,
        magicalDefense: 1,
        physicalStrength: 1,
        magicalPower: 1,
        attacks: [_attacks.DarkStar]
    }
}
const _playerElementalAttacks = [
    _types.Fire = _attacks.Fireball,
    _types.Water = _attacks.Splash,
    _types.Plant = _attacks.Thorns,
    _types.Demon = _attacks.DarkStar,
    _types.Spirit = _attacks.SpiritFire,
    _types.Electric = _attacks.Thunder
]