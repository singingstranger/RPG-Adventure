const _playerFrontImage = new Image();
_playerFrontImage.src = "./img/Characters/marinFront.png";
const _playerBackImage = new Image();
_playerBackImage.src = "./img/Characters/marinBack.png";
const _playerRightImage = new Image();
_playerRightImage.src = "./img/Characters/marinRight.png";
const _playerLeftImage = new Image();
_playerLeftImage.src = "./img/Characters/marinLeft.png";
const _playerSpecialImage = new Image();
_playerSpecialImage.src = "./img/Characters/marinSpecial.png";

//const _playerSpriteDimensions = { x: 168, y: 100}

const characters = {
    MarinClone: {
        name: "MarinClone",
        position: {
            x: 0,
            y: 0
        },
        image: {src: _playerFrontImage.src},
        frames: { max: 3, hold: 10},
        sprites: {
            front:_playerFrontImage,
            back: _playerBackImage,
            left: _playerLeftImage,
            right: _playerRightImage,
            special: _playerSpecialImage
        },
        animate: false
    },
}