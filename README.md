# be-importing

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/be-importing)
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

When the user loads an HTML page in their browser, served by an ancient web server, it streams.  This was engineered by Netscape/Apache in a fortnight(?), when even elite users had to suffer with 19,200 bit/s.  

Three decades later, as we speak, there is some fantastic, cutting edge work going on that will  enable this streaming optimization, even for content that has style isolation (Shadow DOM), so that's great news!

But what if we need a portion of the page to stream, for example as the content of that part of the page becomes out of date?  Or maybe the data for that portion of the page wasn't available at the time the page loaded.  

That would have been the natural evolution of things, to support this scenario, once asynchronous http requests could be made within a page session, circa 1999.  Browsers would have needed to make certain adjustments to make it so.   But asynchronous HTTP landed at about the same time as Road Runner and V8, so the whole streaming concept became passé at that point.  Instead, we went all API-happy, with [unfortunate future consequences](https://infrequently.org/2022/12/performance-baseline-2023/). 

One would have thought that with the introduction of smart phones, the browser vendors would have gone back to the drawing board, and rushed to fulfill this poverty-and-global-warming-reducing functionality (streaming partial page reloads), but alas, they had higher priorities, like preventing one website from gleaning whether the user visited another site that also uses JQuery (how embarrassing that would be if it were known!).  So browsers made sure to prevent that from happening.  Downloading a fresh copy of JQuery every 10 minutes is precisely what mobile phone users on a pay-as-you-go plan have been clamoring for.

Now that every household in Silicon Valley has intravenous 5g connectivity, it is not surprising that implementing streaming for partial page reloads has been a dystopian, [Kafkaesque](https://astrofella.wordpress.com/2021/05/14/jorge-luis-borges-franz-kafka/), waiting-for-Godot's-second-coming kind of a rollout.

Still, progress has been made, and today, all the browsers do have good api support for streaming partial page reloads.   There are some rough edges, I'm finding, which will hopefully be ironed out soon.  [be-written](https://github.com/bahrus/be-written) exists to provide declarative support on top of these API's.  It provides a kind of inline iframe, but without the baggage of iframes -- the [slow performance](https://learn.microsoft.com/en-us/microsoft-365/enterprise/modern-iframe-optimization?view=o365-worldwide) / being limited to a rectangle, to name the top two issues iframes have.  Here's to hoping the browser vendors choose to show some much needed HTML love (like they've been doing for years with JavaScript) and provide first class support for declarative inclusiveness, making *be-written* a welcomed casualty. 

## Security

It should be noted that *be-written* also has rudimentary support for import maps, as well as a custom link preload solution containing an onerror attribute.  This in fact forms the cornerstone of the [security checks](https://github.com/bahrus/be-written#what-about-security), to prevent an attribute that might be corrupted via an XSS attack to reference any url arbitrarily.  Only url's that are resolved by import maps and/or link preload (or any other value of rel, as long as the link tag was able to obtain an onerror attribute) can be imported via be-importing (and CSP can also help here).

## Functionality

*be-importing* extends *be-written*, by simply defaulting some of *be-written*'s options to settings most applicable for (declarative) web components:

```TypeScript
{
    between: ["<!--begin-->", "<!--end-->"],
    shadowRoot: "open",
    once: true
};
```

The "between" setting allows us to create web components as html files that can also be opened directly in a web browser, making rudimentary demo's possible.  

But more importantly, it also solves some difficult to overcome obstacles as far as managing where the light children should go, and the ability to pass properties down to the custom element ahead of the downloading completing.  And also allowing the same file to be used as an embedded server-side include in scenarios where the benefits outweigh the costs of that approach.

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

be-importing also adds some additional support to make switching back and forth between bundling / no bundling (either statically or dynamically) easy to manage [TODO].

A strong case can be made that to benefit from caching, lazy loading, etc, in some cases it is better to reference the HTML via client-side fetch.

So yes, this is yet another client-side include implementation, but one specifically for streaming declarative shadow DOM / declarative web components to the browser.

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

> **Note**: We can give any name we want to the custom element, it doesn't have to match the default name specified by the html file!

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
        "xtal-side-nav/": "https://cdn.jsdelivr.net/npm/xtal-side-nav@0.0.110/"
    }
}</script>
<script type=module>
    import 'https://esm.run/be-importing@0.0.50';
</script>
```

Since be-importing is not a standard, CDN's have no out-of-the-box support for it, of course, thus the developer is burdened with specifying the import map base package location for where the HTML file can be found.

An alternative way of mapping the bare import specifier of the html file to a precise location is using the link preload tag:

```html
<!-- This should probably go in index.html / head tag: -->
<head>
    ...
<link id=xtal-side-nav/xtal-side-nav.html rel=preload as=fetch href=https://cdn.jsdelivr.net/npm/xtal-side-nav@0.0.110/xtal-side-nav.html>
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

## Support for bundling [TODO]

It seems likely, even with all the advances that HTTP/3 provides, that in cases where most of the users are hit-and-run type visitors, some amount of bundling would be beneficial.

It may be that in some cases, it is a bit difficult to say which is better - bundling or no bundling, so switching back and forth seamlessly is of upmost importance.

The fact that the value of be-importing isn't pointing right at the resource, that we need to pass through some extra hoops to be secure and safe in our imports, actually comes in to help here.

Recommended approach (tentative)

1.  Use link preload tags (import maps also fine, but will be ignored if everything matches up with a link preload tag).  Required if bundling support is needed.
2.  If bundling was accomplished, either during a build process, or dynamically by the server, the process can add attribute data-imported.  The process should also remove "rel=preload".
3.  If no value for the attribute is specified, *be-importing* assumes the next sibling of the link element will be a template element, and import the contents from there.

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