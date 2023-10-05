var lastPage = "";
var currentPage = "";
function initroutes() {

	for(var i=0;i<routes.length;i++) {

		if(typeof(routes[i].on)=="undefined") {
			routes[i].on = {};
		}

		if(typeof(routes[i].on.pageInit)=="undefined") {
			routes[i].on.pageInit = function (e, page) {
				// do something when page initialized
				if(typeof(APP[page.name])!="undefined" && typeof(APP[page.name].pageInit)!="undefined") {
					APP[page.name].pageInit(e,page);
				}
			};
		}

		if(typeof(routes[i].on.pageBeforeIn)=="undefined") {
			routes[i].on.pageBeforeIn = function test (e, page) {
				lastPage = currentPage;
				currentPage = page;
				// do something before page gets into the view
				if(typeof(APP[page.name])!="undefined" && typeof(APP[page.name].pageBeforeIn)!="undefined") {
					APP[page.name].pageBeforeIn(e,page);
				}

			};
		}

		if(typeof(routes[i].on.pageAfterIn)=="undefined") {
			routes[i].on.pageAfterIn = function test (e, page) {
				// do something after page gets into the view
				if(typeof(APP[page.name])!="undefined" && typeof(APP[page.name].pageAfterIn)!="undefined") {
					APP[page.name].pageAfterIn(e,page);
				}
			};
		}
		if(typeof(routes[i].on.pageBeforeRemove)=="undefined") {
			routes[i].on.pageBeforeRemove = function test (e, page) {
				// do something before page gets into the view
				if(typeof(APP[page.name])!="undefined" && typeof(APP[page.name].pageBeforeRemove)!="undefined") {
					APP[page.name].pageBeforeRemove(e,page);
				}

			};
		}
		if(typeof(routes[i].on.beforeLeave)=="undefined") {
			routes[i].on.beforeLeave = function test (e, page) {
				// do something after page gets out of the view
				if(typeof(APP[page.name])!="undefined" && typeof(APP[page.name].beforeLeave)!="undefined") {
					APP[page.name].beforeLeave(e,page);
				}

			};
		}
		if(typeof(routes[i].on.pageBeforeOut)=="undefined") {
			routes[i].on.pageBeforeOut = function test (e, page) {
				// do something after page gets out of the view
				if(typeof(APP[page.name])!="undefined" && typeof(APP[page.name].pageBeforeOut)!="undefined") {
					APP[page.name].pageBeforeOut(e,page);
				}

			};
		}
		if(typeof(routes[i].on.pageAfterOut)=="undefined") {
			routes[i].on.pageAfterOut = function test (e, page) {
				// do something after page gets out of the view
				if(typeof(APP[page.name])!="undefined" && typeof(APP[page.name].pageAfterOut)!="undefined") {
					APP[page.name].pageAfterOut(e,page);
				}

			};
		}

	}

}


function currentUrl() {
	var url = "/";
	if(typeof(app)!="undefined" && typeof(app.views)!="undefined" && typeof(app.views.main)!="undefined" && typeof(app.views.main.router)!="undefined") {
		url = app.views.main.router.url;
		if(url.indexOf("?")!=-1) url = url.substr(0, url.indexOf("?"));
	}
	return url;
}

function routeback() {
	app.views.main.router.back();
}

/**
 * wird special auf "clear" gesetztm dann werden die Options so gesetzt, dass die Seiten-History verworfen wird und ohne Trasition direkt die andere Seite angezeigt wird
 * @param target
 * @param options
 * @param special
 */
function route(target, options, special) {
	if(typeof(options)=="undefined") options = {};
	if(typeof(special)=="undefined") special = "";

	if(special=="clear") {
		options = {
			"animate": false,
			"clearPreviousHistory": true,
			"history": ["/"],
			"browserHistory": false
		};
	}

	//app.router.navigate(target);
	app.views.main.router.navigate(target, options);
}