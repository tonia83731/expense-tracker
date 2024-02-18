import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// 僅在非正式環境中使用dotenv
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
// 取得資料連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get("/", (req, res) => {
  res.send('This is my NodeJs + Express project')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
