const wishlistFormHandler = async (event) => {
  event.preventDefault();

  // collect value from friend-form on getFriendWishlist.handlebars
  const friendEmail = document.querySelector("#friendEmail").value.trim();
  console.log(friendEmail + " is identified by handler");

  if (friendEmail) {
    // send a GET request to the friendFoundWishlist/friendName endpoint
    const response = await fetch(`/api/wishlist/friendFoundWishlist/${friendEmail}`, {
      method: "GET",
    });

    if (response.ok) {
      document.location.replace(`/api/wishlist/friendFoundWishlist/${friendEmail}`);
      console.log("Hi");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".friend-form")
  .addEventListener("submit", wishlistFormHandler);
