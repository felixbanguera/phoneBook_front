const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-8ps0r.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("contact").collection("contact");
  //console.log("collection!",collection);
  // perform actions on the collection object
  client.db("contact").collection("contact").find({}).toArray().then(res => {
     console.log("allContacts!",res);
    });

  // collection.insertOne({ firstName: 'Pepito',
  //   lastName: 'Perez',
  //   phoneNumber: 1234567
  // }, (err, res) => {
  //   console.log("inserted",res);
  //   if(err) console.log("NOT inserted",err);
  // });

  client.close();
});
