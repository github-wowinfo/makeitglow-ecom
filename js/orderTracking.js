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
            if (data && data.length > 0) {
                // Build the table headers outside the loop
                const tableHeaders = `
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                // Append the table headers
                $('#tbody').append(tableHeaders);

                data.forEach(order => {
                    var amount = order.paidAmount/100
                    const row = `
                        <tr>
                            <td class="product-item"><a href="javascript:void(0);">${order.ordrID}</a></td>
                            <td class="product-item-name">${order.productsQty}</td>
                            <td class="product-item-price"><span>${amount} AED</span></td>
                            <td class="product-item-stock text-primary">${order.ordrPymnt.paymentStatusMsg}</td>
                            <td class="product-item-totle"><a href="./orderDetails.html?orderId=${order.ordrID}" class="btn btn-gray btnhover text-nowrap rounded">View Details</a></td>
                        </tr>
                    `;
                    // Append each row inside the loop
                    $('#tbody').append(row);
                });

                // Close the tbody after the loop
                $('#tbody').append('</tbody>');
            } else {
                // Handle the case when no FAQs are available
                $('#tbody').append('<p>Opps ! Sorry there is no Order</p> <img src="./images/empty-cart.webp"> <p>Looks like you have not order anything. Go ahead & explore top categories</p>');
            }
        },
        error: function (xhr, status, error) {
            // Handle the AJAX request error
            console.error('Error fetching FAQs:', error);
            $('#tbody').append('<p>Error fetching FAQs</p>');
        }
    });
});














