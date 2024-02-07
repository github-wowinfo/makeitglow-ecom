function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Get category ID from the URL
  const orderId = getQueryParam('orderId');
  console.log(orderId);
let shippingId = ''
let itemId = ''
$.ajax({
    // url: `${SETTINGS.backendUrl}/Order/GetOrderDetailsByOrderId?OrderId=${order.ordrID}`,

    url:    `${SETTINGS.backendUrl}/Order/GetOrderDetailsByOrderId?OrderId=${orderId}`,
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
    var timestampStr = data.ordrPymnt.paymentCreationTime;
    var timestamp = new Date(timestampStr);
    var formattedDate = formatDate(timestamp);
    var Tamount = data.ordrPymnt.txnAmount / 100 ;

    function formatDate(date) {
        // Array of month names
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        // Extract day, month, and year
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        // Format the date string
        var formattedDate = day + " " + monthNames[monthIndex] + " " + year;

        return formattedDate;
    }

    var orderDetailsHtml = `
    <div class="card p-10 order-head">
       <div class="col-12 row ">
           <div class="col-6">
             <h2 class="mb-2">Order Details: ${orderId}</h2>
               <p class="mb-3">${formattedDate}</p>
             <div class="d-flex">
                <h6 class="me-3">Status :</h6>
                <p class="text-green"><strong>${data.status}</strong></p>
             </div>
           </div>
          
           <div class="col-6" id="payment">
             <h4 class="mb-2">Payment Details</h4>
              <p class="mb-3">${data.ordrPymnt.pid}</p>
               <p class="mb-3">${Tamount}</p>
              <h6 class="me-3">${data.ordrPymnt.paymentStatusMsg}</h6>
          </div>
      </div>
    </div>

    <div class="card p-5 order-head ">
       <div class="d-flex">
         <div class="col-6 " id="billingAddress" >
         </div>

         <div class="col-6 " id="shippingAddress" >
         </div>

      </div>
    </div>  
  
    `;
    $('#orderDetails').html(orderDetailsHtml);

    // card2 ... 
    // console.log(data.shippingId);
    // shippingId===data.shippingId

    $.ajax({
        url: `${SETTINGS.backendUrl}/CustomerAccount/GetCustShippingAddressById/${data.shippingId}`,
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // Add other headers as needed
        },
        dataType: 'json',
        success: function (shipping) {
            console.log('profileDataddd', shipping);
        //    if (shipping.length > 0) {
            // var shippingHtml = generateAddressHtml(shipping);
            // $('#shippingAddress').append(shippingHtml);
                var shippingInfo = `  
                
							<div class="">
								<div class="card-body" >
                                <h2 class="mb-3">Shipping Info</h2>
                                <p class="m-1">CUSTOMER ID : <span class="text-black"> ${shipping.custId} </span></p>
                                <p class="m-1">CUSTOMER NAME : <span class="text-black"> ${shipping.name} </span></p>
                                <p class="m-1">CONTACT NO : <span class="text-black"> ${shipping.contactNo} </span></p>
                                <p class="m-1">Alt ONTACT No: <span class="text-black"> ${shipping.altContactNo} </span></p>
                                <p class="m-1">ADDRESS LINE 1: <span class="text-black"> ${shipping.addressLine1} </span></p>
                                <p class="m-1">ADDRESS LINE 2: <span class="text-black"> ${shipping.addressLine2} </span></p>
                                <p class="m-1">REMARK: <span class="text-black"> ${shipping.remark} </span></p>
                                </div>
							</div>
						 `;
                    $('#shippingAddress').append(shippingInfo);
            // } 
        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });
    // function generateAddressHtml(addressData) {
    //     return `
    //         <div class="col-md-6">
    //             <div class="card">
    //                 <div class="card-body">
    //                     <h2 class="mb-3">Shipping Info</h2>
    //                     <p>CUSTOMER ID : <span class="text-black"> ${addressData.custId} </span></p>
    //                     <p>CUSTOMER NAME : <span class="text-black"> ${addressData.name} </span></p>
    //                     <p>CONTACT NO : <span class="text-black"> ${addressData.contactNo} </span></p>
    //                     <p>Alt CONTACT No: <span class="text-black"> ${addressData.altContactNo} </span></p>
    //                     <p>ADDRESS LINE 1: <span class="text-black"> ${addressData.addressLine1} </span></p>
    //                     <p>ADDRESS LINE 2: <span class="text-black"> ${addressData.addressLine2} </span></p>
    //                     <p>REMARK: <span class="text-black"> ${addressData.remark} </span></p>
    //                 </div>
    //             </div>
    //         </div>`;
    // }

    if (data.ordrItms && data.ordrItms.length > 0) {
        // Build the table headers outside the loop
        const tableHeaders = `
        
            <thead>
                <tr>
                    <th> Product  </th>
                    <th> Product Name </th>
                    <th> Quantity </th>
                    <th> Rate </th>
                    <th> Amount </th>
                </tr>
            </thead>
        `;
        // Append the table headers
        $('#orderDetails1').append(tableHeaders);

        data.ordrItms.forEach(order => {
            console.log('order',order);
            // var amount = order.paidAmount/100
            const row = `
                <tr>
                    <td class="product-item"><a href="javascript:void(0);"><img src="${order.itmimg}" alt="" width="80px"></a></td>
                    <td class="product-item"><a href="./productDetails.html?Id=${order.oid}"">${order.itmname}</a></td>
                    <td class="product-item-name">${order.qty}</td>
                    <td class="product-item-price"><span>${order.price} AED</span></td>
                    <td class="product-item-stock text-primary">${order.total} AED</td>
                </tr>
            `;
            // Append each row inside the loop
            $('#orderDetails1').append(row);
        }) 

        // Close the tbody after the loop
        $('#orderDetails1').html(tableHeaders + rows + '</tbody>');
    } else {
        // Handle the case when no FAQs are available
        $('#orderDetails1').append('<p>No FAQs available</p>');
    }
    getBillingInfo();
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
            } 
            // else {
            //     var profile = `<button class="btn btn-secondary btnhover text-uppercase me-2"
            //     id="postButton">Add Billing Info</button>`;
            //     $('#billingAddress').append(profile);
                // $('#postButton').on('click', function () {
                //     $('#billingModal').modal('show'); // Adjust 'yourModalId' accordingly
                // });
            // }
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

    // var savebilling = document.getElementById('saveinfo');

    // savebilling.addEventListener('click', function (e) {
    //     e.preventDefault(),
    //         addBillingAddress();
    // });

    // function addBillingAddress() {
    //     const CompanyName = document.getElementById("companyName").value;
    //     const CompanyTaxNo = document.getElementById("companyTaxNo").value;
    //     const Address1 = document.getElementById("address1").value;
    //     const Address2 = document.getElementById("address2").value;
    //     const CountrySelect = document.getElementById("countrySelect").value;
    //     const Remark = document.getElementById("remark").value;

    //     var userData = {
    //         "userType": 2,
    //         "custCompany": CompanyName,
    //         "custCompTaxNo": CompanyTaxNo,
    //         "addressLine1": Address1,
    //         "addressLine2": Address2,
    //         "lctnId": CountrySelect,
    //         "remark": Remark,
    //     };
    //     // console.log('userData :', userData);
    //     $.ajax({
    //         url: `${SETTINGS.backendUrl}/CustomerAccount/AddCustBillingAddress`,
    //         method: 'POST',  // Assuming this should be a POST request, change it if necessary
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //             // Add other headers as needed
    //         },
    //         data: JSON.stringify(userData), // Convert object to JSON string
    //         success: function (response) {

    //             // console.log('Billing address added successfully:', response);
    //             toastr.success("Billing address added successfully ");

    //             $("#saveinfo").modal("hide");
    //         },
    //         error: function (error) {
    //             console.error('Error adding billing address:', error);
    //             toastr.error(error);

    //         }
    //     });
    // }

}





$(document).ready(function () {
    getBillingInfo()
    // getshippingInfo()
    
    // addshippingInfo()
});