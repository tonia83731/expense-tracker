import mongoose from "mongoose";
import dotenv from 'dotenv'

// 僅在非正式環境中使用dotenv
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

mongoose.connect(process.env.MONGODB_URI);
// 取得資料連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

export default db