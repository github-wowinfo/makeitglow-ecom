const SETTINGS = {

  backendUrl: 'https://mig-dev.lifelinemegacorp.com/api',
  ImageUrl: 'https://mig-dev.lifelinemegacorp.com',

  ajaxError: function (jQxhr, textStatus, errorThrown) {
    console.log(jQxhr, textStatus, errorThrown);
    swal(`${jQxhr.status}!`, jQxhr.responseText || textStatus, 'error');
  }
}

// var config ={
//   cUrl :' https://api.countrystatecity.in/v1/countries',
//   // cKey :''
// }
//   var countrySelect =document.querySelector('.country')

//   function loadCountry(){
//     let apiEndPoint = config.cUrl
//     fetch(apiEndPoint,{headers:{"X-CSCAPI-KEY":config.cUrl}})
//     .then(Response => Response.json())
//     .then(data =>{
//       console.log(data)
//     })
//   }


// $(document).ready(function() {
//   $('#fetchBtn').click(function() {
//     const countryCode = $('#countryCode').val();

//     // Make AJAX request to fetch data
//     $.ajax({
//       url: `https://restcountries.com/v3.1/alpha/${countryCode}`,
//       method: 'GET',
//       success: function(data) {
//         // Handle the retrieved data
//         displayCountryData(data);
//       },
//       error: function(xhr, status, error) {
//         console.error('Error fetching data:', error);
//         $('#country-data').html('Error fetching data. Please try again.');
//       }
//     });
//   });

//   function displayCountryData(data) {
//     // Display the fetched data
//     $('#country-data').html(`
//       <h2>${data.name.common}</h2>
//       <p>Capital: ${data.capital}</p>
//       <p>Population: ${data.population}</p>
//       <!-- Add more data fields as needed -->
//     `);
//   }
// });

