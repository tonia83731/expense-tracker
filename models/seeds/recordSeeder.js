import mongoose from "mongoose";
import dotenv from 'dotenv'

if(process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

import Record from "../record.js";

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.once('error', () => {
  console.log('mongoose error')
})
db.on('open', () => {
  console.log('mongodb connected!')
  for(let i = 0 ; i < 10 ; i++) {
    Record.create({
      name: `Expense No.${i}`,
      category: i % 3 === 0 ? "家居物業" : i % 3 === 1 ? "交通出行" : "餐飲食品",
      amount: i === 0 ? 100 : 100 * i
    });
  }
  console.log('done')
})