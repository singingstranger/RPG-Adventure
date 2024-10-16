//animations: 0 = tackle-type, 1 = rock throw, 2 = water, 3 = sword
const attacks = {
    Tackle: {
        name: "Tackle",
        damage: 10,
        type: _types.Normal,
        animation: 0,
        src: " ",
        color: "grey"
    },
    Slingshot: {
        name: "Slingshot",
        damage: 10,
        type: _types.Normal,
        animation: 1,
        src: "./img/Battle/Attacks/pebble.png",
        color: "brown"
    },
    Splash: {
        name:"Splash",
        damage: 20,
        type: _types.Water,
        animation: 1,
        src: "./img/Battle/Attacks/bubble.png",
        color: "blue"
    },
    Dagger: {
        name:"Dagger",
        damage: 30,
        type: _types.Normal,
        animation: 1,
        src: "./img/Battle/Attacks/sword.png",
        color: "grey"
    }
}