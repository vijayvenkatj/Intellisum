import mongoose, { Schema } from 'mongoose';


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


interface userInfo {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  image: string;
}

const userSchema = new Schema<userInfo>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: false},
})

export function modelUsers() {
    return mongoose.models.User || mongoose.model('User', userSchema);
}