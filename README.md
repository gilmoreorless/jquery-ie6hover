# jQuery IE6 CSS :hover support

This plugin scans through all CSS stylesheets and finds `:hover` pseudo-selectors, then adds the
appropriate event handlers to make the CSS work in Internet Explorer 6.

The function takes an optional boolean parameter, which if true will use `live()` instead of `bind()`
to make sure all future dynamically-generated elements on a page are supported by the fix.

There are smarts built in to not run if the browser is not IE6, and also not to run on `a:hover` selectors
(since IE6 already supports `:hover` for `a` elements).

## Usage

`$.ie6hover();` - Add hover support to only the elements on a page at the time the function is called.

`$.ie6hover(true);` - Add hover support to all current and future elements on a page.

## Notes

To save downloading the script for non-IE6 users, it's probably better to load the script within
conditional comments:

    <!--[if IE 6]>
        <script type="text/javascript" src="jquery.ie6hover.js"></script>
    <![endif]-->

## Known Issues

This plugin will not work on stylesheets loaded from a domain different from the domain the page is on,
due to cross-site security policies.

Also, there's no way to detect `!important` in CSS via JavaScript (as far as I'm aware), so any CSS `:hover`
rules that use `!important` will not be 100% replicated.

### Live binding: `$.ie6hover(true)`

This plugin uses the `mouseenter` and `mouseleave` events by default. However, jQuery versions less than 1.4
don't support these events with the `live()` bind method - so IE6 Hover switches to use `mouseover` and `mouseout`
for these jQuery versions. Be aware that this can produce unexpected results with nested :hover elements.

For jQuery versions 1.4 to 1.5.2 there is also a bug ([5884](http://dev.jquery.com/ticket/5884) - fixed in jQuery 1.6) in the
jQuery core relating to nested `mouseenter` and `mouseleave` events that make them behave like `mouseover` and
`mouseout` in certain circumstances. Be aware of this if using CSS selectors such as `li:hover` which can match
multiple nested elements.


## Changelog

#### 1.1.0
* Rebuilt how CSS rules are matched
* Added support for a lot of new cases that weren't matched before, mainly:
    * `#id` and `.class` attributes
    * multiple hovered elements per rule
* Credit to Pierre Maoui (poupougnac) for some of the test cases and a partial code rewrite

#### 1.0.1
* De-duplication of jQuery selectors to save performance

#### 1.0.0
* Basic support for `element:hover` (excluding a:hover)
* Option to use `bind()` or `live()`