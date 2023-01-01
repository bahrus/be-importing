# be-importing

[![Playwright Tests](https://github.com/bahrus/be-importing/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-importing/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-importing.png)](http://badge.fury.io/js/be-importing)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-importing?style=for-the-badge)](https://bundlephobia.com/result?p=be-importing)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-importing?compression=gzip">

## Import Static, Declarative HTML Web Components with Streaming HTML

### Sample syntax

```html
<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html>
    <section style='color:white'>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
    </section>
</xtal-side-nav>

<script type=importmap>{
    "imports":{
        "xtal-side-nav/": "https://cdn.jsdelivr.net/npm/xtal-side-nav@0.0.110/"
    }
}</script>
<script type=module>
    import 'https://esm.run/be-importing@0.0.50';
</script>
```



## Backdrop

With the advent of declarative shadow DOM, many useful web components that require little to no js could be less taxing on the browser if they were imported as pre-rendered HTML rather than JavaScript.

When the user loads an HTML page in their browser, served by an ancient web server, it streams.  This was engineered by Netscape/Apache in a fortnight, when even elite users had to suffer with 19,200 bit/s.  

Three decades later, as we speak, there is some fantastic, cutting edge work going on that will  enable this streaming optimization, even for content that has style isolation (Shadow DOM), so that's great news!

However, the theoretical possibility to be able to stream *partial page reloads* arrived at the same time as Road Runner and V8, so the whole streaming concept become passé.  Instead, we went all API-happy, with [unfortunate future consequences](https://infrequently.org/2022/12/performance-baseline-2023/). 

One would have thought that with the introduction of smart phones, the browser vendors would be rushing to fulfill this poverty-and-global-warming-reducing functionality (stream partial page reloads), but they have higher priorities, like preventing anyone from knowing the user visited another site that also uses JQuery (how embarrassing that would be!).  Downloading a fresh copy of JQuery every 10 minutes is precisely what mobile phone users on a pay-as-you-go plan have been clamoring for.

Now that every household in Silicon Valley has intravenous 5g connectivity, it is not surprising that implementing streaming for partial page reloads has been a dystopian, [Kafkaesque](https://astrofella.wordpress.com/2021/05/14/jorge-luis-borges-franz-kafka/), waiting-for-Godot's-second-coming kind of a rollout.

Still, progress has been made, and today, all the browsers do have good api support for streaming partial page reloads (with some temporary, hopefully, caveats).  [be-written](https://github.com/bahrus/be-written) exists to provide declarative support on top of these API's, a kind of inline iframe without the negative performance / constrained to a rectangle limitions of an iframe.  Here's to hoping the browser vendors choose to show some HTML love (like they've been doing for years with JavaScript) and provide first class support for declarative inclusiveness.  be-written also has rudimentary support for import maps.

## Functionality

*be-importing* extends be-written, by simply defaulting some of be-written's options to settings most applicable for (declarative) web components:

```TypeScript
{
    between: ["<!--begin-->", "<!--end-->"],
    shadowRoot: "open",
    once: true
};
```

The "between" setting allows us to create web components as html files that can also be opened directly in a web browser, making rudimentary demo's possible.  

But more importantly, tt also solves some difficult to overcome obstacles as far as managing where the light children should go, and the ability to pass properties down to the custom element ahead of the downloading.

The "shadowRoot" setting allows us to specify whether to wrap the imported content inside a shadowRoot.  This is "off" by default for be-written, but defaults to "open" for be-importing, as that is more typically desired for web components.

The "once" setting allows us have repeated instances of the web component, including the import statement, without having to worry that multiple requests to the same resource will be made:

```html
<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html>
    <section style='color:white'>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
    </section>
</xtal-side-nav>
...
<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html>
    <section style='color:white'>
        <div>Menu Item 3</div>
        <div>Menu Item 4</div>
    </section>
</xtal-side-nav>
```

... only downloads the resource once, and (using loosely coupled functionality not discussed here) only defines one custom element.

A strong case can be made that to benefit from caching, lazy loading, etc, in some cases it is better to reference the HTML via client-side fetch.

Another benefit of defining something like this on the client side, is the same syntax could be used on the server in order to know from where to get (and cache?) the HTML when doing "true" (I guess) SSR, embedding the declarative HTML into the live stream (with a first content paint performance gain, at the expense of fine grained caching).

So yes, this is yet another client-side include implementation, but one specifically for declarative shadow DOM / declarative web components.

## Working example:

### Using ES modules, import maps exclusively

```html
<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html>
    <section style='color:white'>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
    </section>
</xtal-side-nav>
<script type=importmap>{
    "imports":{
        "stream-orator/": "../node_modules/stream-orator/",
        "trans-render/": "../node_modules/trans-render/",
        "xtal-element/": "../node_modules/xtal-element/",
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

> **Note:** We can give any name we want to the custom element, it doesn't have to match the default name specified by the html file!

### Using CDN:

```html
<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html>
    <section style='color:white'>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
    </section>
</xtal-side-nav>
<script type=importmap>{
    "imports":{
        "xtal-side-nav/": "https://cdn.jsdelivr.net/npm/xtal-side-nav@0.0.106/"
    }
}</script>
<script type=module>
    import 'https://esm.run/be-importing@0.0.47';
</script>
```

Since be-importing is not a standard, CDN's have no out-of-the-box support for it, of course, thus the developer is burdened with specifying the import map base package location for where the HTML file can be found.

An alternative way of mapping the bare import specifier of the html file to a precise location is using the link preload tag:

```html
<!-- This should probably go in index.html / head tag: -->
<head>
    ...
<link id=xtal-side-nav/xtal-side-nav.html rel=preload as=fetch href>
...
</head>

<body>
    ...

<xtal-side-nav be-importing=xtal-side-nav/xtal-side-nav.html>
    <section style='color:white'>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
    </section>
</xtal-side-nav>


<script type=module>
    import 'https://esm.run/be-importing@0.0.47';
</script>


...
</body>
```

[Demo](https://codepen.io/bahrus/pen/abjdQWW)


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