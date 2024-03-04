


// Function to get query parameter by name
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
// Get category ID from the URL
const itemId = getQueryParam('Id');
let variantId = ''; // Declare variantId globally
let productquantity = '1';


$(document).ready(function () {
  // let variantId = ''
  // Fetch data from the API
  $.ajax({
    url: `${SETTINGS.backendUrl}/Items/GetItemById?id=${itemId}`,
    method: 'GET',
    dataType: 'json',
    success: function (data) 
    
    {
   
      $('#title').append(data.itemName)
      $('#shortDescription').append(data.shortDescription)
      $('#longDescription').append(data.longDescription)
      $('#title1').append(data.itemName)
      $('#categoryName').append(data.categoryName)
      
      $('meta[name="keywords"]').append('content', data.metaTags);
      $('meta[name="description"]').append('content', data.metapropertydescription);
      $('meta[property="og:description"]').append('content', data.metapropertydescription);
      $('meta[property="og:title"]').append('content', data.metapropertytitle);
      


       
      var productImage = `<div class="swiper-btn-center-lr">
<div class="swiper product-gallery-swiper2">
  <div class="swiper-wrapper" id="lightgallery">
    <div class="swiper-slide">
      <div class="dz-media DZoomImage">
        <a class="mfp-link lg-item" href="${data.thumbnail}"
          data-src="images/products/product-detail2/product2.png">
          <!-- <i  class="feather icon-maximize dz-maximize top-left"></i> -->
        </a>
        <img src="${data.thumbnail}" alt="image" />
      </div>
    </div>
    <div class="swiper-slide">
      <div class="dz-media DZoomImage">
        <a class="mfp-link lg-item" href="${data.vrnts[0].image2}"
          data-src="images/products/product-detail2/product1.png">
          <!-- <i class="feather icon-maximize dz-maximize top-left"></i> -->
        </a>
        <img src="${data.vrnts[0].image2}" alt="image" />
      </div>
    </div>

    <div class="swiper-slide">
      <div class="dz-media DZoomImage">
        <a class="mfp-link lg-item" href="${data.vrnts[0].image3}"
          data-src="images/products/product-detail2/product3.png">
          <!-- <i class="feather icon-maximize dz-maximize top-left"></i> -->
        </a>
        <img src="${data.vrnts[0].image3}" alt="image" />
      </div>
    </div>
  </div>
</div>
<div class="swiper product-gallery-swiper thumb-swiper-lg">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="${data.thumbnail}" alt="image" />
    </div>
    <div class="swiper-slide">
      <img src="${data.vrnts[0].image2}" alt="image" />
    </div>
    <div class="swiper-slide">
      <img src="${data.vrnts[0].image3}" alt="image" />
    </div>
  </div>
</div>
</div>
  `
      $('#imageContent').append(productImage);
      $('#howtouse').append(data.vrnts[0].howToUse);
      console.log('prodetailssss',data);

      // Generate pricing HTML dynamically based on API response
      var pricingHTML = '';
      var initialTab = 1; // You can set this to the index of the initially selected tab

      // Generate volume HTML dynamically based on API response
      var volumeHTML = '<label class="form-label">Size</label><div class="btn-group product-size mb-0">';
      data.vrnts.forEach(function (variant, index) {


        volumeHTML += `
           <input type="radio" class="btn-check" name="btnradio1" id="btnradio${index + 1}" ${index === 0 ? 'checked' : ''} />
           <label style="padding:5px; width:fit-content" class="btn btn-light Tab ${index === 0 ? 'active' : ''}" for="btnradio${index + 1}" onclick="handleButtonClick(event, 'tab${index + 1}', ${variant.vrntEntryId})">
               ${variant.unitVolume}ml
           </label>`;
        //  <input type="radio" class="btn-check" name="btnradio1" id="btnradio${index + 1}" ${index === 0 ? 'checked' : ''} />
        //  <label style="padding:5px; width:fit-content" class="btn btn-light Tab ${index === 0 ? 'active' : ''}" for="btnradio${index + 1}" onclick="updateVariantId(event, ${variant.vrntEntryId})">
        //      ${variant.unitVolume}ml
        //  </label>`;

      });
        // Update meta tags with API data
    // document.querySelector('meta[name="description"]').content = data.metaTags;
    // document.querySelector('meta[property="og:title"]').content = data.metapropertytitle;
    // document.querySelector('meta[property="og:description"]').content = data.metapropertydescription;
    // Add more lines to update other meta tags as needed

  //   if (data.metaTags) {
  //     // Keywords
  //     // if (data.metaTags ) {
  //         $('meta[name="keywords"]').attr('content', data.metaTags);
  //     // }
      
  //     // Description
  //     if (data.metapropertydescription) {
  //         $('meta[name="description"]').attr('content', data.metapropertydescription);
  //         $('meta[property="og:description"]').attr('content', data.metapropertydescription);
  //     }

  //     // Title
  //     if (data.metapropertytitle) {
  //         $('meta[property="og:title"]').attr('content', data.metapropertytitle);
  //     }
  //     
  //     // Add more meta tags if needed
  // }
  console.log('content', data.metaTags);
      console.log('content', data.metapropertytitle);
      console.log('content', data.metapropertydescription);


      volumeHTML += '</div>';
      // Append volume HTML to the '#volume' element
      $('#volume').append(volumeHTML);

      data.vrnts.forEach(function (variant, index) {
        variantId = variant.vrntEntryId


        if (data.vrnts.length > 0) {
          variantId = data.vrnts[0].vrntEntryId;
          pricingHTML += `
        <span class="price-num Tab-contents" id="tab${index + 1}" ${index + 1 === initialTab ? '' : 'style="display: none;"'}>
        ${variant.mrp !== variant.sellingPrice ? `<del>${variant.mrp} AED</del>` : ''} ${variant.sellingPrice} AED 
        </span>`;
          $("input[name='demo_vertical2']").on('change', function () {
            // Get the selected quantity
            productquantity = $(this).val();

            // Get the variant information from the API response
            var variantInfo = {
              // Assuming you have the relevant variant information here
              "mrp": 30, // Example MRP
              "sellingPrice": 30 // Example Selling Price
              // Add other variant details if needed
            };

            var selectedVariant = data.vrnts.find(function (variant) {
              return variant.vrntEntryId === variantId;
            });
            if (selectedVariant) {
              var totalPrice = productquantity * selectedVariant.mrp;
              $("#displayedPrice").text(' AED ' + totalPrice);
              // Update the displayed price on the page
            }
            // Calculate the new price based on quantity

          });
        }

      });


      // Append pricing HTML to the '#pricing' element
      $('#pricing').append(pricingHTML);

    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  });

  window.updateVariantId = function (event, newVariantId) {
    variantId = newVariantId;
    // $("#displayedPrice").text( variantId);



    var quantity1 = $("input[name='demo_vertical2']").val();
    var totalPrices = quantity1 * /* Get the price for the new variantId */
      updateDisplayedPrice(totalPrices);
  };
});

window.handleButtonClick = function (event, tabId, newVariantId) {
  openTab(event, tabId);
  updateVariantId(event, newVariantId);
  // Reset the quantity to its initial value when changing tabs
  quantity2 = 1;
  // You can perform additional actions here if needed
  $("input[name='demo_vertical2']").val(quantity2);

  // ...
};
// });

// });

var handleBootstrapTouchSpin = function () {
  if ($("input[name='demo_vertical2']").length > 0) {
    jQuery("input[name='demo_vertical2']").TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'fa-solid fa-plus',
      verticaldownclass: 'fa-solid fa-minus'
    });
  }
  if ($(".quantity-input").length > 0) {
    jQuery(".quantity-input").TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'fa-solid fa-plus',
      verticaldownclass: 'fa-solid fa-minus'
    });
  }
}
// Assuming you have already initialized the TouchSpin library

$(document).ready(function () {
  // Initialize TouchSpin
  handleBootstrapTouchSpin();
  // Add event listener for quantity input change
});


var token = localStorage.getItem("token");

// add to cart  api.... 
document.getElementById("cart").addEventListener("click", function (e) {
  e.preventDefault();

  var obj = {
    "itemType": 1,
    "prdctID": variantId,
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
        console.log("Sign in Error:", error.responseJSON.message);
        toastr.error(error.responseJSON.message);

      },
    });
  }

});

// whish list api.... 
document.getElementById("whislist").addEventListener("click", function (e) {
  e.preventDefault();
  var obj = {
    "itemType": 1,
    "prdctID": variantId,

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



// Assuming you have the necessary variables like itemId, variantId, token, etc.

