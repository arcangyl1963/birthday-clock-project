const userWishlistHandler = async (event) => {
  event.preventDefault();
  const wishlistEntry = document.querySelector("#wishlistEntry").value.trim();
  // code to get wishlist from form
  if (wishlistEntry) {
    const response = await fetch('./api/wishlist', {
      method: 'POST',
      body: JSON.stringify({ wishlistEntry }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to post.");
    }

    if (response.ok) {console.log("HI"), console.log(wishlistEntry + "  postToWishlist.js");
    } else {
      alert("Failed to post.");
    }
  } 
};

document
  .querySelector(".post-form")
  .addEventListener("submit", userWishlistHandler);