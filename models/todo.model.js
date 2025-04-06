import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({

  todoTask: {
    type: String,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
 
},{ timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;