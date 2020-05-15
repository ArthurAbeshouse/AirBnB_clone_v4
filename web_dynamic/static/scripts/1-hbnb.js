$(document).ready(() => {
  const amenitiesCheck = {};

  console.log(amenitiesCheck);

  $('input:checkbox').on('change', () => {
    if (this.checked) {
      amenitiesCheck[$(this).data('id')] = $(this.data('name'));
      console.log(amenitiesCheck);
    } else {
      delete amenitiesCheck[$(this).data('id')];
    }
    $('div.amenites h4').text(Object.values(amenitiesCheck).join(', '));
    if (Object.keys(amenitiesCheck).length === 0) {
      $('div.amenites h4').text('\u00A0');
    }
  });
});
