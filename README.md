# be-importing (WIP)

[![Playwright Tests](https://github.com/bahrus/be-importing/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-importing/actions/workflows/CI.yml)

<a href="https://nodei.co/npm/be-importing/"><img src="https://nodei.co/npm/be-importing.png"></a>

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-importing?style=for-the-badge)](https://bundlephobia.com/result?p=be-importing)

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-importing?compression=gzip">

## Importing Static, Declarative HTML Web Components

With the advent of declarative shadow DOM, many useful web components that require little to no js could be less taxing on the browser if they were imported as pre-rendered HTML rather than JavaScript.

The intent of declarative shadowDOM, I think, is to allow it to be used in the context of an HTML stream from the server.  Still, a case can be made that to benefit from caching, lazy loading, etc, in some cases it is better to reference the HTML via client-side fetch.  There are a few tricky issues to consider though:

How to specify this while also indicating what the light children and attribute settings should be.  be-importing helps with this.


Another benefit of defining something like this on the client side, is the same syntax could be used on the server in order to know from where to get (and cache?) the HTML when doing "true" (I guess) SSR, embedding the declarative HTML into the live stream (with a first content paint performance gain, at the expense of fine grained caching).

So yes, this is yet another client-side include implementation, but one specifically for declarative shadow DOM / declarative web components.


```html
<head>
      <link rel="preload" as="fetch" id="my-declarative-component/my-declarative-component.html" href="https://unpkg.com/my-declarative-component/my-declarative-component.html">
</head>
<body>
...
<my-declarative-component be-importing=my-declarative-component/my-declarative-component.html>
<!-- light children -->
</my-declarative-component>
...
</body>

```


### Perform preimport transform(s) with DTR 

[TODO]  Document

### Perform preimport transform with XSLT [TODO]

### Specifying an alternative web component name. [TODO]

The syntax above only works if the declarative component defined in the server specifies the same tag name as the tag adorned by the be-importing attribute.

If the remote web component uses a different tag name, then this needs to be spelled out:

```html
<head>
      <link rel="preload" as="fetch" id="my-declarative-component/my-declarative-component.html" href="https://cdn.jsdelivr.net/my-declarative-component/my-declarative-component.html">
</head>
<body>
...
<my-alternative-component-name be-importing='{
      "path": "my-declarative-component/my-declarative-component.html",
      "tagName": "my-declarative-component"
}'>
<!-- light children -->
</my-alternative-component-name>
...
</body>

```

What this does:

1.  If customElements.get('my-declarative-component') is undefined, it will fetch the HTML.  Otherwise, full stop.
2.  If value matches link id, get the href from the link tag.  Otherwise, prepend with https://cdn.jsDelivr.net (or whatever is fastest), unless starts with a .
3.  Once url is determined, fetch it.  Search for a template with attribute shadowroot=open, and if it finds it, sets the shadowRoot by cloning in the template.
3.  Strips the outer tag if it is my-declarative-component.
      1.  Copies the attributes of the outer tag to the target.

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