let cartCount = ''
let productCount = ''
let subtotal = 0
var shipping = 12;
let shippingId = 0;


if (token === null ) {
  console.log('cart empty hidden');
  $('#shop-checkout').hide();
}
else {
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
      cartCount === cartData.length
      console.log(cartData.length === 0);
      // Update cart items
  
      if (cartData.length === 0 ) {
        $('#shop-checkout').css('display', 'none')
        console.log('cart empty hidden');
      }
      else {
        $('#empty').hide();
        // Hide the form and show other elements if needed
        $('#shop-checkout').css('display', 'flex')
        console.log('cart empty hidden1');
      }
  
    },
  
    error: function (error) {
      console.error('Error fetching cart data:', error);
    },
  });
  console.log('cart empty hidden1');
}



console.log('cartCount', cartCount);
function cartData() {

}

function getCartCheckout() {
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
      // console.log(cartData);
      productCount = cartData.length
      subtotal = calculateSubtotal(cartData);

      if (subtotal >= 100) {
        // Set shipping to 0 if subtotal is greater than or equal to 100
        shipping = 0;
      } else {
        // Set shipping to 12 if subtotal is less than 100
        shipping = 12;
      }

      // Update shipping charge display
      $('#shippingcharge').text(shipping + 'AED');

      // Calculate total amount including shipping
      var totalAmount = subtotal + shipping;

      // Update total and final total display
      $('#total').text(subtotal.toFixed(2) + 'AED');
      $('#finalTotal').text(totalAmount.toFixed(2) + 'AED');

 
      // Clear existing content
      $('#cartData').empty();
      //       $('#cartCount').text(cartData.length);
      //       $('#cartCount1').text(cartData.length);

      //       // Update cart items
      cartData.forEach(function (cartItem) {
        // console.log('cartitem', cartItem);
        var cartItemHTML = `
        <div class="cart-item style-1" >
        <div class="dz-media">
        <img src="${SETTINGS.ImageUrl}${cartItem.thumbnail}" alt="">
      </div>
      <div class="dz-content">
        <div>
        <h6 class="title mb-0">${cartItem.itemName}</h6>
        <p>Qty: ${cartItem.qty}</p>
        </div>
        <span class="price">${cartItem.mrp}</span>
      </div>
									</div>
              `;

        // Append the item to the cart list
        $('#cartData').append(cartItemHTML);
      });

      //       // Calculate and update total amount
      //       var totalAmount = calculateTotalAmount(cartItem);
      //       $('.totalamount').text('$' + totalAmount.toFixed(2));
    },
    error: function (error) {
      console.error('Error fetching cart data:', error);
    }
  });
}

function calculateSubtotal(cartData) {
  var subtotal = 0;

  cartData.forEach(function (amount) {
    // Assuming "mrp" is the key for the Manufacturer's Recommended Price
    var mrp = parseFloat(amount.mrp * amount.qty);
    subtotal += mrp;
  });

  return subtotal;
}

