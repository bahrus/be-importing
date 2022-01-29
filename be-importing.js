import { define } from 'be-decorated/be-decorated.js';
import { register } from "be-hive/register.js";
import('be-active/be-active.js');
const inProgress = {};
export class BeImportingController {
    async onPath({ path, proxy, baseCDN, headerTemplate, footerTemplate }) {
        if (customElements.get(proxy.localName) !== undefined) {
            return;
        }
        if (inProgress[proxy.localName]) {
            return;
        }
        inProgress[proxy.localName] = true;
        let href = path;
        if (!path.includes('//') && path[0] !== '/' && path[0] !== '.') {
            const linkPreload = self[path];
            if (linkPreload !== undefined) {
                href = linkPreload.href;
            }
            else {
                if (!baseCDN.endsWith('/')) {
                    baseCDN += '/';
                }
                href = baseCDN + path;
            }
        }
        const resp = await fetch(href);
        const text = await resp.text();
        const dp = new DOMParser();
        const doc = dp.parseFromString(text, 'text/html');
        const sr = doc.querySelector('template[shadowroot]');
        if (sr !== null) {
            const mode = sr.getAttribute('shadowroot');
            proxy.attachShadow({ mode });
            if (headerTemplate !== undefined) {
                proxy.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
            }
            proxy.shadowRoot.appendChild(sr.content.cloneNode(true));
            if (footerTemplate !== undefined) {
                proxy.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
            }
        }
        const el = doc.querySelector(proxy.localName);
        if (el !== null) {
            this.copyAttribs(el, proxy);
        }
        const script = doc.querySelector('script[nomodule]');
        if (script !== null) {
            proxy.insertAdjacentElement('afterend', script);
        }
    }
    onFooterHTML({ proxy, footerHTML }) {
        const templ = document.createElement('template');
        templ.innerHTML = footerHTML;
        proxy.footerTemplate = templ;
    }
    onHeaderHTML({ proxy, headerHTML }) {
        const templ = document.createElement('template');
        templ.innerHTML = headerHTML;
        proxy.headerTemplate = templ;
    }
    copyAttribs(from, to) {
        for (let i = 0, ii = from.attributes.length; i < ii; i++) {
            const attr = from.attributes[i];
            try {
                to.setAttribute(attr.name, attr.value);
            }
            catch (e) {
                console.warn(e);
            }
        }
    }
}
const tagName = 'be-importing';
const ifWantsToBe = 'importing';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            primaryProp: 'path',
            virtualProps: ['path', 'baseCDN', 'headerHTML', 'headerTemplate', 'footerHTML', 'footerTemplate'],
            proxyPropDefaults: {
                baseCDN: 'https://cdn.jsdelivr.net/npm/',
            }
        },
        actions: {
            onPath: 'path',
            onHeaderHTML: 'headerHTML',
            onFooterHTML: 'footerHTML',
        }
    },
    complexPropDefaults: {
        controller: BeImportingController
    }
});
register(ifWantsToBe, upgrade, tagName);
