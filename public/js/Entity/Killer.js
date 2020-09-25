function Killer(name, x, y){
    Player.call(name, x, y);



    this.prototype.kill = function(other){

        if(other instanceof Victim){
            other.isDead = true;
        }

    }

}
Killer.prototype = Object.create(LivingEntity.prototype);