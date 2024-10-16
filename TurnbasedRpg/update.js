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
        _timeLastFrame = _timeCurrent;
        return true;
    }
}
