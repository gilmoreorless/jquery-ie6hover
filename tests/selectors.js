var testHoverSelectors = function () {
//////
	var original = [], replaced = [];
//////
	var klass = 'hover-ie6',
		sheets = document.styleSheets,
		check = /:hover\b/g,
		checkErase = /:hover\b.*/g,
		ignore = /\ba([#\.\[].*)*:hover\b/ig, // doesn't pick up a[attr] - work it out later
		selectors = [],
		i, j, len, slen, sheet, rules, rule, text;
	if (!sheets.length) {
		return;
	}
	for (i = 0, slen = sheets.length; i < slen; i++) {
		sheet = sheets[i];
		// Gracefully handle any cross-domain security errors
		try {
			rules = sheet.rules;
		} catch (e) {
			continue;
		}
		if (!rules || !rules.length) {
			continue;
		}
		for (j = 0, len = rules.length; j < len; j++) {
			rule = rules[j];
			if (!rule) continue;
			text = rule.selectorText;
			original.push(text);
			if (check.test(text) && !ignore.test(text)) {
				// Add the selector in a way that jQuery can handle (ie. no ":hover")
				selectors.push(text.replace(checkErase, ''));
				// Replace ":hover" with ".hover-ie6" and add a new CSS rule
				text = text.replace(check, '.' + klass);
				// Increase the counters due to the new rule being inserted
				len++;
			} else {
				selectors.push('');
			}
			replaced.push(text);
		}
	}

/////
	for (i = 0, len = original.length; i < len; i++) {
		if (original[i] != replaced[i]) {
			replaced[i] = '<span>' + replaced[i] + '</span>';
		}
	}
	$('#selectors').html(selectors.join('<br />'));
	$('#original').html(original.join('<br />'));
	$('#replaced').html(replaced.join('<br />'));
/////
}
