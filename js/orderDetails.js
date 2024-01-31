$.ajax({
    url: 'https://mig-dev.lifelinemegacorp.com/api/Order/GetOrderDetailsByOrderId?OrderId=ORD1706612145',
    method: 'GET',
    dataType: 'json',
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // Add other headers as needed
    },
    success: function (data) {
        // Update Order Details
        console.log(data);
        updateOrderDetails(data);
    },
    error: function (error) {
        console.error('Error fetching data:', error);
    }
});

function updateOrderDetails(data) {
    // Update Order Details section
    var orderDetailsHtml = `
      <h2 class="mb-2">Order Details: #${data.oid}</h2>
      <p class="mb-3">${data.paymentCreationTime}</p>
      <div class="d-flex">
        <h6 class="me-3">Status :</h6>
        <p class="text-green">${data.paymentStatusMsg}</p>
      </div>

       <div class="card p-5 order-head ">
          <div class="d-flex">
              <div class="col-4 " id="billingAddress">
              </div> 
          
              <div class="col-4 p-5" id="payment">
                  <h4 class="mb-2">Payment Method</h4>
                 <p class="mb-3">${data.paymentCreationTime}</p>
                 <div>
                   <h6 class="me-3">${order.paymentType}</h6>
                 </div>
              </div>
          </div>
      </div>

      <div class="card p-5 order-head ">
      <td class="product-item-close"><a href="javascript:void(0);">${order.ordrItms[0].itmname}</a></td>
      <td class="product-item-name">${order.ordrItms[0].qty}</td>
      <td class="product-item-price"><span>${order.ordrItms[0].price}</span> </td>
      <td class="product-item-stock text-primary">${order.ordrItms[0].total}</td>
      <td class="product-item-totle"><a href="./orderDetails.html" class="btn btn-gray btnhover text-nowrap">View Details</a></td>
      </div>
   

  
  
      <!-- Add other relevant data here -->
    `;
    $('#orderDetails').html(orderDetailsHtml);

    // Add logic to update other sections as needed (billing address, payment, product details, etc.)
}

















function getBillingInfo() {
    $.ajax({
        url: `${SETTINGS.backendUrl}/CustomerAccount/GetAllCustBillingAddresses`,
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // Add other headers as needed
        },
        dataType: 'json',
        success: function (profileData) {
            // profileData.forEach(function (Billing) {
            console.log('profileDatabiili', profileData.length);
            if (profileData.length > 0) {

                var profile = `
                <div class="col-md-12">
							<div class="">
								<div class="card-body" >
                    <div class="mb-3"><h2>Billing Address</h2></div>  
                    <p class="m-1">CUSTOMER ID : <span class="text-black"> ${profileData[0].custId} </span></p>
                    <p class="m-1">COMPANY NAME : <span class="text-black"> ${profileData[0].custCompany} </span></p>
                    <p class="m-1">COMPANY TAX No : <span class="text-black"> ${profileData[0].custCompTaxNo} </span></p>
                    <p class="m-1">ADDRESS LINE 1 : <span class="text-black"> ${profileData[0].addressLine1} </span></p>
                    <p class="m-1">ADDRESS LINE 2 : <span class="text-black"> ${profileData[0].addressLine2} </span></p>
                    <p class="m-1">REMARK : <span class="text-black"> ${profileData[0].remark} </span></p>
                   
                    </div>
					  </div>
				    	 </div>`;
                $('#billingAddress').append(profile);
            } else {
                var profile = `<button class="btn btn-secondary btnhover text-uppercase me-2"
                id="postButton">Add Billing Info</button>`;
                $('#billingAddress').append(profile);
                $('#postButton').on('click', function () {
                    $('#billingModal').modal('show'); // Adjust 'yourModalId' accordingly
                });
            }
            // })

        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });

    $.ajax({
        type: "GET",
        url: `${SETTINGS.backendUrl}/Masters/GetAllLocations`,

        dataType: "json",
        success: function (response) {
            // console.log(response);
            let li = `<option value="">Select</option>`
            $.each(response, function (index, value) {
                li += `<option value="${value.lEntryId}">${value.locationName}</option>`
            });
            $('#countrySelect').append(li);
            // $('#countrySelect').selectric('refresh');
        }
    })

    var savebilling = document.getElementById('saveinfo');

    savebilling.addEventListener('click', function (e) {
        e.preventDefault(),
            addBillingAddress();
    });

    function addBillingAddress() {
        const CompanyName = document.getElementById("companyName").value;
        const CompanyTaxNo = document.getElementById("companyTaxNo").value;
        const Address1 = document.getElementById("address1").value;
        const Address2 = document.getElementById("address2").value;
        const CountrySelect = document.getElementById("countrySelect").value;
        const Remark = document.getElementById("remark").value;

        var userData = {
            "userType": 2,
            "custCompany": CompanyName,
            "custCompTaxNo": CompanyTaxNo,
            "addressLine1": Address1,
            "addressLine2": Address2,
            "lctnId": CountrySelect,
            "remark": Remark,
        };
        // console.log('userData :', userData);
        $.ajax({
            url: `${SETTINGS.backendUrl}/CustomerAccount/AddCustBillingAddress`,
            method: 'POST',  // Assuming this should be a POST request, change it if necessary
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            data: JSON.stringify(userData), // Convert object to JSON string
            success: function (response) {

                // console.log('Billing address added successfully:', response);
                toastr.success("Billing address added successfully ");

                $("#saveinfo").modal("hide");
            },
            error: function (error) {
                console.error('Error adding billing address:', error);
                toastr.error(error);

            }
        });
    }

}



