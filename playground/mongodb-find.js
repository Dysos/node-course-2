//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    /*db.collection("Todos").find({
            _id: new ObjectID("5ba9d4146080b752b0d3657a")
        }).toArray().then((docs) => {
        console.log("Todos");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch todos", err);
    });*/

    /*db.collection("Todos").find().count().then((count) => {
    console.log(`Todos count: ${count}`);
}, (err) => {
    console.log("Unable to fetch todos", err);
});*/

    db.collection("Users").find({name: "Michael"}).toArray().then((docs) => {
        console.log("Todos with specific name:" );
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Couldnt find it" ,err);
    });


    //db.close();
    //client.close();
});