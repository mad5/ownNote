// Dom7
var $$ = Dom7;

initroutes();

// Framework7 App main instance
var app  = new Framework7({
  el: '#app', // App root element
  //root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'ios', // auto Automatic theme detection
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView;

var initViewUrl = "/";
if(getQueryVariable("route")!="") {
  initViewUrl = getQueryVariable("route");
}

if(typeof(cordova)!="undefined") {
  mainView = app.views.create('.view-main', {
    url: initViewUrl
  });
  document.addEventListener("deviceready", appIsReady, false);
} else {
  $(function() {

    mainView = app.views.create('.view-main', {
      url: initViewUrl
    });

    appIsReady();
  });
}

function appIsReady() {
  if(typeof(app_id)=="undefined") app_id = "";
  onDeviceReady();
}
