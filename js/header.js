
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
                              <div class="btn-quantity light quantity-sm me-3">
                                 
                              </div>
                              <h6 class="dz-price text-primary mb-0">${cartItem.mrp}</h6>
                            </div>
                          </div>
                          <a href="javascript:void(0);" class="dz-close">
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
                          </div>
                          <a href="javascript:void(0);" class="dz-close">
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