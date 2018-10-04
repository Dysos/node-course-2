const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

const id = "5baa1a410ead81fc07992a5f";
/*const id = "5bb49d20087920f0216d775d11";

if(!ObjectID.isValid(id)) {
    console.log("ID not valid");
}*/
/*
Todo.find({
    _id: id
}).then((todos) => {
    console.log("Todos", todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log("Todo", todo);
});
*/
/*
Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log("ID not found");
    }
    console.log("Todo by Id", todo);
}).catch((e) => {
    console.log(e);
});*/

User.findById(id).then((user) => {
    if(!user) {
        return console.log("User not found");
    }
    console.log("User by ID: ", user);
}, (e) => {
    console.log("Invalid id ", e);
});

