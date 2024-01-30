function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get category ID from the URL
const refId = getQueryParam('ref');

console.log('refId', refId);

$.ajax({
    url: `${SETTINGS.backendUrl}/Order/GetOrderPaymentDetailsByPaymentRefId?PaymentRefId=${refId}`,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log('data', data);

    },
    error: function (error) {
        console.error('Error fetching data:', error);
    }
});