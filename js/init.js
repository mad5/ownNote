var myid = "";
var version = "1.0.1";
var app_id = "ownnote";
var appInitialized = false;

function onDeviceReady() {

    databaseDefinitionIDB();
	DC.init(function() { initLocalstorageIDB(afterDbInit); }, app_id);

}


function afterDbInit() {

    myid = readStore("myid");
	if(myid=="") {
		myid = (new Date()).getTime()+"-"+MD5(""+(new Date()).getTime() );
		writeStore("myid", myid)
	}
	
	document.addEventListener("pause", function() { }, false);
	document.addEventListener("resume", function() { }, false);

	document.addEventListener("backbutton", function () {
		var leftp = app.panel.left && app.panel.left.opened;
		var rightp = app.panel.right && app.panel.right.opened;
		if (leftp || rightp) {
			app.panel.close();
			return false;
		} else if ($$('.modal-in').length > 0) {
			app.dialog.close();
			app.popup.close();
			return false;
		} else if (app.views.main.router.url == '/') {
			navigator.app.exitApp();
		} else {
			mainView.router.back();
		}
	}, false);

	appInitialized = true;
}


$.fn.removeClassStartingWith = function (filter) {
	$(this).removeClass(function (index, className) {
		return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ')
	});
	return this;
};