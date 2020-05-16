window.onload = function () {
  const amenitiesCheck = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenitiesCheck[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesCheck[$(this).data('id')];
    }
    const amenitiesList = Object.values(amenitiesCheck);
    if (amenitiesList.length > 0) {
      $('div.amenities h4').text(Object.values(amenitiesList).join(', '));
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', (data, status) => {
    console.log(data.status);
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_statis').removeClass('available');
    }
  });
};

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (let index = 0; index < data.length; index++) {
      const place = data[index];
      $('.places').append('<article><div class="title_box"> <h2>' + place.name +
      '</h2> <div class="price_by_night">$' + place.price_by_night +
      '</div></div><div class="information"><div class="max_guest">' +
      '<div class="guest_image"></div><p>' +
      place.max_guest + '</div><div class="number_rooms"><div class="bed_image"></div>' +
      place.number_rooms + '</div><div class="number_bathrooms"><div class="bath_image"></div>' +
      place.number_bathrooms + '</div></div><div class="description">' +
       place.description + '</div></article>');
    }
  }
});
