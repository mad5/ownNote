APP.view = {
	id: "",
	type: "",
	note: {},
	pageInit: function (e, page) {

	},
	pageBeforeIn: function (e, page) {
		cl(page.route.params);
		var id = page.route.params.id;
		var type = page.route.params.type;
		if(id==-1) {
			id = newid();
		}
		this.id = id;
		this.type = type;

		$('.view-edit-link').attr('href', "/edit/"+id+"/"+type)

		$('.view-area').hide();
		$('.view-'+type).show();

		this.note = readStoreJson("data-"+this.id);
		if(typeof(this.note.category)=="undefined") this.note.category = "";
		if(typeof(this.note.title)=="undefined") this.note.title = "";
		$('.view-title').html(this.note.title );

		var catinfo = "";
		$('.view-cat-info').hide();
		catI = APP.categories.find(this.note.category);
		if(catI>=0) {
			catinfo = "("+APP.home.categories[catI].name+")";
			$('.view-cat-info').show();
			$('.view-cat-info').html(catinfo);
		}


		$('.view-fontsize-link').hide();
		$('.view-page-title').html("");

		if(type=="note") this.viewNote();
		if(type=="checklist") this.viewChecklist();

	},
	pageAfterIn: function (e, page) {

	},
	pageBeforeOut: function(e, page) {
	
	},
	pageAfterOut: function(e, page) {
	
	},
	viewNote: function (id) {
		// https://github.com/showdownjs/showdown

		if(typeof(this.note.text)=="undefined") this.note.text = "";

		var converter = new showdown.Converter();
		var	html      = converter.makeHtml(this.note.text);

		APP.view.setSize();
		$('.view-note').html(html);

	},
	viewChecklist: function (id) {
		if(typeof(this.note.text)=="undefined") this.note.text = "";
		var html = "";

		html += '<div class="list list-strong-ios list-outline-ios list-dividers-ios" style="margin-top:0;">';
		html += '	<ul>';

		var lines = this.note.text.split("\n");
		for(var i=0; i<lines.length; i++) {
			var L = lines[i].trim();
			if(L=="" || L == "[]") continue;
			html += '<li>';
			html += '	<label class="item-checkbox item-checkbox-icon-end item-content">';
			html += '	<input type="checkbox" rel="'+i+'" onclick="APP.view.clickcheckbox(this);" onchange="APP.view.clickcheckbox(this);" value="Books" ';
			if(L.substring(0,3)=="[x]") {
				html += ' checked ';
			}
			if(L.substring(0,3)=="[x]") L  = L.substring(3);
			if(L.substring(0,3)=="[ ]") L  = L.substring(3);
			if(L.substring(0,2)=="[]") L  = L.substring(2);
			//
			html += ' />';
			html += '<i class="icon icon-checkbox"></i>';
			html += '<div class="item-inner">';
			html += '	<div class="item-title">';
			html += L;
			html += '</div>';
			html += '</div>';
			html += '</label>';
			html += '</li>';
		}
		html += '	</ul>';
		html += '	</div>';

		$('.view-checklist').html(html);
		this.updateTitle();
	},
	clickcheckbox: function(obj) {
		var nr = $(obj).attr("rel");
		var lines = this.note.text.split("\n");
		for(var i=0; i<lines.length; i++) {
			var L = lines[i].trim();
			if(L.substring(0,3)!="[ ]" && L.substring(0,2)!="[]" && L.substring(0,3)!="[x]") L = "[]"+L;
			if(i==nr) {
				if($(obj).is(":checked")) {
					if(L.substring(0,3)=="[ ]") {
						L = "[x]"+L.substring(3);
					}else if(L.substring(0,2)=="[]") {
						L = "[x]"+L.substring(2);
					}
				} else {
					if(L.substring(0,3)=="[x]") {
						L = "[]"+L.substring(3);
					}
				}
			}
			lines[i] = L;
		}
		this.note.text = lines.join("\n");
		//cl(this.note.text);
		writeStoreJson("data-"+this.id, this.note);
		this.updateTitle();
	},
	updateTitle: function() {
		var E = APP.home.extraInfo(this.id, this.type);
		$('.view-page-title').html(E.trim());
	},
	togglesize: function() {
		var size = readStoreInt("size");
		size++;
		if(size>5) size=0;
		writeStore("size", size);
		APP.view.setSize();
	},
	setSize: function() {
		$('.view-fontsize-link').show();
		var size = readStoreInt("size");
		var fs = 1;
		switch(size) {
			case 0: fs=1;break;
			case 1: fs=1.2;break;
			case 2: fs=1.4;break;
			case 3: fs=1.6;break;
			case 4: fs=1.8;break;
			case 5: fs=2;break;
		}
		cl(size);
		$('.view-note').css("font-size", fs+"em")
	}

};