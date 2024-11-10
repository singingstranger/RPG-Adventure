function SetManaDisplay(foo) {}

describe("CalculateDamage should", function() {

    function setup() {
        recipient = {
            physicalDefense: 1,
            magicalDefense: 1,
            health: {
                current: 1,
            }
        };
        attack = {
            type: _types.Normal,
            damage: 1
        };
        attacker = {
            mana: {
                current: 1
            }
        };
    }
    it("Keep mana the same if it's a normal attack", function() {
        setup();
        CalculateDamage(attack, attacker, recipient, 1);
        expect(attacker.mana.current).toBe(1);
    });

    it("Reduce mana by 1 for a Water attack", function() {
        setup();
        attack.type = _types.Water;
        CalculateDamage(attack, attacker, recipient, 1);
        expect(attacker.mana.current).toBe(0);
    });

    it("Not allow mana less than 0", function() {
        setup();
        attacker.mana.current = -100;
        attack.type = _types.Water;
        CalculateDamage(attack, attacker, recipient, 1);
        expect(attacker.mana.current).toBe(0);
    });

    it("reduce recipient HP by damage * effectiveness - defence modifier", function() {
        setup();
        recipient.health.current = 10;
        attack.damage = 2;
        CalculateDamage(attack, attacker, recipient, 3); // (2 * 3 - 1) == 5
        expect(recipient.health.current).toBe(5);
    });

    it("use magical defence for magical attacks", function() {
        setup();
        recipient.health.current = 10;
        recipient.physicalDefense = 2;
        attack.type = _types.Water;
        CalculateDamage(attack, attacker, recipient, 1); 
        expect(recipient.health.current).toBe(10);
    });

    it("use physical defence for physical attacks", function() {
        setup();
        recipient.health.current = 10;
        recipient.physicalDefense = 2;
        CalculateDamage(attack, attacker, recipient, 1); 
        expect(recipient.health.current).toBe(11); //WHAT???
    });
})