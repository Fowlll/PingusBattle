let express = require("express");
let app = express();

app.use(express.static("public"))

.get("/", (req, res) =>{
    res.render("game.ejs");
})

.listen(8080);