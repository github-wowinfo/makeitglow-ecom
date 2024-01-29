
// document.getElementById("placeorder").addEventListener("click", function (e) {
//   e.preventDefault()
//   const EmailId = document.getElementById("email").value;
//   const Countries = document.getElementById("country").value;
//   const FirstName = document.getElementById("firstname").value;
//   const LastName = document.getElementById("lastname").value;
//   const Company = document.getElementById("company").value;
//   const Addresses = document.getElementById("address").value;
//   const State = document.getElementById("state").value;
//   const City = document.getElementById("city").value;
//   const PhoneNum = document.getElementById("phone").value;

//   // Validate first name  (not empty)
//   document.querySelectorAll('.error').forEach(element => {
//     element.textContent = '';
//   });

//   // let hasError = false;

//   // Validate email format using a simple regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(EmailId)) {
//     // alert("Please enter a valid email address.");
//     toastr.error("Please enter a valid email address.");

//     return;
//   }
//   // Validate first name and last name (not empty)
//   if (FirstName === '') {
//     toastr.error("First name is required.");
//     // document.getElementById("firstNameError").textContent = "First name is required.";
//     // hasError = true;
//     return
//   }

//   if (LastName === '') {
//     toastr.error("Last name is required.");
//     // document.getElementById("lastNameError").textContent = "Last name is required.";
//     // hasError = true;
//     return

//   }

//   // Validate phone number (only digits, optional country code)
//   const phoneRegex = /^\+?[0-9]*$/;
//   if (!phoneRegex.test(PhoneNum)) {
//     // alert("Please enter a valid phone number.");
//     toastr.error("Please enter a valid phone number.");

//     return;
//   }

//   // Validate address (not empty)
//   if (Addresses === '') {
//     // alert("Address is a required field.");
//     toastr.error("Please enter a valid address.");

//     return;
//   }

//   if (State === '') {
//     // alert("Address is a required field.");
//     toastr.error("Please enter a valid state.");

//     return;
//   } if (City === '') {
//     // alert("Address is a required field.");
//     toastr.error("Please enter a valid city.");

//     return;
//   }

//   // console.log(FirstName);

//   var userData = {
//     //   "userType": 2,
//     "email": EmailId,
//     "lctnId": Countries,
//     "firstName": FirstName,
//     "lastName": LastName,
//     "company": Company,
//     "addressLine1": Addresses,
//     "state": State,
//     "city": City,
//     "phoneNumber": PhoneNum,

//     // Add any other required fields for user registration
//   };
//   console.log('userData :', userData);

//   $.ajax({
//     url: `${SETTINGS.backendUrl}/Auth/Register`,
//     type: 'POST',
//     dataType: 'json', // Change the datatype according to your response type
//     contentType: 'application/json', // Set the Content-Type
//     data: JSON.stringify(userData), // Convert object to JSON string
//     success: function (response) {
//       // var token = 'your_generated_token';

//       // Save the token in localStorage
//       localStorage.setItem('token', response.token);
//       console.log('Registration Success:', response);

//       // Handle the response from the server after successful registration
//       // Show success toast
//       toastr.success("Registered successful! ");
//       window.location.href = "./login.html";
//       },
//     error: function (error) {
//       // console.log('Registration Error:', error);
//       console.log("Registration Error::", error.responseJSON.message);
//       toastr.error(error.responseJSON.message);
//       // toastr.error("error occured");


//     }
//   });
// });



let productCount = ''
let subtotal = 0
let shipping = 10

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
      // console.log(cartData);
      productCount = cartData.length
      subtotal = calculateSubtotal(cartData);
      $('#total').text(subtotal.toFixed(2) + 'AED');
      var totalAmount = subtotal + shipping
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
        <img src="${cartItem.thumbnail}" alt="">
      </div>
      <div class="dz-content">
        <h6 class="title mb-0">${cartItem.itemName}</h6>
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
      // profileData.forEach(function (shipping) {
      //   console.log('shipping', shipping);
      let li = `<option value="">Select Shipping Address</option>`
      $.each(profileData, function (index, value) {
        li += `<option value="${value.csaEntryId}">${value.name} (${value.addressLine1})</option>`
      });
      $('#shippingAddress').append(li);

      // })


    },
    error: function (error) {
      console.error('Error fetching cart data:', error);
    }
  });
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

      // console.log('Billing address added successfully:', response);
      toastr.success("Shipping address added successfully ");
      getshippinginfo()
      // You may want to update the UI or perform other actions here
      // $("#saveshippinginfo").modal("hide");
      // location.reload()

    },
    error: function (error) {
      console.error('Error adding shipping address:', error);
      // Handle error response
      toastr.error(error);

    }
  });

  // }
})



document.getElementById("placeorder").addEventListener("click", function (e) {
  e.preventDefault()
  if ($('#shippingAddress').val() === '') {
    toastr.error('Please Select Shipping Address')
  } else {
    var userData = {
      "shippingId": $('#shippingAddress').val(),
      "productsQty": productCount,
      "subTotal": subtotal,
      "shippingCharges": shipping,
      "totalAmount": (subtotal + shipping) * 100,
      "paidAmount": (subtotal + shipping) * 100,
      "remark": "",
      "isGiftOrder": false,
      "orderItemsVM": {
        "type": 1
      }
    };
    console.log('userData :', userData);
    // $.ajax({
    //   url: `${SETTINGS.backendUrl}/Order/PlaceOrder`,
    //   method: 'POST',  // Assuming this should be a POST request, change it if necessary
    //   headers: {
    //     Authorization: "Bearer " + token,
    //     "Content-Type": "application/json",
    //     // Add other headers as needed
    //   },
    //   data: JSON.stringify(userData), // Convert object to JSON string
    //   success: function (response) {

    //     // console.log('Billing address added successfully:', response);
    //     toastr.success("Order Placed ");
    //     // getshippinginfo()
    //     // You may want to update the UI or perform other actions here
    //     // $("#saveshippinginfo").modal("hide");
    //     // location.reload()

    //   },
    //   error: function (error) {
    //     console.error('Error adding shipping address:', error);
    //     // Handle error response
    //     toastr.error(error);

    //   }
    // });
  }

})

$(document).ready(function () {
  getCart()
  getshippinginfo()
  getLocation()
});


