const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWTSecret = "~!@#$%&*()_+";
const fetchuser = require("../middleware/fetchuser");
const Admin = require("../models/Admin");
const fetchadmin = require("../middleware/fetchadmin");

router.post(
  "/signup",
  [
    body("name", "name must be atleast 5 characters long").isLength({ min: 5 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "password must be 5 characters long").isLength({ min: 5 }),
  ],
  fetchadmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(406)
          .json({ success: false, error: "User already exits" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
        admin: req.admin.id,
      });

      res.json({
        success: true,
        user,
        message: "your account is created succesfully",
      });
    } catch (error) {
      res.status(500).json({ sucess: false, error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials",
        });
      }

      const compare = await bcrypt.compare(req.body.password, user.password);
      if (!compare) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const logintoken = jwt.sign(data, JWTSecret);

      res.status(200).json({
        success: true,
        token: logintoken,
        message: "Successfully logged in",
      });
    } catch (error) {
      res.status(500).json({ sucess: false, error: "Internal server error" });
    }
  }
);

// router.post(
//   "/adminsignup",
//   [body("email").isEmail(), body("password").isLength({ min: 5 })],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       let admin = await Admin.findOne({ email: req.body.email });
//       if (admin) {
//         return res
//           .status(406)
//           .json({ success: false, error: "Admin already exits" });
//       }
//       const salt = await bcrypt.genSalt(10);
//       const secpass = await bcrypt.hash(req.body.password, salt);

//       admin = await Admin.create({
//         email: req.body.email,
//         password: secpass,
//       });

//       res.json({
//         success: true,
//         admin,
//         message: "your admin account is created succesfully",
//       });
//     } catch (error) {
//       res.status(500).json({ sucess: false, error: "Internal server error" });
//     }
//   }
// );

router.post(
  "/adminlogin",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (!admin) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials",
        });
      }

      const compare = await bcrypt.compare(req.body.password, admin.password);
      if (!compare) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials",
        });
      }

      const data = {
        admin: {
          id: admin.id,
        },
      };
      const adminlogintoken = jwt.sign(data, JWTSecret);

      res.status(200).json({
        success: true,
        token: adminlogintoken,
        message: "Successfully logged in as admin",
      });
    } catch (error) {
      res.status(500).json({ sucess: false, error: "Internal server error" });
    }
  }
);

router.post("/fetchuser", fetchadmin, async (req, res) => {
  try {
    const adminid = req.admin.id;
    const user = await User.find({ admin: adminid }).select("-password");
    res.json({success:true,user});
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/getuserdetail",fetchuser, async (req, res) => {
  try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
});

router.put(
  "/updateuser/:id",
  [
    body("name", "name must be atleast 5 characters long").isLength({ min: 5 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "password must be 5 characters long").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      let newuser = {};
      if (name) {
        newuser.name = name;
      }

      if (email) {
        newuser.email = email;
      }

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);
        newuser.password = secpass;
      }

      let user = await User.findById(req.params.id);
      if (!user) {
        req.status(404).json({ suceess: false, message: "user not found" });
      }

      if (user.id.toString() !== req.user.id) {
        return res.status(401).json({ error: "wrong user credentials" });
      }

      user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: newuser },
        { new: true }
      );
      res.status(200).json({ success: "ok", user });
    } catch (error) {
      res.status(500).json({ sucess: false, error: "Internal server error" });
    }
  }
);

router.delete("/deleteuser/:id", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      req.status(404).json({ suceess: false, message: "user not found" });
    }

    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ error: "wrong user credentials" });
    }

    user=await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message:"successfully deleted",user });
  } catch (error) {
    res.status(500).json({ sucess: false, error: "Internal server error" });
  }
});

module.exports = router;
