// Function to fetch data from the API and populate the swiper-wrapper
function fetchDataAndPopulateSwiper() {
  var swiperWrapper = document.getElementById('swiper-wrapper');

  fetch('https://mig-dev.lifelinemegacorp.com/api/Ecom/GetAllFeaturedProducts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
        // console.log()

      }
      return response.json();
    })
    .then(data => {
      // Iterate through the products and create swiper-slide elements
      data.forEach(product => {
        var swiperSlide = createSwiperSlide(product);
        swiperWrapper.appendChild(swiperSlide);
      });

      // Initialize the Swiper after all slides are added
      initSwiper();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to create a swiper-slide element for a product
function createSwiperSlide(product) {
  var swiperSlide = document.createElement('div');
  swiperSlide.className = 'swiper-slide bg-light';
  if (product !== null) {
    var contentHTML = `
        <div class="container-fluid">
          <div class="banner-content">
            <div class="row gx-0">
              <div class="col-md-6 col-sm-6 align-self-center">
                <div class="swiper-content">
                  <div class="content-info">
                    <h1 class="title mb-2" data-swiper-parallax="-20">${product.itemTitle}</h1>
                    <p class="text mb-0" data-swiper-parallax="-40">${product.shrtDescptn}</p>
                    <div class="swiper-meta-items" data-swiper-parallax="-50">
                      <div class="meta-content">
                        <span class="price-name">Price</span>
                        <span class="price-num">${product.sellingPrice} AED<del style="color: red;">${product.mrp} AED</del></span>
                      </div>
                    </div>
                    <div class="content-btn" data-swiper-parallax="-60">
                      <a class="btn btn-secondary me-xl-3 me-2 btnhover20" href="shop-cart.html">ADD TO CART</a>
                      <a class="btn btn-outline-secondary btnhover20" href="${product.DetailsLink}">VIEW DETAILS</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="banner-media">
                  <div class="img-preview" data-swiper-parallax="-100">
                    <img src="${product.mainImage1}" alt="banner-media">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
  }

  swiperSlide.innerHTML = contentHTML;
  return swiperSlide;
}

// Function to initialize the Swiper
function initSwiper() {
  var mySwiper = new Swiper('.swiper-container', {
    // Add your Swiper options here
    // Example: slidesPerView: 1, loop: true, etc.
  });
}

// Call the function to fetch data and populate the swiper-wrapper
fetchDataAndPopulateSwiper();




$(document).ready(function () {
  // Fetch data from the API
  $.ajax({
    url: 'https://mig-dev.lifelinemegacorp.com/api/Ecom/GetAllTrendingProducts',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      // Iterate over the products in the response and append them to the masonry layout
      console.log('product', data);
      $.each(data, function (index, product) {
        // Generate HTML for the product card with actual data
        if (product !== null) {
          var productCardHtml = `
              <li class="card-container col-6 col-xl-3 col-lg-3 col-md-4 col-sm-6 Begs wow fadeInUp" data-wow-delay="0.1s">
                <div class="shop-card">
                  <a href="${product.productUrl}">
                    <div class="dz-media">
                      <img src="${product.imageUrl}" alt="${product.itemTitle}">
                      <!-- Add more details from the product object as needed -->
                      <!-- ... -->
                    </div>
                  </a>
                  <div class="dz-content">
                    <h4 class="title"><a href="${product.productUrl}">${product.itemTitle}</a></h4>
                    <ul class="star-rating">
                      <!-- ... (star rating code) ... -->
                    </ul>
                    <h6 class="price">
                      <del>${product.mrp} AED</del>
                      ${product.sellingPrice} AED
                    </h6>
                  </div>
                  <div class="product-tag">
                    <!-- ... (product tags or badges) ... -->
                  </div>
                </div>
              </li>
            `;
        }

        // Append the product card HTML to the masonry layout
        $('#masonry').append(productCardHtml);
      });

      // Initialize or update your Masonry layout here (if needed)
      // ...

      // Optionally, apply any other logic or styles needed after appending the cards
      // ...
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  });
});


{/* <div class="swiper-slide bg-light">
							<div class="container-fluid">
								<div class="banner-content">
									<div class="row gx-0">
										<div class="col-md-6 col-sm-6 align-self-center">
											<div class="swiper-content">
												<div class="content-info">
													<h1 class="title mb-2" data-swiper-parallax="-20">Strawberry Whipped
														Foam Soap</h1>
													<p class="text mb-0" data-swiper-parallax="-40">Indulge in the sweet
														sensation of strawberry whipped soap made with Shea Butter and
														Grapeseed Oil leaves .</p>

													<div class="swiper-meta-items" data-swiper-parallax="-50">
														<div class="meta-content">
															<span class="price-name">Price</span>
															<span class="price-num">55 AED<del style="color: red;">70.00
																	AED</del></span>


														</div>
														<!-- <div class="meta-content">
														<span class="color-name">Color</span>
														<div class="d-flex align-items-center color-filter">
															<div class="form-check">
																<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" value="#24262B" aria-label="..." checked>
																<span></span>
															</div>
															<div class="form-check">
																<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2" value="#0D775E" aria-label="...">
																<span></span>
															</div>
															<div class="form-check">
																<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3" value="#C7D1CF" aria-label="...">
																<span></span>
															</div>
														</div>
													</div> -->
													</div>

													<div class="content-btn" data-swiper-parallax="-60">
														<a class="btn btn-secondary  me-xl-3 me-2 btnhover20"
															href="shop-cart.html">ADD TO CART</a>
														<a class="btn btn-outline-secondary btnhover20"
															href="strawberry.html">VIEW DETAILS</a>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-6 col-sm-6">
											<div class="banner-media">
												<div class="img-preview" data-swiper-parallax="-100">
													<img src="images/product/straw.jpg" alt="banner-media">
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}