// Function to get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get category ID from the URL
const catId = getQueryParam('catId');


$.ajax({
    type: "GET",
    url: `${SETTINGS.backendUrl}/Items/GetItemByCategoryId?id=${catId}`,
    dataType: "json",
    success: function (response) {
        console.log('response', response);
    }
});


