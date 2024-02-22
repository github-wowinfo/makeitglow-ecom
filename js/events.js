
$(document).ready(function () {
    // Function to make AJAX request
    function getEventYears() {
        $.ajax({
            url: 'https://mig-dev.lifelinemegacorp.com/api/Masters/GetEventYears',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // On successful API call, populate the accordion tabs
                populateAccordion(data);
            },
            error: function (error) {
                console.error('Error fetching data from the API:', error);
            }
        });
    }
    function getEventsByYear(year) {
        $.ajax({
            url: `${SETTINGS.backendUrl}/Masters/GetAllEventsByYear/${year}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('data', data);
                // On successful API call, update the accordion with events for the selected year
                updateAccordion(data);
            },
            error: function (error) {
                console.error('Error fetching events for the year:', error);
            }
        });
    }

    // Function to populate accordion tabs with data
    function populateAccordion(eventYears) {
        // Assuming eventYears is an array of year values

        // Get the accordion wrapper and the tab content wrapper
        var accordionTabGroup = $('.accordion_tab_group');
        // var accordionTabContents = $('.accordion_tab_contents');

        // Loop through each year and create tabs and content
        $.each(eventYears, function (index, year) {
            // Create radio input for the tab
            var radioInput = $('<input>', {
                type: 'radio',
                id: 'tab-' + year,
                name: 'accordion_group',
                class: 'radio'
            });

            // Create label for the tab
            var tabLabel = $('<label>', {
                for: 'tab-' + year,
                class: 'tab',
                text: year
            });

            // Append radio input and label to the accordion tab group
            accordionTabGroup.append(radioInput);
            accordionTabGroup.append(tabLabel);

            // Create div for the tab content
            // var tabContent = $('<div>', {
            //     class: 'accordion_tab_content',
            //     id: 'tab-' + year + '-content'
            // });

            // // Create accordion div for the tab content
            // var accordionDiv = $('<div>', {
            //     class: 'accordion dz-accordion accordion-sm',
            //     id: 'accordionFaq-' + year
            // });

            // // Append accordion div to the tab content
            // tabContent.append(accordionDiv);

            // // Append tab content to the accordion tab contents
            // accordionTabContents.append(tabContent);
        });
        accordionTabGroup.on('click', '.tab', function () {
            // accordionTabGroup.on('change', '.radio', function () {

            var selectedYear = $(this).text();
            // var selectedYear = $(this).attr('id').replace('tab-', '');
            getEventsByYear(selectedYear);
        });
        accordionTabGroup.find('.tab:first').trigger('click');

        // Trigger click on the first tab to show its content
        // accordionTabGroup.find('.radio:first').prop('checked', true);
        // accordionTabGroup.find('.tab:first').trigger('click');
    }

    function updateAccordion(events) {
        var accordionHTML = '';

        events.forEach(function (event) {
            accordionHTML += `
<<<<<<< HEAD
                <div class="accordion dz-accordion accordion-sm" id="accordionFaq">
                     <div class="accordion-item mt-5 active">
                            <h2 class="accordion-header" id="heading${event.id}" onClick="fetchData(${event.eventEntryId})">
                                <a href="#" class="accordion-button collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#collapse${event.eventEntryId}"
                                    aria-expanded="true" aria-controls="collapse${event.id}">
                                    ${event.title} - ${event.eventDate}
                                    <span class="toggle-close"></span>
                                </a>
                            </h2>
=======
            <div class="accordion dz-accordion accordion-sm" id="accordionFaq">
                <div class="accordion-item mt-5 active">
                    <h2 class="accordion-header" id="heading${event.id}">
                        <a href="#" class="accordion-button collapsed"
                            data-bs-toggle="collapse" data-bs-target="#collapse${event.eventEntryId}"
                            aria-expanded="false" aria-controls="collapse${event.id}"
                            onclick="loadEventData(${event.eventEntryId})">
                            ${event.title} - ${event.eventDate}
                            <span class="toggle-close"></span>
                        </a>
                    </h2>
                    <div id="collapse${event.eventEntryId}" class="accordion-collapse collapse"
                        aria-labelledby="heading${event.id}" data-bs-parent="#accordionFaq">
                        <div class="accordion-body">
                            <!-- Content for the accordion item goes here -->
                        </div>
>>>>>>> 62e2ae8ff715a0115f47912762eff183c94d042d
                    </div>
                </div>
            </div>`;
        });

<<<<<<< HEAD
    //         <div class="dz-post-text demo-gallery">
    //         <div class="demo-gallery lg-gallery">
    //             <ul id="lightgallery"
    //                 class=" list-unstyled wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-images columns-4 is-cropped"
    //                 style="border: none;">
    //                 ${getImagesHTML(event.eventMediaFiles)}
    //             </ul>
    //         </div>
    //       </div>
            
    //     </div>
    //     </div>
    // </div>
        lightGallery(document.getElementById('lightgallery'))
    }
    getEventYears();
  });

 function fetchData(eventEntryId) {
    console.log('eventEntryId',eventEntryId);
        $.ajax({
            url: `https://mig-dev.lifelinemegacorp.com/api/Masters/GetEvent/${eventEntryId}`,
            method: 'GET',
            success: function (data) {
                // Populate the accordion body with the fetched data
                $(`#collapse${eventEntryId} .accordion-body`).html(`
                    <p>${data.description}</p>
                    <div class="dz-post-text demo-gallery">
                        <div class="demo-gallery lg-gallery">
                            <ul id="lightgallery" class="list-unstyled wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-images columns-4 is-cropped" style="border: none;">
                                ${getImagesHTML(data.eventMediaFiles)}
                            </ul>
                        </div>
                    </div>
                `);
                // $(`#collapse${eventEntryId}`).collapse('show');
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    function getImagesHTML(images) {
        var imagesHTML = '';
=======
        $('#tab-content').html(accordionHTML);

        // Initialize LightGallery
        lightGallery(document.getElementById('lightgallery'));
    }
    getEventYears();
});


function loadEventData(eventEntryId) {
    console.log('eventEntryId', eventEntryId);
    $.ajax({
        url: `https://mig-dev.lifelinemegacorp.com/api/Masters/GetEvent/${eventEntryId}`,
        method: 'GET',
        success: function (data) {
            // Populate the accordion body with the fetched data
            $(`#collapse${eventEntryId} .accordion-body`).html(`
                    <p>${data.description}</p>
                    <div class="dz-post-text demo-gallery">
                        <div class="demo-gallery lg-gallery">
                            <ul id="lightgallery" class="list-unstyled wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-images columns-4 is-cropped" style="border: none;">
                                ${getImagesHTML(data.eventMediaFiles)}
                            </ul>
                        </div>
                    </div>
                `);
            $(`#collapse${eventEntryId}`).collapse('show');
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
    // Make API call using eventEntryId
    // fetch('your-api-url/' + eventEntryId)
    //     .then(response => response.json())
    //     .then(data => {
    //         // Process API response
    //         console.log('API response:', data);
    //         // Update the accordion item content with the API data
    //         $('#collapse' + eventEntryId + ' .accordion-body').html('API response: ' + JSON.stringify(data));
    //     })
    //     .catch(error => {
    //         console.error('API error:', error);
    //     });
}

//  function fetchData(eventEntryId) {
//     console.log('eventEntryId',eventEntryId);
//         $.ajax({
//             url: `https://mig-dev.lifelinemegacorp.com/api/Masters/GetEvent/${eventEntryId}`,
//             method: 'GET',
//             success: function (data) {
//                 // Populate the accordion body with the fetched data
//                 $(`#collapse${eventEntryId} .accordion-body`).html(`
//                     <p>${data.description}</p>
//                     <div class="dz-post-text demo-gallery">
//                         <div class="demo-gallery lg-gallery">
//                             <ul id="lightgallery" class="list-unstyled wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-images columns-4 is-cropped" style="border: none;">
//                                 ${getImagesHTML(data.eventMediaFiles)}
//                             </ul>
//                         </div>
//                     </div>
//                 `);
//                 $(`#collapse${eventEntryId}`).collapse('show');
//             },
//             error: function (error) {
//                 console.error('Error fetching data:', error);
//             }
//         });
//     }
function getImagesHTML(images) {
    var imagesHTML = '';
>>>>>>> 62e2ae8ff715a0115f47912762eff183c94d042d

    images.forEach(function (image, index) {
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
