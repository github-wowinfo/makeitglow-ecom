var token = localStorage.getItem("token");
$(document).ready(function () {
  $("#changePasswordBtn").on("click", function (e) {
    e.preventDefault()
    var currentPassword = $("#currentPassword").val();
    var newPassword = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();



    // Validate passwords
    //   if (newPassword !== confirmPassword) {
    //     toastr.error("New password and confirm password do not match.");
    //     return;
    //   }
    // Validate passwords
    if (newPassword !== confirmPassword) {
      toastr.error("New password and confirm password do not match.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toastr.error("New password and confirm password do not match.");
      return;

    }

    if (newPassword.length < 8) {
      toastr.error("New password must be at least 8 characters.");
      return;
    }

    var complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!complexityRegex.test(newPassword)) {
      toastr.error("New password must contain at least one uppercase letter, one lowercase letter, and one digit.");
      return;
    }
    // Other password validation criteria can be added here

    // Get the authentication token from wherever you have it stored
    // var token = "your_authentication_token";

    // If passwords are valid, proceed with the AJAX request
    $.ajax({
      url: `${SETTINGS.backendUrl}/Auth/ChangePassword`,
      method: "POST",
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + token,
      },
      data: JSON.stringify({
        oldPassword: currentPassword,
        newPassword: newPassword,
      }),
      success: function (response) {
        toastr.success(response.message);
        // window.location.href('#login')
        window.location.href = "./login.html";
      },
      error: function (error) {
        console.error("Change Password Error:", error);
        toastr.error(error.responseJSON.message)

      }
    });
  });
});

  // Bakhtiy1