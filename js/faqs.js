$(document).ready(function () {
    // Make an AJAX request to fetch FAQs
    $.ajax({
        url: `${SETTINGS.backendUrl}/Masters/GetAllFAQs`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Handle the response data and append FAQs to the container
            if (data && data.length > 0) {
                data.forEach(function (faq) {
                    var faqHtml = `
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 m-b30 m-sm-b15 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="faq-content-box style-1 light">
                                <div>
                                    <h3 class="dz-title" id="Question">${faq.title}</h3>
                                    <p id="answers">${faq.description}</p>
                                </div>
                            </div>
                        </div>`;
                    // Append the FAQ HTML to the container
                    $('#faq-container').append(faqHtml);
                });
            } else {
                // Handle the case when no FAQs are available
                $('#faq-container').append('<p>No FAQs available</p>');
            }
        },
        error: function (xhr, status, error) {
            // Handle the AJAX request error
            console.error('Error fetching FAQs:', error);
            $('#faq-container').append('<p>Error fetching FAQs</p>');
        }
    });
});