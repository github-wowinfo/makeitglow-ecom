
// var orderID = ''
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get category ID from the URL
const orderID = getQueryParam('orderID');

// Simulating data for demonstration
// var data = {
//     data: {
//         paymentState: "CAPTURED", // Change this value to test different cases
//         orderId: orderID // Change this value accordingly
//     }
// };
// displayConfirmation(orderId);

// Process the data and append HTML based on paymentState
// if (data.data.paymentState === "CAPTURED") {
//     displayConfirmation(data.orderId);

// }

// function displayConfirmation(orderID) {
    var confirm = `
        <div class="card rounded-1 p-10" style="border: 1px solid gainsboro;" >
           
            <div>
            <h2 class="mb-4">Your Order ID is : ${orderID}</h2>

                <p>Thank you for your order. You will receive your order soon</p>
            </div>
            <div class="d-flex">
                <a href="./index.html" type="button" class="btn btn-secondary me-5 rounded">Continue Shopping</a><br>
                <a href="./orderDetails.html?orderId=${orderID}" class="btn btn-primary rounded"> View Order</a>
            </div>
        </div>`;

    $('#orderConfirmation').append(confirm);
// }


// function displayFailure() {
//     var confirm = `
//         <div class="card rounded-1 p-10" style="border: 1px solid gainsboro; ">
          
//             <div>
//                 <h2 class="mb-4">Your Order ID is : #</h2>
//                 <p>Thank you. We will deliver your order soon.</p>
//             </div>
//             <div class="d-flex">
//                 <a href="./index.html" type="button" class="btn btn-secondary me-5 rounded">Continue Shopping</a><br>
//                 <a href="./orderDetails.html" class="btn btn-primary rounded"> View Order</a>
//             </div>
//         </div>`;

//     $('#orderfailer').append(confirm);
// }

