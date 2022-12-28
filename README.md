# be-importing

[![Playwright Tests](https://github.com/bahrus/be-importing/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-importing/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-importing.png)](http://badge.fury.io/js/be-importing)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-importing?style=for-the-badge)](https://bundlephobia.com/result?p=be-importing)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-importing?compression=gzip">

## Import Static, Declarative HTML Web Components with Streaming HTML

With the advent of declarative shadow DOM, many useful web components that require little to no js could be less taxing on the browser if they were imported as pre-rendered HTML rather than JavaScript.

The intent of declarative shadowDOM, I think, is to allow it to be used in the context of an HTML stream from the server.  Still, a case can be made that to benefit from caching, lazy loading, etc, in some cases it is better to reference the HTML via client-side fetch.  There are a few tricky issues to consider though:

How to specify this while also indicating what the light children and attribute settings should be.  be-importing helps with this.

Another benefit of defining something like this on the client side, is the same syntax could be used on the server in order to know from where to get (and cache?) the HTML when doing "true" (I guess) SSR, embedding the declarative HTML into the live stream (with a first content paint performance gain, at the expense of fine grained caching).

So yes, this is yet another client-side include implementation, but one specifically for declarative shadow DOM / declarative web components.

## Working example:

### Using node modules

```html
<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html></xtal-side-nav>
<div id=target></div>
<script type=importmap>{
    "imports":{
        "stream-orator/": "../node_modules/stream-orator/",
        "trans-render/": "../node_modules/trans-render/",
        "xtal-element/": "../node_modules/xtal-element/",
        "be-active/": "../node_modules/be-active/",
        "be-based/": "../node_modules/be-based/",
        "be-decorated/": "../node_modules/be-decorated/",
        "be-exportable/": "../node_modules/be-exportable/",
        "be-having/": "../node_modules/be-having/",
        "be-hive/": "../node_modules/be-hive/",
        "be-importing/": "../node_modules/be-importing/",
        "be-written/": "../node_modules/be-written/",
        "xtal-side-nav/": "../node_modules/xtal-side-nav/"
    }
}</script>
<script type=module>
    import 'be-importing/be-importing.js';
</script>
```

Note that we can give any name we want to the custom element, it doesn't have to match the default name specified by the html file!

### Using CDN:

```html
<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html>
    <section style='color:white'>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
    </section>
</xtal-side-nav>
<div id=target></div>
<script type=importmap>{
    "imports":{
        "xtal-side-nav/": "https://cdn.jsdelivr.net/npm/xtal-side-nav@0.0.104/"
    }
}</script>
<script type=module>
    import 'https://esm.run/be-importing@0.0.45';
</script>
```





## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-importing/be-importing.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-importing';
</script>
```