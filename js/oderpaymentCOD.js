function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get category ID from the URL
const refId = getQueryParam('ref');

console.log('refId', refId);

// Simulating data for demonstration
var data = {
    data: {
        paymentState: "CAPTURED", // Change this value to test different cases
        orderId: "12345" // Change this value accordingly
    }
};

// Process the data and append HTML based on paymentState
if (data.data.paymentState === "CAPTURED" || data.data.paymentState === "AUTHORISED") {
    displayConfirmation(data.orderId);
} else if (data.data.paymentState === "FAILED") {
    displayFailure();
}

function displayConfirmation(orderId) {
    var confirm = `
        <div class="card rounded-1 p-10" style="border: 1px solid gainsboro;" >
            <div class="d-flex">
                <div class="icon-container text-center mb-3">
                    <i class="fas fa-check-circle fa-2x text-success me-3"></i>
                </div>
                <h3 class="text-center">Payment Received</h3>
            </div>
            <div>
                <h2 class="mb-4">Your Order is Confirmed</h2>
                <p>Thank you for your order. You will receive your order soon</p>
            </div>
            <div class="d-flex">
                <a href="./index.html" type="button" class="btn btn-secondary me-5 rounded">Continue Shopping</a><br>
                <a href="./orderDetails.html?orderId=${data.orderId}" class="btn btn-primary rounded"> View Order</a>
            </div>
        </div>`;

    $('#orderConfirmation').append(confirm);
}

function displayFailure() {
    var confirm = `
        <div class="card rounded-1 p-10" style="border: 1px solid gainsboro; ">
            <div class="d-flex justify-content-center">
                <div class="icon-container text-center mb-3">
                    <i class="fas fa-check-circle fa-2x text-success me-3"></i>
                </div>
                <h3 class="text-center">Payment Received</h3>
            </div>
            <div>
                <h2 class="mb-4">Your Order is Confirmed</h2>
                <p>Thank you. We will deliver your order soon.</p>
            </div>
            <div class="d-flex">
                <a href="./index.html" type="button" class="btn btn-secondary me-5 rounded">Continue Shopping</a><br>
                <a href="./orderDetails.html" class="btn btn-primary rounded"> View Order</a>
            </div>
        </div>`;

    $('#orderfailer').append(confirm);
}


// $.ajax({
//     url: `${SETTINGS.backendUrl}/Order/GetOrderPaymentDetailsByPaymentRefId?PaymentRefId=${refId}`,
//     method: 'GET',
//     dataType: 'json',
//     headers: {
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/json",
//         // Add other headers as needed
//     },
//     success: function (data) {
//         console.log('data', data);
//         if (data.data.paymentState === "CAPTURED"||data.data.paymentState==="AUTHORISED") {
//             var confirm = `
//             <div class="" style="margin-left: 100px; margin-top: 60px;">
// 					<div class="d-flex">
// 						<div class="icon-container text-center mb-3">
// 							<i class="fas fa-check-circle fa-2x text-success me-3"></i>
// 						</div>
// 						<h3 class="text-center">Payment Received</h3>
// 					</div>
// 					<div>
// 						<h2 class="mb-4">Your Order is Confirmed</h2>
// 						<p>Thankyou for your order. You will receive your order soon</p>
// 					</div>
// 					<div class="d-flex">
// 						<a href="./index.html" type="button" class="btn btn-secondary me-5 rounded">Continue
// 							Shopping</a><br>
// 						<a href="./orderDetails.html?orderId=${data.orderId}" class="btn btn-primary rounded"> View Order</a>
// 					</div>
// 				</div>`

//             $('#orderConfirmation').append(confirm)
//         } else if (data.data.paymentState === "FAILED") {
//             var confirm = `
//             <div class="card rounded-1 p-10" style="border: 1px solid gainsboro; ">
//             <div class="d-flex justify-content-center">
//                 <div class="icon-container text-center mb-3">
//                     <i class="fas fa-check-circle fa-2x text-success me-3"></i>
//                 </div>
//                 <h3 class="text-center">Payment Received</h3>
//             </div>
//             <div>
//                 <h2 class="mb-4">Your Order is Confirmed</h2>
//                 <p>Thank you ..We will delivered your Order soon </p>
//             </div>
//             <div class="d-flex">
//                 <a href="./index.html" type="button" class="btn btn-secondary me-5 rounded">Continue
//                     Shopping</a><br>
//                 <a href="./orderDetails.html" class="btn btn-primary rounded"> View Order</a>
//             </div>
//         </div>`

//             $('#orderfailer').append(confirm)
//         }

//     },
//     error: function (error) {
//         console.error('Error fetching data:', error);
//     }
// });