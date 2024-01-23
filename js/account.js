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

                var profile = `<h4>Shipping Info</h4>
                  <p>Customer ID: ${shipping.custId}</p>
                  <p>Customer Name: ${shipping.name}</p>
                  <p>Contact No: ${shipping.contactNo}</p>
                  <p>Alt Contact No: ${shipping.altContactNo}</p>
                  <p>Address Line 1: ${shipping.addressLine1}</p>
                  <p>Address Line 2: ${shipping.addressLine2}</p>
                  <p>Remark: ${shipping.remark}</p>
                  <a href="" class="">Edit Billing Info</a>`;
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
});
