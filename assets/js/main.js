var topics = ['UFC', 'baseball', 'basketball', 'football', 'soccer', 'tennis', 'wrestling', 'jiu-jitsu', 'hockey', 'golf'];

function topicButtons() {
	for (var i in topics) {
	    var topicBtn = $('<button>');
	    topicBtn.text(topics[i]);
	    topicBtn.addClass('topic btn btn-info m-2');
	    $('#topicBtns').append(topicBtn);
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
	        	gifDiv.addClass('col-4 showGif');
	        	var gif = $('<img>');
	        	gif.addClass('gifImg');
		        gif.attr('src', response.data[j].images.original_still.url);
		        gif.attr('data-still' , response.data[j].images.original_still.url);
		        gif.attr('data-animate' , response.data[j].images.original.url);
		        gif.attr('data-start' , false);
		        var rating = $('<p>');
		        rating.text('Rating: ' + response.data[j].rating);
		        gifDiv.append(gif);
		        gifDiv.prepend(rating)
		        $('#display').append(gifDiv);

		       
		    }
        
    });
}

$(document).on('click', '.topic', function() {

if ($(this).text() != search) {
	offset = 0;
	search = $(this).text();
	$('#display').empty();
	apiSearch();

} else {
	offset = offset + 10;
	search = $(this).text();
	apiSearch();
}

});


$('#addTopic').on('click' , function() {

	event.preventDefault();

	var newTopic = $('#addVal').val()

	if (newTopic != "") {
		$('#topicBtns').empty();
		topics.push(newTopic);
		topicButtons();
		offset = 0;
		search = newTopic;
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