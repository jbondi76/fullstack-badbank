const MongoClient = require('mongodb').MongoClient;
const url     = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log('Connected to MongoDB!')
    
    // database Name
    const dbName = 'badbank';
    const db = client.db(dbName);

    // new User
    const name = 'user' + Math.floor(Math.random()*10000);
    var email = name + 'mit.edu';
    
    // insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document inserted!');
    });

    // read from Mongo Database
    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:', docs);

            // clean up
            client.close();
        })
});