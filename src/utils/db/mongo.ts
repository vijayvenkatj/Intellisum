import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true, // Enable TLS connection
  // tlsInsecure: true, // Uncomment this for development/testing only
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the value
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri, options);
}

// Connect to MongoDB and log the result
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the MongoClient instance for use in other parts of the application
export default client;
