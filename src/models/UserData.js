import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  address : {
    houseNo : {
      type : String,
      required : true
    },
    landmark : String,
    society : {
      type : String,
      required : true
    },
    city : {
      type : String,
      required : true
    },
    state : {
      type : String,
      required : true
    }
  },
  orders : {
    pujaId : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : 'Puja'
    },
    orderDate : String
  }
})

const User = mongoose.models.User || mongoose.model(UserSchema , 'User');

export default User;