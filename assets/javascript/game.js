$(document).ready(function() {

	var object;

	$("#field").focusin(function() {
		$(this).attr("value", "");
	});
	$("#field").blur(function() {
		$(this).attr("value", "Placeholder");
	});

	$("#submit").on("click", function(event) {
		event.preventDefault();
		var input = $("#field").val();
		var add = $("<input class='new' type='button' data='" + input + "'>").attr("value", input);
		add.appendTo(".buttons");
	});

	$(document).on("click", ".new", function() {
		$(".results").empty();
		var data = $(this).attr("data");
		var url = "http://api.giphy.com/v1/gifs/search?q=" + data + "&api_key=dc6zaTOxFJmzC";
		$.ajax({
			url: url,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			for (var i = 0; i < 10; i++) {
			var idStill = response.data[i].images.original_still.url;
			var idAnimate = response.data[i].images.original.url;
			$(".results").append("<img class='gif' src='" + idStill + "' alt='" + idAnimate + "'>");
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