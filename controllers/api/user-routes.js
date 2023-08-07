const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    //save the user id, username, and loggedIn status to the req.session
    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.status(200).json(newUser.username);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    //save the user id, username, and loggedIn status to the req.session
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.status(200).json({ user, message: 'You are now logged in.'});
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;