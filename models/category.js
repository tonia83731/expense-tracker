import mongoose from "mongoose";
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

const Category = mongoose.model('Category', categorySchema)
export default Category