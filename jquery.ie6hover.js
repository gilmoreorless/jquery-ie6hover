/*!
 * jQuery IE6 hover support plug-in v0.1
 * Add support for the :hover CSS pseudo-selector to IE6
 *
 * @requires jQuery v1.3.2 or later
 *
 * Copyright (c) 2010 Gilmore Davidson
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($){
	$.extend({
		ie6hover: function (future) {
			// $.browser is deprecated, but there's no way to feature detect :hover support
			if (!$.browser.msie) {
				return;
			}
			var func = future === true ? 'live' : 'bind',
				sheets = document.styleSheets,
				check = /:hover\b/,
				selectors = [];
			if (!sheets.length) {
				return;
			}
			$.each(sheets, function (i, sheet) {
				var rules = sheet.rules || sheet.cssRules; // Do I need the backup? maybe check for sheet.rules in the $.browser conditional above
				$.each(rules, function (j, rule) {
					var text = rule.selectorText;
					if (check.test(text)) {
						selectors.push(text);
						text = text.replace(check, '.hover-ie6');
						// TODO - double check that addRule works in ie6
						sheet.addRule(text, rule.cssText.replace(/^.*{/, ''), j);
					}
				});
			});
			// TEMP!
			window.ie6hoverSelectors = selectors;
			// END TEMP
		}
	});
})(jQuery);
