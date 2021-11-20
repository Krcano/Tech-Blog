const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

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
// not working to render the comments
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
// Update posts
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const Uposts = updatedPost.get({ plain: true });
    res.render("profile", {
      ...Uposts,
      logged_in: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
// go back for try catch
router.get("/updateposts/:id", withAuth, async (req, res) => {
  try{
  const updatedPost = Post.findByPk(req.params.id);
  res.render("updatePost", updatedPost);
  }catch(err){
    res.status(400).json(err)
  }
});

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
