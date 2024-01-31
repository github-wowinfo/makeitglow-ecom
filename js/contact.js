document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault()
  const FirstName = document.getElementById("name").value;
  const EmailId = document.getElementById("email").value;
  const PhoneNum = document.getElementById("number").value;
  const Location = document.getElementById("locationSelection").value;
  const Subject = document.getElementById("subject").value;
  const Message = document.getElementById("messages").value;
  // Validate first name  (not empty)
  document.querySelectorAll('.error').forEach(element => {
    element.textContent = '';
  });


  // Validate first name and last name (not empty)
  if (FirstName === '') {
    toastr.error(" Name is required.");
    // document.getElementById("firstNameError").textContent = "First name is required.";
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


  // Validate phone number (only digits, optional country code)
  const phoneRegex = /^\+?[0-9]*$/;
  if (!phoneRegex.test(PhoneNum)) {
    // alert("Please enter a valid phone number.");
    toastr.error("Please enter a valid phone number.");

    return;
  }
  if (Subject === '') {
    toastr.error("Subject is required.");
    // document.getElementById("firstNameError").textContent = "First name is required.";
    // hasError = true;
    return
  }
  if (Message === '') {
    toastr.error("Message is required.");
    // document.getElementById("firstNameError").textContent = "First name is required.";
    // hasError = true;
    return
  }


  var userData = {
    //   "userType": 2,
    "email": EmailId,
    "name": FirstName,
    "phone": PhoneNum,
    "locationId": Number(Location),
    "subject": Subject,
    "message": Message,
    // Add any other required fields for user registration
  };
  console.log('userData :', userData);

  $.ajax({
    url: `${SETTINGS.backendUrl}/Ecom/AddContactUs`,
    type: 'POST',
    dataType: 'json', // Change the datatype according to your response type
    contentType: 'application/json', // Set the Content-Type
    data: JSON.stringify(userData), // Convert object to JSON string
    success: function (response) {
      // var token = 'your_generated_token';

      // Save the token in localStorage
      localStorage.setItem('token', response.token);
      console.log('Submitted:', response);

      toastr.success(" Submitted ");


    },
    error: function (error) {
      // console.log('Registration Error:', error);
      console.log("Not Submitted:", error);
      toastr.error("Not Submitted:", error.responseJSON.message);
      // toastr.error("error occured");


    }
  });
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
    $('#locationSelection').append(li);
    // $('#countrySelect').selectric('refresh');
  }
})