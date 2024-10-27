
const _orbs ={
    NoOrb:{
        name: "Heart",
        description: "Without an elemental orb, only your human heart remains.",
        count: 1,

        src: "./img/GUI/Heart.png",
        type: _types.Normal
    },
    FireOrb:{
        name: "Orb of Flames",
        description: "A mythical artefact that grants the power of fire to you.",
        count: 0,

        src: "./img/Inventory/Orbs/orb_fire.png",
        type: _types.Fire
    },
    WaterOrb:{
        name: "Orb of Droplets",
        description: "A mythical artefact that grants the power of water to you.",
        count: 0,

        src: "./img/Inventory/Orbs/orb_water.png",
        type: _types.Water
    },
    MossOrb:{
        name: "Orb of Moss",
        description: "A mythical artefact that grants the power of plants to you.",
        count: 0,

        src: "./img/Inventory/Orbs/orb_mossy.png",
        type: _types.Plant
    },
    DemonOrb:{
        name: "Orb of Darkness",
        description: "A mythical artefact that grants the power of demons to you.",
        count: 0,

        src: "./img/Inventory/Orbs/orb_demon.png",
        type: _types.Demon
    },
    SpiritOrb:{
        name: "Orb of Light",
        description: "A mythical artefact that grants the power of spirits to you.",
        count: 0,

        src: "./img/Inventory/Orbs/orb_spirit.png",
        type: _types.Spirit
    },
    ElectricOrb:{
        name: "Orb of Lightning",
        description: "A mythical artefact that grants the power of electricity to you.",
        count: 0,

        src: "./img/Inventory/Orbs/orb_electric.png",
        type: _types.Electric
    }
}
const _healingItems = {
    HealingPotion: {
        name: "Tincture of Health",
        description: "Soothes the aches of your body. +10 Health",
        count: 1,
        healingType: _healingModes.Health,
        healingfactor: 10
    },
    ManaPotion: {
        name: "Tincture of Magic",
        description: "Replenishes magical power. +10 Mana",
        count: 1,
        healingType: _healingModes.Mana,
        healingFacot: 10
    }
}

