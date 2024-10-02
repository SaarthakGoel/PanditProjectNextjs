import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionString = 'mongodb+srv://saarthak85:EvutXq35CBKWnp9a@cluster0.soa6x.mongodb.net/';

  mongoose.connect(connectionString)
  .then(() => console.log('connected to database'))
  .catch(err => console.log(err)) 
}

export default connectToDB;