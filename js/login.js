var token = localStorage.getItem("token");
console.log(token);
document.getElementById("login").addEventListener("click", function (e) {
  e.preventDefault();

  const EmailId = document.getElementById("email").value;
  const Passwords = document.getElementById("password").value;

  // Validate first name  (not empty)
  document.querySelectorAll(".error").forEach((element) => {
    element.textContent = "";
  });

  // let hasError = false;

  // Validate email format using a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(EmailId)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate password (at least 8 characters)
  if (Passwords.length < 8) {
    alert("Password must be at least 8 characters.");
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
      localStorage.setItem('token', response.token);

      console.log("Sign In Success:", response);
      toastr.success("Login In successful! ");
      // window.location.href="./index.html";
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
      toastr.success("Login In successful! ");
      // window.location.href="./index.html";
    },
    error: function (error) {
      console.log("Sign in Error:", error);
      toastr.error(error.responseJSON.message);

    },
  });

});
