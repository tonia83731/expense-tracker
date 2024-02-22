import mongoose from "mongoose";
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now.toLocaleDateString,
  },
  amount: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  categoryIcon: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
});

const Record = mongoose.model("Record", recordSchema)
export default Record