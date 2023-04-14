const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

router.get("/getitem", fetchuser, async (req, res) => {
  try {
    const item = await Item.find({ user: req.user.id });
    res.json(item);
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Internal server error" });
  }
});

router.post(
  "/additem",
  [
    body("itemname", "name must be atleast 3 characters long").isLength({
      min: 3,
    }),
    body("quantity", "There must be a quantity").exists(),
    body("price", "there must be a price of the item").exists(),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { itemname, quantity, price } = req.body;
      const item = new Item({
        itemname,
        quantity,
        price,
        user: req.user.id,
      });
      const saveitem = await item.save();
      res.json({
        sucess: true,
        message: "item is added succesfully",
        saveitem,
      });
    } catch (error) {
      res.status(500).json({ sucess: false, error: "Internal server error" });
    }
  }
);

router.put(
  "/updateitem/:id",
  [
    body("itemname", "name must be atleast 3 characters long").isLength({
      min: 3,
    }),
    body("quantity", "There must be a quantity").exists(),
    body("price", "there must be a price of the item").exists(),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { itemname, quantity, price } = req.body;
      let newitem = {};
      if (itemname) {
        newitem.itemname = itemname;
      }

      if (quantity) {
        newitem.quantity = quantity;
      }

      if (price) {
        newitem.price = price;
      }

      let item = await Item.findById(req.params.id);
      if (!item) {
        req.status(404).json({ suceess: false, message: "item not found" });
      }

      if (item.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "wrong user credentials" });
      }

      item = await Item.findByIdAndUpdate(
        req.params.id,
        { $set: newitem },
        { new: true }
      );
      res.status(200).json({ success: "ok", item });
    } catch (error) {
      res.status(500).json({ sucess: false, error: "Internal server error" });
    }
  }
);

router.delete("/deleteitem/:id", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      req.status(404).json({ suceess: false, message: "item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "wrong user credentials" });
    }

    item = await Item.findByIdAndDelete(req.params.id);
    res.json({ success: true, message:"successfully deleted",item });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Internal server error" });
  }
});

module.exports = router;
