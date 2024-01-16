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
