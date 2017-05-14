 import Post from '../models/post_model';

 // this cleans the posts because we use id instead of dangling _id
 // and we purposefully don't return content here either
 const cleanPosts = (posts) => {
   return posts.map((post) => {
     return { id: post._id, author: post.author, title: post.title, tags: post.tags, cover_url: post.cover_url };
   });
 };

 export const createPost = (req, res) => {
   const post = new Post();
   post.title = req.body.title;
   post.content = req.body.content;
   post.tags = req.body.tags;
   post.cover_url = req.body.cover_url;
   post.author = req.user._id; // user.id
   post.save()
   .then((result) => {
     res.json({ message: 'Post created!' });
   })
   .catch((error) => {
     res.status(500).json({ error });
   });
 };

 export const getPosts = (req, res) => {
   Post
    .find({})
      .populate('author')
      .exec((err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
        res.send(cleanPosts(data));
      });
 };

 export const getPost = (req, res) => {
   Post.findById(req.params.id).then((post) => {
     res.send(post);
   });
 };

 export const deletePost = (req, res) => {
   Post.remove({ _id: req.params.id }).then((result) => {
     res.sendStatus(200);
   }).catch((error) => {
     res.status(500).send(error);
   });
 };

 export const updatePost = (req, res) => {
   Post.findById(req.params.id).then((post) => {
     console.log(req.body);
     post.title = (req.body.title) ? req.body.title : post.title;
     post.content = (req.body.content) ? req.body.content : post.content;
     post.tags = (req.body.tags) ? req.body.tags : post.tags;
     post.cover_url = (req.body.cover_url) ? req.body.cover_url : post.cover_url;
     post.save()
     .then((result) => {
       console.log(result);
       res.json(result);
     })
     .catch((error) => {
       res.status(500).json({ error });
     });
   });
 };
