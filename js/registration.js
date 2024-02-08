
$.ajax({
  type: "GET",
  url: `${SETTINGS.backendUrl}/Masters/GetAllCountries`,
  dataType: "json",
  success: function (response) {
    let options = '<option value="">Select</option>';
    $.each(response, function (index, value) {
      // console.log(value);
      options += `<option value="${value.countryId}">${value.countryName}</option>`;
    });
    $('#countrySelect').html(options);

    // Refresh Bootstrap Select after updating options
    $('#countrySelect').selectpicker('refresh');
  }
});

// Location selection change event
$('#countrySelect').on('change', function () {
  // Get the selected countryId
  let selectedCountryId = $(this).val();
  // console.log('Selected Country ID:', selectedCountryId);

  // Clear existing options in locationSelected
  $('#locationSelected').empty();

  // Location AJAX request
  $.ajax({
    type: "GET",
    url: `${SETTINGS.backendUrl}/Masters/GetAllLocationsByCountryId/${selectedCountryId}`,
    dataType: "json",
    success: function (response) {
      let options = '<option value="">Select</option>';
      $.each(response, function (index, value) {
        // console.log(value);
        options += `<option value="${value.lEntryId}">${value.locationName}</option>`;
      });
      $('#locationSelected').html(options);
      // $.each(response, function (index, value) {
      //   $('#locationSelected').append(`<option value="${value.lEntryId}">${value.locationName}</option>`);
      // });

      // Refresh Bootstrap Select after updating options
      $('#locationSelected').selectpicker('refresh');
    }
  });
});



$.ajax({
  type: "GET",
  url: `${SETTINGS.backendUrl}/Masters/GetAllReferences`,
  // url: 'https://mig-dev.lifelinemegacorp.com/api/Masters/GetAllReferences',
  dataType: "json",
  success: function (response) {
    // console.log(response);
    let li = `<option value="">Select</option>`
    $.each(response, function (index, value) {
      li += `<option value="${value.refEntryId}">${value.referenceName}</option>`
    });
    $('#refrenceSelect').append(li);
    // $('#refrenceSelect').selectric('refresh');
  }
})


// $(document).ready(function() {
// Data to be sent in the POST request
document.getElementById("postButton").addEventListener("click", function (e) {
  e.preventDefault()
  const FirstName = document.getElementById("firstname").value;
  const LastName = document.getElementById("lastname").value;
  const EmailId = document.getElementById("email").value;
  const Passwords = document.getElementById("password").value;
  const PhoneNum = document.getElementById("phone").value;
  // const Addresses = document.getElementById("address").value;
  const Countries = document.getElementById("locationSelected").value;
  const RefId = document.getElementById("refrenceSelect").value;
  // Validate first name  (not empty)
  document.querySelectorAll('.error').forEach(element => {
    element.textContent = '';
  });

  let hasError = false;

  // Validate first name and last name (not empty)
  if (FirstName === '') {
    toastr.error("First name is required.");
    // document.getElementById("firstNameError").textContent = "First name is required.";
    // hasError = true;
    return
  }

  if (LastName === '') {
    toastr.error("Last name is required.");
    // document.getElementById("lastNameError").textContent = "Last name is required.";
    // hasError = true;
    return

  }

  // Validate email format using a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(EmailId)) {
    // alert("Please enter a valid email address.");
    toastr.error("Please enter a valid email address.");

    return;
  }

  // Validate password (at least 8 characters)
  if (Passwords.length < 8) {
    // alert("Password must be at least 8 characters.");
    toastr.error("Password must be at least 8 characters.");

    return;
  }

  // Validate phone number (only digits, optional country code)
  const phoneRegex = /^\+?[0-9]*$/;
  if (!phoneRegex.test(PhoneNum)) {
    // alert("Please enter a valid phone number.");
    toastr.error("Please enter a valid phone number.");

    return;
  }

  // Validate address (not empty)
  // if (Addresses === '') {
  //   // alert("Address is a required field.");
  //   toastr.error("Please enter a valid address.");

  //   return;
  // }  // console.log(FirstName);

  var userData = {
    "userType": 2,
    "email": EmailId,
    "password": Passwords,
    "firstName": FirstName,
    "lastName": LastName,
    "phoneNumber": PhoneNum,
    "addressLine1": '',
    // "addressLine2": "",
    "lctnId": Countries,
    "refId": RefId

    // Add any other required fields for user registration
  };
  // console.log('userData :', userData);

  $.ajax({
    url: `${SETTINGS.backendUrl}/Auth/Register`,
    type: 'POST',
    dataType: 'json', // Change the datatype according to your response type
    contentType: 'application/json', // Set the Content-Type
    data: JSON.stringify(userData), // Convert object to JSON string
    success: function (response) {
      // var token = 'your_generated_token';

      // Save the token in localStorage
      localStorage.setItem('token', response.token);
      console.log('Registration Success:', response);

      // Handle the response from the server after successful registration
      // Show success toast
      toastr.success("Registered successful! ");
      window.location.href = "./login.html";


      //   $.ajax({
      //     url: `${SETTINGS.backendUrl}Auth/ConfirmAccountByEmail?Email=${EmailId}`,
      //     type: 'POST', // or 'POST' or other method
      //     dataType: 'json',
      //     // Add headers or other configurations as needed

      //     success: function(secondApiResponse) {
      //         console.log('Second API Success:', secondApiResponse);
      //         // Handle the response from the second API
      //         toastr.success("Confirmation mail sent to your mail id ");
      //         // Redirect to another page or perform other actions as needed
      //         // window.location.href = "./login.html";
      //     },
      //     error: function(secondApiError) {
      //         console.log('Second API Error:', secondApiError);
      //         // Handle errors from the second API
      //     }
      // });
      // window.location.href = "./login.html"; // Replace with your desired redirect URL
    },
    error: function (error) {
      // console.log('Registration Error:', error);
      console.log("Registration Error::", error.responseJSON.message);
      toastr.error(error.responseJSON.message);
      // toastr.error("error occured");


    }
  });
});
document.getElementById('togglePassword').addEventListener('click', function () {
  var passwordInput = document.getElementById('password');
  var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
});

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }


// function handleCredentialResponse(response) {
//   // decodeJwtResponse() is a custom function defined by you
//   // to decode the credential response.
//   const responsePayload = decodeJwtResponse(response.credential);

//   console.log("ID: " + responsePayload.sub);
//   console.log('Full Name: ' + responsePayload.name);
//   console.log('Given Name: ' + responsePayload.given_name);
//   console.log('Family Name: ' + responsePayload.family_name);
//   console.log("Image URL: " + responsePayload.picture);
//   console.log("Email: " + responsePayload.email);
// }
async function loginWithGoogle(tokenResponse) {
  try {
    const resp = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    });
    if (!resp.ok) {
      throw new Error('Failed to fetch user info from Google.');
    }
    const responseData = await resp.json(); // Extract JSON response
    const userData = {
      name: responseData.name,
      email: responseData.email,
      loginType: "Google",
      firstName: responseData.given_name,
      lastName: responseData.family_name,
      phone: "", // Assuming phone is not provided in the response
      externalLoginId: responseData.sub,
    };
    console.log('userData', userData);
    // externalLogin(userData);
    // setIsLoading(false);
  } catch (error) {
    console.error('Error fetching user info:', error);
    // setIsLoading(false);
  }
}