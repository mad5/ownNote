var lsKeys = {};
var toStore = {};
var toStoreDelay = -1000;

var memStore = {};

var didInit = false;

var lsSaveInter = null;

function initLocalstorageIDB(callback) {
	if (typeof (callback) == "undefined") {
		callback = function () {};
	}
	if (typeof (DC) != "undefined") {
		if (didInit) {
			return;
		}
		didInit = true;
		if (lsSaveInter != null) {
			clearInterval(lsSaveInter);
		}
		lsSaveInter = setInterval(function () {
			if (toStoreDelay < -500) {
				return;
			}
			toStoreDelay -= 200;
			if (toStoreDelay <= 0) {
				toStoreDelay = -1000;
				$.each(toStore, function (key, val) {
					(function (name, val) {
						DC.set("localstorage", name, val);
					})(key, val);
					delete toStore[key];
				});

			}
		}, 200);
		DC.getAll("localstorage", function (res) {
			//cl(["inital localstorage", res]);
			$.each(res, function (key, val) {
				//localStorage.setItem(app_id+"_"+key, val);
				lsKeys[key] = 1;
				memStore[app_id + "_" + key] = val;
			});

			callback();
		});

	}
}

function writeStore(name, data) {

	memStore[app_id + "_" + name] = data;
	lsKeys[name] = 1;

	toStore[name] = data;
	toStoreDelay = 500;

	return true;
}


function readStore(name, defaultVal) {
	if (typeof (defaultVal) == "undefined") {
		defaultVal = "";
	}
	var data = defaultVal;

	data = memStore[app_id + "_" + name];
	if (typeof (data) == "undefined" || data === null) {
		data = defaultVal;
	}

	if (typeof (lsKeys[name]) == "undefined") {
		//writeStore(name, data);
	}

	return data;
}

function readStoreInt(name) {
	var val = readStore(name);
	if (val == "") {
		val = 0;
	}
	return +val;
}

function writeStoreJson(name, obj) {
	if(typeof(errorloggercontext)!="undefined") {
		errorloggercontext.func = "writeStoreJson";
		errorloggercontext.name = name;
	}
	writeStore(name, JSON.stringify(obj));
}

function readStoreJson(name, defaultval) {
	if (typeof (defaultval) == "undefined") {
		defaultval = {};
	}
	var obj = defaultval;
	var data = readStore(name);
	if (data != "" && typeof (data) != "undefined" && data != "undefined") {
		obj = JSON.parse(data);
	}
	if(obj===null) obj = defaultval;
	return obj;
}