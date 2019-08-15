import { MongoClient } from 'mongodb';

class MongoClientApp {
  private uri = "mongodb+srv://admin:admin@cluster0-8ps0r.mongodb.net/test?retryWrites=true&w=majority";
  private client:MongoClient;
  private collection:any;

  constructor() {
    this.client = new MongoClient(this.uri, { useNewUrlParser: true });
    this.connect();
  }

  connect(){
    this.client.connect(error => {
      this.collection = this.client.db("contact").collection("contact");
      if(error) console.log("ERROR connecting:", error);
    })
  }

  disconnect(){
    this.client.close(error => {
      console.log("Error closing client", error);
    });
  }

  insert(data){
    return this.collection.insertOne(data);
  }

  getAll(){
    return this.collection.find({}).toArray();
  }
}

export default MongoClientApp;