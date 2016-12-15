/////////////////////////////
////    client side     ////
///////////////////////////


$(function(){
  var source = $("#search-results").html();
  var dataTemplate = Handlebars.compile(source);
  $results = $('#results')

  $('#search').on('keyup', function(e){
  	if(e.keyCode === 13) {
			var parameters = { search: $(this).val() };
      // Display result for Player Summary
  		$.get('/player_summary', parameters, function(data){
    		if (data instanceof Array) {
          $results.html(dataTemplate({resultsArray:data}));
        } else {
          $results.html(data);
        };
  		});

      // Display result for Game Summary
  		$.get('/game_summary', parameters, function(data){
    		if (data instanceof Array) {
          $results.html(dataTemplate({resultsArray:data}));
        } else {
          $results.html(data);
        };
  		});
  	};
  });
});

