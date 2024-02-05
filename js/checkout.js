
let productCount = ''
let subtotal = 0
let shipping = 0

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



// function getshippinginfo() {
//   $.ajax({
//     url: `${SETTINGS.backendUrl}/CustomerAccount/GetAllCustShippingAddresses`,
//     method: 'GET',
//     headers: {
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json",
//       // Add other headers as needed
//     },
//     dataType: 'json',
//     success: function (profileData) {
//       // profileData.forEach(function (shipping) {
//       //   console.log('shipping', shipping);
//       let li = `<option value="">Select Shipping Address</option>`
//       $.each(profileData, function (index, value) {
//         li += `<option value="${value.csaEntryId}">${value.name} (${value.addressLine1})</option>`
//       });
//       li += `<option value="newAddress" style='color: black !important;'>Add New Address</option>`;
//       $('#shippingAddress').append(li);

//       // })
//       $('#shippingAddress').on('change', function () {
//         // Update the shippingId variable with the selected value
//         shippingId = $(this).val();
//       });

//     },
//     error: function (error) {
//       console.error('Error fetching cart data:', error);
//     }
//   });
// }

// function getshippinginfo() {
//   $.ajax({
//     url: `${SETTINGS.backendUrl}/CustomerAccount/GetAllCustShippingAddresses`,
//     method: 'GET',
//     headers: {
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json",
//       // Add other headers as needed
//     },
//     dataType: 'json',
//     success: function (profileData) {
//       let li = `<option value="">Select Shipping Address</option>`;
//       $.each(profileData, function (index, value) {
//         li += `<option value="${value.csaEntryId}">${value.name} (${value.addressLine1})</option>`;
//       });
//       li += `<option value="newAddress" style='color: black !important;'>Add New Address</option>`;
//       $('#shippingAddress').append(li);

//       // Append the form dynamically
//       let shippingForm = `
//         <form id="shippingForm">
//         <div class="row">
//         <div class="col-md-6 mt-3">
//           <div class="form-group">
//             <label for="companyName"> Name</label>
//             <input type="text" class="form-control" id="name" placeholder="  Name">
//           </div>
//         </div>
//         <div class="col-md-6 mt-3">
//           <div class="form-group">
//             <label for="companyName">Contact No</label>
//             <input type="text" class="form-control" id="contactNum"
//               placeholder="Contact No">
//           </div>
//         </div>
//         <div class="col-md-6 mt-3">
//           <div class="form-group">
//             <label for="companyName">Alternate Contact No</label>
//             <input type="text" class="form-control" id="altcontactNum"
//               placeholder="Alternate Contact No">
//           </div>
//         </div>

//         <div class="col-md-6 mt-3">
//           <div class="form-group" id="fetchCountriesBtn">
//             <label for="companyName">Location</label>
//             <select class="default-select w-100 country" id="locationSelection">
//             </select>
//           </div>
//         </div>

//         <div class="col-md-12 mt-3">
//           <div class="form-group">
//             <label for="companyName">Address Line 1</label>
//             <input type="textarea" class="form-control" id="addresses1"
//               placeholder="Address Line 1">
//           </div>
//         </div>
//         <div class="col-md-12 mt-3">
//           <div class="form-group">
//             <label for="companyName">Address Line 2</label>
//             <input type="textarea" class="form-control" id="addresses2"
//               placeholder="Address Line 2">
//           </div>
//         </div>
//         <div class="col-md-12 mt-3">
//           <div class="form-group">
//             <label for="companyName">Remark</label>
//             <input type="text" class="form-control" id="remark"
//               placeholder="Remark">
//           </div>
//         </div>
//       </div>
//         </form>
//       `;

//       // Append the form to a container (you might need to adjust the container selector)
//       $('#shippingForm').append(shippingForm);

//       $('#shippingForm').hide(); // Hide the form initially

//       $('#shippingAddress').on('change', function () {
//         var shippingId = $(this).val();

//         if (shippingId !== "newAddress" && shippingId !== "") {
//           var selectedShipping = profileData.find(function (item) {
//             return item.csaEntryId == shippingId;
//           });

//           // Populate the form fields with the selected shipping address data
//           $('#name').val(selectedShipping.name);
//           $('#contactNum').val(selectedShipping.contactNum);
//           $('#altcontactNum').val(selectedShipping.altcontactNum);
//           $('#locationSelection').val(selectedShipping.location);
//           $('#addresses1').val(selectedShipping.addresses1);
//           $('#addresses2').val(selectedShipping.addresses2);
//           $('#remark').val(selectedShipping.remark);

