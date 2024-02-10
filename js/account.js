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
            // $(dropdownSelector).selectric('refresh');
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
            // $(dropdownSelector).selectric('refresh');
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
            // console.log('profileData', profileData);
            var profile = `
            <div class="col-md-12">
							<div class="card">
								<div class="card-body" >
                                <div class="mb-3"> <h2>Personal Info</h2></div>
                               <p class="m-1">CUSTOMER ID : <span class="text-black"> ${profileData.uid}</span></p>
                               <p class="m-1"> <span class="text-black "> ${profileData.firstName} ${profileData.lastName}</span></p>
                               <p class="m-1">  <span class="text-black "> ${profileData.phoneNumber}</span></p>
                               <p class="m-1"> <span class="text-black "> ${profileData.email}</span></p>
                               <p class="m-1"> <span class="text-black "> ${profileData.location}</span></p>
                               <p class="m-1">  <span class="text-black "> ${profileData.addressLine1}</span></p>
                               <p class="m-1 ">  <span class="text-black "> ${profileData.addressLine2}</span></p>
                               <a href="javascript:void(0);" 
                               data-bs-toggle="modal" class="open-quick-view  btn btn-secondary btnhover text-uppercase rounded-1 mt-2 me-2 " data-bs-target="#profileEdit">
                               Edit
                               </a>
                               <a href="./changepass.html" 
                                data-bs-toggle="modal" class="btn btn-secondary btnhover text-uppercase mt-2 rounded-1 "    >
                                Change Password</a>
                                </div>
				              	  </div>
				                  	 </div>`;

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

            // console.log('Billing address added successfully:', response);
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
            // profileData.forEach(function (Billing) {
            console.log('profileDatabiili', profileData.length);
            if (profileData.length > 0) {

                // <p class=""m-1>  <span class="text-black"> ${profileData[0].cbaEntryId} </span></p>
                var profile = `
                <div class="col-md-12">
							<div class="card">
								<div class="card-body" >
                    <div class="mb-3"><h2>Billing Info</h2></div>  
                    <p class=" m-1"> <span class="text-black"> ${profileData[0].custCompany} </span></p>
                    <p class=" m-1"> <span class="text-black"> ${profileData[0].custCompTaxNo} </span></p>
                    <p class=" m-1"> <span class="text-black"> ${profileData[0].addressLine1} </span></p>
                    <p class=" m-1"> <span class="text-black"> ${profileData[0].addressLine2} </span></p>
                    <p class=" m-1"> <span class="text-black"> ${profileData[0].remark} </span></p>
                    <a href="javascript:void(0);" 
                    data-bs-toggle="modal" class="open-quick-view btn btn-secondary btnhover mt-2 text-uppercase rounded-1" data-bs-target="#EditBilling" onclick="getbillingbyId(${profileData[0].cbaEntryId})">
                    Edit</a>
                    
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

function getbillingbyId(id) {
    $.ajax({
        url: `${SETTINGS.backendUrl}/CustomerAccount/GetCustBillingAddressById/${id}`,
        method: 'GET',
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // Add other headers as needed
        },
        dataType: 'json',
        success: function (profileData) {
            console.log('profileDataddd', profileData);
            $('#cmpnyname').val(profileData.custCompany)
            $('#cmpnytx').val(profileData.custCompTaxNo)
            $('#billingaddress1').val(profileData.addressLine1)
            $('#billingaddress2').val(profileData.addressLine2)
            $('#billingremark').val(profileData.remark)
            populateDropdown(`${SETTINGS.backendUrl}/Masters/GetAllLocations`, '#billinglocation', profileData.lctnId);
        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });

    $("#updateBilling").on('click', function (e) {
        e.preventDefault()
        console.log('clicked');
        $.ajax({
            url: `${SETTINGS.backendUrl}/CustomerAccount/UpdateCustBillingAddress`,
            method: 'POST',  // Assuming this should be a POST request, change it if necessary
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            data: JSON.stringify({
                cbaEntryId: id,
                custCompany: $('#cmpnyname').val(),
                custCompTaxNo: $('#cmpnytx').val(),
                addressLine1: $('#billingaddress1').val(),
                addressLine2: $('#billingaddress2').val(),
                lctnId: $('#billinglocation').val(),
                remark: $('#billingremark').val(),
            }),
            success: function (response) {
                // Handle success response
                //    localStorage.setItem('token', response);

                console.log('Billing address added successfully:', response);
                toastr.success("Shipping Info Updated successfully ");

                location.reload();
                // You may want to update the UI or perform other actions here
                $("#EditShipping").modal("hide");
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
                // console.log('shipping', shipping);
                // <p> <span class="text-black"> ${shipping.csaEntryId} </span></p>

                var profile = `  
                <div class="col-md-6">
							<div class="card">
								<div class="card-body" >
                                <h2 class="mb-3">Shipping Info</h2>
                                <p class="m-1"> <span class="text-black"> ${shipping.name} </span></p>
                                <p class="m-1"> <span class="text-black"> ${shipping.contactNo} </span></p>
                                <p class="m-1"> <span class="text-black"> ${shipping.altContactNo} </span></p>
                                <p class="m-1"> <span class="text-black"> ${shipping.addressLine1} </span></p>
                                <p class="m-1"> <span class="text-black"> ${shipping.addressLine2} </span></p>
                                <p class="m-1"> <span class="text-black"> ${shipping.remark} </span></p>
                                <a href="javascript:void(0);" 
                                data-bs-toggle="modal" class="open-quick-viewc text-uppercase btn btn-secondary btnhover rounded strong mt-2" data-bs-target="#EditShipping" onclick="getshippingbyId(${shipping.csaEntryId})">Edit</a>
                                <a class=" text-uppercase  mt-2 ms-1  delete-button   btn btn-danger btnhover rounded" data-csa-entry-id="${shipping.csaEntryId}">Delete</a>
								</div>
							</div>
						</div>`;
                $('#shippinginfo').append(profile);
            })
            // Add event listener for the Delete button
            $('.delete-button').on('click', function () {
                var csaEntryId = $(this).data('csa-entry-id');
                openDeleteConfirmationModal(csaEntryId);

            });

        },
        error: function (error) {
            console.error('Error fetching cart data:', error);
        }
    });


    function openDeleteConfirmationModal(csaEntryId) {
        // Create a confirmation modal dynamically
        var confirmationModalHtml = `
            <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirmation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
						</button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this shipping address?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary rounded-1" id="confirmationdone" onclick="deleteShippingAddress(${csaEntryId})">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>`;

        // Append the confirmation modal HTML to the body
        $('body').append(confirmationModalHtml);

        // Show the confirmation modal
        $('#deleteConfirmationModal').modal('show');

        // Remove the modal from the DOM after it's closed
        // $('#deleteConfirmationModal').on('hidden.bs.modal', function () {
        //     $(this).remove();
        //     // deleteShippingAddress(csaEntryId);

        // });
        $('#confirmationdone').on('click', function () {
            // var csaEntryId = $(this).data('csa-entry-id');
            deleteShippingAddress(csaEntryId);
            location.reload()


        });
    }
    function deleteShippingAddress(csaEntryId) {
        $.ajax({
            url: `${SETTINGS.backendUrl}/CustomerAccount/DeleteCustShippingAddress/${csaEntryId}`,
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            success: function (response) {
                console.log('Shipping address deleted successfully:', response);
                toastr.success("Shipping address deleted successfully");
                // Remove the corresponding card from the UI
                $(`.delete-button[data-csa-entry-id="${csaEntryId}"]`).closest('.card').remove();
            },
            error: function (error) {
                console.error('Error deleting shipping address:', error);
                toastr.error(error);
            }
        });
    }
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
            // console.log('profileDataddd', profileData);
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
    
    $("#updateshipping").on('click', function (e) {
        e.preventDefault()
        console.log('clicked');
        $.ajax({
            url: `${SETTINGS.backendUrl}/CustomerAccount/UpdateCustShippingAddress`,
            method: 'POST',  // Assuming this should be a POST request, change it if necessary
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            data: JSON.stringify({
                csaEntryId: id,
                name: $('#shippingname').val(),
                contactNo: $('#contactno').val(),
                altContactNo: $('#altcontactno').val(),
                addressLine1: $('#shippingaddress1').val(),
                addressLine2: $('#shippingaddress2').val(),
                remark: $('#shippingremark').val(),
                lctnId: $('#shippingLocation').val(),
            }),
            success: function (response) {
                // Handle success response
                //    localStorage.setItem('token', response);

                // console.log('Billing address added successfully:', response);
                toastr.success("Shipping Info Updated successfully ");

                // You may want to update the UI or perform other actions here
                $("#EditShipping").modal("hide");
            },
            error: function (error) {
                console.error('Error adding billing address:', error);
                // Handle error response
                toastr.error(error);

            }
        });
    })

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
// ................. addshippingInfo function end .................. 

$(document).ready(function () {
    getProfile()
    getBillingInfo()
    addshippingInfo()
    getshippingInfo()
    // addBillingAddress()
});
