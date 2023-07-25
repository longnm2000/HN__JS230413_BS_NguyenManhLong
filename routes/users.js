const express = require("express");
const router = express.Router();
const fs = require("fs");

// Lấy ra 1 user
router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    let user = users.find((e, i) => e.id === +id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    } else {
      res.json({
        user: user,
      });
    }
  } catch (error) {
    res.json({
      error: error,
      status: "fail",
      message: "qaz",
    });
  }
});

// Lấy ra tất cả user
router.get("/", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    res.json({
      users: users,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
      status: "fail",
      message: "Invalid",
    });
  }
});

// Thêm 1 user
router.post("/", (req, res) => {
  let { name, username, email, address, phone, website, company } = req.body;
  let user = {
    id: Math.floor(Math.random() * 10000000000),
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  };

  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    users.push(user);
    fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8");
    res.json({
      message: "Create user success",
      status: "success",
    });
  } catch (error) {
    res.json({
      error,
      message: "Invalid",
      status: "fail",
    });
  }
});

// Sửa thông tin 1 user
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { name, username, email, address, phone, website, company } = req.body;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    let findUser = users.find((e, i) => e.id === +id);
    if (!!findUser) {
      let updateUser = {
        ...findUser,
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
      };
      let updateUsers = users.map((item) =>
        item.id === +id ? updateUser : item
      );
      fs.writeFileSync(
        "./data/users.json",
        JSON.stringify(updateUsers),
        "utf-8"
      );
      res.json({
        message: `Update user success`,
        status: "success",
      });
    } else {
      res.json({
        message: "user not found",
        status: "fail",
      });
    }
  } catch (error) {
    res.json({
      error,
      message: "Invalid",
      status: "fail",
    });
  }
});

// Xóa 1 user
router.delete("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    let deletedUsers = users.filter((e) => e.id !== +id);
    fs.writeFileSync(
      "./data/users.json",
      JSON.stringify(deletedUsers),
      "utf-8"
    );
    res.json({
      message: `Delete user success`,
      status: "success",
    });
  } catch (error) {
    res.json({
      error,
      message: "Invalid",
      status: "fail",
    });
  }
});

// Lấy toàn bộ post của 1 user

router.get("/:id/posts", (req, res) => {
  let { id } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    let userPosts = posts.filter((e) => e.userId === +id);
    res.send(userPosts);
  } catch (error) {
    res.json({
      error,
      message: "Invalid",
      status: "fail",
    });
  }
});

module.exports = router;