//           // Show the form
//           $('#shippingForm').show();
//         } else {
//           // Clear the form fields when "Add New Address" is selected or no address is selected
//           $('#name, #contactNum, #altcontactNum, #locationSelection, #addresses1, #addresses2, #remark').val("");

//           // Hide the form when "Add New Address" is selected
//           $('#shippingForm').hide();
//         }
//       });

//     },
//     error: function (error) {
//       console.error('Error fetching cart data:', error);
//     }
//   });
// }

// function getshippinginfo() {
//   $.ajax({
//     url: `${SETTINGS.backendUrl}/CustomerAccount/GetAllCustShippingAddresses`,
//     method: 'GET',
//     headers: {
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json",
//       // Add other headers as needed
//     },
//     dataType: 'json',
//     success: function (profileData) {
//       let li = `<option value="">Select Shipping Address</option>`;
//       $.each(profileData, function (index, value) {
//         li += `<option value="${value.csaEntryId}">${value.name} (${value.addressLine1})</option>`;
        
//       });
//       li += `<option value="newAddress" style='color: black !important;'>Add New Address</option>`;
//       $('#shippingAddress').html(li); // Use html() instead of append() to replace existing options

//       // Append the form dynamically
//       let shippingdata =  ` 
//       <div class="col-md-12">
//         <div class="card">
//           <div class="card-body" >
//                       <h2 class="mb-3">Shipping Info</h2>
//                       <p>CUSTOMER ID : <span class="text-black"> ${shipping.custId} </span></p>
//                       <p>CUSTOMER NAME : <span class="text-black"> ${shipping.name} </span></p>
//                       <p>CONTACT NO : <span class="text-black"> ${shipping.contactNo} </span></p>
//                       <p>Alt ONTACT No: <span class="text-black"> ${shipping.altContactNo} </span></p>
//                       <p>ADDRESS LINE 1: <span class="text-black"> ${shipping.addressLine1} </span></p>
//                       <p>ADDRESS LINE 2: <span class="text-black"> ${shipping.addressLine2} </span></p>
//                       <p>REMARK: <span class="text-black"> ${shipping.remark} </span></p>
                      
//           </div>
//         </div>
//      </div> `;
//      let shippingForm = `
//                         <form id="shippingForm">
//                         <div class="row">
//                         <div class="col-md-6 mt-3">
//                           <div class="form-group">
//                             <label for="companyName"> Name</label>
//                             <input type="text" class="form-control" id="name" placeholder="  Name">
//                           </div>
//                         </div>
//                         <div class="col-md-6 mt-3">
//                           <div class="form-group">
//                             <label for="companyName">Contact No</label>
//                             <input type="text" class="form-control" id="contactNum"
//                               placeholder="Contact No">
//                           </div>
//                         </div>
//                         <div class="col-md-6 mt-3">
//                           <div class="form-group">
//                             <label for="companyName">Alternate Contact No</label>
//                             <input type="text" class="form-control" id="altcontactNum"
//                               placeholder="Alternate Contact No">
//                           </div>
//                         </div>
     
//                         <div class="col-md-6 mt-3">
//                           <div class="form-group" id="fetchCountriesBtn">
//                             <label for="companyName">Location</label>
//                             <select class="default-select w-100 country" id="locationSelection">
//                             </select>
//                           </div>
//                         </div>
     
//                         <div class="col-md-12 mt-3">
//                           <div class="form-group">
//                             <label for="companyName">Address Line 1</label>
//                             <input type="textarea" class="form-control" id="addresses1"
//                               placeholder="Address Line 1">
//                           </div>
//                         </div>
//                         <div class="col-md-12 mt-3">
//                           <div class="form-group">
//                             <label for="companyName">Address Line 2</label>
//                             <input type="textarea" class="form-control" id="addresses2"
//                               placeholder="Address Line 2">
//                           </div>
//                         </div>
//                         <div class="col-md-12 mt-3">
//                           <div class="form-group">
//                             <label for="companyName">Remark</label>
//                             <input type="text" class="form-control" id="remark"
//                               placeholder="Remark">
//                           </div>
//                         </div>
//                       </div>
//                         </form>
//                       `;

