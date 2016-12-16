/////////////////////////////
////    client side     ////
///////////////////////////


$(function(){
  // Initialize variables and map to HTML files and set up Handlebars
  var export_ps = $("#export_ps").html();
  var dataTemplate_ps = Handlebars.compile(export_ps);
  var export_gs = $("#export_gs").html();
  var dataTemplate_gs = Handlebars.compile(export_gs);
  // Map the div in index.pug to the respective queries
  $display_ps = $('#display_ps')
  $display_gs = $('#display_gs')
  // JQuery/Ajax doing work with input from the search bar
  $('#search').on('keyup', function(e){
  	if(e.keyCode === 13) {
			var parameters = { search: $(this).val() };
      // Display result for Player Summary
  		$.get('/player_summary', parameters, function(data){
    		if (data instanceof Array) {
          $display_ps.html(dataTemplate_ps({resultsArray:data}));
        } else {
          $display_ps.html(data);
        };
  		});
      // Display result for Game Summary
  		$.get('/game_summary', parameters, function(data){
    		if (data instanceof Array) {
          $display_gs.html(dataTemplate_gs({resultsArray:data}));
        } else {
          $display_gs.html(data);
        };
  		});
  	};
  });
});

