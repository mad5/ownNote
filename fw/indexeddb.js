var DC = {
	/*
	 https://developer.mozilla.org/de/docs/Web/API/IndexedDB_API/IndexedDB_verwenden
	 */

	"version": 1,
	"tables": [],

	"request": null,
	"databasename": "",
	"init": function (callback, databasename) {
		if (typeof (callback) == "undefined") {
			callback = function () {
			};
		}

		// IndexedDB
		if (typeof (app_id) == "undefined") {
			app_id = "appdb";
		}
		if (typeof (databasename) == "undefined") {
			databasename = "datenbank";
		}
		this.databasename = databasename;
		this.objectstorename = "MyObjectStore";
		if (typeof (callback) == "undefined") {
			callback = function () {
				cl("nothing after DC-init");
			};
		}

		DC.openIndexedDB(callback);

	},


	"openIndexedDB": function (callback) {
		if (typeof (callback) == "undefined") {
			callback = function () {
			};
		}

		// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var openDB = indexedDB.open(DC.databasename, DC.version);
		openDB.onupgradeneeded = function () {
			var db = {}
			db.result = openDB.result;
			for (var i = 0; i < DC.tables.length; i++) {
				//cl(DC.tables[i]);
				try {
					db.store = db.result.createObjectStore(DC.tables[i].name, {keyPath: "id"});
				} catch (e) {
				}
				;
			}
			/*
			if (fileindex) {
				db.index = db.store.createIndex("NameIndex", fileindex);
			}
			*/
		};
		openDB.onsuccess = function (event) {
			var db = event.target.result;
			callback();
		}

		return openDB;
	},

	"getStoreIndexedDB": function (table, openDB) {
		var db = {};
		db.result = openDB.result;
		db.tx = db.result.transaction(table, "readwrite");
		db.store = db.tx.objectStore(table);
		//db.index = db.store.index("NameIndex");

		return db;
	},

	"saveIndexedDB": function (table, filename, filedata, fileindex) {
		var openDB = DC.openIndexedDB(fileindex);

		openDB.onsuccess = function () {
			var db = DC.getStoreIndexedDB(table, openDB);

			db.store.put({id: filename, data: filedata});
		}

		return true;
	},

	"findIndexedDB": function (table, filesearch, callback) {
		return DC.loadIndexedDB(table, null, callback, filesearch);
	},

	"loadIndexedDB": function (table, filename, callback, filesearch) {
		var openDB = DC.openIndexedDB();

		openDB.onsuccess = function () {
			var db = DC.getStoreIndexedDB(table, openDB);

			var getData;
			if (filename) {
				getData = db.store.get(filename);
			} else {
				getData = db.index.get(filesearch);
			}

			getData.onsuccess = function () {
				if (typeof (getData.result) == "undefined") {
					callback(null);
				} else {
					callback(getData.result.data);
				}
			};

			db.tx.oncomplete = function () {
				db.result.close();
			};
		}

		return true;
	},
	"getAll": function (table, callback) {
		var openDB = DC.openIndexedDB();

		openDB.onsuccess = function () {
			var db = DC.getStoreIndexedDB(table, openDB);


			var all = {};

			db.store.openCursor().onsuccess = function (event) {
				var cursor = event.target.result;
				if (cursor) {
					//cl([cursor.key, cursor.value.data]);
					all[cursor.key] = cursor.value.data;
					cursor.continue();
				} else {
					//alert("No more entries!");
					//cl("Ende");
					callback(all);
				}
			};

			//callback(["all", res]);
		};
	},
	/* DC.set("mykey", "myval"); */
	"set": function (table, key, val) {
		this.saveIndexedDB(table, key, val);
	},
	/* DC.get("mykey", function(res) {}); */
	"get": function (table, key, callback) {
		this.loadIndexedDB(table, key, callback);
	},
	/* DC.find("search", function(res) {}); */
	"find": function (table, search, callback) {
		this.loadIndexedDB(table, null, callback, search);
	},
	"delete": function (table, key) {
		var openDB = DC.openIndexedDB();
		openDB.onsuccess = function () {
			var db = DC.getStoreIndexedDB(table, openDB);
			db.store.delete(key);
		};
	},
	"purgeAll": function(table, callback) {
		if(typeof(callback)=="undefined") callback = function() {};
		DC.getAll(table, function (res) {
			$.each(res, function (key, val) {
				if(typeof(memStore[app_id + "_" + key])!="undefined") {
					delete memStore[app_id + "_" + key];
				}
				DC.delete(table, key);
			});

			callback();
		});
	}

}