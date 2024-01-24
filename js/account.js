// .................get profile function start .................. 
function getProfile() {
    $.ajax({
        url: `${SETTINGS.backendUrl}/Auth/GetProfile`,
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // Add other headers as needed
        },
        dataType: 'json',
        success: function (profileData) {
            console.log('profileData', profileData);
            var profile = `<h4>Personal Info</h4>
              <p>Full Name: ${profileData.firstName}${profileData.lastName}</p>
              <p>Mobile No.: ${profileData.phoneNumber}</p>
              <p>Email: ${profileData.email}</p>
              <p>Customer ID: ${profileData.userId}</p>
              <p>Location: ${profileData.location}</p>
              <a href="">Edit Account Info</a>`;

            // Append the item to the cart list
            $('#personalinfo').append(profile);

        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });

}
// .................get profile function end .................. 

// .................get BillingInfo function start .................. 

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
            console.log('profileData', profileData);
            if (profileData.length > 0) {
                var profile = `<h4>Billing Info</h4>
      <p>Customer ID: ${profileData[0].custId}</p>
      <p>Company Name: ${profileData[0].custCompany}</p>
      <p>Company Tax No: ${profileData[0].custCompTaxNo}</p>
      <p>Address Line 1: ${profileData[0].addressLine1}</p>
      <p>Address Line 2: ${profileData[0].addressLine2}</p>
      <p>Remark: ${profileData[0].remark}</p>
      <a href="">Edit Billing Info</a>`;

                $('#billingAddress').append(profile);
            } else {
                var profile = `<button class="btn btn-secondary btnhover text-uppercase me-2"
                id="postButton">Add Billing Info</button>`;
                $('#billingAddress').append(profile);
                $('#postButton').on('click', function () {
                    $('#billingModal').modal('show'); // Adjust 'yourModalId' accordingly
                });
            }
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
            $('#countrySelect').selectric('refresh');
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
        console.log('userData :', userData);
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
           
                console.log('Billing address added successfully:', response);
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
// .................get BillingInfo function end .................. 
   
// .................get shippingInfo function start .................. 

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
                console.log('shipping', shipping);

                var profile = `  
                <div class="col-md-6">
							<div class="card">
								<div class="card-body" >
                                <h4>Shipping Info</h4>
                                <p>Customer ID: ${shipping.custId}</p>
                                <p>Customer Name: ${shipping.name}</p>
                                <p>Contact No: ${shipping.contactNo}</p>
                                <p>Alt Contact No: ${shipping.altContactNo}</p>
                                <p>Address Line 1: ${shipping.addressLine1}</p>
                                <p>Address Line 2: ${shipping.addressLine2}</p>
                                <p>Remark: ${shipping.remark}</p>
                                <a href="" class="">Edit shipping Info</a>
								</div>
							</div>
						</div>`;
                $('#shippinginfo').append(profile);
            })

        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });
}
// .................get shippingInfo function end .................. 

// ................. addshippingInfo function start .................. 

function addshippingInfo() {
   
    $('#postButton').on('click', function () {
        $('#shippingModal').modal('show'); // Adjust 'yourModalId' accordingly
    });
    $.ajax({
        type: "GET",
        // url: '${SETTINGS.backendUrl}Masters/GetAllLocations',
        url: `${SETTINGS.backendUrl}/Masters/GetAllLocations`,

        dataType: "json",
        success: function (response) {
            // console.log(response);
            let li = `<option value="">Select</option>`
            $.each(response, function (index, value) {
                li += `<option value="${value.lEntryId}">${value.locationName}</option>`
            });
            $('#countrySelection').append(li);
            $('#countrySelection').selectric('refresh');
        }
    })

    // Assuming this is your click event handler for the button with id 'saveinfo'
    var saveshipping = document.getElementById('saveshippinginfo');

    saveshipping.addEventListener('click', function (e) {
        e.preventDefault(),
            addshippingAddress();
    });

    // Function to handle the API call to AddCustBillingAddress
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
        console.log('userData :', userData);
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
                // Handle success response
                //    localStorage.setItem('token', response);

                console.log('Billing address added successfully:', response);
                toastr.success("Billing address added successfully ");

                // You may want to update the UI or perform other actions here
                $("#saveshippinginfo").modal("hide");
                location.reload()
                //  addshippingInfo()


            },
            error: function (error) {
                console.error('Error adding billing address:', error);
                // Handle error response
                toastr.error(error);

            }
        });

    }

}
// ................. addshippingInfo function end .................. 

$(document).ready(function () {
    getProfile()
    getBillingInfo()
    addshippingInfo()
    getshippingInfo()
    // addBillingAddress()
});
