const Writer = require('./Writer');
const Posts = require('./Post');

Writer.hasMany(Posts, {
  foreignKey: 'writer_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(Writer, {
  foreignKey: 'writer_id'
});

module.exports = { Writer, Posts};