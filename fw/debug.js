var APPDEBUG = {
	"init": function () {
		var html = "<div style='position:fixed;top:0;left:"+($(window).width()/3)+"px;background-color:yellow;color:black;z-index: 9999;cursor:pointer;' onclick='APPDEBUG.open();return false;'>[DBG]</div>";
		if(typeof(cordova)=="undefined") {
			$('body').append(html);
		}
	},
	"open": function() {
		window.open("../../run.php?debug=1", "debug", "width=800,height=800,resizable=yes,scrollbars=yes");
	}
};

$(function() {
	APPDEBUG.init();
});