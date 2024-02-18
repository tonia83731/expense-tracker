import mongoose from "mongoose";
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date()
  },
  amount: {
    type: Number,
    required: true,
  }
})

const Record = mongoose.model("Record", recordSchema)
export default Record