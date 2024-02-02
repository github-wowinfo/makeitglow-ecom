 $(document).ready(function(){
            $.ajax({
                url: `${SETTINGS.backendUrl}/Masters/GetAllEvents`,
                method: 'GET',
                dataType: 'json',
                success: function(data){
                    // Assuming data is an array of events
                    // You can process the data and update the HTML accordingly
                    updateAccordion(data);
                    $("#lightgallery").lightGallery(); // Initialize LightGallery
                },
                error: function(error){
                    console.error('Error fetching data:', error);
                }
            });

            function updateAccordion(events) {
                // Assuming each event has properties like title, description, images
                var accordionHTML = '';

                events.forEach(function(event){
                    accordionHTML += `
                        <div class="accordion-item mt-5 active">
                            <h2 class="accordion-header" id="heading${event.id}">
                                <a href="#" class="accordion-button collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#collapse${event.eventEntryId}"
                                    aria-expanded="true" aria-controls="collapse${event.id}">
                                    ${event.title} - ${event.eventDate}
                                    <span class="toggle-close"></span>
                                </a>
                            </h2>
                            <div id="collapse${event.eventEntryId}" class="accordion-collapse collapse"
                                aria-labelledby="heading${event.id}" data-bs-parent="#accordionFaq">
                                <div class="accordion-body">
                                    <p>${event.description}</p>
                                    <!-- Add image rendering logic here -->
                                    <div class="dz-post-text demo-gallery">

                                    <div class="dz-post-text demo-gallery">
                                    <div class="demo-gallery lg-gallery">
                                        <ul id="lightgallery"
                                            class=" list-unstyled wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-images columns-4 is-cropped"
                                            style="border: none;">
                                            ${getImagesHTML(event.eventMediaFiles)}
                                        </ul>
                                    </div>
                                  </div>
                                    
                                </div>
                                </div>
                            </div>
                        </div>`;
                });
                

                // Assuming #accordionFaq is the ID of your accordion container
                $('#accordionFaq').html(accordionHTML);
              }
             function getImagesHTML(images) {
                var imagesHTML = '';
            
                images.forEach(function(image, index) {
                    imagesHTML += `
                        <li class="wp-block-image size-large"
                            data-responsive="${image.filePath} 375, ${image.filePath} 480, ${image.filePath} 800"
                            data-src="${SETTINGS.ImageUrl}${image.filePath}"
                            data-pinterest-text="Pin it${index + 1}"
                            data-tweet-text="share on twitter ${index + 1}">
                            <a href="">
                                <img class="img-responsive"
                                    src="${SETTINGS.ImageUrl}${image.filePath}"
                                    alt="img-${index + 1}">
                            </a>
                        </li>`;
                });
            
                return imagesHTML;
                
              }

            
});
        