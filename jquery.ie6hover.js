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
				len = document.styleSheets.length;
			/*
			if (len == 0) {
				log('TODO!');
				return;
			}
			var style = document.styleSheets[0],
				rule = 'body:hover',
				body = document.getElementsByTagName('body')[0],
				rules;
			style.insertRule
				? style.insertRule(rule + '{color:#F00;}', 0)
				: style.addRule(rule, 'color:#F00;', 0);
			rules = style.cssRules || style.rules;
			log(rules[0].selectorText);
			*/
		}
	});
})(jQuery);
