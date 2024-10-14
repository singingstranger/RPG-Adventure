
//Directories
const _dirOverworld = "./img/Overworld/";
const _dirBattle = "./img/Battle/";

//Time
const _frameTime = 10;
let _timeLastFrame = 0;
let _timeCurrent = 0;

//Background and sprites
const _startingMapIndex = 1;
let _currentMapIndex = _startingMapIndex;
const _battleScreen = new Image();
const _startScreen = new Image();

const _boundaries = [];
const _battleTiles = [];
const _listOfNPCs = [];
let _background;
let _battleBG;
let _collisionMaps = [];
let _battleMaps = [];

let _movables = [];

let _currentBackground;

//Player
let _player;
const _playerSpriteDimensions = { x: 168, y: 100}
let _playerAnimationSpeed = 10;
let _tileDimensions = 32;
const _spritesheetDimensions = [3, 1]
const _playerSpriteFrames = _spritesheetDimensions[0];
let _movementSpeed = 3;

//Init Positions
const _startingpositionTestScreen = [-600,-200];
let _offset = {
    x: _startingpositionTestScreen[0],
    y: _startingpositionTestScreen[1]
}
const _startingPosTileCount = 30;
const _zoomLevel = 2.5;

//Init Canvas
const _canvas = document.querySelector("canvas");
const _context = _canvas.getContext("2d");

_canvas.width = 1024;
_canvas.height = 576;


//Battles
let _encounterRate = 0.1
const _battle = {
    initiated: false
}
let _battleSprites = [];
let _battleQueue;
let _currentEncounterables =[
    _monsters.Shadow,
    _monsters.Slime,
    _monsters.Snare
]

//UI
const _thresholdForHealthbarColorChangeMid = 50;
const _thresholdForHealthbarColorChangeLow = 20;


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