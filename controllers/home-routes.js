const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const formatHelper = require('../utils/helpers');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    //Find all Posts and associated Users
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    //Serialize data (use .get() method, or use raw: true, nest: true in query options)
    const post = postData.map((post) => {
      return post.get({ plain: true });
    });

    //Render the 'all-posts' template with the posts data
    res.render('all-posts', { post, loggedIn: req.session.loggedIn});
    

  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    //Find a single Post by primary key and include associated User and Comments (Comment will also need to include a User)
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ]
    });

    //Serialize data (use .get() method, or use raw: true, nest: true in query options)
    const post = postData.get({ plain: true });
    

    //Render the 'single-post' template with the post data
    res.render('single-post', {post, loggedIn: req.session.loggedIn});

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
