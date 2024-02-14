const SETTINGS = {

  backendUrl: 'https://mig-dev.lifelinemegacorp.com/api',
  ImageUrl: 'https://mig-dev.lifelinemegacorp.com',

  ajaxError: function (jQxhr, textStatus, errorThrown) {
    swal(`${jQxhr.status}!`, jQxhr.responseText || textStatus, 'error');
  }
}



