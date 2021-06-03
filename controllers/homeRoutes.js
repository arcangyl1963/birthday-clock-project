const router = require("express").Router();
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("homepage");
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// renders addWishlistItem.handlebars.  this is the /post route
router.get("/post", (req, res) => {
  res.render("addWishlistItem");
});

// renders userWishlist.handlebars using current session user ID.  this is the /wishlist route
router.get("/wishlist", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Wishlist }],
    });
    const user = userData.get({ plain: true });

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    console.log(user);
    res.render("userWishlist", { ...user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders getFriendWishlist.handlebars.  Is used for selecting a friend's wishlist.  this is the /friendWishlist route
router.get("/friendWishlist", (req, res) => {
  res.render("getFriendWishlist");
});



module.exports = router;
