function Pingu(name, x, y, color){
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = 5;
    this.dx = 0;
    this.dy = 0;
    this.size = 25;
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;


    this.move = function move(direction){
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

    this.stop = function(){
        this.right = false;
        this.left = false;
        this.up = false;
        this.down = false;
    }

    this.refresh = function(){
        
        if(this.right){
            this.x += this.speed;
        }else if(this.left){
            this.x -= this.speed;
        }
        if(this.down){
            this.y += this.speed;
        }else if(this.up){
            this.y -= this.speed;
        }

        this.draw();
    }

    this.draw = function draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

}