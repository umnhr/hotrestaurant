$(document).ready(function() {
		console.log("$", $.ajax());

	console.log("listening");
	$("#reservation-button").on("click", function(event) {
		event.preventDefault();
		let name = $("#nameInput").val().trim();
		let phone = $("#phoneInput").val().trim();
		let email = $("#emailInput").val().trim();
		let uniqueID = $("#uniqueIDInput").val().trim();
		$("#nameInput").val("");
		$("#phoneInput").val("");
		$("#emailInput").val("");
		$("#uniqueIDInput").val("");


		data = {
			name,
			phone,
			email,
			uniqueID
		}
		console.log("$", $);
		console.log("data:", data);
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/api",
			data: data
		}).then((response) => {

		});
	})

})