describe("TypeMatchupCompare should", function() {
    
    function TestTypeMatchupCompare(attackType, monsterType) {
        let attack = _attacks.Tackle;
        let monster = _monsters.Slime;
        
        attack.type = attackType;
        monster.type = monsterType;
        return TypeMatchupCompare(attack, monster);
    }

    it("have Fire attacks boosted against Plant, producing weak defence", function() {
        expect(TestTypeMatchupCompare(_types.Fire, _types.Plant))
            .toBe(_effectiveness.defenseWeakAgainst);
    });
    it("have Fire attacks boosted against Noormal, producing weak defence", function() {
        expect(TestTypeMatchupCompare(_types.Fire, _types.Normal))
            .toBe(_effectiveness.defenseWeakAgainst);
    });
});