APP.categories = {
	pageInit: function (e, page) {

	},
	pageBeforeIn: function (e, page) {
		APP.categories.updatelist();
	},
	pageAfterIn: function (e, page) {

	},
	pageBeforeOut: function(e, page) {
	
	},
	pageAfterOut: function(e, page) {
	
	},
	updatelist: function () {
		var html = "";

		html += '<div class="list list-outline-ios list-strong-ios list-dividers-ios" style="margin-top:0;">';
		html += '<ul>';

		for(var i=0;i<APP.home.categories.length;i++) {
			var C = APP.home.categories[i];
			html += '<li>';
			html += '<a href="/catedit/'+C.id+'" class="item-link item-content">';
			//html += '		<div class="item-media">';
			//html += '		</div>';
			html += '		<div class="item-inner">';
			html += '			<div class="item-title">'+C.name+'</div>';
			html += '			<div class="item-after">';
			html += '			</div>';
			html += '		</div>';
			html += '</a>';
			html += '</li>';
		}

		html += '<ul>';
		html += '</div>';


		$('.cat-list').html(html);
	},
	add: function () {
		var name = $('.cat-new').val().trim();
		if(name=="") return;
		$('.cat-new').val("");
		APP.home.categories.push({
			"id": newid(),
			"name": name
		});
		writeStoreJson("categories", APP.home.categories);
		APP.categories.updatelist();
	},
	find: function(id) {
		for(var i =0;i<APP.home.categories.length;i++) {
			if(APP.home.categories[i].id == id) {
				return i;
			}
		}
		return -1;
	}

};