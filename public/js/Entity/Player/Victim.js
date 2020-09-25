function Victim(name, x, y){
    Player.call(name, x, y);

    // Peut rien faire

}
Victim.prototype = Object.create(Player.prototype);