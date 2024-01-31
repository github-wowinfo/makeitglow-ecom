
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

  if (token === null) {
    // If not logged in, set cart count to 0 and return
    $('#cartCount').text(0);
    $('#cartCount1').text(0);
    return;
  }

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
      console.log('cartData.length', cartData);
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
                <img src="${SETTINGS.ImageUrl}${cartItem.thumbnail}" alt="">
              </div>
              <div class="cart-content">
                <h6 class="title"><a href="product-thumbnail.html">${cartItem.itemName}</a></h6>
                <div class="d-flex align-items-center">
                  <h6 class="dz-price text-primary mb-0">${cartItem.mrp}AED</h6>
                  <div class="btn-quantity light quantity-sm ms-5">
    <div class="input-group bootstrap-touchspin">
        <span class="input-group-addon bootstrap-touchspin-prefix" style="display: none;"></span>
        <input type="text" value="${cartItem.qty}" id="quantity_${cartItem.itmVrntId}" name="demo_vertical2" class="form-control" style="display: block;">

        <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;"></span>
        <span class="input-group-btn-vertical">
            <button class="btn btn-default bootstrap-touchspin-up" type="button" onclick="updateQuantity(${cartItem.itmVrntId}, 'increase',${cartItem.qty},'${encodeURIComponent(JSON.stringify(cartData))}')">
                <i class="fa-solid fa-plus"></i>
            </button>
            <button class="btn btn-default bootstrap-touchspin-down" type="button" onclick="updateQuantity(${cartItem.itmVrntId}, 'decrease',${cartItem.qty},'${encodeURIComponent(JSON.stringify(cartData))}')">
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
                                
                                <a href="/" id="cart" class="btn btn-secondary p-1 ms-4 rounded" id="addToCartButton" onclick="addToCart(${whishlistItem.itmVrntId})">ADD TO CART</a>
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

function calculateSubtotal1(cartData) {
  var subtotal = 0;

  cartData.forEach(function (amount) {
    // Assuming "mrp" is the key for the Manufacturer's Recommended Price
    var mrp = parseFloat(amount.mrp * amount.qty);
    subtotal += mrp;
  });

  return subtotal;
}

$(document).ready(function () {
  // Fetch cart data from the API
  getCart()
  getWhishlist()
});

//   delete item api . . . 

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

function addToCart(id) {

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

function updateQuantity(id, action, quantity) {
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
  // Update subtotal
  var subtotal1 = calculateSubtotal1(cartData);
  $('#shopping-cart-pane .cart-total h5:last-child').text(subtotal1.toFixed(2) + 'AED');


  if (token === null) {
    window.location.href = "./login.html";
  } else {
    $.ajax({
      url: `${SETTINGS.backendUrl}/Ecom/AddToCart`,
      type: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
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

$(document).ready(function () {
  handleBootstrapTouchSpin();
});

function updateDisplayedPrice(price) {
  $("#total").text("Total Price: AED" + price);
  handleBootstrapTouchSpin()
}




