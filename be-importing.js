import { define } from 'be-decorated/be-decorated.js';
import { register } from "be-hive/register.js";
const inProgress = {};
export class BeImportingController {
    async onPath({ path, proxy, baseCDN, beBased }) {
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
        //const doc = dp.parseFromString(text, 'text/html', {includeShadowRoots: true});
        const doc = dp.parseFromString(text, 'text/html');
        const sr = doc.querySelector('template[shadowroot]');
        if (sr !== null) {
            const mode = sr.getAttribute('shadowroot');
            proxy.attachShadow({ mode });
            const headerSD = proxy.querySelector('template[slot="header-sd"]');
            if (headerSD !== null) {
                proxy.shadowRoot.appendChild(headerSD.content.cloneNode(true));
                headerSD.remove();
            }
            // if(beBased !== undefined){
            //     const {processRules} = await import('be-based/processRules.js');
            //     processRules({proxy: sr, rules: beBased.rules});
            // }
            proxy.shadowRoot.appendChild(sr.content.cloneNode(true));
            const footerSD = proxy.querySelector('template[slot="footer-sd"]');
            if (footerSD !== null) {
                proxy.shadowRoot.appendChild(footerSD.content.cloneNode(true));
                footerSD.remove();
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
            virtualProps: ['path', 'baseCDN', 'beBased'],
            proxyPropDefaults: {
                baseCDN: 'https://cdn.jsdelivr.net/npm/',
            }
        },
        actions: {
            onPath: 'path',
        }
    },
    complexPropDefaults: {
        controller: BeImportingController
    }
});
register(ifWantsToBe, upgrade, tagName);
