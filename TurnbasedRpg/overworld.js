function InitNewMap(){
    InitMaps(_startingMapIndex);
    SetTileSize(_zoomLevel);
    InitVisuals();

    document.querySelector("#battleInterface").style.display = "none";
    gsap.to("#overlappingDiv", {
        opacity:0,
        duration: 1
    });
}

_overworldImage.onload = () => {
    AnimateOverworld();
    _movables = [_background, ..._boundaries, ..._battleTiles, ..._listOfNPCs];
}

function AnimateOverworld(){
    const animationID = window.requestAnimationFrame(AnimateOverworld);
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
                ChangeGameState(_gameState.Battle, animationID);
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