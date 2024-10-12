import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  address : [{
    name : {
      type : String,
      unique : true
    },
    selected : Boolean,
    street : String,
    city : String,
    state : String,
    postalCode : String,
    country : String
  }],
  orders : [{
    pujaId : Number,
    date : String,
    time : String,
  }],
  cart : [{
    pujaId : Number,
    date : String,
    time : String
  }],
  favourites : [{
    title : String,
    description : String,
    videoId : String,
    thumbnail : String
  }]
})

const User = mongoose.models.User || mongoose.model('User' , UserSchema);

export default User;