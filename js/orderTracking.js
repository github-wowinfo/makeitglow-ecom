// const tableBody = document.querySelector('.table.check-tbl.style-1 tbody');


$(document).ready(function () {
    // Make an AJAX request to fetch FAQs
    $.ajax({
        url: `${SETTINGS.backendUrl}/Order/GetAllOrdersByCustId`,
        method: 'GET',
        dataType: 'json',
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // Add other headers as needed
        },
        success: function (data) {
            console.log('data', data);
            // Handle the response data and append FAQs to the container
            // if (data && data.length > 0) {
                // Build the table headers outside the loop
                var amount = data.ordrPymnt.paidAmount/100
                const orderHtml = `
                <div class="card m-5 rounded-1" style="border: 1px solid gainsboro;">
                <div class=" rounded-1    " style="border: 1px solid gainsboro;" >
				<div class="d-flex rounded-1 p-5" style="background-color: rgb(245, 247, 248); justify-content: space-between; border: none;">
					<div class="d-flex">
					<div class="ms-5">
						<p class="mb-1 text-darkgreen"><strong> ORDER Placed : </strong></p>
						<p class="mb-1">Date : </p>
					</div>
					<div class="ms-5">
						<p class="mb-1 text-darkgreen"><strong> Total : ${amount} AED</strong></p>
						<p class="mb-1">Amount</p>
					</div>
					<div class="ms-5">
						<p class="mb-1 text-darkgreen"><strong>ship to :</strong></p>
						<p class="mb-1">name of the clients </p>
					</div>
				</div>
					<div class="ms-5 ">
						<p class="mb-1 text-darkgreen"><strong>Order id :${data.ordrID}</strong></p>
						<a href="./orderDetails.html" class="mb-1">Order Details </a>
					</div>
				</div>
			    </div>
			     <div class="ms-5 mb-2  mt-2">
			     	<h3 class="mb-1 text-darkgreen"><strong>Returns Complete</strong></h3>
			    	<a href="./orderDetails.html" class="mb-1">Your returns is complete.When will i get my refund</a>
			     </div>
                    <div class="p-5 d-flex">
                        <div class="ms-5">
                            <img src="./images/product/bluberry/blue.jpg" alt="" width="100px">				
                        </div>
                        <div class="ms-5">
                            <p class="mb-1 text-darkgreen"><strong>Blueberry Muffin Whipped Soap</strong></p>
                            <p class="mb-1">Blueberry Soap boast of delightful blueberry scent and shea butter creating a sensory experience.</p>

                            <a href="./products.html?catId=4" 
                                data-bs-toggle="modal" class="btn btn-secondary btnhover text-uppercase rounded-1 mt-2 me-2 p-2 " data-bs-target="#profileEdit">
                                Buy it again
                            </a>
                            <a href="/ " 
                                data-bs-toggle="modal" class="btn btn-secondary btnhover text-uppercase mt-2 rounded-1 p-2 ">
                                View your items
                            </a>
                        </div>
                    </div>
                </div>
            `;

            // Append the HTML structure for each order to #tbody
            $('#tbody').append(orderHtml);
    
                // const tableHeaders = `
                //     <thead>
                //         <tr>
                //             <th>Product Id</th>
                //             <th>Quantity</th>
                //             <th>Price</th>
                //             <th>Status</th>
                //             <th></th>
                //         </tr>
                //     </thead>
                //     <tbody>
                // `;
                // // Append the table headers
                // $('#tbody').append(tableHeaders);

                // data.forEach(order => {
                //     var amount = order.paidAmount/100
                //     const row = `
                //         <tr>
                //             <td class="product-item"><a href="javascript:void(0);">${order.ordrID}</a></td>
                //             <td class="product-item-name">${order.productsQty}</td>
                //             <td class="product-item-price"><span>${amount} AED</span></td>
                //             <td class="product-item-stock text-primary">${order.ordrPymnt.paymentStatusMsg}</td>
                //             <td class="product-item-totle"><a href="./orderDetails.html?orderId=${order.ordrID}" class="btn btn-gray btnhover text-nowrap rounded">Order Details</a></td>
                //         </tr>
                //     `;
                //     // Append each row inside the loop
                //     $('#tbody').append(row);
                // });

                // Close the tbody after the loop
                // $('#tbody').append('</tbody>');
            // } else {
            //     // Handle the case when no FAQs are available
            //     $('#tbody').append('<p>Opps ! Sorry there is no Order</p> ');
            // }
        },
        error: function (xhr, status, error) {
            // Handle the AJAX request error
            console.error('Error fetching FAQs:', error);
            $('#tbody').append('<p>Error fetching FAQs</p>');
        }
    });
});














