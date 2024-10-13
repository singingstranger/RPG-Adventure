function InitMaps(index){
    _collision = _collision_island1;
    _battleTilesData = _battleTiles_island1;

    for (let i = 0; i<_collision.tiles.length; i+=_startingPosTileCount){
        _collisionMaps.push(_collision.tiles.slice(i,i+_startingPosTileCount));
    }

    for (let i = 0; i < _battleTilesData.tiles.length; i+=_startingPosTileCount){
        _battleMaps.push(_battleTilesData.tiles.slice(i, i+_startingPosTileCount));
    }

    _startScreen.src = _dirOverworld+index+".png";
    _currentBackground = _startScreen;

    _battleScreen.src = _dirBattle+index+".png";
}

