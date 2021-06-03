const wishlistID = document.querySelector('input[name="item-id"]').value;
console.log('The ID is '+ wishlistID)
const updateWishlistHandler = async (event) => {
    event.preventDefault();

    const wishlist_text = document.querySelector('textarea[name="wishlist-text"]').value.trim();
    const userId = document.querySelector('input[name="user-id"]').value;
    // code to get wishlist from form

    await fetch(`/api/wishlist/${wishlistID}`, {
        method: 'PUT',
        body: JSON.stringify({
          wishlist_text,
          userId,
        }),
        headers: { "Content-Type": "application/json" },
      });
        document.location.replace('/wishlist');
      };
  
const deleteWishlistItemHandler = async function () {
  await fetch(`/api/wishlist/${wishlistID}`, {
    method: 'DELETE',
  });
  document.location.replace('/wishlist');
};
  
  document.querySelector("#edit-wishlist-form").addEventListener("submit", updateWishlistHandler);
  document.querySelector("#delete-item-btn").addEventListener("click", deleteWishlistItemHandler);