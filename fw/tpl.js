var inittpl = function(selector) {
	if ($(selector).data("tplcompiled") != 1) {
		var template = $(selector).html();
		var compiledTemplate = Template7.compile(template);
		$(selector).data("tplcompiled", 1);
		$(selector).data("tplc", compiledTemplate);
		$(selector).html("");
	}
}

var runtpl = function(selector, data) {

	if ($(selector).data("tplcompiled") == 1) {
		var compiledTemplate = $(selector).data("tplc");
		var html = compiledTemplate(data);
	} else {
		var template = $(selector).html();
		var compiledTemplate = Template7.compile(template);
		$(selector).data("tplcompiled", 1);
		$(selector).data("tplc", compiledTemplate);
		var html = compiledTemplate(data);
	}
	$(selector).html(html);
};



var tplStore = {};
function tplInit(selector) {
	if(typeof(tplStore[selector])=="undefined") {
		var template = $(selector).html();
		cl(template);
		$(selector).html("");
		tplStore[selector] = Template7.compile(template);
	}
}
function tpl(selector, values) {
	tplInit(selector);
	var html = tplStore[selector](values);
	return html;

}