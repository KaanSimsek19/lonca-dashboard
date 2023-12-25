const { MongoClient, ObjectId } = require('mongodb');

class OrderRepository {
  constructor() {
    this.url = 'mongodb+srv://mongo:mongo@lonca.j3hm8yk.mongodb.net/?retryWrites=true&w=majority';
    this.dbName = 'Lonca';
    this.collectionName = 'order';
    this.connect();
  }

  async connect() {
    console.log("mongo...")
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


  async getTotalAmountOfSold(vendorId) {
    const pipeline = [
      {
        $unwind: '$cart_item',
      },
      {
        $lookup: {
          from: "parent_products",
          localField: "cart_item.product",
          foreignField: "_id",
          as: "parentProduct"
        }
      },
     
    ];

    return this.collection.aggregate(pipeline).toArray();
  } 
  
}

module.exports = OrderRepository;


/*
 {
        $group: {
          _id: '$cart_item.product',
          totalSold: { $sum: '$cart_item.quantity' },
        },
      }
*/