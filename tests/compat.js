(function () {
	var	i, slen, sheet, rules, sheets = document.styleSheets;
	if (!sheets.length) {
		return;
	}
	for (i = 0, slen = sheets.length; i < slen; i++) {
		sheet = sheets[i];
		try {
			rules = sheet.cssRules;
		} catch (e) {
			continue;
		}
		sheet.rules = rules;
	}
})();
