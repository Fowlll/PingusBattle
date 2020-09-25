function insertInTchat(msg){
    $("#display-tchat").append(msg);
}
function insertMsg(pseudo, msg){
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    insertInTchat("<p><i>[" + hour + ":" + minutes + "]</i> <b>" + pseudo + "</b>: " + msg + "</p>");
}
$("#send-btn").click((e) =>{
    e.preventDefault();
    let msg = $("#msg").val();
    if(msg == ""){
        return;
    }
    insertMsg(player.name, msg);
    $("#msg").val("");
    socket.emit("newMsg", {pseudo: player.name, msg: msg});
});

socket.on("newMsg", (data) =>{
    insertMsg(data.pseudo, data.msg);
});

socket.on("Announce", (msg) =>{
    insertInTchat(msg);
});