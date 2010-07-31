/*!
 * jQuery IE6 hover support plug-in v1.1.0
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
			var func = future === true ? 'live' : 'bind',
				// jQuery < 1.4 can't handle 'mouseenter' and 'mouseleave' in live events
				is14 = /^1\.[4-9]/.test($.fn.jquery),
				overEvent = is14 || !future ? 'mouseenter' : 'mouseover',
				outEvent = is14 || !future ? 'mouseleave' : 'mouseout',
				sheets = document.styleSheets,
				rCheck = /(.*?)(:hover)\b/g,
				rIgnore = /\bA([#\.].*)*:hover\b/ig,
				rClass = /\.(\S+?)\b/ig,
				defaultClass = 'hover-ie6',
				currentClass = '',
				selectors = [],
				selectorClasses = {
					_default: defaultClass
				},
				selector, selMatch, i, j, len, slen, sheet, rules, rule, text, newText, newTextChunk, textIndex;
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
					newText = [];
					newTextChunk = '';
					// Reset regexps to make sure we're matching at the start of the selector
					rCheck.lastIndex = 0;
					rIgnore.lastIndex = 0;
					if (rCheck.test(text) && !rIgnore.test(text)) {
						currentClass = defaultClass;
						selector = '';
						rCheck.lastIndex = 0;
						// Add the CSS selector in a way that jQuery can handle (ie. no ":hover")
						// Needs to loop through to handle multiple ":hover" instances per selector
						// (odd use case, but still plausible)
						while ((selMatch = rCheck.exec(text))) {
							textIndex = rCheck.lastIndex;
							selector += selMatch[1];
							selectors.push(selector);
							// Build new CSS rule bit-by-bit, allows for fine-grained class replacement
							newTextChunk = selMatch[1];
							// Check which class to add new rule for - default to ".hover-ie6"
							// IE6 can't handle .class1.class2 (it reads as just .class2), so if there's
							// a class already in the selector, generate a new custom class (eg .class1-class2)
							rClass.lastIndex = 0;
							newTextChunk = newTextChunk.replace(rClass, function (match, className) {
								currentClass = className + '-' + defaultClass;
								return '';
							}) + '.' + currentClass;
							// If the replacement class is not standard, add it to the selector class map for jQuery
							if (currentClass !== defaultClass) {
								selectorClasses[selector] = currentClass;
							}
							newText.push(newTextChunk);
						}
						// Make sure to catch any remaining bit of CSS text that wasn't matched
						if (textIndex < text.length) {
							newText.push(text.substr(textIndex));
						}
						// Add a new CSS rule at the same place as the existing rule to keep CSS inheritance working
						text = newText.join('');
						sheet.addRule(text, rule.style.cssText, j);
						// Increase the counters due to the new rule being inserted
						j++;
						len++;
						// Add new rule to public object to aid debugging
						$.ie6hover.selectors.css.push([text, rule.style.cssText]);
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

				// Add selectors to public object to aid debugging
				$.ie6hover.selectors.jQuery = selectors;
				
				// Add hover event handlers to selectors
				$(function () {
					$.each(selectors, function (i, selector) {
						var klass = selectorClasses[selector] || selectorClasses._default;
						$(selector)[func](overEvent, function () {
							$(this).addClass(klass);
						})[func](outEvent, function () {
							$(this).removeClass(klass);
						});
					});
				});
			}
		}
	});
	$.ie6hover.selectors = {
		css: [],
		jQuery: []
	};
})(jQuery);

