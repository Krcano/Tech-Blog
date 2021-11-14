const sequelize = require('../config/connection');
const { Writer, Post } = require('../models');

const writerData = require('./writerData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const writers = await Writer.bulkCreate(writerData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      writer_id: writers[Math.floor(Math.random() * writers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();