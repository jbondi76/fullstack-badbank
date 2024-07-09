const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Cluster75509:Rodman69%24@cluster75509.5t1tyck.mongodb.net/?appName=Cluster75509";
let db            = null;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  
// connect to mongo
MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client) {
    

    // connect to 'myproject' database
    db = client.db('full-stack-banking-app');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}
function userdata(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// verify the user / login
function login(email){
    return new Promise((resolve, reject) => {
        const collection = db
        .collection('users')
        .findOne({ email: email })
        .then((doc)=> resolve(doc))
        .catch((err)=> reject(err));
    })
}

function deposit(email, amount) {
    return new Promise((resolve, reject) => {
        
            const user = db
                .collection('users')
                .findOne({ email: email })
                .then((doc)=> {
                    db.collection('users')
                    .updateOne(
                            {email: email}, 
                            {$set: {balance: Number(doc.balance) + Number(amount)}},
                        ).then(res => {
                            resolve(db.collection('users').findOne({email: email}))
                        });
                    }).
                    catch((err) =>  {
                        reject(err)
                    })
    });
}
function withdraw(email, amount) {
    return new Promise((resolve, reject) => {
        
            const user = db
                .collection('users')
                .findOne({ email: email })
                .then((doc)=> {
                    db.collection('users')
                    .updateOne(
                            {email: email}, 
                            {$set: {balance: Number(doc.balance) - Number(amount)}},
                        ).then(res => {
                            resolve(db.collection('users').findOne({email: email}))
                        });
                    }).
                    catch((err) =>  {
                        reject(err)
                    })
    });
}

function destroy(email){
    return new Promise((resolve, reject) => {
        const collection = db
        .collection('users')
        .deleteOne({ email: email })
        .then((doc)=> resolve(doc))
        .catch((err)=> reject(err));
    })
}

module.exports = {create, all, login, deposit, withdraw, userdata, destroy};