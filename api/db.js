const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const { MongoClient } = require('mongodb');

const adapter = new FileSync(path.join(__dirname, '..', 'server.json'));
const db = low(adapter);

// Define defaults (required if JSON file is empty)
db.defaults({ schedules: [] }).write();

const uri = process.env.MONGODB_URI || "mongodb+srv://pablohenriquefs:RH5qqmVOTVANVxJi@cluster0.ynmwsxq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('hair-day');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { db, connect };
