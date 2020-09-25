function Player(name, x, y){
    LivingEntity.call(x, y, 100);
    
    this.name = name;
    this.color = "purple";



    this.prototype.draw = function draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.font = "20px Arial";
        ctx.fillText(this.name, this.x - 25, this.y - 10);
    }

    this.prototype.move = function move(direction){
        switch(direction){
            case "right":
                this.left = false;
                this.right = true;
                break;
            case "left":
                this.right = false;
                this.left = true;
                break;
            case "down":
                this.up = false;
                this.down = true;
                break;
            case "up":
                this.down = false;
                this.up = true;
                break;
            default:
                console.log("C'est pas une direction ça mamen");
                break;
        }
    }

}
Player.prototype = Object.create(LivingEntity.prototype);