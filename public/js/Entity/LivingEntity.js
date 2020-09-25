function LivingEntity(x, y, health){
    gameObject.call(x, y, 25);

    this.health = health;
    this.damage = 2;
    this.isDead = false;

    this.prototype.damage = function(amount){
        this.health -= amount;
    }

    





}
LivingEntity.prototype = Object.create(gameObject.prototype);