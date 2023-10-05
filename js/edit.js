APP.edit = {
	id: "",
	type: "",
	note: {},
	simplemde: null,
	pageInit: function (e, page) {

	},
	pageBeforeIn: function (e, page) {
		APP.edit.deleted = false;

		cl(page.route.params);
		var id = page.route.params.id;
		var type = page.route.params.type;
		if(id==-1) {
			id = newid();
		}
		this.id = id;
		this.type = type;

		$('.edit-area').hide();
		$('.edit-'+type).show();

		this.note = readStoreJson("data-"+this.id);
		if(typeof(this.note.category)=="undefined") this.note.category = "";
		if(typeof(this.note.title)=="undefined") this.note.title = "";
		$('.note-title').val(this.note.title );

		if(type=="note") this.editNote();
		if(type=="checklist") this.editChecklist();

		var html = ' <option value=""></option>';
		for(var i =0;i<APP.home.categories.length;i++) {
			html += "<option value='"+APP.home.categories[i].id+"' ";
			if( APP.home.categories[i].id==this.note.category) html += " selected ";
			html += ">" + APP.home.categories[i].name + "</option>";
		}
		$('.cat-note-edit').html(html);

	},
	pageAfterIn: function (e, page) {

	},
	pageBeforeOut: function(e, page) {
		if(APP.edit.deleted != true) {
			this.note.title = $('.note-title').val().trim();
			if(this.note.title=="") this.note.title = this.type+" - "+now();

			if (this.type == "note") this.saveNote();
			if (this.type == "checklist") this.saveChecklist();

			var cat = $('.cat-note-edit').val();
			this.note.category = cat;
			this.note.id = this.id;

			writeStoreJson("data-" + this.id, this.note);
			var found = false;
			for (var i = 0; i < APP.home.allNotes.length; i++) {
				if (APP.home.allNotes[i].id == this.id) {
					found = true;
					APP.home.allNotes[i].title = this.note.title;
					APP.home.allNotes[i].changed = (new Date()).getTime();
					APP.home.allNotes[i].category = cat;
				}
			}
			if (!found) {
				APP.home.allNotes.push({
					title: this.note.title,
					type: this.type,
					id: this.id,
					category: cat,
					created: (new Date()).getTime(),
					changed: (new Date()).getTime()
				});
			}
			writeStoreJson("allnotes", APP.home.allNotes);
		}
	},
	pageAfterOut: function(e, page) {
	
	},
	deleted: false,
	delete: function () {
		app.dialog.confirm("delete this note?", "delete", function() {
			var list = [];
			for(var i=0;i<APP.home.allNotes.length;i++) {
				if(APP.home.allNotes[i].id==APP.edit.id) {
					cl("delete "+APP.edit.id);
					writeStore("data-" + APP.edit.id, "");
					continue;
				}
				list.push(APP.home.allNotes[i]);
			}
			cl(list);
			APP.home.allNotes = list;
			writeStoreJson("allnotes", APP.home.allNotes);
			APP.edit.deleted = true;
			route("/", {}, "clear");
		},  function() {});
		//cl(this.id);
	},
	editNote: function (id) {
		// https://github.com/Ionaru/easy-markdown-editor

		if(typeof(this.note.text)=="undefined") this.note.text = "";
		$('.edit-note-text').val(this.note.text);

		this.simplemde = new EasyMDE({
			hideIcons: ["guide", "image","preview", "side-by-side", "fullscreen"],
			placeholder: "Type here...",
			element: $(".edit-note-text")[0],
			status: false,
			spellChecker: false
		});

	},
	saveNote: function() {
		this.note.text = this.simplemde.value();
		this.simplemde.toTextArea();
		this.simplemde = null;
	},
	editChecklist: function (id) {
		if(typeof(this.note.text)=="undefined") this.note.text = "";
		$('.edit-checklist-text').val(this.note.text);
	},
	saveChecklist: function() {
		this.note.text = $('.edit-checklist-text').val();
	},
	settingstoggle: function() {
		$('.edit-settings').slideToggle();
	}

};