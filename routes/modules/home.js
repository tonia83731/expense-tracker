import express from "express";
const router = express.Router();

import Record from "../../models/record.js";
import Category from "../../models/category.js";
import { totalAmount } from "../../utilities/totalAmount.js";

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const records = await Record.find({ userId }).lean().sort({ date: "asc" });

    const outputRecords = await Promise.all(
      records.map(async (record) => {
        const categoryId = record.categoryId;
        const category = await Category.find({ _id: categoryId }).lean();
        const categoryIcon = category[0].icon;
        return {
          ...record,
          date: record.date.toLocaleDateString(),
          categoryIcon: categoryIcon,
        };
      })
    );

    res.render("index", {
      records: outputRecords,
      totalAmount: totalAmount(records),
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/search", async (req, res) => {
  try {
    const userId = req.user._id;
    const { category } = req.query;
    // console.log(category)
    const findCategory = await Category.find({ name: category });
    const categoryId = findCategory[0]._id;
    const categoryIcon = findCategory[0].icon
    console.log(categoryIcon)
    const records = await Record.find({ userId, categoryId })
      .lean()
      .sort({ date: "asc" });
    const outputRecords = await Promise.all(
      records.map(async(record) => {
        return {
          ...record,
          date: record.date.toLocaleDateString(),
          categoryIcon: categoryIcon
        }
      })
    )
    res.render("index", {
      records: outputRecords,
      totalAmount: totalAmount(records)
    })
  } catch (error) {
    console.error(error);
  }
});

export default router;
