const router = require('express').Router();
const writerRoutes = require('./writerRoutes');
const postRoutes = require('./postRoutes');

router.use('/writers', writerRoutes);
router.use('/posts', postRoutes);

module.exports = router;