function getshippinginfo() {
  $.ajax({
    url: `${SETTINGS.backendUrl}/CustomerAccount/GetAllCustShippingAddresses`,
    method: 'GET',
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    },
    dataType: 'json',
    success: function (profileData) {
      let li = `<option value="">Select Shipping Address</option>`;
      $.each(profileData, function (index, value) {
        li += `<option value="${value.csaEntryId}">${value.name} (${value.addressLine1})</option>`;
      });
      li += `<option value="newAddress" style='color: black !important;  ' >Add New Address</option>`;
      $('#shippingAddress').html(li); // Use html() instead of append() to replace existing options

      $('#shippingAddress').on('change', function () {
        var selectedValue = $(this).val();
        if (selectedValue === "newAddress") {
          addnewaddress();
        }
        else {
          // Hide the form and show other elements if needed
          $('#showForm').hide();
          console.log('Form hidden');
          shippingId = $(this).val()
        }
      });

      // Append the form dynamically
      let shippingForm = `
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h2 class="mb-3">Shipping Info</h2>
              <p class="m-1">CUSTOMER ID : <span class="text-black" id="customerId"> </span></p>
              <p class="m-1"> <span class="text-black" id="customerName"> </span></p>
              <p class="m-1"> <span class="text-black" id="contactNo"> </span></p>
              <p class="m-1"> <span class="text-black" id="altContactNo"> </span></p>
              <p class="m-1"> <span class="text-black" id="addressLine1"> </span></p>
              <p class="m-1"> <span class="text-black" id="addressLine2"> </span></p>
              <p class="m-1"> <span class="text-black" id="remark"> </span></p>
            </div>
          </div>
        </div>
        
      `;

      // Replace the content of #shippinginfo instead of appending
      $('#shippinginfo').html(shippingForm);
      // Hide the form initially
      $('#shippinginfo').hide();
      // $('shippingForm').hide();

      $('#shippingAddress').on('change', function () {
        var shippingId = $(this).val();

        if (shippingId === "newAddress") {
          // Show the shipping form when "Add New Address" is selected
          // $('#shippingForm').show();
          // Hide the shipping info
          $('#shippinginfo').hide();
        } else if (shippingId !== "") {
          var selectedShipping = profileData.find(function (item) {
            return item.csaEntryId == shippingId;
          });

          $('#customerId').text(selectedShipping.custId);
          $('#customerName').text(selectedShipping.name);
          $('#contactNo').text(selectedShipping.contactNo);
          $('#altContactNo').text(selectedShipping.altContactNo);
          $('#addressLine1').text(selectedShipping.addressLine1);
          $('#addressLine2').text(selectedShipping.addressLine2);
          $('#remark').text(selectedShipping.remark);

          var selectedData = {
            // Populate the shipping info with the selected shipping address data
            'customerId': selectedShipping.custId,
            'customerName': selectedShipping.name,
            'contactNo': selectedShipping.contactNo,
            'altContactNo': selectedShipping.altContactNo,
            'addressLine1': selectedShipping.addressLine1,
            'addressLine2': selectedShipping.addressLine2,
            'remark': selectedShipping.remark
          };

          // Show the shipping info
          $('#shippinginfo').show();
          // Hide the shipping form
          $('#shippingForm').hide();
        } else {
          // Clear the form fields when no address is selected
          $('#customerId, #customerName, #contactNo, #altContactNo, #addressLine1, #addressLine2, #remark').text("");

          // Show the shipping info when no address is selected
          $('#shippinginfo').show();
          // Hide the shipping form when no address is selected
          $('#shippingForm').hide();
        }
        console.log(selectedData);
      });
    },
    error: function (error) {
      console.error('Error fetching cart data:', error);
    }
  });
}

function addnewaddress() {
  $('#showForm').css('display', 'block')
}

function getLocation() {
  $('#locationSelection').empty();
  $.ajax({
    url: `${SETTINGS.backendUrl}/Masters/GetAllLocations`,
    method: 'GET',
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    },
    dataType: 'json',
    success: function (profileData) {
      // profileData.forEach(function (shipping) {
      //   console.log('shipping', shipping);
      let li = `<option value="">Select Location</option>`
      $.each(profileData, function (index, value) {
        li += `<option value="${value.lEntryId}">${value.locationName}</option>`
      });
      $('#locationSelection').append(li);

      // })


    },
    error: function (error) {
      console.error('Error fetching cart data:', error);
    }
  });
}

shippingId = document.getElementById("shippingAddress").value;


document.getElementById("saveshippinginfo").addEventListener("click", function (e) {
  e.preventDefault()
  // function addshippingAddress() {
  const Name = document.getElementById("name").value;
  const ContactNo = document.getElementById("contactNum").value;
  const AltContactNo = document.getElementById("altcontactNum").value;
  const Address1 = document.getElementById("addresses1").value;
  const Address2 = document.getElementById("addresses2").value;
  const CountrySelect = document.getElementById("locationSelection").value;
  const Remark = document.getElementById("remark").value;

  var userData = {
    "userType": 2,
    "name": Name,
    "contactNo": ContactNo,
    "altContactNo": AltContactNo,
    "addressLine1": Address1,
    "addressLine2": Address2,
    "lctnId": CountrySelect,
    "remark": Remark,
  };

  console.log('userData :', userData);
  $.ajax({
    url: `${SETTINGS.backendUrl}/CustomerAccount/AddCustShippingAddress`,
    method: 'POST',  // Assuming this should be a POST request, change it if necessary
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    },
    data: JSON.stringify(userData), // Convert object to JSON string
    success: function (response) {
      console.log('response', response.data);
      shippingId = response.data
      // console.log('Billing address added successfully:', response);
      toastr.success("Shipping address added successfully ");
      getshippinginfo()
      // You may want to update the UI or perform other actions here
      // $("#saveshippinginfo").modal("hide");
      // location.reload()

    },
    error: function (error) {
      console.error('Error adding shipping address:', error.responseJSON.title);
      // Handle error response
      toastr.error(error.responseJSON.title);

    }
  });

  // }
})

