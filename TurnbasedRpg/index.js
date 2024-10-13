document.querySelector("#userInterface").style.display = "none";
gsap.to("#overlappingDiv", {
    opacity:0,
    duration: 1
});

InitMaps(_startingMapIndex);
SetTileSize(_zoomLevel);
InitVisuals();

_startScreen.onload = () => {
    Animate();
}

const _keys = {
    w: {
        pressed: false
    },
    a: {
        pressed:false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

_movables = [_background, ..._boundaries, ..._battleTiles, ..._listOfNPCs];
function RectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}
function Animate(){
    const animationID = window.requestAnimationFrame(Animate);
    _background.draw();
    
    _boundaries.forEach(boundary => {
        boundary.draw();
    })
    _battleTiles.forEach(battleTile => {
        battleTile.draw();
    })
    if (_listOfNPCs.length != 0){
        _listOfNPCs.forEach(npc => {
            npc.draw();
        })
    }
        
    _player.draw();
    let moving = true;
    let inBattleTile = false;
    let movementSpeed = _movementSpeed+3;

    _player.animate = false;

    if (_battle.initiated){return;}

//battle activation
    if (_keys.w.pressed || _keys.a.pressed || _keys.s.pressed || _keys.d.pressed){
        for (let i = 0; i<_battleTiles.length; i++){
            const battleTile = _battleTiles[i];
            const overlappingArea = (Math.min(_player.position.x + _player.width, battleTile.position.x + battleTile.width) - Math.max(_player.position.x, battleTile.position.x)) * (Math.min(_player.position.y + _player.height, battleTile.position.y + battleTile.height) - Math.max(_player.position.y, battleTile.position.y)); 
            if (RectangularCollision({
                rectangle1: _player, 
                rectangle2: battleTile
                }) &&
                overlappingArea > (_player.width * _player.height/2) && Math.random() < _encounterRate
            ){
                console.log("entered battle tile");
                Activatebattle(animationID);
                _battle.initiated = true;
                _player.animate = false;
                break;
            }
        }
    }

    
//playermovement
    if (_keys.w.pressed) {
        for (let i = 0; i<_boundaries.length && _lastkey == "w"; i++){
            _player.animate = true;
            _player.image = _player.sprites.up;
            const boundary = _boundaries[i];
            if (RectangularCollision({
                rectangle1: _player, 
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + movementSpeed
                    }
                }
            })
            ){
                console.log("colliding");
                moving = false;
                break;
            }
        }
        if (!moving){ return; }
        _movables.forEach(movable => {
            movable.position.y += _movementSpeed;
        })

    }
    else if (_keys.a.pressed) {
        for (let i = 0; i<_boundaries.length && _lastkey == "a"; i++){
            _player.animate = true;
            _player.image = _player.sprites.left;
            const boundary = _boundaries[i];
            if (RectangularCollision({
                rectangle1: _player, 
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x+ movementSpeed,
                        y: boundary.position.y 
                    }
                }
            })
            ){
                console.log("colliding");
                moving = false;
                break;
            }
        }
        if (!moving){ return; }
        _movables.forEach(movable => {
            movable.position.x += _movementSpeed;
        })
    }

    else if (_keys.s.pressed) {
        for (let i = 0; i<_boundaries.length && _lastkey == "s"; i++){
            _player.animate = true;
            _player.image = _player.sprites.down;
            const boundary = _boundaries[i];
            if (RectangularCollision({
                rectangle1: _player, 
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - movementSpeed
                    }
                }
            })
            ){
                console.log("colliding");
                moving = false;
                break;
            }
        }
        if (!moving){ return; }
        _movables.forEach(movable => {
            movable.position.y -= _movementSpeed;
        })
    }

    else if (_keys.d.pressed) {
        for (let i = 0; i<_boundaries.length && _lastkey == "d"; i++){
            _player.animate = true;
            _player.image = _player.sprites.right;
            const boundary = _boundaries[i];
            if (RectangularCollision({
                rectangle1: _player, 
                rectangle2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x - movementSpeed,
                        y: boundary.position.y 
                    }
                }
            })
            ){
                console.log("colliding");
                moving = false;
                break;
            }
        }
        if (!moving){ return; }
        _movables.forEach(movable => {
            movable.position.x -= _movementSpeed;
        })
    }
}
