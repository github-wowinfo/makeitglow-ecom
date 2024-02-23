// const tableBody = document.querySelector('.table.check-tbl.style-1 tbody');
  // Get category ID from the URL
 
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
            
            if (data && data.length > 0) {
                data.forEach(order => {
                    // Build the table headers outside the loop
                    var amount = order.paidAmount / 100;
                    var timestampStr = order.ordrPymnt.paymentCreationTime;
                    var timestamp = new Date(timestampStr);
                    var formattedDate = formatDate(timestamp);

                    function formatDate(order) {
                        // Array of month names
                        var monthNames = [
                            "January", "February", "March",
                            "April", "May", "June", "July",
                            "August", "September", "October",
                            "November", "December"
                        ];
                        // Extract day, month, and year
                        var day = order.getDate();
                        var monthIndex = order.getMonth();
                        var year = order.getFullYear();
                        // Format the date string
                        var formattedDate = day + " " + monthNames[monthIndex] + " " + year;

                        return formattedDate;
                    }

                    const orderHtml = `
                        <div class="card myorder rounded-1" style="border: 1px solid gainsboro;">
                            <div class="rounded-1" style="border: 1px solid gainsboro;">
                                <div class="d-flex orderp rounded-1 " style="background-color: rgb(245, 247, 248); justify-content: space-between; border: none;">
                                    <div class="d-flex justify-content-center">
                                        <div class=" detail mt-3">
                                            <p class="  "><strong class="text-darkgreen"> ORDER Placed :  </strong> ${formattedDate}</p>
                                        </div>
                                        
                                    </div>
                                    <div class="detail">
                                        <a href="./orderDetails.html?orderId=${order.ordrID} "
                                            data-bs-toggle="modal" class="btn   btnhover text-uppercase mt-2 rounded-1   ">
                                            View Order Details
                                        </a>
                                    </div>
                                    
                                </div>

                                <div class="p-5 mt-2 mb-2 d-flex " id="orderlist-${order.ordrID}">
                                     <div class="ms-5 orderid">
                                     <h4 class="mb-1 text-darkgreen "><strong>Order id : </strong></h4>
                                     <h4 class="mb-1 text-darkgreen"> ${order.ordrID}</strong></h4>
                                     </div>

                                     <div class="ms-6 orderid">
                                            <p class="mb-1 text-darkgreen"><strong> Total :</strong></p>
                                            <p class="mb-1"> ${amount} AED</p>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    `;

                    // Append the HTML structure for each order to #tbody
                    $('#tbody').append(orderHtml);
                    $.ajax({
                        url: `${SETTINGS.backendUrl}/Order/GetOrderDetailsByOrderId?OrderId=${order.ordrID}`,
                        method: 'GET',
                        dataType: 'json',
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                            // Add other headers as needed
                        },
                        success: function (orderDetails) {
                            updateOrderDetails(order.ordrID, orderDetails);
                        },
                        error: function (error) {
                            console.error('Error fetching data:', error);
                        }
                    });
                
                });
            } else {
                // Handle the case when no FAQs are available
                $('#tbody').append('<p>Oops! Sorry, there is no order.</p> ');
            }
        },
        error: function (xhr, status, error) {
            // Handle the AJAX request error
            console.error('Error fetching orders:', error);
            $('#tbody').append('<p>Error fetching orders</p>');
        }
    });

    // Assuming orderId is defined somewhere
    var orderId = "your_order_id"; 

   
    function updateOrderDetails(orderId ,data) {
        if (data.ordrItms && data.ordrItms.length > 0) {
            // Build the table headers outside the loop
            
            data.ordrItms.forEach(order => {
                const row = `
                    <div>
                        <p class="product-item"><a href="javascript:void(0);"><img src="${order.itmimg}" alt="" width="80px"></a></p>
                        <p class="product-item"><a href="./productDetails.html?Id=${order.oid}">${order.itmname}</a></p>
                        <p class="product-item-name">${order.qty}</p>
                        <p class="product-item-price"><span>${order.price} AED</span></p>
                        <p class="product-item-stock text-primary">${order.total} AED</p>
                    </div>
                `;
                // Append each row inside the loop
                $('#orderlist-${orderId}').append(row);
            });
        } else {
            $('#orderDetails1').append('<p>No FAQs available</p>');
        }
    }
});


// $(document).ready(function () {
//     // Make an AJAX request to fetch FAQs
//     $.ajax({
//         url: `${SETTINGS.backendUrl}/Order/GetAllOrdersByCustId`,
//         method: 'GET',
//         dataType: 'json',
//         headers: {
//             Authorization: "Bearer " + token,
//             "Content-Type": "application/json",
//             // Add other headers as needed
//         },
//         success: function (data) {
//             console.log('data', data);
//             // Handle the response data and append FAQs to the container
//             // if (data && data.length > 0) {
//                 data.forEach(order => {
//                 // Build the table headers outside the loop
//                 var amount = order.paidAmount/100
//                 var timestampStr = order.ordrPymnt.paymentCreationTime;
//                 var timestamp = new Date(timestampStr);
//                 var formattedDate = formatDate(timestamp);
                
//                function formatDate(order) {
//                 // Array of month names
//                 var monthNames = [
//                     "January", "February", "March",
//                     "April", "May", "June", "July",
//                     "August", "September", "October",
//                     "November", "December"
//                 ];
//                 // Extract day, month, and year
//                 var day = order.getDate();
//                 var monthIndex = order.getMonth();
//                 var year = order.getFullYear();
//                 // Format the date string
//                 var formattedDate = day + " " + monthNames[monthIndex] + " " + year;
            
