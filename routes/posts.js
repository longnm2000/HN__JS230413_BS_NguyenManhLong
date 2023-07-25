// const express = require("express");
// const router = express.Router();

// router.get("/:id", (req, res) => {
//   res.send("<h1>Post</h1>");
// });

// router.get("/", (req, res) => {
//   try {
//     let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
//     res.json({
//       posts: posts,
//       status: "success",
//     });
//   } catch (error) {
//     res.json({
//       error: error,
//       status: "fail",
//       message: "Invalid",
//     });
//   }
// });

// router.post("/:id", (req, res) => {
//   res.send("<h1>Post Post</h1>");
// });

// router.put("/:id", (req, res) => {
//   res.send("<h1>Put Post</h1>");
// });

// router.delete("/:id", (req, res) => {
//   res.send("<h1>Delete Post</h1>");
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs");

// Lấy ra 1 post
router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    let post = posts.find((e, i) => e.id === +id);
    if (!post) {
      res.json({
        message: "post not found",
      });
    } else {
      res.json({
        post: post,
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

// Lấy ra tất cả post
router.get("/", (req, res) => {
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    res.json({
      posts: posts,
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

// Thêm 1 post
router.post("/", (req, res) => {
  let { userId, title, body } = req.body;
  let post = {
    userId,
    id: Math.floor(Math.random() * 10000000000),
    title,
    body,
  };

  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    posts.push(post);
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts), "utf-8");
    res.json({
      message: "Create post success",
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

// Sửa thông tin 1 post
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { userId, title, body } = req.body;
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    let findPost = posts.find((e, i) => e.id === +id);
    if (!!findPost) {
      let updatePost = {
        ...findPost,
        userId,
        title,
        body,
      };
      let updatePosts = posts.map((item) =>
        item.id === +id ? updatePost : item
      );
      fs.writeFileSync(
        "./data/posts.json",
        JSON.stringify(updatePosts),
        "utf-8"
      );
      res.json({
        message: `Update post success`,
        status: "success",
      });
    } else {
      res.json({
        message: "post not found",
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

// Xóa 1 post
router.delete("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    let deletedPosts = posts.filter((e) => e.id !== +id);
    fs.writeFileSync(
      "./data/posts.json",
      JSON.stringify(deletedPosts),
      "utf-8"
    );
    res.json({
      message: `Delete post success`,
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

module.exports = router;
