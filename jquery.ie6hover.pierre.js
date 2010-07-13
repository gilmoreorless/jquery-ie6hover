/*!
 * jQuery IE6 hover support plug-in v1.0.1
 * Add support for the :hover CSS pseudo-selector to IE6
 * @requires jQuery v1.3 or later
 *
 * Copyright (c) 2010 Gilmore Davidson
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
	$.extend({
		ie6hover: function () {
			// $.browser is deprecated, but there's no way to feature detect :hover support
			if (!$.browser.msie || $.browser.version != '6.0') {
				return;
			}
			var klass = 'hover-ie6',
				is14 = /^1\.[4-9]/.test($.fn.jquery),
				sheets = document.styleSheets,
				check = /:hover\b/g,
				check_erase = /:hover\b(.)*/g,
				ignore = /a((\.\w+)|(#\w+))?:hover/ig,
				idorclass = /((\.\w+)|(#\w+)):hover/ig,
				selectors = [],
				i, j, len, slen, sheet, rules, rule, text;
			selectors[0] = []; //selectors
			selectors[1] = []; //hovered class
			if (!is14) {
				alert('jQuery 1.4 or ulterior is required for ie6hover to work');
				return;
			}
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
					if (!ignore.test(text)) {
						check.lastIndex = 0;
						if (check.test(text)) {
							// Add the selector in a way that jQuery can handle (ie. no ":hover")
							// and erase all selectors after :hover
							selectors[0].push(text.replace(check_erase, ''));

							// Rename class or id (if existing) by adding -hover-ie6
							idorclass.lastIndex = 0;
							if (idorclass.test(text)) {
								idorclass.lastIndex = 0;
								selectors[1].push(idorclass.exec(text)[1].replace('.', '').replace('#', '') + '-' + klass);
								text = text.replace(check, '-' + klass);
							}
							// No class or id: replace ":hover" with ".hover-ie6"
							else {
								text = text.replace(check, '.' + klass);
								selectors[1].push(klass);
							}

							// New CSS rule should be added at the same place as the existing rule to keep inheritance working
							sheet.addRule(text, rule.style.cssText, j);
							// Increase the counters due to the new rule being inserted
							j++;
							len++;
						}
					}
				}
			}


			if (selectors[0].length) {
				// Quick function to de-duplicate selector array before sending to jQuery, to save finding duplicate DOM nodes
				if (selectors[0].length > 1) {
					selectors = (function (oldArr) {
						var newArr = [],
							map = {},
							l = oldArr[0].length,
							val, valc;
						newArr[0] = [];
						newArr[1] = [];
						for (i = 0; i < l; i++) {
							val = oldArr[0][i];
							valc = oldArr[1][i];
							if (!map[val]) {
								map[val] = true;
								newArr[0].push(val);
								newArr[1].push(valc);
							}
						}
						return newArr;
					})(selectors);
				}

				// Add hover event handlers to selectors
				$(function () {

					for (var zzeclass, i = 0; i < selectors[0].length; i++) {
						zzeclass = selectors[1][i];
						$(selectors[0][i]).live('mouseenter', {
							zeclass: zzeclass
						}, function (e) {
							$(this).addClass(e.data.zeclass);
						});
						$(selectors[0][i]).live('mouseleave', {
							zeclass: zzeclass
						}, function (e) {
							$(this).removeClass(e.data.zeclass);
						});
					}
				});
			}
		}
	});
})(jQuery);