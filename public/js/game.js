let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1280, 720);

let Objects = [];

let player = new Pingu("", 100, 100, "yellow");

socket.on("getId", (id) =>{
    player.id = id;
});

socket.on("askPseudo", () =>{
    let pseudo = prompt("Votre pseudo : ");
    socket.emit("givePseudo", pseudo);
});

socket.on("revealPosition", (allObjects) =>{
    for(let i = 0; i < allObjects.length; i++){
        if(Objects.find(p => p.id == allObjects[i].id) != undefined){
            if(Objects[i].id == player.id){
                player.x = allObjects[i].x;
                player.y = allObjects[i].y;
                player.name = allObjects[i].name;
                player.color = allObjects[i].color;
            }else{
                Objects.find(p => p.id == allObjects[i].id).x = allObjects[i].x;
                Objects.find(p => p.id == allObjects[i].id).y = allObjects[i].y;
                Objects.find(p => p.id == allObjects[i].id).name = allObjects[i].name;
                Objects.find(p => p.id == allObjects[i].id).color = allObjects[i].color;
            }
        }else{
            let newObject;

            if(allObjects[i].type == "pingu"){
                newObject = new Pingu(allObjects[i].name, allObjects[i].x, allObjects[i].y, allObjects[i].color);
            }else if(allObjects[i].type == "wall"){
                newObject = new Wall(allObjects[i].x, allObjects[i].y);
            }

            newObject.id = allObjects[i].id;
            Objects.push(newObject);
        }
    }
});

socket.on("PlayerJoin", (newPlayer) =>{
    let joinPingu = new Pingu(newPlayer.name, newPlayer.x, newPlayer.y, newPlayer.color);
    joinPingu.id = newPlayer.id;
    Objects.push(joinPingu);
    console.log(newPlayer.name + "à rejoint la game !");
});

socket.on("PlayerQuit", (id) =>{
    Objects.splice(Objects.indexOf(Objects.find(p => p.id == id)), 1);
});

window.setInterval(function(){

    

    // Fond noir
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);

    // Refresh our pingu
    player.refresh();

    
    // Refresh Objects
    for(let i = 0; i < Objects.length; i++){
        if(Objects[i].id != player.id){
            Objects[i].refresh();
        }
    }

    // Emit position
    if(player != undefined){
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