const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  description:{
type:String,

  },
  completed: {
    type: Boolean,
   
  },
  
});

module.exports = mongoose.model("todo", todoSchema);
