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
        token: jwt.sign({_id: userOneID, access: "auth"}, process.env.JWT_SECRET).toString()
    }]
},
{
    _id: userTwoID,
    email: "yeboi@example.com",
    password: "userTwoPass",
    tokens: [{
        access: "auth",
        token: jwt.sign({_id: userTwoID, access: "auth"}, process.env.JWT_SECRET).toString()
    }]
}];



const todos = [{
    _id: new ObjectID(),
    text: "First test todo",
    _creator: userOneID
},
{
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333,
    _creator: userTwoID
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