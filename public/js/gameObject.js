id = 0;
function gameObject(x, y, size){
    this.id = id;
    id += 1;
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 5;
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.color = "pink";
    this.solid = true;
}

gameObject.prototype.refresh = function(){

    if(this.right){
        this.x += this.speed;
        if(this.collide() != null){
            this.x -= this.speed;
        }
    }else if(this.left){
        this.x -= this.speed;
        if(this.collide() != null){
            this.x += this.speed;
        }
    }
    if(this.down){
        this.y += this.speed;
        if(this.collide() != null){
            this.y -= this.speed;
        }
    }else if(this.up){
        this.y -= this.speed;
        if(this.collide() != null){
            this.y += this.speed;
        }
    }


    

    this.draw();
}

gameObject.prototype.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
}

gameObject.prototype.collide = function(){
    for(let i = 0; i < Objects.length; i++){
        if(Objects[i].id != undefined && Objects[i].id == this.id){
            continue;
        }
        if(this.x + this.size >= Objects[i].x && this.x <= Objects[i].x + this.size){
            if(this.y + this.size >= Objects[i].y && this.y <= Objects[i].y + this.size){
                
                if(this.solid){
                    return Objects[i];
                }else{
                    return null;
                }

            }
        }
    }
    return null;
}
