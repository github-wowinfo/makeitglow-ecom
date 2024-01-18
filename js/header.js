
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
</ul>`
    $('#user-dropdown').append(dropdown)
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
