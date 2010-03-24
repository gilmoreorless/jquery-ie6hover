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
			if (!$.browser.msie || $.browser.version != '6.0') {
				return;
			}
			var klass = 'hover-ie6',
				func = future === true ? 'live' : 'bind',
				sheets = document.styleSheets,
				check = /:hover\b/,
				ignore = /\ba:hover\b/i,
				selectors = [];
			if (!sheets.length) {
				return;
			}
			for (var i = 0, slen = sheets.length; i < slen; i++) {
				var sheet = sheets[i],
					rules;
				try {
					rules = sheet.rules;	
				} catch (e) {
					continue;
				}
				for (var j = 0, len = rules.length; j < len; j++) {
					var rule = rules[j],
						text = rule.selectorText;
					if (check.test(text) && !ignore.test(text)) {
						selectors.push(text.replace(check, ''));
						text = text.replace(check, '.' + klass);
						sheet.addRule(text, rule.style.cssText, j);
						j++;
						len++;
					}
				}
			}
			
			if (selectors.length) {
				$(function () {
					$(selectors.join(','))[func]('mouseenter', function () {
						$(this).addClass(klass);
					})[func]('mouseleave', function () {
						$(this).removeClass(klass);
					});
				});
			}
		}
	});
})(jQuery);
                                