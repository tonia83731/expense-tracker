import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import Category from "../category.js";
const categoryList = [
  {
    name: "家居物業",
    icon: '<i class="fa-solid fa-house"></i>',
  },
  {
    name: "交通出行",
    icon: '<i class="fa-solid fa-van-shuttle"></i>',
  },
  {
    name: "休閒娛樂",
    icon: '<i class="fa-solid fa-face-grin-beam"></i>',
  },
  {
    name: "餐飲食品",
    icon: '<i class="fa-solid fa-utensils"></i>',
  },
  {
    name: "其他",
    icon: '<i class="fa-solid fa-pen"></i>',
  },
];

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  Promise.all(
    Array.from({ length: categoryList.length }, (_, i) =>
      Category.create({
        name: categoryList[i].name,
        icon: categoryList[i].icon,
      })
    )
  ).then(() => {
    console.log("categoryList created!");
    process.exit();
  });
});
