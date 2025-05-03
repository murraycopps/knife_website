// src/routes/api/data/+server.js
import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';

const database = 'knives';

export async function POST({ request }) {
  const client = new MongoClient(MONGODB_URI);
  const data = await request.json();

  let coll = data.collection;
  let type = "";

  if (coll == "leather" || coll == "spoons") {
    type = coll;
    coll = "projects";
  }

  try {
    await client.connect();
    const db = client.db(database);
    const collection = db.collection(coll);
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
      images: data.images,
    };

    if (type) {
      newData.type = type;
    }

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

