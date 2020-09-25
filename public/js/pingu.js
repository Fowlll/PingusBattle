function Pingu(name, x, y, color){
    gameObject.call(this, x, y, 25);
    this.name = name;
    let r = Math.floor(Math.random() * Math.floor(5));
    switch(r){
        case 0:
            this.color = "red";
            break;
        case 1:
            this.color = "purple";
            break;
        case 2:
            this.color = "green";
            break;
        case 3:
            this.color = "brown";
            break;
        case 4:
            this.color = "blue";
            break;
        case 5:
            this.color = "orange";
            break;
        default:
            this.color = "white";
            break;
    }
    
    this.health = 100;


    this.id = 0;


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

    // this.stop = function(){
    //     this.right = false;
    //     this.left = false;
    //     this.up = false;
    //     this.down = false;
    // }

    // this.refresh = function(){
        
    //     if(this.right){
    //         this.x += this.speed;
    //     }else if(this.left){
    //         this.x -= this.speed;
    //     }
    //     if(this.down){
    //         this.y += this.speed;
    //     }else if(this.up){
    //         this.y -= this.speed;
    //     }

    //     this.draw();
    // }

    this.draw = function draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.font = "20px Arial";
        ctx.fillText(this.name, this.x - 25, this.y - 10);
    }

}
Pingu.prototype = Object.create(gameObject.prototype);