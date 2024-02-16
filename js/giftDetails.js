


// // Function to get query parameter by name
// function getQueryParam(name) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
// }

// // Get category ID from the URL
// const itemId = getQueryParam('Id');
// let variantId = ''; // Declare variantId globally
// let productquantity = '1';

// // console.log('itemName', itemName);
// $(document).ready(function () {
//     // let variantId = ''
//     // Fetch data from the API
//     $.ajax({
//         url: `${SETTINGS.backendUrl}/Items/GetGiftItemById?id=${itemId}`,
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             console.log('data', data);
//             $('#title').append(data.itemName)
//             $('#shortDescription').append(data.shortDescription)
//             $('#longDescription').append(data.longDescription)
//             $('#title1').append(data.itemName)
//             $('#categoryName').append(data.categoryName)

//             var productImage = `
//             <div class="swiper-btn-center-lr">
//   <div class="swiper product-gallery-swiper2">
//     <div class="swiper-wrapper" id="lightgallery">
//       <div class="swiper-slide">
//         <div class="dz-media DZoomImage">
//           <a class="mfp-link lg-item" href="${data.mainImage1}"
//             data-src="${data.mainImage1}">
//             <!-- <i  class="feather icon-maximize dz-maximize top-left"></i> -->
//           </a>
//           <img src="${data.mainImage1}" alt="image" />
//         </div>
//       </div>
//       <div class="swiper-slide">
//         <div class="dz-media DZoomImage">
//           <a class="mfp-link lg-item" href="${data.gftItems.image2}"
//             data-src="${data.gftItems.image2}">
//             <!-- <i class="feather icon-maximize dz-maximize top-left"></i> -->
//           </a>
//           <img src="${data.gftItems.image2}" alt="image" />
//         </div>
//       </div>

//       <div class="swiper-slide">
//         <div class="dz-media DZoomImage">
//           <a class="mfp-link lg-item" href="${data.gftItems.image3}"
//             data-src="${data.gftItems.image3}">
//             <!-- <i class="feather icon-maximize dz-maximize top-left"></i> -->
//           </a>
//           <img src="${data.gftItems.image3}" alt="image" />
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="swiper product-gallery-swiper thumb-swiper-lg">
//     <div class="swiper-wrapper">
//       <div class="swiper-slide">
//         <img src="${data.mainImage1}" alt="image" />
//       </div>
//       <div class="swiper-slide">
//         <img src="${data.gftItems.image2}" alt="image" />
//       </div>
//       <div class="swiper-slide">
//         <img src="${data.gftItems.image3}" alt="image" />
//       </div>
//     </div>
//   </div>
//   </div>
//     `
//             $('#imageContentgift').append(productImage);
//             $('#howtouse').append(data.howToUse);


//             // function generateOnClickFunction(index) {
//             //   return function (event) {
//             //     openTab(event, 'tab' + (index + 1));
//             //   };
//             // }

//             // Generate pricing HTML dynamically based on API response
//             var pricingHTML = '';
//             var initialTab = 1; // You can set this to the index of the initially selected tab

//             // Generate volume HTML dynamically based on API response
//             var volumeHTML = '<label class="form-label">Size</label><div class="btn-group product-size mb-0">';
//             data.gftItems[0].giftItemVariants.forEach(function (variant, index) {


//                 volumeHTML += `
//              <input type="radio" class="btn-check" name="btnradio1" id="btnradio${index + 1}" ${index === 0 ? 'checked' : ''} />
//              <label style="padding:5px; width:fit-content" class="btn btn-light Tab ${index === 0 ? 'active' : ''}" for="btnradio${index + 1}" onclick="handleButtonClick(event, 'tab${index + 1}', ${variant.vrntEntryId})">
//                  ${variant.unitVolume}ml
//              </label>`;
//                 //  <input type="radio" class="btn-check" name="btnradio1" id="btnradio${index + 1}" ${index === 0 ? 'checked' : ''} />
//                 //  <label style="padding:5px; width:fit-content" class="btn btn-light Tab ${index === 0 ? 'active' : ''}" for="btnradio${index + 1}" onclick="updateVariantId(event, ${variant.vrntEntryId})">
//                 //      ${variant.unitVolume}ml
//                 //  </label>`;

//             });
//             volumeHTML += '</div>';
//             // Append volume HTML to the '#volume' element
//             $('#volume').append(volumeHTML);

//             // data.gftItems[0].giftItemVariants.forEach(function (variant, index) {
//             //     variantId = variant.vrntEntryId


