function InitGameState(){
    const gameState = {
        StartGame: "StartGame",
        Overworld: "Overworld",
        Battle: "Battle",
        Dialogue: "Dialogue",
        GameOver: "GameOver",
        Menu: "Menu"
    }
    _gameState = gameState;
}

function ChangeGameState(gamestate, animationID = ""){
    switch(gamestate){
        case _gameState.StartGame:
            InitNewMap();
            break;
        case _gameState.Overworld:
            AnimateOverworld();
            break;
        case _gameState.Battle:
            battle.Activatebattle(animationID);
            break;
        case _gameState.Dialogue:
            break;
        case _gameState.GameOver:
            Restart();
            break;
        case _gameState.Menu:
            break;
    }
}