
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
    <li><a href="./account.html">Account</a></li> 
    <li><a href="./OrderTracking.html">Order Tracking</a></li> 
    <li><a href="./changepass.html">Change Password</a></li> 
    <li><a href="#/" onClick="logout()">Logout</a></li> 
</ul>`
  $('#user-dropdown').append(dropdown)
}

// console.log('header');

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

let quantity = 1

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
      var subtotal1 = calculateSubtotal1(cartData);
      $('#shopping-cart-pane .cart-total h5:last-child').text(subtotal1.toFixed(2) + 'AED');
      console.log('cartData.length', cartData.length);
      // Clear existing content
      $('#cartItem').empty();
      $('#cartCount').text(cartData.length);
      $('#cartCount1').text(cartData.length);

      // Update cart items
      cartData.forEach(function (cartItem) {
        // console.log('cartitem', cartItem);
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
                  <div class="btn-quantity light quantity-sm ms-5">
    <div class="input-group bootstrap-touchspin">
        <span class="input-group-addon bootstrap-touchspin-prefix" style="display: none;"></span>
        <input type="text" value="${cartItem.qty}" name="demo_vertical2" class="form-control" style="display: block;">
        <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;"></span>
        <span class="input-group-btn-vertical">
            <button class="btn btn-default bootstrap-touchspin-up" type="button" onclick="updateQuantity(${cartItem.itmVrntId}, 'increase',${cartItem.qty})">
                <i class="fa-solid fa-plus"></i>
            </button>
            <button class="btn btn-default bootstrap-touchspin-down" type="button" onclick="updateQuantity(${cartItem.itmVrntId}, 'decrease',${cartItem.qty})">
                <i class="fa-solid fa-minus"></i>
            </button>
        </span>
    </div>
</div>

                </div>
              </div>
              <a href="javascript:void(0);" onclick="deleteCartItem(${cartItem.cartEntryId})" class="dz-close">
                <i class="ti-trash"></i>
              </a>
            </div>
          </li>`;

        // Append the item to the cart list
        $('#cartItem').append(cartItemHTML);
      });

      // Calculate and update total amount
      var totalAmount = calculateTotalAmount(cartItem);
      $('.totalamount').text('AED', + totalAmount.toFixed(2));
    },

    error: function (error) {
      console.error('Error fetching cart data:', error);
    },
  });
}

// Function to calculate total amount based on cart data
function calculateTotalAmount(cartItem) {
  var totalAmount = 0;
  cartItem.forEach(function (cartItem) {
    // totalAmount += cartItem.vrnts[0].sellingPrice.mrp* cartItem.quantity;
    totalAmount += cartItem.mrp * cartItem.quantity;

  });
  return totalAmount;
}

// Function to increase quantity
function increaseQuantity(cartEntryId) {
  var quantityInput = $(`input[name='demo_vertical2'][data-cart-entry-id='${cartEntryId}']`);
  var currentQuantity = parseInt(quantityInput.val());
  quantityInput.val(currentQuantity + 1);
  updateTotalAmount();
}

// Function to decrease quantity
function decreaseQuantity(cartEntryId) {
  var quantityInput = $(`input[name='demo_vertical2'][data-cart-entry-id='${cartEntryId}']`);
  var currentQuantity = parseInt(quantityInput.val());
  if (currentQuantity > 1) {
    quantityInput.val(currentQuantity - 1);
    updateTotalAmount();
  }
}

// Function to update total amount based on quantity changes
function updateTotalAmount() {
  var cartData = getCartDataFromDOM(); // Implement this function to retrieve cart data from the DOM
  var totalAmount = calculateTotalAmount(cartData);
  $('.totalamount').text('AED', + totalAmount.toFixed(2));
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
      // console.log('cartData', cartData.length);
      $('#whislistCount').append(cartData.length)

      // Update cart items
      cartData.forEach(function (whishlistItem) {
        // console.log("my whishes ", whishlistItem);
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
                                
                                <a href="/" id="cart" class="btn btn-secondary p-1 ms-4" id="addToCartButton" onclick="addToCart(${whishlistItem.itmVrntId})">ADD TO CART</a>
                                </div>
                            </div>
                            <a href="javascript:void(0);" onclick="deleteWishlistItem(${whishlistItem.wshLstEntryId})" class="dz-close">
                            <i class="ti-trash"></i>
                            </a>
                          </div>
                        </li>`;

        // Append the item to the cart list
        $('#whishlistItem').append(cartItemHTML);
      });

      // Calculate and update subtotal

    },
    error: function (error) {
      console.error('Error fetching cart data:', error);
    }
  });
}
// });

// Function to calculate subtotal based on cart data
function calculateSubtotal1(cartData) {
  var subtotal1 = 0;

  cartData.forEach(function (amount) {
    // Assuming "mrp" is the key for the Manufacturer's Recommended Price
    var mrp = parseFloat(amount.mrp * amount.qty);
    subtotal1 += mrp;
  });

  return subtotal1;
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
        // console.log("Item Deleted from Cart:", response);
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
      // data: {
      //   Id: wshLstEntryId,
      // },
      success: function (response) {
        // console.log("Item Deleted from Wishlist:", response);
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
  // console.log(obj)

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
        // console.log("Sign In Success:", response);
        toastr.success("Item Added to Cart");
        // deleteWishlistItem(wishlistItemId);

      },
      error: function (error) {
        console.log("Sign in Error:", error);
        toastr.error(error.responseJSON.title);
      },
    });
  }
}

function updateQuantity(id, action, quantity) {
  // Assuming variantId and quantity are defined somewhere in your code
  // var variantId = '';

  // var currentQuantity = parseInt($(`input[name='demo_vertical2'][value='${quantity}']`).val());
  var inputField = $(`input[name='demo_vertical2'][value='${quantity}']`);
  var currentQuantity = parseInt(inputField.val());


  if (action === 'increase') {
    currentQuantity += 1;
  } else if (action === 'decrease' && currentQuantity > 1) {
    currentQuantity -= 1;
  }

  var obj = {
    "itmVrntId": id,
    "qty": currentQuantity.toString()
  };
  inputField.val(currentQuantity);
  // var quantity = '1';

  // var obj = {
  //   "itmVrntId": id,
  //   "qty": quantity
  // };
  // console.log(obj)

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
        // console.log("Sign In Success:", response);
        toastr.success("Item Added to Cart");
        // deleteWishlistItem(wishlistItemId);

      },
      error: function (error) {
        console.log("Sign in Error:", error);
        toastr.error(error.responseJSON.title);
      },
    });
  }
}
// function deleteWishlistItem(wishlistItemId) {
//   // Implement the logic to delete the wishlist item using its ID
//   // You can use another AJAX call to the backend to delete the item
//   $.ajax({
//     url: `${SETTINGS.backendUrl}/Ecom/DeleteWishlistItem/${wishlistItemId}`,
//     method: 'DELETE',
//     headers: {
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json",
//       // Add other headers as needed
//     },
//     success: function (response) {
//       // console.log("Delete Wishlist Item Success:", response);
//       toastr.success("Item Removed from Wishlist");

//       // Refresh the wishlist after removing an item
//       getWhishlist();
//     },
//     error: function (error) {
//       console.error('Error deleting wishlist item:', error);
//       toastr.error(error.responseJSON.title);
//     }
//   });
// }



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
  // console.log("Total Price: $", + price)
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
