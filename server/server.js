require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const {mongoose} = require("./db/mongoose");
const {User} = require("./models/user");
const {Todo} = require("./models/todo");
const {authenticate} = require("./middleware/authenticate");

const app = express();

const port = process.env.PORT || 3000;

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

app.delete("/todos/:id", (req,res) => {
    const id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID");
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        } else {
            return res.status(200).send({todo});
        }
    }).catch((e) => {
        return res.status(400).send();
    });
    //get the ID
    //validate the ID

    //remove todo by id
        //succes
            //if no doc, 404
            //if doc, send doc with 200
        //error
            //400
});

app.patch("/todos/:id", (req,res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', "completed"]);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID");
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    },
    {
       new:true 
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        } 

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });

});

//post /users
app.post ("/users", (req, res) => {
    const body = _.pick(req.body, ["email", "password"]);
    const user = new User(body);


    user.save().then(() => {
        //res.send(doc);
        return user.generateAuthToken();
    }).then((token) => {
        res.header("x-auth", token).send(user);
    }, (e) => {
        res.status(400).send(e);
    });
});




app.get("/users/me", authenticate, (req,res) => {
    res.send(req.user);
});

//POst /users/login {email, password}

app.post("/users/login", (req,res) => {
    const body = _.pick(req.body, ["email", "password"]);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header("x-auth", token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });

   /* User.findOne({email: body.email}).then((user) => {
        if(!user) {
            return res.status(400).send();
        }

        bcrypt.compare(body.password, user.password, (err,res) => {
            console.log(res);
        });

    });*/

});

app.delete("/users/me/token", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
})



    //valid id using isvalid
    //404, send back emtpy send

    //find by id
        //succes
            //if todo - send it back
            //else sned back 404 with empty body
        //error
            //400 - invalid req


app.listen(port, () => {
    console.log(`Started on port ${port}`);
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

