import { define } from 'be-decorated/be-decorated.js';
import { register } from "be-hive/register.js";
import('be-active/be-active.js');
const inProgress = {};
export class BeImportingController {
    async onPath({ path, proxy, baseCDN }) {
        if (customElements.get(proxy.localName) !== undefined) {
            return;
        }
        if (inProgress[proxy.localName]) {
            return;
        }
        inProgress[proxy.localName] = true;
        let href = path;
        const linkPreload = self[path];
        if (linkPreload !== undefined) {
            href = linkPreload.href;
        }
        else if (path[0] === '/' || path[0] === '.') {
            href = path;
        }
        else {
            if (!baseCDN.endsWith('/')) {
                baseCDN += '/';
            }
            href = baseCDN + path;
        }
        const resp = await fetch(href);
        const text = await resp.text();
        const dp = new DOMParser();
        const doc = dp.parseFromString(text, 'text/html');
        const sr = doc.querySelector('template[shadowroot]');
        if (sr !== null) {
            const mode = sr.getAttribute('shadowroot');
            proxy.attachShadow({ mode });
            proxy.shadowRoot.appendChild(sr.content.cloneNode(true));
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
            virtualProps: ['path', 'baseCDN'],
            proxyPropDefaults: {
                baseCDN: 'https://cdn.jsdelivr.net/npm/',
            }
        },
        actions: {
            onPath: 'path'
        }
    },
    complexPropDefaults: {
        controller: BeImportingController
    }
});
register(ifWantsToBe, upgrade, tagName);
