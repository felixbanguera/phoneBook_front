const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-8ps0r.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("contact").collection("contact");
  console.log("collection!",collection);
  // perform actions on the collection object
  const allContacts = client.db("contact").collection("contact").find({firstName: "Felix"});
  console.log("allContacts!",allContacts);
  client.close();
});
