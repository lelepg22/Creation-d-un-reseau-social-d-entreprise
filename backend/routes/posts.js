const express = require('express');
const parser = require('body-parser');
const posts_ctrl = require('../controller/posts')
const auth = require('../middleware/auth');



const router = express.Router();

router.use(posts_ctrl.headers);


router.post('/deleteAcc', posts_ctrl.deleteAcc)
router.post('/deleteThisPost', posts_ctrl.deleteThisPost)
router.post('/getMePosts', posts_ctrl.getMePosts)
router.post('/postById', posts_ctrl.postById)
router.post('/getCommented', posts_ctrl.getCommented)
router.post('/changeUtil', posts_ctrl.changeUtilisateur)
router.post('/changeMdp', posts_ctrl.changeMdp)
router.post('/getComments',posts_ctrl.getComments)
router.post('/commenterPost',posts_ctrl.commenterPost)
router.post('/openPost', posts_ctrl.openPost)
router.get('/posts',posts_ctrl.getPosts)
router.get('/users', posts_ctrl.getUsers)
router.post('/createPost',auth, posts_ctrl.createPost)
router.post('/ByUser', posts_ctrl.ByUser)






module.exports = router;