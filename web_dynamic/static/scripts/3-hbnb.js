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
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (const place of data) {
      $('section.places').append(
	'<article><div class="title_box"><h2>' +
	  place.name +
	  '</h2><div class="price_by_night">' +
	  place.price_by_night +
	  '</div></div><div class="information"><div class="max_guest">' +
	  place.max_guest +
	  'Guest{% if place.max_guest != 1 %}s{% endif %}' +
	  '</div><div class="number_rooms">' +
	  'Bedroom{% if place.number_rooms != 1 %}s{% endif %}' +
	  '</div><div class="number_bathrooms">' +
	  place.number_bathrooms +
	  'Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}' +
	  '</div></div><div class="user"><b>Owner:</b>' +
	  place.user.first_name +
	  place.user.last_name +
	  '</div><div class="description">' +
	  '{{ place.description | safe }}' +
	  '</div></article>{% endfor %}');
    }
  }
});
  
