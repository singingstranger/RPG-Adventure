document.querySelector("#dialogueBox").addEventListener("click", (e)=>{
    if (!_battle.initiated){
        ReturnToOverworld();
        return;
    }
    if (!CheckHealth(_battlePlayer)){
        PlayerFaint(_battlePlayer);
        return;
    }
    if (!CheckHealth(_enemy)){
        EnemyFaint(_enemy);
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
        case "w":
            _keys.w.pressed = true;
            _keys.a.pressed = false;
            _keys.s.pressed = false;
            _keys.d.pressed = false;
            _lastkey = "w";
            break;
        case "a":
            _keys.a.pressed = true;
            _keys.w.pressed = false;
            _keys.s.pressed = false;
            _keys.d.pressed = false;
            _lastkey = "a";
            break;
        case "s":           
            _keys.w.pressed = false;
            _keys.a.pressed = false;
            _keys.s.pressed = true;
            _keys.d.pressed = false;
            _lastkey = "s";
            break;
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
        case "w":
            _keys.w.pressed = false;
            break;
        case "a":
            _keys.a.pressed = false;
            break;
        case "s":
            _keys.s.pressed = false;
            break;
        case "d":
            _keys.d.pressed = false;
            break;
    }
})