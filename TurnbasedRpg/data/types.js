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

const _typeMatchups = {
    Normal: {
        name: "Normal",
        attacksBoostedAgainst: [_types.Plant],
        attacksWeakAgainst: [_types.Demon],
        defenseStrongAgainst: [_types.None],
        defenseWeakAgainst: [_types.Spirit, _types.Demon, _types.Fire]
    },
    Fire: {
        name: "Fire",
        attacksBoostedAgainst: [_types.Plant, _types.Normal],
        attacksWeakAgainst: [_types.Spirit, _types.Water],
        defenseStrongAgainst: [_types.Electric, _types.Plant],
        defenseWeakAgainst: [_types.Water]
    },
    Water: {
        name: "Water",
        attacksBoostedAgainst: [_types.Spirit, _types.Fire],
        attacksWeakAgainst: [_types.Plant, _types.Demon],
        defenseStrongAgainst: [_types.Fire, _types.Spirit],
        defenseWeakAgainst: [_types.Electric, _types.Plant]
    },
    Spirit: {
        name: "Spirit",
        attacksBoostedAgainst: [_types.Demon, _types.Normal],
        attacksWeakAgainst: [_types.Electric, _types.Water],
        defenseStrongAgainst: [_types.Fire, _types.Demon],
        defenseWeakAgainst: [_types.Electric, _types.Water]
    },
    Demon: {
        name: "Demon",
        attacksBoostedAgainst: [_types.Normal, _types.Electric],
        attacksWeakAgainst: [_types.Spirit, _types.Plant],
        defenseStrongAgainst: [_types.Water, _types.Electric],
        defenseWeakAgainst: [_types.Plant, _types.Spirit]
    },
    Electric: {
        name: "Electric",
        attacksBoostedAgainst: [_types.Spirit, _types.Water],
        attacksWeakAgainst: [_types.Fire, _types.Demon],
        defenseStrongAgainst: [_types.Plant, _types.Spirit],
        defenseWeakAgainst: [_types.Demon]
    }
}

class Type {
    constructor({
        name,
        attack,
        attacksBoostedAgainst,
        attacksWeakAgainst,
        defenseStrongAgainst,
        defenseWeakAgainst
    }){
        this.name = name;
        this.attack = attack;
        this.attacksBoostedAgainst = attacksBoostedAgainst;
        this.attacksWeakAgainst = attacksWeakAgainst;
        this.defenseStrongAgainst = defenseStrongAgainst;
        this.defenseWeakAgainst = defenseWeakAgainst;
    }
}