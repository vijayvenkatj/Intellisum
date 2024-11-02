import mongoose, { Schema } from 'mongoose';

// Define interfaces based on the document structure
interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
}

interface IAccount {
  _id: mongoose.Types.ObjectId;
  access_token: string;
  id_token: string;
  expires_at: number;
  scope: string;
  token_type: string;
  providerAccountId: string;
  provider: string;
  type: string;
  userId: mongoose.Types.ObjectId;
}

// Define schemas
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: Boolean, default: null }
});

const accountSchema = new Schema<IAccount>({
  access_token: { type: String, required: true },
  id_token: { type: String, required: true },
  expires_at: { type: Number, required: true },
  scope: { type: String, required: true },
  token_type: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  provider: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

export function modelUsers() {
  return mongoose.models.User || mongoose.model('User', userSchema);
}

export function modelAccounts() {
  return mongoose.models.Account || mongoose.model('Account', accountSchema);
}