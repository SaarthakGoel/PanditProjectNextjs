import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  address : [{
    name : String,
    selected : Boolean,
    street : String,
    city : String,
    state : String,
    postalCode : String,
    country : String
  }],
  orders : [{
    orderId : [{
      pujaId : Number,
      date : String,
      time : String,
    }],
    transactionId : String,
    nowDate : String,
    nowTime : String,
    totalAmount : Number
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