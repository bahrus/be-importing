# be-importing

### Importing Static, Declarative HTML Web Components [TODO]

With the advent of declarative Shadow DOM, many useful web components that require little to no js could be less taxing on the browser if they were imported as pre-rendered HTML rather than JavaScript.

The intent of declarative shadowDOM, I think, is to allow it to be used in the context of an HTML stream from the server.  Still, a case can be made that to benefit from caching, lazy loading, etc, in some cases it is better to reference the HTML via client-side fetch.  There are a few tricky issues to consider though:

How to specify this while also indicating what the light children and attribute settings should be.  be-loaded helps with this.

The shadowroot attribute seems to have no effect when the HTML is inserted into the DOM tree post initial render.  


```html
<my-declarative-component be-importing=https://esm.run/my-ssr-component/my-ssr-component.html>
<!-- light children -->
</my-declarative-component>
```

What this does:

1.  If customElements.get('my-ssr-component') is undefined, it will fetch the HTML.  Otherwise, full stop.
2.  Searches for a template with attribute shadowroot=open, and if if finds it, sets the shadowRoot
3.  Strips the outer tag if it is my-ssr-component.
      1.  Copies the attributes of the outer tag to the target.