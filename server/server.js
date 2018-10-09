const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

const {mongoose} = require("./db/mongoose");
const {User} = require("./models/user");
const {Todo} = require("./models/todo");

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req,res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID");
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send("ID not found");
        } else {    
            res.status(200).send({
                todo
            });
        }
    }).catch(() => {
        res.status(400).send("Invalid req");
    });
});



    //valid id using isvalid
    //404, send back emtpy send

    //find by id
        //succes
            //if todo - send it back
            //else sned back 404 with empty body
        //error
            //400 - invalid req


app.listen(3000, () => {
    console.log("Started on port 3000");
});

module.exports = {app};



/*
let newTodo = new Todo({
    text: "Cook dinner"
});

newTodo.save().then((doc) => {
    console.log("Saved todo", doc)
}, (e) => {
    console.log("Unable to save todo", e);
});*/
/*
let newUser = new User({
    email: "waddup"
});

newUser.save().then((doc) => {
    console.log("Succes");
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log("error");
});*/
/*
newTodo.save().then((doc) => {
    console.log("Succes", doc);
}, (e) => {
    console.log("error");
});*/
//save new something

