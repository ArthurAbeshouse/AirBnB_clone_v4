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
};

$.get('http://0.0.0.0:5001/api/v1/status/', (data, status) => {
  if (status === 'success') {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_statis').removeCass('available');
    }
  }
});
