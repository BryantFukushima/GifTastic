var topics = ['infinity war' , 'imitation game' , 'ready player one' , 'the notebook' , 'the terminator' , 'the matrix'];

function topicButtons() {
	for (var i in topics) {
	    var topicBtn = $('<button>');
	    topicBtn.text(topics[i]);
	    topicBtn.addClass('topic btn btn-info m-2');
	    $('#topicBtns').prepend(topicBtn);
	}
}
topicButtons();

var offset = 0;

var search;

function apiSearch() {

	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BC1tDXu1JM4fHvpETmJh2lcVkgXoa7j2&q=" + search + "&limit=10&offset=" + offset + "&rating=PG-13&lang=en";
    $.ajax({
        url: queryURL,
    }).then(function(response) {

	        for (var j in response.data) {
	        	var gifDiv = $('<div>');
	        	gifDiv.addClass('col-lg-4 showGif text-center');
	        	var gif = $('<img>');
	        	gif.addClass('gifImg');
		        gif.attr('src', response.data[j].images.original_still.url);
		        gif.attr('data-still' , response.data[j].images.original_still.url);
		        gif.attr('data-animate' , response.data[j].images.original.url);
		        gif.attr('data-start' , false);
		        var title = $('<h5>');
		        title.text(response.data[j].title);
		        var rating = $('<p>');
		        rating.text('Rating: ' + response.data[j].rating);
		        // var favorite = $('<span>');
		        // favorite.text('Favorite');
		        // favorite.addClass('favorite');
		        gifDiv.append(gif);
		        gifDiv.prepend(title);
		        gifDiv.append(rating);
		        // gifDiv.append(favorite);
		        $('#display').append(gifDiv);
			}
    });
}

function omdbSearch() {

	var movieURL =  'https://www.omdbapi.com/?apikey=a6aa09f&t=' + search;
    $.ajax({
        url: movieURL,
    }).then(function(responseM) {
    	console.log(responseM);

    	if (responseM.Error == "Movie not found!") {
    		$('.sorry > p').text('Sorry, Cant find movie.');
    		$('.sorry').css('display' , 'initial');
    	} else {
    		$('.sorry').css('display' , 'none');
    	var moviePoster = $('<img>');
    	moviePoster.attr('src' , responseM.Poster);
    	$('.poster').append(moviePoster);



    	var movieTitle = $('<h3>');
    	movieTitle.text(responseM.Title);
    	$('.plot').append(movieTitle);

    	var moviePlot = $('<p>');
    	moviePlot.text(responseM.Plot);
    	$('.plot').append(moviePlot);

    	}
    	
    });

}

$(document).on('click', '.topic', function() {

if ($(this).text() != search) {
	offset += 10;
	search = $(this).text();
	$('#display').empty();
	apiSearch();
	$('.poster').empty();
	$('.plot').empty();
	omdbSearch();

} else {
	offset = offset + 10;
	search = $(this).text();
	apiSearch();
}

});


$('#addTopic').on('click' , function() {

	event.preventDefault();

	var newTopic = $('#addVal').val();

	if (newTopic != "") {
		$('#topicBtns').empty();
		topics.push(newTopic);
		topicButtons();
		offset = 0;
		search = newTopic;
		$('.poster').empty();
		$('.plot').empty();
		omdbSearch();
		$('#display').empty();
		apiSearch();
	}

	$('#addVal').val("");

});

$(document).on('click' , '.gifImg' , function() {

	var animate = $(this).attr('data-animate');
	var still = $(this).attr('data-still');

	if ($(this).attr('data-start') == "false") {

		$(this).attr('data-start' , true);
		$(this).attr('src' , animate);
	} else {
		$(this).attr('data-start' , false);
		$(this).attr('src' , still);
	}

});

// $(document).on('click' , '.favorite' , function() {
		
// 	console.log($(this).css('background-color'))

// 	if ($(this).css('background-color') == 'rgba(0, 0, 0, 0)') {
// 		$(this).css('background-color' , 'rgba(255, 0, 0, 1)');
// 	} else {
// 		$(this).css('background-color' , 'rgba(0, 0, 0, 0)');
// 	}
// });