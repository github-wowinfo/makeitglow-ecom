var token = localStorage.getItem("token");
var username = localStorage.getItem("userName");
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(EmailId)) {
    toastr.error("Please enter a valid email address.");
    return;
  }
  if (Passwords.length < 8) {
    toastr.error("Please enter a valid Password. only using");
    return;
  }

  var userData = {
    userType: 2,
    email: EmailId,
    password: Passwords,
  };

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
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.profile.userId)
      localStorage.setItem('uid', response.profile.uid)
      localStorage.setItem('userName', fullName)

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
      toastr.success("Please Confirm your mail ");
      // contentTy  // window.location.href="./index.html";
      // if (response === "Account confirmed!") {
      $("#openConfirmationM").modal("hide");
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
  const responseData = {
    email: decodedCredential.email,
    externalLoginId: decodedCredential.sub,

  };
  externalLogin(responseData);
}



function externalLogin(responseData) {
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
      var fullName = response.profile.firstName + ' ' + response.profile.lastName;
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.profile.userId)
      localStorage.setItem('uid', response.profile.uid)
      localStorage.setItem('userName', fullName)

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
    },
  });
}