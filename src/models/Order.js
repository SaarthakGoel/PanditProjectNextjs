import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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
  }
},
{
  timestamps : true
})

const Order = mongoose.models.Order || mongoose.model(pujaSchema , 'Order');

export default Order;