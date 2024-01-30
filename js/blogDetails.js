// Function to get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const blogId = getQueryParam('Id');
console.log(blogId, 'blogId');
$(document).ready(function () {
    // Make an AJAX request to fetch blog details by ID
    $.ajax({
        url: `${SETTINGS.backendUrl}/Blogs/GetBlogById?id=${blogId}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var timestampStr = data.creationTime;

            // Parse the timestamp string into a Date object
            var timestamp = new Date(timestampStr);

            // Format the Date object into the desired format
            var formattedDate = formatDate(timestamp);

            // Display the formatted date
            console.log(formattedDate);

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
            // Handle the response data and update HTML content
            if (data) {
                var blogHtml = `
                    <h1 class="dz-title">${data.headerTitle}</h1>
                    <div class="dz-meta">
                        <ul>
                            <li class="post-date">${formattedDate}</li>
                            <li class="dz-user">
                                <i class="fa-solid fa-user"></i>
                                By <a href="javascript:void(0);">${data.lastActionByUser}</a>
                            </li>
                           
                        </ul>
                    </div>
                    <div class="dz-media">
                        <img src="${SETTINGS.ImageUrl}${data.thumbnail}" alt="${data.title}">
                        <img src="${SETTINGS.ImageUrl}${data.image}" alt="${data.title}">
                    </div>
                    <div class="dz-info">
                        <div class="dz-post-text">
                            <p>${data.description}</p>
                        </div>
                    </div>`;
                // Update the content of the blog details container
                $('#blog-details-container').append(blogHtml);
            } else {
                // Handle the case when no blog details are available
                $('#blog-details-container').append('<p>No blog details available</p>');
            }
        },
        error: function (xhr, status, error) {
            // Handle the AJAX request error
            console.error('Error fetching blog details:', error);
            $('#blog-details-container').append('<p>Error fetching blog details</p>');
        }
    });
});