/*!
 * jQuery IE6 hover support plug-in v1.0.1
 * Add support for the :hover CSS pseudo-selector to IE6
 *
 * @requires jQuery v1.3 or later
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
			if (!$.browser.msie || $.browser.version != '6.0') {
				return;
			}
			var klass = 'hover-ie6',
				func = future === true ? 'live' : 'bind',
				// jQuery < 1.4 can't handle 'mouseenter' and 'mouseleave' in live events
				is14 = /^1\.[4-9]/.test($.fn.jquery),
				overEvent = is14 || !future ? 'mouseenter' : 'mouseover',
				outEvent = is14 || !future ? 'mouseleave' : 'mouseout',
				sheets = document.styleSheets,
				check = /:hover\b/g,
				ignore = /\ba:hover\b/ig,
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
				
				// Add hover event handlers to selectors
				$(function () {
					$(selectors.join(','))[func](overEvent, function () {
						$(this).addClass(klass);
					})[func](outEvent, function () {
						$(this).removeClass(klass);
					});
				});
			}
		}
	});
})(jQuery);

