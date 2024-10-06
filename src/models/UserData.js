import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  address : [{
    houseNo : {
      type : String,
    },
    landmark : String,
    society : {
      type : String,
    },
    city : {
      type : String,
    },
    state : {
      type : String,
    }
  }],
  orders : {
    pujaId : Number,
    orderDate : String
  },
  favourites : [{
    title : String,
    description : String,
    videoId : String,
    thumbnail : String
  }]
})

const User = mongoose.models.User || mongoose.model(UserSchema , 'User');

export default User;