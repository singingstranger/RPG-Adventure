const _dirOverworld = "./img/Overworld/";
const _dirBattle = "./img/Battle/";

const _startingMapIndex = 1;
let _currentMapIndex = _startingMapIndex;
const _battleScreen = new Image();
const _startScreen = new Image();

let _collisionMaps = [];
let _battleMaps = [];

const _startingpositionTestScreen = [-600,-200];
let _offset = {
    x: _startingpositionTestScreen[0],
    y: _startingpositionTestScreen[1]
}
const _startingPosTileCount = 30;
const _zoomLevel = 2.5;

let _player;
const _playerSpriteFrames = 3;
const _playerSpriteDimensions = { x: 168, y: 100}
let _playerAnimationSpeed = 10;
let _tileDimensions = 32;

let _movables = [];
let _movementSpeed = 3;

const _canvas = document.querySelector("canvas");
const _context = _canvas.getContext("2d");

const _spritesheetDimensions = [3, 1]

_canvas.width = 1024;
_canvas.height = 576;


let _encounterRate = 0.001
const _battle = {
    initiated: false
}

let _currentBackground;

let _renderedSprites = [];
let _battleQueue;

const _frameTime = 10;
let _timeLastFrame = 0;
let _timeCurrent = 0;


const _boundaries = [];
const _battleTiles = [];
const _listOfNPCs = [];
let _background;
let _battleBG;

function SetTileSize(zoom){
    _tileDimensions *= zoom;
}

function InitVisuals(){
    _player = new Sprite({
        name: "You",
        position: {
            x: _canvas.width/2 - _playerSpriteDimensions.x/_playerSpriteFrames/2,
            y:  _canvas.height/2 - _playerSpriteDimensions.y/2,
        },
        image: _playerFrontImage,
        frames: { max: _playerSpriteFrames, hold: _playerAnimationSpeed},
        sprites: {
            down: _playerFrontImage,
            up: _playerBackImage,
            right: _playerRightImage,
            left: _playerLeftImage,
            special: _playerSpecialImage
        },
        isEnemy: false
    })
    
    _collisionMaps.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol != 0){
                _boundaries.push(new Boundary({
                    position:{
                        x: j * _tileDimensions + _offset.x ,
                        y: i * _tileDimensions + _offset.y
                }}))
            }
        })
    })
    
    _battleMaps.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol!=0){
                _battleTiles.push(new Trigger({
                    position:{
                        x: j * _tileDimensions + _offset.x,
                        y: i * _tileDimensions + _offset.y
                    }
                }))
            }
        })
    })
    
    InitNPCs();
    InitUI();
    
    _background = new Sprite({
        position: {
            x: _offset.x, 
            y: _offset.y
        },
        image: _currentBackground
    });
    
    _battleBG = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        image: _battleScreen
    });
}
function InitUI(){

}

function InitNPCs(){
    let _clone = new Character(characters.MarinClone);
    _clone.position={
        x: _canvas.width-200 ,
        y:  _canvas.height-150
    };
    _listOfNPCs.push(_clone);
    _boundaries.push(new Boundary({
        position:{
            x: _clone.position.x-10,
            y: _clone.position.y+10
    }}))
}