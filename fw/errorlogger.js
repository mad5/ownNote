var errorloggercontext = {};
window.onerror = function(message, url, lineNumber) {

	var URL = "https://app.lzkh.de/api2.php?action=errorlog";
	var data = {
		"message": message,
		"url": url,
		"lineNumber": lineNumber
	};
	data.version = version;
	data.deviceid = myid;
	data.context = errorloggercontext;
	errorloggercontext= {};

	$.ajax({
		"url": URL,
		"type": "post",
		"data": data,
		"dataType": "json",
		"success": function(res) {
		},
		error: function() {

		}

	});

	return false;	// returning false will let the default handler run.
}
console.log("Error-Logger aktiviert");