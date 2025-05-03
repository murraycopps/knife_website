// src/routes/api/data/+server.js
import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';



export async function POST({ request }) {
  const client = new MongoClient(MONGODB_URI);
  const data = await request.json();

  try {
    await client.connect();
    const db = client.db('knives');
    const collection = db.collection('gallery');
    const passwordCollection = db.collection('password');
    const passwordData = await passwordCollection.find({}).toArray();
    const password = passwordData[0].password;



    if (data.password != password) {
      return json({
        success: false,
        error: 'Invalid password'
      }, { status: 401 });
    }
    const newData = {
      name: data.name,
      description: data.description,
      images: data.images
    };

    const result = await collection.insertOne(newData);

    return json({
      success: true,
      insertedId: result.insertedId
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

