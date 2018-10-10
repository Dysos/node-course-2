const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");
/*
Todo.remove({}).then((result) => {
    console.log(result);
});*/

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: "id"}).then((todo) => {});

Todo.findByIdAndRemove("5bbda6135432bb6da456953c").then((todo) => {
    console.log(todo);
});



