// .................get profile function start .................. 
function populateDropdown(url, dropdownSelector, selectedValue) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            let options = `<option value="">Select</option>`;
            $.each(response, function (index, value) {
                options += ` <option value="${value.lEntryId}">${value.locationName}</option>`;
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
// populateDropdown(${SETTINGS.backendUrl}/Masters/GetAllLocations, '#countrySelect');

// // Call the function to populate the second dropdown
// populateDropdown(${SETTINGS.backendUrl}/Masters/GetAllLocations, '#locationSelect');

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
      <a href="javascript:void(0);" 
      data-bs-toggle="modal" class="open-quick-view" data-bs-target="#EditBilling" >
      Edit Billing Info</a>`;

                $('#billingAddress').append(profile);
                $('#cmpnyname').val(profileData.custCompany)
                $('#cmpnytx').val(profileData.custCompTaxNo)
                $('#billingaddress1').val(profileData.addressLine1)
                $('#billingaddress2').val(profileData.addressLine2)
    
                populateDropdown(`${SETTINGS.backendUrl}/Masters/GetAllLocations`, '#locationSelect', profileData.lctnId);
          

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

    $("#updateBilling").on('click', function (e) {
        $.ajax({
            url: `${SETTINGS.backendUrl}/CustomerAccount/GetCustShippingAddressById/${profileData[0].custId}`,
            method: 'POST',  // Assuming this should be a POST request, change it if necessary
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            data: JSON.stringify({
                custCompany: $('#firstName').val(),
                custCompTaxNo: $('#lastName').val(),
                addressLine1: $('#phoneNumber').val(),
                addressLine2: $('#profileaddress2').val(),
                lctnId: $('#locationSelect').val(),
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
                                <a href="javascript:void(0);" 
                                data-bs-toggle="modal" class="open-quick-view" data-bs-target="#EditShipping" onclick="getshippingbyId(${shipping.csaEntryId})">Edit shipping Info</a>
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
function getshippingbyId(id) {
    $.ajax({
        url: `${SETTINGS.backendUrl}/CustomerAccount/GetCustShippingAddressById/${id}`,
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // Add other headers as needed
        },
        dataType: 'json',
        success: function (profileData) {
            console.log('profileDataddd', profileData);
            $('#shippingname').val(profileData.name)
            $('#contactno').val(profileData.contactNo)
            $('#altcontactno').val(profileData.altContactNo)
            $('#shippingaddress1').val(profileData.addressLine1)
            $('#shippingaddress2').val(profileData.addressLine2)
            $('#shippingremark').val(profileData.remark)
            populateDropdown(`${SETTINGS.backendUrl}/Masters/GetAllLocations`, '#shippingLocation', profileData.lctnId);
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

                console.log('Billing address added successfully:', response);
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
// ................. addshippingInfo function end .................. 

$(document).ready(function () {
    getProfile()
    getBillingInfo()
    addshippingInfo()
    getshippingInfo()
    // addBillingAddress()
});
