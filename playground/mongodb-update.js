//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
/*
    db.collection("Todos").findOneAndUpdate({
        _id: new ObjectID("5ba9dd636080b752b0d36737")
    },
    {
        $set: {
            completed: true
        }
    },
    {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });*/

    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("5b9226e4b5bba613b41e09f1")
    }, {
        $set: {
            name: "Victor"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //db.close();
    //client.close();
});