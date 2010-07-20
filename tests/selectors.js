var testHoverSelectors = function () {
//////
	var original = [], replaced = [], wasUsed;
//////
	var defaultClass = 'hover-ie6',
		currentClass = '',
		sheets = document.styleSheets,
		rCheck = /(\[.*?\])?:hover\b/g,
		rCheckErase = /:hover\b.*/ig,
		rIgnore = /\ba([#\.\[].*)*:hover\b/ig,
		rMulti = /\s*,\s*/g,
		rClass = /\.(\S+?)(?:\[.*?\])?(:hover)\b/ig,
		selectors = [],
		selectorClasses = {
			_default: defaultClass
		},
		selector, i, j, k, len, slen, tlen, sheet, rules, rule, text, tsplit;
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
			wasUsed = false;
			rule = rules[j];
			text = rule.selectorText;
			original.push(text);
			// Split up multiple selectors per rule to find just the one(s) we want
			tsplit = text.split(rMulti);
			for (k = 0, tlen = tsplit.length; k < tlen; k++) {
				text = tsplit[k];
				rCheck.lastIndex = 0;
				rIgnore.lastIndex = 0;
				if (rCheck.test(text) && !rIgnore.test(text)) {
					// Add the selector in a way that jQuery can handle (ie. no ":hover")
					selector = text.replace(rCheckErase, '');
					selectors.push(selector);
					// Check which class to add new rule for - default to ".hover-ie6"
					// IE6 can't handle .class1.class2 (it reads as just .class2), so if there's
					// a class already in the selector, generate a new custom class (eg .class1-class2)
					currentClass = defaultClass;
					rClass.lastIndex = 0;
					text = text.replace(rClass, function (match, className, hover) {
						currentClass = className + '-' + defaultClass;
						return hover;
					});
					// Replace ":hover" with new class (ignoring attribute rules) and add a new CSS rule
					text = text.replace(rCheck, '.' + currentClass);
					// If the replacement class is not standard, add it to the selector class map
					if (currentClass !== defaultClass) {
						selectorClasses[selector] = currentClass;
					}
					replaced.push(text);
					wasUsed = true;
				} else if (tlen == 1) {
					selectors.push('');
				}
			}
			if (!wasUsed) {
				replaced.push('');
			}
		}
	}

/////
	var replacedExpected = ['div.hover-ie6','','#id.hover-ie6','.class-hover-ie6','.hover-ie6','div div.hover-ie6','','div #id.hover-ie6','div .class-hover-ie6','div .hover-ie6','div.hover-ie6 div','','#id.hover-ie6 div','.class-hover-ie6 div','.hover-ie6 div','div#id.hover-ie6','div.class-hover-ie6','div.hover-ie6','','','','#id.class-hover-ie6','.class-hover-ie6','div div#id.hover-ie6','div div.class-hover-ie6','div div.hover-ie6','','','','div#id.hover-ie6 div','div.class-hover-ie6 div','div.hover-ie6 div','','','','div[attr] div#id.hover-ie6','div#id div.class-hover-ie6','div.class div.hover-ie6','','','','div#id.hover-ie6 div[attr]','div.class-hover-ie6 div#id','div.hover-ie6 div.class','','','','div2.hover-ie6','div1.hover-ie6','div2.hover-ie6','#id2.class-hover-ie6','','','','','',''],
		selectorsExpected = ['div','','#id','.class','[attr]','div div','','div #id','div .class','div [attr]','div','','#id','.class','[attr]','div#id','div.class','div[attr]','','','','#id.class','.class[attr]','div div#id','div div.class','div div[attr]','','','','div#id','div.class','div[attr]','','','','div[attr] div#id','div#id div.class','div.class div[attr]','','','','div#id','div.class','div[attr]','','','','div2','div1','div2','#id2.class','','','','','',''];

	for (i = 0, len = replaced.length; i < len; i++) {
		if (replaced[i] != replacedExpected[i]) {
			replaced[i] = '<span class="bad">' + (replaced[i] || '&nbsp;') + '</span>';
		} else {
			replaced[i] = '<span class="good">' + replaced[i] + '</span>';
		}
		if (selectors[i] != selectorsExpected[i]) {
			selectors[i] = '<span class="bad">' + (selectors[i] || '&nbsp;') + '</span>';
		} else {
			selectors[i] = '<span class="good">' + selectors[i] + '</span>';
		}
	}

	var output = function (selector, array) {
		$('<li>' + array.join('</li><li>') + '</li>').appendTo(selector);
	};
	output('#original', original);
	output('#replaced-expected', replacedExpected);
	output('#replaced', replaced);
	output('#selectors-expected', selectorsExpected);
	output('#selectors', selectors);
	console.warn(selectorClasses);
/////
}
