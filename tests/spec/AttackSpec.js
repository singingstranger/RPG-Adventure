let _dialogueString = "";
function ShowDialogueMessage(message) {
    _dialogueString = message;
}  

function setup() {
    attack = _attacks.Tackle;
    attacker = _monsters.Slime;
}

describe("Attacks should", function() {  
    function TestAttack() {
        Attack({ attack, attacker, player: _monsters.Player, renderedSprites: null });
    }

    it("not allow water attacks when mana is 0", function() {
        setup();
        attacker.mana.current = 0;    
        attack.type = _types.Water;
        
        TestAttack();

        expect(_dialogueString).toBe(attacker.name + " is out of mana and can only make Normal attacks")
  });
});