const express = require("express");
const bodyParser = require("body-parser")
const path= require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

var rootObj = {root: __dirname + "/public"}

app.use(bodyParser.urlencoded({extended: false }))

app.use(express.static(path.join(__dirname, "/public")))

app.get("/", function(req, res){
    res.sendFile("index.html", rootObj)
})

app.get("/notes", function (req, res){
    res.sendFile("/notes.html", rootObj)
})


app.get("/api/notes", function (req, res) {
    console.log("/api/notesget")
    let json = getJson()
    console.log(json)
    res.json(json)
})
    
app.post("/api/notes/:id", function (req, res) {
    console.log("/api/notes/:iddelete")
    deleteNoteFromJSON(req.params.id)
    res.json(getJson())
})
app.delete("/api/notes/:id", function (req, res) {
    console.log("/api/notes/:iddelete")
    deleteNoteFromJSON(req.params.id)
    res.json(getJson())

})

app.listen(PORT, function(){
    console.log("Server is listening on PORT: 3000")
})

function getJson(){
    let data = fs.readFileSync(__dirname + "/db/db.json")
    let json = JSON.parse(data)
    return json
}

function createNoteObject(data){
    let obj = {
        title: data.title,
        text: data.text,
        complete: false,
        hidden: false}
    return obj
}
function addNoteToJSON(note){
    let json = getJson()
    let newNote = createNoteObject(note)
    json.push(newNote)
    saveJSON(json)
}

function saveJSON(jsonData){
    let data = JSON.stringify(jsonData)
    fs.writeFileSync(__dirname + "/db/db.json", data)
}
function deleteNoteFromJSON(id){
    let json = getJson()
    json[id].hide = true
    saveJSON(json)
}