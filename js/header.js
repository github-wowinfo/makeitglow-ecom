
var token = localStorage.getItem("token");
// console.log('token', token);
if (token === null) {
  var dropdown = `
    <ul>
    <li><a href="./login.html">Login / Registration</a></li>
</ul>`
  $('#user-dropdown').append(dropdown)
} else {
  var dropdown = `
    <ul>
    <li><a href="./changepass.html">Change Password</a></li> 
    <li><a href="#/" onClick="logout()">Logout</a></li> 
</ul>`
  $('#user-dropdown').append(dropdown)
}

function logout() {
  window.location.href = "./login.html";
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('uid')
}

$.ajax({
  type: "GET",
  url: `${SETTINGS.backendUrl}/Masters/GetAllCategories`,
  dataType: "json",
  success: function (response) {
    let li = ``;
    $.each(response, function (index, value) {
      // console.log('response', value);
      li += `<li><a href="./products.html?catId=${value.catgEntryId}">${value.catgName}</a></li>`;
    });
    $('#categoryListing').append(li);
  }
});


// add to cart api . . . . 

$(document).ready(function () {
  // Fetch cart data from the API
  $.ajax({
    url: `${SETTINGS.backendUrl}/Ecom/GetCartByCustId`,
    method: 'GET',
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    },
    dataType: 'json',
    success: function (cartData) {
      // Assuming cartData is an array of items in the cart

      // Clear existing content
      // $('#shopping-cart-pane .sidebar-cart-list').empty();
      $('#cartCount').append(cartData.length)
      $('#cartCount1').append(cartData.length)
      // Update cart items
      cartData.forEach(function (cartItem) {
        console.log(cartItem);
        var cartItemHTML = `
          <li>
                        <div class="cart-widget">
                          <div class="dz-media me-3">
                            <img src="${cartItem.thumbnail}" alt="">
                          </div>
                          <div class="cart-content">
                            <h6 class="title"><a href="product-thumbnail.html">${cartItem.itemName}</a></h6>
                            <div class="d-flex align-items-center">
                            <h6 class="dz-price text-primary mb-0">${cartItem.mrp}</h6>
                             
                           </div>
                           <div class="btn-quantity light quantity-sm me-5 ">
                           <div class="input-group">
                           <button class="btn btn-primary btn-sm quantity-up" type="button">+</button>
                           <input type="text" class="form-control quantity-input" m-10 value="1">
                           <button class="btn btn-primary btn-sm quantity-down" type="button">-</button>
                           </div>
                            </div>
                          </div>
                          <a href="javascript:void(0);"  onclick="deleteCartItem(${cartItem.cartEntryId})" class="dz-close">
                            <i class="ti-close"></i>
                          </a>
                        </div>
                      </li>`;

        // Append the item to the cart list
        $('#cartItem').append(cartItemHTML);
      });

      // Calculate and update subtotal
      var subtotal = calculateSubtotal(cartData);
      $('#shopping-cart-pane .cart-total h5:last-child').text('$' + subtotal.toFixed(2));
    },
    error: function (error) {
      console.error('Error fetching cart data:', error);
    }
  });
});

// Function to calculate subtotal based on cart data
function calculateSubtotal(cartData) {
  var subtotal = 0;
  cartData.forEach(function (cartItem) {
    subtotal += cartItem.price;
  });
  return subtotal;
}

// Whish list api . . . . 

