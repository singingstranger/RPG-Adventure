UI.dialogueBox.addEventListener("click", (e)=>{
    if (_isAnimationPlaying)
        return;
    
    if (!battle.initiated){
        battle.ReturnToOverworld();
        return;
    }
    //TODO: why are we handling this here, and not in the battle logic itself?
    if (!IsAlive(battle.Player)){
        battle.PlayerFaint();
        return;
    }
    if (!IsAlive(battle.Enemy)){
        battle.EnemyFaint();
        return;
    }
    if (_battleQueue.length > 0){
        _battleQueue[0]();
        _battleQueue.shift();
    }
    else{
        e.currentTarget.style.display = "none";
    }
})


let _lastkey = " ";
window.addEventListener("keydown", (e) => {
    switch (e.key){
        case "ArrowUp":
        case "W":
        case "w":
            _keys.w.pressed = true;
            _keys.a.pressed = false;
            _keys.s.pressed = false;
            _keys.d.pressed = false;
            _lastkey = "w";
            break;
        case "ArrowLeft":
        case "A":
        case "a":
            _keys.a.pressed = true;
            _keys.w.pressed = false;
            _keys.s.pressed = false;
            _keys.d.pressed = false;
            _lastkey = "a";
            break;
        case "ArrowDown":
        case "S":
        case "s":           
            _keys.w.pressed = false;
            _keys.a.pressed = false;
            _keys.s.pressed = true;
            _keys.d.pressed = false;
            _lastkey = "s";
            break;
        case "ArrowRight":
        case "D":
        case "d":
            _keys.w.pressed = false;
            _keys.a.pressed = false;
            _keys.s.pressed = false;
            _keys.d.pressed = true;
            _lastkey = "d"; 
            break;
    }
})
window.addEventListener("keyup", (e) => {
    switch (e.key){
        case "ArrowUp":
        case "W":
        case "w":
            _keys.w.pressed = false;
            break;
        case "ArrowLeft":
        case "A":
        case "a":
            _keys.a.pressed = false;
            break;
        case "ArrowDown":
        case "S":
        case "s":  
            _keys.s.pressed = false;
            break;
        case "ArrowRight":
        case "D":
        case "d":
            _keys.d.pressed = false;
            break;
    }
})