console.log('shippingId', shippingId);
$(document).ready(function () {
  // Check the checkbox state on page load
  if ($('#basic_checkbox_3').is(':checked') && shippingId !== 0) {
    // Checkbox is checked, enable the button
    $('#placeorder').prop('disabled', false);
  } else {
    // Checkbox is not checked, disable the button
    $('#placeorder').prop('disabled', true);
  }

  // Attach an event listener to the checkbox for future changes
  $('#basic_checkbox_3').on('change', function () {
    // Check if the checkbox is checked
    if ($(this).is(':checked') && shippingId !== 0) {
      // Checkbox is checked, enable the button
      $('#placeorder').prop('disabled', false);
    } else {
      // Checkbox is not checked, disable the button
      $('#placeorder').prop('disabled', true);
    }
  });
});

document.getElementById("placeorder").addEventListener("click", function (e) {
  console.log();
  console.log('response', shippingId);
  e.preventDefault()
  var selectedAccordion = document.querySelector('input[name="flexRadioDefault"]:checked');
  if (selectedAccordion.id === 'flexRadioDefault4') {
    var userData = {
      "shippingId": shippingId,
      "productsQty": productCount,
      "subTotal": subtotal,
      "shippingCharges": shipping,
      "totalAmount": (subtotal + shipping) * 100,
      "paidAmount": (subtotal + shipping) * 100,
      "remark": "",
      "isGiftOrder": false,
      "type": 1
    };

    console.log('userdata', userData);
    $.ajax({
      url: `${SETTINGS.backendUrl}/Order/PlaceOrderWithOnline`,
      method: 'POST',  // Assuming this should be a POST request, change it if necessary
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // Add other headers as needed
      },
      data: JSON.stringify(userData), // Convert object to JSON string
      success: function (response) {
        console.log('response', response);
        // console.log('Billing address added successfully:', response);
        toastr.success("Order Placed ");
        if (response.paymentLink) {
          // Redirect to the payment link
          window.location.href = response.paymentLink;
        } else {
          toastr.error("Error: Payment link not found in the response.");
        }
        // getshippinginfo()
        // You may want to update the UI or perform other actions here
        // $("#saveshippinginfo").modal("hide");
        // location.reload()

      },
      error: function (error) {
        console.error('Error adding shipping address:', error);
        // Handle error response
        toastr.error('not found', error);

      }
    });


  } else {
    var userData = {
      "shippingId": shippingId,
      "productsQty": productCount,
      "subTotal": subtotal,
      "shippingCharges": shipping,
      "totalAmount": (subtotal + shipping) * 100,
      "paidAmount": 0,
      "remark": "",
      "isGiftOrder": false,
      "type": 1

    };

    $.ajax({
      url: `${SETTINGS.backendUrl}/Order/PlaceOrderWithCOD`,
      method: 'POST',  // Assuming this should be a POST request, change it if necessary
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // Add other headers as needed
      },
      data: JSON.stringify(userData), // Convert object to JSON string
      success: function (response) {
        console.log('response', response);
        // console.log('Billing address added successfully:', response);
        toastr.success("Order Placed COD ");
        window.location.href = `orderpaymentCOD.html?orderID=${response.orderId}`;
        // if (response.paymentLink) {
        //   // Redirect to the payment link
        // } else {
        //   toastr.error("Error: Payment link not found in the response.");
        // }
        // getshippinginfo()
        // You may want to update the UI or perform other actions here
        // $("#saveshippinginfo").modal("hide");
        // location.reload()

      },
      error: function (error) {
        console.error('Error adding shipping address:', error);
        // Handle error response
        toastr.error('not found', error);

      }
    });


  }
}

)

$(document).ready(function () {
  getCartCheckout()
  getshippinginfo()
  getLocation()
  updateCheckoutView();
});
 