
//const _playerSpriteDimensions = { x: 168, y: 100}

const _characters = {
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