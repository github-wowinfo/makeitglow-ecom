// console.log("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2FqYW5pZGEwMUBnbWFpbC5jb20iLCJqdGkiOiI4MmI4ZTE3NS00MWUzLTQ3YTgtOWMxYy0wMGQ4MzEzZmExMzQiLCJleHAiOjE3MzY2Nzc3MzEsImlzcyI6Imh0dHBzOi8vbWljcm9oaW5kLmNvbSIsImF1ZCI6IlVzZXIifQ.lGkDn2hgPtXY5jpRrYQpmq9fjoZ0_5zZROdUYy8rRkY")

var token = localStorage.getItem("token");

$(document).ready(function () {
    $("#forgotPasswordBtn").on("click", function (e) {
      e.preventDefault()
      var email = $("#email").val();
 console.log(email)
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
          // Assuming the server returns a success message
          console.log("Forgot Password Success:", data);
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