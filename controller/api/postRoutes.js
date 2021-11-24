const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
// creates posts
router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newPost = await Post.create({
      name: req.body.name,
      description: req.body.description,
      writer_id: req.session.writer_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
// creates comments
router.post("/comments", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.session);
    const newComment = await Comment.create({
      description: req.body.description,
      writer_id: req.session.writer_id,
      post_id: parseInt(req.body.post_id),
    });
    console.log(newComment);
    res.status(200).json(newComment).redirect("/");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// uses put method to update posts/ Update posts not working
router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log(req.body)
   
    const updatedPosts = await Post.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      { where: { id: req.params.id } },
      // { returning: true, where: { id: req.params.id } }
    );
    console.log(updatedPosts)
    // res.render("profile", {
    //   updatedPosts,
    //   logged_in: true,
    // });
    res.status(200).json(updatedPosts)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// to display updated post on the updateposts page /Not woring
router.get("/updateposts/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    const updatedPosts = post.get({ plain: true });
    console.log(updatedPosts);
    res.render("updatePost", updatedPosts);
  } catch (err) {
   
    res.status(400).json(err);
  }
});
// Deletes a Post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        writer_id: req.session.writer_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a Comment
router.delete("/comments/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
