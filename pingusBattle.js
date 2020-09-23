let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let server = require("http").Server(app);
let io = require("socket.io")(server);

function Pingu(name, x, y, color){
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = 0;
}

app.use(express.static("public"))

.get("/", (req, res) =>{
    res.render("game.ejs");
});

let id = 0;
let allPingus = [];

io.sockets.on("connection", (socket) =>{

    console.log("Connexion d'un joueur - id: " + id);

    // Création du joueur
    socket.emit("askPseudo");
    let player = new Pingu("", 100, 100, "red");
    player.id = id;
    socket.emit("getId", player.id);
    socket.broadcast.emit("PlayerJoin", player);
    id += 1;
    allPingus.push(player);

    // Pseudo
    socket.on("givePseudo", (pseudo) =>{
        allPingus.find(p => p.id == player.id).name = pseudo;
    });

    // Position
    socket.on("position", (pingu) =>{
        if(allPingus.find(p => p.id == pingu.id) != undefined){
            allPingus.find(p => p.id == pingu.id).x = pingu.x;
            allPingus.find(p => p.id == pingu.id).y = pingu.y;
            socket.emit("revealPosition", allPingus);
        }
    });


    // Disconection
    socket.on("disconnect", () =>{
        console.log("Déconnexion d'un joueur");
        socket.broadcast.emit("PlayerQuit", player.id);
        console.log("id à delete: " + player.id);
        allPingus.splice(allPingus.indexOf(allPingus.find(p => p.id == player.id)), 1);
    });

});


server.listen(80);