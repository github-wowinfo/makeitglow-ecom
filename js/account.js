function populateDropdown(url, dropdownSelector, selectedValue) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            let options = `<option value="">Select</option>`;
            $.each(response, function (index, value) {
                options += `<option value="${value.lEntryId}">${value.locationName}</option>`;
            });
            $(dropdownSelector).html(options); // Use html() to replace existing options
            $(dropdownSelector).val(selectedValue); // Set the selected value
            $(dropdownSelector).selectric('refresh');
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        }
    });
}

function populateReferenceDropdown(url, dropdownSelector, selectedValue) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            let options = `<option value="">Select</option>`;
            $.each(response, function (index, value) {
                options += `<option value="${value.refEntryId}">${value.referenceName}</option>`;
            });
            $(dropdownSelector).html(options); // Use html() to replace existing options
            $(dropdownSelector).val(selectedValue); // Set the selected value
            $(dropdownSelector).selectric('refresh');
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        }
    });
}

// // Call the function to populate the first dropdown
// populateDropdown(`${SETTINGS.backendUrl}/Masters/GetAllLocations`, '#countrySelect');

// // Call the function to populate the second dropdown
// populateDropdown(`${SETTINGS.backendUrl}/Masters/GetAllLocations`, '#locationSelect');

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
            <p>Address Line 1: ${profileData.addressLine1}</p>
            <p>Address Line 2: ${profileData.addressLine2}</p>
            <a href="javascript:void(0);" 
            data-bs-toggle="modal" class="open-quick-view" data-bs-target="#profileEdit">
            Edit Profile Info
            </a>`;

            // Append the item to the cart list
            $('#personalinfo').append(profile);

            $('#firstName').val(profileData.firstName)
            $('#lastName').val(profileData.lastName)
            $('#phoneNumber').val(profileData.phoneNumber)
            $('#profileaddress1').val(profileData.addressLine1)
            $('#profileaddress2').val(profileData.addressLine2)

            populateDropdown(`${SETTINGS.backendUrl}/Masters/GetAllLocations`, '#countrySelect', profileData.lctnId);
            populateDropdown(`${SETTINGS.backendUrl}/Masters/GetAllLocations`, '#locationSelect', profileData.lctnId);
            populateReferenceDropdown(`${SETTINGS.backendUrl}/Masters/GetAllReferences`, '#refernceSelect', profileData.refID);
        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });

}

$("#updateProfile").on('click', function (e) {
    $.ajax({
        url: `${SETTINGS.backendUrl}/Auth/UpdateProfile`,
        method: 'POST',  // Assuming this should be a POST request, change it if necessary
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // Add other headers as needed
        },
        data: JSON.stringify({
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            phoneNumber: $('#phoneNumber').val(),
            lctnId: $('#locationSelect').val(),
            refID: $('#refernceSelect').val(),
            addressLine1: $('#profileaddress1').val(),
            addressLine2: $('#profileaddress2').val(),
        }),
        success: function (response) {
            // Handle success response
            //    localStorage.setItem('token', response);

            console.log('Billing address added successfully:', response);
            toastr.success("Account Info Updated successfully ");

            // You may want to update the UI or perform other actions here
            $("#profileEdit").modal("hide");
        },
        error: function (error) {
            console.error('Error adding billing address:', error);
            // Handle error response
            toastr.error(error);

        }
    });
})








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

    // $.ajax({
    //     type: "GET",
    //     // url: '${SETTINGS.backendUrl}Masters/GetAllLocations',
    //     url: `${SETTINGS.backendUrl}/Masters/GetAllReferences`,

    //     dataType: "json",
    //     success: function (response) {
    //         // console.log(response);
    //         let li = `<option value="">Select</option>`
    //         $.each(response, function (index, value) {
    //             li += `<option value="${value.refEntryId}">${value.referenceName}</option>`
    //         });
    //         $('#refernceSelect').append(li);
    //         $('#refernceSelect').selectric('refresh');
    //     }
    // })




    // Assuming this is your click event handler for the button with id 'saveinfo'
    var savebilling = document.getElementById('saveinfo');

    savebilling.addEventListener('click', function (e) {
        e.preventDefault(),
            addBillingAddress();
    });

    // Function to handle the API call to AddCustBillingAddress
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
            url: 'https://mig-dev.lifelinemegacorp.com/api/CustomerAccount/AddCustBillingAddress',
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
                $("#saveinfo").modal("hide");
            },
            error: function (error) {
                console.error('Error adding billing address:', error);
                // Handle error response
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

$(document).ready(function () {
    getProfile()
    getBillingInfo()
    getshippingInfo()
    // addBillingAddress()
});
