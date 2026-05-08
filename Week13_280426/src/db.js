require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
console.log("MONGO_URI:", process.env.MONGO_URI);
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let database = null;

async function connectDatabase() {
  if (database) {
    return database;
  }

  await client.connect();
  database = client.db();
  console.log('Connected to MongoDB:', uri);
  return database;
}

function getCollection(name) {
  if (!database) {
    throw new Error('Database is not connected yet. Call connectDatabase() first.');
  }
  return database.collection(name);
}

module.exports = {
  connectDatabase,
  getCollection
};
