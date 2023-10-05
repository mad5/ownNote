APP.home= {
	query: "",
	allNotes: [],
	categories: [],
	filtercatselect: "",
	pageBeforeIn: function (e, page) {
		if(APP.home.filtercatselect=="") {
			$('.home-settings').hide();
		}
	},
	pageAfterIn: function (e, page) {
		APP.home.process();

	},
	process: function () {
		if(appInitialized==false) {
			cl("not initialized");
			setTimeout(APP.home.process, 100);
			return;
		}

		APP.settings.applySettings();

		if(APP.home.categories.length==0) {
			APP.home.categories = readStoreJson("categories", []);
		}
		if(APP.home.allNotes.length==0) {
			APP.home.allNotes = readStoreJson("allnotes", []);
		}
		APP.home.updateList();

		var html = ' <option value="">show all</option>';
		for(var i =0;i<APP.home.categories.length;i++) {
			html += "<option value='"+APP.home.categories[i].id+"' ";
			if(APP.home.filtercatselect==APP.home.categories[i].id) html += " selected ";
			html += ">" + APP.home.categories[i].name + "</option>";
		}
		$('.cat-note-home').html(html);
	},
	search: function () {
		this.query = $('.home-search').val();
		this.updateList();
	},
	updateList: function () {
		//cl(APP.home.allNotes);

		var html = "";

		html += '<div class="list list-outline-ios list-strong-ios list-dividers-ios" style="margin-top:0;">';
		html += '<ul>';
		for(var i=0;i<APP.home.allNotes.length;i++) {
			if(typeof(APP.home.allNotes[i].category)=="undefined") {
				APP.home.allNotes[i].category = "";
			}

			if(APP.home.filtercatselect!="" && APP.home.filtercatselect!=APP.home.allNotes[i].category) continue;

			var N = APP.home.allNotes[i];
			//cl(N);

			if(this.query!="") {
				var full = N.title;
				var N2 = readStoreJson("data-" + N.id);
				if (N.type == "note") full += N2.text;
				if (N.type == "checklist") full += N2.text;
				full = full.toLowerCase();
				var q = this.query.toLowerCase().split(" ");
				var found = true;
				for(var j=0;j<q.length;j++) {
					if(full.indexOf(q[j])==-1) {
						found = false;
						break;
					}
				}
				if(found==false)  continue;
			}

			html += '<li>';
			html += '<a href="/view/'+N.id+'/'+N.type+'" class="item-link item-content">';
			//html += '		<div class="item-media">';
			//html += '		</div>';
			html += '		<div class="item-inner">';
			html += '			<div class="item-title">'+N.title;
				html += '</div>';
			html += '			<div class="item-after">';
			if(N.type=="checklist") html += " <span style='font-weight:normal;'>"+APP.home.extraInfo(N.id, N.type)+"&nbsp;</span>";
			if(N.type=="note") html += '<i class="icon f7-icons ios-only">text_quote</i><i class="icon material-icons md-only">text_quote</i>';
			if(N.type=="checklist") html += '<i class="icon f7-icons ios-only">checkmark_alt_circle</i><i class="icon material-icons md-only">checkmark_alt_circle</i>';
			html += '			</div>';
			html += '		</div>';
			html += '</a>';
			html += '</li>';

		}
		html += '<ul>';
		html += '</div>';

		$('.allnoteslist').html(html);
		/*

		 <div class="list list-outline-ios list-strong-ios list-dividers-ios">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">Ivan Petrov</div>
              <div class="item-after">CEO</div>
            </div>
          </div>
        </li>

		*/

	},
	extraInfo: function(id,type) {
		var N2 = readStoreJson("data-" + id);
		if(type=="checklist") {
			var count = 0;
			var checked = 0;
			var lines = N2.text.split("\n");
			for(var i=0; i<lines.length; i++) {
				var L = lines[i].trim();
				if (L == "" || L == "[]") continue;
				//cl(i+" : "+L)
				count++;
				if(L.substring(0,3)=="[x]") checked++;
			}
			return " ("+checked+"/"+count+")";
		}
		return "";
	},
	settingstoggle: function() {
		$('.home-settings').slideToggle();
	},
	filtercat: function() {
		APP.home.filtercatselect = $('.cat-note-home').val();
		APP.home.updateList();
	}

};