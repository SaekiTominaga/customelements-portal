# Animated motion `<portal>` by Custom Elements

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-portal.svg)](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-portal)

Add animated motion to the [`<portal>` element](https://wicg.github.io/portals/) by Custom Elements.

## Demo

- [Demo page](https://saekitominaga.github.io/customelements-portal/demo.html)

## Examples

```HTML
<x-portal
  src="foo.html"
  referrerpolicy="origin">
</x-portal>
```

## Attributes

<dl>
<dt>src [optional]</dt>
<dd>URL of a page to be displayed. (Same as <a href="https://wicg.github.io/portals/#element-attrdef-portal-src">src attribute of &lt;portal&gt; Element</a>)</dd>
<dt>referrerpolicy [optional]</dt>
<dd>Referrer Policy. (Same as <a href="https://wicg.github.io/portals/#element-attrdef-portal-referrerpolicy">referrerpolicy attribute of &lt;portal&gt; Element</a>)</dd>
</dl>

e.g. `<x-portal src="https://example.com/" referrerpolicy="same-origin"></x-portal>`

## Style customization (CSS custom properties)

| name | deault | Description |
|-|-|-|
| --portal-width | 640px | Width of portal |
| --portal-height | 360px | Height of portal |
| --portal-max-width | 100% | Maximum width of portal |
| --portal-max-height | 100vh | Maximum height of portal |
| --portal-border-style | solid | Border style of portal (`border-style` property) |
| --portal-border-width | 1px | Border width of portal (`border-width` property) |
| --portal-border-color | currentColor | Border color of portal (`border-color` property) |
| --portal-scale | 0.5 | Amount of scaling of portal (The value of the `scale()` in the `transform` property) |
| --portal-animation-duration | 0.5s | Time a transition animation (`transition-duration` property) |
| --portal-outline-style | solid | Outline style of portal (`outline-style` property) |
| --portal-outline-width | 1px | Outline width of portal (`outline-width` property) |
| --portal-outline-color | currentColor | Outline color of portal (`outline-color` property) |
| --portal-outline-offset | 0px | Outline offset of portal (`outline-offset` property) |

\* CSS custom properties names have changed in the version 2.0.0 update. **(Not compatible with version 1 series)**

## ⚠ Precautions for use

As of December 2020, there is no officially supported browser for the `<portal>` element. Chrome 87 is supported with <b>chrome://flags/#enable-portals</b> enabled.
