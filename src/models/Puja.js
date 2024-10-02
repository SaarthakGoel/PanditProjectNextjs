import mongoose from "mongoose";

const pujaSchema = new mongoose.Schema({
  type : {
    type : String,
    required : true
  },
  name : {
    type : String,
    required : true
  },
  Price : {
    type : Number,
    required : true,
  },
  description : {
    type : String,
    required : true
  },
  images : {
    type : String,
    required : true
  }
})

const Puja = mongoose.models.Puja || mongoose.model(pujaSchema , 'Puja');

export default Puja;