const router = require("express").Router();
const { Wishlist } = require("../../models");
const { User } = require("../../models");

//this is the api/wishlist endpoint

// get all wishlist and return as JSON payload
router.get("/", async (req, res) => {
  const allWishlist = await Wishlist.findAll().catch((err) => {
    res.json(err);
  });
  res.json(allWishlist);
});


// post a new wishlist item to the database
// this is the api/wishlist/ endpoint
/* post should look like this...
    {
        "wishlistEntry": "Super Soaker Extreme"
    }
    */
router.post("/", async (req, res) => {
  console.log(req.session)
  try {
    const wishlistEntry = await Wishlist.create({
      user_id: req.session.user_id,
      wishlist_text: req.body.wishlistEntry
    });
    res.status(200).json(wishlistEntry);
    console.log(wishlistEntry + " router post")
  } catch (err) {
    res.status(400).json(err);
    
  }
});

router.get('/:id', async (req, res) => {
  try {
    const editWishItem = await Wishlist.findByPk(req.params.id);
    if (editWishItem) {
      const item = editWishItem.wishlist_text;
      const wishId = editWishItem.id;
      const usrID = editWishItem.user_id;
      res.render('wishlistUpdate', {
        layout: 'main',
        item,
        wishId,
        usrID,
      });
    } else {
      res.status(404).end();
    }
  } catch (err)  {
    console.log(err);
      res.redirect('/wishlist');
  }
});


// update a wishlist by id and return updated wishlist as JSON payload.  this is the /api/wishlist/:id route
/* put should look like this...
      {
        "id": "6",
        "wishlist_text": "Volleyball"
      }
    */
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Wishlist.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedRows > 0) {
       res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a wishlist by its `id` value.  this is the /api/wishlist/:id route
router.delete("/:id", async (req, res) => {
  try {
    const [deletedRows] = await Wishlist.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedRows > 0) {
      res.status(200).end();
    } else {
    res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// renders userWishlist.handlebars using friend's name.  this is the api/wishlist/friendFoundWishlist route
router.get("/friendFoundWishlist/:friendEmail", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.params.friendEmail },
      include: [{ model: Wishlist }],
    });

    const user = userData.get({ plain: true });

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }

    res.render("userWishlist", { ...user });
  } catch (err) {
    // res.status(500).json(err);
    res.status(500).json("Ouch");
  }
});

router.get("/updateWishlist", (req, res) => {
  res.render("wishlistUpdate");
});





module.exports = router;