let _battlePlayer = new Monster(monsters.Player);
let _enemy = new Monster(monsters.Slime);

function InitBattle(){
    
    _renderedSprites = [];
    document.querySelector("#dialogueBox").style.display = "none";
    document.querySelector("#enemyCurrentHealthbar").style.width = "100%";
    document.querySelector("#playerCurrenthealthbar").style.width = "100%";
    document.querySelector("#attacksBox").replaceChildren();
    _battleQueue = [];
    _battlePlayer = new Monster(monsters.Player);
    _enemy = new Monster(monsters.Slime);

    _battlePlayer.attacks.forEach(attack=>{
        const attackButton = document.createElement("button");
        attackButton.innerHTML = attack.name;
        document.querySelector("#attacksBox").append(attackButton);
    })


    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            Attack({
                attack: selectedAttack,
                attacker: _battlePlayer,
                recipient: _enemy,
                remainingHealthPercent: CalculateDamage(selectedAttack.damage, _enemy),
                renderedSprites: _renderedSprites
            });

    //enemy attacks queued
            QueueActions(selectedAttack);
        })
        button.addEventListener("mouseenter",(e)=>{
            const attackType = document.querySelector("#attackType");
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            const attackTypeInfo = selectedAttack.type + "</br> Damage: "+ selectedAttack.damage
            attackType.innerHTML = attackTypeInfo;
            attackType.style.color = selectedAttack.color;
        })
    });
    console.log("finished init");

}


function QueueActions(selectedAttack){
    if (!_battle.initiated){
        _battleQueue.push(()=>{
            ReturnToOverworld();
        });
        return;
    }
    if (!CheckHealth(_battlePlayer)){
        _battleQueue.push(()=>{
            PlayerFaint(_battlePlayer); 
        });
        return;
    }
    if (!CheckHealth(_enemy)){
        _battleQueue.push(()=>{
            EnemyFaint(_battlePlayer); 
        });
        return;
    }
    const randomAttack = GetRandomAttack(_enemy)
        _battleQueue.push(()=>{
            Attack({
                attack: randomAttack,
                attacker: _enemy,
                recipient: _battlePlayer,
                remainingHealthPercent: CalculateDamage(selectedAttack.damage, _battlePlayer),
                renderedSprites: _renderedSprites
            })
        });
}

function GetRandomAttack(enemy){
    return enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
}

function Activatebattle(animID){
    InitBattle();
    _renderedSprites.push(_enemy);
    _renderedSprites.push(_battlePlayer);
    gsap.to("#overlappingDiv", {
        opacity:1,
        repeat: 3,
        yoyo: true,
        duration: 0.3,
        onComplete(){
            gsap.to("#overlappingDiv", {
                opacity:1,
                duration: 0.3,
                onComplete(){
                    AnimateBattle(),
                    document.querySelector("#userInterface").style.display = "block";
                    gsap.to("#overlappingDiv",{
                        opacity:0,
                        duration:1
                    })
                }
            })
        }
    });
    window.cancelAnimationFrame(animID);
}

function AnimateBattle(){
    let lastTime = 0;
    let updated = false;
    while(!updated){
        if (TrackFrameUpdateTime()){
            updated = true;
            _battleAnimationID = window.requestAnimationFrame(AnimateBattle); 
        }
    }
    _battleBG.draw();
    _renderedSprites.forEach((sprite) => {
        sprite.draw();
    })
}

function CalculateDamage(attack, recipient){
    console.log(attack);
    let remainingHealth;
    recipient.health.current -= attack;
    if (recipient.health.current<0){
        recipient.health.current = 0;
    }
    remainingHealth = recipient.health.current/recipient.health.max * 100;
    console.log(remainingHealth);
    console.log(recipient.health.current)
    return remainingHealth;
}

