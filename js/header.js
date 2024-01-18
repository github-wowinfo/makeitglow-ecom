
var token = localStorage.getItem("token");
console.log('token', token);
if (token === null) {
    var dropdown = `
    <ul>
    <li><a href="./login.html">Login / Registration</a></li>
</ul>`
    $('#user-dropdown').append(dropdown)
} else {
    var dropdown = `
    <ul>
    <li><a href="./changepass.html">Change Password</a></li> 
    <li><a href="#/" onClick="logout()">Logout</a></li> 
</ul>`
    $('#user-dropdown').append(dropdown)
}

function logout() {
    window.location.href = "./login.html";
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('uid')
}

$.ajax({
    type: "GET",
    url: `${SETTINGS.backendUrl}/Masters/GetAllCategories`,
    dataType: "json",
    success: function (response) {
        let li = ``;
        $.each(response, function (index, value) {
            // console.log('response', value);
            li += `<li><a href="./products.html?catId=${value.catgEntryId}">${value.catgName}</a></li>`;
        });
        $('#categoryListing').append(li);
    }
});
