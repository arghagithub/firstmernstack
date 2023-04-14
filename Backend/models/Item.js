const mongoose= require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //It is to connect the user with partcular items
    ref: "user",
  },
  itemname:{
    type:String,
    required:true
  },
  quantity:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    default:Date.now  
  }
});

module.exports=mongoose.model('item',itemSchema);