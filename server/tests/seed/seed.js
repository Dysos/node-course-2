const {ObjectID} = require("mongodb");
const {Todo} = require("./../../models/todo");
const {User} = require("./../../models/user");
const jwt = require("jsonwebtoken");

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
    _id: userOneID,
    email: "andrew@example.com",
    password: "userOnePass",
    tokens: [{
        access: "auth",
        token: jwt.sign({_id: userOneID, access: "auth"}, "abc123").toString()
    }]
},
{
    _id: userTwoID,
    email: "yeboi@example.com",
    password: "userTwoPass"
}];



const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
},
{
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
}
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {populateTodos, populateUsers, todos, users};