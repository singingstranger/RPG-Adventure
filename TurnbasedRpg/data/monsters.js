const _enemyEntryImage = new Image();
_enemyEntryImage.src = "./img/Enemies/Slime/slimeEntry.png";
const _enemyIdleImage = new Image();
_enemyIdleImage.src = "./img/Enemies/Slime/slimeBlinking.png";
const _enemyAttackImage = new Image();
_enemyAttackImage.src = "./img/Enemies/Slime/slimeAttack.png";
const _enemyHurtImage = new Image();
_enemyHurtImage.src = "./img/Enemies/Slime/slimeHurt.png";



const monsters = {
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
        attacks: [attacks.Dagger, attacks.Tackle, attacks.Slingshot]
    },
    Slime: {
        name: "Slime",
        health: {max: 50, current:50},
        position: {
            x: 700,
            y: 200
        },
        image: {src: _enemyIdleImage.src},
        frames: { max: 3, hold: 30},
        sprites: {
            entry: _enemyEntryImage,
            idle: _enemyIdleImage,
            attack: _enemyAttackImage,
            hurt: _enemyHurtImage
        },
        animate: true,
        attacks: [attacks.Tackle, attacks.Splash]
    }
}