let _battlePlayer = new Monster(_monsters.Player);
let _enemy;

function InitBattle() {

    //shut down outside UI
    CloseInventory();
    UI.inventoryButton.disabled = true;

    _battleSprites = [];
    UI.dialogueBox.style.display = "none";
    UI.attacksBox.replaceChildren();
    _battleQueue = [];
    _battlePlayer = new Monster(_monsters.Player);

    _enemy = new Monster(_currentEncounterables[SelectEnemy()]);
    InitEnemyHealth();
    InitPlayerHealth();

    _battlePlayer.attacks.forEach(attack => {
        console.log(attack.type);
        
        const attackButton = UI.CreateAttackButton(attack);

        attackButton.addEventListener("click", (e) => {
            if (_isAnimationPlaying)
                return;

            Attack({
                attack: attack,
                attacker: _battlePlayer,
                recipient: _enemy,
                renderedSprites: _battleSprites
            });

            //enemy _attacks queued
            QueueActions(attack);
        });
        
        attackButton.addEventListener("mouseenter", (e) => {
            console.log("selected attack:", attack, " via ", e.currentTarget.innerHTML);
            console.log("selected:", attack.name, " of type: ", attack.type);
            
            if (!HasMana(_battlePlayer)) {
                if (attack.type != _types.Normal) {
                    console.log("no more mana");
                    SetAttackType(" Cannot cast this spell. </br> No more mana", "grey");
                    return;
                }
            }
            let color = GetTypeColor(attack.type);
            SetAttackType(attack.type + "</br> Damage: " + attack.damage, color);
        });

        function SetAttackType(attackTypeInfo, color) {
            UI.attackType.innerHTML = attackTypeInfo;
            UI.attackType.style.color = color;
        }
    });
}

function InitEnemyHealth() {
    UI.enemyCurrentHealthbar.style.width = "100%";
    UI.enemyCurrentHealthbar.style.backgroundColor = "green";
    UI.enemyName.innerHTML = _enemy.name;
}

function InitPlayerHealth() {
    UI.playerCurrentHealthbar.style.width = "100%";
    UI.playerCurrentHealthbar.style.backgroundColor = "green";
    UpdatePlayerMana();
}
function UpdatePlayerMana() {
    SetManaDisplay(_battlePlayer.mana.current + "/" + _battlePlayer.mana.max);
}

function SelectEnemy() {
    let randInt = GetRandomInt(0, _currentEncounterables.length);
    return (randInt);
}

function QueueActions() {
    if (!_battle.initiated) {
        _battleQueue.push(() => {
            ReturnToOverworld();
        });
        return;
    }
    if (!IsAlive(_battlePlayer)) {
        _battleQueue.push(() => {
            PlayerFaint(_battlePlayer);
        });
        return;
    }
    if (!IsAlive(_enemy)) {
        _battleQueue.push(() => {
            EnemyFaint(_battlePlayer);
        });
        return;
    }
    const randomAttack = GetRandomAttack(_enemy)
    _battleQueue.push(() => {
        Attack({
            attack: randomAttack,
            attacker: _enemy,
            recipient: _battlePlayer,
            renderedSprites: _battleSprites
        });
    });
}

function GetRandomAttack(enemy) {
    if (!HasMana(enemy)) {
        console.log("enemy is out of mana");
        enemy.attacks.forEach((attack) => {
            if (attack.type != _types.Normal) {
                enemy.attacks.pop();
            }
        })
    }
    if (enemy.attacks.length == 0) {
        enemy.attacks.push(_attacks.Tackle); //Do we want to find a `Normal` type attack for the entity?
    }
    const attack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]
    return attack;
}

function Activatebattle(animID) {
    InitBattle();
    _battleSprites.push(_enemy);
    _battleSprites.push(_battlePlayer);
    gsap.to("#blackFadeOverlappingDiv", {
        opacity: 1,
        repeat: 3,
        yoyo: true,
        duration: 0.3,
        onComplete() {
            gsap.to("#blackFadeOverlappingDiv", {
                opacity: 1,
                duration: 0.3,
                onComplete() {
                    AnimateBattle(),
                        UI.battleInterface.style.display = "block";
                    gsap.to("#blackFadeOverlappingDiv", {
                        opacity: 0,
                        duration: 1
                    })
                }
            })
        }
    });
    window.cancelAnimationFrame(animID);
}

