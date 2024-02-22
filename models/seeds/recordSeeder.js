import db from "../../config/mongoos.js";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import Record from "../record.js";
import Category from "../category.js";
import User from "../user.js";

const SEED_USER = [
  {
    name: "Root",
    email: "root@example.com",
    password: "1234",
  },
];
const SEED_RECORD = [
  {
    name: "Expense record No.1",
    amount: 100,
    date: "2024-02-19",
    category: "家居物業",
  },
  {
    name: "Expense record No.2",
    amount: 50,
    date: "2024-02-18",
    category: "交通出行",
  },
  {
    name: "Expense record No.3",
    amount: 75,
    date: "2024-02-17",
    category: "休閒娛樂",
  },
  {
    name: "Expense record No.4",
    amount: 30,
    date: "2024-02-16",
    category: "餐飲食品",
  },
  {
    name: "Expense record No.5",
    amount: 200,
    date: "2024-02-15",
    category: "其他",
  },
  {
    name: "Expense record No.6",
    amount: 90,
    date: "2024-02-14",
    category: "家居物業",
  },
  {
    name: "Expense record No.7",
    amount: 120,
    date: "2024-02-13",
    category: "交通出行",
  },
  {
    name: "Expense record No.8",
    amount: 60,
    date: "2024-02-12",
    category: "休閒娛樂",
  },
  {
    name: "Expense record No.9",
    amount: 45,
    date: "2024-02-11",
    category: "餐飲食品",
  },
  {
    name: "Expense record No.10",
    amount: 150,
    date: "2024-02-10",
    category: "其他",
  },
];

db.once("open", async () => {
  console.log("mongodb connected!");
  try{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER[0].password, salt)
    const createUser = await User.create({
      name: SEED_USER[0].name,
      email: SEED_USER[0].email,
      password: hash,
    });
    console.log('Create seed user done!')
    const userId = createUser._id

    const records = SEED_RECORD.map(async(record) => {
      const category = await Category.findOne({name: record.category}).lean()
      const categoryId = category._id
      return Record.create({
        name: record.name, amount: record.amount, date: record.date, categoryId, userId
      })
    })

    await Promise.all(records)
    console.log('Create recordSeeder done!')
    process.exit()
  } catch (error) {
    console.log(error)
  }

  // const records = SEED_RECORD.map(async (record) => {
  //   const category = await Category.findOne({ name: record.category }).lean();
  //   const categoryId = category._id;
  //   const date = new Date(record.date);
  //   record.categoryId = categoryId;
  //   record.date = date;
  //   return {
  //     ...record,
  //     categoryId,
  //     date
  //   }
  // });

  // console.log(records);


  // bcrypt
  //   .genSalt(10)
  //   .then((salt) => bcrypt.hash(SEED_USER[0].password, salt))
  //   .then((hash) =>
  //     User.create({
  //       name: SEED_USER[0].name,
  //       email: SEED_USER[0].email,
  //       password: hash,
  //     })
  //   )
  //   .then((user) => {
  //     const userId = user._id;
  //     return Promise.all(
  //       // records.map((record) =>
  //       //   Record.create({
  //       //     name: record.name,
  //       //     amount: record.amount,
  //       //     date: record.date,
  //       //     categoryId: record.categoryId,
  //       //     userId,
  //       //   })
  //       // )
  //     );
  //   })
  //   .then(() => {
  //     console.log("done");
  //     process.exit();
  //   });
});
