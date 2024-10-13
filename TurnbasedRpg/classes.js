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
        _context.fillStyle = "rgba(255,0, 0, 0.2)"
        _context.fillRect(this.position.x, this.position.y, this.width, this.height)
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
        /*_context.translate(this.position.x+ this.width/2, this.position.y + this.height/2);
        _context.rotate(this.rotation);
        _context.translate(this.position.x- this.width/2, this.position.y - this.height/2);*/
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
        position,
        rotation = 0,
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = false,

        name = "Someone",
        health = {max: 100, current},
        isEnemy = true,
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