$(document).ready(function () {
    // Fetch cart data from the API
    $.ajax({
      url: `${SETTINGS.backendUrl}/Ecom/GetWishlistByCustId`,
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // Add other headers as needed
      },
      dataType: 'json',
      success: function (cartData) {
        // Assuming cartData is an array of items in the cart
  
        // Clear existing content
        // $('#shopping-cart-pane .sidebar-cart-list').empty();
        console.log('cartData', cartData.length);
      $('#whislistCount').append(cartData.length)
  
        // Update cart items
        cartData.forEach(function (whishlistItem) {
            console.log(whishlistItem);
          var cartItemHTML = `
                 <li>
                        <div class="cart-widget">
                          <div class="dz-media me-3">
                            <img src="${whishlistItem.mainImage1}" alt="${whishlistItem.itemName}">
                          </div>
                          <div class="cart-content">
                            <h6 class="title"><a href="product-thumbnail.html">${whishlistItem.itemName}</a></h6>
                            <div class="d-flex align-items-center">
                              <div class="btn-quantity light quantity-sm me-3">
                                 
                              </div>
                              <h6 class="dz-price text-primary mb-0">${whishlistItem.mrp}</h6>
                              
                              </div>
                              <a href="shop-cart.html" id="cart" class="btn btn-secondary p-0">ADD TO CART</a>
                          </div>
                          <a href="javascript:void(0);" onclick="deleteWishlistItem(${whishlistItem.wshLstEntryId})" class="dz-close">
                            <i class="ti-close"></i>
                          </a>
                        </div>
                      </li>`;
  
          // Append the item to the cart list
          $('#whishlistItem').append(cartItemHTML);
        });
  
        // Calculate and update subtotal
        var subtotal = calculateSubtotal(cartData);
        $('#shopping-cart-pane .cart-total h5:last-child').text('$' + subtotal.toFixed(2));
      },
      error: function (error) {
        console.error('Error fetching cart data:', error);
      }
    });
  });
  
  // Function to calculate subtotal based on cart data
  function calculateSubtotal(cartData) {
    var subtotal = 0;
    cartData.forEach(function (whishlistItem) {
      subtotal += whishlistItem.price;
    });
    return subtotal;
  }


  //   delete item api . . . 
// Assuming you have the cart item ID (replace '2' with the actual cart item ID)
// var cartItemId = 4;

// Use the deleteCartItem function to delete the item from the cart
function deleteCartItem(cartEntryId) {
  if (token === null) {
    window.location.href = "./login.html";
  } else {
    $.ajax({
      url: `${SETTINGS.backendUrl}/Ecom/DeleteCartItem?Id=${cartEntryId}`,
      type: "POST", // Use POST instead of DELETE
      headers: {
        Authorization: "Bearer " + token,
        // Add other headers as needed
      },
      data: {
        Id: cartEntryId,
      },
      success: function (response) {
        console.log("Item Deleted from Cart:", response);
        toastr.success("Item Deleted from Cart");
        // Optionally, you can update the UI or perform other actions after deletion
      },
      error: function (error) {
        console.log("Delete from Cart Error:", error);
        toastr.error(error.responseJSON.message);
      },
    });
  }
}

// Example of using the deleteCartItem function with the cart item ID
deleteCartItem(cartEntryId);


function deleteWishlistItem(wshLstEntryId) {
  if (token === null) {
    window.location.href = "./login.html";
  } else {
    $.ajax({
      url: `${SETTINGS.backendUrl}/Ecom/DeleteWishlistItem?Id=${wshLstEntryId}`,
      type: "POST", // Use POST instead of DELETE
      headers: {
        Authorization: "Bearer " + token,
        // Add other headers as needed
      },
      data: {
        Id: wshLstEntryId,
      },
      success: function (response) {
        console.log("Item Deleted from Wishlist:", response);
        toastr.success("Item Deleted from Wishlist");
        // Optionally, you can update the UI or perform other actions after deletion
      },
      error: function (error) {
        console.log("Delete from Wishlist Error:", error);
        toastr.error(error.responseJSON.message);
      },
    });
  }
}

// Example of using the deleteCartItem function with the cart item ID
deleteWishlistItem(wshLstEntryId);








// Assuming you have the wishlist item ID (replace '2' with the actual wishlist item ID)
// var wishlistItemId = 2;

// // Use the deleteWishlistItem function to delete the item from the wishlist
// function deleteWishlistItem(wshLstEntryId) {
//   if (token === null) {
//     window.location.href = "./login.html";
//   } else {
//     $.ajax({
//       url: `${SETTINGS.backendUrl}/Ecom/DeleteWishlistItem?Id=${wshLstEntryId}`,
//       type: "DELETE",
//       headers: {
//         Authorization: "Bearer " + token,
//         // Add other headers as needed
//       },
//       data: {
//         Id: wshLstEntryId,
//       },
//       success: function (response) {
//         console.log("Item Deleted from Wishlist:", response);
//         toastr.success("Item Deleted from Wishlist");
//         // Optionally, you can update the UI or perform other actions after deletion
//       },
//       error: function (error) {
//         console.log("Delete from Wishlist Error:", error);
//         toastr.error(error.responseJSON.title);
//       },
//     });
//   }
// }

// // Example of using the deleteWishlistItem function with the wishlist item ID
// deleteWishlistItem(wshLstEntryId);
