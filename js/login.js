var token = localStorage.getItem("token");
console.log(token);
var username = localStorage.getItem("userName");
console.log(username);
document.getElementById("login").addEventListener("click", function (e) {
  e.preventDefault();

  const EmailId = document.getElementById("email").value;
  const Passwords = document.getElementById("password").value;
  const togglePassword = document.querySelector('#togglePassword');



  // Validate first name  (not empty)
  document.querySelectorAll(".error").forEach((element) => {
    element.textContent = "";
  });

  // let hasError = false;

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
    toastr.error("Please enter a valid Password. only using");

    return;
  }
  // console.log(FirstName);

  var userData = {
    userType: 2,
    email: EmailId,
    password: Passwords,
    // Add any other required fields for user registration
  };
  console.log("userData :", userData);

  $.ajax({
    url: `${SETTINGS.backendUrl}/Auth/Login`,
    type: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    },
    dataType: "json", // Change the datatype according to your response type
    contentType: "application/json", // Set the Content-Type
    data: JSON.stringify(userData), // Convert object to JSON string

    success: function (response) {
      var fullName = response.profile.firstName + ' ' + response.profile.lastName;

      console.log(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.profile.userId)
      localStorage.setItem('uid', response.profile.uid)
      localStorage.setItem('userName', fullName)
      localStorage.setItem('uid', response.profile.firstName)
      console.log("Sign In Success:", response.profile);

      toastr.success("Login In successful! ");
      // window.location.href = "./index.html";

      // Check for the stored redirect URL
      var redirectUrl = sessionStorage.getItem('redirectUrl');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectUrl'); // Clear the stored URL
        window.location.href = redirectUrl;
      } else {
        // Redirect to the default URL if there is no stored URL
        window.location.href = "./index.html";
      }
    },
    error: function (error) {
      console.log("Sign in Error:", error);
      toastr.error(error.responseJSON.message);

      if (error.responseJSON.message === "Account not confirmed!") {
        $("#openConfirmationM").modal("show");
        console.log("hi modal");
      }
    },
  });
});

document.getElementById('togglePassword').addEventListener('click', function () {
  var passwordInput = document.getElementById('password');
  var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
});

document.getElementById("handleConfirmation").addEventListener("click", function (e) {
  e.preventDefault();
  var email = document.getElementById("confirmationEmail").value;

  // Simple email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    toastr.error("Please enter a valid email address");
    return;
  }

  $.ajax({
    url: `${SETTINGS.backendUrl}/Auth/ConfirmAccountByEmail?Email=${email}`,
    type: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    },
    dataType: "text", // Change the datatype according to your response type
    // contentType: "application/json", // Set the Content-Type

    success: function (response) {
      console.log("Sign In Success:", response);
      toastr.success("Please Confirm your mail ");
      // contentTy  // window.location.href="./index.html";
      // if (response === "Account confirmed!") {
      $("#openConfirmationM").modal("hide");
      console.log("Close modal");
      // }
      // window.location.href="./index.html";
    },
    error: function (error) {
      console.log("Sign in Error:", error);
      toastr.error(error.responseJSON.message);

    },
  });

});


function loginCallBack(resopnse) {
  var decodedCredential = jwtDecode(resopnse.credential);
  console.log(decodedCredential);
  // currentEmail = decodedCredential.email;
  // console.log(currentEmail);
  // currentName = decodedCredential.given_name;
  // localStorage.setItem("currentEmail", currentEmail);
  // localStorage.setItem("currentName", currentName);
  const responseData = {
    email: decodedCredential.email,
    externalLoginId: decodedCredential.sub,

  };
  externalLogin(responseData);
}



function externalLogin(responseData) {
  console.log('responseData', responseData);
  $.ajax({
    url: `${SETTINGS.backendUrl}/Auth/LoginWithGoogle`,
    type: "POST",
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      // Add other headers as needed
    },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(responseData),
    success: function (response) {
      console.log("Sign In Success:", response);
    },
    error: function (error) {
      console.log("Sign in Error:", error);
      toastr.error(error.responseJSON.message);
    },
  });
}