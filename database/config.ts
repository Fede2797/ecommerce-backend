import mongoose from 'mongoose';

export const dbConnection = async() => {
  try {

    await mongoose.connect( process.env.MONGODB_CNN );
    console.log("DB connected");
    
  } catch (error) {
    console.log(error);
    throw new Error("DB connection error")
  }
}