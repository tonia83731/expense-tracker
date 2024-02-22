import express from "express";
const router = express.Router();

import Record from "../../models/record.js";
import Category from "../../models/category.js";

// 取得新增頁面
router.get("/new", async (req, res) => {
  const categories = await Category.find().lean();
  res.render("new", { categories });
});

// 新增record
router.post("/new", async (req, res) => {
  try {
    const { name, date, categoryName, amount } = req.body;
    const userId = req.user._id;

    console.log(categoryName);
    const category = await Category.find({ name: categoryName }).lean();
    const categoryId = category[0]._id;

    await Record.create({
      name,
      date,
      categoryId,
      amount,
      userId,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// 取得修改頁面
router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const record = await Record.findOne({ _id: id, userId }).lean();
    // console.log(record)
    const categoryId = record.categoryId;
    // console.log(categoryId)
    const category = await Category.find({ _id: categoryId }).lean();
    // console.log(category);
    const categoryName = category[0].name;
    record.categoryName = categoryName;
    record.date = record.date.toISOString().split("T")[0];
    // console.log(record)
    res.render("edit", { record });
  } catch (error) {
    console.error(error);
  }
});

// 修改record
router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const { name, date, categoryName, amount } = req.body;
    const category = await Category.find({name: categoryName}).lean()
    // console.log(category)
    const categoryId = category[0]._id
  
    await Record.findOne({ _id: id, userId }).then((record) => {
      record.name = name;
      record.date = new Date(date);
      record.categoryId = categoryId;
      record.amount = amount;
      return record.save();
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

// 刪除record
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    await Record.findOne({ _id: id, userId }).then((record) =>
      record.deleteOne()
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

export default router;
