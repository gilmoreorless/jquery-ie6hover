jQuery IE6 CSS :hover support
=============================

This plugin scans through all CSS stylesheets and finds `:hover` pseudo-selectors, then adds the appropriate event handlers to make the CSS work in Internet Explorer 6.

The function takes an optional boolean parameter, which if true will use `live()` instead of `bind()` to make sure all future dynamically-generated elements on a page are supported by the fix.

There are smarts built in to not run if the browser is not IE6, and also not to run on `a:hover` selectors (since IE6 already supports `:hover` for `a` elements).

Usage
-----

`$.ie6hover();  // Add hover support to only the elements on a page at the time the function is called.`

`$.ie6hover(true);  // Add hover support to all current and future elements on a page.`

Notes
-----

* This script will not work on stylesheets loaded from a domain different from the domain the page is on, due to cross-site security policies.
* The hover scripts use the `mouseenter` and `mouseleave` events, unless you're using a jQuery version less than 1.4 in combination with the `live()` version of this function, in which case `mouseover` and `mouseout` are used (jQuery < 1.4 doesn't handle mouseenter and mouseleave in live events).
* To save downloading the script for non-IE6 users, it's probably better to load the script within conditional comments:

	<!--[if IE 6]>
	<script type="text/javascript" src="jquery.ie6hover.js"></script>
	<![endif]-->

