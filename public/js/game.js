let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1280, 720);

let pingus = [];

let player = new Pingu("", 100, 100, "red");

socket.on("getId", (id) =>{
    player.id = id;
    console.log(player);
});

socket.on("askPseudo", () =>{
    let pseudo = prompt("Votre pseudo : ");
    socket.emit("givePseudo", pseudo);
});

socket.on("revealPosition", (allPingus) =>{
    for(let i = 0; i < allPingus.length; i++){
        if(pingus.find(p => p.id == allPingus[i].id) != undefined){
            pingus.find(p => p.id == allPingus[i].id).x = allPingus[i].x;
            pingus.find(p => p.id == allPingus[i].id).y = allPingus[i].y;
            pingus.find(p => p.id == allPingus[i].id).name = allPingus[i].name;
            console.log("Mise à jour des positions des autres");
        }else{
            let newPlayer = new Pingu(allPingus[i].name, allPingus[i].x, allPingus[i].y, allPingus[i].color);
            newPlayer.id = allPingus[i].id;
            pingus.push(newPlayer);
        }
    }
});

socket.on("PlayerJoin", (newPlayer) =>{
    let joinPingu = new Pingu(newPlayer.name, newPlayer.x, newPlayer.y, newPlayer.color);
    joinPingu.id = newPlayer.id;
    pingus.push(joinPingu);
    console.log(joinPingu.name + "à rejoint la game !");
});

socket.on("PlayerQuit", (id) =>{
    pingus.splice(pingus.indexOf(pingus.find(p => p.id == id)), 1);
});

window.setInterval(function(){

    

    // Fond noir
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);

    // Refresh our pingu
    player.refresh();

    
    // Refresh pingus
    for(let i = 0; i < pingus.length; i++){
        pingus[i].refresh();
    }

    // Emit position
    if(player != undefined){
        console.log("Envoie de position au serveur");
        socket.emit("position", player);
    }


}, 1000/60);

window.addEventListener('keydown', (event) =>{
    

    if(event.key == "ArrowRight"){
        player.move("right");
    }else if(event.key == "ArrowLeft"){
        player.move("left");
    }else if(event.key == "ArrowDown"){
        player.move("down");
    }else if(event.key == "ArrowUp"){
        player.move("up");
    }

});
window.addEventListener('keyup', (event) =>{
    
    if(event.key == "ArrowRight"){
        player.right = false;
    }else if(event.key == "ArrowLeft"){
        player.left = false;
    }else if(event.key == "ArrowDown"){
        player.down = false;
    }else if(event.key == "ArrowUp"){
        player.up = false;
    }

});