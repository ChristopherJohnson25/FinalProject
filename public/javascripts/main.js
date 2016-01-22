console.log("linked")

$(document ).ready(function() {
    console.log( "ready!" );

    var selectLocations;

    function _selectOptions(data) {
        selectLocations = $('#select-locations');
        data.forEach(function(element, index) {
            var option = $('<option></option>');
            option.attr('value', element.id);
            option.text(element.name);
            selectLocations.append(option);
        });
    }

    $('#entry').click(function() {
      var locationId = selectLocations.val();
      console.log('LOCATION ID ', locationId);
      location.href = '/report/' + locationId;
    });

    $.get('/api/locations').done(function(data) {
        console.log('SUCCESS DATA ', data);
        _selectOptions(data);
    });

});