//       // Replace the content of #shippingdata instead of appending
//       $('#shippinginfo').html(shippingdata);
//       $('#shippingForm').html(shippingForm);
//  console.log(shippingdata);
//       // Hide the form initially
//       $('#shippinginfo').hide();
//       $('#shippingForm').hide();


//       $('#shippingAddress').on('change', function () {
//         var shippingId = $(this).val();

//         if (shippingId !== "newAddress" && shippingId !== "") {
//           var selectedShipping = profileData.find(function (item) {
//             return item.csaEntryId == shippingId;
//           });

//           // Populate the form fields with the selected shipping address data
//           $('#name').val(selectedShipping.name);
//           $('#contactNum').val(selectedShipping.contactNo);
//           $('#altcontactNum').val(selectedShipping.altcontactNo);
//           $('#locationSelection').val(selectedShipping.location);
//           $('#addresses1').val(selectedShipping.addressLine1);
//           $('#addresses2').val(selectedShipping.addressLine1);
//           $('#remark').val(selectedShipping.remark);

//           // Show the form
//           $('#shippinginfo').show();
//           $('#shippingForm').hide();

//         } else {
//           // Clear the form fields when "Add New Address" is selected or no address is selected
//           $('#name, #contactNum, #altcontactNum, #locationSelection, #addresses1, #addresses2, #remark').val("");

//           // Hide the form when "Add New Address" is selected
//           $('#shippinginfo').hide();
//           $('#shippingForm').show();

//         }
//       });

//     },
//     error: function (error) {
//       console.error('Error fetching cart data:', error);
//     }
//   });
// }
 

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
        }
      });

      // Append the form dynamically
      let shippingForm = `
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h2 class="mb-3">Shipping Info</h2>
              <p>CUSTOMER ID : <span class="text-black" id="customerId"> </span></p>
              <p>CUSTOMER NAME : <span class="text-black" id="customerName"> </span></p>
              <p>CONTACT NO : <span class="text-black" id="contactNo"> </span></p>
              <p>ALT CONTACT No: <span class="text-black" id="altContactNo"> </span></p>
              <p>ADDRESS LINE 1: <span class="text-black" id="addressLine1"> </span></p>
              <p>ADDRESS LINE 2: <span class="text-black" id="addressLine2"> </span></p>
              <p>REMARK: <span class="text-black" id="remark"> </span></p>
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
           var selectedData = selectedShipping.custId + selectedShipping.name + selectedShipping.contactNo ;
          // Populate the shipping info with the selected shipping address data
          $('#customerId').text(selectedShipping.custId);
          $('#customerName').text(selectedShipping.name);
          $('#contactNo').text(selectedShipping.contactNo);
          $('#altContactNo').text(selectedShipping.altContactNo);
          $('#addressLine1').text(selectedShipping.addressLine1);
          $('#addressLine2').text(selectedShipping.addressLine2);
          $('#remark').text(selectedShipping.remark);

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

function addnewaddress(){
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
let shippingId = 0;
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

    $(document).ready(function () {
                      // Event listener for changes in the shippingAddress select element
                      $('#shippingAddress').on('change', function () {
                        // Check if the selected value is "newAddress"
                        if ($(this).val() === 'newAddress') {
                          // Enable the form fields
                          enableShippingFormFields();
                        } else {
                          // Disable the form fields
                          disableShippingFormFields();
                        }
                      });



                      // Function to enable form fields
                      function enableShippingFormFields() {
                        $('#name,#contactNum,#altcontactNum,#addresses1, #addresses2,#locationSelection,#remark,#saveshippinginfo').prop('disabled', false);
                      }

                      // Function to disable form fields
                      function disableShippingFormFields() {
                        $('#name,#contactNum,#altcontactNum,#addresses1, #addresses2,#locationSelection,#remark,#saveshippinginfo').prop('disabled', true);
                      }

                      // Initial check on page load
                      if ($('#shippingAddress').val() === 'newAddress') {
                        enableShippingFormFields();
                      } else {
                        disableShippingFormFields();
                      }

                    });


document.getElementById("placeorder").addEventListener("click", function (e) {
  console.log();
  console.log('response', shippingId);
  e.preventDefault()
  if (shippingId === '') {
    
    toastr.error('Please Select Shipping Address or Add new Address')
  } else {
    var userData = {
      "shippingId": shippingId,
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
        toastr.error('not found',error);

      }
    });
  }

})

$(document).ready(function () {
  getCartCheckout()
  getshippinginfo()
  getLocation()
});


