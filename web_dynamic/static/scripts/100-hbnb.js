
const stateCityCheck = {};
$(document).ready(function () {
  $('.locations').on('change', "input[type='checkbox']", function () {
    console.log('Checked');
    if (this.checked) {
      stateCityCheck[$(this).data('id')] = $(this).data('name');
    } else {
      delete stateCityCheck[$(this).data('id')];
    }
    const stateCityList = Object.values(stateCityCheck);
    console.log(stateCityList);

    if (stateCityList.length > 0) {
      $('div.locations h4').text(Object.values(stateCityList).join(', '));
    } else {
      $('div.locations h4').html('&nbsp;');
    }
  });

  const amenitiesCheck = {};
  $('.amenities').on('change', "input[type='checkbox']", function () {
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

    $.get('http://127.0.0.1:5001/api/v1/status/', (data, status) => {
      console.log(data.status);
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_statis').removeClass('available');
      }
    });
  });

  $('BUTTON').click(function () {
    const amenitiesId = Object.keys(amenitiesCheck);
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: amenitiesId }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        let page = '';
        for (let index = 0; index < data.length; index++) {
          const place = data[index];
          const htmlPage = '<article><div class="title_box"> <h2>' + place.name +
        '</h2> <div class="price_by_night">$' + place.price_by_night +
        '</div></div><div class="information"><div class="max_guest">' +
        '<div class="guest_image"></div>' +
        place.max_guest + ' Guests' + '</div><div class="number_rooms"><div class="bed_image"></div>' +
        place.number_rooms + ' Bedrooms' + '</div><div class="number_bathrooms"><div class="bath_image"></div>' +
        place.number_bathrooms + ' Bathrooms' + '</div></div><div class="description">' +
        place.description + '</div></article>';
          page += htmlPage;
          $('section.places').html(page);
        }
      }
    });
  });
});
