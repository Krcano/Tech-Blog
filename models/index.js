const Writer = require("./Writer");
const Post = require("./Post");
const Comment = require("./Comment");

Writer.hasMany(Post, {
  foreignKey: "writer_id",
  onDelete: "CASCADE",
});

Post.belongsTo(Writer, {
  foreignKey: "writer_id",
});
Post.hasMany(Comment, {
  foreignKey: "post_id",
});
Comment.belongsTo(Writer, {
  foreignKey: "writer_id",
});

module.exports = { Writer, Post, Comment };
