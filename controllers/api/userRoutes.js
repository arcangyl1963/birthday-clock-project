const router = require("express").Router();
const User = require("../../models/User");
const Wishlist = require("../../models/Wishlist");

//this is the api/users endpoint

// create new user
// post should look lie this:
/*
 /* post should look like this...
   {
    "name": "Charlie Brown",
    "email": "cbrown@yahoo.com",
    "password": "password12345",
    "birthday": "06/13/62"
  }
  */
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all users amd their wishlist items api/users endpoint
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [{ model: Wishlist }],
    });
    if (!allUsers) {
      res.status(404).json({ message: "No uses exist" });
      return;
    }
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one user by id and include wishlist items. this is the api/users/:id endpoint
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Wishlist }],
    });
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect name or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
