# &lt;w0s-portal&gt;

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-portal.svg)](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-portal)

This custom element adds animation movement to the [&lt;portal&gt; element](https://wicg.github.io/portals/) and improves some accessibility issues.

## Demo

- [Demo page](https://saekitominaga.github.io/customelements-portal/demo.html)

## Attributes

<dl>
<dt>src [optional]</dt>
<dd>URL of a page to be displayed. (Same as <a href="https://wicg.github.io/portals/#element-attrdef-portal-src">src attribute of &lt;portal&gt; Element</a>)</dd>
<dt>title [optional]</dt>
<dd>Title of a page to be displayed.</dd>
<dt>referrerpolicy [optional]</dt>
<dd>Referrer Policy. (Same as <a href="https://wicg.github.io/portals/#element-attrdef-portal-referrerpolicy">referrerpolicy attribute of &lt;portal&gt; Element</a>)</dd>
</dl>

e.g. `<w0s-portal src="https://example.com/" title="Example.com" referrerpolicy="same-origin"></w0s-portal>`

## ⚠ Precautions for use

As of November 2019, there is no officially supported browser for the &lt;portal&gt; element. Please note the following points when using.

- Currently, only a limited number of browsers are supported. Chrome 78 is supported with <b>chrome://flags/#enable-portals</b> enabled.
- Accessibility issues have been reported in Chrome implementations. See [Short note on the portal element](https://codepen.io/stevef/post/short-note-on-the-portals-element) for details. Although this custom element solves some of these problems, it still does not solve the phenomenon of the browser's back button being disabled.
