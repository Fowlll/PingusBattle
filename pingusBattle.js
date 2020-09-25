let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let server = require("http").Server(app);
let io = require("socket.io")(server);

function gameObject(type, name, x, y, color){
    this.type = type;
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = 0;
}

function setUpWall(){
    for(let x = 0; x < 1000;x += 25){
        allObjects.push(new gameObject("wall", "mur", x, 0));
    }
}

app.use(express.static("public"))

.get("/", (req, res) =>{
    res.render("game.ejs");
});

let id = 0;
let allObjects = [];


io.sockets.on("connection", (socket) =>{

    console.log("Connexion d'un joueur - id: " + id);

    // Création du joueur
    socket.emit("askPseudo");
    console.log("ok");
    let player = new gameObject("pingu", "", 100, 100, "red");
    player.id = id;
    socket.emit("getId", player.id);
    socket.broadcast.emit("PlayerJoin", player);
    id += 1;
    allObjects.push(player);

    // Pseudo
    socket.on("givePseudo", (pseudo) =>{
        allObjects.find(p => p.id == player.id).name = pseudo;
            
        // Announce in tchat
        let joinMessage = "<p><b>" + player.name + "</b> à rejoint la game !";
        socket.broadcast.emit("Announce", joinMessage);
        socket.emit("Announce", joinMessage);
    });

    // Position
    socket.on("position", (pingu) =>{
        if(allObjects.find(p => p.id == pingu.id) != undefined){
            allObjects.find(p => p.id == pingu.id).x = pingu.x;
            allObjects.find(p => p.id == pingu.id).y = pingu.y;
            allObjects.find(p => p.id == pingu.id).color = pingu.color;
            socket.emit("revealPosition", allObjects);
        }
    });

    // Tchat
    socket.on("newMsg", (data) =>{
        socket.broadcast.emit("newMsg", data);
    });

    

    // Disconection
    socket.on("disconnect", () =>{
        console.log("Déconnexion d'un joueur");
        socket.broadcast.emit("PlayerQuit", player.id);
        console.log("id à delete: " + player.id);
        allObjects.splice(allObjects.indexOf(allObjects.find(p => p.id == player.id)), 1);
        socket.close();
    });

});


server.listen(80);