
  document.getElementById("placeorder").addEventListener("click", function (e) {
    e.preventDefault()
      const EmailId = document.getElementById("email").value;
      const Countries = document.getElementById("country").value;
      const FirstName = document.getElementById("firstname").value;
      const LastName = document.getElementById("lastname").value;
      const Company = document.getElementById("company").value;
      const Addresses = document.getElementById("address").value;
      const State = document.getElementById("state").value;
      const City = document.getElementById("city").value;
      const PhoneNum = document.getElementById("phone").value;

    // Validate first name  (not empty)
    document.querySelectorAll('.error').forEach(element => {
      element.textContent = '';
    });
  
    // let hasError = false;

   // Validate email format using a simple regex
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(EmailId)) {
     // alert("Please enter a valid email address.");
     toastr.error("Please enter a valid email address.");
 
     return;
   }
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
      toastr.error("Please enter a valid address.");
  
      return;
    }  
        
    if (State === '') {
        // alert("Address is a required field.");
        toastr.error("Please enter a valid state.");
    
        return;
      }   if (City === '') {
        // alert("Address is a required field.");
        toastr.error("Please enter a valid city.");
    
        return;
      } 
 
   // console.log(FirstName);
  
    var userData = {
    //   "userType": 2,
      "email": EmailId,
      "lctnId": Countries,
      "firstName": FirstName,
      "lastName": LastName,
      "company":Company,
      "addressLine1": Addresses,
       "state": State,
       "city": City,
      "phoneNumber": PhoneNum,
   
      // Add any other required fields for user registration
    };
    console.log('userData :', userData);
  
    // $.ajax({
    //   url: `${SETTINGS.backendUrl}/Auth/Register`,
    //   type: 'POST',
    //   dataType: 'json', // Change the datatype according to your response type
    //   contentType: 'application/json', // Set the Content-Type
    //   data: JSON.stringify(userData), // Convert object to JSON string
    //   success: function (response) {
    //     // var token = 'your_generated_token';
  
    //     // Save the token in localStorage
    //     localStorage.setItem('token', response.token);
    //     console.log('Registration Success:', response);
  
    //     // Handle the response from the server after successful registration
    //     // Show success toast
    //     toastr.success("Registered successful! ");
    //     window.location.href = "./login.html";
    //     },
    //   error: function (error) {
    //     // console.log('Registration Error:', error);
    //     console.log("Registration Error::", error.responseJSON.message);
    //     toastr.error(error.responseJSON.message);
    //     // toastr.error("error occured");
  
  
    //   }
    // });
  });