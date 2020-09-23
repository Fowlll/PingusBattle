

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1280, 720);

let pingus = [];

let player = new Pingu("Bloupi", 100, 100, "red");

window.setInterval(function(){

    // Fond noir
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);

    // Refresh our pingu
    player.refresh();

    // Refresh pingus
    for(let i = 0; i < pingus.length; i++){
        player.refresh();
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