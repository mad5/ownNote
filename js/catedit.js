APP.catedit = {
	id: "",
	catI: -1,
	pageInit: function (e, page) {

	},
	pageBeforeIn: function (e, page) {
		var id = page.route.params.id;
		this.id = id;
		var catI = APP.categories.find(id);
		this.catI = catI;
		$('.cat-edit-name').val(APP.home.categories[catI].name);
		this.deleted = false;
	},
	pageAfterIn: function (e, page) {

	},
	pageBeforeOut: function(e, page) {
		if(APP.catedit.deleted==false) {
			var N = $('.cat-edit-name').val().trim();
			if (N != "") {
				APP.home.categories[APP.catedit.catI].name = N;
			}
		}
	},
	pageAfterOut: function(e, page) {
	
	},
	deleted: false,
	deletecat: function() {
		app.dialog.confirm("delete this category?", "delete", function () {
			APP.catedit.deleted = true;
			var c = [];
			for(var i=0;i<APP.home.categories.length;i++) {
				if(APP.home.categories[i].id==APP.catedit.id) continue;
				c.push(APP.home.categories[i]);
			}
			APP.home.categories = c;
			writeStoreJson("categories", APP.home.categories);
			routeback();
		});
	}

};