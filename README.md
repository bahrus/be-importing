# be-importing

### Importing Static, Declarative HTML Web Components

With the advent of declarative shadow DOM, many useful web components that require little to no js could be less taxing on the browser if they were imported as pre-rendered HTML rather than JavaScript.

The intent of declarative shadowDOM, I think, is to allow it to be used in the context of an HTML stream from the server.  Still, a case can be made that to benefit from caching, lazy loading, etc, in some cases it is better to reference the HTML via client-side fetch.  There are a few tricky issues to consider though:

How to specify this while also indicating what the light children and attribute settings should be.  be-loaded helps with this.

The shadowroot attribute seems to have no effect when the HTML is inserted into the DOM tree post initial render.  (Note:  https://github.com/mfreed7/declarative-shadow-dom#mitigation )


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

What this does:

1.  If customElements.get('my-declarative-component') is undefined, it will fetch the HTML.  Otherwise, full stop.
2.  If value matches link id, get the href from the link tag.  Otherwise, prepend with https://cdn.jsDelivr.net (or whatever is fastest), unless starts with a .
3.  Once url is determined, fetch it.  User DOM Parser (without the includeShadowRoots flag?). Search for a template with attribute shadowroot=open, and if it finds it, sets the shadowRoot
3.  Strips the outer tag if it is my-declarative-component.
      1.  Copies the attributes of the outer tag to the target.