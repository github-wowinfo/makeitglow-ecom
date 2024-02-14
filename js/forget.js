
var token = localStorage.getItem("token");

$(document).ready(function () {
  $("#forgotPasswordBtn").on("click", function (e) {
    e.preventDefault()
    var email = $("#email").val();
    // Validate email format
    if (!isValidEmail(email)) {
      toastr.error("Invalid email format. Please enter a valid email address.");
      return;
    }
    // var token = "your_authentication_token";
    // If email is valid, proceed with the AJAX request
    $.ajax({
      url: `${SETTINGS.backendUrl}/Auth/ResetPassword/${email}`,
      method: "POST",
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + token,
      },
      // data: JSON.stringify({
      //   UserEmail: currentPassword,
      // }),
      success: function (data) {
        toastr.success("Password reset instructions sent to your email.");
      },
      error: function (error) {
        console.error("Forgot Password Error:", error);
        toastr.error("Failed to initiate password reset. Please try again.");
      }
    });
  });
  // Function to validate email format
  function isValidEmail(email) {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});