$(document).ready(function() {

	var array = ["Superman", "Batman", "Starlord", "Hulk", "Yoda"];

	$("#field").focusin(function() {
		$(this).attr("value", "");
	});
	$("#field").blur(function() {
		$(this).attr("value", "Placeholder");
	});

	function makeButtons() {
		$(".buttons").find($("input")).remove();
		for (var i = 0; i < array.length; i++) {
			var add = $("<input class='new btn btn-warning' type='button' data='" + array[i] + "'>").attr("value", array[i]);
			add.appendTo(".buttons");
		};
	}

	makeButtons();

	$("#submit").on("click", function(event) {
		event.preventDefault();
		var input = $("#field").val();
		array.push(input);
		makeButtons();
	});

	$(document).on("click", ".new", function() {
		$(".results").find("div").remove();
		var data = $(this).attr("data");
		var url = "https://api.giphy.com/v1/gifs/search?q=" + data + "&api_key=dc6zaTOxFJmzC";
		$.ajax({
			url: url,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			for (var i = 0; i < 10; i++) {
			var idStill = response.data[i].images.original_still.url;
			var idAnimate = response.data[i].images.original.url;
			var gifDiv = $("<div class='gifDiv'>");
			gifDiv.append("<span class='rating'>Rating: " + response.data[i].rating + "</span><br>");
			gifDiv.append("<img class='gif' src='" + idStill + "' alt='" + idAnimate + "'>");
			$(".results").append(gifDiv);
		};
		});
	});

	$(document).on("click", ".gif", function() {
		var swap1 = $(this).attr("src");
		var swap2 = $(this).attr("alt");

		$(this).attr("src", swap2);
		$(this).attr("alt", swap1);
	});


});