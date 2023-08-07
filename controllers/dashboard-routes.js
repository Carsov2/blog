const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// gets all posts and renders them to the dashboard layout
router.get('/', withAuth, async (req, res) => {
  try {
    // get all posts based on user id
    const postData = await Post.findAll({
      where: {userId: req.session.user_id}
    });
    // convert to plain data
    const posts = postData.map((post) => {
      return post.get({ plain: true });
    });

    // render dashboard page with posts
    res.render('all-posts-admin', {posts, loggedIn: req.session.loggedIn, layout: 'dashboard'});


  } catch (err) {
    res.redirect('login');
  }
});
// new post route
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});
// edit post based on post id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    //Find a Post by primary key
    const postData = await Post.findByPk(req.params.id);

    //Serialize data (use .get() method, or use raw: true, nest: true in query options)
    const post = postData.get({ plain: true });

    //Render the 'edit-post' template in the 'dashboard' layout with the post data
    res.render('edit-post', {post, layout: 'dashboard'});


  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
