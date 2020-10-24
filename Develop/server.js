const express = require("express");
const path= require("path");
const; 
const { fstat } = require("fs");


const app = express();
const PORT = 3000;

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data){
        res.json(data)
    })
    
})
app.post("/api/notes/:id", function (req, res) {
    res.json()
})
app.delete("/api/notes", function (req, res) {
    res.json()
})

app.listen(PORT, function(){
    console.log("Server is listening on PORT: 3000")
})