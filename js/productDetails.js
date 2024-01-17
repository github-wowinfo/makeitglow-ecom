// Function to get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get category ID from the URL
const itemId = getQueryParam('Id');
console.log('id', itemId);


$(document).ready(function () {
    // Fetch data from the API
    $.ajax({
        url: `${SETTINGS.backendUrl}/Items/GetItemById?id=${itemId}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Iterate over the products in the response and append them to the masonry layout
            console.log('data', data);
            $('#title').append(data.itemName)
            $('#shortDescription').append(data.shortDescription)
            $('#longDescription').append(data.longDescription)
            $('#title1').append(data.itemName)
            $('#categoryName').append(data.categoryName)

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


            function generateOnClickFunction(index) {
                return function (event) {
                    openTab(event, 'tab' + (index + 1));
                };
            }

            // Generate pricing HTML dynamically based on API response
            var pricingHTML = '';
            var initialTab = 1; // You can set this to the index of the initially selected tab
            data.vrnts.forEach(function (variant, index) {
                pricingHTML += `
        <span class="price-num Tab-contents" id="tab${index + 1}" ${index + 1 === initialTab ? '' : 'style="display: none;"'}>
            ${variant.sellingPrice} AED <del>${variant.mrp} AED</del>
        </span>`;
            });

            // Append pricing HTML to the '#pricing' element
            $('#pricing').append(pricingHTML);

            // Generate volume HTML dynamically based on API response
            var volumeHTML = '<label class="form-label">Size</label><div class="btn-group product-size mb-0">';
            data.vrnts.forEach(function (variant, index) {
                volumeHTML += `
        <input type="radio" class="btn-check" name="btnradio1" id="btnradio${index + 1}" ${index === 0 ? 'checked' : ''} />
        <label style="padding:5px; width:fit-content" class="btn btn-light Tab ${index === 0 ? 'active' : ''}" for="btnradio${index + 1}" onclick="openTab(event, 'tab${index + 1}')">
            ${variant.unitVolume}ml
        </label>`;
            });
            volumeHTML += '</div>';

            // Append volume HTML to the '#volume' element
            $('#volume').append(volumeHTML);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
});