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
        $.each(data, function (index, product) {
            var modalId = 'modal_' + product.productId;
          // Generate HTML for the product card with actual data    .....${product.imageUrl}
          var productCardHtml = `
            <li class="card-container col-6 col-xl-3 col-lg-3 col-md-4 col-sm-6 Begs wow fadeInUp" data-wow-delay="0.1s">
              <div class="shop-card">
                <a href="${product.productUrl}">
                  <div class="dz-media">
                    <img src="images/product/strawberry/straw.jpg" alt="${product.itemTitle}">
                    <!-- Add more details from the product object as needed -->
                    <!-- ... -->
                    <div class="shop-meta">
                    <a href="javascript:void(0);" class="btn btn-secondary btn-icon"
                        data-bs-toggle="modal" data-bs-target="#${modalId}">
                        <i class="fa-solid fa-eye d-md-none d-block"></i>
                        <span class="d-md-block d-none">Quick View</span>
                    </a>
                    <!-- ... (wishlist and cart icons) ... -->
                    <div class="btn btn-primary meta-icon dz-wishicon">
														<svg class="dz-heart-fill" width="14" height="12"
															viewBox="0 0 14 12" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M13.6412 5.80113C13.0778 6.9649 12.0762 8.02624 11.1657 8.8827C10.5113 9.49731 9.19953 10.7322 7.77683 11.62C7.30164 11.9159 6.69842 11.9159 6.22323 11.62C4.80338 10.7322 3.4888 9.49731 2.83435 8.8827C1.92382 8.02624 0.92224 6.96205 0.358849 5.80113C-0.551681 3.91747 0.344622 1.44196 2.21121 0.557041C3.98674 -0.282354 5.54034 0.292418 7.00003 1.44765C8.45972 0.292418 10.0133 -0.282354 11.786 0.557041C13.6554 1.44196 14.5517 3.91747 13.6412 5.80113Z"
																fill="white" />
														</svg>
														<svg class="dz-heart feather feather-heart"
															xmlns="http://www.w3.org/2000/svg" width="14" height="14"
															viewBox="0 0 24 24" fill="none" stroke="currentColor"
															stroke-width="2" stroke-linecap="round"
															stroke-linejoin="round">
															<path
																d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
															</path>
														</svg>
													</div>
                   </div>
                   
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
          // Append the product card HTML to the masonry layout
          $('#masonry').append(productCardHtml);
           // Generate HTML for the modal
           var modalHtml = `
           <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
               <!-- ... (modal content) ... -->
               <div class="modal-content">
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
						<i class="icon feather icon-x"></i>
					</button>
					<div class="modal-body">
						<div class="row g-xl-4 g-3">
							<div class="col-xl-6 col-md-6">
								<div class="dz-product-detail mb-0">
									<div class="swiper-btn-center-lr">
										<div class="swiper quick-modal-swiper2">
											<div class="swiper-wrapper" id="lightgallery">
												<div class="swiper-slide">
													<div class="dz-media DZoomImage">
														<a class="mfp-link lg-item" href="images/products/baby-seat.png"
															data-src="images/products/baby-seat.png">
															<!-- <i class="feather icon-maximize dz-maximize top-right"></i> -->
														</a>
														<img src="images/product/strawberry/straw.jpg" alt="image">
													</div>
												</div>
												<div class="swiper-slide">
													<div class="dz-media DZoomImage">
														<a class="mfp-link lg-item"
															href="images/products/baby-seat2.png"
															data-src="images/products/baby-seat2.png">
															<i class="feather icon-maximize dz-maximize top-right"></i>
														</a>
														<img src="images/product/strawberry/2.jpg" alt="image">
													</div>
												</div>
												<div class="swiper-slide">
													<div class="dz-media DZoomImage">
														<a class="mfp-link lg-item"
															href="images/products/baby-seat3.png"
															data-src="images/products/baby-seat3.png">
															<i class="feather icon-maximize dz-maximize top-right"></i>
														</a>
														<img src="images/product/strawberry/straw.jpg" alt="image">
													</div>
												</div>
												<div class="swiper-slide">
													<div class="dz-media DZoomImage">
														<a class="mfp-link lg-item" href="images/products/baby-seat.png"
															data-src="images/products/baby-seat.png">
															<i class="feather icon-maximize dz-maximize top-right"></i>
														</a>
														<img src="images/product/strawberry/2.jpg" alt="image">
													</div>
												</div>
											</div>
										</div>
										<!-- <div class="swiper quick-modal-swiper thumb-swiper-lg thumb-sm swiper-vertical">
											<div class="swiper-wrapper">
												<div class="swiper-slide">
													<img src="images/product/strawberry/straw.jpg" alt="image">
												</div>
												<div class="swiper-slide">
													<img src="images/product/strawberry/2.jpg" alt="image">
												</div>
												<div class="swiper-slide">
													<img src="images/product/strawberry/straw.jpg" alt="image">
												</div>
												<div class="swiper-slide">
													<img src="images/product/strawberry/2.jpg" alt="image">
												</div>

											</div>
										</div> -->
									</div>
								</div>
							</div>
							<div class="col-xl-6 col-md-6">
								<div class="dz-product-detail style-2 ps-xl-3 ps-0 pt-2 mb-0">
									<div class="dz-content">
										<div class="dz-content-footer">
											<div class="dz-content-start">
												<h4 class="title mb-1"><a href="shop-list.html">Strawberry Whipped foam
														Soap</a></h4>
												<div class="review-num">
													<ul class="dz-rating me-2">
														<li>
															<svg width="14" height="13" viewBox="0 0 14 13" fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z"
																	fill="#FF8A00"></path>
															</svg>
														</li>
														<li>
															<svg width="14" height="13" viewBox="0 0 14 13" fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z"
																	fill="#FF8A00"></path>
															</svg>
														</li>
														<li>
															<svg width="14" height="13" viewBox="0 0 14 13" fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z"
																	fill="#FF8A00"></path>
															</svg>
														</li>
														<li>
															<svg width="14" height="13" viewBox="0 0 14 13" fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.2"
																	d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z"
																	fill="#5E626F"></path>
															</svg>

														</li>
														<li>
															<svg width="14" height="13" viewBox="0 0 14 13" fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.2"
																	d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z"
																	fill="#5E626F"></path>
															</svg>
														</li>
													</ul>
													<span class="text-secondary me-2">4.7 Rating</span>
													<a href="javascript:void(0);">(5 customer reviews)</a>
												</div>
											</div>
										</div>
										<p class="para-text">
											Indulge in the sweet sensation of strawberry whipped soap .This lucious soap
											made with Shea Butter and Grapeseed Oil leaves your skin feeling refreshed ,
											hydrated and delicately scented.
										</p>
										<div class="meta-content m-b20 d-flex align-items-end">
											<div class="me-3">
												<span class="form-label">Price</span>
												<span class="price-num">55 AED <del>70 AED</del></span>
											</div>
											<div class="btn-quantity light me-0">
												<label class="form-label">Quantity</label>
												<input type="text" value="1" name="demo_vertical2">
											</div>
										</div>
										<div class="btn-group cart-btn">
											<a href="shop-cart.html" class="btn btn-md btn-secondary text-uppercase">Add
												To Cart</a>
											<a href="shop-wishlist.html" class="btn btn-md btn-light btn-icon">
												<svg width="19" height="17" viewBox="0 0 19 17" fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M9.24805 16.9986C8.99179 16.9986 8.74474 16.9058 8.5522 16.7371C7.82504 16.1013 7.12398 15.5038 6.50545 14.9767L6.50229 14.974C4.68886 13.4286 3.12289 12.094 2.03333 10.7794C0.815353 9.30968 0.248047 7.9162 0.248047 6.39391C0.248047 4.91487 0.755203 3.55037 1.67599 2.55157C2.60777 1.54097 3.88631 0.984375 5.27649 0.984375C6.31552 0.984375 7.26707 1.31287 8.10464 1.96065C8.52734 2.28763 8.91049 2.68781 9.24805 3.15459C9.58574 2.68781 9.96875 2.28763 10.3916 1.96065C11.2292 1.31287 12.1807 0.984375 13.2197 0.984375C14.6098 0.984375 15.8885 1.54097 16.8202 2.55157C17.741 3.55037 18.248 4.91487 18.248 6.39391C18.248 7.9162 17.6809 9.30968 16.4629 10.7792C15.3733 12.094 13.8075 13.4285 11.9944 14.9737C11.3747 15.5016 10.6726 16.1001 9.94376 16.7374C9.75136 16.9058 9.50417 16.9986 9.24805 16.9986ZM5.27649 2.03879C4.18431 2.03879 3.18098 2.47467 2.45108 3.26624C1.71033 4.06975 1.30232 5.18047 1.30232 6.39391C1.30232 7.67422 1.77817 8.81927 2.84508 10.1066C3.87628 11.3509 5.41011 12.658 7.18605 14.1715L7.18935 14.1743C7.81021 14.7034 8.51402 15.3033 9.24654 15.9438C9.98344 15.302 10.6884 14.7012 11.3105 14.1713C13.0863 12.6578 14.6199 11.3509 15.6512 10.1066C16.7179 8.81927 17.1938 7.67422 17.1938 6.39391C17.1938 5.18047 16.7858 4.06975 16.045 3.26624C15.3152 2.47467 14.3118 2.03879 13.2197 2.03879C12.4197 2.03879 11.6851 2.29312 11.0365 2.79465C10.4585 3.24179 10.0558 3.80704 9.81975 4.20255C9.69835 4.40593 9.48466 4.52733 9.24805 4.52733C9.01143 4.52733 8.79774 4.40593 8.67635 4.20255C8.44041 3.80704 8.03777 3.24179 7.45961 2.79465C6.811 2.29312 6.07643 2.03879 5.27649 2.03879Z"
														fill="black"></path>
												</svg>
												Add To Wishlist
											</a>
										</div>
										<div class="dz-info mb-0">
											<ul>
												<li>
													<strong>SKU:</strong>
													<span>PRT584E63A</span>
												</li>
												<li>
													<strong>Category:</strong>
													<span>Bottles,</span>
													<span>Accessories,</span>
													<span>Mats,</span>
													<span>Bottles,</span>
													<span>Trackers</span>
												</li>
												<li>
													<strong>Tags:</strong>
													<span>Trackers,</span>
													<span>Bags,</span>
													<span>Cup,</span>
													<span>Toothbrushes</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
           </div>
       `;

       // Append the modal HTML to the body
       $('body').append(modalHtml);
        });

      },
      error: function (error) {
        console.error('Error fetching data:', error);
      }
    });
  });
  

