import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// your routes will go here

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get((req, res) => {
    Posts.getPosts(req, res);
  });

router.route('/posts/:id')
  .get((req, res) => {
    Posts.getPost(req, res);
  })
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

export default router;