//                 return formattedDate;
//             }
//                 const orderHtml = `
//                 <div class="card m-5 rounded-1" style="border: 1px solid gainsboro;">
//                   <div class=" rounded-1    " style="border: 1px solid gainsboro;" >
// 				   <div class="d-flex rounded-1 p-5" style="background-color: rgb(245, 247, 248); justify-content: space-between; border: none;">
// 					<div class="d-flex">
// 					     <div class="ms-5">
// 					     	<p class="mb-1 text-darkgreen"><strong> ORDER Placed : </strong></p>
// 					     	<p class="mb-1">${formattedDate}</p>
// 					     </div>
// 					     <div class="ms-6">
// 					     	<p class="mb-1 text-darkgreen"><strong> Total :</strong></p>
// 					     	<p class="mb-1"> ${amount} AED</p>
// 					     </div>
// 				    </div>
// 					<div class="ms-5 ">
// 						<h4 class="mb-1 text-darkgreen "><strong>Order id : </strong></h4>
// 						<h4 class="mb-1 text-darkgreen"> ${order.ordrID}</strong></h4>
// 					</div>
// 				  </div>

			    
//                     <div class="p-5 mt-2 mb-2 d-flex">
//                         <div class="ms-5">
//                             <img src="./images/product/bluberry/blue.jpg" alt="" width="100px">				
//                         </div>
//                         <div class="ms-5">
//                             <p class="mb-1 text-darkgreen"><strong>Blueberry Muffin Whipped Soap</strong></p>
//                             <p class="mb-1">Blueberry Soap boast of delightful blueberry scent and shea butter creating a sensory experience.</p>

                            
//                             <a href="./orderDetails.html?orderId=${order.ordrID} " 
//                                 data-bs-toggle="modal" class="btn btn-secondary btnhover text-uppercase mt-2 rounded-1 p-2 ">
//                                 View Order Details
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             `;

//             // Append the HTML structure for each order to #tbody
//             $('#tbody').append(orderHtml);
    
//                 // const tableHeaders = `
//                 //     <thead>
//                 //         <tr>
//                 //             <th>Product Id</th>
//                 //             <th>Quantity</th>
//                 //             <th>Price</th>
//                 //             <th>Status</th>
//                 //             <th></th>
//                 //         </tr>
//                 //     </thead>
//                 //     <tbody>
//                 // `;
//                 // // Append the table headers
//                 // $('#tbody').append(tableHeaders);

//                 // data.forEach(order => {
//                 //     var amount = order.paidAmount/100
//                 //     const row = `
//                 //         <tr>
//                 //             <td class="product-item"><a href="javascript:void(0);">${order.ordrID}</a></td>
//                 //             <td class="product-item-name">${order.productsQty}</td>
//                 //             <td class="product-item-price"><span>${amount} AED</span></td>
//                 //             <td class="product-item-stock text-primary">${order.ordrPymnt.paymentStatusMsg}</td>
//                 //             <td class="product-item-totle"><a href="./orderDetails.html?orderId=${order.ordrID}" class="btn btn-gray btnhover text-nowrap rounded">Order Details</a></td>
//                 //         </tr>
//                 //     `;
//                 //     // Append each row inside the loop
//                 //     $('#tbody').append(row);
//                 // });

//                 // Close the tbody after the loop
//                 // $('#tbody').append('</tbody>');
//             // } else {
//             //     // Handle the case when no FAQs are available
//             //     $('#tbody').append('<p>Opps ! Sorry there is no Order</p> ');
//             });
//         },
//         error: function (xhr, status, error) {
//             // Handle the AJAX request error
//             console.error('Error fetching FAQs:', error);
//             $('#tbody').append('<p>Error fetching FAQs</p>');
//         }
//     });
//     $.ajax({

//         url:    `${SETTINGS.backendUrl}/Order/GetOrderDetailsByOrderId?OrderId=${orderId}`,
//         method: 'GET',
//         dataType: 'json',
//         headers: {
//             Authorization: "Bearer " + token,
//             "Content-Type": "application/json",
//             // Add other headers as needed
//         },
//         success: function (data) {
//             // Update Order Details
//             console.log(data);
//             updateOrderDetails(data);
      
//         },
//         error: function (error) {
//             console.error('Error fetching data:', error);
//         }
//       });
//       function updateOrderDetails(data) {
      
//           if (data.ordrItms && data.ordrItms.length > 0) {
//               // Build the table headers outside the loop
//               const tableHeaders = `
              
//                   <thead>
//                       <tr>
//                           <th> Product  </th>
//                           <th> Product Name </th>
//                           <th> Quantity </th>
//                           <th> Rate </th>
//                           <th> Amount </th>
//                       </tr>
//                   </thead>
//               `;
//               // Append the table headers
//               $('#orderDetails1').append(tableHeaders);
      
//               data.ordrItms.forEach(order => {
//                   console.log('order',order);
//                   // var amount = order.paidAmount/100
//                   const row = `
//                       <tr>
//                           <td class="product-item"><a href="javascript:void(0);"><img src="${order.itmimg}" alt="" width="80px"></a></td>
//                           <td class="product-item"><a href="./productDetails.html?Id=${order.oid}"">${order.itmname}</a></td>
//                           <td class="product-item-name">${order.qty}</td>
//                           <td class="product-item-price"><span>${order.price} AED</span></td>
//                           <td class="product-item-stock text-primary">${order.total} AED</td>
//                       </tr>
//                   `;
//                   // Append each row inside the loop
//                   $('#orderDetails1').append(row);
//               }) 
      
//               // Close the tbody after the loop
//               $('#orderDetails1').html(tableHeaders + rows + '</tbody>');
//           } else {
//               $('#orderDetails1').append('<p>No FAQs available</p>');
//           }
//       }
    
// });

// const orderId = getQueryParam('orderId');
// console.log(orderId);