function AnimateBattle() {
    let lastTime = 0;
    let updated = false;
    while (!updated) {
        if (TrackFrameUpdateTime()) {
            updated = true;
            _battleAnimationID = window.requestAnimationFrame(AnimateBattle);
        }
    }
    _battleBG.draw();
    _battleSprites.forEach((sprite) => {
        sprite.draw();
    })
}

function CalculateDamage(attack, attacker, recipient, effectiveness) {
    let remainingHealth;
    let defenseModifier = recipient.physicalDefense;
    if (attack.type != _types.Normal) {
        AdjustMana(attacker);
        defenseModifier = recipient.magicalDefense;
    }
    console.log("calculating damage for attack:", attack.type, "with damage ", attack.damage, " with modifier", effectiveness, "against defense", defenseModifier);
    recipient.health.current -= attack.damage * effectiveness - defenseModifier;
    if (recipient.health.current < 0) {
        recipient.health.current = 0;
    }
    remainingHealth = recipient.health.current / recipient.health.max * 100;
    return remainingHealth;
}

function AdjustMana(attacker) {
    attacker.mana.current -= 1;
    if (attacker.mana.current < 1) {
        attacker.mana.current = 0;
    }
    UpdatePlayerMana();
}
function Attack({ attack, attacker, recipient, renderedSprites }) {
    if (attacker.mana.current < 1) {
        if (attack.type != _types.Normal) {
            ShowDialogueMessage(attacker.name + " is out of mana and can only make Normal attacks");
            return;
        }
    }
    const effectiveness = TypeMatchupCompare(attack, recipient);
    const remainingHealthPercent = CalculateDamage(attack, attacker, recipient, effectiveness);
    if (effectiveness == 1) {
        _effectivenessDialogue = "";
    }
    else if (effectiveness < 1) {
        _effectivenessDialogue = "The attack was weak.";
    }
    else if (effectiveness > 1) {
        _effectivenessDialogue = "The attack was strong.";
    }

    UI.dialogueBox.style.display = "block";
    ShowDialogueMessage(attacker.name + " used " + "<span style = 'color: " + GetTypeColor(attack.type) + ";'>" + attack.name + "</span>" + ". " + _effectivenessDialogue);
    _isAnimationPlaying = true;
    switch (attack.animation) {
        case 0:
            TackleAttack({ attacker, recipient });
            break;
        case 1:
            DistanceAttack({ recipient });
            SpawnAttackSprite({ attack, attacker, recipient, renderedSprites });
            break;
        default:
            TackleAttack({ attack, attacker, recipient });
            break;
    }
    UpdateHealthbar({ recipient, remainingHealthPercent });
}

function UpdateHealthbar({ recipient, remainingHealthPercent }) {
    let healthBar = "#playerCurrentHealthbar";

    if (recipient.isEnemy === true) {
        healthBar = "#enemyCurrentHealthbar";
    }
    if (remainingHealthPercent < _thresholdForHealthbarColorChangeLow) {
        gsap.to(healthBar, {
            backgroundColor: "#f00",
            duration: 1
        });
    }
    else if (remainingHealthPercent < _thresholdForHealthbarColorChangeMid) {
        gsap.to(healthBar, {
            backgroundColor: "orange",
            duration: 1
        });
    }
    gsap.to(healthBar, {
        width: remainingHealthPercent + "%",
        duration: 1,
        onComplete() {
            recipient.image = recipient.sprites.idle;
            _isAnimationPlaying = false;
        }
    })
    healthBar.width;
}

function TackleAttack({ attacker, recipient }) {
    const timeline = gsap.timeline();
    let movementDistance = 20;
    if (recipient.isEnemy === true) {
        movementDistance *= -1;
    }
    attacker.image = attacker.sprites.attack;
    timeline.to(attacker.position, {
        x: attacker.position.x - movementDistance,
        duration: 0.2
    }).to(attacker.position, {
        x: attacker.position.x + movementDistance * 2,
        duration: 0.1,
        onComplete() {
            recipient.image = recipient.sprites.hurt;
            const timelineEnemy = gsap.timeline();
            timelineEnemy.to(recipient.position, {
                x: recipient.position.x + movementDistance,
                duration: 0.1
            }).to(recipient.position, {
                x: recipient.position.x,
                duration: 0.4
            })
            timelineEnemy.to(recipient, {
                opacity: 0,
                repeat: 3,
                yoyo: true,
                duration: 0.1,
                onComplete() {
                    attacker.image = attacker.sprites.idle;
                }
            })
        }
    }).to(attacker.position, {
        x: attacker.position.x
    })
}

