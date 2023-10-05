APP.backup = {
	pageInit: function (e, page) {

	},
	pageBeforeIn: function (e, page) {

	},
	pageAfterIn: function (e, page) {

	},
	pageBeforeOut: function (e, page) {

	},
	pageAfterOut: function (e, page) {

	},
	backup: function () {

		var data = {};
		data.categories = readStoreJson("categories", []);
		data.notes = readStoreJson("allnotes", []);
		data.notedata = [];
		for (var i = 0; i < data.notes.length; i++) {
			var N2 = readStoreJson("data-" + data.notes[i].id);
			data.notedata.push(N2);
		}
		data.settings = {
			colortheme: readStore("colortheme", "red"),
			mode: readStore("mode", "light")
		};
		data.checks = {
			categories: data.categories.length,
			notes: data.notes.length,
			notedata: data.notedata.length
		};
		//cl(data);
		var json = JSON.stringify(data);
		//cl(json);
		//cl(json.length);

		base64 = btoa(json);
		//cl(base64);
		//cl(base64.length);

		/*
		        <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

		 */
/*
		cordova.plugins.manageStorage.requestPermission(function(result){
			APP.backup.download2("backup.ownnote", base64)
		});
*/

		/*
		var permissions = cordova.plugins.permissions;

		var list = [ permissions.MANAGE_EXTERNAL_STORAGE];
		permissions.requestPermission(list,function(ok) {
			cl(ok);
			APP.backup.download2("backup.ownnote", base64)
		}, function(err) {
			cl(err);
		});
		*/

		var D = new Date();
		var T = add0(D.getHours())+""+add0(D.getMinutes())+""+add0(D.getSeconds());
		APP.backup.download2("ownNote-"+date8()+T+".backup", base64);


	},
	download2: function(filename, data) {



		// Request the file system
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dirEntry) {
			cl([52, dirEntry]);
			// Create a new file or overwrite an existing one
			dirEntry.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
				// Create a FileWriter to write to the file
				cl([56, fileEntry]);
				fileEntry.createWriter(function (fileWriter) {
					cl([58, fileWriter]);
					fileWriter.onwriteend = function () {
						// File write completed, now create a download link
						//var blob = new Blob([data], { type: 'text/plain' });
						//var blobUrl = URL.createObjectURL(blob);
						//cl(blobUrl);


						//var blob = new Blob([data], { type: 'text/plain' });
						//var blobUrl = URL.createObjectURL(blob);

						var fileTransfer = new FileTransfer();
						//var uri = encodeURI(blobUrl);

						fileTransfer.download(
							cordova.file.externalApplicationStorageDirectory+filename,
							cordova.file.externalRootDirectory+"Download/" +filename,
							function(entry) {
								console.log("download complete: " + entry.toURL());
								app.dialog.alert("saved to your download-folder as "+filename, "backup complete", function() {});
							},
							function(error) {
								console.log("download error source " + error.source);
								console.log("download error target " + error.target);
								console.log("download error code" + error.code);
								app.dialog.alert("sorry, something went wrong.", "backup failed", function() {});
							},
							false,
							{

							}
						);


						return;

						var fileMIMEType = "application/octet-stream";
						cordova.plugins.fileOpener2.open(
							cordova.file.externalApplicationStorageDirectory +filename,
							fileMIMEType,
							{
								error : function(e){ cl(e); },
								success : function(s){ cl(s); }
							}
						);
						/*
cl([63, blobUrl]);
						var a = document.createElement('a');
						a.href = blobUrl;
						a.download = filename; // Set the desired filename
						a.class = "link external";
						a.text = "Download";
						a.click();
						$('.bl').append(a);
cl([69, a]);
*/
						//URL.revokeObjectURL(blobUrl);
					};

					fileWriter.onerror = function (e) {
						console.error("Error writing to file: " + e.toString());
					};

					// Write the data to the file
					fileWriter.write(data);
				});
			});
		});

	},
	download: function (filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('class', 'link external');
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	},
	restore: function () {
		var file = $('.restorefile')[0].files[0];
		if (file) {
			var reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = function (evt) {
				var base64 = evt.target.result;
				cl(base64);
				var json = atob(base64);
				cl(json);
				var data = JSON.parse(json);
				cl(data);

				if(data.checks.categories == data.categories.length
				&&
					data.checks.notes == data.notes.length
					&&
					data.checks.notedata == data.notedata.length
				) {

					writeStoreJson("categories", data.categories);
					writeStoreJson("allnotes", data.notes);
					for(var i=0;i<data.notedata.length;i++) {
						writeStoreJson("data-" + data.notedata[i].id, data.notedata[i]);
					}
					APP.home.categories = data.categories;
					APP.home.allNotes = data.notes;

					app.dialog.alert("all data restored", "restore complete", function() {
						routeback();
					});


				} else {
					alert("an error occurred!");
				}

			}
			reader.onerror = function (evt) {
				alert("an error occurred!");
			}
		}
	}

};