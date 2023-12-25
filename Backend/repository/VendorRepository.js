const { MongoClient, ObjectId } = require('mongodb');

class VendorRepository {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.collectionName = 'vendors';
    this.connect()
  }

  async connect() {
    this.client = await MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
    }
  }

  async findAll() {
    return this.collection.find().toArray();
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}

module.exports = VendorRepository;