//             // if (data.gftItems[0].giftItemVariants.length > 0) {
//             // variantId = data.gftItems[0].itmVrntID;
//             pricingHTML += `
//           <span class="price-num" >
//               ${data.sellingPrice} AED <del>${data.mrp} AED</del>
//           </span>`;
//             $("input[name='demo_vertical2']").on('change', function () {
//                 // Get the selected quantity
//                 productquantity = $(this).val();

//                 // Get the variant information from the API response
//                 var variantInfo = {
//                     // Assuming you have the relevant variant information here
//                     "mrp": 30, // Example MRP
//                     "sellingPrice": 30 // Example Selling Price
//                     // Add other variant details if needed
//                 };

//                 // var selectedVariant = data.vrnts.find(function (variant) {
//                 //     return variant.vrntEntryId === variantId;
//                 // });
//                 // if (selectedVariant) {
//                 var totalPrice = productquantity * data.mrp;
//                 $("#displayedPrice").text(' AED ' + totalPrice);
//                 // }

//             });
//             // }

//             // });


//             // Append pricing HTML to the '#pricing' element
//             $('#pricing').append(pricingHTML);

//         },
//         error: function (error) {
//             console.error('Error fetching data:', error);
//         }
//     });

//     window.updateVariantId = function (event, newVariantId) {
//         variantId = newVariantId;

//         var quantity1 = $("input[name='demo_vertical2']").val();
//         var totalPrices = quantity1 * /* Get the price for the new variantId */
//             updateDisplayedPrice(totalPrices);
//     };
// });

// window.handleButtonClick = function (event, tabId, newVariantId) {
//     openTab(event, tabId);
//     updateVariantId(event, newVariantId);
//     // Reset the quantity to its initial value when changing tabs
//     quantity2 = 1;
//     // You can perform additional actions here if needed
//     $("input[name='demo_vertical2']").val(quantity2);
//     // ...
// };
// // });

// // });

// var handleBootstrapTouchSpin = function () {
//     if ($("input[name='demo_vertical2']").length > 0) {
//         jQuery("input[name='demo_vertical2']").TouchSpin({
//             verticalbuttons: true,
//             verticalupclass: 'fa-solid fa-plus',
//             verticaldownclass: 'fa-solid fa-minus'
//         });
//     }
//     if ($(".quantity-input").length > 0) {
//         jQuery(".quantity-input").TouchSpin({
//             verticalbuttons: true,
//             verticalupclass: 'fa-solid fa-plus',
//             verticaldownclass: 'fa-solid fa-minus'
//         });
//     }
// }
// // Assuming you have already initialized the TouchSpin library

// $(document).ready(function () {
//     // Initialize TouchSpin
//     handleBootstrapTouchSpin();
//     // Add event listener for quantity input change
// });

// var token = localStorage.getItem("token");

// // add to cart  api.... 
// document.getElementById("cart").addEventListener("click", function (e) {
//     e.preventDefault();

//     var obj = {
//         "itmVrntId": variantId,
//         "qty": productquantity
//     }
//     if (token === null) {
//         window.location.href = "./login.html";

//     } else {
//         $.ajax({
//             url: `${SETTINGS.backendUrl}/Ecom/AddToCart`,
//             type: "POST",
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "Content-Type": "application/json",
//                 // Add other headers as needed
//             },
//             dataType: "json", // Change the datatype according to your response type
//             contentType: "application/json", // Set the Content-Type
//             data: JSON.stringify(obj),

//             success: function (response) {
//                 toastr.success("Item Added to Cart");
//                 getCart()
//             },

//             error: function (error) {
//                 console.log("Sign in Error:", error);
//                 toastr.error(error.responseJSON.title);

//             },
//         });
//     }

// });

// // whish list api.... 
// document.getElementById("whislist").addEventListener("click", function (e) {
//     e.preventDefault();
//     var obj = {
//         "itmVrntId": variantId,

//     }
//     if (token === null) {

//         window.location.href = "./login.html";

//     } else {
//         $.ajax({
//             url: `${SETTINGS.backendUrl}/Ecom/AddToWishlist`,
//             type: "POST",
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "Content-Type": "application/json",
//                 // Add other headers as needed
//             },
//             dataType: "json", // Change the datatype according to your response type
//             contentType: "application/json", // Set the Content-Type
//             data: JSON.stringify(obj),

//             success: function (response) {
//                 toastr.success("Item Added to Whish list");
//             },
//             error: function (error) {
//                 console.log("Sign in Error:", error);
//                 toastr.error(error.responseJSON.title);

//             },
//         });
//     }

// });