function DistanceAttack({ recipient }) {
    let movementDistance = 20;
    if (recipient.isEnemy === true) {
        movementDistance *= -1;
    }
    recipient.image = recipient.sprites.hurt;
    const timelineEnemy = gsap.timeline();
    timelineEnemy.to(recipient.position, {
        x: recipient.position.x + movementDistance,
        duration: 0.1
    }).to(recipient.position, {
        x: recipient.position.x,
        duration: 0.4
    })
    timelineEnemy.to(recipient, {
        opacity: 0,
        repeat: 3,
        yoyo: true,
        duration: 0.1
    })
}

function SpawnAttackSprite({ attack, attacker, recipient, renderedSprites }) {
    const attackImage = new Image();
    attackImage.src = attack.src;
    const attacksprite = new Sprite({
        position: {
            x: attacker.position.x,
            y: attacker.position.y - 30
        },
        image: attackImage
    })
    renderedSprites.push(attacksprite);
    const timeline = gsap.timeline();
    timeline.to(attacksprite.position, {
        x: attacksprite.position.x - 15,
        duration: 0.1,
        onComplete() {
            timeline.to(attacksprite.position, {
                x: recipient.position.x,
                y: recipient.position.y + 20,
                duration: 0.3,
                onComplete() {
                    renderedSprites.pop();
                }
            })

        }
    })
}

function IsAlive(monster) {
    return monster.health.current > 0;
}
function HasMana(monster) {
    return monster.mana.current > 0;
}

function EnemyFaint(enemy) {
    console.log("enemy fainted");
    gsap.to(
        enemy.position, {
        y: enemy.position.y + 20,
    })
    gsap.to(enemy, {
        opacity: 0
    })
    ShowDialogueMessage(enemy.name + " fell.");
    _battle.initiated = false;
}
function PlayerFaint(player) {
    console.log("player fainted");
    gsap.to(player.position, {
        y: player.position.y + 20,
    })
    gsap.to(player, {
        opacity: 0
    })
    ShowDialogueMessage(player.name + " fell.");
    _battle.initiated = false;
}

function ReturnToOverworld() {
    UI.inventoryButton.disabled = false;
    if (!IsAlive(_battlePlayer)) {
        ChangeGameState(_gameState.GameOver);
    }
    gsap.to("#blackFadeOverlappingDiv", {
        opacity: 1,
        onComplete() {
            UI.battleInterface.style.display = "none";
            gsap.to("#blackFadeOverlappingDiv", {
                opacity: 0,
            })
            window.cancelAnimationFrame(_battleAnimationID);
            ChangeGameState(_gameState.Overworld);
        }
    });
}

function TypeMatchupCompare(attack, targetMonster) {
    let effectivenessModifier = 1;
    const targetType = targetMonster.type;
    const attackType = attack.type;
    let weaknessesList = [];
    let strengthsList = [];

    _typeMatchups.forEach((typematchup_type) => {
        if (targetType == typematchup_type.name) {
            weaknessesList = typematchup_type.defenseWeakAgainst;
            strengthsList = typematchup_type.defenseStrongAgainst;
        }
    })
    strengthsList.forEach((strengths_type) => {
        if (attackType == strengths_type) {
            console.log("defense strong");
            effectivenessModifier = _effectiveness.defenseStrongAgainst;
        }
    })
    weaknessesList.forEach((weaknesses_type) => {
        if (weaknesses_type == attackType) {
            console.log("defense weak");
            effectivenessModifier = _effectiveness.defenseWeakAgainst;
        }
    })
    return effectivenessModifier;
}

function GetTypeColor(type) {
    let color = "white";
    _typeMatchups.forEach((attack) => {
        if (attack.name == type) {
            color = attack.color;
            return color;
        }
    })
    return color;
}