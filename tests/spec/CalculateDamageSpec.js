function SetManaDisplay(foo) {}

describe("CalculateDamage should", function() {

    const recipient = {
        physicalDefense: 1,
        health: {
            current: 1,
        }
    };
    const attack = {
        type: _types.Water,
        damage: 1
    };
    const attacker = {
        mana: {
            current: 1
        }
    };

    it("Keep mana the same if it's a normal attack", function() {
        attacker.mana.current = 1;
        attack.type = _types.Normal;
        CalculateDamage(attack, attacker, recipient, 1);
        expect(attacker.mana.current).toBe(1);
    });

    it("Reduce mana by 1 for a Water attack", function() {
        attacker.mana.current = 1;
        attack.type = _types.Water;
        CalculateDamage(attack, attacker, recipient, 1);
        expect(attacker.mana.current).toBe(0);
    });

    it("Not allow mana less than 0", function() {
        attacker.mana.current = -100;
        attack.type = _types.Water;
        CalculateDamage(attack, attacker, recipient, 1);
        expect(attacker.mana.current).toBe(0);
    });

    it("reduce recipient HP by damage * effectiveness - defence modifier", function() {
        recipient.health.current = 10;
        recipient.physicalDefense = 1;
        attack.damage = 2;
        CalculateDamage(attack, attacker, recipient, 3); // (2 * 3 - 1) == 5
        expect(recipient.health.current).toBe(5);
    });
})