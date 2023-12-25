const { MongoClient, ObjectId } = require('mongodb');

class ProductRepository {
  constructor() {
    this.url = 'mongodb+srv://mongo:mongo@lonca.j3hm8yk.mongodb.net/?retryWrites=true&w=majority';
    this.dbName = 'Lonca';
    this.collectionName = 'parent-products';
    this.connect();
  }

  async connect() {
    console.log("connected to parent-products")
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
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }
  
  async isVendorsProduct(vendorId, productId){
    console.log(productId['$oid'])
    const product = await this.findById(productId['$oid']);
    console.log(product)
    return product.vendor==new ObjectId(vendorId)
  }
}

module.exports = ProductRepository;
