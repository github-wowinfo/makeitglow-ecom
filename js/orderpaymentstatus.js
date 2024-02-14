function getQueryParam(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

// Get category ID from the URL
const refId = getQueryParam('ref');

$.ajax({
	url: `${SETTINGS.backendUrl}/Order/GetOrderPaymentDetailsByPaymentRefId?PaymentRefId=${refId}`,
	method: 'GET',
	dataType: 'json',
	headers: {
		Authorization: "Bearer " + token,
		"Content-Type": "application/json",
		// Add other headers as needed
	},
	success: function (data) {
		if (data.data.paymentState === "CAPTURED" || data.data.paymentState === "AUTHORISED") {
			var confirm = `
            <div class="" style="margin-left: 100px; margin-top: 60px;">
					<div class="d-flex">
						<div class="icon-container text-center mb-3">
							<i class="fas fa-check-circle fa-2x text-success me-3"></i>
						</div>
						<h3 class="text-center">Payment Received</h3>
					</div>
					<div>
						<h2 class="mb-4">Your Order is Confirmed</h2>
						<p>Thankyou for your order. You will receive your order soon</p>
					</div>
					<div class="d-flex">
						<a href="./index.html" type="button" class="btn btn-secondary me-5 rounded">Continue
							Shopping</a><br>
						<a href="./orderDetails.html?orderId=${data.orderId}" class="btn btn-primary rounded"> View Order</a>
					</div>
				</div>`

			$('#orderConfirmation').append(confirm)
		} else if (data.data.paymentState === "FAILED") {
			var confirm = `
            <div class="" style="margin-left: 100px; margin-top: 60px;">
					<div class="d-flex">
						<div class="icon-container text-center mb-3">
							<i class="fas fa-times-circle fa-2x text-danger me-3"></i>
						</div>
						<h3 class="text-center">Payment Failed</h3>
					</div>
					<div>
						<h2 class="mb-4"> Order Not Confirmed</h2>
						<p>Please try again... if you want to order</p>
					</div>
					<div class="d-flex">
                    <a href="/shop-checkout.html" class="btn btn-secondary me-5 rounded text-center">Continue
                    Shopping</a>
					</div>
				</div>`

			// $('#orderfailer').append(confirm)
		}

	},
	error: function (error) {
		console.error('Error fetching data:', error);
	}
});