function Attack({attack, attacker, recipient, remainingHealthPercent, renderedSprites}){
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").innerHTML = attacker.name + " used " + attack.name;

    switch(attack.animation){
        case 0:
            TackleAttack({attacker, recipient});
            break;
        case 1:
            DistanceAttack({recipient});
            SpawnAttackSprite({attack, attacker, recipient, renderedSprites});
            break;
        default:
            TackleAttack({attack, attacker, recipient});
            break;
    }
    ReduceHealthBar({recipient, remainingHealthPercent});
}

function ReduceHealthBar({recipient, remainingHealthPercent}){
    let healthBar = "#playerCurrentHealthbar";
    if (recipient.isEnemy === true){
        healthBar = "#enemyCurrentHealthbar";
    } 
    gsap.to(healthBar,{
        width: remainingHealthPercent+"%",
        duration: 1,
        onComplete(){
            recipient.image = recipient.sprites.idle;
        }
    })
    healthBar.width;
}

function TackleAttack({attacker, recipient}){
    const timeline = gsap.timeline(); 
    let movementDistance = 20;
    if (recipient.isEnemy === true){
        movementDistance *= -1; 
    } 
    attacker.image = attacker.sprites.attack;
    timeline.to(attacker.position, {
        x: attacker.position.x - movementDistance,
        duration: 0.2
    }).to(attacker.position, {
        x: attacker.position.x + movementDistance*2,
        duration: 0.1,
        onComplete(){
            recipient.image = recipient.sprites.hurt;
            const timelineEnemy = gsap.timeline();
            timelineEnemy.to(recipient.position,{
                x: recipient.position.x +movementDistance,
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
                onComplete(){
                    attacker.image = attacker.sprites.idle;
                }
            })    
        }
    }).to(attacker.position, {
        x: attacker.position.x 
    })
}

function DistanceAttack({recipient}){
    let movementDistance = 20;
    if (recipient.isEnemy === true){
        movementDistance *= -1; 
    } 
    recipient.image = recipient.sprites.hurt;
    const timelineEnemy = gsap.timeline();
    timelineEnemy.to(recipient.position,{
        x: recipient.position.x +movementDistance,
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

function SpawnAttackSprite({attack, attacker, recipient, renderedSprites}){
    const attackImage = new Image();
    attackImage.src = attack.src;
    const attacksprite = new Sprite({
        position: { 
            x:attacker.position.x, 
            y: attacker.position.y - 30
        },
        image: attackImage
    })
    renderedSprites.push(attacksprite);
    const timeline = gsap.timeline();
    timeline.to(attacksprite.position, {
        x: attacksprite.position.x - 15,
        duration: 0.1,
        onComplete(){
            timeline.to(attacksprite.position, {
                x: recipient.position.x,
                y: recipient.position.y + 20,
                duration: 0.3,
                onComplete(){
                    renderedSprites.pop();
                }
            })
            
        } 
    })
}

function CheckHealth(monster){
    return monster.health.current > 0;
}

function EnemyFaint(enemy){
    console.log("enemy fainted");
    gsap.to(
        enemy.position, {
            y: enemy.position.y + 20,
        })
        gsap.to(enemy,{
            opacity:0
        })
    document.querySelector("#dialogueBox").innerHTML = enemy.name + " fell.";
    _battle.initiated = false;
}
function PlayerFaint(player){
    console.log("player fainted");
    gsap.to(player.position, {
        y: player.position.y + 20,
    })
    gsap.to(player,{
        opacity:0
    })
    document.querySelector("#dialogueBox").innerHTML = player.name + " fell.";
    _battle.initiated = false;
}

function ReturnToOverworld(){
    if (_battlePlayer.health.current <= 0){
        Restart();
    }
    gsap.to("#overlappingDiv", {
        opacity:1,
        onComplete(){
            document.querySelector("#userInterface").style.display = "none";
            gsap.to("#overlappingDiv", {
                opacity:0,
            })
            window.cancelAnimationFrame(_battleAnimationID);
            Animate();
        }
    });
}