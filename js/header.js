
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


function getCart() {
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
                            <h6 class="dz-price text-primary mb-0">${cartItem.mrp}AED</h6>
                             
                            <div class="btn-quantity light quantity-sm me-5 ">
                             
                             <div class="input-group bootstrap-touchspin ms-5">
                             <span class="input-group-addon bootstrap-touchspin-prefix" style="display: none;"></span>
                             <input type="text" value="1" name="demo_vertical2" class="form-control" style="display: block;">
                             <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;"></span>
                             <span class="input-group-btn-vertical">
                             <button class="btn btn-default bootstrap-touchspin-up" type="button">
                             <i class="fa-solid fa-plus"></i></button>
                             <button class="btn btn-default bootstrap-touchspin-down" type="button">
                             <i class="fa-solid fa-minus"></i></button></span>
                             </div>
                            
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
      // handleBootstrapTouchSpin();
    },
    error: function (error) {
      console.error('Error fetching cart data:', error);
    }
  });
}

// Function to calculate subtotal based on cart data
function calculateSubtotal(cartData) {
  var subtotal = 0;
  cartData.forEach(function (cartItem) {
    subtotal += cartItem.price;
  });
  return subtotal;
}

// Whish list api . . . . 

// $(document).ready(function () {
// Fetch cart data from the API
function getWhishlist() {
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
        console.log("my whishes " ,whishlistItem);
        var cartItemHTML = `
                   <li>
                          <div class="cart-widget">
                            <div class="dz-media me-3">
                              <img src="${whishlistItem.mainImage1}" alt="${whishlistItem.itemName}">
                            </div>
                            <div class="cart-content">
                              <h6 class="title"><a href="product-thumbnail.html">${whishlistItem.itemName}</a></h6>
                              <div class="d-flex align-items-center">
                         
                                <h6 class="dz-price text-primary mb-0">${whishlistItem.mrp}AED</h6>
                                
                                <a href="/" id="cart" class="btn btn-secondary p-1 ms-4" id="addToCartButton" onclick="addToCart(${whishlistItem.vrntEntryId})">ADD TO CART</a>
                                </div>
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
}
// });

// Function to calculate subtotal based on cart data
function calculateSubtotal(cartData) {
  var subtotal = 0;
  cartData.forEach(function (whishlistItem) {
    subtotal += whishlistItem.price;
  });
  return subtotal;
}
$(document).ready(function () {
  // Fetch cart data from the API
  getCart()
  getWhishlist()
});

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
        // toastr.success("Item Added to Cart");
        getCart()
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
// deleteCartItem(cartEntryId);


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
        getWhishlist()
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
// deleteWishlistItem(wshLstEntryId);


function addToCart(id) {
  // Assuming variantId and quantity are defined somewhere in your code
  // var variantId = '';
  var quantity = '1';

  var obj = {
    "itmVrntId": id,
    "qty": quantity
  };

  if (token === null) {
    window.location.href = "./login.html";
  } else {
    $.ajax({
      url: `${SETTINGS.backendUrl}/Ecom/AddToCart`,
      type: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // Add other headers as needed
      },
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(obj),
      success: function (response) {
        console.log("Sign In Success:", response);
        toastr.success("Item Added to Cart");
      },
      error: function (error) {
        console.log("Sign in Error:", error);
        toastr.error(error.responseJSON.title);
      },
    });
  }
}

var handleBootstrapTouchSpin = function () {
  if ($("input[name='demo_vertical2']").length > 0) {
    jQuery("input[name='demo_vertical2']").TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'fa-solid fa-plus',
      verticaldownclass: 'fa-solid fa-minus'
    });
  }
  if ($(".quantity-input").length > 0) {
    jQuery(".quantity-input").TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'fa-solid fa-plus',
      verticaldownclass: 'fa-solid fa-minus'
    });
  }
}
// Assuming you have already initialized the TouchSpin library

$(document).ready(function () {
  // Initialize TouchSpin
  handleBootstrapTouchSpin();
  // Add event listener for quantity input change
});

// Function to update the displayed price on the page
function updateDisplayedPrice(price) {
  console.log("Total Price: $", + price)
  // Assuming you have an element to display the price with id="displayedPrice"
  $("#total").text("Total Price: $" + price);
  handleBootstrapTouchSpin()
}




/* <div class="input-group">
<button class="btn btn-primary btn-sm quantity-up" type="button">+</button>
<input type="text" class="form-control quantity-input" m-10 value="1">
<button class="btn btn-primary btn-sm quantity-down" type="button">-</button>
</div> */
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
