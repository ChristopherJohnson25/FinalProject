console.log("linked")

$(document ).ready(function() {
    console.log( "ready!" );



// wrap all of the forecast data into a container div 
// that you can delete and replace
// listen for the change event or submit event on your form
// make an ajax call for the information for that location
// from your server
// when you get the data back
// create replacement html for the forecast data elements
// replace the existing html for the forcast data container/elements
// with the new ones you made from the data from the server.

var selectLocations = $('#select-locations');

$('#entry').click(function() {
  var locationId = selectLocations.val();
  console.log('LOCATION ID ', locationId);
  location.href = '/report/' + locationId;
});

$.ajax({
    url: "/report/:id",
    context: document.body
    }).done(function(){
        $("#entry").click(function(event){
        event.preventDefault();
        $(".ajax1").empty()
        $(".ajax1").append(

            "<p>"+results[0].swell.components.combined.direction+"</p>"

        )
    
        })
    })

  $('#chart1, #chart2').click(function(){
        console.log('charts clicked')
        $('.long.modal')
        .modal('show')
    });

    // $('#pic').click(function(){
    //     console.log('picture clicked')
    //     $('.ui.basic.modal')
    //     .modal('show')
    // });





    // $.get('/api/locations').done(function(data) {
    //     console.log('SUCCESS DATA ', data);
    //     _selectOptions(data);
    // });
    
    //  function _selectOptions(data) {
    //         selectLocations = $('#select-locations');
    //         data.forEach(function(element, index) {
    //             var option = $('<option></option>');
    //             option.attr('value', element.id);
    //             option.text(element.name);
    //             selectLocations.append(option);
    //         });
    //     }


});
