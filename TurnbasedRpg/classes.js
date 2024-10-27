class Boundary{
    constructor({position}){
        this.position = position
        this.width = _tileDimensions
        this.height = _tileDimensions/2
    }
    draw(){
        _context.fillStyle = "rgba(255,0, 0, 0)"
        _context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Trigger{
    constructor({position}){
        this.position = position
        this.width = _tileDimensions
        this.height = _tileDimensions
    }
    draw(){
        _context.fillStyle = "rgba(255,0, 0, 0)"
        _context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Type {
    constructor({
        name,
        color,
        attacksBoostedAgainst,
        attacksWeakAgainst,
        defenseStrongAgainst,
        defenseWeakAgainst
    }){
        this.name = name;
        this.color = color;
        this.attacksBoostedAgainst = attacksBoostedAgainst;
        this.attacksWeakAgainst = attacksWeakAgainst;
        this.defenseStrongAgainst = defenseStrongAgainst;
        this.defenseWeakAgainst = defenseWeakAgainst;
    }
}

class Sprite{
    constructor({
        position,
        rotation = 0,
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = false
    }){
        this.position = position;
        this.image = new Image();
        this.frames = {
            ...frames,
            val: 0,
            elapsed: 0
        };
        this.width = 0;
        this.image.onload=()=>{
            this.width = this.image.width/this.frames.max;
            this.height = this.image.height;
        }
        this.image.src = image.src;
        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.rotation = rotation;
    }

    draw(){
        _context.save();
        _context.globalAlpha = this.opacity;
        _context.drawImage(
            this.image, 
            this.frames.val * this.width,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        );
        _context.restore();

        if (!this.animate){return;};
        if (this.frames.max <= 1){return;};

        this.frames.elapsed++;
        if (this.frames.elapsed % this.frames.hold === 0){
            if (this.frames.val < this.frames.max-1) this.frames.val++;
            else this.frames.val = 0;
        };      
    };
}

class Monster extends Sprite{
    constructor({
        position= {
            x: _canvas.width-200,
            y: 200
        },
        rotation = 0,
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = false,

        name = "Someone",
        health = {max: 100, current},
        isEnemy = true,
        type = "",
        stamina = 10,
        mana = 10,
        physicalDefense = 1,
        magicalDefense = 1,
        physicalStrength = 1,
        magicalPower = 1,
        attacks
    }){
        super({
            position,
            rotation,
            image, 
            frames, 
            sprites, 
            animate,
        })
        this.name = name;
        this.health = {max: health.max, current: health.max};
        this.isEnemy = isEnemy;
        this.type = type;
        this.stamina = stamina;
        this.mana = mana;
        this.physicalDefense = physicalDefense;
        this.magicalDefense = magicalDefense;
        this.physicalStrength = physicalStrength;
        this.magicalPower = magicalPower;
        this.attacks = attacks;
    }
}
class Character extends Sprite{
    constructor({
        position,
        rotation = 0,
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = true,

        name = "Someone"
    }){
        super({
            position,
            rotation,
            image, 
            frames, 
            sprites, 
            animate,
        })
        this.name = name;
    }
}

class Item extends Sprite{
    constructor({
        position,
        rotation = 0,
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = false,

        name = "", 
        description = "",
        count = 0
    }){
        super({
            position,
            rotation,
            image, 
            frames, 
            sprites, 
            animate,
        })
        this.name = name;
        this.description = description;
        this.count = count;
    }
}
class Orb extends Item{
    constructor({
        position,
        rotation = 0,
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = false,

        name = "", 
        description = "",
        count = 0,

        type = _types.Normal
    }){
        super({
            position,
            rotation,
            image, 
            frames, 
            sprites, 
            animate,

            name,
            description,
            count
        })
        this.type = type;
    }
}
class HealingItem extends Item{
    constructor({
        position,
        rotation = 0,
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = false,

        name = "", 
        description = "",
        count = 0,

        healingType,
        healingfactor
    }){
        super({
            position,
            rotation,
            image, 
            frames, 
            sprites, 
            animate,
            
            name, 
            description,
            count
        })
        this.healingType = healingType;
        this.healingfactor = healingfactor;
    }
}

