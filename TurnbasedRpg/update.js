function TrackFrameUpdateTime(){
    let deltaTime = 0;
    _timeCurrent = new Date();
    if (_timeLastFrame){
        deltaTime = _timeCurrent - _timeLastFrame;
    }
    else{
        _timeLastFrame = _timeCurrent;
    }
    if(deltaTime>_frameTime){
        console.log("render a frame");
        _timeLastFrame = _timeCurrent;
        return true;
    }
}

function Restart(){
    location.reload();
}

function GetRandomInt(min, max){
    let minCeiling = Math.ceil(min);
    let maxFloor = Math.floor(max);
    let rounded = Math.floor(Math.random()*(maxFloor-minCeiling)+minCeiling);
    console.log(rounded);
    return rounded;
}
