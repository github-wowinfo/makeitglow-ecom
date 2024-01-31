document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault()
  const FirstName = document.getElementById("name").value;
  const EmailId = document.getElementById("email").value;
  const PhoneNum = document.getElementById("number").value;
  const Location = document.getElementById("locationSelection").value;
  const Subject = document.getElementById("subject").value;
  const Message = document.getElementById("messages").value;

  document.querySelectorAll('.error').forEach(element => {
    element.textContent = '';
  });

  if (FirstName === '') {
    toastr.error(" Name is required.");
    // document.getElementById("firstNameError").textContent = "First name is required.";
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(EmailId)) {
    // alert("Please enter a valid email address.");
    toastr.error("Please enter a valid email address.");
    return;
  }

  const phoneRegex = /^\+?[0-9]*$/;
  if (!phoneRegex.test(PhoneNum)) {
    toastr.error("Please enter a valid phone number.");
    return;
  }
  if (Subject === '') {
    toastr.error("Subject is required.");
    return
  }

  if (Message === '') {
    toastr.error("Message is required.");
    return
  }

  var userData = {
    "email": EmailId,
    "name": FirstName,
    "phone": PhoneNum,
    "locationId": Number(Location),
    "subject": Subject,
    "message": Message,
  };
  console.log('userData :', userData);

  $.ajax({
    url: `${SETTINGS.backendUrl}/Ecom/AddContactUs`,
    type: 'POST',
    dataType: 'json', // Change the datatype according to your response type
    contentType: 'application/json', // Set the Content-Type
    data: JSON.stringify(userData),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    }, // Convert object to JSON string
    success: function (response) {

<<<<<<< HEAD
      localStorage.setItem('token', response.token);
=======
      // Save the token in localStorage
      // localStorage.setItem('token', response.token);
>>>>>>> 89b7ba0f893044623c40c24b6f505cd35da08f0f
      console.log('Submitted:', response);
      toastr.success(" Submitted ");

    },
    error: function (error) {
      console.log("Not Submitted:", error);
      toastr.error("Not Submitted:", error.responseJSON.message);

    }
  });
});

$.ajax({
  type: "GET",
  url: `${SETTINGS.backendUrl}/Masters/GetAllLocations`,

  dataType: "json",
  success: function (response) {
    let li = `<option value="">Select</option>`
    $.each(response, function (index, value) {
      li += `<option value="${value.lEntryId}">${value.locationName}</option>`
    });
    $('#locationSelection').append(li);
  }
})