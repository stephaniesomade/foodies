const express = require("express");
const router = express.Router();

const PostsController = require('../controllers/posts')

router.get('/', PostsController.Index)
router.post('/:meal', PostsController.Comment)

module.exports = router;