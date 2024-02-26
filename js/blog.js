$.ajax({
    type: "GET",
    url: `${SETTINGS.backendUrl}/Blogs/GetAllBlogs`,
    dataType: "json",
    success: function (response) {
        response.forEach(function (blogItem) {
            var timestampStr = blogItem.creationTime;

            // Parse the timestamp string into a Date object
            var timestamp = new Date(timestampStr);

            // Format the Date object into the desired format
            var formattedDate = formatDate(timestamp);

            function formatDate(date) {
                // Array of month names
                var monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];

                // Extract day, month, and year
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                // Format the date string
                var formattedDate = day + " " + monthNames[monthIndex] + " " + year;

                return formattedDate;
            }
            var blogList = `
            <div class="col-lg-6 col-md-6 col-6 wow fadeInUp" data-wow-delay="0.1s">
							<div class="dz-card style-1 ">
								<div class="dz-media blogsimg ">
									<img src="${SETTINGS.ImageUrl}${blogItem.thumbnail}" alt="/" >
								</div>
								<div class="dz-info">
									<div class="dz-meta">
										<ul>
											<li class="post-date">${formattedDate}</li>
										</ul>
									</div>
									<h3 class="dz-title">
										<a href="post-standard.html">${blogItem.headerTitle}</a>
									</h3>
									<a href="blogDetail.html?Id=${blogItem.id}" class="font-14 mt-auto read-btn">Read More
										<i class="icon feather icon-chevron-right"></i>
									</a>
								</div>
							</div>
						</div>`

            $('#blogListing').append(blogList)
        })
    }
});