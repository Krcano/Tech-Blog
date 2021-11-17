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
router.post("/posts/:id", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newComment = await Comment.create({
      description: req.body.description,
      date_created: req.body.date_created,
      writer_id: req.body.writer_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
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

module.exports = router;
