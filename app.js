import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import MethodOverride from "method-override";
import session from "express-session";

import router from "./routes/index.js";
import "./config/mongoos.js";
import usePassport from "./config/passport.js";
import flash from "connect-flash";

// import Record from "./models/record.js";
// import Category from "./models/category.js";

// 僅在非正式環境中使用dotenv
// if (process.env.NODE_ENV !== "production") {
//   dotenv.config();
// }

const app = express();
const port = 3000;

// mongoose.connect(process.env.MONGODB_URI);
// // 取得資料連線狀態
// const db = mongoose.connection;
// // 連線異常
// db.on("error", () => {
//   console.log("mongodb error!");
// });
// // 連線成功
// db.once("open", () => {
//   console.log("mongodb connected!");
// });

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(MethodOverride("_method"));
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
app.use(router);

// app.get("/", async (req, res) => {
//   try {
//     let totalAmount = 0;
//     const records = await Record.find().lean().sort({ date: "asc" });

//     records.map((record) => {
//       totalAmount += record.amount;
//     });

//     const recordsWithCategoryId = await Promise.all(
//       records.map(async (record) => {
//         const categoryId = record.categoryId;
//         const category = await Category.findOne({ _id: categoryId }).lean();
//         return {
//           ...record,
//           date: record.date.toLocaleDateString(),
//           categoryIcon: category.icon,
//         };
//       })
//     );
//     res.render("index", {
//       records: recordsWithCategoryId,
//       totalAmount: totalAmount,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.get("/new", async (req, res) => {
//   const categories = await Category.find().lean();
//   res.render("new", { categories });
// });
// app.post("/new", async (req, res) => {
//   const { name, date, categoryId, amount } = req.body;

//   // console.log(categoryObj)
//   return Record.create({
//     name,
//     date,
//     categoryId,
//     amount,
//   })
//     .then(() => res.redirect("/"))
//     .catch((error) => console.log(error));
// });

// app.get("/edit/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const categories = await Category.find().lean();
//     const record = await Record.findById(id).lean();
//     record.date = record.date.toISOString().split("T")[0];
//     res.render("edit", { record, categories });
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.put("/edit/:id", (req, res) => {
//   const id = req.params.id;
//   const { name, date, categoryId, amount } = req.body;
//   return Record.findById(id)
//     .then((record) => {
//       record.name = name;
//       record.date = new Date(date);
//       record.categoryId = categoryId;
//       record.amount = amount;
//       return record.save();
//     })
//     .then(() => res.redirect(`/edit/${id}`))
//     .catch((error) => console.log(error));
// });

// app.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   return Record.findById(id)
//     .then((record) => record.deleteOne())
//     .then(() => res.redirect("/"))
//     .catch((error) => console.log(error));
// });

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
