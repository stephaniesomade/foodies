const express = require("express");
const router = express.Router();

const PostsController = require('../controllers/posts')

router.get('/', PostsController.Index)
router.post('/comments/:postid/:meal', PostsController.Comment)
router.post('/:meal', PostsController.New)
router.get('/get/:name', PostsController.View)

module.exports = router;