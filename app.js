import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import exphbs from 'express-handlebars'

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

app.engine('hbs', exphbs.engine({
  defaultLayout: 'main', extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.get("/", (req, res) => {
  // res.send('This is my NodeJs + Express project')
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
