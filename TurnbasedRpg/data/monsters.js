const _slimeEntryImage = new Image();
_slimeEntryImage.src = "./img/Enemies/Slime/slimeEntry.png";
const _slimeIdleImage = new Image();
_slimeIdleImage.src = "./img/Enemies/Slime/slimeBlinking.png";
const _slimeAttackImage = new Image();
_slimeAttackImage.src = "./img/Enemies/Slime/slimeAttack.png";
const _slimeHurtImage = new Image();
_slimeHurtImage.src = "./img/Enemies/Slime/slimeHurt.png";

const _shadowEntryImage = new Image();
_shadowEntryImage.src = "./img/Enemies/Shadow/ShadowEntry.png";
const _shadowIdleImage = new Image();
_shadowIdleImage.src = "./img/Enemies/Shadow/ShadowIdle.png";
const _shadowAttackImage = new Image();
_shadowAttackImage.src = "./img/Enemies/Shadow/ShadowAttack.png";
const _shadowHurtImage = new Image();
_shadowHurtImage.src = "./img/Enemies/Shadow/ShadowHurt.png";

const _snareEntryImage = new Image();
_snareEntryImage.src = "./img/Enemies/Snare/SnareEntry.png";
const _snareIdleImage = new Image();
_snareIdleImage.src = "./img/Enemies/Snare/SnareIdle.png";
const _snareAttackImage = new Image();
_snareAttackImage.src = "./img/Enemies/Snare/SnareAttack.png";
const _snareHurtImage = new Image();
_snareHurtImage.src = "./img/Enemies/Snare/SnareHurt.png";

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
        attacks: [attacks.Dagger, attacks.Tackle, attacks.Slingshot],
    },
    Slime: {
        name: "Slime",
        health: {max: 50, current:50},
        position: {
            x: 700,
            y: 200
        },
        image: {src: _slimeIdleImage.src},
        frames: { max: 3, hold: 30},
        sprites: {
            entry: _slimeEntryImage,
            idle: _slimeIdleImage,
            attack: _slimeAttackImage,
            hurt: _slimeHurtImage
        },
        animate: true,
        attacks: [attacks.Tackle, attacks.Splash]
    },
    Snare: {
        name: "Snare",
        health: {max: 150, current:150},
        position: {
            x: 700,
            y: 200
        },
        image: {src: _snareEntryImage.src},
        frames: { max: 3, hold: 30},
        sprites: {
            entry: _snareEntryImage,
            idle: _snareIdleImage,
            attack: _snareAttackImage,
            hurt: _snareHurtImage
        },
        animate: true,
        attacks: [attacks.Slingshot, attacks.Dagger]
    },
    Shadow: {
        name: "Shadow",
        health: {max: 100, current:100},
        position: {
            x: 700,
            y: 200
        },
        image: {src: _shadowIdleImage.src},
        frames: { max: 3, hold: 30},
        sprites: {
            entry: _shadowEntryImage,
            idle: _shadowIdleImage,
            attack: _shadowAttackImage,
            hurt: _shadowHurtImage
        },
        animate: true,
        attacks: [attacks.Tackle, attacks.Splash]
    }
}