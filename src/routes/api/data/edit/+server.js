// src/routes/api/data/+server.js
import { MONGODB_URI } from '$env/static/private';
import { MongoClient, ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';

const database = 'knives';

export async function GET({ request }) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(database);
    const passwordCollection = db.collection('password');
    const passwordData = await passwordCollection.find({}).toArray();
    const password = passwordData[0].password;
    return new Response(JSON.stringify({ password }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return json({
      success: false,
      error: error.message
    }, { status: 500 });

  } finally {
    await client.close();
  }
}


export async function POST({ request }) {
  const client = new MongoClient(MONGODB_URI);
  const { collectionName, item, id } = await request.json();

  try {
    await client.connect();
    const db = client.db(database);
    const collection = db.collection(collectionName);

    const newObjectId = new ObjectId(id);

    const result = await collection.updateOne({ _id: newObjectId }, { $set: item });
    return json({ success: true, modifiedCount: result.modifiedCount });


  }
  catch (error) {
    return json({
      success: false,
      error: error.message
    }, { status: 500 });

  } finally {
    await client.close();
  }
}
