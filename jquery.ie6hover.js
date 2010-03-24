/*!
 * jQuery IE6 hover support plug-in v1.0
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
				is14 = /^1.[4-9]/.test($.fn.jquery),
				overEvent = is14 || !future ? 'mouseenter' : 'mouseover',
				outEvent = is14 || !future ? 'mouseleave' : 'mouseout',
				sheets = document.styleSheets,
				check = /:hover\b/g,
				ignore = /\ba:hover\b/ig,
				selectors = [];
			if (!sheets.length) {
				return;
			}
			for (var i = 0, slen = sheets.length; i < slen; i++) {
				var sheet = sheets[i],
					rules;
				// Gracefully handle any cross-domain security errors
				try {
					rules = sheet.rules;	
				} catch (e) {
					continue;
				}
				for (var j = 0, len = rules.length; j < len; j++) {
					var rule = rules[j],
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
			
			// Add hover event handlers to selectors
			if (selectors.length) {
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
                                