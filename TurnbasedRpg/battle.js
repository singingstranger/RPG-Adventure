const battle = 
{
    Player: null,
    Enemy: null,
    initiated: false,
    _initBattle: function() {
        battle.initiated = true;
        //shut down outside UI
        CloseInventory();
        UI.inventoryButton.disabled = true;
    
        _battleSprites = [];
        UI.dialogueBox.style.display = "none";
        UI.attacksBox.replaceChildren();
        _battleQueue = [];
        battle.Player = new Monster(_monsters.Player);
    
        battle.Enemy = new Monster(_currentEncounterables[battle.SelectEnemy()]);
        battle.InitEnemyHealth();
        battle.InitPlayerHealth();
    
        battle.Player.attacks.forEach(attack => {
            console.log(attack.type);
            
            const attackButton = UI.CreateAttackButton(attack);
    
            attackButton.addEventListener("click", (e) => {
                if (_isAnimationPlaying)
                    return;
    
                battle.Attack({
                    attack: attack,
                    attacker: battle.Player,
                    recipient: battle.Enemy,
                    renderedSprites: _battleSprites
                });
    
                //enemy _attacks queued
                battle.QueueActions(attack);
            });
            
            attackButton.addEventListener("mouseenter", (e) => {
                console.log("selected attack:", attack, " via ", e.currentTarget.innerHTML);
                console.log("selected:", attack.name, " of type: ", attack.type);
                
                if (!battle.HasMana(battle.Player)) {
                    if (attack.type != _types.Normal) {
                        console.log("no more mana");
                        battle.SetAttackType(" Cannot cast this spell. </br> No more mana", "grey");
                        return;
                    }
                }
                let color = battle.GetTypeColor(attack.type);
                SetAttackType(attack.type + "</br> Damage: " + attack.damage, color);
            });
    
            function SetAttackType(attackTypeInfo, color) {
                UI.attackType.innerHTML = attackTypeInfo;
                UI.attackType.style.color = color;
            }
        });
    },
    InitEnemyHealth: function() {
        UI.enemyCurrentHealthbar.style.width = "100%";
        UI.enemyCurrentHealthbar.style.backgroundColor = "green";
        UI.enemyName.innerHTML = battle.Enemy.name;
    },
    InitPlayerHealth: function() {
        UI.playerCurrentHealthbar.style.width = "100%";
        UI.playerCurrentHealthbar.style.backgroundColor = "green";
        battle.UpdatePlayerMana();
    },
    UpdatePlayerMana: function() {
        SetManaDisplay(battle.Player.mana.current + "/" + battle.Player.mana.max);
    },
    SelectEnemy: function() {
        let randInt = GetRandomInt(0, _currentEncounterables.length);
        return (randInt);
    },
    IsAlive: function (monster) {
        return monster.health.current > 0;
    },
    QueueActions: function() {
        if (!battle.initiated) {
            _battleQueue.push(() => {
                battle.ReturnToOverworld();
            });
            return;
        }
        if (!battle.IsAlive(battle.Player)) {
            _battleQueue.push(() => {
                battle.PlayerFaint();
            });
            return;
        }
        if (!battle.IsAlive(battle.Enemy)) {
            _battleQueue.push(() => {
                battle.EnemyFaint();
            });
            return;
        }
        const randomAttack = battle.GetRandomAttack(battle.Enemy)
        _battleQueue.push(() => {
            battle.Attack({
                attack: randomAttack,
                attacker: battle.Enemy,
                recipient: battle.Player,
                renderedSprites: _battleSprites
            });
        });
    },

    GetRandomAttack: function (enemy) {
        if (!battle.HasMana(enemy)) {
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
    },
    
    Activatebattle: function (animID) {
        battle._initBattle();
        _battleSprites.push(battle.Enemy);
        _battleSprites.push(battle.Player);
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
                        battle.AnimateBattle(),
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
    },
    
    AnimateBattle: function () {
        let lastTime = 0;
        let updated = false;
        while (!updated) {
            if (TrackFrameUpdateTime()) {
                updated = true;
                _battleAnimationID = window.requestAnimationFrame(battle.AnimateBattle);
            }
        }
        _battleBG.draw();
        _battleSprites.forEach((sprite) => {
            sprite.draw();
        })
    },
    
    CalculateDamage: function (attack, attacker, recipient, effectiveness) {
        let remainingHealth;
        let defenseModifier = recipient.physicalDefense;
        if (attack.type != _types.Normal) {
            battle.AdjustMana(attacker);
            defenseModifier = recipient.magicalDefense;
        }
        console.log("calculating damage for attack:", attack.type, "with damage ", attack.damage, " with modifier", effectiveness, "against defense", defenseModifier);
        recipient.health.current -= attack.damage * effectiveness - defenseModifier;
        if (recipient.health.current < 0) {
            recipient.health.current = 0;
        }
        remainingHealth = recipient.health.current / recipient.health.max * 100;
        return remainingHealth;
    },
    
    AdjustMana: function (attacker) {
        attacker.mana.current -= 1;
        if (attacker.mana.current < 1) {
            attacker.mana.current = 0;
        }
        battle.UpdatePlayerMana();
    },

    Attack: function ({ attack, attacker, recipient, renderedSprites }) {
        if (attacker.mana.current < 1) {
            if (attack.type != _types.Normal) {
                ShowDialogueMessage(attacker.name + " is out of mana and can only make Normal attacks");
                return;
            }
        }
        const effectiveness = battle.TypeMatchupCompare(attack, recipient);
        const remainingHealthPercent = battle.CalculateDamage(attack, attacker, recipient, effectiveness);
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
        ShowDialogueMessage(attacker.name + " used " + "<span style = 'color: " + battle.GetTypeColor(attack.type) + ";'>" + attack.name + "</span>" + ". " + _effectivenessDialogue);
        _isAnimationPlaying = true;
        switch (attack.animation) {
            case 0:
                battle.TackleAttack({ attacker, recipient });
                break;
            case 1:
                battle.DistanceAttack({ recipient });
                battle.SpawnAttackSprite({ attack, attacker, recipient, renderedSprites });
                break;
            default:
                battle.TackleAttack({ attack, attacker, recipient });
                break;
        }
        battle.UpdateHealthbar({ recipient, remainingHealthPercent });
    },
    
    UpdateHealthbar: function ({ recipient, remainingHealthPercent }) {
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
    },
    
    TackleAttack: function ({ attacker, recipient }) {
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
    },
    
    DistanceAttack: function ({ recipient }) {
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
    },
    
    SpawnAttackSprite: function ({ attack, attacker, recipient, renderedSprites }) {
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
    },
    
    HasMana: function (monster) {
        return monster.mana.current > 0;
    },

    EnemyFaint: function() {
        console.log("enemy fainted");
        gsap.to(
            battle.Enemy.position, {
            y: battle.Enemy.position.y + 20,
        })
        gsap.to(battle.Enemy, {
            opacity: 0
        })
        ShowDialogueMessage(battle.Enemy.name + " fell.");
        battle.initiated = false;
    },
    
    PlayerFaint: function() {
        console.log("player fainted");
        gsap.to(battle.Player.position, {
            y: battle.Player.position.y + 20,
        })
        gsap.to(battle.Player, {
            opacity: 0
        })
        ShowDialogueMessage(battle.Player.name + " fell.");
        battle.initiated = false;
    },
    
    ReturnToOverworld: function() {
        UI.inventoryButton.disabled = false;
        if (!battle.IsAlive(battle.Player)) {
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
    },
    
    TypeMatchupCompare: function(attack, targetMonster) {
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
    },

    GetTypeColor: function(type) {
        let color = "white";
        _typeMatchups.forEach((attack) => {
            if (attack.name == type) {
                color = attack.color;
                return color;
            }
        })
        return color;
    }
}