function getshippingInfo() {
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
            profileData.forEach(function (shipping) {
                // console.log('shipping', shipping);
                console.log('profileDatabiili', profileData.length);
                if (profileData.length > 0) {

                    var profile = `  
                <div class="col-md-6">
							<div class="card">
								<div class="card-body" >
                                <h2 class="mb-3">Shipping Info</h2>
                                <p>CUSTOMER ID : <span class="text-black"> ${shipping.custId} </span></p>
                                <p>CUSTOMER NAME : <span class="text-black"> ${shipping.name} </span></p>
                                <p>CONTACT NO : <span class="text-black"> ${shipping.contactNo} </span></p>
                                <p>Alt ONTACT No: <span class="text-black"> ${shipping.altContactNo} </span></p>
                                <p>ADDRESS LINE 1: <span class="text-black"> ${shipping.addressLine1} </span></p>
                                <p>ADDRESS LINE 2: <span class="text-black"> ${shipping.addressLine2} </span></p>
                                <p>REMARK: <span class="text-black"> ${shipping.remark} </span></p>
                                <a href="javascript:void(0);" 
                                data-bs-toggle="modal" class="open-quick-viewc text-uppercase text-green strong" data-bs-target="#EditShipping" onclick="getshippingbyId(${shipping.csaEntryId})">Edit</a>
                                <a class=" text-uppercase ms-5 text-red  delete-button strong" data-csa-entry-id="${shipping.csaEntryId}">Delete</a>
								</div>
							</div>
						</div>`;
                    $('#shippinginfo').append(profile);
                } else {
                    var profile = `<button class="btn btn-secondary btnhover text-uppercase me-2"
                id="saveshippinginfo">Add Shipping Info</button>`;
                    $('#shippinginfo').append(profile);
                    $('#saveshippinginfo').on('click', function () {
                        $('#billingModal').modal('show'); // Adjust 'yourModalId' accordingly
                    });
                }
            })
            // Add event listener for the Delete button


        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });

    $.ajax({
        type: "GET",
        url: `${SETTINGS.backendUrl}/Masters/GetAllLocations`,

        dataType: "json",
        success: function (response) {
            // console.log(response);
            let li = `<option value="">Select</option>`
            $.each(response, function (index, value) {
                li += `<option value="${value.lEntryId}">${value.locationName}</option>`
            });
            $('#countrySelection').append(li);
            // $('#countrySelection').selectric('refresh');
        }
    })
    var saveshipping = document.getElementById('saveshippinginfo');

    saveshipping.addEventListener('click', function (e) {
        e.preventDefault(),
            addshippingAddress();
    });

    function addshippingAddress() {
        const Name = document.getElementById("name").value;
        const ContactNo = document.getElementById("contactNum").value;
        const AltContactNo = document.getElementById("altcontactNum").value;
        const Address1 = document.getElementById("addresses1").value;
        const Address2 = document.getElementById("addresses2").value;
        const CountrySelect = document.getElementById("countrySelection").value;
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
        // console.log('userData :', userData);
        $.ajax({
            url: 'https://mig-dev.lifelinemegacorp.com/api/CustomerAccount/AddCustShippingAddress',
            method: 'POST',  // Assuming this should be a POST request, change it if necessary
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            data: JSON.stringify(userData), // Convert object to JSON string
            success: function (response) {

                // console.log('Billing address added successfully:', response);
                toastr.success("Billing address added successfully ");
                // You may want to update the UI or perform other actions here
                $("#saveshippinginfo").modal("hide");
                location.reload()

            },
            error: function (error) {
                console.error('Error adding billing address:', error);
                // Handle error response
                toastr.error(error);

            }
        });

    }



}


$(document).ready(function () {
    getBillingInfo()
    getshippingInfo()
    addshippingInfo()
});