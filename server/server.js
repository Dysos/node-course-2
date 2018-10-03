const express = require("express");
const bodyParser = require("body-parser");

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

