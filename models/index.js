const Writer = require('./Writer');
const Post = require('./Post');

Writer.hasMany(Post, {
  foreignKey: 'writer_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(Writer, {
  foreignKey: 'writer_id'
});

module.exports = { Writer, Post};