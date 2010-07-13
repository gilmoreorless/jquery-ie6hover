var testHoverSelectors = function (future) {
	var klass = 'hover-ie6',
		// jQuery < 1.4 can't handle 'mouseenter' and 'mouseleave' in live events
		is14 = /^1\.[4-9]/.test($.fn.jquery),
		sheets = document.styleSheets,
		check = /:hover\b/g,
		ignore = /\ba:hover\b/ig,
		selectors = [],
		i, j, len, slen, sheet, rules, rule, text;
//////
	var original = [], replaced;
//////
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
			text = rule.selectorText;
			if (check.test(text) && !ignore.test(text)) {
				// Add the selector in a way that jQuery can handle (ie. no ":hover")
				selectors.push(text.replace(check, ''));
				// Replace ":hover" with ".hover-ie6" and add a new CSS rule
				text = text.replace(check, '.' + klass);
				// New CSS rule should be added at the same place as the existing rule to keep inheritance working
				sheet.addRule(text, rule.style.cssText, j);
				// Increase the counters due to the new rule being inserted
				j++;
				len++;
			}
		}
	}

	if (selectors.length) {
		// Quick function to de-duplicate selector array before sending to jQuery, to save finding duplicate DOM nodes
		if (selectors.length > 1) {
			selectors = (function (oldArr) {
				for (var newArr = [], map = {}, i = 0, l = oldArr.length, val; i < l; i++) {
					val = oldArr[i];
					if (!map[val]) {
						map[val] = true;
						newArr.push(val);
					}
				}
				return newArr;
			})(selectors);
		}

		// Assign selectors to public object
		testHoverSelectors.selectors = selectors;
	}
}
testHoverSelectors.selectors = [];
