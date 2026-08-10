import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null });

async function dbConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured. Add it to .env.local.');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Set Mongoose-specific configurations globally before connecting
    mongoose.set('strictQuery', true);

    cached.promise = mongoose.connect(uri, opts)
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        // Reset the cached promise on failure so subsequent attempts can try again
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
