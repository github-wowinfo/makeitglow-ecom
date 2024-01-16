$.ajax({
    type: "GET",
    // url: '${SETTINGS.backendUrl}Masters/GetAllLocations',
    url: `${SETTINGS.backendUrl}/Masters/GetAllCategories`,
    dataType: "json",
    success: function (response) {
        console.log('response', response);
        //   let li = `<option value="">Select</option>`
        //   $.each(response, function (index, value) {
        //     li += `<option value="${value.lEntryId}">${value.locationName}</option>`
        //   });
        //   $('#countrySelect').append(li);
        //   $('#countrySelect').selectric('refresh');
    }
})