//   // Assuming you have the necessary variables like itemId, variantId, token, etc.

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const itemId = getQueryParam('Id')
console.log('id', itemId);

let productquantity = '1';
$.ajax({
    url: `${SETTINGS.backendUrl}/Items/GetGiftItemById?id=${itemId}`,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log('data', data);
        $('#title').append(data.itemName)
        $('#shortDescription').append(data.shortDescription)
        $('#longDescription').append(data.longDescription)
        $('#title1').append(data.itemName)
        $('#categoryName').append(data.categoryName)
        var price = `<span class="price-num">
        ${data.sellingPrice} AED <del>${data.mrp} AED</del>
      </span>`
        $('#pricing').append(price)

        var productImage = `
            <div class="swiper-btn-center-lr">
  <div class="swiper product-gallery-swiper2">
    <div class="swiper-wrapper" id="lightgallery">
      <div class="swiper-slide">
        <div class="dz-media DZoomImage">
          <a class="mfp-link lg-item" href="${SETTINGS.ImageUrl}${data.thumbnail}"
            data-src="${SETTINGS.ImageUrl}${data.thumbnail}">
            <!-- <i  class="feather icon-maximize dz-maximize top-left"></i> -->
          </a>
          <img src="${SETTINGS.ImageUrl}${data.thumbnail}" alt="image" />
        </div>
      </div>
      <div class="swiper-slide">
        <div class="dz-media DZoomImage">
          <a class="mfp-link lg-item" href="${SETTINGS.ImageUrl}${data.thumbnail}"
            data-src="${SETTINGS.ImageUrl}${data.thumbnail}">
            <!-- <i class="feather icon-maximize dz-maximize top-left"></i> -->
          </a>
          <img src="${SETTINGS.ImageUrl}${data.thumbnail}" alt="image" />
        </div>
      </div>

      <div class="swiper-slide">
        <div class="dz-media DZoomImage">
          <a class="mfp-link lg-item" href="${SETTINGS.ImageUrl}${data.thumbnail}"
            data-src="${SETTINGS.ImageUrl}${data.thumbnail}">
            <!-- <i class="feather icon-maximize dz-maximize top-left"></i> -->
          </a>
          <img src="${SETTINGS.ImageUrl}${data.thumbnail}" alt="image" />
        </div>
      </div>
    </div>
  </div>
  <div class="swiper product-gallery-swiper thumb-swiper-lg">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="${SETTINGS.ImageUrl}${data.thumbnail}" alt="image" />
      </div>
      <div class="swiper-slide">
        <img src="${SETTINGS.ImageUrl}${data.thumbnail}" alt="image" />
      </div>
      <div class="swiper-slide">
        <img src="${SETTINGS.ImageUrl}${data.thumbnail}" alt="image" />
      </div>
    </div>
  </div>
  </div>
    `
        $('#imageContentgift').append(productImage);
        $("input[name='demo_vertical2']").on('change', function () {
          // Get the selected quantity
          productquantity = $(this).val();

        });
    }
})


var token = localStorage.getItem("token");

// add to cart  api.... 
document.getElementById("cart").addEventListener("click", function (e) {
    e.preventDefault();

    var obj = {
        "itemType": 2,
        "prdctID": itemId,
        "qty": productquantity
    }
    if (token === null) {
        window.location.href = "./login.html";

    } else {
        $.ajax({
            url: `${SETTINGS.backendUrl}/Ecom/AddToCart`,
            type: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            dataType: "json", // Change the datatype according to your response type
            contentType: "application/json", // Set the Content-Type
            data: JSON.stringify(obj),

            success: function (response) {
                toastr.success("Item Added to Cart");
                getCart()
            },

            error: function (error) {
                console.log("Sign in Error:", error);
                toastr.error(error.responseJSON.title);

            },
        });
    }

});

// whish list api.... 
document.getElementById("whislist").addEventListener("click", function (e) {
    e.preventDefault();
    var obj = {
        // "itmVrntId": variantId,
        "itemType": 2,
        "prdctID": itemId,

    }
    if (token === null) {

        window.location.href = "./login.html";

    } else {
        $.ajax({
            url: `${SETTINGS.backendUrl}/Ecom/AddToWishlist`,
            type: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                // Add other headers as needed
            },
            dataType: "json", // Change the datatype according to your response type
            contentType: "application/json", // Set the Content-Type
            data: JSON.stringify(obj),

            success: function (response) {
                toastr.success("Item Added to Whish list");
            },
            error: function (error) {
                console.log("Sign in Error:", error);
                toastr.error(error.responseJSON.title);

            },
        });
    }

});