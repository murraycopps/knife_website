// src/routes/api/data/+server.js
import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

const database = 'knives';
const coll = 'gallery';
export async function GET() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(database);
    const collection = db.collection(coll);
    const data = await collection.find({}).toArray();
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } finally {
    await client.close();
  }
}