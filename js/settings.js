APP.settings = {
	colortheme: "red",
	mode: "light",
	pageInit: function (e, page) {

	},
	pageBeforeIn: function (e, page) {
		$('.setting-colortheme').val(APP.settings.colortheme);
		$('.setting-mode').val(APP.settings.mode);
	},
	pageAfterIn: function (e, page) {

	},
	pageBeforeOut: function(e, page) {
	
	},
	pageAfterOut: function(e, page) {
	
	},
	saveSettings: function () {
		APP.settings.colortheme = $('.setting-colortheme').val();
		APP.settings.mode = $('.setting-mode').val();
		writeStore("colortheme", APP.settings.colortheme);
		writeStore("mode", APP.settings.mode);
		APP.settings.applySettings();
	},
	applySettings: function() {
		APP.settings.colortheme = readStore("colortheme", "red");
		APP.settings.mode = readStore("mode", "light");
		$("body").removeClassStartingWith('color');
		$('body').addClass("color-"+APP.settings.colortheme);

		$('html').removeClass("dark");
		if(APP.settings.mode=="dark") $('html').addClass("dark");
	}

};