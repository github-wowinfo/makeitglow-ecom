// $(document).ready(function() {
//     // Make AJAX request to get dropdown options
//     $.ajax({
//          type: 'GET',
//         url: 'https://mig-dev.lifelinemegacorp.com/api/Masters/GetAllLocations',
//         dataType: 'json',
//         success: function(data) {
//             data.forEach(option => {
                
//                     console.log('option', option.locationName);
//                 $('#dropdown').append('<option>' + option.locationName +'</option>')
//             });
//             // Populate the dropdown with received options
//             // var dropdown = $('#dropdown');
//             // $.each(data, function(index, option) {
//             //     dropdown.append($('<option>').text(option.locationName).val(option.locationName));
//             // });
//         },
//         error: function(error) {
//             console.log('Error:', error);
//         }
//     });
// });

// $(document).ready(function() {
//     $('#fetchCountriesBtn').click(function() {
//       // Make AJAX request to fetch countries data
//       $.ajax({
//         url: 'https://restcountries.com/v3.1/all',
//         method: 'GET',
//         success: function(data) {
//           // Populate the dropdown with fetched country data
//           populateDropdown(data);
//         },
//         error: function(xhr, status, error) {
//           console.error('Error fetching countries:', error);
//           alert('Error fetching countries. Please try again.');
//         }
//       });
//     });

//     function populateDropdown(countries) {
//       const selectElement = $('#countrySelect');
      
//       // Clear existing options
//       selectElement.empty();

//       // Add a default option
//       selectElement.append($('<option>').val('').text('Select a country'));

//       // Add options for each country
//       countries.forEach(function(country) {
//         selectElement.append($('<option>').val(country.alpha3Code).text(country.name.common));
//       });
//     }
//   });

// $(document).ready(function() {
//   $('#country').click(function() {
//     // Make AJAX request to fetch countries data
//     $.ajax({
//       url: 'https://restcountries.com/v3.1/all',
//       method: 'GET',
//       success: function(data) {
//         // Populate the dropdown with fetched country data
//         populateDropdown(data);
//       },
//       error: function(xhr, status, error) {
//         console.error('Error fetching countries:', error);
//         alert('Error fetching countries. Please try again.');
//       }
//     });
//   });

//   function populateDropdown(countries) {
//     const selectElement = $('#countrySelect');
    
//     // Clear existing options
//     selectElement.empty();

//     // Add a default option
//     selectElement.append($('<option>').val('').text('Select a country'));

//     // Add options for each country
//     countries.forEach(function(country) {
//       selectElement.append($('<option>').val(country.alpha3Code).text(country.name.common));
//     });
//   }
// });

// var token = localStorage.getItem("token");

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
    $('#countrySelect').append(li);
    $('#countrySelect').selectric('refresh');
  }
})

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
    $('#refrenceSelect').selectric('refresh');
  }
})

// $(document).ready(function() {
    // Data to be sent in the POST request
    // var postData = {
    //     userType: 2,
    //     firstName: "string",
    //     lastName: "string",
    //     phoneNumber: "string",
    //     lctnId: 1,
    //     refID: 1,
    //     email: "string",
    //     password: "string",
    //     addressLine1: "string"
    // };

    // Make POST request
//     $.ajax({
//         url: 'https://mig-dev.lifelinemegacorp.com/api/Auth/Register',
//         type: 'POST',
//         // dataType: 'json', // Change the datatype according to your response type
//         contentType: 'application/json', // Set the Content-Type
//         data: JSON.stringify(postData), // Convert object to JSON str
//         data: postData,
//         success: function(response) {
//             console.log('Success:', response);
//             // Handle the response from the server
//         },
//         error: function(error) {
//             console.log('Error:', error);
//             // Handle errors, if any
//         }
//     });
// });


// $(document).ready(function() {
    // Data to be sent in the POST request
    document.getElementById("postButton").addEventListener("click", function(e){
      e.preventDefault()
        const FirstName = document.getElementById("firstname").value;
        const LastName = document.getElementById("lastname").value;
        const EmailId = document.getElementById("email").value;
        const Passwords = document.getElementById("password").value;
        const PhoneNum = document.getElementById("phone").value;
        const Addresses = document.getElementById("address").value;
        const Countries = document.getElementById("countrySelect").value;
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
  if (Addresses === '') {
    // alert("Address is a required field.");
    toastr.error("Please enter a valid phone number.");

    return;
  }  // console.log(FirstName);
  
    var userData = {
        "userType": 2,
        "email": EmailId,
        "password": Passwords,
        "firstName": FirstName,
        "lastName": LastName,
        "phoneNumber": PhoneNum,
        "addressLine1":Addresses,
        // "addressLine2": "",
        "lctnId": Countries,
        "refId": RefId  
        // Add any other required fields for user registration
    };
console.log('userData :',userData);

    $.ajax({
        url: `${SETTINGS.backendUrl}/Auth/Register`,
        type: 'POST',
        dataType: 'json', // Change the datatype according to your response type
        contentType: 'application/json', // Set the Content-Type
        data: JSON.stringify(userData), // Convert object to JSON string
        success: function(response) {
          // var token = 'your_generated_token';

          // Save the token in localStorage
          localStorage.setItem('token', response.token);
            console.log('Registration Success:', response);
            
            // Handle the response from the server after successful registration
            // Show success toast
            toastr.success("Registered successful! ");
            window.location.href="./login.html";


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
        error: function(error) {
            // console.log('Registration Error:', error);
            console.log("Registration Error::", error.responseJSON.message);
            toastr.error(error.responseJSON.message);
          // toastr.error("error occured");

            
        }
    });
});



