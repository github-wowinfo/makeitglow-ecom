// const tableBody = document.querySelector('.table.check-tbl.style-1 tbody');


$(document).ready(function () {
    // Make an AJAX request to fetch FAQs
    $.ajax({
        url: `${SETTINGS.backendUrl}/Order/GetAllOrdersByCustId`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Handle the response data and append FAQs to the container
            if (data && data.length > 0) {
                data.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                      <td class="product-item-close"><a href="javascript:void(0);">${order.paymentRemark}</a></td>
                      <td class="product-item-name">${order.productsQty}</td>
                      <td class="product-item-price"><span>${order.paidAmount}</span> </td>
                      <td class="product-item-stock text-primary">${order.paymentStatusMsg}</td>
                      <td class="product-item-totle"><a href="./orderDetails.html" class="btn btn-gray btnhover text-nowrap">View Details</a></td>
                    `;
                    $('#tbody').appendChild(row);
                  });
            } else {
                // Handle the case when no FAQs are available
                $('#tbody').append('<p>No FAQs available</p>');
            }
        },
        error: function (xhr, status, error) {
            // Handle the AJAX request error
            console.error('Error fetching FAQs:', error);
            $('#tbody').append('<p>Error fetching FAQs</p>');
        }
    });
});














